import { cn } from "@/lib/utils";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

export const DetailRow = ({ icon, label, value, iconBg }) => {
  return (
    <div className="flex items-center gap-4 group">
      <div
        className={cn(
          "p-2.5 rounded-xl border border-transparent transition-all group-hover:scale-110",
          iconBg
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
};
