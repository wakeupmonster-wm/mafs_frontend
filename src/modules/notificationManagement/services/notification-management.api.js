import { apiConnector } from "@/services/axios/axios.connector";

const BASE = "/api/v1/admin/notification-management";

export const broadcastNotificationApi = (payload) =>
  apiConnector("POST", `${BASE}/broadcast`, payload);

export const sendNotificationToPremiumUsersApi = (payload) =>
  apiConnector("POST", `${BASE}/premium/send`, payload);

export const createPremiumExpiryCampaignApi = (payload) =>
  apiConnector("POST", `${BASE}/premium-expiry/send`, payload);

export const notificationHistoryApi = (payload) => 
  apiConnector("GET",`${BASE}/notifications/history`,payload)