/* eslint-disable react/prop-types, react/display-name */
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Ship,
} from "lucide-react";

import useCalendar from "./useCalendar";
import RightPanel from "./RightPanel";

const WEEK_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const STATUS_LEGEND_COLORS = {
  AVAILABLE: "bg-green-500",
  FILLING_FAST: "bg-amber-500",
  BOOKED: "bg-red-500",
  NOT_AVAILABLE: "bg-gray-300",
};

const STATUS_CELL_STYLES = {
  AVAILABLE:
    "bg-green-50/90 text-green-700 border border-transparent hover:border-green-400 hover:bg-green-100",
  FILLING_FAST:
    "bg-amber-50/90 text-amber-700 border border-transparent hover:border-amber-400 hover:bg-amber-100",
  BOOKED: "bg-red-50/90 text-red-600 border border-transparent",
  NOT_AVAILABLE: "bg-gray-50/90 text-gray-400 border border-transparent",
};

const STATUS_LABELS = {
  AVAILABLE: "Available",
  FILLING_FAST: "Filling Fast",
  BOOKED: "Booked",
  NOT_AVAILABLE: "Not Available",
};

export default function BookingCalendar({ mode = "customer" }) {
  const {
    monthLabel,
    matrix,
    selectedDate,
    monthStatusMap,
    scheduleTillDate,
    handlePrev,
    handleNext,
    showPrev,
    selectDate,
    clearSelection,
    loadingMonth,
  } = useCalendar();

  const isDateSelected = Boolean(selectedDate);
  const hasMonthData = Object.keys(monthStatusMap || {}).length > 0;

  return (
    <div className="custom-scroll w-full overflow-x-hidden overflow-y-auto rounded-3xl border border-gray-100 bg-white/95 p-2 shadow-xl backdrop-blur-sm lg:h-full">
      <div className="flex w-full flex-col gap-6 lg:h-full lg:flex-row">
        <motion.div
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`flex min-w-0 flex-col transition-all lg:h-full ${
            isDateSelected ? "w-full lg:w-[48%]" : "w-full"
          }`}
        >
          <CalendarHeader
            monthLabel={monthLabel}
            onPrev={handlePrev}
            onNext={handleNext}
            showPrev={showPrev}
          />

          <WeekStrip />

          {loadingMonth ? (
            <CalendarSkeleton />
          ) : !hasMonthData ? (
            <CalendarEmpty />
          ) : (
            <>
              <CalendarGrid
                matrix={matrix}
                selectedDate={selectedDate}
                statusMap={monthStatusMap}
                onSelect={selectDate}
              />

              <div className="mt-3 flex flex-col items-start justify-between gap-3 border-t border-gray-100 px-2 pt-3 sm:flex-row sm:items-center">
                <Legend />

                {scheduleTillDate ? (
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--booking-primary)]">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--booking-primary)] opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--booking-primary)]" />
                    </span>

                    Schedule live till
                    <span className="font-medium">{scheduleTillDate}</span>
                  </div>
                ) : null}
              </div>

              <InfoSection />
            </>
          )}
        </motion.div>

        <AnimatePresence initial={false}>
          {isDateSelected ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-w-0 w-full border-t border-gray-100 pb-4 pt-4 lg:h-full lg:w-1/2 lg:border-l lg:border-t-0 lg:pb-5 lg:pl-4 lg:pt-0"
            >
              <RightPanel date={selectedDate} onClose={clearSelection} mode={mode} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CalendarHeader({ monthLabel, onPrev, onNext, showPrev }) {
  return (
    <div className="relative mb-5 flex shrink-0 items-center justify-center gap-6">
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

      <h2 className="text-lg font-bold tracking-wide text-gray-800">{monthLabel}</h2>

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
  <div className="mb-3 grid grid-cols-7 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
    {WEEK_DAYS.map((day) => (
      <div key={day} className="text-center">
        {day}
      </div>
    ))}
  </div>
));

const CalendarGrid = memo(({ matrix, selectedDate, statusMap, onSelect }) => {
  return (
    <div className="grid grid-cols-7 auto-rows-fr gap-2 lg:flex-1">
      {matrix.map((day) => (
        <MemoizedCell
          key={day.fullDate || `pad-${day.index}`}
          day={day}
          status={statusMap?.[day.fullDate]}
          isSelected={selectedDate === day.fullDate}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});

const CalendarCell = ({ day, status, isSelected, onSelect }) => {
  if (day.isPadding) return <div />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toLocaleDateString("en-CA");

  const isToday = day.fullDate === todayStr;
  const isPast = new Date(day.fullDate) < today;
  const disabled = isPast || status === "NOT_AVAILABLE" || status === "BOOKED";

  const statusStyle = STATUS_CELL_STYLES[status] || "bg-transparent";

  return (
    <div
      onClick={() => !disabled && onSelect(day.fullDate)}
      className={`relative flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-out transform-gpu ${statusStyle} ${
        isSelected ? "ring-2 ring-[var(--booking-primary)] ring-offset-1 z-10 shadow-sm" : ""
      } ${isToday ? "ring-1 ring-gray-300" : ""} ${
        disabled
          ? "cursor-not-allowed opacity-70"
          : "cursor-pointer hover:scale-[1.03] hover:shadow-md"
      }`}
    >
      <span className="text-base font-bold">{day.day}</span>

      {isToday ? (
        <span className="mt-1 text-[9px] font-medium uppercase text-gray-500">Today</span>
      ) : null}
    </div>
  );
};

const MemoizedCell = memo(CalendarCell);

const CalendarSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-1">
      <div className="grid grid-cols-7 auto-rows-fr gap-2 lg:flex-1">
        {Array.from({ length: 42 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.02 }}
            className="relative overflow-hidden rounded-md border border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
          >
            <div className="absolute inset-0 animate-[shimmer_1.6s_infinite] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)]" />
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-200" />
              <div className="h-3 w-14 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="h-3 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
};

const CalendarEmpty = () => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-500 lg:flex-1">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
      <Ship size={20} className="text-gray-400" />
    </div>
    <p className="text-base font-medium">No sailings available</p>
    <p className="mt-1 text-xs text-gray-400">Please check another month</p>
  </div>
);

const Legend = () => (
  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600">
    {Object.entries(STATUS_LABELS).map(([key, label]) => (
      <div key={key} className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${STATUS_LEGEND_COLORS[key]}`} />
        {label}
      </div>
    ))}
  </div>
);

function InfoSection() {
  return (
    <div className="mb-4 mt-2 shrink-0 space-y-2 px-2">
      <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 p-2.5 text-sm text-gray-700">
        <Ship size={15} />
        <span className="font-bold">Vijaydurg service coming soon</span>
        <span>subject to final approvals. Stay tuned for updates.</span>
      </div>

      <div className="flex items-center gap-2.5 rounded-lg bg-red-50 p-2.5 text-sm text-red-700">
        <AlertCircle size={15} />
        <span>
          For safety reasons, e-scooters are not permitted onboard M2M Ferries. Please
          book accordingly.
        </span>
      </div>
    </div>
  );
}
