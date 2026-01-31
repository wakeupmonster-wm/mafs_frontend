import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ConfirmKycActionModal({
  open,
  onClose,
  onConfirm,
  type, // "approve" | "reject"
  loading,
}) {
  const isApprove = type === "approve";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isApprove ? (
              <CheckCircle2 className="text-emerald-600" />
            ) : (
              <XCircle className="text-red-600" />
            )}
            {isApprove ? "Approve KYC?" : "Reject KYC?"}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mt-2">
          {isApprove
            ? "Are you sure you want to approve this user's KYC?"
            : "Are you sure you want to reject this user's KYC?"}
        </p>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={
              isApprove
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            {loading
              ? "Processing..."
              : isApprove
              ? "Yes, Approve"
              : "Yes, Reject"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}