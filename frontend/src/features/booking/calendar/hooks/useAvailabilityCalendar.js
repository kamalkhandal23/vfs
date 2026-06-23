import { useMemo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDateSlots, fetchMonthCalendar } from "../../bookingCreationCalendarV2/bookingCalendarThunks";
import { setSessionDate, updateSessionSnapshot } from "../../availabilitySession/availabilitySessionSlice";
import { canGoToPrevMonth, getMonthMatrix } from "../../../../utils/calendarUtils";

export default function useAvailabilityCalendar() {
  const dispatch = useDispatch();

  const {
    monthStatusMap,
    slots,
    loadingMonth,
  } = useSelector((state) => state.booking.bookingCalendar);

  const selectedDate = useSelector(
    (state) => state.booking.availabilitySession.selectedDate
  );

  const [currentDate, setCurrentDate] = useState(
    () => new Date(selectedDate || new Date())
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // ============================================
  // ALWAYS FETCH MONTH
  // ============================================
  useEffect(() => {
    dispatch(fetchMonthCalendar({ year, month }));
  }, [dispatch, year, month]);

  // ============================================
  // MATRIX
  // ============================================
  const matrix = useMemo(() => {
    return getMonthMatrix(year, month);
  }, [year, month]);

  // ============================================
  // DATE SELECT HANDLER (ALWAYS FETCH)
  // ============================================
  const handleSelectDate = useCallback(
    (date) => {
      dispatch(setSessionDate(date));
      dispatch(fetchDateSlots(date)); // 🔥 always fetch
    },
    [dispatch]
  );

  // ============================================
  // UPDATE SNAPSHOT WHEN SLOTS CHANGE
  // ============================================
  useEffect(() => {
    if (!selectedDate || !slots) return;

    dispatch(updateSessionSnapshot(slots));
  }, [slots, selectedDate, dispatch]);

  const monthLabel = useMemo(() => {
    return currentDate
      .toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  }, [currentDate]);

  const showPrev = canGoToPrevMonth(currentDate);

  // ============================================
  // NAVIGATION
  // ============================================
  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  return {
    monthLabel,
    matrix,
    monthStatusMap,
    loadingMonth,
    selectedDate,
    handleSelectDate,
    handlePrev,
    handleNext,
    showPrev,
  };
}