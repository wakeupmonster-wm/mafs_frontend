/*===================== NOTE: MAKE SURE TO HAVE TO IMPORT BASE_URL FROM "base.url.js" FILE =====================*/
import { BASE_URL } from "./base.url";

/*=====================CMS ENDPOINTS=====================*/
export const CMS_ENDPOINTS = {
  FAQ_ENDPOINTS: {
    GET_ALL: `${BASE_URL}/api/v1/content/faq`,
    CREATE: `${BASE_URL}/api/v1/admin/cms/faq`,
    UPDATE: (id) => `${BASE_URL}/api/v1/admin/cms/faq/${id}`,
    DELETE: (id) => `${BASE_URL}/api/v1/admin/cms/faq/${id}`,
  },
  PRIVACY_ENDPOINTS: {
    GET_PRIVACYPOLICY: `${BASE_URL}/api/v1/content/privacy-policy`,
    UPDATE_PRIVACYPOLICY: `${BASE_URL}/api/v1/admin/cms/privacy-policy`,
  },
  TERMSCON_ENDPOINTS: {
    GET_TERMS_CON: `${BASE_URL}/api/v1/content/terms-conditions`,
    UPDATE_TERMS_CON: `${BASE_URL}/api/v1/admin/cms/terms-conditions`,
  },
};
