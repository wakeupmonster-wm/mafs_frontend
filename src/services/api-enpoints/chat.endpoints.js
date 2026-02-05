/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.matchatfirstswipe.com.au";

/*===================== ADMIN ENDPOINTS =====================*/
export const CHAT_ENDPOINTS = {
  REPORTED_CHATS: `${BASE_URL}/api/v1/admin/chat-management/reported`,

  CHAT_MESSAGES: (matchId) =>
    `${BASE_URL}/api/v1/admin/chat-management/${matchId}/messages`,

  CHAT_ACTION: (matchId) => `${BASE_URL}/api/v1/admin/chat-management/${matchId}/action`,

  CHAT_HISTORY: (matchId) => `${BASE_URL}/api/v1/admin/chat-management/${matchId}/history`,
};