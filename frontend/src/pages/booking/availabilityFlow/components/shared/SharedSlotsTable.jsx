/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Armchair,
  ArrowRight,
  Bike,
  Car,
  ChevronDown,
  ChevronUp,
  Ship,
  Timer,
  User,
  Users,
  Bus,
} from "lucide-react";
import Tooltip from "../../../../../components/ui/common/Tooltip";
import { getSeatAvailabilityStatus } from "../../../../../utils/calendarUtils";
import { formatMinutes, formatTime, getDuration, parseTimeToMinutes } from "../../../../../utils/DateUtils";
import { getAcceptedVehicleTypes, normalizeVehicleType } from "../../../../../features/booking/availabilitySession/vehicleTypeUtils";

const TRIP_STATUS_COLORS = {
  AVAILABLE: "text-[#1cb95b]",
  FILLING_FAST: "text-orange-500",
  BOOKED: "text-gray-300",
  NOT_AVAILABLE: "text-gray-300",
};

const DATE_STATUS_COLORS = {
  AVAILABLE: "text-green-600",
  FILLING_FAST: "text-orange-500",
  BOOKED: "text-red-500",
  NOT_AVAILABLE: "text-gray-300",
};

const TRIP_ICON_MAP = {
  SEATS: Armchair,
  PASSENGER: Users,
  CAR: Car,
  BIKE: Bike,
};

const TRIP_ICON_LABELS = {
  SEATS: "Seats",
  PASSENGER: "Passenger",
  CAR: "Car",
  BIKE: "Bike",
};

const DATE_ICON_MAP = {
  PASSENGER: User,
  CAR: Car,
  BIKE: Bike,
  BUS: Bus,
};

const DATE_ICON_LABELS = {
  PASSENGER: "Passenger",
  CAR: "Car",
  BIKE: "Bike",
  BUS: "Bus",
};

const TRIP_ICON_TYPES = ["SEATS", "PASSENGER", "CAR", "BIKE"];
const DATE_ICON_TYPES = ["PASSENGER", "CAR", "BIKE", "BUS"];

const getVisualAvailability = (availability, isDisabled) => {
  if (isDisabled) return "NOT_AVAILABLE";
  if (availability === "BOOKED") return "NOT_AVAILABLE";
  return availability;
};

const getCategoryIconColorForTrip = (category) => {
  const available = Number(category?.availableSeats ?? category?.available ?? 0);
  const total = Number(category?.totalSeats ?? category?.totalCapacity ?? 0);

  if (available <= 0) return "text-gray-300";
  if (total > 0) {
    const ratio = available / total;
    return ratio >= 0.5 ? "text-[#1cb95b]" : "text-orange-500";
  }

  return available >= 5 ? "text-[#1cb95b]" : "text-orange-500";
};

const getCategoryIconColorForDate = (category) => {
  const available = Number(category?.availableSeats ?? category?.available ?? 0);
  const total = Number(category?.totalSeats ?? category?.totalCapacity ?? 0);

  if (available <= 0) return "text-red-500";
  if (total > 0) {
    const ratio = available / total;
    if (ratio >= 0.5) return "text-green-600";
    return "text-orange-500";
  }

  return available >= 5 ? "text-green-600" : "text-orange-500";
};

const getCategoryAvailabilityLabel = (category) => {
  const available = Number(category?.availableSeats ?? category?.available ?? 0);
  if (available <= 0) return `${category?.categoryName || "Seat Category"}: Sold out`;
  return `${category?.categoryName || "Seat Category"}: ${available} available`;
};

const getVehicleTypeStatus = (slot, iconType) => {
  if (iconType === "SEATS" || iconType === "PASSENGER") {
    const totalAvailable = (slot?.categories || []).reduce(
      (sum, category) => sum + Number(category?.availableSeats ?? category?.available ?? 0),
      0
    );

    if (totalAvailable === 0) return "NOT_AVAILABLE";
    if (totalAvailable <= 5) return "FILLING_FAST";
    return "AVAILABLE";
  }

  const acceptedTypes = getAcceptedVehicleTypes(iconType);
  const vehicle = (slot?.vehicles || []).find((item) =>
    acceptedTypes.includes(normalizeVehicleType(item?.vehicleType))
  );

  if (!vehicle) return "NOT_AVAILABLE";

  const availableCount = Number(
    vehicle?.available ?? vehicle?.availableCount ?? vehicle?.totalCapacity ?? 0
  );

  if (availableCount === 0) return "NOT_AVAILABLE";
  if (availableCount <= 3) return "FILLING_FAST";
  return "AVAILABLE";
};

