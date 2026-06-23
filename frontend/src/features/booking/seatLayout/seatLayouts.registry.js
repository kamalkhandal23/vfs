import { normalizeTextKey } from "./seatLayout.utils";

const buildGroupSeats = ({ key, startRow, rowCount, columns, blockedSeatIds = [] }) => {
  const blocked = new Set(blockedSeatIds.map(String));
  const seats = [];

  for (let rowOffset = 0; rowOffset < rowCount; rowOffset += 1) {
    const rowNumber = startRow + rowOffset;
    const rowLabel = String.fromCharCode(65 + rowNumber - 1);

    columns.forEach((colNum) => {
      const seatId = `${rowLabel}${colNum}`;
      seats.push({
        seatId,
        rowLabel,
        colNum,
        isBlocked: blocked.has(seatId),
        rawPricing: key.includes("premium") ? "PREMIUM" : "STANDARD",
      });
    });
  }

  return seats;
};

const GENERIC_GROUPS = [
  {
    key: "premium_1",
    seats: buildGroupSeats({ key: "premium_1", startRow: 1, rowCount: 2, columns: [1, 2, 4, 5] }),
  },
  {
    key: "economy_1",
    seats: buildGroupSeats({ key: "economy_1", startRow: 3, rowCount: 3, columns: [1, 2, 4, 5] }),
  },
  {
    key: "economy_2",
    seats: buildGroupSeats({ key: "economy_2", startRow: 6, rowCount: 3, columns: [1, 2, 4, 5] }),
  },
];

const GENERIC_LAYOUT = {
  ferryId: "generic",
  groups: GENERIC_GROUPS,
};

const GROUP_CONTENT = {
  premium_1: {
    sectionLabel: "Premium Cabin",
    tier: "Premium",
    deckSection: "Upper Deck",
    amenities: ["Priority boarding", "Recliner seating"],
  },
  economy_1: {
    sectionLabel: "Economy Front",
    tier: "Economy",
    deckSection: "Main Deck",
    amenities: ["Standard seating"],
  },
  economy_2: {
    sectionLabel: "Economy Rear",
    tier: "Economy",
    deckSection: "Main Deck",
    amenities: ["Standard seating"],
  },
};

const PRICING_CONFIG = {
  STANDARD: 0,
  PLUS: 100,
  PREMIUM: 250,
};

const CATEGORY_GROUP_MAP = {
  premium: ["premium_1"],
  business: ["premium_1"],
  vip: ["premium_1"],
  deluxe: ["premium_1"],
  economy: ["economy_1", "economy_2"],
};

const registry = new Map();

const getGenericConfig = (ferryId) => ({
  layout: {
    ...GENERIC_LAYOUT,
    ferryId: ferryId ?? GENERIC_LAYOUT.ferryId,
  },
  groupContent: GROUP_CONTENT,
  pricingConfig: PRICING_CONFIG,
});

export const getSeatLayoutConfig = (ferryId) => {
  if (!registry.has(ferryId)) {
    registry.set(ferryId, getGenericConfig(ferryId));
  }

  return registry.get(ferryId);
};

export const hasSeatLayoutSupport = (ferryId) => ferryId !== null && ferryId !== undefined;

export const resolveSeatGroupKeysForCategory = (ferryId, categoryName, groups = []) => {
  const normalized = normalizeTextKey(categoryName);
  const config = getSeatLayoutConfig(ferryId);
  const availableKeys = new Set((groups.length ? groups : config?.layout?.groups ?? []).map((group) => group.key));

  const mapped = Object.entries(CATEGORY_GROUP_MAP).find(([key]) => normalized.includes(key))?.[1];
  if (mapped?.length) {
    return mapped.filter((key) => availableKeys.has(key));
  }

  const allKeys = Array.from(availableKeys);
  return allKeys.length ? allKeys : ["economy_1", "economy_2"];
};
