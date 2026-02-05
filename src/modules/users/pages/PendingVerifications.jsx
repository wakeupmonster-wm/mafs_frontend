// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPendingVerifications,
//   verifyUserProfile,
// } from "../store/user.slice";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
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
//   ShieldCheck,
//   Clock,
//   User,
//   Phone,
//   FileText,
//   Camera,
//   CheckCircle,
//   XCircle,
//   Loader2,
//   AlertCircle,
//   X,
//   Search,
//   Mail,
//   Calendar,
//   MapPin,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
// } from "lucide-react";
// import { toast } from "sonner";

// export default function PendingVerifications() {
//   const dispatch = useDispatch();
//   const { pendingVerifications, loading, error, successMessage } = useSelector(
//     (state) => state.users
//   );

//   // States
//   const [reason, setReason] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [statusFilter, setStatusFilter] = useState("all"); // Filters: all, approved, rejected, pending
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [itemsPerPage] = useState(15);
//   const [imageModal, setImageModal] = useState({ open: false, src: "", title: "" });


//   useEffect(() => {
//   dispatch(fetchPendingVerifications());
//   // Default filter humesha pending ya all rakho jo tum chahte ho
//   setStatusFilter("pending"); 
// }, [dispatch]);

//   const processedData = useMemo(() => {
//   if (!pendingVerifications) return [];

//   let filtered = pendingVerifications.filter((item) => {
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch =
//       item.nickname?.toLowerCase().includes(searchLower) ||
//       item.user?.phone?.includes(searchTerm) ||
//       item.user?.email?.toLowerCase().includes(searchLower);

//     // FIX YAHAN HAI: statusFilter ko logic mein sabse pehle check karo
//     const currentStatus = (item.verification?.status || item.kycStatus || "pending").toLowerCase();
    
//     // Agar statusFilter "all" hai, toh matchesStatus humesha true hoga
//     const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//     return filtered.sort((a, b) => {
//       const dateA = new Date(a.verification?.submittedAt || a.createdAt);
//       const dateB = new Date(b.verification?.submittedAt || b.createdAt);

//       switch (sortBy) {
//         case "newest": return dateB - dateA;
//         case "oldest": return dateA - dateB;
//         case "name": return (a.user?.nickname || "").localeCompare(b.user?.nickname || "");
//         default: return 0;
//       }
//     });
//   }, [pendingVerifications, searchTerm, statusFilter, sortBy]);
  
//   const totalPages = Math.ceil(processedData.length / itemsPerPage);
//   const currentItems = processedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // --- Handlers ---
//   // const handleApprove = (userId) => {
//   //   dispatch(verifyUserProfile({ userId, action: "approve" })).then(() => {
//   //     setTimeout(() => dispatch(fetchPendingVerifications()), 100000000);
//   //     toast.success("KYC Approved!");
//   //   });
//   // };
//   // const handleReject = (userId) => {
//   //   if (!reason.trim()) return;
//   //   dispatch(verifyUserProfile({ userId, action: "reject", reason: reason.trim() }))
//   //     .then(() => {
//   //       setReason("");
//   //       setExpandedRow(null);
//   //       setTimeout(() => dispatch(fetchPendingVerifications()), 100000000);
//   //       toast.success("KYC Rejected!");
//   //     });
//   // };


//   const handleApprove = (userId) => {
//   dispatch(verifyUserProfile({ userId, action: "approve" })).then(() => {
//     toast.success("KYC Approved");
    
//   });
// };

// const handleReject = (userId) => {
//   if (!reason.trim()) return toast.error("Reason required");
//   dispatch(verifyUserProfile({ userId, action: "reject", reason: reason.trim() })).then(() => {
//     setReason("");
//      setExpandedRow(null);
//     toast.success("KYC Rejected");
//     // Fetch ko yahan bhi block kar do agar turant data mil raha hai
//   });
// };



//   const toggleRowExpansion = (userId) => {
//     setExpandedRow(expandedRow === userId ? null : userId);
//     setReason("");
//   };

//   if (loading && !pendingVerifications) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-[1800px] mx-auto space-y-6">
        
//         {/* Header */}
//         <div className="flex justify-between items-end">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">KYC Verifications</h1>
//             <p className="text-sm text-gray-500">Manage user identity documents</p>
//           </div>
//           <Badge variant="secondary" className="h-6">
//             Total: {processedData.length}
//           </Badge>
//         </div>

//         {/* Filters Bar */}
//         <Card className="p-4 border-gray-200 shadow-sm bg-white">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search */}
//             <div className="relative md:col-span-2">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search by name, phone, email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 border-gray-300"
//               />
//             </div>

//             {/* Status Filter */}
//             <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); dispatch(fetchPendingVerifications(val));setCurrentPage(1); }}>
              
