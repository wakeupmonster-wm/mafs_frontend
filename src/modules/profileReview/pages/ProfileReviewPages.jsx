// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
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
//     (s) => s.profileReview || {},
//   );
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(fetchReportedProfiles({ page, limit: 20 }));
//   }, [dispatch, page]);

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       <div>
//         <h2 className="text-xl font-semibold">Reported Profiles</h2>
//         <p className="text-sm text-muted-foreground">
//           Profiles reported by users for review
//         </p>
//       </div>

//       <Card className="p-0 overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-muted">
//             <tr>
//               <th className="p-3 text-left">User</th>
//               <th className="p-3 text-left">Reports</th>
//               <th className="p-3 text-left">Last Reported</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={5} className="p-4 text-center">
//                   Loading...
//                 </td>
//               </tr>
//             )}
//             {!loading && list?.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="p-4 text-center text-muted-foreground"
//                 >
//                   No reports found
//                 </td>
//               </tr>
//             )}
//             {list?.map((item) => (
//               <tr key={item.userId} className="border-t hover:bg-muted/50">
//                 <td className="p-3 font-medium">{item.nickname}</td>
//                 <td className="p-3">{item.reportCount}</td>
//                 <td className="p-3">
//                   {new Date(item.lastReportedAt).toLocaleString()}
//                 </td>
//                 <td className="p-3">
//                   <Badge
//                     variant={item.status === "new" ? "warning" : "secondary"}
//                   >
//                     {item.status}
//                   </Badge>
//                 </td>
//                 <td className="p-3 text-right">
//                   <a
//                     className="text-blue-600 text-sm hover:underline"
//                     href={`/admin/management/profile-review/${item.userId}`}
//                   >
//                     Review
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>

//       <div className="flex items-center justify-between">
//         <Button
//           variant="outline"
//           disabled={page <= 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           Previous
//         </Button>
//         <div className="text-sm text-muted-foreground">
//           Page {pagination?.page || page} of {pagination?.totalPages || 1}
//         </div>
//         <Button
//           variant="outline"
//           disabled={page >= (pagination?.totalPages || 1)}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next
//         </Button>
//       </div>

//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// }

// export function ProfileReviewDetailPage({ userId }) {
//   const dispatch = useDispatch();
//   const { selected, loading, error, successMessage } = useSelector(
//     (s) => s.profileReview || {},
//   );
//   const [action, setAction] = useState("approve");
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

//   if (loading && !selected) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;
//   if (!selected) return <div className="p-4">Profile not found</div>;

//   const p = selected;

//   return (
//     <div className="max-w-5xl mx-auto p-4 space-y-6">
//       <Card className="p-6 space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">Profile Review</h2>
//           {p.isBanned && <Badge variant="destructive">Banned</Badge>}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm">
//               <span className="font-medium">Email:</span> {p.email}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Phone:</span> {p.phone || "-"}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Account Status:</span>{" "}
//               {p.accountStatus}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Verified:</span>
//               {p.profile?.verification?.status === "approved" ? "Yes" : "No"}
//             </p>
//             {p.isBanned && (
//               <div className="mt-2 text-sm">
//                 <p>
//                   <span className="font-medium">Ban Reason:</span> {p.banReason}
//                 </p>
//                 {p.banDetails?.banExpiresAt && (
//                   <p>
//                     <span className="font-medium">Ban Expires:</span>{" "}
//                     {new Date(p.banDetails.banExpiresAt).toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div>
//             <p className="text-sm">
//               <span className="font-medium">Nickname:</span>{" "}
//               {p.profile?.nickname}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Gender:</span> {p.profile?.gender}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Age:</span> {p.profile?.age || "-"}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Last Active:</span>{" "}
//               {p.profile?.lastActive
//                 ? new Date(p.profile.lastActive).toLocaleString()
//                 : "-"}
//             </p>
//           </div>
//         </div>

//         <div>
//           <p className="font-medium">Bio</p>
//           <p className="text-sm text-muted-foreground whitespace-pre-wrap">
//             {p.profile?.bio || "-"}
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//           {p.profile?.photos?.map((ph, idx) => (
//             <img
//               key={idx}
//               src={ph.url || ph}
//               alt="photo"
//               className="w-full h-32 object-cover rounded"
//             />
//           ))}
//         </div>

