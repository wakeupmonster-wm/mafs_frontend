// src/app/routes/privateRoutes.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "@/constants/roles";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized) return null;

  // 1️⃣ Not logged in → login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 2️⃣ Logged in but USER → landing page
  if (user?.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

/*=====Summary of RBAC Behavior======
|  Feature       |   ADMIN Role     | USER Role |
|  Login Access   |  ✅ Full Access  |❌ Can login but gets no token
|  URL: /admin/*  |  ✅ Authorized  |❌ Hard Redirect to /
|  Sidebar      |   ✅ Visible      |❌ Hidden/Not Rendered
|  Landing Page |  ✅ Visible      |✅ Visible (Only view)
*/
