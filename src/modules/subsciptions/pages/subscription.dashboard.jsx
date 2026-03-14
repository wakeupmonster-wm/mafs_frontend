/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    Users,
    DollarSign,
    UserPlus,
    UserMinus,
    Trophy,
    TrendingUp,
    Crown,
    AlertTriangle,
    RefreshCcw,
    BarChart3,
    Target,
    Layers,
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Smartphone,
} from "lucide-react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    AreaChart,
    Area,
    ComposedChart,
    Line,
    LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fetchSubscriptionKPIs } from "../store/subscription.slice";
import { format, startOfWeek, startOfMonth } from "date-fns";
import { PreLoader } from "@/app/loader/preloader";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";

// Same color maps as subscription.page.jsx
const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald: "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    purple: "from-purple-500/40 to-purple-600/5 text-purple-600 border-purple-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
    cyan: "from-cyan-500/40 to-cyan-600/5 text-cyan-600 border-cyan-100",
};

const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald: "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    amber: "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-200 hover:border-amber-400",
    purple: "from-purple-300/20 via-purple-500/10 to-transparent text-purple-600 border-purple-200 hover:border-purple-400",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
    cyan: "from-cyan-300/20 via-cyan-500/10 to-transparent text-cyan-600 border-cyan-200 hover:border-cyan-400",
};

const COLORS = ["#46C7CD", "#818CF8", "#F472B6", "#FB923C", "#A78BFA"];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

