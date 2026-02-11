import { GIVEAWAYS_ENDPOINTS } from "@/services/api-enpoints/giveaway.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/* ===== PRIZE MANAGEMENT ===== */
export const createPrizeApi = (data) => {
  return apiConnector("POST", GIVEAWAYS_ENDPOINTS.ADD_PRIZES, data);
};

export const getAllPrizesApi = () => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.GET_PRIZES);
};

export const updatePrizeApi = (id, data) => {
  return apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.PATCH_PRIZE_BY_ID(id), data);
};

export const deletePrizeApi = (id) => {
  return apiConnector("DELETE", GIVEAWAYS_ENDPOINTS.DELETE_PRIZE_BY_ID(id),{});
};

/* ===== CAMPAIGN MANAGEMENT ===== */
export const getAllCampaignsApi = () => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.ADD_CAMPAIGNS);
};

export const createCampaignApi = (data) => {
  return apiConnector("POST", GIVEAWAYS_ENDPOINTS.GET_CAMPAIGNS, data);
};

export const bulkCreateCampaignApi = (payload) => {
  return apiConnector("POST", GIVEAWAYS_ENDPOINTS.CAMPAIGN_BULK, payload);
};

export const updateCampaignApi = (id, data) => {
return apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.PATCH_CAMPAIGN_BY_ID(id), data);
}

export const deleteCampaignApi = (id) => {
  return apiConnector("DELETE", GIVEAWAYS_ENDPOINTS.DELETE_CAMPAIGN_BY_ID(id),{});
};

export const activateCampaignApi = (id) => {
  return apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.PATCH_CAMPAIGN_BY_ID(id), {
    isActive: true,
    failureReason: null,
  });
};

export const disableCampaignApi = (id) => {
  return apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.CAMPAIGN_DISABLE(id), {});
};

export const pauseCampaignApi = (id) => {
  return apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.CAMPAIGN_PAUSE(id), {});
};

/* ===== WINNERS & LOGISTICS ===== */
export const getWinnerApi = (campaignId) => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.CAMPAIGN_WINNER(campaignId));
};

// export const getAllWinnersApi = () =>{
//   // api.get(`/giveaway/campaigns/winners`);
// return apiConnector("GET",`http://localhost:3001/api/v1/admin/giveaway/campaigns/winners`)
// }

// services/giveaway.api.js

export const getAllWinnersApi = (params = {}) => {
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page);
  if (params.limit) query.append("limit", params.limit);
  if (params.search) query.append("search", params.search);
  if (params.status) query.append("status", params.status);
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.order) query.append("order", params.order);

  const queryString = query.toString();
  const url = `${`http://localhost:3001/api/v1/admin/giveaway/campaigns/winners`}${queryString ? `?${queryString}` : ""}`;

  return apiConnector("GET", url);
};

export const resendPrizeApi = (id) => {
  return apiConnector("POST", GIVEAWAYS_ENDPOINTS.CAMPAIGN_RESEND(id));
};

export const getPendingDeliveriesApi = () => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.PENDING_DELIVERIES);
};

export const markAsDeliveredApi = (winHistoryId) => {
  return apiConnector("POST", GIVEAWAYS_ENDPOINTS.MARK_DELIVERED, {
    winHistoryId,
  });
};

export const getDeliveredPrizesApi = () => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.DELIVERED_PRIZES);
};

export const getAllClaimsApi = () => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.CLAIMS);
};

export const getAuditReportApi = (params) => {
  return apiConnector("GET", GIVEAWAYS_ENDPOINTS.AUDIT, null, {}, params);
};