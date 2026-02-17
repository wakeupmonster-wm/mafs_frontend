import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconCreditCard,
  IconCalendarEvent,
  IconCrown,
  IconHistory,
  IconArrowUpRight,
  IconBrandApple,
  IconBrandAndroid,
  IconDeviceMobile,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const FinancialsTab = ({ account, transactions, subscription }) => {
  // Helper to format plan names: "monthly" -> "Premium Monthly"
  const getPlanName = () => {
    if (!subscription?.planType) return "Free Plan";
    return `Premium ${
      subscription.planType.charAt(0).toUpperCase() +
      subscription.planType.slice(1)
    }`;
  };

  const isPremiumActive = subscription?.isCurrentlyActive || account.isPremium;

  return (
    <TabsContent
      value="financials"
      className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-4 duration-500"
    >
      {/* 1. SUBSCRIPTION OVERVIEW (4/12) */}
      <Card
        className={cn(
          "lg:col-span-4 border shadow-md overflow-hidden relative transition-all duration-300",
          isPremiumActive
            ? "bg-slate-900 text-white shadow-brand-aqua"
            : "bg-brand-aqua/5 text-slate-900 border-brand-aqua"
        )}
      >
        {/* Background Decorative Icon */}
        <IconCrown
          className={cn(
            "absolute -right-6 -top-6 h-32 w-32 opacity-10",
            isPremiumActive ? "text-amber-400" : "text-slate-700"
          )}
        />

        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-70 flex items-center gap-2">
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
                isPremiumActive ? "text-amber-400" : "text-slate-500"
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
                    : "bg-amber-500 text-white"
                )}
              >
                {subscription?.status || "INACTIVE"}
              </Badge>
            </div>

            <div className="space-y-3 pt-2">
              {subscription?.startedAt && (
                <div className="flex justify-between items-center p-1 px-3">
                  <span className="text-sm opacity-70">Start Billing Date</span>
                  <span className="text-sm font-bold">
                    {format(new Date(subscription.startedAt), "MMM dd, yyyy")}
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
                    {format(new Date(subscription.expiresAt), "MMM dd, yyyy")}
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
                {format(new Date(account.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
          </div>

          {/* <Separator
            className={isPremiumActive ? "bg-white/10" : "bg-slate-100"}
          /> */}

          {/* <div className="flex flex-col gap-2 pt-2">
            <Button
              className={cn(
                "w-full font-bold h-11 shadow-sm",
                isPremiumActive
                  ? "bg-white text-black hover:bg-slate-100"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              {isPremiumActive ? "Manage Subscription" : "Upgrade to Pro"}
            </Button>
            {isPremiumActive && (
              <Button
                variant="ghost"
                className="text-xs opacity-60 hover:opacity-100 h-8 text-rose-400 hover:text-rose-500"
              >
                Cancel Subscription
              </Button>
            )}
          </div> */}
        </CardContent>
      </Card>

      {/* 2. TRANSACTION HISTORY (8/12) */}
      <Card className="lg:col-span-8 border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100 py-4 px-6">
          <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
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
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-4 text-right font-bold text-slate-400 uppercase text-[10px] tracking-wider">
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
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {format(new Date(txn.occurredAt), "dd MMM yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-slate-900 font-mono text-xs font-bold group-hover:text-indigo-600 transition-colors">
                          {txn.transactionId || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900">
                        ${txn.amount.toFixed(2)}{" "}
                        <span className="text-[10px] text-slate-400">
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
                              : "bg-amber-100 text-amber-700"
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
                      <div className="flex flex-col items-center gap-2 opacity-20">
                        <IconCreditCard size={48} />
                        <p className="font-medium">No payment records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
