import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TrendingUp,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  LayoutDashboard,
  ReceiptText,
  ShieldAlert,
} from "lucide-react";

import {
  fetchAllTransactions,
  fetchCancellationAnalytics,
  fetchRevenueAnalytics,
  fetchRiskUsers,
} from "@/modules/subsciptions/store/subcription.slices";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyRevenueChart from "../components/DailyRevenueChart";
import PlatformPieChart from "../components/PlatformPieChart";
import PlanBarChart from "../components/PlanBarChart";
import TransactionTable from "../components/TransactionTable";
import { EmptyState } from "../components/EmptyState";
import RadialStatCard from "../components/radial.stat.card";

// export default function AnalyticsPage() {
//   const dispatch = useDispatch();
//   const {
//     revenueAnalytic,
//     riskUsers,
//     cancelAnalytics,
//     allTransactions,
//     pagination: reduxPagination,
//     loading,
//   } = useSelector((state) => state.subscription);

//   // Filter States
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

//   useEffect(() => {
//     dispatch(fetchRevenueAnalytics());
//     dispatch(fetchCancellationAnalytics({ period }));
//     dispatch(fetchAllTransactions());
//     dispatch(fetchRiskUsers());
//   }, [dispatch]);

//   const { revenue, daily, byPlan, byPlatform, period } = revenueAnalytic;
//   console.log("revenueAnalytic: ", revenueAnalytic);
//   console.log("riskUsers: ", riskUsers);
//   console.log("cancelAnalytics: ", cancelAnalytics);
//   console.log("allTransactions: ", allTransactions);

//   return (
//     <div className="p-6 space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold">Subscription Analytics</h1>
//         <p className="text-gray-500">
//           Period: {new Date(period?.start).toLocaleDateString()}
//           {" - "}
//           {new Date(period?.end).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <ChartRadialShape
//           period={period}
//           title={"Total Revenue"}
//           total={revenue?.total}
//         />

//         <ChartRadialShape
//           period={period}
//           title={"Net Revenue"}
//           total={revenue?.net}
//         />

//         <ChartRadialShape
//           period={period}
//           title={"Refunds"}
//           total={revenue?.refunds?.amount}
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <DailyRevenueChart data={daily} />
//         <PlatformPieChart data={byPlatform} />
//         <PlanBarChart data={byPlan} />
//       </div>
//     </div>
//   );
// }

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const {
    revenueAnalytic,
    riskUsers,
    cancelAnalytics,
    allTransactions,
    loading,
  } = useSelector((state) => state.subscription);

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
          value={`$${revenue?.total}`}
          icon={<CreditCard />}
          subtitle={`${revenue?.purchases?.count} purchases`}
          trendValue="+4.5%"
          trend="up"
        />
        <KpiCard
          title="Net Profit"
          value={`$${revenue?.net}`}
          icon={<TrendingUp />}
          subtitle={`${revenue?.renewals?.count} renewals`}
          trendValue="+2.1%"
          trend="up"
        />
        <KpiCard
          title="Risk Users"
          value={riskUsers?.length || 0}
          icon={<AlertTriangle />}
          subtitle={`${riskUsers?.length} risk users`}
          color="text-amber-600"
        />
        <KpiCard
          title="Refunds"
          value={`$${revenue?.refunds?.amount}`}
          icon={<ArrowUpRight />}
          subtitle={`${revenue?.refunds?.count} refunds`}
          color="text-rose-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="h-12 p-1 bg-slate-200/50 backdrop-blur-md rounded-2xl w-full max-w-max grid grid-cols-3">
            <TabsTrigger
              value="overview"
              className="rounded-xl px-5 py-2.5 flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-brand-aqua transition-all duration-300"
            >
              <LayoutDashboard size={16} />
              <span className="font-semibold">Overview</span>
            </TabsTrigger>

            <TabsTrigger
              value="transactions"
              className="rounded-lg py-2 flex items-center gap-2 data-[state=active]:bg-slate-100 data-[state=active]:shadow-sm data-[state=active]:text-brand-aqua transition-all"
            >
              <ReceiptText size={16} />
              <span className="font-semibold">Transactions</span>
            </TabsTrigger>

            <TabsTrigger
              value="risk"
              className="rounded-lg py-2 flex items-center gap-2 data-[state=active]:bg-slate-100 data-[state=active]:shadow-sm data-[state=active]:text-brand-aqua transition-all"
            >
              <ShieldAlert size={16} />
              <span className="font-semibold">Risk & Cancellation</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Radial Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-200">
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
            <div className="grid grid-cols-2 gap-5">
              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">
                    By Platform
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[210px]">
                  <PlatformPieChart data={byPlatform} />
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-white">
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

        <TabsContent value="transactions">
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Comprehensive list of all subscription events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable data={allTransactions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="min-h-[400px]">
              <CardHeader>
                <CardTitle>Cancellation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {cancelAnalytics?.total === 0 ? (
                  <EmptyState
                    title="Clean Slate"
                    description="No subscription cancellations recorded in this billing cycle."
                  />
                ) : (
                  <DailyRevenueChart
                    data={cancelAnalytics.daily}
                    color="#f43f5e"
                  />
                )}
              </CardContent>
            </Card>

            <Card className="min-h-[400px]">
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
    <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden relative gap-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value || 0}</div>
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
              className={`text-sm font-medium ${
                trend === "up"
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
