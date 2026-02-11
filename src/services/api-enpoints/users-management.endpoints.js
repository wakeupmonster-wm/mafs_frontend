/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

export const USERENDPOINTS = {
  GET_USERS: `${BASE_URL}/api/v1/admin/users`,
  EXPORT_USERS: `${BASE_URL}/api/v1/admin/users/export/stream`,

  GET_PENDING_KYC: `${BASE_URL}/api/v1/admin/moderation/pending-verifications`,

  VERIFY_USER_KYC: (userId) =>
    `${BASE_URL}/api/v1/admin/moderation/users/${userId}/verify`,

  // Dynamic URL Function
  UPDATE_USER_DETAILS: (userId) => `${BASE_URL}/api/v1/admin/users/${userId}`,

  DELETE_USER_PHOTOS: (userId) =>
    `${BASE_URL}/api/v1/admin/users/${userId}/photos/delete`,
};
