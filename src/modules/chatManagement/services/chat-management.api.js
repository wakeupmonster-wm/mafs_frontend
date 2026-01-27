import { CHAT_ENDPOINTS } from "@/services/api-enpoints/chat.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/** Fetch all reported chats currently in the moderation queue */
export const getReportedChatsApi = () => {
  return apiConnector("GET", CHAT_ENDPOINTS.REPORTED_CHATS);
};

/** Fetch messages of a specific match for review. Pagination is added via query params. */
export const getChatMessagesForReviewApi = (
  matchId,
  params = { limit: 50, page: 1 }
) => {
  return apiConnector(
    "GET",
    CHAT_ENDPOINTS.CHAT_MESSAGES(matchId),
    null,
    params
  );
};

/** Take administrative action on a chat (e.g., delete message, warn user, close chat) */
export const takeChatActionApi = (matchId, payload) => {
  return apiConnector("POST", CHAT_ENDPOINTS.CHAT_ACTION(matchId), payload);
};

/** Retrieve the audit trail of actions taken on this specific match */
export const getChatActionHistoryApi = (matchId) => {
  return apiConnector("GET", CHAT_ENDPOINTS.CHAT_HISTORY(matchId));
};
