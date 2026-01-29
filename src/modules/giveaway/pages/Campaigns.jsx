// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchCampaigns,
// //   fetchPrizes,
// //   createCampaign,
// //   pauseCampaign,
// //   disableCampaign,
// //   activateCampaign,
// //   deleteCampaign,
// // } from "../store/giveaway.slice";

// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import ActionDropdown from "../components/ActionDropdown";

// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "@/components/ui/select";

// // // function getCampaignStatus(c) {
// // //   if (c.isActive) return "ACTIVE";
// // //   if (
// // //     c.failureReason &&
// // //     c.failureReason.toLowerCase().includes("pause")
// // //   ) {
// // //     return "PAUSED";
// // //   }
// // //   return "DISABLED";
// // // }

// // function getCampaignStatus(c) {
// //   if (c.failureReason === "Paused by admin") {
// //     return "PAUSED";
// //   }

// //   if (c.failureReason === "Disabled by admin") {
// //     return "DISABLED";
// //   }

// //   if (c.isActive) {
// //     return "ACTIVE";
// //   }

// //   return "DISABLED";
// // }

// // export default function Campaigns() {
// //   const dispatch = useDispatch();
// //   const { campaigns, prizes, loading } =
// //     useSelector((s) => s.giveaway);

// //   const [form, setForm] = useState({
// //     date: "",
// //     prizeId: "",
// //     supportiveItems: "",
// //   });

// //   useEffect(() => {
// //     dispatch(fetchCampaigns());
// //     dispatch(fetchPrizes());
// //   }, [dispatch]);

// //   const submit = () => {
// //     if (!form.date || !form.prizeId) {
// //       alert("Date & Prize required");
// //       return;
// //     }

// //     dispatch(
// //       createCampaign({
// //         date: form.date,
// //         prizeId: form.prizeId,
// //         supportiveItems: form.supportiveItems
// //           .split(",")
// //           .map((i) => i.trim())
// //           .filter(Boolean),
// //       })
// //     );

// //     setForm({
// //       date: "",
// //       prizeId: "",
// //       supportiveItems: "",
// //     });
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* ================= CREATE CAMPAIGN ================= */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Create Campaign</CardTitle>
// //         </CardHeader>

// //         <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <Input
// //             type="date"
// //             value={form.date}
// //             onChange={(e) =>
// //               setForm({ ...form, date: e.target.value })
// //             }
// //           />

// //           <Select
// //             value={form.prizeId}
// //             onValueChange={(v) =>
// //               setForm({ ...form, prizeId: v })
// //             }
// //           >
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select Prize" />
// //             </SelectTrigger>

// //             <SelectContent>
// //               {prizes.map((p) => (
// //                 <SelectItem
// //                   key={p._id}
// //                   value={p._id}
// //                 >
// //                   {p.title}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>

// //           <Input
// //             placeholder="Supportive items (comma separated)"
// //             value={form.supportiveItems}
// //             onChange={(e) =>
// //               setForm({
// //                 ...form,
// //                 supportiveItems: e.target.value,
// //               })
// //             }
// //           />

// //           <Button
// //             className="md:col-span-1"
// //             onClick={submit}
// //             disabled={loading}
// //           >
// //             Create Campaign
// //           </Button>
// //         </CardContent>
// //       </Card>

// //       {/* ================= CAMPAIGN TABLE ================= */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>
// //             Campaigns ({campaigns.length})
// //           </CardTitle>
// //         </CardHeader>

// //         <CardContent className="overflow-x-auto">
// //           <table className="w-full border text-sm">
// //             <thead className="bg-muted">
// //               <tr>
// //                 <th className="p-2 text-left">Date</th>
// //                 <th className="p-2 text-left">Prize</th>
// //                 <th className="p-2 text-left">Status</th>
// //                 <th className="p-2 text-left">Active</th>
// //                 <th className="p-2 text-right">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {campaigns.map((c) => {
// //                 const prize = prizes.find(
// //                   (p) =>
// //                     p._id ===
// //                     (c.prizeId?._id || c.prizeId)
// //                 );

// //                 const status = getCampaignStatus(c);

// //                 const actions = [];

// //                 if (status === "ACTIVE") {
// //                   actions.push(
// //                     {
// //                       label: "Pause",
// //                       onClick: () =>
// //                         dispatch(pauseCampaign(c._id)),
// //                     },
// //                     {
// //                       label: "Disable",
// //                       onClick: () =>
// //                         dispatch(
// //                           disableCampaign(c._id)
// //                         ),
// //                     }
// //                   );
// //                 }

