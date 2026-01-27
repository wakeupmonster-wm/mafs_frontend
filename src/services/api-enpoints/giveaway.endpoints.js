/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.matchatfirstswipe.com.au";

/*===================== GIVEAWAYS ENDPOINTS =====================*/
const GIVEAWAY_BASE = `${BASE_URL}/api/v1/admin/giveaway`;

export const GIVEAWAYS_ENDPOINTS = {
  // PRIZES
  GET_PRIZES: `${GIVEAWAY_BASE}/prizes`,
  ADD_PRIZES: `${GIVEAWAY_BASE}/prizes`,
  PATCH_PRIZE_BY_ID: (id) => `${GIVEAWAY_BASE}/prizes/${id}`,
  DELETE_PRIZE_BY_ID: (id) => `${GIVEAWAY_BASE}/prizes/${id}`,

  // CAMPAIGNS
  GET_CAMPAIGNS: `${GIVEAWAY_BASE}/campaigns`,
  ADD_CAMPAIGNS: `${GIVEAWAY_BASE}/campaigns`,
  PATCH_CAMPAIGN_BY_ID: (id) => `${GIVEAWAY_BASE}/campaigns/${id}`,
  DELETE_CAMPAIGN_BY_ID: (id) => `${GIVEAWAY_BASE}/campaigns/${id}`,

  // NOTE: Check this Campaign API.
  CAMPAIGN_BY_ID: (id) => `${GIVEAWAY_BASE}/campaigns/${id}`,

  CAMPAIGN_BULK: `${GIVEAWAY_BASE}/campaigns/bulk`,

  CAMPAIGN_DISABLE: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/disable`,
  CAMPAIGN_PAUSE: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/pause`,

  CAMPAIGN_WINNER: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/winner`,
  CAMPAIGN_RESEND: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/resend-prize`,

  // LOGISTICS / DELIVERY
  PENDING_DELIVERIES: `${GIVEAWAY_BASE}/deliveries/pending`,
  MARK_DELIVERED: `${GIVEAWAY_BASE}/mark-as-deliver`,
  DELIVERED_PRIZES: `${GIVEAWAY_BASE}/deliveries/completed`,
  CLAIMS: `${GIVEAWAY_BASE}/claims`,
  AUDIT: `${GIVEAWAY_BASE}/audit`,
};