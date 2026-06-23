import { createSelector } from "@reduxjs/toolkit";
import { isValidIndianMobile } from "../../../utils/validators/mobileValidation";
import {
  buildSeatRows,
  normalizeSeatPricingLevel,
  normalizeTextKey,
  resolveEconomySeatSurcharge,
} from "../seatLayout/seatLayout.utils";
import {
  getSeatLayoutConfig,
  hasSeatLayoutSupport,
  resolveSeatGroupKeysForCategory,
} from "../seatLayout/seatLayouts.registry";
import {
  selectChildSeatSurgeFee,
  selectSeatSelectionRulesByCruiseId,
} from "../bookingConfig/bookingConfigSlice";

/* =====================================================
   BASE SESSION
===================================================== */

const selectAvailabilitySession = (state) =>
  state.booking.availabilitySession;

/* =====================================================
   GENERIC FIELD SELECTOR
===================================================== */

export const selectSessionField = (field) =>
  createSelector(
    selectAvailabilitySession,
    (session) => session[field]
  );

/* =====================================================
   BASIC STATE
===================================================== */

export const selectStep = selectSessionField("step");
export const selectSnapshot = selectSessionField("snapshot");
export const selectTravellers = selectSessionField("travellers");
export const selectSelectedVehicles = selectSessionField("selectedVehicles");
export const selectSelectedCarEntries = selectSessionField("selectedCarEntries");
export const selectSelectedAddons = selectSessionField("selectedAddons");
export const selectPricing = selectSessionField("pricing");
export const selectSelectedDate = selectSessionField("selectedDate");
export const selectGuestDetails = selectSessionField("guestDetails");
export const selectSeatAssignments = selectSessionField("seatAssignments");
export const selectActiveSeatPassengerIdx = selectSessionField("activeSeatPassengerIdx");
export const selectLockedSeatCategoryCode = selectSessionField("lockedSeatCategoryCode");
export const selectReturnSeatAssignments = selectSessionField("returnSeatAssignments");
export const selectActiveReturnSeatPassengerIdx = selectSessionField("activeReturnSeatPassengerIdx");
export const selectLockedReturnSeatCategoryCode = selectSessionField("lockedReturnSeatCategoryCode");
export const selectConfirmHoldExpiresAt = selectSessionField("confirmHoldExpiresAt");
export const selectTermsAccepted = selectSessionField("termsAccepted");
export const selectBookingState = selectSessionField("booking");
export const selectGuestValidationVisible = selectSessionField("guestValidationVisible");
export const selectRoundTripFlowSource = selectSessionField("roundTripFlowSource");

export const selectAssignedSeatCount = createSelector(
  selectSeatAssignments,
  (seatAssignments) => seatAssignments.length
);

export const selectAllSeatsAssigned = createSelector(
  [selectAssignedSeatCount, selectTravellers],
  (assignedSeatCount, travellers) => assignedSeatCount >= ((travellers?.passengers || 0) + (travellers?.infants || 0))
);

export const selectBookingSuccess = createSelector(
  selectBookingState,
  (booking) => booking.success
);

export const selectBookingLoading = createSelector(
  selectBookingState,
  (booking) => booking.loading
);

export const selectIsPrimaryGuestComplete = createSelector(
  selectGuestDetails,
  (guestDetails) => {
    const primaryGuest = guestDetails?.[0] || {};

    const name = (primaryGuest.name || "").trim();
    const email = (primaryGuest.email || "").trim();
    const phone = (primaryGuest.phone || "").trim();
    const dob = (primaryGuest.dob || "").trim();
    const gender = (primaryGuest.gender || "").trim();
    const nationality = (primaryGuest.nationality || "").trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      name.length > 0
      && emailPattern.test(email)
      && isValidIndianMobile(phone)
      && dob.length > 0
      && gender.length > 0
      && nationality.length > 0
    );
  }
);

/* =====================================================
   DATE
===================================================== */