// //                 if (status === "PAUSED") {
// //                   actions.push(
// //                     {
// //                       label: "Activate",
// //                       onClick: () =>
// //                         dispatch(
// //                           activateCampaign(c._id)
// //                         ),
// //                     },
// //                     {
// //                       label: "Disable",
// //                       onClick: () =>
// //                         dispatch(
// //                           disableCampaign(c._id)
// //                         ),
// //                     }
// //                   );
// //                 }

// //                 if (status === "DISABLED") {
// //                   actions.push({
// //                     label: "Activate",
// //                     onClick: () =>
// //                       dispatch(
// //                         activateCampaign(c._id)
// //                       ),
// //                   });
// //                 }

// //                 actions.push({
// //                   label: "Delete",
// //                   destructive: true,
// //                   onClick: () => {
// //                     if (
// //                       confirm(
// //                         "Delete campaign permanently?"
// //                       )
// //                     ) {
// //                       dispatch(deleteCampaign(c._id));
// //                     }
// //                   },
// //                 });

// //                 return (
// //                   <tr
// //                     key={c._id}
// //                     className="border-t hover:bg-muted/50"
// //                   >
// //                     <td className="p-2">
// //                       {new Date(
// //                         c.date
// //                       ).toDateString()}
// //                     </td>

// //                     <td className="p-2 font-medium">
// //                       {prize?.title || "—"}
// //                     </td>

// //                     <td className="p-2">
// //                       <Badge
// //                         variant={
// //                           status === "ACTIVE"
// //                             ? "success"
// //                             : status === "PAUSED"
// //                             ? "warning"
// //                             : "destructive"
// //                         }
// //                       >
// //                         {status}
// //                       </Badge>
// //                     </td>

// //                     <td className="p-2">
// //                       {c.isActive ? "Yes" : "No"}
// //                     </td>

// //                     <td className="p-2 text-right">
// //                       <ActionDropdown actions={actions} />
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>

// //           {loading && (
// //             <p className="mt-2 text-sm text-muted-foreground">
// //               Loading campaigns...
// //             </p>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCampaigns,
//   fetchPrizes,
//   createCampaign,
//   pauseCampaign,
//   disableCampaign,
//   activateCampaign,
//   deleteCampaign,
// } from "../store/giveaway.slice";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import ActionDropdown from "../components/ActionDropdown";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// import {
//   CalendarDays,
//   Gift,
//   Plus,
//   Megaphone,
//   Loader2,
//   PlayCircle,
//   PauseCircle,
//   XCircle,
//   CheckCircle2,
//   ListPlus,
//   Trophy,
//   Inbox,
// } from "lucide-react";
// import {clearGiveawayStatus}  from "../store/giveaway.slice";
// import { toast } from "sonner";




// function getCampaignStatus(c) {
//   if (c.failureReason === "Paused by admin") {
//     return "PAUSED";
//   }

//   if (c.failureReason === "Disabled by admin") {
//     return "DISABLED";
//   }

//   if (c.isActive) {
//     return "ACTIVE";
//   }

//   return "DISABLED";
// }

// export default function Campaigns() {
//   const dispatch = useDispatch();
//   const { campaigns, prizes, loading,  error,
//   successMessage, } = useSelector((s) => s.giveaway);

//   const [form, setForm] = useState({
//     date: "",
//     prizeId: "",
//     supportiveItems: "",
//   });

//   useEffect(() => {
//     dispatch(fetchCampaigns());
//     dispatch(fetchPrizes());
//   }, [dispatch]);

//   const submit = () => {
//     if (!form.date || !form.prizeId) {
//         toast.warning("Date & Prize required");
//       return;
//     }

//     dispatch(
//       createCampaign({
//         date: form.date,
//         prizeId: form.prizeId,
//         supportiveItems: form.supportiveItems
//           .split(",")
//           .map((i) => i.trim())
//           .filter(Boolean),
//       })
//     );

//     setForm({
//       date: "",
//       prizeId: "",
//       supportiveItems: "",
//     });
//   };
// useEffect(() => {
//   if (successMessage) {
//     toast.success(successMessage);
//     dispatch(clearGiveawayStatus());
//   }

//   if (error) {
//     toast.error(error);
//     dispatch(clearGiveawayStatus());
//   }
// }, [successMessage, error, dispatch]);



