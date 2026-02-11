import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPendingDeliveriesApi,
  markAsDeliveredApi,
} from "../services/giveaway.api";

export const fetchPendingDeliveries = createAsyncThunk(
  "delivery/fetchPending",
  async ({ page, limit, search, deliveryStatus } = {}, { rejectWithValue }) => {
    try {
      const response = await getPendingDeliveriesApi(
        page,
        limit,
        search,
        deliveryStatus
      );

      // console.log("response: ", response);

      if (response && response.success) {
        return {
          deliveries: response.data || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.totalItems,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch pending deliveries"
      );
    } catch (err) {
      return rejectWithValue("Failed to fetch deliveries");
    }
  }
);

export const markAsDelivered = createAsyncThunk(
  "delivery/markDelivered",
  async (id, { rejectWithValue }) => {
    try {
      const res = await markAsDeliveredApi(id);
      console.log("RES mark: ", res);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to mark delivered");
    }
  }
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    deliveries: [],
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
      .addCase(fetchPendingDeliveries.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchPendingDeliveries.fulfilled, (s, a) => {
        s.loading = false;
        s.deliveries = a.payload.deliveries;

        if (a.payload.pagination) {
          s.pagination = a.payload.pagination;
        }
      })
      .addCase(fetchPendingDeliveries.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(markAsDelivered.fulfilled, (s, a) => {
        s.deliveries = s.deliveries.filter((item) => item._id !== a.payload);
      });
  },
});

export default deliverySlice.reducer;
