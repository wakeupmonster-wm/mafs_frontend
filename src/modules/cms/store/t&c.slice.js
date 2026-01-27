import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTermsAndConditionAPI,
  updateTermsAndConditionAPI,
} from "../services/term.condition.services";

// Fetch the Terms And Condition API
export const fetchTermsAndCondition = createAsyncThunk(
  "termscondition/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTermsAndConditionAPI();
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch"
      );
    }
  }
);

// Update the Terms And Condition API
export const updateTermsAndCondition = createAsyncThunk(
  "termscondition/update",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateTermsAndConditionAPI(payload);
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const termsAndconditionSlice = createSlice({
  name: "termsAndcondition",
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTermsAndCondition.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateTermsAndCondition.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTermsAndCondition.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default termsAndconditionSlice.reducer;
