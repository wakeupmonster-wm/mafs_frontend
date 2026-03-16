/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*===================== SUBSCRIPTION ADMIN ENDPOINTS =====================*/
export const SUBSCRIPTION_ENDPOINTS = {
  /* --- Configuration --- */
  GET_CONFIG: `${BASE_URL}/api/v1/admin/subscription/config`,
  UPDATE_CONFIG: `${BASE_URL}/api/v1/admin/subscription/config`,

  /* --- Product Catalog --- */
  LIST_PRODUCTS: `${BASE_URL}/api/v1/admin/subscription/products`,
  CREATE_PRODUCT: `${BASE_URL}/api/v1/admin/subscription/products`,
  UPDATE_PRODUCT: (productKey) =>
    `${BASE_URL}/api/v1/admin/subscription/products/${productKey}`,

  /* --- Subscriber Management --- */
  LIST_SUBSCRIBERS: `${BASE_URL}/api/v1/admin/subscription/subscribers`,
  GET_USER_DETAIL: (userId) =>
    `${BASE_URL}/api/v1/admin/subscription/users/${userId}`,
  MANUAL_GRANT: (userId) =>
    `${BASE_URL}/api/v1/admin/subscription/users/${userId}/grant`,
  GRANT_CONSUMABLE: (userId) =>
    `${BASE_URL}/api/v1/admin/subscription/users/${userId}/grant-consumable`,
  REVOKE_SUBSCRIPTION: (userId) =>
    `${BASE_URL}/api/v1/admin/subscription/users/${userId}/revoke`,
  EXTEND_SUBSCRIPTION: (userId) =>
    `${BASE_URL}/api/v1/admin/subscription/users/${userId}/extend`,

  /* --- Dashboard / Analytics --- */
  GET_DASHBOARD: `${BASE_URL}/api/v1/admin/subscription/dashboard`,
  GET_STATS: `${BASE_URL}/api/v1/admin/subscription/stats`,

  /* --- Transactions --- */
  LIST_TRANSACTIONS: `${BASE_URL}/api/v1/admin/transactions`,
  TRANSACTION_SUMMARY: `${BASE_URL}/api/v1/admin/transactions/summary`,
  EXPORT_TRANSACTIONS_CSV: `${BASE_URL}/api/v1/admin/transactions/export`,
};
