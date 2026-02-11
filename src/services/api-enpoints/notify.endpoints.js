/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*===================== ADMIN ENDPOINTS =====================*/
export const NOTIFY_ENDPOINTS = {
  BROADCAST: `${BASE_URL}/api/v1/admin/notification/broadcast`,

  PREMIUM_SEND: `${BASE_URL}/api/v1/admin/notification/premium/send`,

  EXPIRY_SEND: `${BASE_URL}/api/v1/admin/notification/premium-expiry/send`,

  HISTORY: `${BASE_URL}/api/v1/admin/notification/notifications/history`,

  EMAIL_CAMPAIGN: `${BASE_URL}/api/v1/admin/notification/broadcastemail`,

  // NEW: Test endpoint for peace of mind
  TEST_EMAIL: `${BASE_URL}/api/v1/admin/notification/test-email`,
};
