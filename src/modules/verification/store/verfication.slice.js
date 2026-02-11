import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPendingVerificationsApi,
  verifyUserProfileApi,
} from "../services/verification.operations";

export const fetchPendingVerifications = createAsyncThunk(
  "verification/fetchPendingVerifications",
  async ({ page, limit, search, status, sortBy } = {}, { rejectWithValue }) => {
    try {
      const response = await getAllPendingVerificationsApi(
        page,
        limit,
        search,
        status,
        sortBy
      );

      console.log("response: ", response);

      if (response && response.success) {
        return {
          verification: response.data || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch pending verifications"
      );
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

export const verifyUserProfile = createAsyncThunk(
  "verification/verifyUserProfile",
  async ({ userId, action, reason }, { rejectWithValue }) => {
    try {
      const response = await verifyUserProfileApi(userId, {
        action,
        reason,
      });

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return { userId, action };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    pendingVerifications: [],
    pendingCount: 0,
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
    setPagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      /* PENDING USERVERIFICATION */
      .addCase(fetchPendingVerifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingVerifications.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingVerifications = action.payload.verification;
        // Map backend pagination to Redux state
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchPendingVerifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* VERIFY USER PROFILE */
      .addCase(verifyUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId } = action.payload;

        state.pendingVerifications = state.pendingVerifications.filter(
          (item) => item.userId !== userId
        );

        if (state.pagination.total > 0) {
          state.pagination.total -= 1;
        }
      })
      .addCase(verifyUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPagination } = verificationSlice.actions;
export default verificationSlice.reducer;
