import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSocialMediaApi,
  updateSocialMediaApi, // Make sure this is exported from your service
} from "../services/social.media.service";

// --- Thunks ---

export const fetchSocialMedia = createAsyncThunk(
  "socialMedia/fetchSocialMedia",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSocialMediaApi();
      console.log("Res: ", res);
      return res.data; // Usually the response has a .data property
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch");
    }
  },
);

export const updateSocialMediaAction = createAsyncThunk(
  "socialMedia/updateSocialMedia",
  async (payload, { rejectWithValue }) => {
    try {
      // FIX: Calling the service API, not the thunk itself
      const res = await updateSocialMediaApi({
        socialMedia: payload,
      });
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

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    clearSocialMediaStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.socialMedia || action.payload || [];
      })
      .addCase(fetchSocialMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateSocialMediaAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateSocialMediaAction.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateSocialMediaAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSocialMediaStatus } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
