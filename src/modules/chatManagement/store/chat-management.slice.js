import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReportedChatsApi,
  getChatMessagesForReviewApi,
  takeChatActionApi,
  getChatActionHistoryApi,
} from "../services/chat-management.api";

export const fetchReportedChats = createAsyncThunk(
  "chatManagement/fetchReportedChats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getReportedChatsApi();
      return res?.data || [];
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch reported chats");
    }
  }
);

export const fetchChatMessagesForReview = createAsyncThunk(
  "chatManagement/fetchChatMessagesForReview",
  async ({ matchId, limit = 50 }, { rejectWithValue }) => {
    try {
      const res = await getChatMessagesForReviewApi(matchId, { limit });
      return { matchId, ...res?.data };
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch chat messages");
    }
  }
);

export const fetchChatActionHistory = createAsyncThunk(
  "chatManagement/fetchChatActionHistory",
  async (matchId, { rejectWithValue }) => {
    try {
      const res = await getChatActionHistoryApi(matchId);
      return { matchId, history: res?.data || [] };
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch action history");
    }
  }
);

export const performChatAction = createAsyncThunk(
  "chatManagement/performChatAction",
  async ({ matchId, action, messageIds = [], userId, reason }, { rejectWithValue }) => {
    try {
      const res = await takeChatActionApi(matchId, { action, messageIds, userId, reason });
      return { matchId, ...res };
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to apply action");
    }
  }
);

const initialState = {
  queue: [],
  selected: null, // { matchId, participants, messages }
  history: [],
  loading: false,
  error: null,
  successMessage: null,
  selectedMessageIds: [],
};

const chatManagementSlice = createSlice({
  name: "chatManagement",
  initialState,
  reducers: {
    clearChatMgmtStatus: (s) => {
      s.error = null;
      s.successMessage = null;
    },
    toggleSelectMessage: (s, a) => {
      const id = a.payload;
      if (s.selectedMessageIds.includes(id)) {
        s.selectedMessageIds = s.selectedMessageIds.filter((x) => x !== id);
      } else {
        s.selectedMessageIds.push(id);
      }
    },
    clearSelection: (s) => {
      s.selectedMessageIds = [];
    },
    selectAllMessages: (s) => {
      if (s.selected?.messages) {
        s.selectedMessageIds = s.selected.messages.map((m) => m.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportedChats.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchReportedChats.fulfilled, (s, a) => {
        s.loading = false;
        s.queue = a.payload || [];
      })
      .addCase(fetchReportedChats.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchChatMessagesForReview.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchChatMessagesForReview.fulfilled, (s, a) => {
        s.loading = false;
        const { matchId, data } = a.payload || {};
        if (data) {
          s.selected = { matchId, ...data };
        } else {
          s.selected = null;
        }
        s.selectedMessageIds = [];
      })
      .addCase(fetchChatMessagesForReview.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchChatActionHistory.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchChatActionHistory.fulfilled, (s, a) => {
        s.loading = false;
        s.history = a.payload?.history || [];
      })
      .addCase(fetchChatActionHistory.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(performChatAction.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(performChatAction.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Action applied";
      })
      .addCase(performChatAction.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearChatMgmtStatus, toggleSelectMessage, clearSelection, selectAllMessages } =
  chatManagementSlice.actions;
export default chatManagementSlice.reducer;
