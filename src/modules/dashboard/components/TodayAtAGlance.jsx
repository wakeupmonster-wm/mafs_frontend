import React from "react";
import { Sparkles, TrendingUp, Users, ShieldAlert, Flag } from "lucide-react";
import { useNavigate } from "react-router";

export function TodayAtAGlance({ data }) {
  const navigate = useNavigate();
  if (!data) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="text-emerald-500" size={20} />;
      case "TrendingUp":
        return <TrendingUp className="text-blue-500" size={20} />;
      case "Users":
        return <Users className="text-orange-500" size={20} />;
      case "ShieldAlert":
        return <ShieldAlert className="text-cyan-600" size={20} />;
      case "Flag":
        return <Flag className="text-sky-500" size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-50";
      case "blue":
        return "bg-blue-50";
      case "orange":
        return "bg-orange-50";
      case "cyan":
        return "bg-cyan-50";
      case "sky":
        return "bg-sky-50";
      default:
        return "bg-slate-50";
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 hover:border-brand-aqua/50 rounded-2xl p-4 lg:p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base lg:text-lg font-bold text-primary">
          {data.title || "Today at a glance"}
        </h2>
        <p className="text-[11px] font-medium text-muted-foreground ml-1">
          Key insights that matter most right now.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {data.stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              navigate(
                stat.route || "/admin/management/users-management",
                // {
                //   state: stat.badge,
                // }
              )
            }
          >
            <div
              className={`p-3 rounded-full ${getBgColor(stat.color)} flex items-center justify-center shrink-0`}
            >
              {getIcon(stat.icon)}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-500 truncate">
                {stat.label}
              </p>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {stat.value}
              </h3>
              <p
                className={`text-[11px] ${stat.isActionable ? "text-cyan-600 font-semibold cursor-pointer" : "text-slate-400"}`}
              >
                {stat.sub}
              </p>
            </div>
            {idx < data.stats.length - 1 && (
              <div className="hidden md:block h-10 w-[1px] bg-slate-200 ml-auto" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
