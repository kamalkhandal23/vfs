import { createSlice } from "@reduxjs/toolkit";
import {
  createBooking,
  createSeatHold,
  createRoundTripBooking,
  fetchReturnDateSlots,
  verifyCouponCode,
} from "./availabilityThunks";

const emptyReturnJourney = {
  date: null,
  routeId: null,
  slotId: null,
  categoryId: null,
  snapshot: null,
};

const parseRouteEndpoints = (routeName) => {
  if (!routeName || typeof routeName !== "string") return [];
  return routeName
    .split(/\s*(?:<->|->|<-|–|—|→|↔|-)\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
};

const normalizeCategoryFamily = (categoryName) => {
  const normalized = String(categoryName ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (normalized === "economy" || normalized.startsWith("economy_")) {
    return "economy";
  }

  return normalized;
};

const findReverseRoute = (routes = [], departureRouteName) => {
  const [from, to] = parseRouteEndpoints(departureRouteName);
  if (!from || !to) return null;

  return (
    routes.find((r) => {
      const parts = parseRouteEndpoints(r.routeName);
      return parts.length === 2 && parts[0] === to && parts[1] === from;
    }) ?? null
  );
};

const findFirstBookableSlot = (route) => {
  const sailings = route?.sailings ?? [];
  return sailings.find((s) => (s?.status || "").toUpperCase() === "AVAILABLE") || sailings[0] || null;
};

const resetSeatSelectionState = (state) => {
  state.seatAssignments = [];
  state.activeSeatPassengerIdx = 0;
  state.lockedSeatCategoryCode = null;
  state.returnSeatAssignments = [];
  state.activeReturnSeatPassengerIdx = 0;
  state.lockedReturnSeatCategoryCode = null;
};

const resetReturnSeatSelectionState = (state) => {
  state.returnSeatAssignments = [];
  state.activeReturnSeatPassengerIdx = 0;
  state.lockedReturnSeatCategoryCode = null;
};

const initialState = {
  journeyMode: "ONE_WAY", // "ONE_WAY" | "ROUND_TRIP"
  roundTripFlowSource: null,

  step: "trip", // route | date | trip | passengers | seats | confirm

  selectedDate: null,
  snapshot: null, // entire API data.data

  selectedRouteId: null,
  selectedSlotId: null,
  selectedCategoryId: null,
  selectedFerryId: null,

  returnJourney: { ...emptyReturnJourney },

  travellers: {
    passengers: 1,
    infants: 0,
    pets: 0,
  },

  seatAssignments: [], // [{ passengerIdx, seatId, rowLabel, colNum, categoryCode, categoryName, price, apiCategoryId, apiCategoryName }]
  activeSeatPassengerIdx: 0,
  lockedSeatCategoryCode: null,
  returnSeatAssignments: [],
  activeReturnSeatPassengerIdx: 0,
  lockedReturnSeatCategoryCode: null,
  confirmHoldExpiresAt: null,

  guestDetails: [],
  selectedVehicles: [], // [{ vehicleType, fare, quantity }]
  selectedCarEntries: [], // [{ id, brand, model, presetSize }]
  selectedAddons: [], // [{ id, name, price, quantity }]
  termsAccepted: false,
  guestValidationVisible: false,

  coupon: {
    code: null,
    discount: 0,
    loading: false,
    error: null,
    data: null,
  },

  pricing: {
    baseFare: 0,
    returnBaseFare: 0,
    vehicleFare: 0,
    addonFare: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
  },
  booking: {
    loading: false,
    success: false,
    partialSuccess: false,
    error: null,
    result: null,         // backward compat alias → departureResult
    departureResult: null,
    returnResult: null,
  },
  seatHold: {
    loading: false,
    success: false,
    error: null,
    result: null,
    leg: null,
  },
};

const availabilitySessionSlice = createSlice({
  name: "booking/availabilitySession",
  initialState,
  reducers: {
    // ============================================
    // START SESSION (CALLED FROM CALENDAR PAGE)
    // ============================================
    startSession(state, action) {
      const { snapshot, selectedRouteId, selectedSlotId } = action.payload;

      const route = snapshot?.routes?.find((r) => r.routeId === selectedRouteId);
      const slot = route?.sailings?.find((s) => s.slotId === selectedSlotId) || findFirstBookableSlot(route);
      const firstCategoryId = slot?.categories?.[0]?.categoryId ?? null;

      state.snapshot = snapshot;
      state.selectedDate = snapshot?.date;
      state.selectedRouteId = selectedRouteId;
      state.selectedSlotId = slot?.slotId ?? selectedSlotId ?? null;
      state.selectedCategoryId = firstCategoryId;
      state.selectedFerryId = slot?.ferry?.ferryId ?? null;
      state.selectedVehicles = [];
      state.selectedCarEntries = [];
      state.travellers = { passengers: 1, infants: 0, pets: 0 };
      state.step = "trip";
      state.journeyMode = "ONE_WAY";
      resetSeatSelectionState(state);


      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // JOURNEY MODE TOGGLE
    // ============================================
    setJourneyMode(state, action) {
      const payload = typeof action.payload === "string"
        ? { mode: action.payload }
        : (action.payload || {});
      const nextMode = payload.mode;

      state.journeyMode = nextMode;
      state.roundTripFlowSource = nextMode === "ROUND_TRIP"
        ? (payload.source ?? state.roundTripFlowSource ?? "DATE_STEP")
        : null;

      if (nextMode === "ONE_WAY") {
        state.returnJourney = { ...emptyReturnJourney };
        resetReturnSeatSelectionState(state);
        availabilitySessionSlice.caseReducers.recalculatePricing(state);
      }
    },

    setRoundTripFlowSource(state, action) {
      state.roundTripFlowSource = action.payload;
    },

    // ============================================
    // DATE CHANGE (DATE TAB)
    // ============================================
    setSessionDate(state, action) {
      state.selectedDate = action.payload;

      // Reset departure slot + return journey when departure date changes
      state.selectedSlotId = null;
      state.selectedCategoryId = null;
      state.selectedFerryId = null;
      state.selectedVehicles = [];
      state.selectedCarEntries = [];
      state.returnJourney = { ...emptyReturnJourney };
      state.guestDetails = [];
      resetSeatSelectionState(state);

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // UPDATE SNAPSHOT AFTER DATE FETCH
    // ============================================
    updateSessionSnapshot(state, action) {
      state.snapshot = action.payload;

      const route = state.snapshot?.routes?.find(
        (r) => r.routeId === state.selectedRouteId
      );

      const slot = route?.sailings?.find((s) => s.slotId === state.selectedSlotId)
        || findFirstBookableSlot(route);

      if (!state.selectedSlotId || !route?.sailings?.some((s) => s.slotId === state.selectedSlotId)) {
        state.selectedSlotId = slot?.slotId ?? null;
      }

      state.selectedFerryId = slot?.ferry?.ferryId ?? null;

      const availableCategoryIds = (slot?.categories || []).map((category) => category.categoryId);
      if (!state.selectedCategoryId || !availableCategoryIds.includes(state.selectedCategoryId)) {
        state.selectedCategoryId = slot?.categories?.[0]?.categoryId ?? null;
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // STEP NAVIGATION
    // ============================================
    setStep(state, action) {
      state.step = action.payload;
      if (action.payload !== "confirm") {
        state.confirmHoldExpiresAt = null;
      }
    },

    // ============================================
    // ROUTE CHANGE
    // ============================================
    setRoute(state, action) {
      state.selectedRouteId = action.payload;
      state.selectedSlotId = null;
      state.selectedCategoryId = null;
      state.selectedFerryId = null;
      state.selectedVehicles = [];
      state.selectedCarEntries = [];
      state.returnJourney = { ...emptyReturnJourney };
      resetSeatSelectionState(state);

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // SLOT CHANGE
    // ============================================
    setSlot(state, action) {
      state.selectedSlotId = action.payload;
      const route = state.snapshot?.routes?.find(
        (r) => r.routeId === state.selectedRouteId
      );
      const slot = route?.sailings?.find(
        (s) => s.slotId === action.payload
      );
      const firstCategoryId = slot?.categories?.[0]?.categoryId ?? null;

      state.selectedCategoryId = firstCategoryId;
      state.selectedFerryId = slot?.ferry?.ferryId ?? null;
      state.selectedVehicles = [];
      state.selectedCarEntries = [];
      state.returnJourney = { ...emptyReturnJourney };
      resetSeatSelectionState(state);

      if (["passengers", "seats"].includes(state.step)) {
        state.step = "trip";
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // CATEGORY CHANGE
    // ============================================
    setCategory(state, action) {
      state.selectedCategoryId = action.payload;

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // RETURN JOURNEY REDUCERS
    // ============================================
    setReturnDate(state, action) {
      const payload = typeof action.payload === "object" && action.payload !== null
        ? action.payload
        : { date: action.payload };

      state.returnJourney.date = payload.date;
      state.returnJourney.slotId = null;
      state.returnJourney.categoryId = null;
      state.returnJourney.snapshot = null;
      resetReturnSeatSelectionState(state);
      if (payload.source) {
        state.roundTripFlowSource = payload.source;
      }

      // Derive return routeId by reversing departure route name (separator-agnostic)
      const depRoute = state.snapshot?.routes?.find(
        (r) => r.routeId === state.selectedRouteId
      );

      const reverseRoute = findReverseRoute(
        state.snapshot?.routes ?? [],
        depRoute?.routeName
      );

      state.returnJourney.routeId = reverseRoute?.routeId ?? null;

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    setReturnSlot(state, action) {
      state.returnJourney.slotId = action.payload;
      resetReturnSeatSelectionState(state);

      const returnRoutes = state.returnJourney.snapshot?.routes ?? [];
      const returnRoute = returnRoutes.find(
        (r) => r.routeId === state.returnJourney.routeId
      );
      const returnSlot = returnRoute?.sailings?.find(
        (s) => s.slotId === action.payload
      );
      const returnCategories = returnSlot?.categories ?? [];

      const depRoute = state.snapshot?.routes?.find(
        (r) => r.routeId === state.selectedRouteId
      );
      const depSlot = depRoute?.sailings?.find(
        (s) => s.slotId === state.selectedSlotId
      );
      const depCategory = depSlot?.categories?.find(
        (c) => c.categoryId === state.selectedCategoryId
      );

      const depCategoryFamily = normalizeCategoryFamily(depCategory?.categoryName);

      const matchedReturnCategory = depCategory?.categoryName
        ? returnCategories.find((c) => {
          const returnCategoryFamily = normalizeCategoryFamily(c?.categoryName);
          return returnCategoryFamily === depCategoryFamily;
        })
        : null;

      state.returnJourney.categoryId =
        matchedReturnCategory?.categoryId
        ?? returnCategories?.[0]?.categoryId
        ?? null;

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    setReturnCategory(state, action) {
      state.returnJourney.categoryId = action.payload;
      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    setReturnSnapshot(state, action) {
      state.returnJourney.snapshot = action.payload;
      resetReturnSeatSelectionState(state);
    },

    // ============================================
    // TRAVELLERS UPDATE
    // ============================================
    updateTravellers(state, action) {
      const incomingTravellers = {
        ...state.travellers,
        ...action.payload,
      };

      const normalizeCount = (value, fallback = 0) => {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return fallback;
        return Math.max(0, Math.floor(parsed));
      };

      incomingTravellers.passengers = normalizeCount(incomingTravellers.passengers, 0);
      incomingTravellers.infants = normalizeCount(incomingTravellers.infants, 0);
      incomingTravellers.pets = normalizeCount(incomingTravellers.pets, 0);

      state.travellers = incomingTravellers;

      const activePassengerCount = state.travellers.passengers + (state.travellers.infants || 0);
      state.seatAssignments = state.seatAssignments.filter(
        (assignment) => assignment.passengerIdx < activePassengerCount
      );
      state.returnSeatAssignments = state.returnSeatAssignments.filter(
        (assignment) => assignment.passengerIdx < activePassengerCount
      );

      if (state.activeSeatPassengerIdx >= activePassengerCount) {
        state.activeSeatPassengerIdx = Math.max(0, activePassengerCount - 1);
      }
      if (state.activeReturnSeatPassengerIdx >= activePassengerCount) {
        state.activeReturnSeatPassengerIdx = Math.max(0, activePassengerCount - 1);
      }

      if (state.seatAssignments.length === 0) {
        state.lockedSeatCategoryCode = null;
      }
      if (state.returnSeatAssignments.length === 0) {
        state.lockedReturnSeatCategoryCode = null;
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    // ============================================
    // VEHICLE UPDATE
    // ============================================
    updateVehicle(state, action) {

      const { vehicleType, fare, quantity } = action.payload;
      const safeQuantity = Math.max(0, Math.floor(Number(quantity || 0)));

      const index = state.selectedVehicles.findIndex(
        (v) => v.vehicleType === vehicleType
      );

      if (index !== -1) {

        state.selectedVehicles[index].quantity = safeQuantity;

      } else {

        state.selectedVehicles.push({
          vehicleType,
          fare,
          quantity: safeQuantity,
        });

      }

      state.selectedVehicles = state.selectedVehicles.filter(
        (v) => v.quantity > 0
      );

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    setSelectedCarEntries(state, action) {
      const incomingEntries = Array.isArray(action.payload) ? action.payload : [];

      state.selectedCarEntries = incomingEntries.map((entry, index) => ({
        id: String(entry?.id ?? `car-row-${index + 1}`),
        brand: String(entry?.brand ?? ""),
        model: String(entry?.model ?? ""),
        presetSize: entry?.presetSize ? String(entry.presetSize).toUpperCase() : null,
      }));
    },

    // ============================================
    // ADDON UPDATE
    // ============================================
    // updateAddon(state, action) {

    //   const { id, name, price, quantity } = action.payload;
    //   const { slot } = getSelectedSlotContext(state);

    //   const safeQuantity = Math.max(0, Math.floor(Number(quantity || 0)));

    //   const index = state.selectedAddons.findIndex(
    //     (a) => a.id === id
    //   );

    //   if (index !== -1) {

    //     state.selectedAddons[index].quantity = safeQuantity;

    //   } else {

    //     state.selectedAddons.push({
    //       id,
    //       name,
    //       price,
    //       quantity: safeQuantity,
    //     });

    //   }

    //   state.selectedAddons = state.selectedAddons.filter(
    //     (a) => a.quantity > 0
    //   );

    //   availabilitySessionSlice.caseReducers.recalculatePricing(state);
    // },
    updateAddon(state, action) {
      const { id, name, price, quantity } = action.payload;

      const safeQuantity = Math.max(0, Math.floor(Number(quantity || 0)));

      const totalPassengers = Number(state.travellers?.passengers ?? 0);
      const totalTravellersForLimit = totalPassengers + Number(state.travellers?.infants ?? 0);

      // current total addons (excluding this one)
      const otherAddonsTotal = state.selectedAddons
        .filter((a) => a.id !== id)
        .reduce((sum, a) => sum + Number(a.quantity || 0), 0);

      // clamp value
      const allowedQuantity = Math.min(
        safeQuantity,
        Math.max(0, totalTravellersForLimit - otherAddonsTotal)
      );

      const index = state.selectedAddons.findIndex((a) => a.id === id);

      if (index !== -1) {
        state.selectedAddons[index].quantity = allowedQuantity;
      } else {
        state.selectedAddons.push({
          id,
          name,
          price,
          quantity: allowedQuantity,
        });
      }

      state.selectedAddons = state.selectedAddons.filter((a) => a.quantity > 0);

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },
    updateGuest(state, action) {
      const { index, field, value } = action.payload;

      if (!state.guestDetails[index]) {
        state.guestDetails[index] = {};
      }

      state.guestDetails[index][field] = value;
    },

    setGuestValidationVisible(state, action) {
      state.guestValidationVisible = action.payload;
    },

    assignSeatToPassenger(state, action) {
      const {
        passengerIdx,
        seatId,
        rowLabel,
        colNum,
        categoryCode,
        categoryName,
        price,
        apiCategoryId,
        apiCategoryName,
      } = action.payload;

      state.seatAssignments = state.seatAssignments.filter(
        (assignment) =>
          assignment.passengerIdx !== passengerIdx
          && !(assignment.seatId === seatId && assignment.categoryCode === categoryCode)
      );

      state.seatAssignments.push({
        passengerIdx,
        seatId,
        rowLabel,
        colNum,
        categoryCode,
        categoryName,
        price,
        apiCategoryId,
        apiCategoryName,
      });

      if (!state.lockedSeatCategoryCode) {
        state.lockedSeatCategoryCode = categoryCode;
      }

      const assignedPassengerSet = new Set(
        state.seatAssignments.map((assignment) => assignment.passengerIdx)
      );

      const nextUnassigned = Array.from(
        { length: state.travellers.passengers + (state.travellers.infants || 0) },
        (_, index) => index
      ).find((index) => !assignedPassengerSet.has(index));

      if (typeof nextUnassigned === "number") {
        state.activeSeatPassengerIdx = nextUnassigned;
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    assignReturnSeatToPassenger(state, action) {
      const {
        passengerIdx,
        seatId,
        rowLabel,
        colNum,
        categoryCode,
        categoryName,
        price,
        apiCategoryId,
        apiCategoryName,
      } = action.payload;

      state.returnSeatAssignments = state.returnSeatAssignments.filter(
        (assignment) =>
          assignment.passengerIdx !== passengerIdx
          && !(assignment.seatId === seatId && assignment.categoryCode === categoryCode)
      );

      state.returnSeatAssignments.push({
        passengerIdx,
        seatId,
        rowLabel,
        colNum,
        categoryCode,
        categoryName,
        price,
        apiCategoryId,
        apiCategoryName,
      });

      if (!state.lockedReturnSeatCategoryCode) {
        state.lockedReturnSeatCategoryCode = categoryCode;
      }

      const assignedPassengerSet = new Set(
        state.returnSeatAssignments.map((assignment) => assignment.passengerIdx)
      );

      const nextUnassigned = Array.from(
        { length: state.travellers.passengers + (state.travellers.infants || 0) },
        (_, index) => index
      ).find((index) => !assignedPassengerSet.has(index));

      if (typeof nextUnassigned === "number") {
        state.activeReturnSeatPassengerIdx = nextUnassigned;
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    unassignSeat(state, action) {
      const { passengerIdx } = action.payload;

      state.seatAssignments = state.seatAssignments.filter(
        (assignment) => assignment.passengerIdx !== passengerIdx
      );

      state.activeSeatPassengerIdx = passengerIdx;

      if (state.seatAssignments.length === 0) {
        state.lockedSeatCategoryCode = null;
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    unassignReturnSeat(state, action) {
      const { passengerIdx } = action.payload;

      state.returnSeatAssignments = state.returnSeatAssignments.filter(
        (assignment) => assignment.passengerIdx !== passengerIdx
      );

      state.activeReturnSeatPassengerIdx = passengerIdx;

      if (state.returnSeatAssignments.length === 0) {
        state.lockedReturnSeatCategoryCode = null;
      }

      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    setActiveSeatPassenger(state, action) {
      state.activeSeatPassengerIdx = action.payload;
    },

    setActiveReturnSeatPassenger(state, action) {
      state.activeReturnSeatPassengerIdx = action.payload;
    },

    switchSeatClass(state, action) {
      state.seatAssignments = [];
      state.activeSeatPassengerIdx = 0;
      state.lockedSeatCategoryCode = action.payload;
      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    switchReturnSeatClass(state, action) {
      state.returnSeatAssignments = [];
      state.activeReturnSeatPassengerIdx = 0;
      state.lockedReturnSeatCategoryCode = action.payload;
      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    resetAllSeats(state) {
      resetSeatSelectionState(state);
      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    startConfirmHoldTimer(state, action) {
      const durationMs = Number(action.payload || 5 * 60 * 1000);
      state.confirmHoldExpiresAt = Date.now() + durationMs;
    },

    clearConfirmHoldTimer(state) {
      state.confirmHoldExpiresAt = null;
    },

    toggleTerms(state, action) {
      state.termsAccepted = action.payload;
    },
    // ============================================
    // PRICING CALCULATION
    // ============================================
    recalculatePricing(state) {

      const snapshot = state.snapshot;
      if (!snapshot) return;

      const route = snapshot.routes?.find(
        (r) => r.routeId === state.selectedRouteId
      );

      const slot = route?.sailings?.find(
        (s) => s.slotId === state.selectedSlotId
      );

      const category = slot?.categories?.find(
        (c) => c.categoryId === state.selectedCategoryId
      );

      const seatCount = state.travellers.passengers + (state.travellers.infants || 0);
      const infantFare = state.config?.booking?.infantFare || 200;
      const infants = state.travellers.infants || 0;
      const infantTotal = infants * infantFare;
      const selectedCategoryFare = Number(category?.fare ?? 0);
      const assignedSeatTotal = (state.seatAssignments || []).reduce(
        (sum, assignment) => sum + Number(assignment?.price ?? selectedCategoryFare),
        0
      );
      const unassignedSeatCount = Math.max(0, seatCount - (state.seatAssignments?.length || 0));
      const baseFare = assignedSeatTotal + (unassignedSeatCount * selectedCategoryFare);

      const vehicleFare = state.selectedVehicles.reduce(
        (sum, v) => sum + v.fare * v.quantity,
        0
      );

      const addonFare = state.selectedAddons.reduce(
        (sum, a) => sum + a.price * a.quantity,
        0
      );

      // Return base fare (only when ROUND_TRIP and return category selected)
      let returnBaseFare = 0;
      if (state.journeyMode === "ROUND_TRIP") {
        const rj = state.returnJourney;
        const returnRoute = rj.snapshot?.routes?.find(
          (r) => r.routeId === rj.routeId
        );
        const returnSlot = returnRoute?.sailings?.find(
          (s) => s.slotId === rj.slotId
        );
        const returnCategory = returnSlot?.categories?.find(
          (c) => c.categoryId === rj.categoryId
        );
        const selectedReturnFare = Number(returnCategory?.fare ?? 0);
        const assignedReturnSeatTotal = (state.returnSeatAssignments || []).reduce(
          (sum, assignment) => sum + Number(assignment?.price ?? selectedReturnFare),
          0
        );
        const unassignedReturnSeatCount = Math.max(0, seatCount - (state.returnSeatAssignments?.length || 0));
        returnBaseFare = assignedReturnSeatTotal + (unassignedReturnSeatCount * selectedReturnFare);
      }

      const isRoundTrip = state.journeyMode === "ROUND_TRIP";

      const totalInfantFare = isRoundTrip
        ? infantTotal * 2
        : infantTotal;

      const totalVehicleFare = isRoundTrip
        ? vehicleFare * 2
        : vehicleFare;

      const totalAddonFare = isRoundTrip
        ? addonFare * 2
        : addonFare;

      const subtotal =
        baseFare +
        returnBaseFare +
        vehicleFare +
        addonFare +
        totalInfantFare;

      // determine discount amount based on coupon details
      let discountAmount = 0;
      const cd = state.coupon.data;
      if (cd) {
        if (cd.type === "PERCENTAGE") {
          discountAmount = Math.floor((cd.discountValue / 100) * subtotal);
        } else {
          // FIXED_AMOUNT or other types treated as absolute
          discountAmount = cd.discountValue || 0;
        }
      } else {
        // fallback to stored discount value for older data
        discountAmount = state.coupon.discount || 0;
      }

      state.coupon.discount = discountAmount;

      state.pricing = {
        baseFare,
        returnBaseFare,
        infantFare: infantTotal,
        vehicleFare: totalVehicleFare,   // 🔥 updated
        addonFare: totalAddonFare,       // 🔥 updated
        subtotal,
        discount: discountAmount,
        total: subtotal - discountAmount,
      };
    },

    // ============================================
    // COUPON HANDLERS
    // ============================================
    clearCoupon(state) {
      state.coupon = { code: null, discount: 0, loading: false, error: null, data: null };
      availabilitySessionSlice.caseReducers.recalculatePricing(state);
    },

    resetBookingFlowState(state) {
      state.booking = {
        loading: false,
        success: false,
        partialSuccess: false,
        error: null,
        result: null,
        departureResult: null,
        returnResult: null,
      };
      state.seatHold = {
        loading: false,
        success: false,
        error: null,
        result: null,
        leg: null,
      };
      state.guestValidationVisible = false;
      state.confirmHoldExpiresAt = null;
      resetSeatSelectionState(state);
    },

    // ============================================
    // CLEAR SESSION
    // ============================================
    clearSession() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(verifyCouponCode.pending, (state) => {
        state.coupon.loading = true;
        state.coupon.error = null;
      })

      .addCase(verifyCouponCode.fulfilled, (state, action) => {
        state.coupon.loading = false;
        state.coupon.code = action.meta.arg;
        // API returns full object with discountValue property
        state.coupon.discount = action.payload?.discountValue || 0;
        state.coupon.data = action.payload; // keep entire payload if needed
      })

      .addCase(verifyCouponCode.rejected, (state, action) => {
        state.coupon.loading = false;
        state.coupon.error = action.payload;
      })

      .addCase(createSeatHold.pending, (state, action) => {
        state.seatHold.loading = true;
        state.seatHold.success = false;
        state.seatHold.error = null;
        state.seatHold.result = null;
        state.seatHold.leg = action.meta.arg?.leg || "departure";
      })

      .addCase(createSeatHold.fulfilled, (state, action) => {
        state.seatHold.loading = false;
        state.seatHold.success = true;
        state.seatHold.error = null;
        state.seatHold.result = action.payload;
        state.seatHold.leg = action.payload?.leg || action.meta.arg?.leg || "departure";
      })

      .addCase(createSeatHold.rejected, (state, action) => {
        state.seatHold.loading = false;
        state.seatHold.success = false;
        state.seatHold.error = action.payload || action.error?.message || "Seat hold failed";
        state.seatHold.result = null;
        state.seatHold.leg = action.meta.arg?.leg || "departure";
      })

      .addCase(createBooking.pending, (state) => {
        state.booking.loading = true;
        state.booking.success = false;
        state.booking.partialSuccess = false;
        state.booking.error = null;
        state.booking.result = null;
        state.booking.departureResult = null;
        state.booking.returnResult = null;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.booking.loading = false;
        state.booking.success = true;
        state.booking.result = action.payload;
        state.booking.departureResult = action.payload;
        state.confirmHoldExpiresAt = null;
      })

      .addCase(createBooking.rejected, (state, action) => {
        state.booking.loading = false;
        state.booking.success = false;
        state.booking.partialSuccess = false;
        state.booking.error = action.payload;
        state.booking.result = null;
        state.booking.departureResult = null;
        state.booking.returnResult = null;
      })

      // ---- Round Trip Booking ----
      .addCase(createRoundTripBooking.pending, (state) => {
        state.booking.loading = true;
        state.booking.success = false;
        state.booking.error = null;
        state.booking.partialSuccess = false;
        state.booking.result = null;
        state.booking.departureResult = null;
        state.booking.returnResult = null;
      })

      .addCase(createRoundTripBooking.fulfilled, (state, action) => {
        state.booking.loading = false;
        state.booking.success = true;
        state.booking.departureResult = action.payload.departureBooking;
        state.booking.result = action.payload.departureBooking; // backward compat
        state.booking.returnResult = action.payload.returnBooking;
        state.confirmHoldExpiresAt = null;
        if (action.payload.partialSuccess) {
          state.booking.partialSuccess = true;
          state.booking.error = action.payload.returnError;
        }
      })

      .addCase(createRoundTripBooking.rejected, (state, action) => {
        state.booking.loading = false;
        state.booking.success = false;
        state.booking.partialSuccess = false;
        state.booking.error = action.payload;
        state.booking.result = null;
        state.booking.departureResult = null;
        state.booking.returnResult = null;
      })

      // ---- Fetch Return Date Slots ----
      .addCase(fetchReturnDateSlots.fulfilled, (state, action) => {
        state.returnJourney.snapshot = action.payload;

        const depRoute = state.snapshot?.routes?.find(
          (r) => r.routeId === state.selectedRouteId
        );
        const returnRoutes = action.payload?.routes ?? [];

        // Always resolve routeId from the return snapshot (it has the actual data)
        const reverseRoute = findReverseRoute(returnRoutes, depRoute?.routeName);
        if (reverseRoute) {
          state.returnJourney.routeId = reverseRoute.routeId;
        } else {
          state.returnJourney.routeId = null;
        }

        availabilitySessionSlice.caseReducers.recalculatePricing(state);
      });
  }
});

export const {
  startSession,
  setSessionDate,
  updateSessionSnapshot,
  setStep,
  setRoute,
  setSlot,
  setCategory,
  setJourneyMode,
  setRoundTripFlowSource,
  setReturnDate,
  setReturnSlot,
  setReturnCategory,
  setReturnSnapshot,
  updateTravellers,
  updateVehicle,
  setSelectedCarEntries,
  updateAddon,
  updateGuest,
  setGuestValidationVisible,
  assignSeatToPassenger,
  assignReturnSeatToPassenger,
  unassignSeat,
  unassignReturnSeat,
  setActiveSeatPassenger,
  setActiveReturnSeatPassenger,
  switchSeatClass,
  switchReturnSeatClass,
  resetAllSeats,
  startConfirmHoldTimer,
  clearConfirmHoldTimer,
  toggleTerms,
  recalculatePricing,
  clearCoupon,
  resetBookingFlowState,
  clearSession,
} = availabilitySessionSlice.actions;

export default availabilitySessionSlice.reducer;
