import { SOCIAL_ENDPOINTS } from "@/services/api-enpoints/settings.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const getSocialMediaApi = () => {
  return apiConnector("GET", SOCIAL_ENDPOINTS.GET_SOCIAL_MEDIA);
};

export const updateSocialMediaApi = (payload) => {
  return apiConnector("POST", SOCIAL_ENDPOINTS.UPDATE_SOCIAL_MEDIA, payload);
};