//         <div>
//           <p className="font-medium">Reports ({p.reportCount})</p>
//           <div className="grid gap-2 mt-2">
//             {p.reports?.map((r) => (
//               <Card key={r._id} className="p-3">
//                 <p className="text-sm">
//                   <span className="font-medium">Reason:</span> {r.reason}
//                 </p>
//                 {r.details && (
//                   <p className="text-sm text-muted-foreground">{r.details}</p>
//                 )}
//                 <p className="text-xs text-muted-foreground">
//                   By:{" "}
//                   {r.reportedBy?.name ||
//                     r.reportedBy?.email ||
//                     r.reportedBy?.phone ||
//                     "-"}{" "}
//                   • {new Date(r.createdAt).toLocaleString()}
//                 </p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </Card>

//       <Card className="p-6">
//         <h3 className="font-medium mb-3">Take Action</h3>
//         <form onSubmit={onSubmit} className="grid gap-3">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <div>
//               <label className="text-sm font-medium mb-1 block">Action</label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={action}
//                 onChange={(e) => setAction(e.target.value)}
//               >
//                 <option value="approve">Approve</option>
//                 <option value="reject">Reject</option>
//                 <option value="ban">Ban</option>
//               </select>
//             </div>

//             {(action === "reject" || action === "ban") && (
//               <div>
//                 <label className="text-sm font-medium mb-1 block">Reason</label>
//                 <Textarea
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   placeholder="Reason for action"
//                 />
//               </div>
//             )}

