/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*===================== SUPPORT ENDPOINTS =====================*/
export const SUPPORT_ENDPOINTS = {
  // User Side
  CREATE_TICKET: `${BASE_URL}/api/v1/contact`,
  MY_TICKETS: `${BASE_URL}/api/v1/contact/alltickets`,

  // Shared/Admin Side
  TICKET_DETAILS: (id) => `${BASE_URL}/api/v1/contact/ticket/${id}`,
  ADMIN_REPLY: `${BASE_URL}/api/v1/contact/adminreply`,

  // Highly Recommended for Admin Panel:
  GET_ALL_TICKETS: `${BASE_URL}/api/v1/admin/support/alltickets`,
};
