/* eslint-disable no-useless-catch */
// src/services/adminAuth.api.js
import { apiConnector } from "@/services/axios/axios.connector";
import { USERENDPOINTS } from "@/services/api-endpoints/users-management.endpoints";
import { PROFILE_ENDPOINTS } from "@/services/api-endpoints/profiles.endpoints";
import axios from "axios";

/*================= ADMIN LOGIN API OPERATION =====================*/
export const getALLUserListApi = async (
  page,
  limit,
  search,
  accountStatus,
  isPremium,
  last24Hours,
  gender,
  isDeactivated,
  isScheduledForDeletion,
) => {
  // Construct the params object carefully
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
    ...(accountStatus && { accountStatus }),
    ...(isPremium !== undefined && { isPremium: String(isPremium) }),
    ...(last24Hours !== undefined && { last24Hours: String(last24Hours) }),
    ...(gender !== undefined && { gender: String(gender) }),
    ...(isDeactivated !== undefined && {
      isDeactivated: String(isDeactivated),
    }),
    ...(isScheduledForDeletion !== undefined && {
      isScheduledForDeletion: String(isScheduledForDeletion),
    }),
  };
  try {
    const response = await apiConnector(
      "GET",
      USERENDPOINTS.GET_USERS,
      null,
      {},
      queryParams,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId) => {
  const url = USERENDPOINTS.GET_USERDATA(userId);
  return apiConnector("GET", url, {});
};

export const getAllPendingVerificationsApi = async (status = "pending") => {
  const urlWithFilter = `${USERENDPOINTS.GET_PENDING_KYC}?status=${status}`;

  return apiConnector("GET", urlWithFilter);
  // return apiConnector("GET", USERENDPOINTS.GET_PENDING_KYC);
};

export const verifyUserProfileApi = async (userId, payload) => {
  const url = USERENDPOINTS.VERIFY_USER_KYC(userId);
  return apiConnector("POST", url, payload);
};

export const updateUserProfileApi = async (userId, payload) => {
  const url = USERENDPOINTS.UPDATE_USER_DETAILS(userId);
  return apiConnector("PATCH", url, payload);
};

export const deletePhotoApi = async (userId, publicId) => {
  const url = USERENDPOINTS.DELETE_USER_PHOTOS(userId);
  return apiConnector("DELETE", url, { publicId });
};

// export const exportUsersApi = async (filters = {}) => {
//   try {
//     const response = await apiConnector(
//       "GET",
//       USERENDPOINTS.GETEXPORTALLUSER,
//       null,
//       null,
//       filters
//     );
//     return response; // Return the actual data ({success: true, downloadUrl: ...})
//   } catch (err) {
//     console.error("API Export Error:", err);
//     throw err; // 🚨 IMPORTANT: Throw the error so createAsyncThunk can catch it
//   }
// };

/*
❌ axios for streaming → never works
✅ fetch for streaming → industry standard
*/

export const exportUsersApi = async (filters = {}) => {
  const token = localStorage.getItem("access_Token");

  // Convert filters object to query string
  const queryParams = new URLSearchParams(filters).toString();
  const url = `${USERENDPOINTS.EXPORT_USERS}?${queryParams}`;

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const bannedUserAPI = async ({ userId, payload }) => {
  const url = PROFILE_ENDPOINTS.MODERATION.BAN_USER(userId);
  return apiConnector("POST", url, payload);
};

export const unBannedUserAPI = async (userId) => {
  const url = PROFILE_ENDPOINTS.MODERATION.UNBAN_USER(userId);
  return apiConnector("POST", url, {});
};

export const suspendUserAPI = async ({ userId, payload }) => {
  const url = PROFILE_ENDPOINTS.MODERATION.SUSPEND_USER(userId);
  return apiConnector("POST", url, payload);
};
export const unsuspendUserAPI = async (userId) => {
  const url = PROFILE_ENDPOINTS.MODERATION.UNSUSPEND_USER(userId);
  return apiConnector("POST", url, {});
};
