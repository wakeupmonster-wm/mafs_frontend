// src/app/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLoginApi } from "@/services/api-operations/adminAuth.api";

/* =========================
   ASYNC THUNK
========================= */
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminLoginApi(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("admin_access_token");
    },
  },

  extraReducers: (builder) => {
    builder
      // PENDING
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // FULFILLED
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("admin_access_token", action.payload.token);
      })

      // REJECTED
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
