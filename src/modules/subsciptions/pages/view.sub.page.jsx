// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router";
// import { motion } from "framer-motion";
// import { format } from "date-fns";
// import {
//   ArrowLeft,
//   Mail,
//   Phone,
//   Globe,
//   ShieldCheck,
//   CreditCard,
//   Activity,
//   DollarSign,
//   RefreshCcw,
//   History,
//   Layers,
//   Zap,
//   Database,
//   CheckCircle2,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Progress } from "@/components/ui/progress";
// import { Separator } from "@/components/ui/separator";
// import {
//   clearSelectedUser,
//   fetchUserDetails,
// } from "../store/subcription.slices";
// import { cn } from "@/lib/utils";
// import { KPICard } from "../components/kpi.card";

// export default function ViewSubPage() {
//   const { userId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userData, loading } = useSelector((state) => state.subscription);

//   useEffect(() => {
//     if (userId) dispatch(fetchUserDetails(userId));
//     return () => dispatch(clearSelectedUser());
//   }, [dispatch, userId]);

//   console.log("userData: ", userData);

//   const {
//     subscription: sub,
//     transactions,
//     events,
//     summary,
//     user,
//   } = userData || {};

//   // console.log("Sub: ", sub);

//   // Progress Logic
//   const progress = useMemo(() => {
//     if (!sub?.startedAt || !sub?.expiresAt) return 0;
//     const total = new Date(sub.expiresAt) - new Date(sub.startedAt);
//     const current = new Date() - new Date(sub.startedAt);
//     return Math.min(100, Math.max(0, (current / total) * 100));
//   }, [sub]);

//   const KPIdata = useMemo(() => {
//     return [
//       {
//         label: "Lifetime Value",
//         val: (summary?.totalPaid - summary?.totalRefunded).toFixed(2),
//         icon: DollarSign, // Reference the component, render inside StatCard
//         color: "emerald",
//         // trend: calculateTrend(stats.total, stats.previousTotal),
//       },
//       {
//         label: "Total Transactions",
//         val: summary?.totalTransactions,
//         icon: History,
//         color: "blue",
//         // trend: 5.2, // Example hardcoded trend if backend doesn't provide
//       },
//       {
//         label: "Days Active",
//         val: summary?.daysSinceStart,
//         icon: Zap,
//         color: "orange",
//         // trend: 12.5,
//       },
//       {
//         label: "Auto Renew",
//         val: sub?.autoRenew ? "Enabled" : "Disabled",
//         icon: RefreshCcw,
//         color: sub?.autoRenew ? "emerald" : "slate",
//         // trend: -2.4,
//       },
//     ];
//   }, [summary]);

//   return (
//     <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
//       {/* 1. PREMIUM HERO SECTION */}
//       <div className="relative bg-white overflow-hidden border border-black">
//         <div className="max-w-7xl mx-auto p-6 relative z-10">
//           <Button
//             variant="ghost"
//             onClick={() => navigate(-1)}
//             className="mb-8 hover:bg-slate-100 group text-slate-500 font-semibold"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
//             Back to Analytics
//           </Button>

//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
//             <div className="flex items-center gap-8">
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="relative"
//               >
//                 <img
//                   src={user?.avatar?.url}
//                   alt={user?.nickname}
//                   className="w-28 h-28 rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-slate-50"
//                 />
//                 <div
//                   className={cn(
//                     "absolute -bottom-1 -right-1 p-2 rounded-2xl border-4 border-white shadow-xl",
//                     userData?.status === "ACTIVE"
//                       ? "bg-emerald-500"
//                       : "bg-slate-400"
//                   )}
//                 >
//                   <CheckCircle2 className="w-5 h-5 text-white" />
//                 </div>
//               </motion.div>

