/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*=====================AUTH ENDPOINTS=====================*/
export const AUTHENDPOINTS = {
  LOGIN_API: `${BASE_URL}/api/v1/admin/auth/login`,
  REQUEST_OTP_API: `${BASE_URL}/api/v1/admin/auth/request-otp`,
  VERIFY_OTP_API: `${BASE_URL}/api/v1/admin/auth/verify-otp`,
  FORGETPASSWORD_API: `${BASE_URL}/api/v1/admin/auth/forgot-password`,
  RESETPASSWORD_API: `${BASE_URL}/api/v1/admin/auth/reset-password`,
};
