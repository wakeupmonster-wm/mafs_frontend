import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ExpiryTab = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    campaignName: "",
    title: "",
    message: "",
    daysBeforeExpiry: 3,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="p-6 space-y-4"
    >
      <Input
        placeholder="Automation Name (e.g., 3-Day Expiry Warning)"
        required
        value={form.campaignName}
        onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
      />

      <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
        <label className="text-sm font-semibold text-orange-800 whitespace-nowrap">
          Send when
        </label>
        <Input
          type="number"
          className="w-20 bg-white"
          value={form.daysBeforeExpiry}
          onChange={(e) =>
            setForm({ ...form, daysBeforeExpiry: e.target.value })
          }
        />
        <span className="text-sm font-semibold text-orange-800">
          days remain on subscription
        </span>
      </div>

      <Input
        placeholder="Retention Title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Textarea
        placeholder="Don't lose your perks! Renew now for..."
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <Button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700"
        disabled={loading}
      >
        {loading ? "Scheduling..." : "Start Expiry Campaign"}
      </Button>
    </form>
  );
};
