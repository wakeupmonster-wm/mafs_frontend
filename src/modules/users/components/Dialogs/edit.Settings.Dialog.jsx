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
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  bannedUserProfile,
  unbanUserProfile,
  suspendUserProfile,
} from "../../store/user.slice";
import { Textarea } from "@/components/ui/textarea";

// export const EditSettingsDialog = () => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="sm">
//           <IconEdit size={16} />
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Administrative Control</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 py-4">
//           <Input
//             placeholder="Account Status"
//             defaultValue={userData.account.status}
//           />
//           <div className="flex gap-4">
//             <Button className="flex-1" variant="outline">
//               Reset Password
//             </Button>
//             <Button className="flex-1" variant="destructive">
//               Force Logout
//             </Button>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button onClick={() => toast.success("Settings saved")}>
//             Confirm Changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

export const EditSettingsDialog = ({ userData }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState(""); // Track reason for logs

  const currentStatus = userData.account.status;
  const [status, setStatus] = useState(currentStatus);

  // Sync state if userData changes while dialog is open
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  console.log("userData: ", userData);

  console.log("currentStatus: ", currentStatus);

  const handleSave = async () => {
    setLoading(true);
    const nickname = userData?.profile?.nickname || "User";

    try {
      console.log("call: ");

      if ((currentStatus === "banned" || "suspended") && status === "active") {
        await dispatch(unbanUserProfile(userData._id)).unwrap();
        toast.success("Account Restored", {
          description: `${nickname} can now access their profile.`,
        });

        console.log("call 1: ");
      } else if (status === "banned") {
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

        console.log("call 2: ");
      } else if (status === "suspended") {
        const hours = 24; // You could make this a state variable too
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

        console.log("call 3: ");
      }

      console.log("call 4: ");
      setIsOpen(false);
      setReason(""); // Reset reason
    } catch (err) {
      toast.error(err || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get status-specific UI colors
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
          color: "text-muted-foreground",
          bg: "bg-muted/50",
          border: "border-muted",
          icon: <IconAlertCircle />,
        };
    }
  };

  const config = getStatusConfig(status);

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
          <div className="space-y-3">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Account Governance
            </Label>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-12 w-full border-2 transition-all focus:ring-offset-0">
                <SelectValue placeholder="Select Action" />
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
                {/* <SelectItem
                  value="deactivated"
                  className="text-muted-foreground italic border-t mt-1"
                >
                  Mark as Deactivated
                </SelectItem> */}
              </SelectContent>
            </Select>

            {/* Dynamic Status Description */}
            <div
              className={cn(
                "p-3 rounded-lg border flex items-start gap-3 transition-colors",
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
                  Targeting: {status}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {status === "active" &&
                    "Restores all login privileges. The user will be able to swipe, match, and chat immediately."}
                  {status === "banned" &&
                    "Revokes all access. User's profile will be hidden and they will be force-logged out."}
                  {status === "suspended" &&
                    "Temporary restriction. User remains in database but cannot perform matches or chats."}
                  {status === "deactivated" &&
                    "Account remains but is inactive. Can be reactivated by the user manually."}
                </p>
              </div>
            </div>

            {(status === "banned" || status === "suspended") && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">
                  Reason for {status}
                </Label>
                <Textarea
                  placeholder="Enter reason for this action..."
                  className="text-xs resize-none"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* <div className="space-y-3">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Session Management
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-10 text-xs font-semibold hover:bg-muted"
              >
                Reset Password
              </Button>
              <Button
                variant="secondary"
                className="h-10 text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Force Logout
              </Button>
            </div>
          </div> */}
        </div>

        <DialogFooter className="bg-muted/30 p-6 flex-row gap-2">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || status === currentStatus}
            className={cn(
              "flex-[2] font-bold shadow-sm transition-all",
              status === "banned"
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
            ) : (
              "Apply Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
