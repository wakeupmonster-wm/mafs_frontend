import { GIVEAWAYS_ENDPOINTS } from "@/services/api-enpoints/giveaway.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/* ===== PRIZE MANAGEMENT ===== */
export const createPrizeApi = (data) =>
  apiConnector("POST", GIVEAWAYS_ENDPOINTS.PRIZES, data);

export const getAllPrizesApi = () =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.PRIZES);

export const updatePrizeApi = (id, data) =>
  apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.PRIZE_BY_ID(id), data);

export const deletePrizeApi = (id) =>
  apiConnector("DELETE", GIVEAWAYS_ENDPOINTS.PRIZE_BY_ID(id));

/* ===== CAMPAIGN MANAGEMENT ===== */
export const createCampaignApi = (data) =>
  apiConnector("POST", GIVEAWAYS_ENDPOINTS.CAMPAIGNS, data);

export const bulkCreateCampaignApi = (payload) =>
  apiConnector("POST", GIVEAWAYS_ENDPOINTS.CAMPAIGN_BULK, payload);

export const getAllCampaignsApi = () =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.CAMPAIGNS);

export const updateCampaignApi = (id, data) =>
  apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.CAMPAIGN_BY_ID(id), data);

export const activateCampaignApi = (id) =>
  apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.CAMPAIGN_BY_ID(id), {
    isActive: true,
    failureReason: null,
  });

export const disableCampaignApi = (id) =>
  apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.CAMPAIGN_DISABLE(id), {});

export const pauseCampaignApi = (id) =>
  apiConnector("PATCH", GIVEAWAYS_ENDPOINTS.CAMPAIGN_PAUSE(id), {});

export const deleteCampaignApi = (id) =>
  apiConnector("DELETE", GIVEAWAYS_ENDPOINTS.CAMPAIGN_BY_ID(id));

/* ===== WINNERS & LOGISTICS ===== */
export const getWinnerApi = (campaignId) =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.CAMPAIGN_WINNER(campaignId));

export const resendPrizeApi = (id) =>
  apiConnector("POST", GIVEAWAYS_ENDPOINTS.CAMPAIGN_RESEND(id));

export const getPendingDeliveriesApi = () =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.PENDING_DELIVERIES);

export const markAsDeliveredApi = (winHistoryId) =>
  apiConnector("POST", GIVEAWAYS_ENDPOINTS.MARK_DELIVERED, { winHistoryId });

export const getDeliveredPrizesApi = () =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.DELIVERED_PRIZES);

export const getAllClaimsApi = () =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.CLAIMS);

export const getAuditReportApi = (params) =>
  apiConnector("GET", GIVEAWAYS_ENDPOINTS.AUDIT, null, {}, params);
