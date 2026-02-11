import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bulkCreateCampaignApi } from "../services/giveaway.api";

export const bulkCreateCampaign = createAsyncThunk(
  "bulk/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await bulkCreateCampaignApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Bulk creation failed"
      );
    }
  }
);

const bulkSlice = createSlice({
  name: "bulk",
  initialState: {
    loading: false,
    summary: null,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetBulkState: (state) => {
      state.summary = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bulkCreateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.summary = null;
      })
      .addCase(bulkCreateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        const { summary, skippedDates } = action.payload;

        state.summary = {
          created: summary?.created || 0,
          skipped: summary?.skipped || 0,
          skippedDates: skippedDates || [],
        };

        state.successMessage =
          summary?.created > 0
            ? `Successfully created ${summary.created} campaigns.`
            : "Bulk process complete with no new campaigns.";
      })
      .addCase(bulkCreateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBulkState } = bulkSlice.actions;
export default bulkSlice.reducer;