//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "ACTIVE":
//         return <PlayCircle className="h-3.5 w-3.5" />;
//       case "PAUSED":
//         return <PauseCircle className="h-3.5 w-3.5" />;
//       default:
//         return <XCircle className="h-3.5 w-3.5" />;
//     }
//   };

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "ACTIVE":
//         return "bg-emerald-50 text-emerald-700 border-emerald-200";
//       case "PAUSED":
//         return "bg-amber-50 text-amber-700 border-amber-200";
//       default:
//         return "bg-red-50 text-red-700 border-red-200";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg shadow-violet-200">
//             <Megaphone className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
//             <p className="text-sm text-gray-500">
//               Manage your giveaway campaigns
//             </p>
//           </div>
//         </div>

//         {/* Create Campaign Card */}
//         <Card className="border-0 shadow-sm shadow-gray-200/50">
//           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
//             <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
//               <Plus className="h-4 w-4 text-black" />
//               Create New Campaign
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="p-5">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <CalendarDays className="h-3.5 w-3.5" />
//                   Campaign Date
//                 </label>
//                 <Input
//                   type="date"
//                   value={form.date}
//                   onChange={(e) => setForm({ ...form, date: e.target.value })}
//                   className="h-10 border-gray-200 bg-white focus:border-violet-300 focus:ring-violet-200"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Trophy className="h-3.5 w-3.5" />
//                   Select Prize
//                 </label>
//                 <Select
//                   value={form.prizeId}
//                   onValueChange={(v) => setForm({ ...form, prizeId: v })}
//                 >
//                   <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-violet-300 focus:ring-violet-200">
//                     <SelectValue placeholder="Choose a prize" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {prizes.map((p) => (
//                       <SelectItem key={p._id} value={p._id}>
//                         <span className="flex items-center gap-2">
//                           <Gift className="h-3.5 w-3.5 text-violet-500" />
//                           {p.title}
//                         </span>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <ListPlus className="h-3.5 w-3.5" />
//                   Supportive Items
//                 </label>
//                 <Input
//                   placeholder="Item1, Item2, Item3..."
//                   value={form.supportiveItems}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       supportiveItems: e.target.value,
//                     })
//                   }
//                   className="h-10 border-gray-200 bg-white focus:border-violet-300 focus:ring-violet-200"
//                 />
//               </div>

//               <div className="flex items-end">
//                 <Button
//                   onClick={submit}
//                   disabled={loading}
//                   className="h-10 w-full gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md shadow-violet-200 transition-all hover:from-violet-700 hover:to-purple-700 hover:shadow-lg hover:shadow-violet-200"
//                 >
//                   {loading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Plus className="h-4 w-4" />
//                   )}
//                   Create Campaign
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Campaigns List Card */}
//         <Card className="border-0 shadow-sm shadow-gray-200/50">
//           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
//             <div className="flex items-center justify-between">
//               <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
//                 <Megaphone className="h-4 w-4 text-violet-600" />
//                 All Campaigns
//               </CardTitle>
//               <Badge
//                 variant="secondary"
//                 className="bg-violet-100 text-violet-700"
//               >
//                 {campaigns.length} Total
//               </Badge>
//             </div>
//           </CardHeader>

//           <CardContent className="p-0">
//             {loading && campaigns.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 text-gray-500">
//                 <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
//                 <p className="mt-3 text-sm font-medium">Loading campaigns...</p>
//               </div>
//             ) : campaigns.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//                   <Inbox className="h-8 w-8" />
//                 </div>
//                 <p className="mt-4 font-medium text-gray-600">
//                   No campaigns yet
//                 </p>
//                 <p className="mt-1 text-sm">Create your first campaign above</p>
//               </div>
//             ) : (
//               <>
//                 {/* Desktop Table */}
//                 <div className="hidden overflow-x-auto md:block">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
//                         <th className="px-5 py-3.5 text-left">Date</th>
//                         <th className="px-5 py-3.5 text-left">Prize</th>
//                         <th className="px-5 py-3.5 text-left">Status</th>
//                         <th className="px-5 py-3.5 text-left">Active</th>
//                         <th className="px-5 py-3.5 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {campaigns.map((c) => {
//                         const prize = prizes.find(
//                           (p) => p._id === (c.prizeId?._id || c.prizeId)
//                         );
//                         const status = getCampaignStatus(c);

//                         const actions = [];

//                         if (status === "ACTIVE") {
//                           actions.push(
//                             {
//                               label: "Pause",
//                               onClick: () => dispatch(pauseCampaign(c._id)),
//                             },
//                             {
//                               label: "Disable",
//                               onClick: () => dispatch(disableCampaign(c._id)),
//                             }
//                           );
//                         }

