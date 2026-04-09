import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Download,
  Loader2,
} from "lucide-react";
import {
  IconRefresh,
  IconSearch,
  IconFilter,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconReceipt,
  IconCurrencyDollar,
  IconArrowBackUp,
  IconReportMoney,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  getTransactionsAPI,
  getTransactionSummaryAPI,
  exportTransactionsCSVAPI,
} from "../services/subscription.services";
import StatsGrid from "@/components/common/stats.grid";
import { PreLoader } from "@/app/loader/preloader";
import { DataNotFound } from "@/modules/not-found/components/data.not-found";
import {
  EVENT_TYPE_MAP,
  PLATFORM_MAP,
  STATUS_MAP,
} from "@/constants/transection.config";
import { bgMap, colorMap } from "@/constants/colors";
import { Container } from "@/components/common/container";
import { TbTransactionDollar } from "react-icons/tb";

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

export default function TransactionsPage() {
  // Data states
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [sortBy, setSortBy] = useState("occurredAt");
  const [sortOrder, setSortOrder] = useState("desc");

  /* ───── Fetch Transactions ───── */
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit, sortBy, sortOrder };
      if (search) params.search = search;
      if (eventTypeFilter) params.eventType = eventTypeFilter;
      if (platformFilter) params.platform = platformFilter;
      const res = await getTransactionsAPI(params);
      if (res?.success) {
        setTransactions(res.transactions || []);
        setPagination(res.pagination || {});
      }
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [search, eventTypeFilter, platformFilter, page, limit, sortBy, sortOrder]);

  /* ───── Fetch Summary ───── */
  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const res = await getTransactionSummaryAPI();
      if (res?.success) setSummary(res.data);
    } catch (err) {
      console.error("Summary error:", err);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => fetchTransactions(), 400);
    return () => clearTimeout(delay);
  }, [fetchTransactions]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  /* ───── CSV Export ───── */
  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await exportTransactionsCSVAPI({
        eventType: eventTypeFilter,
        platform: platformFilter,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("CSV exported successfully!");
    } catch (err) {
      toast.error("Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  /* ───── Sort Handler ───── */
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column)
      return <ArrowUpDown className="w-3 h-3 ml-1 text-slate-300" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-3 h-3 ml-1 text-brand-aqua" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1 text-brand-aqua" />
    );
  };

  /* ───── Filter helpers ───── */
  const activeFilterCount = [eventTypeFilter, platformFilter].filter(
    Boolean,
  ).length;
  const hasActiveFilter = activeFilterCount > 0;

  const clearFilters = () => {
    setEventTypeFilter("");
    setPlatformFilter("");
    setSearch("");
    setPage(1);
  };

  const overview = summary?.overview;
  const refunds = summary?.refunds;

  /* ───── Stats ───── */
  const stats = useMemo(
    () => [
      {
        label: "Gross Revenue",
        val: summaryLoading
          ? "..."
          : `$${overview?.grossRevenue?.toFixed(2) || "0.00"}`,
        icon: <IconCurrencyDollar size={22} />,
        color: "blue",
        description: overview?.currency || "AUD",
      },
      {
        label: "Net Revenue",
        val: summaryLoading
          ? "..."
          : `$${overview?.netRevenue?.toFixed(2) || "0.00"}`,
        icon: <IconReportMoney size={22} />,
        color: "emerald",
        description: `Commission: $${overview?.totalCommission?.toFixed(2) || "0.00"}`,
      },
      {
        label: "Refund Rate",
        val: summaryLoading ? "..." : refunds?.refundRate || "0%",
        icon: <IconArrowBackUp size={22} />,
        color: refunds && !refunds.isHealthy ? "rose" : "emerald",
        description: `${refunds?.totalRefunds || 0} refunds · $${refunds?.totalRefundAmount?.toFixed(2) || "0.00"}`,
      },
      {
        label: "Total Transactions",
        val: loading ? "..." : pagination.totalItems?.toLocaleString() || "0",
        icon: <IconReceipt size={22} />,
        color: "blue",
        description: `Page ${pagination.currentPage} of ${pagination.totalPages}`,
      },
    ],
    [summary, summaryLoading, loading, pagination, overview, refunds],
  );

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
              heading="Transactions"
              icon={
                <TbTransactionDollar
                  strokeWidth={2}
                  className="w-9 h-9 text-white animate-pulse"
                />
              }
              color="bg-brand-aqua shadow-brand-aqua/30"
              subheading="Revenue tracking, transaction history & export."
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPage(1);
                  fetchTransactions();
                }}
                disabled={loading}
                className="h-9 border-slate-200 bg-slate-50 hover:bg-brand-aqua text-muted-foreground hover:text-white transition-all active:scale-95"
              >
                <IconRefresh
                  className={cn("h-4 w-4 mr-1.5", loading && "animate-spin")}
                />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={handleExport}
                disabled={exporting}
                className="h-9 border-slate-200 bg-slate-50 hover:bg-brand-aqua text-muted-foreground hover:text-white transition-all active:scale-95"
              >
                {exporting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                ) : (
                  <Download className="mr-1.5 h-4 w-4" />
                )}
                Export CSV
              </Button>
            </div>
          </div>
        </motion.header>

        {/* ─── STATS GRID ─── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatsGrid stats={stats} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        {/* ─── TOOLBAR (Search + Filters) ─── */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-row md:items-center justify-between gap-3 bg-slate-50/50 py-2 rounded-xl">
            {/* Search */}
            <div className="relative w-3/5 md:w-1/3">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                placeholder="Search by email, name, txn ID..."
                className="pl-9 pr-10 bg-white border-slate-200 h-10 shadow-sm focus-visible:ring-brand-aqua rounded-lg"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-0.5 bg-brand-aqua/30 hover:bg-brand-aqua transition-colors"
                >
                  <IconX className="h-3.5 w-3.5 text-slate-600 group-hover:text-white transition-colors" />
                </button>
              )}
            </div>

            {/* Filter chips + button */}
            <div className="flex items-center justify-end gap-2 min-w-0 flex-1 ml-3">
              {/* Active filter chips */}
              <div className="hidden sm:flex flex-1 items-center justify-end gap-1.5 overflow-x-hidden min-w-0">
                <AnimatePresence mode="popLayout">
                  {eventTypeFilter && (
                    <motion.div
                      key="event-chip"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="shrink-0"
                    >
                      <Badge
                        variant="secondary"
                        // className="p-2 gap-1 bg-violet-100 border-dashed border-violet-400 text-violet-700 shadow-sm whitespace-nowrap"
                        className="h-6 px-2 gap-1 bg-sky-50 border-sky-300 text-sky-700 whitespace-nowrap"
                      >
                        {/* <span className="text-[10px] font-bold uppercase opacity-50">
                          Type:
                        </span> */}
                        <span className="capitalize text-[10px] font-semibold">
                          {EVENT_TYPE_MAP[eventTypeFilter]?.label ||
                            eventTypeFilter}
                        </span>
                        <button
                          onClick={() => {
                            setEventTypeFilter("");
                            setPage(1);
                          }}
                          className="ml-0.5 p-0.5 rounded-full hover:bg-purple-200 transition-colors"
                        >
                          <IconX size={9} />
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
                        variant="secondary"
                        // className="p-2 gap-1 bg-blue-100 border-dashed border-blue-400 text-blue-700 shadow-sm whitespace-nowrap"
                        className="h-6 px-2 gap-1 bg-slate-50 border-slate-300 text-slate-600 whitespace-nowrap"
                      >
                        {/* <span className="text-[10px] font-bold uppercase opacity-50">
                          Platform:
                        </span> */}
                        <span className="capitalize text-[10px] font-semibold">
                          {PLATFORM_MAP[platformFilter] || platformFilter}
                        </span>
                        <button
                          onClick={() => {
                            setPlatformFilter("");
                            setPage(1);
                          }}
                          className="ml-0.5 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                        >
                          <IconX size={9} />
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
                        strokeWidth={2.5}
                        className={cn(
                          "h-5 w-5",
                          hasActiveFilter
                            ? "text-brand-aqua group-hover:text-white"
                            : "text-slate-500/80 group-hover:text-white",
                        )}
                      />
                      Filters
                      {hasActiveFilter && (
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-aqua group-hover:bg-white text-[8px] text-white group-hover:text-brand-aqua font-bold">
                          {activeFilterCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 p-2 shadow-xl border-slate-200"
                  >
                    {/* Event Type */}
                    <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      Event Type
                    </DropdownMenuLabel>
                    {[
                      "PURCHASE",
                      "RENEW",
                      "REFUND",
                      "CANCEL",
                      "CONSUMABLE_PURCHASE",
                      "ADMIN_GRANT",
                    ].map((type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={eventTypeFilter === type}
                        onCheckedChange={() => {
                          setEventTypeFilter(
                            eventTypeFilter === type ? "" : type,
                          );
                          setPage(1);
                        }}
                      >
                        {EVENT_TYPE_MAP[type]?.label || type}
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
                      { value: "admin_granted", label: "Admin" },
                    ].map((p) => (
                      <DropdownMenuCheckboxItem
                        key={p.value}
                        checked={platformFilter === p.value}
                        onCheckedChange={() => {
                          setPlatformFilter(
                            platformFilter === p.value ? "" : p.value,
                          );
                          setPage(1);
                        }}
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
            {loading && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-start justify-center pt-32">
                <PreLoader />
              </div>
            )}
            <Table>
              <TableHeader className="bg-slate-200/50">
                <TableRow>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4 w-[60px]">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      Sr.No.
                    </span>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4">
                    <button
                      onClick={() => handleSort("occurredAt")}
                      className="flex items-center text-[11px] font-black tracking-wide text-muted-foreground hover:text-brand-aqua transition-colors"
                    >
                      Date <SortIcon column="occurredAt" />
                    </button>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4 hidden sm:table-cell">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      User
                    </span>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4 hidden lg:table-cell">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      Product
                    </span>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      Type
                    </span>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4">
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center text-[11px] font-black tracking-wide text-muted-foreground hover:text-brand-aqua transition-colors"
                    >
                      Amount <SortIcon column="amount" />
                    </button>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4 hidden sm:table-cell">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      Platform
                    </span>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      Status
                    </span>
                  </TableHead>
                  <TableHead className="text-slate-700 font-semibold h-9 bg-slate-100 text-xs px-2 md:px-4 hidden lg:table-cell w-[180px]">
                    <span className="text-[11px] font-black tracking-wide text-muted-foreground">
                      Txn ID
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((txn, index) => {
                    const eventConfig = EVENT_TYPE_MAP[txn.eventType] || {
                      label: txn.eventType,
                      color: "bg-slate-100 text-slate-600 border-slate-200",
                    };
                    const status =
                      txn.status ||
                      (txn.eventType === "REFUND"
                        ? "REFUNDED"
                        : txn.eventType === "CANCEL"
                          ? "FAILED"
                          : "SUCCESS");
                    const statusClass =
                      STATUS_MAP[status] || STATUS_MAP.PENDING;
                    const serialNo =
                      (pagination.currentPage - 1) * (limit || 15) + index + 1;

                    return (
                      <TableRow
                        key={txn._id}
                        className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors"
                      >
                        <TableCell className="px-2 md:px-4 py-2.5">
                          <span className="text-[11px] font-black">
                            {serialNo}
                          </span>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              {txn.date || txn.occurredAt
                                ? new Date(
                                    txn.date || txn.occurredAt,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "—"}
                            </p>
                            <p className="text-[9px] text-slate-400 font-mono">
                              {txn.date || txn.occurredAt
                                ? new Date(
                                    txn.date || txn.occurredAt,
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5 hidden sm:table-cell">
                          <div className="max-w-[130px]">
                            <p
                              className="text-xs font-bold text-slate-800 truncate"
                              title={
                                txn.user?.nickname ||
                                txn.user?.email ||
                                "Unknown"
                              }
                            >
                              {txn.user?.nickname || txn.user?.email || "—"}
                            </p>
                            <p className="text-[9px] text-slate-400 truncate font-mono">
                              {txn.user?.phone || ""}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5 hidden lg:table-cell">
                          <p
                            className="text-[10px] font-bold text-slate-500 truncate max-w-[120px] font-mono"
                            title={txn.productId}
                          >
                            {txn.productId || "—"}
                          </p>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5">
                          <Badge
                            className={cn(
                              "text-[9px] font-black uppercase border rounded-md px-2 py-0.5",
                              eventConfig.color,
                            )}
                          >
                            {eventConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-900 tabular-nums">
                              $
                              {(txn.grossAmount || txn.amount)?.toFixed(2) ||
                                "0.00"}
                            </span>
                            {txn.netAmount > 0 &&
                              txn.netAmount !==
                                (txn.grossAmount || txn.amount) && (
                                <span className="text-[9px] font-bold text-emerald-600 tabular-nums">
                                  Net: ${txn.netAmount.toFixed(2)}
                                </span>
                              )}
                          </div>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5 hidden sm:table-cell">
                          <span className="text-[10px] font-bold text-slate-600 uppercase">
                            {PLATFORM_MAP[txn.platform] || txn.platform || "—"}
                          </span>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[8px] font-black uppercase tracking-widest border px-1.5 py-0",
                              statusClass,
                            )}
                          >
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-2 md:px-4 py-2.5 hidden lg:table-cell">
                          <p
                            className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]"
                            title={txn.transactionId || txn.orderId || txn._id}
                          >
                            {txn.transactionId || txn.orderId || txn._id || "—"}
                          </p>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-56 text-center">
                      {!loading && (
                        <DataNotFound message="No transactions found" />
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
              Showing {transactions.length} of {pagination.totalItems || 0}{" "}
              transactions
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <Label className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase">
                  Rows
                </Label>
                <Select
                  value={`${limit}`}
                  onValueChange={(value) => {
                    setLimit(Number(value));
                    setPage(1);
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
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.currentPage <= 1}
                >
                  <IconChevronLeft size={14} />
                </Button>
                <div className="text-xs font-semibold px-2">
                  {pagination.currentPage || 1} / {pagination.totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
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
