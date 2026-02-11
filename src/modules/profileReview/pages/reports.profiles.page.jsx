import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { Card } from "@/components/ui/card"; // Ensure this is imported
import {
  ShieldAlert,
  BarChart3,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Flag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportedProfiles } from "../store/profile-review.slice";
import { useNavigate } from "react-router";
import { reportColumns } from "@/components/columns/reportColumns";
import ReportsDataTables from "@/components/shared/data-tables/reports.data.tables";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function ReportsProfilesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Redux State
  const {
    list,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.profileReview);

  // 2. Local Filter/Pagination State
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // 3. API Fetch with Filters
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchReportedProfiles({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          status: statusFilter,
        })
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    statusFilter,
  ]);

  const columns = useMemo(() => reportColumns(navigate), [navigate]);

  const statsData = useMemo(() => {
    const stats = {
      total: pagination?.total || list.length,
      new: list.filter(
        (item) => item.status === "pending" || item.status === "new"
      ).length,
      pending: list.filter((item) => item.status === "in_progress").length,
      resolved: list.filter((item) => item.status === "resolved").length,
      highPriority: list.filter((item) => item.severity === "high").length,
    };

    const { total, new: New, pending, resolved, highPriority } = stats;

    return [
      { label: "Total Reports", value: total, icon: BarChart3, color: "blue" },
      { label: "New", value: New, icon: AlertTriangle, color: "red" },
      { label: "Pending", value: pending, icon: Clock, color: "amber" },
      {
        label: "Resolved",
        value: resolved,
        icon: CheckCircle2,
        color: "emerald",
      },
      {
        label: "High Priority",
        value: highPriority,
        icon: Flag,
        color: "purple",
      },
    ];
  }, [list, pagination?.total]);

  const colorStyles = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-600 shadow-blue-100/50",
    red: "from-red-50 to-red-100 border-red-200 text-red-600 shadow-red-100/50",
    amber:
      "from-amber-50 to-amber-100 border-amber-200 text-amber-600 shadow-amber-100/50",
    emerald:
      "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-600 shadow-emerald-100/50",
    purple:
      "from-purple-50 to-purple-100 border-purple-200 text-purple-600 shadow-purple-100/50",
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <PageHeader
            heading="Reported Profiles"
            icon={<ShieldAlert className="w-9 h-9 text-white animate-pulse" />}
            color="bg-red-500 shadow-red-500/20"
            subheading="Review and manage user safety reports."
          />
        </header>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-2">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <Card
                  className={`p-5 border bg-gradient-to-br shadow-sm transition-shadow hover:shadow-md ${
                    colorStyles[stat.color]
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-black tabular-nums">
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-xl backdrop-blur-sm">
                      <Icon className="w-6 h-6 opacity-80" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* <motion.div variants={itemVariants} initial="hidden" animate="visible"> */}
        <ReportsDataTables
          columns={columns}
          data={list || []}
          rowCount={reduxPagination?.total || 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by nickname..."
          filters={{
            statusFilter,
            setStatusFilter: (val) => {
              setStatusFilter(val),
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
        />
        {/* </motion.div> */}
      </motion.div>
    </div>
  );
}
