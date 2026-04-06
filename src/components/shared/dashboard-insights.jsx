import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  LifeBuoy,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchPendingVerifications } from "@/modules/verification/store/verfication.slice";
import { fetchReportedProfiles } from "@/modules/profileReview/store/profile-review.slice";
import { fetchMyTickets } from "@/modules/support/store/support.slice";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const TABS = [
  {
    id: "kyc",
    label: "KYC Verification",
    icon: ShieldCheck,
    path: "/admin/verification",
  },
  {
    id: "reports",
    label: "Profile Reports",
    icon: AlertTriangle,
    path: "/admin/profile-review",
  },
  {
    id: "support",
    label: "Support Management",
    icon: LifeBuoy,
    path: "/admin/support",
  },
];

const DUMMY_CHART_DATA = [
  { month: "Jan", blue: 320, green: 710, orange: 80 },
  { month: "Feb", blue: 410, green: 760, orange: 90 },
  { month: "Mar", blue: 380, green: 840, orange: 85 },
  { month: "Apr", blue: 520, green: 980, orange: 110 },
  { month: "May", blue: 590, green: 1120, orange: 95 },
  { month: "Jun", blue: 680, green: 1245, orange: 105 },
];

export function DashboardInsights() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kyc");

  const { pendingVerifications, loading: kycLoading } = useSelector(
    (state) => state.verification,
  );
  const { list: reports, loading: reportsLoading } = useSelector(
    (state) => state.profileReview,
  );
  const { tickets, loading: supportLoading } = useSelector(
    (state) => state.support,
  );

  useEffect(() => {
    dispatch(fetchPendingVerifications({ page: 1, limit: 5 }));
    dispatch(fetchReportedProfiles({ page: 1, limit: 5 }));
    dispatch(fetchMyTickets({ page: 1, limit: 5 }));
  }, [dispatch]);

  const activeData = useMemo(() => {
    if (activeTab === "kyc") return pendingVerifications.slice(0, 5);
    if (activeTab === "reports") return reports.slice(0, 5);
    return tickets.slice(0, 5);
  }, [activeTab, pendingVerifications, reports, tickets]);

  const metrics = useMemo(() => {
    if (activeTab === "kyc")
      return [
        {
          label: "Total Requests",
          value: "235",
          icon: Users,
          color: "text-blue-500",
          trend: "Active queue",
        },
        {
          label: "Approved",
          value: "9",
          icon: ShieldCheck,
          color: "text-emerald-500",
          trend: "Verified users",
        },
        {
          label: "Pending",
          value: "1",
          icon: AlertTriangle,
          color: "text-amber-500",
          trend: "Waiting review",
        },
        {
          label: "Rejected",
          value: "0",
          icon: ShieldCheck,
          color: "text-rose-500",
          trend: "Declined requests",
        },
      ];
    if (activeTab === "reports")
      return [
        {
          label: "Total Reports",
          value: "5",
          icon: Users,
          color: "text-blue-500",
          trend: "Lifetime reports",
        },
        {
          label: "New",
          value: "3",
          icon: AlertTriangle,
          color: "text-rose-500",
          trend: "Unassigned/Recent",
        },
        {
          label: "In Progress",
          value: "0",
          icon: AlertTriangle,
          color: "text-amber-500",
          trend: "Being reviewed",
        },
        {
          label: "Resolved",
          value: "2",
          icon: ShieldCheck,
          color: "text-emerald-500",
          trend: "Issues fixed",
        },
        {
          label: "High Priority",
          value: "0",
          icon: AlertTriangle,
          color: "text-rose-600",
          trend: "Critical action",
        },
      ];
    return [
      {
        label: "Total Tickets",
        value: "19",
        icon: LifeBuoy,
        color: "text-indigo-500",
        trend: "All tickets",
      },
      {
        label: "Open",
        value: "10",
        icon: AlertTriangle,
        color: "text-blue-500",
        trend: "Awaiting assignment",
      },
      {
        label: "In Progress",
        value: "0",
        icon: TrendingUp,
        color: "text-amber-500",
        trend: "Currently handled",
      },
      {
        label: "Resolved",
        value: "0",
        icon: ShieldCheck,
        color: "text-emerald-500",
        trend: "Fixed, pending closure",
      },
      {
        label: "Closed",
        value: "0",
        icon: ShieldCheck,
        color: "text-slate-500",
        trend: "Finalized tickets",
      },
    ];
  }, [activeTab]);

  const activeConfig = TABS.find((t) => t.id === activeTab);

  return (
    <Card className="rounded-[24px] gap-4 shadow-md bg-slate-50 border border-slate-200 text-slate-900 overflow-hidden p-0">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 pb-2">
        <div>
          <CardTitle className="text-xl font-bold tracking-tight text-slate-900 mb-1">
            Customer Insights
          </CardTitle>
          <p className="text-slate-500 text-sm">
            Growth trends and demographics analysis
          </p>
        </div>
        <Button
          onClick={() => navigate(activeConfig.path)}
          variant="outline"
          className="rounded-xl border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-9 px-4 text-xs font-semibold"
        >
          View More <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </CardHeader>

      <div className="px-6 pb-1">
        <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-4 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-slate-50 text-slate-900 shadow-md ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-300/50",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-cyan-500" : "text-slate-400",
                  )}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <CardContent className="p-6 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest pl-1">
              {activeConfig.label} Trends
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DUMMY_CHART_DATA} barGap={8}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.02)" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      color: "#0f172a",
                      fontSize: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="blue"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    barSize={12}
                  />
                  <Bar
                    dataKey="green"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    barSize={12}
                  />
                  <Bar
                    dataKey="orange"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Section: Key Metrics Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest pl-1">
              Key Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {metrics.map((metric, idx) => {
                const MetIcon = metric.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 p-5 rounded-[20px] border border-slate-200/60 hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                        <MetIcon className={cn("h-4 w-4", metric.color)} />
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
                          {metric.label}
                        </p>
                        <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                          {metric.value}
                        </h4>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 ml-[52px]">
                      {metric.trend}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
