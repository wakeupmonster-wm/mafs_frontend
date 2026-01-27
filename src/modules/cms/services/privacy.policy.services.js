import { CMS_ENDPOINTS } from "@/services/api-enpoints/cms.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

// GET the single Privacy Policy document
export const getPrivacyPolicyAPI = async () => {
  return apiConnector("GET", CMS_ENDPOINTS.PRIVACY_ENDPOINTS.GET_PRIVACYPOLICY);
};

// UPDATE the Privacy Policy
export const updatePrivacyPolicyAPI = async (payload) => {
  return apiConnector(
    "POST",
    CMS_ENDPOINTS.PRIVACY_ENDPOINTS.UPDATE_PRIVACYPOLICY,
    payload
  );
};
