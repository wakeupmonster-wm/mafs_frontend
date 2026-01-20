import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Thunk to fetch all dashboard metrics and recent activity
 * In a real app, this would be an Axios call to /api/admin/dashboard-stats
 */
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock Data Response
      return {
        stats: [
          {
            label: "Total Members",
            value: "24,892",
            change: "+14.2%",
            icon: "Users",
            color: "bg-blue-500",
          },
          {
            label: "Successful Matches",
            value: "8,122",
            change: "+8.1%",
            icon: "Heart",
            color: "bg-pink-500",
          },
          {
            label: "Monthly Revenue",
            value: "$12,450",
            change: "+22.5%",
            icon: "DollarSign",
            color: "bg-green-500",
          },
          {
            label: "Active Sessions",
            value: "1,204",
            change: "-2.4%",
            icon: "Activity",
            color: "bg-purple-500",
          },
        ],
        activities: [
          {
            id: 1,
            type: "signup",
            user: "Sarah J.",
            time: "2 mins ago",
            icon: "UserPlus",
            color: "text-blue-500",
          },
          {
            id: 2,
            type: "match",
            user: "Alex & Sam",
            time: "15 mins ago",
            icon: "Heart",
            color: "text-pink-500",
          },
          {
            id: 3,
            type: "report",
            user: "Review Flag",
            time: "1 hour ago",
            icon: "AlertCircle",
            color: "text-orange-500",
          },
          {
            id: 4,
            type: "verified",
            user: "Business Pro",
            time: "3 hours ago",
            icon: "CheckCircle2",
            color: "text-green-500",
          },
        ],
      };
    } catch (error) {
      return rejectWithValue("Failed to load dashboard metrics");
    }
  }
);

const initialState = {
  stats: [],
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
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.activities = action.payload.activities;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
