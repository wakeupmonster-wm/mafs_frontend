import { DASHBOARD_ENDPOINTS } from "@/services/api-enpoints/dashboard.enpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const dashboardKPIAPI = () => {
  const url = DASHBOARD_ENDPOINTS.DASHBOARD_KPI;
  return apiConnector("GET", url);
};
