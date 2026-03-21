/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
    fetchDashboardStats,
    clearSubscriptionState
} from "../store/subscription.slice";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";
import {
    CreditCard,
    Users,
    Target,
    TrendingUp,
    TrendingDown,
    Layers,
    LayoutGrid,
    BarChart3,
    Smartphone,
    DollarSign,
    AlertTriangle,
    ShoppingBag,
    Clock,
    Trophy,
    RefreshCcw,
    Apple,
    ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { PreLoader } from "@/app/loader/preloader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const COLORS = ["#46C7CD", "#818CF8", "#F472B6", "#FB923C", "#A78BFA"];

const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald: "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    purple: "from-purple-500/40 to-purple-600/5 text-purple-600 border-purple-100",
};

const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald: "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    amber: "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
    purple: "from-purple-300/20 to-purple-500/10 to-transparent text-purple-600 border-purple-200 hover:border-purple-400",
};

export default function SubscriptionPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        dashboardStats,
        dashboardLoading,
    } = useSelector((state) => state.subscription);

    const [lastRefresh, setLastRefresh] = useState(null);
    const [timeRange, setTimeRange] = useState("7");

    // Fetch + auto-refresh every 5 minutes
    const refreshDashboard = useCallback(() => {
        const payload = timeRange === "all" ? { timeFilter: "allTime" } : { timeFilter: `last${timeRange}` };
        dispatch(fetchDashboardStats(payload));
        setLastRefresh(new Date());
    }, [dispatch, timeRange]);

    useEffect(() => {
        refreshDashboard();
        const interval = setInterval(refreshDashboard, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [refreshDashboard]);

    // Cleanup state only on component unmount
    useEffect(() => {
        return () => {
            dispatch(clearSubscriptionState());
        };
    }, [dispatch]);

    const kpis = dashboardStats?.kpis;
    const activity = dashboardStats?.last24HoursActivity;
    const milestone = dashboardStats?.milestone;

    // Date padding logic to ensure the entire filter timeframe is shown on chart
    const paddedRevenueTrend = useMemo(() => {
        const rawData = dashboardStats?.revenueTrend || [];
        if (timeRange === "all" || isNaN(Number(timeRange))) return rawData;

        const days = Number(timeRange);
        const padded = [];
        const today = new Date();

        const getLocalYYYYMMDD = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateString = getLocalYYYYMMDD(d);
            
            const existingPoint = rawData.find(item => item._id === dateString);
            
            padded.push({
                _id: dateString,
                dailyRevenue: existingPoint ? existingPoint.dailyRevenue : 0,
            });
        }
        return padded;
    }, [dashboardStats?.revenueTrend, timeRange]);

    // Section 1: Unified 5-Item KPI Row
    const pulseCards = useMemo(() => {
        if (!kpis) return [];
        return [
            {
                label: "Today's Subs",
                val: kpis.todayNew || 0,
                icon: <TrendingUp className="w-5 h-5" />,
                color: "emerald",
                bg: "bg-emerald-50 border-emerald-200",
                iconBg: "bg-emerald-100 text-emerald-600",
            },
            {
                label: "Today's Cancels",
                val: kpis.todayCancelled || 0,
                icon: <TrendingDown className="w-5 h-5" />,
                color: "amber",
                bg: "bg-amber-50 border-amber-200",
                iconBg: "bg-amber-100 text-amber-600",
            },
            {
                label: "Today's Revenue",
                val: `$${(kpis.todayRevenue || 0).toLocaleString()}`,
                icon: <DollarSign className="w-5 h-5" />,
                color: "blue",
                bg: "bg-blue-50 border-blue-200",
                iconBg: "bg-blue-100 text-blue-600",
            },
            {
                label: "24h New Subs",
                val: activity?.newSubscriptions || 0,
                icon: <Users className="w-5 h-5" />,
                color: "purple",
                bg: "bg-purple-50 border-purple-200",
                iconBg: "bg-purple-100 text-purple-600",
            },
            {
                label: "Wallet Packs",
                val: activity?.walletPacksBought || 0,
                icon: <ShoppingBag className="w-5 h-5" />,
                color: "amber",
                bg: "bg-amber-50/50 border-amber-200/50",
                iconBg: "bg-amber-100/50 text-amber-600/80",
            },
        ];
    }, [kpis, activity]);

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
                        heading="Subscription Analytics"
                        subheading="Unified intelligence for products, revenue, and subscribers."
                        icon={<CreditCard className="w-10 h-10 text-white" />}
                        color="bg-brand-aqua shadow-indigo-100 shadow-xl"
                    />
                    <Button
                        variant="ghost"
                        className="bg-slate-50 hover:bg-slate-100 rounded-2xl h-10 px-4 font-bold text-xs gap-2 text-slate-500"
                        onClick={refreshDashboard}
                        disabled={dashboardLoading}
                    >
                        <RefreshCcw className={cn("w-3.5 h-3.5", dashboardLoading && "animate-spin")} />
                        {lastRefresh ? `Updated ${lastRefresh.toLocaleTimeString()}` : "Refresh"}
                    </Button>
                </header>

                {/* Content rendering with PreLoader for full page sync */}
                {dashboardLoading && !dashboardStats && <PreLoader />}

                {/* Section 1: Unified KPI Block */}
                {pulseCards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-2">
                        {pulseCards.map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-[1.5rem] border transition-all",
                                    card.bg
                                )}
                            >
                                <div className={cn("p-2.5 rounded-2xl flex-shrink-0", card.iconBg)}>
                                    {card.icon}
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">{card.label}</p>
                                    <h3 className="text-xl font-black text-slate-900 leading-none">{typeof card.val === "number" ? card.val.toLocaleString() : card.val}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
                    {/* Revenue Trend */}
                    <Card className="lg:col-span-2 rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden group">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-brand-aqua" />
                                    Revenue Trend
                                </CardTitle>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-relaxed">
                                    Daily revenue performance
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Select value={timeRange} onValueChange={setTimeRange}>
                                    <SelectTrigger className="h-9 rounded-xl bg-slate-50 border-slate-100 text-[10px] sm:text-[11px] font-bold w-full sm:w-[130px]">
                                        <SelectValue placeholder="Timeframe" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-xl">
                                        <SelectItem value="7" className="text-xs rounded-xl cursor-pointer">Last 7 Days</SelectItem>
                                        <SelectItem value="15" className="text-xs rounded-xl cursor-pointer">Last 15 Days</SelectItem>
                                        <SelectItem value="30" className="text-xs rounded-xl cursor-pointer">Last 30 Days</SelectItem>
                                        <SelectItem value="all" className="text-xs rounded-xl cursor-pointer">All Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[250px] p-0 pr-6">
                            {(dashboardLoading && !dashboardStats) ? (
                                <div className="flex items-center justify-center h-full">
                                    <Skeleton className="w-[90%] h-[80%] rounded-2xl" />
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={paddedRevenueTrend}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="_id"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                            dy={10}
                                            tickFormatter={(val) => {
                                                if (!val) return '';
                                                const d = new Date(val);
                                                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                            }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                            itemStyle={{ fontWeight: 900 }}
                                            formatter={(value) => [`$${value}`, "Revenue"]}
                                        />
                                        <Area type="monotone" dataKey="dailyRevenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Platform Distribution */}
                    <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-emerald-500" />
                                    Platform Mix
                                </CardTitle>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Active ecosystem distribution</p>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            {(dashboardLoading && !dashboardStats) ? (
                                <div className="space-y-4">
                                    {[1, 2].map(i => <Skeleton key={i} className="h-12 rounded-2xl" />)}
                                </div>
                            ) : (
                                <div className="space-y-4 pt-2">
                                    {["android", "ios", "admin_granted"].map((platformId) => {
                                        const platformData = dashboardStats?.platformMix?.find(p => p._id === platformId) || { _id: platformId, count: 0 };
                                        const total = dashboardStats?.platformMix?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0;
                                        const percentage = total > 0 ? ((platformData.count || 0) / total) * 100 : 0;

                                        const isAndroid = platformId === "android";
                                        const isIOS = platformId === "ios";
                                        const isAdmin = platformId === "admin_granted";

                                        return (
                                            <div key={platformId} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "p-1.5 rounded-lg border",
                                                            isAndroid ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                                                                isIOS ? "bg-slate-50 border-slate-200 text-slate-700" :
                                                                    isAdmin ? "bg-purple-50 border-purple-100 text-purple-600" :
                                                                        "bg-blue-50 border-blue-100 text-blue-600"
                                                        )}>
                                                            {isAndroid ? <Smartphone className="w-3 h-3" /> :
                                                                isIOS ? <Apple className="w-3 h-3" /> :
                                                                    isAdmin ? <ShieldCheck className="w-3 h-3" /> :
                                                                        <LayoutGrid className="w-3 h-3" />}
                                                        </div>
                                                        <span className="text-[11px] font-black uppercase tracking-tight text-slate-600">
                                                            {platformId === "admin_granted" ? "Admin Granted" : platformId}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs font-black text-slate-900 tabular-nums">{platformData.count || 0}</span>
                                                </div>
                                                <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className={cn(
                                                            "h-full rounded-full",
                                                            isAndroid ? "bg-emerald-500" :
                                                                isIOS ? "bg-slate-800" :
                                                                    isAdmin ? "bg-purple-500" :
                                                                        "bg-blue-500"
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Section 4: Alerts & Milestone Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">
                    {/* Expiring Soon Alert */}
                    <Card className="rounded-[2rem] border-amber-200 shadow-md bg-white overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                Expiring Soon
                            </CardTitle>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Plans expiring in the next 24 hours</p>
                        </CardHeader>
                        <CardContent>
                            {dashboardLoading ? (
                                <Skeleton className="h-16 rounded-2xl" />
                            ) : (
                                <div className="flex items-center gap-4 bg-amber-50 p-5 rounded-2xl border border-amber-100">
                                    <div className="p-3 bg-amber-100 rounded-2xl">
                                        <Clock className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-black text-slate-900 leading-none">
                                            {activity?.plansExpiringSoon || 0}
                                        </h4>
                                        <p className="text-xs font-medium text-slate-500 mt-1">
                                            {(activity?.plansExpiringSoon || 0) > 0
                                                ? "plans are expiring soon. Consider sending a retention push."
                                                : "No plans expiring in the next 24 hours."
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Milestone Progress */}
                    <Card className="rounded-[2rem] border-purple-200 shadow-md bg-white overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-black flex items-center gap-2">
                                        <Trophy className="w-4 h-4 text-purple-500" />
                                        Milestone Program
                                    </CardTitle>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Free premium grant progress</p>
                                </div>
                                {milestone && (
                                    <Badge className={cn(
                                        "text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full",
                                        milestone.isActive
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                            : "bg-slate-50 text-slate-400 border-slate-200"
                                    )}>
                                        {milestone.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {dashboardLoading ? (
                                <Skeleton className="h-20 rounded-2xl" />
                            ) : milestone ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold text-slate-500">
                                            Target: <span className="font-black text-slate-800">{(milestone.targetCount || 0).toLocaleString()} users</span>
                                        </p>
                                        <p className="text-xs font-black text-purple-600">
                                            {Math.round(milestone.percentage || 0)}%
                                        </p>
                                    </div>
                                    <Progress
                                        value={milestone.percentage || 0}
                                        className="h-3 rounded-full bg-purple-100"
                                    />
                                    <p className="text-[10px] font-medium text-slate-400">
                                        Currently at {(milestone.currentCount || 0).toLocaleString()} users ·
                                        {milestone.targetCount ? ` ${(milestone.targetCount - (milestone.currentCount || 0)).toLocaleString()} to go` : ""}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-sm font-medium text-slate-400">No milestone program configured.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Section 5: Best Sellers */}
                {dashboardStats?.bestSellingProducts?.length > 0 && (() => {
                    const totalSales = dashboardStats.bestSellingProducts.reduce((sum, p) => sum + (p.salesCount || 0), 0);
                    const maxSales = Math.max(...dashboardStats.bestSellingProducts.map(p => p.salesCount || 0));

                    return (
                    <div className="px-2 space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <div className="space-y-1">
                                <h3 className="text-sm font-black flex items-center gap-2 text-slate-900">
                                    <Layers className="w-4 h-4 text-brand-aqua" />
                                    Best Selling Products
                                </h3>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                    Top products by sales volume · <span className="text-brand-aqua">{totalSales.toLocaleString()} total sales</span>
                                </p>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-[40px_1fr_100px_80px] gap-4 px-5 py-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">#</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Product</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Share</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Sales</span>
                        </div>

                        {/* Table Rows */}
                        <div className="space-y-1">
                            {dashboardStats.bestSellingProducts.map((product, idx) => {
                                const salesCount = product.salesCount || 0;
                                const marketShare = totalSales > 0 ? (salesCount / totalSales) * 100 : 0;
                                const barWidth = maxSales > 0 ? (salesCount / maxSales) * 100 : 0;

                                return (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08 }}
                                        className={cn(
                                            "grid grid-cols-[40px_1fr_100px_80px] gap-4 items-center px-5 py-3.5 rounded-xl transition-all hover:bg-brand-aqua/5",
                                            idx % 2 === 0 ? "bg-slate-50/60" : "bg-transparent"
                                        )}
                                    >
                                        {/* Rank */}
                                        <span className={cn(
                                            "text-sm font-black tabular-nums",
                                            idx === 0 ? "text-brand-aqua" : "text-slate-400"
                                        )}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>

                                        {/* Product + Progress */}
                                        <div className="min-w-0 space-y-1.5">
                                            <p className="text-xs font-bold text-slate-800 truncate font-mono" title={product._id}>
                                                {product._id}
                                            </p>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${barWidth}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                                                    className="h-full rounded-full bg-brand-aqua"
                                                />
                                            </div>
                                        </div>

                                        {/* Market Share */}
                                        <div className="text-right">
                                            <Badge className="bg-brand-aqua/10 text-brand-aqua border-brand-aqua/20 font-black text-[9px] px-2 py-0 h-5 rounded-md">
                                                {marketShare.toFixed(1)}%
                                            </Badge>
                                        </div>

                                        {/* Sales Count */}
                                        <span className="text-sm font-black text-slate-900 tabular-nums text-right">
                                            {salesCount.toLocaleString()}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                    );
                })()}
            </motion.div>
        </div>
    );
}
