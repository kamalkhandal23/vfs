/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { setSlot } from "../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
  selectRoutes,
  selectSelectedSlotId,
} from "../../../../features/booking/availabilitySession/availabilitySelectors";
import { Ship } from "lucide-react";
import { checkSlotExpired } from "../../../../utils/calendarUtils";
import SharedSlotsTable from "./shared/SharedSlotsTable";

export default function DateSlotsPanel({
  date,
  routeId,
  ferryFilter = "ALL",
  onClose,
  // Override props for return journey usage
  customRoutes,
  customSelectedSlotId,
  onSelectSlot,
  disableBeforeMinutes,
}) {
  const dispatch = useDispatch();

  const reduxRoutes = useSelector(selectRoutes);
  const reduxSelectedSlotId = useSelector(selectSelectedSlotId);

  // Use custom overrides when provided (return journey), otherwise fall back to Redux
  const routes = customRoutes ?? reduxRoutes;
  const selectedSlotId = customSelectedSlotId ?? reduxSelectedSlotId;
  const handleSelect = onSelectSlot ?? ((slotId) => dispatch(setSlot(slotId)));
  // ===============================
  // ACTIVE ROUTE
  // ===============================
  const activeRoute = routes.find((r) => r.routeId === routeId)
    || (routeId == null ? routes[0] : null);

  const filteredSailings = useMemo(() => {
    if (!activeRoute) return [];

    return [...activeRoute.sailings]
      .filter((slot) =>
        ferryFilter === "ALL"
          ? true
          : slot.ferry?.ferryName === ferryFilter
      )
      .sort((a, b) =>
        a.departureTime.localeCompare(b.departureTime)
      );
  }, [activeRoute, ferryFilter]);

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const d = new Date(date);
  const day = d.getDate();
  const month = d
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();
  const showSkeletonRows = !activeRoute && (routes?.length ?? 0) === 0;

  return (
    <div className="booking-card mt-6 overflow-hidden rounded-3xl">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between border-b border-[var(--booking-border)] bg-[var(--booking-surface-muted)] p-3 sm:p-4">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 flex-col items-center justify-center rounded-2xl bg-[var(--booking-primary)] p-2 font-bold text-white">
            <span className="text-sm  leading-none">
              {day}
            </span>
            <span className="text-[8px] tracking-wide leading-none">
              {month}
            </span>
          </div>

          <div>
            <h3 className="inline-flex items-center gap-2 text-base font-semibold text-[var(--booking-primary)]">
              <Ship size={15} className="text-[var(--booking-primary)]" />
              {activeRoute?.routeName}
            </h3>
            <p className="text-xs text-gray-500">
              Select a time slot to continue
            </p>
          </div>
        </div>

        {/* <p className="text-xs font-medium text-[#1b6983]">
          {availableSlotsCount} available
        </p> */}

        {typeof onClose === "function" && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        )}
      </div>

      <SharedSlotsTable
        slots={filteredSailings}
        selectedSlotId={selectedSlotId}
        onSelectSlot={handleSelect}
        variant="trip"
        disableBeforeMinutes={disableBeforeMinutes}
        isAdditionalDisabled={(slot) => checkSlotExpired(slot, date, currentMinutes)}
        showSkeleton={showSkeletonRows}
      />
    </div>
  );
}
