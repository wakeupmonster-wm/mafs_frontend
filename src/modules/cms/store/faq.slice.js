import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFAQAPI,
  deleteFAQAPI,
  getAllFAQsAPI,
  updateFAQAPI,
} from "../services/faq.services";

// Placeholder for your API calls
export const fetchFAQs = createAsyncThunk(
  "faqs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllFAQsAPI();
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch FAQs"
      );
    }
  }
);

export const createFAQ = createAsyncThunk(
  "faqs/create",
  async (faqData, { rejectWithValue }) => {
    try {
      // payload will be { question, answer, category }
      const response = await createFAQAPI(faqData);

      console.log("faqData: ", faqData);

      if (!response.success) return rejectWithValue(response.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create FAQ"
      );
    }
  }
);

export const updateFAQ = createAsyncThunk(
  "faqs/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await updateFAQAPI({ id, payload });
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update FAQ"
      );
    }
  }
);

export const deleteFAQ = createAsyncThunk(
  "faqs/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteFAQAPI(id);
      return response.success ? id : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete FAQ"
      );
    }
  }
);

const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    items: [], // This will hold your "data" array
    loading: false,
    error: null,
  },
  reducers: {
    setFAQs: (state, action) => {
      state.items = action.payload;
    },
    addFAQ: (state, action) => {
      state.items.push(action.payload);
    },
    updateFAQ: (state, action) => {
      const index = state.items.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteFAQ: (state, action) => {
      state.items = state.items.filter((f) => f.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.items = action.payload; // Assuming payload is the array from your JSON
      })
      .addCase(createFAQ.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.loading = false;
        // The backend returns the new FAQ object including the auto-generated 'order'
        state.items.push(action.payload);
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (f) => f._id === action.payload.id || f.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (f) => f._id !== action.payload && f.id !== action.payload
        );
      });
  },
});

// export const { setFAQs, addFAQ, updateFAQ, deleteFAQ } = faqSlice.actions;
export default faqSlice.reducer;
