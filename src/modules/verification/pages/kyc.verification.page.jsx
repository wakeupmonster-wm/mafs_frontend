import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ShieldCheck } from "lucide-react";
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

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
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

  const [imageModal, setImageModal] = useState({
    open: false,
    src: "",
    title: "",
  });

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    userId: null,
    action: "", // 'approve' or 'reject'
    nickname: "",
  });

  const initialFilter = location?.state;

  // console.log("initialFilter: ", initialFilter);

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
        })
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
          // Instead of dispatching immediately, open the modal
          setConfirmConfig({
            isOpen: true,
            userId,
            action,
            nickname,
          });
        },
        (modalConfig) => setImageModal(modalConfig)
      ),
    [dispatch]
  );

  const handleConfirmAction = () => {
    const { userId, action } = confirmConfig;

    dispatch(
      verifyUserProfile({
        userId,
        action,
        reason:
          action === "reject" ? "Documents did not meet requirements" : "",
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`User ${action}ed successfully`);
        setConfirmConfig({ ...confirmConfig, isOpen: false });
      })
      .catch((err) => toast.error(err || "Action failed"));
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
            heading="KYC Verifications"
            icon={<ShieldCheck className="w-9 h-9 text-white animate-pulse" />}
            color="bg-brand-aqua shadow-brand-aqua/30"
            subheading="Manage user identity documents."
          />
          <Badge
            variant="secondary"
            className="h-7 px-3 bg-slate-900 text-white"
          >
            {reduxPagination?.total || 0} Total Requests
          </Badge>
        </header>

        <KYCVerificationDataTable
          columns={columns}
          data={pendingVerifications || []}
          rowCount={reduxPagination?.total || 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by nickname, email..."
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
        />
      </motion.div>

      {/* // Add this before the final </div> of your return statement */}
      <ImagePreviewModal
        config={imageModal}
        onClose={() => setImageModal({ ...imageModal, open: false })}
      />

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={
          confirmConfig.action === "approve" ? "Approve KYC?" : "Reject KYC?"
        }
        message={
          confirmConfig.action === "approve"
            ? `Are you sure you want to approve ${confirmConfig.nickname}? This will verify their profile across the platform.`
            : `Are you sure you want to reject ${confirmConfig.nickname}? They will need to re-upload their documents.`
        }
        confirmText={
          confirmConfig.action === "approve" ? "Approve User" : "Reject User"
        }
        type={confirmConfig.action === "approve" ? "success" : "danger"}
      />
    </div>
  );
}
