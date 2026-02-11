import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPrizeApi,
  getAllPrizesApi,
  updatePrizeApi,
  createCampaignApi,
  getAllCampaignsApi,
  updateCampaignApi,
  disableCampaignApi,
  pauseCampaignApi,
  activateCampaignApi,
  deleteCampaignApi,
  deletePrizeApi,
  bulkCreateCampaignApi,
  getPendingDeliveriesApi,
  markAsDeliveredApi,
  getWinnerApi,
} from "../services/giveaway.api";

export const bulkCreateCampaign = createAsyncThunk(
  "giveaway/bulkCreateCampaign",
  async (payload, { rejectWithValue }) => {
    try {
      return await bulkCreateCampaignApi(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Bulk create failed"
      );
    }
  }
);

/* ============ PENDING DELIVERIES ============ */
export const fetchPendingDeliveries = createAsyncThunk(
  "giveaway/fetchPendingDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      return await getPendingDeliveriesApi();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch deliveries"
      );
    }
  }
);

/* ============ MARK AS DELIVERED ============ */
export const markAsDelivered = createAsyncThunk(
  "giveaway/markAsDelivered",
  async (winHistoryId, { rejectWithValue }) => {
    try {
      await markAsDeliveredApi(winHistoryId);
      return winHistoryId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark delivered"
      );
    }
  }
);

/* ============ GET WINNER ============ */
export const fetchWinner = createAsyncThunk(
  "giveaway/fetchWinner",
  async (campaignId, { rejectWithValue }) => {
    try {
      return await getWinnerApi(campaignId);
    } catch (err) {
      // If no winner found, return null instead of rejecting
      if (
        err.response?.status === 404 ||
        err.response?.data?.message?.includes("not found")
      ) {
        return { data: null, campaignId };
      }
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch winner"
      );
    }
  }
);

export const fetchPrizes = createAsyncThunk(
  "giveaway/fetchPrizes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllPrizesApi();
      return res.data;
    } catch {
      return rejectWithValue("Failed to fetch prizes");
    }
  }
);

export const createPrize = createAsyncThunk(
  "giveaway/createPrize",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createPrizeApi(payload);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Failed to create prize" }
      );
    }
  }
);

export const updatePrize = createAsyncThunk(
  "giveaway/updatePrize",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updatePrizeApi(id, data);
      return res.data;
    } catch {
      return rejectWithValue("Failed to update prize");
    }
  }
);

export const fetchCampaigns = createAsyncThunk(
  "giveaway/fetchCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCampaignsApi();
      return res.data;
    } catch {
      return rejectWithValue("Failed to fetch campaigns");
    }
  }
);

export const createCampaign = createAsyncThunk(
  "giveaway/createCampaign",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createCampaignApi(payload);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "giveaway/updateCampaign",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await updateCampaignApi(id, payload);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data || {
          message: "Failed to update campaign",
        }
      );
    }
  }
);

export const disableCampaign = createAsyncThunk(
  "giveaway/disableCampaign",
  async (id, { rejectWithValue }) => {
    try {
      await disableCampaignApi(id);
      return id;
    } catch {
      return rejectWithValue("Failed to disable campaign");
    }
  }
);

export const pauseCampaign = createAsyncThunk(
  "giveaway/pauseCampaign",
  async (id, { rejectWithValue }) => {
    try {
      await pauseCampaignApi(id);
      return id;
    } catch {
      return rejectWithValue("Failed to pause campaign");
    }
  }
);

export const activateCampaign = createAsyncThunk(
  "giveaway/activateCampaign",
  async (id) => {
    await activateCampaignApi(id);
    return id;
  }
);

export const deleteCampaign = createAsyncThunk(
  "giveaway/deleteCampaign",
  async (id) => {
    await deleteCampaignApi(id);
    return id;
  }
);

export const deletePrize = createAsyncThunk(
  "giveaway/deletePrize",
  async (id) => {
    await deletePrizeApi(id);
    return id;
  }
);

