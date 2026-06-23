import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../../../utils/api";


/* ------------------------------------------------------------------ */
/* 🔁 THUNKS (inside slice file)                                       */
/* ------------------------------------------------------------------ */
export const loadFerries = createAsyncThunk(
  "booking/ferry/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGet("/cruise/setup/all");
      return res?.data ?? [];
    } catch (err) {
      return rejectWithValue("Failed to load ferries");
    }
  }
);

export const saveFerry = createAsyncThunk(
  "booking/ferry/save",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiPost("/cruise/setup/save", payload);

      if (!res?.success) {
        return rejectWithValue(res?.message || "Save failed");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue("Server error");
    }
  }
);

/* ------------------------------------------------------------------ */
/* 🧠 SLICE                                                            */
/* ------------------------------------------------------------------ */
const ferrySlice = createSlice({
  name: "booking/ferry",
  initialState: {
    list: [],
    loading: false,
    saving: false,
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOAD
      .addCase(loadFerries.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFerries.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        state.loaded = true;
      })
      .addCase(loadFerries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE
      .addCase(saveFerry.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveFerry.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveFerry.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export default ferrySlice.reducer;


// selectors (export from same file)
export const selectFerries = (s) => s.booking.ferry.list;
export const selectFerryLoading = (s) => s.booking.ferry.loading;
export const selectFerrySaving = (s) => s.booking.ferry.saving;
export const selectFerriesLoaded = (s) => s.booking.ferry.loaded;
