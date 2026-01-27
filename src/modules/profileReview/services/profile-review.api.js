import { PROFILE_ENDPOINTS } from "@/services/api-enpoints/profiles.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const getReportedProfilesApi = () => {
  return apiConnector("GET", PROFILE_ENDPOINTS.PROFILE.REPORTED);
};

export const getProfileForReviewApi = (userId) => {
  return apiConnector("GET", PROFILE_ENDPOINTS.PROFILE.DETAILS(userId));
};

// Update profile status: approve | reject | ban
export const updateProfileStatusApi = (userId, payload) => {
  return apiConnector(
    "PUT",
    PROFILE_ENDPOINTS.PROFILE.UPDATE_STATUS(userId),
    payload
  );
};
