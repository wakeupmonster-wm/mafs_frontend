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
  return apiConnector(
    "GET",
    USERENDPOINTS.GETALLPENDINGVERIFICATIONS
  )
};

export const verifyUserProfileApi = async(userId,payload)=>{
  return apiConnector("POST",  `/api/v1/admin/users/${userId}/verify`,
    payload)
}