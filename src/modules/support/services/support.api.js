import { SUPPORT_ENDPOINTS } from "@/services/api-enpoints/support.endpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/**
 * Creates a new support ticket (User-facing)
 */
export const contactSupportApi = (payload) => {
  return apiConnector("POST", SUPPORT_ENDPOINTS.CREATE_TICKET, payload);
};

/**
 * Retrieves tickets belonging to the authenticated user
 */
export const getMyTicketsApi = () => {
  return apiConnector("GET", SUPPORT_ENDPOINTS.MY_TICKETS);
};

/**
 * Fetches full details and conversation history of a specific ticket
 */
export const getMyTicketByIdApi = (ticketId) => {
  return apiConnector("GET", SUPPORT_ENDPOINTS.TICKET_DETAILS(ticketId));
};

/**
 * Admin action to respond to a user ticket
 */
export const replyToTicketApi = (payload) => {
  return apiConnector("POST", SUPPORT_ENDPOINTS.ADMIN_REPLY, payload);
};

/**
 * Admin action to fetch the global support queue
 */
export const getAllTicketsApi = (params) => {
  return apiConnector("GET", SUPPORT_ENDPOINTS.GET_ALL_TICKETS, null, params);
};
