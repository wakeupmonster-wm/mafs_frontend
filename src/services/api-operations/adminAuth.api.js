// src/services/adminAuth.api.js
import { apiConnector } from "@/services/axios/axios.connector";
import { AUTHENDPOINTS } from "@/services/api-enpoints/auth.endpoints";

/*================= ADMIN LOGIN API OPERATION =====================*/
export const adminLoginApi = (data) => {
  return apiConnector("POST", AUTHENDPOINTS.LOGIN_API, data);
};
