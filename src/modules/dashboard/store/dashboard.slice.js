import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardKPIAPI } from "../services/dashboard.services";
import { getDashboardData } from "../utils/dummyResponse";

// ─── Existing KPI thunk ────────────────────────────────────────────────────────

export const fetchDashboardKPIs = createAsyncThunk(
  "kpis/fetchDashboardKPIs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await dashboardKPIAPI();

      if (res.success) {
        return res.data.kpis;
      }

      return rejectWithValue("Failed to fetch KPIs");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  },
);

// ─── Dashboard Data thunk (date-range aware) ───────────────────────────────────
// 🔄 SWAP POINT: When backend is ready, replace getDashboardData() with real API call
//    e.g., const res = await dashboardDataAPI(dateRange);

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (dateRange, { rejectWithValue }) => {
    try {
      // Using dummy factory for now — swap with API call when backend is ready
      // const res = await dashboardDataAPI(dateRange);
      const res = getDashboardData(dateRange);

      if (res.success) {
        return { data: res.data, meta: res.meta, dateRange };
      }

      return rejectWithValue("Failed to fetch dashboard data");
    } catch (err) {
      return rejectWithValue(err.message || "Server Error");
    }
  },
);

const initialState = {
  stats: null,
  dashboardData: null,
  dashboardMeta: null,
  dateRange: null,
  activities: [],
  loading: false,
  dashboardLoading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // KPI cases (existing)
      .addCase(fetchDashboardKPIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardKPIs.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardKPIs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Dashboard data cases (new)
      .addCase(fetchDashboardData.pending, (state) => {
        state.dashboardLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardData = action.payload.data;
        state.dashboardMeta = action.payload.meta;
        state.dateRange = action.payload.dateRange;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
