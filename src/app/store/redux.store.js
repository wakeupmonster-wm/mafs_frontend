// src/app/store/redux.store.js
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";

export const store = configureStore({
  reducer: rootReducer,
});
