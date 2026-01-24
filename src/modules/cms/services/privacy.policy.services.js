import { apiConnector } from "@/services/axios/axios.connector";

// GET the single Privacy Policy document
export const getPrivacyPolicyAPI = async () => {
  return apiConnector("GET", "/api/v1/content/privacy-policy");
};

// UPDATE the Privacy Policy
export const updatePrivacyPolicyAPI = async (payload) => {
  return apiConnector("POST", "/api/v1/admin/cms/privacy-policy", payload);
};
