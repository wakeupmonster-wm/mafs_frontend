import { apiConnector } from "@/services/axios/axios.connector";
import { GENERAL_ENDPOINTS } from "@/services/api-endpoints/settings.endpoints";

export const getGeneralSettingApi = () => {
  return apiConnector("GET", GENERAL_ENDPOINTS.GET_GENERAL_SETTING);
};

export const updateGeneralSettingApi = (payload) => {
  return apiConnector(
    "POST",
    GENERAL_ENDPOINTS.UPDATE_GENERAL_SETTING,
    payload,
  );
};
