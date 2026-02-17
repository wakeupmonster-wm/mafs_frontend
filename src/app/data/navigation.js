import {
  IconLayoutDashboard,
  IconChartLine,
  IconUsers,
  IconShieldCheck,
  IconCreditCard,
  IconGift,
  IconBell,
  IconTicket,
  IconFileText,
  IconUserCheck,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react";
import { Trophy } from "lucide-react";

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
      // items: [
      //   {
      //     title: "Prizes",
      //     url: "/admin/management/giveaway/prizes",
      //     icon: Trophy,
      //   },
      //   {
      //     title: "Campaigns",
      //     url: "/admin/management/giveaway/campaigns",
      //     icon: Trophy,
      //   },
      //   {
      //     title: "Bulk",
      //     url: "/admin/management/giveaway/bulk-campaigns",
      //     icon: Trophy,
      //   },
      //   {
      //     title: "Winners",
      //     url: "/admin/management/giveaway/winner",
      //     icon: Trophy,
      //   },
      //   {
      //     title: "Pending Deliveries",
      //     url: "/admin/management/giveaway/pending-deliveries",
      //     icon: Trophy,
      //   },
      //   {
      //     title: "Participants",
      //     url: "/admin/management/giveaway/participants",
      //     icon: Trophy,
      //   },
      // ],
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
