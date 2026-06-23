import React, { memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const STATUS_LEGEND_COLORS = {
  AVAILABLE: "bg-green-500",
  FILLING_FAST: "bg-amber-500",
  BOOKED: "bg-red-500",
  NOT_AVAILABLE: "bg-gray-300",
  UNAVAILABLE: "bg-gray-300",
};

const STATUS_CELL_STYLES = {
  AVAILABLE: "border border-transparent bg-green-50/90 text-green-700 hover:border-green-400 hover:bg-green-100",
  FILLING_FAST: "border border-transparent bg-amber-50/90 text-amber-700 hover:border-amber-400 hover:bg-amber-100",
  BOOKED: "border border-transparent bg-red-50/90 text-red-600",
  NOT_AVAILABLE: "border border-transparent bg-gray-50/90 text-gray-400",
  UNAVAILABLE: "border border-transparent bg-gray-50/90 text-gray-400",
};

const STATUS_LABELS = {
  AVAILABLE: "Available",
  FILLING_FAST: "Filling Fast",
  BOOKED: "Booked",
  NOT_AVAILABLE: "Not Available",
};

export default function CalendarCore({
  monthLabel,
  matrix,
  statusMap,
  selectedDate,
  onSelectDate,
  onPrev,
  onNext,
  showPrev,
  loading,
  showLegends = true,
}) {
  return (
    <div className="w-full border border-gray-200 rounded-2xl bg-white overflow-hidden">
      <CalendarHeader
        monthLabel={monthLabel}
        onPrev={onPrev}
        onNext={onNext}
        showPrev={showPrev}
      />

      <WeekStrip />

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <>
          <CalendarGrid
            matrix={matrix}
            selectedDate={selectedDate}
            statusMap={statusMap}
            onSelect={onSelectDate}
          />
          {showLegends && <Legend />}
        </>
      )}
    </div>
  );
}

function CalendarHeader({ monthLabel, onPrev, onNext, showPrev }) {
  return (
    <div className="flex items-center justify-center gap-6 py-5">
      {showPrev ? (
        <motion.button
          onClick={onPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 shadow-sm transition-all hover:bg-gray-100"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </motion.button>
      ) : (
        <div className="h-10 w-10" />
      )}

      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
        {monthLabel}
      </h2>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 shadow-sm transition-all hover:bg-gray-100"
      >
        <ChevronRight size={18} className="text-gray-700" />
      </motion.button>
    </div>
  );
}

const WeekStrip = memo(() => (
  <div className="grid grid-cols-7 bg-gray-100 rounded-xl mx-4 py-3 mb-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">
    {WEEK_DAYS.map((day) => (
      <div key={day} className="text-center">
        {day}
      </div>
    ))}
  </div>
));

const CalendarGrid = memo(({ matrix, selectedDate, statusMap, onSelect }) => {
  return (
    <div className="px-4 pb-4 grid grid-cols-7 auto-rows-fr gap-2 min-h-[430px]">
      {matrix.map((day, index) => (
        <CalendarCell
          key={day.fullDate || `pad-${index}`}
          day={day}
          status={statusMap?.[day.fullDate]}
          isSelected={selectedDate === day.fullDate}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});

function CalendarCell({ day, status, isSelected, onSelect }) {
  if (day.isPadding) return <div className="rounded-md bg-gray-50" />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toLocaleDateString("en-CA");

  const isToday = day.fullDate === todayStr;
  const isPast = new Date(day.fullDate) < today;
  const disabled = isPast || status === "NOT_AVAILABLE" || status === "BOOKED" || status === "UNAVAILABLE";
  const statusStyle = STATUS_CELL_STYLES[status] || "bg-gray-50 text-gray-500";

  return (
    <div
      onClick={() => !disabled && onSelect(day.fullDate)}
      className={[
        "relative flex min-h-[82px] flex-col items-center justify-center rounded-md transition-all duration-150 ease-out transform-gpu",
        statusStyle,
        isSelected ? "z-10 shadow-sm ring-2 ring-[var(--booking-primary)] ring-offset-1" : "",
        isToday ? "ring-1 ring-gray-300" : "",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:scale-[1.03] hover:shadow-md",
      ].join(" ")}
    >
      <span className="text-2xl font-bold">{day.day}</span>
      {isToday && (
        <span className="mt-1 text-[9px] font-medium uppercase text-gray-500">
          Today
        </span>
      )}
    </div>
  );
}

function CalendarSkeleton() {
  return (
    <div className="px-4 pb-4">
      <div className="grid grid-cols-7 gap-2 min-h-[430px]">
        {Array.from({ length: 42 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.02 }}
            className="relative rounded-md bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 border border-gray-100 overflow-hidden min-h-[82px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] animate-[shimmer_1.6s_infinite]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex gap-4 text-xs text-gray-600 px-4 pb-4">
      {Object.entries(STATUS_LABELS).map(([key, label]) => (
        <div key={key} className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${STATUS_LEGEND_COLORS[key]}`} />
          {label}
        </div>
      ))}
    </div>
  );
}