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
  Layers,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import BulkForm from "../BulkForm";

const CampaignDialog = ({
  isOpen,
  onOpenChange,
  isEditing,
  form,
  setForm,
  prizes = [],
  loading,
  onSubmit,
  // Bulk create props
  onBulkSubmit,
  bulkLoading,
}) => {
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState("single"); // "single" | "bulk"

  // Reset errors and mode whenever the dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setMode("single");
    }
  }, [isOpen]);

  // When editing, always force single mode
  useEffect(() => {
    if (isEditing) setMode("single");
  }, [isEditing]);

  const prizesList = Array.isArray(prizes) ? prizes : [];

  const validateForm = () => {
    const newErrors = {};

    if (!form.title?.trim()) {
      newErrors.title = "Campaign title is required";
    }
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
      <DialogContent className="w-[95vw] max-w-[560px] sm:max-w-[560px] rounded-2xl gap-0 p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-5 sm:p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-brand-aqua/10 p-2.5 rounded-xl">
              <Trophy className="h-5 w-5 text-brand-aqua" />
            </div>
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isEditing ? "Update Campaign" : "Create Campaign"}
              </DialogTitle>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isEditing ? "Modify the details of your campaign" : "Set up a new giveaway draw"}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* ─── Mode Tabs (only when creating, not editing) ─── */}
        {!isEditing && (
          <div className="px-6 pt-5 pb-0 bg-white">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-full">
              <button
                onClick={() => setMode("single")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-200",
                  mode === "single"
                    ? "bg-white text-brand-aqua shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Single
              </button>
              <button
                onClick={() => setMode("bulk")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-200",
                  mode === "bulk"
                    ? "bg-white text-brand-aqua shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Layers className="h-3.5 w-3.5" />
                Bulk Create
              </button>
            </div>
          </div>
        )}

        {/* ─── SINGLE MODE ─── */}
        {mode === "single" && (
          <>
            <div className="px-6 py-5 space-y-5 bg-white">
              <div className="grid grid-cols-1 gap-5">
                {/* Campaign Title Field */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 mb-1">
                    {/* <Type className="h-4 w-4" /> */}
                    Campaign Title
                  </label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Weekly Mega Draw"
                    className={cn(
                      "h-11 rounded-xl bg-white border-slate-200 focus:bg-white transition-all text-sm font-medium",
                      errors.title && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.title && <ErrorMsg msg={errors.title} />}
                </div>

                {/* Campaign Date Field */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 mb-1">
                    {/* <CalendarDays className="h-4 w-4" /> */}
                    Campaign Date
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-11 justify-start text-left font-medium border-slate-200 rounded-xl bg-white text-sm",
                          !form.date && "text-muted-foreground",
                          errors.date && "border-red-500 focus-visible:ring-red-500"
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {form.date ? format(new Date(form.date), "PPP") : <span>Select any day of the week</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[100] pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={form.date ? new Date(form.date) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            // Using YYYY-MM-DD format as that's what backend expects
                            const tzOffset = date.getTimezoneOffset() * 60000;
                            const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);

                            setForm({ ...form, date: localISOTime });
                            if (errors.date) setErrors({ ...errors, date: null });
                          }
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (!isEditing && date < today) return true;
                          return false;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-[11px] text-slate-400 mt-1 italic leading-tight">
                    * You can select any day. The system will automatically schedule the campaign for the <strong>Friday</strong> of that selected week.
                  </p>
                  {errors.date && <ErrorMsg msg={errors.date} />}
                </div>

                {/* Select Prize Field */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                    {/* <Trophy className="h-4 w-4" /> */}
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
                        "h-11 rounded-xl border-slate-200 bg-white font-medium text-sm",
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
          </>
        )}

        {/* ─── BULK MODE ─── */}
        {mode === "bulk" && (
          <div className="p-6 bg-white">
            <BulkForm
              prizes={prizesList}
              onSubmit={onBulkSubmit}
              isSubmitting={bulkLoading}
              isPrizesLoading={loading}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDialog;