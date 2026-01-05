// src/services/errorHandler.js
export const handleApiError = (error) => {
  if (!error.response) {
    return {
      message: "Network error. Please check your connection.",
      status: 0,
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 401:
      localStorage.removeItem("admin_access_token");
      window.location.href = "/admin/login";
      return {
        message: "Session expired. Please login again.",
        status,
      };

    case 403:
      return {
        message: "You do not have permission to perform this action.",
        status,
      };

    case 404:
      return {
        message: "Requested resource not found.",
        status,
      };

    case 422:
      return {
        message: data?.message || "Validation error",
        errors: data?.errors || [],
        status,
      };

    case 500:
      return {
        message: "Internal server error. Try again later.",
        status,
      };

    default:
      return {
        message: data?.message || "Something went wrong",
        status,
      };
  }
};
