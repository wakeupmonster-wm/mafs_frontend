import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPrizeApi,
  getAllPrizesApi,
  updatePrizeApi,
  deletePrizeApi,
} from "../services/giveaway.api";

export const fetchPrizes = createAsyncThunk(
  "prize/fetchAll",
  async ({ page, limit, search, type } = {}, { rejectWithValue }) => {
    try {
      const response = await getAllPrizesApi(page, limit, search, type);
      //   console.log("response: ", response);

      if (response && response.success) {
        return {
          prize: response.data || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch pending prize"
      );
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch prizes"
      );
    }
  }
);

export const createPrize = createAsyncThunk(
  "prize/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createPrizeApi(payload);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create prize"
      );
    }
  }
);

export const updatePrize = createAsyncThunk(
  "prize/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updatePrizeApi(id, data);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update prize"
      );
    }
  }
);

// Change this in prizes.slice.js
export const deletePrize = createAsyncThunk(
  "prize/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deletePrizeApi(id);
      return id; // Return the ID directly
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);
const prizeSlice = createSlice({
  name: "prize",
  initialState: {
    prizes: [],
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
      .addCase(fetchPrizes.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchPrizes.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes = a.payload.prize;

        if (a.payload.pagination) {
          s.pagination = a.payload.pagination;
        }
      })
      .addCase(fetchPrizes.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(createPrize.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes.unshift(a.payload.data);
      })
      .addCase(updatePrize.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes = s.prizes.map((p) =>
          p._id === a.payload.data._id ? a.payload.data : p
        );
      })
      .addCase(deletePrize.fulfilled, (s, a) => {
        s.loading = false;
        s.prizes = s.prizes.filter((p) => p._id !== a.payload);
      });
  },
});

export const { setPagination } = prizeSlice.actions;
export default prizeSlice.reducer;
