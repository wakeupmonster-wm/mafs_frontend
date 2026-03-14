/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
    fetchSubscribers,
} from "../store/subscription.slice";
import { PageHeader } from "@/components/common/headSubhead";
import {
    Users,
    Search,
    RefreshCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DataTable } from "../components/data-table.shared";
import { getSubscriberColumns } from "../components/subscriber.columns";
import { cn } from "@/lib/utils";

export default function SubscriberManagementPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        subscribers,
        subscribersLoading,
        pagination,
    } = useSelector((state) => state.subscription);

    const [paginationState, setPaginationState] = useState({ pageIndex: 0, pageSize: 15 });
    const [filters, setFilters] = useState({ search: "", status: "", planType: "", platform: "" });
    const [lastRefresh, setLastRefresh] = useState(null);

    const refreshList = useCallback(() => {
        dispatch(fetchSubscribers({
            page: paginationState.pageIndex + 1,
            limit: paginationState.pageSize,
            ...filters,
        }));
        setLastRefresh(new Date());
    }, [dispatch, paginationState, filters]);

    useEffect(() => {
        const delay = setTimeout(() => {
            refreshList();
        }, 500);
        return () => clearTimeout(delay);
    }, [refreshList]);

    const columns = getSubscriberColumns(navigate);

    const clearFilters = () => {
        setFilters({ search: "", status: "", planType: "", platform: "" });
        setPaginationState({ pageIndex: 0, pageSize: 15 });
    };

    const hasActiveFilters = filters.search || filters.status || filters.planType || filters.platform;

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
                        heading="Subscriber Management"
                        subheading="Browse, search, and manage all subscribers from one place."
                        icon={<Users className="w-10 h-10 text-white" />}
                        color="bg-brand-aqua shadow-indigo-100 shadow-xl"
                    />
                    <Button
                        variant="ghost"
                        className="bg-slate-50 hover:bg-slate-100 rounded-2xl h-10 px-4 font-bold text-xs gap-2 text-slate-500"
                        onClick={refreshList}
                        disabled={subscribersLoading}
                    >
                        <RefreshCcw className={cn("w-3.5 h-3.5", subscribersLoading && "animate-spin")} />
                        {lastRefresh ? `Updated ${lastRefresh.toLocaleTimeString()}` : "Refresh"}
                    </Button>
                </header>

                {/* Subscribers Table */}
                <section className="px-2 space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-brand-aqua/30 shadow-xl shadow-indigo-100/50">
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                            <div className="space-y-1">
                                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <Users className="w-5 h-5 text-brand-aqua" />
                                    Subscribers Directory
                                </h2>
                                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-none">Management & Intelligence Console</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full xl:max-w-4xl">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-aqua transition-colors" />
                                    <Input
                                        placeholder="Search name, phone, email..."
                                        className="pl-10 h-10 rounded-2xl bg-slate-50 border-none group-focus-within:ring-2 ring-brand-aqua/20 text-xs font-bold"
                                        value={filters.search}
                                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                    />
                                </div>

                                 <Select value={filters.status} onValueChange={(val) => setFilters(p => ({ ...p, status: val === "all" ? "" : val }))}>
                                    <SelectTrigger className="h-10 rounded-2xl bg-slate-50 border-none text-xs font-bold">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="all" className="rounded-xl">All Status</SelectItem>
                                        <SelectItem value="ACTIVE" className="rounded-xl">Active</SelectItem>
                                        <SelectItem value="CANCELLED" className="rounded-xl">Cancelled</SelectItem>
                                        <SelectItem value="REVOKED" className="rounded-xl">Revoked</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={filters.planType} onValueChange={(val) => setFilters(p => ({ ...p, planType: val === "all" ? "" : val }))}>
                                    <SelectTrigger className="h-10 rounded-2xl bg-slate-50 border-none text-xs font-bold">
                                        <SelectValue placeholder="All Plans" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="all" className="rounded-xl">All Plans</SelectItem>
                                        <SelectItem value="MONTHLY" className="rounded-xl">Monthly</SelectItem>
                                        <SelectItem value="QUARTERLY" className="rounded-xl">Quarterly</SelectItem>
                                        <SelectItem value="YEARLY" className="rounded-xl">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={filters.platform} onValueChange={(val) => setFilters(p => ({ ...p, platform: val === "all" ? "" : val }))}>
                                    <SelectTrigger className="h-10 rounded-2xl bg-slate-50 border-none text-xs font-bold">
                                        <SelectValue placeholder="All Platforms" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="all" className="rounded-xl">All Platforms</SelectItem>
                                        <SelectItem value="ios" className="rounded-xl">iOS</SelectItem>
                                        <SelectItem value="android" className="rounded-xl">Android</SelectItem>
                                        <SelectItem value="admin_granted" className="rounded-xl">Admin Granted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
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

                        <div className="rounded-[2rem] border border-slate-50 overflow-hidden bg-white">
                            <DataTable
                                columns={columns}
                                data={subscribers || []}
                                loading={subscribersLoading}
                                pagination={pagination}
                                onPaginationChange={setPaginationState}
                                manualPagination={true}
                            />
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