const giveawaySlice = createSlice({
  name: "giveaway",
  initialState: {
    prizes: [],
    campaigns: [],
    pendingDeliveries: [],
    winner: [],
    loading: false,
    error: null,
    successMessage: null,
    bulkCampaignLoading: false,
    markDeliveredLoading: false,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  },
  reducers: {
    clearGiveawayStatus: (s) => {
      s.error = null;
      s.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* CREATE PRIZE */
      .addCase(createPrize.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })

      .addCase(createPrize.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes.unshift(a.payload);
        s.successMessage = "Prize created successfully";
      })

      .addCase(createPrize.rejected, (s, a) => {
        s.loading = false;
        s.error =
          a.payload?.message ||
          a.payload ||
          a.error?.message ||
          "Failed to create prize";
      })

      /* PRIZES */
      .addCase(fetchPrizes.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchPrizes.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes = a.payload;
      })
      .addCase(updatePrize.fulfilled, (s, a) => {
        s.prizes = s.prizes.map((p) =>
          p._id === a.payload._id ? a.payload : p
        );
        s.successMessage = "Prize edited successfully";
      })

      /* CAMPAIGNS */
      .addCase(fetchCampaigns.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (s, a) => {
        s.loading = false;
        s.campaigns = a.payload;
      })
      .addCase(createCampaign.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(createCampaign.fulfilled, (s, a) => {
        s.loading = false;
        s.campaigns.unshift(a.payload);
        s.successMessage = "Campaign created successfully";
      })
      .addCase(createCampaign.rejected, (s, a) => {
        s.loading = false;
        s.error =
          a.payload?.message ||
          a.payload ||
          a.error?.message ||
          "Failed to create campaign";
      })

      .addCase(updateCampaign.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(updateCampaign.fulfilled, (s, a) => {
        s.loading = false;
        s.campaigns = s.campaigns.map((c) =>
          c._id === a.payload._id ? a.payload : c
        );
        s.successMessage = "Campaign updated successfully";
      })
      .addCase(updateCampaign.rejected, (s, a) => {
        s.loading = false;
        s.error =
          a.payload?.message ||
          a.payload ||
          a.error?.message ||
          "Failed to update campaign";
      })

      .addCase(disableCampaign.fulfilled, (s, a) => {
        const c = s.campaigns.find((x) => x._id === a.payload);
        if (c) {
          c.isActive = false;
          c.failureReason = "Disabled by admin";
        }
      })
      .addCase(pauseCampaign.fulfilled, (s, a) => {
        const c = s.campaigns.find((x) => x._id === a.payload);
        if (c) {
          c.isActive = false;
          c.failureReason = "Paused by admin";
        }
      })

      /* Pending Deliveries */
      .addCase(fetchPendingDeliveries.fulfilled, (state, action) => {
        state.pendingDeliveries = action.payload.data || [];
      })

      /* Mark Delivered */
      .addCase(markAsDelivered.fulfilled, (state, action) => {
        state.pendingDeliveries = state.pendingDeliveries.filter(
          (d) => d._id !== action.payload
        );
      })

      /* Winner */
      .addCase(fetchWinner.fulfilled, (state, action) => {
        const winnerData = action.payload.data;

        if (!Array.isArray(state.winner)) {
          state.winner = [];
        }

        // Only add if winner exists (not null)
        if (winnerData) {
          const alreadyExists = state.winner.find(
            (w) => w.campaignId === winnerData.campaignId
          );

          if (!alreadyExists) {
            state.winner.push(winnerData);
          }
        }
      })

      .addCase(activateCampaign.fulfilled, (state, action) => {
        const c = state.campaigns.find((x) => x._id === action.payload);
        if (c) {
          c.isActive = true;
          c.failureReason = null;
        }
      })

      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.campaigns = state.campaigns.filter(
          (c) => c._id !== action.payload
        );
        // Also remove winner data for deleted campaign
        state.winner = state.winner.filter(
          (w) => w.campaignId !== action.payload
        );
      })

      .addCase(deletePrize.fulfilled, (state, action) => {
        state.prizes = state.prizes.filter((p) => p._id !== action.payload);
      })
      .addCase(bulkCreateCampaign.pending, (state) => {
        state.bulkCampaignLoading = true;
        state.error = null;
        state.successMessage = null;
        state.bulkCampaignSummary = null;
      })
      .addCase(bulkCreateCampaign.fulfilled, (state, action) => {
        state.bulkCampaignLoading = false;

        const { summary, skippedDates } = action.payload;

        // Store summary data
        state.bulkCampaignSummary = {
          created: summary?.created || 0,
          skipped: summary?.skipped || 0,
          skippedDates: skippedDates || [],
        };

        // Set success message
        if (summary?.created > 0 && summary?.skipped > 0) {
          state.successMessage = `${summary.created} campaigns created successfully, ${summary.skipped} dates skipped`;
        } else if (summary?.created > 0) {
          state.successMessage = `${summary.created} campaigns created successfully`;
        } else if (summary?.skipped > 0) {
          state.successMessage = "No campaigns created";
          state.error = `All ${summary.skipped} dates were skipped`;
        }
      })
      .addCase(bulkCreateCampaign.rejected, (state, action) => {
        state.bulkCampaignLoading = false;
        state.error = action.payload;
        state.bulkCampaignSummary = null;
      })

      .addMatcher(
        (a) => a.type.endsWith("rejected") && !a.type.includes("fetchWinner"),
        (s, a) => {
          s.loading = false;
          s.error =
            a.payload?.message ||
            a.payload ||
            a.error?.message ||
            "Something went wrong";
        }
      );
  },
});

export default giveawaySlice.reducer;
export const { clearGiveawayStatus } = giveawaySlice.actions;
