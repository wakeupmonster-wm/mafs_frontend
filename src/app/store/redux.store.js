// src/app/store/redux.store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
