/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Bike, Bus, Car, Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAvailableVehicles,
  selectSelectedCarEntries,
  selectSelectedVehicles,
  selectTravellers,
  selectTripValidation,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  setSelectedCarEntries,
  updateVehicle,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
  getCarSizeCodeFromModelSize,
  getCarSizeFromVehicleType,
  getCarVehicleTypeFromSize,
  getVehicleAvailabilityCount,
  getVehicleTotalCount,
  isCarVehicleType,
  normalizeVehicleType,
} from "../../../../../../features/booking/availabilitySession/vehicleTypeUtils";
import { selectBookingConfigItems } from "../../../../../../features/booking/bookingConfig/bookingConfigSlice";
import { selectCarModelSizeMap } from "../../../../../../features/booking/vehicleCatalog/vehicleCatalogSlice";

const VEHICLE_ICON_MAP = {
  CAR: Car,
  SEDAN: Car,
  BIKE: Bike,
  BUS: Bus,
  OTHER: Bike,
  PASSENGER: Bike,
};

const VEHICLE_TITLE_MAP = {
  BIKE: "Bike / Scooter",
  BUS: "Bus",
  OTHER: "Cycle",
};

const DISPLAY_VEHICLE_TYPES = ["BIKE", "BUS", "OTHER"];
const COLOR_CLASS = {
  gray: "text-[#94a3b8]",
  orange: "text-orange-500",
  green: "text-[#1cb95b]",
};

const toSafeCount = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
};

const getSafeVehicleAvailableCount = (vehicle) => toSafeCount(getVehicleAvailabilityCount(vehicle));
const getSafeVehicleTotalCount = (vehicle) => toSafeCount(getVehicleTotalCount(vehicle));

const getAvailabilityColor = (vehicle) => {
  const available = getSafeVehicleAvailableCount(vehicle);
  if (available <= 0) return COLOR_CLASS.gray;

  const total = getSafeVehicleTotalCount(vehicle);
  if (total <= 0) return COLOR_CLASS.green;

  const ratio = available / total;
  if (ratio <= 0.35) return COLOR_CLASS.orange;
  return COLOR_CLASS.green;
};

const getAvailabilityColorFromCounts = (available, total) => {
  const safeAvailable = toSafeCount(available);
  const safeTotal = toSafeCount(total);

  if (safeAvailable <= 0) return COLOR_CLASS.gray;
  if (safeTotal <= 0) return COLOR_CLASS.green;

  const ratio = safeAvailable / safeTotal;
  if (ratio <= 0.35) return COLOR_CLASS.orange;
  return COLOR_CLASS.green;
};

const createCarRow = (id, overrides = {}) => ({
  id,
  brand: "",
  model: "",
  presetSize: null,
  ...overrides,
});

