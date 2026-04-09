/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconRefresh,
  IconSearch,
  IconFilter,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { fetchSubscribers } from "../store/subscription.slice";
import { getSubscriberColumns } from "../components/subscriber.columns";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";
import { PreLoader } from "@/app/loader/preloader";
import { DataNotFound } from "@/modules/not-found/components/data.not-found";
import { bgMap, colorMap } from "@/constants/colors";
import { RiUserForbidLine } from "react-icons/ri";
import { LuUserRoundCheck, LuUserRound, LuUserRoundCog } from "react-icons/lu";
import { Container } from "@/components/common/container";

// ─── Animation variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3, duration: 0.3 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function SubscriberManagementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    subscribers = [],
    subscribersLoading: loading,
    pagination: serverPagination,
  } = useSelector((state) => state.subscription);

  // ─── Pagination ───
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });

  // ─── Filters ───
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");

  // ─── Sorting ───
  const [sorting, setSorting] = useState([]);

  // ─── Fetch with debounce ───
  useEffect(() => {
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
      if (planFilter) params.planType = planFilter;
      if (platformFilter) params.platform = platformFilter;

      dispatch(fetchSubscribers(params));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination,
    search,
    statusFilter,
    planFilter,
    platformFilter,
    sorting,
  ]);

  // ─── Stats ───
  const stats = useMemo(() => {
    return [
      {
        label: "Total Subscribers",
        val: serverPagination?.total || 0,
        icon: <LuUserRound size={24} strokeWidth={2} />,
        color: "blue",
        description: "All matching subscribers",
      },
      {
        label: "Active",
        val: subscribers.filter((s) => s.status === "ACTIVE" && !s.isExpired)
          .length,
        icon: <LuUserRoundCheck size={24} strokeWidth={2} />,
        color: "emerald",
        description: `Active on page ${pagination.pageIndex + 1}`,
      },
      {
        label: "Revoked Users",
        val: subscribers.filter((s) => s.status !== "ACTIVE" || s.isExpired)
          .length,
        icon: <RiUserForbidLine size={24} />,
        color: "rose",
        description: `Revoked users on page ${pagination.pageIndex + 1}`,
      },
    ];
  }, [subscribers, serverPagination?.total, pagination.pageIndex]);

  // ─── Table columns ───
  const columns = useMemo(() => getSubscriberColumns(navigate), [navigate]);

  // ─── TanStack Table ───
  const table = useReactTable({
    data: subscribers,
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
  const activeFilterCount = [statusFilter, planFilter, platformFilter].filter(
    Boolean,
  ).length;
  const hasActiveFilter = activeFilterCount > 0;

  const clearFilters = () => {
    setStatusFilter("");
    setPlanFilter("");
    setPlatformFilter("");
    setSearch("");
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const getFilterLabel = (type, value) => {
    if (!value) return "";
    if (type === "platform") {
      const map = {
        ios: "iOS",
        android: "Android",
        admin_granted: "Admin Granted",
      };
      return map[value] || value.replace("_", " ");
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Container>
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
              heading="Subscriber Management"
              icon={
                <LuUserRoundCog
                  strokeWidth={2}
                  className="w-9 h-9 text-white animate-pulse"
                />
              }
              color="bg-brand-aqua shadow-brand-aqua/30"
              subheading="Browse, search, and manage all subscribers."
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((prev) => ({ ...prev, pageIndex: 0 }))
              }
              disabled={loading}
              className="h-9 border-slate-300 hover:bg-brand-aqua hover:text-white shadow-sm transition-all duration-300 active:scale-95"
            >
              <IconRefresh
                className={cn("h-4 w-4 mr-1.5", loading && "animate-spin")}
              />
              Refresh
            </Button>
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
                placeholder="Search name, phone, email..."
                className="pl-9 pr-10 bg-white placeholder:text-slate-400 border-slate-200 h-10 shadow-sm focus-visible:ring-brand-aqua rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPagination((p) => ({ ...p, pageIndex: 0 }));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-0.5 bg-brand-aqua/30 hover:bg-brand-aqua transition-colors"
                >
                  <IconX className="h-3.5 w-3.5 text-slate-600 group-hover:text-white transition-colors" />
                </button>
              )}
            </div>

            {/* Filter chips + button */}
            <div className="flex items-center justify-end gap-3 min-w-0 flex-1 ml-4 order-2">
              {/* Active filter chips */}
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
                        variant="outline"
                        // className="p-2 gap-1 bg-emerald-100 border-dashed border-emerald-400 text-emerald-700 shadow-sm whitespace-nowrap"
                        className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                      >
                        {/* <span className="text-[10px] font-bold uppercase opacity-50">
                          Status:
                        </span> */}
                        <span className="font-semibold text-xs">
                          {getFilterLabel("status", statusFilter)}
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

                  {planFilter && (
                    <motion.div
                      key="plan-chip"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="shrink-0"
                    >
                      <Badge
                        variant="outline"
                        // className="p-2 gap-1 bg-indigo-100 border-dashed border-indigo-400 text-indigo-700 shadow-sm whitespace-nowrap"
                        className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                      >
                        {/* <span className="text-[10px] font-bold uppercase opacity-50">
                          Plan:
                        </span> */}
                        <span className="font-semibold text-xs">
                          {getFilterLabel("plan", planFilter)}
                        </span>
                        <button
                          onClick={() => {
                            setPlanFilter("");
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

                  {platformFilter && (
                    <motion.div
                      key="platform-chip"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="shrink-0"
                    >
                      <Badge
                        variant="outline"
                        // className="p-2 gap-1 bg-blue-100 border-dashed border-blue-400 text-blue-700 shadow-sm whitespace-nowrap"
                        className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                      >
                        {/* <span className="text-[10px] font-bold uppercase opacity-50">
                          Platform:
                        </span> */}
                        <span className="font-semibold text-xs">
                          {getFilterLabel("platform", platformFilter)}
                        </span>
                        <button
                          onClick={() => {
                            setPlatformFilter("");
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
                      className={cn(
                        "h-9 group shadow-sm bg-white hover:bg-brand-aqua text-sm font-normal hover:font-medium text-slate-500 hover:text-white whitespace-nowrap transition-all duration-300",
                        hasActiveFilter &&
                          "border-brand-aqua ring-[0.1px] ring-brand-aqua focus-visible:ring-0",
                      )}
                    >
                      <IconFilter
                        strokeWidth={2}
                        className={cn(
                          "h-6 w-6",
                          hasActiveFilter
                            ? "text-brand-aqua group-hover:text-white"
                            : "text-slate-500/80 group-hover:text-white",
                        )}
                      />
                      Filters
                      {hasActiveFilter && (
                        <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-aqua group-hover:bg-slate-50 text-[10px] text-white group-hover:text-brand-aqua font-bold group-hover:font-black">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 p-2 shadow-xl border-slate-200"
                  >
                    {/* Status */}
                    <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Status
                    </DropdownMenuLabel>
                    {["ACTIVE", "CANCELLED", "REVOKED"].map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={statusFilter === status}
                        onCheckedChange={() => {
                          setStatusFilter(
                            statusFilter === status ? "" : status,
                          );
                          setPagination((p) => ({ ...p, pageIndex: 0 }));
                        }}
                        className="py-1"
                      >
                        {getFilterLabel("status", status)}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />

                    {/* Plan */}
                    <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Plan Type
                    </DropdownMenuLabel>
                    {["MONTHLY", "QUARTERLY", "YEARLY"].map((plan) => (
                      <DropdownMenuCheckboxItem
                        key={plan}
                        checked={planFilter === plan}
                        onCheckedChange={() => {
                          setPlanFilter(planFilter === plan ? "" : plan);
                          setPagination((p) => ({ ...p, pageIndex: 0 }));
                        }}
                        className="py-1"
                      >
                        {getFilterLabel("plan", plan)}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />

                    {/* Platform */}
                    <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Platform
                    </DropdownMenuLabel>
                    {[
                      { value: "ios", label: "iOS" },
                      { value: "android", label: "Android" },
                      { value: "admin_granted", label: "Admin Granted" },
                    ].map((p) => (
                      <DropdownMenuCheckboxItem
                        key={p.value}
                        checked={platformFilter === p.value}
                        onCheckedChange={() => {
                          setPlatformFilter(
                            platformFilter === p.value ? "" : p.value,
                          );
                          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                        }}
                        className="py-1"
                      >
                        {p.label}
                      </DropdownMenuCheckboxItem>
                    ))}

                    {hasActiveFilter && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 justify-center font-medium focus:bg-red-50 focus:text-red-700 cursor-pointer"
                          onClick={clearFilters}
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
            <Table>
              <TableHeader className="bg-slate-50/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs"
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
                        <TableCell key={cell.id} className="py-2.5">
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
                        <DataNotFound message="No subscribers found" />
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
              Showing {subscribers.length} of {serverPagination?.total || 0}{" "}
              subscribers
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
                    {[10, 15, 20, 50, 100].map((size) => (
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
                  disabled={
                    !serverPagination?.hasPrevPage && pagination.pageIndex === 0
                  }
                >
                  <IconChevronLeft size={14} />
                </Button>
                <div className="text-xs font-semibold px-2">
                  {serverPagination?.page || pagination.pageIndex + 1} /{" "}
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
      </motion.div>
    </Container>
  );
}
