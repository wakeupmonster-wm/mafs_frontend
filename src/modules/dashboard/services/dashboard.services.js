import { DASHBOARD_ENDPOINTS } from "@/services/api-enpoints/dashboard.enpoints";
import { apiConnector } from "@/services/axios/axios.connector";

/* ===== PRIZE MANAGEMENT ===== */
export const dashboardKPIAPI = () => {
  return apiConnector("GET", DASHBOARD_ENDPOINTS.DASHBOARD_KPI);
};
