// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // import { Card } from "@/components/ui/card";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // // import {
// // // // // //   fetchReportedProfiles,
// // // // // //   fetchProfileForReview,
// // // // // //   performUpdateProfileStatus,
// // // // // //   clearProfileReviewStatus,
// // // // // //   resetSelectedProfile,
// // // // // // } from "../store/profile-review.slice";

// // // // // // export function ReportedProfilesPage() {
// // // // // //   const dispatch = useDispatch();
// // // // // //   const { list, pagination, loading, error } = useSelector(
// // // // // //     (s) => s.profileReview || {},
// // // // // //   );
// // // // // //   const [page, setPage] = useState(1);

// // // // // //   useEffect(() => {
// // // // // //     dispatch(fetchReportedProfiles({ page, limit: 20 }));
// // // // // //   }, [dispatch, page]);

// // // // // //   return (
// // // // // //     <div className="max-w-6xl mx-auto p-4 space-y-6">
// // // // // //       <div>
// // // // // //         <h2 className="text-xl font-semibold">Reported Profiles</h2>
// // // // // //         <p className="text-sm text-muted-foreground">
// // // // // //           Profiles reported by users for review
// // // // // //         </p>
// // // // // //       </div>

// // // // // //       <Card className="p-0 overflow-x-auto">
// // // // // //         <table className="w-full text-sm">
// // // // // //           <thead className="bg-muted">
// // // // // //             <tr>
// // // // // //               <th className="p-3 text-left">User</th>
// // // // // //               <th className="p-3 text-left">Reports</th>
// // // // // //               <th className="p-3 text-left">Last Reported</th>
// // // // // //               <th className="p-3 text-left">Status</th>
// // // // // //               <th className="p-3 text-right">Action</th>
// // // // // //             </tr>
// // // // // //           </thead>
// // // // // //           <tbody>
// // // // // //             {loading && (
// // // // // //               <tr>
// // // // // //                 <td colSpan={5} className="p-4 text-center">
// // // // // //                   Loading...
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             )}
// // // // // //             {!loading && list?.length === 0 && (
// // // // // //               <tr>
// // // // // //                 <td
// // // // // //                   colSpan={5}
// // // // // //                   className="p-4 text-center text-muted-foreground"
// // // // // //                 >
// // // // // //                   No reports found
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             )}
// // // // // //             {list?.map((item) => (
// // // // // //               <tr key={item.userId} className="border-t hover:bg-muted/50">
// // // // // //                 <td className="p-3 font-medium">{item.nickname}</td>
// // // // // //                 <td className="p-3">{item.reportCount}</td>
// // // // // //                 <td className="p-3">
// // // // // //                   {new Date(item.lastReportedAt).toLocaleString()}
// // // // // //                 </td>
// // // // // //                 <td className="p-3">
// // // // // //                   <Badge
// // // // // //                     variant={item.status === "new" ? "warning" : "secondary"}
// // // // // //                   >
// // // // // //                     {item.status}
// // // // // //                   </Badge>
// // // // // //                 </td>
// // // // // //                 <td className="p-3 text-right">
// // // // // //                   <a
// // // // // //                     className="text-blue-600 text-sm hover:underline"
// // // // // //                     href={`/admin/management/profile-review/${item.userId}`}
// // // // // //                   >
// // // // // //                     Review
// // // // // //                   </a>
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ))}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       </Card>

// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <Button
// // // // // //           variant="outline"
// // // // // //           disabled={page <= 1}
// // // // // //           onClick={() => setPage((p) => p - 1)}
// // // // // //         >
// // // // // //           Previous
// // // // // //         </Button>
// // // // // //         <div className="text-sm text-muted-foreground">
// // // // // //           Page {pagination?.page || page} of {pagination?.totalPages || 1}
// // // // // //         </div>
// // // // // //         <Button
// // // // // //           variant="outline"
// // // // // //           disabled={page >= (pagination?.totalPages || 1)}
// // // // // //           onClick={() => setPage((p) => p + 1)}
// // // // // //         >
// // // // // //           Next
// // // // // //         </Button>
// // // // // //       </div>

// // // // // //       {error && <p className="text-red-500 text-sm">{error}</p>}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export function ProfileReviewDetailPage({ userId }) {
// // // // // //   const dispatch = useDispatch();
// // // // // //   const { selected, loading, error, successMessage } = useSelector(
// // // // // //     (s) => s.profileReview || {},
// // // // // //   );
// // // // // //   const [action, setAction] = useState("approve");
// // // // // //   const [reason, setReason] = useState("");
// // // // // //   const [banDuration, setBanDuration] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     if (userId) dispatch(fetchProfileForReview(userId));
// // // // // //     return () => dispatch(resetSelectedProfile());
// // // // // //   }, [dispatch, userId]);

// // // // // //   const onSubmit = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     const payload = {
// // // // // //       userId,
// // // // // //       action,
// // // // // //       reason: reason || undefined,
// // // // // //       banDuration: banDuration ? Number(banDuration) : undefined,
// // // // // //     };
// // // // // //     dispatch(performUpdateProfileStatus(payload)).then(() => {
// // // // // //       setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
// // // // // //     });
// // // // // //   };

// // // // // //   if (loading && !selected) return <div className="p-4">Loading...</div>;
// // // // // //   if (error) return <div className="p-4 text-red-500">{error}</div>;
// // // // // //   if (!selected) return <div className="p-4">Profile not found</div>;

// // // // // //   const p = selected;

// // // // // //   return (
// // // // // //     <div className="max-w-5xl mx-auto p-4 space-y-6">
// // // // // //       <Card className="p-6 space-y-4">
// // // // // //         <div className="flex items-center justify-between">
// // // // // //           <h2 className="text-xl font-semibold">Profile Review</h2>
// // // // // //           {p.isBanned && <Badge variant="destructive">Banned</Badge>}
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // // //           <div>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Email:</span> {p.email}
// // // // // //             </p>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Phone:</span> {p.phone || "-"}
// // // // // //             </p>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Account Status:</span>{" "}
// // // // // //               {p.accountStatus}
// // // // // //             </p>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Verified:</span>
// // // // // //               {p.profile?.verification?.status === "approved" ? "Yes" : "No"}
// // // // // //             </p>
// // // // // //             {p.isBanned && (
// // // // // //               <div className="mt-2 text-sm">
// // // // // //                 <p>
// // // // // //                   <span className="font-medium">Ban Reason:</span> {p.banReason}
// // // // // //                 </p>
// // // // // //                 {p.banDetails?.banExpiresAt && (
// // // // // //                   <p>
// // // // // //                     <span className="font-medium">Ban Expires:</span>{" "}
// // // // // //                     {new Date(p.banDetails.banExpiresAt).toLocaleString()}
// // // // // //                   </p>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Nickname:</span>{" "}
// // // // // //               {p.profile?.nickname}
// // // // // //             </p>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Gender:</span> {p.profile?.gender}
// // // // // //             </p>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Age:</span> {p.profile?.age || "-"}
// // // // // //             </p>
// // // // // //             <p className="text-sm">
// // // // // //               <span className="font-medium">Last Active:</span>{" "}
// // // // // //               {p.profile?.lastActive
// // // // // //                 ? new Date(p.profile.lastActive).toLocaleString()
// // // // // //                 : "-"}
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <p className="font-medium">Bio</p>
// // // // // //           <p className="text-sm text-muted-foreground whitespace-pre-wrap">
// // // // // //             {p.profile?.bio || "-"}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
// // // // // //           {p.profile?.photos?.map((ph, idx) => (
// // // // // //             <img
// // // // // //               key={idx}
// // // // // //               src={ph.url || ph}
// // // // // //               alt="photo"
// // // // // //               className="w-full h-32 object-cover rounded"
// // // // // //             />
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <p className="font-medium">Reports ({p.reportCount})</p>
// // // // // //           <div className="grid gap-2 mt-2">
// // // // // //             {p.reports?.map((r) => (
// // // // // //               <Card key={r._id} className="p-3">
// // // // // //                 <p className="text-sm">
// // // // // //                   <span className="font-medium">Reason:</span> {r.reason}
// // // // // //                 </p>
// // // // // //                 {r.details && (
// // // // // //                   <p className="text-sm text-muted-foreground">{r.details}</p>
// // // // // //                 )}
// // // // // //                 <p className="text-xs text-muted-foreground">
// // // // // //                   By:{" "}
// // // // // //                   {r.reportedBy?.name ||
// // // // // //                     r.reportedBy?.email ||
// // // // // //                     r.reportedBy?.phone ||
// // // // // //                     "-"}{" "}
// // // // // //                   • {new Date(r.createdAt).toLocaleString()}
// // // // // //                 </p>
// // // // // //               </Card>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </Card>

// // // // // //       <Card className="p-6">
// // // // // //         <h3 className="font-medium mb-3">Take Action</h3>
// // // // // //         <form onSubmit={onSubmit} className="grid gap-3">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// // // // // //             <div>
// // // // // //               <label className="text-sm font-medium mb-1 block">Action</label>
// // // // // //               <select
// // // // // //                 className="w-full border rounded px-3 py-2"
// // // // // //                 value={action}
// // // // // //                 onChange={(e) => setAction(e.target.value)}
// // // // // //               >
// // // // // //                 <option value="approve">Approve</option>
// // // // // //                 <option value="reject">Reject</option>
// // // // // //                 <option value="ban">Ban</option>
// // // // // //               </select>
// // // // // //             </div>

// // // // // //             {(action === "reject" || action === "ban") && (
// // // // // //               <div>
// // // // // //                 <label className="text-sm font-medium mb-1 block">Reason</label>
// // // // // //                 <Textarea
// // // // // //                   value={reason}
// // // // // //                   onChange={(e) => setReason(e.target.value)}
// // // // // //                   placeholder="Reason for action"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {action === "ban" && (
// // // // // //               <div>
// // // // // //                 <label className="text-sm font-medium mb-1 block">
// // // // // //                   Ban Duration (days)
// // // // // //                 </label>
// // // // // //                 <Input
// // // // // //                   type="number"
// // // // // //                   min="0"
// // // // // //                   placeholder="Leave empty for permanent"
// // // // // //                   value={banDuration}
// // // // // //                   onChange={(e) => setBanDuration(e.target.value)}
// // // // // //                 />
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <div className="flex items-center gap-3">
// // // // // //             <Button type="submit" disabled={loading}>
// // // // // //               {loading ? "Processing..." : "Confirm"}
// // // // // //             </Button>
// // // // // //             {successMessage && (
// // // // // //               <span className="text-green-600 text-sm">{successMessage}</span>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </form>
// // // // // //       </Card>
// // // // // //     </div>
// // // // // //   );
// // // // // // }




// // // // // import { useEffect, useState } from "react";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { Card } from "@/components/ui/card";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // import {
// // // // //   Select,
// // // // //   SelectContent,
// // // // //   SelectItem,
// // // // //   SelectTrigger,
// // // // //   SelectValue,
// // // // // } from "@/components/ui/select";
// // // // // import {
// // // // //   AlertTriangle,
// // // // //   ChevronLeft,
// // // // //   ChevronRight,
// // // // //   Clock,
// // // // //   Eye,
// // // // //   Flag,
// // // // //   Loader2,
// // // // //   Mail,
// // // // //   Phone,
// // // // //   Search,
// // // // //   Shield,
// // // // //   ShieldAlert,
// // // // //   ShieldCheck,
// // // // //   User,
// // // // //   Users,
// // // // //   Calendar,
// // // // //   FileText,
// // // // //   CheckCircle2,
// // // // //   XCircle,
// // // // //   Ban,
// // // // //   ArrowLeft,
// // // // //   Reply,
// // // // // } from "lucide-react";
// // // // // import {
// // // // //   fetchReportedProfiles,
// // // // //   fetchProfileForReview,
// // // // //   performUpdateProfileStatus,
// // // // //   clearProfileReviewStatus,
// // // // //   resetSelectedProfile,
// // // // // } from "../store/profile-review.slice";

// // // // // export function ReportedProfilesPage() {
// // // // //   const dispatch = useDispatch();
// // // // //   const { list, pagination, loading, error } = useSelector(
// // // // //     (s) => s.profileReview || {}
// // // // //   );
// // // // //   const [page, setPage] = useState(1);
// // // // //   const [searchTerm, setSearchTerm] = useState("");

// // // // //   useEffect(() => {
// // // // //     dispatch(fetchReportedProfiles({ page, limit: 20 }));
// // // // //   }, [dispatch, page]);

// // // // //   const filteredList = list?.filter((item) =>
// // // // //     item.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   const getStatusColor = (status) => {
// // // // //     switch (status) {
// // // // //       case "new":
// // // // //         return "bg-amber-100 text-amber-700 border-amber-200";
// // // // //       case "reviewed":
// // // // //         return "bg-emerald-100 text-emerald-700 border-emerald-200";
// // // // //       case "pending":
// // // // //         return "bg-blue-100 text-blue-700 border-blue-200";
// // // // //       default:
// // // // //         return "bg-gray-100 text-gray-700 border-gray-200";
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50/50">
// // // // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="p-2.5 bg-red-100 rounded-xl">
// // // // //               <Flag className="w-6 h-6 text-red-600" />
// // // // //             </div>
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold text-gray-900">
// // // // //                 Reported Profiles
// // // // //               </h1>
// // // // //               <p className="text-sm text-gray-500">
// // // // //                 Review and manage user reports
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="flex items-center gap-3">
// // // // //             <Badge
// // // // //               variant="secondary"
// // // // //               className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200"
// // // // //             >
// // // // //               <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
// // // // //               { filteredList?.status.new} Pending
// // // // //             </Badge>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Search Bar */}
// // // // //         <Card className="p-4 border-0 shadow-sm">
// // // // //           <div className="relative">
// // // // //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// // // // //             <Input
// // // // //               placeholder="Search by nickname..."
// // // // //               value={searchTerm}
// // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // //               className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
// // // // //             />
// // // // //           </div>
// // // // //         </Card>

// // // // //         {/* Table Card */}
// // // // //         <Card className="border-0 shadow-sm overflow-hidden">
// // // // //           {/* Desktop Table */}
// // // // //           <div className="hidden md:block overflow-x-auto">
// // // // //             <table className="w-full">
// // // // //               <thead>
// // // // //                 <tr className="bg-gray-50 border-b border-gray-100">
// // // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // // //                     User
// // // // //                   </th>
// // // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // // //                     Reports
// // // // //                   </th>
// // // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // // //                     Last Reported
// // // // //                   </th>
// // // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // // //                     Status
// // // // //                   </th>
// // // // //                   <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // // //                     Action
// // // // //                   </th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="divide-y divide-gray-100">
// // // // //                 {loading && (
// // // // //                   <tr>
// // // // //                     <td colSpan={5} className="px-6 py-12 text-center">
// // // // //                       <div className="flex flex-col items-center gap-3">
// // // // //                         <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
// // // // //                         <span className="text-gray-500">Loading reports...</span>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 )}
// // // // //                 {!loading && filteredList?.length === 0 && (
// // // // //                   <tr>
// // // // //                     <td colSpan={5} className="px-6 py-12 text-center">
// // // // //                       <div className="flex flex-col items-center gap-3">
// // // // //                         <div className="p-3 bg-gray-100 rounded-full">
// // // // //                           <Users className="w-8 h-8 text-gray-400" />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                           <p className="text-gray-900 font-medium">
// // // // //                             No reports found
// // // // //                           </p>
// // // // //                           <p className="text-sm text-gray-500">
// // // // //                             All profiles are in good standing
// // // // //                           </p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 )}
// // // // //                 {filteredList?.map((item) => (
// // // // //                   <tr
// // // // //                     key={item.userId}
// // // // //                     className="hover:bg-gray-50/50 transition-colors"
// // // // //                   >
// // // // //                     <td className="px-6 py-4">
// // // // //                       <div className="flex items-center gap-3">
// // // // //                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// // // // //                           <User className="w-5 h-5 text-gray-500" />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                           <p className="font-medium text-gray-900">
// // // // //                             {item.nickname}
// // // // //                           </p>
// // // // //                           <p className="text-xs text-gray-500">
// // // // //                             ID: {item.userId?.slice(0, 8)}...
// // // // //                           </p>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4">
// // // // //                       <div className="flex items-center gap-2">
// // // // //                         <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
// // // // //                           {item.reportCount}
// // // // //                         </span>
// // // // //                         <span className="text-sm text-gray-500">reports</span>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4">
// // // // //                       <div className="flex items-center gap-2 text-gray-600">
// // // // //                         <Clock className="w-4 h-4 text-gray-400" />
// // // // //                         <span className="text-sm">
// // // // //                           {new Date(item.lastReportedAt).toLocaleDateString(
// // // // //                             "en-IN",
// // // // //                             {
// // // // //                               day: "numeric",
// // // // //                               month: "short",
// // // // //                               year: "numeric",
// // // // //                             }
// // // // //                           )}
// // // // //                         </span>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4">
// // // // //                       <span
// // // // //                         className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
// // // // //                           item.status
// // // // //                         )}`}
// // // // //                       >
// // // // //                         {item.status}
// // // // //                       </span>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 text-right">
// // // // //                       <a
// // // // //                         href={`/admin/management/profile-review/${item.userId}`}
// // // // //                         className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
// // // // //                       >
// // // // //                         <Eye className="w-4 h-4" />
// // // // //                         Review
// // // // //                       </a>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>

// // // // //           {/* Mobile Cards */}
// // // // //           <div className="md:hidden divide-y divide-gray-100">
// // // // //             {loading && (
// // // // //               <div className="p-8 text-center">
// // // // //                 <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
// // // // //                 <p className="mt-3 text-gray-500">Loading reports...</p>
// // // // //               </div>
// // // // //             )}
// // // // //             {!loading && filteredList?.length === 0 && (
// // // // //               <div className="p-8 text-center">
// // // // //                 <div className="p-3 bg-gray-100 rounded-full inline-flex">
// // // // //                   <Users className="w-8 h-8 text-gray-400" />
// // // // //                 </div>
// // // // //                 <p className="mt-3 text-gray-900 font-medium">No reports found</p>
// // // // //                 <p className="text-sm text-gray-500">
// // // // //                   All profiles are in good standing
// // // // //                 </p>
// // // // //               </div>
// // // // //             )}
// // // // //             {filteredList?.map((item) => (
// // // // //               <div key={item.userId} className="p-4 space-y-3">
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div className="flex items-center gap-3">
// // // // //                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// // // // //                       <User className="w-5 h-5 text-gray-500" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <p className="font-medium text-gray-900">{item.nickname}</p>
// // // // //                       <p className="text-xs text-gray-500">
// // // // //                         {item.reportCount} reports
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <span
// // // // //                     className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
// // // // //                       item.status
// // // // //                     )}`}
// // // // //                   >
// // // // //                     {item.status}
// // // // //                   </span>
// // // // //                 </div>
// // // // //                 <div className="flex items-center justify-between text-sm">
// // // // //                   <span className="text-gray-500 flex items-center gap-1.5">
// // // // //                     <Clock className="w-3.5 h-3.5" />
// // // // //                     {new Date(item.lastReportedAt).toLocaleDateString("en-IN", {
// // // // //                       day: "numeric",
// // // // //                       month: "short",
// // // // //                     })}
// // // // //                   </span>
// // // // //                   <a
// // // // //                     href={`/admin/management/profile-review/${item.userId}`}
// // // // //                     className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
// // // // //                   >
// // // // //                     <Eye className="w-3.5 h-3.5" />
// // // // //                     Review
// // // // //                   </a>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </Card>

