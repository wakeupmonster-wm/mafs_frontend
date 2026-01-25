/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

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
