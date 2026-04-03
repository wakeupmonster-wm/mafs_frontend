import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  IconAlertTriangle,
  IconBan,
  IconCrown,
  IconLoader,
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
  suspendUserProfile,
} from "../store/user.slice";
import { BanUserModal } from "../components/ban-user-modal";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";
import { SuspendUserModal } from "../components/suspendUserModal";
import { bgMap, colorMap } from "@/constants/colors";
import { Download, Loader2 } from "lucide-react";
import { Container } from "@/components/common/container";

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
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [selectedUserForSuspend, setSelectedUserForSuspend] = useState(null);

  // Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [isPremium, setIsPremium] = useState(undefined);
  const [last24HR, setLast24HR] = useState(undefined);
  const [gender, setGender] = useState("");
  const [isDeactivated, setIsDeactivated] = useState(undefined);
  const [isScheduledForDeletion, setIsScheduledForDeletion] =
    useState(undefined);

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
        link.setAttribute("download", `Keen_Users_${Date.now()}.csv`);
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
          gender,
          isDeactivated,
          isScheduledForDeletion,
        }),
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination,
    globalFilter,
    accountStatus,
    isPremium,
    last24HR,
    gender,
    isDeactivated,
    isScheduledForDeletion,
  ]);

  const handleBanClick = (user) => {
    setSelectedUserForBan(user);
    setIsBanModalOpen(true);
  };

  const handleBanConfirm = async (category, reason) => {
    try {
      await dispatch(
        bannedUserProfile({
          userId: selectedUserForBan?._id,
          category,
          reason,
        }),
      ).unwrap();
      toast.success("User has been restricted");

      setIsBanModalOpen(false);
    } catch (error) {
      toast.error(error || "Action failed");
    }
  };

  const handleSuspendClick = (user) => {
    setSelectedUserForSuspend(user);
    setIsSuspendModalOpen(true);
  };

  const handleSuspendConfirm = async (reason, duration) => {
    try {
      await dispatch(
        suspendUserProfile({
          userId: selectedUserForSuspend?._id,
          reason,
          durationHours: Number(duration),
        }),
      ).unwrap();
      toast.success("User Suspended", {
        description: `Access restricted for ${duration} hours.`,
      });
      setIsSuspendModalOpen(false);
    } catch (err) {
      toast.error(err || "Failed to suspend user");
    }
  };

  return (
    <Container>
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
                "relative h-9 p-4 rounded-md shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white border hover:border-brand-aqua transition-all duration-300",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 group overflow-hidden",
              )}
            >
              <div className="relative flex items-center justify-center">
                {exportLoading ? (
                  <Loader2 className="mr-2.5 h-4 w-4 animate-spin text-brand-aqua" />
                ) : (
                  <Download className="mr-1.5 h-4 w-4" />
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
            gender,
            setGender: (val) => {
              setGender(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            isDeactivated,
            setIsDeactivated: (val) => {
              setIsDeactivated(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            isScheduledForDeletion,
            setIsScheduledForDeletion: (val) => {
              setIsScheduledForDeletion(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
          isLoading={loading}
          meta={{
            onBan: (user) => handleBanClick(user),
            onSuspend: (user) => handleSuspendClick(user),
          }}
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

        <SuspendUserModal
          isOpen={isSuspendModalOpen}
          onClose={() => setIsSuspendModalOpen(false)}
          onConfirm={handleSuspendConfirm}
          userName={selectedUserForSuspend?.profile?.nickname}
        />
      </motion.div>
    </Container>
  );
}
