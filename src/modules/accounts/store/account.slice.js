import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminAccountAPI,
  patchAdminAccountAPI,
  postChangeAdminPasswordAPI,
} from "../services/account.service";

export const fetchProfile = createAsyncThunk(
  "account/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminAccountAPI();
      // console.log("response: ", response);

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

export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    const payload = {
      currentPassword,
      newPassword,
    };
    try {
      const response = await postChangeAdminPasswordAPI(payload);

      console.log("response: ", response);

      if (response && response.success) {
        return response; // Return the object directly
      }

      return rejectWithValue(response.message || "Failed to change password");
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    passwordSuccess: false,
    updating: false, // Separate loading state for updates
    loading: false,
    error: null,
  },
  reducers: {
    // You can add a clearError reducer here if needed
    clearAccountError: (state) => {
      state.error = null;
    },
    resetPasswordStatus: (state) => {
      state.error = null;
      state.passwordSuccess = false;
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
      })
      .addCase(changePassword.pending, (state) => {
        state.updating = true; // Use your 'updating' state
        state.error = null;
        state.passwordSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.updating = false;
        state.passwordSuccess = true;
        // You can store the message if you need it elsewhere
        state.account = {
          ...state.account,
          lastUpdate: new Date().toISOString(),
        };
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updating = false;
        state.passwordSuccess = false;
        state.error = action.payload;
      });
  },
});

export const { clearAccountError, resetPasswordStatus } = accountSlice.actions;
export default accountSlice.reducer;
