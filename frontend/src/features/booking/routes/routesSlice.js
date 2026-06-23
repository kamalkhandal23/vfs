import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut } from "../../../utils/api";

/* ---------------- THUNKS ---------------- */

// 🔹 Load routes (ACTIVE / INACTIVE)
export const loadRoutes = createAsyncThunk(
    "booking/routes/load",
    async ({ status = "ACTIVE" }, { rejectWithValue }) => {
        try {
            const res =
                status === "INACTIVE"
                    ? await apiGet("/cruise/api/routes/all", { activeOnly: false })
                    : await apiGet("/cruise/api/routes/all");

            return { status, data: res?.data ?? [] };
        } catch {
            return rejectWithValue("Failed to load routes");
        }
    }
);

// 🔹 Load routes by cruise
export const loadRoutesByCruise = createAsyncThunk(
    "booking/routes/loadByCruise",
    async ({ cruiseId, status = "ACTIVE" }, { rejectWithValue }) => {
        try {
            const params = status === "INACTIVE" ? { activeOnly: false } : {};
            const res = await apiGet("/cruise/api/routes/all", {
                cruiseId,
                ...params,
            });

            return { cruiseId, status, data: res?.data ?? [] };
        } catch {
            return rejectWithValue({
                cruiseId,
                status,
                error: "Failed to load routes",
            });
        }
    }
);

// 🔹 Create
export const createRoute = createAsyncThunk(
    "booking/routes/create",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await apiPost("/cruise/api/routes/create", payload);
            if (!res?.success) return rejectWithValue(res?.message);
            return res.data;
        } catch {
            return rejectWithValue("Create route failed");
        }
    }
);

// 🔹 Update
export const updateRoute = createAsyncThunk(
    "booking/routes/update",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const res = await apiPut(`/cruise/api/routes/update/${id}`, payload);
            if (!res?.success) return rejectWithValue(res?.message);
            return res.data;
        } catch {
            return rejectWithValue("Update route failed");
        }
    }
);

/* ---------------- SLICE ---------------- */

const routesSlice = createSlice({
    name: "booking/routes",
    initialState: {
        data: { ACTIVE: [], INACTIVE: [] },
        loaded: { ACTIVE: false, INACTIVE: false },
        byCruiseId: {},
        loading: false,
        error: null,
    },
    reducers: {
        invalidateRoutesByCruise(state, action) {
            const { cruiseId, status = "ACTIVE" } = action.payload || {};

            if (cruiseId != null) {
                if (state.byCruiseId?.[cruiseId]?.[status]) {
                    state.byCruiseId[cruiseId][status].loaded = false;
                }
                return;
            }

            // All-ferry view uses global cache, so invalidate it when no cruise is selected.
            state.loaded[status] = false;
        }
    },
    extraReducers: (builder) => {
        builder
            /* ---------- GLOBAL ---------- */
            .addCase(loadRoutes.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadRoutes.fulfilled, (state, action) => {
                const { status, data } = action.payload;
                state.data[status] = data;
                state.loaded[status] = true;
                state.loading = false;
                state.byCruiseId = {}; // reset cruise cache
            })
            .addCase(loadRoutes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------- BY CRUISE ---------- */
            .addCase(loadRoutesByCruise.pending, (state, action) => {
                const { cruiseId, status } = action.meta.arg;

                if (!state.byCruiseId[cruiseId]) {
                    state.byCruiseId[cruiseId] = {};
                }

                state.byCruiseId[cruiseId][status] = {
                    data: [],
                    loaded: false,
                    loading: true,
                    error: null,
                };
            })
            .addCase(loadRoutesByCruise.fulfilled, (state, action) => {
                const { cruiseId, status, data } = action.payload;

                state.byCruiseId[cruiseId][status] = {
                    data,
                    loaded: true,
                    loading: false,
                    error: null,
                };
            })
            .addCase(loadRoutesByCruise.rejected, (state, action) => {
                const { cruiseId, status, error } = action.payload || {};

                if (!state.byCruiseId[cruiseId]) {
                    state.byCruiseId[cruiseId] = {};
                }

                state.byCruiseId[cruiseId][status] = {
                    data: [],
                    loaded: false,
                    loading: false,
                    error,
                };
            });
    },
});

export const { invalidateRoutesByCruise } = routesSlice.actions;
export default routesSlice.reducer;

/* ---------------- SELECTORS ---------------- */

const EMPTY_CRUISE_ROUTE_STATE = {
    data: [],
    loaded: false,
    loading: false,
    error: null,
};

export const selectRoutes = (status) =>
    createSelector(
        [
            (state) => state.booking.routes.data[status] ?? [],
            (state) => state.booking.routes.loaded[status],
            (state) => state.booking.routes.loading,
        ],
        (data, loaded, loading) => ({
            data,
            loaded,
            loading,
        })
    );

export const selectRoutesByCruise =
    (cruiseId, status = "ACTIVE") =>
        createSelector(
            [(state) => state.booking.routes.byCruiseId?.[cruiseId]?.[status]],
            (routeState) => routeState ?? EMPTY_CRUISE_ROUTE_STATE
        );

export const selectRouteById =
  (routeId, status = "ACTIVE") =>
  (state) =>
    state.booking.routes.data[status]
      ?.find(r => String(r.id) === String(routeId));

// Normalized active route list for booking availability flow
export const selectActiveRoutesForAvailability = createSelector(
    [(state) => state.booking.routes.data.ACTIVE ?? []],
    (list) =>
        list
            .filter((route) => (route?.status || "").toUpperCase() === "ACTIVE")
            .map((route) => ({
                routeId: route.id,
                cruiseId: route.cruiseId,
                routeName: `${route.origin} -> ${route.destination}`,
                origin: route.origin,
                destination: route.destination,
                raw: route,
            }))
);
