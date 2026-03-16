import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DailyRevenueChart from "../components/DailyRevenueChart";
import PlatformPieChart from "../components/PlatformPieChart";
import PlanBarChart from "../components/PlanBarChart";
import TransactionTable from "../components/TransactionTable";
import { EmptyState } from "../components/EmptyState";
import RadialStatCard from "../components/radial.stat.card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LayoutDashboard, ReceiptText, ShieldAlert } from "lucide-react";

export default function ResponsiveRevenueDashboard({
  revenue,
  daily,
  byPlan,
  byPlatform,
  allTransactions,
  cancelAnalytics,
  riskUsers,
}) {
  // Sync the active tab state for both Select and Tabs
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="flex items-center justify-between">
        {/* --- MOBILE: SELECT BAR (Visible only on small screens) --- */}
        <div className="w-full md:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="h-12 w-full rounded-xl bg-slate-200/50 border-none backdrop-blur-md px-4 font-bold text-slate-700 focus:ring-brand-aqua">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 shadow-xl">
              <SelectItem value="overview" className="py-3">
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={18} className="text-brand-aqua" />
                  <span className="font-semibold">Overview</span>
                </div>
              </SelectItem>
              <SelectItem value="transactions" className="py-3">
                <div className="flex items-center gap-2">
                  <ReceiptText size={18} className="text-brand-aqua" />
                  <span className="font-semibold">Transactions</span>
                </div>
              </SelectItem>
              <SelectItem value="risk" className="py-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-brand-aqua" />
                  <span className="font-semibold">Risk & Cancellation</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* --- DESKTOP: TAB LIST (Hidden on mobile) --- */}
        <TabsList className="hidden md:grid h-12 p-1 bg-slate-200/50 backdrop-blur-md rounded-2xl w-full max-w-max grid-cols-3">
          <TabsTrigger
            value="overview"
            className="rounded-xl px-5 py-2.5 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-brand-aqua transition-all duration-300"
          >
            <LayoutDashboard size={16} />
            <span className="font-semibold">Overview</span>
          </TabsTrigger>

          <TabsTrigger
            value="transactions"
            className="rounded-xl px-5 py-2.5 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-brand-aqua transition-all"
          >
            <ReceiptText size={16} />
            <span className="font-semibold">Transactions</span>
          </TabsTrigger>

          <TabsTrigger
            value="risk"
            className="rounded-xl px-5 py-2.5 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-brand-aqua transition-all"
          >
            <ShieldAlert size={16} />
            <span className="font-semibold">Risk & Cancellation</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* --- TAB CONTENT SECTIONS --- */}
      <TabsContent value="overview" className="outline-none space-y-6">
        {/* Radial Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RadialStatCard
            title="Total Revenue"
            total={revenue?.total}
            color="hsl(151 72% 46%)"
            startAngle={225}
          />
          <RadialStatCard
            title="Net Revenue"
            total={revenue?.net}
            color="hsl(45 98% 54%)"
            startAngle={225}
          />
          <RadialStatCard
            title="Risk Users"
            total={0}
            color="hsl(38, 92%, 60%)"
            startAngle={225}
          />
          <RadialStatCard
            title="Refunds"
            total={revenue?.refunds?.amount}
            color="hsl(38, 92%, 60%)"
            startAngle={225}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Main Trend Chart */}
          <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-200 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-lg">Revenue Timeline</CardTitle>
              <CardDescription>
                Daily revenue fluctuations over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <DailyRevenueChart data={daily} />
            </CardContent>
          </Card>

          {/* Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  By Platform
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[210px]">
                <PlatformPieChart data={byPlatform} />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
              <CardHeader className="pb-0 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    By Plan Type
                  </CardTitle>
                </div>
                <div className="h-2 w-2 rounded-full bg-brand-aqua animate-pulse" />
              </CardHeader>
              <CardContent className="w-full h-[180px] pt-4">
                <PlanBarChart data={byPlan} />
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="transactions" className="outline-none">
        <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
          <CardHeader className={"px-3 md:px-6"}>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Comprehensive list of all subscription events
            </CardDescription>
          </CardHeader>
          <CardContent className={"px-3 md:px-6"}>
            <TransactionTable data={allTransactions} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="risk" className="outline-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="min-h-[400px] bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Cancellations Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cancelAnalytics?.total === 0 ? (
                <EmptyState
                  title="Clean Slate"
                  description="🎉 No subscription cancellations recorded in this billing cycle."
                />
              ) : (
                <DailyRevenueChart
                  data={cancelAnalytics?.daily}
                  color="#f43f5e"
                />
              )}
            </CardContent>
          </Card>

          <Card className="min-h-[400px] bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <CardHeader>
              <CardTitle>At-Risk Users</CardTitle>
            </CardHeader>
            <CardContent>
              {riskUsers.length === 0 ? (
                <EmptyState
                  title="All Clear"
                  description="None of your users are currently flagged as high-risk for churn."
                />
              ) : (
                <div className="space-y-4">
                  {/* Map through riskUsers here */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
