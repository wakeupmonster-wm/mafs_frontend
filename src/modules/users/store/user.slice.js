import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getALLUserListApi } from "../services/user-management.operation";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page, limit, search, filters }, { rejectWithValue }) => {
    try {
      const response = await getALLUserListApi(page, limit, search, filters);

      // console.log("response: ", response);

      // 1. Check if response is the raw array you showed me
      if (Array.isArray(response)) {
        return {
          users: response,
          // Since the API isn't returning a pagination object in this specific response,
          // we provide a fallback so the UI doesn't break.
          pagination: {
            page: page || 1,
            limit: limit || 20,
            total: response.length,
            totalPages: Math.ceil(response.length / (limit || 20)),
          },
        };
      }

      if (!response.success) {
        return rejectWithValue(response.message || "Failed to fetch users");
      }

      // 2. Fallback if the API ever changes to a { success, data, pagination } format
      return {
        users: response.data || [],
        pagination: response.pagination || {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
    },
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
      });
  },
});

export const { setPagination, addUser, deleteUser, updateUserStatus } =
  userSlice.actions;
export default userSlice.reducer;
