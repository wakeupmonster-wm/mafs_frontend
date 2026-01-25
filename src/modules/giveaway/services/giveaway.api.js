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
  return apiConnector("DELETE", GIVEAWAYS_ENDPOINTS.DELETE_PRIZE_BY_ID(id));
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

// export const updateCampaignApi = (id, data) => {
// return apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.PATCH_CAMPAIGN_BY_ID(id), data);
// }

export const deleteCampaignApi = (id) => {
  return apiConnector("DELETE", GIVEAWAYS_ENDPOINTS.DELETE_CAMPAIGN_BY_ID(id));
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
