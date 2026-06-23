import { useMemo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReturnMonthCalendar,
} from "../../bookingCreationCalendarV2/bookingCalendarThunks";
import { fetchReturnDateSlots } from "../../availabilitySession/availabilityThunks";
import {
  setReturnDate,
} from "../../availabilitySession/availabilitySessionSlice";
import {
  selectSelectedDate,
  selectSelectedRouteId,
  selectSelectedSlot,
  selectSelectedRouteIsLongHaul,
  selectReturnSelectedDate,
} from "../../availabilitySession/availabilitySelectors";
import { selectActiveRoutesForAvailability } from "../../routes/routesSlice";
import { canGoToPrevMonth, getMonthMatrix } from "../../../../utils/calendarUtils";

const parseRouteEndpoints = (routeName) => {
  if (!routeName || typeof routeName !== "string") return [];
  return routeName
    .split(/\s*(?:<->|->|<-|–|—|→|↔|-)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const findReverseRoute = (routes = [], departureRouteName) => {
  const [from, to] = parseRouteEndpoints(departureRouteName);
  if (!from || !to) return null;

  return (
    routes.find((route) => {
      const parts = parseRouteEndpoints(route.routeName);
      return parts.length === 2 && parts[0] === to && parts[1] === from;
    }) ?? null
  );
};

export default function useReturnCalendar(enabled = true, source = "DATE_STEP") {
  const dispatch = useDispatch();

  const returnMonthStatusMap = useSelector(
    (state) => state.booking.bookingCalendar.returnMonthStatusMap
  );
  const loadingReturnMonth = useSelector(
    (state) => state.booking.bookingCalendar.loadingReturnMonth
  );

  const departureDate = useSelector(selectSelectedDate);
  const routes = useSelector(selectActiveRoutesForAvailability);
  const selectedRouteId = useSelector(selectSelectedRouteId);
  const departureSlot = useSelector(selectSelectedSlot);
  const isLongHaul = useSelector(selectSelectedRouteIsLongHaul);
  const selectedDate = useSelector(selectReturnSelectedDate);

  const departureRoute = useMemo(
    () => routes.find((route) => route.routeId === selectedRouteId) ?? null,
    [routes, selectedRouteId]
  );

  const inferredReturnRoute = useMemo(
    () => findReverseRoute(routes, departureRoute?.routeName),
    [routes, departureRoute?.routeName]
  );

  const [currentDate, setCurrentDate] = useState(
    () => new Date(departureDate || new Date())
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // ============================================
  // FETCH RETURN MONTH CALENDAR
  // ============================================
  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchReturnMonthCalendar({
      year,
      month,
      routeId: inferredReturnRoute?.routeId,
    }));
  }, [dispatch, year, month, enabled, inferredReturnRoute?.routeId]);

  // ============================================
  // STATUS MAP — disable all dates before departure
  // ============================================
  const filteredStatusMap = useMemo(() => {
    if (!departureDate) return returnMonthStatusMap;

    const result = { ...returnMonthStatusMap };
    Object.keys(result).forEach((dateKey) => {
      if (dateKey < departureDate) {
        result[dateKey] = "UNAVAILABLE";
      }

      // Long-haul outbound cannot book same-day return
      if (isLongHaul && departureDate && dateKey === departureDate) {
        result[dateKey] = "UNAVAILABLE";
      }
    });
    return result;
  }, [returnMonthStatusMap, departureDate, isLongHaul]);

  // ============================================
  // MATRIX
  // ============================================
  const matrix = useMemo(() => {
    return getMonthMatrix(year, month);
  }, [year, month]);

  // ============================================
  // DATE SELECT — validate then fetch return slots
  // ============================================
  const handleSelectDate = useCallback(
    (date) => {
      // Block dates before departure date
      if (departureDate && date < departureDate) return;

      // Long-haul outbound: same-day return is not allowed
      if (isLongHaul && departureDate && date === departureDate) return;

      // Same-day: block if return date is more than 0 days before departure (catch-all)
      if (date === departureDate && departureSlot?.arrivalTime) {
        // Slot-level 1-hour validation is handled inside DepartureSection (isReturn)
        // Calendar level only blocks dates before departure
      }

      dispatch(setReturnDate({ date, source }));
      dispatch(fetchReturnDateSlots(date));
    },
    [dispatch, departureDate, departureSlot, isLongHaul, source]
  );

  const monthLabel = useMemo(() => {
    return currentDate
      .toLocaleString("en-US", { month: "long", year: "numeric" })
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
    monthStatusMap: filteredStatusMap,
    loadingMonth: loadingReturnMonth,
    selectedDate,
    handleSelectDate,
    handlePrev,
    handleNext,
    showPrev,
  };
}