// // // // //         {/* Pagination */}
// // // // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
// // // // //           <p className="text-sm text-gray-500">
// // // // //             Page{" "}
// // // // //             <span className="font-medium text-gray-900">
// // // // //               {pagination?.page || page}
// // // // //             </span>{" "}
// // // // //             of{" "}
// // // // //             <span className="font-medium text-gray-900">
// // // // //               {pagination?.totalPages || 1}
// // // // //             </span>
// // // // //           </p>
// // // // //           <div className="flex items-center gap-2">
// // // // //             <Button
// // // // //               variant="outline"
// // // // //               size="sm"
// // // // //               disabled={page <= 1}
// // // // //               onClick={() => setPage((p) => p - 1)}
// // // // //               className="gap-1.5"
// // // // //             >
// // // // //               <ChevronLeft className="w-4 h-4" />
// // // // //               Previous
// // // // //             </Button>
// // // // //             <Button
// // // // //               variant="outline"
// // // // //               size="sm"
// // // // //               disabled={page >= (pagination?.totalPages || 1)}
// // // // //               onClick={() => setPage((p) => p + 1)}
// // // // //               className="gap-1.5"
// // // // //             >
// // // // //               Next
// // // // //               <ChevronRight className="w-4 h-4" />
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {error && (
// // // // //           <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
// // // // //             <XCircle className="w-5 h-5 text-red-500" />
// // // // //             <p className="text-sm text-red-700">{error}</p>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export function ProfileReviewDetailPage({ userId }) {
// // // // //   const dispatch = useDispatch();
// // // // //   const { selected, loading, error, successMessage } = useSelector(
// // // // //     (s) => s.profileReview || {}
// // // // //   );
// // // // //   const [action, setAction] = useState("approve");
// // // // //   const [reason, setReason] = useState("");
// // // // //   const [banDuration, setBanDuration] = useState("");

// // // // //   useEffect(() => {
// // // // //     if (userId) dispatch(fetchProfileForReview(userId));
// // // // //     return () => dispatch(resetSelectedProfile());
// // // // //   }, [dispatch, userId]);

// // // // //   const onSubmit = (e) => {
// // // // //     e.preventDefault();
// // // // //     const payload = {
// // // // //       userId,
// // // // //       action,
// // // // //       reason: reason || undefined,
// // // // //       banDuration: banDuration ? Number(banDuration) : undefined,
// // // // //     };
// // // // //     dispatch(performUpdateProfileStatus(payload)).then(() => {
// // // // //       setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
// // // // //     });
// // // // //   };

// // // // //   if (loading && !selected) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto" />
// // // // //           <p className="mt-4 text-gray-600">Loading profile...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
// // // // //         <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
// // // // //           <div className="p-3 bg-red-100 rounded-full inline-flex">
// // // // //             <XCircle className="w-8 h-8 text-red-500" />
// // // // //           </div>
// // // // //           <h2 className="mt-4 text-xl font-semibold text-gray-900">
// // // // //             Error Loading Profile
// // // // //           </h2>
// // // // //           <p className="mt-2 text-gray-500">{error}</p>
// // // // //           <Button className="mt-6 bg-transparent" variant="outline" asChild>
// // // // //             <a href="/admin/management/profile-review">
// // // // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // // // //               Go Back
// // // // //             </a>
// // // // //           </Button>
// // // // //         </Card>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!selected) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
// // // // //         <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
// // // // //           <div className="p-3 bg-gray-100 rounded-full inline-flex">
// // // // //             <User className="w-8 h-8 text-gray-400" />
// // // // //           </div>
// // // // //           <h2 className="mt-4 text-xl font-semibold text-gray-900">
// // // // //             Profile Not Found
// // // // //           </h2>
// // // // //           <p className="mt-2 text-gray-500">
// // // // //             The requested profile could not be found.
// // // // //           </p>
// // // // //           <Button className="mt-6 bg-transparent" variant="outline" asChild>
// // // // //             <a href="/admin/management/profile-review">
// // // // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // // // //               Go Back
// // // // //             </a>
// // // // //           </Button>
// // // // //         </Card>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const p = selected;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50/50">
// // // // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //           <div className="flex items-center gap-4">
// // // // //             <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
// // // // //               <a href="/admin/management/profile-review">
// // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // //               </a>
// // // // //             </Button>
// // // // //             <div className="flex items-center gap-3">
// // // // //               <div className="p-2.5 bg-blue-100 rounded-xl">
// // // // //                 <Shield className="w-6 h-6 text-blue-600" />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <h1 className="text-2xl font-bold text-gray-900">
// // // // //                   Profile Review
// // // // //                 </h1>
// // // // //                 <p className="text-sm text-gray-500">
// // // // //                   Review reported user profile
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //           {p.isBanned && (
// // // // //             <Badge className="bg-red-100 text-red-700 border border-red-200 px-4 py-2">
// // // // //               <Ban className="w-4 h-4 mr-2" />
// // // // //               User Banned
// // // // //             </Badge>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // // //           {/* Main Content */}
// // // // //           <div className="lg:col-span-2 space-y-6">
// // // // //             {/* Profile Info Card */}
// // // // //             <Card className="border-0 shadow-sm overflow-hidden">
// // // // //               <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // // // //                 <h3 className="text-white font-semibold flex items-center gap-2">
// // // // //                   <User className="w-4 h-4" />
// // // // //                   Profile Information
// // // // //                 </h3>
// // // // //               </div>
// // // // //               <div className="p-6">
// // // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// // // // //                   {/* Contact Info */}
// // // // //                   <div className="space-y-4">
// // // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // // //                         <Mail className="w-4 h-4 text-gray-600" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // // //                           Email
// // // // //                         </p>
// // // // //                         <p className="text-sm font-medium text-gray-900">
// // // // //                           {p.email}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // // //                         <Phone className="w-4 h-4 text-gray-600" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // // //                           Phone
// // // // //                         </p>
// // // // //                         <p className="text-sm font-medium text-gray-900">
// // // // //                           {p.phone || "Not provided"}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // // //                         {p.profile?.verification?.status === "approved" ? (
// // // // //                           <ShieldCheck className="w-4 h-4 text-emerald-600" />
// // // // //                         ) : (
// // // // //                           <ShieldAlert className="w-4 h-4 text-amber-600" />
// // // // //                         )}
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // // //                           Verification
// // // // //                         </p>
// // // // //                         <p className="text-sm font-medium text-gray-900">
// // // // //                           {p.profile?.verification?.status === "approved"
// // // // //                             ? "Verified"
// // // // //                             : "Not Verified"}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* Profile Details */}
// // // // //                   <div className="space-y-4">
// // // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // // //                         <User className="w-4 h-4 text-gray-600" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // // //                           Nickname
// // // // //                         </p>
// // // // //                         <p className="text-sm font-medium text-gray-900">
// // // // //                           {p.profile?.nickname || "N/A"}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // // //                         <Users className="w-4 h-4 text-gray-600" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // // //                           Gender / Age
// // // // //                         </p>
// // // // //                         <p className="text-sm font-medium text-gray-900">
// // // // //                           {p.profile?.gender || "N/A"} /{" "}
// // // // //                           {p.profile?.age || "N/A"}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // // //                         <Clock className="w-4 h-4 text-gray-600" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // // //                           Last Active
// // // // //                         </p>
// // // // //                         <p className="text-sm font-medium text-gray-900">
// // // // //                           {p.profile?.lastActive
// // // // //                             ? new Date(p.profile.lastActive).toLocaleDateString(
// // // // //                                 "en-IN",
// // // // //                                 {
// // // // //                                   day: "numeric",
// // // // //                                   month: "short",
// // // // //                                   year: "numeric",
// // // // //                                 }
// // // // //                               )
// // // // //                             : "Unknown"}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 {/* Ban Info */}
// // // // //                 {p.isBanned && (
// // // // //                   <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
// // // // //                     <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
// // // // //                       <Ban className="w-4 h-4" />
// // // // //                       Ban Information
// // // // //                     </div>
// // // // //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// // // // //                       <div>
// // // // //                         <span className="text-red-600">Reason:</span>{" "}
// // // // //                         <span className="text-gray-900">{p.banReason}</span>
// // // // //                       </div>
// // // // //                       {p.banDetails?.banExpiresAt && (
// // // // //                         <div>
// // // // //                           <span className="text-red-600">Expires:</span>{" "}
// // // // //                           <span className="text-gray-900">
// // // // //                             {new Date(
// // // // //                               p.banDetails.banExpiresAt
// // // // //                             ).toLocaleDateString("en-IN", {
// // // // //                               day: "numeric",
// // // // //                               month: "short",
// // // // //                               year: "numeric",
// // // // //                             })}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 )}

// // // // //                 {/* Bio */}
// // // // //                 <div className="mt-6">
// // // // //                   <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
// // // // //                     <FileText className="w-4 h-4" />
// // // // //                     Bio
// // // // //                   </h4>
// // // // //                   <div className="p-4 bg-gray-50 rounded-xl">
// // // // //                     <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
// // // // //                       {p.profile?.bio || "No bio provided"}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </Card>

// // // // //             {/* Photos */}
// // // // //             {p.profile?.photos?.length > 0 && (
// // // // //               <Card className="border-0 shadow-sm overflow-hidden">
// // // // //                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // // // //                   <h3 className="text-white font-semibold">
// // // // //                     Photos ({p.profile.photos.length})
// // // // //                   </h3>
// // // // //                 </div>
// // // // //                 <div className="p-6">
// // // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
// // // // //                     {p.profile.photos.map((ph, idx) => (
// // // // //                       <div
// // // // //                         key={idx}
// // // // //                         className="aspect-square rounded-xl overflow-hidden bg-gray-100 group"
// // // // //                       >
// // // // //                         <img
// // // // //                           src={ph.url || ph}
// // // // //                           alt={`Photo ${idx + 1}`}
// // // // //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// // // // //                         />
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </Card>
// // // // //             )}

// // // // //             {/* Reports */}
// // // // //             <Card className="border-0 shadow-sm overflow-hidden">
// // // // //               <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
// // // // //                 <h3 className="text-white font-semibold flex items-center gap-2">
// // // // //                   <Flag className="w-4 h-4" />
// // // // //                   Reports ({p.reportCount})
// // // // //                 </h3>
// // // // //               </div>
// // // // //               <div className="p-6 space-y-4">
// // // // //                 {p.reports?.length === 0 && (
// // // // //                   <p className="text-gray-500 text-center py-8">
// // // // //                     No reports found
// // // // //                   </p>
// // // // //                 )}
// // // // //                 {p.reports?.map((r) => (
// // // // //                   <div
// // // // //                     key={r._id}
// // // // //                     className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
// // // // //                   >
// // // // //                     <div className="flex items-start justify-between gap-4">
// // // // //                       <div className="flex-1">
// // // // //                         <div className="flex items-center gap-2 mb-2">
// // // // //                           <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
// // // // //                             {r.reason}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                         {r.details && (
// // // // //                           <p className="text-sm text-gray-700 mb-3">
// // // // //                             {r.details}
// // // // //                           </p>
// // // // //                         )}
// // // // //                         <div className="flex items-center gap-4 text-xs text-gray-500">
// // // // //                           <span className="flex items-center gap-1">
// // // // //                             <User className="w-3 h-3" />
// // // // //                             {r.reportedBy?.name ||
// // // // //                               r.reportedBy?.email ||
// // // // //                               r.reportedBy?.phone ||
// // // // //                               "Anonymous"}
// // // // //                           </span>
// // // // //                           <span className="flex items-center gap-1">
// // // // //                             <Calendar className="w-3 h-3" />
// // // // //                             {new Date(r.createdAt).toLocaleDateString("en-IN", {
// // // // //                               day: "numeric",
// // // // //                               month: "short",
// // // // //                               year: "numeric",
// // // // //                             })}
// // // // //                           </span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </Card>
// // // // //           </div>

// // // // //           {/* Action Panel - Sticky on Desktop */}
// // // // //           <div className="lg:col-span-1">
// // // // //             <div className="lg:sticky lg:top-6">
// // // // //               <Card className="border-0 shadow-sm overflow-hidden">
// // // // //                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // // // //                   <h3 className="text-white font-semibold">Take Action</h3>
// // // // //                 </div>
// // // // //                 <form onSubmit={onSubmit} className="p-6 space-y-5">
// // // // //                   <div>
// // // // //                     <label className="text-sm font-medium text-gray-700 mb-2 block">
// // // // //                       Action
// // // // //                     </label>
// // // // //                     <Select value={action} onValueChange={setAction}>
// // // // //                       <SelectTrigger className="w-full">
// // // // //                         <SelectValue />
// // // // //                       </SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         <SelectItem value="approve">
// // // // //                           <div className="flex items-center gap-2">
// // // // //                             <CheckCircle2 className="w-4 h-4 text-emerald-600" />
// // // // //                             Approve
// // // // //                           </div>
// // // // //                         </SelectItem>
// // // // //                         <SelectItem value="reject">
// // // // //                           <div className="flex items-center gap-2">
// // // // //                             <XCircle className="w-4 h-4 text-amber-600" />
// // // // //                             Reject
// // // // //                           </div>
// // // // //                         </SelectItem>
// // // // //                         <SelectItem value="ban">
// // // // //                           <div className="flex items-center gap-2">
// // // // //                             <Ban className="w-4 h-4 text-red-600" />
// // // // //                             Ban User
// // // // //                           </div>
// // // // //                         </SelectItem>
// // // // //                         <SelectItem value="reply">
// // // // //                           <div className="flex items-center gap-2">
// // // // //                             <Reply className="w-4 h-4 text-red-600" />
// // // // //                             reply to reporter
// // // // //                           </div>
// // // // //                         </SelectItem>
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>

// // // // //                   {(action === "reject" || action === "ban") && (
// // // // //                     <div>
// // // // //                       <label className="text-sm font-medium text-gray-700 mb-2 block">
// // // // //                         Reason
// // // // //                       </label>
// // // // //                       <Textarea
// // // // //                         value={reason}
// // // // //                         onChange={(e) => setReason(e.target.value)}
// // // // //                         placeholder="Enter reason for this action..."
// // // // //                         className="resize-none"
// // // // //                         rows={3}
// // // // //                       />
// // // // //                     </div>
// // // // //                   )}

// // // // //                   {action === "ban" && (
// // // // //                     <div>
// // // // //                       <label className="text-sm font-medium text-gray-700 mb-2 block">
// // // // //                         Ban Duration (days)
// // // // //                       </label>
// // // // //                       <Input
// // // // //                         type="number"
// // // // //                         min="0"
// // // // //                         placeholder="Leave empty for permanent ban"
// // // // //                         value={banDuration}
// // // // //                         onChange={(e) => setBanDuration(e.target.value)}
// // // // //                       />
// // // // //                       <p className="text-xs text-gray-500 mt-1.5">
// // // // //                         Enter 0 or leave empty for permanent ban
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   )}

// // // // //                   <Button
// // // // //                     type="submit"
// // // // //                     disabled={loading}
// // // // //                     className={`w-full ${
// // // // //                       action === "ban"
// // // // //                         ? "bg-red-600 hover:bg-red-700"
// // // // //                         : action === "reject"
// // // // //                         ? "bg-amber-600 hover:bg-amber-700"
// // // // //                         : "bg-emerald-600 hover:bg-emerald-700"
// // // // //                     }`}
// // // // //                   >
// // // // //                     {loading ? (
// // // // //                       <>
// // // // //                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // // // //                         Processing...
// // // // //                       </>
// // // // //                     ) : (
// // // // //                       <>
// // // // //                         {action === "approve" && (
// // // // //                           <CheckCircle2 className="w-4 h-4 mr-2" />
// // // // //                         )}
// // // // //                         {action === "reject" && (
// // // // //                           <XCircle className="w-4 h-4 mr-2" />
// // // // //                         )}
// // // // //                         {action === "ban" && <Ban className="w-4 h-4 mr-2" />}
// // // // //                         Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
// // // // //                       </>
// // // // //                     )}
// // // // //                   </Button>

// // // // //                   {successMessage && (
// // // // //                     <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
// // // // //                       <CheckCircle2 className="w-5 h-5 text-emerald-600" />
// // // // //                       <span className="text-sm text-emerald-700">
// // // // //                         {successMessage}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </form>
// // // // //               </Card>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // 'use client';


// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { Card } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Textarea } from "@/components/ui/textarea";
// // // // import {
// // // //   Select,
// // // //   SelectContent,
// // // //   SelectItem,
// // // //   SelectTrigger,
// // // //   SelectValue,
// // // // } from "@/components/ui/select";
// // // // import {
// // // //   AlertTriangle,
// // // //   ChevronLeft,
// // // //   ChevronRight,
// // // //   Clock,
// // // //   Eye,
// // // //   Flag,
// // // //   Loader2,
// // // //   Mail,
// // // //   Phone,
// // // //   Search,
// // // //   Shield,
// // // //   ShieldAlert,
// // // //   ShieldCheck,
// // // //   User,
// // // //   Users,
// // // //   Calendar,
// // // //   FileText,
// // // //   CheckCircle2,
// // // //   XCircle,
// // // //   Ban,
// // // //   ArrowLeft,
// // // //   Reply,
// // // // } from "lucide-react";
// // // // import {
// // // //   fetchReportedProfiles,
// // // //   fetchProfileForReview,
// // // //   performUpdateProfileStatus,
// // // //   clearProfileReviewStatus,
// // // //   resetSelectedProfile,
// // // // } from "../store/profile-review.slice";

// // // // export function ReportedProfilesPage() {
// // // //   const dispatch = useDispatch();
// // // //   const { list, pagination, loading, error } = useSelector(
// // // //     (s) => s.profileReview || {}
// // // //   );
// // // //   const [page, setPage] = useState(1);
// // // //   const [searchTerm, setSearchTerm] = useState("");

// // // //   useEffect(() => {
// // // //     dispatch(fetchReportedProfiles({ page, limit: 20 }));
// // // //   }, [dispatch, page]);

// // // //   const filteredList = list?.filter((item) =>
// // // //     item.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   const getStatusColor = (status) => {
// // // //     switch (status) {
// // // //       case "new":
// // // //         return "bg-amber-100 text-amber-700 border-amber-200";
// // // //       case "reviewed":
// // // //         return "bg-emerald-100 text-emerald-700 border-emerald-200";
// // // //       case "resolved":
// // // //         return "bg-green-100 text-green-700 border-green-200";
// // // //       case "pending":
// // // //         return "bg-blue-100 text-blue-700 border-blue-200";
// // // //       default:
// // // //         return "bg-gray-100 text-gray-700 border-gray-200";
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50/50">
// // // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="p-2.5 bg-red-100 rounded-xl">
// // // //               <Flag className="w-6 h-6 text-red-600" />
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold text-gray-900">
// // // //                 Reported Profiles
// // // //               </h1>
// // // //               <p className="text-sm text-gray-500">
// // // //                 Review and manage user reports
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center gap-3">
// // // //             {/* <Badge
// // // //               variant="secondary"
// // // //               className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200"
// // // //             >
// // // //               <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
// // // //               { filteredList?.map((item)=>{
// // // //                 item
// // // //               })} Pending
// // // //             </Badge> */}
// // // //           </div>
// // // //         </div>

// // // //         {/* Search Bar */}
// // // //         <Card className="p-4 border-0 shadow-sm">
// // // //           <div className="relative">
// // // //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// // // //             <Input
// // // //               placeholder="Search by nickname..."
// // // //               value={searchTerm}
// // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // //               className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
// // // //             />
// // // //           </div>
// // // //         </Card>

// // // //         {/* Table Card */}
// // // //         <Card className="border-0 shadow-sm overflow-hidden">
// // // //           {/* Desktop Table */}
// // // //           <div className="hidden md:block overflow-x-auto">
// // // //             <table className="w-full">
// // // //               <thead>
// // // //                 <tr className="bg-gray-50 border-b border-gray-100">
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // //                     User
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // //                     Reports
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // //                     Last Reported
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // //                     Status
// // // //                   </th>
// // // //                   <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // // //                     Action
// // // //                   </th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-gray-100">
// // // //                 {loading && (
// // // //                   <tr>
// // // //                     <td colSpan={5} className="px-6 py-12 text-center">
// // // //                       <div className="flex flex-col items-center gap-3">
// // // //                         <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
// // // //                         <span className="text-gray-500">Loading reports...</span>
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 )}
// // // //                 {!loading && filteredList?.length === 0 && (
// // // //                   <tr>
// // // //                     <td colSpan={5} className="px-6 py-12 text-center">
// // // //                       <div className="flex flex-col items-center gap-3">
// // // //                         <div className="p-3 bg-gray-100 rounded-full">
// // // //                           <Users className="w-8 h-8 text-gray-400" />
// // // //                         </div>
// // // //                         <div>
// // // //                           <p className="text-gray-900 font-medium">
// // // //                             No reports found
// // // //                           </p>
// // // //                           <p className="text-sm text-gray-500">
// // // //                             All profiles are in good standing
// // // //                           </p>
// // // //                         </div>
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 )}
// // // //                 {filteredList?.map((item) => (
// // // //                   <tr
// // // //                     key={item.userId}
// // // //                     className="hover:bg-gray-50/50 transition-colors"
// // // //                   >
// // // //                     <td className="px-6 py-4">
// // // //                       <div className="flex items-center gap-3">
// // // //                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// // // //                           <User className="w-5 h-5 text-gray-500" />
// // // //                         </div>
// // // //                         <div>
// // // //                           <p className="font-medium text-gray-900">
// // // //                             {item.nickname}
// // // //                           </p>
// // // //                           <p className="text-xs text-gray-500">
// // // //                             ID: {item.userId?.slice(0, 8)}...
// // // //                           </p>
// // // //                         </div>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4">
// // // //                       <div className="flex items-center gap-2">
// // // //                         <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
// // // //                           {item.reportCount}
// // // //                         </span>
// // // //                         <span className="text-sm text-gray-500">reports</span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4">
// // // //                       <div className="flex items-center gap-2 text-gray-600">
// // // //                         <Clock className="w-4 h-4 text-gray-400" />
// // // //                         <span className="text-sm">
// // // //                           {new Date(item.lastReportedAt).toLocaleDateString(
// // // //                             "en-IN",
// // // //                             {
// // // //                               day: "numeric",
// // // //                               month: "short",
// // // //                               year: "numeric",
// // // //                             }
// // // //                           )}
// // // //                         </span>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4">
// // // //                       <span
// // // //                         className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
// // // //                           item.status
// // // //                         )}`}
// // // //                       >
// // // //                         {item.status}
// // // //                       </span>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 text-right">
// // // //                       <a
// // // //                         href={`/admin/management/profile-review/${item.userId}`}
// // // //                         className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
// // // //                       >
// // // //                         <Eye className="w-4 h-4" />
// // // //                         Review
// // // //                       </a>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>

// // // //           {/* Mobile Cards */}
// // // //           <div className="md:hidden divide-y divide-gray-100">
// // // //             {loading && (
// // // //               <div className="p-8 text-center">
// // // //                 <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
// // // //                 <p className="mt-3 text-gray-500">Loading reports...</p>
// // // //               </div>
// // // //             )}
// // // //             {!loading && filteredList?.length === 0 && (
// // // //               <div className="p-8 text-center">
// // // //                 <div className="p-3 bg-gray-100 rounded-full inline-flex">
// // // //                   <Users className="w-8 h-8 text-gray-400" />
// // // //                 </div>
// // // //                 <p className="mt-3 text-gray-900 font-medium">No reports found</p>
// // // //                 <p className="text-sm text-gray-500">
// // // //                   All profiles are in good standing
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //             {filteredList?.map((item) => (
// // // //               <div key={item.userId} className="p-4 space-y-3">
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div className="flex items-center gap-3">
// // // //                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// // // //                       <User className="w-5 h-5 text-gray-500" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <p className="font-medium text-gray-900">{item.nickname}</p>
// // // //                       <p className="text-xs text-gray-500">
// // // //                         {item.reportCount} reports
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                   <span
// // // //                     className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
// // // //                       item.status
// // // //                     )}`}
// // // //                   >
// // // //                     {item.status}
// // // //                   </span>
// // // //                 </div>
// // // //                 <div className="flex items-center justify-between text-sm">
// // // //                   <span className="text-gray-500 flex items-center gap-1.5">
// // // //                     <Clock className="w-3.5 h-3.5" />
// // // //                     {new Date(item.lastReportedAt).toLocaleDateString("en-IN", {
// // // //                       day: "numeric",
// // // //                       month: "short",
// // // //                     })}
// // // //                   </span>
// // // //                   <a
// // // //                     href={`/admin/management/profile-review/${item.userId}`}
// // // //                     className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
// // // //                   >
// // // //                     <Eye className="w-3.5 h-3.5" />
// // // //                     Review
// // // //                   </a>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </Card>

