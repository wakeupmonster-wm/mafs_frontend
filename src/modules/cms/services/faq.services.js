import { apiConnector } from "@/services/axios/axios.connector";

export const getAllFAQsAPI = async () => {
  return apiConnector("GET", "/api/v1/content/faq");
};

export const createFAQAPI = async (payload) => {
  return apiConnector("POST", "/api/v1/admin/cms/add-faq", payload);
};

export const updateFAQAPI = async ({ id, payload }) => {
  return apiConnector("PATCH", `/api/v1/admin/cms/update-faq/${id}`, payload);
};

export const deleteFAQAPI = async (id) => {
  return apiConnector("DELETE", `/api/v1/admin/cms/delete-faq/${id}`, {});
};
