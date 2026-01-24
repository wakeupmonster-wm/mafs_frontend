import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/authentication/store/auth.slice";
import usersReducer from "@/modules/users/store/user.slice";
import dashboardReducer from "@/modules/dashboard/store/dashboard.slice";
import giveawayReducer from "@/modules/giveaway/store/giveaway.slice";
import supportReducer from "@/modules/support/store/support.slice";
import faqsReducer from "@/modules/cms/store/faq.slice";
import privacypolicyReducer from "@/modules/cms/store/privacy.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  dashboard: dashboardReducer,
  giveaway: giveawayReducer,
  support: supportReducer,
  faqs: faqsReducer,
  privacypolicy: privacypolicyReducer,
});
