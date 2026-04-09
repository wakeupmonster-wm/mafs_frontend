import {
  differenceInDays,
  isToday,
  isYesterday,
  format,
  subDays,
} from "date-fns";

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Detect which preset the date range matches.
 * Returns: "today" | "yesterday" | "last7" | "last30" | "custom"
 */
function detectPreset(dateRange) {
  // If preset is explicitly provided, use it
  if (dateRange?.preset) return dateRange.preset;

  if (!dateRange?.from) return "last7"; // default

  const from = new Date(dateRange.from);
  const to = dateRange.to ? new Date(dateRange.to) : new Date();
  const days = differenceInDays(to, from);

  if (days === 0 && isToday(from)) return "today";
  if (days === 0 && isYesterday(from)) return "yesterday";
  if (days >= 2 && days <= 3 && isToday(to)) return "last3";
  if (days >= 6 && days <= 7 && isToday(to)) return "last7";
  if (days >= 29 && days <= 30 && isToday(to)) return "last30";
  return "custom";
}

/**
 * Returns a comparison context label based on date range preset.
 * e.g., "vs yesterday", "vs previous 7 days"
 */
function getContextLabel(preset) {
  switch (preset) {
    case "today":
      return "vs yesterday";
    case "yesterday":
      return "vs day before";
    case "last3":
      return "vs previous 3 days";
    case "last7":
      return "vs previous 7 days";
    case "last30":
      return "vs previous 30 days";
    case "custom":
    default:
      return "vs previous period";
  }
}

/**
 * Returns a human-readable period label.
 * e.g., "Today", "Last 7 Days", "Apr 01 – Apr 08, 2026"
 */
function getPeriodLabel(dateRange, preset) {
  switch (preset) {
    case "today":
      return "Today";
    case "yesterday":
      return "Yesterday";
    case "last3":
      return "Last 3 Days";
    case "last7":
      return "Last 7 Days";
    case "last30":
      return "Last 30 Days";
    case "custom":
    default: {
      const from = dateRange?.from
        ? new Date(dateRange.from)
        : subDays(new Date(), 7);
      const to = dateRange?.to ? new Date(dateRange.to) : new Date();
      return `${format(from, "MMM dd")} – ${format(to, "dd MMM, yyyy")}`;
    }
  }
}

/**
 * Returns a revenue period label for display.
 */
function getRevenuePeriodLabel(preset) {
  switch (preset) {
    case "today":
      return "Today's";
    case "yesterday":
      return "Yesterday's";
    case "last3":
      return "Last 3 days";
    case "last7":
      return "Last 7 days";
    case "last30":
      return "Last 30 days";
    case "custom":
    default:
      return "Selected period";
  }
}

/**
 * Returns a section title prefix for the glance zone.
 */
function getGlanceTitle(preset) {
  switch (preset) {
    case "today":
      return "Today at a glance";
    case "yesterday":
      return "Yesterday at a glance";
    case "last3":
      return "Last 3 days at a glance";
    case "last7":
      return "Last 7 days at a glance";
    case "last30":
      return "Last 30 days at a glance";
    case "custom":
    default:
      return "Period at a glance";
  }
}

/**
 * Randomizes a number within a variance percentage for variety.
 */
function randomize(base, variancePercent = 15) {
  const variance = base * (variancePercent / 100);
  return Math.round(base + (Math.random() * 2 - 1) * variance);
}

/**
 * Generates slightly different sparkline chart data.
 */
function randomizeChartData(baseData, variancePercent = 20) {
  return baseData.map((val) => randomize(val, variancePercent));
}

/**
 * Returns days array based on preset for gender growth chart.
 */
function getGrowthDays(preset) {
  switch (preset) {
    case "today":
      return [{ day: "Today" }];
    case "yesterday":
      return [{ day: "Yesterday" }];
    case "last30":
      return [
        { day: "Week 1" },
        { day: "Week 2" },
        { day: "Week 3" },
        { day: "Week 4" },
      ];
    case "last7":
    case "custom":
    default:
      return [
        { day: "Mon" },
        { day: "Tue" },
        { day: "Wed" },
        { day: "Thu" },
        { day: "Fri" },
        { day: "Sat" },
        { day: "Sun" },
      ];
  }
}

// ─── Builder Functions ─────────────────────────────────────────────────────────

