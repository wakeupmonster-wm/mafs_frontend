/*===================== BASE URL =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.matchatfirstswipe.com.au";

/*===================== SUPPORT ENDPOINTS =====================*/
export const SUPPORT_ENDPOINTS = {
  // User Side
  CREATE_TICKET: `${BASE_URL}/api/v1/contact`,
  MY_TICKETS: `http://localhost:3001/api/v1/contact/alltickets`,

  // Shared/Admin Side
  TICKET_DETAILS: (id) => `http://localhost:3001/api/v1/contact/ticket/${id}`,
  ADMIN_REPLY: `http://localhost:3001/api/v1/contact/adminreply`,

  // Highly Recommended for Admin Panel:
  GET_ALL_TICKETS: `http://localhost:3001/api/v1/admin/support/alltickets`,
};