/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*===================== ADMIN ENDPOINTS =====================*/
export const CHAT_ENDPOINTS = {
  REPORTED_CHATS: `${BASE_URL}/api/v1/admin/chat-management/reported`,

  CHAT_MESSAGES: (matchId) =>
    `${BASE_URL}/api/v1/admin/chat-management/${matchId}/messages`,

  CHAT_ACTION: (matchId) =>
    `${BASE_URL}/api/v1/admin/chat-management/${matchId}/action`,

  CHAT_HISTORY: (matchId) =>
    `${BASE_URL}/api/v1/admin/chat-management/${matchId}/history`,
};
