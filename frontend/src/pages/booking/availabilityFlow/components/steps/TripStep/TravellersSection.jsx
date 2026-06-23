import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Baby, Minus, PawPrint, Plus, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedCategory,
  selectSelectedSlot,
  selectTripValidation,
  selectTravellers,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  updateTravellers,
  updateAddon,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import { selectBookingConfigItems } from "../../../../../../features/booking/bookingConfig/bookingConfigSlice";

const CounterCard = ({ title, subtitle, value, min = 0, max = Number.POSITIVE_INFINITY, onChange, disabled = false, icon: Icon }) => {
  const hasFiniteMax = Number.isFinite(max);

  const decrease = () => {
    if (disabled) return;
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (disabled) return;
    if (hasFiniteMax && value >= max) return;
    onChange(value + 1);
  };

  const handleManualInput = (event) => {
    if (disabled) return;

    let raw = event.target.value;

    // remove leading zeros like 011 → 11
    raw = raw.replace(/^0+(?=\d)/, "");

    // allow only numbers
    if (!/^\d*$/.test(raw)) return;

    const parsed = raw === "" ? 0 : Number(raw);

    const normalized = Math.max(min, Math.floor(parsed));

    onChange(normalized);
  };

  const isAtMin = value <= min;
  const isOverMax = hasFiniteMax ? value > max : false;

  return (
    <div className={`rounded-2xl border border-[#d6e0ea] bg-white px-3.5 py-2.5 ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-2 text-[#071c3d]">
        <Icon size={17} />
        <p className="text-[1.05rem] font-semibold tracking-tight">{title}</p>
      </div>

      <div className="mt-2 flex items-center gap-3.5">
        <button
          type="button"
          onClick={decrease}
          disabled={disabled || isAtMin}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d5dde7] text-[#071c3d] transition hover:bg-[#f5f8fb] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Minus size={15} />
        </button>

        <input
          type="number"
          min={min}
          value={value}
          onFocus={(e) => e.target.select()}
          onChange={handleManualInput}
          disabled={disabled}
          className="w-14 rounded-xl border border-[#d5dde7] bg-white px-1.5 py-1 text-center text-[1.85rem] font-semibold leading-none text-[#071c3d] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={increase}
          disabled={disabled}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d5dde7] text-[#071c3d] transition hover:bg-[#f5f8fb]"
        >
          <Plus size={15} />
        </button>
      </div>

      <p className="mt-1.5 text-[0.85rem] text-[#64748b]">{subtitle}</p>
      {isOverMax ? (
        <p className="mt-2 text-xs font-medium text-amber-600">
          Limit exceeded ({max}). Reduce count to continue.
        </p>
      ) : null}
    </div>
  );
};

const TravellersSection = () => {
  const dispatch = useDispatch();
  const travellers = useSelector(selectTravellers);
  const selectedSlot = useSelector(selectSelectedSlot);
  const selectedCategory = useSelector(selectSelectedCategory);
  const tripValidation = useSelector(selectTripValidation);

  const petAddon = useMemo(() => {
    const addons = selectedSlot?.addons || [];
    return addons.find((addon) => {
      const addonType = String(addon?.addonType || addon?.type || "").toUpperCase();
      if (addonType === "PET") return true;
      return /pet/i.test(addon.addonName || addon.name || "");
    }); 
  }, [selectedSlot]);

  const showPets = !!petAddon;


  const adultSeats = Number(selectedCategory?.adultSeats ?? 0);
  const childSeats = Number(selectedCategory?.childSeats ?? 0);
  const availableSeats = Number(selectedCategory?.availableSeats ?? Number.POSITIVE_INFINITY);

  const explicitCapacity = adultSeats + childSeats;
  const passengerMaxBySeat = explicitCapacity > 0 ? explicitCapacity : Number.POSITIVE_INFINITY;
  const bookingConfig = useSelector(selectBookingConfigItems);
  const maxBookingLimit = Number(bookingConfig?.MAX_BOOKING_LIMIT ?? 20);
  // const passengerMax = Math.max(1, Math.min(passengerMaxBySeat, availableSeats));
  const passengerMax = Math.max(1, Math.min(passengerMaxBySeat, availableSeats, maxBookingLimit));

  const petMax = Number(
    petAddon?.available
    ?? petAddon?.availableCount
    ?? petAddon?.totalCapacity
    ?? Number.POSITIVE_INFINITY
  );

  useEffect(() => {
    if (!showPets && travellers.pets) {
      dispatch(updateTravellers({ pets: 0 }));
      if (petAddon) {
        dispatch(updateAddon({
          id: petAddon.addonId || petAddon.id,
          name: petAddon.addonName || petAddon.name,
          price: petAddon.fare,
          quantity: 0,
        }));
      }
    }
  }, [showPets, travellers.pets, dispatch, petAddon]);

  return (
    <section className="space-y-2">
      <h3 className="text-[1.05rem] font-semibold tracking-tight text-[#071c3d] sm:text-[1.12rem]">
        Travellers
      </h3>

      <div className="grid gap-2 md:grid-cols-3">
        <CounterCard
          title="Passengers"
          subtitle={`Age 12+`}
          icon={Users}
          value={travellers.passengers}
          min={1}
          max={passengerMax}
          onChange={(value) => {
            const safeValue = Math.min(value, passengerMax);
            dispatch(updateTravellers({ passengers: safeValue }));
          }}
        />

        <CounterCard
          title="Infants"
          subtitle={`Under 2 yrs (Free)`}
          icon={Baby}
          value={travellers.infants || 0}
          min={0}
          max={childSeats}
          onChange={(value) => dispatch(updateTravellers({ infants: value }))}
          disabled={childSeats === 0}
        />

        <CounterCard
          title="Pets"
          icon={PawPrint}
          subtitle={showPets ? `₹${petAddon.fare} per pet` : "Not available for this sailing"}
          value={travellers.pets || 0}
          min={0}
          max={petMax}
          disabled={!showPets}
          onChange={(value) => {
            if (!petAddon) return;
            dispatch(updateTravellers({ pets: value }));
            dispatch(updateAddon({
              id: petAddon.addonId || petAddon.id,
              name: petAddon.addonName || petAddon.name,
              price: petAddon.fare,
              quantity: value,
            }));
          }}
        />
      </div>

      {/* {!tripValidation.isValid ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          {tripValidation.warnings[0]}
        </div>
      ) : null} */}
    </section>
  );
};

CounterCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TravellersSection;
