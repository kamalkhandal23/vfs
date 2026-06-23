import React from "react";
import { useSelector } from "react-redux";
import { Megaphone, AlertTriangle } from "lucide-react";

import {
  selectStep,
} from "../../../../../features/booking/availabilitySession/availabilitySelectors";
import { selectFormattedLiveTill } from "../../../../../features/booking/bookingCreationCalendarV2/bookingCalendarSelectors";

const AnnouncementCard = () => {
  const currentStep = useSelector(selectStep);
  const liveTill = useSelector(selectFormattedLiveTill);

  const showLegend = currentStep === "date";

  return (
    <div className="booking-card overflow-hidden rounded-2xl">

      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--booking-border)] bg-[var(--booking-secondary)] px-5 py-4">
        <Megaphone size={14} className="text-[var(--booking-primary)]" />
        <h3 className="booking-section-label">
          Announcements
        </h3>
      </div>

      <div className="px-5 py-4 space-y-4">

        {/* Legend */}
        {showLegend && (
          <div className="flex flex-wrap gap-4 text-[11px] sm:text-[12px]">
            <LegendDot color="bg-green-500" label="Available" />
            <LegendDot color="bg-orange-500" label="Filling Fast" />
            <LegendDot color="bg-red-500" label="Booked" />
            <LegendDot color="bg-gray-300" label="Not Available" />
          </div>
        )}

        {/* Schedule */}
        {liveTill && (
          <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[#334155]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#0f2d3a] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0f2d3a]" />
            </span>
            Schedule live till {liveTill}
          </div>
        )}

        {/* Notice */}
        <div className="flex gap-3 rounded-xl border border-[var(--booking-border)] bg-white p-3 text-[11px] sm:text-[12px]">
          <Megaphone className="text-[#475569] mt-[2px]" />
          <div>
            <span className="font-medium text-[#0f172a]">
              Vijaydurg service coming soon —
            </span>
            <span className="text-[#64748b]">
              {" "}subject to final approvals.
            </span>
          </div>
        </div>

        {/* Warning */}
        <div className="flex gap-3 rounded-xl border border-orange-300 bg-orange-50 p-3 text-[11px] sm:text-[12px]">
          <AlertTriangle className="text-orange-500 mt-[2px]" />
          <div>
            <span className="text-red-500 font-medium">
              e-scooters not permitted
            </span>{" "}
            onboard M2M Ferries.
          </div>
        </div>

      </div>
    </div>
  );
};

const LegendDot = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-[#334155]">{label}</span>
  </div>
);

export default AnnouncementCard;
