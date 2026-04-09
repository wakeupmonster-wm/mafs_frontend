import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import { ChartUserDistribution } from "@/components/shared/chart-user-distribution";
import { RecentUsersTable } from "@/components/shared/recent-users-table";
import { CalendarDateRangePicker } from "@/components/shared/date-range-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardKPIs,
  fetchDashboardData,
} from "../store/dashboard.slice";
import { useEffect, useState, useCallback } from "react";
// import { RefreshCw } from "lucide-react";
// import { cn } from "@/lib/utils";
// New Dashboard Components
import { TodayAtAGlance } from "../components/TodayAtAGlance";
import { EcosystemAlerts } from "../components/EcosystemAlerts";
import { KeyMetricsHealth } from "../components/KeyMetricsHealth";
import { UserGrowthChart } from "../components/UserGrowthChart";
import { RevenueBreakdown } from "../components/RevenueBreakdown";
import { LiveActivity } from "../components/LiveActivity";
import { ConversionFunnel } from "../components/ConversionFunnel";
import { ActivityHeatmap } from "../components/ActivityHeatmap";
import { PerformanceInsights } from "../components/PerformanceInsights";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, dashboardData, dashboardMeta } = useSelector(
    (state) => state.dashboard,
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!stats) dispatch(fetchDashboardKPIs());
    if (!dashboardData) dispatch(fetchDashboardData({ preset: "today" }));
  }, [dispatch, stats, dashboardData]);

  const handleApply = useCallback(async () => {
    if (!selectedDate?.from) return;
    setRefreshing(true);
    await dispatch(
      fetchDashboardKPIs({ from: selectedDate.from, to: selectedDate.to }),
    );
    await dispatch(fetchDashboardData(selectedDate));
    setRefreshing(false);
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (selectedDate?.from) {
      handleApply();
    }
  }, [selectedDate, handleApply]);

  return (
    <>
      <div className="flex flex-1 flex-col font-jakarta bg-slate-50 min-h-screen max-w-[100vw] overflow-x-hidden">
        <div className="@container/main flex flex-1 flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 md:gap-6 py-4 px-3 md:py-6 lg:px-6 w-full max-w-full mx-auto">
            {/* Top Dashboard Header */}
            <div className="flex sm:items-center justify-between gap-2 sm:gap-4 w-full">
              <div>
                <h2 className="text-lg lg:text-2xl font-bold tracking-tight text-slate-900 truncate">
                  Dashboard Overview
                </h2>
                {dashboardMeta?.periodLabel && (
                  <p className="text-[11px] lg:text-xs text-slate-500 mt-0.5 font-medium truncate">
                    Showing data for:{" "}
                    {refreshing ? (
                      <span className="text-slate-400 font-semibold animate-pulse">
                        Updating...
                      </span>
                    ) : (
                      <span className="text-brand-aqua font-semibold">
                        {dashboardMeta.periodLabel}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2.5 w-auto shrink-0 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                <CalendarDateRangePicker onDateChange={setSelectedDate} />
              </div>
            </div>

            {/* New Dashboard Top KPI Sections */}
            <div className="w-full flex-col gap-4 md:gap-6 flex min-w-0">
              <TodayAtAGlance data={dashboardData?.zoneA} />
              <EcosystemAlerts data={dashboardData?.zoneB} />
              <KeyMetricsHealth data={dashboardData?.zoneC} />
            </div>

            {/* Secondary Metrics: User Growth, Revenue Breakdown, Live Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full items-stretch min-w-0">
              <UserGrowthChart data={dashboardData?.genderGrowth} />
              <RevenueBreakdown data={dashboardData?.revenueBreakdown} />
              <LiveActivity data={dashboardData?.liveActivity} />
            </div>

            {/* Analytical Row 3: Conversion, Heatmap, Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full items-stretch min-w-0">
              <div className="w-full min-w-0 h-full">
                <ConversionFunnel data={dashboardData?.conversionFunnel} />
              </div>
              <div className="w-full min-w-0 h-full">
                <ActivityHeatmap data={dashboardData?.activityHeatmap} />
              </div>
              <div className="w-full min-w-0 h-full md:col-span-2 lg:col-span-1">
                <PerformanceInsights
                  data={dashboardData?.performanceInsights}
                />
              </div>
            </div>

            {/* Platform Visitors + User Type Distribution */}
            <div className="flex flex-col xl:flex-row gap-4 md:gap-6 w-full items-stretch min-w-0">
              <div className="flex-[1.2] min-w-0 flex flex-col h-full w-full">
                <ChartAreaInteractive kpiData={stats} loading={loading} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col h-full w-full">
                <ChartUserDistribution />
              </div>
            </div>

            {/* Recent Joined Users */}
            <div className="flex flex-col gap-4 md:gap-6 w-full items-stretch min-w-0">
              <div className="w-full flex flex-col h-full min-w-0 overflow-x-auto">
                <RecentUsersTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
