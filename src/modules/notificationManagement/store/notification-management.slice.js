import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  broadcastNotificationApi,
  sendNotificationToPremiumUsersApi,
  createPremiumExpiryCampaignApi,
  notificationHistoryApi
} from "../services/notification-management.api";

export const notificationHistory = createAsyncThunk(
  "notificationManagement/notificationHistory",
async (payload,{rejectWithValue})=>{
  try {
    const res = await notificationHistoryApi(payload)
    return res;
  } catch(e) {
    return rejectWithValue(e.response?.data?.message || "Failed to fetch notification history")
  }
})


export const broadcastNotification = createAsyncThunk(
  "notificationManagement/broadcastNotification",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await broadcastNotificationApi(payload);
      return res;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to send broadcast");
    }
  }
);

export const sendNotificationToPremiumUsers = createAsyncThunk(
  "notificationManagement/sendNotificationToPremiumUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await sendNotificationToPremiumUsersApi(payload);
      return res;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to send to premium users");
    }
  }
);

export const createPremiumExpiryCampaign = createAsyncThunk(
  "notificationManagement/createPremiumExpiryCampaign",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createPremiumExpiryCampaignApi(payload);
      return res;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to create expiry campaign");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
  history : []
};

const notificationManagementSlice = createSlice({
  name: "notificationManagement",
  initialState,
  reducers: {
    clearNotificationStatus: (s) => {
      s.error = null;
      s.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(broadcastNotification.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(broadcastNotification.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Broadcast sent";
      })
      .addCase(broadcastNotification.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(notificationHistory.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(notificationHistory.fulfilled, (s, a) => {
        s.loading = false;
        s.history = a.payload?.data || [];
      })
      .addCase(notificationHistory.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(sendNotificationToPremiumUsers.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(sendNotificationToPremiumUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Sent to premium users";
      })
      .addCase(sendNotificationToPremiumUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(createPremiumExpiryCampaign.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(createPremiumExpiryCampaign.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Premium expiry campaign created";
      })
      .addCase(createPremiumExpiryCampaign.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearNotificationStatus } = notificationManagementSlice.actions;
export default notificationManagementSlice.reducer;
