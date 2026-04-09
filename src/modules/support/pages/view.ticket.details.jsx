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
  AlertCircle,
  Ticket as TicketIcon,
} from "lucide-react";
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
import { format } from "date-fns";

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

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] p-4 lg:p-8 bg-slate-50/50 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. TOP TOOLBAR */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-sm shadow-slate-200/20 p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-aqua/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <Link
              to="/admin/management/support"
              className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all shadow-sm"
              title="Back to Tickets"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`${STATUS_CONFIG[ticket.status]?.color} capitalize px-3 py-1 text-xs font-semibold shadow-sm border rounded-full backdrop-blur-md`}
              >
                <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                {ticket.status.replace("_", " ")}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
                <Tag className="w-3.5 h-3.5" />
                <span className="capitalize">{ticket.category}</span>
              </div>
            </div>
          </div>
          <div className="text-sm font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 hidden sm:block">
            ID:{" "}
            <span className="text-slate-600 font-semibold">{ticket._id}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 2. MAIN CONVERSATION AREA */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            {/* Subject Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-200/40 p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-brand-aqua/5 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {ticket.subject}
                </h1>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Opened on{" "}
                  {/* {new Date(ticket.createdAt).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })} */}
                  {format(new Date(ticket.createdAt), "dd MMM, yyyy p")}
                </p>
              </div>
            </div>

            {/* Thread Entries */}
            <div className="space-y-6">
              {/* Customer Initial Request */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-200/40 overflow-hidden text-left">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 shadow-sm">
                      {ticket.userId?.charAt(0).toUpperCase() || "C"}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">
                          Customer User
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-slate-200 text-slate-600 text-[10px] px-1.5 py-0 h-5 font-semibold"
                        >
                          Requester
                        </Badge>
                      </div>
                      <span className="text-xs text-slate-500 font-mono mt-0.5 hidden sm:inline">
                        {ticket.userId}
                      </span>
                    </div>
                  </div>
                  <time className="text-xs font-medium text-slate-400">
                    {/* {new Date(ticket.createdAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })} */}
                    {format(new Date(ticket.createdAt), "dd MMM, yyyy p")}
                  </time>
                </div>
                {/* Body */}
                <div className="p-6 md:p-8 text-slate-700 leading-relaxed text-[15px] whitespace-pre-wrap">
                  {ticket.message}
                </div>
              </div>

              {/* Admin Reply */}
              {ticket.adminReply && (
                <div className="bg-white rounded-3xl border border-brand-aqua/30 shadow-sm shadow-brand-aqua/5 overflow-hidden text-left relative ring-1 ring-inset ring-brand-aqua/5">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-aqua" />
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-brand-aqua/5">
                    <div className="flex items-center gap-4 pl-1">
                      <div className="w-10 h-10 rounded-full bg-brand-aqua flex items-center justify-center text-white shadow-md shadow-brand-aqua/20">
                        <Reply className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">
                            Support Team
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-brand-aqua/10 text-brand-aqua text-[10px] px-1.5 py-0 h-5 font-bold border border-brand-aqua/20"
                          >
                            Admin
                          </Badge>
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5">
                          Response to Customer
                        </span>
                      </div>
                    </div>
                    <time className="text-xs font-medium text-slate-400">
                      {/* {new Date(ticket.repliedAt).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })} */}
                      {format(new Date(ticket.repliedAt), "dd MMM, yyyy p")}
                    </time>
                  </div>
                  {/* Body */}
                  <div className="p-6 md:p-8 text-slate-800 leading-relaxed text-[15px] whitespace-pre-wrap bg-gradient-to-br from-white to-slate-50/50">
                    {ticket.adminReply}
                  </div>
                </div>
              )}
            </div>

            {/* COMPOSE REPLY AREA */}
            {ticket.status !== "closed" && (
              <div className="mt-8 pt-6 border-t border-slate-200/60 sticky bottom-4">
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 focus-within:ring-4 focus-within:ring-brand-aqua/20 focus-within:border-brand-aqua transition-all duration-300 overflow-hidden flex flex-col group/reply">
                  {/* Reply Header / Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-3 bg-slate-50/80 border-b border-slate-100 gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Reply className="w-4 h-4 text-brand-aqua" />
                      Reply to Customer
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xs text-slate-400 font-medium">
                        Status:
                      </span>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[140px] h-8 text-xs bg-white border-slate-300 font-medium rounded-lg shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                          <SelectItem
                            value="open"
                            className="text-xs font-medium"
                          >
                            Keep Open
                          </SelectItem>
                          <SelectItem
                            value="in_progress"
                            className="text-xs font-medium"
                          >
                            In Progress
                          </SelectItem>
                          <SelectItem
                            value="resolved"
                            className="text-xs font-medium"
                          >
                            Mark Resolved
                          </SelectItem>
                          <SelectItem
                            value="closed"
                            className="text-xs font-medium"
                          >
                            Close Ticket
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <form onSubmit={handleReplySubmit} className="flex flex-col">
                    <Textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your response here..."
                      className="border-none focus-visible:ring-0 min-h-[160px] text-[15px] px-6 py-5 resize-y bg-transparent placeholder:text-slate-400"
                    />
                    <div className="px-6 py-4 bg-white flex justify-end">
                      <Button
                        type="submit"
                        disabled={loading || !reply.trim()}
                        className="bg-brand-aqua hover:bg-brand-aqua/90 text-white shadow-lg shadow-brand-aqua/30 rounded-full px-8 h-11 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center font-semibold"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        Send Reply
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {ticket.status === "closed" && (
              <div className="mt-8 flex flex-col items-center justify-center p-8 bg-slate-100/50 rounded-3xl border border-slate-200 border-dashed text-center space-y-3">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 mb-2">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-slate-700 font-semibold">Ticket Closed</h4>
                <p className="text-sm text-slate-500 max-w-sm">
                  This conversation has been closed. You will need to change the
                  status to reopen the ticket before sending new replies.
                </p>
              </div>
            )}

            {successMessage && (
              <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-200 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{successMessage}</span>
              </div>
            )}
          </main>

          {/* 4. SIDEBAR - METADATA */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-200/40 p-6 space-y-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 pointer-events-none" />

              {/* Ticket Details */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Ticket Info
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-slate-400">
                      Created Date
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {/* {new Date(ticket.createdAt).toLocaleDateString([], {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} */}
                      {format(new Date(ticket.createdAt), "dd MMM, yyyy")}
                    </p>
                  </div>
                  <Separator className="bg-slate-100" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-slate-400">
                      Last Updated
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {/* {new Date(ticket.updatedAt).toLocaleDateString([], {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} */}
                      {format(new Date(ticket.updatedAt), "dd MMM, yyyy")}
                    </p>
                  </div>
                  <Separator className="bg-slate-100" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-slate-400">
                      Support Reference
                    </p>
                    <div className="text-xs font-mono font-medium bg-slate-50 text-slate-600 p-2 rounded-lg border border-slate-100 break-all select-all mt-1">
                      {ticket._id}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-200/60" />

              {/* User Identity */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-aqua" />
                  Requester
                </h3>
                <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 group transition-colors hover:border-brand-aqua/30">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white flex items-center justify-center text-slate-600 font-bold border border-slate-200 shadow-sm">
                    {ticket.userId?.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-sm font-bold text-slate-800 truncate"
                      title={ticket.userId}
                    >
                      {ticket.userId.slice(0, 8)}...
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                      User Profile
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Sub-components
const LoadingState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50/50">
    <Loader2 className="w-10 h-10 text-brand-aqua animate-spin" />
    <p className="text-slate-500 font-medium animate-pulse">
      Loading ticket details...
    </p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50">
    <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/40 border border-red-100 text-center space-y-4">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Failed to Load
        </h3>
        <p className="text-slate-500 text-sm mt-1">{message}</p>
      </div>
      <Button
        variant="outline"
        onClick={() => window.location.reload()}
        className="w-full rounded-xl border-slate-200 hover:bg-slate-50 mt-4"
      >
        Try Again
      </Button>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50">
    <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/40 border border-slate-200/80">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <TicketIcon className="w-10 h-10 text-slate-300" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Ticket Not Found
        </h3>
        <p className="text-slate-500 text-sm mt-2">
          The ticket you're looking for doesn't exist or has been removed.
        </p>
      </div>
      <Link
        to="/admin/management/support"
        className="inline-flex items-center justify-center w-full h-11 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-md"
      >
        Return to Inbox
      </Link>
    </div>
  </div>
);
