import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { IconAlertTriangle, IconCheck, IconLoader2 } from "@tabler/icons-react";

const REJECTION_REASONS = [
  "ID Document is blurry or unreadable",
  "Name on ID does not match profile name",
  "ID has expired",
  "Document appears to be tampered with",
  "Selfie does not match ID photo",
  "Incorrect document type provided",
];

export function VerifyUserModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
  actionType,
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setLoading(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    setLoading(true);
    // Passes status and reason back to the parent handler
    await onConfirm(actionType, reason);
    setLoading(false);
  };

  const isReject = actionType === "rejected";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isReject ? (
              <IconAlertTriangle className="text-destructive" size={20} />
            ) : (
              <IconCheck className="text-green-600" size={20} />
            )}
            {isReject ? "Reject Verification" : "Approve Verification"}
          </DialogTitle>
          <DialogDescription>
            {isReject
              ? `Please select a reason for rejecting ${userName}'s identity verification.`
              : `Are you sure you want to approve the identity of ${userName}?`}
          </DialogDescription>
        </DialogHeader>

        {isReject && (
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Rejection Reason
            </label>
            <Select onValueChange={setReason} value={reason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                {REJECTION_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={isReject ? "destructive" : "default"}
            className={
              !isReject ? "bg-green-600 hover:bg-green-700 text-white" : ""
            }
            onClick={handleConfirm}
            disabled={loading || (isReject && !reason)}
          >
            {loading && <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isReject ? "Confirm Rejection" : "Confirm Approval"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
