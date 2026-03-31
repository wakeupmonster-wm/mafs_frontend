import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { ShieldAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportedProfiles } from "../store/profile-review.slice";
import { useLocation, useNavigate } from "react-router";
import { reportColumns } from "@/components/columns/reportColumns";
import ReportsDataTables from "@/components/shared/data-tables/reports.data.tables";
import StatsGrid from "@/components/common/stats.grid";
import {
  IconAlertOctagon,
  IconCircleCheck,
  IconClipboardList,
  IconLoader,
  IconSparkles,
} from "@tabler/icons-react";
// import { bgMap, colorMap } from "@/constants/colors";

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

export default function ReportsProfilesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
        }),
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

  useEffect(() => {
    const initialFilter = location?.state;
    if (!initialFilter) return;

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    if (initialFilter === "Urgent") setStatusFilter("pending");
  }, [location?.state]);

  const columns = useMemo(() => reportColumns(navigate), [navigate]);

  const statsData = useMemo(() => {
    // 1. Calculate counts once to avoid re-filtering inside the array map
    const counts = {
      total: pagination?.total || list.length,
      new: list.filter((item) => ["pending", "new"].includes(item.status))
        .length,
      pending: list.filter((item) => item.status === "in_progress").length,
      resolved: list.filter((item) => item.status === "resolved").length,
      highPriority: list.filter((item) => item.severity === "high").length,
    };

    return [
      {
        label: "Total Reports",
        val: counts.total || 0,
        icon: <IconClipboardList size={22} />,
        color: "blue",
        description: "Lifetime reports",
      },
      {
        label: "New",
        val: counts.new,
        icon: <IconSparkles size={22} />,
        color: "rose", // Using rose for 'New' feels more urgent
        description: "Unassigned/Recent",
      },
      {
        label: "In Progress",
        val: counts.pending,
        icon: <IconLoader size={22} className="animate-spin-slow" />,
        color: "amber",
        description: "Being reviewed",
      },
      {
        label: "Resolved",
        val: counts.resolved,
        icon: <IconCircleCheck size={22} />,
        color: "emerald",
        description: "Issues fixed",
      },
      {
        label: "High Priority",
        val: counts.highPriority,
        icon: <IconAlertOctagon size={22} />,
        color: "red",
        description: "Critical action",
      },
    ];
  }, [list, pagination?.total]);

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 ",
    emerald: "from-emerald-500/40 to-emerald-600/5 text-emerald-600",
    amber: "from-amber-500/40 to-amber-600/5 text-yellow-600 ",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 ",
    red: "from-red-500/40 to-red-600/5 text-red-600 ",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
    red: "from-red-300/20 via-red-500/10 to-transparent text-red-600 border-red-200 hover:border-red-400",
  };

  // bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100
  return (
    <div className="flex flex-1 flex-col min-h-screen p-4 bg-slate-50 pb-8">
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
            color="bg-red-500"
            subheading="Review and manage user safety reports."
          />
        </header>

        {/* --- STATS GRID (Staggered) --- */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <StatsGrid stats={statsData} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        <ReportsDataTables
          columns={columns}
          data={list || []}
          rowCount={reduxPagination?.total ?? 0}
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
              (setStatusFilter(val),
                setPagination((prev) => ({ ...prev, pageIndex: 0 })));
            },
          }}
        />
      </motion.div>
    </div>
  );
}
