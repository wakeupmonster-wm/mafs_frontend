import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/admin/auth";

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access_Token")}` },
});

export const adminService = {
  getProfile: () => axios.get(`${API_URL}/profile`, getAuthHeader()),
  updateName: (fullName) =>
    axios.put(`${API_URL}/profile/update-name`, { fullName }, getAuthHeader()),
  sendEmailOtp: (email) =>
    axios.post(`${API_URL}/profile/send-email-otp`, { email }, getAuthHeader()),
  verifyEmailOtp: (otp) =>
    axios.post(`${API_URL}/profile/verify-email-otp`, { otp }, getAuthHeader()),
  resetPassword: (payload) =>
    axios.post(`${API_URL}/reset-password`, payload, getAuthHeader()),
  forgotPassword: (payload) =>
    axios.post(`${API_URL}/forgot-password`, payload),
};
