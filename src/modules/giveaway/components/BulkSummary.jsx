import React from "react";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle, AlertTriangle } from "lucide-react";

export default function BulkSummary({ summary }) {
  const formatDate = (str) =>
    new Date(str).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border rounded-xl">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-emerald-500 w-5 h-5" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">
              Created
            </p>
            <p className="text-xl font-bold">{summary.created}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-500 w-5 h-5" />
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">
              Skipped
            </p>
            <p className="text-xl font-bold">{summary.skipped}</p>
          </div>
        </div>
      </div>

      {summary.skipped > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-slate-100 px-3 py-2 text-xs font-bold flex items-center gap-2">
            <Info className="w-3 h-3" /> REASONS FOR SKIPPED DATES
          </div>
          <div className="max-h-40 overflow-y-auto divide-y">
            {summary.skippedDates.map((item, i) => (
              <div
                key={i}
                className="px-3 py-2 flex justify-between items-center text-sm"
              >
                <span className="font-medium">{formatDate(item.date)}</span>
                <Badge variant="outline" className="text-[10px]">
                  {item.reason}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
