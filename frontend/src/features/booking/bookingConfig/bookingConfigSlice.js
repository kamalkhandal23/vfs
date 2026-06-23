import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { apiRequest } from "../../../utils/api";

const CONFIG_KEY = "bookingConfig";
const SEAT_SELECTION_RULES_CONFIG_KEY = "SEAT_SELECTION_RULES_BY_CRUISE_ID";
const CHILD_SEAT_SURGE_FEE_CONFIG_KEY = "CHILD_SEAT_SURGE_FEE";

const saveConfig = (data) => localStorage.setItem(CONFIG_KEY, JSON.stringify(data));

const loadConfig = () => {
  try {
    const d = localStorage.getItem(CONFIG_KEY);
    return d ? JSON.parse(d) : {};
  } catch {
    return {};
  }
};

// JSON-safe parser
const safeParse = (val) => {
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
};

const toFiniteNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeCruiseId = (value) => {
  if (value === null || value === undefined) return null;
  const normalized = String(value).trim();
  return normalized.length ? normalized : null;
};

const normalizeSeatRule = (rule, { defaultMandatory = true } = {}) => {
  // Remote config contract: if cruise/ferry id is present, seat selection is mandatory.
  if (rule === null || rule === undefined) {
    return defaultMandatory ? { seatSelectionMandatory: true } : null;
  }

  if (typeof rule !== "object") {
    return { seatSelectionMandatory: true };
  }

  const tooltip = typeof rule.noSeatSelectionTooltip === "string"
    ? rule.noSeatSelectionTooltip.trim()
    : "";

  return {
    seatSelectionMandatory: true,
    noSeatSelectionTooltip: tooltip || undefined,
  };
};

const normalizeSeatSelectionRulesByCruise = (rawRules) => {
  if (!rawRules) return {};

  if (Array.isArray(rawRules)) {
    return rawRules.reduce((acc, item) => {
      const cruiseId = typeof item === "object"
        ? normalizeCruiseId(item?.cruiseId ?? item?.ferryId ?? item?.id)
        : normalizeCruiseId(item);
      const normalizedRule = normalizeSeatRule(item, { defaultMandatory: true });
      if (!cruiseId || !normalizedRule) return acc;
      acc[cruiseId] = normalizedRule;
      return acc;
    }, {});
  }

  if (typeof rawRules !== "object") return {};

  return Object.entries(rawRules).reduce((acc, [rawCruiseId, rule]) => {
    const cruiseId = normalizeCruiseId(rawCruiseId);
    const normalizedRule = normalizeSeatRule(rule, { defaultMandatory: true });
    if (!cruiseId || !normalizedRule) return acc;
    acc[cruiseId] = normalizedRule;
    return acc;
  }, {});
};

// API response shape: { success, data: [ { id, partnerId, key, config } ] }
const normalizeConfig = (items) => {
  if (!Array.isArray(items)) return {};
  
  return items.reduce((acc, item) => {
    // Skip items without a key
    if (!item || typeof item.key !== 'string') return acc;
    
    acc[item.key] = safeParse(item.config || '');
    return acc;
  }, {});
};

// 🔹 Fetch booking remote config
export const fetchBookingConfig = createAsyncThunk(
  "booking/config/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest({
        url: "/cruise/config/list",
        method: "GET",
      });

      // Validate response structure
      if (!data) {
        throw new Error("Empty response from config API");
      }
      
      if (!Array.isArray(data.data)) {
        console.warn("Config API returned non-array data, using empty array", data);
        return {}; // Return empty config but don't error
      }

      const normalized = normalizeConfig(data.data);
      
      // Only save if we got valid normalized data
      if (Object.keys(normalized).length > 0) {
        saveConfig(normalized);
      }
      
      return normalized;
    } catch (err) {
      console.error("Failed to fetch booking config:", err);
      return rejectWithValue(err.message || "Failed to fetch booking config");
    }
  }
);

const bookingConfigSlice = createSlice({
  name: "booking/config",
  initialState: {
    items: loadConfig(),
    loading: false,
    error: null,
    loaded: false,
  },
  reducers: {
    clearBookingConfig: (state) => {
      state.items = {};
      state.loaded = false;
      localStorage.removeItem(CONFIG_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchBookingConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loaded = true; // Mark as attempted to prevent infinite retry loop
        // Keep existing items from localStorage on failure instead of clearing
        // so the app can continue with stale data
      });
  },
});

export const { clearBookingConfig } = bookingConfigSlice.actions;
export default bookingConfigSlice.reducer;

// Selectors
export const selectBookingConfigItems = (s) => s.booking.bookingConfig.items;
export const selectBookingConfigLoaded = (s) => s.booking.bookingConfig.loaded;
export const selectBookingConfigLoading = (s) => s.booking.bookingConfig.loading;

export const selectSeatSelectionRulesByCruiseId = createSelector(
  selectBookingConfigItems,
  (items) => normalizeSeatSelectionRulesByCruise(items?.[SEAT_SELECTION_RULES_CONFIG_KEY])
);

export const selectChildSeatSurgeFee = createSelector(
  selectBookingConfigItems,
  (items) => Math.max(0, toFiniteNumber(items?.[CHILD_SEAT_SURGE_FEE_CONFIG_KEY], 0))
);
