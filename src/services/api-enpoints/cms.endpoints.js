/*===================== NOTE: MAKE SURE TO ASSIGN BASE_URL IN .ENV FILE =====================*/
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*=====================CMS ENDPOINTS=====================*/
export const CMS_ENDPOINTS = {
  FAQ_ENDPOINTS: {
    GET_ALL: "/api/v1/content/faq",
    CREATE: "/api/v1/admin/cms/faq",
    UPDATE: (id) => `/api/v1/admin/cms/faq/${id}`,
    DELETE: (id) => `/api/v1/admin/cms/faq/${id}`,
  },
  PRIVACY_ENDPOINTS: {
    GET_PRIVACYPOLICY: "/api/v1/content/privacy-policy",
    UPDATE_PRIVACYPOLICY: "/api/v1/admin/cms/privacy-policy",
  },
  TERMSCON_ENDPOINTS: {
    GET_TERMS_CON: "/api/v1/content/terms-conditions",
    UPDATE_TERMS_CON: "/api/v1/admin/cms/terms-conditions",
  },
};
