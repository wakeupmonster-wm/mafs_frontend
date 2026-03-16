import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  IconLoader2,
  IconAlertCircle,
  IconShieldCheck,
  IconLock,
  IconClockPause,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  bannedUserProfile,
  unbanUserProfile,
  suspendUserProfile,
  fetchUserData,
} from "../../store/user.slice";

export const ManageAccountDialog = ({ isOpen, onOpenChange, userData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const currentStatus = userData?.account?.status;
  const [status, setStatus] = useState(currentStatus);

  useEffect(() => {
    if (isOpen) {
      setStatus(currentStatus);
      setReason("");
    }
  }, [isOpen, currentStatus]);

  const handleSave = async () => {
    setLoading(true);
    const nickname = userData?.profile?.nickname || "User";

    try {
      // Logic for RESTORING/UNBANNING
      if (status === "active" && currentStatus !== "active") {
        await dispatch(unbanUserProfile(userData._id)).unwrap();
        toast.success("Account Restored", {
          description: `${nickname} is now active.`,
        });
      }
      // Logic for BANNING
      else if (status === "banned") {
        await dispatch(
          bannedUserProfile({
            userId: userData._id,
            category: "Administrative",
            reason: reason || "Manual ban by admin",
          }),
        ).unwrap();
        toast.success("User Banned", {
          description: `${nickname} is restricted.`,
        });
      }
      // Logic for SUSPENDING
      else if (status === "suspended") {
        await dispatch(
          suspendUserProfile({
            userId: userData._id,
            reason: reason || "Temporary suspension",
            durationHours: 24, // Default or add a select for duration
          }),
        ).unwrap();
        toast.success("User Suspended", {
          description: "Access restricted for 24 hours.",
        });
      }

      // 2. AUTOMATICALLY RE-FETCH the fresh data from the server
      await dispatch(fetchUserData(userData._id));

      onOpenChange(false);
    } catch (err) {
      toast.error(err || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (val) => {
    const configs = {
      active: {
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-100",
        icon: <IconShieldCheck />,
      },
      banned: {
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-100",
        icon: <IconLock />,
      },
      suspended: {
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100",
        icon: <IconClockPause />,
      },
    };
    return configs[val] || configs.active;
  };

  const config = getStatusConfig(status);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 p-0 overflow-hidden bg-white rounded-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <span
              className={cn(
                "p-2 rounded-lg",
                config.bg,
                config.color,
                status === "suspended" && "animate-pulse",
              )}
            >
              {React.cloneElement(config.icon, { size: 20 })}
            </span>
            Administrative Control
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Account Governance
            </Label>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-12 w-full border-2 transition-all">
                <SelectValue placeholder="Select Action" />
              </SelectTrigger>
              <SelectContent>
                {/* Dynamically filter options based on currentStatus for better UX */}
                {currentStatus === "banned" ? (
                  <>
                    <SelectItem
                      value="active"
                      className="text-green-600 font-bold focus:bg-green-50"
                    >
                      ✅ Restore Account to Active
                    </SelectItem>
                    <SelectItem value="suspended" className="text-amber-600">
                      ⏳ Switch to Suspension
                    </SelectItem>
                  </>
                ) : currentStatus === "suspended" ? (
                  <>
                    <SelectItem
                      value="active"
                      className="text-green-600 font-bold"
                    >
                      ✅ Switch to Account (Set Active)
                    </SelectItem>
                    <SelectItem
                      value="banned"
                      className="text-red-600 font-bold"
                    >
                      🚫 Switch to Ban Permanently
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem
                      value="suspended"
                      className="text-amber-600 font-medium"
                    >
                      ⚠️ Suspend Account
                    </SelectItem>
                    <SelectItem
                      value="banned"
                      className="text-red-600 font-bold"
                    >
                      🚫 Ban Account Permanently
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>

            <div
              className={cn(
                "p-3 rounded-lg border flex items-start gap-3",
                config.bg,
                config.border,
              )}
            >
              <IconAlertCircle
                className={cn("shrink-0 mt-0.5", config.color)}
                size={16}
              />
              <div className="space-y-1">
                <p
                  className={cn(
                    "text-xs font-bold leading-none capitalize",
                    config.color,
                  )}
                >
                  Targeting: {status}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {status === "active" &&
                    "Restores all privileges. User can match and chat immediately."}
                  {status === "banned" &&
                    "Revokes all access. Profile hidden and user logged out."}
                  {status === "suspended" &&
                    "Temporary restriction. User cannot match or chat."}
                </p>
              </div>
            </div>

            {status !== "active" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Reason for {status}
                </Label>
                <Textarea
                  placeholder="Enter reason..."
                  className="text-xs resize-none"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="bg-muted/30 p-6 flex-row gap-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || status === currentStatus}
            className={cn(
              "flex-[2] font-bold",
              status === "banned"
                ? "bg-red-600 hover:bg-red-700"
                : status === "active"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-amber-600 hover:bg-amber-700",
            )}
          >
            {loading ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              "Apply Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
