import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bannedUserAPI,
  deletePhotoApi,
  exportUsersApi,
  getALLUserListApi,
  getAllPendingVerificationsApi,
  getUserData,
  suspendUserAPI,
  unBannedUserAPI,
  updateUserProfileApi,
  verifyUserProfileApi,
  unsuspendUserAPI
} from "../services/user-management.operation";


export const unsuspendUserProfile = createAsyncThunk(
  "users/unsuspendUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await unsuspendUserAPI(userId);
      console.log(response, "response")
      if (!response.success) return rejectWithValue(response.message);
      return { userId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unsuspend failed"
      );
    }
  }
);

//  Pending This Fetch Users list API/.
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (
    {
      page,
      limit,
      search,
      accountStatus,
      isPremium,
      last24Hours,
      gender,
      isDeactivated,
      isScheduledForDeletion,
    },
    { rejectWithValue },
  ) => {
    try {
      // Pass the new filters directly to your API function
      const response = await getALLUserListApi(
        page,
        limit,
        search,
        accountStatus,
        isPremium,
        last24Hours,
        gender,
        isDeactivated,
        isScheduledForDeletion,
      );

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
  },
);

export const fetchUserData = createAsyncThunk(
  "user/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserData(userId);

      if (response && response.success) {
        return {
          user: response.data || {},
        };
      }

      return rejectWithValue(response.message || "Failed to fetch user");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  },
);

export const fetchPendingVerifications = createAsyncThunk(
  "users/fetchPendingVerifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPendingVerificationsApi();

      if (!response.success) {
        return rejectWithValue(
          response.message || "Failed to fetch pending verifications",
        );
      }

      return {
        items: response.data || [],
        count: response.count || 0,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  },
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
        error.response?.data?.message || "Verification failed",
      );
    }
  },
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
  },
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

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return { userId, category, reason };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ban failed");
    }
  },
);

// Thunk for Unbanning
export const unbanUserProfile = createAsyncThunk(
  "users/unbanUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await unBannedUserAPI(userId);
      if (!response.success) return rejectWithValue(response.message);
      return { userId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Unban failed");
    }
  },
);

export const suspendUserProfile = createAsyncThunk(
  "users/suspendUserProfile",
  async ({ userId, reason, durationHours }, { rejectWithValue }) => {
    try {
      const response = await suspendUserAPI({
        userId,
        payload: { reason, durationHours },
      });

      if (!response.success) return rejectWithValue(response.message);

      return { userId, reason, durationHours };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Suspension failed",
      );
    }
  },
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
  },
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
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    user: null,
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
    clearSelectedUser: (state) => {
      state.user = null;
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
      /* FETCH USER DATA */
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
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

        // 1. Update List
        const userIndex = state.items.findIndex((u) => u._id === userId);
        if (userIndex !== -1) {
          state.items[userIndex].verification = {
            ...state.items[userIndex].verification,
            status: status === "approve" ? "approved" : "rejected",
            rejectionReason: reason || undefined,
          };
        }

        // 2. 🔥 Update Single View
        if (state.user && state.user._id === userId) {
          state.user.verification = {
            ...state.user.verification,
            status: status === "approve" ? "approved" : "rejected",
            rejectionReason: reason || undefined,
          };
        }
      })
      /* UPDATE USER PROFILE LIVE */
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      /* UPDATE USER PROFILE LIVE */
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, profile } = action.payload;

        // 1. Update in the LIST (for the table/directory view)
        const userIndex = state.items.findIndex(
          (u) => u._id === userId || u.id === userId,
        );
        if (userIndex !== -1) {
          state.items[userIndex].profile = {
            ...state.items[userIndex].profile,
            ...profile,
          };
        }

        // 2. 🔥 UPDATE THE SINGLE VIEW (for ViewProfilePage)
        if (
          state.user &&
          (state.user._id === userId || state.user.id === userId)
        ) {
          state.user.profile = {
            ...state.user.profile,
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
          (u) => u._id === userId || u.id === userId,
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
      /* BANNED USER SUCCESS */
      .addCase(bannedUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, category, reason } = action.payload;

        const updateData = (target) => {
          target.accountStatus = "banned";
          if (target.account) {
            target.account.status = "banned";
            target.account.banDetails = {
              isBanned: true,
              reason: reason || "Manual ban by admin",
              category: category || "General",
              bannedAt: new Date().toISOString(),
            };
          }
        };

        // Update in list
        const userInList = state.items.find(
          (u) => u._id === userId || u.id === userId,
        );
        if (userInList) updateData(userInList);

        // 🔥 Update in Single View
        if (
          state.user &&
          (state.user._id === userId || state.user.id === userId)
        ) {
          updateData(state.user);
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
      /* UNBAN USER SUCCESS */
      .addCase(unbanUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId } = action.payload;

        const updateData = (target) => {
          target.accountStatus = "active";
          if (target.account) {
            target.account.status = "active";
            target.account.banDetails = {
              isBanned: false,
              unbannedAt: new Date().toISOString(),
            };
          }
        };

        const userInList = state.items.find(
          (u) => u._id === userId || u.id === userId,
        );
        if (userInList) updateData(userInList);

        // 🔥 Update in Single View
        if (
          state.user &&
          (state.user._id === userId || state.user.id === userId)
        ) {
          updateData(state.user);
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
      /* SUSPEND USER SUCCESS */
      .addCase(suspendUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, reason, durationHours } = action.payload;

        const updateData = (target) => {
          target.accountStatus = "suspended";
          if (target.account) target.account.status = "suspended";
          target.suspensionDetails = {
            isSuspended: true,
            reason,
            suspendedAt: new Date().toISOString(),
            suspendUntil: new Date(
              Date.now() + durationHours * 60 * 60 * 1000,
            ).toISOString(),
          };
        };

        const userInList = state.items.find(
          (u) => u._id === userId || u.id === userId,
        );
        if (userInList) updateData(userInList);

        // 🔥 Update in Single View
        if (
          state.user &&
          (state.user._id === userId || state.user.id === userId)
        ) {
          updateData(state.user);
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
      })
      .addCase(unsuspendUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(unsuspendUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        const { userId } = action.payload;

        const user = state.items.find(
          (u) => u._id === userId || u.id === userId
        );

        if (user) {
          user.accountStatus = "active";

          if (user.account) {
            user.account.status = "active";
          }

          // ✅ Sirf suspension details clear
          user.suspensionDetails = {
            isSuspended: false,
            reason: null,
            suspendedAt: null,
            suspendUntil: null,
          };
        }
      })
      .addCase(unsuspendUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {
  setExportProgress,
  setPagination,
  addUser,
  deleteUser,
  updateUserStatus,
  clearSelectedUser,
} = userSlice.actions;
export default userSlice.reducer;
