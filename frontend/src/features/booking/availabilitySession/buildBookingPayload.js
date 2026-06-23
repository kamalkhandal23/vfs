const CHILD_SEAT_SURGE_FEE_CONFIG_KEY = "CHILD_SEAT_SURGE_FEE";

const toFiniteNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const resolveChildSeatSurgeFee = (bookingConfig) => Math.max(
  0,
  toFiniteNumber(bookingConfig?.[CHILD_SEAT_SURGE_FEE_CONFIG_KEY], 0)
);

export const buildBookingPayload = (session, bookingConfig = {}) => {

  const {
    snapshot,
    selectedRouteId,
    selectedSlotId,
    selectedCategoryId,
    travellers,
    selectedVehicles,
    selectedAddons,
    guestDetails,
    seatAssignments,
    returnSeatAssignments,
    coupon,
    pricing
  } = session;

  const route = snapshot.routes.find(r => r.routeId === selectedRouteId);

  const slot = route.sailings.find(s => s.slotId === selectedSlotId);

  const category = slot.categories.find(
    c => c.categoryId === selectedCategoryId
  );

  const categoryByName = (slot.categories || []).reduce((map, item) => {
    map[item.categoryName] = item;
    return map;
  }, {});

  /* ---------------- Seats ---------------- */

  const seatCounts = {};
  const seatPrices = {};

  (seatAssignments || []).forEach((assignment) => {
    const apiCategoryName = assignment?.apiCategoryName || assignment?.categoryName || category?.categoryName;
    if (!apiCategoryName) return;

    seatCounts[apiCategoryName] = (seatCounts[apiCategoryName] || 0) + 1;

    const apiCategoryFare = categoryByName[apiCategoryName]?.fare;
    seatPrices[apiCategoryName] = Number.isFinite(Number(apiCategoryFare))
      ? Number(apiCategoryFare)
      : Number(assignment?.price ?? category?.fare ?? 0);
  });

  if (Object.keys(seatCounts).length === 0 && category?.categoryName) {
    seatCounts[category.categoryName] = travellers.passengers;
    seatPrices[category.categoryName] = category.fare;
  }

  if ((travellers.infants || 0) > 0 && category?.categoryName) {
    seatCounts[category.categoryName] = (seatCounts[category.categoryName] || 0) + travellers.infants;
    if (seatPrices[category.categoryName] === undefined) {
      seatPrices[category.categoryName] = category.fare;
    }
  }

  /* ---------------- Vehicles → Addons ---------------- */

  const vehicleAddons = selectedVehicles.map(v => {
    const vehicleMeta = slot.vehicles.find(
      x => x.vehicleType === v.vehicleType
    );

    return {
      addonId: vehicleMeta?.vehicleId,
      quantity: v.quantity,
      price: v.fare
    };
  });

  /* ---------------- Addons ---------------- */

  const addonItems = selectedAddons.map(a => ({
    addonId: a.id,
    quantity: a.quantity,
    price: a.price
  }));

  /* ---------------- Pets → Addon ---------------- */

  let petAddon = [];

  if (travellers.pets > 0) {
    const pet = slot.addons.find(a => a.addonType === "PET");

    if (pet) {
      petAddon.push({
        addonId: pet.addonId,
        quantity: travellers.pets,
        price: pet.fare
      });
    }
  }

  /* ---------------- Merge All Addons ---------------- */

  const mergedAddons = [...vehicleAddons, ...addonItems, ...petAddon]
    .reduce((map, item) => {

      if (!map[item.addonId]) {
        map[item.addonId] = { ...item };
      } else {
        map[item.addonId].quantity += item.quantity;
      }

      return map;

    }, {});

  const addons = Object.values(mergedAddons);

  const departureSeatMap = (seatAssignments || []).reduce((map, assignment) => {
    map[assignment.passengerIdx] = assignment.seatId;
    return map;
  }, {});

  const returnSeatMap = (returnSeatAssignments || []).reduce((map, assignment) => {
    map[assignment.passengerIdx] = assignment.seatId;
    return map;
  }, {});

  const guestDetailsWithSeats = (guestDetails || []).map((guest, index) => ({
    ...guest,
    seatNumber: departureSeatMap[index] || null,
    departureSeatNumber: departureSeatMap[index] || null,
    returnSeatNumber: returnSeatMap[index] || null,
  }));

  const childSeatSurgeFee = resolveChildSeatSurgeFee(bookingConfig);
  const childSeatSurgeAmount = Number(travellers?.infants || 0) * childSeatSurgeFee;

  /* ---------------- Payload ---------------- */

  return {
    sailingId: slot.slotId,
    seatCounts,
    seatPrices,
    supplements: [],
    addons,
    couponCode: coupon.code,
    totalFare: Number(pricing.total || 0) + childSeatSurgeAmount,
    childSeatSurgeFee,
    childSeatSurgeAmount,
    adultSeats: travellers.passengers,
    childSeats: travellers.infants || null,
    guestDetails: guestDetailsWithSeats,
  };
};

