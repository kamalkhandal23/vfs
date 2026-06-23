const CAR_FAMILY_TYPES = ["CAR", "SEDAN", "CAR_S", "CAR_M", "CAR_L"];

export const normalizeVehicleType = (type) => String(type || "")
  .trim()
  .toUpperCase()
  .replace(/-/g, "_");

export const isCarVehicleType = (type) => CAR_FAMILY_TYPES.includes(normalizeVehicleType(type));

export const getAcceptedVehicleTypes = (type) => {
  const normalizedType = normalizeVehicleType(type);
  return isCarVehicleType(normalizedType) ? CAR_FAMILY_TYPES : [normalizedType];
};

export const getCarSizeCodeFromModelSize = (sizeCode) => {
  const normalizedSize = String(sizeCode || "").trim().toUpperCase();
  if (normalizedSize === "XL") return "L";
  if (["S", "M", "L"].includes(normalizedSize)) return normalizedSize;
  return null;
};

export const getCarVehicleTypeFromSize = (sizeCode, fallbackType = "CAR") => {
  const normalizedFallback = normalizeVehicleType(fallbackType) || "CAR";
  const normalizedSize = getCarSizeCodeFromModelSize(sizeCode);

  if (!normalizedSize) return normalizedFallback;
  return `CAR_${normalizedSize}`;
};

export const getCarSizeFromVehicleType = (type) => {
  const normalizedType = normalizeVehicleType(type);
  if (normalizedType === "CAR_S") return "S";
  if (normalizedType === "CAR_M") return "M";
  if (normalizedType === "CAR_L") return "L";
  return null;
};

export const getVehicleAvailabilityCount = (vehicle) => {
  const parsed = Number(
    vehicle?.available
    ?? vehicle?.availableCount
    ?? vehicle?.totalCapacity
    ?? 0
  );

  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
};

export const getVehicleTotalCount = (vehicle) => {
  const total = Number(vehicle?.totalCapacity ?? 0);
  if (Number.isFinite(total) && total > 0) return Math.floor(total);
  return getVehicleAvailabilityCount(vehicle);
};
