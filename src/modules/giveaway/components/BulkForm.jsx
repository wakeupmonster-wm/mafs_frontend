import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CalendarRange,
  CalendarDays,
  Trophy,
  Rocket,
  AlertCircle,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BulkForm({
  prizes = [],
  onSubmit,
  isSubmitting,
  isPrizesLoading,
}) {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    prizeId: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);

    if (!form.title?.trim()) newErrors.title = "Campaign batch title required";
    if (!form.startDate) newErrors.startDate = "Start date required";
    if (!form.endDate) newErrors.endDate = "End date required";
    if (form.startDate && form.endDate && start > end)
      newErrors.dateRange = "End date cannot be before start date";
    if (!form.prizeId) newErrors.prizeId = "Please select a prize";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = () => {
    if (!validate()) return;
    onSubmit({ ...form, supportiveItems: [] });
    setForm({ title: "", startDate: "", endDate: "", prizeId: "" });
  };

  const ErrorMsg = ({ msg }) => (
    <p className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-1">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );

  return (
    <div className="space-y-6">
      {/* Batch Title Section */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
          <Type className="h-4 w-4 text-brand-aqua" />
          Campaign Batch Name
        </label>
        <Input
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: null });
          }}
          placeholder="e.g. Easter Special Draws - April 2026"
          className={cn(
            "h-11 bg-white rounded-xl",
            errors.title && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {errors.title && <ErrorMsg msg={errors.title} />}
      </div>

      {/* Date Range Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
          <CalendarRange className="h-4 w-4 text-brand-aqua" />
          Campaign Date Range
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" />
              Start Date
            </label>
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => {
                setForm({ ...form, startDate: e.target.value });
                if (errors.startDate)
                  setErrors({ ...errors, startDate: null });
              }}
              className={cn(
                "h-11 bg-white",
                errors.startDate &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.startDate && <ErrorMsg msg={errors.startDate} />}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" />
              End Date
            </label>
            <Input
              type="date"
              value={form.endDate}
              onChange={(e) => {
                setForm({ ...form, endDate: e.target.value });
                if (errors.endDate)
                  setErrors({ ...errors, endDate: null });
              }}
              className={cn(
                "h-11 bg-white",
                errors.endDate &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.endDate && <ErrorMsg msg={errors.endDate} />}
          </div>
        </div>
        {errors.dateRange && <ErrorMsg msg={errors.dateRange} />}
        <p className="text-[11px] text-slate-400 mt-2 italic">
          * Select any date range. The system will smartly generate campaigns ONLY for the Fridays that fall within this range.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200" />

      {/* Prize Section */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
            <Trophy className="h-4 w-4 text-brand-aqua" />
            Assign Prize
          </label>
          <Select
            value={form.prizeId}
            onValueChange={(v) => {
              setForm({ ...form, prizeId: v });
              if (errors.prizeId)
                setErrors({ ...errors, prizeId: null });
            }}
          >
            <SelectTrigger
              className={cn(
                "h-11 bg-white",
                errors.prizeId &&
                  "border-red-500 focus-visible:ring-red-500"
              )}
            >
              <SelectValue
                placeholder={
                  isPrizesLoading ? "Loading prizes..." : "Choose a prize for all campaigns"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {isPrizesLoading ? (
                <div className="p-3 text-sm text-center text-slate-500">
                  Loading prizes...
                </div>
              ) : prizes.length === 0 ? (
                <div className="p-3 text-sm text-center text-slate-500">
                  No prizes found
                </div>
              ) : (
                prizes.map((p) => (
                  <SelectItem
                    key={p._id}
                    value={p._id}
                    disabled={!p.isActive}
                    className="py-2"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Trophy className="h-3.5 w-3.5 text-amber-500" />
                      {p.title}
                      {!p.isActive && (
                        <Badge variant="secondary" className="text-[9px] ml-1">
                          Inactive
                        </Badge>
                      )}
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {errors.prizeId && <ErrorMsg msg={errors.prizeId} />}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200" />

      {/* Submit */}
      <Button
        className="w-full bg-brand-aqua hover:bg-brand-aqua/90 text-white font-semibold gap-2 h-12 text-sm shadow-lg shadow-brand-aqua/20 transition-all active:scale-[0.98]"
        onClick={handleAction}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          <>
            <Rocket className="h-4 w-4" /> Generate Campaigns
          </>
        )}
      </Button>
    </div>
  );
}