//               <SelectTrigger>
//                 <Filter className="w-4 h-4 mr-2 text-gray-400" />
//                 <SelectValue placeholder="Filter Status" />
//               </SelectTrigger>
//               <SelectContent>
//                   <SelectItem value="pending">Initial / Pending</SelectItem>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="approved">Approved</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Sort */}
//             <Select value={sortBy} onValueChange={setSortBy}>
          
//             </Select>
//           </div>
//         </Card>

//         {/* Messages */}
//         {successMessage && <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4"/> {successMessage}</div>}
//         {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 text-sm"><AlertCircle className="w-4 h-4"/> {error}</div>}

//         {/* Main Table */}
//         <Card className="border-gray-200 overflow-hidden shadow-none">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">User</th>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">Contact</th>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">Submitted At</th>
//                   <th className="px-6 py-4 text-left font-semibold text-gray-700">Documents</th>
//                   <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {currentItems.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="py-20 text-center text-gray-500">
//                       <ShieldCheck className="w-12 h-12 mx-auto text-gray-200 mb-2" />
//                       No records found matching your filters.
//                     </td>
//                   </tr>
//                 ) : (
//                   currentItems.map((item) => (
//                     <React.Fragment key={item._id}>
//                       <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === item.userId ? "bg-blue-50/30" : ""}`}>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={item.verification?.selfieUrl || "/api/placeholder/40/40"}
//                               className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:opacity-80"
//                               alt="Selfie"
//                               onClick={() => setImageModal({ open: true, src: item.verification?.selfieUrl, title: "User Selfie" })}
//                             />
//                             <div>
//                               <p className="font-bold text-gray-900">{item.nickname || "N/A"}</p>
//                               <p className="text-xs text-gray-500 truncate w-32">{item.user?.phone}</p>
//                             </div>
//                           </div>
//                         </td>
//                           <td className="px-6 py-4">
//                           <Badge>
//                             {item.user?.phone}
//                           </Badge>
//                         </td>
//                           <td className="px-6 py-4">
//                           <Badge>
//                             {item.user?.email}
//                           </Badge>
//                         </td>
//                         <td className="px-6 py-4">
//                           <Badge variant={item.verification?.status === 'approved' ? 'success' : item.verification?.status === 'rejected' ? 'destructive' : 'outline'}>
//                             {item.verification?.status || 'pending'}
//                           </Badge>
//                         </td>
//                         <td className="px-6 py-4 text-gray-600">
//                           {new Date(item.verification?.submittedAt || item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex gap-2">
//                             <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setImageModal({ open: true, src: item.verification?.docUrl, title: "ID Document" })}>
//                               <FileText className="w-4 h-4" />
//                             </Button>
//                             <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setImageModal({ open: true, src: item.verification?.selfieUrl, title: "Selfie" })}>
//                               <Camera className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <div className="flex justify-end gap-2">
//                             <Button
//                               size="sm"
//                               disabled={loading || item.verification?.status === 'approved'}
//                               onClick={() => handleApprove(item.userId)}
//                               className="bg-black hover:bg-gray-800 text-white"
//                             >
//                               <CheckCircle className="w-4 h-4 mr-1" /> Approve
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               disabled={loading || item.verification?.status === 'rejected'}
//                               onClick={() => toggleRowExpansion(item.userId)}
//                             >
//                               <XCircle className="w-4 h-4 mr-1" /> {expandedRow === item.userId ? "Close" : "Reject"}
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>

//                       {/* Expanded Rejection Row */}
//                       {expandedRow === item.userId && (
//                         <tr className="bg-gray-50">
//                           <td colSpan={5} className="px-6 py-6 border-l-4 border-red-500">
//                             <div className="max-w-2xl space-y-3">
//                               <label className="text-sm font-semibold flex items-center gap-2">
//                                 <AlertCircle className="w-4 h-4 text-red-500" />
//                                 Specify Rejection Reason
//                               </label>
//                               <Textarea
//                                 placeholder="E.g. Blurred image, ID expired, name mismatch..."
//                                 value={reason}
//                                 onChange={(e) => setReason(e.target.value)}
//                                 className="bg-white"
//                               />
//                               <div className="flex justify-end gap-2">
//                                 <Button variant="ghost" size="sm" onClick={() => setExpandedRow(null)}>Cancel</Button>
//                                 <Button 
//                                   size="sm" 
//                                   variant="destructive" 
//                                   disabled={!reason.trim() || loading}
//                                   onClick={() => handleReject(item.userId)}
//                                 >
//                                   {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//                                   Confirm Rejection
//                                 </Button>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Footer */}
//           {totalPages > 1 && (
//             <div className="p-4 border-t flex items-center justify-between bg-white">
//               <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
//               <div className="flex gap-2">
//                 <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
//                   <ChevronLeft className="w-4 h-4" />
//                 </Button>
//                 <Button size="sm" variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </Card>
//       </div>