function buildZoneAStats(contextLabel, preset) {
  const revenueVal =
    preset === "today"
      ? "+12%"
      : preset === "last7"
        ? "+8.5%"
        : preset === "last30"
          ? "+15.3%"
          : "+10%";
  const femaleVal =
    preset === "today"
      ? "-5%"
      : preset === "last7"
        ? "+3.2%"
        : preset === "last30"
          ? "+7.1%"
          : "-2%";
  const boostVal =
    preset === "today"
      ? "61%"
      : preset === "last7"
        ? "58%"
        : preset === "last30"
          ? "55%"
          : "60%";
  const kycVal =
    preset === "today"
      ? "45"
      : preset === "last7"
        ? String(randomize(120, 15))
        : preset === "last30"
          ? String(randomize(380, 15))
          : String(randomize(45, 30));
  const flagVal =
    preset === "today"
      ? "12"
      : preset === "last7"
        ? String(randomize(35, 15))
        : preset === "last30"
          ? String(randomize(90, 15))
          : String(randomize(12, 30));

  return {
    title: getGlanceTitle(preset),
    stats: [
      {
        label: "Revenue",
        value: revenueVal,
        sub: contextLabel,
        icon: "Sparkles",
        color: "emerald",
      },
      {
        label: "Boosts driving",
        value: boostVal,
        sub: "of revenue",
        icon: "TrendingUp",
        color: "blue",
      },
      {
        label: "Female signups",
        value: femaleVal,
        sub: contextLabel,
        icon: "Users",
        color: "orange",
      },
      {
        label: "KYC pending",
        value: kycVal,
        sub: "Review now →",
        icon: "ShieldAlert",
        color: "cyan",
        isActionable: true,
        route: "/admin/management/kyc-verifications",
      },
      {
        label: "Users flagged",
        value: flagVal,
        sub: "Review now →",
        icon: "Flag",
        color: "sky",
        isActionable: true,
        route: "/admin/management/profile-reports",
      },
    ],
  };
}

function buildZoneBAlerts(contextLabel, preset) {
  const kycCount =
    preset === "today"
      ? 45
      : preset === "last7"
        ? randomize(120, 15)
        : preset === "last30"
          ? randomize(380, 15)
          : randomize(45, 30);
  const reportedCount =
    preset === "today"
      ? 12
      : preset === "last7"
        ? randomize(35, 15)
        : preset === "last30"
          ? randomize(90, 15)
          : randomize(12, 30);
  const ghostingChange =
    preset === "today"
      ? "+10%"
      : preset === "last7"
        ? "+8%"
        : preset === "last30"
          ? "+12%"
          : "+9%";

  return {
    alerts: [
      {
        id: "kyc",
        label: "KYC Verification",
        value: `${kycCount} profiles waiting for approval`,
        sub: "Review to activate new users",
        badge: "Pending",
        badgeColor: "red",
        icon: "ShieldCheck",
        route: "/admin/management/kyc-verifications",
      },
      {
        id: "reported",
        label: "High Reported Users",
        value: `${reportedCount} users reported 5+ times ${preset === "today" ? "today" : preset === "yesterday" ? "yesterday" : `in ${getPeriodLabelShort(preset)}`}`,
        sub: "Investigate and take action",
        badge: "Medium",
        badgeColor: "orange",
        icon: "AlertTriangle",
        route: "/admin/management/profile-reports",
      },
      {
        id: "ghosting",
        label: "Ghosting Rate",
        value: `${ghostingChange} ${contextLabel}`,
        sub: "Monitor engagement trends",
        badge: "Info",
        badgeColor: "blue",
        icon: "Activity",
        route: "/admin/management/users-management",
      },
    ],
  };
}

function getPeriodLabelShort(preset) {
  switch (preset) {
    case "today":
      return "today";
    case "yesterday":
      return "yesterday";
    case "last7":
      return "last 7 days";
    case "last30":
      return "last 30 days";
    default:
      return "selected period";
  }
}

function buildZoneCMetrics(periodLabel, preset) {
  const revenueBase =
    preset === "today"
      ? 84
      : preset === "last7"
        ? 520
        : preset === "last30"
          ? 2100
          : randomize(84, 30);
  const revenueDisplay =
    revenueBase >= 1000
      ? `$${(revenueBase / 100).toFixed(0)}L`
      : `$${revenueBase}k`;

  return {
    metrics: [
      {
        label: "Match Liquidity",
        value: `${(randomize(15, 20) / 10).toFixed(1)}%`,
        sub: `${randomize(150, 25)} matches / ${randomize(10000, 15).toLocaleString()} swipes`,
        trend: `${(randomize(83, 30) / 10).toFixed(1)}%`,
        isPositive: true,
        chartData: randomizeChartData([20, 40, 35, 50, 45, 60, 55]),
      },
      {
        label: "Gender Ratio",
        value: `${randomize(63, 5)} : ${randomize(37, 5)}`,
        sub: "Male : Female",
        isRatio: true,
        ratioValue: randomize(63, 5),
      },
      {
        label: `Revenue ${preset === "today" ? "Today" : ""}`,
        value: revenueDisplay,
        sub: `Boosts: ${randomize(61, 10)}%  •  Subs: ${randomize(39, 10)}%`,
        trend: `${(randomize(124, 25) / 10).toFixed(1)}%`,
        isPositive: true,
        chartData: randomizeChartData([30, 45, 40, 55, 50, 70, 65]),
      },
      {
        label: "Funnel Drop-off",
        value: `${randomize(31, 15)}%`,
        sub: "At profile completion",
        trend: `- ${(randomize(47, 25) / 10).toFixed(1)}%`,
        isPositive: false,
        chartData: randomizeChartData([65, 70, 50, 55, 45, 40, 35]),
      },
    ],
  };
}