const isVehicleTypeAvailableForDate = (slot, vehicleType) => {
  if (vehicleType === "PASSENGER") {
    return (slot?.categories || []).some(
      (category) => Number(category?.availableSeats ?? category?.available ?? 0) > 0
    );
  }

  const acceptedTypes = getAcceptedVehicleTypes(vehicleType);
  const match = (slot?.vehicles || []).find((vehicle) =>
    acceptedTypes.includes(normalizeVehicleType(vehicle?.vehicleType))
  );

  if (!match) return false;

  return Number(match?.available ?? match?.availableCount ?? match?.totalCapacity ?? 0) > 0;
};

const renderTripSeatIcons = (slot, visualAvailability, isDisabled, showSeatDetailsForAgent) => {
  const singleSeatColor = isDisabled
    ? "text-gray-300"
    : (TRIP_STATUS_COLORS[visualAvailability] || TRIP_STATUS_COLORS.AVAILABLE);

  const singleSeatIcon = (
    <span className="inline-flex items-center justify-center">
      <Armchair size={16} className={singleSeatColor} />
    </span>
  );

  if (!showSeatDetailsForAgent) {
    return TRIP_ICON_TYPES.map((iconType) => {
      const Icon = TRIP_ICON_MAP[iconType];
      const vehicleStatus = isDisabled ? "NOT_AVAILABLE" : getVehicleTypeStatus(slot, iconType);
      const colorClass = TRIP_STATUS_COLORS[vehicleStatus] || TRIP_STATUS_COLORS.NOT_AVAILABLE;

      const icon = (
        <span className="inline-flex items-center justify-center">
          <Icon size={16} className={colorClass} />
        </span>
      );

      if (vehicleStatus === "NOT_AVAILABLE") {
        return <span key={`${iconType}-disabled`}>{icon}</span>;
      }

      return (
        <Tooltip key={iconType} text={TRIP_ICON_LABELS[iconType]}>
          {icon}
        </Tooltip>
      );
    });
  }

  const categoryIcons = (slot.categories || []).map((category) => (
    <Tooltip key={category.categoryId} text={getCategoryAvailabilityLabel(category)}>
      <span className="inline-flex items-center justify-center">
        <Armchair size={15} className={getCategoryIconColorForTrip(category)} />
      </span>
    </Tooltip>
  ));

  const vehicleIcons = TRIP_ICON_TYPES.filter((type) => type !== "SEATS").map((iconType) => {
    const Icon = TRIP_ICON_MAP[iconType];
    const vehicleStatus = isDisabled ? "NOT_AVAILABLE" : getVehicleTypeStatus(slot, iconType);
    const colorClass = TRIP_STATUS_COLORS[vehicleStatus] || TRIP_STATUS_COLORS.NOT_AVAILABLE;

    const icon = (
      <span className="inline-flex items-center justify-center">
        <Icon size={15} className={colorClass} />
      </span>
    );

    if (vehicleStatus === "NOT_AVAILABLE") {
      return <span key={`${iconType}-disabled`}>{icon}</span>;
    }

    return (
      <Tooltip key={iconType} text={TRIP_ICON_LABELS[iconType]}>
        {icon}
      </Tooltip>
    );
  });

  if (!categoryIcons.length) {
    return [singleSeatIcon, ...vehicleIcons];
  }

  return [...categoryIcons, ...vehicleIcons];
};

const renderDateSeatIcons = (slot, visualAvailability, isDisabled) => {
  const categoryIcons = (slot.categories || []).map((category) => {
    if (isDisabled) {
      return (
        <div key={category.categoryId} className="cursor-default">
          <Armchair size={16} className="text-gray-300" />
        </div>
      );
    }

    return (
      <Tooltip key={category.categoryId} text={getCategoryAvailabilityLabel(category)}>
        <div className="cursor-default">
          <Armchair size={16} className={getCategoryIconColorForDate(category)} />
        </div>
      </Tooltip>
    );
  });

  const passengerFallback = isDisabled ? (
    <User size={15} className="text-gray-300" />
  ) : (
    <Tooltip text="Passengers">
      <User size={15} className={DATE_STATUS_COLORS[visualAvailability]} />
    </Tooltip>
  );

  const vehicleIcons = DATE_ICON_TYPES.map((vehicleType) => {
    const Icon = DATE_ICON_MAP[vehicleType];
    const label = DATE_ICON_LABELS[vehicleType] || vehicleType;
    const enabledForSlot = isVehicleTypeAvailableForDate(slot, vehicleType);
    const isIconDisabled = isDisabled || !enabledForSlot;

    const icon = (
      <div className="cursor-default">
        <Icon
          size={16}
          className={`${isIconDisabled ? "text-gray-300" : DATE_STATUS_COLORS[visualAvailability]}`}
        />
      </div>
    );

    if (isIconDisabled) {
      return <div key={`${vehicleType}-disabled`}>{icon}</div>;
    }

    return (
      <Tooltip key={vehicleType} text={label}>
        {icon}
      </Tooltip>
    );
  });

  return [categoryIcons.length ? categoryIcons : passengerFallback, ...vehicleIcons];
};

