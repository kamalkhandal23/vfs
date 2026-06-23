/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import { startSession } from "../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
  loadRoutes,
  selectRoutes as selectMasterRoutes,
  selectActiveRoutesForAvailability,
} from "../../../../features/booking/routes/routesSlice";
import {
  loadFerries,
  selectFerries,
  selectFerriesLoaded,
} from "../../../../features/booking/ferry/ferrySlice";
import {
  Ship,
  Car,
  Bike,
  User,
  Anchor,
  Armchair,
} from "lucide-react";
import { checkSlotExpired } from "../../../../utils/calendarUtils";
import Tooltip from "../../../../components/ui/common/Tooltip";
import { formatTime } from "../../../../utils/DateUtils";
import {
  getAcceptedVehicleTypes,
  normalizeVehicleType,
} from "../../../../features/booking/availabilitySession/vehicleTypeUtils";

const VEHICLE_ICON_MAP = {
  SEDAN: Car,
  CAR: Car,
  BIKE: Bike,
  PASSENGER: User,
  SEATS: Armchair,
};

const VEHICLE_LABELS = {
  SEDAN: "Car",
  CAR: "Car",
  BIKE: "Bike",
  PASSENGER: "Passenger",
  SEATS: "Seats",
};

const DISPLAY_VEHICLE_TYPES = ["SEATS", "PASSENGER", "CAR", "BIKE"];
const TABLE_GRID =
  "grid-cols-[1.22fr_0.88fr_0.84fr_0.86fr_0.74fr_0.9fr]";

const STATUS_COLORS = {
  AVAILABLE: "text-green-600",
  FILLING_FAST: "text-orange-500",
  BOOKED: "text-red-500",
  NOT_AVAILABLE: "text-gray-300",
};

const getVehicleTypeStatus = (slot, vehicleType) => {
  if (vehicleType === "SEATS" || vehicleType === "PASSENGER") {
    const total = (slot?.categories || []).reduce(
      (sum, category) => sum + Number(category?.availableSeats ?? 0),
      0
    );
    if (total === 0) return "NOT_AVAILABLE";
    if (total <= 5) return "FILLING_FAST";
    return "AVAILABLE";
  }

  const acceptedTypes = getAcceptedVehicleTypes(vehicleType);
  const match = (slot?.vehicles || []).find((vehicle) =>
    acceptedTypes.includes(normalizeVehicleType(vehicle?.vehicleType))
  );
  if (!match) return "NOT_AVAILABLE";

  const available = Number(
    match?.available ?? match?.availableCount ?? match?.totalCapacity ?? 0
  );
  if (available === 0) return "NOT_AVAILABLE";
  if (available <= 3) return "FILLING_FAST";
  return "AVAILABLE";
};

const SlotsSkeleton = React.memo(function SlotsSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.08 }}
          className="overflow-hidden rounded-[22px] border border-[#e8edf0] bg-white shadow-[0_1px_2px_rgba(15,45,58,0.04)]"
        >
          <div className="border-b border-[#edf1f4] bg-[#fafbfc] px-4 py-3">
            <div className="h-4 w-1/3 rounded bg-gray-200" />
          </div>

          <div className="space-y-3 p-4">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </motion.div>
      ))}
    </div>
  );
});

const SlotsEmpty = React.memo(function SlotsEmpty() {
  return (
    <div className="flex items-center justify-center py-16 text-center">
      <div>
        <div className="mb-3 text-4xl opacity-30">⛴</div>
        <p className="text-sm font-medium text-gray-600">No trips available</p>
        <p className="mt-1 text-xs text-gray-400">Try selecting another date</p>
      </div>
    </div>
  );
});

const SlotsError = React.memo(function SlotsError({ message }) {
  return (
    <div className="flex items-center justify-center py-16 text-center">
      <div>
        <p className="text-sm font-medium text-red-600">Failed to load trips</p>
        <p className="mt-1 text-xs text-gray-400">{message}</p>
      </div>
    </div>
  );
});

