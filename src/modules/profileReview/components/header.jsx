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
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export const Header = ({ p }) => {
  return (
    // <div className="mb-8">
    //   <Link to="/admin/management/profile-reports">
    //     <Button variant="outline" className="mb-4 gap-2 border-slate-300">
    //       <ArrowLeft className="w-4 h-4" />
    //       Back to Reports
    //     </Button>
    //   </Link>

    //   <div className="flex items-start justify-between flex-wrap gap-4">
    //     <header className="flex flex-col gap-4">
    //       <PageHeader
    //         heading="Profile Review"
    //         icon={<Shield className="w-9 h-9 text-white" />}
    //         color="bg-gradient-to-br from-blue-500 to-blue-600"
    //         subheading="Detailed review of reported user profile."
    //       />
    //     </header>

    //     <div className="flex flex-wrap gap-2">
    //       {p.accountStatus === "banned" && (
    //         <Badge className="bg-red-100 text-red-700 border-red-300 text-base px-4 py-2">
    //           <Ban className="w-4 h-4 mr-2" />
    //           USER BANNED
    //         </Badge>
    //       )}
    //       {p.accountStatus === "suspended" && (
    //         <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-base px-4 py-2">
    //           <Clock className="w-4 h-4 mr-2" />
    //           USER SUSPENDED
    //         </Badge>
    //       )}
    //       {p.status === "resolved" && (
    //         <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 text-sm px-3 py-1">
    //           <ShieldCheck className="w-4 h-4 mr-1" /> RESOLVED
    //         </Badge>
    //       )}
    //       {p.reportCount >= 5 && (
    //         <Badge className="bg-red-100 text-red-700 border-red-300 text-sm px-3 py-1">
    //           <AlertTriangle className="w-4 h-4 mr-1" /> HIGH PRIORITY
    //         </Badge>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="mb-8 space-y-4">
      <Link to="/admin/management/profile-reports">
        <Button variant="outline" className="gap-2 border-slate-300">
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </Button>
      </Link>

      {/* 1. CLEAN BREADCRUMB NAVIGATION */}
      {/* <nav className="flex items-center gap-2 text-sm font-medium">
      <Link
        to="/admin/management/profile-reports"
        className="text-slate-500 hover:text-brand-aqua transition-colors flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Reports Management
      </Link>
      <ChevronRight className="w-4 h-4 text-slate-300" />
      <span className="text-slate-900 font-bold">
        Reviewing: {p?.profile.nickname}
      </span>
    </nav> */}

      {/* 2. MAIN HEADER AREA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <PageHeader
            heading={`Profile Review: ${p.profile.nickname}`}
            icon={<Shield className="w-6 h-6 text-white shrink-0" />}
            color="bg-gradient-to-br from-indigo-600 via-blue-600 to-brand-aqua"
            subheading="Review the reported content, user history, and evidence before taking disciplinary action."
          />
        </div>

        {/* 3. STATUS HUB (Glassmorphism Effect) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap items-center gap-3 bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white shadow-xl shadow-slate-200/50"
        >
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-full px-2 mb-1">
            Current Standing
          </p>

          {p.accountStatus === "banned" && (
            <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 shadow-none py-1.5 px-3 rounded-lg flex items-center">
              <Ban className="w-3.5 h-3.5 mr-2" />
              BANNED
            </Badge>
          )}

          {p.accountStatus === "suspended" && (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 shadow-none py-1.5 px-3 rounded-lg">
              <Clock className="w-3.5 h-3.5 mr-2" />
              SUSPENDED
            </Badge>
          )}

          {p.status === "resolved" ? (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-none py-1.5 px-3 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 mr-2" />
              CASE CLOSED
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-slate-400 border-slate-200 py-1.5 px-3 rounded-lg"
            >
              OPEN CASE
            </Badge>
          )}

          {p.reportCount >= 5 && (
            <Badge className="bg-red-600 text-white border-none shadow-lg shadow-red-200 py-1.5 px-3 rounded-lg animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 mr-2" />
              CRITICAL RISK
            </Badge>
          )}
        </motion.div>
      </div>
    </div>
  );
};
