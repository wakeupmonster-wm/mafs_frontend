

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconAlertTriangle } from "@tabler/icons-react";

export function BanUserModal({ isOpen, onClose, onConfirm, userName }) {
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Combine category and specific reason
    const finalReason = `${category}: ${reason}`;
    await onConfirm(finalReason);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <IconAlertTriangle size={24} />
            <DialogTitle>Ban User Account</DialogTitle>
          </div>
          <DialogDescription>
            You are about to restrict access for <strong>{userName}</strong>.
            This action will be logged in the admin audit trail.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Violation Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fake Profile">Fake Profile / Bot</SelectItem>
                <SelectItem value="Harassment">
                  Harassment / Abusive Behavior
                </SelectItem>
                <SelectItem value="Inappropriate Content">
                  Inappropriate Photos/Bio
                </SelectItem>
                <SelectItem value="Underage">Underage User</SelectItem>
                <SelectItem value="Scamming">
                  Solicitation / Scamming
                </SelectItem>
                <SelectItem value="Other">Other Reason</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Internal Notes (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Provide more details for other admins..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!category || loading}
          >
            {loading ? "Processing..." : "Confirm Ban"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
