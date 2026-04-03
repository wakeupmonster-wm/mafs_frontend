import { fetchDashboardKPIs } from "@/modules/dashboard/store/dashboard.slice";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function DataTable({ kpiData, loading, error }) {
  const dispatch = useDispatch();

  const kpis = kpiData;

  const fetchKpiData = useCallback(async () => {
    dispatch(fetchDashboardKPIs());
  }, [dispatch]);

  useEffect(() => {
    fetchKpiData();
    const interval = setInterval(fetchKpiData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchKpiData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!kpis) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No KPI data found.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchKpiData}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // User Status Distribution
  const userStatusData = [
    { name: "Active Users", value: kpis?.totalUsers?.value, color: "#10b981" },
    {
      name: "Banned Users",
      value: kpis?.TotalBanUsers?.value,
      color: "#ef4444",
    },
  ];

  // User Type Distribution
  const userTypeData = [
    { name: "Paid Users", value: kpis?.paidUsers?.value, color: "#f59e0b" },
    {
      name: "Free Users",
      value: kpis?.totalUsers?.value - kpis?.paidUsers?.value,
      color: "#6b7280",
    },
  ];

  // User Activity
  const activityData = [
    {
      name: "Active (24h)",
      value: kpis?.activeUsers24h?.value,
      color: "#3b82f6",
    },
    {
      name: "Inactive",
      value: kpis?.totalUsers?.value - kpis?.activeUsers24h.value,
      color: "#9ca3af",
    },
  ];

  // Support & Moderation
  const supportData = [
    { name: "Open Tickets", value: kpis?.TotalTickets.value, color: "#8b5cf6" },
    { name: "Open Reports", value: kpis?.openReports.value, color: "#ec4899" },
    {
      name: "Pending Verifications",
      value: kpis?.pendingVerifications.value,
      color: "#14b8a6",
    },
    {
      name: "Claimed Prizes",
      value: kpis?.ClaimedPrize.value,
      color: "#f97316",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const renderPieChart = (data, title) => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            {/* <span className="text-sm font-semibold text-gray-800">
              {item?.value}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-jakarta">
              KPI Overview
            </h1>
            <p className="text-gray-600 mt-2">
              Last updated: {new Date(kpis.lastUpdatedAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={fetchKpiData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderPieChart(userStatusData, "User Status Distribution")}
          {renderPieChart(userTypeData, "User Type Distribution")}
          {renderPieChart(activityData, "User Activity (24h)")}
          {renderPieChart(supportData, "Support & Moderation")}
        </div>

        {/* Alerts */}
        {kpis?.openReports.severity === "high" && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  High number of open reports ({kpis?.openReports.value}).
                  Immediate attention required.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