//             {action === "ban" && (
//               <div>
//                 <label className="text-sm font-medium mb-1 block">
//                   Ban Duration (days)
//                 </label>
//                 <Input
//                   type="number"
//                   min="0"
//                   placeholder="Leave empty for permanent"
//                   value={banDuration}
//                   onChange={(e) => setBanDuration(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <Button type="submit" disabled={loading}>
//               {loading ? "Processing..." : "Confirm"}
//             </Button>
//             {successMessage && (
//               <span className="text-green-600 text-sm">{successMessage}</span>
//             )}
//           </div>
//         </form>
//       </Card>
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

  useEffect(() => {
    dispatch(fetchReportedProfiles({ page, limit: 20 }));
  }, [dispatch, page]);

  const filteredList = list?.filter((item) =>
    item.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "reviewed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 rounded-xl">
              <Flag className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Reported Profiles
              </h1>
              <p className="text-sm text-gray-500">
                Review and manage user reports
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200"
            >
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
              {pagination?.totalItems || list?.length || 0} Pending
            </Badge>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="p-4 border-0 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by nickname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>
        </Card>

        {/* Table Card */}
        <Card className="border-0 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Last Reported
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        <span className="text-gray-500">Loading reports...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && filteredList?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">
                            No reports found
                          </p>
                          <p className="text-sm text-gray-500">
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
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.nickname}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {item.userId?.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                          {item.reportCount}
                        </span>
                        <span className="text-sm text-gray-500">reports</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(item.lastReportedAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/admin/management/profile-review/${item.userId}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
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
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
                <p className="mt-3 text-gray-500">Loading reports...</p>
              </div>
            )}
            {!loading && filteredList?.length === 0 && (
              <div className="p-8 text-center">
                <div className="p-3 bg-gray-100 rounded-full inline-flex">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="mt-3 text-gray-900 font-medium">No reports found</p>
                <p className="text-sm text-gray-500">
                  All profiles are in good standing
                </p>
              </div>
            )}
            {filteredList?.map((item) => (
              <div key={item.userId} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.nickname}</p>
                      <p className="text-xs text-gray-500">
                        {item.reportCount} reports
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(item.lastReportedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <a
                    href={`/admin/management/profile-review/${item.userId}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Review
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">
            Page{" "}
            <span className="font-medium text-gray-900">
              {pagination?.page || page}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900">
              {pagination?.totalPages || 1}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= (pagination?.totalPages || 1)}
              onClick={() => setPage((p) => p + 1)}
              className="gap-1.5"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
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
  const [action, setAction] = useState("approve");
  const [reason, setReason] = useState("");
  const [banDuration, setBanDuration] = useState("");

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
    };
    dispatch(performUpdateProfileStatus(payload)).then(() => {
      setTimeout(() => dispatch(clearProfileReviewStatus()), 2000);
    });
  };

  if (loading && !selected) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
          <div className="p-3 bg-red-100 rounded-full inline-flex">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Error Loading Profile
          </h2>
          <p className="mt-2 text-gray-500">{error}</p>
          <Button className="mt-6 bg-transparent" variant="outline" asChild>
            <a href="/admin/management/profile-review">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  if (!selected) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center border-0 shadow-lg">
          <div className="p-3 bg-gray-100 rounded-full inline-flex">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Profile Not Found
          </h2>
          <p className="mt-2 text-gray-500">
            The requested profile could not be found.
          </p>
          <Button className="mt-6 bg-transparent" variant="outline" asChild>
            <a href="/admin/management/profile-review">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  const p = selected;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild className="shrink-0 bg-transparent">
              <a href="/admin/management/profile-review">
                <ArrowLeft className="w-4 h-4" />
              </a>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Profile Review
                </h1>
                <p className="text-sm text-gray-500">
                  Review reported user profile
                </p>
              </div>
            </div>
          </div>
          {p.isBanned && (
            <Badge className="bg-red-100 text-red-700 border border-red-200 px-4 py-2">
              <Ban className="w-4 h-4 mr-2" />
              User Banned
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info Card */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Phone className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Phone
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {p.profile?.verification?.status === "approved" ? (
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Verification
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.profile?.verification?.status === "approved"
                            ? "Verified"
                            : "Not Verified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Nickname
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.profile?.nickname || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Gender / Age
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.profile?.gender || "N/A"} /{" "}
                          {p.profile?.age || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Last Active
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {p.profile?.lastActive
                            ? new Date(p.profile.lastActive).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ban Info */}
                {p.isBanned && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                      <Ban className="w-4 h-4" />
                      Ban Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-red-600">Reason:</span>{" "}
                        <span className="text-gray-900">{p.banReason}</span>
                      </div>
                      {p.banDetails?.banExpiresAt && (
                        <div>
                          <span className="text-red-600">Expires:</span>{" "}
                          <span className="text-gray-900">
                            {new Date(
                              p.banDetails.banExpiresAt
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bio */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bio
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {p.profile?.bio || "No bio provided"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Photos */}
            {p.profile?.photos?.length > 0 && (
              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                  <h3 className="text-white font-semibold">
                    Photos ({p.profile.photos.length})
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {p.profile.photos.map((ph, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                      >
                        <img
                          src={ph.url || ph}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Reports */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Reports ({p.reportCount})
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {p.reports?.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No reports found
                  </p>
                )}
                {p.reports?.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            {r.reason}
                          </span>
                        </div>
                        {r.details && (
                          <p className="text-sm text-gray-700 mb-3">
                            {r.details}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {r.reportedBy?.name ||
                              r.reportedBy?.email ||
                              r.reportedBy?.phone ||
                              "Anonymous"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(r.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Action Panel - Sticky on Desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <Card className="border-0 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                  <h3 className="text-white font-semibold">Take Action</h3>
                </div>
                <form onSubmit={onSubmit} className="p-6 space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Action
                    </label>
                    <Select value={action} onValueChange={setAction}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Approve
                          </div>
                        </SelectItem>
                        <SelectItem value="reject">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-amber-600" />
                            Reject
                          </div>
                        </SelectItem>
                        <SelectItem value="ban">
                          <div className="flex items-center gap-2">
                            <Ban className="w-4 h-4 text-red-600" />
                            Ban User
                          </div>
                        </SelectItem>
                        <SelectItem value="reply">
                          <div className="flex items-center gap-2">
                            <Reply className="w-4 h-4 text-red-600" />
                            reply to reporter
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(action === "reject" || action === "ban") && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Reason
                      </label>
                      <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for this action..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                  )}

                  {action === "ban" && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Ban Duration (days)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Leave empty for permanent ban"
                        value={banDuration}
                        onChange={(e) => setBanDuration(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1.5">
                        Enter 0 or leave empty for permanent ban
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${
                      action === "ban"
                        ? "bg-red-600 hover:bg-red-700"
                        : action === "reject"
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {action === "approve" && (
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                        )}
                        {action === "reject" && (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}
                        {action === "ban" && <Ban className="w-4 h-4 mr-2" />}
                        Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
                      </>
                    )}
                  </Button>

                  {successMessage && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-emerald-700">
                        {successMessage}
                      </span>
                    </div>
                  )}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
