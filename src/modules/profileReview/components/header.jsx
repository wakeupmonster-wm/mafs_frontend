import { PageHeader } from "@/components/common/headSubhead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Clock,
  Shield,
  ShieldCheck,
  History,
} from "lucide-react";
import { Link } from "react-router-dom"; // Use react-router-dom
import { motion } from "framer-motion";
import { format } from "date-fns";

export const Header = ({ p }) => {
  const areAllReportsResolved = p?.reports?.every(
    (r) => r.status === "resolved",
  );
  const isCaseClosed = p?.status === "resolved" || areAllReportsResolved;

  return (
    <div className="mb-8 space-y-2">
      {/* 1. BACK BUTTON & BREADCRUMB AREA */}
      <div className="flex items-center justify-between">
        <Link to="/admin/management/profile-reports">
          <Button
            variant="outline"
            className="group gap-2 border-slate-200 bg-white hover:bg-slate-50 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-slate-600">Back to Queue</span>
          </Button>
        </Link>

        {/* Optional: Last updated timestamp or ID */}
        <div className="hidden md:flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <History className="w-3.5 h-3.5" />
          Last Activity: {format(new Date(), "dd MMM, yyyy")}
        </div>
      </div>

      {/* 2. MAIN HEADER AREA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <PageHeader
            heading={`Reviewing: ${p.profile?.nickname || "Unknown User"}`}
            icon={<Shield className="w-6 h-6 text-white shrink-0" />}
            color="bg-gradient-to-br from-brand-aqua/80 to-brand-aqua/40"
            subheading={`UID: ${p.userId} • Investigating ${p.reportCount} flagged incidents.`}
          />
        </div>

        {/* 3. STATUS HUB (Visual Alignment with Tabs) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-3 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-sm shadow-slate-200/60"
        >
          <div className="w-full px-1 mb-1 flex justify-between items-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Account Status
            </p>
          </div>

          {/* BANNED BADGE */}
          {p.accountStatus === "banned" && (
            <Badge className="bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 shadow-none py-2 px-4 rounded-lg font-bold flex items-center gap-2">
              <Ban className="w-4 h-4" />
              BANNED
            </Badge>
          )}

          {/* SUSPENDED BADGE */}
          {p.accountStatus === "suspended" && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 shadow-none py-2 px-4 rounded-lg font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              SUSPENDED
            </Badge>
          )}

          {/* DYNAMIC CASE STATUS */}
          {isCaseClosed ? (
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 shadow-none py-2 px-4 rounded-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              RESOLVED
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-blue-50/50 text-brand-aqua border-brand-aqua/40 py-2 px-4 rounded-lg font-bold flex items-center gap-2 animate-pulse"
            >
              <AlertTriangle className="w-4 h-4 text-brand-aqua" />
              UNDER REVIEW
            </Badge>
          )}

          {/* CRITICAL RISK (High report count) */}
          {p.reportCount >= 5 && !isCaseClosed && (
            <Badge className="bg-red-100 text-red-600 border-red-400 hover:bg-red-200 shadow-none py-2 px-4 rounded-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              CRITICAL
            </Badge>
          )}
        </motion.div>
      </div>
    </div>
  );
};
