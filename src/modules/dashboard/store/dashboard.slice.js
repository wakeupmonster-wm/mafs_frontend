import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardKPIAPI } from "../services/dashboard.services";

// Define the async thunk

export const fetchDashboardKPIs = createAsyncThunk(
  "kpis/fetchDashboardKPIs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await dashboardKPIAPI();

      // console.log("res: ", res);

      if (res.success) {
        return res.data.kpis;
      }

      console.log("res.data.kpis: ", res.data.kpis);

      return rejectWithValue("Failed to fetch KPIs");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

const initialState = {
  stats: null,
  activities: [],
  loading: false,
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
      });
  },
});
export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
