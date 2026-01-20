import React from "react";
import { useSelector } from "react-redux";
import { UserPlus, Heart, AlertCircle, CheckCircle2 } from "lucide-react";

const iconMap = {
  UserPlus,
  Heart,
  AlertCircle,
  CheckCircle2,
};

const ActivityFeed = () => {
  const { activities } = useSelector((state) => state.dashboard);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-lg font-black text-gray-900 mb-6">Recent Activity</h3>

      <div className="space-y-6">
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon] || CheckCircle2;

          return (
            <div key={activity.id} className="flex gap-4 relative">
              {/* Timeline Connector (except for last item) */}
              <div className="absolute left-5 top-10 bottom-[-24px] w-[2px] bg-gray-50 last:hidden" />

              <div
                className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 z-10`}
              >
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <span className="text-[10px] font-medium text-gray-400 uppercase">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 capitalize">
                  {activity.type}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-8 py-3 text-sm font-bold text-pink-600 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors">
        View All Logs
      </button>
    </div>
  );
};

export default ActivityFeed;