// // // //         {/* Pagination */}
// // // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
// // // //           <p className="text-sm text-gray-500">
// // // //             Page{" "}
// // // //             <span className="font-medium text-gray-900">
// // // //               {pagination?.page || page}
// // // //             </span>{" "}
// // // //             of{" "}
// // // //             <span className="font-medium text-gray-900">
// // // //               {pagination?.totalPages || 1}
// // // //             </span>
// // // //           </p>
// // // //           <div className="flex items-center gap-2">
// // // //             <Button
// // // //               variant="outline"
// // // //               size="sm"
// // // //               disabled={page <= 1}
// // // //               onClick={() => setPage((p) => p - 1)}
// // // //               className="gap-1.5"
// // // //             >
// // // //               <ChevronLeft className="w-4 h-4" />
// // // //               Previous
// // // //             </Button>
// // // //             <Button
// // // //               variant="outline"
// // // //               size="sm"
// // // //               disabled={page >= (pagination?.totalPages || 1)}
// // // //               onClick={() => setPage((p) => p + 1)}
// // // //               className="gap-1.5"
// // // //             >
// // // //               Next
// // // //               <ChevronRight className="w-4 h-4" />
// // // //             </Button>
// // // //           </div>
// // // //         </div>

// // // //         {error && (
// // // //           <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
// // // //             <XCircle className="w-5 h-5 text-red-500" />
// // // //             <p className="text-sm text-red-700">{error}</p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export function ProfileReviewDetailPage({ userId }) {
// // // //   const dispatch = useDispatch();
// // // //   const { selected, loading, error, successMessage } = useSelector(
// // // //     (s) => s.profileReview || {}
// // // //   );
// // // //   const [action, setAction] = useState("resolve");
// // // //   const [reason, setReason] = useState("");
// // // //   const [banDuration, setBanDuration] = useState("");

// // // //   useEffect(() => {
// // // //     if (userId) dispatch(fetchProfileForReview(userId));
// // // //     return () => dispatch(resetSelectedProfile());
// // // //   }, [dispatch, userId]);

// // // //   const onSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     const payload = {
// // // //       userId,
// // // //       action,
// // // //       reason: reason || undefined,
// // // //       banDuration: banDuration ? Number(banDuration) : undefined,
// // // //     };
// // // //     dispatch(performUpdateProfileStatus(payload)).then(() => {
// // // //       setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
// // // //     });
// // // //   };

// // // //   if (loading && !selected) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto" />
// // // //           <p className="mt-4 text-gray-600">Loading profile...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
// // // //         <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
// // // //           <div className="p-3 bg-red-100 rounded-full inline-flex">
// // // //             <XCircle className="w-8 h-8 text-red-500" />
// // // //           </div>
// // // //           <h2 className="mt-4 text-xl font-semibold text-gray-900">
// // // //             Error Loading Profile
// // // //           </h2>
// // // //           <p className="mt-2 text-gray-500">{error}</p>
// // // //           <Button className="mt-6 bg-transparent" variant="outline" asChild>
// // // //             <a href="/admin/management/profile-review">
// // // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // // //               Go Back
// // // //             </a>
// // // //           </Button>
// // // //         </Card>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!selected) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
// // // //         <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
// // // //           <div className="p-3 bg-gray-100 rounded-full inline-flex">
// // // //             <User className="w-8 h-8 text-gray-400" />
// // // //           </div>
// // // //           <h2 className="mt-4 text-xl font-semibold text-gray-900">
// // // //             Profile Not Found
// // // //           </h2>
// // // //           <p className="mt-2 text-gray-500">
// // // //             The requested profile could not be found.
// // // //           </p>
// // // //           <Button className="mt-6 bg-transparent" variant="outline" asChild>
// // // //             <a href="/admin/management/profile-review">
// // // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // // //               Go Back
// // // //             </a>
// // // //           </Button>
// // // //         </Card>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const p = selected;

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50/50">
// // // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //           <div className="flex items-center gap-4">
// // // //             <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
// // // //               <a href="/admin/management/profile-review">
// // // //                 <ArrowLeft className="w-4 h-4" />
// // // //               </a>
// // // //             </Button>
// // // //             <div className="flex items-center gap-3">
// // // //               <div className="p-2.5 bg-blue-100 rounded-xl">
// // // //                 <Shield className="w-6 h-6 text-blue-600" />
// // // //               </div>
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-gray-900">
// // // //                   Profile Review
// // // //                 </h1>
// // // //                 <p className="text-sm text-gray-500">
// // // //                   Review reported user profile
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //           {p.isBanned && (
// // // //             <Badge className="bg-red-100 text-red-700 border border-red-200 px-4 py-2">
// // // //               <Ban className="w-4 h-4 mr-2" />
// // // //               User Banned
// // // //             </Badge>
// // // //           )}
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // //           {/* Main Content */}
// // // //           <div className="lg:col-span-2 space-y-6">
// // // //             {/* Profile Info Card */}
// // // //             <Card className="border-0 shadow-sm overflow-hidden">
// // // //               <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // // //                 <h3 className="text-white font-semibold flex items-center gap-2">
// // // //                   <User className="w-4 h-4" />
// // // //                   Profile Information
// // // //                 </h3>
// // // //               </div>
// // // //               <div className="p-6">
// // // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// // // //                   {/* Contact Info */}
// // // //                   <div className="space-y-4">
// // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // //                         <Mail className="w-4 h-4 text-gray-600" />
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // //                           Email
// // // //                         </p>
// // // //                         <p className="text-sm font-medium text-gray-900">
// // // //                           {p.email}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // //                         <Phone className="w-4 h-4 text-gray-600" />
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // //                           Phone
// // // //                         </p>
// // // //                         <p className="text-sm font-medium text-gray-900">
// // // //                           {p.phone || "Not provided"}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // //                         {p.profile?.verification?.status === "approved" ? (
// // // //                           <ShieldCheck className="w-4 h-4 text-emerald-600" />
// // // //                         ) : (
// // // //                           <ShieldAlert className="w-4 h-4 text-amber-600" />
// // // //                         )}
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // //                           Verification
// // // //                         </p>
// // // //                         <p className="text-sm font-medium text-gray-900">
// // // //                           {p.profile?.verification?.status === "approved"
// // // //                             ? "Verified"
// // // //                             : "Not Verified"}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Profile Details */}
// // // //                   <div className="space-y-4">
// // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // //                         <User className="w-4 h-4 text-gray-600" />
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // //                           Nickname
// // // //                         </p>
// // // //                         <p className="text-sm font-medium text-gray-900">
// // // //                           {p.profile?.nickname || "N/A"}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // //                         <Users className="w-4 h-4 text-gray-600" />
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // //                           Gender / Age
// // // //                         </p>
// // // //                         <p className="text-sm font-medium text-gray-900">
// // // //                           {p.profile?.gender || "N/A"} /{" "}
// // // //                           {p.profile?.age || "N/A"}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // // //                         <Clock className="w-4 h-4 text-gray-600" />
// // // //                       </div>
// // // //                       <div>
// // // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // // //                           Last Active
// // // //                         </p>
// // // //                         <p className="text-sm font-medium text-gray-900">
// // // //                           {p.profile?.lastActive
// // // //                             ? new Date(p.profile.lastActive).toLocaleDateString(
// // // //                                 "en-IN",
// // // //                                 {
// // // //                                   day: "numeric",
// // // //                                   month: "short",
// // // //                                   year: "numeric",
// // // //                                 }
// // // //                               )
// // // //                             : "Unknown"}
// // // //                         </p>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Ban Info */}
// // // //                 {p.isBanned && (
// // // //                   <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
// // // //                     <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
// // // //                       <Ban className="w-4 h-4" />
// // // //                       Ban Information
// // // //                     </div>
// // // //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// // // //                       <div>
// // // //                         <span className="text-red-600">Reason:</span>{" "}
// // // //                         <span className="text-gray-900">{p.banReason}</span>
// // // //                       </div>
// // // //                       {p.banDetails?.banExpiresAt && (
// // // //                         <div>
// // // //                           <span className="text-red-600">Expires:</span>{" "}
// // // //                           <span className="text-gray-900">
// // // //                             {new Date(
// // // //                               p.banDetails.banExpiresAt
// // // //                             ).toLocaleDateString("en-IN", {
// // // //                               day: "numeric",
// // // //                               month: "short",
// // // //                               year: "numeric",
// // // //                             })}
// // // //                           </span>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Bio */}
// // // //                 <div className="mt-6">
// // // //                   <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
// // // //                     <FileText className="w-4 h-4" />
// // // //                     Bio
// // // //                   </h4>
// // // //                   <div className="p-4 bg-gray-50 rounded-xl">
// // // //                     <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
// // // //                       {p.profile?.bio || "No bio provided"}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </Card>

// // // //             {/* Photos */}
// // // //             {p.profile?.photos?.length > 0 && (
// // // //               <Card className="border-0 shadow-sm overflow-hidden">
// // // //                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // // //                   <h3 className="text-white font-semibold">
// // // //                     Photos ({p.profile.photos.length})
// // // //                   </h3>
// // // //                 </div>
// // // //                 <div className="p-6">
// // // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
// // // //                     {p.profile.photos.map((ph, idx) => (
// // // //                       <div
// // // //                         key={idx}
// // // //                         className="aspect-square rounded-xl overflow-hidden bg-gray-100 group"
// // // //                       >
// // // //                         <img
// // // //                           src={ph.url || ph}
// // // //                           alt={`Photo ${idx + 1}`}
// // // //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// // // //                         />
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </Card>
// // // //             )}

// // // //             {/* Reports */}
// // // //             <Card className="border-0 shadow-sm overflow-hidden">
// // // //               <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
// // // //                 <h3 className="text-white font-semibold flex items-center gap-2">
// // // //                   <Flag className="w-4 h-4" />
// // // //                   Reports ({p.reportCount})
// // // //                 </h3>
// // // //               </div>
// // // //               <div className="p-6 space-y-4">
// // // //                 {p.reports?.length === 0 && (
// // // //                   <p className="text-gray-500 text-center py-8">
// // // //                     No reports found
// // // //                   </p>
// // // //                 )}
// // // //                 {p.reports?.map((r) => (
// // // //                   <div
// // // //                     key={r._id}
// // // //                     className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
// // // //                   >
// // // //                     <div className="flex items-start justify-between gap-4">
// // // //                       <div className="flex-1">
// // // //                         <div className="flex items-center gap-2 mb-2">
// // // //                           <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
// // // //                             {r.reason}
// // // //                           </span>
// // // //                         </div>
// // // //                         {r.details && (
// // // //                           <p className="text-sm text-gray-700 mb-3">
// // // //                             {r.details}
// // // //                           </p>
// // // //                         )}
// // // //                         <div className="flex items-center gap-4 text-xs text-gray-500">
// // // //                           <span className="flex items-center gap-1">
// // // //                             <User className="w-3 h-3" />
// // // //                             {r.reportedBy?.name ||
// // // //                               r.reportedBy?.email ||
// // // //                               r.reportedBy?.phone ||
// // // //                               "Anonymous"}
// // // //                           </span>
// // // //                           <span className="flex items-center gap-1">
// // // //                             <Calendar className="w-3 h-3" />
// // // //                             {new Date(r.createdAt).toLocaleDateString("en-IN", {
// // // //                               day: "numeric",
// // // //                               month: "short",
// // // //                               year: "numeric",
// // // //                             })}
// // // //                           </span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </Card>
// // // //           </div>

// // // //           {/* Action Panel - Sticky on Desktop */}
// // // //           <div className="lg:col-span-1">
// // // //             <div className="lg:sticky lg:top-6">
// // // //               <Card className="border-0 shadow-sm overflow-hidden">
// // // //                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // // //                   <h3 className="text-white font-semibold">Take Action</h3>
// // // //                 </div>
// // // //                 <form onSubmit={onSubmit} className="p-6 space-y-5">
// // // //                   <div>
// // // //                     <label className="text-sm font-medium text-gray-700 mb-2 block">
// // // //                       Action
// // // //                     </label>
// // // //                     <Select value={action} onValueChange={setAction}>
// // // //                       <SelectTrigger className="w-full">
// // // //                         <SelectValue />
// // // //                       </SelectTrigger>
// // // //                       <SelectContent>
// // // //                         <SelectItem value="resolve">
// // // //                           <div className="flex items-center gap-2">
// // // //                             <CheckCircle2 className="w-4 h-4 text-green-600" />
// // // //                             Mark Resolved
// // // //                           </div>
// // // //                         </SelectItem>
// // // //                         <SelectItem value="approve">
// // // //                           <div className="flex items-center gap-2">
// // // //                             <CheckCircle2 className="w-4 h-4 text-emerald-600" />
// // // //                             Approve
// // // //                           </div>
// // // //                         </SelectItem>
// // // //                         <SelectItem value="reject">
// // // //                           <div className="flex items-center gap-2">
// // // //                             <XCircle className="w-4 h-4 text-amber-600" />
// // // //                             Reject
// // // //                           </div>
// // // //                         </SelectItem>
// // // //                         <SelectItem value="ban">
// // // //                           <div className="flex items-center gap-2">
// // // //                             <Ban className="w-4 h-4 text-red-600" />
// // // //                             Ban User
// // // //                           </div>
// // // //                         </SelectItem>
// // // //                         <SelectItem value="reply">
// // // //                           <div className="flex items-center gap-2">
// // // //                             <Reply className="w-4 h-4 text-red-600" />
// // // //                             Reply to Reporter
// // // //                           </div>
// // // //                         </SelectItem>
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>

// // // //                   {(action === "reject" || action === "ban" || action === "resolve") && (
// // // //                     <div>
// // // //                       <label className="text-sm font-medium text-gray-700 mb-2 block">
// // // //                         {action === "resolve" ? "Resolution Notes (Optional)" : "Reason"}
// // // //                       </label>
// // // //                       <Textarea
// // // //                         value={reason}
// // // //                         onChange={(e) => setReason(e.target.value)}
// // // //                         placeholder={action === "resolve" ? "Add notes about how this report was resolved..." : "Enter reason for this action..."}
// // // //                         className="resize-none"
// // // //                         rows={3}
// // // //                       />
// // // //                     </div>
// // // //                   )}

// // // //                   {action === "ban" && (
// // // //                     <div>
// // // //                       <label className="text-sm font-medium text-gray-700 mb-2 block">
// // // //                         Ban Duration (days)
// // // //                       </label>
// // // //                       <Input
// // // //                         type="number"
// // // //                         min="0"
// // // //                         placeholder="Leave empty for permanent ban"
// // // //                         value={banDuration}
// // // //                         onChange={(e) => setBanDuration(e.target.value)}
// // // //                       />
// // // //                       <p className="text-xs text-gray-500 mt-1.5">
// // // //                         Enter 0 or leave empty for permanent ban
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   <Button
// // // //                     type="submit"
// // // //                     disabled={loading}
// // // //                     className={`w-full ${
// // // //                       action === "resolve"
// // // //                         ? "bg-green-600 hover:bg-green-700"
// // // //                         : action === "ban"
// // // //                         ? "bg-red-600 hover:bg-red-700"
// // // //                         : action === "reject"
// // // //                         ? "bg-amber-600 hover:bg-amber-700"
// // // //                         : "bg-emerald-600 hover:bg-emerald-700"
// // // //                     }`}
// // // //                   >
// // // //                     {loading ? (
// // // //                       <>
// // // //                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // // //                         Processing...
// // // //                       </>
// // // //                     ) : (
// // // //                       <>
// // // //                         {action === "resolve" && (
// // // //                           <CheckCircle2 className="w-4 h-4 mr-2" />
// // // //                         )}
// // // //                         {action === "approve" && (
// // // //                           <CheckCircle2 className="w-4 h-4 mr-2" />
// // // //                         )}
// // // //                         {action === "reject" && (
// // // //                           <XCircle className="w-4 h-4 mr-2" />
// // // //                         )}
// // // //                         {action === "ban" && <Ban className="w-4 h-4 mr-2" />}
// // // //                         {action === "reply" && <Reply className="w-4 h-4 mr-2" />}
// // // //                         Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
// // // //                       </>
// // // //                     )}
// // // //                   </Button>

// // // //                   {successMessage && (
// // // //                     <div className={`flex items-center gap-2 p-3 rounded-lg border ${
// // // //                       action === "resolve"
// // // //                         ? "bg-green-50 border-green-200"
// // // //                         : action === "ban"
// // // //                         ? "bg-red-50 border-red-200"
// // // //                         : action === "reject"
// // // //                         ? "bg-amber-50 border-amber-200"
// // // //                         : "bg-emerald-50 border-emerald-200"
// // // //                     }`}>
// // // //                       <CheckCircle2 className={`w-5 h-5 ${
// // // //                         action === "resolve"
// // // //                           ? "text-green-600"
// // // //                           : action === "ban"
// // // //                           ? "text-red-600"
// // // //                           : action === "reject"
// // // //                           ? "text-amber-600"
// // // //                           : "text-emerald-600"
// // // //                       }`} />
// // // //                       <span className={`text-sm ${
// // // //                         action === "resolve"
// // // //                           ? "text-green-700"
// // // //                           : action === "ban"
// // // //                           ? "text-red-700"
// // // //                           : action === "reject"
// // // //                           ? "text-amber-700"
// // // //                           : "text-emerald-700"
// // // //                       }`}>
// // // //                         {successMessage}
// // // //                       </span>
// // // //                     </div>
// // // //                   )}
// // // //                 </form>
// // // //               </Card>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }





// // // import { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Card } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import {
// // //   AlertTriangle,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Clock,
// // //   Eye,
// // //   Flag,
// // //   Loader2,
// // //   Mail,
// // //   Phone,
// // //   Search,
// // //   Shield,
// // //   ShieldAlert,
// // //   ShieldCheck,
// // //   User,
// // //   Users,
// // //   Calendar,
// // //   FileText,
// // //   CheckCircle2,
// // //   XCircle,
// // //   Ban,
// // //   ArrowLeft,
// // //   Reply,
// // // } from "lucide-react";
// // // import {
// // //   fetchReportedProfiles,
// // //   fetchProfileForReview,
// // //   performUpdateProfileStatus,
// // //   clearProfileReviewStatus,
// // //   resetSelectedProfile,
// // // } from "../store/profile-review.slice";

