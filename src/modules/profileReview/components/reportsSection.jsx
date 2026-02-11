import { Badge } from "@/components/ui/badge";
import { Flag, Reply, User, MessageSquareText, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ReportsSection = ({ reports, count }) => {
  return (
    <Card className="p-6 border-slate-200 shadow-sm bg-white">
      {/* Header with Counter Badge */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
          <div className="p-2 bg-red-50 rounded-lg">
            <Flag className="w-5 h-5 text-red-600" />
          </div>
          Active Complaints
        </h3>
        <Badge
          variant="secondary"
          className="bg-slate-100 text-slate-600 font-bold px-3"
        >
          {count} {count === 1 ? "Report" : "Reports"}
        </Badge>
      </div>

      <div className="space-y-6">
        {!reports || reports.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
            <MessageSquareText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 font-medium">
              Clear record. No reports found.
            </p>
          </div>
        ) : (
          reports.map((r, idx) => (
            <div
              key={r._id || idx}
              className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-slate-100 bg-slate-50/30 transition-all hover:bg-white hover:shadow-md hover:border-blue-100"
            >
              {/* Header: Reason & Date */}
              <div className="flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={cn(
                      "uppercase text-[10px] font-black tracking-wider px-2 py-0.5 shadow-none border",
                      r.severity === "high"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    )}
                  >
                    {r.reason}
                  </Badge>
                  {r.adminReply && (
                    <Badge className="bg-blue-600 text-white border-none text-[10px] px-2 py-0.5">
                      ACTION TAKEN
                    </Badge>
                  )}
                </div>
                <time className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                  <Clock className="w-3 h-3" />
                  {new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>

              {/* Reporter's Narrative */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 rounded-full" />
                <div className="pl-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1">
                    <User className="w-3 h-3" />{" "}
                    {r.reportedBy?.name ||
                      "User ID: " + r.reportedBy?.slice(-6)}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{r.details || "No additional details provided."}"
                  </p>
                </div>
              </div>

              {/* Admin Response Thread */}
              {r.adminReply && (
                <div className="mt-2 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 bg-blue-600 rounded-md">
                      <Reply className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-black text-blue-900 uppercase tracking-tight">
                      Official Resolution
                    </span>
                  </div>
                  <p className="text-sm text-blue-800 font-medium pl-7">
                    {r.adminReply}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
