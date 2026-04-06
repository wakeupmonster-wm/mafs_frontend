import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import { ChartUserDistribution } from "@/components/shared/chart-user-distribution";
import { RecentUsersTable } from "@/components/shared/recent-users-table";
import { ChartUserStatusDistribution } from "@/components/shared/chart-user-status-distribution";
import { DashboardInsights } from "@/components/shared/dashboard-insights";
import SectionCards from "@/components/shared/section-cards";
import { CalendarDateRangePicker } from "@/components/shared/date-range-picker";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardKPIs } from "../store/dashboard.slice";
import { useEffect, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!stats) dispatch(fetchDashboardKPIs());
  }, [dispatch, stats]);

  

  const handleApply = useCallback(async () => {
    if (!selectedDate?.from) return;
    setRefreshing(true);
    await dispatch(
      fetchDashboardKPIs({ from: selectedDate.from, to: selectedDate.to }),
    );
    setRefreshing(false);
  }, [dispatch, selectedDate]);

  return (
    <>
      <div className="flex flex-1 flex-col font-jakarta bg-slate-50/50 min-h-screen">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-6 px-6 md:gap-6 max-w-[1600px] w-full mx-auto">
            {/* Top Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Dashboard Overview
              </h2>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleApply}
                  disabled={!selectedDate?.from || refreshing}
                  title="Apply date filter"
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200",
                    selectedDate?.from
                      ? "border-violet-300 bg-violet-50 text-violet-600 hover:bg-violet-100 hover:border-violet-400 cursor-pointer shadow-sm"
                      : "border-slate-200 bg-white text-slate-300 cursor-not-allowed",
                  )}
                >
                  <RefreshCw
                    size={16}
                    strokeWidth={2.2}
                    className={cn(refreshing && "animate-spin")}
                  />
                </button>
                <CalendarDateRangePicker onDateChange={setSelectedDate} />
              </div>
            </div>

            <SectionCards stats={stats} loading={loading} error={error} />

            {/* Platform Visitors + User Type Distribution */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full items-stretch">
              <div className="flex-[1.6] min-w-0 flex flex-col h-full">
                <ChartAreaInteractive kpiData={stats} loading={loading} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col h-full">
                <ChartUserDistribution />
              </div>
            </div>

            {/* Recent Joined Users + User Status Distribution */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full items-stretch">
              <div className="flex-[1.6] min-w-0 flex flex-col h-full">
                <RecentUsersTable />
              </div>
              <div className="flex-1 min-w-0 flex flex-col h-full">
                <ChartUserStatusDistribution />
              </div>
            </div>

            <DashboardInsights />
          </div>
        </div>
      </div>
    </>
  );
}
