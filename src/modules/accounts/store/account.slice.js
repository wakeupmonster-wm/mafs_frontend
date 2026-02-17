import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminAccountAPI,
  patchAdminAccountAPI,
} from "../services/account.service";

export const fetchProfile = createAsyncThunk(
  "account/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminAccountAPI();
      console.log("response: ", response);

      if (response && response.success) {
        return { account: response.data || [] };
      }
      return rejectWithValue(response.message || "Failed to fetch account");
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to fetch account"
      );
    }
  }
);

export const updateAdminAccount = createAsyncThunk(
  "account/updateAdminAccount",
  async (formData, { rejectWithValue }) => {
    try {
      // formData is the FormData object containing nickname, about, and avatar
      const res = await patchAdminAccountAPI(formData);

      if (res.success) {
        return res.data; // This is the structured response data
      }
      return rejectWithValue(res.message || "Update failed");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    loading: false,
    updating: false, // Separate loading state for updates
    error: null,
  },
  reducers: {
    // You can add a clearError reducer here if needed
    clearAccountError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile Logic
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload.account;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Account Logic
      .addCase(updateAdminAccount.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateAdminAccount.fulfilled, (state, action) => {
        state.updating = false;
        // Directly update the account state with the new data from server
        state.account = action.payload;
      })
      .addCase(updateAdminAccount.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearAccountError } = accountSlice.actions;
export default accountSlice.reducer;
