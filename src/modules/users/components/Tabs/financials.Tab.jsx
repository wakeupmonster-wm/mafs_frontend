import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconCreditCard,
  IconCalendarEvent,
  IconCrown,
  IconHistory,
  IconBrandApple,
  IconBrandAndroid,
  IconCircleCheck,
  IconRocket,
  IconStar,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
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
import { toast } from "sonner";
import {
  grantSubscription,
  grantConsumables,
} from "@/modules/subsciptions/store/subscription.slice";
import { bgMap, colorMap } from "@/constants/colors";
import StatsGrid from "@/components/common/stats.grid";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Controls the speed of the "wave" between cards
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const FinancialsTab = ({
  userData,
  account,
  transactions,
  subscription,
}) => {
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

  // Helper to format plan names: "monthly" -> "Premium Monthly"
  const getPlanName = () => {
    if (!subscription?.planType) return "Free Plan";
    return `Premium ${
      subscription.planType.charAt(0).toUpperCase() +
      subscription.planType.slice(1)
    }`;
  };

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
        reason: grantReason || "Admin Manual Grant",
      };
      await dispatch(
        grantSubscription({ userId: userData._id, data }),
      ).unwrap();
      toast.success("Subscription granted successfully!", {
        icon: <Sparkles className="w-4 h-4 text-brand-aqua" />,
        description: `${grantPlan} plan assigned for ${grantDuration} days.`,
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
        reason: "Admin Manual Grant",
      };
      await dispatch(grantConsumables({ userId: userData._id, data })).unwrap();
      toast.success("Assets granted successfully!", {
        icon: <Gem className="w-4 h-4 text-brand-aqua" />,
        description: `Added ${consumableAmount} ${consumableType === "SUPER_KEEN" ? "Super Keens" : "Boosts"}.`,
      });
    } catch (error) {
      toast.error(error || "Failed to grant assets");
    } finally {
      setAssetLoading(false);
    }
  };

  // --- Optimized Stats Calculation ---
  const stats = useMemo(() => {
    return [
      {
        label: "Available Boosts",
        val: subscription?.availableBoosts || 0,
        icon: <IconRocket size={22} />, // Icon update kiya (Boost ke liye rocket better hai)
        color: "blue",
        description: "Remaining profile boosts", // Description relevant kiya
      },
      {
        label: "Available Super Keen",
        val: subscription?.availableSuperKeens || 0, // || 0 add kiya safety ke liye
        icon: <IconStar size={22} />, // Icon update kiya (Super Keen ke liye star/heart)
        color: "emerald",
        description: "Remaining super keens", // Description relevant kiya
      },
    ];
  }, [subscription]);

  const isPremiumActive =
    subscription?.status === "ACTIVE" || userData?.account?.isPremium;

  console.log("subscription: ", subscription);

  return (
    <TabsContent
      value="financials"
      className="grid gap-6 focus-visible:ring-offset-0 focus-visible:ring-0"
    >
      {/* --- STATS GRID (Staggered) --- */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 gap-6"
      >
        <StatsGrid stats={stats} colorMap={colorMap} bgMap={bgMap} />
      </motion.div>

      <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* 1. SUBSCRIPTION OVERVIEW (4/12) */}
        <Card
          className={cn(
            "lg:col-span-4 border shadow-sm gap-2 overflow-hidden relative transition-all duration-300",
            isPremiumActive
              ? "bg-slate-900 text-white"
              : "bg-brand-aqua/5 text-slate-900",
          )}
        >
          {/* Background Decorative Icon */}
          <IconCrown
            className={cn(
              "absolute -right-6 -top-6 h-32 w-32 opacity-10",
              isPremiumActive ? "text-amber-400" : "text-slate-700",
            )}
          />

          <CardHeader className="relative z-10">
            <CardTitle className="text-sm text-muted font-bold uppercase tracking-widest opacity-70 flex items-center gap-2">
              <IconCreditCard size={18} /> Membership Status
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            <div className="py-2">
              <h3 className="text-3xl font-black flex items-center gap-2">
                {getPlanName()}
                {isPremiumActive && (
                  <IconCircleCheck className="text-amber-400" size={24} />
                )}
              </h3>
              <p
                className={cn(
                  "text-xs font-medium mt-1",
                  isPremiumActive ? "text-amber-400" : "text-slate-500",
                )}
              >
                {isPremiumActive
                  ? `Billed via ${
                      subscription?.platform?.toUpperCase() || "System"
                    }`
                  : "Limited access to premium features"}
              </p>
            </div>

            <div className="space-y-4">
              <div
                className={`flex justify-between items-center p-3 rounded-xl border 
                ${
                  isPremiumActive
                    ? "bg-white/5 border-white/20"
                    : "bg-gray-100 border-slate-400"
                }
                `}
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  <IconCalendarEvent size={16} /> Status
                </div>
                <Badge
                  className={cn(
                    "border-none font-bold",
                    subscription?.status === "ACTIVE"
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white",
                  )}
                >
                  {subscription?.status || "INACTIVE"}
                </Badge>
              </div>

              <div className="space-y-3 pt-2">
                {subscription?.startedAt && (
                  <div className="flex justify-between items-center p-1 px-3">
                    <span className="text-sm opacity-70">
                      Start Billing Date
                    </span>
                    <span className="text-sm font-bold">
                      {format(new Date(subscription.startedAt), "dd MMM, yyyy")}
                    </span>
                  </div>
                )}

                {subscription?.expiresAt && (
                  <div className="flex justify-between items-center p-1 px-3">
                    <span className="text-sm opacity-70">
                      {subscription.status === "ACTIVE"
                        ? "Next Billing Date"
                        : "Expired On"}
                    </span>
                    <span className="text-sm font-bold">
                      {format(new Date(subscription.expiresAt), "dd MMM, yyyy")}
                    </span>
                  </div>
                )}
              </div>

              <Separator
                className={isPremiumActive ? "bg-white/10" : "bg-slate-400"}
              />

              <div className="flex justify-between items-center p-1 px-3">
                <span className="text-sm opacity-70">Member Since</span>
                <span className="text-sm font-bold">
                  {account?.createdAt
                    ? format(new Date(account.createdAt), "dd MMM, yyyy")
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. TRANSACTION HISTORY (8/12) */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm overflow-hidden flex flex-col rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100 px-6">
            <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
              <IconHistory size={18} className="text-indigo-500" /> Payment
              Records
            </CardTitle>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-white text-slate-500 border-slate-200"
              >
                {transactions.length} Total
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-grow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-t border-b border-slate-300 bg-slate-100">
                    <th className="px-6 py-3 text-left font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-center font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-center font-bold text-slate-500 uppercase text-[10px] tracking-wider">
                      Event
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.length > 0 ? (
                    transactions.map((txn) => (
                      <tr
                        key={txn._id}
                        className="group hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-xs text-slate-500">
                          {txn?.occurredAt
                            ? format(new Date(txn.occurredAt), "dd MMM yyyy")
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-slate-900 font-mono text-xs font-bold group-hover:text-indigo-600 transition-colors">
                            {txn.transactionId || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-black text-slate-900">
                          ${(txn.amount ?? 0).toFixed(2)}{" "}
                          <span className="ml-0.5 text-[10px] text-slate-400">
                            {txn.currency}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            {txn.platform === "ios" ? (
                              <div
                                className="flex items-center gap-1.5 p-1 px-2 rounded-lg bg-slate-100 text-slate-700"
                                title="Apple App Store"
                              >
                                <IconBrandApple
                                  size={14}
                                  className="fill-current"
                                />
                                <span className="text-[10px] font-black uppercase">
                                  iOS
                                </span>
                              </div>
                            ) : (
                              <div
                                className="flex items-center gap-1.5 p-1 px-2 rounded-lg bg-emerald-50 text-emerald-700"
                                title="Google Play Store"
                              >
                                <IconBrandAndroid size={14} />
                                <span className="text-[10px] font-black uppercase">
                                  Android
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge
                            className={cn(
                              "border-none px-3 capitalize text-[10px] font-bold",
                              txn.eventType === "PURCHASE" ||
                                txn.eventType === "RENEW"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700",
                            )}
                          >
                            {txn.eventType.toLowerCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center">
                        <div className="flex flex-col items-center gap-2 opacity-30">
                          <IconCreditCard size={48} />
                          <p className="font-medium text-foreground">
                            No payment records found
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 pb-10 gap-6">
        {/* GRANT SUBSCRIPTION */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-slate-50 rounded-xl gap-4">
          <CardHeader className="px-6 pb-4">
            <CardTitle className="text-sm font-black flex items-center gap-2 text-foreground">
              <Crown className="w-5 h-5 text-brand-aqua" />
              Grant Subscription
            </CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">
              Assign premium access manually
            </CardDescription>
          </CardHeader>

          <div className="px-6">
            <Separator />
          </div>

          <CardContent className="p-6 pt-2 space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-secondary-foreground tracking-widest ml-1">
                Subscription Tier
              </Label>
              <Select
                value={grantPlan}
                onValueChange={(val) => {
                  setGrantPlan(val);
                  if (val === "MONTHLY") setGrantDuration("30");
                  if (val === "QUARTERLY") setGrantDuration("90");
                }}
              >
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20 transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-lg">
                  <SelectItem
                    value="MONTHLY"
                    className="font-bold py-3 rounded-lg"
                  >
                    Monthly (30 Days)
                  </SelectItem>
                  <SelectItem
                    value="QUARTERLY"
                    className="font-bold py-3 rounded-lg"
                  >
                    Quarterly (90 Days)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-secondary-foreground tracking-widest ml-1">
                  Duration (Days)
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
                  <Input
                    type="number"
                    className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20"
                    value={grantDuration}
                    onChange={(e) => setGrantDuration(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-secondary-foreground tracking-widest ml-1">
                  Reason
                </Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
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
              className="w-full border border-slate-300 bg-slate-200/50 text-slate-900 hover:text-white font-semibold hover:font-bold h-12 rounded-xl hover:bg-brand-aqua transition-all duration-300 text-[11px] uppercase tracking-widest shadow-sm mt-2"
              onClick={handleGrantSubscription}
              disabled={subLoading}
            >
              {subLoading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <Zap className="w-4 h-4 mr-2" />
              )}
              Execute Access Grant
            </Button>
          </CardContent>
        </Card>

        {/* GRANT CONSUMABLES */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-slate-50 rounded-xl gap-4">
          <CardHeader className="px-6 pb-2">
            <CardTitle className="text-sm font-black flex items-center gap-2 text-foreground">
              <Gem className="w-5 h-5 text-brand-aqua" />
              Grant Consumables
            </CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground">
              Add Super Keens or Boosts
            </CardDescription>
          </CardHeader>

          <div className="px-6">
            <Separator />
          </div>

          <CardContent className="p-6 pt-2 space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-secondary-foreground tracking-widest ml-1">
                Asset Type
              </Label>
              <Select value={consumableType} onValueChange={setConsumableType}>
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold text-sm focus:ring-2 ring-brand-aqua/20 transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-lg">
                  <SelectItem
                    value="SUPER_KEEN"
                    className="font-bold py-3 rounded-lg"
                  >
                    Super Keens
                  </SelectItem>
                  <SelectItem
                    value="BOOST"
                    className="font-bold py-3 rounded-lg"
                  >
                    Profile Boosts
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <Label className="text-[10px] font-black uppercase text-secondary-foreground tracking-widest">
                  Quantity
                </Label>
                <span className="text-2xl font-black text-slate-900 tabular-nums">
                  {consumableAmount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl border-slate-200 font-black text-lg hover:bg-slate-50 active:scale-95 transition-all"
                  onClick={() =>
                    setConsumableAmount(
                      Math.max(1, Number(consumableAmount) - 1).toString(),
                    )
                  }
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
                  onClick={() =>
                    setConsumableAmount(
                      (Number(consumableAmount) + 1).toString(),
                    )
                  }
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              className="w-full border border-slate-300 bg-slate-200/50 text-slate-900 hover:text-white font-semibold hover:font-bold h-12 rounded-xl hover:bg-brand-aqua transition-all duration-300 text-[11px] uppercase tracking-widest shadow-sm mt-2"
              onClick={handleGrantConsumables}
              disabled={assetLoading}
            >
              {assetLoading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <Gift className="w-4 h-4 mr-2" />
              )}
              Grant Assets
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};
