import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMonthCalendar,
  fetchDateSlots,
  fetchReturnMonthCalendar,
} from "./bookingCalendarThunks";

const initialState = {
  currentMonth: null,
  returnCurrentMonth: null,
  monthStatusMap: {},
  returnMonthStatusMap: {},

  selectedDate: null,
  liveTill: null,

  // Only keep current slots
  slots: null,
  loadingSlots: false,
  slotsError: null,

  loadingMonth: false,
  monthError: null,

  loadingReturnMonth: false,
  returnMonthError: null,
};

const bookingCalendarSlice = createSlice({
  name: "booking/bookingCalendar",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    clearSelectedDate(state) {
      state.selectedDate = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===============================
      // MONTH
      // ===============================
      .addCase(fetchMonthCalendar.pending, (state) => {
        state.loadingMonth = true;
        state.monthError = null;
      })

      .addCase(fetchMonthCalendar.fulfilled, (state, action) => {
        state.loadingMonth = false;

        const { month, statusMap,liveTill } = action.payload;

        state.currentMonth = month;
        state.monthStatusMap = statusMap;
        state.liveTill=liveTill;
      })

      .addCase(fetchMonthCalendar.rejected, (state, action) => {
        state.loadingMonth = false;
        state.monthError =
          action.error?.message || "Failed to load month";
      })

      // ===============================
      // DATE SLOTS (NO CACHE)
      // ===============================
      .addCase(fetchDateSlots.pending, (state) => {
        state.loadingSlots = true;
        state.slotsError = null;
        state.slots = null;
      })

      .addCase(fetchDateSlots.fulfilled, (state, action) => {
        state.loadingSlots = false;
        state.slots = action.payload; // 🔥 Always override
      })

      .addCase(fetchDateSlots.rejected, (state, action) => {
        state.loadingSlots = false;
        state.slotsError =
          action.error?.message || "Failed to load slots";
      })

      // ===============================
      // RETURN MONTH
      // ===============================
      .addCase(fetchReturnMonthCalendar.pending, (state) => {
        state.loadingReturnMonth = true;
        state.returnMonthError = null;
      })

      .addCase(fetchReturnMonthCalendar.fulfilled, (state, action) => {
        state.loadingReturnMonth = false;
        state.returnCurrentMonth = `${action.payload.month}-${action.payload.routeId ?? "ALL"}`;
        state.returnMonthStatusMap = action.payload.statusMap;
      })

      .addCase(fetchReturnMonthCalendar.rejected, (state, action) => {
        state.loadingReturnMonth = false;
        state.returnMonthError =
          action.error?.message || "Failed to load return month";
      });
  },
});

export const {
  setSelectedDate,
  clearSelectedDate,
} = bookingCalendarSlice.actions;

export default bookingCalendarSlice.reducer;