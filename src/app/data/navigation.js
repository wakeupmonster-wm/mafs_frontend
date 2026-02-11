// import {
//   IconBolt,
//   IconBuildingStore,
//   IconChartLine,
//   IconChecklist,
//   IconCreditCard,
//   IconDatabase,
//   IconDiscount2,
//   IconFileText,
//   IconHelp,
//   IconLayoutDashboard,
//   IconReport,
//   IconSearch,
//   IconSettings,
//   IconUsers,
//   IconAlertCircle,
// } from "@tabler/icons-react";

// const navigationData = {
//   user: {
//     name: "Setting",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/admin/dashboard",
//       icon: IconLayoutDashboard, // overview / main panel
//     },
//     {
//       title: "Analytics",
//       url: "/admin/analytics",
//       icon: IconChartLine, // trends, graphs, analytics
//     },

//   ],
//   navManagement: [
//     {
//       title: "User List & Actions",
//       url: "/admin/management/users-management",
//       icon: IconUsers, // users, accounts, roles
//     },
//     {
//       title: "Profile Review",
//       url: "/admin/management/profile-review",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     {
//       title: "KYC Verification",
//       url: "/admin/management/pending-verifications",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     {
//       title: "Chat overview & Actions",
//       url: "/admin/management/chat",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     // {
//     //   title: "Reported Chats",
//     //   url: "/admin/management/offer-management",
//     //   icon: IconDiscount2, // offers, promotions, discounts
//     // },
//     // {
//     //   title: "Reports & Safety",
//     //   url: "/admin/management/offer-management",
//     //   icon: IconDiscount2, // offers, promotions, discounts
//     // },
//     // {
//     //   title: "Block Management",
//     //   url: "/admin/management/offer-management",
//     //   icon: IconDiscount2, // offers, promotions, discounts
//     // },
//     {
//       title: "Subscriptions & Payments",
//       url: "/admin/management/offer-management",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     {
//       title: "Entitlements",
//       url: "/admin/management/offer-management",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     {
//       title: "Notifications Management",
//       url: "/admin/management/all-notifications",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     {
//       title: "Users Ticket",
//       url: "/admin/management/support",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     {
//       title: "Giveaway Management",
//       url: "/admin/management/giveaway",
//       icon: IconDiscount2, // offers, promotions, discounts
//     },
//     // {
//     //   title: "CMS Management",
//     //   url: "/admin/management/offer-management",
//     //   icon: IconDiscount2, // offers, promotions, discounts
//     // },
//   ],
//   navPlateform: [
//     {
//       title: "CMS",
//       icon: IconFileText, // content management
//       items: [
//         {
//           title: "FAQ's",
//           url: "/admin/cms/faqs",
//         },
//         {
//           title: "Privacy And Policy",
//           url: "/admin/cms/privacy-policy",
//         },
//         {
//           title: "Terms & Conditions",
//           url: "/admin/cms/terms-conditions",
//         },
//       ],
//     },

//   ],
//   navSecondary: [
//     // {
//     //   title: "Settings",
//     //   url: "/admin/settings",
//     //   icon: IconSettings,
//     // },
//     // {
//     //   title: "Get Help",
//     //   url: "/admin/management/support",
//     //   icon: IconHelp,
//     // },
//     // {
//     //   title: "Search",
//     //   url: "/admin/search",
//     //   icon: IconSearch,
//     // },
//   ],
//   documents: [
//     // {
//     //   name: "Data Library",
//     //   url: "#",
//     //   icon: IconDatabase,
//     // },
//     // {
//     //   name: "Reports",
//     //   url: "#",
//     //   icon: IconReport,
//     // },
//     // // {
//     // //   name: "Word Assistant",
//     // //   url: "#",
//     // //   icon: IconFileWord,
//     // // },
//   ],
// };

// export default navigationData;

import {
  IconLayoutDashboard,
  IconChartLine,
  IconUsers,
  IconShieldCheck,
  IconMessage,
  IconCreditCard,
  IconGift,
  IconBell,
  IconTicket,
  IconFileText,
  IconUserCheck,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react";

const navigationData = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconLayoutDashboard,
      badge: null,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartLine,
      badge: null,
    },
  ],
  navManagement: [
    {
      title: "User management",
      url: "/admin/management/users-management",
      icon: IconUsers,
      badge: null,
    },
    {
      title: "Profile reports",
      url: "/admin/management/profile-reports",
      icon: IconUserCheck,
      badge: 12,
      badgeVariant: "destructive",
    },
    {
      title: "KYC Verification",
      url: "/admin/management/kyc-verifications",
      icon: IconShieldCheck,
      badge: 8,
      badgeVariant: "default",
    },
    // {
    //   title: "Chat Overview",
    //   url: "/admin/management/chat",
    //   icon: IconMessage,
    //   badge: null,
    // },
    {
      title: "Subscriptions",
      url: "/admin/management/subscription-management",
      icon: IconCreditCard,
      badge: null,
    },
    {
      title: "Entitlements",
      url: "/admin/management/entitlements",
      icon: IconGift,
      badge: null,
    },
    {
      title: "Notifications",
      url: "/admin/management/all-notifications",
      icon: IconBell,
      badge: null,
    },
    {
      title: "Support Tickets",
      url: "/admin/management/support",
      icon: IconTicket,
      badge: 5,
      badgeVariant: "outline",
    },
    {
      title: "Giveaways",
      url: "/admin/management/giveaway",
      icon: IconGift,
      badge: null,
    },
  ],
  navPlateform: [
    {
      title: "CMS",
      icon: IconFileText,
      items: [
        {
          title: "FAQ's",
          url: "/admin/cms/faqs",
        },
        {
          title: "Privacy Policy",
          url: "/admin/cms/privacy-policy",
        },
        {
          title: "Terms & Conditions",
          url: "/admin/cms/terms-conditions",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Help Center",
      url: "/admin/help",
      icon: IconHelp,
    },
  ],
  documents: [],
};

export default navigationData;
