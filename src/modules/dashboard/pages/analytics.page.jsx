import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TrendingUp,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Filter,
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
    <div className="flex flex-col gap-6 p-8 bg-[#f8fafc] min-h-screen">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Revenue"
          value={`$${revenue?.total}`}
          icon={<CreditCard />}
          trend="+4.5%"
        />
        <KpiCard
          title="Net Profit"
          value={`$${revenue?.net}`}
          icon={<TrendingUp />}
          trend="+2.1%"
        />
        <KpiCard
          title="Risk Users"
          value={riskUsers?.length || 0}
          icon={<AlertTriangle />}
          color="text-amber-600"
        />
        <KpiCard
          title="Refunds"
          value={`$${revenue?.refunds?.amount}`}
          icon={<ArrowUpRight />}
          color="text-rose-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-[500px] grid-cols-3 bg-slate-200/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="risk">Risk & Cancellation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Trend Chart */}
            <Card className="lg:col-span-1 border-none shadow-sm ring-1 ring-slate-200">
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
            <div className="flex flex-col gap-6">
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

              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">
                    By Plan Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-max h-[180px]">
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

function KpiCard({ title, value, icon, trend, color = "text-slate-900" }) {
  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        {trend && (
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            {trend}{" "}
            <span className="text-slate-400 ml-1 font-normal text-[10px]">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
