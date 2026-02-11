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
  Plus,
  Edit2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CampaignDialog = ({
  isOpen,
  onClose,
  editMode,
  form,
  setForm,
  prizes = [],
  loading,
  submit,
}) => {
  const [errors, setErrors] = useState({});

  // 1. Reset errors whenever the dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const prizesList = Array.isArray(prizes) ? prizes : [];

  // 2. Internal Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!form.date) {
      newErrors.date = "Campaign date is required";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!editMode && selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!form.prizeId) {
      newErrors.prizeId = "Please select a prize for this campaign";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. Intercept Submit
  const handleOnSubmit = () => {
    if (validateForm()) {
      submit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-none p-0 overflow-hidden sm:max-w-lg">
        <DialogHeader className="bg-gray-50/80 px-6 py-4 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
            {editMode ? (
              <Edit2 className="h-5 w-5 text-amber-500" />
            ) : (
              <Plus className="h-5 w-5 text-black" />
            )}
            {editMode ? "Edit Campaign" : "Create New Campaign"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          <div className="grid grid-cols-1 gap-5">
            {/* Campaign Date Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                Campaign Date
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => {
                  setForm({ ...form, date: e.target.value });
                  if (errors.date) setErrors({ ...errors, date: null }); // Clear error on change
                }}
                className={cn(
                  "h-11 border-gray-200 transition-all",
                  errors.date && "border-red-500 focus:ring-red-200"
                )}
                min={
                  editMode ? undefined : new Date().toISOString().split("T")[0]
                }
              />
              {errors.date && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="h-3 w-3" /> {errors.date}
                </p>
              )}
            </div>

            {/* Select Prize Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Trophy className="h-4 w-4 text-gray-500" />
                Select Prize
              </label>
              <Select
                value={form.prizeId}
                onValueChange={(v) => {
                  setForm({ ...form, prizeId: v });
                  if (errors.prizeId) setErrors({ ...errors, prizeId: null }); // Clear error on change
                }}
              >
                <SelectTrigger
                  className={cn(
                    "h-11 border-gray-200 transition-all",
                    errors.prizeId && "border-red-500 focus:ring-red-200"
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
              {errors.prizeId && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="h-3 w-3" /> {errors.prizeId}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="bg-gray-50/80 px-6 py-4 border-t border-gray-100 flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOnSubmit}
            disabled={loading}
            className="h-11 px-8 gap-2 bg-black hover:bg-zinc-800 text-white font-semibold transition-all shadow-md active:scale-95"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : editMode ? (
              <>
                <Edit2 className="h-4 w-4" /> Update Campaign
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Create Campaign
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;