//       {/* Modern Image Modal */}
//       {imageModal.open && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setImageModal({ open: false, src: "", title: "" })}>
//           <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
//             <div className="p-4 border-b flex justify-between items-center bg-gray-50">
//               <h3 className="font-bold text-gray-800">{imageModal.title}</h3>
//               <Button size="icon" variant="ghost" onClick={() => setImageModal({ open: false, src: "", title: "" })}>
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
//             <div className="p-2 flex justify-center bg-gray-200/50">
//               <img src={imageModal.src} alt="Preview" className="max-h-[75vh] object-contain rounded-lg" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingVerifications,
  verifyUserProfile,
} from "../store/user.slice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
  ShieldCheck,
  Clock,
  User,
  Phone,
  FileText,
  Camera,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  X,
  Search,
  Mail,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Filter,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

export default function PendingVerifications() {
  const dispatch = useDispatch();
  const { pendingVerifications, loading, error, successMessage } = useSelector(
    (state) => state.users
  );

  const [reason, setReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [itemsPerPage] = useState(15);
  const [imageModal, setImageModal] = useState({ open: false, src: "", title: "" });

  useEffect(() => {
    dispatch(fetchPendingVerifications());
    setStatusFilter("pending");
  }, [dispatch]);

  const processedData = useMemo(() => {
    if (!pendingVerifications) return [];

    let filtered = pendingVerifications.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        item.nickname?.toLowerCase().includes(searchLower) ||
        item.user?.phone?.includes(searchTerm) ||
        item.user?.email?.toLowerCase().includes(searchLower);

      const currentStatus = (item.verification?.status || item.kycStatus || "pending").toLowerCase();
      const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.verification?.submittedAt || a.createdAt);
      const dateB = new Date(b.verification?.submittedAt || b.createdAt);

      switch (sortBy) {
        case "newest": return dateB - dateA;
        case "oldest": return dateA - dateB;
        case "name": return (a.user?.nickname || "").localeCompare(b.user?.nickname || "");
        default: return 0;
      }
    });
  }, [pendingVerifications, searchTerm, statusFilter, sortBy]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentItems = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (userId) => {
    dispatch(verifyUserProfile({ userId, action: "approve" })).then(() => {
      toast.success("KYC Approved");
    });
  };

  const handleReject = (userId) => {
    if (!reason.trim()) return toast.error("Reason required");
    dispatch(verifyUserProfile({ userId, action: "reject", reason: reason.trim() })).then(() => {
      setReason("");
      setExpandedRow(null);
      toast.success("KYC Rejected");
    });
  };

  const toggleRowExpansion = (userId) => {
    setExpandedRow(expandedRow === userId ? null : userId);
    setReason("");
  };

  const getStatusBadgeStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border border-amber-200";
    }
  };

  if (loading && !pendingVerifications) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="relative animate-in fade-in zoom-in-50 duration-700">
          <Loader2 className="w-10 h-10 animate-spin text-gray-900" />
          <div className="absolute inset-0 w-10 h-10 border-2 border-gray-200 rounded-full animate-ping" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header - Animated */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg shadow-gray-900/20 animate-in zoom-in-50 duration-500">
              <ShieldCheck className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                KYC Verifications
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage user identity documents
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="h-8 px-4 bg-gray-900 text-white border border-gray-800 animate-in fade-in zoom-in-50 duration-500">
            Total: {processedData.length}
          </Badge>
        </div>

        {/* Filters Bar - Animated */}
        <Card className="p-4 border-0 shadow-lg shadow-gray-200/50 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-xl transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '100ms' }}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors" />
              <Input
                placeholder="Search by name, phone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 bg-white focus:border-gray-400 focus:ring-gray-200 transition-all duration-200 hover:border-gray-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 animate-in fade-in zoom-in-50 duration-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '150ms' }}>
              <Select 
                value={statusFilter} 
                onValueChange={(val) => { 
                  setStatusFilter(val); 
                  dispatch(fetchPendingVerifications(val));
                  setCurrentPage(1); 
                }}
              >
                <SelectTrigger className="border-gray-200 bg-white focus:border-gray-400 focus:ring-gray-200 transition-all duration-200 hover:border-gray-300">
                  <Filter className="w-4 h-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Pending
                    </span>
                  </SelectItem>
                  <SelectItem value="all">
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-gray-500" />
                      All Status
                    </span>
                  </SelectItem>
                  <SelectItem value="approved">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      Approved
                    </span>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <span className="flex items-center gap-2">
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      Rejected
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="animate-in fade-in slide-in-from-right-2 duration-500" style={{ animationDelay: '200ms' }}>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-gray-200 bg-white focus:border-gray-400 focus:ring-gray-200 transition-all duration-200 hover:border-gray-300">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  {/* <SelectItem value="name">Name (A-Z)</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Messages - Animated */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center gap-3 text-sm shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle className="w-5 h-5 flex-shrink-0 animate-bounce" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3 text-sm shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Main Table - Animated */}
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-xl transition-shadow" style={{ animationDelay: '200ms' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">User</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Submitted</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Documents</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-50 duration-700">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 animate-bounce">
                          <ShieldCheck className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="mt-4 font-medium text-gray-600">No records found</p>
                        <p className="mt-1 text-xs text-gray-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <tr 
                        className={`transition-all duration-200 hover:bg-gray-50/80 hover:shadow-sm animate-in fade-in slide-in-from-bottom-1 ${
                          expandedRow === item.userId ? "bg-blue-50/30 shadow-sm" : ""
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 group">
                            <img
                              src={item.verification?.selfieUrl || "/api/placeholder/40/40"}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 cursor-pointer transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:shadow-md"
                              alt="Selfie"
                              onClick={() => setImageModal({ open: true, src: item.verification?.selfieUrl, title: "User Selfie" })}
                            />
                            <div>
                              <p className="font-bold text-gray-900 transition-colors duration-200 group-hover:text-gray-700">
                                {item.nickname || "N/A"}
                              </p>
                              <p className="text-xs text-gray-500 truncate w-32">
                                {item.user?.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-gray-100 text-gray-700 border border-gray-200 transition-all duration-200 hover:bg-gray-200 hover:scale-105">
                            <Phone className="w-3 h-3 mr-1" />
                            {item.user?.phone}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-gray-100 text-gray-700 border border-gray-200 transition-all duration-200 hover:bg-gray-200 hover:scale-105">
                            <Mail className="w-3 h-3 mr-1" />
                            {item.user?.email}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${getStatusBadgeStyles(item.verification?.status)} transition-all duration-200 hover:scale-105`}>
                            {item.verification?.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {item.verification?.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                            {!item.verification?.status && <Clock className="w-3 h-3 mr-1 animate-pulse" />}
                            {item.verification?.status || 'pending'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {new Date(item.verification?.submittedAt || item.createdAt).toLocaleDateString('en-IN', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 hover:scale-110" 
                              onClick={() => setImageModal({ open: true, src: item.verification?.docUrl, title: "ID Document" })}
                            >
                              <FileText className="w-4 h-4 text-gray-600" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-8 w-8 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 hover:scale-110" 
                              onClick={() => setImageModal({ open: true, src: item.verification?.selfieUrl, title: "Selfie" })}
                            >
                              <Camera className="w-4 h-4 text-gray-600" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              disabled={loading || item.verification?.status === 'approved'}
                              onClick={() => handleApprove(item.userId)}
                              className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={loading || item.verification?.status === 'rejected'}
                              onClick={() => toggleRowExpansion(item.userId)}
                              className="border-gray-300 hover:bg-gray-100 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              <XCircle className="w-4 h-4 mr-1" /> 
                              {expandedRow === item.userId ? "Close" : "Reject"}
                            </Button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Rejection Row */}
                      {expandedRow === item.userId && (
                        <tr className="bg-gradient-to-r from-red-50 to-white animate-in fade-in slide-in-from-top-2 duration-300">
                          <td colSpan={7} className="px-6 py-6 border-l-4 border-red-500">
                            <div className="max-w-2xl space-y-3">
                              <label className="text-sm font-semibold flex items-center gap-2 text-gray-900">
                                <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                                Specify Rejection Reason
                              </label>
                              <Textarea
                                placeholder="E.g. Blurred image, ID expired, name mismatch..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="bg-white border-gray-300 focus:border-red-400 focus:ring-red-200 transition-all duration-200"
                              />
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setExpandedRow(null)}
                                  className="transition-all duration-200 hover:scale-105"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm" 
                                  disabled={!reason.trim() || loading}
                                  onClick={() => handleReject(item.userId)}
                                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-200 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                  Confirm Rejection
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <p className="text-xs text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="border-gray-300 hover:bg-gray-100 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="border-gray-300 hover:bg-gray-100 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Modern Image Modal */}
      {imageModal.open && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300" 
          onClick={() => setImageModal({ open: false, src: "", title: "" })}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" 
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-bold text-gray-900">{imageModal.title}</h3>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setImageModal({ open: false, src: "", title: "" })}
                className="transition-all duration-200 hover:scale-110 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-2 flex justify-center bg-gray-100">
              <img 
                src={imageModal.src} 
                alt="Preview" 
                className="max-h-[75vh] object-contain rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}