//               <div className="space-y-2">
//                 <div className="flex items-center gap-3">
//                   <h1 className="text-4xl font-black text-slate-900 tracking-tight">
//                     {user?.nickname || "Anonymous"}
//                   </h1>
//                   <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 px-3 py-1 font-bold">
//                     {userData?.platform?.toUpperCase()}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-6 text-slate-400">
//                   <span className="flex items-center gap-2 text-sm font-medium">
//                     <Mail className="w-4 h-4" /> {user?.email}
//                   </span>
//                   <span className="flex items-center gap-2 text-sm font-medium">
//                     <Phone className="w-4 h-4" /> {user?.phone}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <StatusBox
//                 label="Environment"
//                 value={userData?.environment}
//                 isAmber={userData?.environment === "sandbox"}
//               />
//               <StatusBox
//                 label="Current Status"
//                 value={userData?.status}
//                 isActive={userData?.status === "ACTIVE"}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 2. OVERLAPPING KPI GRID */}
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {KPIdata.map((item, index) => (
//           <KPICard
//             key={index}
//             title={item.label}
//             value={item.val}
//             icon={item.icon}
//             color={item.color}
//             index={index} // Pass index for staggered animation
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* Helper Mini-Component for Header Boxes */
// const StatusBox = ({ label, value, isAmber, isActive }) => (
//   <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white shadow-sm ring-1 ring-slate-200/50 min-w-[140px]">
//     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
//       {label}
//     </p>
//     <div
//       className={cn(
//         "text-sm font-black px-3 py-1 rounded-xl inline-block",
//         isAmber
//           ? "bg-amber-50 text-amber-600"
//           : isActive
//           ? "bg-emerald-50 text-emerald-600"
//           : "bg-indigo-50 text-indigo-600"
//       )}
//     >
//       {value?.toUpperCase()}
//     </div>
//   </div>
// );

// /* HELPER COMPONENTS */
// // const KPICard = ({ title, value, icon: Icon, color }) => (
// //   <Card className="border-none shadow-sm ring-1 ring-slate-200">
// //     <CardContent className="p-5 flex items-center gap-4">
// //       <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600`}>
// //         <Icon className="w-5 h-5" />
// //       </div>
// //       <div>
// //         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
// //           {title}
// //         </p>
// //         <p className="text-xl font-bold text-slate-900">{value}</p>
// //       </div>
// //     </CardContent>
// //   </Card>
// // );

// const InfoRow = ({ label, value, icon: Icon, badge, mono, capitalize }) => (
//   <div className="flex items-center gap-3">
//     {Icon && (
//       <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
//         <Icon className="w-3.5 h-3.5 text-slate-500" />
//       </div>
//     )}
//     <div className="min-w-0 flex-1">
//       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">
//         {label}
//       </p>
//       {badge ? (
//         <Badge variant="secondary" className={`capitalize text-[11px] h-5`}>
//           {value}
//         </Badge>
//       ) : (
//         <p
//           className={`text-sm font-medium text-slate-700 truncate ${
//             mono ? "font-mono text-xs" : ""
//           } ${capitalize ? "capitalize" : ""}`}
//         >
//           {value || "N/A"}
//         </p>
//       )}
//     </div>
//   </div>
// );

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  CreditCard,
  DollarSign,
  RefreshCcw,
  History,
  Layers,
  Zap,
  Database,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  clearSelectedUser,
  fetchUserDetails,
} from "../store/subcription.slices";

export default function ViewSubscriptionsPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, loading } = useSelector((state) => state.subscription);

  useEffect(() => {
    if (userId) dispatch(fetchUserDetails(userId));
    return () => dispatch(clearSelectedUser());
  }, [dispatch, userId]);

  const {
    subscription: sub,
    transactions,
    events,
    summary,
    user,
  } = userData || {};

  const progress = useMemo(() => {
    if (!userData?.startedAt || !userData?.expiresAt) return 0;
    const total = new Date(userData.expiresAt) - new Date(userData.startedAt);
    const current = new Date() - new Date(userData.startedAt);
    return Math.min(100, Math.max(0, (current / total) * 100));
  }, [userData]);

  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-24">
      {/* 1. PREMIUM HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-slate-100 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Analytics
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user?.avatar?.url}
                  alt={user?.nickname}
                  className="w-24 h-24 rounded-3xl object-cover shadow-2xl ring-4 ring-white"
                />
                <div
                  className={cn(
                    "absolute -bottom-2 -right-2 p-1.5 rounded-full border-4 border-white shadow-lg",
                    userData?.status === "ACTIVE"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  )}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-black text-slate-900 capitalize tracking-tight">
                    {user?.nickname || "Unknown User"}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-600 font-bold"
                  >
                    {userData?.platform?.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {user?.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {user?.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Environment
                </p>
                <Badge
                  className={cn(
                    "font-black uppercase tracking-tighter",
                    userData?.environment === "sandbox"
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      : "bg-indigo-600 text-white"
                  )}
                >
                  {userData?.environment}
                </Badge>
              </div>
              <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Current Status
                </p>
                <p
                  className={cn(
                    "text-lg font-black",
                    userData?.status === "ACTIVE"
                      ? "text-emerald-600"
                      : "text-slate-500"
                  )}
                >
                  {userData?.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 2. KPI GRID (LTV, Days, etc) */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Lifetime Value"
            value={`$${(summary?.totalPaid - summary?.totalRefunded).toFixed(
              2
            )}`}
            icon={DollarSign}
            color="emerald"
            description="Net revenue generated"
          />
          <StatCard
            title="Auto Renew"
            value={userData?.autoRenew ? "Enabled" : "Disabled"}
            icon={RefreshCcw}
            color={userData?.autoRenew ? "blue" : "slate"}
            description="Cycle status"
          />
          <StatCard
            title="Days Active"
            value={summary?.daysSinceStart}
            icon={Zap}
            color="orange"
            description="Since first started"
          />
          <StatCard
            title="Product"
            value={userData?.planType}
            icon={Layers}
            color="purple"
            description={userData?.productId?.split(".").pop()}
          />
        </div>

        {/* 3. LEFT CONTENT: Plan & Progress */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Subscription
                Cycle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pt-2">
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-3xl font-black">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 text-right uppercase">
                      Progress to
                      <br />
                      Renewal
                    </div>
                  </div>
                  <Progress
                    value={progress}
                    className="h-3 rounded-full bg-slate-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Started
                    </p>
                    <p className="text-xs font-bold">
                      {userData?.startedAt
                        ? format(new Date(userData.startedAt), "MMM dd, yy")
                        : "-"}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Expires
                    </p>
                    <p className="text-xs font-bold">
                      {userData?.expiresAt
                        ? format(new Date(userData.expiresAt), "MMM dd, yy")
                        : "-"}
                    </p>
                  </div>
                </div>

                <Separator className="opacity-50" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Offer Type</span>
                    <span className="font-bold text-slate-700">
                      {userData?.offerType || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Family Sharing</span>
                    <span className="font-bold text-slate-700">
                      {userData?.isInFamilySharing ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. MAIN CONTENT: Ledger & Webhooks */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-500" /> Transaction
                Ledger
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest pl-6">
                      Type
                    </TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">
                      Transaction ID
                    </TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">
                      Amount
                    </TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-6">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData?.transactions?.map((txn) => (
                    <TableRow
                      key={txn._id}
                      className="border-slate-50 group transition-colors"
                    >
                      <TableCell className="pl-6">
                        <Badge
                          variant="outline"
                          className="font-bold border-slate-200 text-slate-600 bg-white"
                        >
                          {txn.eventType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-400">
                        {txn.transactionId}
                      </TableCell>
                      <TableCell className="font-black text-emerald-600">
                        ${txn.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-slate-500 text-xs pr-6">
                        {format(new Date(txn.occurredAt), "MMM dd, HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-black flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" /> Webhook
                  Lifecycle
                </CardTitle>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-none">
                  System Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 bg-slate-900">
              <div className="divide-y divide-slate-800">
                {userData?.events?.map((event) => (
                  <div
                    key={event._id}
                    className="p-6 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            event.processed
                              ? "bg-emerald-500/10"
                              : "bg-amber-500/10"
                          )}
                        >
                          <Activity
                            className={cn(
                              "w-4 h-4",
                              event.processed
                                ? "text-emerald-500"
                                : "text-amber-500"
                            )}
                          />
                        </div>
                        <div>
                          <p className="text-white font-black text-sm">
                            {event.eventType}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                            {event.platform} Service
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-[10px] font-mono mb-1">
                          {format(new Date(event.receivedAt), "PPP p")}
                        </p>
                        <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-[9px]">
                          ID: {event.externalEventId}
                        </Badge>
                      </div>
                    </div>
                    <details className="group">
                      <summary className="text-[10px] font-bold text-emerald-500 cursor-pointer list-none flex items-center gap-2 hover:text-emerald-400 transition-colors">
                        <span className="w-4 h-4 flex items-center justify-center bg-emerald-500/10 rounded group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                        Inspect Payload
                      </summary>
                      <pre className="mt-4 p-4 rounded-xl bg-black/40 text-emerald-400/90 text-[11px] font-mono border border-slate-800 overflow-x-auto">
                        {JSON.stringify(event.rawPayload, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon: Icon, color, description }) => (
  <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-200/50 overflow-hidden relative group">
    <div
      className={cn(
        "absolute -right-4 -top-4 w-20 h-20 opacity-[0.03] rounded-full transition-transform group-hover:scale-150",
        `bg-${color}-500`
      )}
    />
    <CardContent className="p-6">
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
          `bg-${color}-500/10 text-${color}-600`
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
        {title}
      </p>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
        {value}
      </h3>
      <p className="text-[10px] text-slate-400 font-medium mt-1">
        {description}
      </p>
    </CardContent>
  </Card>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
      Accessing Subscriber Intelligence...
    </p>
  </div>
);
