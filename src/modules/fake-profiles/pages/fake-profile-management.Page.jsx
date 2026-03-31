import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  IconUsers,
  IconUserCheck,
  IconUserOff,
  IconUsersPlus,
  IconRefresh,
  IconSearch,
  IconFilter,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";
import { PreLoader } from "@/app/loader/preloader";
import { DataNotFound } from "@/modules/not-found/components/data.not-found";
import ConfirmModal from "@/components/common/ConfirmModal";
import {
  fetchFakeProfiles,
  bulkCreateFakeProfiles,
  toggleFakeProfileStatus,
  deleteFakeProfile,
} from "../store/fake-profile.slice";
import { fakeProfileColumns } from "../components/fake-profile-columns";
import { BulkCreateModal } from "../components/bulk-create-modal";

// ─── Animation variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function FakeProfileManagementPage() {
  const dispatch = useDispatch();
  const {
    items = [],
    pagination: serverPagination,
    loading,
    bulkLoading,
  } = useSelector((state) => state.fakeProfiles);

  // ─── Local UI State ───
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // ─── Pagination ───
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // ─── Filters ───
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ─── Sorting ───
  const [sorting, setSorting] = useState([]);

  // ─── Fetch with debounce (same pattern as user-management) ───
  useEffect(() => {
    // Optional: If you want search to reset pagination, do it ONLY if pageIndex is NOT already 0
    if (search && pagination.pageIndex !== 0) {
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }

    const delayDebounceFn = setTimeout(() => {
      const params = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (sorting.length > 0) {
        const sortMap = {
          user: "nickname",
          gender: "gender",
          city: "city",
          status: "accountStatus",
          createdAt: "createdAt",
        };
        params.sortBy = sortMap[sorting[0].id] || "createdAt";
        params.sortOrder = sorting[0].desc ? "desc" : "asc";
      }

      dispatch(fetchFakeProfiles(params));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, pagination, search, statusFilter, sorting]);

  // ─── Stats ───
  const stats = useMemo(() => {
    return [
      {
        label: "Total Profiles",
        val: serverPagination?.total || 0,
        icon: <IconUsers size={22} />,
        color: "blue",
        description: "All matching profiles",
      },
      {
        label: "Active Users",
        val: items.filter((u) => u.user?.account?.status === "active").length,
        icon: <IconUserCheck size={22} />,
        color: "emerald",
        description: `Active Users on page ${pagination.pageIndex + 1}`,
      },
      {
        label: "Deactivated Users",
        val: items.filter((u) => u.user?.account?.status !== "active").length,
        icon: <IconUserOff size={22} />,
        color: "rose",
        description: `Deactivated Users on page ${pagination.pageIndex + 1}`,
      },
    ];
  }, [items, serverPagination?.total, pagination.pageIndex]);

  // ─── Handlers ───
  const handleToggleStatus = async (id) => {
    if (!id) {
      toast.error("Invalid profile ID");
      return;
    }
    try {
      const result = await dispatch(toggleFakeProfileStatus(id)).unwrap();
      toast.success(result.message || "Profile status updated");
    } catch (error) {
      toast.error(error || "Failed to update status");
    }
  };

  const handleDeleteClick = (id) => {
    if (!id) {
      toast.error("Invalid profile ID");
      return;
    }
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await dispatch(deleteFakeProfile(deleteTargetId)).unwrap();
      toast.success(result.message || "Fake profile deleted");
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      toast.error(error || "Failed to delete profile");
    }
  };

  const handleBulkCreate = async (payload) => {
    try {
      await dispatch(bulkCreateFakeProfiles(payload)).unwrap();
      toast.success(`${payload.count} fake profiles created successfully`);
      setIsBulkModalOpen(false);
      // Reset to first page to see new profiles
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } catch (error) {
      toast.error(error || "Failed to create profiles");
    }
  };

  // ─── Table columns ───
  const columns = useMemo(
    () => fakeProfileColumns(handleToggleStatus, handleDeleteClick),
    [],
  );

  // ─── TanStack Table ───
  const table = useReactTable({
    data: items,
    columns,
    rowCount: serverPagination?.total ?? 0,
    onSortingChange: (updater) => {
      setSorting(updater);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
    manualSorting: false,
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: { sorting, pagination },
  });

  // ─── Has active filter ───
  const hasActiveFilter = !!statusFilter;

  // ─── Color maps ───
  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald:
      "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-2 sm:p-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 pb-8 relative">
      <motion.div
        className="@container/main space-y-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ─── HEADER ─── */}
        <motion.header variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex md:items-center justify-between gap-3">
            <PageHeader
              heading="Fake Profile Management"
              subheading="Create and manage simulated member accounts."
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                }
                disabled={loading}
                className="h-9 group shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white transition-all active:scale-95"
              >
                <IconRefresh
                  className={cn("h-4 w-4 mr-0.5", loading && "animate-spin")}
                />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsBulkModalOpen(true)}
                className="h-9 group shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white transition-all active:scale-95"
              >
                <IconUsersPlus className="mr-0.5 h-4 w-4 text-slate-500 group-hover:text-white" />
                Bulk Create
              </Button>
            </div>
          </div>
        </motion.header>

        {/* ─── STATS GRID ─── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <StatsGrid stats={stats} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        {/* ─── TOOLBAR (Search + Filters) ─── */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-row md:items-center justify-between gap-3 bg-slate-50/50 p-2 rounded-xl">
            {/* Search */}
            <div className="relative w-80 lg:w-96 order-1">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 z-10" />
              <Input
                placeholder="Search by nickname, city..."
                // className="pl-9 pr-10 bg-white border-slate-200 h-9 shadow-sm focus-visible:ring-brand-aqua rounded-lg text-sm"
                className="pl-9 pr-10 bg-white border-slate-200 h-10 placeholder:text-slate-400 shadow-sm focus-visible:ring-brand-aqua rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-1 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <IconX className="h-3.5 w-3.5 text-slate-500" />
                </button>
              )}
            </div>

            {/* Filter chips + button */}
            <div className="flex items-center justify-end gap-3 min-w-0 flex-1 ml-4 order-2">
              {/* Active filter chip */}
              <div className="hidden sm:flex flex-1 items-center justify-end gap-1.5 overflow-x-hidden min-w-0">
                <AnimatePresence mode="popLayout">
                  {statusFilter && (
                    <motion.div
                      key="status-chip"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="shrink-0"
                    >
                      <Badge
                        variant="secondary"
                        // className="p-2 gap-1 bg-indigo-100 border-dashed border-indigo-400 text-indigo-700 shadow-sm whitespace-nowrap"
                        className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                      >
                        {/* <span className="text-[10px] font-bold uppercase opacity-50">
                          Status:
                        </span> */}
                        <span className="capitalize text-xs">
                          {statusFilter}
                        </span>
                        <button
                          onClick={() => {
                            setStatusFilter("");
                            setPagination((p) => ({ ...p, pageIndex: 0 }));
                          }}
                          // className="ml-1 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                          className="ml-0.5 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
                        >
                          <IconX size={10} />
                        </button>
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hasActiveFilter && (
                <div className="hidden sm:block w-0.5 h-6 bg-slate-200 shrink-0" />
              )}

              {/* Filter dropdown */}
              <div className="shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      // size="sm"
                      className={cn(
                        "h-9 group shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white whitespace-nowrap transition-all duration-300",
                        hasActiveFilter && "border-brand-aqua",
                      )}
                    >
                      <IconFilter
                        strokeWidth={2.5}
                        className={cn(
                          "h-6 w-6",
                          hasActiveFilter
                            ? "text-brand-aqua group-hover:text-white"
                            : "text-slate-500/80 group-hover:text-white",
                        )}
                      />
                      Filters
                      {hasActiveFilter && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-aqua group-hover:bg-white text-[10px] text-white group-hover:text-brand-aqua font-bold">
                          1
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 p-2 shadow-xl border-slate-200"
                  >
                    <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Account Status
                    </DropdownMenuLabel>
                    {["active", "deactivated"].map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        className="capitalize"
                        checked={statusFilter === status}
                        onCheckedChange={() => {
                          setStatusFilter(
                            statusFilter === status ? "" : status,
                          );
                          setPagination((p) => ({ ...p, pageIndex: 0 }));
                        }}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {hasActiveFilter && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 justify-center font-medium focus:bg-red-50 focus:text-red-700 cursor-pointer"
                          onClick={() => {
                            setStatusFilter("");
                            setPagination((p) => ({ ...p, pageIndex: 0 }));
                          }}
                        >
                          Clear All Filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── DATA TABLE ─── */}
        <motion.div variants={itemVariants}>
          <div className="block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden relative min-h-[400px]">
            {loading && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                <PreLoader />
              </div>
            )}
            <Table>
              <TableHeader className="bg-slate-50/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-4"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-slate-50/50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2.5 px-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-56 text-center"
                    >
                      {!loading && (
                        <DataNotFound message="No fake profiles found" />
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* ─── PAGINATION ─── */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-row items-center justify-between gap-3 py-2 border-t border-slate-100 px-3 md:px-0">
            <div className="text-xs font-medium text-slate-500">
              Showing {items.length} of {serverPagination?.total || 0} profiles
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <Label className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase">
                  Rows
                </Label>
                <Select
                  value={`${pagination.pageSize}`}
                  onValueChange={(value) => {
                    setPagination({ pageIndex: 0, pageSize: Number(value) });
                  }}
                >
                  <SelectTrigger className="h-7 w-[65px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 50, 100].map((size) => (
                      <SelectItem key={size} value={`${size}`}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex - 1,
                    }))
                  }
                  disabled={!serverPagination?.hasPrevPage}
                >
                  <IconChevronLeft size={14} />
                </Button>
                <div className="text-xs font-semibold px-2">
                  {serverPagination?.page || 1} /{" "}
                  {serverPagination?.totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex + 1,
                    }))
                  }
                  disabled={!serverPagination?.hasNextPage}
                >
                  <IconChevronRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── MODALS ─── */}
        <BulkCreateModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          onConfirm={handleBulkCreate}
        />

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteTargetId(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Fake Profile?"
          message="This action is permanent and cannot be undone. The profile will be completely removed from the system."
          confirmText="Delete Permanently"
          type="danger"
        />
      </motion.div>
    </div>
  );
}