// // // export function ReportedProfilesPage() {
// // //   const dispatch = useDispatch();
// // //   const { list, pagination, loading, error } = useSelector(
// // //     (s) => s.profileReview || {}
// // //   );
// // //   const [page, setPage] = useState(1);
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   useEffect(() => {
// // //     dispatch(fetchReportedProfiles({ page, limit: 20 }));
// // //   }, [dispatch, page]);

// // //   const filteredList = list?.filter((item) =>
// // //     item.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "new":
// // //         return "bg-amber-100 text-amber-700 border-amber-200";
// // //       case "reviewed":
// // //         return "bg-emerald-100 text-emerald-700 border-emerald-200";
// // //       case "resolved":
// // //         return "bg-green-100 text-green-700 border-green-200";
// // //       case "pending":
// // //         return "bg-blue-100 text-blue-700 border-blue-200";
// // //       default:
// // //         return "bg-gray-100 text-gray-700 border-gray-200";
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50/50">
// // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //           <div className="flex items-center gap-3">
// // //             <div className="p-2.5 bg-red-100 rounded-xl">
// // //               <Flag className="w-6 h-6 text-red-600" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">
// // //                 Reported Profiles
// // //               </h1>
// // //               <p className="text-sm text-gray-500">
// // //                 Review and manage user reports
// // //               </p>
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center gap-3">
// // //             {/* <Badge
// // //               variant="secondary"
// // //               className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200"
// // //             >
// // //               <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
// // //               { filteredList?.map((item)=>{ item })} Pending
// // //             </Badge> */}
// // //           </div>
// // //         </div>

// // //         {/* Search Bar */}
// // //         <Card className="p-4 border-0 shadow-sm">
// // //           <div className="relative">
// // //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// // //             <Input
// // //               placeholder="Search by nickname..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
// // //             />
// // //           </div>
// // //         </Card>

// // //         {/* Table Card */}
// // //         <Card className="border-0 shadow-sm overflow-hidden">
// // //           {/* Desktop Table */}
// // //           <div className="hidden md:block overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead>
// // //                 <tr className="bg-gray-50 border-b border-gray-100">
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // //                     User
// // //                   </th>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // //                     Reports
// // //                   </th>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // //                     Last Reported
// // //                   </th>
// // //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // //                     Status
// // //                   </th>
// // //                   <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
// // //                     Action
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-gray-100">
// // //                 {loading && (
// // //                   <tr>
// // //                     <td colSpan={5} className="px-6 py-12 text-center">
// // //                       <div className="flex flex-col items-center gap-3">
// // //                         <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
// // //                         <span className="text-gray-500">Loading reports...</span>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //                 {!loading && filteredList?.length === 0 && (
// // //                   <tr>
// // //                     <td colSpan={5} className="px-6 py-12 text-center">
// // //                       <div className="flex flex-col items-center gap-3">
// // //                         <div className="p-3 bg-gray-100 rounded-full">
// // //                           <Users className="w-8 h-8 text-gray-400" />
// // //                         </div>
// // //                         <div>
// // //                           <p className="text-gray-900 font-medium">
// // //                             No reports found
// // //                           </p>
// // //                           <p className="text-sm text-gray-500">
// // //                             All profiles are in good standing
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //                 {filteredList?.map((item) => (
// // //                   <tr
// // //                     key={item.userId}
// // //                     className="hover:bg-gray-50/50 transition-colors"
// // //                   >
// // //                     <td className="px-6 py-4">
// // //                       <div className="flex items-center gap-3">
// // //                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// // //                           <User className="w-5 h-5 text-gray-500" />
// // //                         </div>
// // //                         <div>
// // //                           <p className="font-medium text-gray-900">
// // //                             {item.nickname}
// // //                           </p>
// // //                           <p className="text-xs text-gray-500">
// // //                             ID: {item.userId?.slice(0, 8)}...
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <div className="flex items-center gap-2">
// // //                         <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
// // //                           {item.reportCount}
// // //                         </span>
// // //                         <span className="text-sm text-gray-500">reports</span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <div className="flex items-center gap-2 text-gray-600">
// // //                         <Clock className="w-4 h-4 text-gray-400" />
// // //                         <span className="text-sm">
// // //                           {new Date(item.lastReportedAt).toLocaleDateString(
// // //                             "en-IN",
// // //                             {
// // //                               day: "numeric",
// // //                               month: "short",
// // //                               year: "numeric",
// // //                             }
// // //                           )}
// // //                         </span>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <span
// // //                         className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
// // //                           item.status
// // //                         )}`}
// // //                       >
// // //                         {item.status}
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-6 py-4 text-right">
// // //                       <a
// // //                         href={`/admin/management/profile-review/${item.userId}`}
// // //                         className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
// // //                       >
// // //                         <Eye className="w-4 h-4" />
// // //                         Review
// // //                       </a>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           {/* Mobile Cards */}
// // //           <div className="md:hidden divide-y divide-gray-100">
// // //             {loading && (
// // //               <div className="p-8 text-center">
// // //                 <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
// // //                 <p className="mt-3 text-gray-500">Loading reports...</p>
// // //               </div>
// // //             )}
// // //             {!loading && filteredList?.length === 0 && (
// // //               <div className="p-8 text-center">
// // //                 <div className="p-3 bg-gray-100 rounded-full inline-flex">
// // //                   <Users className="w-8 h-8 text-gray-400" />
// // //                 </div>
// // //                 <p className="mt-3 text-gray-900 font-medium">No reports found</p>
// // //                 <p className="text-sm text-gray-500">
// // //                   All profiles are in good standing
// // //                 </p>
// // //               </div>
// // //             )}
// // //             {filteredList?.map((item) => (
// // //               <div key={item.userId} className="p-4 space-y-3">
// // //                 <div className="flex items-center justify-between">
// // //                   <div className="flex items-center gap-3">
// // //                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// // //                       <User className="w-5 h-5 text-gray-500" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="font-medium text-gray-900">{item.nickname}</p>
// // //                       <p className="text-xs text-gray-500">
// // //                         {item.reportCount} reports
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <span
// // //                     className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
// // //                       item.status
// // //                     )}`}
// // //                   >
// // //                     {item.status}
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex items-center justify-between text-sm">
// // //                   <span className="text-gray-500 flex items-center gap-1.5">
// // //                     <Clock className="w-3.5 h-3.5" />
// // //                     {new Date(item.lastReportedAt).toLocaleDateString("en-IN", {
// // //                       day: "numeric",
// // //                       month: "short",
// // //                     })}
// // //                   </span>
// // //                   <a
// // //                     href={`/admin/management/profile-review/${item.userId}`}
// // //                     className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
// // //                   >
// // //                     <Eye className="w-3.5 h-3.5" />
// // //                     Review
// // //                   </a>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </Card>

// // //         {/* Pagination */}
// // //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
// // //           <p className="text-sm text-gray-500">
// // //             Page{" "}
// // //             <span className="font-medium text-gray-900">
// // //               {pagination?.page || page}
// // //             </span>{" "}
// // //             of{" "}
// // //             <span className="font-medium text-gray-900">
// // //               {pagination?.totalPages || 1}
// // //             </span>
// // //           </p>
// // //           <div className="flex items-center gap-2">
// // //             <Button
// // //               variant="outline"
// // //               size="sm"
// // //               disabled={page <= 1}
// // //               onClick={() => setPage((p) => p - 1)}
// // //               className="gap-1.5"
// // //             >
// // //               <ChevronLeft className="w-4 h-4" />
// // //               Previous
// // //             </Button>
// // //             <Button
// // //               variant="outline"
// // //               size="sm"
// // //               disabled={page >= (pagination?.totalPages || 1)}
// // //               onClick={() => setPage((p) => p + 1)}
// // //               className="gap-1.5"
// // //             >
// // //               Next
// // //               <ChevronRight className="w-4 h-4" />
// // //             </Button>
// // //           </div>
// // //         </div>

// // //         {error && (
// // //           <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
// // //             <XCircle className="w-5 h-5 text-red-500" />
// // //             <p className="text-sm text-red-700">{error}</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export function ProfileReviewDetailPage({ userId }) {
// // //   const dispatch = useDispatch();
// // //   const { selected, loading, error, successMessage } = useSelector(
// // //     (s) => s.profileReview || {}
// // //   );
// // //   const [action, setAction] = useState("resolve");
// // //   const [reason, setReason] = useState("");
// // //   const [banDuration, setBanDuration] = useState("");

// // //   useEffect(() => {
// // //     if (userId) dispatch(fetchProfileForReview(userId));
// // //     return () => dispatch(resetSelectedProfile());
// // //   }, [dispatch, userId]);

// // //   const onSubmit = (e) => {
// // //     e.preventDefault();
// // //     const payload = {
// // //       userId,
// // //       action,
// // //       reason: reason || undefined,
// // //       banDuration: banDuration ? Number(banDuration) : undefined,
// // //     };
// // //     dispatch(performUpdateProfileStatus(payload)).then(() => {
// // //       setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
// // //     });
// // //   };

// // //   if (loading && !selected) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto" />
// // //           <p className="mt-4 text-gray-600">Loading profile...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
// // //         <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
// // //           <div className="p-3 bg-red-100 rounded-full inline-flex">
// // //             <XCircle className="w-8 h-8 text-red-500" />
// // //           </div>
// // //           <h2 className="mt-4 text-xl font-semibold text-gray-900">
// // //             Error Loading Profile
// // //           </h2>
// // //           <p className="mt-2 text-gray-500">
// // //             {error === "User or profile not found" 
// // //               ? "The profile you're looking for doesn't exist or has been deleted. Please check if the user ID is correct."
// // //               : error}
// // //           </p>
// // //           <Button className="mt-6 bg-transparent" variant="outline" asChild>
// // //             <a href="/admin/management/profile-review">
// // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // //               Go Back
// // //             </a>
// // //           </Button>
// // //         </Card>
// // //       </div>
// // //     );
// // //   }

// // //   if (!selected) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
// // //         <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
// // //           <div className="p-3 bg-gray-100 rounded-full inline-flex">
// // //             <User className="w-8 h-8 text-gray-400" />
// // //           </div>
// // //           <h2 className="mt-4 text-xl font-semibold text-gray-900">
// // //             Profile Not Found
// // //           </h2>
// // //           <p className="mt-2 text-gray-500">
// // //             The requested profile could not be found.
// // //           </p>
// // //           <Button className="mt-6 bg-transparent" variant="outline" asChild>
// // //             <a href="/admin/management/profile-review">
// // //               <ArrowLeft className="w-4 h-4 mr-2" />
// // //               Go Back
// // //             </a>
// // //           </Button>
// // //         </Card>
// // //       </div>
// // //     );
// // //   }

// // //   const p = selected;

// // //   return (
// // //     <div className="min-h-screen bg-gray-50/50">
// // //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //           <div className="flex items-center gap-4">
// // //             <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
// // //               <a href="/admin/management/profile-review">
// // //                 <ArrowLeft className="w-4 h-4" />
// // //               </a>
// // //             </Button>
// // //             <div className="flex items-center gap-3">
// // //               <div className="p-2.5 bg-blue-100 rounded-xl">
// // //                 <Shield className="w-6 h-6 text-blue-600" />
// // //               </div>
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-gray-900">
// // //                   Profile Review
// // //                 </h1>
// // //                 <p className="text-sm text-gray-500">
// // //                   Review reported user profile
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           {p.isBanned && (
// // //             <Badge className="bg-red-100 text-red-700 border border-red-200 px-4 py-2">
// // //               <Ban className="w-4 h-4 mr-2" />
// // //               User Banned
// // //             </Badge>
// // //           )}
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //           {/* Main Content */}
// // //           <div className="lg:col-span-2 space-y-6">
// // //             {/* Profile Info Card */}
// // //             <Card className="border-0 shadow-sm overflow-hidden">
// // //               <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // //                 <h3 className="text-white font-semibold flex items-center gap-2">
// // //                   <User className="w-4 h-4" />
// // //                   Profile Information
// // //                 </h3>
// // //               </div>
// // //               <div className="p-6">
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// // //                   {/* Contact Info */}
// // //                   <div className="space-y-4">
// // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                         <Mail className="w-4 h-4 text-gray-600" />
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // //                           Email
// // //                         </p>
// // //                         <p className="text-sm font-medium text-gray-900">
// // //                           {p.email}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                         <Phone className="w-4 h-4 text-gray-600" />
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // //                           Phone
// // //                         </p>
// // //                         <p className="text-sm font-medium text-gray-900">
// // //                           {p.phone || "Not provided"}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                         {p.profile?.verification?.status === "approved" ? (
// // //                           <ShieldCheck className="w-4 h-4 text-emerald-600" />
// // //                         ) : (
// // //                           <ShieldAlert className="w-4 h-4 text-amber-600" />
// // //                         )}
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // //                           Verification
// // //                         </p>
// // //                         <p className="text-sm font-medium text-gray-900">
// // //                           {p.profile?.verification?.status === "approved"
// // //                             ? "Verified"
// // //                             : "Not Verified"}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Profile Details */}
// // //                   <div className="space-y-4">
// // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                         <User className="w-4 h-4 text-gray-600" />
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // //                           Nickname
// // //                         </p>
// // //                         <p className="text-sm font-medium text-gray-900">
// // //                           {p.profile?.nickname || "N/A"}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                         <Users className="w-4 h-4 text-gray-600" />
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // //                           Gender / Age
// // //                         </p>
// // //                         <p className="text-sm font-medium text-gray-900">
// // //                           {p.profile?.gender || "N/A"} /{" "}
// // //                           {p.profile?.age || "N/A"}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// // //                       <div className="p-2 bg-white rounded-lg shadow-sm">
// // //                         <Clock className="w-4 h-4 text-gray-600" />
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-xs text-gray-500 uppercase tracking-wide">
// // //                           Last Active
// // //                         </p>
// // //                         <p className="text-sm font-medium text-gray-900">
// // //                           {p.profile?.lastActive
// // //                             ? new Date(p.profile.lastActive).toLocaleDateString(
// // //                                 "en-IN",
// // //                                 {
// // //                                   day: "numeric",
// // //                                   month: "short",
// // //                                   year: "numeric",
// // //                                 }
// // //                               )
// // //                             : "Unknown"}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Ban Info */}
// // //                 {p.isBanned && (
// // //                   <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
// // //                     <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
// // //                       <Ban className="w-4 h-4" />
// // //                       Ban Information
// // //                     </div>
// // //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// // //                       <div>
// // //                         <span className="text-red-600">Reason:</span>{" "}
// // //                         <span className="text-gray-900">{p.banReason}</span>
// // //                       </div>
// // //                       {p.banDetails?.banExpiresAt && (
// // //                         <div>
// // //                           <span className="text-red-600">Expires:</span>{" "}
// // //                           <span className="text-gray-900">
// // //                             {new Date(
// // //                               p.banDetails.banExpiresAt
// // //                             ).toLocaleDateString("en-IN", {
// // //                               day: "numeric",
// // //                               month: "short",
// // //                               year: "numeric",
// // //                             })}
// // //                           </span>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {/* Bio */}
// // //                 <div className="mt-6">
// // //                   <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
// // //                     <FileText className="w-4 h-4" />
// // //                     Bio
// // //                   </h4>
// // //                   <div className="p-4 bg-gray-50 rounded-xl">
// // //                     <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
// // //                       {p.profile?.bio || "No bio provided"}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </Card>

// // //             {/* Photos */}
// // //             {p.profile?.photos?.length > 0 && (
// // //               <Card className="border-0 shadow-sm overflow-hidden">
// // //                 <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // //                   <h3 className="text-white font-semibold">
// // //                     Photos ({p.profile.photos.length})
// // //                   </h3>
// // //                 </div>
// // //                 <div className="p-6">
// // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
// // //                     {p.profile.photos.map((ph, idx) => (
// // //                       <div
// // //                         key={idx}
// // //                         className="aspect-square rounded-xl overflow-hidden bg-gray-100 group"
// // //                       >
// // //                         <img
// // //                           src={ph.url || ph}
// // //                           alt={`Photo ${idx + 1}`}
// // //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// // //                         />
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </Card>
// // //             )}

// // //             {/* Reports */}
// // //             <Card className="border-0 shadow-sm overflow-hidden">
// // //               <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
// // //                 <h3 className="text-white font-semibold flex items-center gap-2">
// // //                   <Flag className="w-4 h-4" />
// // //                   Reports ({p.reportCount})
// // //                 </h3>
// // //               </div>
// // //               <div className="p-6 space-y-4">
// // //                 {p.reports?.length === 0 && (
// // //                   <p className="text-gray-500 text-center py-8">
// // //                     No reports found
// // //                   </p>
// // //                 )}
// // //                 {p.reports?.map((r) => (
// // //                   <div
// // //                     key={r._id}
// // //                     className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
// // //                   >
// // //                     <div className="flex items-start justify-between gap-4">
// // //                       <div className="flex-1">
// // //                         <div className="flex items-center gap-2 mb-2">
// // //                           <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
// // //                             {r.reason}
// // //                           </span>
// // //                         </div>
// // //                         {r.details && (
// // //                           <p className="text-sm text-gray-700 mb-3">
// // //                             {r.details}
// // //                           </p>
// // //                         )}
// // //                         <div className="flex items-center gap-4 text-xs text-gray-500">
// // //                           <span className="flex items-center gap-1">
// // //                             <User className="w-3 h-3" />
// // //                             {r.reportedBy?.name ||
// // //                               r.reportedBy?.email ||
// // //                               r.reportedBy?.phone ||
// // //                               "Anonymous"}
// // //                           </span>
// // //                           <span className="flex items-center gap-1">
// // //                             <Calendar className="w-3 h-3" />
// // //                             {new Date(r.createdAt).toLocaleDateString("en-IN", {
// // //                               day: "numeric",
// // //                               month: "long",
// // //                               year: "numeric",
// // //                               hour: "2-digit",
// // //                               minute: "2-digit",
// // //                             })}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </Card>
// // //           </div>

// // //           {/* Action Panel - Sticky on Desktop */}
// // //           <div className="lg:col-span-1">
// // //             <div className="lg:sticky lg:top-6">
// // //               <Card className="border-0 shadow-sm overflow-hidden">
// // //                 {/* Check if profile is already resolved */}
// // //                 {p.status === "resolved" ? (
// // //                   <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
// // //                     <h3 className="text-white font-semibold flex items-center gap-2">
// // //                       <CheckCircle2 className="w-4 h-4" />
// // //                       Already Resolved
// // //                     </h3>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
// // //                     <h3 className="text-white font-semibold">Take Action</h3>
// // //                   </div>
// // //                 )}
// // //                 {p.status === "resolved" ? (
// // //                   <div className="p-6 space-y-4">
// // //                     <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
// // //                       <p className="text-sm text-green-700 font-medium">
// // //                         This report has already been resolved by an admin.
// // //                       </p>
// // //                     </div>
// // //                     {p.resolvedAt && (
// // //                       <div className="space-y-2">
// // //                         <div className="text-sm">
// // //                           <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
// // //                             Resolved At
// // //                           </p>
// // //                           <p className="text-gray-900 font-medium">
// // //                             {new Date(p.resolvedAt).toLocaleDateString("en-IN", {
// // //                               day: "numeric",
// // //                               month: "long",
// // //                               year: "numeric",
// // //                               hour: "2-digit",
// // //                               minute: "2-digit",
// // //                             })}
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                     {p.resolution && (
// // //                       <div className="space-y-2">
// // //                         <div className="text-sm">
// // //                           <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
// // //                             Resolution
// // //                           </p>
// // //                           <p className="text-gray-900 font-medium text-sm">
// // //                             {p.resolution}
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                     <Button  variant="outline" asChild className="w-full">
// // //                       <a href="/admin/management/profile-review">
// // //                         <ArrowLeft className="w-4 h-4 mr-2" />
// // //                         Back to List
// // //                       </a>
// // //                     </Button>
// // //                   </div>
// // //                 ) : (
// // //                   <form onSubmit={onSubmit} className="p-6 space-y-5">
// // //                     <div>
// // //                       <label className="text-sm font-medium text-gray-700 mb-2 block">
// // //                         Action
// // //                       </label>
// // //                       <Select value={action} onValueChange={setAction}>
// // //                         <SelectTrigger className="w-full">
// // //                           <SelectValue />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
                        
// // //                           <SelectItem value="approve">
// // //                             <div className="flex items-center gap-2">
// // //                               <CheckCircle2 className="w-4 h-4 text-emerald-600" />
// // //                               Approve
// // //                             </div>
// // //                           </SelectItem>
// // //                           <SelectItem value="reject">
// // //                             <div className="flex items-center gap-2">
// // //                               <XCircle className="w-4 h-4 text-amber-600" />
// // //                               Reject
// // //                             </div>
// // //                           </SelectItem>
// // //                           <SelectItem value="ban">
// // //                             <div className="flex items-center gap-2">
// // //                               <Ban className="w-4 h-4 text-red-600" />
// // //                               Ban User
// // //                             </div>
// // //                           </SelectItem>
// // //                           <SelectItem value="reply">
// // //                             <div className="flex items-center gap-2">
// // //                               <Reply className="w-4 h-4 text-red-600" />
// // //                               Reply to Reporter
// // //                             </div>
// // //                           </SelectItem>
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>

// // //                     {(action === "reject" || action === "ban" || action === "resolve") && (
// // //                       <div>
// // //                         <label className="text-sm font-medium text-gray-700 mb-2 block">
// // //                           {action === "resolve"
// // //                             ? "Resolution Notes (Optional)"
// // //                             : "Reason"}
// // //                         </label>
// // //                         <Textarea
// // //                           value={reason}
// // //                           onChange={(e) => setReason(e.target.value)}
// // //                           placeholder={
// // //                             action === "resolve"
// // //                               ? "Add notes about how this report was resolved..."
// // //                               : "Enter reason for this action..."
// // //                           }
// // //                           className="resize-none"
// // //                           rows={3}
// // //                         />
// // //                       </div>
// // //                     )}

// // //                     {action === "ban" && (
// // //                       <div>
// // //                         <label className="text-sm font-medium text-gray-700 mb-2 block">
// // //                           Ban Duration (days)
// // //                         </label>
// // //                         <Input
// // //                           type="number"
// // //                           min="0"
// // //                           placeholder="Leave empty for permanent ban"
// // //                           value={banDuration}
// // //                           onChange={(e) => setBanDuration(e.target.value)}
// // //                         />
// // //                         <p className="text-xs text-gray-500 mt-1.5">
// // //                           Enter 0 or leave empty for permanent ban
// // //                         </p>
// // //                       </div>
// // //                     )}

// // //                     <Button
// // //                       type="submit"
// // //                       disabled={loading}
// // //                       className={`w-full ${
// // //                         action === "resolve"
// // //                           ? "bg-green-600 hover:bg-green-700"
// // //                           : action === "ban"
// // //                           ? "bg-red-600 hover:bg-red-700"
// // //                           : action === "reject"
// // //                           ? "bg-amber-600 hover:bg-amber-700"
// // //                           : "bg-emerald-600 hover:bg-emerald-700"
// // //                       }`}
// // //                     >
// // //                       {loading ? (
// // //                         <>
// // //                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // //                           Processing...
// // //                         </>
// // //                       ) : (
// // //                         <>
// // //                           {action === "resolve" && (
// // //                             <CheckCircle2 className="w-4 h-4 mr-2" />
// // //                           )}
// // //                           {action === "approve" && (
// // //                             <CheckCircle2 className="w-4 h-4 mr-2" />
// // //                           )}
// // //                           {action === "reject" && (
// // //                             <XCircle className="w-4 h-4 mr-2" />
// // //                           )}
// // //                           {action === "ban" && <Ban className="w-4 h-4 mr-2" />}
// // //                           {action === "reply" && <Reply className="w-4 h-4 mr-2" />}
// // //                           Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
// // //                         </>
// // //                       )}
// // //                     </Button>

// // //                     {successMessage && (
// // //                       <div className={`flex items-center gap-2 p-3 rounded-lg border ${
// // //                         action === "resolve"
// // //                           ? "bg-green-50 border-green-200"
// // //                           : action === "ban"
// // //                           ? "bg-red-50 border-red-200"
// // //                           : action === "reject"
// // //                           ? "bg-amber-50 border-amber-200"
// // //                           : "bg-emerald-50 border-emerald-200"
// // //                       }`}>
// // //                         <CheckCircle2 className={`w-5 h-5 ${
// // //                           action === "resolve"
// // //                             ? "text-green-600"
// // //                             : action === "ban"
// // //                             ? "text-red-600"
// // //                             : action === "reject"
// // //                             ? "text-amber-600"
// // //                             : "text-emerald-600"
// // //                         }`} />
// // //                         <span className={`text-sm ${
// // //                           action === "resolve"
// // //                             ? "text-green-700"
// // //                             : action === "ban"
// // //                             ? "text-red-700"
// // //                             : action === "reject"
// // //                             ? "text-amber-700"
// // //                             : "text-emerald-700"
// // //                         }`}>
// // //                           {successMessage}
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                   </form>
// // //                 )}
// // //               </Card>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Card } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   AlertTriangle,
// //   ChevronLeft,
// //   ChevronRight,
// //   Clock,
// //   Eye,
// //   Flag,
// //   Loader2,
// //   Mail,
// //   Phone,
// //   Search,
// //   Shield,
// //   ShieldAlert,
// //   ShieldCheck,
// //   User,
// //   Users,
// //   Calendar,
// //   FileText,
// //   CheckCircle2,
// //   XCircle,
// //   Ban,
// //   ArrowLeft,
// //   Reply,
// //   Filter,
// //   Download,
// //   TrendingUp,
// //   BarChart3,
// //   AlertCircle,
// //   MapPin,
// //   Heart,
// //   MessageSquare,
// //   Image as ImageIcon,
// //   Info,
// // } from "lucide-react";
// // import {
// //   fetchReportedProfiles,
// //   fetchProfileForReview,
// //   performUpdateProfileStatus,
// //   clearProfileReviewStatus,
// //   resetSelectedProfile,
// // } from "../store/profile-review.slice";

// // export function ReportedProfilesPage() {
// //   const dispatch = useDispatch();
// //   const { list, pagination, loading, error } = useSelector(
// //     (s) => s.profileReview || {}
// //   );
// //   const [page, setPage] = useState(1);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("all");

// //   useEffect(() => {
// //     dispatch(fetchReportedProfiles({ page, limit: 20 }));
// //   }, [dispatch, page]);

// //   const filteredList = list?.filter((item) => {
// //     const matchesSearch = item.nickname
// //       ?.toLowerCase()
// //       .includes(searchTerm.toLowerCase());
// //     const matchesStatus =
// //       statusFilter === "all" || item.status === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "new":
// //         return "bg-red-100 text-red-700 border-red-300";
// //       case "reviewed":
// //         return "bg-blue-100 text-blue-700 border-blue-300";
// //       case "resolved":
// //         return "bg-emerald-100 text-emerald-700 border-emerald-300";
// //       case "pending":
// //         return "bg-amber-100 text-amber-700 border-amber-300";
// //       default:
// //         return "bg-gray-100 text-gray-700 border-gray-300";
// //     }
// //   };

// //   const getPriorityColor = (count) => {
// //     if (count >= 5) return "text-red-600 bg-red-100";
// //     if (count >= 3) return "text-amber-600 bg-amber-100";
// //     return "text-blue-600 bg-blue-100";
// //   };

// //   // Calculate stats
// //   const stats = {
// //     total: filteredList?.length || 0,
// //     new: filteredList?.filter((i) => i.status === "new").length || 0,
// //     pending: filteredList?.filter((i) => i.status === "pending").length || 0,
// //     resolved: filteredList?.filter((i) => i.status === "resolved").length || 0,
// //     highPriority: filteredList?.filter((i) => i.reportCount >= 5).length || 0,
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
// //       <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// //         {/* Enhanced Header with Stats */}
// //         <div className="space-y-6">
// //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //             <div className="flex items-center gap-4">
// //               <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-200">
// //                 <Flag className="w-7 h-7 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-3xl font-bold text-gray-900">
// //                   Reported Profiles
// //                 </h1>
// //                 <p className="text-sm text-gray-600 mt-1">
// //                   Review and manage user safety reports
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-3">
// //               <Button variant="outline" className="gap-2">
// //                 <Download className="w-4 h-4" />
// //                 Export
// //               </Button>
// //             </div>
// //           </div>

// //           {/* Stats Grid */}
// //           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
// //             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Total Reports
// //                   </p>
// //                   <p className="text-2xl font-bold text-gray-900 mt-1">
// //                     {stats.total}
// //                   </p>
// //                 </div>
// //                 <div className="p-3 bg-blue-100 rounded-xl">
// //                   <BarChart3 className="w-5 h-5 text-blue-600" />
// //                 </div>
// //               </div>
// //             </Card>

// //             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     New
// //                   </p>
// //                   <p className="text-2xl font-bold text-red-600 mt-1">
// //                     {stats.new}
// //                   </p>
// //                 </div>
// //                 <div className="p-3 bg-red-100 rounded-xl">
// //                   <AlertTriangle className="w-5 h-5 text-red-600" />
// //                 </div>
// //               </div>
// //             </Card>

// //             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Pending
// //                   </p>
// //                   <p className="text-2xl font-bold text-amber-600 mt-1">
// //                     {stats.pending}
// //                   </p>
// //                 </div>
// //                 <div className="p-3 bg-amber-100 rounded-xl">
// //                   <Clock className="w-5 h-5 text-amber-600" />
// //                 </div>
// //               </div>
// //             </Card>

// //             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Resolved
// //                   </p>
// //                   <p className="text-2xl font-bold text-emerald-600 mt-1">
// //                     {stats.resolved}
// //                   </p>
// //                 </div>
// //                 <div className="p-3 bg-emerald-100 rounded-xl">
// //                   <CheckCircle2 className="w-5 h-5 text-emerald-600" />
// //                 </div>
// //               </div>
// //             </Card>

// //             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     High Priority
// //                   </p>
// //                   <p className="text-2xl font-bold text-purple-600 mt-1">
// //                     {stats.highPriority}
// //                   </p>
// //                 </div>
// //                 <div className="p-3 bg-purple-100 rounded-xl">
// //                   <TrendingUp className="w-5 h-5 text-purple-600" />
// //                 </div>
// //               </div>
// //             </Card>
// //           </div>
// //         </div>

// //         {/* Enhanced Filters */}
// //         <Card className="p-4 border-0 shadow-sm bg-white">
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// //               <Input
// //                 placeholder="Search by nickname or user ID..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
// //               />
// //             </div>
// //             <Select value={statusFilter} onValueChange={setStatusFilter}>
// //               <SelectTrigger className="w-full sm:w-48">
// //                 <div className="flex items-center gap-2">
// //                   <Filter className="w-4 h-4" />
// //                   <SelectValue placeholder="All Statuses" />
// //                 </div>
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Statuses</SelectItem>
// //                 <SelectItem value="new">New</SelectItem>
// //                 <SelectItem value="pending">Pending</SelectItem>
// //                 <SelectItem value="reviewed">Reviewed</SelectItem>
// //                 <SelectItem value="resolved">Resolved</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </Card>

// //         {/* Enhanced Table */}
// //         <Card className="border-0 shadow-sm overflow-hidden bg-white">
// //           {/* Desktop Table */}
// //           <div className="hidden md:block overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     User Profile
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Reports
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Last Reported
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Priority
// //                   </th>
// //                   <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Action
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-100">
// //                 {loading && (
// //                   <tr>
// //                     <td colSpan={6} className="px-6 py-16 text-center">
// //                       <div className="flex flex-col items-center gap-4">
// //                         <div className="relative">
// //                           <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
// //                           <Loader2 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
// //                         </div>
// //                         <span className="text-gray-600 font-medium">
// //                           Loading reports...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 )}
// //                 {!loading && filteredList?.length === 0 && (
// //                   <tr>
// //                     <td colSpan={6} className="px-6 py-16 text-center">
// //                       <div className="flex flex-col items-center gap-4">
// //                         <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
// //                           <Users className="w-12 h-12 text-gray-400" />
// //                         </div>
// //                         <div>
// //                           <p className="text-gray-900 font-semibold text-lg">
// //                             No reports found
// //                           </p>
// //                           <p className="text-sm text-gray-500 mt-1">
// //                             All profiles are in good standing
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 )}
// //                 {filteredList?.map((item) => (
// //                   <tr
// //                     key={item.userId}
// //                     className="hover:bg-blue-50/50 transition-colors group"
// //                   >
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-4">
// //                         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
// //                           <User className="w-6 h-6 text-white" />
// //                         </div>
// //                         <div>
// //                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
// //                             {item.nickname}
// //                           </p>
// //                           <p className="text-xs text-gray-500 font-mono mt-0.5">
// //                             ID: {item.userId?.slice(0, 12)}...
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-3">
// //                         <div
// //                           className={`flex items-center justify-center w-10 h-10 rounded-xl ${getPriorityColor(
// //                             item.reportCount
// //                           )} font-bold shadow-sm`}
// //                         >
// //                           {item.reportCount}
// //                         </div>
// //                         <div className="text-xs text-gray-500">
// //                           report{item.reportCount !== 1 ? "s" : ""}
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <div className="p-2 bg-gray-100 rounded-lg">
// //                           <Clock className="w-4 h-4 text-gray-500" />
// //                         </div>
// //                         <div>
// //                           <p className="text-sm font-medium text-gray-900">
// //                             {new Date(item.lastReportedAt).toLocaleDateString(
// //                               "en-IN",
// //                               {
// //                                 day: "numeric",
// //                                 month: "short",
// //                                 year: "numeric",
// //                               }
// //                             )}
// //                           </p>
// //                           <p className="text-xs text-gray-500">
// //                             {new Date(item.lastReportedAt).toLocaleTimeString(
// //                               "en-IN",
// //                               {
// //                                 hour: "2-digit",
// //                                 minute: "2-digit",
// //                               }
// //                             )}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <Badge
// //                         className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${getStatusColor(
// //                           item.status
// //                         )}`}
// //                       >
// //                         {item.status.toUpperCase()}
// //                       </Badge>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {item.reportCount >= 5 ? (
// //                         <Badge className="bg-red-100 text-red-700 border-2 border-red-300 px-3 py-1.5 rounded-lg font-semibold">
// //                           HIGH
// //                         </Badge>
// //                       ) : item.reportCount >= 3 ? (
// //                         <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-300 px-3 py-1.5 rounded-lg font-semibold">
// //                           MEDIUM
// //                         </Badge>
// //                       ) : (
// //                         <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-300 px-3 py-1.5 rounded-lg font-semibold">
// //                           LOW
// //                         </Badge>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4 text-right">
// //                       <a
// //                         href={`/admin/management/profile-review/${item.userId}`}
// //                         className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md"
// //                       >
// //                         <Eye className="w-4 h-4" />
// //                         Review
// //                       </a>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Mobile Cards */}
// //           <div className="md:hidden divide-y divide-gray-100">
// //             {loading && (
// //               <div className="p-12 text-center">
// //                 <div className="relative inline-block">
// //                   <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
// //                   <Loader2 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
// //                 </div>
// //                 <p className="mt-4 text-gray-600 font-medium">
// //                   Loading reports...
// //                 </p>
// //               </div>
// //             )}
// //             {!loading && filteredList?.length === 0 && (
// //               <div className="p-12 text-center">
// //                 <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl inline-flex">
// //                   <Users className="w-12 h-12 text-gray-400" />
// //                 </div>
// //                 <p className="mt-4 text-gray-900 font-semibold text-lg">
// //                   No reports found
// //                 </p>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   All profiles are in good standing
// //                 </p>
// //               </div>
// //             )}
// //             {filteredList?.map((item) => (
// //               <div key={item.userId} className="p-5 space-y-4 bg-white">
// //                 <div className="flex items-start justify-between">
// //                   <div className="flex items-center gap-3 flex-1">
// //                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shrink-0">
// //                       <User className="w-6 h-6 text-white" />
// //                     </div>
// //                     <div className="min-w-0">
// //                       <p className="font-semibold text-gray-900 truncate">
// //                         {item.nickname}
// //                       </p>
// //                       <p className="text-xs text-gray-500 font-mono mt-0.5">
// //                         {item.userId?.slice(0, 8)}...
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <Badge
// //                     className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-2 shrink-0 ${getStatusColor(
// //                       item.status
// //                     )}`}
// //                   >
// //                     {item.status.toUpperCase()}
// //                   </Badge>
// //                 </div>

// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-4">
// //                     <div className="flex items-center gap-2">
// //                       <div
// //                         className={`flex items-center justify-center w-8 h-8 rounded-lg ${getPriorityColor(
// //                           item.reportCount
// //                         )} font-bold text-sm`}
// //                       >
// //                         {item.reportCount}
// //                       </div>
// //                       <span className="text-xs text-gray-500">reports</span>
// //                     </div>
// //                     <div className="flex items-center gap-1.5 text-xs text-gray-500">
// //                       <Clock className="w-3.5 h-3.5" />
// //                       {new Date(item.lastReportedAt).toLocaleDateString(
// //                         "en-IN",
// //                         {
// //                           day: "numeric",
// //                           month: "short",
// //                         }
// //                       )}
// //                     </div>
// //                   </div>
// //                   <a
// //                     href={`/admin/management/profile-review/${item.userId}`}
// //                     className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
// //                   >
// //                     <Eye className="w-4 h-4" />
// //                     Review
// //                   </a>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </Card>

// //         {/* Enhanced Pagination */}
// //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 border-0 shadow-sm">
// //           <div className="flex items-center gap-2 text-sm text-gray-600">
// //             <span>Showing</span>
// //             <span className="font-bold text-gray-900">
// //               {pagination?.page || page}
// //             </span>
// //             <span>of</span>
// //             <span className="font-bold text-gray-900">
// //               {pagination?.totalPages || 1}
// //             </span>
// //             <span>pages</span>
// //             <span className="text-gray-400">•</span>
// //             <span className="font-medium text-gray-900">
// //               {pagination?.total || 0}
// //             </span>
// //             <span>total reports</span>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               disabled={page <= 1}
// //               onClick={() => setPage((p) => p - 1)}
// //               className="gap-2 font-semibold"
// //             >
// //               <ChevronLeft className="w-4 h-4" />
// //               Previous
// //             </Button>
// //             <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold text-sm">
// //               {page}
// //             </div>
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               disabled={page >= (pagination?.totalPages || 1)}
// //               onClick={() => setPage((p) => p + 1)}
// //               className="gap-2 font-semibold"
// //             >
// //               Next
// //               <ChevronRight className="w-4 h-4" />
// //             </Button>
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl shadow-sm">
// //             <div className="p-2 bg-red-100 rounded-lg">
// //               <XCircle className="w-5 h-5 text-red-600" />
// //             </div>
// //             <p className="text-sm font-medium text-red-700">{error}</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export function ProfileReviewDetailPage({ userId }) {
// //   const dispatch = useDispatch();
// //   const { selected, loading, error, successMessage } = useSelector(
// //     (s) => s.profileReview || {}
// //   );
// //   const [action, setAction] = useState("resolve");
// //   const [reason, setReason] = useState("");
// //   const [banDuration, setBanDuration] = useState("");

// //   useEffect(() => {
// //     if (userId) dispatch(fetchProfileForReview(userId));
// //     return () => dispatch(resetSelectedProfile());
// //   }, [dispatch, userId]);

// //   const onSubmit = (e) => {
// //     e.preventDefault();
// //     const payload = {
// //       userId,
// //       action,
// //       reason: reason || undefined,
// //       banDuration: banDuration ? Number(banDuration) : undefined,
// //     };
// //     dispatch(performUpdateProfileStatus(payload)).then(() => {
// //       setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
// //     });
// //   };

// //   if (loading && !selected) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="relative inline-block">
// //             <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
// //             <Loader2 className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
// //           </div>
// //           <p className="mt-6 text-gray-700 font-semibold text-lg">
// //             Loading profile...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
// //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-xl">
// //           <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl inline-flex shadow-lg shadow-red-200">
// //             <XCircle className="w-10 h-10 text-white" />
// //           </div>
// //           <h2 className="mt-6 text-2xl font-bold text-gray-900">
// //             Error Loading Profile
// //           </h2>
// //           <p className="mt-3 text-gray-600 leading-relaxed">
// //             {error === "User or profile not found"
// //               ? "The profile you're looking for doesn't exist or has been deleted. Please check if the user ID is correct."
// //               : error}
// //           </p>
// //           <Button
// //             className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
// //             asChild
// //           >
// //             <a href="/admin/management/profile-review">
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back to Reports
// //             </a>
// //           </Button>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   if (!selected) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
// //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-xl">
// //           <div className="p-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl inline-flex">
// //             <User className="w-10 h-10 text-white" />
// //           </div>
// //           <h2 className="mt-6 text-2xl font-bold text-gray-900">
// //             Profile Not Found
// //           </h2>
// //           <p className="mt-3 text-gray-600">
// //             The requested profile could not be found.
// //           </p>
// //           <Button
// //             className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
// //             asChild
// //           >
// //             <a href="/admin/management/profile-review">
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back to Reports
// //             </a>
// //           </Button>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   const p = selected;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
// //       <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// //         {/* Enhanced Header */}
// //         <div className="bg-white rounded-2xl shadow-sm p-6 border-0">
// //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //             <div className="flex items-center gap-4">
// //               <Button
// //                 variant="outline"
// //                 size="icon"
// //                 asChild
// //                 className="shrink-0 hover:bg-gray-100 rounded-xl"
// //               >
// //                 <a href="/admin/management/profile-review">
// //                   <ArrowLeft className="w-5 h-5" />
// //                 </a>
// //               </Button>
// //               <div className="flex items-center gap-4">
// //                 <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-200">
// //                   <Shield className="w-7 h-7 text-white" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-3xl font-bold text-gray-900">
// //                     Profile Review
// //                   </h1>
// //                   <p className="text-sm text-gray-600 mt-1">
// //                     Detailed review of reported user profile
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-3">
// //               {p.isBanned && (
// //                 <Badge className="bg-red-100 text-red-700 border-2 border-red-300 px-4 py-2.5 rounded-xl font-semibold">
// //                   <Ban className="w-4 h-4 mr-2" />
// //                   USER BANNED
// //                 </Badge>
// //               )}
// //               {p.reportCount >= 5 && (
// //                 <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300 px-4 py-2.5 rounded-xl font-semibold">
// //                   <AlertCircle className="w-4 h-4 mr-2" />
// //                   HIGH PRIORITY
// //                 </Badge>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Main Content - 2 columns */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
// //               <Card className="p-4 border-0 shadow-sm bg-white">
// //                 <div className="flex flex-col items-center text-center">
// //                   <div className="p-3 bg-red-100 rounded-xl mb-2">
// //                     <Flag className="w-5 h-5 text-red-600" />
// //                   </div>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {p.reportCount}
// //                   </p>
// //                   <p className="text-xs text-gray-500 mt-1">Total Reports</p>
// //                 </div>
// //               </Card>
// //               <Card className="p-4 border-0 shadow-sm bg-white">
// //                 <div className="flex flex-col items-center text-center">
// //                   <div className="p-3 bg-blue-100 rounded-xl mb-2">
// //                     <ImageIcon className="w-5 h-5 text-blue-600" />
// //                   </div>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {p.profile?.photos?.length || 0}
// //                   </p>
// //                   <p className="text-xs text-gray-500 mt-1">Photos</p>
// //                 </div>
// //               </Card>
// //               <Card className="p-4 border-0 shadow-sm bg-white">
// //                 <div className="flex flex-col items-center text-center">
// //                   <div className="p-3 bg-emerald-100 rounded-xl mb-2">
// //                     {p.profile?.verification?.status === "approved" ? (
// //                       <ShieldCheck className="w-5 h-5 text-emerald-600" />
// //                     ) : (
// //                       <ShieldAlert className="w-5 h-5 text-amber-600" />
// //                     )}
// //                   </div>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {p.profile?.verification?.status === "approved"
// //                       ? "Yes"
// //                       : "No"}
// //                   </p>
// //                   <p className="text-xs text-gray-500 mt-1">Verified</p>
// //                 </div>
// //               </Card>
// //               <Card className="p-4 border-0 shadow-sm bg-white">
// //                 <div className="flex flex-col items-center text-center">
// //                   <div className="p-3 bg-purple-100 rounded-xl mb-2">
// //                     <Clock className="w-5 h-5 text-purple-600" />
// //                   </div>
// //                   <p className="text-2xl font-bold text-gray-900">
// //                     {p.profile?.lastActive
// //                       ? Math.floor(
// //                           (Date.now() -
// //                             new Date(p.profile.lastActive).getTime()) /
// //                             (1000 * 60 * 60 * 24)
// //                         )
// //                       : "?"}
// //                     d
// //                   </p>
// //                   <p className="text-xs text-gray-500 mt-1">Last Active</p>
// //                 </div>
// //               </Card>
// //             </div> */}

// //             {/* Profile Info Card - Enhanced */}
// //             <Card className="border-0 shadow-sm overflow-hidden bg-white">
// //               <div className="px-6 py-5">
// //                 <h3 className="text-black font-bold text-lg flex items-center gap-2">
// //                   <User className="w-5 h-5" />
// //                   User Information
// //                 </h3>
// //               </div>
// //               <div className="p-6">
// //                 {/* Contact & Identity Section */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                   <div className="space-y-4">
// //                     <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
// //                       <Info className="w-4 h-4" />
// //                       Contact Details
// //                     </h4>
// //                     <div className="space-y-3">
// //                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
// //                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
// //                           <Mail className="w-5 h-5 text-blue-600" />
// //                         </div>
// //                         <div className="flex-1 min-w-0">
// //                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
// //                             Email Address
// //                           </p>
// //                           <p className="text-sm font-medium text-gray-900 mt-1 break-all">
// //                             {p.email}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
// //                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
// //                           <Phone className="w-5 h-5 text-emerald-600" />
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
// //                             Phone Number
// //                           </p>
// //                           <p className="text-sm font-medium text-gray-900 mt-1">
// //                             {p.phone || "Not provided"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-4">
// //                     <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
// //                       <User className="w-4 h-4" />
// //                       Profile Details
// //                     </h4>
// //                     <div className="space-y-3">
// //                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
// //                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
// //                           <User className="w-5 h-5 text-purple-600" />
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
// //                             Nickname
// //                           </p>
// //                           <p className="text-sm font-medium text-gray-900 mt-1">
// //                             {p.profile?.nickname || "N/A"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
// //                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
// //                           <Users className="w-5 h-5 text-pink-600" />
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
// //                             Gender & Age
// //                           </p>
// //                           <p className="text-sm font-medium text-gray-900 mt-1">
// //                             {p.profile?.gender || "N/A"} •{" "}
// //                             {p.profile?.age || "N/A"} years
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Ban Info - Enhanced */}
// //                 {p.isBanned && (
// //                   <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl shadow-sm">
// //                     <div className="flex items-center gap-3 mb-4">
// //                       <div className="p-2 bg-red-200 rounded-lg">
// //                         <Ban className="w-5 h-5 text-red-700" />
// //                       </div>
// //                       <h4 className="text-red-800 font-bold text-lg">
// //                         Ban Information
// //                       </h4>
// //                     </div>
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                       <div className="bg-white/70 p-4 rounded-lg">
// //                         <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
// //                           Reason
// //                         </p>
// //                         <p className="text-sm font-medium text-gray-900">
// //                           {p.banReason}
// //                         </p>
// //                       </div>
// //                       {p.banDetails?.banExpiresAt && (
// //                         <div className="bg-white/70 p-4 rounded-lg">
// //                           <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
// //                             Expires On
// //                           </p>
// //                           <p className="text-sm font-medium text-gray-900">
// //                             {new Date(
// //                               p.banDetails.banExpiresAt
// //                             ).toLocaleDateString("en-IN", {
// //                               day: "numeric",
// //                               month: "long",
// //                               year: "numeric",
// //                             })}
// //                           </p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Bio - Enhanced */}
// //                 <div>
// //                   <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
// //                     <FileText className="w-4 h-4" />
// //                     Biography
// //                   </h4>
// //                   <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
// //                     <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
// //                       {p.profile?.bio || (
// //                         <span className="text-gray-400 italic">
// //                           No bio provided by user
// //                         </span>
// //                       )}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>

// //             {/* Photos - Enhanced */}
// //             {p.profile?.photos?.length > 0 && (
// //               <Card className="border-0 shadow-sm overflow-hidden bg-white">
// //                 <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5">
// //                   <h3 className="text-white font-bold text-lg flex items-center gap-2">
// //                     <ImageIcon className="w-5 h-5" />
// //                     Profile Photos ({p.profile.photos.length})
// //                   </h3>
// //                 </div>
// //                 <div className="p-6">
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
// //                     {p.profile.photos.map((ph, idx) => (
// //                       <div
// //                         key={idx}
// //                         className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group shadow-md hover:shadow-xl transition-shadow"
// //                       >
// //                         <img
// //                           src={ph.url || ph}
// //                           alt={`Photo ${idx + 1}`}
// //                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
// //                         />
// //                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
// //                         <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
// //                           <span className="text-xs font-bold text-gray-700">
// //                             #{idx + 1}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </Card>
// //             )}

// //             {/* Reports - Enhanced */}
// //             <Card className="border-0 shadow-sm overflow-hidden bg-white">
// //               <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
// //                 <h3 className="text-white font-bold text-lg flex items-center gap-2">
// //                   <Flag className="w-5 h-5" />
// //                   User Reports ({p.reportCount})
// //                 </h3>
// //               </div>
// //               <div className="p-6 space-y-4">
// //                 {p.reports?.length === 0 && (
// //                   <div className="text-center py-12">
// //                     <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl inline-flex mb-4">
// //                       <Flag className="w-10 h-10 text-gray-400" />
// //                     </div>
// //                     <p className="text-gray-500 font-medium">No reports found</p>
// //                   </div>
// //                 )}
// //                 {p.reports?.map((r) => (
// //                   <div
// //                     key={r._id}
// //                     className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
// //                   >
// //                     <div className="flex items-start justify-between gap-4 mb-4">
// //                       <div className="flex items-center gap-2">
// //                         <Badge className="px-3 py-1.5 bg-red-100 text-red-700 border-2 border-red-300 text-xs font-bold rounded-lg">
// //                           {r.reason.toUpperCase()}
// //                         </Badge>
// //                         {r.severity && (
// //                           <Badge
// //                             className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 ${
// //                               r.severity === "high"
// //                                 ? "bg-red-100 text-red-700 border-red-300"
// //                                 : r.severity === "medium"
// //                                 ? "bg-amber-100 text-amber-700 border-amber-300"
// //                                 : "bg-blue-100 text-blue-700 border-blue-300"
// //                             }`}
// //                           >
// //                             {r.severity.toUpperCase()}
// //                           </Badge>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {r.details && (
// //                       <p className="text-sm text-gray-700 mb-4 p-4 bg-gray-50 rounded-lg leading-relaxed">
// //                         {r.details}
// //                       </p>
// //                     )}
// //                     <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
// //                       <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
// //                         <User className="w-3.5 h-3.5" />
// //                         <span className="font-medium">
// //                           {r.reportedBy?.name ||
// //                             r.reportedBy?.email ||
// //                             r.reportedBy?.phone ||
// //                             "Anonymous User"}
// //                         </span>
// //                       </div>
// //                       <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
// //                         <Calendar className="w-3.5 h-3.5" />
// //                         <span className="font-medium">
// //                           {new Date(r.createdAt).toLocaleDateString("en-IN", {
// //                             day: "numeric",
// //                             month: "long",
// //                             year: "numeric",
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                           })}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </div>

