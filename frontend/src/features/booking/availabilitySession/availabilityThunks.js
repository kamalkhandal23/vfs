import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiRequest } from "../../../utils/api";
import { buildBookingPayload, buildReturnPayload } from "./buildBookingPayload";

const toErrorMessage = (err, fallback) => {
  if (typeof err === "string") return err;
  if (err?.message) return err.message;
  return fallback;
};

const parseCreateBookingResponse = (res, fallbackMessage) => {
  if (!res?.success) {
    return { ok: false, message: res?.message || fallbackMessage };
  }

  if (res?.data?.success === false) {
    return { ok: false, message: res?.data?.message || fallbackMessage };
  }

  const bookingData = res?.data?.data;
  if (!bookingData || !bookingData.bookingCode) {
    return {
      ok: false,
      message: res?.data?.message || "Booking response missing booking reference",
    };
  }

  return { ok: true, data: bookingData };
};

const sanitizeHoldRefSegment = (value) =>
  String(value || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 24);

const resolveSessionKey = () => {
  try {
    const authData = localStorage.getItem("authData");
    const parsed = authData ? JSON.parse(authData) : null;
    return parsed?.session || null;
  } catch {
    return null;
  }
};

const resolveHoldRef = ({ sessionKey, couponCode, sailingId, leg }) => {
  const baseSegment = sanitizeHoldRefSegment(couponCode || sessionKey || `S${sailingId}`) || "SESSION";
  const legSegment = leg === "return" ? "RTN" : "DEP";
  return `HOLD-${baseSegment}-${legSegment}`;
};

const buildSeatHoldItems = ({
  assignments = [],
  fallbackCategoryId = null,
}) => {
  const grouped = new Map();

  assignments.forEach((assignment) => {
    const seatCategoryId = Number(
      assignment?.apiCategoryId ??
      assignment?.categoryId ??
      fallbackCategoryId
    );

    if (!Number.isFinite(seatCategoryId) || !assignment?.seatId) return;

    const existing = grouped.get(seatCategoryId) || {
      seatCategoryId,
      seatNos: [],
      adultSeatCount: 0,
      childFriendlySeatCount: 0,
    };

    existing.seatNos.push(String(assignment.seatId));

    if (assignment.isInfant) {
      existing.childFriendlySeatCount += 1;
    } else {
      existing.adultSeatCount += 1;
    }

    grouped.set(seatCategoryId, existing);
  });

  return Array.from(grouped.values()).map((item) => {
    const uniqueSeatNos = Array.from(new Set(item.seatNos));

    return {
      seatCategoryId: item.seatCategoryId,
      holdQty: uniqueSeatNos.length,
      adultSeatCount: item.adultSeatCount,
      childFriendlySeatCount: item.childFriendlySeatCount,
      seatNos: uniqueSeatNos,
    };
  });
};

/* ---------------- Coupon ---------------- */

export const verifyCouponCode = createAsyncThunk(
  "availabilitySession/verifyCouponCode",
  async (code, { rejectWithValue }) => {
    try {
      const res = await apiGet(`/cruise/api/coupons/by-code/${code}`);

      if (!res?.success) {
        return rejectWithValue(res?.message || "Invalid coupon");
      }

      return res.data;
    } catch {
      return rejectWithValue("Coupon verification failed");
    }
  }
);

/* ---------------- Create Booking ---------------- */

export const createBooking = createAsyncThunk(
  "availabilitySession/createBooking",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const payload = buildBookingPayload(
        state.booking.availabilitySession,
        state.booking.bookingConfig?.items
      );

      const res = await apiPost("/booking/api/create", payload);

      const parsed = parseCreateBookingResponse(res, "Booking failed");
      if (!parsed.ok) {
        return rejectWithValue(parsed.message);
      }

      return parsed.data;
    } catch (err) {
      return rejectWithValue(toErrorMessage(err, "Booking failed"));
    }
  }
);

/* ---------------- Seat Hold ---------------- */



