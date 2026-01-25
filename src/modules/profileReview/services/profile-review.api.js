import { apiConnector } from "@/services/axios/axios.connector";

export const getReportedProfilesApi = () =>
  apiConnector("GET", `api/v1/admin/profile-review/reported`);

export const getProfileForReviewApi = (userId) =>
  apiConnector("GET", `api/v1/admin/profile-review/${userId}`);

// Update profile status: approve | reject | ban
export const updateProfileStatusApi = (userId, payload) =>
  apiConnector("PUT", `api/v1/admin/profile-review/${userId}/status`, payload);