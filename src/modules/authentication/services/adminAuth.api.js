// src/services/adminAuth.api.js
import { apiConnector } from "@/services/axios/axios.connector";
import { AUTHENDPOINTS } from "@/services/api-enpoints/auth.endpoints";

/*================= ADMIN LOGIN API OPERATION =====================*/
export const adminLoginAPI = (data) => {
  return apiConnector("POST", AUTHENDPOINTS.LOGIN_API, data);
};

/*================= ADMIN REQUEST OTP API OPERATION =====================*/
export const adminRequestOTPAPI = (data) => {
  return apiConnector("POST", AUTHENDPOINTS.REQUEST_OTP_API, data);
};

/*================= ADMIN VERIFY OTP API OPERATION =====================*/
export const adminVerifyOTPAPI = (data) => {
  return apiConnector("POST", AUTHENDPOINTS.VERIFY_OTP_API, data);
};

/*================= ADMIN FORGET PASSWORD API OPERATION =====================*/
export const adminForgotPasswordAPI = (data) => {
  return apiConnector("PATCH", AUTHENDPOINTS.FORGETPASSWORD_API, data);
};

/*================= ADMIN RESET PASSWORD API OPERATION =====================*/
export const adminResetPasswordAPI = (data) => {
  return apiConnector("POST", AUTHENDPOINTS.RESETPASSWORD_API, data);
};
