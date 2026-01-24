import { apiConnector } from "@/services/axios/axios.connector";

const BASE = "/api/v1/admin/chat-management";

// GET all reported chats (queue)
export const getReportedChatsApi = () =>
  apiConnector("GET", `${BASE}/reported`);

// GET messages of a chat (READ ONLY)
export const getChatMessagesForReviewApi = (matchId, { limit = 50 } = {}) =>
  apiConnector("GET", `${BASE}/${matchId}/messages`, null, {}, { limit });

// TAKE ACTION on chat/messages/users
export const takeChatActionApi = (matchId, payload) =>
  apiConnector("POST", `${BASE}/${matchId}/action`, payload);

// Audit history
export const getChatActionHistoryApi = (matchId) =>
  apiConnector("GET", `${BASE}/${matchId}/history`);