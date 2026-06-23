import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../../utils/api";

// ===============================
// MONTH CALENDAR (Always Fetch)
// ===============================
export const fetchMonthCalendar = createAsyncThunk(
  "bookingCalendar/fetchMonthCalendar",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const formattedMonth = String(month).padStart(2, "0");

      const response = await apiGet(
        "/cruise/api/sailing-setup/booking-month",
        {
          month: formattedMonth,
          year,
        }
      );

      const calendarIndex = response?.data?.calendarIndex || {};

      const statusMap = {};
      Object.keys(calendarIndex).forEach((date) => {
        statusMap[date] = calendarIndex[date].status;
      });

      return {
        month: `${year}-${formattedMonth}`,
        statusMap,
        liveTill: response.data.liveTill,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: ({ year, month }, { getState }) => {
      const state = getState().booking?.bookingCalendar;
      if (!state) return true;

      const formattedMonth = String(month).padStart(2, "0");
      const requestedMonth = `${year}-${formattedMonth}`;

      // Skip duplicate fetches for same month (including React dev double-mount)
      if (state.loadingMonth) return false;
      if (state.currentMonth === requestedMonth) return false;

      return true;
    },
  }
);

// ===============================
// RETURN MONTH CALENDAR
// ===============================
export const fetchReturnMonthCalendar = createAsyncThunk(
  "bookingCalendar/fetchReturnMonthCalendar",
  async ({ year, month, routeId }, { rejectWithValue }) => {
    try {
      const formattedMonth = String(month).padStart(2, "0");

      const response = await apiGet(
        "/cruise/api/sailing-setup/booking-month",
        {
          month: formattedMonth,
          year,
          ...(routeId ? { routeId } : {}),
        }
      );

      const calendarIndex = response?.data?.calendarIndex || {};

      const statusMap = {};
      Object.keys(calendarIndex).forEach((date) => {
        statusMap[date] = calendarIndex[date].status;
      });

      return {
        month: `${year}-${formattedMonth}`,
        routeId: routeId ?? null,
        statusMap,
        liveTill: response.data.liveTill,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: ({ year, month, routeId }, { getState }) => {
      const state = getState().booking?.bookingCalendar;
      if (!state) return true;

      const formattedMonth = String(month).padStart(2, "0");
      const requestedMonth = `${year}-${formattedMonth}-${routeId ?? "ALL"}`;

      if (state.loadingReturnMonth) return false;
      if (state.returnCurrentMonth === requestedMonth) return false;

      return true;
    },
  }
);

// ===============================
// DATE SLOTS (Always Fetch)
// ===============================
export const fetchDateSlots = createAsyncThunk(
  "bookingCalendar/fetchDateSlots",
  async (date, { rejectWithValue }) => {
    try {
      const response = await apiGet(
        "/cruise/api/sailing-setup/sailing-details",
        { date }
      );

      return response?.data || { date, routes: [] };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
