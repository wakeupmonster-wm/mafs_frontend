import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  exportUsersApi,
  getALLUserListApi,
  getAllPendingVerificationsApi,
  verifyUserProfileApi,
} from "../services/user-management.operation";

// export const fetchUsers = createAsyncThunk(
//   "users/fetchAll",
//   async ({ page, limit, search, filters }, { rejectWithValue }) => {
//     try {
//       const response = await getALLUserListApi(page, limit, search, filters);

//       // console.log("response: ", response);

//       // 1. Check if response is the raw array you showed me
//       if (Array.isArray(response)) {
//         return {
//           users: response,
//           // Since the API isn't returning a pagination object in this specific response,
//           // we provide a fallback so the UI doesn't break.
//           pagination: {
//             page: page || 1,
//             limit: limit || 20,
//             total: response.length,
//             totalPages: Math.ceil(response.length / (limit || 20)),
//           },
//         };
//       }

//       if (!response.success) {
//         return rejectWithValue(response.message || "Failed to fetch users");
//       }

//       // 2. Fallback if the API ever changes to a { success, data, pagination } format
//       return {
//         users: response.data || [],
//         pagination: response.pagination || {
//           page: 1,
//           limit: 20,
//           total: 0,
//           totalPages: 0,
//         },
//       };
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Server error");
//     }
//   }
// );

//  Pending This Fetch Users list API/.
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page, limit, search, filters }, { rejectWithValue }) => {
    try {
      const response = await getALLUserListApi(page, limit, search, filters);

      // 1. Backend now returns { success, data, pagination }
      if (response && response.success) {
        return {
          users: response.data || [],
          pagination: {
            page: response.pagination.page || page,
            limit: response.pagination.limit || limit,
            total: response.pagination.total || 0, // 👈 Crucial for the "Page X of Y" logic
            totalPages: response.pagination.totalPages || 0,
          },
        };
      }

      // 2. Fallback for legacy array responses
      if (Array.isArray(response)) {
        return {
          users: response,
          pagination: {
            page: page || 1,
            limit: limit || 20,
            total: response.length,
            totalPages: Math.ceil(response.length / (limit || 20)),
          },
        };
      }

      return rejectWithValue(response.message || "Failed to fetch users");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

export const fetchPendingVerifications = createAsyncThunk(
  "users/fetchPendingVerifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPendingVerificationsApi();

      if (!response.success) {
        return rejectWithValue(
          response.message || "Failed to fetch pending verifications"
        );
      }

      return {
        items: response.data || [],
        count: response.count || 0,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

export const verifyUserProfile = createAsyncThunk(
  "users/verifyUserProfile",
  async ({ userId, action, reason }, { rejectWithValue }) => {
    try {
      const response = await verifyUserProfileApi(userId, {
        action,
        reason,
      });

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return { userId, action };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const exportUsersStream = createAsyncThunk(
  "users/exportStream",
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      // 1. Get the raw fetch response
      const response = await exportUsersApi(filters);

      if (!response.ok) throw new Error("Failed to connect to export stream");

      // 2. Initialize the reader for the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let csvData = "";

      //

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk of data
        const chunk = decoder.decode(value, { stream: true });

        // 3. Extract and Dispatch Progress
        const progressRegex = /---PROG:(\d+)---/g;
        let match;
        while ((match = progressRegex.exec(chunk)) !== null) {
          const progressValue = Number(match[1]);
          // Use the action creator directly from the slice
          dispatch(setExportProgress(progressValue));
        }

        // 4. Sanitize data: remove markers before appending to final CSV string
        const cleanChunk = chunk.replace(/---PROG:\d+---/g, "");
        csvData += cleanChunk;
      }

      return csvData;
    } catch (error) {
      console.error("Export Stream Thunk Error:", error);
      return rejectWithValue(error.message || "Streaming export failed");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    pendingVerifications: [],
    pendingCount: 0,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
    },
    exportLoading: false,
    exportProgress: 0,
  },
  reducers: {
    setPagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    addUser: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: Date.now(),
        joined: new Date().toISOString().split("T")[0],
      });
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
    },
    updateUserStatus: (state, action) => {
      const user = state.items.find((u) => u.id === action.payload.id);
      if (user) user.status = action.payload.status;
    },
    setExportProgress: (state, action) => {
      state.exportProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPendingVerifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingVerifications.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingVerifications = action.payload.items;
        state.pendingCount = action.payload.count;
      })
      .addCase(fetchPendingVerifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyUserProfile.fulfilled, (state, action) => {
        state.pendingVerifications = state.pendingVerifications.filter(
          (item) => item.userId !== action.payload.userId
        );
      })
      .addCase(exportUsersStream.pending, (state) => {
        state.exportLoading = true;
        state.exportProgress = 0;
      })
      .addCase(exportUsersStream.fulfilled, (state) => {
        state.exportLoading = false;
        state.exportProgress = 0; // Reset after finish
      })
      .addCase(exportUsersStream.rejected, (state) => {
        state.exportLoading = false;
      });
  },
});
export const {
  setExportProgress,
  setPagination,
  addUser,
  deleteUser,
  updateUserStatus,
} = userSlice.actions;
export default userSlice.reducer;
