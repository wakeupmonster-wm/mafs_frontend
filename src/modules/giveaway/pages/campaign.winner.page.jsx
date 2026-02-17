import { getWinnerColumns } from "@/components/columns/winnerColumns";
import WinnerDataTables from "@/components/shared/data-tables/winner.data.table";
import { Award, CheckCircle2, Clock, Layers, Users } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { fetchWinner } from "../store/winner.slice";
import { useDispatch, useSelector } from "react-redux";

export default function CampaignWinnerPage() {
  const dispatch = useDispatch();

  // Selectors
  const {
    winner,
    stats,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.winner);

  // States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 1. Fetch Data
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchWinner({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          status: statusFilter,
        })
      );
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    statusFilter,
  ]);

  const columns = useMemo(() => getWinnerColumns(), []);

  // --- Stats Configuration ---
  const statCards = [
    {
      label: "Total Campaigns",
      value: stats?.totalCampaigns || 0,
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending",
      value: stats?.pending || 0,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Winners",
      value: stats?.withWinner || 0,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Award className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Campaign Winners</h1>
            <p className="text-sm text-gray-500">Track all giveaway results</p>
          </div>
        </div>
      </div>

      {/* STATS BADGES SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all"
          >
            <div className={`p-3 rounded-xl ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {card.label}
              </p>
              <h3 className="text-xl font-bold text-slate-900">
                {loading ? "..." : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden">
        <WinnerDataTables
          columns={columns}
          data={winner || []}
          rowCount={reduxPagination?.total || 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by prize title, phone, email..."
          filters={{
            statusFilter,
            setStatusFilter: (val) => {
              setStatusFilter(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
        />
      </div>

      {/* Confirm Delete Dialog */}
      {/* <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title="Delete Campaign"
        message={`Are you sure you want to delete the campaign for ${confirmDelete.title}?`}
        confirmText="Delete Permanently"
        type="danger" // This usually makes the button red in a reusable ConfirmModal
        loading={loading}
      /> */}
    </div>
  );
}