export const selectFormattedDate = createSelector(
  selectSelectedDate,
  (date) => {
    if (!date) return null;

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
);

/* =====================================================
   ROUTES
===================================================== */

export const selectRoutes = createSelector(
  selectSnapshot,
  (snapshot) => snapshot?.routes ?? []
);

const selectMasterActiveRoutes = createSelector(
  (state) => state.booking.routes.data.ACTIVE ?? [],
  (routes) =>
    routes
      .filter((route) => (route?.status || "").toUpperCase() === "ACTIVE")
      .map((route) => ({
        routeId: route.id,
        routeName: `${route.origin} -> ${route.destination}`,
        sailings: [],
      }))
);

export const selectSelectedRouteId = selectSessionField("selectedRouteId");

export const selectSelectedRoute = createSelector(
  [selectRoutes, selectMasterActiveRoutes, selectSelectedRouteId],
  (routes, masterRoutes, routeId) =>
    routes.find((r) => r.routeId === routeId)
    ?? masterRoutes.find((r) => r.routeId === routeId)
    ?? null
);

const getRouteHaulType = (route) => {
  const hasMandatorySeatSelection =
    route?.sailings?.some((s) => s?.seatSelectionMandatory === true) ?? false;
  return hasMandatorySeatSelection ? "LONG_HAUL" : "SHORT_HAUL";
};

export const selectRoutesWithHaulType = createSelector(
  selectRoutes,
  (routes) =>
    routes.map((route) => ({
      ...route,
      haulType: getRouteHaulType(route),
    }))
);

export const selectSelectedRouteHaulType = createSelector(
  selectSelectedRoute,
  (route) => (route ? getRouteHaulType(route) : null)
);

export const selectSelectedRouteIsLongHaul = createSelector(
  selectSelectedRouteHaulType,
  (haulType) => haulType === "LONG_HAUL"
);

/* =====================================================
   SLOTS (SAILINGS)
===================================================== */

export const selectSelectedSlotId = selectSessionField("selectedSlotId");
export const selectSelectedFerryId = selectSessionField("selectedFerryId");

export const selectSailingsForSelectedRoute = createSelector(
  selectSelectedRoute,
  (route) => route?.sailings ?? []
);

export const selectSelectedSlot = createSelector(
  [selectSailingsForSelectedRoute, selectSelectedSlotId],
  (sailings, slotId) =>
    sailings.find((s) => s.slotId === slotId) ?? null
);

const DEFAULT_NO_SEAT_SELECTION_TOOLTIP = "Seat selection is not required for this ferry.";

const getSeatSelectionRuleForFerry = (rulesByCruiseId, ferryId) => {
  if (!ferryId) return null;
  return rulesByCruiseId?.[String(ferryId)] ?? null;
};

export const selectEffectiveFerryId = createSelector(
  [selectSelectedFerryId, selectSelectedSlot],
  (selectedFerryId, selectedSlot) => selectedFerryId ?? selectedSlot?.ferry?.ferryId ?? null
);

export const selectSelectedFerrySeatSelectionRule = createSelector(
  [selectSeatSelectionRulesByCruiseId, selectEffectiveFerryId],
  (rulesByCruiseId, effectiveFerryId) => getSeatSelectionRuleForFerry(rulesByCruiseId, effectiveFerryId)
);


export const selectSeatPassengerFlowEnabled = createSelector(
  [selectSelectedFerrySeatSelectionRule, selectEffectiveFerryId, selectSelectedSlot],
  (seatRule, effectiveFerryId, selectedSlot) => {
    if (typeof seatRule?.seatSelectionMandatory === "boolean") {
      return seatRule.seatSelectionMandatory;
    }

    return selectedSlot?.seatSelectionMandatory === true || hasSeatLayoutSupport(effectiveFerryId);
  }
);

export const selectSeatFlowDisabledTooltip = createSelector(
  selectSelectedFerrySeatSelectionRule,
  (seatRule) => seatRule?.noSeatSelectionTooltip || DEFAULT_NO_SEAT_SELECTION_TOOLTIP
);

/* =====================================================
   CATEGORIES
===================================================== */

export const selectSelectedCategoryId =
  selectSessionField("selectedCategoryId");

export const selectAvailableCategories = createSelector(
  selectSelectedSlot,
  (slot) => slot?.categories ?? []
);

const isEconomyGroupKey = (groupKey = "") => ECONOMY_GROUP_KEYS.has(normalizeTextKey(groupKey));

const buildGroupedCategories = (categories = [], seatLayoutConfig, groups = []) => {
  const groupedMap = new Map();

  categories.forEach((category, index) => {
    const resolvedGroupKeys = resolveSeatGroupKeysForCategory(
      seatLayoutConfig?.layout?.ferryId,
      category?.categoryName,
      groups
    );

    const normalizedName = normalizeTextKey(category?.categoryName);
    const isEconomyCategory =
      normalizedName === "economy"
      || normalizedName.startsWith("economy_")
      || resolvedGroupKeys.some((groupKey) => isEconomyGroupKey(groupKey));

    const key = isEconomyCategory ? ECONOMY_GROUP_CODE : `category_${category.categoryId}`;
    const availableSeats = Number(category?.availableSeats ?? 0);
    const categoryFare = Number(category?.fare ?? 0);

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        key,
        index,
        isGroupedEconomy: isEconomyCategory,
        categoryName: isEconomyCategory ? "Economy" : (category?.categoryName ?? "Seat Category"),
        representativeCategory: category,
        baseFare: categoryFare,
        availableSeats,
        apiCategories: [category],
        groupKeys: new Set(resolvedGroupKeys),
      });
      return;
    }

    const current = groupedMap.get(key);
    current.apiCategories.push(category);
    current.availableSeats += availableSeats;
    resolvedGroupKeys.forEach((groupKey) => current.groupKeys.add(groupKey));

    if (categoryFare < current.baseFare) {
      current.baseFare = categoryFare;
      current.representativeCategory = category;
    }
  });

  return Array.from(groupedMap.values())
    .sort((left, right) => left.index - right.index)
    .map((item) => ({
      categoryId: item.representativeCategory?.categoryId ?? null,
      categoryName: item.categoryName,
      fare: item.baseFare,
      availableSeats: item.availableSeats,
      apiCategoryIds: item.apiCategories.map((category) => category.categoryId),
      apiCategories: item.apiCategories,
      isGroupedEconomy: item.isGroupedEconomy,
      groupKeys: Array.from(item.groupKeys),
    }));
};