const createCarRowId = () => `car-row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getCarModelSize = (carModelSizeMap, brand, model) => {
  const sizeCode = carModelSizeMap?.[brand]?.models?.[model];
  return getCarSizeCodeFromModelSize(sizeCode);
};

const buildCarPricing = (vehicles) => {
  const carVehicles = (vehicles || []).filter((vehicle) => isCarVehicleType(vehicle?.vehicleType));
  const byType = new Map(carVehicles.map((vehicle) => [normalizeVehicleType(vehicle.vehicleType), vehicle]));

  const specificBySize = {
    S: byType.get("CAR_S") || null,
    M: byType.get("CAR_M") || null,
    L: byType.get("CAR_L") || null,
    XL: byType.get("CAR_XL") || null,
  };

  const hasSpecificPricing = Boolean(specificBySize.S || specificBySize.M || specificBySize.L);
  const commonVehicle = byType.get("CAR") || byType.get("SEDAN") || null;
  const effectiveBySize = hasSpecificPricing
    ? specificBySize
    : { S: commonVehicle, M: commonVehicle, L: commonVehicle };
  const relevantTypes = hasSpecificPricing
    ? Object.entries(specificBySize)
      .filter(([, vehicle]) => Boolean(vehicle))
      .map(([sizeCode]) => getCarVehicleTypeFromSize(sizeCode))
    : (commonVehicle ? [normalizeVehicleType(commonVehicle.vehicleType)] : []);
  const totalAvailable = hasSpecificPricing
    ? Object.values(specificBySize).reduce((sum, vehicle) => sum + getSafeVehicleAvailableCount(vehicle), 0)
    : getSafeVehicleAvailableCount(commonVehicle);
  const totalCapacity = hasSpecificPricing
    ? Object.values(specificBySize).reduce((sum, vehicle) => sum + getSafeVehicleTotalCount(vehicle), 0)
    : getSafeVehicleTotalCount(commonVehicle);
  const minimumFare = hasSpecificPricing
    ? Object.values(specificBySize)
      .filter(Boolean)
      .reduce((lowestFare, vehicle) => Math.min(lowestFare, Number(vehicle?.fare ?? 0)), Number.POSITIVE_INFINITY)
    : Number(commonVehicle?.fare ?? 0);

  return {
    commonVehicle,
    effectiveBySize,
    hasSpecificPricing,
    minimumFare,
    relevantTypes,
    totalAvailable,
    totalCapacity,
  };
};

const buildInitialCarRows = (selectedVehicles, carPricing, getNextRowId) => {
  const rows = [];

  if (carPricing.hasSpecificPricing) {
    ["CAR_S", "CAR_M", "CAR_L", "CAR_XL"].forEach((vehicleType) => {
      const match = selectedVehicles.find((vehicle) => normalizeVehicleType(vehicle.vehicleType) === vehicleType);
      const quantity = toSafeCount(match?.quantity);
      const presetSize = getCarSizeFromVehicleType(vehicleType);

      for (let index = 0; index < quantity; index += 1) {
        rows.push(createCarRow(getNextRowId(), { presetSize }));
      }
    });

    return rows;
  }

  const genericType = carPricing.relevantTypes[0];
  const match = selectedVehicles.find((vehicle) => normalizeVehicleType(vehicle.vehicleType) === genericType);
  const quantity = toSafeCount(match?.quantity);

  for (let index = 0; index < quantity; index += 1) {
    rows.push(createCarRow(getNextRowId()));
  }

  return rows;
};

const filterBrandsByAvailableSizes = (carModelSizeMap, carPricing) => {
  if (!carPricing.hasSpecificPricing) return Object.keys(carModelSizeMap || {});

  const allowedSizes = new Set(
    Object.entries(carPricing.effectiveBySize)
      .filter(([, vehicle]) => Boolean(vehicle))
      .map(([sizeCode]) => sizeCode)
  );

  return Object.entries(carModelSizeMap || {})
    .filter(([, brandData]) => Object.values(brandData?.models || {}).some((sizeCode) => allowedSizes.has(getCarSizeCodeFromModelSize(sizeCode))))
    .map(([brand]) => brand);
};

const filterModelsByBrandAndAvailability = (carModelSizeMap, brand, carPricing) => {
  const models = Object.entries(carModelSizeMap?.[brand]?.models || {});
  if (!carPricing.hasSpecificPricing) return models.map(([model]) => model);

  const allowedSizes = new Set(
    Object.entries(carPricing.effectiveBySize)
      .filter(([, vehicle]) => Boolean(vehicle))
      .map(([sizeCode]) => sizeCode)
  );

  return models
    .filter(([, sizeCode]) => allowedSizes.has(getCarSizeCodeFromModelSize(sizeCode)))
    .map(([model]) => model);
};

const getCarSelectionForRow = (carModelSizeMap, row, carPricing) => {
  const resolvedSize = getCarModelSize(carModelSizeMap, row.brand, row.model) || row.presetSize;

  if (carPricing.hasSpecificPricing) {
    if (!resolvedSize) return null;

    const vehicle = carPricing.effectiveBySize[resolvedSize];
    if (!vehicle) return null;

    return {
      fare: vehicle.fare,
      sizeCode: resolvedSize,
      vehicleType: normalizeVehicleType(vehicle.vehicleType),
    };
  }

  if (!carPricing.commonVehicle) return null;

  return {
    fare: carPricing.commonVehicle.fare,
    sizeCode: resolvedSize,
    vehicleType: normalizeVehicleType(carPricing.commonVehicle.vehicleType),
  };
};

const getCarPricingSummary = (carPricing) => {
  if (!carPricing.relevantTypes.length) return "Not available";

  return `Starts from ₹ ${carPricing.minimumFare ?? 0}`;
};

const VehicleCounterCard = ({ vehicle, quantity, onChange, isMaxAddonReached }) => {
  const normalizedType = normalizeVehicleType(vehicle?.vehicleType);
  const Icon = VEHICLE_ICON_MAP[normalizedType] || Bike;
  const title = VEHICLE_TITLE_MAP[normalizedType] || normalizedType || "Unavailable";
  const maxQty = getSafeVehicleAvailableCount(vehicle);
  const isDisabled = !vehicle || vehicle.disabled || maxQty <= 0;
  const safeQty = toSafeCount(quantity);
  const isAtMax = safeQty >= maxQty;
  const iconColorClass = getAvailabilityColor(vehicle);

  return (
    <div className={`rounded-2xl border border-[#d6e0ea] bg-white px-3 py-2.5 shadow-[0_3px_10px_rgba(15,45,58,0.04)] transition ${isDisabled ? "opacity-60" : "hover:border-[#bfd0df]"}`}>
      <div className="flex items-start  justify-center gap-4">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="flex items-center gap-2 text-[var(--booking-primary)]">
            <Icon size={16} />
            <p className="text-[0.92rem] font-semibold tracking-tight">{title}</p>
          </div>
          <div className=" flex items-center gap-2 text-[0.78rem] text-[#64748b]">
            <span>{isDisabled ? "Not available" : `₹${vehicle.fare}`}</span>
            <span className={iconColorClass}>
              <Icon size={24} />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-3 sm:mt-3">
        <button
          type="button"
          onClick={() => onChange(vehicle?.vehicleType, vehicle?.fare, Math.max(0, safeQty - 1))}
          disabled={isDisabled || safeQty <= 0}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d5dde7] text-[var(--booking-primary)] transition hover:bg-[#f5f8fb] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Minus size={13} />
        </button>

        <span className="min-w-[1rem] text-center text-[1.45rem] font-semibold leading-none text-[var(--booking-primary)]">
          {safeQty}
        </span>

        <button
          type="button"
          onClick={() => onChange(vehicle?.vehicleType, vehicle?.fare, safeQty + 1)}
          disabled={isDisabled || isAtMax || isMaxAddonReached}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#d5dde7] text-[var(--booking-primary)] transition hover:bg-[#f5f8fb] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Plus size={13} />
        </button>
      </div>

      {!isDisabled && isAtMax ? (
        <p className="mt-1 text-center text-[0.74rem] font-medium text-amber-600">
          Maximum limit reached ({maxQty})
        </p>
      ) : null}
    </div>
  );
};

