import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getALLStatsAPI,
  getAllTransactionsAPI,
  getCancellationAnalyticsAPI,
  getRevenueAnalyticsAPI,
  getRiskUsersAPI,
  getSingleUserDetailsAPI,
  getSubscriptionListAPI,
} from "../services/subcriptions.services";

// Async Thunk for getting stats
export const fetchSubscriptionStats = createAsyncThunk(
  "subscription/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getALLStatsAPI();
      console.log("response: ", response);

      if (response && response.success) {
        return response.statsKPI || [];
      }
      return rejectWithValue(response.message || "Failed to fetch users");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stats"
      );
    }
  }
);

// Async Thunk for getting the list
export const fetchSubscriptionList = createAsyncThunk(
  "subscription/fetchList",
  async (
    { page, limit, search, status, plan, platform, sortBy, sortOrder } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await getSubscriptionListAPI(
        page,
        limit,
        search,
        status,
        plan,
        platform,
        sortBy,
        sortOrder
      );
      //   console.log("response: ", response);

      if (response && response.success) {
        return {
          subscriptions: response.subscriptions || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }
      return rejectWithValue(
        response.message || "Failed to fetch subscriptions"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscriptions"
      );
    }
  }
);

// --- Async Thunk ---
export const fetchUserDetails = createAsyncThunk(
  "subscription/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is required");

      const response = await getSingleUserDetailsAPI(userId);
      // console.log("response: ", response);

      if (response && response.success) {
        return response.data || [];
      }
      return rejectWithValue(response.message || "Failed to fetch user detail");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user details";
      return rejectWithValue(message);
    }
  }
);

export const fetchRevenueAnalytics = createAsyncThunk(
  "sub/fetchRevenue",
  async ({ period, startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const response = await getRevenueAnalyticsAPI(period, startDate, endDate);
      // console.log("Res: ", response);

      if (response && response.success) {
        return response.data || [];
      }

      return rejectWithValue(
        response.message || "Failed to fetch revenue analytics."
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch revenue analytics."
      );
    }
  }
);

export const fetchRiskUsers = createAsyncThunk(
  "sub/fetchRiskUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getRiskUsersAPI(params);
      console.log("response riskUsers: ", response);

      if (response && response.success) {
        return {
          riskUsers: response.atRiskUsers || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(response.message || "Failed to fetch risk user.");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch risk user."
      );
    }
  }
);

export const fetchCancellationAnalytics = createAsyncThunk(
  "sub/fetchCancelAnalytics",
  async ({ period } = {}, { rejectWithValue }) => {
    try {
      const response = await getCancellationAnalyticsAPI(period);
      console.log("response cancelAnalytics: ", response);

      if (response && response.success) {
        return {
          cancelAnalytic: response.data || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch cancellation analytics."
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch cancellation analytics."
      );
    }
  }
);

export const fetchAllTransactions = createAsyncThunk(
  "sub/fetchAllTransactions",
  async (
    { page, limit, eventType, platform, startDate, endDate } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllTransactionsAPI(
        page,
        limit,
        eventType,
        platform,
        startDate,
        endDate
      );
      console.log("response allTransactions: ", response);

      if (response && response.success) {
        return {
          allTransaction: response.transactions || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch transactions analytics."
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch transactions analytics."
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    stats: [],
    subscriptions: [],
    revenueAnalytic: [],
    riskUsers: [],
    userData: [],
    cancelAnalytics: [],
    allTransactions: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearSubscriptionState: (state) => {
      state.stats = null;
      state.subscriptions = [];
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Stats
      .addCase(fetchSubscriptionStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptionStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSubscriptionStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Subscription List
      .addCase(fetchSubscriptionList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptionList.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload.subscriptions; // Adjust based on API
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSubscriptionList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchRevenueAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenueAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueAnalytic = action.payload;
      })
      .addCase(fetchRevenueAnalytics.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchRiskUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRiskUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.riskUsers = action.payload.riskUsers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRiskUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCancellationAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCancellationAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelAnalytics = action.payload.cancelAnalytic;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCancellationAnalytics.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.allTransactions = action.payload.allTransaction;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage, clearSubscriptionState, clearSelectedUser } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
