// src/app/routes/PrivateRoute.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { ADMIN_ROLES } from "./routeConfig";

/**
 * PrivateRoute (declarative guard)
 *
 * Usage:
 * <Route path="/admin" element={<PrivateRoute allowedRoles={[ADMIN_ROLES.SUPER_ADMIN]}><AdminLayout /></PrivateRoute>} />
 *
 * It supports role-checking. If not authenticated -> redirect to /login.
 * If authenticated but lacks required role -> render a simple unauthorized UI or redirect.
 */

const getToken = () => localStorage.getItem("admin_access_token");

// If you keep user info in localStorage, parse it here; otherwise, validate token on backend.
const getUser = () => {
  const raw = localStorage.getItem("admin_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const token = getToken();
  const user = getUser();
  const location = useLocation();

  // Optional: you can add a client-side quick redirect for expired tokens.
  useEffect(() => {
    // Example: we could check token expiry here and optionally logout.
  }, [token]);

  if (!token) {
    // Not logged in => send to login with redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0) {
    // If user info is not present, deny (you might want to fetch it instead)
    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      // Option A: redirect to unauthorized page
      return <Navigate to="/" replace />; // or a dedicated /unauthorized
    }
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