const VehiclesSection = () => {
  const dispatch = useDispatch();
  const tripValidation = useSelector(selectTripValidation);

  const vehicles = useSelector(selectAvailableVehicles);
  const selectedCarEntries = useSelector(selectSelectedCarEntries);
  const selectedVehicles = useSelector(selectSelectedVehicles);
  const travellers = useSelector(selectTravellers);
  const bookingConfig = useSelector(selectBookingConfigItems);
  const carModelSizeMap = useSelector(selectCarModelSizeMap);
  const addonLimitPerPerson = Number(bookingConfig?.MAX_ADDON_LIMIT ?? 1);
  const totalAllowedAddons = travellers.passengers * addonLimitPerPerson;
  const totalAddons = selectedVehicles.reduce(
    (sum, a) => sum + a.quantity,
    0
  );



  const isMaxAddonReached = totalAddons >= totalAllowedAddons;
  const hasMigratedLegacyCarsRef = useRef(false);

  const vehicleQtyMap = useMemo(() => {
    const map = {};
    selectedVehicles.forEach((vehicle) => {
      const key = normalizeVehicleType(vehicle.vehicleType);
      map[key] = (map[key] || 0) + toSafeCount(vehicle.quantity);
    });
    return map;
  }, [selectedVehicles]);

  const handleVehicleChange = useCallback((vehicleType, fare, quantity) => {
    const normalizedType = normalizeVehicleType(vehicleType);
    if (!normalizedType) return;
    dispatch(updateVehicle({
      vehicleType: normalizedType,
      fare,
      quantity: toSafeCount(quantity),
    }));
  }, [dispatch]);

  const carPricing = useMemo(() => buildCarPricing(vehicles), [vehicles]);
  const carRows = selectedCarEntries;

  useEffect(() => {
    if (hasMigratedLegacyCarsRef.current) return;

    if (selectedCarEntries.length > 0) {
      hasMigratedLegacyCarsRef.current = true;
      return;
    }

    const hasLegacyCars = selectedVehicles.some((vehicle) => isCarVehicleType(vehicle.vehicleType) && toSafeCount(vehicle.quantity) > 0);
    if (!hasLegacyCars) {
      hasMigratedLegacyCarsRef.current = true;
      return;
    }

    dispatch(setSelectedCarEntries(buildInitialCarRows(selectedVehicles, carPricing, createCarRowId)));
    hasMigratedLegacyCarsRef.current = true;
  }, [carPricing, dispatch, selectedCarEntries.length, selectedVehicles]);

  const selectedCarCountMap = useMemo(() => {
    const map = {};
    selectedVehicles
      .filter((vehicle) => isCarVehicleType(vehicle.vehicleType))
      .forEach((vehicle) => {
        const key = normalizeVehicleType(vehicle.vehicleType);
        map[key] = toSafeCount(vehicle.quantity);
      });
    return map;
  }, [selectedVehicles]);

  useEffect(() => {
    const nextCountMap = {};
    const nextFareMap = {};

    carRows.forEach((row) => {
      const selection = getCarSelectionForRow(carModelSizeMap, row, carPricing);
      if (!selection) return;

      nextCountMap[selection.vehicleType] = (nextCountMap[selection.vehicleType] || 0) + 1;
      nextFareMap[selection.vehicleType] = selection.fare;
    });

    carPricing.relevantTypes.forEach((vehicleType) => {
      const nextQty = nextCountMap[vehicleType] || 0;
      const currentQty = selectedCarCountMap[vehicleType] || 0;
      const fare = nextFareMap[vehicleType]
        ?? vehicles.find((vehicle) => normalizeVehicleType(vehicle.vehicleType) === vehicleType)?.fare
        ?? carPricing.commonVehicle?.fare
        ?? 0;

      if (nextQty !== currentQty) {
        handleVehicleChange(vehicleType, fare, nextQty);
      }
    });
  }, [carModelSizeMap, carPricing, carRows, handleVehicleChange, selectedCarCountMap, vehicles]);

  const availableCarBrands = useMemo(
    () => filterBrandsByAvailableSizes(carModelSizeMap, carPricing),
    [carModelSizeMap, carPricing]
  );

  const carQty = carRows.length;
  const carMaxQty = carPricing.totalAvailable;
  const carIconColorClass = getAvailabilityColorFromCounts(carPricing.totalAvailable, carPricing.totalCapacity);
  const carPriceSummary = useMemo(() => getCarPricingSummary(carPricing), [carPricing]);

  const addCarRow = useCallback(() => {
    dispatch(setSelectedCarEntries([...carRows, createCarRow(createCarRowId())]));
  }, [carRows, dispatch]);

  const removeCarRow = useCallback((rowId) => {
    dispatch(setSelectedCarEntries(carRows.filter((row) => row.id !== rowId)));
  }, [carRows, dispatch]);

  const updateCarRow = useCallback((rowId, patch) => {
    const nextRows = carRows.map((row) => {
      if (row.id !== rowId) return row;

      const nextRow = { ...row, ...patch };
      if (patch.brand !== undefined) {
        nextRow.model = "";
        nextRow.presetSize = null;
      }
      if (patch.model !== undefined) {
        nextRow.presetSize = getCarModelSize(carModelSizeMap, nextRow.brand, patch.model);
      }
      return nextRow;
    });

    dispatch(setSelectedCarEntries(nextRows));
  }, [carModelSizeMap, carRows, dispatch]);

  const vehicleCards = useMemo(() => {
    const nonCarVehicles = vehicles.filter((vehicle) => !isCarVehicleType(vehicle.vehicleType));
    const map = new Map(nonCarVehicles.map((vehicle) => [normalizeVehicleType(vehicle.vehicleType), vehicle]));

    const stableCards = DISPLAY_VEHICLE_TYPES.map((type) => map.get(type) || {
      vehicleType: type,
      fare: 0,
      available: 0,
      disabled: true,
    });

    return stableCards;
  }, [vehicles]);

  return (
    <section className="space-y-2 sm:space-y-3">
      <h3 className="text-[0.98rem] font-semibold tracking-tight text-[#071c3d]">
        Vehicles & Add-ons
      </h3>

      <div className={`rounded-[22px] border bg-white px-4 py-3.5 transition md:px-5 md:py-4 ${carQty > 0 ? "border-[#0f2d3a] shadow-[0_8px_22px_rgba(15,45,58,0.07)]" : "border-[#d7e0ea]"} ${!carPricing.relevantTypes.length ? "opacity-60" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[#071c3d]">
              <Car size={16} />
              <p className="text-[0.96rem] font-semibold tracking-tight">Cars</p>
              <span className="text-[0.9rem] font-medium text-[#4f6680] md:text-[0.94rem]">
                {carPriceSummary}
              </span>
              <span className={carIconColorClass}><Car size={15} /></span>
            </div>
          </div>

          <button
            type="button"
            onClick={addCarRow}
            disabled={!carPricing.relevantTypes.length || carMaxQty <= 0 || carRows.length >= carMaxQty}
            className="rounded-lg px-2 py-1 text-[1.1rem] font-semibold text-[#071c3d] transition hover:bg-[#eef3f8] hover:text-[#0f2d3a] disabled:cursor-not-allowed disabled:opacity-45"
          >
            + Add Car
          </button>
        </div>

        {carRows.length === 0 ? (
          <p className="mt-2 text-[0.92rem] text-[#4f6680] md:text-[0.96rem]">
            Click Add Car to add vehicles to your booking.
          </p>
        ) : null}

        {carRows.length > 0 ? (
          <div className="mt-2.5 space-y-2">
            {carRows.map((row, index) => {
              const brandModels = row.brand
                ? filterModelsByBrandAndAvailability(carModelSizeMap, row.brand, carPricing)
                : [];
              const rowSelection = getCarSelectionForRow(carModelSizeMap, row, carPricing);

              return (
                <div key={row.id} className="rounded-xl border border-[#d6e0ea] bg-white px-4 py-3 transition hover:border-[#c7d6e5]  sm:py-3.5">
                  <div className="grid gap-3 lg:grid-cols-[92px_1fr_1fr_auto] lg:items-start">
                    <p className="text-[1.02rem] font-semibold text-[#1f3b57]">
                      Car {index + 1}
                    </p>

                    <div className="space-y-1.5">
                      <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-[#35516e]">
                        Type
                      </p>
                      <select
                        value={row.brand}
                        onChange={(event) => updateCarRow(row.id, { brand: event.target.value })}
                        className="h-10 w-full rounded-[13px] border border-[#cdd8e4] bg-white px-4 text-[1.02rem] text-[#071c3d] outline-none transition focus:border-[#0f2d3a]"
                      >
                        <option value="">Select brand...</option>
                        {availableCarBrands.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-[#35516e]">
                        Brand / Model
                      </p>
                      <select
                        value={row.model}
                        onChange={(event) => updateCarRow(row.id, { model: event.target.value })}
                        disabled={!row.brand}
                        className="h-10 w-full rounded-[13px] border border-[#cdd8e4] bg-white px-4 text-[1.02rem] text-[#071c3d] outline-none transition focus:border-[#0f2d3a] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select model...</option>
                        {brandModels.map((model) => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>


                    <div className="flex items-center justify-end gap-2 lg:self-center">
                      <span className="whitespace-nowrap text-[0.92rem] font-semibold text-[#071c3d]">
                        {rowSelection ? `₹ ${rowSelection.fare}` : "Select model"}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCarRow(row.id)}
                        className="rounded-full border border-[#e3e9f0] p-1.5 text-[#ef4444] transition hover:bg-[#fff5f5]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {carPricing.relevantTypes.length > 0 && carMaxQty > 0 && carRows.length >= carMaxQty ? (
          <p className="mt-1 text-[0.74rem] font-medium text-amber-600">
            Maximum car limit reached ({carMaxQty})
          </p>
        ) : null}
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {vehicleCards.map((vehicle) => (
          <VehicleCounterCard
            key={vehicle.vehicleType}
            vehicle={vehicle}
            quantity={vehicleQtyMap[normalizeVehicleType(vehicle.vehicleType)] ?? 0}
            onChange={handleVehicleChange}
            isMaxAddonReached={isMaxAddonReached}
          />
        ))}
      </div>

      {!tripValidation.isValid && tripValidation.warnings.some((warning) => /CAR|BIKE|BUS|Addon|Pets/i.test(warning)) ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          {tripValidation.warnings.find((warning) => /CAR|BIKE|BUS|Addon|Pets/i.test(warning))}
        </div>
      ) : null}
    </section>
  );
};

export default VehiclesSection;
