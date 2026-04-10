// loader.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loadingText: "Loading...",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.isLoading = true;
      state.loadingText = action.payload?.message || "Loading...";
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
