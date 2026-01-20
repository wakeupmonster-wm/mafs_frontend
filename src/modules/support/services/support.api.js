import { apiConnector } from "@/services/axios/axios.connector";

// Contact Support - create ticket
export const contactSupportApi = (payload) =>
  apiConnector("POST", "/api/v1/contact", payload);

// Get current user's tickets
export const getMyTicketsApi = () =>
  apiConnector("GET", "/api/v1/contact/my-tickets");

// Get ticket details by id
export const getMyTicketByIdApi = (ticketId) =>
  apiConnector("GET", `/api/v1/contact/ticket/${ticketId}`);

// Admin reply to ticket
export const replyToTicketApi = (payload) =>
  apiConnector("POST", "/api/v1/contact/adminreply", payload);
