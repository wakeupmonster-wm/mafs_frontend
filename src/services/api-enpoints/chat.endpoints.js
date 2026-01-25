/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/*===================== ADMIN ENDPOINTS =====================*/
export const CHAT_ENDPOINTS = {
  REPORTED_CHATS: `${BASE_URL}/api/v1/admin/chat/reported`,

  CHAT_MESSAGES: (matchId) =>
    `${BASE_URL}/api/v1/admin/chat/${matchId}/messages`,

  CHAT_ACTION: (matchId) => `${BASE_URL}/api/v1/admin/chat/${matchId}/action`,

  CHAT_HISTORY: (matchId) => `${BASE_URL}/api/v1/admin/chat/${matchId}/history`,
};