// //           {/* Action Panel - 1 column - Sticky */}
// //           <div className="lg:col-span-1">
// //             <div className="lg:sticky lg:top-6 space-y-6">
// //               <Card className="border-0 shadow-lg overflow-hidden bg-white">
// //                 {p.status === "resolved" ? (
// //                   <>
// //                     <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
// //                       <h3 className="text-white font-bold text-lg flex items-center gap-2">
// //                         <CheckCircle2 className="w-5 h-5" />
// //                         Resolved
// //                       </h3>
// //                     </div>
// //                     <div className="p-6 space-y-5">
// //                       <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl">
// //                         <div className="flex items-center gap-3 mb-2">
// //                           <CheckCircle2 className="w-6 h-6 text-emerald-600" />
// //                           <p className="text-sm text-emerald-800 font-bold">
// //                             Case Closed
// //                           </p>
// //                         </div>
// //                         <p className="text-sm text-emerald-700">
// //                           This report has been resolved by an admin.
// //                         </p>
// //                       </div>

// //                       {p.resolvedAt && (
// //                         <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
// //                           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
// //                             Resolved At
// //                           </p>
// //                           <p className="text-sm font-semibold text-gray-900">
// //                             {new Date(p.resolvedAt).toLocaleDateString("en-IN", {
// //                               day: "numeric",
// //                               month: "long",
// //                               year: "numeric",
// //                               hour: "2-digit",
// //                               minute: "2-digit",
// //                             })}
// //                           </p>
// //                         </div>
// //                       )}

