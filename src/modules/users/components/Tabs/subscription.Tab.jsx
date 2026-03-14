import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Zap,
    Gift,
    Crown,
    Clock,
    ShieldCheck,
    Loader2,
    Sparkles,
    Gem,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { grantSubscription, grantConsumables } from "@/modules/subsciptions/store/subscription.slice";

export const SubscriptionTab = ({ userData, subscription }) => {
    const dispatch = useDispatch();

    // Separate loading states for each action
    const [subLoading, setSubLoading] = useState(false);
    const [assetLoading, setAssetLoading] = useState(false);

    // Grant Subscription States
    const [grantPlan, setGrantPlan] = useState("MONTHLY");
    const [grantDuration, setGrantDuration] = useState("30");
    const [grantReason, setGrantReason] = useState("Admin Manual Grant");

    // Consumables States
    const [consumableType, setConsumableType] = useState("SUPER_KEEN");
    const [consumableAmount, setConsumableAmount] = useState("1");

    const handleGrantSubscription = async () => {
        if (subLoading) return;
        try {
            if (!grantDuration || Number(grantDuration) <= 0) {
                return toast.error("Please provide a valid duration");
            }
            setSubLoading(true);
            const data = {
                planType: grantPlan,
                durationDays: Number(grantDuration),
                reason: grantReason || "Admin Manual Grant"
            };
            await dispatch(grantSubscription({ userId: userData._id, data })).unwrap();
            toast.success("Subscription granted successfully!", {
                icon: <Sparkles className="w-4 h-4 text-brand-aqua" />,
                description: `${grantPlan} plan assigned for ${grantDuration} days.`
            });
        } catch (error) {
            toast.error(error || "Failed to grant subscription");
        } finally {
            setSubLoading(false);
        }
    };

    const handleGrantConsumables = async () => {
        if (assetLoading) return;
        try {
            if (!consumableAmount || Number(consumableAmount) <= 0) {
                return toast.error("Please provide a valid amount");
            }
            setAssetLoading(true);
            const data = {
                type: consumableType,
                quantity: Number(consumableAmount),
                reason: "Admin Manual Grant"
            };
            await dispatch(grantConsumables({ userId: userData._id, data })).unwrap();
            toast.success("Assets granted successfully!", {
                icon: <Gem className="w-4 h-4 text-brand-aqua" />,
                description: `Added ${consumableAmount} ${consumableType === "SUPER_KEEN" ? "Super Keens" : "Boosts"}.`
            });
        } catch (error) {
            toast.error(error || "Failed to grant assets");
        } finally {
            setAssetLoading(false);
        }
    };

    const isPremiumActive = subscription?.status === "ACTIVE" || userData?.account?.isPremium;

    return (
        <TabsContent value="subscription" className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 outline-none">

            {/* STATUS BANNER */}
            <div className="p-6 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100">
                            <ShieldCheck className={cn("w-7 h-7", isPremiumActive ? "text-brand-aqua" : "text-slate-400")} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h4 className="text-xl font-black text-slate-900">{isPremiumActive ? "Premium Member" : "Free Tier"}</h4>
                                <Badge className={cn(
                                    "font-black uppercase tracking-widest text-[9px] border",
                                    isPremiumActive
                                        ? "bg-brand-aqua/10 text-brand-aqua border-brand-aqua/20"
                                        : "bg-slate-50 text-slate-500 border-slate-200"
                                )}>
                                    {isPremiumActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <p className="text-xs font-bold text-slate-500 mt-1">
                                {isPremiumActive
                                    ? `Valid until ${subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Lifetime'}`
                                    : 'No active subscription. Grant access below.'}
                            </p>
                        </div>
                    </div>

                    {isPremiumActive && subscription?.planType && (
                        <div className="px-5 py-3 rounded-xl border border-slate-100 text-center">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Plan</p>
                            <p className="text-sm font-black text-brand-aqua">{subscription.planType}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* GRANT SUBSCRIPTION */}
                <Card className="rounded-[2rem] border border-brand-aqua/20 shadow-xl shadow-brand-aqua/5 overflow-hidden bg-white">
                    <CardHeader className="p-6 pb-4">
                        <CardTitle className="text-sm font-black flex items-center gap-2 text-slate-900">
                            <Crown className="w-5 h-5 text-brand-aqua" />
                            Grant Subscription
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Assign premium access manually
                        </CardDescription>
                    </CardHeader>
                    <div className="px-6"><Separator /></div>
                    <CardContent className="p-6 pt-5 space-y-5">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Subscription Tier</Label>
                            <Select value={grantPlan} onValueChange={(val) => {
                                setGrantPlan(val);
                                if (val === "MONTHLY") setGrantDuration("30");
                                if (val === "QUARTERLY") setGrantDuration("90");
                            }}>
                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20 transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none shadow-2xl">
                                    <SelectItem value="MONTHLY" className="font-bold py-3 rounded-lg">Monthly (30 Days)</SelectItem>
                                    <SelectItem value="QUARTERLY" className="font-bold py-3 rounded-lg">Quarterly (90 Days)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Duration (Days)</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="number"
                                        className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20"
                                        value={grantDuration}
                                        onChange={(e) => setGrantDuration(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Reason</Label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="e.g. Compensation"
                                        className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20"
                                        value={grantReason}
                                        onChange={(e) => setGrantReason(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-slate-900 text-white font-black h-12 rounded-xl hover:bg-slate-800 transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-slate-900/10 mt-2"
                            onClick={handleGrantSubscription}
                            disabled={subLoading}
                        >
                            {subLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                            Execute Access Grant
                        </Button>
                    </CardContent>
                </Card>

                {/* GRANT CONSUMABLES */}
                <Card className="rounded-[2rem] border border-brand-aqua/20 shadow-xl shadow-brand-aqua/5 overflow-hidden bg-white">
                    <CardHeader className="p-6 pb-4">
                        <CardTitle className="text-sm font-black flex items-center gap-2 text-slate-900">
                            <Gem className="w-5 h-5 text-brand-aqua" />
                            Grant Consumables
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Add Super Keens or Boosts
                        </CardDescription>
                    </CardHeader>
                    <div className="px-6"><Separator /></div>
                    <CardContent className="p-6 pt-5 space-y-5">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Asset Type</Label>
                            <Select value={consumableType} onValueChange={setConsumableType}>
                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20 transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-none shadow-2xl">
                                    <SelectItem value="SUPER_KEEN" className="font-bold py-3 rounded-lg">Super Keens</SelectItem>
                                    <SelectItem value="BOOST" className="font-bold py-3 rounded-lg">Profile Boosts</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between px-1">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Quantity</Label>
                                <span className="text-2xl font-black text-slate-900 tabular-nums">{consumableAmount}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="h-12 w-full rounded-xl border-slate-200 font-black text-lg hover:bg-slate-50 active:scale-95 transition-all"
                                    onClick={() => setConsumableAmount(Math.max(1, Number(consumableAmount) - 1).toString())}
                                >
                                    −
                                </Button>
                                <Input
                                    type="number"
                                    className="h-12 rounded-xl bg-slate-50 border-none font-black text-center text-lg focus:ring-2 ring-brand-aqua/20"
                                    value={consumableAmount}
                                    onChange={(e) => setConsumableAmount(e.target.value)}
                                />
                                <Button
                                    variant="outline"
                                    className="h-12 w-full rounded-xl border-slate-200 font-black text-lg hover:bg-slate-50 active:scale-95 transition-all"
                                    onClick={() => setConsumableAmount((Number(consumableAmount) + 1).toString())}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-slate-900 text-white font-black h-12 rounded-xl hover:bg-slate-800 transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-slate-900/10 mt-2"
                            onClick={handleGrantConsumables}
                            disabled={assetLoading}
                        >
                            {assetLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Gift className="w-4 h-4 mr-2" />}
                            Grant Assets
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    );
};
