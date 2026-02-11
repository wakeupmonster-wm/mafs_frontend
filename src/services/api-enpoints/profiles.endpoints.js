/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*===================== ADMIN ENDPOINTS =====================*/
export const PROFILE_ENDPOINTS = {
  // Profile Review Section
  PROFILE: {
    REPORTED: `${BASE_URL}/api/v1/admin/profile-review/reported`,
    DETAILS: (id) => `${BASE_URL}/api/v1/admin/profile-review/${id}`,
    UPDATE_STATUS: (id) =>
      `${BASE_URL}/api/v1/admin/profile-review/${id}/status`,
  },

  // Moderation Section
  MODERATION: {
    BAN_USER: (id) => `${BASE_URL}/api/v1/admin/moderation/users/${id}/ban`,
    UNBAN_USER: (id) => `${BASE_URL}/api/v1/admin/moderation/users/${id}/unban`,
    SUSPEND_USER: (id) =>
      `${BASE_URL}/api/v1/admin/moderation/users/${id}/suspend`,
  },
};
