import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const PremiumTab = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    campaignName: "",
    title: "",
    message: "",
    cta: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="p-6 space-y-4"
    >
      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mb-2">
        <p className="text-xs text-purple-700 font-medium">
          ✨ Target: All Active Premium Subscribers
        </p>
      </div>

      <Input
        placeholder="Campaign Name"
        required
        value={form.campaignName}
        onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
      />

      <Input
        placeholder="Premium Exclusive Title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Textarea
        placeholder="What's the update for our VIPs?"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <Input
        placeholder="Link to Premium Feature"
        value={form.cta}
        onChange={(e) => setForm({ ...form, cta: e.target.value })}
      />

      <Button
        type="submit"
        variant="default"
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Blast to Premium Users"}
      </Button>
    </form>
  );
};
