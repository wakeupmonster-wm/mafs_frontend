import { USERENDPOINTS } from "@/services/api-enpoints/users-management.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const getAllPendingVerificationsApi = async (
  page,
  limit,
  search,
  status,
  sortBy
) => {
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status }),
    ...(sortBy && { sortBy }),
  };

  try {
    const response = await apiConnector(
      "GET",
      USERENDPOINTS.GET_PENDING_KYC,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyUserProfileApi = async (userId, payload) => {
  const url = USERENDPOINTS.VERIFY_USER_KYC(userId);
  return apiConnector("POST", url, payload);
};