export const selectGroupedAvailableCategories = createSelector(
  [selectAvailableCategories, selectSelectedFerryId, selectSelectedSlot],
  (categories, selectedFerryId, selectedSlot) => {
    const ferryIdFromSlot = selectedSlot?.ferry?.ferryId ?? null;
    const effectiveFerryId = selectedFerryId ?? ferryIdFromSlot;
    const seatLayoutConfig = getSeatLayoutConfig(effectiveFerryId);
    const groups = seatLayoutConfig?.layout?.groups ?? [];
    return buildGroupedCategories(categories, seatLayoutConfig, groups);
  }
);

export const selectSelectedGroupedCategory = createSelector(
  [selectGroupedAvailableCategories, selectSelectedCategoryId],
  (categories, selectedCategoryId) =>
    categories.find((category) => category.apiCategoryIds?.includes(selectedCategoryId))
    ?? categories[0]
    ?? null
);

export const selectSelectedCategory = createSelector(
  [selectAvailableCategories, selectSelectedCategoryId],
  (categories, categoryId) =>
    categories.find((c) => c.categoryId === categoryId) ?? categories[0] ?? null
);

const SEAT_CATEGORY_COLORS = ["#0f2d3a", "#0c4a6e", "#9a3412", "#1d4ed8", "#166534"];
const ECONOMY_GROUP_CODE = "economy";
const ECONOMY_GROUP_KEYS = new Set(["economy_f", "economy_1", "economy_2", "economy_3", "economy_4", "economy_5"]);

