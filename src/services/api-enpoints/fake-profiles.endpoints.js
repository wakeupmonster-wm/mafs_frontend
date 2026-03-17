import { BASE_URL } from "./base.url";

export const FAKE_PROFILE_ENDPOINTS = {
  LIST_ALL: `${BASE_URL}/api/v1/admin/fake-profiles`,
  BULK_CREATE: `${BASE_URL}/api/v1/admin/fake-profiles/bulk-create`,
  TOGGLE_STATUS: (id) => `${BASE_URL}/api/v1/admin/fake-profiles/${id}/toggle`,
  DELETE_SINGLE: (id) => `${BASE_URL}/api/v1/admin/fake-profiles/${id}`,
};