export default function SubscriptionDashboard() {
    const dispatch = useDispatch();
    const { subscriptionStats, statsLoading, error } = useSelector((state) => state.subscription);
    const [lastRefresh, setLastRefresh] = useState(null);

    // Custom Month Picker state
    const [selectedMonth, setSelectedMonth] = useState(() => format(new Date(), "yyyy-MM"));
    const [pickerYear, setPickerYear] = useState(() => new Date().getFullYear());
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

    // Chart Filters
    const [chartTimeframe, setChartTimeframe] = useState("daily"); // daily, weekly, monthly
    const [chartType, setChartType] = useState("all"); // all, subscription, consumable
    const [growthTimeframe, setGrowthTimeframe] = useState("daily"); // daily, weekly, monthly

    const refreshDashboard = useCallback(() => {
        dispatch(fetchSubscriptionKPIs({ month: selectedMonth }));
        setLastRefresh(new Date());
    }, [dispatch, selectedMonth]);

    useEffect(() => {
        refreshDashboard();
    }, [refreshDashboard]);

    const kpis = subscriptionStats?.kpis;
    const charts = subscriptionStats?.charts;

    // KPI stats — same shape as subscription.page.jsx coreStats
    const coreStats = useMemo(() => {
        if (!kpis) return [];
        return [
            {
                label: "Active Subscribers",
                val: kpis.activeSubscribers?.count || 0,
                icon: <Users className="w-6 h-6" />,
                color: "blue",
                description: `Change: ${kpis.activeSubscribers?.change || "0%"}`,
            },
            {
                label: "MRR (AUD)",
                val: `$${kpis.mrr?.amount?.toLocaleString() || 0}`,
                icon: <DollarSign className="w-6 h-6" />,
                color: "emerald",
                description: "Monthly Recurring Revenue",
            },
            {
                label: "Consumable Revenue",
                val: `$${kpis.consumableRevenue?.amount?.toLocaleString() || 0}`,
                icon: <Crown className="w-6 h-6" />,
                color: "amber",
                description: "Keens & Supercharges",
            },
            {
                label: "Conversion Rate",
                val: kpis.conversionRate || "0%",
                icon: <Target className="w-6 h-6" />,
                color: "purple",
                description: "Free to Premium conversion",
            },
            {
                label: "Churn Rate",
                val: kpis.churnRate || "0%",
                icon: <UserMinus className="w-6 h-6" />,
                color: "rose",
                description: "Monthly cancellation %",
            },
            {
                label: "Milestone Users",
                val: `${kpis.milestone?.currentCount || 0} / ${kpis.milestone?.target || 0}`,
                icon: <Trophy className="w-6 h-6" />,
                color: "cyan",
                description: "Next target: 1k subscribers",
            },
        ];
    }, [kpis]);

    const milestoneProgress = parseFloat(kpis?.milestone?.progress) || 0;

    // Chart data formatting & filtering
    const revenueTrendData = useMemo(() => {
        let rawData = charts?.revenueTrend || [];

        // 1. Determine strict month boundaries
        const [year, month] = selectedMonth.split("-").map(Number);
        const minDate = new Date(year, month - 1, 1);
        let maxDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Cap maxDate to today so we don't show empty future dates for the current month
        const now = new Date();
        if (maxDate > now) {
            maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        }

        // Filter valid data: Strictly for Daily/Weekly, but allow more history for Monthly trend
        if (chartTimeframe !== "monthly") {
            rawData = rawData.filter(item => {
                const date = new Date(item.day).getTime();
                return date >= minDate.getTime() && date <= maxDate.getTime();
            });
        }

        // 2. Pad zero-data points / Grouping
        let groups = {};

        if (chartTimeframe === "daily") {
            let curr = new Date(minDate);
            curr.setHours(0, 0, 0, 0);
            const end = new Date(maxDate);
            end.setHours(23, 59, 59, 999);

            while (curr <= end) {
                const key = format(curr, "MMM dd");
                groups[key] = { name: key, subscription: 0, consumable: 0, compareDate: curr.getTime() };
                curr.setDate(curr.getDate() + 1);
            }

            rawData.forEach((item) => {
                const key = format(new Date(item.day), "MMM dd");
                if (groups[key]) {
                    groups[key].subscription += item.subscription || 0;
                    groups[key].consumable += item.consumable || 0;
                }
            });
        } else if (chartTimeframe === "weekly") {
            let curr = new Date(minDate);
            curr.setDate(curr.getDate() - curr.getDay()); // Align to Sunday
            curr.setHours(0, 0, 0, 0);

            const end = new Date(maxDate);
            end.setHours(23, 59, 59, 999);

            while (curr <= end) {
                const startOfWeekDate = new Date(curr);
                const endOfWeekDate = new Date(curr);
                endOfWeekDate.setDate(endOfWeekDate.getDate() + 6); // Add 6 to reach Saturday

                const key = `${format(startOfWeekDate, "MMM dd")} - ${format(endOfWeekDate, "dd")} (Sat)`;
                groups[key] = { name: key, subscription: 0, consumable: 0, compareDate: endOfWeekDate.getTime() };
                curr.setDate(curr.getDate() + 7);
            }

            rawData.forEach((item) => {
                const d = new Date(item.day);
                const endOfWeekDate = new Date(d);
                endOfWeekDate.setDate(endOfWeekDate.getDate() + (6 - endOfWeekDate.getDay()));

                const startOfWeekDate = new Date(endOfWeekDate);
                startOfWeekDate.setDate(endOfWeekDate.getDate() - 6);

                const key = `${format(startOfWeekDate, "MMM dd")} - ${format(endOfWeekDate, "dd")} (Sat)`;
                if (groups[key]) {
                    groups[key].subscription += item.subscription || 0;
                    groups[key].consumable += item.consumable || 0;
                }
            });
        } else if (chartTimeframe === "monthly") {
            // Group by all available months in rawData for a trend
            rawData.forEach((item) => {
                const d = new Date(item.day);
                const key = format(d, "MMM yyyy");
                if (!groups[key]) {
                    groups[key] = {
                        name: key,
                        subscription: 0,
                        consumable: 0,
                        compareDate: new Date(d.getFullYear(), d.getMonth(), 1).getTime()
                    };
                }
                groups[key].subscription += item.subscription || 0;
                groups[key].consumable += item.consumable || 0;
            });
        }

        let grouped = Object.values(groups).sort((a, b) => a.compareDate - b.compareDate);

        // 3. Apply type filtering
        if (chartType === "subscription") {
            return grouped.map(item => ({ name: item.name, subscription: item.subscription }));
        } else if (chartType === "consumable") {
            return grouped.map(item => ({ name: item.name, consumable: item.consumable }));
        }

        return grouped;
    }, [charts, chartTimeframe, chartType]);

    const growthData = useMemo(() => {
        let rawData = charts?.subscriberGrowth || [];

        // 1. Determine strict month boundaries
        const [year, month] = selectedMonth.split("-").map(Number);
        const minDate = new Date(year, month - 1, 1);
        let maxDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Cap maxDate to today so we don't show empty future dates
        const now = new Date();
        if (maxDate > now) {
            maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        }

        if (growthTimeframe !== "monthly") {
            rawData = rawData.filter(item => {
                const date = new Date(item.day).getTime();
                return date >= minDate.getTime() && date <= maxDate.getTime();
            });
        }

        let groups = {};

        if (growthTimeframe === "daily") {
            let curr = new Date(minDate);
            curr.setHours(0, 0, 0, 0);
            const end = new Date(maxDate);
            end.setHours(23, 59, 59, 999);

            while (curr <= end) {
                const key = format(curr, "MMM dd");
                groups[key] = { name: key, new: 0, cancelled: 0, net: 0, compareDate: curr.getTime() };
                curr.setDate(curr.getDate() + 1);
            }

            rawData.forEach((item) => {
                const key = format(new Date(item.day), "MMM dd");
                if (groups[key]) {
                    groups[key].new += item.new || 0;
                    groups[key].cancelled += item.cancelled || 0;
                    groups[key].net = groups[key].new - groups[key].cancelled;
                }
            });
        } else if (growthTimeframe === "weekly") {
            let curr = new Date(minDate);
            curr.setDate(curr.getDate() - curr.getDay()); // Align to Sunday
            curr.setHours(0, 0, 0, 0);

            const end = new Date(maxDate);
            end.setHours(23, 59, 59, 999);

            while (curr <= end) {
                const startOfWeekDate = new Date(curr);
                const endOfWeekDate = new Date(curr);
                endOfWeekDate.setDate(endOfWeekDate.getDate() + 6); // Add 6 to reach Saturday

                const key = `${format(startOfWeekDate, "MMM dd")} - ${format(endOfWeekDate, "dd")} (Sat)`;
                groups[key] = { name: key, new: 0, cancelled: 0, net: 0, compareDate: endOfWeekDate.getTime() };
                curr.setDate(curr.getDate() + 7);
            }

            rawData.forEach((item) => {
                const d = new Date(item.day);
                const endOfWeekDate = new Date(d);
                endOfWeekDate.setDate(endOfWeekDate.getDate() + (6 - endOfWeekDate.getDay()));

                const startOfWeekDate = new Date(endOfWeekDate);
                startOfWeekDate.setDate(endOfWeekDate.getDate() - 6);

                const key = `${format(startOfWeekDate, "MMM dd")} - ${format(endOfWeekDate, "dd")} (Sat)`;
                if (groups[key]) {
                    groups[key].new += item.new || 0;
                    groups[key].cancelled += item.cancelled || 0;
                    groups[key].net = groups[key].new - groups[key].cancelled;
                }
            });
        } else if (growthTimeframe === "monthly") {
            rawData.forEach((item) => {
                const d = new Date(item.day);
                const key = format(d, "MMM yyyy");
                if (!groups[key]) {
                    groups[key] = {
                        name: key,
                        new: 0,
                        cancelled: 0,
                        net: 0,
                        compareDate: new Date(d.getFullYear(), d.getMonth(), 1).getTime()
                    };
                }
                groups[key].new += item.new || 0;
                groups[key].cancelled += item.cancelled || 0;
                groups[key].net = groups[key].new - groups[key].cancelled;
            });
        }

        let grouped = Object.values(groups).sort((a, b) => a.compareDate - b.compareDate);
        return grouped;
    }, [charts, growthTimeframe, selectedMonth]);

    const platformData = useMemo(() => {
        return charts?.platformSplit?.map((item, idx) => ({
            name: item.platform?.toUpperCase(),
            value: item.revenue,
            color: COLORS[idx % COLORS.length],
        })) || [];
    }, [charts]);

    const planData = useMemo(() => {
        // Strict counters for the 2 allowed subscription tiers
        let oneMonthCount = 0;
        let threeMonthCount = 0;

        charts?.planDistribution?.forEach(item => {
            const plan = item.plan?.toUpperCase() || "";
            // Capture variants of spelling just in case
            if (plan === "1_MONTH" || plan === "MONTHLY") {
                oneMonthCount += (item.count || 0);
            } else if (plan === "3_MONTH" || plan === "QUARTERLY") {
                threeMonthCount += (item.count || 0);
            }
        });

        return [
            { name: "1 Month Premium", subscribers: oneMonthCount, fill: "#46C7CD" }, // brand-aqua
            { name: "3 Months Premium", subscribers: threeMonthCount, fill: "#8b5cf6" } // purple
        ];
    }, [charts]);

    if (statsLoading && !subscriptionStats) return <PreLoader />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-4">
                <div className="p-4 bg-rose-50 rounded-full text-rose-500">
                    <AlertTriangle size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Failed to load analytics</h2>
                <p className="text-slate-500 max-w-md">{error}</p>
                <Button onClick={refreshDashboard} className="bg-brand-aqua text-white rounded-2xl px-6">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8 font-jakarta">
            <motion.div
                className="max-w-7xl mx-auto w-full space-y-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header — same as subscription.page.jsx */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                    <PageHeader
                        heading="Revenue Dashboard"
                        subheading="Consolidated intelligence across subscriptions & consumable growth."
                        icon={<BarChart3 className="w-10 h-10 text-white" />}
                        color="bg-brand-aqua shadow-indigo-100 shadow-xl"
                    />
                    <div className="flex items-center gap-3">
                        <Popover open={isMonthPickerOpen} onOpenChange={setIsMonthPickerOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-white border-brand-aqua/30 rounded-2xl h-10 px-4 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-2"
                                >
                                    <CalendarIcon className="w-4 h-4 text-brand-aqua" />
                                    {format(new Date(selectedMonth + "-01"), "MMMM yyyy")}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-3 rounded-3xl border-brand-aqua/20 shadow-xl" align="end">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 rounded-xl hover:bg-slate-100"
                                            onClick={() => setPickerYear(y => y - 1)}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <div className="text-sm font-black text-slate-800">{pickerYear}</div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 rounded-xl hover:bg-slate-100"
                                            onClick={() => setPickerYear(y => y + 1)}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Array.from({ length: 12 }).map((_, idx) => {
                                            const monthVal = String(idx + 1).padStart(2, "0");
                                            const value = `${pickerYear}-${monthVal}`;
                                            const isSelected = selectedMonth === value;
                                            const monthLabel = format(new Date(pickerYear, idx, 1), "MMM");

                                            return (
                                                <Button
                                                    key={idx}
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        "h-10 rounded-xl text-xs font-bold",
                                                        isSelected
                                                            ? "bg-brand-aqua text-white hover:bg-brand-aqua hover:text-white"
                                                            : "text-slate-600 hover:bg-slate-100"
                                                    )}
                                                    onClick={() => {
                                                        setSelectedMonth(value);
                                                        setIsMonthPickerOpen(false);
                                                    }}
                                                >
                                                    {monthLabel}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Button
                            variant="ghost"
                            className="bg-slate-50 hover:bg-slate-100 rounded-2xl h-10 px-4 font-bold text-xs gap-2 text-slate-500 shadow-sm"
                            onClick={refreshDashboard}
                            disabled={statsLoading}
                        >
                            <RefreshCcw className={cn("w-3.5 h-3.5", statsLoading && "animate-spin")} />
                            {lastRefresh ? `Updated ${lastRefresh.toLocaleTimeString()}` : "Refresh"}
                        </Button>
                    </div>
                </header>

                {/* KPI Cards — using StatsGrid, same as subscription.page.jsx */}
                {coreStats.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
                    >
                        <StatsGrid stats={coreStats} colorMap={colorMap} bgMap={bgMap} />
                    </motion.div>
                )}

                {/* Milestone Progress Card */}
                {kpis?.milestone && (
                    <div className="px-2">
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
                                    <Badge className={cn(
                                        "text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full",
                                        "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    )}>
                                        Active
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-bold text-slate-500">
                                            Target: <span className="font-black text-slate-800">{(kpis.milestone.target || 0).toLocaleString()} users</span>
                                        </p>
                                        <p className="text-xs font-black text-purple-600">
                                            {Math.round(milestoneProgress * 100) / 100}%
                                        </p>
                                    </div>
                                    <Progress
                                        value={milestoneProgress}
                                        className="h-3 rounded-full bg-purple-100"
                                    />
                                    <p className="text-[10px] font-medium text-slate-400">
                                        Currently at {(kpis.milestone.currentCount || 0).toLocaleString()} users ·
                                        {` ${((kpis.milestone.target || 0) - (kpis.milestone.currentCount || 0)).toLocaleString()} to go`}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
                    {/* Revenue Trend */}
                    <Card className="lg:col-span-2 rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-brand-aqua" />
                                    Revenue Trend
                                </CardTitle>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-relaxed">Subscription vs consumable revenue</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <Select value={chartTimeframe} onValueChange={setChartTimeframe}>
                                    <SelectTrigger className="h-9 rounded-xl bg-slate-50 border-slate-100 text-[10px] sm:text-[11px] font-bold w-full sm:w-[110px]">
                                        <SelectValue placeholder="Timeframe" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-xl">
                                        <SelectItem value="daily" className="text-xs rounded-xl cursor-pointer">Daily</SelectItem>
                                        <SelectItem value="weekly" className="text-xs rounded-xl cursor-pointer">Weekly</SelectItem>
                                        <SelectItem value="monthly" className="text-xs rounded-xl cursor-pointer">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={chartType} onValueChange={setChartType}>
                                    <SelectTrigger className="h-9 rounded-xl bg-slate-50 border-slate-100 text-[10px] sm:text-[11px] font-bold w-full sm:w-[130px]">
                                        <SelectValue placeholder="Revenue Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-xl">
                                        <SelectItem value="all" className="text-xs rounded-xl cursor-pointer">All Revenue</SelectItem>
                                        <SelectItem value="subscription" className="text-xs rounded-xl cursor-pointer">Subscriptions</SelectItem>
                                        <SelectItem value="consumable" className="text-xs rounded-xl cursor-pointer">Consumables</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[280px] p-0 pr-6">
                            <ResponsiveContainer width="100%" height="100%">
                                {chartTimeframe === "monthly" ? (
                                    <BarChart data={revenueTrendData} barGap={12}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(v) => `$${v}`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                            cursor={{ fill: '#f8fafc', radius: 12 }}
                                        />
                                        {(chartType === "all" || chartType === "subscription") && (
                                            <Bar dataKey="subscription" fill="#4F46E5" radius={[8, 8, 0, 0]} name="Subscriptions" barSize={32} />
                                        )}
                                        {(chartType === "all" || chartType === "consumable") && (
                                            <Bar dataKey="consumable" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Consumables" barSize={32} />
                                        )}
                                        <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '10px' }} />
                                    </BarChart>
                                ) : (
                                    <AreaChart data={revenueTrendData}>
                                        <defs>
                                            <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(v) => `$${v}`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                            itemStyle={{ fontWeight: 900 }}
                                        />
                                        {(chartType === "all" || chartType === "subscription") && (
                                            <Area type="monotone" dataKey="subscription" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" name="Subscriptions" />
                                        )}
                                        {(chartType === "all" || chartType === "consumable") && (
                                            <Area type="monotone" dataKey="consumable" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorCons)" name="Consumables" />
                                        )}
                                        <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }} />
                                    </AreaChart>
                                )}
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Platform Mix */}
                    <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-emerald-500" />
                                    Platform Mix
                                </CardTitle>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Revenue by platform</p>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="space-y-3 pt-2">
                                {platformData.map((platform, idx) => {
                                    const total = platformData.reduce((acc, curr) => acc + (curr.value || 0), 0);
                                    const percentage = total > 0 ? ((platform.value || 0) / total) * 100 : 0;
                                    const isIOS = platform.name === 'IOS';
                                    const isAndroid = platform.name === 'ANDROID';
                                    
                                    return (
                                        <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "p-2 rounded-xl shadow-sm",
                                                        isIOS ? "bg-slate-800 text-white" : "",
                                                        isAndroid ? "bg-emerald-500 text-white" : "",
                                                        !isIOS && !isAndroid ? "bg-slate-200 text-slate-600" : ""
                                                    )}>
                                                        <Smartphone className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black uppercase tracking-widest text-slate-700">
                                                            {isIOS ? 'Apple iOS' : isAndroid ? 'Android' : platform.name}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-400">
                                                            {percentage.toFixed(1)}% of total revenue
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-slate-900 tabular-nums">
                                                        ${platform.value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        isIOS ? "bg-slate-800" : "",
                                                        isAndroid ? "bg-emerald-500" : "",
                                                        !isIOS && !isAndroid ? "bg-slate-400" : ""
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Second Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">
                    {/* Subscriber Growth */}
                    <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    Subscriber Growth
                                </CardTitle>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-relaxed">New vs cancelled vs net</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <Select value={growthTimeframe} onValueChange={setGrowthTimeframe}>
                                    <SelectTrigger className="h-9 rounded-xl bg-slate-50 border-slate-100 text-[10px] sm:text-[11px] font-bold w-full sm:w-[110px]">
                                        <SelectValue placeholder="Timeframe" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-xl">
                                        <SelectItem value="daily" className="text-xs rounded-xl cursor-pointer">Daily</SelectItem>
                                        <SelectItem value="weekly" className="text-xs rounded-xl cursor-pointer">Weekly</SelectItem>
                                        <SelectItem value="monthly" className="text-xs rounded-xl cursor-pointer">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[280px] p-0 pr-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={growthData} barGap={4}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                        cursor={{ fill: '#f8fafc', radius: 12 }}
                                    />
                                    <Bar dataKey="new" fill="#46C7CD" radius={[4, 4, 0, 0]} name="New" barSize={14} />
                                    <Bar dataKey="cancelled" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Cancelled" barSize={14} />
                                    <Bar dataKey="net" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Net Growth" barSize={14} />
                                    <Legend align="center" verticalAlign="top" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: '10px' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Plan Distribution */}
                    <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-brand-aqua" />
                                    Plan Distribution
                                </CardTitle>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Active users per subscription tier</p>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[280px] p-0 pr-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={planData} layout="vertical" margin={{ left: 20, right: 30, top: 20, bottom: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: '#1e293b' }} width={100} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                                        cursor={{ fill: '#f8fafc', radius: 12 }}
                                    />
                                    <Bar dataKey="subscribers" radius={[0, 12, 12, 0]} barSize={36} name="Active Users">
                                        {planData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                        <LabelList dataKey="subscribers" position="right" style={{ fontSize: '12px', fontWeight: '900', fill: '#475569' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}