import { ROLES } from "./roles";
import { PERMISSIONS } from "./permissions";

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.MANAGE_USERS],
  [ROLES.USER]: [], // 🚫 USER HAS NO ADMIN PERMISSIONS
};
