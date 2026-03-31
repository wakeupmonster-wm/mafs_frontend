// import { Badge } from "@/components/ui/badge";
// import {
//   Flag,
//   Reply,
//   MessageSquareText,
//   Clock,
//   AlertCircle,
//   CheckCircle2,
// } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// export const ReportsSection = ({ reports, count }) => {
//   const allReportsResolved = reports?.every((r) => r.status === "resolved");

//   console.log("reports: ", reports);
//   console.log("allReportsResolved: ", allReportsResolved);

//   return (
//     <Card className="p-6 border-slate-200 gap-4 shadow-sm bg-white rounded-2xl">
//       {/* Header section with refined count */}
//       <div className="flex items-center justify-between mb-2">
//         <div className="space-y-1">
//           <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2.5">
//             <div className="p-2 bg-red-50 rounded-xl">
//               <Flag className="w-5 h-5 text-red-600" />
//             </div>
//             {allReportsResolved ? "Report History" : "Pending Investigations"}
//           </h3>
//           <p className="text-xs text-slate-500 font-medium pl-1">
//             Documentation of all user-generated flags and moderation actions.
//           </p>
//         </div>
//         <Badge className="bg-slate-100 text-slate-600 border-slate-200 font-black px-4 py-1.5 rounded-lg shadow-none">
//           {count} TOTAL
//         </Badge>
//       </div>

//       <div className="space-y-8">
//         {!reports || reports.length === 0 ? (
//           <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
//             <MessageSquareText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
//             <p className="text-slate-500 font-bold">No history available</p>
//             <p className="text-slate-400 text-xs">
//               This profile has not been flagged yet.
//             </p>
//           </div>
//         ) : (
//           reports.map((r, idx) => (
//             <div
//               key={r._id || idx}
//               className="group relative flex flex-col gap-4 px-4 py-6 rounded-2xl border border-slate-200 bg-slate-50/40 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-100"
//             >
//               {/* 1. TOP BAR: Status & Metadata */}
//               <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//                 <div className="flex items-center gap-2">
//                   <Badge
//                     className={cn(
//                       "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
//                       r.status === "resolved"
//                         ? "bg-emerald-100 text-emerald-700"
//                         : "bg-amber-100 text-amber-700",
//                     )}
//                   >
//                     {r.status === "resolved" ? (
//                       <span className="flex items-center gap-1">
//                         <CheckCircle2 className="w-3 h-3" /> Resolved
//                       </span>
//                     ) : (
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> Pending
//                       </span>
//                     )}
//                   </Badge>
//                   <span className="text-slate-300 text-lg">|</span>
//                   <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] uppercase tracking-tight">
//                     <AlertCircle className="w-3.5 h-3.5 text-red-500" />
//                     Issue: <span className="text-slate-900">{r.reason}</span>
//                   </div>
//                 </div>

//                 <time className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-100">
//                   <Clock className="w-3 h-3" />
//                   {new Date(r.createdAt).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </time>
//               </div>

//               {/* 2. REPORTER INFO & DETAILS */}
//               <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//                 <div className="md:col-span-4 space-y-2">
//                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                     Reporter Source
//                   </p>
//                   <div className="flex items-center gap-2 py-3">
//                     <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
//                       {r.reportedBy?.nickname?.slice(0, 1) || "U"}
//                     </div>
//                     <div className="flex flex-col overflow-hidden">
//                       <span className="text-sm font-bold text-slate-900 truncate">
//                         {r.reportedBy?.nickname || "Anonymous"}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-mono truncate">
//                         ID: {r.reportedBy?.id}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="md:col-span-8 space-y-2">
//                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                     Narrative & Evidence
//                   </p>
//                   <div className="py-3 min-h-[80px]">
//                     <p className="text-sm text-slate-600 leading-relaxed italic">
//                       "
//                       {r.description ||
//                         "No additional descriptive details were provided by the reporter for this specific flag."}
//                       "
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* 3. ADMIN RESOLUTION (If exists) */}
//               {r.adminReply && (
//                 <div className="mt-2 bg-blue-600 rounded-[1.5rem] p-5 shadow-lg shadow-blue-100 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 p-4 opacity-10">
//                     <ShieldCheck className="w-16 h-16 text-white" />
//                   </div>
//                   <div className="flex items-center gap-2 mb-3 relative z-10">
//                     <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg">
//                       <Reply className="w-4 h-4 text-white" />
//                     </div>
//                     <span className="text-xs font-black text-white uppercase tracking-widest">
//                       Admin Resolution Message
//                     </span>
//                   </div>
//                   <p className="text-sm text-blue-50 font-medium pl-9 leading-relaxed relative z-10">
//                     {r.adminReply}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </Card>
//   );
// };

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
          <div className="flex items-center justify-between mb-6">
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
        <div className="flex items-center justify-between mb-6">
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
