import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

export function EcosystemAlerts({ data }) {
  if (!data) return null;
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="text-rose-600" size={24} />;
      case "AlertTriangle":
        return <AlertTriangle className="text-amber-600" size={24} />;
      case "Activity":
        return <Activity className="text-sky-600" size={24} />;
      default:
        return <AlertTriangle size={24} />;
    }
  };

  const getBadgeColor = (badgeColor) => {
    switch (badgeColor) {
      case "red":
        return "bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-100";
      case "orange":
        return "bg-amber-100 text-amber-600 border-amber-200 hover:bg-amber-100";
      case "blue":
        return "bg-sky-100 text-sky-600 border-sky-200 hover:bg-sky-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="mb-1">
      <div className="mb-4">
        <h2 className="text-base font-bold text-primary group flex items-center gap-2">
          Alerts
          <span className="text-[11px] font-medium text-muted-foreground ml-1">
            Needs your attention
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.alerts.map((alert, idx) => (
          <div
            key={idx}
            className="group relative flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 py-5 hover:border-brand-aqua/50 transition-all duration-300 cursor-pointer"
            onClick={() =>
              navigate(alert.route || "/admin/management/users-management", {
                state: alert.badge,
              })
            }
          >
            <div
              className={`p-3.5 rounded-xl ${alert.badgeColor === "red" ? "bg-rose-100" : alert.badgeColor === "orange" ? "bg-amber-100" : "bg-sky-100"} flex items-center justify-center shrink-0`}
            >
              {getIcon(alert.icon)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-700 truncate">
                  {alert.label}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[9px] h-4.5 px-1.5 font-bold uppercase tracking-wider rounded-[4px] ${getBadgeColor(alert.badgeColor)}`}
                >
                  {alert.badge}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-foreground leading-snug mb-1">
                {alert.value}
              </h3>
              <p className="text-[11px] text-muted-foreground font-medium">
                {alert.sub}
              </p>
            </div>

            <div className="p-2 rounded-full bg-slate-100 text-brand-aqua/50 group-hover:bg-blue-50 group-hover:text-brand-aqua transition-colors">
              <ChevronRight size={18} strokeWidth={2.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
