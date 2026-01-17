import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/authentication/store/auth.slice";
import usersReducer from "@/modules/users/store/user.slice";
import dashboardReducer from "@/modules/dashboard/store/dashboard.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  dashboard: dashboardReducer,
});
