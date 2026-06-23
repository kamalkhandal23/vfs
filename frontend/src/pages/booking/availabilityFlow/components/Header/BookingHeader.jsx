import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Armchair,
  Check,
  Clock,
  MapPin,
  Pencil,
  Ship,
  Users,
} from "lucide-react";
import {
  selectBookingSuccess,
  selectConfirmHoldExpiresAt,
  selectDynamicSeatCategories,
  selectSeatPassengerFlowEnabled,
  selectSelectedRoute,
  selectStep,
} from "../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  resetBookingFlowState,
  setStep,
} from "../../../../../features/booking/availabilitySession/availabilitySessionSlice";

const STEPS = [
  { key: "route", label: "Route", icon: MapPin },
  { key: "date", label: "Date", icon: Clock },
  { key: "trip", label: "Trip", icon: Ship },
  { key: "passengers", label: "Passengers", icon: Users },
  { key: "seats", label: "Seats", icon: Armchair },
  { key: "confirm", label: "Confirm", icon: Check },
];

const TEMP_DISABLED_STEPS = [];

const formatDuration = (ms) => {
  if (!Number.isFinite(ms) || ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const safeSelect = (selector, fallback) => (state) => {
  try {
    const value = selector(state);
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const BookingHeader = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(safeSelect(selectStep, "trip"));
  const selectedRoute = useSelector(safeSelect(selectSelectedRoute, null));
  const bookingSuccess = useSelector(safeSelect(selectBookingSuccess, false));
  const confirmHoldExpiresAt = useSelector(safeSelect(selectConfirmHoldExpiresAt, null));
  const dynamicSeatCategories = useSelector(safeSelect(selectDynamicSeatCategories, []));
  const isSeatPassengerFlowEnabled = useSelector(
    safeSelect(selectSeatPassengerFlowEnabled, true)
  );
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentIndex = STEPS.findIndex((step) => step.key === currentStep);
  const timeLeftMs = confirmHoldExpiresAt ? Math.max(0, confirmHoldExpiresAt - now) : 0;
  const timerActive = timeLeftMs > 0;
  const hasSeatSectionData = (dynamicSeatCategories?.length ?? 0) > 0;
  const showHoldTimer = hasSeatSectionData && Boolean(confirmHoldExpiresAt);

  return (
    <div className="sticky top-0 z-20 border-b border-[var(--booking-border)] bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-4 sm:px-4 lg:px-6">
        <div className="min-w-0">
          <h1 className="text-[18px] font-semibold leading-tight text-[var(--booking-text)] sm:text-[20px]">
            Book Your Ferry
          </h1>
          <p className="mt-[2px] truncate text-[13px] text-[var(--booking-text-soft)]">
            {selectedRoute?.routeName} · M2M Ferries
          </p>
        </div>

        {showHoldTimer ? (
          <div
            className={`shrink-0 rounded-xl border px-3 py-2 text-right shadow-sm ${
              timerActive
                ? "border-[#f59e0b] bg-[#fff7ed]"
                : "border-[var(--booking-border)] bg-[var(--booking-surface-muted)]"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--booking-text-soft)]">
              Hold Timer
            </p>
            <p
              className={`text-base font-semibold ${
                timerActive ? "text-[#9a3412]" : "text-[#475569]"
              }`}
            >
              {formatDuration(timeLeftMs)}
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-t border-[var(--booking-border)] bg-[var(--booking-surface-muted)]/55">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isFlowDisabledStep =
            !isSeatPassengerFlowEnabled && ["passengers", "seats"].includes(step.key);
          const isTempDisabled = TEMP_DISABLED_STEPS.includes(step.key) || isFlowDisabledStep;
          const isCompleted = index < currentIndex && !isTempDisabled;
          const isFuture = index > currentIndex;
          const isDisabled = isFuture || isTempDisabled;

          return (
            <button
              key={step.key}
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  if (bookingSuccess) {
                    dispatch(resetBookingFlowState());
                  }
                  dispatch(setStep(step.key));
                }
              }}
              className={`relative flex w-full items-center justify-center gap-2 px-2 pb-3 pt-4 text-[13px] transition-colors sm:text-[14px] ${
                isActive
                  ? "font-medium text-[var(--booking-primary)]"
                  : isCompleted
                    ? "text-[#16a34a] hover:text-opacity-75"
                    : "cursor-not-allowed text-[#94a3b8]"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.label.slice(0, 4)}</span>
              {isCompleted ? <Pencil size={12} /> : null}
              {(isActive || isCompleted) && !isTempDisabled ? (
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-full ${
                    isCompleted ? "bg-[#16a34a]" : "bg-[var(--booking-primary)]"
                  }`}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingHeader;
