import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { CreditCard, Users, CheckCircle, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscriptionList,
  fetchSubscriptionStats,
} from "../store/subcription.slices";
import SubscriptionsDataTables from "@/components/shared/data-tables/subscriptions.data.table";
import { subscriptionColumns } from "@/components/columns/subscriptions.columns";
import StatusBreakdown from "../components/status.breakdown";
import PlanDistribution from "../components/plan.distribution";
import PlatformActivity from "../components/platform.activity";
import StatsGrid from "@/components/common/stats.grid";

// Container variants to handle the "stagger" effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each card's entry
    },
  },
};

export default function SubscriptionsPage() {
  const dispatch = useDispatch();
  const {
    subscriptions,
    stats,
    loading,
    pagination: reduxPagination,
  } = useSelector((state) => state.subscription);

  // Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    plan: "",
    platform: "",
    sortBy: "",
    sortOrder: "",
  });

  useEffect(() => {
    dispatch(fetchSubscriptionStats());
  }, []);

  // Debounced API Call
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchSubscriptionList({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          ...filters,
        })
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, pagination, filters]);

  // Helper to update filters and reset to page 1
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const priKPI = useMemo(() => {
    // Helper to calculate percentage change (optional logic)
    const calculateTrend = (current, previous) => {
      if (!previous) return 0;
      return ((current - previous) / previous) * 100;
    };

    return [
      {
        label: "Total Users",
        val: stats.total?.toLocaleString() || "0",
        icon: <Users size={22} />, // Reference the component, render inside StatCard
        color: "blue",
        description: "Lifetime growth",
        trend: calculateTrend(stats.total, stats.previousTotal),
      },
      {
        label: "Active Now",
        val: stats.active || 0,
        icon: <CheckCircle size={22} />,
        color: "emerald",
        description: "Live sessions",
        trend: 5.2, // Example hardcoded trend if backend doesn't provide
      },
      {
        label: "Today's Revenue",
        val: stats.today?.revenue || 0,
        icon: <TrendingUp size={22} />,
        color: "amber",
        description: "Gross earnings",
        trend: 12.5,
      },
      {
        label: "Daily Transactions",
        val: stats.today?.transactions || 0,
        icon: <CreditCard size={22} />,
        color: "purple",
        description: "Successful checkouts",
        trend: -2.4,
      },
    ];
  }, [stats, reduxPagination?.total]);

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald:
      "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    purple:
      "from-purple-500/40 to-purple-600/5 text-purple-600 border-purple-100",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
    purple:
      "from-purple-300/20 to-purple-500/10 to-transparent text-purple-600 border-purple-200 hover:border-purple-400",
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
      <motion.div
        className="max-w-7xl mx-auto w-full space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <PageHeader
            heading="Subscription Management"
            icon={<CreditCard className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-indigo-200"
            subheading="Monitor active plans, renewals, and revenue streams."
          />
        </header>

        {/* ================= PRIMARY KPI GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
        >
          <StatsGrid stats={priKPI} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        {/* ================= SUB-STATS (Optional) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 mt-6">
          {/* 1. STATUS BREAKDOWN */}
          <StatusBreakdown stats={stats} />

          {/* 2. PLAN DISTRIBUTION */}
          <PlanDistribution stats={stats} />

          {/* 3. PLATFORM & TODAY'S ACTIVITY */}
          <PlatformActivity stats={stats} />
        </div>

        {/* --- TABLE SECTION --- */}
        <SubscriptionsDataTables
          columns={subscriptionColumns}
          data={subscriptions || []}
          rowCount={reduxPagination?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          // Filter Props
          globalFilter={filters.search}
          setGlobalFilter={(val) => handleFilterChange("search", val)}
          filters={{
            status: filters.status,
            setStatus: (val) => handleFilterChange("status", val),
            plan: filters.plan,
            setPlan: (val) => handleFilterChange("plan", val),
            platform: filters.platform,
            setPlatform: (val) => handleFilterChange("platform", val),
          }}
          isLoading={loading}
        />
      </motion.div>
    </div>
  );
}
