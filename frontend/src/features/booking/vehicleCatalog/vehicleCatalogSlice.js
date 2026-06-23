import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../../../utils/api";

export const loadCarModelSizeMap = createAsyncThunk(
  "booking/vehicleCatalog/loadCarModelSizeMap",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGet("/booking/api/catalog/car-model-sizes");
      return res?.data ?? {};
    } catch {
      return rejectWithValue("Failed to load car model catalog");
    }
  }
);

const vehicleCatalogSlice = createSlice({
  name: "booking/vehicleCatalog",
  initialState: {
    carModelSizeMap: {},
    loading: false,
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCarModelSizeMap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCarModelSizeMap.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.carModelSizeMap = action.payload || {};
      })
      .addCase(loadCarModelSizeMap.rejected, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.error = action.payload;
      });
  },
});

export default vehicleCatalogSlice.reducer;

export const selectCarModelSizeMap = (state) =>
  state.booking.vehicleCatalog.carModelSizeMap;

export const selectCarModelSizeMapLoaded = (state) =>
  state.booking.vehicleCatalog.loaded;
