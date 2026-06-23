import { useMemo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDateSlots,
  fetchMonthCalendar,
} from "../../../../features/booking/bookingCreationCalendarV2/bookingCalendarThunks";
import {
  clearSelectedDate,
  setSelectedDate,
} from "../../../../features/booking/bookingCreationCalendarV2/bookingCalendarSlice";
// import { getMonthMatrix } from "../../../../utils/calendarUtils";

export default function useCalendar() {
  const dispatch = useDispatch();

  const {
    monthStatusMap,
    selectedDate,
    loadingMonth,
    loadingSlots,
    monthError,
    slotsError,
    liveTill,
  } = useSelector((state) => state.booking.bookingCalendar);

  // Use today's date as the starting point
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // ===============================
  // TODAY REFERENCE (normalized)
  // ===============================
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const currentMonthStart = useMemo(() => {
    return new Date(year, month - 1, 1);
  }, [year, month]);

  const realMonthStart = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [today]);

  // Show previous button only if we're not in the current month or earlier
  const showPrev = currentMonthStart > realMonthStart;

  // ===============================
  // FETCH MONTH (ALWAYS FETCH)
  // ===============================
  useEffect(() => {
    dispatch(fetchMonthCalendar({ year, month }));
  }, [dispatch, year, month]);

  // ===============================
  // MONTH LABEL (Uppercase + Clean)
  // ===============================
  const monthLabel = useMemo(() => {
    return currentDate
      .toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  }, [currentDate]);

  // ===============================
  // MATRIX (with today flag)
  // ===============================
  const matrix = useMemo(() => {
    const rawMatrix = getMonthMatrix(year, month);

    // Enhance with isToday flag for easier cell logic
    return rawMatrix.map((day) => {
      if (!day.fullDate) return day;

      const dayDate = new Date(day.fullDate);
      dayDate.setHours(0, 0, 0, 0);

      return {
        ...day,
        isToday: dayDate.getTime() === today.getTime(),
      };
    });
  }, [year, month, today]);

  // ===============================
  // SELECT DATE (ALWAYS FETCH)
  // ===============================
  const selectDate = useCallback(
    (date) => {
      // Ensure date is in YYYY-MM-DD format
      dispatch(setSelectedDate(date));
      dispatch(fetchDateSlots(date)); // 🔥 always call
    },
    [dispatch]
  );

  // ===============================
  // CLEAR
  // ===============================
  const clearSelection = useCallback(() => {
    dispatch(clearSelectedDate());
  }, [dispatch]);

  // ===============================
  // NAVIGATION
  // ===============================
  const changeMonth = useCallback((offset) => {
    setCurrentDate((prev) => {
      const newDate = new Date(
        prev.getFullYear(),
        prev.getMonth() + offset,
        1
      );
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    });
  }, []);

  const handlePrev = useCallback(() => {
    if (showPrev) {
      changeMonth(-1);
    }
  }, [changeMonth, showPrev]);

  const handleNext = useCallback(() => {
    changeMonth(1);
  }, [changeMonth]);


  // ===============================
  // SCHEDULE LIVE TILL
  // ===============================
  const scheduleTillDate = useMemo(() => {
    if (!liveTill) return null;

    const date = new Date(liveTill);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [liveTill]);

  return {
    matrix,
    monthLabel,
    selectedDate,
    monthStatusMap,
    scheduleTillDate,

    // loading
    loadingMonth,
    loadingSlots,

    // errors
    monthError,
    slotsError,

    selectDate,
    clearSelection,
    handlePrev,
    handleNext,
    showPrev,
  };
}

// =============================================
// UTILS (getMonthMatrix - PERFECTED)
// =============================================
export const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];

  /* ===============================
     LEADING PADDING
  =============================== */
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({
      isPadding: true,
      isCurrentMonth: false,
      index: i,
    });
  }

  /* ===============================
     CURRENT MONTH DAYS
  =============================== */
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    days.push({
      day,
      fullDate,
      isPadding: false,
      isCurrentMonth: true,
    });
  }

  /* ===============================
     TRAILING PADDING
     Keep a stable 6-row calendar grid so every month
     preserves the same shell layout as April.
  =============================== */
  while (days.length < 42) {
    days.push({
      isPadding: true,
      isCurrentMonth: false,
      index: days.length,
    });
  }

  return days;
};

// =============================================
// UTILS (canGoToPrevMonth - PERFECTED)
// =============================================
export function canGoToPrevMonth(currentDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const realMonthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  return currentMonthStart > realMonthStart;
}




