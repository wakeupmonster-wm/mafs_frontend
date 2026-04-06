import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconUserCheck,
  IconCrown,
  IconUserX,
  IconTicket,
  IconGift,
  IconAlertTriangle,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function SectionCards({ stats, loading, error }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card
            key={i}
            className="animate-pulse min-h-[145px] rounded-2xl p-5 border-slate-200/60 bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 w-24 rounded bg-slate-100"></div>
              <div className="h-6 w-16 rounded bg-slate-100"></div>
            </div>
            <div className="mt-4 h-8 w-20 rounded bg-slate-200"></div>
            <div className="mt-6 h-3 w-32 rounded bg-slate-100"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats?.totalUsers) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        <div className="flex items-center gap-2">
          <IconAlertTriangle className="h-5 w-5" />
          {error || "Failed to load dashboard data"}
        </div>
      </div>
    );
  }

  const cardData = [
    {
      title: "Total Revenue", // Modified to show revenue as discussed
      value: "$54,495",
      icon: IconCrown,
      trend: "45%",
      isPositive: true,
      badge: "Platform",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.value,
      icon: IconUsers,
      trend: "12.5%",
      isPositive: true,
      badge: "Live",
    },
    {
      title: "Premium Subscribers",
      value: stats.paidUsers.value,
      icon: IconUserCheck,
      trend: "5.2%",
      isPositive: true,
      badge: "Revenue",
    },
    {
      title: "Banned Users",
      value: stats.TotalBanUsers.value,
      icon: IconUserX,
      trend: "1.1%",
      isPositive: false,
      badge: "Restricted",
    },
    {
      title: "Support Tickets",
      value: stats.TotalTickets.value,
      icon: IconTicket,
      trend: "5.0%",
      isPositive: true,
      badge: "Support",
      route: "/admin/management/support",
    },
    {
      title: "Claimed Prizes",
      value: stats.ClaimedPrize.value,
      icon: IconGift,
      trend: "15.0%",
      isPositive: true,
      badge: "Giveaway",
      route: "/admin/management/giveaway",
    },
    {
      title: "Open Reports",
      value: stats.openReports.value,
      icon: IconAlertTriangle,
      trend: "8.3%",
      isPositive: false,
      badge: stats.openReports.actionable ? "Urgent" : "Clean",
      pulse: stats.openReports.actionable,
      route: "/admin/management/profile-reports",
    },
    {
      title: "Pending Verifications",
      value: stats.pendingVerifications.value,
      icon: IconShieldCheck,
      trend: "12.0%",
      isPositive: true,
      badge: "Pending",
      pulse: stats.pendingVerifications.actionable,
      route: "/admin/management/kyc-verifications",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cardData.map((card, i) => {
        const Icon = card.icon;
        const TrendIcon = card.isPositive ? IconTrendingUp : IconTrendingDown;

        return (
          <motion.div key={i} variants={cardVariants} className="h-full">
            <Card
              className={cn(
                "group relative overflow-hidden bg-slate-50 rounded-[12px] border border-slate-200 shadow-md hover:shadow-lg transition-all duration-200 p-4 flex flex-col cursor-pointer gap-2",
                card.pulse &&
                  "border-rose-300 shadow-rose-100 ring-1 ring-rose-500/20",
              )}
              onClick={() =>
                navigate(card.route || "/admin/management/users-management", {
                  state: card.badge,
                })
              }
            >
              {/* Header: Title + Icon/Badge */}
              <div className="flex justify-between items-start">
                <h3 className="text-[14px] font-medium text-slate-600 tracking-tight pt-0.5">
                  {card.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant={card.pulse ? "destructive" : "secondary"}
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md",
                      !card.pulse &&
                        "bg-slate-100/80 text-slate-500 hover:bg-slate-200",
                    )}
                  >
                    {card.badge}
                  </Badge>
                  <div className="p-1 rounded-md bg-slate-50/80 border border-slate-100 text-slate-400 group-hover:text-slate-600 transition-colors">
                    <Icon size={16} stroke={1.5} />
                  </div>
                </div>
              </div>

              {/* Value */}
              <div className="flex items-center">
                <span className="text-[28px] font-bold text-slate-900 leading-none tracking-tight">
                  {card.value?.toLocaleString() || "0"}
                </span>
              </div>

              {/* Trend Footer */}
              <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium mt-1">
                <span
                  className={cn(
                    "flex items-center gap-1",
                    card.isPositive ? "text-emerald-500" : "text-rose-500",
                  )}
                >
                  <TrendIcon size={14} stroke={2.5} /> {card.trend}
                </span>
                <span className="text-slate-400 font-normal">
                  vs last 7 days
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
