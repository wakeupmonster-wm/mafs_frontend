import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchTicketById,
  adminReplyToTicket,
  clearSupportStatus,
} from "../store/support.slice";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Reply,
  Send,
  Tag,
  User,
  AlertCircle,
  Ticket as TicketIcon,
  Calendar,
  Mail,
  Archive,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PreLoader } from "@/app/loader/preloader";

// Helper for Status Styles
const STATUS_CONFIG = {
  open: { color: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  in_progress: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  resolved: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  closed: {
    color: "bg-slate-50 text-slate-700 border-slate-200",
    icon: CheckCircle2,
  },
};

export default function ViewTicketDetails() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const {
    selectedTicket: ticket,
    loading,
    error,
    successMessage,
  } = useSelector((s) => s.support);

  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (ticketId) dispatch(fetchTicketById(ticketId));
  }, [dispatch, ticketId]);

  // Sync internal status with fetched ticket status
  useEffect(() => {
    if (ticket) setStatus(ticket.status);
  }, [ticket]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    dispatch(adminReplyToTicket({ ticketId, reply, status })).then(() => {
      setReply("");
      setTimeout(() => dispatch(clearSupportStatus()), 3000);
    });
  };

  if (loading && !ticket) return <PreLoader />;
  if (error) return <ErrorState message={error} />;
  if (!ticket) return <EmptyState />;

  const StatusIcon = STATUS_CONFIG[ticket.status]?.icon || Clock;

  console.log("ticket: ", ticket);

  // return (
  //   <div className="w-full min-h-screen mx-auto space-y-6 bg-[#f8fafc] px-4 lg:px-5 py-4">
  //     {/* Navigation & Actions */}
  //     <div className="flex items-center justify-between">
  //       <Link
  //         to="/admin/management/support"
  //         className="group flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-all"
  //       >
  //         <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
  //         Back to Ticket List
  //       </Link>
  //       <div className="text-xs text-slate-400 font-mono">ID: {ticket._id}</div>
  //     </div>

  //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //       {/* Main Conversation Column */}
  //       <div className="lg:col-span-2 space-y-6">
  //         <Card className="border-none shadow-sm overflow-hidden">
  //           <CardHeader className="bg-white border-b border-slate-100">
  //             <div className="flex justify-between items-start">
  //               <div className="space-y-1">
  //                 <CardTitle className="text-xl font-bold text-slate-900">
  //                   {ticket.subject}
  //                 </CardTitle>
  //                 <div className="flex items-center gap-2 text-slate-500 text-sm">
  //                   <Calendar className="w-3.5 h-3.5" />
  //                   {new Date(ticket.createdAt).toLocaleString()}
  //                 </div>
  //               </div>
  //               <Badge
  //                 className={`${
  //                   STATUS_CONFIG[ticket.status]?.color
  //                 } capitalize px-3 py-1`}
  //               >
  //                 <StatusIcon className="w-3 h-3 mr-1.5" />
  //                 {ticket.status.replace("_", " ")}
  //               </Badge>
  //             </div>
  //           </CardHeader>

  //           <CardContent className="p-6 space-y-8">
  //             {/* User Message - "Left Aligned" Bubble style */}
  //             <div className="flex gap-4">
  //               <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
  //                 <User className="w-5 h-5" />
  //               </div>
  //               <div className="flex-1 space-y-2">
  //                 <div className="flex items-center gap-2">
  //                   <span className="text-sm font-bold text-slate-900">
  //                     Customer
  //                   </span>
  //                   <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
  //                     Initial Request
  //                   </span>
  //                 </div>
  //                 <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 text-slate-700 text-sm leading-relaxed shadow-sm">
  //                   {ticket.message}
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Admin Reply - "Right Aligned" Bubble style */}
  //             {ticket.adminReply && (
  //               <div className="flex gap-4 flex-row-reverse">
  //                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
  //                   <Reply className="w-5 h-5" />
  //                 </div>
  //                 <div className="flex-1 space-y-2 text-right">
  //                   <div className="flex items-center gap-2 justify-end">
  //                     <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">
  //                       Admin Response
  //                     </span>
  //                     <span className="text-sm font-bold text-emerald-900">
  //                       Support Team
  //                     </span>
  //                   </div>
  //                   <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tr-none p-4 text-emerald-800 text-sm leading-relaxed shadow-sm inline-block text-left min-w-[60%]">
  //                     {ticket.adminReply}
  //                     {ticket.repliedAt && (
  //                       <div className="mt-2 pt-2 border-t border-emerald-100 text-[10px] text-emerald-600/70">
  //                         Sent on {new Date(ticket.repliedAt).toLocaleString()}
  //                       </div>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             )}
  //           </CardContent>
  //         </Card>

  //         {/* Reply Input Form */}
  //         {ticket.status !== "closed" && (
  //           <Card className="border-none shadow-md overflow-hidden ring-1 ring-slate-200">
  //             <form onSubmit={handleReplySubmit}>
  //               <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
  //                 <Reply className="w-4 h-4 text-slate-400" />
  //                 <h3 className="text-sm font-semibold text-slate-700">
  //                   Quick Response
  //                 </h3>
  //               </div>
  //               <CardContent className="p-6 space-y-4">
  //                 <Textarea
  //                   rows={4}
  //                   value={reply}
  //                   onChange={(e) => setReply(e.target.value)}
  //                   placeholder="Address the customer's issue clearly..."
  //                   className="border-slate-200 focus:ring-slate-900 focus:border-slate-900 resize-none shadow-inner"
  //                 />
  //                 <div className="flex flex-col sm:flex-row gap-4 items-end">
  //                   <div className="flex-1 w-full space-y-1.5">
  //                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
  //                       Change Ticket Status
  //                     </label>
  //                     <Select value={status} onValueChange={setStatus}>
  //                       <SelectTrigger className="bg-white border-slate-200">
  //                         <SelectValue />
  //                       </SelectTrigger>
  //                       <SelectContent>
  //                         <SelectItem value="open">Open</SelectItem>
  //                         <SelectItem value="in_progress">
  //                           In Progress
  //                         </SelectItem>
  //                         <SelectItem value="resolved">Resolved</SelectItem>
  //                         <SelectItem value="closed">Closed</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                   </div>
  //                   <Button
  //                     type="submit"
  //                     disabled={loading || !reply.trim()}
  //                     className="bg-slate-900 text-white hover:bg-black px-8 h-10 shadow-lg shadow-slate-200"
  //                   >
  //                     {loading ? (
  //                       <Loader2 className="animate-spin w-4 h-4" />
  //                     ) : (
  //                       <Send className="w-4 h-4 mr-2" />
  //                     )}
  //                     Send Reply
  //                   </Button>
  //                 </div>
  //               </CardContent>
  //             </form>
  //           </Card>
  //         )}

  //         {successMessage && (
  //           <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
  //             <CheckCircle2 className="w-4 h-4" />
  //             <span className="text-sm font-medium">{successMessage}</span>
  //           </div>
  //         )}
  //       </div>

  //       {/* Sidebar Metadata Column */}
  //       <div className="space-y-6">
  //         <Card className="border-none shadow-sm">
  //           <CardHeader className="pb-3">
  //             <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">
  //               Metadata
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent className="space-y-4">
  //             <div className="space-y-1">
  //               <div className="text-[10px] font-bold text-slate-400 uppercase">
  //                 Category
  //               </div>
  //               <div className="flex items-center gap-2">
  //                 <Tag className="w-4 h-4 text-slate-400" />
  //                 <span className="text-sm font-medium text-slate-700">
  //                   {ticket.category}
  //                 </span>
  //               </div>
  //             </div>
  //             <Separator className="bg-slate-100" />
  //             <div className="space-y-1">
  //               <div className="text-[10px] font-bold text-slate-400 uppercase">
  //                 User Association
  //               </div>
  //               <div className="flex items-center gap-2">
  //                 <Mail className="w-4 h-4 text-slate-400" />
  //                 <span className="text-sm font-mono text-slate-600 truncate">
  //                   {ticket.userId}
  //                 </span>
  //               </div>
  //             </div>
  //             <Separator className="bg-slate-100" />
  //             <div className="space-y-1">
  //               <div className="text-[10px] font-bold text-slate-400 uppercase">
  //                 Last Updated
  //               </div>
  //               <div className="flex items-center gap-2 text-slate-600 text-sm">
  //                 <Clock className="w-4 h-4 text-slate-400" />
  //                 {new Date(ticket.updatedAt).toLocaleDateString()}
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         {ticket.status === "closed" && (
  //           <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center space-y-2">
  //             <AlertCircle className="w-5 h-5 text-slate-400 mx-auto" />
  //             <p className="text-xs text-slate-500 font-medium">
  //               This ticket is archived. Re-open to send new replies.
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. TOP TOOLBAR - Modern Mail Action Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/management/support"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            title="Back to Inbox"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            {/* <Badge
              className={`${STATUS_CONFIG[ticket.status]?.color} border font-medium shadow-sm`}
            >
              <StatusIcon className="w-3 h-3 mr-1.5" />
              {ticket.status.replace("_", " ")}
            </Badge> */}

            <Badge
              className={`${
                STATUS_CONFIG[ticket.status]?.color
              } capitalize px-3 py-1`}
            >
              <StatusIcon className="w-3 h-3 mr-1.5" />
              {ticket.status.replace("_", " ")}
            </Badge>
            <span className="text-sm text-slate-600 font-semibold font-mono">
              #{ticket._id.slice(-6)}
            </span>
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-600">
            <Archive className="w-4 h-4 mr-2" /> Archive
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div> */}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 h-[calc(100vh-57px)]">
        {/* 2. MAIN EMAIL BODY */}
        <main className="lg:col-span-3 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-6 my-5 space-y-10 rounded-2xl border border-slate-300">
            {/* Subject Line */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Subject: {ticket.subject}
              </h1>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500 capitalize">
                  {ticket.category} Support
                </span>
              </div>
            </div>

            {/* INITIAL CUSTOMER MESSAGE */}
            <section className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                    {ticket.userId?.charAt(0).toUpperCase() || "C"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        Customer User
                      </span>
                      <span className="text-xs text-slate-400">
                        &lt;{ticket.userId}&gt;
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">to Support Team</p>
                  </div>
                </div>
                <time className="text-xs text-slate-400">
                  {new Date(ticket.createdAt).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-[15px] whitespace-pre-wrap pl-13">
                {ticket.message}
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* ADMIN REPLY THREAD */}
            {ticket.adminReply && (
              <section className="space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-aqua flex items-center justify-center text-white">
                      <Reply className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          Support Team (Admin)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">to Customer</p>
                    </div>
                  </div>
                  <time className="text-xs text-slate-400">
                    {new Date(ticket.repliedAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                </div>

                <div className="bg-slate-50/50 border border-brand-aqua/40 rounded-xl p-6 text-slate-800 leading-relaxed text-[15px] italic border-l-4 border-l-brand-aqua">
                  {ticket.adminReply}
                </div>
              </section>
            )}

            {/* 3. COMPOSE REPLY AREA */}
            {ticket.status !== "closed" && (
              <div className="pt-8">
                <div className="border border-slate-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-brand-aqua focus-within:border-transparent transition-all">
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Reply as Admin
                    </span>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-[140px] h-8 text-xs border border-slate-400 bg-transparent font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Keep Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Mark Resolved</SelectItem>
                        <SelectItem value="closed">Close Ticket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <form onSubmit={handleReplySubmit}>
                    <Textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write your response here..."
                      className="border-none focus-visible:ring-0 min-h-[150px] text-[15px] p-6 resize-none rounded-b-2xl"
                    />
                    <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white rounded-b-2xl">
                      <Button
                        type="submit"
                        disabled={loading || !reply.trim()}
                        className="bg-brand-aqua/30 hover:bg-brand-aqua/80 border border-brand-aqua text-slate-600 px-6 rounded-full"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* 4. SIDEBAR - TICKET METADATA */}
        <aside className="hidden h-max lg:block mr-4 bg-slate-50/50 my-5 p-6 space-y-8 rounded-2xl border border-slate-300">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              Ticket Details
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Created</span>
                <span className="text-sm font-medium text-slate-700">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Last Activity</span>
                <span className="text-sm font-medium text-slate-700">
                  {new Date(ticket.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400">Support ID</span>
                <span className="text-sm font-mono text-slate-700 break-all">
                  {ticket._id}
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              User Info
            </h3>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                {ticket.userId?.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                  UID: {ticket.userId}
                </span>
                <span className="text-[10px] text-slate-500">View History</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Sub-components for cleaner refactoring
const LoadingState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
    <Loader2 className="w-10 h-10 text-slate-300 animate-spin" />
    <p className="text-slate-500 font-medium">Synchronizing ticket data...</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
    <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-sm border border-red-100 text-center space-y-4">
      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">Fetch Failed</h3>
      <p className="text-slate-500 text-sm">{message}</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Retry Request
      </Button>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
    <div className="text-center space-y-4">
      <TicketIcon className="w-16 h-16 text-slate-200 mx-auto" />
      <p className="text-slate-400 font-medium">Ticket entry not found.</p>
      <Link
        to="/admin/management/support/tickets"
        className="text-slate-900 underline font-semibold"
      >
        Return to Dashboard
      </Link>
    </div>
  </div>
);