function buildGenderGrowth(dateRange, preset) {
  const days = getGrowthDays(preset);
  const multiplier =
    preset === "last30"
      ? 4
      : preset === "today" || preset === "yesterday"
        ? 0.15
        : 1;

  const data = days.map((d) => ({
    day: d.day,
    male: randomize(Math.round(340 * multiplier), 20),
    female: randomize(Math.round(210 * multiplier), 20),
  }));

  const subtitleMap = {
    today: "Signups so far today",
    yesterday: "Yesterday's signups",
    last3: "Signups for the last 3 days",
    last7: "Daily signups for the last 7 days",
    last30: "Weekly signups for the last 30 days",
    custom: "Signups during selected period",
  };

  return {
    subtitle: subtitleMap[preset] || subtitleMap.last7,
    insight: `Male signups are up ${randomize(18, 30)}% this ${preset === "last30" ? "month" : "week"}`,
    data,
  };
}

function buildRevenueBreakdown(periodLabel, preset) {
  const totalBase =
    preset === "today"
      ? 84
      : preset === "last7"
        ? 520
        : preset === "last30"
          ? 2100
          : randomize(84, 30);

  const subsPct = randomize(39, 10);
  const boostPct = randomize(31, 10);
  const superPct = 100 - subsPct - boostPct;

  const subsVal = Math.round(totalBase * 1000 * (subsPct / 100));
  const boostVal = Math.round(totalBase * 1000 * (boostPct / 100));
  const superVal = Math.round(totalBase * 1000 * (superPct / 100));

  const formatVal = (v) =>
    v >= 100000 ? `${(v / 100000).toFixed(1)}L` : `${Math.round(v / 1000)}k`;

  return {
    subtitle: `${getRevenuePeriodLabel(preset)} revenue by source`,
    total: String(totalBase),
    insight: `Boosts contribute ${boostPct}% of ${getRevenuePeriodLabel(preset).toLowerCase()} revenue`,
    categories: [
      {
        label: "Subscriptions",
        value: subsVal,
        displayValue: formatVal(subsVal),
        percentage: subsPct,
        color: "hsl(182 59% 75%)",
      },
      {
        label: "Profile Boost",
        value: boostVal,
        displayValue: formatVal(boostVal),
        percentage: boostPct,
        color: "hsl(182 59% 54%)",
      },
      {
        label: "Superkeen",
        value: superVal,
        displayValue: formatVal(superVal),
        percentage: superPct,
        color: "hsl(182 59% 35%)",
      },
    ],
  };
}