export const createSeatHold = createAsyncThunk(
  "availabilitySession/createSeatHold",
  async ({ leg = "departure", skipSeatSelection = false } = {}, { getState, rejectWithValue }) => {
    const session = getState().booking.availabilitySession;
    const isReturnLeg = leg === "return";

    const sailingId = Number(
      isReturnLeg
        ? session?.returnJourney?.slotId
        : session?.selectedSlotId
    );

    const assignments = isReturnLeg
      ? (session?.returnSeatAssignments || [])
      : (session?.seatAssignments || []);

    const fallbackCategoryId = Number(
      isReturnLeg
        ? session?.returnJourney?.categoryId
        : session?.selectedCategoryId
    );


    if (!sailingId) {
      return rejectWithValue("Sailing details are missing for seat hold");
    }
    const totalTravellers =
      session.travellers.passengers +
      (session.travellers.infants || 0);

    const callSeatHoldApi = async ({ items }) => {
      const sessionKey = resolveSessionKey();

      const holdRef = resolveHoldRef({
        sessionKey,
        couponCode: session?.coupon?.code,
        sailingId,
        leg,
      });

      const payload = { holdRef, sailingId, items };

      const res = await apiRequest({
        url: "/booking/api/seat-hold/create",
        method: "POST",
        data: payload,
      });

      if (!res?.success || res?.data?.success === false) {
        throw new Error(res?.message || "Seat hold failed");
      }

      return {
        leg,
        holdRef,
        sailingId,
        items,
        response: res?.data || res,
      };
    };

    if (skipSeatSelection) {
      const items = [
        {
          seatCategoryId: fallbackCategoryId,
          holdQty: totalTravellers,
          adultSeatCount: session.travellers.passengers,
          childFriendlySeatCount: session.travellers.infants || 0,
        },
      ];

      return callSeatHoldApi({ items });
    }


    if (!assignments.length) {
      return rejectWithValue(
        isReturnLeg
          ? "Please select return seats before continuing"
          : "Please select seats before continuing"
      );
    }

    const items = buildSeatHoldItems({
      assignments,
      fallbackCategoryId,
    });

    if (!items.length) {
      return rejectWithValue("Unable to prepare seat hold payload");
    }

    const sessionKey = resolveSessionKey();
    const holdRef = resolveHoldRef({
      sessionKey,
      couponCode: session?.coupon?.code,
      sailingId,
      leg,
    });

    try {
      const headers = {};
      if (sessionKey) {
        headers["session-key"] = sessionKey;
        headers["X-Session-Id"] = sessionKey;
      }

      const payload = {
        holdRef,
        sailingId,
        items,
      };

      const res = await apiRequest({
        url: "/booking/api/seat-hold/create",
        method: "POST",
        data: payload,
        // headers,
      });

      if (!res?.success || res?.data?.success === false) {
        return rejectWithValue(res?.message || res?.data?.message || "Seat hold failed");
      }

      return {
        leg,
        holdRef,
        sailingId,
        items,
        response: res?.data || res,
      };
    } catch (err) {
      return rejectWithValue(toErrorMessage(err, "Seat hold failed"));
    }
  }
);

/* ---------------- Fetch Return Date Slots ---------------- */

export const fetchReturnDateSlots = createAsyncThunk(
  "availabilitySession/fetchReturnDateSlots",
  async (date, { rejectWithValue }) => {
    try {
      const res = await apiGet(
        "/cruise/api/sailing-setup/sailing-details",
        { date }
      );
      return res?.data || { date, routes: [] };
    } catch {
      return rejectWithValue("Failed to load return slots");
    }
  }
);

/* ---------------- Create Round Trip Booking ---------------- */

export const createRoundTripBooking = createAsyncThunk(
  "availabilitySession/createRoundTripBooking",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const session = state.booking.availabilitySession;
    const bookingConfig = state.booking.bookingConfig?.items;


    try {
      // Step 1 — Departure
      const departurePayload = buildBookingPayload(session, bookingConfig);
      const departureRes = await apiPost("/booking/api/create", departurePayload);

      const parsedDeparture = parseCreateBookingResponse(
        departureRes,
        "Departure booking failed"
      );
      if (!parsedDeparture.ok) {
        return rejectWithValue(parsedDeparture.message);
      }

      const departureBooking = parsedDeparture.data;
      const parentBookingCode = departureBooking?.bookingCode;
      if (!parentBookingCode) {
        return rejectWithValue("Departure booking reference missing");
      }

      // Step 2 — Return (linked via parentBookingCode)
      const returnPayload = buildReturnPayload(session, parentBookingCode, bookingConfig);
      const returnRes = await apiPost("/booking/api/create", returnPayload);

      const parsedReturn = parseCreateBookingResponse(
        returnRes,
        "Return booking failed"
      );

      if (!parsedReturn.ok) {
        // Partial success: departure confirmed, return failed
        return {
          departureBooking,
          returnBooking: null,
          partialSuccess: true,
          returnError: parsedReturn.message,
        };
      }

      return {
        departureBooking,
        returnBooking: parsedReturn.data,
        partialSuccess: false,
      };
    } catch (err) {
      return rejectWithValue(toErrorMessage(err, "Booking failed"));
    }
  }
);