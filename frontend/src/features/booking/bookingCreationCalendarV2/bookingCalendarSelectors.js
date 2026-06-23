import { createSelector } from "@reduxjs/toolkit";

// export const selectMonthStatusMap = (state) =>
//   state.bookingCalendar.monthStatusMap;

// export const selectSelectedDate = (state) =>
//   state.bookingCalendar.selectedDate;

// export const selectMonthLoading = (state) =>
//   state.bookingCalendar.loadingMonth;

export const selectFormattedLiveTill = createSelector(
  (state) => state.booking.bookingCalendar.liveTill,
  (date) => {
    if (!date) return null;

    const d = new Date(date);

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
);