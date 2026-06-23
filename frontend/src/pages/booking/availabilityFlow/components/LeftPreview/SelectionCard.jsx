import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Anchor, Pencil } from "lucide-react";
import {
  selectBookingSummary,
  selectSeatAssignments,
  selectStep,
  selectTravellers,
} from "../../../../../features/booking/availabilitySession/availabilitySelectors";
import { setStep } from "../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import { isCarVehicleType } from "../../../../../features/booking/availabilitySession/vehicleTypeUtils";

const STEP_ORDER = ["route", "date", "trip", "passengers", "seats", "confirm"];

const formatTo12Hour = (timeValue) => {
  if (!timeValue || typeof timeValue !== "string") return "--";

  const text = timeValue.trim();
  if (/(AM|PM)$/i.test(text)) return text.toUpperCase();

  const [hRaw, mRaw] = text.split(":").map(Number);
  if (Number.isNaN(hRaw) || Number.isNaN(mRaw)) return text;

  const hours12 = ((hRaw + 11) % 12) + 1;
  const suffix = hRaw >= 12 ? "PM" : "AM";
  return `${hours12}:${String(mRaw).padStart(2, "0")} ${suffix}`;
};

const formatAmount = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

const Field = ({ label, value, editable, onEdit }) => (
  <button
    type="button"
    onClick={editable ? onEdit : undefined}
    className={`flex w-full items-start justify-between gap-3 rounded-xl px-2 py-2 text-left transition ${
      editable ? "cursor-pointer hover:bg-[var(--booking-surface-muted)]" : "cursor-default"
    }`}
  >
    <div className="min-w-0 flex-1">
      <p className="booking-section-label">{label}</p>
      <p className="booking-value mt-1 truncate text-[0.95rem]">{value}</p>
    </div>

    {editable ? (
      <span className="flex-shrink-0 rounded-lg p-1.5 text-[#94a3b8] transition hover:bg-[var(--booking-surface-muted)] hover:text-[var(--booking-primary)]">
        <Pencil size={14} />
      </span>
    ) : null}
  </button>
);

