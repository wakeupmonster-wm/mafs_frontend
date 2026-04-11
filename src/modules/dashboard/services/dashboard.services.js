import { DASHBOARD_ENDPOINTS } from "@/services/api-endpoints/dashboard.enpoints";
import { apiConnector } from "@/services/axios/axios.connector";

export const dashboardKPIAPI = () => {
  const url = DASHBOARD_ENDPOINTS.DASHBOARD_KPI;
  return apiConnector("GET", url);
};

// 🔄 Uncomment when backend dashboard data API is ready
// export const dashboardDataAPI = (dateRange) => {
//   const url = DASHBOARD_ENDPOINTS.DASHBOARD_DATA;
//   const params = {};
//   if (dateRange?.from) params.from = dateRange.from;
//   if (dateRange?.to) params.to = dateRange.to;
//   return apiConnector("GET", url, null, null, params);
// };
