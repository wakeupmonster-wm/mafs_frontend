import React from "react";
import {
  CheckCircle2,
  Ban,
  Clock,
  Reply,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export const ActionPanel = ({
  p,
  formData,
  onUpdate,
  onSubmit,
  isSubmitting,
}) => {
  const isResolved = p?.status === "resolved";

  // Function to get the specific button styles based on action
  const getButtonStyles = () => {
    const base = "w-full h-12 font-bold text-base shadow-lg transition-all ";
    const gradients = {
      resolve:
        "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-100",
      ban: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-100",
      suspend:
        "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-amber-100",
      reply:
        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-100",
    };
    return base + (gradients[formData.action] || "bg-slate-900");
  };

  return (
    <Card className="p-6 sticky top-24 border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          {isResolved ? "Moderation Record" : "Decision Center"}
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          {isResolved
            ? "Case has been officially closed"
            : "Select policy to execute on this profile"}
        </p>
      </div>

      {isResolved ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-emerald-900">Resolved</h3>
            <p className="text-sm text-emerald-700/70 mt-1">
              This report is no longer active.
            </p>
          </div>

          {/* Resolution Metadata fallback */}
          <div className="space-y-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 text-center">
                Status Update
              </p>
              <p className="text-xs text-slate-600 text-center italic leading-relaxed">
                Changes have been synced with the user's account and the global
                safety database.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          {/* 1. ACTION SELECT */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
              Select Action Type
            </label>
            <Select
              value={formData.action}
              onValueChange={(val) => onUpdate("action", val)}
            >
              <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-brand-aqua shadow-sm bg-slate-50/50">
                <SelectValue placeholder="How will you handle this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resolve">
                  <div className="flex items-center gap-2 py-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />{" "}
                    <span>Approve Profile</span>
                  </div>
                </SelectItem>
                <SelectItem value="ban">
                  <div className="flex items-center gap-2 py-1">
                    <Ban className="w-4 h-4 text-red-600" />{" "}
                    <span>Ban User Account</span>
                  </div>
                </SelectItem>
                <SelectItem value="suspend">
                  <div className="flex items-center gap-2 py-1">
                    <Clock className="w-4 h-4 text-amber-600" />{" "}
                    <span>Suspend Account</span>
                  </div>
                </SelectItem>
                <SelectItem value="reply">
                  <div className="flex items-center gap-2 py-1">
                    <Reply className="w-4 h-4 text-blue-600" />{" "}
                    <span>Message Reporter</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. DYNAMIC FIELDS BASED ON ACTION */}

          {/* Reason/Notes Field (Visible for almost all actions) */}
          {["resolve", "ban", "suspend"].includes(formData.action) && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                {formData.action === "resolve"
                  ? "Resolution Notes"
                  : "Violation Reason"}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                placeholder={
                  formData.action === "resolve"
                    ? "Notes for audit trail..."
                    : "Describe the policy violation..."
                }
                value={formData.reason}
                onChange={(e) => onUpdate("reason", e.target.value)}
                className="min-h-[120px] rounded-2xl bg-slate-50/50 border-slate-200"
              />
            </div>
          )}

          {/* Suspend Duration Field */}
          {formData.action === "suspend" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                Duration (Hours) <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="number"
                min={1}
                placeholder="e.g. 24, 48, 72"
                value={formData.suspendDuration}
                onChange={(e) => onUpdate("suspendDuration", e.target.value)}
                className="h-12 rounded-xl bg-slate-50/50 border-slate-200"
              />
            </div>
          )}

          {/* Reply Interface */}
          {formData.action === "reply" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Target Report <span className="text-red-500 ml-1">*</span>
                </label>
                <Select
                  value={formData.selectedReportId}
                  onValueChange={(val) => onUpdate("selectedReportId", val)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50/50">
                    <SelectValue placeholder="Choose report to address" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {p.reports?.map((r) => (
                      <SelectItem key={r._id} value={r._id} className="py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold capitalize text-red-600">
                            {r.reason}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            By: {r.reportedBy?.name || "User"}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                  Message Body <span className="text-red-500 ml-1">*</span>
                </label>
                <Textarea
                  placeholder="Professional reply to reporter..."
                  value={formData.replyMessage}
                  onChange={(e) => onUpdate("replyMessage", e.target.value)}
                  className="min-h-[150px] rounded-2xl bg-slate-50/50"
                />
                <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 mt-2">
                  <p className="text-[10px] text-blue-700 flex gap-2 leading-relaxed font-medium">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    Sent via email. Professional tone required.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.action}
            className={getButtonStyles()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : !formData.action ? (
              <>
                <AlertCircle className="w-5 h-5 mr-2" />
                Awaiting Decision
              </>
            ) : (
              <span className="capitalize">
                Confirm {formData.action} Action
              </span>
            )}
          </Button>
        </form>
      )}
    </Card>
  );
};
