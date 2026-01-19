import { apiConnector } from "@/services/axios/axios.connector";

export const createPrizeApi = (data) =>
  apiConnector("POST", "/api/v1/admin/giveaway/prizes", data);

export const getAllPrizesApi = () =>
  apiConnector("GET", "/api/v1/admin/giveaway/prizes");

export const updatePrizeApi = (id, data) =>
  apiConnector("PATCH", `api/v1/admin/giveaway/prizes/${id}`, data);

export const createCampaignApi = (data) =>
  apiConnector("POST", "api/v1/admin/giveaway/campaigns", data);

export const getAllCampaignsApi = () =>
  apiConnector("GET", "api/v1/admin/giveaway/campaigns");

export const updateCampaignApi = (id, data) =>
  apiConnector("PATCH", `api/v1/admin/giveaway/campaigns/${id}`, data);

export const disableCampaignApi = (id) =>
  apiConnector("PATCH", `api/v1/admin/giveaway/campaigns/${id}/disable`,{});

export const pauseCampaignApi = (campaignId) =>
  apiConnector("PATCH", `api/v1/admin/giveaway/campaigns/${campaignId}/pause`,{});

export const getWinnerApi = (id) =>
  apiConnector("GET", `api/v1/admin/giveaway/campaigns/${id}/winner`);

export const resendPrizeApi = (id) =>
  apiConnector("POST", `api/v1/admin/giveaway/campaigns/${id}/resend-prize`);

/* ========= DELIVERY / CLAIMS ========= */
export const getPendingDeliveriesApi = () =>
  apiConnector("GET", "api/v1/admin/giveaway/pending-deliveries");

export const markAsDeliveredApi = (winHistoryId) =>
  apiConnector("POST", "api/v1/admin/giveaway/mark-as-deliver", { winHistoryId });

export const getDeliveredPrizesApi = () =>
  apiConnector("GET", "api/v1/admin/giveaway/get-delivered-price");

export const getAllClaimsApi = () =>
  apiConnector("GET", "api/v1/admin/giveaway/claims");

/* ========= AUDIT ========= */
export const getAuditReportApi = (params) =>
  apiConnector("GET", "api/v1/admin/giveaway/audit", null, {}, params);

/* ========= BULK ========= */
export const bulkCreateCampaignApi = (data) =>
  apiConnector("POST", "api/v1/admin/giveaway/campaigns/bulk", data);


export const activateCampaignApi = (id) =>
  apiConnector(
    "PATCH",
    `api/v1/admin/giveaway/campaigns/${id}`,
    { isActive: true, failureReason: null }
  );

export const deleteCampaignApi = (id) =>
  apiConnector(
    "DELETE",
    `api/v1/admin/giveaway/campaigns/${id}`,{}
  );

/* ===== PRIZE DELETE ===== */
export const deletePrizeApi = (id) =>
  apiConnector(
    "DELETE",
    `api/v1/admin/giveaway/prizes/${id}`,{}
  );