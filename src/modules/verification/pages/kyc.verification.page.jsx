import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/common/headSubhead";
import { Badge } from "@/components/ui/badge";
import {
  fetchPendingVerifications,
  verifyUserProfile,
} from "@/modules/verification/store/verfication.slice";
import KYCVerificationDataTable from "@/components/shared/data-tables/kyc.verification.data.table";
import { getKYCColumns } from "@/components/columns/kyc-columns";
import { ImagePreviewModal } from "../components/image.preview.modal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { toast } from "sonner";
import { RejectReasonDialog } from "@/modules/users/components/Dialogs/RejectReasonDialog";
import StatsGrid from "@/components/common/stats.grid";
import {
  IconCircleCheck,
  IconClipboardList,
  IconLoader,
  IconX,
} from "@tabler/icons-react";
import { Container } from "@/components/common/container";
import { bgMap, colorMap } from "@/constants/colors";

// --- Animation Variants ---
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

export default function KYCVerificationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    pendingVerifications,
    loading,
    pagination: reduxPagination,
  } = useSelector((state) => state.verification);

  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [imageModal, setImageModal] = useState({
    open: false,
    images: [], // Changed from 'src' to 'images'
    title: "",
  });

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    userId: null,
    action: "", // 'approve' or 'reject'
    nickname: "",
  });

  const initialFilter = location?.state;

  useEffect(() => {
    if (!initialFilter) return;

    // Reset pagination when a new filter is applied from outside
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));

    if (initialFilter === "Pending") {
      setStatusFilter("pending");
      // setSortBy(undefined);
    }
  }, [initialFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchPendingVerifications({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          status: statusFilter,
          sortBy: sortBy,
        }),
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    statusFilter,
    sortBy,
    globalFilter,
  ]);

  const columns = useMemo(
    () =>
      getKYCColumns(
        (userId, action, nickname) => {
          if (action === "reject") {
            setConfirmConfig({ userId, action, nickname, isOpen: false }); // isOpen false rakhein taaki ConfirmModal na khule
            setIsRejectModalOpen(true);
          } else {
            setConfirmConfig({
              isOpen: true,
              userId,
              action,
              nickname,
            });
          }
        },
        (modalConfig) => setImageModal(modalConfig),
      ),
    [dispatch],
  );

  const handleConfirmAction = (reasonFromModal) => {
    const { userId, action } = confirmConfig;

    // Agar Reject hai toh reason use karein, warna empty
    const finalReason = action === "reject" ? reasonFromModal : "";

    dispatch(
      verifyUserProfile({
        userId,
        action,
        reason: finalReason,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(`User ${action}ed successfully`);
        setConfirmConfig({ ...confirmConfig, isOpen: false });
        setIsRejectModalOpen(false); // Dono modals close kar dein
      })
      .catch((err) => toast.error(err || "Action failed"));
  };

  // 1. Filtered data for the table (Excluding not_started)
  const filteredData = useMemo(() => {
    return (pendingVerifications || []).filter(
      (item) => item.verification?.status !== "not_started",
    );
  }, [pendingVerifications]);

  // 2. Optimized Stats Calculation
  const statsData = useMemo(() => {
    const counts = filteredData.reduce(
      (acc, item) => {
        const status = item.verification?.status;
        // Matching the exact strings from your JSON ("approved", "pending", "rejected")
        if (status === "approved") acc.approve++;
        else if (status === "pending") acc.pending++;
        else if (status === "rejected") acc.reject++;
        return acc;
      },
      { approve: 0, pending: 0, reject: 0 },
    );

    // Total should reflect the filtered count for consistency with the table
    const totalDisplay = reduxPagination?.total || filteredData.length;

    return [
      {
        label: "Total Requests", // "Reports" se change karke "Requests" kiya kyunki ye KYC hai
        val: totalDisplay,
        icon: <IconClipboardList size={22} />,
        color: "blue",
        description: "Active KYC queue",
      },
      {
        label: "Approved",
        val: counts.approve,
        icon: <IconCircleCheck size={22} />,
        color: "emerald",
        description: "Verified users",
      },
      {
        label: "Pending",
        val: counts.pending,
        icon: <IconLoader size={22} className="animate-spin-slow" />,
        color: "amber",
        description: "Waiting for review",
      },
      {
        label: "Rejected",
        val: counts.reject,
        icon: <IconX size={22} />,
        color: "rose",
        description: "Declined requests",
      },
    ];
  }, [filteredData, reduxPagination?.total]);

  // const colorMap = {
  //   blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
  //   emerald:
  //     "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
  //   amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
  //   rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
  //   red: "from-red-500/40 to-red-600/5 text-red-600 border-red-100",
  // };

  // const bgMap = {
  //   blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
  //   emerald:
  //     "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
  //   amber:
  //     "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
  //   rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
  //   red: "from-red-300/20 via-red-500/10 to-transparent text-red-600 border-red-200 hover:border-red-400",
  // };

  return (
    <Container>
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <PageHeader
            heading="KYC Verifications"
            icon={<ShieldCheck className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-brand-aqua/30"
            subheading="Manage user identity documents."
          />
          <Badge
            variant="outline"
            //old   className="bg-brand-aqua/20 border border-brand-aqua text-slate-800 font-semibold gap-2 h-11 px-4 shadow-sm shadow-neutral-400"
            // >
            className="cursor-pointer bg-white hover:bg-brand-aqua text-slate-500 hover:text-white rounded-xl border font-semibold shadow-sm transition-all duration-300 gap-2 h-9 px-3"
          >
            <Users className="mr-0.5 h-4 w-4" strokeWidth={2.5} />
            {reduxPagination?.total ?? 0} Total Requests
          </Badge>
        </header>

        {/* --- STATS GRID (Staggered) --- */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatsGrid stats={statsData} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        <KYCVerificationDataTable
          columns={columns}
          data={filteredData || []}
          rowCount={reduxPagination?.total ?? 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by user, phone, email..."
          filters={{
            statusFilter,
            setStatusFilter: (val) => {
              setStatusFilter(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            sortBy, // Pass sortBy
            setSortBy: (val) => {
              setSortBy(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
          meta={{ setImageModal }} // Yeh add karna zaruri hai
        />
      </motion.div>

      {/* // Add this before the final </div> of your return statement */}
      <ImagePreviewModal
        config={imageModal}
        onClose={() => setImageModal({ ...imageModal, open: false })}
      />

      {/* 1. Normal Confirm Modal (Sirf Approve ke liye ya general alerts) */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={() => handleConfirmAction()} // Approve ke liye no reason needed
        title="Approve KYC?"
        message={`Are you sure you want to approve ${confirmConfig.nickname}?`}
        confirmText="Approve User"
        type="success"
      />

      {/* 2. REJECT REASON DIALOG (Sirf Rejection ke liye) */}
      <RejectReasonDialog
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={(reason) => handleConfirmAction(reason)} // Yahan reason pass ho raha hai
        userName={confirmConfig.nickname}
        isLoading={loading}
      />
    </Container>
  );
}
