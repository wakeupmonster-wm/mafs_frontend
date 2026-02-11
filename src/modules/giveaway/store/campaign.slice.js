import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCampaignApi,
  getAllCampaignsApi,
  disableCampaignApi,
  pauseCampaignApi,
  activateCampaignApi,
  updateCampaignApi,
  deleteCampaignApi,
} from "../services/giveaway.api";

export const fetchCampaigns = createAsyncThunk(
  "campaign/fetchAll",
  async ({ page, limit, search, drawStatus } = {}, { rejectWithValue }) => {
    try {
      const response = await getAllCampaignsApi(
        page,
        limit,
        search,
        drawStatus
      );

      // console.log("campaign response: ", response);

      if (response && response.success) {
        return {
          campaigns: response.data || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.totalItems,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch pending campaigns"
      );
    } catch (err) {
      return rejectWithValue("Failed to fetch campaigns");
    }
  }
);

export const createCampaign = createAsyncThunk(
  "campaign/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createCampaignApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create campaign"
      );
    }
  }
);

export const toggleCampaignStatus = createAsyncThunk(
  "campaign/toggleStatus",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      if (type === "pause") await pauseCampaignApi(id);
      if (type === "disable") await disableCampaignApi(id);
      if (type === "activate") await activateCampaignApi(id);
      return { id, type };
    } catch (err) {
      return rejectWithValue(`Failed to ${type} campaign`);
    }
  }
);

export const updateCampaign = createAsyncThunk(
  "campaign/update", // Fixed the slice name prefix for consistency
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // FIX: Ensure you are passing 'data' to the API service
      const res = await updateCampaignApi(id, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update campaign"
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
  "campaign/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCampaignApi(id);
      return id;
    } catch (e) {
      return rejectWithValue("Failed to delete campaign");
    }
  }
);

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  },
  reducers: {
    setPagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (s, a) => {
        s.loading = false;
        s.campaigns = a.payload.campaigns;

        if (a.payload.pagination) {
          s.pagination = a.payload.pagination;
        }
      })
      .addCase(fetchCampaigns.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(createCampaign.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(createCampaign.fulfilled, (s, a) => {
        s.campaigns.unshift(a.payload);
      })
      .addCase(createCampaign.rejected, (s, a) => {
        s.loading = false;
        s.error =
          a.payload?.message ||
          a.payload ||
          a.error?.message ||
          "Failed to create campaign";
      })
      .addCase(toggleCampaignStatus.fulfilled, (s, a) => {
        const c = s.campaigns.find((x) => x._id === a.payload.id);
        if (c) {
          c.isActive = a.payload.type === "activate";
          c.failureReason =
            a.payload.type === "activate"
              ? null
              : `${a.payload.type}d by admin`;
        }
      })
      .addCase(updateCampaign.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(updateCampaign.fulfilled, (s, a) => {
        s.loading = false;
        s.campaigns = s.campaigns.map((c) =>
          c._id === a.payload._id ? a.payload : c
        );
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
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.campaigns = state.campaigns.filter(
          (c) => c._id !== action.payload
        );

        // Also remove winner data for deleted campaign
        state.winner = state.winner.filter(
          (w) => w.campaignId !== action.payload
        );
      });
  },
});

export const { setPagination } = campaignSlice.actions;
export default campaignSlice.reducer;
