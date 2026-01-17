/*===================== NOTE: MAKE SURE TO ASSIGN BASE_URL IN .ENV FILE =====================*/
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*===================== USER ENDPOINTS=====================*/
export const USERENDPOINTS = {
  GETALLUSERDETAILS: BASE_URL + "/api/v1/admin/user-management/user-list",
};
