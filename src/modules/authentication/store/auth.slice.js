import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminForgotPasswordAPI,
  adminLoginAPI,
  adminRequestOTPAPI,
  adminVerifyOTPAPI,
} from "../services/adminAuth.api";
import axios from "axios";

// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await adminLoginAPI(credentials);
//       const { success, message, screen, data } = response;

//       if (!success) {
//         return rejectWithValue(message || "Invalid credentials");
//       }

//       const user = {
//         id: data.id,
//         fullName: data.fullName,
//         email: data.email,
//         // role: "ADMIN",
//         role: data.role || "ADMIN",
//         avatar: data.avatar,
//         screen,
//         message,
//       };

//       const token = data.auth.accessToken;

//       // 🔐 Persist BOTH token + user
//       localStorage.setItem("access_Token", token);
//       localStorage.setItem("auth_user", JSON.stringify(user));

//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       return user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Server error");
//     }
//   }
// );


export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminLoginAPI(credentials);

      if (!response.success) {
        return rejectWithValue("Invalid credentials");
      }

      const { accessToken, refreshToken } = response.data;

      // Minimal admin user (until backend sends profile)
      const user = {
        role: "ADMIN",
      };

      localStorage.setItem("access_Token", accessToken);
      localStorage.setItem("refresh_Token", refreshToken);
      localStorage.setItem("auth_user", JSON.stringify(user));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Server error"
      );
    }
  }
);


export const requestOtpThunk = createAsyncThunk(
  "auth/requestOtp",
  async (email, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint
      const response = await adminRequestOTPAPI(email);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// Step 2: Verify the OTP
export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminVerifyOTPAPI(data);

      // Usually returns a temporary reset token to secure Step 3
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid OTP code"
      );
    }
  }
);

// Step 3: Set the New Password
export const forgotPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminForgotPasswordAPI(data);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

// Set the New Password, when user/admin is already login.
export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        email,
        password,
        token,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

/* ============================
 * ====== AUTH SLICE * ========
 * ============================ */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
    initialized: false, // 🔥 REQUIRED
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("access_Token");
      localStorage.removeItem("auth_user");

      delete axios.defaults.headers.common["Authorization"];
    },

    // 🔥 RESTORE AUTH ON APP LOAD
    initializeAuth: (state) => {
      const token = localStorage.getItem("access_Token");
      const user = localStorage.getItem("auth_user");

      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      state.initialized = true; // ✅ AUTH READY
    },
  },
  extraReducers: (builder) => {
    builder
      // Extra Reducers For Login Thunk
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Extra Reducers For Request OTP Thunk
      .addCase(requestOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Extra Reducers For Verify OTP Thunk
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Extra Reducers For Forgot-Password Thunk
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
