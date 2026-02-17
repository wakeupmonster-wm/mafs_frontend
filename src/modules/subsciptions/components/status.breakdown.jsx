import { IconActivity } from "@tabler/icons-react";
import React from "react";

const StatusBreakdown = ({ stats }) => {
  const status = [
    {
      label: "Expired",
      val: stats?.expired,
      color: "bg-red-50 text-red-700",
    },
    {
      label: "Cancelled",
      val: stats?.cancelled,
      color: "bg-slate-50 text-slate-700",
    },
    {
      label: "Grace",
      val: stats?.grace,
      color: "bg-orange-50 text-orange-700",
    },
    {
      label: "Paused",
      val: stats?.paused,
      color: "text-purple-700 bg-purple-50",
    },
    {
      label: "Revoked",
      val: stats?.revoked,
      color: "text-rose-700 bg-rose-50",
    },
    {
      label: "Pending",
      val: stats?.pending,
      color: "text-blue-700 bg-blue-50",
    },
  ];
  return (
    <div className="bg-white p-5 rounded-2xl border border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md">
      <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
        <IconActivity className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />{" "}
        Status Breakdown
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {status.map((item) => (
          <div
            key={item.label}
            className={`flex justify-between items-center p-2 rounded-lg border border-transparent ${item.color}`}
          >
            <span className="text-[11px] font-bold uppercase">
              {item.label}
            </span>
            <span className="font-bold">{item.val || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBreakdown;
