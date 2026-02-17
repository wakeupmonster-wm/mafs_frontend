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
import { Loader2, Gift } from "lucide-react";

export default function BulkForm({
  prizes,
  onSubmit,
  isSubmitting,
  isPrizesLoading,
}) {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    prizeId: "",
    supportiveItems: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);

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
    const items = form.supportiveItems
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    onSubmit({ ...form, supportiveItems: items });

    setForm({ startDate: "", endDate: "", prizeId: "", supportiveItems: "" });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Start Date</label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className={errors.startDate ? "border-red-500" : ""}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">End Date</label>
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className={errors.endDate ? "border-red-500" : ""}
          />
        </div>
      </div>

      {errors.dateRange && (
        <p className="text-red-500 text-xs">{errors.dateRange}</p>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold">Select Prize</label>
        <Select
          value={form.prizeId}
          onValueChange={(v) => setForm({ ...form, prizeId: v })}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={isPrizesLoading ? "Loading..." : "Select Prize"}
            />
          </SelectTrigger>
          <SelectContent>
            {prizes.map((p) => (
              <SelectItem key={p._id} value={p._id} disabled={!p.isActive}>
                <div className="flex justify-between w-full gap-4">
                  <span>{p.title}</span>
                  <Badge variant={p.isActive ? "success" : "secondary"}>
                    {p.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
          Supportive Items (Optional)
        </label>
        <Input
          placeholder="Item 1, Item 2..."
          value={form.supportiveItems}
          onChange={(e) =>
            setForm({ ...form, supportiveItems: e.target.value })
          }
        />
      </div>

      <Button
        className="w-full mt-2 bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 font-semibold gap-2 h-11 px-4 shadow-sm shadow-neutral-400"
        onClick={handleAction}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 animate-spin" /> Processing...
          </>
        ) : (
          "Generate Campaigns"
        )}
      </Button>
    </div>
  );
}
