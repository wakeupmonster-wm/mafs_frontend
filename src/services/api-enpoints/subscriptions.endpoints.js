/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*===================== SUBSCRIPTIONS ENDPOINTS =====================*/
export const SUBSCRIPTIONSENDPOINTS = {
  GET_STATS: `${BASE_URL}/api/v1/subscription/stats`,
  GET_SUBSCRIPTION_LIST: `${BASE_URL}/api/v1/subscription/subsciptionlist`,
  GET_SINGEL_USERDETAILS: (userId) =>
    `${BASE_URL}/api/v1/subscription/user/${userId}`,
  GET_REVENUE_ANALYTICS_API: `${BASE_URL}/api/v1/subscription/revenue`,
  GET_CANCEllATION_ANALYTICS_API: `${BASE_URL}/api/v1/subscription/cancel`,
  GET_RISK_USERS: `${BASE_URL}/api/v1/subscription/risk`,
  GET_WEBHOOK_EVENTS: `${BASE_URL}/api/v1/subscription/webhook`,
  GET_ALL_TRANSACTIONS: `${BASE_URL}/api/v1/subscription/alltransection`,
};
