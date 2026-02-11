import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/authentication/store/auth.slice";
import usersReducer from "@/modules/users/store/user.slice";
import dashboardReducer from "@/modules/dashboard/store/dashboard.slice";
import giveawayReducer from "@/modules/giveaway/store/giveaway.slice";
import supportReducer from "@/modules/support/store/support.slice";
import profileReviewReducer from "@/modules/profileReview/store/profile-review.slice";
import chatManagementReducer from "@/modules/chatManagement/store/chat-management.slice";
import notificationManagementReducer from "@/modules/notificationManagement/store/notification-management.slice";
import faqsReducer from "@/modules/cms/store/faq.slice";
import privacypolicyReducer from "@/modules/cms/store/privacy.slice";
import termConditionReducer from "@/modules/cms/store/t&c.slice";
import verificationReducer from "@/modules/verification/store/verfication.slice";
import prizeReducer from "@/modules/giveaway/store/prizes.slice";
import campaignReducer from "@/modules/giveaway/store/campaign.slice";
import bulkReducer from "@/modules/giveaway/store/bulk.slice";
import deliveryReducer from "@/modules/giveaway/store/delivery.slice";
import winnerReducer from "@/modules/giveaway/store/winner.slice";
import accountReducer from "@/modules/accounts/store/account.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  account: accountReducer,
  verification: verificationReducer,
  dashboard: dashboardReducer,
  giveaway: giveawayReducer,
  prize: prizeReducer,
  campaign: campaignReducer,
  bulk: bulkReducer,
  delivery: deliveryReducer,
  winner: winnerReducer,
  support: supportReducer,
  profileReview: profileReviewReducer,
  chatManagement: chatManagementReducer,
  notificationManagement: notificationManagementReducer,
  faqs: faqsReducer,
  privacypolicy: privacypolicyReducer,
  termsAndcondition: termConditionReducer,
});
