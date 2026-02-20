import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  IconAlertTriangle,
  IconBan,
  IconCrown,
  IconFileExcel,
  IconLoader,
  IconLoader2,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react";
import { useLocation } from "react-router";
import { userColumns } from "@/components/common/userColumns";
import UserDataTables from "@/components/shared/data-tables/user.data.tables";
import { cn } from "@/lib/utils";
import {
  bannedUserProfile,
  exportUsersStream,
  fetchUsers,
} from "../store/user.slice";
import { BanUserModal } from "../components/ban-user-modal";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Controls the speed of the "wave" between cards
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25, // Start lower for a more pronounced "wave" up
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15, // Lower damping = more "wave" bounce
      mass: 1,
    },
  },
};

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    items = [],
    loading,
    pagination: reduxPagination,
    exportLoading,
    exportProgress,
  } = useSelector((state) => state.users);

  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState(null);

  // Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [isPremium, setIsPremium] = useState(undefined);
  const [last24HR, setLast24HR] = useState(undefined);

  // --- Optimized Stats Calculation ---
  const stats = useMemo(() => {
    return [
      {
        label: "Total Members",
        val: reduxPagination?.total || 0,
        icon: <IconUsers size={22} />,
        color: "blue",
        description: "Overall Total Users",
      },
      {
        label: "Active Users",
        val: items.filter((u) => u.account?.status === "active").length,
        icon: <IconUserCheck size={22} />,
        color: "emerald",
        description: "Live community",
      },
      {
        label: "Premium Members",
        val: items.filter((u) => u.account?.isPremium).length,
        icon: <IconCrown size={22} />,
        color: "amber",
        description: "Pro tier active",
      },
      {
        label: "Banned Users",
        val: items.filter((u) => u.account?.status === "banned").length,
        icon: <IconBan size={22} />,
        color: "rose",
        description: "Safety restrictions",
      },
      {
        label: "Suspended",
        val: items.filter((u) => u.account?.status === "suspended").length,
        icon: <IconAlertTriangle size={22} />,
        color: "orange",
        description: "Under review",
      },
    ];
  }, [items, reduxPagination?.total]);

  const handleExport = async () => {
    try {
      const filters = {
        search: globalFilter,
        accountStatus: accountStatus, // Added these to match your current table state
        isPremium: isPremium,
      };

      // 1. You MUST await the dispatch
      const resultAction = await dispatch(exportUsersStream(filters));

      // 2. Check the result after the promise settles
      if (exportUsersStream.fulfilled.match(resultAction)) {
        const csvContent = resultAction.payload;

        // Safety check: ensure csvContent exists
        if (!csvContent) {
          toast.error("No data received from server");
          return;
        }

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `MAFS_Users_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("Export completed successfully");
      } else {
        // Handle the rejection
        const errorMessage =
          resultAction.payload ||
          resultAction.error?.message ||
          "Export failed";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Export Error:", err);
      toast.error("An unexpected error occurred during export");
    }
  };

  useEffect(() => {
    const initialFilter = location?.state;
    if (!initialFilter) return;

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    if (initialFilter === "Restricted") setAccountStatus("banned");
    else if (initialFilter === "Active") setLast24HR(true);
    else if (initialFilter === "Revenue") setIsPremium(true);
  }, [location?.state]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchUsers({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          accountStatus,
          isPremium,
          last24Hours: last24HR,
        })
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, pagination, globalFilter, accountStatus, isPremium, last24HR]);

  const handleBanClick = (user) => {
    setSelectedUserForBan(user);
    setIsBanModalOpen(true);
  };

  const handleBanConfirm = async (category, reason) => {
    try {
      await dispatch(
        bannedUserProfile({ userId: selectedUserForBan?._id, category, reason })
      ).unwrap();
      toast.success("User has been restricted");

      setIsBanModalOpen(false);
    } catch (error) {
      toast.error(error || "Action failed");
    }
  };

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald:
      "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
    orange:
      "from-orange-500/40 to-orange-600/5 text-orange-600 border-orange-100",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
    orange:
      "from-orange-300/20 via-orange-500/10 to-transparent text-orange-600 border-orange-200 hover:border-orange-400",
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-2 sm:p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
      <motion.div
        className="@container/main space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col gap-4">
          <div className="flex md:items-center justify-between gap-4">
            <PageHeader
              heading="User Management"
              subheading="Monitor community activity and manage member accounts."
            />
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={exportLoading}
              className={cn(
                "relative h-11 px-4 shadow-md rounded-lg font-semibold transition-all duration-300",
                "bg-green-200 hover:bg-green-100 border-green-500",
                "text-slate-800 hover:text-green-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.15)]",
                "hover:border-indigo-200 active:scale-[0.98]",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 group overflow-hidden"
              )}
            >
              {/* Subtle Inner Glow on Hover */}
              <span className="absolute inset-0 bg-gradient-to-tr from-indigo-50/0 via-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center justify-center">
                {exportLoading ? (
                  <IconLoader2 className="mr-2.5 h-4 w-4 animate-spin text-green-600" />
                ) : (
                  <IconFileExcel
                    width={0}
                    height={0}
                    className="mr-2.5 !h-6 !w-6 text-slate-800 group-hover:text-green-500 transition-colors duration-300"
                  />
                )}

                <span className="tracking-tight">
                  {exportLoading ? "Preparing CSV..." : "Export CSV"}
                </span>
              </div>
            </Button>
          </div>
        </header>

        {/* --- STATS GRID (Staggered) --- */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <StatsGrid stats={stats} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        {/* --- TABLE SECTION --- */}
        <UserDataTables
          columns={userColumns}
          data={items || []}
          rowCount={reduxPagination?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          filters={{
            accountStatus,
            setAccountStatus: (val) => {
              setAccountStatus(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            isPremium,
            setIsPremium: (val) => {
              setIsPremium(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            last24HR,
            setLast24HR: (val) => {
              setLast24HR(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
          isLoading={loading}
          meta={{ onBan: (user) => handleBanClick(user) }}
        />

        {/* --- FLOATING PROGRESS OVERLAY (With AnimatePresence) --- */}
        <AnimatePresence>
          {exportLoading && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="fixed bottom-8 right-8 z-[100]"
            >
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 w-72 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconLoader className="animate-spin h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold uppercase tracking-tight">
                      Exporting Data
                    </span>
                  </div>
                  <span className="text-xs font-mono text-indigo-400">
                    {exportProgress}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${exportProgress}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <BanUserModal
          isOpen={isBanModalOpen}
          onClose={() => setIsBanModalOpen(false)}
          onConfirm={handleBanConfirm}
          userName={selectedUserForBan?.profile?.nickname || "User"}
        />
      </motion.div>
    </div>
  );
}