function Header({ date, onClose }) {
  const selectedDate = new Date(date);
  const day = selectedDate.getDate();
  const month = selectedDate.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex min-w-[56px] flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--booking-primary)] px-3 py-2 text-white">
            <span className="text-lg font-semibold leading-none">{day}</span>
            <span className="text-[10px] tracking-wide opacity-80">{month}</span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-[var(--booking-primary)]">
              Trips &amp; Availability
            </h3>
            <p className="text-xs text-gray-500">Select a route &amp; time to book</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-xl leading-none text-gray-400 transition-colors hover:text-[var(--booking-primary)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function RouteBlock({ route, onSelectSlot }) {
  const availableCount = useMemo(
    () => route.sailings.filter((slot) => slot.status !== "BOOKED" && !slot.isExpired).length,
    [route.sailings]
  );

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#e8edf0] bg-white shadow-[0_1px_2px_rgba(15,45,58,0.04)]">
      <div className="flex flex-col border-b border-[#edf1f4] bg-[#fafafa] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--booking-primary)] sm:text-base">
          <Anchor size={14} className="text-[var(--booking-primary)]" />
          {route.routeName.toUpperCase()}
        </h4>

        <span className="mt-1 text-xs text-[var(--booking-primary)] sm:mt-0 sm:text-sm">
          {availableCount} available
        </span>
      </div>

      <div
        className={`hidden md:grid ${TABLE_GRID} gap-x-2 border-b border-[#edf1f4] bg-[#fbfcfd] px-3 py-2 text-[10px] uppercase tracking-wide text-gray-500 lg:px-4 lg:text-[11px]`}
      >
        <div>Vessel</div>
        <div>Depart</div>
        <div>Arrive</div>
        <div>Type</div>
        <div>Seats</div>
        <div className="justify-self-end text-right">Book</div>
      </div>

      {route.sailings.map((slot) => (
        <SlotRow
          key={slot.slotId}
          slot={slot}
          routeId={route.routeId}
          onSelect={onSelectSlot}
        />
      ))}
    </div>
  );
}

const renderVehicles = (slot, isDisabled) =>
  DISPLAY_VEHICLE_TYPES.map((vehicleType) => {
    const Icon = VEHICLE_ICON_MAP[vehicleType] || VEHICLE_ICON_MAP.CAR;
    const label = VEHICLE_LABELS[vehicleType] || vehicleType;
    const vehicleStatus = isDisabled ? "NOT_AVAILABLE" : getVehicleTypeStatus(slot, vehicleType);
    const colorClass = STATUS_COLORS[vehicleStatus] ?? STATUS_COLORS.NOT_AVAILABLE;

    const icon = (
      <div className="cursor-default p-px">
        <Icon size={14} className={`${colorClass} transition-colors lg:h-4 lg:w-4`} />
      </div>
    );

    if (vehicleStatus === "NOT_AVAILABLE") {
      return <div key={`${vehicleType}-disabled`}>{icon}</div>;
    }

    return (
      <Tooltip key={vehicleType} text={label}>
        {icon}
      </Tooltip>
    );
  });

