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
} from "lucide-react";
import { toast } from "sonner";

export default function PendingVerifications() {
  const dispatch = useDispatch();
  const { pendingVerifications, loading, error, successMessage } = useSelector(
    (state) => state.users
  );

  // States
  const [reason, setReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all"); // Filters: all, approved, rejected, pending
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [itemsPerPage] = useState(15);
  const [imageModal, setImageModal] = useState({ open: false, src: "", title: "" });

  // useEffect(() => {
  //   dispatch(fetchPendingVerifications());
  // }, [dispatch]);

  useEffect(() => {
  dispatch(fetchPendingVerifications());
  // Default filter humesha pending ya all rakho jo tum chahte ho
  setStatusFilter("pending"); 
}, [dispatch]);

  // const processedData = useMemo(() => {
  //   if (!pendingVerifications) return [];

  //   let filtered = pendingVerifications.filter((item) => {
  //     const searchLower = searchTerm.toLowerCase();
  //     const matchesSearch =
  //       item.nickname?.toLowerCase().includes(searchLower) ||
  //       item.user?.phone?.includes(searchTerm) ||
  //       item.user?.email?.toLowerCase().includes(searchLower);

  //     const currentStatus = item.verification?.status?.toLowerCase() || "pending";
  //     const matchesStatus = statusFilter === "all" || currentStatus === statusFilter;

  //     return matchesSearch && matchesStatus;
  //   });

  //   return filtered.sort((a, b) => {
  //     const dateA = new Date(a.verification?.submittedAt || a.createdAt);
  //     const dateB = new Date(b.verification?.submittedAt || b.createdAt);

  //     switch (sortBy) {
  //       case "newest": return dateB - dateA;
  //       case "oldest": return dateA - dateB;
  //       case "name": return (a.user?.nickname || "").localeCompare(b.user?.nickname || "");
  //       default: return 0;
  //     }
  //   });
  // }, [pendingVerifications, searchTerm, statusFilter, sortBy]);




  const processedData = useMemo(() => {
  if (!pendingVerifications) return [];

  let filtered = pendingVerifications.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.nickname?.toLowerCase().includes(searchLower) ||
      item.user?.phone?.includes(searchTerm) ||
      item.user?.email?.toLowerCase().includes(searchLower);

    // FIX YAHAN HAI: statusFilter ko logic mein sabse pehle check karo
    const currentStatus = (item.verification?.status || item.kycStatus || "pending").toLowerCase();
    
    // Agar statusFilter "all" hai, toh matchesStatus humesha true hoga
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

  // --- Handlers ---
  // const handleApprove = (userId) => {
  //   dispatch(verifyUserProfile({ userId, action: "approve" })).then(() => {
  //     setTimeout(() => dispatch(fetchPendingVerifications()), 100000000);
  //     toast.success("KYC Approved!");
  //   });
  // };
  // const handleReject = (userId) => {
  //   if (!reason.trim()) return;
  //   dispatch(verifyUserProfile({ userId, action: "reject", reason: reason.trim() }))
  //     .then(() => {
  //       setReason("");
  //       setExpandedRow(null);
  //       setTimeout(() => dispatch(fetchPendingVerifications()), 100000000);
  //       toast.success("KYC Rejected!");
  //     });
  // };


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
    // Fetch ko yahan bhi block kar do agar turant data mil raha hai
  });
};



  const toggleRowExpansion = (userId) => {
    setExpandedRow(expandedRow === userId ? null : userId);
    setReason("");
  };

  if (loading && !pendingVerifications) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KYC Verifications</h1>
            <p className="text-sm text-gray-500">Manage user identity documents</p>
          </div>
          <Badge variant="secondary" className="h-6">
            Total: {processedData.length}
          </Badge>
        </div>

        {/* Filters Bar */}
        <Card className="p-4 border-gray-200 shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, phone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); dispatch(fetchPendingVerifications(val));setCurrentPage(1); }}>
              
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="pending">Initial / Pending</SelectItem>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
          
            </Select>
          </div>
        </Card>

        {/* Messages */}
        {successMessage && <div className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4"/> {successMessage}</div>}
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 text-sm"><AlertCircle className="w-4 h-4"/> {error}</div>}

        {/* Main Table */}
        <Card className="border-gray-200 overflow-hidden shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">User</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Submitted At</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Documents</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-500">
                      <ShieldCheck className="w-12 h-12 mx-auto text-gray-200 mb-2" />
                      No records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <React.Fragment key={item._id}>
                      <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === item.userId ? "bg-blue-50/30" : ""}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.verification?.selfieUrl || "/api/placeholder/40/40"}
                              className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:opacity-80"
                              alt="Selfie"
                              onClick={() => setImageModal({ open: true, src: item.verification?.selfieUrl, title: "User Selfie" })}
                            />
                            <div>
                              <p className="font-bold text-gray-900">{item.nickname || "N/A"}</p>
                              <p className="text-xs text-gray-500 truncate w-32">{item.user?.phone}</p>
                            </div>
                          </div>
                        </td>
                          <td className="px-6 py-4">
                          <Badge>
                            {item.user?.phone}
                          </Badge>
                        </td>
                          <td className="px-6 py-4">
                          <Badge>
                            {item.user?.email}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={item.verification?.status === 'approved' ? 'success' : item.verification?.status === 'rejected' ? 'destructive' : 'outline'}>
                            {item.verification?.status || 'pending'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(item.verification?.submittedAt || item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setImageModal({ open: true, src: item.verification?.docUrl, title: "ID Document" })}>
                              <FileText className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setImageModal({ open: true, src: item.verification?.selfieUrl, title: "Selfie" })}>
                              <Camera className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              disabled={loading || item.verification?.status === 'approved'}
                              onClick={() => handleApprove(item.userId)}
                              className="bg-black hover:bg-gray-800 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={loading || item.verification?.status === 'rejected'}
                              onClick={() => toggleRowExpansion(item.userId)}
                            >
                              <XCircle className="w-4 h-4 mr-1" /> {expandedRow === item.userId ? "Close" : "Reject"}
                            </Button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Rejection Row */}
                      {expandedRow === item.userId && (
                        <tr className="bg-gray-50">
                          <td colSpan={5} className="px-6 py-6 border-l-4 border-red-500">
                            <div className="max-w-2xl space-y-3">
                              <label className="text-sm font-semibold flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                Specify Rejection Reason
                              </label>
                              <Textarea
                                placeholder="E.g. Blurred image, ID expired, name mismatch..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="bg-white"
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setExpandedRow(null)}>Cancel</Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  disabled={!reason.trim() || loading}
                                  onClick={() => handleReject(item.userId)}
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
            <div className="p-4 border-t flex items-center justify-between bg-white">
              <p className="text-xs text-gray-500">Page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Modern Image Modal */}
      {imageModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setImageModal({ open: false, src: "", title: "" })}>
          <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">{imageModal.title}</h3>
              <Button size="icon" variant="ghost" onClick={() => setImageModal({ open: false, src: "", title: "" })}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-2 flex justify-center bg-gray-200/50">
              <img src={imageModal.src} alt="Preview" className="max-h-[75vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}