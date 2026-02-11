import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWinnerApi } from "../services/giveaway.api";

export const fetchWinner = createAsyncThunk(
  "winner/fetchByCampaign",
  async ({ page, limit, search, status } = {}, { rejectWithValue }) => {
    try {
      const response = await getWinnerApi(page, limit, search, status);
      // console.log("response: ", response);

      if (response && response.success) {
        return {
          winner: response.data || [],
          stats: response.statsKPI || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          },
        };
      }

      return rejectWithValue(
        response.message || "Failed to fetch pending winner"
      );
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch winner"
      );
    }
  }
);

const winnerSlice = createSlice({
  name: "winner",
  initialState: {
    winner: [],
    stats: [],
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
      .addCase(fetchWinner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinner.fulfilled, (state, action) => {
        state.loading = false;
        state.winner = action.payload.winner;
        state.stats = action.payload.stats;

        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchWinner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPagination } = winnerSlice.actions;
export default winnerSlice.reducer;
