import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/headSubhead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Download,
    DollarSign,
    TrendingDown,
    AlertTriangle,
    ReceiptText,
    Search,
    RefreshCcw,
    Loader2,
    Inbox,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
    getTransactionsAPI,
    getTransactionSummaryAPI,
    exportTransactionsCSVAPI,
} from "../services/subscription.services";

/* ───── Event Type Config ───── */
const EVENT_TYPE_MAP = {
    PURCHASE: { label: "Purchase", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    RENEW: { label: "Renewal", color: "bg-blue-50 text-blue-700 border-blue-200" },
    REFUND: { label: "Refund", color: "bg-red-50 text-red-700 border-red-200" },
    CANCEL: { label: "Cancel", color: "bg-slate-100 text-slate-600 border-slate-200" },
    CONSUMABLE_PURCHASE: { label: "Consumable", color: "bg-violet-50 text-violet-700 border-violet-200" },
    ADMIN_GRANT: { label: "Admin Grant", color: "bg-amber-50 text-amber-700 border-amber-200" },
    GIVEAWAY: { label: "Giveaway", color: "bg-pink-50 text-pink-700 border-pink-200" },
};

const PLATFORM_MAP = {
    ios: "iOS",
    android: "Android",
    admin_granted: "Admin",
};

export default function TransactionsPage() {
    // Data states
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        eventType: "",
        platform: "",
        search: "",
        page: 1,
        limit: 15,
        sortBy: "occurredAt",
        sortOrder: "desc",
    });

    /* ───── Fetch Transactions ───── */
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const params = { ...filters };
            // Clean empty params
            Object.keys(params).forEach(k => { if (!params[k]) delete params[k]; });
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
    }, [filters]);

    /* ───── Fetch Summary ───── */
    const fetchSummary = useCallback(async () => {
        setSummaryLoading(true);
        try {
            const res = await getTransactionSummaryAPI();
            if (res?.success) {
                setSummary(res.data);
            }
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
                eventType: filters.eventType,
                platform: filters.platform,
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
        setFilters(prev => ({
            ...prev,
            sortBy: column,
            sortOrder: prev.sortBy === column && prev.sortOrder === "desc" ? "asc" : "desc",
            page: 1,
        }));
    };

    const SortIcon = ({ column }) => {
        if (filters.sortBy !== column) return <ArrowUpDown className="w-3 h-3 ml-1 text-slate-300" />;
        return filters.sortOrder === "asc"
            ? <ArrowUp className="w-3 h-3 ml-1 text-brand-aqua" />
            : <ArrowDown className="w-3 h-3 ml-1 text-brand-aqua" />;
    };

    /* ───── Clear Filters ───── */
    const clearFilters = () => {
        setFilters({ eventType: "", platform: "", search: "", page: 1, limit: 15, sortBy: "occurredAt", sortOrder: "desc" });
    };

    const hasFilters = filters.eventType || filters.platform || filters.search;

    const overview = summary?.overview;
    const refunds = summary?.refunds;

    return (
        <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8 font-jakarta">
            <motion.div
                className="max-w-7xl mx-auto w-full space-y-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                    <PageHeader
                        heading="Transactions"
                        subheading="Revenue tracking, transaction history & export."
                        icon={<ReceiptText className="w-10 h-10 text-white" />}
                        color="bg-brand-aqua shadow-brand-aqua/20 shadow-xl"
                    />
                    <Button
                        className="bg-slate-900 text-white font-black h-10 px-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-800 gap-2"
                        onClick={handleExport}
                        disabled={exporting}
                    >
                        {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                        Export CSV
                    </Button>
                </header>

                {/* Revenue Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                    {/* Gross Revenue */}
                    <Card className="rounded-[2rem] border-brand-aqua/30 shadow-md bg-white overflow-hidden">
                        <CardContent className="p-6">
                            {summaryLoading ? <Skeleton className="h-16 rounded-2xl" /> : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gross Revenue</p>
                                        <div className="p-2 bg-brand-aqua/10 rounded-xl">
                                            <DollarSign className="w-4 h-4 text-brand-aqua" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">
                                        ${overview?.grossRevenue?.toFixed(2) || "0.00"}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400">{overview?.currency || "AUD"}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Net Revenue */}
                    <Card className="rounded-[2rem] border-brand-aqua/30 shadow-md bg-white overflow-hidden">
                        <CardContent className="p-6">
                            {summaryLoading ? <Skeleton className="h-16 rounded-2xl" /> : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Net Revenue</p>
                                        <div className="p-2 bg-emerald-50 rounded-xl">
                                            <TrendingDown className="w-4 h-4 text-emerald-600" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">
                                        ${overview?.netRevenue?.toFixed(2) || "0.00"}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400">
                                        Commission: ${overview?.totalCommission?.toFixed(2) || "0.00"}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Refund Rate */}
                    <Card className={cn(
                        "rounded-[2rem] shadow-md bg-white overflow-hidden",
                        refunds && !refunds.isHealthy ? "border-red-300" : "border-brand-aqua/30"
                    )}>
                        <CardContent className="p-6">
                            {summaryLoading ? <Skeleton className="h-16 rounded-2xl" /> : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Refund Rate</p>
                                        <div className={cn("p-2 rounded-xl", refunds?.isHealthy ? "bg-emerald-50" : "bg-red-50")}>
                                            <AlertTriangle className={cn("w-4 h-4", refunds?.isHealthy ? "text-emerald-600" : "text-red-500")} />
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-black text-slate-900">
                                            {refunds?.refundRate || "0%"}
                                        </h3>
                                        <Badge className={cn(
                                            "text-[9px] font-black uppercase mb-1",
                                            refunds?.isHealthy
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                : "bg-red-50 text-red-600 border-red-200"
                                        )}>
                                            {refunds?.isHealthy ? "Healthy" : "Warning"}
                                        </Badge>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400">
                                        {refunds?.totalRefunds || 0} refunds · ${refunds?.totalRefundAmount?.toFixed(2) || "0.00"}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Total Transactions */}
                    <Card className="rounded-[2rem] border-brand-aqua/30 shadow-md bg-white overflow-hidden">
                        <CardContent className="p-6">
                            {loading ? <Skeleton className="h-16 rounded-2xl" /> : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Transactions</p>
                                        <div className="p-2 bg-brand-aqua/10 rounded-xl">
                                            <ReceiptText className="w-4 h-4 text-brand-aqua" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">
                                        {pagination.totalItems?.toLocaleString() || 0}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction Table Section */}
                <section className="px-2">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-brand-aqua/30 shadow-xl">
                        {/* Table Header + Filters */}
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6">
                            <div className="space-y-1">
                                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <ReceiptText className="w-5 h-5 text-brand-aqua" />
                                    Transaction History
                                </h2>
                                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                                    All revenue events · Filterable & sortable
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:max-w-3xl">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-aqua transition-colors" />
                                    <Input
                                        placeholder="Search transaction..."
                                        className="pl-10 h-10 rounded-2xl bg-slate-50 border-none group-focus-within:ring-2 ring-brand-aqua/20 text-xs font-bold"
                                        value={filters.search}
                                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                                    />
                                </div>

                                <Select value={filters.eventType} onValueChange={(val) => setFilters(p => ({ ...p, eventType: val === "all" ? "" : val, page: 1 }))}>
                                    <SelectTrigger className="h-10 rounded-2xl bg-slate-50 border-none text-xs font-bold">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="all" className="rounded-xl">All Types</SelectItem>
                                        <SelectItem value="PURCHASE" className="rounded-xl">Purchase</SelectItem>
                                        <SelectItem value="RENEW" className="rounded-xl">Renewal</SelectItem>
                                        <SelectItem value="REFUND" className="rounded-xl">Refund</SelectItem>
                                        <SelectItem value="CANCEL" className="rounded-xl">Cancel</SelectItem>
                                        <SelectItem value="CONSUMABLE_PURCHASE" className="rounded-xl">Consumable</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={filters.platform} onValueChange={(val) => setFilters(p => ({ ...p, platform: val === "all" ? "" : val, page: 1 }))}>
                                    <SelectTrigger className="h-10 rounded-2xl bg-slate-50 border-none text-xs font-bold">
                                        <SelectValue placeholder="All Platforms" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="all" className="rounded-xl">All Platforms</SelectItem>
                                        <SelectItem value="ios" className="rounded-xl">iOS</SelectItem>
                                        <SelectItem value="android" className="rounded-xl">Android</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {hasFilters && (
                            <div className="flex items-center gap-2 mb-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-xl h-8 px-3"
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}

                        {/* Table */}
                        <div className="rounded-[2rem] border border-slate-50 overflow-hidden bg-white">
                            <Table>
                                <TableHeader className="bg-slate-50/50 border-b border-slate-100">
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="h-12 px-4">
                                            <button onClick={() => handleSort("occurredAt")} className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-aqua transition-colors">
                                                Date <SortIcon column="occurredAt" />
                                            </button>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">User</span>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product</span>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Type</span>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <button onClick={() => handleSort("amount")} className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-aqua transition-colors">
                                                Gross <SortIcon column="amount" />
                                            </button>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Net</span>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Platform</span>
                                        </TableHead>
                                        <TableHead className="h-12 px-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Txn ID</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="h-64 text-center">
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <Loader2 className="w-8 h-8 text-brand-aqua animate-spin" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading transactions...</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : transactions.length > 0 ? (
                                        transactions.map((txn) => {
                                            const eventConfig = EVENT_TYPE_MAP[txn.eventType] || { label: txn.eventType, color: "bg-slate-100 text-slate-600 border-slate-200" };
                                            return (
                                                <TableRow key={txn._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                                    {/* Date */}
                                                    <TableCell className="px-4 py-3">
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-800">
                                                                {txn.date ? new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400 font-mono">
                                                                {txn.date ? new Date(txn.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    {/* User */}
                                                    <TableCell className="px-4 py-3">
                                                        <div className="max-w-[130px]">
                                                            <p className="text-xs font-bold text-slate-800 truncate">
                                                                {txn.user?.nickname || txn.user?.email || "—"}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400 truncate font-mono">
                                                                {txn.user?.phone || ""}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    {/* Product */}
                                                    <TableCell className="px-4 py-3">
                                                        <p className="text-[11px] font-bold text-slate-700 truncate max-w-[150px] font-mono" title={txn.productId}>
                                                            {txn.productId || "—"}
                                                        </p>
                                                    </TableCell>
                                                    {/* Event Type */}
                                                    <TableCell className="px-4 py-3">
                                                        <Badge className={cn("text-[9px] font-black uppercase border rounded-lg px-2 py-0.5", eventConfig.color)}>
                                                            {eventConfig.label}
                                                        </Badge>
                                                    </TableCell>
                                                    {/* Gross Amount */}
                                                    <TableCell className="px-4 py-3">
                                                        <span className="text-xs font-black text-slate-900 tabular-nums">
                                                            ${txn.grossAmount?.toFixed(2) || "0.00"}
                                                        </span>
                                                    </TableCell>
                                                    {/* Net Amount */}
                                                    <TableCell className="px-4 py-3">
                                                        <span className="text-xs font-bold text-emerald-600 tabular-nums">
                                                            ${txn.netAmount?.toFixed(2) || "0.00"}
                                                        </span>
                                                    </TableCell>
                                                    {/* Platform */}
                                                    <TableCell className="px-4 py-3">
                                                        <span className="text-[11px] font-bold text-slate-600">
                                                            {PLATFORM_MAP[txn.platform] || txn.platform || "—"}
                                                        </span>
                                                    </TableCell>
                                                    {/* Transaction ID */}
                                                    <TableCell className="px-4 py-3">
                                                        <p className="text-[10px] font-mono text-slate-400 truncate max-w-[100px]" title={txn.transactionId}>
                                                            {txn.transactionId || "—"}
                                                        </p>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} className="h-48 text-center">
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <Inbox className="w-10 h-10 text-slate-200" />
                                                    <p className="text-sm font-bold text-slate-400">No transactions found</p>
                                                    <p className="text-[10px] text-slate-400">Try adjusting your filters</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {!loading && pagination.totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6 px-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalItems} total
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl h-8 w-8 p-0"
                                        disabled={pagination.currentPage <= 1}
                                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl h-8 w-8 p-0"
                                        disabled={pagination.currentPage >= pagination.totalPages}
                                        onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
