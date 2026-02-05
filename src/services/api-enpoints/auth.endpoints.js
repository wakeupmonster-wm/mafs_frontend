/*===================== NOTE: MAKE SURE TO ASSIGN BASE_URL IN .ENV FILE =====================*/
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*=====================AUTH ENDPOINTS=====================*/
export const AUTHENDPOINTS = {
  LOGIN_API: "http://localhost:3001/api/v1/admin/auth/login",
  REQUEST_OTP_API: BASE_URL + "/api/v1/admin/auth/request-otp",
  VERIFY_OTP_API: BASE_URL + "/api/v1/admin/auth/verify-otp",
  FORGETPASSWORD_API: BASE_URL + "/api/v1/admin/auth/forgot-password",
  RESETPASSWORD_API: BASE_URL + "/api/v1/admin/auth/reset-password",
};
