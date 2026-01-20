export const getCampaignStatus = (c) => {
  if (c.isActive) return "ACTIVE";
  if (c.failureReason?.toLowerCase().includes("pause"))
    return "PAUSED";
  return "DISABLED";
};
