/*===================== NOTE: MAKE SURE TO ASSIGN BASE_URL IN .ENV FILE =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/*===================== USER ENDPOINTS=====================*/
export const USERENDPOINTS = {
  // Base User Management
  GET_USERS: `${BASE_URL}/api/v1/admin/users`,
  EXPORT_USERS: `${BASE_URL}/api/v1/admin/users/export/stream`,

  // Moderation & Verification
  GET_PENDING_KYC: `${BASE_URL}/api/v1/admin/moderation/pending-verifications`,

  // Dynamic URL Function
  VERIFY_USER_KYC: (userId) =>
    `${BASE_URL}/api/v1/admin/moderation/users/${userId}/verify`,
};
