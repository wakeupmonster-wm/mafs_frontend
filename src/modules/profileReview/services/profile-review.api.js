import { PROFILE_ENDPOINTS } from "@/services/api-enpoints/profiles.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const getReportedProfilesApi = async (page, limit, search, status) => {
  // Construct the params object carefully
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status }),
  };
  try {
    const response = await apiConnector(
      "GET",
      PROFILE_ENDPOINTS.PROFILE.REPORTED,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    throw error;
  }
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
