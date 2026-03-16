import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
    ArrowLeft,
    Mail,
    Phone,
    Layers,
    Zap,
    Calendar,
    CheckCircle2,
    ExternalLink,
    DollarSign,
    Activity,
    History,
    Database,
    RefreshCcw,
    ShieldOff,
    Star,
    Coins,
    AlertTriangle,
    Loader2,
    Trash2,
    Users,
    Smartphone,
    CreditCard,
    MoreHorizontal,
    ShieldAlert,
    Plus,
    Apple,
    Clock,
    UserCircle,
    ShieldCheck,
    Gem,
    X,
    CreditCard as CardIcon,
    CalendarPlus,
    Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
    fetchUserDetail,
    clearUserDetail,
    grantSubscription,
    grantConsumables,
    revokeUserSubscription,
    extendSubscription
} from "../store/subscription.slice";
import { toast } from "sonner";
import dummyImg from "@/assets/images/dummyImg.jpg";
import { PreLoader } from "@/app/loader/preloader";

export default function ViewSubscriptionDetailPage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userDetail, userDetailLoading, actionLoading } = useSelector((state) => state.subscription);

    // States for Grant Forms
    const [grantPlan, setGrantPlan] = useState("MONTHLY");
    const [grantDuration, setGrantDuration] = useState("30");
    const [grantReason, setGrantReason] = useState("");
    const [isGrantOpen, setIsGrantOpen] = useState(false);

    const [consumableType, setConsumableType] = useState("SUPER_KEEN");
    const [consumableAmount, setConsumableAmount] = useState(5);
    const [isConsumableOpen, setIsConsumableOpen] = useState(false);

    const [isRevokeOpen, setIsRevokeOpen] = useState(false);
    const [imageModal, setImageModal] = useState({ open: false, src: "", title: "" });

    // Extend Subscription state
    const [isExtendOpen, setIsExtendOpen] = useState(false);
    const [extendDays, setExtendDays] = useState(30);
    const [extendReason, setExtendReason] = useState("");

    // Grant reason dropdown
    const [grantReasonType, setGrantReasonType] = useState("");
    const [grantReasonCustom, setGrantReasonCustom] = useState("");

    // Consumable reason
    const [consumableReason, setConsumableReason] = useState("Admin Grant");

    useEffect(() => {
        if (userId) dispatch(fetchUserDetail(userId));
        return () => dispatch(clearUserDetail());
    }, [dispatch, userId]);

    // Robust Data Extraction
    const {
        subscription: sub,
        recentTransactions = [],
        transactions = [],
        subscriptionHistory = [],
        wallet,
        user: userInfo
    } = userDetail || {};

    // UI Logic: Consolidate Audit Logs (prefer `transactions` — full list, `recentTransactions` is backward compat)
    const auditLogs = transactions.length > 0 ? transactions : recentTransactions;

    // Robust user fallback logic: prioritize the full user object if available from various possible keys
    const user = userInfo || sub?.user || sub?.userId || userDetail?.user || userDetail?.userId;

    const progress = useMemo(() => {
        if (!sub?.startedAt || !sub?.expiresAt) return 0;
        const total = new Date(sub.expiresAt) - new Date(sub.startedAt);
        const current = new Date() - new Date(sub.startedAt);
        return Math.min(100, Math.max(0, (current / total) * 100));
    }, [sub]);

    const handleManualGrant = async () => {
        const finalReason = grantReasonType === "Other" ? grantReasonCustom : grantReasonType;
        if (!finalReason) return toast.error("Please provide a reason");
        const result = await dispatch(grantSubscription({
            userId,
            data: { planType: grantPlan, durationDays: Number(grantDuration), reason: finalReason }
        }));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Subscription granted successfully");
            setIsGrantOpen(false);
            setGrantReasonType("");
            setGrantReasonCustom("");
            dispatch(fetchUserDetail(userId));
        } else {
            toast.error(result.payload || "Failed to grant subscription");
        }
    };

    const handleGrantConsumables = async () => {
        const result = await dispatch(grantConsumables({
            userId,
            data: { type: consumableType, quantity: Number(consumableAmount), reason: consumableReason }
        }));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Consumables granted successfully");
            setIsConsumableOpen(false);
            dispatch(fetchUserDetail(userId));
        } else {
            toast.error(result.payload || "Failed to grant consumables");
        }
    };

    const handleRevoke = async () => {
        const result = await dispatch(revokeUserSubscription({
            userId,
            data: { subscriptionId: sub?._id }
        }));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Subscription revoked");
            setIsRevokeOpen(false);
            dispatch(fetchUserDetail(userId));
        } else {
            toast.error(result.payload || "Failed to revoke subscription");
            setIsRevokeOpen(false);
        }
    };

    // Helper: Derive source from platform for old records that don't have source field
    const getSource = (subscription) => {
        if (subscription?.source) return subscription.source;
        if (subscription?.platform === "admin_granted") return "ADMIN";
        return "STORE";
    };

    if (userDetailLoading) return <PreLoader />;

    return (
        <div className="flex flex-1 flex-col min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 pb-24 font-jakarta">
            <motion.div
                className="max-w-7xl mx-auto w-full space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* 1. Header Area */}
                <header className="px-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="h-9 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-widest gap-2 px-4 rounded-xl hover:bg-white/60 transition-all border border-transparent hover:border-slate-200"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Subscribers
                        </Button>
                        <div className="hidden sm:flex gap-2">
                            <Badge variant="outline" className="h-7 border-brand-aqua/30 bg-white text-brand-aqua font-black text-[10px] uppercase tracking-widest px-3">
                                UID: {userId?.toUpperCase() || "N/A"}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-100/40">
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                            <div className="relative">
                                <Avatar 
                                    className="w-20 h-20 rounded-2xl shadow-xl p-1 bg-white ring-1 ring-slate-100 cursor-pointer hover:scale-105 transition-transform active:scale-95"
                                    onClick={() => setImageModal({ 
                                        open: true, 
                                        src: user?.photo || user?.avatar?.url || dummyImg,
                                        title: user?.nickname || "User Photo"
                                    })}
                                >
                                    <AvatarImage className="rounded-[1.2rem] object-cover" src={user?.photo || user?.avatar?.url || dummyImg} />
                                    <AvatarFallback className="text-2xl font-black bg-brand-aqua/10 text-brand-aqua rounded-[1.2rem]">
                                        {user?.nickname?.charAt(0) || user?.fullName?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={cn(
                                    "absolute -bottom-1.5 -right-1.5 p-1.5 rounded-xl border-2 border-white shadow-lg pointer-events-none",
                                    sub?.status === "ACTIVE" ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"
                                )}>
                                    {sub?.status === "ACTIVE" ? <CheckCircle2 className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                                        {user?.nickname || user?.fullName || "User Profile"}
                                    </h1>
                                    <Badge className={cn(
                                        "font-black px-3 py-1 uppercase tracking-widest text-[10px] rounded-lg border-none shadow-sm",
                                        sub?.status === "ACTIVE" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"
                                    )}>
                                        {sub?.status || "NO ACTIVE PLAN"}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-5 gap-y-2 text-slate-500">
                                    <span className="flex items-center gap-2 text-xs font-bold">
                                        <Mail className="w-3.5 h-3.5 text-brand-aqua" /> {user?.email || "Email undisclosed"}
                                    </span>
                                    <span className="flex items-center gap-2 text-xs font-bold">
                                        <Phone className="w-3.5 h-3.5 text-brand-aqua" /> {user?.phone || "Phone undisclosed"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 w-full lg:w-auto">
                            <Button
                                onClick={() => setIsGrantOpen(true)}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-11 px-6 font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-slate-900/20 transition-all active:scale-95 flex-1 sm:flex-none"
                            >
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Manual Grant
                            </Button>
                            {sub?.status === "ACTIVE" && (
                                <Button
                                    onClick={() => setIsExtendOpen(true)}
                                    className="bg-brand-aqua hover:bg-brand-aqua/90 text-white rounded-2xl h-11 px-6 font-black text-xs uppercase tracking-widest gap-2 shadow-xl shadow-brand-aqua/20 transition-all active:scale-95 flex-1 sm:flex-none"
                                >
                                    <CalendarPlus className="w-4 h-4" /> Extend
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                onClick={() => setIsRevokeOpen(true)}
                                className="bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-2xl h-11 px-6 font-black text-xs uppercase tracking-widest gap-2 border border-rose-100 flex-1 sm:flex-none"
                            >
                                <ShieldOff className="w-4 h-4" /> Revoke
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2">
                    {/* 2. Top Stats */}
                    <StatBox
                        label="Environment"
                        val={sub?.environment || "production"}
                        icon={Database}
                        color="blue"
                        subVal="API Gateway Context"
                    />
                    <StatBox
                        label="Current Status"
                        val={sub?.status || "PENDING"}
                        icon={Activity}
                        color="emerald"
                        subVal="Subscription Health"
                        isActive={sub?.status === "ACTIVE"}
                    />
                    <StatBox
                        label="Super Keens"
                        val={wallet?.superKeensBalance || 0}
                        icon={Gem}
                        color="indigo"
                        subVal="Available Currency"
                        onAction={() => setIsConsumableOpen(true)}
                    />
                    <StatBox
                        label="Profile Boosts"
                        val={wallet?.boostsBalance || 0}
                        icon={Zap}
                        color="orange"
                        subVal="Spotlight Tokens"
                        onAction={() => setIsConsumableOpen(true)}
                    />

                    {/* 3. Main Detail Grid */}
                    <div className="lg:col-span-1 space-y-5">
                        <Card className="rounded-[2.5rem] border-white shadow-xl shadow-indigo-100/20 bg-white/80 backdrop-blur-md overflow-hidden border">
                            <CardHeader className="bg-slate-50/50 py-4 px-6 border-b border-slate-100">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-brand-aqua" /> Access Cycle
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cycle Progress</p>
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                                                {Math.round(progress)}<span className="text-xl text-slate-300 ml-1">%</span>
                                            </h3>
                                        </div>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-[10px] font-black py-1 px-2 uppercase tracking-widest">
                                            {sub?.planType || "NO TIER"}
                                        </Badge>
                                    </div>
                                    <Progress value={progress} className="h-2 rounded-full bg-slate-100 shadow-inner" />
                                </div>

                                <div className="space-y-3">
                                    <DetailItem
                                        label="Billing Started"
                                        val={sub?.startedAt ? format(new Date(sub.startedAt), "MMMM dd, yyyy") : "Not Available"}
                                        icon={Calendar}
                                    />
                                    <DetailItem
                                        label="Next Renewal"
                                        val={sub?.expiresAt ? format(new Date(sub.expiresAt), "MMMM dd, yyyy") : "Lifetime Access"}
                                        icon={History}
                                        isHighLight={sub?.status === "ACTIVE"}
                                    />
                                    <Separator className="bg-slate-100 my-4" />
                                    <div className="flex flex-col gap-3.5 pt-1">
                                        <InfoRow label="Auto Renew" val={sub?.autoRenew ? "ENABLED" : "DISABLED"} isGreen={sub?.autoRenew} />
                                        <InfoRow label="Platform" val={sub?.platform?.toUpperCase() || "ADMIN_DIRECT"} />
                                        <InfoRow label="Source" val={getSource(sub)} />
                                        <InfoRow label="Product ID" val={sub?.productId || "manual_grant_v1"} isMono />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 4. Transactions Log — All payments and grants */}
                    <div className="lg:col-span-3">
                        <Card className="rounded-[2.5rem] border-white shadow-xl shadow-indigo-100/20 bg-white overflow-hidden border min-h-[400px]">
                            <CardHeader className="bg-slate-50/50 py-5 px-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                    <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                                        <History className="w-4 h-4 text-brand-aqua" /> Transaction History
                                    </CardTitle>
                                    <p className="text-[11px] font-bold text-slate-400 opacity-80">All payments, grants, and admin actions ({auditLogs.length} records)</p>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Live</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-slate-50/30">
                                            <TableRow className="border-none hover:bg-transparent">
                                                <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8 h-12">Event</TableHead>
                                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Amount</TableHead>
                                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Platform</TableHead>
                                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Product</TableHead>
                                                <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Reason</TableHead>
                                                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8 h-12">Date & Time</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {auditLogs.length > 0 ? (
                                                auditLogs.map((txn, idx) => {
                                                    const isAdminAction = ["ADMIN_GRANT", "EXTENSION", "ADMIN_CONSUMABLE_GRANT", "REVOKE"].includes(txn.eventType);
                                                    return (
                                                        <TableRow key={txn._id || idx} className="border-slate-50 hover:bg-slate-50/80 transition-colors group">
                                                            <TableCell className="pl-8 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={cn(
                                                                        "w-2 h-2 rounded-full transition-colors",
                                                                        isAdminAction ? "bg-brand-aqua" :
                                                                        txn.eventType === "PURCHASE" || txn.eventType === "RENEW" ? "bg-emerald-500" :
                                                                        txn.eventType === "CANCEL" || txn.eventType === "REFUND" ? "bg-rose-500" :
                                                                        "bg-slate-200 group-hover:bg-brand-aqua"
                                                                    )} />
                                                                    <Badge className={cn(
                                                                        "text-[10px] font-black px-2 py-0 h-5 shadow-none border",
                                                                        isAdminAction ? "bg-brand-aqua/10 text-brand-aqua border-brand-aqua/30" :
                                                                        txn.eventType === "PURCHASE" || txn.eventType === "RENEW" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                                        txn.eventType === "CONSUMABLE_PURCHASE" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                                                        txn.eventType === "CANCEL" || txn.eventType === "REFUND" ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                                        "bg-slate-100 text-slate-600 border-slate-200"
                                                                    )}>
                                                                        {txn.eventType || "LOG_ENTRY"}
                                                                    </Badge>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className={cn(
                                                                    "font-black text-xs",
                                                                    txn.amount > 0 ? "text-slate-900" : "text-slate-400"
                                                                )}>
                                                                    {txn.amount > 0 ? `$${txn.amount?.toFixed(2)}` : "—"}
                                                                    {txn.currency && txn.amount > 0 && <span className="text-[10px] text-slate-400 ml-1">{txn.currency}</span>}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="text-xs font-bold text-slate-500 uppercase">{txn.platform || "—"}</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="font-mono text-[10px] text-slate-400 truncate max-w-[120px] block">{txn.productId || "—"}</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="text-[11px] font-bold text-slate-500 truncate max-w-[120px] block">{txn.reason || "—"}</span>
                                                            </TableCell>
                                                            <TableCell className="text-right pr-8 text-xs font-bold text-slate-500">
                                                                {txn.occurredAt ? format(new Date(txn.occurredAt), "MMM dd, yyyy · HH:mm") : "---"}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="h-64 text-center">
                                                        <div className="flex flex-col items-center justify-center p-8 opacity-30 group">
                                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <Database className="w-8 h-8 text-slate-400" />
                                                            </div>
                                                            <p className="font-black text-xs uppercase tracking-widest text-slate-500">No Transaction Data</p>
                                                            <p className="text-[10px] font-bold text-slate-400 mt-1">Transactions will appear here once processed.</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 5. Subscription History — All past subscriptions */}
                    <div className="lg:col-span-4">
                        <Card className="rounded-[2.5rem] border-white shadow-xl shadow-indigo-100/20 bg-white overflow-hidden border">
                            <CardHeader className="bg-slate-50/50 py-5 px-8 border-b border-slate-100">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-brand-aqua" /> Subscription History
                                </CardTitle>
                                <p className="text-[11px] font-bold text-slate-400 opacity-80">All past subscriptions for this user ({subscriptionHistory.length} records)</p>
                            </CardHeader>
                            <CardContent className="p-0">
                                {subscriptionHistory.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader className="bg-slate-50/30">
                                                <TableRow className="border-none hover:bg-transparent">
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8 h-12">Plan</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Status</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Platform</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Source</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Auto-Renew</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Started</TableHead>
                                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8 h-12">Expired</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {subscriptionHistory.map((hist, idx) => (
                                                    <TableRow key={hist._id || idx} className="border-slate-50 hover:bg-slate-50/80 transition-colors">
                                                        <TableCell className="pl-8 py-3">
                                                            <Badge className={cn(
                                                                "text-[10px] font-black px-2 py-0 h-5 shadow-none border",
                                                                hist.planType?.includes("1_MONTH") || hist.planType === "MONTHLY" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                                hist.planType?.includes("3_MONTH") || hist.planType === "QUARTERLY" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                                                hist.planType === "MILESTONE" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                                "bg-purple-50 text-purple-600 border-purple-100"
                                                            )}>
                                                                {hist.planType}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge className={cn(
                                                                "text-[10px] font-black px-2 py-0 h-5 shadow-none border",
                                                                hist.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                                hist.status === "REVOKED" ? "bg-red-50 text-red-600 border-red-100" :
                                                                hist.status === "EXPIRED" ? "bg-rose-50 text-rose-500 border-rose-100" :
                                                                "bg-slate-100 text-slate-500 border-slate-200"
                                                            )}>
                                                                {hist.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-xs font-bold text-slate-600 uppercase">{hist.platform}</TableCell>
                                                        <TableCell className="text-xs font-bold text-slate-600 uppercase">{getSource(hist)}</TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge className={cn(
                                                                "text-[10px] font-black px-2 py-0 h-5 shadow-none border",
                                                                hist.autoRenew ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-200"
                                                            )}>
                                                                {hist.autoRenew ? "Yes" : "No"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-xs font-bold text-slate-500">
                                                            {hist.startedAt ? format(new Date(hist.startedAt), "MMM dd, yyyy") : "-"}
                                                        </TableCell>
                                                        <TableCell className="text-right pr-8 text-xs font-bold text-slate-500">
                                                            {hist.expiresAt ? format(new Date(hist.expiresAt), "MMM dd, yyyy") : "-"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-12 opacity-30">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                            <Layers className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <p className="font-black text-xs uppercase tracking-widest text-slate-500">No Past Subscriptions</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1">This is the user's first subscription.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>

            {/* Dialogs scaled slightly larger */}
            <Dialog open={isConsumableOpen} onOpenChange={setIsConsumableOpen}>
                <DialogContent className="rounded-[2.5rem] p-8 max-w-sm border-none shadow-2xl font-jakarta">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black">Adjust Balance</DialogTitle>
                        <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Modify user inventory assets</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Select Asset</Label>
                            <Select value={consumableType} onValueChange={setConsumableType}>
                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none shadow-xl">
                                    <SelectItem value="SUPER_KEEN" className="font-bold">Super Keens</SelectItem>
                                    <SelectItem value="BOOST" className="font-bold">Profile Boosts</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asset Volume</Label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm"
                                value={consumableAmount}
                                onChange={(e) => setConsumableAmount(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-8">
                        <Button className="w-full bg-slate-900 text-white font-black h-12 rounded-2xl hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20" onClick={handleGrantConsumables} disabled={actionLoading}>
                            Confirm Modification
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isGrantOpen} onOpenChange={setIsGrantOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 max-w-md font-jakarta">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-slate-900">Manual Provisioning</DialogTitle>
                        <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Assign premium access to user profile</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 py-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tier Assignment</Label>
                            <Select value={grantPlan} onValueChange={setGrantPlan}>
                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none shadow-xl">
                                    <SelectItem value="MONTHLY" className="text-sm font-bold">Monthly Plan</SelectItem>
                                    <SelectItem value="YEARLY" className="text-sm font-bold">Yearly Plan</SelectItem>
                                    <SelectItem value="LIFETIME" className="text-sm font-bold">Lifetime Tier</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Duration (Days)</Label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm"
                                value={grantDuration}
                                onChange={(e) => setGrantDuration(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Reason</Label>
                            <Select value={grantReasonType} onValueChange={setGrantReasonType}>
                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm">
                                    <SelectValue placeholder="Select reason..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none shadow-xl">
                                    <SelectItem value="1000th User Reward" className="text-sm font-bold">1000th User Reward</SelectItem>
                                    <SelectItem value="Giveaway" className="text-sm font-bold">Giveaway</SelectItem>
                                    <SelectItem value="Compensation" className="text-sm font-bold">Compensation</SelectItem>
                                    <SelectItem value="Other" className="text-sm font-bold">Other (Custom)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {grantReasonType === "Other" && (
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Custom Reason</Label>
                                <Input
                                    placeholder="Enter custom reason..."
                                    className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm"
                                    value={grantReasonCustom}
                                    onChange={(e) => setGrantReasonCustom(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter className="gap-3">
                        <Button variant="ghost" className="h-11 rounded-xl font-bold text-xs uppercase tracking-widest px-6" onClick={() => setIsGrantOpen(false)}>Abort</Button>
                        <Button className="bg-brand-aqua h-11 rounded-xl px-8 font-black text-white hover:bg-brand-aqua/90 text-xs uppercase tracking-widest shadow-lg shadow-brand-aqua/20" onClick={handleManualGrant} disabled={actionLoading}>
                            {actionLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify & Grant"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isRevokeOpen} onOpenChange={setIsRevokeOpen}>
                <DialogContent className="rounded-[2.5rem] text-center max-w-sm p-8 border-none shadow-2xl font-jakarta">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-rose-100/50">
                        <ShieldAlert className="w-10 h-10 text-rose-500" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-center text-slate-900">Terminate Access?</DialogTitle>
                        <DialogDescription className="text-center font-bold text-slate-400 text-sm mt-2">
                            This will immediately revoke all subscription privileges. This action cannot be reversed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-10 sm:justify-center gap-4">
                        <Button variant="ghost" className="h-12 rounded-2xl font-black text-xs uppercase tracking-widest px-8" onClick={() => setIsRevokeOpen(false)}>Dismiss</Button>
                        <Button className="bg-rose-500 h-12 rounded-2xl px-10 font-black text-white hover:bg-rose-600 text-xs uppercase tracking-widest shadow-2xl shadow-rose-500/30" onClick={handleRevoke} disabled={actionLoading}>
                            Revoke Now
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Extend Subscription Dialog */}
            <Dialog open={isExtendOpen} onOpenChange={setIsExtendOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 max-w-sm font-jakarta">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-slate-900">Extend Subscription</DialogTitle>
                        <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">Add extra days to current subscription</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5 pt-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Days to Add</Label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm"
                                value={extendDays}
                                onChange={(e) => setExtendDays(e.target.value)}
                                min={1}
                                max={365}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Reason</Label>
                            <Input
                                placeholder="e.g. Compensation for downtime"
                                className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm"
                                value={extendReason}
                                onChange={(e) => setExtendReason(e.target.value)}
                            />
                        </div>
                        {sub?.expiresAt && (
                            <div className="p-3 rounded-xl bg-brand-aqua/5 border border-brand-aqua/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Preview</p>
                                <p className="text-xs font-bold text-slate-600">
                                    Current: {format(new Date(sub.expiresAt), "MMM dd, yyyy")}
                                </p>
                                <p className="text-xs font-black text-brand-aqua">
                                    New: {format(new Date(new Date(sub.expiresAt).getTime() + (Number(extendDays) || 0) * 86400000), "MMM dd, yyyy")}
                                </p>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="mt-6 gap-3">
                        <Button variant="ghost" className="h-11 rounded-xl font-bold text-xs uppercase tracking-widest px-6" onClick={() => setIsExtendOpen(false)}>Cancel</Button>
                        <Button
                            className="bg-brand-aqua h-11 rounded-xl px-8 font-black text-white hover:bg-brand-aqua/90 text-xs uppercase tracking-widest shadow-lg shadow-brand-aqua/20"
                            onClick={async () => {
                                if (!extendReason) return toast.error("Please provide a reason");
                                const result = await dispatch(extendSubscription({ userId, data: { days: Number(extendDays), reason: extendReason } }));
                                if (result.meta.requestStatus === "fulfilled") {
                                    toast.success(result.payload?.message || "Subscription extended successfully");
                                    setIsExtendOpen(false);
                                    setExtendDays(30);
                                    setExtendReason("");
                                    dispatch(fetchUserDetail(userId));
                                }
                            }}
                            disabled={actionLoading}
                        >
                            {actionLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Extend Now"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Image Preview Modal */}
            <Dialog open={imageModal.open} onOpenChange={(open) => setImageModal({ ...imageModal, open })}>
                <DialogContent className="max-w-[95vw] sm:max-w-3xl p-0 overflow-hidden bg-black/95 border-none shadow-2xl rounded-3xl">
                    <DialogHeader className="p-4 bg-white/10 backdrop-blur-md border-b border-white/10 flex flex-row items-center justify-between space-y-0 absolute top-0 left-0 right-0 z-50">
                        <DialogTitle className="text-white font-black text-xs uppercase tracking-widest">{imageModal.title}</DialogTitle>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setImageModal({ ...imageModal, open: false })}
                            className="text-white hover:bg-white/20 transition-all active:scale-90"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogHeader>
                    <div className="flex items-center justify-center min-h-[50vh] max-h-[85vh] p-2 pt-16">
                        <img 
                            src={imageModal.src} 
                            alt={imageModal.title}
                            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Larger/Dense StatBox
const StatBox = ({ label, val, icon: Icon, color, subVal, onAction, isActive }) => (
    <Card className="rounded-[2rem] border-none shadow-xl shadow-indigo-100/20 bg-white transition-all hover:translate-y-[-4px] duration-300 overflow-hidden relative group">
        <CardContent className="p-5 flex items-center gap-5 relative z-10">
            <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                    color === "blue" ? "bg-blue-50 text-blue-600" :
                        color === "indigo" ? "bg-indigo-50 text-indigo-600" :
                            color === "orange" ? "bg-orange-50 text-orange-600" : "bg-slate-50 text-slate-400"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none truncate uppercase">
                        {val}
                    </h3>
                    {isActive && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                </div>
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{subVal}</p>
            </div>
            {onAction && (
                <Button variant="ghost" size="icon" onClick={onAction} className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                    <Plus className="w-4 h-4" />
                </Button>
            )}
        </CardContent>
    </Card>
);

const DetailItem = ({ label, val, icon: Icon, isHighLight }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:bg-white hover:border-brand-aqua/20 transition-all border-l-4 border-l-transparent hover:border-l-brand-aqua">
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
            <Icon className={cn("w-5 h-5", isHighLight ? "text-emerald-500" : "text-slate-400")} />
        </div>
        <div className="flex-1 space-y-1 pointer-events-none">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
            <p className={cn("text-xs font-bold leading-none", isHighLight ? "text-emerald-700 font-extrabold" : "text-slate-700")}>{val}</p>
        </div>
    </div>
);

const InfoRow = ({ label, val, isGreen, isMono }) => (
    <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <span className={cn(
            "text-xs font-bold",
            isGreen ? "text-emerald-600" : "text-slate-800 uppercase",
            isMono && "font-mono text-[11px] opacity-70"
        )}>{val}</span>
    </div>
);
const LoadingState = () => <PreLoader />;
