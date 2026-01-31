import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReportedProfilesApi,
  getProfileForReviewApi,
  updateProfileStatusApi,
} from "../services/profile-review.api";




// export const fetchReportedProfiles = createAsyncThunk(
//   "profileReview/fetchReportedProfiles",
//   async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
//     try {
//       const res = await getReportedProfilesApi({ page, limit });
//       return res.data; // 🔥 THIS FIX
//     } catch (e) {
//       return rejectWithValue(
//         e.response?.data?.message || "Failed to fetch reported profiles"
//       );
//     }
//   }
// );



export const fetchReportedProfiles = createAsyncThunk(
  "profileReview/fetchReportedProfiles",
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const res = await getReportedProfilesApi({ page, limit });
      return res;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch reported profiles");
    }
  }
);

export const fetchProfileForReview = createAsyncThunk(
  "profileReview/fetchProfileForReview",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getProfileForReviewApi(userId);
      return res?.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch profile");
    }
  }
);
export const performUpdateProfileStatus = createAsyncThunk(
  "profileReview/updateProfileStatus",
  async (
    { userId, action, reason, banDuration, replyMessage, reportId },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateProfileStatusApi(userId, {
        action,
        reason,
        banDuration,
        replyMessage,
        reportId,
      });

      return {
        userId,
        message: res?.message || "Updated successfully",
      };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to update status"
      );
    }
  }
);


// export const performUpdateProfileStatus = createAsyncThunk(
//   "profileReview/updateProfileStatus",
//   async ({ userId, action, reason, banDuration }, { rejectWithValue }) => {
//     try {
//       const res = await updateProfileStatusApi(userId, { action, reason, banDuration });
//       return { userId, ...res };
//     } catch (e) {
//       return rejectWithValue(e.response?.data?.message || "Failed to update status");
//     }
//   }
// );

const initialState = {
  list: [],
  pagination: { total: 0, page: 1, limit: 20, totalPages: 0 },
  selected: null,
  loading: false,
  error: null,
  successMessage: null,
};

const profileReviewSlice = createSlice({
  name: "profileReview",
  initialState,
  reducers: {
    clearProfileReviewStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetSelectedProfile: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchReportedProfiles.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchReportedProfiles.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload?.data || [];
        s.pagination = a.payload?.pagination || initialState.pagination;
      })
      .addCase(fetchReportedProfiles.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      // single
      .addCase(fetchProfileForReview.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProfileForReview.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload || null;
      })
      .addCase(fetchProfileForReview.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      // update
      .addCase(performUpdateProfileStatus.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.successMessage = null;
      })
      .addCase(performUpdateProfileStatus.fulfilled, (s, a) => {
        s.loading = false;
        s.successMessage = a.payload?.message || "Updated";
        // Optionally update selected/list state optimistically
        if (s.selected?.userId === a.payload?.userId) {
          // If approved/rejected, we might want to remove pending reports etc.
        }
      })
      .addCase(performUpdateProfileStatus.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearProfileReviewStatus, resetSelectedProfile } = profileReviewSlice.actions;
export default profileReviewSlice.reducer;
