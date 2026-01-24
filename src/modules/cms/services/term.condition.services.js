import { apiConnector } from "@/services/axios/axios.connector";

// GET the single Terms And Condition API
export const getTermsAndConditionAPI = async () => {
  return apiConnector("GET", "/api/v1/content/terms-conditions");
};

// UPDATE the Terms And Condition API
export const updateTermsAndConditionAPI = async (payload) => {
  return apiConnector("POST", "/api/v1/admin/cms/terms-conditions", payload);
};
