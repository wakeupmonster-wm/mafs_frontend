// src/services/adminAuth.api.js
import { apiConnector } from "@/services/axios/axios.connector";
import { USERENDPOINTS } from "@/services/api-enpoints/users-management.endpoints";

/*================= ADMIN LOGIN API OPERATION =====================*/
export const getALLUserListApi = async (page, limit, search, filters) => {
  return apiConnector("GET", USERENDPOINTS.GETALLUSERDETAILS, {
    params: {
      page,
      limit,
      search,
      ...filters,
    },
  }).then((res) => res.data);
};

export const getAllPendingVerificationsApi = async () => {
  return apiConnector("GET", USERENDPOINTS.GETALLPENDINGVERIFICATIONS);
};

export const verifyUserProfileApi = async (userId, payload) => {
  return apiConnector(
    "POST",
    `/api/v1/admintest/users/${userId}/verify`,
    payload
  );
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
  const url = `${USERENDPOINTS.GETEXPORTALLUSER}?${queryParams}`;

  // We use native fetch because it supports the ReadableStream API
  // without buffering the entire response first.
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const bannedUserAPI = async ({ userId, payload }) => {
  return apiConnector("POST", `/api/v1/admintest/users/${userId}/ban`, payload);
};

export const unBannedUserAPI = async (userId) => {
  return apiConnector("POST", `/api/v1/admintest/users/${userId}/unban`, {});
};

export const suspendUserAPI = async ({ userId, payload }) => {
  return apiConnector(
    "POST",
    `/api/v1/admintest/users/${userId}/suspend`,
    payload
  );
};
