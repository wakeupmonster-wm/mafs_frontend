// import { useState, useEffect } from "react";
// import { AlertTriangle, Check, Loader2 } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// const REJECTION_REASONS = [
//   "ID Document is blurry or unreadable",
//   "Name on ID does not match profile name",
//   "ID has expired",
//   "Document appears to be tampered with",
//   "Selfie does not match ID photo",
//   "Incorrect document type provided",
//   "Other",
// ];

// export const RejectReasonDialog = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   isLoading = false,
//   userName = "this user",
// }) => {
//   const [reason, setReason] = useState("");

//   useEffect(() => {
//     if (!isOpen) setReason("");
//   }, [isOpen]);

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="sm:max-w-md glass-card border-border/50">
//         <DialogHeader>
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-destructive/10">
//               <AlertTriangle className="w-4 h-4 text-destructive" />
//             </div>
//             <div>
//               <DialogTitle className="text-base font-bold">
//                 Reject Verification
//               </DialogTitle>
//               <DialogDescription className="text-xs text-muted-foreground mt-1">
//                 Select a reason for rejecting {userName}'s identity
//                 verification.
//               </DialogDescription>
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="space-y-2 py-2">
//           <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
//             Rejection Reason
//           </label>
//           <Select value={reason} onValueChange={setReason}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select a reason..." />
//             </SelectTrigger>
//             <SelectContent>
//               {REJECTION_REASONS.map((r) => (
//                 <SelectItem key={r} value={r}>
//                   {r}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <DialogFooter className="gap-2 sm:gap-2">
//           <Button variant="outline" onClick={onClose} disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={() => onConfirm(reason)}
//             disabled={!reason || isLoading}
//             className="gap-2"
//           >
//             {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//             Confirm Rejection
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

import { useState, useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea"; // Ensure you have this shadcn component

const REJECTION_REASONS = [
  "ID Document is blurry or unreadable",
  "Name on ID does not match profile name",
  "ID has expired",
  "Document appears to be tampered with",
  "Selfie does not match ID photo",
  "Incorrect document type provided",
  "Other",
];

export const RejectReasonDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  userName = "this user",
}) => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setOtherReason("");
    }
  }, [isOpen]);

  // Logic to determine what to send back to the parent component
  const handleConfirm = () => {
    const finalReason = reason === "Other" ? otherReason : reason;
    onConfirm(finalReason);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md glass-card border-border/50">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                Reject Verification
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                Select a reason for rejecting {userName}&apos;s identity
                verification.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Rejection Reason
            </label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full">
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

          {/* Conditional Textarea for "Other" reason */}
          {reason === "Other" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Specific Reason
              </label>
              <Textarea
                placeholder="Describe the specific issue..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="min-h-[100px] resize-none text-sm"
              />
              <p className="text-[10px] text-muted-foreground italic">
                Provide clear details to help the user correct their submission.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            // Disable if no reason is selected, or if "Other" is selected but the textarea is empty
            disabled={
              !reason ||
              (reason === "Other" && !otherReason.trim()) ||
              isLoading
            }
            className="gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
