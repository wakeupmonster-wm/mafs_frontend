import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Flag,
  Reply,
  Clock,
  AlertCircle,
  CheckCircle2,
  History,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dummyImg from "@/assets/web/dummyImg.webp";

export const ReportsSection = ({ reports, count }) => {
  // 1. Reports ko filter karein
  const pendingReports = reports?.filter((r) => r.status !== "resolved") || [];
  const resolvedReports = reports?.filter((r) => r.status === "resolved") || [];

  // Reusable Report Card Component taaki code repeat na ho
  const ReportItem = ({ r }) => (
    <div className="group relative flex flex-col gap-4 px-4 py-6 rounded-2xl border border-slate-200 bg-slate-50/40 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
              r.status === "resolved"
                ? "bg-emerald-100 text-emerald-500 border-emerald-300"
                : "bg-red-100 text-red-500 border-red-300",
            )}
          >
            {r.status === "resolved" ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Resolved
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending
              </span>
            )}
          </Badge>
          <span className="text-slate-300 text-lg">|</span>
          <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] uppercase">
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            Reason: <span className="text-slate-900">{r.reason}</span>
          </div>
        </div>
        <time className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border">
          {new Date(r.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Reported By
          </p>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
              {/* {r.reportedBy?.nickname?.slice(0, 1)} */}
              <Avatar className="h-8 w-8">
                <AvatarImage src={r.reportedBy?.avatar || dummyImg} alt={""} />
                <AvatarFallback>
                  {dummyImg || r.reportedBy?.nickname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm font-bold truncate">
              {r.reportedBy?.nickname}
            </span>
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Description
          </p>
          <p className="text-sm text-slate-600 italic">
            "{r.description || "No details provided."}"
          </p>
        </div>
      </div>

      {r.adminReply && (
        <div className="mt-2 bg-blue-600 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1 relative z-10 text-white">
            <Reply className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase">
              Admin Resolution
            </span>
          </div>
          <p className="text-sm text-blue-50 relative z-10">{r.adminReply}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {pendingReports.length > 0 && (
        <Card className="p-6 border-red-200 shadow-sm bg-white rounded-2xl border-t-4 border-t-red-500">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2.5">
                <div className="p-2 bg-red-100/60 rounded-xl">
                  <Flag className="w-5 h-5 text-red-600" />
                </div>
                Pending Investigations
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Reports currently requiring admin review.
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-500 border-red-300"
            >
              {pendingReports.length} NEW
            </Badge>
          </div>

          <div className="space-y-4">
            {pendingReports.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed text-slate-400 text-sm">
                All clear! No pending reports.
              </div>
            ) : (
              pendingReports.map((r, idx) => (
                <ReportItem key={r._id || r.id || idx} r={r} idx={idx} />
              ))
            )}
          </div>
        </Card>
      )}

      {/* SECTION 2: RESOLVED HISTORY */}
      <Card className="p-6 border-emerald-200 shadow-sm bg-white rounded-2xl border-t-4 border-t-emerald-500">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2.5">
              <div className="p-2 bg-emerald-100/60 rounded-xl">
                <History className="w-5 h-5 text-emerald-600" />
              </div>
              Report History
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Archive of resolved flags and actions taken.
            </p>
          </div>
          <Badge className="bg-slate-100 text-slate-600">
            {resolvedReports.length} RESOLVED
          </Badge>
        </div>

        <div className="space-y-4">
          {resolvedReports.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No resolved history yet.
            </div>
          ) : (
            resolvedReports.map((r, idx) => (
              <ReportItem key={r._id || r.id || idx} r={r} idx={idx} />
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
