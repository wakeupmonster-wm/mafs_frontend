import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createSupportTicket,
  fetchMyTickets,
  fetchTicketById,
  adminReplyToTicket,
  clearSupportStatus,
} from "../store/support.slice";
import {
  Headphones,
  Send,
  Ticket,
  MessageSquare,
  Tag,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowLeft,
  User,
  Reply,
  Inbox,
  Loader2,
  Eye,
  Mail,
  Phone,
} from "lucide-react";

export function ContactSupportPage() {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((s) => s.support);

  const [form, setForm] = useState({
    category: "General",
    subject: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSupportTicket(form)).then(() => {
      setForm({
        category: "General",
        subject: "",
        message: "",
      });
      setTimeout(() => dispatch(clearSupportStatus()), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gray-900 rounded-xl">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Contact Support
              </h1>
              <p className="text-sm text-gray-500">We're here to help you</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-sm bg-white overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  New Support Ticket
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-white text-gray-600 border-gray-200"
              >
                Help Desk
              </Badge>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="p-6 space-y-5">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                Category
              </label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((p) => ({ ...p, category: value }))
                }
              >
                <SelectTrigger className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Subject
              </label>
              <Input
                placeholder="Brief description of your issue"
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                Message
              </label>
              <Textarea
                rows={5}
                placeholder="Describe your issue in detail..."
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
              />
            </div>

            {/* Submit Section */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto h-11 px-6 bg-gray-900 hover:bg-gray-800 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {error && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-emerald-600">
                    {successMessage}
                  </span>
                </div>
              )}
            </div>
          </form>
        </Card>

        {/* Help Text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Average response time: 24-48 hours
        </p>
      </div>
    </div>
  );
}

// export function MyTicketsPage() {
//   const dispatch = useDispatch();
//   const { tickets, loading, error } = useSelector((s) => s.support);
//   console.log(tickets, "tickest");
//   useEffect(() => {
//     dispatch(fetchMyTickets());
//   }, [dispatch]);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "resolved":
//         return "bg-emerald-50 text-emerald-700 border-emerald-200";
//       case "open":
//         return "bg-amber-50 text-amber-700 border-amber-200";
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "resolved":
//         return <CheckCircle2 className="w-3 h-3" />;
//       case "open":
//         return <Clock className="w-3 h-3" />;
//       default:
//         return <AlertCircle className="w-3 h-3" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2.5 bg-gray-900 rounded-xl">
//               <Inbox className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
//                 My Support Tickets
//               </h1>
//               <p className="text-sm text-gray-500">
//                 View and track all submitted tickets
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Desktop Table */}
//         <Card className="border-0 shadow-sm bg-white overflow-hidden hidden md:block">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100">
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Subject
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {loading && (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center gap-3">
//                         <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
//                         <span className="text-sm text-gray-500">
//                           Loading tickets...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {!loading && tickets?.length === 0 && (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="p-3 bg-gray-100 rounded-full">
//                           <Ticket className="w-6 h-6 text-gray-400" />
//                         </div>
//                         <span className="text-sm text-gray-500">
//                           No tickets found
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {tickets?.map((t) => (
//                   <tr
//                     key={t._id}
//                     className="hover:bg-gray-50/50 transition-colors"
//                   >
//                     <td className="px-6 py-4">
//                       <span className="font-medium text-gray-900">
//                         {t.subject}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm text-gray-600">
//                         {t.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <Badge
//                         variant="outline"
//                         className={`${getStatusStyle(t.status)} gap-1.5`}
//                       >
//                         {getStatusIcon(t.status)}
//                         {t.status}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <a
//                         href={`/admin/management/support/ticket/${t._id}`}
//                         className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//                       >
//                         <Eye className="w-4 h-4" />
//                         View
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>

//         {/* Mobile Cards */}
//         <div className="md:hidden space-y-3">
//           {loading && (
//             <Card className="border-0 shadow-sm bg-white p-6">
//               <div className="flex flex-col items-center gap-3">
//                 <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
//                 <span className="text-sm text-gray-500">
//                   Loading tickets...
//                 </span>
//               </div>
//             </Card>
//           )}

//           {!loading && tickets?.length === 0 && (
//             <Card className="border-0 shadow-sm bg-white p-6">
//               <div className="flex flex-col items-center gap-3">
//                 <div className="p-3 bg-gray-100 rounded-full">
//                   <Ticket className="w-6 h-6 text-gray-400" />
//                 </div>
//                 <span className="text-sm text-gray-500">No tickets found</span>
//               </div>
//             </Card>
//           )}

//           {tickets?.map((t) => (
//             <Card key={t._id} className="border-0 shadow-sm bg-white p-4">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-medium text-gray-900 truncate">
//                     {t.subject}
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">{t.category}</p>
//                 </div>
//                 <Badge
//                   variant="outline"
//                   className={`${getStatusStyle(t.status)} gap-1 flex-shrink-0`}
//                 >
//                   {getStatusIcon(t.status)}
//                   {t.status}
//                 </Badge>
//               </div>
//               <div className="mt-4 pt-3 border-t border-gray-100">
//                 <a
//                   href={`/admin/management/support/ticket/${t._id}`}
//                   className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View Details
//                 </a>
//               </div>
//             </Card>
//           ))}
//         </div>

//         {error && (
//           <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
//             <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
//             <span className="text-sm text-red-600">{error}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { Search, Filter } from "lucide-react";

// export function MyTicketsPage() {
//   const dispatch = useDispatch();
//   // eslint-disable-next-line no-unused-vars
//   const { tickets, loading, error } = useSelector((s) => s.support);

//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [imageModal, setImageModal] = useState({
//       open: false,
//       src: "",
//       title: "",
//     });

//   // Initial Fetch & Filter Fetch
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       dispatch(fetchMyTickets({ status: statusFilter, search: searchTerm }));
//     }, 300); // Debounce typing to save API calls
//     return () => clearTimeout(delayDebounce);
//   }, [dispatch, statusFilter, searchTerm]);

//   const getStatusStyle = (status) => {
//     const styles = {
//       resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       open: "bg-amber-50 text-amber-700 border-amber-200",
//       in_progress: "bg-blue-50 text-blue-700 border-blue-200",
//       closed: "bg-gray-100 text-gray-700 border-gray-300",
//     };
//     return styles[status] || styles.open;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-gray-900 rounded-xl shadow-lg shadow-gray-200">
//               <Inbox className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 tracking-tight">
//                 Support Management
//               </h1>
//               <p className="text-xs text-gray-500">
//                 Track and manage customer queries
//               </p>
//             </div>
//           </div>
//           <Badge variant="secondary" className="w-fit">
//             {tickets?.length} Total Tickets
//           </Badge>
//         </div>

//         {/* Filters Bar */}
//         <Card className="p-3 border-gray-200 shadow-sm bg-white grid grid-cols-1 md:grid-cols-3 gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <Input
//               placeholder="Search by subject..."
//               className="pl-9 h-10 text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="h-10 text-sm">
//               <div className="flex items-center gap-2">
//                 <Filter className="w-4 h-4 text-gray-400" />
//                 <SelectValue placeholder="Filter by Status" />
//               </div>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Status</SelectItem>
//               <SelectItem value="open">Open</SelectItem>
//               <SelectItem value="in_progress">In Progress</SelectItem>
//               <SelectItem value="resolved">Resolved</SelectItem>
//               <SelectItem value="closed">Closed</SelectItem>
//             </SelectContent>
//           </Select>
//         </Card>

//         {/* Desktop Table View */}
//         <Card className="border-gray-200 shadow-sm overflow-hidden hidden md:block">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-100">
//               <tr className="text-gray-500 font-medium">
//                 <th className="px-6 py-4 text-left">Ticket Details</th>
//                 <th className="px-6 py-4 text-left">Contact</th>
//                 <th className="px-6 py-4 text-left">Email</th>
//                 <th className="px-6 py-4 text-left">Subject</th>
//                 <th className="px-6 py-4 text-left">Category</th>
//                 <th className="px-6 py-4 text-left">Status</th>
//                 <th className="px-6 py-4 text-left">Created At</th>
//                 <th className="px-6 py-4 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="py-20 text-center">
//                     <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
//                   </td>
//                 </tr>
//               ) : tickets?.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="py-20 text-center text-gray-500">
//                     No tickets found.
//                   </td>
//                 </tr>
//               ) : (
//                 tickets.map((t) => (
//                   <tr
//                     key={t._id}
//                     className="hover:bg-gray-50/80 transition-colors"
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         {/* User Image/Avatar */}
//                         <div className="h-9 w-9 rounded-full bg-gray-100 overflow-hidden border">
//                           {/* <img
//                             src={t.user?.avatar}
//                             alt="User"
//                             className="h-full w-full object-cover"
//                           /> */}
//                             <img
//                              src={t.user?.avatar}
//                             alt="Selfie"
//                             onClick={() =>
//                               setImageModal({
//                                 open: true,
//                                 src: t.user?.avatar,
//                                 title: "User Selfie",
//                               })
//                             }
//                             className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition"
//                           />
//                         </div>

//                         <div className="flex flex-col">
//                           <span className="font-bold text-gray-900 text-xs">
//                             {t.user?.nickname || "No Nickname"}
//                           </span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="flex items-center gap-1">
//                         <Phone className="w-2.5 h-2.5" /> {t.user?.phone}
//                       </span>
//                     </td>
//                     <td className="px-2 py-4">
//                       <span className="flex items-center gap-1">
//                         <Mail className="w-2.5 h-2.5" /> {t.user?.email}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="font-semibold text-gray-900">
//                         {t.subject}
//                       </div>
//                       <div className="text-[11px] text-gray-400 uppercase">
//                         ID: {t._id.slice(-6)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[11px] font-medium italic">
//                         #{t.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <Badge
//                         variant="outline"
//                         className={`${getStatusStyle(t.status)} font-medium capitalize`}
//                       >
//                         {t.status.replace("_", " ")}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-4 text-gray-500 text-xs">
//                       {new Date(t.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <a
//                         href={`/admin/management/support/ticket/${t._id}`}
//                         className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end gap-1"
//                       >
//                         <Eye className="w-4 h-4" /> View
//                       </a>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//            {imageModal.open && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
//             {/* Modal Box */}
//             <div className="relative bg-white rounded-xl w-full max-w-md md:max-w-lg lg:max-w-xl shadow-xl animate-in zoom-in">
//               {/* Header */}
//               <div className="flex items-center justify-between px-4 py-3 border-b">
//                 <h3 className="text-sm font-semibold text-gray-900">
//                   {imageModal.title}
//                 </h3>
//                 <button
//                   onClick={() =>
//                     setImageModal({ open: false, src: "", title: "" })
//                   }
//                   className="text-gray-500 hover:text-black"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Image */}
//               <div className="p-4 flex justify-center">
//                 <img
//                   src={imageModal.src}
//                   alt="Preview"
//                   className="max-h-[70vh] w-auto rounded-lg object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//         </Card>
         

//         {/* Mobile View remains similar but uses the same filtered data */}

//         {/* --- Mobile View (Cards) --- */}
// <div className="md:hidden space-y-4">
//   {loading ? (
//     <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" /></div>
//   ) : tickets?.length === 0 ? (
//     <div className="py-10 text-center text-gray-500 bg-white rounded-lg border">No tickets found.</div>
//   ) : (
//     tickets.map((t) => (
//       <Card key={t._id} className="p-4 border-gray-200 shadow-sm bg-white hover:border-blue-300 transition-all">
//         {/* Top Row: User Avatar & Status */}
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-full bg-gray-100 border overflow-hidden">
//               <img 
//                 src={t.user?.avatar || "/api/placeholder/40/40"} 
//                 alt="U" 
//                 className="h-full w-full object-cover" 
//               />
//             </div>
//             <div className="flex flex-col">
//               <span className="font-bold text-gray-900 text-sm">{t.user?.nickname || "No Name"}</span>
//               <span className="text-[10px] text-gray-500 uppercase font-mono italic">#{t._id.slice(-6)}</span>
//             </div>
//           </div>
//           <Badge className={`${getStatusStyle(t.status)} text-[10px] px-2 py-0 h-5`}>
//             {t.status}
//           </Badge>
//         </div>

//         {/* Middle Row: Subject & Category */}
//         <div className="space-y-1 mb-4">
//           <p className="text-xs font-semibold text-gray-800 line-clamp-1">{t.subject}</p>
//           <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
//             {t.category}
//           </span>
//         </div>

//         {/* Bottom Row: Contact Info & Action */}
//         <div className="pt-3 border-t flex items-center justify-between border-gray-100">
//           <div className="flex flex-col gap-0.5">
//              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
//                 <Mail className="w-3 h-3" /> {t.user?.email}
//              </div>
//              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
//                 <Phone className="w-3 h-3" /> {t.user?.phone}
//              </div>
//           </div>
          
//           <a 
//             href={`/admin/management/support/ticket/${t._id}`}
//             className="flex items-center gap-1 text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
//           >
//             <Eye className="w-3.5 h-3.5" /> View
//           </a>
//         </div>
//       </Card>
//     ))
//   )}
// </div>
//       </div>
//     </div>
//   );
// }





import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {  Search, Filter} from "lucide-react";
import { toast } from "sonner";

export function MyTicketsPage() {
  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((s) => s.support);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageModal, setImageModal] = useState({ open: false, src: "", title: "" });

  // --- Nayi States Dialog ke liye ---
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchMyTickets({ status: statusFilter, search: searchTerm }));
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [dispatch, statusFilter, searchTerm]);

  const handleActionSubmit = async () => {
    if (!reply.trim()) return toast.error("Please enter a reply");
    
    const res = await dispatch(adminReplyToTicket({ 
      ticketId: selectedTicket._id, 
      reply: reply, 
      status: statusUpdate 
    }));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Action updated successfully");
      setSelectedTicket(null);
      dispatch(fetchMyTickets({ status: statusFilter, search: searchTerm }));
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      open: "bg-amber-50 text-amber-700 border-amber-200",
      in_progress: "bg-blue-50 text-blue-700 border-blue-200",
      closed: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return styles[status] || styles.open;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gray-900 rounded-xl shadow-lg shadow-gray-200">
              <Inbox className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Support Management</h1>
              <p className="text-xs text-gray-500">Track and manage customer queries</p>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit">{tickets?.length} Total Tickets</Badge>
        </div>

        {/* Filters Bar */}
        <Card className="p-3 border-gray-200 shadow-sm bg-white grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by subject..."
              className="pl-9 h-10 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 text-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Filter by Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Desktop Table View */}
        <Card className="border-gray-200 shadow-sm overflow-hidden hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500 font-medium">
                <th className="px-6 py-4 text-left">Ticket Details</th>
                <th className="px-6 py-4 text-left">Contact</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Created At</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="py-20 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" /></td></tr>
              ) : tickets?.length === 0 ? (
                <tr><td colSpan={8} className="py-20 text-center text-gray-500">No tickets found.</td></tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gray-100 overflow-hidden border">
                          <img
                            src={t.user?.avatar}
                            alt="Selfie"
                            onClick={() => setImageModal({ open: true, src: t.user?.avatar, title: "User Selfie" })}
                            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition"
                          />
                        </div>
                        <span className="font-bold text-gray-900 text-xs">{t.user?.nickname || "No Nickname"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" /> {t.user?.phone}</span></td>
                    <td className="px-2 py-4"><span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {t.user?.email}</span></td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{t.subject}</div>
                      <div className="text-[11px] text-gray-400 uppercase">ID: {t._id.slice(-6)}</div>
                    </td>
                    <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[11px] font-medium italic">#{t.category}</span></td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`${getStatusStyle(t.status)} font-medium capitalize`}>{t.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => { setSelectedTicket(t); setReply(t.adminReply || ""); setStatusUpdate(t.status); }}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end gap-1 ml-auto"
                      >
                        <Eye className="w-4 h-4" /> Action
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>

        {/* --- Mobile View (Cards) --- */}
        <div className="md:hidden space-y-4">
          {loading ? (
            <div className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" /></div>
          ) : tickets?.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-white rounded-lg border">No tickets found.</div>
          ) : (
            tickets.map((t) => (
              <Card key={t._id} className="p-4 border-gray-200 shadow-sm bg-white hover:border-blue-300 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 border overflow-hidden">
                      <img src={t.user?.avatar || "/api/placeholder/40/40"} alt="U" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">{t.user?.nickname || "No Name"}</span>
                      <span className="text-[10px] text-gray-500 uppercase font-mono italic">#{t._id.slice(-6)}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusStyle(t.status)} text-[10px] px-2 py-0 h-5`}>{t.status}</Badge>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-1">{t.subject}</p>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">#{t.category}</span>
                </div>
                <div className="pt-3 border-t flex items-center justify-between border-gray-100">
                  <div className="flex flex-col gap-0.5 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {t.user?.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {t.user?.phone}</span>
                  </div>
                  <button 
                    onClick={() => { setSelectedTicket(t); setReply(t.adminReply || ""); setStatusUpdate(t.status); }}
                    className="flex items-center gap-1 text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg"
                  >
                    <Eye className="w-3.5 h-3.5" /> Action
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* --- ACTION DIALOG --- */}
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Ticket Action</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">User's Message</p>
                <p className="text-sm text-gray-700 italic">"{selectedTicket?.subject}"</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Update Status</label>
                <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Admin Reply</label>
                <Textarea 
                  placeholder="Type your reply here..." 
                  className="min-h-[100px] text-sm"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setSelectedTicket(null)}>Cancel</Button>
              <Button 
                onClick={handleActionSubmit} 
                className="bg-gray-900 text-white hover:bg-black"
                disabled={loading}
              >
                {loading ? "Updating..." : "Submit Action"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- IMAGE PREVIEW MODAL --- */}
        {imageModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative bg-white rounded-xl w-full max-w-md shadow-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">{imageModal.title}</h3>
                <button onClick={() => setImageModal({ open: false, src: "", title: "" })} className="text-gray-500">✕</button>
              </div>
              <img src={imageModal.src} alt="Preview" className="max-h-[70vh] w-full rounded-lg object-contain" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function TicketDetailPage({ ticketId }) {
  const dispatch = useDispatch();
  const { selectedTicket, loading, error, successMessage } = useSelector(
    (s) => s.support,
  );

  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("OPEN");

  useEffect(() => {
    if (ticketId) {
      dispatch(fetchTicketById(ticketId));
    }
  }, [dispatch, ticketId]);

  const ticket = selectedTicket;

  const onReply = (e) => {
    e.preventDefault();
    dispatch(
      adminReplyToTicket({
        ticketId,
        reply,
        status,
      }),
    ).then(() => {
      setReply("");
      setTimeout(() => dispatch(clearSupportStatus()), 2000);
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "open":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading && !ticket) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          <span className="text-sm text-gray-500">Loading ticket...</span>
        </div>
        
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-600">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-sm bg-white p-8 text-center">
            <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-3">
              <Ticket className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">Ticket not found</p>
          </Card>
        </div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Back Button */}
        <a
          href="/admin/management/support/tickets"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </a>

        {/* Ticket Details Card */}
        <Card className="border-0 shadow-sm bg-white overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {ticket.subject}
              </h2>
              <Badge
                variant="outline"
                className={getStatusStyle(ticket.status)}
              >
                {ticket.status === "RESOLVED" ? (
                  <CheckCircle2 className="w-3 h-3 mr-1.5" />
                ) : (
                  <Clock className="w-3 h-3 mr-1.5" />
                )}
                {ticket.status}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Category:</span>
              <Badge
                variant="outline"
                className="bg-gray-50 text-gray-600 border-gray-200"
              >
                {ticket.category}
              </Badge>
            </div>

            {/* User Message */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-gray-200 rounded-full">
                  <User className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  User Message
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {ticket.message}
              </p>
            </div>
            

            {/* Admin Reply */}
            {ticket.adminReply && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-200 rounded-full">
                    <Reply className="w-3 h-3 text-emerald-700" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">
                    Admin Reply
                  </span>
                </div>
                <p className="text-emerald-800 whitespace-pre-wrap leading-relaxed">
                  {ticket.adminReply}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Reply Form Card */}
        <Card className="border-0 shadow-sm bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Reply className="w-4 h-4 text-gray-500" />
              <h3 className="font-medium text-gray-700">Reply to Ticket</h3>
            </div>
          </div>

          <form onSubmit={onReply} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Your Reply
              </label>
              <Textarea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply to the user..."
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Update Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">OPEN</SelectItem>
                  <SelectItem value="resolved">RESOLVED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto h-11 px-6 bg-gray-900 hover:bg-gray-800 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </>
                )}
              </Button>

              {successMessage && (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMessage}
                </div>
              )}
            </div>
          </form>
        </Card>
      </div>
      
    </div>
  );
}
