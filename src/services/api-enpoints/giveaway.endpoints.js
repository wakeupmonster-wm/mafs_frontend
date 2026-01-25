/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/*===================== GIVEAWAYS ENDPOINTS =====================*/
const GIVEAWAY_BASE = `${BASE_URL}/api/v1/admin/giveaway`;

export const GIVEAWAYS_ENDPOINTS = {
  // PRIZES
  PRIZES: `${GIVEAWAY_BASE}/prizes`,
  PRIZE_BY_ID: (id) => `${GIVEAWAY_BASE}/prizes/${id}`,

  // CAMPAIGNS
  CAMPAIGNS: `${GIVEAWAY_BASE}/campaigns`,
  CAMPAIGN_BULK: `${GIVEAWAY_BASE}/campaigns/bulk`,
  CAMPAIGN_BY_ID: (id) => `${GIVEAWAY_BASE}/campaigns/${id}`,
  CAMPAIGN_DISABLE: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/disable`,
  CAMPAIGN_PAUSE: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/pause`,
  CAMPAIGN_WINNER: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/winner`,
  CAMPAIGN_RESEND: (id) => `${GIVEAWAY_BASE}/campaigns/${id}/resend-prize`,

  // LOGISTICS / DELIVERY
  PENDING_DELIVERIES: `${GIVEAWAY_BASE}/pending-deliveries`,
  MARK_DELIVERED: `${GIVEAWAY_BASE}/mark-as-deliver`,
  DELIVERED_PRIZES: `${GIVEAWAY_BASE}/get-delivered-price`,
  CLAIMS: `${GIVEAWAY_BASE}/claims`,
  AUDIT: `${GIVEAWAY_BASE}/audit`,
};