const hashText = (value = "") => {
  let hash = 0;
  const text = String(value);
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const buildMockOccupiedSeatIds = (seats = [], categoryCode = "") => {
  const candidateSeatIds = seats
    .filter((seat) => seat && !seat.isBlocked)
    .map((seat) => seat.seatId)
    .filter(Boolean);

  if (!candidateSeatIds.length) return new Set();

  const targetCount = Math.min(candidateSeatIds.length, 2 + (hashText(categoryCode) % 2));
  const sortedByWeight = [...candidateSeatIds]
    .sort((left, right) => hashText(`${categoryCode}-${left}`) - hashText(`${categoryCode}-${right}`));

  return new Set(sortedByWeight.slice(0, targetCount));
};

export const selectSeatLayoutConfig = createSelector(
  [selectSelectedFerryId, selectSelectedSlot],
  (selectedFerryId, selectedSlot) => {
    const ferryIdFromSlot = selectedSlot?.ferry?.ferryId ?? null;
    const effectiveFerryId = selectedFerryId ?? ferryIdFromSlot;
    return getSeatLayoutConfig(effectiveFerryId);
  }
);

export const selectSeatLayoutGroups = createSelector(
  selectSeatLayoutConfig,
  (config) => config?.layout?.groups ?? []
);

export const selectSeatAssignmentsByKey = createSelector(
  selectSeatAssignments,
  (assignments) =>
    assignments.reduce((map, assignment) => {
      map[`${assignment.categoryCode}__${assignment.seatId}`] = assignment;
      return map;
    }, {})
);

export const selectReturnSeatAssignmentsByKey = createSelector(
  selectReturnSeatAssignments,
  (assignments) =>
    assignments.reduce((map, assignment) => {
      map[`${assignment.categoryCode}__${assignment.seatId}`] = assignment;
      return map;
    }, {})
);

export const selectDynamicSeatCategories = createSelector(
  [
    selectGroupedAvailableCategories,
    selectSeatLayoutConfig,
    selectSeatLayoutGroups,
    selectSeatAssignmentsByKey,
    selectActiveSeatPassengerIdx,
  ],
  (categories, seatLayoutConfig, groups, assignmentsByKey, activePassengerIdx) => {
    const groupContent = seatLayoutConfig?.groupContent ?? {};
    const pricingConfig = seatLayoutConfig?.pricingConfig ?? {};

    return categories.map((category, index) => {
      const code = category?.isGroupedEconomy ? ECONOMY_GROUP_CODE : String(category.categoryId);
      const categoryEntries = category?.apiCategories?.length ? category.apiCategories : [category];
      const groupCategoryMap = new Map();

      categoryEntries.forEach((entry) => {
        const resolvedKeys = resolveSeatGroupKeysForCategory(
          seatLayoutConfig?.layout?.ferryId,
          entry?.categoryName,
          groups
        );
        resolvedKeys.forEach((groupKey) => {
          const current = groupCategoryMap.get(groupKey);
          if (!current || Number(entry?.fare ?? 0) < Number(current?.fare ?? 0)) {
            groupCategoryMap.set(groupKey, entry);
          }
        });
      });

      const groupKeys = category?.groupKeys?.length
        ? category.groupKeys
        : Array.from(groupCategoryMap.keys());

      const basePrice = Number(category?.fare ?? 0);
      const groupedSeats = groups
        .filter((group) => groupKeys.includes(group.key))
        .flatMap((group) => group.seats.map((seat) => ({ ...seat, groupKey: group.key })));
      const mockOccupiedSeatIds = buildMockOccupiedSeatIds(groupedSeats, code);
      const contentItems = groupKeys
        .map((groupKey) => groupContent[groupKey])
        .filter(Boolean);
      const primaryContent = contentItems[0] ?? null;
      const mergedAmenities = Array.from(
        new Set(contentItems.flatMap((content) => content.amenities ?? []))
      );

      const rows = buildSeatRows(groupedSeats).map((row) => ({
        ...row,
        slots: row.slots.map((seat) => {
          if (!seat) return seat;

          const assignment = assignmentsByKey[`${code}__${seat.seatId}`];
          const state = assignment
            ? assignment.passengerIdx === activePassengerIdx
              ? "selected"
              : "other_pax"
            : seat.isBlocked
              ? "blocked"
              : mockOccupiedSeatIds.has(seat.seatId)
                ? "occupied"
                : "available";

          const resolvedApiCategory = groupCategoryMap.get(seat.groupKey) ?? categoryEntries[0] ?? null;
          const pricingLevel = normalizeSeatPricingLevel(seat.rawPricing);
          const surcharge = category?.isGroupedEconomy
            ? resolveEconomySeatSurcharge(pricingConfig, pricingLevel)
            : 0;

          return {
            ...seat,
            state,
            apiCategoryId: resolvedApiCategory?.categoryId ?? category.categoryId,
            apiCategoryName: resolvedApiCategory?.categoryName ?? category.categoryName,
            pricingLevel,
            surcharge,
            price: basePrice + surcharge,
          };
        }),
      }));

      return {
        code,
        apiCategoryId: category.categoryId,
        apiCategoryIds: category?.apiCategoryIds ?? [category.categoryId],
        name: category.categoryName,
        label: groupKeys.length > 0 ? `${groupedSeats.length} seats mapped` : "No mapped seats",
        price: basePrice,
        basePrice,
        isGroupedEconomy: Boolean(category?.isGroupedEconomy),
        available: category.availableSeats,
        colorHex: SEAT_CATEGORY_COLORS[index % SEAT_CATEGORY_COLORS.length],
        sectionLabel: primaryContent?.sectionLabel ?? category.categoryName,
        tier: primaryContent?.tier ?? "Passenger",
        deckSection: primaryContent?.deckSection ?? "Main Deck",
        amenities: mergedAmenities,
        specs: primaryContent?.specs ?? null,
        groupKeys,
        hasMappedLayout: rows.length > 0,
        layout: {
          portLabel: "Port",
          starboardLabel: "Starboard",
          rows,
        },
      };
    });
  }
);

export const selectSelectedDynamicSeatCategory = createSelector(
  [selectDynamicSeatCategories, selectSelectedCategoryId],
  (categories, selectedCategoryId) =>
    categories.find((category) => category.apiCategoryIds?.includes(selectedCategoryId))
    ?? categories[0]
    ?? null
);

/* =====================================================
   VEHICLES
===================================================== */

export const selectAvailableVehicles = createSelector(
  selectSelectedSlot,
  (slot) => slot?.vehicles ?? []
);

/* =====================================================
   VEHICLE LOOKUP MAP
===================================================== */

export const selectVehicleQtyMap = createSelector(
  selectSelectedVehicles,
  (vehicles) =>
    vehicles.reduce((map, v) => {
      map[v.vehicleType] = v.quantity;
      return map;
    }, {})
);

/* =====================================================
   JOURNEY MODE & RETURN JOURNEY
===================================================== */

export const selectJourneyMode = selectSessionField("journeyMode");

export const selectReturnJourney = selectSessionField("returnJourney");

export const selectIsRoundTrip = createSelector(
  selectJourneyMode,
  (mode) => mode === "ROUND_TRIP"
);

export const selectReturnSelectedDate = createSelector(
  selectReturnJourney,
  (rj) => rj?.date ?? null
);

export const selectReturnSnapshot = createSelector(
  selectReturnJourney,
  (rj) => rj?.snapshot ?? null
);

export const selectReturnSlotId = createSelector(
  selectReturnJourney,
  (rj) => rj?.slotId ?? null
);

export const selectReturnCategoryId = createSelector(
  selectReturnJourney,
  (rj) => rj?.categoryId ?? null
);

const parseRouteEndpoints = (routeName) => {
  if (!routeName || typeof routeName !== "string") return [];
  return routeName
    .split(/\s*(?:<->|->|<-|–|—|→|↔|-)\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
};

const isReverseRoute = (candidateName, from, to) => {
  const parts = parseRouteEndpoints(candidateName);
  return parts.length === 2 && parts[0] === to && parts[1] === from;
};

// All routes from the return snapshot
export const selectReturnRoutes = createSelector(
  selectReturnJourney,
  (rj) => rj?.snapshot?.routes ?? []
);

// Return route — always resolved from the RETURN snapshot
export const selectReturnRoute = createSelector(
  [selectReturnRoutes, selectReturnJourney, selectSelectedRoute],
  (returnRoutes, returnJourney, departureRoute) => {
    if (!returnRoutes.length) return null;

    // 1) Match by routeId (set by slice on fetch)
    if (returnJourney?.routeId) {
      const byId = returnRoutes.find((r) => r.routeId === returnJourney.routeId);
      if (byId) return byId;
    }

    // 2) Reverse name match
    if (departureRoute?.routeName) {
      const [from, to] = parseRouteEndpoints(departureRoute.routeName);
      if (from && to) {
        const reverse = returnRoutes.find((r) => isReverseRoute(r.routeName, from, to));
        if (reverse) return reverse;
      }
    }

    return null;
  }
);

// Sailings on the return route
export const selectReturnSailings = createSelector(
  selectReturnRoute,
  (route) => route?.sailings ?? []
);

export const selectReturnSlot = createSelector(
  [selectReturnSailings, selectReturnSlotId],
  (sailings, slotId) => sailings.find((s) => s.slotId === slotId) ?? null
);

export const selectReturnAvailableCategories = createSelector(
  selectReturnSlot,
  (slot) => slot?.categories ?? []
);

export const selectGroupedReturnAvailableCategories = createSelector(
  [selectReturnAvailableCategories, selectReturnSlot],
  (categories, returnSlot) => {
    const ferryId = returnSlot?.ferry?.ferryId ?? null;
    const seatLayoutConfig = getSeatLayoutConfig(ferryId);
    const groups = seatLayoutConfig?.layout?.groups ?? [];
    return buildGroupedCategories(categories, seatLayoutConfig, groups);
  }
);

export const selectSelectedGroupedReturnCategory = createSelector(
  [selectGroupedReturnAvailableCategories, selectReturnCategoryId],
  (categories, selectedCategoryId) =>
    categories.find((category) => category.apiCategoryIds?.includes(selectedCategoryId))
    ?? categories[0]
    ?? null
);

export const selectReturnCategory = createSelector(
  [selectReturnAvailableCategories, selectReturnCategoryId],
  (categories, categoryId) =>
    categories.find((c) => c.categoryId === categoryId) ?? null
);

export const selectReturnSeatLayoutConfig = createSelector(
  [selectReturnSlot],
  (returnSlot) => {
    const ferryId = returnSlot?.ferry?.ferryId ?? null;
    return getSeatLayoutConfig(ferryId);
  }
);

export const selectReturnSeatLayoutGroups = createSelector(
  selectReturnSeatLayoutConfig,
  (config) => config?.layout?.groups ?? []
);

export const selectDynamicReturnSeatCategories = createSelector(
  [
    selectGroupedReturnAvailableCategories,
    selectReturnSeatLayoutConfig,
    selectReturnSeatLayoutGroups,
    selectReturnSeatAssignmentsByKey,
    selectActiveReturnSeatPassengerIdx,
  ],
  (categories, seatLayoutConfig, groups, assignmentsByKey, activePassengerIdx) => {
    const groupContent = seatLayoutConfig?.groupContent ?? {};
    const pricingConfig = seatLayoutConfig?.pricingConfig ?? {};

    return categories.map((category, index) => {
      const code = category?.isGroupedEconomy ? ECONOMY_GROUP_CODE : String(category.categoryId);
      const categoryEntries = category?.apiCategories?.length ? category.apiCategories : [category];
      const groupCategoryMap = new Map();

      categoryEntries.forEach((entry) => {
        const resolvedKeys = resolveSeatGroupKeysForCategory(
          seatLayoutConfig?.layout?.ferryId,
          entry?.categoryName,
          groups
        );
        resolvedKeys.forEach((groupKey) => {
          const current = groupCategoryMap.get(groupKey);
          if (!current || Number(entry?.fare ?? 0) < Number(current?.fare ?? 0)) {
            groupCategoryMap.set(groupKey, entry);
          }
        });
      });

      const groupKeys = category?.groupKeys?.length
        ? category.groupKeys
        : Array.from(groupCategoryMap.keys());

      const basePrice = Number(category?.fare ?? 0);
      const groupedSeats = groups
        .filter((group) => groupKeys.includes(group.key))
        .flatMap((group) => group.seats.map((seat) => ({ ...seat, groupKey: group.key })));
      const mockOccupiedSeatIds = buildMockOccupiedSeatIds(groupedSeats, `${code}-RETURN`);
      const contentItems = groupKeys
        .map((groupKey) => groupContent[groupKey])
        .filter(Boolean);
      const primaryContent = contentItems[0] ?? null;
      const mergedAmenities = Array.from(
        new Set(contentItems.flatMap((content) => content.amenities ?? []))
      );

      const rows = buildSeatRows(groupedSeats).map((row) => ({
        ...row,
        slots: row.slots.map((seat) => {
          if (!seat) return seat;

          const assignment = assignmentsByKey[`${code}__${seat.seatId}`];
          const state = assignment
            ? assignment.passengerIdx === activePassengerIdx
              ? "selected"
              : "other_pax"
            : seat.isBlocked
              ? "blocked"
              : mockOccupiedSeatIds.has(seat.seatId)
                ? "occupied"
                : "available";

          const resolvedApiCategory = groupCategoryMap.get(seat.groupKey) ?? categoryEntries[0] ?? null;
          const pricingLevel = normalizeSeatPricingLevel(seat.rawPricing);
          const surcharge = category?.isGroupedEconomy
            ? resolveEconomySeatSurcharge(pricingConfig, pricingLevel)
            : 0;

          return {
            ...seat,
            state,
            apiCategoryId: resolvedApiCategory?.categoryId ?? category.categoryId,
            apiCategoryName: resolvedApiCategory?.categoryName ?? category.categoryName,
            pricingLevel,
            surcharge,
            price: basePrice + surcharge,
          };
        }),
      }));

      return {
        code,
        apiCategoryId: category.categoryId,
        apiCategoryIds: category?.apiCategoryIds ?? [category.categoryId],
        name: category.categoryName,
        label: groupKeys.length > 0 ? `${groupedSeats.length} seats mapped` : "No mapped seats",
        price: basePrice,
        basePrice,
        isGroupedEconomy: Boolean(category?.isGroupedEconomy),
        available: category.availableSeats,
        colorHex: SEAT_CATEGORY_COLORS[index % SEAT_CATEGORY_COLORS.length],
        sectionLabel: primaryContent?.sectionLabel ?? category.categoryName,
        tier: primaryContent?.tier ?? "Passenger",
        deckSection: primaryContent?.deckSection ?? "Main Deck",
        amenities: mergedAmenities,
        specs: primaryContent?.specs ?? null,
        groupKeys,
        hasMappedLayout: rows.length > 0,
        layout: {
          portLabel: "Port",
          starboardLabel: "Starboard",
          rows,
        },
      };
    });
  }
);

export const selectSelectedDynamicReturnSeatCategory = createSelector(
  [selectDynamicReturnSeatCategories, selectReturnCategoryId],
  (categories, selectedCategoryId) =>
    categories.find((category) => category.apiCategoryIds?.includes(selectedCategoryId))
    ?? categories[0]
    ?? null
);

/* =====================================================
   BOOKING RESULT (ROUND TRIP)
===================================================== */

export const selectDepartureResult = createSelector(
  selectBookingState,
  (booking) => booking.departureResult
);

export const selectReturnResult = createSelector(
  selectBookingState,
  (booking) => booking.returnResult
);

export const selectBookingPartialSuccess = createSelector(
  selectBookingState,
  (booking) => booking.partialSuccess
);

export const selectTripValidation = createSelector(
  [
    selectTravellers,
    selectSelectedCategory,
    selectSelectedSlot,
    selectSelectedVehicles,
    selectSelectedAddons,
  ],
  (travellers, category, slot, selectedVehicles, selectedAddons) => {
    const warnings = [];

    const passengers = Number(travellers?.passengers ?? 0);
    const infants = Number(travellers?.infants ?? 0);
    const pets = Number(travellers?.pets ?? 0);

    if (!Number.isInteger(passengers) || passengers < 0) {
      warnings.push("Passengers count cannot be negative.");
    }
    if (!Number.isInteger(infants) || infants < 0) {
      warnings.push("Infants count cannot be negative.");
    }
    if (!Number.isInteger(pets) || pets < 0) {
      warnings.push("Pets count cannot be negative.");
    }

    if (passengers + infants < 1) {
      warnings.push("At least 1 passenger or infant is required to continue.");
    }

    const totalPassengers = Number(travellers?.passengers ?? 0);
    const totalTravellersForLimit = totalPassengers + Number(travellers?.infants ?? 0);
    const totalAddons = selectedVehicles.reduce(
      (sum, a) => sum + a.quantity,
      0
    );

    if (totalAddons > totalTravellersForLimit) {
      warnings.push(`Only 1 addon allowed per traveller (max ${totalTravellersForLimit}).`);
    }
    if (pets > totalTravellersForLimit) {
      warnings.push(`Only 1 pet allowed per traveller (max ${totalTravellersForLimit}).`);
    }

    const adultSeats = Number(category?.adultSeats);
    const childSeats = Number(category?.childSeats);
    const availableSeats = Number(category?.availableSeats);

    const hasAdultLimit = category?.adultSeats !== null && category?.adultSeats !== undefined && Number.isFinite(adultSeats);
    const hasChildLimit = category?.childSeats !== null && category?.childSeats !== undefined && Number.isFinite(childSeats);
    const hasTotalSeatLimit = Number.isFinite(availableSeats) && availableSeats >= 0;

    if (hasAdultLimit && passengers > adultSeats) {
      warnings.push(`Passengers exceed seat class limit (${adultSeats}).`);
    }
    if (hasChildLimit && infants > childSeats) {
      warnings.push(`Infants exceed seat class limit (${childSeats}).`);
    }
    if (hasTotalSeatLimit && passengers + infants > availableSeats) {
      warnings.push(`Total travellers exceed available seats (${availableSeats}).`);
    }

    const slotVehicles = slot?.vehicles || [];
    selectedVehicles.forEach((vehicle) => {
      const match = slotVehicles.find((item) => item.vehicleType === vehicle.vehicleType);
      const limit = Number(match?.available ?? match?.availableCount ?? match?.totalCapacity);
      if (Number.isFinite(limit) && vehicle.quantity > limit) {
        warnings.push(`${vehicle.vehicleType} quantity exceeds available limit (${limit}).`);
      }
    });

    const slotAddons = slot?.addons || [];
    selectedAddons.forEach((addon) => {
      const match = slotAddons.find((item) => (item.addonId || item.id) === addon.id);
      const limit = Number(match?.available ?? match?.availableCount ?? match?.totalCapacity);
      if (Number.isFinite(limit) && addon.quantity > limit) {
        warnings.push(`${addon.name || "Addon"} quantity exceeds available limit (${limit}).`);
      }
    });

    const petAddon = slotAddons.find((addon) => /pet/i.test(addon.addonName || addon.name || ""));
    if (petAddon) {
      const petLimit = Number(
        petAddon.available
        ?? petAddon.availableCount
        ?? petAddon.totalCapacity
      );
      if (Number.isFinite(petLimit) && pets > petLimit) {
        warnings.push(`Pets exceed available limit (${petLimit}).`);
      }
    }

    return {
      isValid: warnings.length === 0,
      warnings,
    };
  }
);



/* =====================================================
   BOOKING SUMMARY (UI)
===================================================== */

export const selectBookingSummary = createSelector(
  [
    selectFormattedDate,
    selectSelectedRoute,
    selectSelectedSlot,
    selectSelectedGroupedCategory,
    selectSelectedCategory,
    selectTravellers,
    selectSelectedVehicles,
    selectSelectedAddons,
    selectPricing,
    selectReturnSelectedDate,
    selectReturnRoute,
    selectReturnSlot,
    selectSelectedGroupedReturnCategory,
    selectReturnCategory,
    selectJourneyMode,
    selectChildSeatSurgeFee,
  ],
  (
    date,
    route,
    slot,
    category,
    selectedCategory,
    travellers,
    vehicles,
    addons,
    pricing,
    returnDate,
    returnRoute,
    returnSlot,
    returnCategory,
    selectedReturnCategory,
    journeyMode,
    childSeatSurgeFee
  ) => {

    const vehicleQty = vehicles.reduce((s, v) => s + v.quantity, 0);
    const vehicleRate = vehicles.reduce((s, v) => s + v.fare, 0);

    const addonQty = addons.reduce((s, a) => s + a.quantity, 0);
    const addonRate = addons.reduce((s, a) => s + a.price, 0);

    const [from, to] = parseRouteEndpoints(route?.routeName) ?? [];

    // Return journey display fields
    const returnD = returnDate ? new Date(returnDate) : null;
    const returnFormattedDate = returnD
      ? returnD.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : null;

    const [rFrom, rTo] = parseRouteEndpoints(returnRoute?.routeName) ?? [];
    const adults = travellers.passengers;
    const children = travellers.infants || 0;
    const totalPassengers = adults + children;
    const safeChildSeatSurgeFee = Math.max(0, Number(childSeatSurgeFee || 0));
    const childSeatSurgeAmount = children * safeChildSeatSurgeFee * (journeyMode === "ROUND_TRIP" ? 2 : 1);
    const departureBaseSeatAmount = Number(selectedCategory?.fare ?? 0) * totalPassengers;
    const returnBaseSeatAmount = Number(selectedReturnCategory?.fare ?? 0) * totalPassengers;
    const departureSurgeAmount = Math.max(0, Number(pricing.baseFare ?? 0) - departureBaseSeatAmount);
    const returnSurgeAmount = Math.max(0, Number(pricing.returnBaseFare ?? 0) - returnBaseSeatAmount);

    return {
      date,
      journeyMode,

      ferryName: slot?.ferry?.ferryName,

      journey: {
        departureTime: slot?.departureTime ?? null,
        arrivalTime: slot?.arrivalTime ?? null,
        from: from?.trim() ?? null,
        to: to?.trim() ?? null,
      },

      categoryName: category?.categoryName,

      passengers: adults,
      adults,
      children,
      totalPassengers,

      vehicleQty,
      vehicleRate,
      vehicles,

      addonQty,
      addonRate,
      addons,

      baseFare: pricing.baseFare,
      returnBaseFare: pricing.returnBaseFare ?? 0,
      departureBaseSeatAmount,
      returnBaseSeatAmount,
      departureSurgeAmount,
      returnSurgeAmount,
      seatSurgeAmount: departureSurgeAmount + returnSurgeAmount,
      vehicleFare: pricing.vehicleFare,
      addonFare: pricing.addonFare,
      subtotal: Number(pricing.subtotal ?? 0) + childSeatSurgeAmount,
      total: Number(pricing.total ?? 0) + childSeatSurgeAmount,
      infantFare: pricing.infantFare,
      childSeatSurgeFee: safeChildSeatSurgeFee,
      childSeatSurgeAmount,

      // Return leg
      returnDate: returnFormattedDate,
      returnFerryName: returnSlot?.ferry?.ferryName ?? null,
      returnJourney: {
        departureTime: returnSlot?.departureTime ?? null,
        arrivalTime: returnSlot?.arrivalTime ?? null,
        from: rFrom?.trim() ?? null,
        to: rTo?.trim() ?? null,
      },
      returnCategoryName: returnCategory?.categoryName ?? null,
    };
  }
);

export const selectBookingResult = createSelector(
  selectBookingState,
  (booking) => booking.result
);
