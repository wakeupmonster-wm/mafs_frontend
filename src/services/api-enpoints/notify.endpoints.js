/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

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
