import { useSelector } from "react-redux";
import SelectionCard from "./SelectionCard";
import AnnouncementCard from "./AnnouncementCard";
import BulkBookingCard from "./BulkBookingCard";
import {
  selectBookingSummary,
  selectTravellers,
} from "../../../../../features/booking/availabilitySession/availabilitySelectors";

const LeftPanel = ({ compact = false }) => {
  const summary = useSelector(selectBookingSummary);
  const travellers = useSelector(selectTravellers);

  const routeLabel =
    summary?.journey?.from && summary?.journey?.to
      ? `${summary.journey.from.toUpperCase()} -> ${summary.journey.to.toUpperCase()}`
      : "Route not selected";

  const timeLabel =
    summary?.journey?.departureTime && summary?.journey?.arrivalTime
      ? `${summary.journey.departureTime} -> ${summary.journey.arrivalTime}`
      : "Time not selected";

  const ferryLabel = summary?.ferryName || "Ferry not selected";
  const totalLabel = `Rs ${summary?.total || 0}`;

  if (compact) {
    return (
      <div className="booking-card w-full rounded-xl px-3 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-[12px] text-[#94a3b8]">
            <div className="font-semibold text-[var(--booking-primary)] truncate">{routeLabel}</div>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{summary?.date || "Date not selected"}</span>
              <span className="text-[#94a3b8]">|</span>
              <span>{timeLabel}</span>
              <span className="text-[#94a3b8]">|</span>
              <span className="truncate max-w-[140px]">{ferryLabel}</span>
              <span className="text-[#94a3b8]">|</span>
              <span>{summary?.totalPassengers ?? ((travellers?.passengers || 0) + (travellers?.infants || 0))} Pax</span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-[11px] text-[#94a3b8] uppercase tracking-wide">Total</div>
            <div className="text-[20px] leading-6 font-semibold text-[var(--booking-primary)]">{totalLabel}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-scroll h-full min-h-0 w-[360px] overflow-y-auto px-4 py-5 space-y-5 lg:px-5">
      <SelectionCard />
      <AnnouncementCard />
      <BulkBookingCard />
    </div>
  );
};

export default LeftPanel;
