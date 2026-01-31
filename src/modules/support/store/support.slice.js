import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  contactSupportApi,
  getMyTicketsApi,
  getMyTicketByIdApi,
  replyToTicketApi,
} from "../services/support.api";

export const createSupportTicket = createAsyncThunk(
  "support/createTicket",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await contactSupportApi(payload);
      return res;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to create ticket"
      );
    }
  }
);

export const fetchMyTickets = createAsyncThunk(
  "support/fetchMyTickets",
  async ({ status, search } = { status: "all", search: "" }, { rejectWithValue }) => {
    try {
      const res = await getMyTicketsApi(status, search);
      return res?.data || [];
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch tickets");
    }
  }
);

// export const fetchMyTickets = createAsyncThunk(
//   "support/fetchMyTickets",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getMyTicketsApi();
//       return res?.data || [];
//     } catch (e) {
//       return rejectWithValue(
//         e.response?.data?.message || "Failed to fetch tickets"
//       );
//     }
//   }
// );

export const fetchTicketById = createAsyncThunk(
  "support/fetchTicketById",
  async (ticketId, { rejectWithValue }) => {
    try {
      const res = await getMyTicketByIdApi(ticketId);
      return res?.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to fetch ticket"
      );
    }
  }
);

export const adminReplyToTicket = createAsyncThunk(
  "support/adminReply",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await replyToTicketApi(payload);
      return res;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to reply");
    }
  }
);

const supportSlice = createSlice({
  name: "support",
  initialState: {
    tickets: [],
    selectedTicket: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSupportStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupportTicket.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(createSupportTicket.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Ticket submitted";
      })
      .addCase(createSupportTicket.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchMyTickets.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchMyTickets.fulfilled, (s, a) => {
        s.loading = false;
        s.tickets = a.payload || [];
      })
      .addCase(fetchMyTickets.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchTicketById.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (s, a) => {
        s.loading = false;
        s.selectedTicket = a.payload || null;
      })
      .addCase(fetchTicketById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(adminReplyToTicket.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(adminReplyToTicket.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Reply sent";
      })
      .addCase(adminReplyToTicket.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearSupportStatus } = supportSlice.actions;
export default supportSlice.reducer;
