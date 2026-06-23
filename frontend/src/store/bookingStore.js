import { combineReducers, configureStore } from "@reduxjs/toolkit";
import availabilitySessionReducer from "../features/booking/availabilitySession/availabilitySessionSlice";
import bookingCalendarReducer from "../features/booking/bookingCreationCalendarV2/bookingCalendarSlice";
import bookingConfigReducer from "../features/booking/bookingConfig/bookingConfigSlice";
import ferryReducer from "../features/booking/ferry/ferrySlice";
import routesReducer from "../features/booking/routes/routesSlice";
import vehicleCatalogReducer from "../features/booking/vehicleCatalog/vehicleCatalogSlice";

const bookingReducer = combineReducers({
  availabilitySession: availabilitySessionReducer,
  bookingCalendar: bookingCalendarReducer,
  bookingConfig: bookingConfigReducer,
  ferry: ferryReducer,
  routes: routesReducer,
  vehicleCatalog: vehicleCatalogReducer,
});

export const bookingStore = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