const SelectionCard = ({ compact = false }) => {
  const dispatch = useDispatch();
  const summary = useSelector(selectBookingSummary);
  const travellers = useSelector(selectTravellers);
  const seatAssignments = useSelector(selectSeatAssignments);
  const currentStep = useSelector(selectStep);

  const journey = summary?.journey || {};
  const vehicles = summary?.vehicles || [];
  const carTotal = vehicles
    .filter((vehicle) => isCarVehicleType(vehicle.vehicleType))
    .reduce((sum, vehicle) => sum + vehicle.fare * vehicle.quantity, 0);
  const addOnTotal = vehicles
    .filter((vehicle) => !isCarVehicleType(vehicle.vehicleType))
    .reduce((sum, vehicle) => sum + vehicle.fare * vehicle.quantity, 0);
  const isRoundTrip = summary?.journeyMode === "ROUND_TRIP";
  const totalPassengers =
    summary?.totalPassengers ?? (travellers.passengers + (travellers.infants || 0));
  const route =
    journey?.from && journey?.to
      ? `${journey.from.toUpperCase()} -> ${journey.to.toUpperCase()}`
      : null;
  const seatLabel = seatAssignments.length
    ? seatAssignments
        .slice()
        .sort((a, b) => a.passengerIdx - b.passengerIdx)
        .map((assignment) => assignment.seatId)
        .join(", ")
    : null;

  const canEdit = (step) => STEP_ORDER.indexOf(step) < STEP_ORDER.indexOf(currentStep);

  const goToStep = (step) => {
    if (canEdit(step)) {
      dispatch(setStep(step));
    }
  };

  return (
    <div className={`booking-card overflow-hidden ${compact ? "rounded-xl" : "rounded-2xl"}`}>
      <div
        className={`flex items-center gap-2.5 border-b border-[var(--booking-border)] bg-[var(--booking-secondary)] ${
          compact ? "px-4 py-3" : "px-5 py-4"
        }`}
      >
        <Anchor size={16} className="text-[var(--booking-primary)]" />
        <h3 className="booking-section-label">Your Selection</h3>
      </div>

      <div className={`${compact ? "space-y-2.5 px-4 py-3" : "space-y-4 px-5 py-5"} text-[13px]`}>
        {route ? (
          <Field
            label="Route"
            value={route}
            editable={canEdit("route")}
            onEdit={() => goToStep("route")}
          />
        ) : null}

        {summary?.date ? (
          <Field
            label="Date"
            value={summary.date}
            editable={canEdit("date")}
            onEdit={() => goToStep("date")}
          />
        ) : null}

        {journey?.departureTime ? (
          <Field
            label="Time"
            value={`${formatTo12Hour(journey.departureTime)} -> ${formatTo12Hour(
              journey.arrivalTime
            )}`}
            editable={canEdit("trip")}
            onEdit={() => goToStep("trip")}
          />
        ) : null}

        {summary?.ferryName ? (
          <Field
            label="Ferry"
            value={summary.ferryName}
            editable={canEdit("date")}
            onEdit={() => goToStep("date")}
          />
        ) : null}

        {seatLabel ? (
          <Field
            label="Selected Seats"
            value={seatLabel}
            editable={canEdit("seats")}
            onEdit={() => goToStep("seats")}
          />
        ) : null}

        <div
          className={`border-t border-[var(--booking-border)] text-[12px] text-[var(--booking-text-soft)] ${
            compact ? "pt-2" : "pt-3"
          }`}
        >
          {(summary?.journeyMode === "ROUND_TRIP" ? "Round Trip" : "One Way")} ·{" "}
          {summary?.totalPassengers ?? (travellers.passengers + (travellers.infants || 0))} Pax
        </div>
      </div>

      {summary?.total > 0 ? (
        <div
          className={`border-t border-[var(--booking-border)] bg-[var(--booking-surface-muted)] ${
            compact ? "px-4 py-3" : "px-5 py-5"
          }`}
        >
          <p className="booking-section-label">Estimated Total</p>
          <p
            className={`${compact ? "text-2xl" : "text-3xl"} mt-2 font-bold text-[var(--booking-primary)]`}
          >
            {formatAmount(summary.total)}
          </p>

          <div className={`${compact ? "mt-2.5" : "mt-4"} space-y-1.5 text-[0.82rem] text-[#64748b]`}>
            <div className="booking-section-label mt-4">Departure</div>
            <div className="flex justify-between">
              <span>Seat ({totalPassengers} pax)</span>
              <span>{formatAmount(summary.baseFare)}</span>
            </div>

            {summary?.infantFare > 0 ? (
              <div className="flex justify-between">
                <span>Infant Surge</span>
                <span className="font-medium text-[var(--booking-primary)]">
                  {formatAmount(summary.infantFare)}
                </span>
              </div>
            ) : null}

            {carTotal > 0 ? (
              <div className="flex justify-between">
                <span>Car(s)</span>
                <span>{formatAmount(carTotal)}</span>
              </div>
            ) : null}

            {addOnTotal > 0 ? (
              <div className="flex justify-between">
                <span>Add-ons</span>
                <span>{formatAmount(addOnTotal)}</span>
              </div>
            ) : null}

            {isRoundTrip && summary?.returnDate ? (
              <>
                <div className="booking-section-label mt-4 border-t border-[var(--booking-border)] pt-3">
                  Return
                </div>
                <div className="text-[0.8rem] text-[#64748b]">
                  {summary.returnDate} · {formatTo12Hour(summary?.returnJourney?.departureTime)}-{" "}
                  {formatTo12Hour(summary?.returnJourney?.arrivalTime)}
                </div>

                <div className="mt-2 space-y-1.5 text-[0.82rem] text-[#64748b]">
                  <div className="flex justify-between">
                    <span>Seat ({totalPassengers} pax)</span>
                    <span className="font-medium text-[var(--booking-primary)]">
                      {formatAmount(summary.returnBaseFare)}
                    </span>
                  </div>

                  {summary?.infantFare > 0 ? (
                    <div className="flex justify-between">
                      <span>Infant Surge</span>
                      <span className="font-medium text-[var(--booking-primary)]">
                        {formatAmount(summary.infantFare)}
                      </span>
                    </div>
                  ) : null}

                  {carTotal > 0 ? (
                    <div className="flex justify-between">
                      <span>Car(s)</span>
                      <span className="font-medium text-[var(--booking-primary)]">
                        {formatAmount(carTotal)}
                      </span>
                    </div>
                  ) : null}

                  {addOnTotal > 0 ? (
                    <div className="flex justify-between">
                      <span>Add-ons</span>
                      <span className="font-medium text-[var(--booking-primary)]">
                        {formatAmount(addOnTotal)}
                      </span>
                    </div>
                  ) : null}

                  <span className="text-xs text-[#94a3b8]">(same as departure)</span>
                </div>
              </>
            ) : null}

            {Number(summary?.seatSurgeAmount || 0) > 0 ? (
              <div className="flex justify-between text-[#b45309]">
                <span>Seat Surge</span>
                <span className="font-medium text-[#b45309]">
                  {formatAmount(summary.seatSurgeAmount)}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SelectionCard;