//                         if (status === "PAUSED") {
//                           actions.push(
//                             {
//                               label: "Activate",
//                               onClick: () => dispatch(activateCampaign(c._id)),
//                             },
//                             {
//                               label: "Disable",
//                               onClick: () => dispatch(disableCampaign(c._id)),
//                             }
//                           );
//                         }

//                         if (status === "DISABLED") {
//                           actions.push({
//                             label: "Activate",
//                             onClick: () => dispatch(activateCampaign(c._id)),
//                           });
//                         }

//                         actions.push({
//                           label: "Delete",
//                           destructive: true,
//                           onClick: () => {
//                             if (confirm("Delete campaign permanently?")) {
//                               dispatch(deleteCampaign(c._id));
//                             }
//                           },
//                         });

//                         return (
//                           <tr
//                             key={c._id}
//                             className="transition-colors hover:bg-gray-50/50"
//                           >
//                             <td className="px-5 py-4">
//                               <div className="flex items-center gap-2">
//                                 <CalendarDays className="h-4 w-4 text-gray-400" />
//                                 <span className="font-medium text-gray-700">
//                                   {new Date(c.date).toDateString()}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-5 py-4">
//                               <div className="flex items-center gap-2">
//                                 <Gift className="h-4 w-4 text-violet-500" />
//                                 <span className="font-medium text-gray-800">
//                                   {prize?.title || "—"}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-5 py-4">
//                               <span
//                                 className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyles(
//                                   status
//                                 )}`}
//                               >
//                                 {getStatusIcon(status)}
//                                 {status}
//                               </span>
//                             </td>
//                             <td className="px-5 py-4">
//                               {c.isActive ? (
//                                 <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
//                                   <CheckCircle2 className="h-4 w-4" />
//                                   Yes
//                                 </span>
//                               ) : (
//                                 <span className="text-sm text-gray-400">
//                                   No
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-5 py-4 text-right">
//                               <ActionDropdown actions={actions} />
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile Cards */}
//                 <div className="divide-y divide-gray-100 md:hidden">
//                   {campaigns.map((c) => {
//                     const prize = prizes.find(
//                       (p) => p._id === (c.prizeId?._id || c.prizeId)
//                     );
//                     const status = getCampaignStatus(c);

//                     const actions = [];

//                     if (status === "ACTIVE") {
//                       actions.push(
//                         {
//                           label: "Pause",
//                           onClick: () => dispatch(pauseCampaign(c._id)),
//                         },
//                         {
//                           label: "Disable",
//                           onClick: () => dispatch(disableCampaign(c._id)),
//                         }
//                       );
//                     }

//                     if (status === "PAUSED") {
//                       actions.push(
//                         {
//                           label: "Activate",
//                           onClick: () => dispatch(activateCampaign(c._id)),
//                         },
//                         {
//                           label: "Disable",
//                           onClick: () => dispatch(disableCampaign(c._id)),
//                         }
//                       );
//                     }

//                     if (status === "DISABLED") {
//                       actions.push({
//                         label: "Activate",
//                         onClick: () => dispatch(activateCampaign(c._id)),
//                       });
//                     }

//                     actions.push({
//                       label: "Delete",
//                       destructive: true,
//                       onClick: () => {
//                         if (confirm("Delete campaign permanently?")) {
//                           dispatch(deleteCampaign(c._id));
//                         }
//                       },
//                     });

//                     return (
//                       <div key={c._id} className="p-4">
//                         <div className="flex items-start justify-between">
//                           <div className="space-y-2">
//                             <div className="flex items-center gap-2">
//                               <Gift className="h-4 w-4 text-violet-500" />
//                               <span className="font-semibold text-gray-800">
//                                 {prize?.title || "—"}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2 text-sm text-gray-500">
//                               <CalendarDays className="h-3.5 w-3.5" />
//                               {new Date(c.date).toDateString()}
//                             </div>
//                           </div>
//                           <ActionDropdown actions={actions} />
//                         </div>
//                         <div className="mt-3 flex items-center gap-3">
//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyles(
//                               status
//                             )}`}
//                           >
//                             {getStatusIcon(status)}
//                             {status}
//                           </span>
//                           {c.isActive && (
//                             <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
//                               <CheckCircle2 className="h-3.5 w-3.5" />
//                               Active
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaigns,
  fetchPrizes,
  createCampaign,
  pauseCampaign,
  disableCampaign,
  activateCampaign,
  deleteCampaign,
  clearGiveawayStatus,
} from "../store/giveaway.slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ActionDropdown from "../components/ActionDropdown";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  CalendarDays,
  Gift,
  Plus,
  Megaphone,
  Loader2,
  PlayCircle,
  PauseCircle,
  XCircle,
  CheckCircle2,
  ListPlus,
  Trophy,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";