const SlotRow = React.memo(function SlotRow({ slot, routeId, onSelect }) {
  const isDisabled = slot.status === "BOOKED" || slot.isExpired;

  return (
    <div
      className={`grid ${TABLE_GRID} items-center gap-x-2 border-b border-[#edf1f4] px-3 py-3 text-xs transition lg:px-4 lg:text-sm ${
        isDisabled
          ? "cursor-not-allowed bg-[#fcfcfc] text-gray-400 opacity-70"
          : "cursor-pointer text-gray-600 hover:bg-gray-50"
      }`}
      onClick={() => {
        if (isDisabled) return;
        onSelect(routeId, slot.slotId);
      }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Ship size={14} className="shrink-0" />
        <span className="min-w-0 truncate text-[13px] lg:text-[14px]">
          {slot.ferry?.ferryName}
        </span>
      </div>

      <div className={`whitespace-nowrap text-[13px] lg:text-[14px] ${isDisabled ? "" : "font-bold text-[var(--booking-primary)]"}`}>
        {formatTime(slot.departureTime)}
      </div>

      <div className={`whitespace-nowrap text-[13px] lg:text-[14px] ${isDisabled ? "line-through" : ""}`}>
        {formatTime(slot.arrivalTime)}
      </div>

      <div className="min-w-0">
        <span
          className={`inline-flex whitespace-nowrap rounded-full px-2 py-[2px] text-[10px] lg:text-[11px] ${
            isDisabled ? "bg-gray-100 text-gray-400" : "bg-green-100 text-green-700"
          }`}
        >
          {slot.ferry.journeyType || "Non-Stop"}
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-0.5 overflow-hidden">{renderVehicles(slot, isDisabled)}</div>

      <div className="min-w-[82px] justify-self-end pl-1 text-right">
        {isDisabled ? (
          <span className="block whitespace-nowrap text-[11px] text-gray-400 lg:text-[12px]">Unavailable</span>
        ) : (
          <button
            onClick={(event) => {
              event.stopPropagation();
              onSelect(routeId, slot.slotId);
            }}
            className="whitespace-nowrap text-[11px] font-medium text-[#1b6983] hover:underline lg:text-[12px] cursor-pointer"
          >
            Select →
          </button>
        )}
      </div>
    </div>
  );
});

export default function RightPanel({ date, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loaded: masterRoutesLoaded } = useSelector(selectMasterRoutes("ACTIVE"));
  const masterRoutes = useSelector(selectActiveRoutesForAvailability);
  const ferries = useSelector(selectFerries);
  const ferriesLoaded = useSelector(selectFerriesLoaded);
  const { slots, loadingSlots, slotsError } = useSelector(
    (state) => state.booking.bookingCalendar
  );

  const routes = useMemo(() => slots?.routes || [], [slots]);

  useEffect(() => {
    if (!masterRoutesLoaded) {
      dispatch(loadRoutes({ status: "ACTIVE" }));
    }
  }, [dispatch, masterRoutesLoaded]);

  useEffect(() => {
    if (!ferriesLoaded) {
      dispatch(loadFerries());
    }
  }, [dispatch, ferriesLoaded]);

  const [selectedRoute, setSelectedRoute] = useState("ALL");
  const [selectedFerry, setSelectedFerry] = useState("ALL");

  const handleSelectSlot = useCallback(
    (routeId, slotId) => {
      if (!slots) return;

      dispatch(
        startSession({
          snapshot: slots,
          selectedRouteId: routeId,
          selectedSlotId: slotId,
        })
      );

      navigate("/booking/availability");
    },
    [dispatch, navigate, slots]
  );

  const filteredRoutes = useMemo(() => {
    if (!routes.length) return [];

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return routes
      .filter((route) =>
        selectedRoute === "ALL" ? true : String(route.routeId) === String(selectedRoute)
      )
      .map((route) => {
        const sailings = route.sailings
          .filter((slot) =>
            selectedFerry === "ALL" ? true : slot.ferry?.ferryName === selectedFerry
          )
          .map((slot) => ({
            ...slot,
            isExpired: checkSlotExpired(slot, date, currentMinutes),
          }))
          .sort((a, b) => a.departureTime.localeCompare(b.departureTime));

        return { ...route, sailings };
      })
      .filter((route) => route.sailings.length);
  }, [routes, selectedRoute, selectedFerry, date]);

  const sailingsList = useMemo(() => routes.flatMap((route) => route.sailings), [routes]);

  return (
    <div className="flex h-auto w-full flex-col lg:h-full">
      <Header date={date} onClose={onClose} />

      <FilterBar
        routes={masterRoutes.length ? masterRoutes : routes}
        ferries={ferries}
        sailings={sailingsList}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        selectedFerry={selectedFerry}
        setSelectedFerry={setSelectedFerry}
      />

      <div className="space-y-6 pb-4 lg:min-h-0 lg:flex-1 lg:pb-5">
        {loadingSlots ? (
          <SlotsSkeleton />
        ) : slotsError ? (
          <SlotsError message={slotsError} />
        ) : filteredRoutes.length === 0 ? (
          <SlotsEmpty />
        ) : (
          filteredRoutes.map((route) => (
            <RouteBlock key={route.routeId} route={route} onSelectSlot={handleSelectSlot} />
          ))
        )}
      </div>
    </div>
  );
}
