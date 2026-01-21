/*===================== NOTE: MAKE SURE TO ASSIGN BASE_URL IN .ENV FILE =====================*/
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/*===================== USER ENDPOINTS=====================*/
export const USERENDPOINTS = {
  GETALLUSERDETAILS: BASE_URL + "/api/v1/admin/user-management/user-list",
  GETALLPENDINGVERIFICATIONS:
    BASE_URL + "/api/v1/admintest/pending-verifications",
  GETEXPORTALLUSER: BASE_URL + "/api/v1/admin/user-management/export/stream",
};