// //                       {p.resolution && (
// //                         <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
// //                           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
// //                             Resolution Notes
// //                           </p>
// //                           <p className="text-sm text-gray-900 leading-relaxed">
// //                             {p.resolution}
// //                           </p>
// //                         </div>
// //                       )}

// //                       <Button
// //                         variant="outline"
// //                         asChild
// //                         className="w-full h-12 font-semibold"
// //                       >
// //                         <a href="/admin/management/profile-review">
// //                           <ArrowLeft className="w-4 h-4 mr-2" />
// //                           Back to Reports
// //                         </a>
// //                       </Button>
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <div className=" px-6 py-5">
// //                       <h3 className="text-black font-bold text-lg">
// //                         Take Action
// //                       </h3>
// //                       <p className="text-black text-xs mt-1">
// //                         Choose an action to resolve this report
// //                       </p>
// //                     </div>
// //                     <form onSubmit={onSubmit} className="p-6 space-y-5">
// //                       <div>
// //                         <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
// //                           Action Type
// //                         </label>
// //                         <Select value={action} onValueChange={setAction}>
// //                           <SelectTrigger className="w-full h-12 font-semibold">
// //                             <SelectValue />
// //                           </SelectTrigger>
// //                           <SelectContent>
// //                             <SelectItem value="approve">
// //                               <div className="flex items-center gap-3 py-1">
// //                                 <div className="p-1.5 bg-emerald-100 rounded-lg">
// //                                   <CheckCircle2 className="w-4 h-4 text-emerald-600" />
// //                                 </div>
// //                                 <span className="font-semibold">Approve Profile</span>
// //                               </div>
// //                             </SelectItem>
// //                             <SelectItem value="reject">
// //                               <div className="flex items-center gap-3 py-1">
// //                                 <div className="p-1.5 bg-amber-100 rounded-lg">
// //                                   <XCircle className="w-4 h-4 text-amber-600" />
// //                                 </div>
// //                                 <span className="font-semibold">Reject Report</span>
// //                               </div>
// //                             </SelectItem>
// //                             <SelectItem value="ban">
// //                               <div className="flex items-center gap-3 py-1">
// //                                 <div className="p-1.5 bg-red-100 rounded-lg">
// //                                   <Ban className="w-4 h-4 text-red-600" />
// //                                 </div>
// //                                 <span className="font-semibold">Ban User</span>
// //                               </div>
// //                             </SelectItem>
// //                             <SelectItem value="reply">
// //                               <div className="flex items-center gap-3 py-1">
// //                                 <div className="p-1.5 bg-blue-100 rounded-lg">
// //                                   <Reply className="w-4 h-4 text-blue-600" />
// //                                 </div>
// //                                 <span className="font-semibold">Reply to Reporter</span>
// //                               </div>
// //                             </SelectItem>
// //                           </SelectContent>
// //                         </Select>
// //                       </div>

// //                       {(action === "reject" ||
// //                         action === "ban" ||
// //                         action === "resolve") && (
// //                         <div>
// //                           <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
// //                             {action === "resolve"
// //                               ? "Resolution Notes"
// //                               : "Reason"}
// //                             {action !== "resolve" && (
// //                               <span className="text-red-500 ml-1">*</span>
// //                             )}
// //                           </label>
// //                           <Textarea
// //                             value={reason}
// //                             onChange={(e) => setReason(e.target.value)}
// //                             placeholder={
// //                               action === "resolve"
// //                                 ? "Optional: Add notes about how this was resolved..."
// //                                 : "Required: Provide a detailed reason for this action..."
// //                             }
// //                             className="resize-none min-h-[100px] font-medium"
// //                             rows={4}
// //                           />
// //                         </div>
// //                       )}

// //                       {action === "ban" && (
// //                         <div>
// //                           <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
// //                             Ban Duration
// //                           </label>
// //                           <Input
// //                             type="number"
// //                             min="0"
// //                             placeholder="Days (0 for permanent)"
// //                             value={banDuration}
// //                             onChange={(e) => setBanDuration(e.target.value)}
// //                             className="h-12 font-semibold"
// //                           />
// //                           <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
// //                             <Info className="w-3.5 h-3.5" />
// //                             Enter 0 or leave empty for permanent ban
// //                           </p>
// //                         </div>
// //                       )}

// //                       <Button
// //                         type="submit"
// //                         disabled={loading}
// //                         className={`w-full h-12 font-bold text-base shadow-lg transition-all ${
// //                           action === "resolve"
// //                             ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-200"
// //                             : action === "ban"
// //                             ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-200"
// //                             : action === "reject"
// //                             ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-amber-200"
// //                             : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-200"
// //                         }`}
// //                       >
// //                         {loading ? (
// //                           <>
// //                             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
// //                             Processing...
// //                           </>
// //                         ) : (
// //                           <>
// //                             {action === "resolve" && (
// //                               <CheckCircle2 className="w-5 h-5 mr-2" />
// //                             )}
// //                             {action === "approve" && (
// //                               <CheckCircle2 className="w-5 h-5 mr-2" />
// //                             )}
// //                             {action === "reject" && (
// //                               <XCircle className="w-5 h-5 mr-2" />
// //                             )}
// //                             {action === "ban" && <Ban className="w-5 h-5 mr-2" />}
// //                             {action === "reply" && (
// //                               <Reply className="w-5 h-5 mr-2" />
// //                             )}
// //                             Confirm{" "}
// //                             {action.charAt(0).toUpperCase() + action.slice(1)}
// //                           </>
// //                         )}
// //                       </Button>

// //                       {successMessage && (
// //                         <div
// //                           className={`flex items-center gap-3 p-4 rounded-xl border-2 shadow-sm ${
// //                             action === "resolve"
// //                               ? "bg-green-50 border-green-300"
// //                               : action === "ban"
// //                               ? "bg-red-50 border-red-300"
// //                               : action === "reject"
// //                               ? "bg-amber-50 border-amber-300"
// //                               : "bg-emerald-50 border-emerald-300"
// //                           }`}
// //                         >
// //                           <div
// //                             className={`p-2 rounded-lg ${
// //                               action === "resolve"
// //                                 ? "bg-green-100"
// //                                 : action === "ban"
// //                                 ? "bg-red-100"
// //                                 : action === "reject"
// //                                 ? "bg-amber-100"
// //                                 : "bg-emerald-100"
// //                             }`}
// //                           >
// //                             <CheckCircle2
// //                               className={`w-5 h-5 ${
// //                                 action === "resolve"
// //                                   ? "text-green-600"
// //                                   : action === "ban"
// //                                   ? "text-red-600"
// //                                   : action === "reject"
// //                                   ? "text-amber-600"
// //                                   : "text-emerald-600"
// //                               }`}
// //                             />
// //                           </div>
// //                           <span
// //                             className={`text-sm font-semibold ${
// //                               action === "resolve"
// //                                 ? "text-green-800"
// //                                 : action === "ban"
// //                                 ? "text-red-800"
// //                                 : action === "reject"
// //                                 ? "text-amber-800"
// //                                 : "text-emerald-800"
// //                             }`}
// //                           >
// //                             {successMessage}
// //                           </span>
// //                         </div>
// //                       )}
// //                     </form>
// //                   </>
// //                 )}
// //               </Card>

// //               {/* Quick Guidelines */}
// //               <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
// //                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
// //                   <h4 className="text-white font-bold flex items-center gap-2">
// //                     <Info className="w-4 h-4" />
// //                     Quick Guidelines
// //                   </h4>
// //                 </div>
// //                 <div className="p-5 space-y-3 text-xs">
// //                   <div className="flex gap-3">
// //                     <div className="w-1.5 bg-emerald-500 rounded-full shrink-0"></div>
// //                     <p className="text-gray-700 leading-relaxed">
// //                       <strong>Approve:</strong> Report is false or user has corrected the issue
// //                     </p>
// //                   </div>
// //                   <div className="flex gap-3">
// //                     <div className="w-1.5 bg-amber-500 rounded-full shrink-0"></div>
// //                     <p className="text-gray-700 leading-relaxed">
// //                       <strong>Reject:</strong> Report lacks evidence or is spam
// //                     </p>
// //                   </div>
// //                   <div className="flex gap-3">
// //                     <div className="w-1.5 bg-red-500 rounded-full shrink-0"></div>
// //                     <p className="text-gray-700 leading-relaxed">
// //                       <strong>Ban:</strong> Severe violations or repeated offenses
// //                     </p>
// //                   </div>
// //                   <div className="flex gap-3">
// //                     <div className="w-1.5 bg-blue-500 rounded-full shrink-0"></div>
// //                     <p className="text-gray-700 leading-relaxed">
// //                       <strong>Reply:</strong> Request more information from reporter
// //                     </p>
// //                   </div>
// //                 </div>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   AlertTriangle,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Eye,
//   Flag,
//   Loader2,
//   Mail,
//   Phone,
//   Search,
//   Shield,
//   ShieldAlert,
//   ShieldCheck,
//   User,
//   Users,
//   Calendar,
//   FileText,
//   CheckCircle2,
//   XCircle,
//   Ban,
//   ArrowLeft,
//   Reply,
//   Filter,
//   Download,
//   TrendingUp,
//   BarChart3,
//   AlertCircle,
//   MapPin,
//   Heart,
//   MessageSquare,
//   Image as ImageIcon,
//   Info,
// } from "lucide-react";
// import {
//   fetchReportedProfiles,
//   fetchProfileForReview,
//   performUpdateProfileStatus,
//   clearProfileReviewStatus,
//   resetSelectedProfile,
// } from "../store/profile-review.slice";

// export function ReportedProfilesPage() {
//   const dispatch = useDispatch();
//   const { list, pagination, loading, error } = useSelector(
//     (s) => s.profileReview || {}
//   );
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     dispatch(fetchReportedProfiles({ page, limit: 20 }));
//   }, [dispatch, page]);

//   const filteredList = list?.filter((item) => {
//     const matchesSearch = item.nickname
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || item.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "bg-red-100 text-red-700 border-red-300";
//       case "reviewed":
//         return "bg-blue-100 text-blue-700 border-blue-300";
//       case "resolved":
//         return "bg-emerald-100 text-emerald-700 border-emerald-300";
//       case "pending":
//         return "bg-amber-100 text-amber-700 border-amber-300";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-300";
//     }
//   };

//   const getPriorityColor = (count) => {
//     if (count >= 5) return "text-red-600 bg-red-100";
//     if (count >= 3) return "text-amber-600 bg-amber-100";
//     return "text-blue-600 bg-blue-100";
//   };

//   // Calculate stats
//   const stats = {
//     total: filteredList?.length || 0,
//     new: filteredList?.filter((i) => i.status === "new").length || 0,
//     pending: filteredList?.filter((i) => i.status === "pending").length || 0,
//     resolved: filteredList?.filter((i) => i.status === "resolved").length || 0,
//     highPriority: filteredList?.filter((i) => i.reportCount >= 5).length || 0,
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
//       <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
//         {/* Enhanced Header with Stats */}
//         <div className="space-y-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-200">
//                 <Flag className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Reported Profiles
//                 </h1>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Review and manage user safety reports
//                 </p>
//               </div>
//             </div>
//             {/* <div className="flex items-center gap-3">
//               <Button variant="outline" className="gap-2">
//                 <Download className="w-4 h-4" />
//                 Export
//               </Button>
//             </div> */}
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Total Reports
//                   </p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {stats.total}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded-xl">
//                   <BarChart3 className="w-5 h-5 text-blue-600" />
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     New
//                   </p>
//                   <p className="text-2xl font-bold text-red-600 mt-1">
//                     {stats.new}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-red-100 rounded-xl">
//                   <AlertTriangle className="w-5 h-5 text-red-600" />
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Pending
//                   </p>
//                   <p className="text-2xl font-bold text-amber-600 mt-1">
//                     {stats.pending}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-amber-100 rounded-xl">
//                   <Clock className="w-5 h-5 text-amber-600" />
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Resolved
//                   </p>
//                   <p className="text-2xl font-bold text-emerald-600 mt-1">
//                     {stats.resolved}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-emerald-100 rounded-xl">
//                   <CheckCircle2 className="w-5 h-5 text-emerald-600" />
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     High Priority
//                   </p>
//                   <p className="text-2xl font-bold text-purple-600 mt-1">
//                     {stats.highPriority}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-purple-100 rounded-xl">
//                   <TrendingUp className="w-5 h-5 text-purple-600" />
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>

//         {/* Enhanced Filters */}
//         <Card className="p-4 border-0 shadow-sm bg-white">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search by nickname or user ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full sm:w-48">
//                 <div className="flex items-center gap-2">
//                   <Filter className="w-4 h-4" />
//                   <SelectValue placeholder="All Statuses" />
//                 </div>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Statuses</SelectItem>
//                 <SelectItem value="new">New</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="reviewed">Reviewed</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </Card>

