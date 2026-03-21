import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TrendingUp,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";
import {
  fetchAllTransactions,
  fetchCancellationAnalytics,
  fetchRevenueAnalytics,
  fetchRiskUsers,
} from "@/modules/subsciptions/store/subscription.slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ResponsiveRevenueDashboard from "../components/ResponsiveRevenueDashboard";

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const { revenueAnalytic, riskUsers, cancelAnalytics, allTransactions } =
    useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchRevenueAnalytics());
    dispatch(fetchCancellationAnalytics());
    dispatch(fetchAllTransactions());
    dispatch(fetchRiskUsers());
  }, [dispatch]);

  const { revenue, daily, byPlan, byPlatform, period } = revenueAnalytic;

  return (
    <div className="flex flex-col gap-6 p-4 min-h-screen">
      {/* Top Navigation / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Subscription Insights
          </h1>
          <p className="text-slate-500 text-sm">
            Analysis for {new Date(period?.start).toLocaleDateString()} —{" "}
            {new Date(period?.end).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Revenue"
          value={`$${revenue?.total ?? 0}`}
          icon={<CreditCard />}
          subtitle={`${revenue?.purchases?.count ?? 0} purchases`}
          trendValue="+4.5%"
          trend="up"
        />
        <KpiCard
          title="Net Profit"
          value={`$${revenue?.net ?? 0}`}
          icon={<TrendingUp />}
          subtitle={`${revenue?.renewals?.count ?? 0} renewals`}
          trendValue="+2.1%"
          trend="up"
        />
        <KpiCard
          title="Risk Users"
          value={riskUsers?.length ?? 0}
          icon={<AlertTriangle />}
          subtitle={`${riskUsers?.length} risk users`}
          color="text-amber-600"
        />
        <KpiCard
          title="Refunds"
          value={`$${revenue?.refunds?.amount ?? 0}`}
          icon={<ArrowUpRight />}
          subtitle={`${revenue?.refunds?.count ?? 0} refunds`}
          color="text-rose-600"
        />
      </div>

      <ResponsiveRevenueDashboard
        revenue={revenue}
        daily={daily}
        byPlan={byPlan}
        byPlatform={byPlatform}
        allTransactions={allTransactions}
        cancelAnalytics={cancelAnalytics}
        riskUsers={riskUsers}
      />
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon,
  trend = "neutral",
  trendValue,
  subtitle,
  color = "text-slate-900",
}) {
  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden relative gap-2 bg-gradient-to-br from-gray-50 via-blue-60 to-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value ?? 0}</div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}

        {trendValue && (
          <div className="flex items-center gap-1.5 mt-3">
            {trend === "up" && (
              <TrendingUp className="w-4 h-4 text-alerts-success" />
            )}
            {trend === "down" && (
              <TrendingDown className="w-4 h-4 text-alerts-error" />
            )}
            <span
              className={`text-sm font-medium ${trend === "up"
                ? "text-alerts-success"
                : trend === "down"
                  ? "text-alerts-error"
                  : "text-muted-foreground"
                }`}
            >
              {trendValue}{" "}
              <span className="text-slate-400 ml-1 font-normal text-[10px]">
                vs last month
              </span>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
