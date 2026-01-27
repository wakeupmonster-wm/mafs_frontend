// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   createSupportTicket,
//   fetchMyTickets,
//   fetchTicketById,
//   adminReplyToTicket,
//   clearSupportStatus,
// } from "../store/support.slice";

// export function ContactSupportPage() {
//   const dispatch = useDispatch();
//   const { loading, error, successMessage } = useSelector(
//     (s) => s.support
//   );

//   const [form, setForm] = useState({
//     category: "General",
//     subject: "",
//     message: "",
//   });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createSupportTicket(form)).then(() => {
//       setForm({
//         category: "General",
//         subject: "",
//         message: "",
//       });
//       setTimeout(
//         () => dispatch(clearSupportStatus()),
//         2500
//       );
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <Card className="p-6">
//         <div className="flex items-center justify-between mb-1">
//           <h2 className="text-xl font-semibold">
//             Contact Support
//           </h2>
//           <Badge variant="outline">Help Desk</Badge>
//         </div>

//         <p className="text-sm text-muted-foreground mb-6">
//           Create a support ticket for technical,
//           billing or operational issues.
//         </p>

//         <form
//           onSubmit={onSubmit}
//           className="grid gap-4"
//         >
//           <Input
//             placeholder="Category (Technical / Billing / General)"
//             value={form.category}
//             onChange={(e) =>
//               setForm((p) => ({
//                 ...p,
//                 category: e.target.value,
//               }))
//             }
//           />

//           <Input
//             placeholder="Subject"
//             value={form.subject}
//             onChange={(e) =>
//               setForm((p) => ({
//                 ...p,
//                 subject: e.target.value,
//               }))
//             }
//           />

//           <Textarea
//             rows={5}
//             placeholder="Describe your issue in detail"
//             value={form.message}
//             onChange={(e) =>
//               setForm((p) => ({
//                 ...p,
//                 message: e.target.value,
//               }))
//             }
//           />

//           <div className="flex flex-wrap items-center gap-3">
//             <Button type="submit" disabled={loading}>
//               {loading
//                 ? "Submitting..."
//                 : "Submit Ticket"}
//             </Button>

//             {error && (
//               <span className="text-sm text-red-500">
//                 {error}
//               </span>
//             )}

//             {successMessage && (
//               <span className="text-sm text-green-600">
//                 {successMessage}
//               </span>
//             )}
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// export function MyTicketsPage() {
//   const dispatch = useDispatch();
//   const { tickets, loading, error } = useSelector(
//     (s) => s.support
//   );

//   useEffect(() => {
//     dispatch(fetchMyTickets());
//   }, [dispatch]);

//   return (
//     <div className="max-w-5xl mx-auto p-4 space-y-8">
//       <div>
//         <h2 className="text-xl font-semibold">
//           My Support Tickets
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           View and track all submitted tickets
//         </p>
//       </div>
//       <Card className="p-0 overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-muted">
//             <tr>
//               <th className="p-3 text-left">
//                 Subject
//               </th>
//               <th className="p-3 text-left">
//                 Category
//               </th>
//               <th className="p-3 text-left">
//                 Status
//               </th>
//               <th className="p-3 text-right">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="p-4 text-center"
//                 >
//                   Loading...
//                 </td>
//               </tr>
//             )}

//             {tickets?.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="p-4 text-center text-muted-foreground"
//                 >
//                   No tickets found
//                 </td>
//               </tr>
//             )}

//             {tickets?.map((t) => (
//               <tr
//                 key={t._id}
//                 className="border-t hover:bg-muted/50"
//               >
//                 <td className="p-3 font-medium">
//                   {t.subject}
//                 </td>
//                 <td className="p-3">
//                   {t.category}
//                 </td>
//                 <td className="p-3">
//                   <Badge
//                     variant={
//                       t.status === "RESOLVED"
//                         ? "success"
//                         : "warning"
//                     }
//                   >
//                     {t.status}
//                   </Badge>
//                 </td>
//                 <td className="p-3 text-right">
//                   <a
//                     href={`/admin/management/support/ticket/${t._id}`}
//                     className="text-blue-600 text-sm hover:underline"
//                   >
//                     View
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>

//       {error && (
//         <p className="text-red-500 text-sm">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// /* ======================================================
//    3️⃣ TICKET DETAIL PAGE (CLEAN ADMIN VIEW)
// ====================================================== */
// export function TicketDetailPage({ ticketId }) {
//   const dispatch = useDispatch();
//   const {
//     selectedTicket,
//     loading,
//     error,
//     successMessage,
//   } = useSelector((s) => s.support);