/* ============================================================
   BUILD RETURN PAYLOAD
   Reuses departure selections (travellers, vehicles, addons,
   guests) but sources slot/category from returnJourney.
============================================================ */
export const buildReturnPayload = (session, parentBookingCode, bookingConfig = {}) => {
  const {
    returnJourney,
    travellers,
    selectedVehicles,
    selectedAddons,
    guestDetails,
    seatAssignments,
    returnSeatAssignments,
    coupon,
    pricing,
  } = session;

  const { snapshot, routeId, slotId, categoryId } = returnJourney;

  const route = snapshot.routes.find((r) => r.routeId === routeId);
  const slot = route.sailings.find((s) => s.slotId === slotId);
  const category = slot.categories.find((c) => c.categoryId === categoryId);
  const categoryByName = (slot.categories || []).reduce((map, item) => {
    map[item.categoryName] = item;
    return map;
  }, {});

  /* ---------------- Seats ---------------- */
  const seatCounts = {};
  const seatPrices = {};

  (returnSeatAssignments || []).forEach((assignment) => {
    const apiCategoryName = assignment?.apiCategoryName || assignment?.categoryName || category?.categoryName;
    if (!apiCategoryName) return;

    seatCounts[apiCategoryName] = (seatCounts[apiCategoryName] || 0) + 1;

    const apiCategoryFare = categoryByName[apiCategoryName]?.fare;
    seatPrices[apiCategoryName] = Number.isFinite(Number(apiCategoryFare))
      ? Number(apiCategoryFare)
      : Number(assignment?.price ?? category?.fare ?? 0);
  });

  if (Object.keys(seatCounts).length === 0 && category?.categoryName) {
    seatCounts[category.categoryName] = travellers.passengers;
    seatPrices[category.categoryName] = category.fare;
  }

  if ((travellers.infants || 0) > 0 && category?.categoryName) {
    seatCounts[category.categoryName] = (seatCounts[category.categoryName] || 0) + travellers.infants;
    if (seatPrices[category.categoryName] === undefined) {
      seatPrices[category.categoryName] = category.fare;
    }
  }

  /* ---------------- Vehicles → Addons (mapped via return slot) ---------------- */
  const vehicleAddons = selectedVehicles
    .map((v) => {
      const vehicleMeta = slot.vehicles?.find(
        (x) => x.vehicleType === v.vehicleType
      );
      if (!vehicleMeta) return null;
      return { addonId: vehicleMeta.vehicleId, quantity: v.quantity, price: v.fare };
    })
    .filter(Boolean);

  /* ---------------- Addons ---------------- */
  const addonItems = selectedAddons.map((a) => ({
    addonId: a.id,
    quantity: a.quantity,
    price: a.price,
  }));

  /* ---------------- Pets ---------------- */
  let petAddon = [];
  if (travellers.pets > 0) {
    const pet = slot.addons?.find((a) => a.addonType === "PET");
    if (pet) {
      petAddon.push({
        addonId: pet.addonId,
        quantity: travellers.pets,
        price: pet.fare,
      });
    }
  }

  /* ---------------- Merge ---------------- */
  const mergedAddons = [...vehicleAddons, ...addonItems, ...petAddon].reduce(
    (map, item) => {
      if (!map[item.addonId]) {
        map[item.addonId] = { ...item };
      } else {
        map[item.addonId].quantity += item.quantity;
      }
      return map;
    },
    {}
  );

  const addons = Object.values(mergedAddons);

  const departureSeatMap = (seatAssignments || []).reduce((map, assignment) => {
    map[assignment.passengerIdx] = assignment.seatId;
    return map;
  }, {});

  const returnSeatMap = (returnSeatAssignments || []).reduce((map, assignment) => {
    map[assignment.passengerIdx] = assignment.seatId;
    return map;
  }, {});

  const guestDetailsWithSeats = (guestDetails || []).map((guest, index) => ({
    ...guest,
    seatNumber: returnSeatMap[index] || null,
    departureSeatNumber: departureSeatMap[index] || null,
    returnSeatNumber: returnSeatMap[index] || null,
  }));

  /* ---------------- Compute Total (same as departure) ---------------- */
  const seatFare = Number(pricing?.returnBaseFare ?? (category.fare * (travellers.passengers + (travellers.infants || 0))));
  const vehicleFare = vehicleAddons.reduce((s, v) => s + v.price * v.quantity, 0);
  const addonFare = addonItems.reduce((s, a) => s + a.price * a.quantity, 0);
  const petFare = petAddon.reduce((s, p) => s + p.price * p.quantity, 0);
  const childSeatSurgeFee = resolveChildSeatSurgeFee(bookingConfig);
  const childSeatSurgeAmount = Number(travellers?.infants || 0) * childSeatSurgeFee;
  const totalFare = seatFare + vehicleFare + addonFare + petFare + childSeatSurgeAmount;

  /* ---------------- Payload ---------------- */
  return {
    sailingId: slot.slotId,
    seatCounts,
    seatPrices,
    supplements: [],
    addons,
    couponCode: coupon.code,
    totalFare,
    childSeatSurgeFee,
    childSeatSurgeAmount,
    adultSeats: travellers.passengers,
    childSeats: travellers.infants || null,
    guestDetails: guestDetailsWithSeats,
    parentBookingCode,
  };
};