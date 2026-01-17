import React, { useEffect } from "react"; // Added useEffect
import { Activity, Zap, Users, Heart, DollarSign } from "lucide-react"; // Import icons for mapping
import KPIStat from "../components/KPIStat";
import ActivityFeed from "../components/ActivityFeed";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../store/dashboard.slice";
import AnalyticsChart from "../components/AnalyticsChart";

// Map string names from Redux to actual Lucide Components
const iconMap = {
  Users,
  Heart,
  DollarSign,
  Activity,
};
const DashboardNew = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading && stats.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center text-gray-400 font-bold">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          Loading System Metrics...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            System Overview
          </h1>
          <p className="text-gray-500 font-medium">
            Monitoring the MAFS ecosystem health.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all active:scale-95">
          <Zap className="w-4 h-4 fill-white" />
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <KPIStat
            key={index}
            {...stat}
            icon={iconMap[stat.icon] || Activity} // Pass the component, not the string
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col min-h-[450px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Success Rate Trends
              </h3>
              <p className="text-sm text-gray-500">
                Weekly matching performance
              </p>
            </div>
            <div className="bg-pink-50 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">
              Live Data
            </div>
          </div>

          <AnalyticsChart />
        </div>

        {/* Side Activity */}
        <ActivityFeed />
      </div>
    </div>
  );
};

export default DashboardNew;