export default function SharedSlotsTable({
  slots = [],
  selectedSlotId,
  onSelectSlot,
  variant = "date",
  showSeatDetailsForAgent = false,
  disableBeforeMinutes,
  isAdditionalDisabled,
  showSkeleton = false,
  skeletonCount = 4,
  emptyMessage = "No slots found for selected filters.",
  reorderSelectedFirst = false,
  showViewMore = false,
  initialVisibleCount = 1,
}) {
  const [expanded, setExpanded] = useState(false);

  const processedSlots = useMemo(
    () =>
      (slots || []).map((slot) => {
        const availability = getSeatAvailabilityStatus(slot);
        const slotDepartureMinutes = parseTimeToMinutes(slot?.departureTime);

        const isBlockedByReturnGap =
          typeof disableBeforeMinutes === "number" &&
          typeof slotDepartureMinutes === "number" &&
          slotDepartureMinutes < disableBeforeMinutes;

        const additionalDisabled =
          typeof isAdditionalDisabled === "function"
            ? Boolean(isAdditionalDisabled(slot, availability))
            : false;

        const isDisabled =
          isBlockedByReturnGap ||
          additionalDisabled ||
          (slot?.status || "").toUpperCase() === "BOOKED" ||
          availability === "BOOKED" ||
          availability === "NOT_AVAILABLE";

        const visualAvailability = getVisualAvailability(availability, isDisabled);

        return {
          ...slot,
          availability,
          visualAvailability,
          isDisabled,
        };
      }),
    [slots, disableBeforeMinutes, isAdditionalDisabled]
  );

  const orderedSlots = useMemo(() => {
    if (!reorderSelectedFirst || !selectedSlotId) return processedSlots;

    const selected = processedSlots.find((slot) => slot.slotId === selectedSlotId);
    const rest = processedSlots.filter((slot) => slot.slotId !== selectedSlotId);

    return selected ? [selected, ...rest] : processedSlots;
  }, [processedSlots, reorderSelectedFirst, selectedSlotId]);

  const visibleSlots = showViewMore
    ? (expanded ? orderedSlots : orderedSlots.slice(0, initialVisibleCount))
    : orderedSlots;

  const handleSelect = (slotId, isDisabled) => {
    if (isDisabled || typeof onSelectSlot !== "function") return;
    onSelectSlot(slotId);
    if (showViewMore) {
      setExpanded(false);
    }
  };

  return (
    <>
      {variant === "trip" ? (
        <div className="grid grid-cols-[1.35fr_0.95fr_0.95fr_0.8fr_0.65fr_0.8fr] gap-2 border-b border-[var(--booking-border)] bg-[var(--booking-surface-muted)] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.09em] text-[#4f6680] sm:grid-cols-[1.45fr_0.95fr_0.95fr_0.85fr_0.75fr_0.8fr] sm:px-5">
          <div className="flex items-center gap-2"><Ship size={13} /> Vessel</div>
          <div className="flex items-center gap-2"><ArrowRight size={13} /> Depart</div>
          <div className="flex items-center gap-2"><ArrowRight size={13} /> Arrive</div>
          <div>Type</div>
          <div>Seats</div>
          <div className="text-right">Book</div>
        </div>
      ) : (
        <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_2fr_0.8fr] border-b bg-gray-50 px-6 py-3 text-[11px] uppercase tracking-wide text-gray-500">
          <div className="flex items-center gap-1"><Ship size={13} /> Vessel</div>
          <div>Departs</div>
          <div>Arrives</div>
          <div>Type</div>
          <div className="flex items-center gap-1">Seats</div>
          <div className="text-right">Book</div>
        </div>
      )}

      {showSkeleton ? (
        <div className={variant === "trip" ? "space-y-2 px-4 py-4 sm:px-6" : "space-y-2 px-4 py-4"}>
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <motion.div
              key={`slot-skeleton-${idx}`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: idx * 0.07 }}
              className="h-12 rounded-lg border border-gray-100 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100"
            />
          ))}
        </div>
      ) : null}

      {!showSkeleton && orderedSlots.length === 0 ? (
        <div className={variant === "trip" ? "px-4 py-6 text-sm text-[#7b8fa6] sm:px-6" : "px-6 py-8 text-sm text-gray-500"}>
          {emptyMessage}
        </div>
      ) : null}

      {visibleSlots.map((slot) => {
        const isSelected = selectedSlotId === slot.slotId;


        if (variant === "trip") {
          return (
            <div
              key={slot.slotId}
              onClick={() => handleSelect(slot.slotId, slot.isDisabled)}
              className={`grid grid-cols-[1.35fr_0.95fr_0.95fr_0.8fr_0.65fr_0.8fr] items-center gap-2 border-b border-[var(--booking-border)] border-l-[3px] px-4 py-3 sm:grid-cols-[1.45fr_0.95fr_0.95fr_0.85fr_0.75fr_0.8fr] sm:px-5 ${isSelected ? "border-l-[var(--booking-primary)] bg-[var(--booking-secondary)]/55" : "border-l-transparent bg-white"} ${slot.isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-[var(--booking-surface-muted)]"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${isSelected ? "bg-[var(--booking-primary)] text-white" : "bg-[#eef3f8] text-[#7b8fa6]"}`}>
                  <Ship size={15} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-[var(--booking-primary)]">{slot?.ferry?.ferryName}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#6a7d92]">
                    <Timer size={14} />
                    {getDuration(slot.departureTime, slot.arrivalTime)} Journey
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#7b8fa6]">Departs</p>
                <p className="mt-0.5 text-[1.05rem] font-bold leading-tight text-[var(--booking-primary)]">
                  {formatTime(slot.departureTime)}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#7b8fa6]">Arrives</p>
                <p className="mt-0.5 text-[1.05rem] font-bold leading-tight text-[var(--booking-primary)]">
                  {formatTime(slot.arrivalTime)}
                </p>
              </div>

              <div>
                <span className="inline-flex rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-medium text-[#15803d]">
                  {slot?.ferry?.journeyType || "Non-Stop"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[#1cb95b]">
                {renderTripSeatIcons(slot, slot.visualAvailability, slot.isDisabled, showSeatDetailsForAgent)}
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelect(slot.slotId, slot.isDisabled);
                  }}
                  disabled={slot.isDisabled}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${slot.isDisabled
                    ? "cursor-not-allowed border border-[#c8d5e3] text-[#94a3b8]"
                    : isSelected
                      ? "bg-[var(--booking-primary)] text-white shadow-sm"
                      : "border border-[#c8d5e3] text-[var(--booking-primary)] hover:bg-[var(--booking-surface-muted)]"
                    }`}
                >
                  {slot.isDisabled ? "Unavailable" : isSelected ? "✓ Done" : "Select"}
                </button>
              </div>
            </div>
          );
        }

        return (
          <div
            key={slot.slotId}
            onClick={() => handleSelect(slot.slotId, slot.isDisabled)}
            className={`grid grid-cols-[1.3fr_1fr_1fr_1fr_2fr_0.8fr] items-center border-b px-2 py-1 text-sm transition ${slot.isDisabled ? "cursor-not-allowed bg-gray-50 text-gray-400 opacity-70" : "cursor-pointer hover:bg-gray-50"} ${isSelected ? "bg-gray-100" : ""}`}
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isSelected ? "bg-[#0f2d3a] text-white" : "bg-gray-100 text-gray-500"}`}>
                <Ship size={16} />
              </div>

              <div>
                <div className="font-semibold text-[#0f2d3a]">
                  {slot?.ferry?.ferryName}
                </div>
                <div className="text-xs text-gray-500">
                  1h journey
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-gray-400">
                Departs
              </div>
              <div className="text-sm font-semibold text-[#0f2d3a] sm:text-base">
                {slot.departureTime}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wide text-gray-400">
                Arrives
              </div>
              <div className="text-sm font-semibold text-[#0f2d3a] sm:text-base">
                {slot.arrivalTime}
              </div>
            </div>

            <div>
              <span className={`rounded-full px-2 py-[2px] text-[11px] ${slot.isDisabled ? "bg-gray-100 text-gray-400" : "bg-green-100 text-green-700"}`}>
                Non-Stop
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {renderDateSeatIcons(slot, slot.visualAvailability, slot.isDisabled)}
            </div>

            <div className="text-right">
              {slot.isDisabled ? (
                <span className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-500">
                  Fully Booked
                </span>
              ) : isSelected ? (
                <button type="button" className="rounded-md bg-[#0f2d3a] px-3 py-1 text-sm text-white">
                  ✓ Done
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelect(slot.slotId, slot.isDisabled);
                  }}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        );
      })}

      {showViewMore && orderedSlots.length > initialVisibleCount ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-[var(--booking-primary)] transition hover:bg-[#f8fafc] sm:px-6"
        >
          <span>
            {expanded
              ? "View Less"
              : `View More Routes (${Math.max(orderedSlots.length - initialVisibleCount, 0)})`}
          </span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      ) : null}
    </>
  );
}
