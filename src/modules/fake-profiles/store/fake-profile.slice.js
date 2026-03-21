import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFakeProfilesApi,
  bulkCreateFakeProfilesApi,
  toggleFakeProfileStatusApi,
  deleteFakeProfileApi,
} from "../services/fake-profile.operation";

// ─── Fetch All (paginated, filtered, sorted) ───
export const fetchFakeProfiles = createAsyncThunk(
  "fakeProfiles/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getFakeProfilesApi(params);
      console.log("🔍 Fake Profiles API Response:", response);

      if (response && response.success) {
        return {
          profiles: response.data || [],
          pagination: response.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          },
        };
      }
      return rejectWithValue(response.message || "Failed to fetch fake profiles");
    } catch (error) {
      console.error("❌ Fake Profiles API Error:", error);
      return rejectWithValue(error.response?.data?.message || error.message || "Server error");
    }
  }
);

// ─── Bulk Create ───
export const bulkCreateFakeProfiles = createAsyncThunk(
  "fakeProfiles/bulkCreate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await bulkCreateFakeProfilesApi(payload);
      if (response && response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to create fake profiles");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

// ─── Toggle Status ───
export const toggleFakeProfileStatus = createAsyncThunk(
  "fakeProfiles/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await toggleFakeProfileStatusApi(id);
      if (response && response.success) {
        return { id, data: response.data, message: response.message };
      }
      return rejectWithValue(response.message || "Failed to update profile status");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

// ─── Delete Single ───
export const deleteFakeProfile = createAsyncThunk(
  "fakeProfiles/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteFakeProfileApi(id);
      if (response && response.success) {
        return { id, message: response.message };
      }
      return rejectWithValue(response.message || "Failed to delete profile");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

const fakeProfileSlice = createSlice({
  name: "fakeProfiles",
  initialState: {
    items: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
    loading: false,
    bulkLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ─── FETCH ───
      .addCase(fetchFakeProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFakeProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.profiles;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFakeProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ─── BULK CREATE ───
      .addCase(bulkCreateFakeProfiles.pending, (state) => {
        state.bulkLoading = true;
        state.error = null;
      })
      .addCase(bulkCreateFakeProfiles.fulfilled, (state) => {
        state.bulkLoading = false;
        // We'll re-fetch after bulk create so no need to manually append
      })
      .addCase(bulkCreateFakeProfiles.rejected, (state, action) => {
        state.bulkLoading = false;
        state.error = action.payload;
      })
      // ─── TOGGLE STATUS ───
      .addCase(toggleFakeProfileStatus.fulfilled, (state, action) => {
        const profileId = action.payload.id;
        const newStatus = action.payload.data?.accountStatus;
        const index = state.items.findIndex(
          (item) => item.user?.profile?.id === profileId
        );
        if (index !== -1 && newStatus) {
          state.items[index].user.account.status = newStatus;
        }
      })
      // ─── DELETE ───
      .addCase(deleteFakeProfile.fulfilled, (state, action) => {
        const profileId = action.payload.id;
        state.items = state.items.filter(
          (item) => item.user?.profile?.id !== profileId
        );
        // Decrement total count
        if (state.pagination.total > 0) {
          state.pagination.total -= 1;
        }
      });
  },
});

export default fakeProfileSlice.reducer;