function getCampaignStatus(c) {
  if (c.failureReason === "Paused by admin") {
    return "PAUSED";
  }

  if (c.failureReason === "Disabled by admin") {
    return "DISABLED";
  }

  if (c.isActive) {
    return "ACTIVE";
  }

  return "DISABLED";
}

export default function Campaigns() {
  const dispatch = useDispatch();
  const { campaigns, prizes, loading, error, successMessage } = useSelector(
    (s) => s.giveaway
  );

  const [form, setForm] = useState({
    date: "",
    prizeId: "",
    supportiveItems: "",
  });

  useEffect(() => {
    dispatch(fetchCampaigns());
    dispatch(fetchPrizes());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearGiveawayStatus());
    }

    if (error) {
      toast.error(typeof error === "string" ? error : error.message);
      dispatch(clearGiveawayStatus());
    }
  }, [successMessage, error, dispatch]);

  const validateForm = useCallback(() => {
    const trimmedDate = form.date.trim();
    const trimmedPrizeId = form.prizeId.trim();
    const trimmedItems = form.supportiveItems.trim();

    if (!trimmedDate) {
      toast.error("Campaign date is required");
      return false;
    }

    const selectedDate = new Date(trimmedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Campaign date cannot be in the past");
      return false;
    }

    const maxFutureDate = new Date(today);
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 2);

    if (selectedDate > maxFutureDate) {
      toast.error("Campaign date cannot be more than 2 years in the future");
      return false;
    }

    const existingCampaign = campaigns.find((c) => {
      const campaignDate = new Date(c.date);
      campaignDate.setHours(0, 0, 0, 0);
      return campaignDate.getTime() === selectedDate.getTime();
    });

    if (existingCampaign) {
      toast.error("A campaign already exists for this date");
      return false;
    }

    if (!trimmedPrizeId) {
      toast.error("Please select a prize");
      return false;
    }

    const selectedPrize = prizes.find((p) => p._id === trimmedPrizeId);

    if (!selectedPrize) {
      toast.error("Selected prize not found");
      return false;
    }

    if (!selectedPrize.isActive) {
      toast.error("Selected prize is inactive");
      return false;
    }

    if (!trimmedItems) {
      toast.error("Supportive items are required");
      return false;
    }

    const itemsArray = trimmedItems
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (itemsArray.length === 0) {
      toast.error("Supportive items cannot be empty");
      return false;
    }

    if (itemsArray.length < 2) {
      toast.error("At least 2 supportive items are required");
      return false;
    }

    if (itemsArray.length > 50) {
      toast.error("Maximum 50 supportive items allowed");
      return false;
    }

    for (let i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].length === 0) {
        toast.error("Supportive items cannot be empty");
        return false;
      }

      if (itemsArray[i].length > 100) {
        toast.error("Each supportive item must not exceed 100 characters");
        return false;
      }
    }

    const uniqueItems = new Set(itemsArray.map((item) => item.toLowerCase()));
    if (uniqueItems.size !== itemsArray.length) {
      toast.error("Duplicate supportive items are not allowed");
      return false;
    }

    return true;
  }, [form, campaigns, prizes]);

  const submit = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    const itemsArray = form.supportiveItems
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    dispatch(
      createCampaign({
        date: form.date,
        prizeId: form.prizeId,
        supportiveItems: itemsArray,
      })
    );

    setForm({
      date: "",
      prizeId: "",
      supportiveItems: "",
    });
  }, [form, validateForm, dispatch]);

  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case "ACTIVE":
        return <PlayCircle className="h-3.5 w-3.5" />;
      case "PAUSED":
        return <PauseCircle className="h-3.5 w-3.5" />;
      default:
        return <XCircle className="h-3.5 w-3.5" />;
    }
  }, []);

  const getStatusStyles = useCallback((status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PAUSED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  }, []);

  const getActionsList = useCallback((campaignId, status) => {
    const actions = [];

    if (status === "ACTIVE") {
      actions.push(
        {
          label: "Pause",
          onClick: () => dispatch(pauseCampaign(campaignId)),
        },
        {
          label: "Disable",
          onClick: () => dispatch(disableCampaign(campaignId)),
        }
      );
    }

    if (status === "PAUSED") {
      actions.push(
        {
          label: "Activate",
          onClick: () => dispatch(activateCampaign(campaignId)),
        },
        {
          label: "Disable",
          onClick: () => dispatch(disableCampaign(campaignId)),
        }
      );
    }

    if (status === "DISABLED") {
      actions.push({
        label: "Activate",
        onClick: () => dispatch(activateCampaign(campaignId)),
      });
    }

    actions.push({
      label: "Delete",
      destructive: true,
      onClick: () => {
        const campaignDate = campaigns.find((c) => c._id === campaignId);
        if (
          window.confirm(
            `Are you sure you want to delete the campaign for ${new Date(campaignDate.date).toDateString()}? This action cannot be undone.`
          )
        ) {
          dispatch(deleteCampaign(campaignId));
        }
      },
    });

    return actions;
  }, [campaigns, dispatch]);

  const activeCampaignsCount = useMemo(
    () => campaigns.filter((c) => getCampaignStatus(c) === "ACTIVE").length,
    [campaigns]
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-sm text-gray-500">
              Manage your giveaway campaigns
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-sm shadow-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
              <Plus className="h-4 w-4 text-black" />
              Create New Campaign
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Campaign Date
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Trophy className="h-3.5 w-3.5" />
                  Select Prize
                </label>
                <Select
                  value={form.prizeId}
                  onValueChange={(v) => setForm({ ...form, prizeId: v })}
                >
                  <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
                    <SelectValue placeholder="Choose a prize" />
                  </SelectTrigger>
                  <SelectContent>
                    {prizes.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500">
                        No prizes available
                      </div>
                    ) : (
                      prizes.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          <span className="flex items-center gap-2">
                            <Gift className="h-3.5 w-3.5 text-amber-500" />
                            {p.title}
                          </span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <ListPlus className="h-3.5 w-3.5" />
                  Supportive Items (Min 2)
                </label>
                <Input
                  placeholder="e.g. Item1, Item2, Item3"
                  value={form.supportiveItems}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      supportiveItems: e.target.value,
                    })
                  }
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={submit}
                  disabled={loading}
                  className="h-10 w-full gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md transition-all hover:shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Create Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm shadow-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <Megaphone className="h-4 w-4 text-black" />
                All Campaigns
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-black text-white">
                  {campaigns.length} Total
                </Badge>
                {activeCampaignsCount > 0 && (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    {activeCampaignsCount} Active
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading && campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-black" />
                <p className="mt-3 text-sm font-medium">Loading campaigns...</p>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Inbox className="h-8 w-8" />
                </div>
                <p className="mt-4 font-medium text-gray-600">
                  No campaigns yet
                </p>
                <p className="mt-1 text-sm">Create your first campaign above</p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-5 py-3.5 text-left">Date</th>
                        <th className="px-5 py-3.5 text-left">Prize</th>
                        <th className="px-5 py-3.5 text-left">Status</th>
                        <th className="px-5 py-3.5 text-left">Active</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {campaigns.map((c) => {
                        const prize = prizes.find(
                          (p) => p._id === (c.prizeId?._id || c.prizeId)
                        );
                        const status = getCampaignStatus(c);
                        const actions = getActionsList(c._id, status);

                        return (
                          <tr
                            key={c._id}
                            className="transition-colors hover:bg-gray-50/50"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-700">
                                  {new Date(c.date).toDateString()}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-black" />
                                <span className="font-medium text-gray-800">
                                  {prize?.title || "—"}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                                  status
                                )}`}
                              >
                                {getStatusIcon(status)}
                                {status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              {c.isActive ? (
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  Yes
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <ActionDropdown actions={actions} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-gray-100 md:hidden">
                  {campaigns.map((c) => {
                    const prize = prizes.find(
                      (p) => p._id === (c.prizeId?._id || c.prizeId)
                    );
                    const status = getCampaignStatus(c);
                    const actions = getActionsList(c._id, status);

                    return (
                      <div key={c._id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-black" />
                              <span className="font-semibold text-gray-800">
                                {prize?.title || "—"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {new Date(c.date).toDateString()}
                            </div>
                          </div>
                          <ActionDropdown actions={actions} />
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyles(
                              status
                            )}`}
                          >
                            {getStatusIcon(status)}
                            {status}
                          </span>
                          {c.isActive && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
