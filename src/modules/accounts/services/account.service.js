import { ACCOUNTENDPOINTS } from "@/services/api-enpoints/auth.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const getAdminAccountAPI = () => {
  return apiConnector("GET", ACCOUNTENDPOINTS.GET_ACCOUNT);
};

export const patchAdminAccountAPI = (payload) => {
  return apiConnector("PATCH", ACCOUNTENDPOINTS.PATCH_ACCOUNT, payload, {
    "Content-Type": "multipart/form-data",
  });
};

export const postChangeAdminPasswordAPI = (payload) => {
  return apiConnector("POST", ACCOUNTENDPOINTS.POST_PASSWORD, payload);
};
