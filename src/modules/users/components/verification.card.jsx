import { useState } from "react";
import {
  IconShieldCheck,
  IconEye,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconId,
  IconUserCircle,
  IconCalendarEvent,
  IconInfoCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RejectReasonDialog } from "./Dialogs/RejectReasonDialog";
import { ZoomableImage } from "./zoomable.image";
import ConfirmKycActionModal from "../pages/ConfirmKycActionModal";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import dummyImg from "@/assets/images/dummyImg.jpg";
import dummyID from "@/assets/images/dummyIDCard.jpg";

const VerificationCard = ({
  verification,
  isVerifying,
  onApprove,
  onReject,
  userName,
}) => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isApproveConfirmOpen, setIsApproveConfirmOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const currentStatus = verification?.status || "pending";

  // console.log("verification: ", verification);

  const statusStyles = {
    approved:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]",
    rejected:
      "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-[0_0_15px_-3px_rgba(244,63,94,0.2)]",
    pending:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]",
  };

  const handleConfirmApprove = () => {
    onApprove("approved");
    setIsApproveConfirmOpen(false);
    setInspectorOpen(false);
  };

  // Logic to prevent actions if already approved or if there's no data
  const isActionDisabled =
    isVerifying ||
    currentStatus === "approved" ||
    currentStatus === "not_started";

  return (
    <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-md shadow-sm transition-all hover:shadow-md">
      {/* Decorative Status Line */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1",
          currentStatus === "approved"
            ? "bg-emerald-500"
            : currentStatus === "rejected"
              ? "bg-rose-500"
              : "bg-amber-500",
        )}
      />

      <CardContent className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-4 ring-indigo-50/50">
              <IconShieldCheck size={28} stroke={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                Identity Verification
              </h3>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <IconId size={14} />
                Compare biometric selfie with government ID
              </div>
            </div>
          </div>

          <Badge
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-transparent transition-all",
              statusStyles[currentStatus],
            )}
          >
            {currentStatus}
          </Badge>
        </div>

        {/* Thumbnail Comparison Row */}
        <div className="flex items-center justify-start gap-3">
          <div className="group relative w-full h-56 overflow-hidden rounded-xl border border-slate-300 bg-brand-bg transition-all hover:border-brand-aqua">
            <img
              src={verification?.selfieUrl || dummyImg}
              alt="Selfie"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-3">
              <span className="text-[10px] font-bold text-white uppercase ">
                Selfie
              </span>
            </div>
          </div>
          <div className="group relative w-full h-56 overflow-hidden rounded-xl border border-slate-300 bg-brand-bg transition-all hover:border-brand-aqua">
            <img
              src={verification?.docUrl || dummyID}
              alt="Document"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-3">
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
                Document
              </span>
            </div>
          </div>
        </div>

        {/* Inspector Launcher */}
        <Dialog open={inspectorOpen} onOpenChange={setInspectorOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-11 bg-brand-aqua/15 border-brand-aqua text-slate-600 hover:bg-brand-aqua/80 hover:text-white hover:border-brand-aqua transition-all group"
            >
              <IconEye className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Launch Side-by-Side Inspector
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 overflow-hidden rounded-3xl border-none">
            <div className="flex items-center justify-between p-6 border-b bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-brand-aqua text-white">
                  <IconShieldCheck size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-black text-slate-900">
                    Visual Comparison
                  </DialogTitle>
                  <p className="text-xs font-medium text-slate-500 italic">
                    User: {userName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <IconUserCircle size={18} className="text-brand-aqua" />
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                      Selfie
                    </span>
                  </div>
                  <ZoomableImage
                    src={verification?.selfieUrl || dummyImg}
                    alt={verification?.selfieUrl || dummyImg}
                    loading="lazy"
                    className="rounded-2xl shadow-2xl object-contain border-4 border-white"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <IconId size={18} className="text-brand-aqua" />
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
                      Document
                    </span>
                  </div>
                  <ZoomableImage
                    src={verification?.docUrl || dummyID}
                    alt={verification?.docUrl || dummyID}
                    loading="lazy"
                    className="rounded-2xl shadow-2xl object-contain border-4 border-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t flex gap-4">
              <Button
                variant="ghost"
                className="flex-1 h-14 text-white hover:text-white bg-rose-600 hover:bg-rose-700 font-bold uppercase tracking-widest text-xs cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setRejectDialogOpen(true)}
                disabled={isActionDisabled}
              >
                <IconX className="mr-2 h-5 w-5" /> Reject
              </Button>
              <Button
                className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest cursor-pointer disabled:cursor-not-allowed text-xs shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
                onClick={() => setIsApproveConfirmOpen(true)}
                disabled={isActionDisabled}
              >
                <IconCheck className="mr-2 h-5 w-5" /> Approve
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dynamic Status Feedback Note */}
        {currentStatus !== "pending" && (
          <div
            className={cn(
              "rounded-2xl p-4 border animate-in slide-in-from-top-2 duration-300",
              currentStatus === "approved" &&
                "bg-emerald-100/50 border-emerald-300",
              currentStatus === "rejected" && "bg-rose-100/50 border-rose-300",
              currentStatus === "not_started" &&
                "bg-slate-50 border-dashed border-slate-400",
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {currentStatus === "approved" ? (
                <IconCircleCheck className="h-4 w-4 text-emerald-500" />
              ) : currentStatus === "rejected" ? (
                <IconAlertTriangle className="h-4 w-4 text-rose-500" />
              ) : (
                <IconInfoCircle className="h-4 w-4 text-slate-400" />
              )}

              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em]",
                  currentStatus === "approved" && "text-emerald-600",
                  currentStatus === "rejected" && "text-rose-600",
                  currentStatus === "not_started" && "text-slate-500",
                )}
              >
                {currentStatus === "approved"
                  ? "Verification Success"
                  : currentStatus === "rejected"
                    ? "Rejection Protocol"
                    : "Status Update"}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
              {currentStatus === "approved" &&
                (verification?.approvalReason ||
                  "User identity has been successfully verified.")}
              {currentStatus === "rejected" && verification?.rejectionReason}
              {currentStatus === "not_started" &&
                "KYC submission is awaiting user data."}
            </p>
          </div>
        )}

        {/* Footer Info & Final Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-400">
            <IconCalendarEvent size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">
              Submitted:{" "}
              {new Date(verification?.submittedAt || "-").toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg px-3 text-rose-600 border-rose-300 hover:bg-rose-50 hover:border-rose-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed  transition-all font-bold text-xs"
              onClick={() => setRejectDialogOpen(true)}
              // disabled={
              //   isVerifying || currentStatus === "approved" || "not_started"
              // }
              disabled={isActionDisabled || currentStatus === "rejected"}
            >
              <X className="w-4 h-4 mr-1" /> Reject
            </Button>
            <Button
              size="sm"
              className="h-8 rounded-lg px-3 bg-emerald-600 hover:bg-emerald-700 text-white transition-all font-bold text-xs cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-emerald-100"
              onClick={() => setIsApproveConfirmOpen(true)}
              // disabled={
              //   isVerifying || currentStatus === "approved" || "not_started"
              // }
              disabled={isActionDisabled}
            >
              <Check className="w-4 h-4 mr-1.5" />
              Approve
            </Button>
          </div>
        </div>
      </CardContent>

      <ConfirmKycActionModal
        open={isApproveConfirmOpen}
        onClose={() => setIsApproveConfirmOpen(false)}
        onConfirm={handleConfirmApprove}
        type="approve"
        loading={isVerifying}
      />

      <RejectReasonDialog
        isOpen={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onConfirm={(reason) => {
          onReject(reason, "rejected");
          setRejectDialogOpen(false);
          setInspectorOpen(false);
        }}
        isLoading={isVerifying}
        userName={userName}
      />
    </Card>
  );
};

export default VerificationCard;
