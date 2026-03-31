/* ───── Event Type Config ───── */
export const EVENT_TYPE_MAP = {
  PURCHASE: {
    label: "Purchase",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  RENEW: {
    label: "Renewal",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  REFUND: { label: "Refund", color: "bg-red-50 text-red-700 border-red-200" },
  CANCEL: {
    label: "Cancel",
    color: "bg-slate-100 text-slate-600 border-slate-200",
  },
  CONSUMABLE_PURCHASE: {
    label: "Consumable",
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
  ADMIN_GRANT: {
    label: "Admin Grant",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  GIVEAWAY: {
    label: "Giveaway",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
};

export const PLATFORM_MAP = {
  ios: "iOS",
  android: "Android",
  admin_granted: "Admin",
};

export const STATUS_MAP = {
  PENDING: "bg-amber-50 text-amber-600 border-amber-200",
  SUCCESS: "bg-emerald-50 text-emerald-600 border-emerald-200",
  FAILED: "bg-rose-50 text-rose-600 border-rose-200",
  REFUNDED: "bg-slate-100 text-slate-600 border-slate-200",
};
