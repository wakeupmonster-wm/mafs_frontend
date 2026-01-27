import { CMS_ENDPOINTS } from "@/services/api-enpoints/cms.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const getAllFAQsAPI = async () => {
  return apiConnector("GET", CMS_ENDPOINTS.FAQ_ENDPOINTS.GET_ALL);
};

export const createFAQAPI = async (payload) => {
  return apiConnector("POST", CMS_ENDPOINTS.FAQ_ENDPOINTS.CREATE, payload);
};

export const updateFAQAPI = async ({ id, payload }) => {
  return apiConnector("PATCH", CMS_ENDPOINTS.FAQ_ENDPOINTS.UPDATE(id), payload);
};

export const deleteFAQAPI = async (id) => {
  return apiConnector("DELETE", CMS_ENDPOINTS.FAQ_ENDPOINTS.DELETE(id));
};
