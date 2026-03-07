import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { toast } from "sonner";
import {
  IconEdit,
  IconLoader2,
  IconAlertCircle,
  IconShieldCheck,
  IconLock,
  IconClockPause,
  IconGavel,
  IconInfoCircle,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  bannedUserProfile,
  unbanUserProfile,
  suspendUserProfile,
   unsuspendUserProfile, 
} from "../../store/user.slice";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const EditSettingsDialog = ({ userData }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const currentStatus = userData.account.status;

  // ✅ FIX: Start with empty string (no selection) instead of current status
  const [status, setStatus] = useState("");

  // ✅ Reset everything when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setStatus("");       // Reset to empty = placeholder visible
      setReason("");
    }
  }, [isOpen]);

  const handleSave = async () => {
    // ✅ Guard: Nothing selected
    if (!status) {
      toast.error("Please select an action first");
      return;
    }

    setLoading(true);
    const nickname = userData?.profile?.nickname || "User";
 try {
    // ✅ FIX: Alag-alag action based on CURRENT status
    if (status === "active") {
      // Restore karna hai - check kahan se aa raha hai
      if (currentStatus === "banned") {
        // ✅ Banned → Active = Unban API
        await dispatch(unbanUserProfile(userData._id)).unwrap();
        toast.success("Account Unbanned", {
          description: `${nickname} ban has been lifted.`,
        });
      } else if (currentStatus === "suspended") {
        // ✅ Suspended → Active = Unsuspend API
        await dispatch(unsuspendUserProfile(userData._id)).unwrap();
        toast.success("Suspension Lifted", {
          description: `${nickname} can now access their profile.`,
        });
      }
    } else if (status === "banned") {
      // ✅ Ban karna hai
      await dispatch(
        bannedUserProfile({
          userId: userData._id,
          category: "Administrative",
          reason: reason || "Manual ban by admin",
        })
      ).unwrap();
      toast.success("User Banned", {
        description: `${nickname} is now restricted.`,
      });
    } else if (status === "suspended") {
      // ✅ Suspend karna hai
      const hours = 24;
      await dispatch(
        suspendUserProfile({
          userId: userData._id,
          reason: reason || "Temporary suspension",
          durationHours: hours,
        })
      ).unwrap();
      toast.success("User Suspended", {
        description: `Access restricted for ${hours} hours.`,
      });
    }

    setIsOpen(false);
    setReason("");
  } catch (err) {
    toast.error(err || "Update failed");
  } finally {
    setLoading(false);
  }
};

  // Status config helper
  const getStatusConfig = (val) => {
    switch (val) {
      case "active":
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-100",
          icon: <IconShieldCheck />,
        };
      case "banned":
        return {
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-100",
          icon: <IconLock />,
        };
      case "suspended":
        return {
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
          icon: <IconClockPause />,
        };
      default:
        return {
          color: "text-slate-500",
          bg: "bg-slate-50",
          border: "border-slate-200",
          icon: <IconGavel />,
        };
    }
  };

  // ✅ Use selected status config, or default when nothing selected
  const config = getStatusConfig(status || null);
  const currentConfig = getStatusConfig(currentStatus);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 transition-colors"
        >
          <IconEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md gap-0 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <span
              className={cn(
                "p-2 rounded-lg",
                config.bg,
                config.color,
                status === "suspended" && "animate-pulse"
              )}
            >
              {React.cloneElement(config.icon, { size: 20 })}
            </span>
            Administrative Control
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2 space-y-6">
          {/* ✅ NEW: Current Status Indicator - Always visible at top */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Current Status
              </span>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "font-bold text-xs capitalize px-3 py-1",
                currentConfig.color,
                currentConfig.bg,
                currentConfig.border
              )}
            >
              {React.cloneElement(currentConfig.icon, {
                size: 14,
                className: "mr-1",
              })}
              {currentStatus}
            </Badge>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Account Governance
            </Label>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                className={cn(
                  "h-12 w-full border-2 transition-all focus:ring-offset-0",
                  !status && "text-muted-foreground"  // ✅ Dim when placeholder
                )}
              >
                <SelectValue placeholder="Choose an action to perform..." />
              </SelectTrigger>
              <SelectContent>
                {currentStatus === "banned" ? (
                  <>
                    <SelectItem
                      value="active"
                      className="text-green-600 font-bold focus:bg-green-50"
                    >
                      ✅ Unban & Restore Account
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
                      ✅ Lift Suspension (Set Active)
                    </SelectItem>
                    <SelectItem
                      value="banned"
                      className="text-red-600 font-bold"
                    >
                      🚫 Upgrade to Permanent Ban
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

            {/* ✅ CONDITIONAL: Show placeholder OR status description */}
            {!status ? (
              // ===== PLACEHOLDER STATE: When nothing is selected =====
              <div
                className={cn(
                  "p-4 rounded-lg border-2 border-dashed border-slate-200",
                  "bg-slate-50/50 flex flex-col items-center justify-center",
                  "text-center gap-2 py-6"
                )}
              >
                <div className="p-2.5 bg-white rounded-full border border-slate-200 shadow-sm">
                  <IconInfoCircle size={22} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Select an action above
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-[250px] leading-relaxed">
                    Choose to suspend or ban this account. The impact details
                    will appear here once you make a selection.
                  </p>
                </div>
              </div>
            ) : (
              // ===== ACTIVE STATE: When something is selected =====
              <div
                className={cn(
                  "p-3 rounded-lg border flex items-start gap-3 transition-all",
                  "animate-in fade-in slide-in-from-top-2 duration-300",
                  config.bg,
                  config.border
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
                      config.color
                    )}
                  >
                    Action: {status}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {status === "active" &&
                      "Restores all login privileges. The user will be able to swipe, match, and chat immediately."}
                    {status === "banned" &&
                      "Revokes all access. User's profile will be hidden and they will be force-logged out."}
                    {status === "suspended" &&
                      "Temporary restriction. User remains in database but cannot perform matches or chats."}
                  </p>
                </div>
              </div>
            )}

            {/* Reason textarea - only when ban/suspend selected */}
            {(status === "banned" || status === "suspended") && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Reason for {status === "banned" ? "ban" : "suspension"}
                </Label>
                <Textarea
                  placeholder={
                    status === "banned"
                      ? "e.g., Repeated policy violations, fake profile..."
                      : "e.g., Reported by multiple users, under investigation..."
                  }
                  className="text-xs resize-none min-h-[80px]"
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
            onClick={() => setIsOpen(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !status}  // ✅ Disabled when nothing selected
            className={cn(
              "flex-[2] font-bold shadow-sm transition-all",
              !status
                ? "bg-slate-400"
                : status === "banned"
                ? "bg-red-600 hover:bg-red-700"
                : status === "active"
                ? "bg-green-600 hover:bg-green-700"
                : status === "suspended"
                ? "bg-amber-600 hover:bg-amber-700"
                : ""
            )}
          >
            {loading ? (
              <IconLoader2 className="animate-spin" />
            ) : !status ? (
              "Select an Action"
            ) : (
              "Apply Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};