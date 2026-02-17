import { useEffect, useMemo } from "react";
import {
  IconTrendingUp,
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
import { Card, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardKPIs } from "@/modules/dashboard/store/dashboard.slice";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function SectionCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!stats) dispatch(fetchDashboardKPIs());
  }, [dispatch, stats]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 w-24 rounded bg-muted"></div>
              <div className="mt-2 h-8 w-20 rounded bg-muted"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats?.totalUsers) {
    return (
      <div className="mx-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 lg:mx-6">
        <div className="flex items-center gap-2">
          <IconAlertTriangle className="h-5 w-5" />
          {error || "Failed to load dashboard data"}
        </div>
      </div>
    );
  }

  const cardData = [
    {
      title: "Total Users",
      value: stats.totalUsers.value,
      icon: IconUsers,
      color: "blue",
      badge: "Live",
    },
    {
      title: "Active (24h)",
      value: stats.activeUsers24h.value,
      icon: IconUserCheck,
      color: "emerald",
      badge: "Active",
    },
    {
      title: "Premium",
      value: stats.paidUsers.value,
      icon: IconCrown,
      color: "amber",
      badge: "Revenue",
    },
    {
      title: "Banned",
      value: stats.TotalBanUsers.value,
      icon: IconUserX,
      color: "rose",
      badge: "Restricted",
    },
    {
      title: "Support",
      value: stats.TotalTickets.value,
      icon: IconTicket,
      color: "indigo",
      badge: "Tickets",
      route: "/admin/management/support",
    },
    {
      title: "Claimed Prizes",
      value: stats.ClaimedPrize.value,
      icon: IconGift,
      color: "pink",
      badge: "Claimed",
      route: "/admin/management/giveaway",
    },
    {
      title: "Reports",
      value: stats.openReports.value,
      icon: IconAlertTriangle,
      color: "orange",
      badge: stats.openReports.actionable ? "Urgent" : "Clean",
      pulse: stats.openReports.actionable,
      route: "/admin/management/profile-review",
    },
    {
      title: "Verifications",
      value: stats.pendingVerifications.value,
      icon: IconShieldCheck,
      color: "cyan",
      badge: "Pending",
      pulse: stats.pendingVerifications.actionable,
      route: "/admin/management/kyc-verifications",
    },
  ];

  const colorMap = {
    blue: "from-blue-800 to-transparent text-blue-600 bg-blue-100 border-blue-400",
    emerald:
      "from-emerald-800 to-transparent text-emerald-600 bg-emerald-100 border-emerald-100400",
    amber:
      "from-amber-800 to-transparent text-amber-600 bg-amber-100 border-amber-400",
    rose: "from-rose-800 to-transparent text-rose-600 bg-rose-100 border-rose-400",
    indigo:
      "from-indigo-800 to-transparent text-indigo-600 bg-indigo-100 border-indigo-400",
    pink: "from-pink-800 to-transparent text-pink-600 bg-pink-100 border-pink-400",
    orange:
      "from-orange-800 to-transparent text-orange-600 bg-orange-100 border-orange-400",
    cyan: "from-cyan-800 to-transparent text-cyan-600 bg-cyan-100 border-cyan-400",
  };

  const bgMap = {
    blue: "from-blue-200/20 to-transparent text-blue-600 border-blue-400",
    emerald:
      "from-emerald-200/20 to-transparent text-emerald-600 border-emerald-400",
    amber: "from-amber-200/20 to-transparent text-amber-600 border-amber-400",
    rose: "from-rose-200/20 to-transparent text-rose-600 border-rose-400",
    indigo:
      "from-indigo-200/20 to-transparent text-indigo-600 border-indigo-400",
    pink: "from-pink-200/20 to-transparent text-pink-600 border-pink-400",
    orange:
      "from-orange-200/20 to-transparent text-orange-600 border-orange-100",
    cyan: "from-cyan-200/20 to-transparent text-cyan-600 border-cyan-400",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 cursor-pointer"
    >
      {cardData.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div key={i} variants={cardVariants}>
            <Card
              className={cn(
                "group relative overflow-hidden p-4 py-6 rounded-2xl border transition-all duration-300",
                card.pulse &&
                  "ring-2 ring-rose-500 ring-offset-2 animate-pulse-slow",
                bgMap[card.color],
                "hover:border-slate-400 shadow-sm hover:shadow-xl" // Added elevation on hover
              )}
              onClick={() =>
                navigate(card.route || "/admin/management/users-management", {
                  state: card.badge,
                })
              }
            >
              <div className="relative flex items-start justify-center gap-3">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br border shadow-sm",
                    colorMap[card.color]
                  )}
                >
                  <Icon size={22} stroke={2} />
                </div>

                <div className="flex-1 w-full space-y-2 px-2">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">
                    {card.title}
                  </p>
                  <h4 className="text-2xl font-black text-slate-900 leading-none">
                    {card.value.toLocaleString()}
                  </h4>

                  {/* <div className="flex items-center justify-between border-t border-slate-100 pt-3"> */}
                  <div className="flex items-center gap-6 font-medium mt-1 truncate text-slate-500">
                    <span className="text-[10px] font-medium text-slate-400">
                      Updated just now
                    </span>
                    <IconTrendingUp
                      size={20}
                      className="text-slate-300 group-hover:text-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="absolute -top-4 right-0">
                  <Badge
                    variant={card.pulse ? "destructive" : "outline"}
                    className="text-[10px] font-bold uppercase tracking-wider border"
                  >
                    {card.badge}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
