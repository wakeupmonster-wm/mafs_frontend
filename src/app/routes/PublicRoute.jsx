import { useSelector } from "react-redux";
import { ROLES } from "@/constants/roles";
import { useNavigate } from "react-router";

export default function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  // ADMIN already logged in → dashboard
  if (isAuthenticated && user?.role === ROLES.ADMIN) {
    return navigate("/admin/dashboard");
  }

  // USER logged in → landing page only
  if (isAuthenticated && user?.role === ROLES.USER) {
    return navigate("/");
  }

  return children;
}
