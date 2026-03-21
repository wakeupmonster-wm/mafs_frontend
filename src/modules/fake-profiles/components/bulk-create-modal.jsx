import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconUsersPlus } from "@tabler/icons-react";

const GENDER_OPTIONS = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "trans-man", label: "Trans Man" },
  { value: "trans-women", label: "Trans Women" },
  { value: "genderqueer", label: "Genderqueer" },
  { value: "everyone", label: "Everyone (Mixed)" },
];

const CITY_OPTIONS = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Gold Coast",
  "Canberra",
];

export function BulkCreateModal({ isOpen, onClose, onConfirm }) {
  const [count, setCount] = useState(10);
  const [gender, setGender] = useState("women");
  const [minAge, setMinAge] = useState(22);
  const [maxAge, setMaxAge] = useState(35);
  const [city, setCity] = useState("Sydney");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (count < 1 || count > 500) return;
    setLoading(true);
    try {
      await onConfirm({
        count: Number(count),
        gender,
        ageRange: {
          min: Number(minAge),
          max: Number(maxAge),
        },
        city,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-brand-aqua mb-1">
            <IconUsersPlus size={22} />
            <DialogTitle className="text-base">Bulk Create Fake Profiles</DialogTitle>
          </div>
          <DialogDescription className="text-xs">
            Configure the parameters for generating fake profiles. All profiles are automatically flagged as fake.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-3">
          {/* Row 1: Count + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="count" className="text-xs">Count (1–500)</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="500"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="h-9 text-sm focus-visible:ring-brand-aqua"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-9 text-sm focus:ring-brand-aqua">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Age Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="minAge" className="text-xs">Min Age</Label>
              <Input
                id="minAge"
                type="number"
                min="18"
                max="60"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="h-9 text-sm focus-visible:ring-brand-aqua"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="maxAge" className="text-xs">Max Age</Label>
              <Input
                id="maxAge"
                type="number"
                min="18"
                max="60"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="h-9 text-sm focus-visible:ring-brand-aqua"
              />
            </div>
          </div>

          {/* Row 3: City */}
          <div className="space-y-1.5">
            <Label className="text-xs">Target City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-9 text-sm focus:ring-brand-aqua">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {CITY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={loading || count < 1 || count > 500}
            className="bg-brand-aqua hover:bg-brand-aqua/80 text-white font-semibold"
          >
            {loading ? "Creating..." : `Generate ${count} Profiles`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