//   const [reply, setReply] = useState("");
//   const [status, setStatus] = useState("OPEN");

//   useEffect(() => {
//     if (ticketId) {
//       dispatch(fetchTicketById(ticketId));
//     }
//   }, [dispatch, ticketId]);

//   const ticket = selectedTicket;

//   const onReply = (e) => {
//     e.preventDefault();
//     dispatch(
//       adminReplyToTicket({
//         ticketId,
//         reply,
//         status,
//       })
//     ).then(() => {
//       setReply("");
//       setTimeout(
//         () => dispatch(clearSupportStatus()),
//         2000
//       );
//     });
//   };

//   if (loading && !ticket)
//     return <div>Loading...</div>;
//   if (error)
//     return (
//       <div className="text-red-500">{error}</div>
//     );
//   if (!ticket)
//     return <div>Ticket not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-4">
//       <Card className="p-6 space-y-3">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">
//             {ticket.subject}
//           </h2>
//           <Badge
//             variant={
//               ticket.status === "RESOLVED"
//                 ? "success"
//                 : "warning"
//             }
//           >
//             {ticket.status}
//           </Badge>
//         </div>

//         <p className="text-sm text-muted-foreground">
//           Category: {ticket.category}
//         </p>

//         <div className="border-t pt-3">
//           <p className="whitespace-pre-wrap">
//             {ticket.message}
//           </p>
//         </div>

//         {ticket.adminReply && (
//           <div className="border-t pt-3 bg-muted/30 p-3 rounded">
//             <p className="font-medium mb-1">
//               Admin Reply
//             </p>
//             <p>{ticket.adminReply}</p>
//           </div>
//         )}
//       </Card>

//       <Card className="p-6">
//         <h3 className="font-medium mb-3">
//           Reply to Ticket
//         </h3>

//         <form onSubmit={onReply} className="grid gap-3">
//           <Textarea
//             rows={4}
//             value={reply}
//             onChange={(e) =>
//               setReply(e.target.value)
//             }
//             placeholder="Type your reply..."
//           />

//           <Input
//             value={status}
//             onChange={(e) =>
//               setStatus(e.target.value)
//             }
//             placeholder="Status (OPEN / RESOLVED)"
//           />

//           <div className="flex items-center gap-3">
//             <Button type="submit" disabled={loading}>
//               {loading
//                 ? "Sending..."
//                 : "Send Reply"}
//             </Button>

//             {successMessage && (
//               <span className="text-green-600 text-sm">
//                 {successMessage}
//               </span>
//             )}
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

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

export function MyTicketsPage() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((s) => s.support);
  console.log(tickets, "tickest");
  useEffect(() => {
    dispatch(fetchMyTickets());
  }, [dispatch]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="w-3 h-3" />;
      case "open":
        return <Clock className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gray-900 rounded-xl">
              <Inbox className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                My Support Tickets
              </h1>
              <p className="text-sm text-gray-500">
                View and track all submitted tickets
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <Card className="border-0 shadow-sm bg-white overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
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
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                        <span className="text-sm text-gray-500">
                          Loading tickets...
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && tickets?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <Ticket className="w-6 h-6 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-500">
                          No tickets found
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {tickets?.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {t.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`${getStatusStyle(t.status)} gap-1.5`}
                      >
                        {getStatusIcon(t.status)}
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/admin/management/support/ticket/${t._id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {loading && (
            <Card className="border-0 shadow-sm bg-white p-6">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                <span className="text-sm text-gray-500">
                  Loading tickets...
                </span>
              </div>
            </Card>
          )}

          {!loading && tickets?.length === 0 && (
            <Card className="border-0 shadow-sm bg-white p-6">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Ticket className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-sm text-gray-500">No tickets found</span>
              </div>
            </Card>
          )}

          {tickets?.map((t) => (
            <Card key={t._id} className="border-0 shadow-sm bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {t.subject}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{t.category}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusStyle(t.status)} gap-1 flex-shrink-0`}
                >
                  {getStatusIcon(t.status)}
                  {t.status}
                </Badge>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a
                  href={`/admin/management/support/ticket/${t._id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </a>
              </div>
            </Card>
          ))}
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TicketDetailPage({ ticketId }) {
  const dispatch = useDispatch();
  const { selectedTicket, loading, error, successMessage } = useSelector(
    (s) => s.support
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
      })
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
