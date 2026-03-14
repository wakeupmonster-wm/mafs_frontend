import { SUBSCRIPTION_ENDPOINTS } from "@/services/api-enpoints/subscriptions.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/*================= CONFIGURATION =====================*/

export const getConfigAPI = async () => {
    return apiConnector("GET", SUBSCRIPTION_ENDPOINTS.GET_CONFIG);
};

export const updateConfigAPI = async (data) => {
    return apiConnector("PATCH", SUBSCRIPTION_ENDPOINTS.UPDATE_CONFIG, data);
};

/*================= PRODUCT CATALOG =====================*/

export const listProductsAPI = async (page, limit, type, isActive) => {
    const queryParams = {
        page,
        limit,
        ...(type && { type }),
        ...(isActive !== undefined && isActive !== "" && { isActive }),
    };
    try {
        const response = await apiConnector(
            "GET",
            SUBSCRIPTION_ENDPOINTS.LIST_PRODUCTS,
            null,
            {},
            queryParams
        );
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const createProductAPI = async (data) => {
    return apiConnector("POST", SUBSCRIPTION_ENDPOINTS.CREATE_PRODUCT, data);
};

export const updateProductAPI = async (productKey, data) => {
    const url = SUBSCRIPTION_ENDPOINTS.UPDATE_PRODUCT(productKey);
    return apiConnector("PATCH", url, data);
};

/*================= SUBSCRIBER MANAGEMENT =====================*/

export const listSubscribersAPI = async (
    page,
    limit,
    status,
    planType,
    platform,
    search
) => {
    const queryParams = {
        page,
        limit,
        ...(status && { status }),
        ...(planType && { planType }),
        ...(platform && { platform }),
        ...(search && { search }),
    };
    try {
        const response = await apiConnector(
            "GET",
            SUBSCRIPTION_ENDPOINTS.LIST_SUBSCRIBERS,
            null,
            {},
            queryParams
        );
        return response;
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        throw error;
    }
};

export const getUserDetailAPI = async (userId) => {
    const url = SUBSCRIPTION_ENDPOINTS.GET_USER_DETAIL(userId);
    return apiConnector("GET", url);
};

export const manualGrantAPI = async (userId, data) => {
    const url = SUBSCRIPTION_ENDPOINTS.MANUAL_GRANT(userId);
    return apiConnector("POST", url, data);
};

export const grantConsumableAPI = async (userId, data) => {
    const url = SUBSCRIPTION_ENDPOINTS.GRANT_CONSUMABLE(userId);
    return apiConnector("POST", url, data);
};

export const revokeSubscriptionAPI = async (userId) => {
    const url = SUBSCRIPTION_ENDPOINTS.REVOKE_SUBSCRIPTION(userId);
    return apiConnector("POST", url);
};

/*================= DASHBOARD / ANALYTICS =====================*/

export const getDashboardStatsAPI = async () => {
    return apiConnector("GET", SUBSCRIPTION_ENDPOINTS.GET_DASHBOARD);
};

export const getSubscriptionStatsAPI = async (params = {}) => {
    return apiConnector("GET", SUBSCRIPTION_ENDPOINTS.GET_STATS, null, {}, params);
};

/*================= TRANSACTIONS =====================*/

export const getTransactionsAPI = async (params = {}) => {
    const queryParams = {};
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.eventType) queryParams.eventType = params.eventType;
    if (params.platform) queryParams.platform = params.platform;
    if (params.productId) queryParams.productId = params.productId;
    if (params.status) queryParams.status = params.status;
    if (params.startDate) queryParams.startDate = params.startDate;
    if (params.endDate) queryParams.endDate = params.endDate;
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
    return apiConnector("GET", SUBSCRIPTION_ENDPOINTS.LIST_TRANSACTIONS, null, {}, queryParams);
};

export const getTransactionSummaryAPI = async (params = {}) => {
    const queryParams = {};
    if (params.startDate) queryParams.startDate = params.startDate;
    if (params.endDate) queryParams.endDate = params.endDate;
    return apiConnector("GET", SUBSCRIPTION_ENDPOINTS.TRANSACTION_SUMMARY, null, {}, queryParams);
};

export const exportTransactionsCSVAPI = async (params = {}) => {
    const queryParams = {};
    if (params.startDate) queryParams.startDate = params.startDate;
    if (params.endDate) queryParams.endDate = params.endDate;
    if (params.eventType) queryParams.eventType = params.eventType;
    if (params.platform) queryParams.platform = params.platform;
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${SUBSCRIPTION_ENDPOINTS.EXPORT_TRANSACTIONS_CSV}${queryString ? `?${queryString}` : ''}`;
    const token = localStorage.getItem("access_Token");
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Export failed");
    return response.blob();
};
