const DEFAULT_PRICING_LEVEL = "STANDARD";

export const normalizeTextKey = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export const normalizeSeatPricingLevel = (value = "") => {
  const normalized = normalizeTextKey(value);
  if (normalized.includes("premium")) return "PREMIUM";
  if (normalized.includes("plus")) return "PLUS";
  return DEFAULT_PRICING_LEVEL;
};

export const resolveEconomySeatSurcharge = (pricingConfig = {}, pricingLevel = DEFAULT_PRICING_LEVEL) =>
  Number(pricingConfig?.[pricingLevel] ?? 0);

export const buildSeatRows = (seats = []) => {
  const rowsMap = new Map();

  seats.forEach((seat) => {
    const rowLabel = String(seat?.rowLabel ?? "");
    if (!rowLabel) return;

    const colNum = Number(seat?.colNum ?? 0);
    if (!Number.isFinite(colNum) || colNum < 1) return;

    if (!rowsMap.has(rowLabel)) {
      rowsMap.set(rowLabel, []);
    }

    rowsMap.get(rowLabel).push({
      ...seat,
      colNum,
    });
  });

  return Array.from(rowsMap.entries())
    .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
    .map(([label, rowSeats]) => {
      const maxCol = rowSeats.reduce((max, seat) => Math.max(max, seat.colNum), 0);
      const slots = Array.from({ length: maxCol }, () => null);

      rowSeats.forEach((seat) => {
        slots[seat.colNum - 1] = seat;
      });

      return { label, slots };
    });
};
