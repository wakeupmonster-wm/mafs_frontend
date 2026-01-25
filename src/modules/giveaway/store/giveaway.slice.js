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
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const updatePrize = createAsyncThunk(
  "giveaway/updatePrize",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await updatePrizeApi(id, payload);
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
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

// export const updateCampaign = createAsyncThunk(
//   "giveaway/updateCampaign",
//   async ({ id, payload }, { rejectWithValue }) => {
//     try {
//       const res = await updateCampaignApi(id, payload);
//       return res.data;
//     } catch {
//       return rejectWithValue("Failed to update campaign");
//     }
//   }
// );

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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* PRIZES */
      .addCase(fetchPrizes.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchPrizes.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes = a.payload;
      })
      .addCase(createPrize.fulfilled, (s, a) => {
        s.prizes.unshift(a.payload);
      })
      .addCase(updatePrize.fulfilled, (s, a) => {
        s.prizes = s.prizes.map((p) =>
          p._id === a.payload._id ? a.payload : p
        );
      })

      /* CAMPAIGNS */
      .addCase(fetchCampaigns.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (s, a) => {
        s.loading = false;
        s.campaigns = a.payload;
      })
      .addCase(createCampaign.fulfilled, (s, a) => {
        s.campaigns.unshift(a.payload);
      })
      .addCase(updateCampaign.fulfilled, (s, a) => {
        s.campaigns = s.campaigns.map((c) =>
          c._id === a.payload._id ? a.payload : c
        );
      })
      .addCase(disableCampaign.fulfilled, (s, a) => {
        const c = s.campaigns.find((x) => x._id === a.payload);
        if (c) c.isActive = false;
      })
      .addCase(pauseCampaign.fulfilled, (s, a) => {
        const c = s.campaigns.find((x) => x._id === a.payload);
        if (c) c.isActive = false;
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
      .addCase(fetchWinner.fulfilled, (state, action) => {
        const winnerData = action.payload.data;

        if (!Array.isArray(state.winner)) {
          state.winner = [];
        }

        const alreadyExists = state.winner.find(
          (w) => w.campaignId === winnerData.campaignId
        );

        if (!alreadyExists) {
          state.winner.push(winnerData);
        }
      })

      /* Winner */
      // .addCase(fetchWinner.fulfilled, (state, action) => {
      //   state.winner = action.payload.data;
      // })
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
      })

      .addCase(deletePrize.fulfilled, (state, action) => {
        state.prizes = state.prizes.filter((p) => p._id !== action.payload);
      })

      .addMatcher(
        (a) => a.type.endsWith("rejected"),
        (s, a) => {
          s.loading = false;
          s.error = a.payload;
        }
      );
  },
});

export default giveawaySlice.reducer;
