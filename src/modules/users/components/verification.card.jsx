import { useState } from "react";
import { ShieldCheck, Eye, Check, X, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RejectReasonDialog } from "./Dialogs/RejectReasonDialog";
import { ZoomableImage } from "./zoomable.image";
import ConfirmKycActionModal from "../pages/ConfirmKycActionModal";
// Import your confirmation modal

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

  const statusConfig = {
    approved: {
      bg: "bg-success/10 border-success/30",
      text: "text-success",
      label: "Approved",
    },
    rejected: {
      bg: "bg-destructive/10 border-destructive/30",
      text: "text-destructive",
      label: "Rejected",
    },
    pending: {
      bg: "bg-warning/10 border-warning/30",
      text: "text-warning",
      label: "Pending Review",
    },
  };

  const status = statusConfig[currentStatus] || statusConfig.pending;

  const handleConfirmApprove = () => {
    onApprove("approved");
    setIsApproveConfirmOpen(false);
    setInspectorOpen(false); // Close inspector if it was open
  };

  return (
    <Card className="glass-card glow-border border-slate-200 overflow-hidden">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-aqua/20">
              <ShieldCheck
                className="w-6 h-6 text-brand-aqua"
                strokeWidth={2.2}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Identity Verification
              </h3>
              <p className="text-xs text-muted-foreground">
                Compare biometric selfie with government ID
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${status.bg} ${status.text}`}
          >
            {status.label}
          </span>
        </div>

        {/* Inspector Dialog */}
        <Dialog open={inspectorOpen} onOpenChange={setInspectorOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full gap-2 h-10 text-xs font-bold uppercase tracking-wider"
            >
              <Eye className="w-4 h-4" /> Launch Inspector
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl sm:max-w-4xl md:max-w-7xl glass-card border-border/50">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-aqua/20">
                  <ShieldCheck
                    className="w-8 h-8 text-brand-aqua"
                    strokeWidth={2.2}
                  />
                </div>
                <DialogTitle className="text-xl font-bold">
                  Verification Inspector
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <ZoomableImage
                src={verification.selfieUrl}
                label="Profile Selfie"
              />
              <ZoomableImage src={verification.docUrl} label="ID Document" />
            </div>

            {/* Actions inside dialog */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <Button
                variant="outline"
                className="flex-1 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={() => setRejectDialogOpen(true)}
              >
                <X className="w-4 h-4" /> Reject
              </Button>
              <Button
                className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setIsApproveConfirmOpen(true)}
                disabled={isVerifying || currentStatus === "approved"}
              >
                <Check className="w-4 h-4" /> Approve Identity
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Moderator Action Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Moderator Action
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/20 border-destructive/30 px-3 text-xs"
              onClick={() => setRejectDialogOpen(true)}
            >
              <X className="w-4 h-4 mr-1" /> Reject
            </Button>

            <Button
              size="sm"
              className="px-3 text-xs gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setIsApproveConfirmOpen(true)}
              disabled={isVerifying || currentStatus === "approved"}
            >
              <Check className="w-4 h-4" /> Approve
            </Button>
          </div>
        </div>

        {/* Rejection reason */}
        {currentStatus === "rejected" && (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/20 mt-2">
            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-destructive uppercase">
                Rejection Reason
              </p>
              <p className="text-xs text-muted-foreground">
                {verification.rejectionReason}
              </p>
            </div>
          </div>
        )}
      </CardContent>

      {/* APPROVE CONFIRMATION MODAL */}
      <ConfirmKycActionModal
        open={isApproveConfirmOpen}
        onClose={() => setIsApproveConfirmOpen(false)}
        onConfirm={handleConfirmApprove}
        type="approve"
        loading={isVerifying}
      />

      {/* REJECT REASON DIALOG */}
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
