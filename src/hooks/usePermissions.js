import { useSelector } from "react-redux";
import { ROLE_PERMISSIONS } from "@/constants/rolePermissions";

export const usePermissions = () => {
  const role = useSelector((s) => s.auth.user?.role);

  const can = (permission) => {
    if (!role) return false;
    return ROLE_PERMISSIONS[role]?.includes(permission);
  };

  return { can };
};
