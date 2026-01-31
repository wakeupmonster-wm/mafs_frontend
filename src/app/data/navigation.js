import {
  IconBolt,
  IconBuildingStore,
  IconChartLine,
  IconChecklist,
  IconCreditCard,
  IconDatabase,
  IconDiscount2,
  IconFileText,
  IconHelp,
  IconLayoutDashboard,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconAlertCircle,
} from "@tabler/icons-react";

const navigationData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconLayoutDashboard, // overview / main panel
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartLine, // trends, graphs, analytics
    },
    // {
    //   title: "KPI's",
    //   url: "/admin/kpi",
    //   icon: IconChecklist, // metrics, performance indicators
    // },
    // {
    //   title: "Quick Actions",
    //   url: "/admin/quick-actions",
    //   icon: IconBolt, // fast actions, shortcuts
    // },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navManagement: [
    {
      title: "User List & Actions",
      url: "/admin/management/users-management",
      icon: IconUsers, // users, accounts, roles
    },
    {
      title: "Profile Review",
      url: "/admin/management/profile-review",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    {
      title: "KYC Verification",
      url: "/admin/management/pending-verifications",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    {
      title: "Chat overview & Actions",
      url: "/admin/management/chat",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    // {
    //   title: "Reported Chats",
    //   url: "/admin/management/offer-management",
    //   icon: IconDiscount2, // offers, promotions, discounts
    // },
    // {
    //   title: "Reports & Safety",
    //   url: "/admin/management/offer-management",
    //   icon: IconDiscount2, // offers, promotions, discounts
    // },
    // {
    //   title: "Block Management",
    //   url: "/admin/management/offer-management",
    //   icon: IconDiscount2, // offers, promotions, discounts
    // },
    {
      title: "Subscriptions & Payments",
      url: "/admin/management/offer-management",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    {
      title: "Entitlements",
      url: "/admin/management/offer-management",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    {
      title: "Notifications Management",
      url: "/admin/management/all-notifications",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    {
      title: "Users Ticket",
      url: "/admin/management/support",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    {
      title: "Giveaway Management",
      url: "/admin/management/giveaway",
      icon: IconDiscount2, // offers, promotions, discounts
    },
    // {
    //   title: "CMS Management",
    //   url: "/admin/management/offer-management",
    //   icon: IconDiscount2, // offers, promotions, discounts
    // },
  ],
  navPlateform: [
    {
      title: "CMS",
      icon: IconFileText, // content management
      items: [
        {
          title: "FAQ's",
          url: "/admin/cms/faqs",
        },
        {
          title: "Privacy And Policy",
          url: "/admin/cms/privacy-policy",
        },
        {
          title: "Terms & Conditions",
          url: "/admin/cms/terms-conditions",
        },
      ],
    },
    // {
    //   title: "Membership & Billings",
    //   icon: IconCreditCard, // subscriptions, payments, billing
    //   items: [
    //     {
    //       title: "Billings",
    //       url: "/admin/membership/billing",
    //     },
    //     {
    //       title: "View Subscriptions",
    //       url: "/admin/membership/subscriptions",
    //     },
    //     {
    //       title: "Manual Entitlements & Trials",
    //       url: "/admin/membership/entitlements",
    //     },
    //     {
    //       title: "Configure SKUs & Pricing",
    //       url: "/admin/membership/pricing",
    //     },
    //   ],
    // },
    // {
    //   title: "Reports & Moderation",
    //   icon: IconAlertCircle, // safety, abuse, moderation
    //   items: [
    //     {
    //       title: "Report Queue",
    //       url: "/admin/report-moderation/report-queue",
    //     },
    //     {
    //       title: "Blocked & Banned Users",
    //       url: "/admin/report-moderation/block-banned-users",
    //     },
    //   ],
    // },
    // {
    //   title: "CMS",
    //   icon: IconFileText, // content management
    //   items: [
    //     {
    //       title: "FAQ's",
    //       url: "/admin/cms/faqs",
    //     },
    //     {
    //       title: "Privacy And Policy",
    //       url: "/admin/cms/privacy-policy",
    //     },
    //     {
    //       title: "Terms & Conditions",
    //       url: "/admin/cms/terms-conditions",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "/admin/settings",
    //   icon: IconSettings,
    // },
    // {
    //   title: "Get Help",
    //   url: "/admin/management/support",
    //   icon: IconHelp,
    // },
    // {
    //   title: "Search",
    //   url: "/admin/search",
    //   icon: IconSearch,
    // },
  ],
  documents: [
    // {
    //   name: "Data Library",
    //   url: "#",
    //   icon: IconDatabase,
    // },
    // {
    //   name: "Reports",
    //   url: "#",
    //   icon: IconReport,
    // },
    // // {
    // //   name: "Word Assistant",
    // //   url: "#",
    // //   icon: IconFileWord,
    // // },
  ],
};

export default navigationData;
