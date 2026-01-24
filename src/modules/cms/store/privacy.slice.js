import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPrivacyPolicyAPI,
  updatePrivacyPolicyAPI,
} from "../services/privacy.policy.services";

// Fetch the policy
export const fetchPrivacyPolicy = createAsyncThunk(
  "privacy/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPrivacyPolicyAPI();
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch"
      );
    }
  }
);

// Update the policy
export const updatePrivacyPolicy = createAsyncThunk(
  "privacy/update",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updatePrivacyPolicyAPI(payload);
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const privacySlice = createSlice({
  name: "privacypolicy",
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacyPolicy.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updatePrivacyPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default privacySlice.reducer;
