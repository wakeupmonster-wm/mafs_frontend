import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/authentication/store/auth.slice";
import usersReducer from "@/modules/users/store/user.slice";
import dashboardReducer from "@/modules/dashboard/store/dashboard.slice";
import giveawayReducer from "@/modules/giveaway/store/giveaway.slice";
import supportReducer from "@/modules/support/store/support.slice";
import profileReviewReducer from "@/modules/profileReview/store/profile-review.slice";
import chatManagementReducer from "@/modules/chatManagement/store/chat-management.slice";
import notificationManagementReducer from "@/modules/notificationManagement/store/notification-management.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  dashboard: dashboardReducer,
  giveaway: giveawayReducer,
  support: supportReducer,
  profileReview: profileReviewReducer,
  chatManagement: chatManagementReducer,
  notificationManagement: notificationManagementReducer,
});
