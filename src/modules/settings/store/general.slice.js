import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGeneralSettingApi,
  updateGeneralSettingApi,
} from "../services/general.service";

export const fetchGeneralSettings = createAsyncThunk(
  "generalSettings/fetchGeneralSettings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getGeneralSettingApi();
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch");
    }
  },
);

export const updateGeneralSettingsAction = createAsyncThunk(
  "generalSettings/updateGeneralSettings",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateGeneralSettingApi(payload);
      return {
        data: res.data,
        message: res?.message || "Updated successfully",
      };
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Update failed");
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  successMessage: null,
};

// --- Slice ---
const generalSettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    clearGeneralSettingsStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchGeneralSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeneralSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.socialMedia || action.payload || [];
      })
      .addCase(fetchGeneralSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateGeneralSettingsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateGeneralSettingsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.list = action.payload.data;
      })
      .addCase(updateGeneralSettingsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGeneralSettingsStatus } = generalSettingsSlice.actions;
export default generalSettingsSlice.reducer;
