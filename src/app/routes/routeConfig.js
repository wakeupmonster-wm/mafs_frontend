// src/app/routes/routeConfig.js
export const PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  DASHBOARD: "/admin/dashboard",
  USERS: "/admin/users",
  CONTENT: "/admin/content",
  NOT_FOUND: "/404",
};

export const ADMIN_ROLES = {
  ADMIN: "ADMIN",
  //   SUPER_ADMIN: "super_admin",
  //   SUPPORT: "support",
};

// Helper to build dynamic paths
export const userDetailsPath = (id) => `/admin/users/${id}`;
