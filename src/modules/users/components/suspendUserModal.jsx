import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function SuspendUserModal({ isOpen, onClose, onConfirm, userName }) {
  const [reason, setReason] = React.useState("");
  const [duration, setDuration] = React.useState(24); // Default 24h

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspend {userName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold">
              Suspension Duration (Hours)
            </label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 24, 48, 72"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Reason for Suspension</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why the account is being suspended..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="warning"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => onConfirm(reason, duration)}
            disabled={!reason || !duration}
          >
            Confirm Suspension
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
