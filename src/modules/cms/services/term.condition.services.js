import { CMS_ENDPOINTS } from "@/services/api-enpoints/cms.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

// GET the single Terms And Condition API
export const getTermsAndConditionAPI = async () => {
  return apiConnector("GET", CMS_ENDPOINTS.TERMSCON_ENDPOINTS.GET_TERMS_CON);
};

// UPDATE the Terms And Condition API
export const updateTermsAndConditionAPI = async (payload) => {
  return apiConnector(
    "POST",
    CMS_ENDPOINTS.TERMSCON_ENDPOINTS.UPDATE_TERMS_CON,
    payload
  );
};
