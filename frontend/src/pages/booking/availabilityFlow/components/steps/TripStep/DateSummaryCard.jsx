/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { ArrowLeftRight } from "lucide-react";
import {
  selectBookingSummary,
  selectSelectedDate,
  selectIsRoundTrip,
  selectReturnSelectedDate,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import { formatTime } from "../../../../../../utils/DateUtils";
import { smartFormat } from "../../../../../../utils/string";

const formatDateParts = (value) => {
  if (!value) {
    return {
      day: "--",
      month: "--",
      weekday: "--",
    };
  }

  const parsed = new Date(value);
  return {
    day: parsed.getDate(),
    month: parsed.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    weekday: parsed.toLocaleString("en-US", { weekday: "short" }),
  };
};

const JourneySummaryCard = ({
  day,
  month,
  weekday,
  date,
  journey,
  modeLabel,
  muted = false,
}) => {
  const routeLabel = `${smartFormat(journey?.from || "--", "upper")} → ${smartFormat(journey?.to || "--", "upper")}`;
  const timeLabel = `${formatTime(journey?.departureTime) || "--"} → ${formatTime(journey?.arrivalTime) || "--"}`;

  return (
    <div className={`rounded-[20px] flex-1 border border-[var(--booking-border)] px-4 py-4 sm:px-5 sm:py-5 ${muted ? "bg-white" : "bg-[var(--booking-secondary)]"}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl shadow-[0_3px_8px_rgba(15,45,58,0.2)] sm:h-16 sm:w-16 ${muted ? "bg-[#eef3f9] text-[var(--booking-primary)]" : "bg-[var(--booking-primary)] text-white"}`}>
          <span className="text-[1.95rem] font-bold leading-none sm:text-[2.2rem]">{day}</span>
          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.08em] sm:text-[10px]">{month}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[clamp(1.25rem,1.55vw,1.8rem)] font-bold leading-tight tracking-tight text-[#071c3d]">
            {weekday}, {date || "--"}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[clamp(0.82rem,0.95vw,1.05rem)] text-[#64748b]">
            <span className="font-semibold text-[#071c3d]">{routeLabel}</span>
            {modeLabel ? <span>• {modeLabel}</span> : null}
            <span>•</span>
            <span className="font-semibold text-[#071c3d]">{timeLabel}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

const DateSummaryCard = () => {
  const summary = useSelector(selectBookingSummary);
  const selectedDate = useSelector(selectSelectedDate);
  const returnSelectedDate = useSelector(selectReturnSelectedDate);
  const isRoundTrip = useSelector(selectIsRoundTrip);
  const hasReturn = isRoundTrip && returnSelectedDate;

  const { journey, returnJourney } = summary || {};

  const departure = formatDateParts(selectedDate);
  const returnDate = formatDateParts(returnSelectedDate);

  if (isRoundTrip && !returnSelectedDate) {
    return (
      <div className="booking-card flex items-center gap-2 rounded-3xl bg-white p-3">
        <JourneySummaryCard
          day={departure.day}
          month={departure.month}
          weekday={departure.weekday}
          date={summary?.date}
          journey={journey}
        />

        <div className="flex justify-center text-[#93a4b7]">
          <ArrowLeftRight size={24} />
        </div>

        {/* 🔥 Clean Empty State */}
        <div className="flex flex-1 items-center justify-center rounded-[20px] border border-dashed border-[var(--booking-border)] bg-[var(--booking-surface-muted)] px-4 py-6 text-center">
          <div>
            <p className="text-sm font-semibold text-[#071c3d]">
              No return selected
            </p>
            <p className="text-xs text-[#64748b] mt-1">
              Please choose a return trip
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (hasReturn) {
    return (
      <div className="booking-card flex items-center gap-2 rounded-3xl bg-white p-3">
        <JourneySummaryCard
          day={departure.day}
          month={departure.month}
          weekday={departure.weekday}
          date={summary?.date}
          journey={journey}
        // modeLabel="Round Trip"
        />

        <div className="flex justify-center text-[#93a4b7]">
          <ArrowLeftRight size={24} />
        </div>

        <JourneySummaryCard
          day={returnDate.day}
          month={returnDate.month}
          weekday={returnDate.weekday}
          date={summary?.returnDate}
          journey={returnJourney}
          muted
        />
      </div>
    );
  }

  return (
    <JourneySummaryCard
      day={departure.day}
      month={departure.month}
      weekday={departure.weekday}
      date={summary?.date}
      journey={journey}
      modeLabel={summary?.journeyMode === "ROUND_TRIP" ? "Round Trip" : "One Way"}
    />
  );
};

export default DateSummaryCard;
