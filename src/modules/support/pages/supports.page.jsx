import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { Inbox } from "lucide-react";
import SupportTicketsDataTables from "@/components/shared/data-tables/support.ticket.data.table";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  adminReplyToTicket,
  clearSupportStatus,
  fetchMyTickets,
} from "../store/support.slice";
import { supportColumns } from "@/components/columns/support.columns";
import { TicketAction } from "../components/dialogs/tickets.action";
import ConfirmModal from "@/components/common/ConfirmModal";
import { ImagePreviewModal } from "../components/image.preview.modal";
import {
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconLoaderQuarter,
  IconTicket,
} from "@tabler/icons-react";
import StatsGrid from "@/components/common/stats.grid";
import { bgMap, colorMap } from "@/constants/colors";
import { Container } from "@/components/common/container";

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

export default function SupportTicketsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    tickets,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.support);

  // 2. Local Filter/Pagination State
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [reply, setReply] = useState("");

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    ticketId: null,
    nickname: "",
  });

  const [imageModal, setImageModal] = useState({
    open: false,
    src: "",
    title: "",
  });

  // --- Optimized Stats Calculation ---
  const ticketStats = useMemo(() => {
    return [
      {
        label: "Total Tickets",
        val: reduxPagination?.total || 0,
        icon: <IconTicket size={22} />, // Represents the whole collection
        color: "blue",
        description: "All tickets in system",
      },
      {
        label: "Open",
        val: tickets.filter((u) => u.status === "open").length,
        icon: <IconExclamationCircle size={22} />, // Represents something needing attention
        color: "indigo",
        description: "Awaiting assignment",
      },
      {
        label: "In Progress",
        val: tickets.filter((u) => u.status === "in_progress").length,
        icon: <IconLoaderQuarter size={22} />, // Represents active work
        color: "emerald",
        description: "Currently being handled",
      },
      {
        label: "Resolved",
        val: tickets.filter((u) => u.status === "resolved").length,
        icon: <IconCircleCheck size={22} />, // Represents successful completion
        color: "amber",
        description: "Fixed, pending closure",
      },
      {
        label: "Closed",
        val: tickets.filter((u) => u.status === "closed").length,
        icon: <IconCircleX size={22} />, // Represents finalized/archived
        color: "rose",
        description: "Finalized tickets",
      },
    ];
  }, [tickets, reduxPagination?.total]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchMyTickets({
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
    if (initialFilter === "Tickets") setStatusFilter("open");
  }, [location?.state]);

  useEffect(() => {
    if (selectedTicket) {
      setStatusUpdate(selectedTicket.status);
      setReply(""); // Clear previous reply
    }
  }, [selectedTicket]);

  const columns = useMemo(
    () =>
      supportColumns(
        (modalConfig) => setImageModal(modalConfig), // Ye second parameter hai
      ),
    [], // Dependencies: Sirf navigate agar setImageModal stable hai
  );

  const handleActionSubmit = async () => {
    if (!reply.trim()) return;

    try {
      const resultAction = await dispatch(
        adminReplyToTicket({
          ticketId: selectedTicket._id,
          reply: reply,
          status: statusUpdate,
        }),
      );

      if (adminReplyToTicket.fulfilled.match(resultAction)) {
        setReply("");
        setSelectedTicket(null);

        dispatch(
          fetchMyTickets({ page: pagination.page, limit: pagination.limit }),
        );

        setTimeout(() => dispatch(clearSupportStatus()), 3000);
      }
    } catch (error) {
      console.error("Failed to update ticket:", error);
    }
  };

  const handleConfirmAction = async () => {
    console.log("Deleting ticket:", confirmConfig.ticketId);
    // Dispatch your delete action here:
    // await dispatch(deleteTicket(confirmConfig.ticketId));
    // Close modal after action
    setConfirmConfig({ ...confirmConfig, isOpen: false });
  };

  // const colorMap = {
  //   blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
  //   indigo:
  //     "from-indigo-500/40 to-indigo-600/5 text-indigo-600 border-indigo-100",
  //   emerald:
  //     "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
  //   amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
  //   rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
  //   orange:
  //     "from-orange-500/40 to-orange-600/5 text-orange-600 border-orange-100",
  // };

  // const bgMap = {
  //   blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
  //   indigo:
  //     "from-indigo-300/20 via-indigo-500/10 to-transparent text-indigo-600 border-indigo-200 hover:border-indigo-400",
  //   emerald:
  //     "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
  //   amber:
  //     "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
  //   rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
  //   orange:
  //     "from-orange-300/20 via-orange-500/10 to-transparent text-orange-600 border-orange-200 hover:border-orange-400",
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
            heading="Support Management"
            icon={<Inbox className="w-9 h-9 text-white animate-pulse" />}
            color="bg-red-500 shadow-red-500/20"
            subheading="Track and manage customer queries."
          />
        </header>

        {/* --- STATS GRID (Staggered) --- */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <StatsGrid stats={ticketStats} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        <SupportTicketsDataTables
          columns={columns}
          data={tickets || []}
          rowCount={reduxPagination?.total ?? 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by name, contact, email, subject..."
          filters={{
            statusFilter,
            setStatusFilter: (val) => {
              (setStatusFilter(val),
                setPagination((prev) => ({ ...prev, pageIndex: 0 })));
            },
          }}
          meta={{
            setSelectedTicket: (ticket) => setSelectedTicket(ticket),
            setConfirmConfig, // Pass this to the columns
            setImageModal: (config) => setImageModal(config),
          }}
        />

        <TicketAction
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          statusUpdate={statusUpdate}
          setStatusUpdate={setStatusUpdate}
          reply={reply}
          setReply={setReply}
          handleActionSubmit={handleActionSubmit}
          loading={loading}
        />
      </motion.div>

      {/* // Add this before the final </div> of your return statement */}
      <ImagePreviewModal
        config={imageModal}
        onClose={() => setImageModal({ ...imageModal, open: false })}
      />

      {/* Updated ConfirmModal UI */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={"Delete Ticket?"}
        message={`Are you sure you want to delete the ticket from ${confirmConfig.nickname}? This action is permanent and cannot be undone.`}
        confirmText={"Delete Permanently"}
        type={"danger"}
      />
    </Container>
  );
}