//         {/* Enhanced Table */}
//         <Card className="border-0 shadow-sm overflow-hidden bg-white">
//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
//                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     User Profile
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Reports
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Last Reported
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Priority
//                   </th>
//                   <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {loading && (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-16 text-center">
//                       <div className="flex flex-col items-center gap-4">
//                         <div className="relative">
//                           <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
//                           <Loader2 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//                         </div>
//                         <span className="text-gray-600 font-medium">
//                           Loading reports...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//                 {!loading && filteredList?.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-16 text-center">
//                       <div className="flex flex-col items-center gap-4">
//                         <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
//                           <Users className="w-12 h-12 text-gray-400" />
//                         </div>
//                         <div>
//                           <p className="text-gray-900 font-semibold text-lg">
//                             No reports found
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             All profiles are in good standing
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//                 {filteredList?.map((item) => (
//                   <tr
//                     key={item.userId}
//                     className="hover:bg-blue-50/50 transition-colors group"
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
//                           <User className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                             {item.nickname}
//                           </p>
//                           <p className="text-xs text-gray-500 font-mono mt-0.5">
//                             ID: {item.userId?.slice(0, 12)}...
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`flex items-center justify-center w-10 h-10 rounded-xl ${getPriorityColor(
//                             item.reportCount
//                           )} font-bold shadow-sm`}
//                         >
//                           {item.reportCount}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           report{item.reportCount !== 1 ? "s" : ""}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <div className="p-2 bg-gray-100 rounded-lg">
//                           <Clock className="w-4 h-4 text-gray-500" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {new Date(item.lastReportedAt).toLocaleDateString(
//                               "en-IN",
//                               {
//                                 day: "numeric",
//                                 month: "short",
//                                 year: "numeric",
//                               }
//                             )}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {new Date(item.lastReportedAt).toLocaleTimeString(
//                               "en-IN",
//                               {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               }
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <Badge
//                         className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${getStatusColor(
//                           item.status
//                         )}`}
//                       >
//                         {item.status.toUpperCase()}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4">
//                       {item.reportCount >= 5 ? (
//                         <Badge className="bg-red-100 text-red-700 border-2 border-red-300 px-3 py-1.5 rounded-lg font-semibold">
//                           HIGH
//                         </Badge>
//                       ) : item.reportCount >= 3 ? (
//                         <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-300 px-3 py-1.5 rounded-lg font-semibold">
//                           MEDIUM
//                         </Badge>
//                       ) : (
//                         <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-300 px-3 py-1.5 rounded-lg font-semibold">
//                           LOW
//                         </Badge>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <a
//                         href={`/admin/management/profile-review/${item.userId}`}
//                         className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md"
//                       >
//                         <Eye className="w-4 h-4" />
//                         Review
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden divide-y divide-gray-100">
//             {loading && (
//               <div className="p-12 text-center">
//                 <div className="relative inline-block">
//                   <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
//                   <Loader2 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//                 </div>
//                 <p className="mt-4 text-gray-600 font-medium">
//                   Loading reports...
//                 </p>
//               </div>
//             )}
//             {!loading && filteredList?.length === 0 && (
//               <div className="p-12 text-center">
//                 <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl inline-flex">
//                   <Users className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <p className="mt-4 text-gray-900 font-semibold text-lg">
//                   No reports found
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   All profiles are in good standing
//                 </p>
//               </div>
//             )}
//             {filteredList?.map((item) => (
//               <div key={item.userId} className="p-5 space-y-4 bg-white">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3 flex-1">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shrink-0">
//                       <User className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="font-semibold text-gray-900 truncate">
//                         {item.nickname}
//                       </p>
//                       <p className="text-xs text-gray-500 font-mono mt-0.5">
//                         {item.userId?.slice(0, 8)}...
//                       </p>
//                     </div>
//                   </div>
//                   <Badge
//                     className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-2 shrink-0 ${getStatusColor(
//                       item.status
//                     )}`}
//                   >
//                     {item.status.toUpperCase()}
//                   </Badge>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`flex items-center justify-center w-8 h-8 rounded-lg ${getPriorityColor(
//                           item.reportCount
//                         )} font-bold text-sm`}
//                       >
//                         {item.reportCount}
//                       </div>
//                       <span className="text-xs text-gray-500">reports</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 text-xs text-gray-500">
//                       <Clock className="w-3.5 h-3.5" />
//                       {new Date(item.lastReportedAt).toLocaleDateString(
//                         "en-IN",
//                         {
//                           day: "numeric",
//                           month: "short",
//                         }
//                       )}
//                     </div>
//                   </div>
//                   <a
//                     href={`/admin/management/profile-review/${item.userId}`}
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
//                   >
//                     <Eye className="w-4 h-4" />
//                     Review
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Enhanced Pagination */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 border-0 shadow-sm">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <span>Showing</span>
//             <span className="font-bold text-gray-900">
//               {pagination?.page || page}
//             </span>
//             <span>of</span>
//             <span className="font-bold text-gray-900">
//               {pagination?.totalPages || 1}
//             </span>
//             <span>pages</span>
//             <span className="text-gray-400">•</span>
//             <span className="font-medium text-gray-900">
//               {pagination?.total || 0}
//             </span>
//             <span>total reports</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={page <= 1}
//               onClick={() => setPage((p) => p - 1)}
//               className="gap-2 font-semibold"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Previous
//             </Button>
//             <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold text-sm">
//               {page}
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={page >= (pagination?.totalPages || 1)}
//               onClick={() => setPage((p) => p + 1)}
//               className="gap-2 font-semibold"
//             >
//               Next
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {error && (
//           <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl shadow-sm">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <XCircle className="w-5 h-5 text-red-600" />
//             </div>
//             <p className="text-sm font-medium text-red-700">{error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export function ProfileReviewDetailPage({ userId }) {
//   const dispatch = useDispatch();
//   const { selected, loading, error, successMessage } = useSelector(
//     (s) => s.profileReview || {}
//   );
//   const [action, setAction] = useState("");
//   const [reason, setReason] = useState("");
//   const [banDuration, setBanDuration] = useState("");

//   useEffect(() => {
//     if (userId) dispatch(fetchProfileForReview(userId));
//     return () => dispatch(resetSelectedProfile());
//   }, [dispatch, userId]);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       userId,
//       action,
//       reason: reason || undefined,
//       banDuration: banDuration ? Number(banDuration) : undefined,
//     };
//     dispatch(performUpdateProfileStatus(payload)).then(() => {
//       setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
//     });
//   };

//   if (loading && !selected) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative inline-block">
//             <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
//             <Loader2 className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//           </div>
//           <p className="mt-6 text-gray-700 font-semibold text-lg">
//             Loading profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
//         <Card className="max-w-md w-full p-8 text-center border-0 shadow-xl">
//           <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl inline-flex shadow-lg shadow-red-200">
//             <XCircle className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="mt-6 text-2xl font-bold text-gray-900">
//             Error Loading Profile
//           </h2>
//           <p className="mt-3 text-gray-600 leading-relaxed">
//             {error === "User or profile not found"
//               ? "The profile you're looking for doesn't exist or has been deleted. Please check if the user ID is correct."
//               : error}
//           </p>
//           <Button
//             className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
//             asChild
//           >
//             <a href="/admin/management/profile-review">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Reports
//             </a>
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   if (!selected) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
//         <Card className="max-w-md w-full p-8 text-center border-0 shadow-xl">
//           <div className="p-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl inline-flex">
//             <User className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="mt-6 text-2xl font-bold text-gray-900">
//             Profile Not Found
//           </h2>
//           <p className="mt-3 text-gray-600">
//             The requested profile could not be found.
//           </p>
//           <Button
//             className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
//             asChild
//           >
//             <a href="/admin/management/profile-review">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Reports
//             </a>
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   const p = selected;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
//       <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
//         {/* Enhanced Header */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 border-0">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 asChild
//                 className="shrink-0 hover:bg-gray-100 rounded-xl"
//               >
//                 <a href="/admin/management/profile-review">
//                   <ArrowLeft className="w-5 h-5" />
//                 </a>
//               </Button>
//               <div className="flex items-center gap-4">
//                 {/* <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-200">
//                   <Shield className="w-7 h-7 text-white" />
//                 </div> */}
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     Profile Review
//                   </h1>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Detailed review of reported user profile
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {p.isBanned && (
//                 <Badge className="bg-red-100 text-red-700 border-2 border-red-300 px-4 py-2.5 rounded-xl font-semibold">
//                   <Ban className="w-4 h-4 mr-2" />
//                   USER BANNED
//                 </Badge>
//               )}
//               {p.reportCount >= 5 && (
//                 <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300 px-4 py-2.5 rounded-xl font-semibold">
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                   HIGH PRIORITY
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               <Card className="p-4 border-0 shadow-sm bg-white">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="p-3 bg-red-100 rounded-xl mb-2">
//                     <Flag className="w-5 h-5 text-red-600" />
//                   </div>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {p.reportCount}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Total Reports</p>
//                 </div>
//               </Card>
//               <Card className="p-4 border-0 shadow-sm bg-white">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="p-3 bg-blue-100 rounded-xl mb-2">
//                     <ImageIcon className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {p.profile?.photos?.length || 0}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Photos</p>
//                 </div>
//               </Card>
//               <Card className="p-4 border-0 shadow-sm bg-white">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="p-3 bg-emerald-100 rounded-xl mb-2">
//                     {p.profile?.verification?.status === "approved" ? (
//                       <ShieldCheck className="w-5 h-5 text-emerald-600" />
//                     ) : (
//                       <ShieldAlert className="w-5 h-5 text-amber-600" />
//                     )}
//                   </div>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {p.profile?.verification?.status === "approved"
//                       ? "Yes"
//                       : "No"}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Verified</p>
//                 </div>
//               </Card>
//               <Card className="p-4 border-0 shadow-sm bg-white">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="p-3 bg-purple-100 rounded-xl mb-2">
//                     <Clock className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {p.profile?.lastActive
//                       ? Math.floor(
//                           (Date.now() -
//                             new Date(p.profile.lastActive).getTime()) /
//                             (1000 * 60 * 60 * 24)
//                         )
//                       : "?"}
//                     d
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Last Active</p>
//                 </div>
//               </Card>
//             </div> */}

//             {/* Profile Info Card - Enhanced */}
//             <Card className="border-0 shadow-sm overflow-hidden bg-white">
//               <div className=" px-6 py-5">
//                 <h3 className="text-black font-bold text-lg flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   User Information
//                 </h3>
//               </div>
//               <div className="p-6">
//                 {/* Contact & Identity Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div className="space-y-4">
//                     <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
//                       <Info className="w-4 h-4" />
//                       Contact Details
//                     </h4>
//                     <div className="space-y-3">
//                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
//                           <Mail className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             Email Address
//                           </p>
//                           <p className="text-sm font-medium text-gray-900 mt-1 break-all">
//                             {p.email}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
//                           <Phone className="w-5 h-5 text-emerald-600" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             Phone Number
//                           </p>
//                           <p className="text-sm font-medium text-gray-900 mt-1">
//                             {p.phone || "Not provided"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       Profile Details
//                     </h4>
//                     <div className="space-y-3">
//                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
//                           <User className="w-5 h-5 text-purple-600" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             Nickname
//                           </p>
//                           <p className="text-sm font-medium text-gray-900 mt-1">
//                             {p.profile?.nickname || "N/A"}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                         <div className="p-2.5 bg-white rounded-lg shadow-sm">
//                           <Users className="w-5 h-5 text-pink-600" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             Gender & Age
//                           </p>
//                           <p className="text-sm font-medium text-gray-900 mt-1">
//                             {p.profile?.gender || "N/A"} •{" "}
//                             {p.profile?.age || "N/A"} years
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Ban Info - Enhanced */}
//                 {p.isBanned && (
//                   <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl shadow-sm">
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="p-2 bg-red-200 rounded-lg">
//                         <Ban className="w-5 h-5 text-red-700" />
//                       </div>
//                       <h4 className="text-red-800 font-bold text-lg">
//                         Ban Information
//                       </h4>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="bg-white/70 p-4 rounded-lg">
//                         <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
//                           Reason
//                         </p>
//                         <p className="text-sm font-medium text-gray-900">
//                           {p.banReason}
//                         </p>
//                       </div>
//                       {p.banDetails?.banExpiresAt && (
//                         <div className="bg-white/70 p-4 rounded-lg">
//                           <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
//                             Expires On
//                           </p>
//                           <p className="text-sm font-medium text-gray-900">
//                             {new Date(
//                               p.banDetails.banExpiresAt
//                             ).toLocaleDateString("en-IN", {
//                               day: "numeric",
//                               month: "long",
//                               year: "numeric",
//                             })}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Bio - Enhanced */}
//                 <div>
//                   <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
//                     <FileText className="w-4 h-4" />
//                     Biography
//                   </h4>
//                   <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
//                     <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
//                       {p.profile?.bio || (
//                         <span className="text-gray-400 italic">
//                           No bio provided by user
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Photos - Enhanced */}
//             {p.profile?.photos?.length > 0 && (
//               <Card className="border-0 shadow-sm overflow-hidden bg-white">
//                 <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5">
//                   <h3 className="text-white font-bold text-lg flex items-center gap-2">
//                     <ImageIcon className="w-5 h-5" />
//                     Profile Photos ({p.profile.photos.length})
//                   </h3>
//                 </div>
//                 <div className="p-6">
//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {p.profile.photos.map((ph, idx) => (
//                       <div
//                         key={idx}
//                         className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group shadow-md hover:shadow-xl transition-shadow"
//                       >
//                         <img
//                           src={ph.url || ph}
//                           alt={`Photo ${idx + 1}`}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
//                         <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
//                           <span className="text-xs font-bold text-gray-700">
//                             #{idx + 1}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Card>
//             )}

//             {/* Reports - Enhanced */}
//             <Card className="border-0 shadow-sm overflow-hidden bg-white">
//               <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
//                 <h3 className="text-white font-bold text-lg flex items-center gap-2">
//                   <Flag className="w-5 h-5" />
//                   User Reports ({p.reportCount})
//                 </h3>
//               </div>
//               <div className="p-6 space-y-4">
//                 {p.reports?.length === 0 && (
//                   <div className="text-center py-12">
//                     <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl inline-flex mb-4">
//                       <Flag className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <p className="text-gray-500 font-medium">No reports found</p>
//                   </div>
//                 )}
//                 {p.reports?.map((r) => (
//                   <div
//                     key={r._id}
//                     className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
//                   >
//                     <div className="flex items-start justify-between gap-4 mb-4">
//                       <div className="flex items-center gap-2">
//                         <Badge className="px-3 py-1.5 bg-red-100 text-red-700 border-2 border-red-300 text-xs font-bold rounded-lg">
//                           {r.reason.toUpperCase()}
//                         </Badge>
//                         {r.severity && (
//                           <Badge
//                             className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 ${
//                               r.severity === "high"
//                                 ? "bg-red-100 text-red-700 border-red-300"
//                                 : r.severity === "medium"
//                                 ? "bg-amber-100 text-amber-700 border-amber-300"
//                                 : "bg-blue-100 text-blue-700 border-blue-300"
//                             }`}
//                           >
//                             {r.severity.toUpperCase()}
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                     {r.details && (
//                       <p className="text-sm text-gray-700 mb-4 p-4 bg-gray-50 rounded-lg leading-relaxed">
//                         {r.details}
//                       </p>
//                     )}
//                     <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
//                       <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
//                         <User className="w-3.5 h-3.5" />
//                         <span className="font-medium">
//                           {r.reportedBy?.name ||
//                             r.reportedBy?.email ||
//                             r.reportedBy?.phone ||
//                             "Anonymous User"}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
//                         <Calendar className="w-3.5 h-3.5" />
//                         <span className="font-medium">
//                           {new Date(r.createdAt).toLocaleDateString("en-IN", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Action Panel - 1 column - Sticky */}
//           <div className="lg:col-span-1">
//             <div className="lg:sticky lg:top-6 space-y-6">
//               <Card className="border-0 shadow-lg overflow-hidden bg-white">
//                 {p.status === "resolved" ? (
//                   <>
//                     <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
//                       <h3 className="text-white font-bold text-lg flex items-center gap-2">
//                         <CheckCircle2 className="w-5 h-5" />
//                         Resolved
//                       </h3>
//                     </div>
//                     <div className="p-6 space-y-5">
//                       <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl">
//                         <div className="flex items-center gap-3 mb-2">
//                           <CheckCircle2 className="w-6 h-6 text-emerald-600" />
//                           <p className="text-sm text-emerald-800 font-bold">
//                             Case Closed
//                           </p>
//                         </div>
//                         <p className="text-sm text-emerald-700">
//                           This report has been resolved by an admin.
//                         </p>
//                       </div>

//                       {p.resolvedAt && (
//                         <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
//                             Resolved At
//                           </p>
//                           <p className="text-sm font-semibold text-gray-900">
//                             {new Date(p.resolvedAt).toLocaleDateString("en-IN", {
//                               day: "numeric",
//                               month: "long",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                         </div>
//                       )}

//                       {p.resolution && (
//                         <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//                           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
//                             Resolution Notes
//                           </p>
//                           <p className="text-sm text-gray-900 leading-relaxed">
//                             {p.resolution}
//                           </p>
//                         </div>
//                       )}

//                       <Button
//                         variant="outline"
//                         asChild
//                         className="w-full h-12 font-semibold"
//                       >
//                         <a href="/admin/management/profile-review">
//                           <ArrowLeft className="w-4 h-4 mr-2" />
//                           Back to Reports
//                         </a>
//                       </Button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className=" px-6 py-5">
//                       <h3 className="text-black font-bold text-lg">
//                         Take Action
//                       </h3>
//                       <p className="text-black text-xs mt-1">
//                         Choose an action to resolve this report
//                       </p>
//                     </div>
//                     <form onSubmit={onSubmit} className="p-6 space-y-5">
//                       <div>
//                         <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
//                           Action Type
//                         </label>
//                         <Select value={action} onValueChange={setAction}>
//                           <SelectTrigger className="w-full h-12 font-semibold">
//                             <SelectValue placeholder="Please select an action" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="approve">
//                               <div className="flex items-center gap-3 py-1">
//                                 <div className="p-1.5 bg-emerald-100 rounded-lg">
//                                   <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                                 </div>
//                                 <span className="font-semibold">Approve Profile</span>
//                               </div>
//                             </SelectItem>
//                             <SelectItem value="reject">
//                               <div className="flex items-center gap-3 py-1">
//                                 <div className="p-1.5 bg-amber-100 rounded-lg">
//                                   <XCircle className="w-4 h-4 text-amber-600" />
//                                 </div>
//                                 <span className="font-semibold">Reject Report</span>
//                               </div>
//                             </SelectItem>
//                             <SelectItem value="ban">
//                               <div className="flex items-center gap-3 py-1">
//                                 <div className="p-1.5 bg-red-100 rounded-lg">
//                                   <Ban className="w-4 h-4 text-red-600" />
//                                 </div>
//                                 <span className="font-semibold">Ban User</span>
//                               </div>
//                             </SelectItem>
//                             <SelectItem value="reply">
//                               <div className="flex items-center gap-3 py-1">
//                                 <div className="p-1.5 bg-blue-100 rounded-lg">
//                                   <Reply className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-semibold">Reply to Reporter</span>
//                               </div>
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>

//                       {(action === "reject" ||
//                         action === "ban" ||
//                         action === "resolve") && (
//                         <div>
//                           <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
//                             {action === "resolve"
//                               ? "Resolution Notes"
//                               : "Reason"}
//                             {action !== "resolve" && (
//                               <span className="text-red-500 ml-1">*</span>
//                             )}
//                           </label>
//                           <Textarea
//                             value={reason}
//                             onChange={(e) => setReason(e.target.value)}
//                             placeholder={
//                               action === "resolve"
//                                 ? "Optional: Add notes about how this was resolved..."
//                                 : "Required: Provide a detailed reason for this action..."
//                             }
//                             className="resize-none min-h-[100px] font-medium"
//                             rows={4}
//                           />
//                         </div>
//                       )}

//                       {action === "ban" && (
//                         <div>
//                           <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
//                             Ban Duration
//                           </label>
//                           <Input
//                             type="number"
//                             min="0"
//                             placeholder="Days (0 for permanent)"
//                             value={banDuration}
//                             onChange={(e) => setBanDuration(e.target.value)}
//                             className="h-12 font-semibold"
//                           />
//                           <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
//                             <Info className="w-3.5 h-3.5" />
//                             Enter 0 or leave empty for permanent ban
//                           </p>
//                         </div>
//                       )}

//                       <Button
//                         type="submit"
//                         disabled={loading || !action}
//                         className={`w-full h-12 font-bold text-base shadow-lg transition-all ${
//                           action === "resolve"
//                             ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-200"
//                             : action === "ban"
//                             ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-200"
//                             : action === "reject"
//                             ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-amber-200"
//                             : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-200"
//                         }`}
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                             Processing...
//                           </>
//                         ) : !action ? (
//                           <>
//                             <AlertCircle className="w-5 h-5 mr-2" />
//                             Select Action First
//                           </>
//                         ) : (
//                           <>
//                             {action === "resolve" && (
//                               <CheckCircle2 className="w-5 h-5 mr-2" />
//                             )}
//                             {action === "approve" && (
//                               <CheckCircle2 className="w-5 h-5 mr-2" />
//                             )}
//                             {action === "reject" && (
//                               <XCircle className="w-5 h-5 mr-2" />
//                             )}
//                             {action === "ban" && <Ban className="w-5 h-5 mr-2" />}
//                             {action === "reply" && (
//                               <Reply className="w-5 h-5 mr-2" />
//                             )}
//                             Confirm{" "}
//                             {action.charAt(0).toUpperCase() + action.slice(1)}
//                           </>
//                         )}
//                       </Button>

//                       {successMessage && (
//                         <div
//                           className={`flex items-center gap-3 p-4 rounded-xl border-2 shadow-sm ${
//                             action === "resolve"
//                               ? "bg-green-50 border-green-300"
//                               : action === "ban"
//                               ? "bg-red-50 border-red-300"
//                               : action === "reject"
//                               ? "bg-amber-50 border-amber-300"
//                               : "bg-emerald-50 border-emerald-300"
//                           }`}
//                         >
//                           <div
//                             className={`p-2 rounded-lg ${
//                               action === "resolve"
//                                 ? "bg-green-100"
//                                 : action === "ban"
//                                 ? "bg-red-100"
//                                 : action === "reject"
//                                 ? "bg-amber-100"
//                                 : "bg-emerald-100"
//                             }`}
//                           >
//                             <CheckCircle2
//                               className={`w-5 h-5 ${
//                                 action === "resolve"
//                                   ? "text-green-600"
//                                   : action === "ban"
//                                   ? "text-red-600"
//                                   : action === "reject"
//                                   ? "text-amber-600"
//                                   : "text-emerald-600"
//                               }`}
//                             />
//                           </div>
//                           <span
//                             className={`text-sm font-semibold ${
//                               action === "resolve"
//                                 ? "text-green-800"
//                                 : action === "ban"
//                                 ? "text-red-800"
//                                 : action === "reject"
//                                 ? "text-amber-800"
//                                 : "text-emerald-800"
//                             }`}
//                           >
//                             {successMessage}
//                           </span>
//                         </div>
//                       )}
//                     </form>
//                   </>
//                 )}
//               </Card>

//               {/* Quick Guidelines */}
//               <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
//                   <h4 className="text-white font-bold flex items-center gap-2">
//                     <Info className="w-4 h-4" />
//                     Quick Guidelines
//                   </h4>
//                 </div>
//                 <div className="p-5 space-y-3 text-xs">
//                   <div className="flex gap-3">
//                     <div className="w-1.5 bg-emerald-500 rounded-full shrink-0"></div>
//                     <p className="text-gray-700 leading-relaxed">
//                       <strong>Approve:</strong> Report is false or user has corrected the issue
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="w-1.5 bg-amber-500 rounded-full shrink-0"></div>
//                     <p className="text-gray-700 leading-relaxed">
//                       <strong>Reject:</strong> Report lacks evidence or is spam
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="w-1.5 bg-red-500 rounded-full shrink-0"></div>
//                     <p className="text-gray-700 leading-relaxed">
//                       <strong>Ban:</strong> Severe violations or repeated offenses
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="w-1.5 bg-blue-500 rounded-full shrink-0"></div>
//                     <p className="text-gray-700 leading-relaxed">
//                       <strong>Reply:</strong> Request more information from reporter
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Flag,
  Loader2,
  Mail,
  Phone,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Ban,
  ArrowLeft,
  Reply,
  Filter,
  Download,
  TrendingUp,
  BarChart3,
  AlertCircle,
  MapPin,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import {
  fetchReportedProfiles,
  fetchProfileForReview,
  performUpdateProfileStatus,
  clearProfileReviewStatus,
  resetSelectedProfile,
} from "../store/profile-review.slice";

export function ReportedProfilesPage() {
  const dispatch = useDispatch();
  const { list, pagination, loading, error } = useSelector(
    (s) => s.profileReview || {}
  );
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchReportedProfiles({ page, limit: 20 }));
  }, [dispatch, page]);

  const filteredList = list?.filter((item) => {
    const matchesSearch = item.nickname
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-700 border-red-300";
      case "reviewed":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "resolved":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityColor = (count) => {
    if (count >= 5) return "text-red-600 bg-red-100";
    if (count >= 3) return "text-amber-600 bg-amber-100";
    return "text-blue-600 bg-blue-100";
  };

  // Calculate stats
  const stats = {
    total: filteredList?.length || 0,
    new: filteredList?.filter((i) => i.status === "new").length || 0,
    pending: filteredList?.filter((i) => i.status === "pending").length || 0,
    resolved: filteredList?.filter((i) => i.status === "resolved").length || 0,
    highPriority: filteredList?.filter((i) => i.reportCount >= 5).length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Enhanced Header with Stats */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-200">
                <Flag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Reported Profiles
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Review and manage user safety reports
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Reports
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {stats.new}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">
                    {stats.pending}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {stats.resolved}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {stats.highPriority}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="p-4 border-0 shadow-sm bg-white">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by nickname or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="All Statuses" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Enhanced Table */}
        <Card className="border-0 shadow-sm overflow-hidden bg-white">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    User Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Last Reported
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                          <Loader2 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <span className="text-gray-600 font-medium">
                          Loading reports...
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && filteredList?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                          <Users className="w-12 h-12 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold text-lg">
                            No reports found
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            All profiles are in good standing
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredList?.map((item) => (
                  <tr
                    key={item.userId}
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.nickname}
                          </p>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">
                            ID: {item.userId?.slice(0, 12)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-xl ${getPriorityColor(
                            item.reportCount
                          )} font-bold shadow-sm`}
                        >
                          {item.reportCount}
                        </div>
                        <div className="text-xs text-gray-500">
                          report{item.reportCount !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Clock className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(item.lastReportedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(item.lastReportedAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {item.reportCount >= 5 ? (
                        <Badge className="bg-red-100 text-red-700 border-2 border-red-300 px-3 py-1.5 rounded-lg font-semibold">
                          HIGH
                        </Badge>
                      ) : item.reportCount >= 3 ? (
                        <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-300 px-3 py-1.5 rounded-lg font-semibold">
                          MEDIUM
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-300 px-3 py-1.5 rounded-lg font-semibold">
                          LOW
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/admin/management/profile-review/${item.userId}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md"
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {loading && (
              <div className="p-12 text-center">
                <div className="relative inline-block">
                  <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <Loader2 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading reports...
                </p>
              </div>
            )}
            {!loading && filteredList?.length === 0 && (
              <div className="p-12 text-center">
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl inline-flex">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <p className="mt-4 text-gray-900 font-semibold text-lg">
                  No reports found
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  All profiles are in good standing
                </p>
              </div>
            )}
            {filteredList?.map((item) => (
              <div key={item.userId} className="p-5 space-y-4 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.nickname}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                        {item.userId?.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border-2 shrink-0 ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${getPriorityColor(
                          item.reportCount
                        )} font-bold text-sm`}
                      >
                        {item.reportCount}
                      </div>
                      <span className="text-xs text-gray-500">reports</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(item.lastReportedAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}
                    </div>
                  </div>
                  <a
                    href={`/admin/management/profile-review/${item.userId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Enhanced Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 border-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>
            <span className="font-bold text-gray-900">
              {pagination?.page || page}
            </span>
            <span>of</span>
            <span className="font-bold text-gray-900">
              {pagination?.totalPages || 1}
            </span>
            <span>pages</span>
            <span className="text-gray-400">•</span>
            <span className="font-medium text-gray-900">
              {pagination?.total || 0}
            </span>
            <span>total reports</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="gap-2 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold text-sm">
              {page}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= (pagination?.totalPages || 1)}
              onClick={() => setPage((p) => p + 1)}
              className="gap-2 font-semibold"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl shadow-sm">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileReviewDetailPage({ userId }) {
  const dispatch = useDispatch();
  const { selected, loading, error, successMessage } = useSelector(
    (s) => s.profileReview || {}
  );
  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [banDuration, setBanDuration] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");

  const openImageModal = (imageUrl, index) => {
    setSelectedImage({ url: imageUrl, index });
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  useEffect(() => {
    if (userId) dispatch(fetchProfileForReview(userId));
    return () => dispatch(resetSelectedProfile());
  }, [dispatch, userId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId,
      action,
      reason: reason || undefined,
      banDuration: banDuration ? Number(banDuration) : undefined,
      replyMessage: action === "reply" ? replyMessage : undefined,
      reportId: action === "reply" ? selectedReportId : undefined,
    };
    dispatch(performUpdateProfileStatus(payload)).then(() => {
      setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
      // Reset form fields after successful submission
      if (action === "reply") {
        setReplyMessage("");
        setSelectedReportId("");
      }
    });
  };

  if (loading && !selected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <Loader2 className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-gray-700 font-semibold text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-0 shadow-xl">
          <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl inline-flex shadow-lg shadow-red-200">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Error Loading Profile
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {error === "User or profile not found"
              ? "The profile you're looking for doesn't exist or has been deleted. Please check if the user ID is correct."
              : error}
          </p>
          <Button
            className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            asChild
          >
            <a href="/admin/management/profile-review">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-0 shadow-xl">
          <div className="p-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl inline-flex">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Profile Not Found
          </h2>
          <p className="mt-3 text-gray-600">
            The requested profile could not be found.
          </p>
          <Button
            className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            asChild
          >
            <a href="/admin/management/profile-review">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  const p = selected;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="shrink-0 hover:bg-gray-100 rounded-xl"
              >
                <a href="/admin/management/profile-review">
                  <ArrowLeft className="w-5 h-5" />
                </a>
              </Button>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Profile Review
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Detailed review of reported user profile
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {p.isBanned && (
                <Badge className="bg-red-100 text-red-700 border-2 border-red-300 px-4 py-2.5 rounded-xl font-semibold">
                  <Ban className="w-4 h-4 mr-2" />
                  USER BANNED
                </Badge>
              )}
              {p.reportCount >= 5 && (
                <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300 px-4 py-2.5 rounded-xl font-semibold">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  HIGH PRIORITY
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Card className="p-4 border-0 shadow-sm bg-white">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-100 rounded-xl mb-2">
                    <Flag className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {p.reportCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Total Reports</p>
                </div>
              </Card>
              <Card className="p-4 border-0 shadow-sm bg-white">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-xl mb-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {p.profile?.photos?.length || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Photos</p>
                </div>
              </Card>
              <Card className="p-4 border-0 shadow-sm bg-white">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-100 rounded-xl mb-2">
                    {p.profile?.verification?.status === "approved" ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {p.profile?.verification?.status === "approved"
                      ? "Yes"
                      : "No"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Verified</p>
                </div>
              </Card>
              <Card className="p-4 border-0 shadow-sm bg-white">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-100 rounded-xl mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {p.profile?.lastActive
                      ? Math.floor(
                          (Date.now() -
                            new Date(p.profile.lastActive).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : "?"}
                    d
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Last Active</p>
                </div>
              </Card>
            </div>

            {/* Profile Info Card - Enhanced */}
            <Card className="border-0 shadow-sm overflow-hidden bg-white">
              <div className="px-6 py-5">
                <h3 className="text-black font-bold text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Information
                </h3>
              </div>
              <div className="p-6">
                {/* Contact & Identity Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Contact Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Email Address
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1 break-all">
                            {p.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
                          <Phone className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Phone Number
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {p.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Nickname
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {p.profile?.nickname || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <div className="p-2.5 bg-white rounded-lg shadow-sm">
                          <Users className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Gender & Age
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {p.profile?.gender || "N/A"} •{" "}
                            {p.profile?.age || "N/A"} years
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ban Info - Enhanced */}
                {p.isBanned && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-red-200 rounded-lg">
                        <Ban className="w-5 h-5 text-red-700" />
                      </div>
                      <h4 className="text-red-800 font-bold text-lg">
                        Ban Information
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/70 p-4 rounded-lg">
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
                          Reason
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.banReason}
                        </p>
                      </div>
                      {p.banDetails?.banExpiresAt && (
                        <div className="bg-white/70 p-4 rounded-lg">
                          <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
                            Expires On
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(
                              p.banDetails.banExpiresAt
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bio - Enhanced */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Biography
                  </h4>
                  <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {p.profile?.bio || (
                        <span className="text-gray-400 italic">
                          No bio provided by user
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Photos - Enhanced */}
            {p.profile?.photos?.length > 0 && (
              <Card className="border-0 shadow-sm overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Profile Photos ({p.profile.photos.length})
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {p.profile.photos.map((ph, idx) => (
                      <div
                        key={idx}
                        onClick={() => openImageModal(ph.url || ph, idx)}
                        className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group shadow-md hover:shadow-xl transition-all cursor-pointer"
                      >
                        <img
                          src={ph.url || ph}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                          <span className="text-xs font-bold text-gray-700">
                            #{idx + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Reports - Enhanced */}
            <Card className="border-0 shadow-sm overflow-hidden bg-white">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Flag className="w-5 h-5" />
                  User Reports ({p.reportCount})
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {p.reports?.length === 0 && (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl inline-flex mb-4">
                      <Flag className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No reports found</p>
                  </div>
                )}
                {p.reports?.map((r) => (
                  <div
                    key={r._id}
                    className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="px-3 py-1.5 bg-red-100 text-red-700 border-2 border-red-300 text-xs font-bold rounded-lg">
                          {r.reason.toUpperCase()}
                        </Badge>
                        {r.severity && (
                          <Badge
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 ${
                              r.severity === "high"
                                ? "bg-red-100 text-red-700 border-red-300"
                                : r.severity === "medium"
                                ? "bg-amber-100 text-amber-700 border-amber-300"
                                : "bg-blue-100 text-blue-700 border-blue-300"
                            }`}
                          >
                            {r.severity.toUpperCase()}
                          </Badge>
                        )}
                        {r.adminReply && (
                          <Badge className="px-3 py-1.5 bg-blue-100 text-blue-700 border-2 border-blue-300 text-xs font-bold rounded-lg flex items-center gap-1">
                            <Reply className="w-3 h-3" />
                            REPLIED
                          </Badge>
                        )}
                      </div>
                    </div>
                    {r.details && (
                      <p className="text-sm text-gray-700 mb-4 p-4 bg-gray-50 rounded-lg leading-relaxed">
                        {r.details}
                      </p>
                    )}
                    
                    {/* Admin Reply Section */}
                    {r.adminReply && (
                      <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Reply className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                            Admin Response
                          </span>
                        </div>
                        <p className="text-sm text-blue-900 leading-relaxed">
                          {r.adminReply}
                        </p>
                        {r.repliedAt && (
                          <p className="text-xs text-blue-600 mt-2">
                            Replied on{" "}
                            {new Date(r.repliedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                        <User className="w-3.5 h-3.5" />
                        <span className="font-medium">
                          {r.reportedBy?.name ||
                            r.reportedBy?.email ||
                            r.reportedBy?.phone ||
                            "Anonymous User"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-medium">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Action Panel - 1 column - Sticky */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6 space-y-6">
              <Card className="border-0 shadow-lg overflow-hidden bg-white">
                {p.status === "resolved" ? (
                  <>
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5">
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Resolved
                      </h3>
                    </div>
                    <div className="p-6 space-y-5">
                      <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          <p className="text-sm text-emerald-800 font-bold">
                            Case Closed
                          </p>
                        </div>
                        <p className="text-sm text-emerald-700">
                          This report has been resolved by an admin.
                        </p>
                      </div>

                      {p.resolvedAt && (
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Resolved At
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(p.resolvedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      )}

                      {p.resolution && (
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Resolution Notes
                          </p>
                          <p className="text-sm text-gray-900 leading-relaxed">
                            {p.resolution}
                          </p>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        asChild
                        className="w-full h-12 font-semibold"
                      >
                        <a href="/admin/management/profile-review">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Reports
                        </a>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-6 py-5">
                      <h3 className="text-black font-bold text-lg">
                        Take Action
                      </h3>
                      <p className="text-black text-xs mt-1">
                        Choose an action to resolve this report
                      </p>
                    </div>
                    <form onSubmit={onSubmit} className="p-6 space-y-5">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
                          Action Type
                        </label>
                        <Select value={action} onValueChange={setAction}>
                          <SelectTrigger className="w-full h-12 font-semibold">
                            <SelectValue placeholder="Please select an action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approve">
                              <div className="flex items-center gap-3 py-1">
                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                </div>
                                <span className="font-semibold">Approve Profile</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="reject">
                              <div className="flex items-center gap-3 py-1">
                                <div className="p-1.5 bg-amber-100 rounded-lg">
                                  <XCircle className="w-4 h-4 text-amber-600" />
                                </div>
                                <span className="font-semibold">Reject Report</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="ban">
                              <div className="flex items-center gap-3 py-1">
                                <div className="p-1.5 bg-red-100 rounded-lg">
                                  <Ban className="w-4 h-4 text-red-600" />
                                </div>
                                <span className="font-semibold">Ban User</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="reply">
                              <div className="flex items-center gap-3 py-1">
                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                  <Reply className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="font-semibold">Reply to Reporter</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(action === "reject" ||
                        action === "ban" ||
                        action === "resolve") && (
                        <div>
                          <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
                            {action === "resolve"
                              ? "Resolution Notes"
                              : "Reason"}
                            {action !== "resolve" && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          <Textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={
                              action === "resolve"
                                ? "Optional: Add notes about how this was resolved..."
                                : "Required: Provide a detailed reason for this action..."
                            }
                            className="resize-none min-h-[100px] font-medium"
                            rows={4}
                          />
                        </div>
                      )}

                      {/* Reply to Reporter Section */}
                      {action === "reply" && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
                              Select Report to Reply
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Select
                              value={selectedReportId}
                              onValueChange={setSelectedReportId}
                            >
                              <SelectTrigger className="w-full h-12">
                                <SelectValue placeholder="Choose a report to reply to..." />
                              </SelectTrigger>
                              <SelectContent className="max-h-80">
                                {p.reports?.map((report) => (
                                  <SelectItem
                                    key={report._id}
                                    value={report._id}
                                    className="py-3"
                                  >
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center gap-2">
                                        <Badge className="bg-red-100 text-red-700 text-xs px-2 py-0.5">
                                          {report.reason}
                                        </Badge>
                                        <span className="text-xs text-gray-500">
                                          {new Date(
                                            report.createdAt
                                          ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                          })}
                                        </span>
                                      </div>
                                      {report.details && (
                                        <span className="text-xs text-gray-600 line-clamp-1">
                                          {report.details}
                                        </span>
                                      )}
                                      <span className="text-xs text-gray-500">
                                        By:{" "}
                                        {report.reportedBy?.name ||
                                          report.reportedBy?.email ||
                                          "Anonymous"}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {p.reports?.length === 0 && (
                              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                No reports available to reply to
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
                              Your Reply Message
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Textarea
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Write your response to the reporter here... Be professional and informative."
                              className="resize-none min-h-[150px] font-medium"
                              rows={6}
                            />
                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-xs text-blue-700 flex items-start gap-2">
                                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>
                                  This message will be sent via email to the
                                  person who reported this profile. Please be
                                  clear, professional, and provide any necessary
                                  context about the actions taken.
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {action === "ban" && (
                        <div>
                          <label className="text-sm font-bold text-gray-700 mb-3 block uppercase tracking-wider">
                            Ban Duration
                          </label>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Days (0 for permanent)"
                            value={banDuration}
                            onChange={(e) => setBanDuration(e.target.value)}
                            className="h-12 font-semibold"
                          />
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                            <Info className="w-3.5 h-3.5" />
                            Enter 0 or leave empty for permanent ban
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={
                          loading ||
                          !action ||
                          (action === "reply" && (!selectedReportId || !replyMessage.trim()))
                        }
                        className={`w-full h-12 font-bold text-base shadow-lg transition-all ${
                          action === "resolve"
                            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-200"
                            : action === "ban"
                            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-200"
                            : action === "reject"
                            ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-amber-200"
                            : action === "reply"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200"
                            : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-200"
                        }`}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : !action ? (
                          <>
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Select Action First
                          </>
                        ) : (
                          <>
                            {action === "resolve" && (
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                            )}
                            {action === "approve" && (
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                            )}
                            {action === "reject" && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {action === "ban" && <Ban className="w-5 h-5 mr-2" />}
                            {action === "reply" && (
                              <Reply className="w-5 h-5 mr-2" />
                            )}
                            Confirm{" "}
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </>
                        )}
                      </Button>

                      {successMessage && (
                        <div
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 shadow-sm ${
                            action === "resolve"
                              ? "bg-green-50 border-green-300"
                              : action === "ban"
                              ? "bg-red-50 border-red-300"
                              : action === "reject"
                              ? "bg-amber-50 border-amber-300"
                              : action === "reply"
                              ? "bg-blue-50 border-blue-300"
                              : "bg-emerald-50 border-emerald-300"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              action === "resolve"
                                ? "bg-green-100"
                                : action === "ban"
                                ? "bg-red-100"
                                : action === "reject"
                                ? "bg-amber-100"
                                : action === "reply"
                                ? "bg-blue-100"
                                : "bg-emerald-100"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-5 h-5 ${
                                action === "resolve"
                                  ? "text-green-600"
                                  : action === "ban"
                                  ? "text-red-600"
                                  : action === "reject"
                                  ? "text-amber-600"
                                  : action === "reply"
                                  ? "text-blue-600"
                                  : "text-emerald-600"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-sm font-semibold ${
                              action === "resolve"
                                ? "text-green-800"
                                : action === "ban"
                                ? "text-red-800"
                                : action === "reject"
                                ? "text-amber-800"
                                : action === "reply"
                                ? "text-blue-800"
                                : "text-emerald-800"
                            }`}
                          >
                            {successMessage}
                          </span>
                        </div>
                      )}
                    </form>
                  </>
                )}
              </Card>

              {/* Quick Guidelines */}
              <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Quick Guidelines
                  </h4>
                </div>
                <div className="p-5 space-y-3 text-xs">
                  <div className="flex gap-3">
                    <div className="w-1.5 bg-emerald-500 rounded-full shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Approve:</strong> Report is false or user has corrected the issue
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 bg-amber-500 rounded-full shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Reject:</strong> Report lacks evidence or is spam
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 bg-red-500 rounded-full shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Ban:</strong> Severe violations or repeated offenses
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 bg-blue-500 rounded-full shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Reply:</strong> Request more information from reporter
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Image Modal/Lightbox */}
        {isImageModalOpen && selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeImageModal}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md z-10"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full z-10">
                <span className="text-white font-semibold">
                  Photo {selectedImage.index + 1} of {p.profile.photos.length}
                </span>
              </div>

              {/* Main Image */}
              <div
                className="relative max-h-full max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={`Photo ${selectedImage.index + 1}`}
                  className="max-h-[90vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Navigation Arrows */}
              {p.profile.photos.length > 1 && (
                <>
                  {selectedImage.index > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIndex = selectedImage.index - 1;
                        const prevPhoto = p.profile.photos[prevIndex];
                        openImageModal(prevPhoto.url || prevPhoto, prevIndex);
                      }}
                      className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                  )}
                  {selectedImage.index < p.profile.photos.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIndex = selectedImage.index + 1;
                        const nextPhoto = p.profile.photos[nextIndex];
                        openImageModal(nextPhoto.url || nextPhoto, nextIndex);
                      }}
                      className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  )}
                </>
              )}

              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-3 bg-white/10 backdrop-blur-md rounded-2xl max-w-full overflow-x-auto">
                {p.profile.photos.map((ph, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(ph.url || ph, idx);
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      idx === selectedImage.index
                        ? "ring-4 ring-white scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={ph.url || ph}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}