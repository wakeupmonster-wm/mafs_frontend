import { NOTIFY_ENDPOINTS } from "@/services/api-enpoints/notify.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/**
 * Sends a push notification to all, free, or premium segments
 */
export const broadcastNotificationApi = (payload) => {
  return apiConnector("POST", NOTIFY_ENDPOINTS.BROADCAST, payload);
};

/**
 * Direct push blast to all active premium subscribers
 */
export const sendNotificationToPremiumUsersApi = (payload) => {
  return apiConnector("POST", NOTIFY_ENDPOINTS.PREMIUM_SEND, payload);
};

/**
 * Logic-based trigger for users whose subscription is ending
 */
export const createPremiumExpiryCampaignApi = (payload) => {
  return apiConnector("POST", NOTIFY_ENDPOINTS.EXPIRY_SEND, payload);
};

/**
 * Fetches history logs for all previous campaigns
 */
export const notificationHistoryApi = (params) => {
  return apiConnector("GET", NOTIFY_ENDPOINTS.HISTORY, null, params);
};

/**
 * Full-scale email marketing broadcast
 */
export const sendEmailCampaignApi = (payload) => {
  const url = NOTIFY_ENDPOINTS.EMAIL_CAMPAIGN;
  const body = {
    campaignName: payload.campaignName,
    subject: payload.emailSubject,
    body: payload.emailBody,
    target: payload.target,
  };
  console.log("body: ", body);

  return apiConnector("POST", url, body);
};

/**
 * Sends the current draft to a specific admin email for verification
 */
export const sendTestEmailApi = (payload) => {
  return apiConnector("POST", NOTIFY_ENDPOINTS.TEST_EMAIL, payload);
};
