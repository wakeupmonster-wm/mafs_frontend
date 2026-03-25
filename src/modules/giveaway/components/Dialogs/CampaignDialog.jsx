import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Trophy,
  Gift,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CampaignDialog = ({
  isOpen,
  onOpenChange,
  isEditing,
  form,
  setForm,
  prizes = [],
  loading,
  onSubmit,
}) => {
  const [errors, setErrors] = useState({});

  // Reset errors whenever the dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const prizesList = Array.isArray(prizes) ? prizes : [];

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!form.date) {
      newErrors.date = "Campaign date is required";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!isEditing && selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!form.prizeId) {
      newErrors.prizeId = "Please select a prize for this campaign";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Intercept Submit
  const handleOnSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const ErrorMsg = ({ msg }) => (
    <p className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-1">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] gap-0 p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-brand-aqua text-white">
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isEditing ? "Update Campaign Details" : "Create New Campaign"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5 bg-white">
          <div className="grid grid-cols-1 gap-5">
            {/* Campaign Date Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <CalendarDays className="h-4 w-4" />
                Campaign Date
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => {
                  setForm({ ...form, date: e.target.value });
                  if (errors.date) setErrors({ ...errors, date: null });
                }}
                className={cn(
                  "h-11",
                  errors.date && "border-red-500 focus-visible:ring-red-500"
                )}
                min={
                  isEditing ? undefined : new Date().toISOString().split("T")[0]
                }
              />
              {errors.date && <ErrorMsg msg={errors.date} />}
            </div>

            {/* Select Prize Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                <Trophy className="h-4 w-4" />
                Select Prize
              </label>
              <Select
                value={form.prizeId}
                onValueChange={(v) => {
                  setForm({ ...form, prizeId: v });
                  if (errors.prizeId) setErrors({ ...errors, prizeId: null });
                }}
              >
                <SelectTrigger
                  className={cn(
                    "h-11",
                    errors.prizeId && "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Choose a campaign prize" />
                </SelectTrigger>
                <SelectContent>
                  {prizesList.length === 0 ? (
                    <div className="p-3 text-sm text-center text-gray-500">
                      No active prizes available
                    </div>
                  ) : (
                    prizesList
                      .filter((p) => p && p.isActive)
                      .map((p) => (
                        <SelectItem key={p._id} value={p._id} className="py-2">
                          <span className="flex items-center gap-2 font-medium">
                            <Gift className="h-4 w-4 text-amber-500" />
                            {p.title}
                          </span>
                        </SelectItem>
                      ))
                  )}
                </SelectContent>
              </Select>
              {errors.prizeId && <ErrorMsg msg={errors.prizeId} />}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="font-semibold text-slate-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOnSubmit}
            disabled={loading}
            className="bg-brand-aqua hover:bg-brand-aqua/90 text-white min-w-[140px] h-11 shadow-lg shadow-brand-aqua/20"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Campaign"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;
