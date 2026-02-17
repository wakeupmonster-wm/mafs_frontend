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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchMyTickets({
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

  const columns = useMemo(() => supportColumns(navigate), [navigate]);

  const handleActionSubmit = async () => {
    if (!reply.trim()) return;

    try {
      const resultAction = await dispatch(
        adminReplyToTicket({
          ticketId: selectedTicket._id,
          reply: reply,
          status: statusUpdate,
        })
      );

      if (adminReplyToTicket.fulfilled.match(resultAction)) {
        setReply("");
        setSelectedTicket(null);

        dispatch(
          fetchMyTickets({ page: pagination.page, limit: pagination.limit })
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
            heading="Support Management"
            icon={<Inbox className="w-9 h-9 text-white animate-pulse" />}
            color="bg-red-500 shadow-red-500/20"
            subheading="Track and manage customer queries."
          />
        </header>

        <SupportTicketsDataTables
          columns={columns}
          data={tickets || []}
          rowCount={reduxPagination?.total || 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search..."
          filters={{
            statusFilter,
            setStatusFilter: (val) => {
              setStatusFilter(val),
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
          meta={{
            setSelectedTicket: (ticket) => setSelectedTicket(ticket),
            setConfirmConfig, // Pass this to the columns
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
    </div>
  );
}
