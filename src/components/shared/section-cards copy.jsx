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
import { cn } from "@/lib/utils";

// --- Custom Animated Wave Background ---
const WaveChart = ({ color }) => {
  const chartColors = {
    blue: {
      stop1: "#eff6ff",
      stop2: "#bfdbfe",
      stroke: "#60a5fa",
      dot: "#3b82f6",
    },
    emerald: {
      stop1: "#ecfdf5",
      stop2: "#a7f3d0",
      stroke: "#34d399",
      dot: "#10b981",
    },
    amber: {
      stop1: "#fffbeb",
      stop2: "#fde68a",
      stroke: "#fbbf24",
      dot: "#f59e0b",
    },
    rose: {
      stop1: "#fff1f2",
      stop2: "#fecdd3",
      stroke: "#ebpxr",
      dot: "#f43f5e",
    }, // fixed slightly red hue
    indigo: {
      stop1: "#eef2ff",
      stop2: "#c7d2fe",
      stroke: "#818cf8",
      dot: "#6366f1",
    },
    pink: {
      stop1: "#fdf2f8",
      stop2: "#fbcfe8",
      stroke: "#f472b6",
      dot: "#ec4899",
    },
    orange: {
      stop1: "#fff7ed",
      stop2: "#fed7aa",
      stroke: "#fb923c",
      dot: "#f97316",
    },
    cyan: {
      stop1: "#ecfeff",
      stop2: "#a5f3fc",
      stroke: "#22d3ee",
      dot: "#06b6d4",
    },
  };

  // Default to blue if invalid color string is somehow passed
  const c = chartColors[color] || chartColors.blue;

  if (color === "rose") {
    c.stroke = "#fb7185"; // Fixed the hex string typo from above
  }

  return (
    <svg
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0 w-full h-[85px] z-0 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:h-[95px] pointer-events-none"
    >
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.stop2} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c.stop1} stopOpacity="0.0" />
        </linearGradient>

        <linearGradient
          id={`grad-layered-${color}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={c.stop2} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.stop1} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background/Layered Wave to create a beautiful glassy double-wave effect */}
      <path
        d="M0,85 C50,85 80,75 110,85 C160,100 190,65 230,55 C270,45 290,30 300,10 L300,100 L0,100 Z"
        fill={`url(#grad-layered-${color})`}
      />

      {/* Foreground Wave */}
      <path
        d="M0,80 C40,90 80,70 120,80 C160,90 180,60 220,40 C260,20 280,30 300,10 L300,100 L0,100 Z"
        fill={`url(#grad-${color})`}
      />

      {/* Smooth Line Curve */}
      <path
        d="M0,80 C40,90 80,70 120,80 C160,90 180,60 220,40 C260,20 280,30 300,10"
        fill="none"
        stroke={c.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:stroke-[2.5px] transition-all duration-300"
      />

      {/* Chart Dot */}
      <circle
        cx="220"
        cy="40"
        r="3.5"
        fill={c.dot}
        className="group-hover:r-[5px] transition-all duration-300"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
      />
      <circle
        cx="220"
        cy="40"
        r="1.5"
        fill="#fff"
        className="group-hover:r-[2.5px] transition-all duration-300"
      />
    </svg>
  );
};

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

export default function SectionCards({ stats, loading, error }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse min-h-[145px] rounded-[24px]">
            <CardHeader>
              <div className="h-4 w-24 rounded bg-slate-200"></div>
              <div className="mt-4 h-8 w-20 rounded bg-slate-200"></div>
            </CardHeader>
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
      route: "/admin/management/profile-reports",
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

  const iconBgMap = {
    blue: "text-blue-500 border border-blue-100 shadow-[inset_0_0_10px_rgb(59,130,246,0.1)]",
    emerald:
      "text-emerald-500 border border-emerald-100 shadow-[inset_0_0_10px_rgb(16,185,129,0.1)]",
    amber:
      "text-amber-500 border border-amber-100 shadow-[inset_0_0_10px_rgb(245,158,11,0.1)]",
    rose: "text-rose-500 border border-rose-100 shadow-[inset_0_0_10px_rgb(244,63,94,0.1)]",
    indigo:
      "text-indigo-500 border border-indigo-100 shadow-[inset_0_0_10px_rgb(99,102,241,0.1)]",
    pink: "text-pink-500 border border-pink-100 shadow-[inset_0_0_10px_rgb(236,72,153,0.1)]",
    orange:
      "text-orange-500 border border-orange-100 shadow-[inset_0_0_10px_rgb(249,115,22,0.1)]",
    cyan: "text-cyan-500 border border-cyan-100 shadow-[inset_0_0_10px_rgb(6,182,212,0.1)]",
  };

  const titleColorMap = {
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    rose: "text-rose-600",
    indigo: "text-indigo-600",
    pink: "text-pink-600",
    orange: "text-orange-600",
    cyan: "text-cyan-600",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cardData.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div key={i} variants={cardVariants} className="h-full">
            <Card
              className={cn(
                "group relative overflow-hidden pt-2 bg-slate-50 rounded-3xl border border-slate-200/50 shadow-md shadow-slate-200 transition-all duration-300 min-h-[145px] cursor-pointer",
                "hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)]",
                card.pulse &&
                  "border-none ring-1 ring-rose-500 ring-offset-1 animate-pulse-slow",
              )}
              onClick={() =>
                navigate(card.route || "/admin/management/users-management", {
                  state: card.badge,
                })
              }
            >
              {/* Animated Wave Area Chart Background generated dynamically */}
              <WaveChart color={card.color} />

              <div className="relative z-10 p-5 px-6 w-full h-full flex justify-between items-start">
                {/* Left Side: Icon & Details */}
                <div className="flex gap-4 items-start">
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-[14px]",
                      iconBgMap[card.color] || iconBgMap.blue,
                    )}
                  >
                    <Icon size={24} stroke={1.5} />
                  </div>

                  <div className="flex flex-col pt-0.5">
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest mb-1.5",
                        titleColorMap[card.color] || titleColorMap.blue,
                      )}
                    >
                      {card.title}
                    </span>
                    <span className="text-3xl font-black text-slate-800 leading-none tracking-tight mb-2 group-hover:scale-105 origin-left transition-transform duration-300">
                      {card.value?.toLocaleString() || "0"}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 group-hover:text-slate-500 transition-colors">
                      Updated just now
                      <IconTrendingUp
                        size={14}
                        stroke={2}
                        className={cn(
                          "transition-colors duration-300",
                          titleColorMap[card.color] || titleColorMap.blue,
                          "opacity-50 group-hover:opacity-100",
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: LIVE Badge */}
                <div className="pt-0.5">
                  <Badge
                    variant={card.pulse ? "destructive" : "outline"}
                    className={cn(
                      "bg-white border-slate-200 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md shadow-sm",
                      card.pulse
                        ? "text-red-500 hover:text-slate-50 border-red-300 bg-red-50"
                        : "text-slate-600",
                    )}
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
