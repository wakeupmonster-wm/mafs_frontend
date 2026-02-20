import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, SendHorizontal, AlertCircle } from "lucide-react";

export const TicketAction = ({
  selectedTicket,
  setSelectedTicket,
  statusUpdate,
  setStatusUpdate,
  reply,
  setReply,
  handleActionSubmit,
  loading,
}) => {
  return (
    <Dialog
      open={!!selectedTicket}
      onOpenChange={() => setSelectedTicket(null)}
    >
      <DialogContent className="max-w-md gap-2 p-0 overflow-hidden border border-grey-900 shadow-2xl">
        {/* Colorful Header Strip */}
        <div className="bg-gray-900 shadow-lg px-6 py-4 flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle className="text-white text-lg font-semibold">
              Update Ticket
            </DialogTitle>
            <p className="text-gray-400 text-[11px] uppercase tracking-wider font-medium">
              Ref. ID: {selectedTicket?._id?.slice(-8)}
            </p>
          </div>
        </div>

        <div className="p-4 py-2 space-y-4 bg-white">
          {/* User Message Section (Visual Context) */}
          <div className="relative group">
            <label className="text-[11px] font-bold text-gray-400 uppercase mb-2 block ml-1">
              User Inquiry
            </label>
            <div className="relative bg-slate-50 rounded-2xl p-4 border border-slate-100 italic text-slate-600 text-sm leading-relaxed shadow-sm">
              <span className="absolute -left-1 top-4 w-2 h-2 bg-slate-50 border-l border-b border-slate-100 rotate-45" />
              "{selectedTicket?.subject}"
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {/* Status Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">
                  Ticket Status
                </label>
                {statusUpdate === "open" && (
                  <span className="text-[10px] text-blue-500 font-medium animate-pulse">
                    Waiting for reply
                  </span>
                )}
              </div>
              <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                <SelectTrigger className="w-full bg-white border-slate-200 h-11 focus:ring-gray-900 transition-all">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Admin Response */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">
                Official Response
              </label>
              <div className="relative">
                <Textarea
                  placeholder="Draft your reply to the user..."
                  className="min-h-[120px] text-sm border-slate-200 focus-visible:ring-gray-900 resize-none p-4 rounded-xl shadow-inner"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <div className="absolute bottom-3 right-3 text-[10px] text-gray-400">
                  {reply?.length ?? 0} characters
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with subtle top border */}
        <div className="px-4 py-3 bg-gray-50 flex justify-between gap-3 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={() => setSelectedTicket(null)}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Discard
          </Button>
          <Button
            onClick={handleActionSubmit}
            className="bg-gray-900 text-white hover:bg-black px-6 rounded-lg transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-gray-200"
            disabled={loading || !statusUpdate || !reply}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <SendHorizontal className="w-4 h-4" />
                Submit Action
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
