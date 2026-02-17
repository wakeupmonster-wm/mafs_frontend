import { SUBSCRIPTIONSENDPOINTS } from "@/services/api-enpoints/subscriptions.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/*================= SUBSCRIPTION ANALYTICS & USER OPERATIONS =====================*/

/*================= GET STATS API OPERATION =====================*/
export const getALLStatsAPI = async () => {
  const url = SUBSCRIPTIONSENDPOINTS.GET_STATS;
  return apiConnector("GET", url);
};

/*================= GET SUBSCRIPTION LIST API OPERATION =====================*/
export const getSubscriptionListAPI = async (
  page,
  limit,
  search,
  status,
  plan,
  platform,
  sortBy,
  sortOrder
) => {
  // Construct the params object carefully
  const queryParams = {
    page,
    limit,
    ...(search && { search }),
    ...(status && { status }),
    ...(plan && { plan }),
    ...(platform && { platform }),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
  };
  try {
    const response = await apiConnector(
      "GET",
      SUBSCRIPTIONSENDPOINTS.GET_SUBSCRIPTION_LIST,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    console.error("Error fetching subscription list:", error);
    throw error;
  }
};

/*================= GET SINGLE USER DETAILS API OPERATION =====================*/
export const getSingleUserDetailsAPI = async (userId) => {
  const url = SUBSCRIPTIONSENDPOINTS.GET_SINGEL_USERDETAILS(userId);
  return apiConnector("GET", url, {});
};

/*================= GET REVENUE ANALYTICS API OPERATION =====================*/
export const getRevenueAnalyticsAPI = async (
  period = "month",
  startDate,
  endDate
) => {
  const queryParams = {
    period,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  try {
    const response = await apiConnector(
      "GET",
      SUBSCRIPTIONSENDPOINTS.GET_REVENUE_ANALYTICS_API,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    throw error;
  }
};

/*================= GET CANCELLATION ANALYTICS API OPERATION =====================*/
export const getCancellationAnalyticsAPI = async (period) => {
  const queryParams = { period };
  try {
    const response = await apiConnector(
      "GET",
      SUBSCRIPTIONSENDPOINTS.GET_CANCEllATION_ANALYTICS_API,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    console.error("Error fetching cancellation:", error);
    throw error;
  }
};

/*================= GET RISK USERS API OPERATION =====================*/
export const getRiskUsersAPI = async (params = {}) => {
  return apiConnector(
    "GET",
    SUBSCRIPTIONSENDPOINTS.GET_RISK_USERS,
    null,
    {},
    params
  );
};

/*================= GET WEB-HOOK EVENTS API OPERATION =====================*/
export const getWebhookEventsAPI = async (
  page,
  limit,
  platform,
  eventType,
  processed
) => {
  const queryParams = {
    page,
    limit,
    ...(platform && { platform }),
    ...(eventType && { eventType }),
    ...(processed && { processed }),
  };

  try {
    const response = await apiConnector(
      "GET",
      SUBSCRIPTIONSENDPOINTS.GET_WEBHOOK_EVENTS,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    console.error("Error fetching webhook events:", error);
    throw error;
  }
};

/*================= GET ALL TRANSACTIONS API OPERATION =====================*/
export const getAllTransactionsAPI = async (
  page,
  limit,
  eventType,
  platform,
  startDate,
  endDate
) => {
  const queryParams = {
    page,
    limit,
    ...(eventType && { eventType }),
    ...(platform && { platform }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  try {
    const response = await apiConnector(
      "GET",
      SUBSCRIPTIONSENDPOINTS.GET_ALL_TRANSACTIONS,
      null,
      {},
      queryParams
    );
    return response;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
