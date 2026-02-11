import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const PrizeDialog = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  onSubmit,
  loading,
  isEditing,
}) => {
  const [errors, setErrors] = useState({});

  // Clear errors when dialog opens/closes
  useEffect(() => {
    if (!isOpen) setErrors({});
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!form.title?.trim()) newErrors.title = "Prize title is required";
    if (!form.type) newErrors.type = "Please select a prize type";

    if (!form.value || isNaN(form.value)) {
      newErrors.value = "Valid value is required";
    } else if (Number(form.value) <= 0) {
      newErrors.value = "Value must be greater than 0";
    }

    if (!form.spinWheelLabel?.trim()) {
      newErrors.spinWheelLabel = "Spin wheel label is required";
    }

    // Optional: Validate supportive items if you want a minimum count
    const items = form.supportiveItems
      ?.split(",")
      .filter((i) => i.trim() !== "");
    if (!items || items.length < 2) {
      newErrors.supportiveItems = "At least 2 supportive items are recommended";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = () => {
    if (validate()) {
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
        <DialogHeader className="p-6 bg-slate-900 text-white">
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isEditing ? "Update Prize Details" : "Create New Prize Asset"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5 bg-white">
          {/* Prize Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Prize Title
            </Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Premium Membership"
              className={cn(
                "h-11",
                errors.title && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.title && <ErrorMsg msg={errors.title} />}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Type
              </Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm({ ...form, type: v })}
              >
                <SelectTrigger
                  className={cn("h-11", errors.type && "border-red-500")}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE_PREMIUM">Free Premium</SelectItem>
                  <SelectItem value="GIFT_CARD">Gift Card</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <ErrorMsg msg={errors.type} />}
            </div>

            {/* Value */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Value
              </Label>
              <Input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className={cn(
                  "h-11",
                  errors.value && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.value && <ErrorMsg msg={errors.value} />}
            </div>
          </div>

          {/* Spin Wheel Label */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Spin Wheel Label
            </Label>
            <Input
              value={form.spinWheelLabel}
              placeholder="Display text on wheel"
              onChange={(e) =>
                setForm({ ...form, spinWheelLabel: e.target.value })
              }
              className={cn(
                "h-11",
                errors.spinWheelLabel &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.spinWheelLabel && <ErrorMsg msg={errors.spinWheelLabel} />}
          </div>

          {/* Supportive Items */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Supportive Items
            </Label>
            <Input
              value={form.supportiveItems}
              onChange={(e) =>
                setForm({ ...form, supportiveItems: e.target.value })
              }
              placeholder="Item 1, Item 2, Item 3"
              className={cn(
                "h-11",
                errors.supportiveItems &&
                  "border-amber-400 focus-visible:ring-amber-400"
              )}
            />
            <p className="text-[10px] text-slate-400 italic">
              Separate items with commas
            </p>
            {errors.supportiveItems && (
              <ErrorMsg msg={errors.supportiveItems} />
            )}
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
            onClick={handleAction}
            disabled={loading}
            className="bg-slate-900 hover:bg-slate-800 text-white min-w-[140px] h-11 shadow-lg shadow-slate-200"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Prize"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
