import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bannedUserAPI,
  exportUsersApi,
  getALLUserListApi,
  getAllPendingVerificationsApi,
  suspendUserAPI,
  unBannedUserAPI,
  updateUserProfileApi,
  verifyUserProfileApi,
} from "../services/user-management.operation";

//  Pending This Fetch Users list API/.
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (
    { page, limit, search, accountStatus, isPremium },
    { rejectWithValue }
  ) => {
    // console.log("page: ", page);
    // console.log("limit: ", limit);
    // console.log("search: ", search);
    // console.log("accountStatus: ", accountStatus);
    // console.log("isPremium: ", isPremium);
    try {
      // Pass the new filters directly to your API function
      const response = await getALLUserListApi(
        page,
        limit,
        search,
        accountStatus,
        isPremium
      );

      console.log("response: ", response);

      if (response && response.success) {
        return {
          users: response.data || [],
          pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
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

export const bannedUserProfile = createAsyncThunk(
  "users/bannedUserProfile",
  async ({ userId, category, reason }, { rejectWithValue }) => {
    try {
      // Pass userId separately and group category/reason into the payload object
      const response = await bannedUserAPI({
        userId,
        payload: { category, reason },
      });

      console.log("response: ", response);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return { userId, category, reason };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ban failed");
    }
  }
);

// Thunk for Unbanning
export const unbanUserProfile = createAsyncThunk(
  "users/unbanUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await unBannedUserAPI(userId);
      console.log("response: ", response);
      if (!response.success) return rejectWithValue(response.message);
      return { userId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unban failed");
    }
  }
);

export const suspendUserProfile = createAsyncThunk(
  "users/suspendUserProfile",
  async ({ userId, reason, durationHours }, { rejectWithValue }) => {
    try {
      console.log("call suspend: ", userId);
      const response = await suspendUserAPI({
        userId,
        payload: { reason, durationHours },
      });

      if (!response.success) return rejectWithValue(response.message);

      return { userId, reason, durationHours };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Suspension failed"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ userId, profile }, { rejectWithValue }) => {
    try {
      const payload = { profile };

      // Assuming you have this API method in your services
      const response = await updateUserProfileApi(userId, payload);

      if (!response.success) {
        return rejectWithValue(response.message || "Update failed");
      }

      // Return both the ID and the new data so the reducer knows who to update
      return { userId, profile: response.data.profile };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

export const deleteUserPhoto = createAsyncThunk(
  "users/deletePhoto",
  async ({ userId, publicId }, { rejectWithValue }) => {
    try {
      const response = await deletePhotoApi(userId, publicId);

      if (!response.success) {
        return rejectWithValue(response.message || "Delete failed");
      }

      // Return these to update the local state without a refresh
      return { userId, publicId, updatedPhotos: response.data.profile.photos };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
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
      limit: 10,
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
      /* FETCH USER DATA LIST */
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
      /* PENDING USERVERIFICATION */
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
      /* VERIFY USER PROFILE */
      .addCase(verifyUserProfile.fulfilled, (state, action) => {
        state.loading = false;

        const { userId, action: status, reason } = action.payload;

        // 1. Remove from pending list (already doing this)
        state.pendingVerifications = state.pendingVerifications.filter(
          (item) => item.userId !== userId
        );

        // 2. FIND AND UPDATE THE USER IN THE LIST
        // This is the key for real-time UI updates
        const userIndex = state.items.findIndex(
          (u) => u._id === userId || u.id === userId
        );

        if (userIndex !== -1) {
          state.items[userIndex].verification = {
            ...state.items[userIndex].verification,
            status: status === "approve" ? "approved" : "rejected",
            rejectionReason: reason || undefined,
          };
        }
      })
      /* UPDATE USER PROFILE LIVE */
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, profile } = action.payload;

        // Find the user in the main list
        const userIndex = state.items.findIndex(
          (u) => u._id === userId || u.id === userId
        );

        if (userIndex !== -1) {
          // Merge the new profile data into the existing user object
          // Immer handles the "immutable" update automatically here
          state.items[userIndex].profile = {
            ...state.items[userIndex].profile,
            ...profile,
          };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* DELETE USER PHOTO LIVE */
      .addCase(deleteUserPhoto.fulfilled, (state, action) => {
        const { userId, updatedPhotos } = action.payload;
        const userIndex = state.items.findIndex(
          (u) => u._id === userId || u.id === userId
        );

        if (userIndex !== -1) {
          // Update the photos array with the new ordered list from the backend
          state.items[userIndex].photos = updatedPhotos;
        }
      })
      /* BANNED USER SUCCESS */
      .addCase(bannedUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bannedUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Note: Ensure your thunk payload returns 'userId', 'category', and 'reason'
        const { userId, category, reason } = action.payload;

        const user = state.items.find(
          (u) => u._id === userId || u.id === userId
        );

        if (user) {
          // 1. Update top-level status if your UI uses it
          user.accountStatus = "banned";

          // 2. Update nested account object (matches your API structure)
          if (user.account) {
            user.account.status = "banned";
            user.account.banDetails = {
              isBanned: true,
              reason: reason || "No reason provided",
              category: category || "General",
              bannedAt: new Date().toISOString(),
            };
          }
        }
      })
      .addCase(bannedUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* UNBAN USER SUCCESS */
      .addCase(unbanUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(unbanUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId } = action.payload;

        const user = state.items.find(
          (u) => u._id === userId || u.id === userId
        );

        if (user) {
          user.accountStatus = "active";
          if (user.account) {
            user.account.status = "active";
            user.account.banDetails = {
              isBanned: false,
              unbannedAt: new Date().toISOString(),
            };
          }
        }
      })
      .addCase(unbanUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* SUSPEND USER SUCCESS */
      .addCase(suspendUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(suspendUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, reason, durationHours } = action.payload;
        const user = state.items.find(
          (u) => u._id === userId || u.id === userId
        );

        if (user) {
          user.accountStatus = "suspended";
          if (user.account) user.account.status = "suspended";

          const suspendUntil = new Date(
            Date.now() + durationHours * 60 * 60 * 1000
          ).toISOString();

          user.suspensionDetails = {
            isSuspended: true,
            reason,
            suspendedAt: new Date().toISOString(),
            suspendUntil,
          };
        }
      })
      .addCase(suspendUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* BULK EXPORT USER DATA CSV FILE */
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
