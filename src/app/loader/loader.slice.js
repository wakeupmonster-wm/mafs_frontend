// const initialState = { loadingCount: 0 };

// export default function loaderReducer(state = initialState, action) {
//   switch (action.type) {
//     case "SHOW_LOADER":
//       return { loadingCount: state.loadingCount + 1 };
//     case "HIDE_LOADER":
//       return { loadingCount: Math.max(state.loadingCount - 1, 0) };
//     default:
//       return state;
//   }
// }

// loader.slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  loadingText: 'Loading...'
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.isLoading = true;
      state.loadingText = action.payload?.message || 'Loading...';
    },
    hideLoader: (state) => {
      state.isLoading = false;
    }
  }
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;