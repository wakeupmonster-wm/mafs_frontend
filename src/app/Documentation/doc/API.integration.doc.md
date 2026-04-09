```js
{
  success: true,
  data: {
    zoneA: {
      stats: [
        {
          label: "Revenue",
          value: "+100.0%",
          sub: "vs yesterday", //
          icon: "Sparkles",
          color: "emerald",
        },
        {
          label: "Boosts driving",
          value: "0%",
          sub: "of revenue",
          icon: "TrendingUp",
          color: "blue",
        },
        {
          label: "Female signups",
          value: "+100%",
          sub: "vs yesterday",
          icon: "Users",
          color: "orange",
        },
        {
          label: "KYC pending",
          value: "0",
          sub: "Review now →",
          icon: "ShieldAlert",
          color: "cyan",
          isActionable: true,
          route: "/admin/management/kyc-verifications",
        },
        {
          label: "Users flagged",
          value: "0",
          sub: "Review now →",
          icon: "Flag",
          color: "sky",
          isActionable: true,
          route: "/admin/management/profile-reports",
        },
      ],
    },
    zoneB: {
      alerts: [
        {
          id: "kyc",
          label: "KYC Verification",
          value: "0 profiles waiting for approval",
          sub: "Review to activate new users",
          badge: "Low",
          badgeColor: "red",
          icon: "ShieldCheck",
          route: "/admin/management/kyc-verifications",
        },
        {
          id: "reported",
          label: "High Reported Users",
          value: "0 users reported 5+ times today",
          sub: "Investigate and take action",
          badge: "Medium",
          badgeColor: "orange",
          icon: "AlertTriangle",
          route: "/admin/management/profile-reports",
        },
        {
          id: "ghosting",
          label: "Ghosting Rate",
          value: "+0% vs last 7 days average",
          sub: "Monitor engagement trends",
          badge: "Info",
          badgeColor: "blue",
          icon: "Activity",
          route: "/admin/management/users-management",
        },
      ],
    },
    zoneC: {
      metrics: [
        {
          label: "Match Liquidity",
          value: "0.0%",
          sub: "0 matches / 0 swipes",
          trend: "0.0%",
          isPositive: true,
          chartData: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          label: "Gender Ratio",
          value: "50 : 50",
          sub: "Male : Female",
          isRatio: true,
          ratioValue: 50,
        },
        {
          label: "Revenue Today",
          value: "$0k",
          sub: "Boosts: 0% • Subs: 0%",
          trend: "100.0%",
          isPositive: true,
          chartData: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          label: "Funnel Drop-off",
          value: "0%",
          sub: "At profile completion",
          trend: "0%",
          isPositive: false,
          chartData: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    },
    genderGrowth: {
      subtitle: "Daily signups for the last 7 days",
      insight: "Male signups are dominant at 50%",
      data: [
        {
          day: "Wed",
          male: 0,
          female: 0,
        },
        {
          day: "Thu",
          male: 0,
          female: 0,
        },
        {
          day: "Fri",
          male: 0,
          female: 0,
        },
        {
          day: "Sat",
          male: 0,
          female: 0,
        },
        {
          day: "Sun",
          male: 0,
          female: 0,
        },
        {
          day: "Mon",
          male: 0,
          female: 0,
        },
        {
          day: "Tue",
          male: 500,
          female: 500,
        },
      ],
    },
    revenueBreakdown: {
      subtitle: "Revenue breakdown for selected period",
      total: "$0k",
      insight: "Boosts contribute 0% of revenue",
      categories: [
        {
          label: "Subscriptions",
          value: 0,
          displayValue: "$0k",
          percentage: 0,
          color: "hsl(182 59% 75%)",
        },
        {
          label: "Profile Boost",
          value: 0,
          displayValue: "$0k",
          percentage: 0,
          color: "hsl(182 59% 54%)",
        },
        {
          label: "Superkeen",
          value: 0,
          displayValue: "$0k",
          percentage: 0,
          color: "hsl(182 59% 35%)",
        },
      ],
    },
    liveActivity: {
      subtitle: "Important events happening now",
      events: [],
    },
    conversionFunnel: {
      subtitle: "Where users drop off",
      insight: "Signup to Profile Completion is the biggest hurdle.",
      stages: [
        {
          label: "App Installs",
          value: 1000,
          dropOff: 0,
          color: "hsl(182 100% 88%)",
        },
        {
          label: "Signups",
          value: 1000,
          dropOff: 0,
          color: "hsl(182 85% 78%)",
        },
        {
          label: "Profile Complete",
          value: 1000,
          dropOff: 0,
          color: "hsl(182 70% 68%)",
        },
        {
          label: "First Swipe",
          value: 0,
          dropOff: -100,
          color: "hsl(182 60% 54%)",
        },
        {
          label: "Subscribed",
          value: 0,
          dropOff: 0,
          color: "hsl(182 60% 45%)",
        },
      ],
    },
    activityHeatmap: {
      subtitle: "When your users are most active",
      insight: "Peak activity: 6PM - 11PM based on last 30d baseline",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      times: ["6am", "9am", "12pm", "3pm", "6pm", "9pm", "11pm", "12am"],
      data: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    performanceInsights: {
      subtitle: "What's working, what needs focus",
      insight: "Boosts and 4+ photo users drive the best results.",
      metrics: [
        {
          label: "Boost ROI",
          value: "0x",
          percentage: 0,
          color: "hsl(182 59% 54%)",
        },
        {
          label: "Super Keen rate",
          value: "0%",
          percentage: 0,
          color: "hsl(182 59% 65%)",
        },
        {
          label: "Normal match rate",
          value: "0%",
          percentage: 0,
          color: "hsl(215 20% 65%)",
        },
        {
          label: "4+ photo users",
          value: "100%",
          percentage: 100,
          color: "hsl(182 59% 54%)",
        },
        {
          label: "Deep connections",
          value: "0%",
          percentage: 0,
          color: "hsl(182 59% 65%)",
        },
      ],
    },
    detailedFallback: {
      overview: {
        totalUsers: 1000,
        premiumUsers: 0,
        bannedUsers: 0,
        suspendedUsers: 0,
      },
      kyc: {
        pending: 0,
        approved: 1000,
        rejected: 0,
      },
      feedback: {
        newReports: 0,
        supportOpen: 0,
      },
    },
  },
};
```
