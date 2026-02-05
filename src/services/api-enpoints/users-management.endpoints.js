export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.matchatfirstswipe.com.au";

export const USERENDPOINTS = {

  GET_USERS: `http://localhost:3001/api/v1/admin/users`,
  EXPORT_USERS: `http://localhost:3001/api/v1/admin/users/export/stream`,

  GET_PENDING_KYC: `http://localhost:3001/api/v1/admin/moderation/pending-verifications`,

  VERIFY_USER_KYC: (userId) =>
    `${BASE_URL}/api/v1/admin/moderation/users/${userId}/verify`,

  // Dynamic URL Function
  UPDATE_USER_DETAILS: (userId) => `${BASE_URL}/api/v1/admin/users/${userId}`,
  DELETE_USER_PHOTOS: (userId) =>
    `${BASE_URL}/api/v1/admin/users/${userId}/photos/delete`,
};