function buildLiveActivity() {
  // Live activity is always "now" — not affected by date range
  return {
    subtitle: "Important events happening now",
    events: [
      {
        id: 1,
        time: "just now",
        description: "User #4821 bought a Boost",
        color: "#46C7CD",
      },
      {
        id: 2,
        time: "1m ago",
        description: "Aisha & Rohan just matched!",
        color: "#46C7CD",
      },
      {
        id: 3,
        time: "3m ago",
        description: "User #3302 auto-blocked for spam",
        color: "#F75555",
      },
      {
        id: 4,
        time: "5m ago",
        description: "User #5511 bought Gold subscription",
        color: "#780DCC",
      },
      {
        id: 5,
        time: "8m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 6,
        time: "10m ago",
        description: "Priya & Arjun just matched!",
        color: "#46C7CD",
      },
      {
        id: 7,
        time: "12m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 8,
        time: "15m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 9,
        time: "18m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 10,
        time: "20m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 11,
        time: "22m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 12,
        time: "24m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 13,
        time: "26m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 14,
        time: "28m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 15,
        time: "30m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 16,
        time: "32m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 17,
        time: "34m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 18,
        time: "36m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 19,
        time: "38m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
      {
        id: 20,
        time: "40m ago",
        description: "User #2209 reported by 3 users",
        color: "#F75555",
      },
    ],
  };
}

function buildConversionFunnel(periodLabel, preset) {
  const base =
    preset === "today"
      ? 1200
      : preset === "last7"
        ? 10000
        : preset === "last30"
          ? 40000
          : randomize(10000, 20);

  return {
    subtitle: "Where users drop off",
    insight: "Biggest drop is at Profile Completion. Consider UX improvements.",
    stages: [
      {
        label: "App Installs",
        value: base,
        dropOff: 0,
        color: "hsl(182 100% 88%)",
      },
      {
        label: "Signups",
        value: Math.round(base * 0.82),
        dropOff: -18,
        color: "hsl(182 85% 78%)",
      },
      {
        label: "Profile Complete",
        value: Math.round(base * 0.58),
        dropOff: -29,
        color: "hsl(182 70% 68%)",
      },
      {
        label: "First Swipe",
        value: Math.round(base * 0.36),
        dropOff: -38,
        color: "hsl(182 60% 54%)",
      },
      {
        label: "Subscribed",
        value: Math.round(base * 0.125),
        dropOff: -65,
        color: "hsl(182 60% 45%)",
      },
    ],
  };
}

function buildActivityHeatmap() {
  // Heatmap is general pattern — not heavily date-dependent
  return {
    subtitle: "When your users are most active",
    insight: "Peak activity: 7PM - 10PM • Best day: Friday",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    times: ["3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am"],
    data: [
      [1, 1, 1, 1, 2, 3, 3, 2],
      [1, 2, 1, 1, 2, 3, 3, 2],
      [1, 1, 1, 2, 2, 3, 3, 2],
      [1, 1, 1, 2, 3, 3, 3, 3],
      [1, 1, 2, 2, 2, 3, 3, 2],
      [1, 2, 1, 1, 2, 3, 3, 2],
      [1, 1, 1, 2, 2, 2, 3, 2],
    ],
  };
}

function buildPerformanceInsights(periodLabel, preset) {
  return {
    subtitle: "What's working, what needs focus",
    insight: "Boosts and 4+ photo users drive the best results.",
    metrics: [
      {
        label: "Boost ROI",
        value: `${(randomize(45, 15) / 10).toFixed(1)}x`,
        percentage: randomize(90, 8),
        color: "hsl(182 59% 54%)",
      },
      {
        label: "Super Keen rate",
        value: `${randomize(45, 15)}%`,
        percentage: randomize(45, 15),
        color: "hsl(182 59% 65%)",
      },
      {
        label: "Normal match rate",
        value: `${randomize(3, 30)}%`,
        percentage: randomize(15, 20),
        color: "hsl(215 20% 65%)",
      },
      {
        label: "4+ photo users",
        value: `${(randomize(30, 15) / 10).toFixed(0)}x matches`,
        percentage: randomize(75, 10),
        color: "hsl(182 59% 54%)",
      },
      {
        label: "Deep connections",
        value: `${randomize(22, 20)}%`,
        percentage: randomize(60, 15),
        color: "hsl(182 59% 65%)",
      },
    ],
  };
}

// ─── Main Factory Function ─────────────────────────────────────────────────────

/**
 * Generate dashboard data based on a date range.
 * When backend API is ready, this function will be replaced by the actual API call.
 *
 * @param {Object} dateRange - { from: Date, to: Date, preset?: string }
 * @returns {{ success: boolean, meta: Object, data: Object }}
 */
export function getDashboardData(dateRange) {
  const preset = detectPreset(dateRange);
  const contextLabel = getContextLabel(preset);
  const periodLabel = getPeriodLabel(dateRange, preset);

  return {
    success: true,
    meta: {
      dateRange,
      preset,
      periodLabel,
      contextLabel,
    },
    data: {
      zoneA: buildZoneAStats(contextLabel, preset),
      zoneB: buildZoneBAlerts(contextLabel, preset),
      zoneC: buildZoneCMetrics(periodLabel, preset),
      genderGrowth: buildGenderGrowth(dateRange, preset),
      revenueBreakdown: buildRevenueBreakdown(periodLabel, preset),
      liveActivity: buildLiveActivity(),
      conversionFunnel: buildConversionFunnel(periodLabel, preset),
      activityHeatmap: buildActivityHeatmap(),
      performanceInsights: buildPerformanceInsights(periodLabel, preset),
    },
  };
}

// ─── Static Fallback (initial load before any date selection) ──────────────────

export const dummyDashboardData = getDashboardData({ preset: "today" });
