import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BroadcastTab = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    campaignName: "",
    title: "",
    message: "",
    target: "all_users",
    cta: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Internal Campaign Name (e.g., Summer Promo 2026)"
          required
          value={form.campaignName}
          onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
        />
        <Select
          value={form.target}
          onValueChange={(v) => setForm({ ...form, target: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_users">All Users</SelectItem>
            <SelectItem value="free_users">Free Users Only</SelectItem>
            <SelectItem value="premium_users">Premium Users Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        placeholder="Notification Title (The bold text)"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="relative">
        <Textarea
          placeholder="Notification Message..."
          required
          maxLength={200}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
          {form.message.length}/200
        </span>
      </div>

      <Input
        placeholder="Deep Link / CTA URL (Optional)"
        value={form.cta}
        onChange={(e) => setForm({ ...form, cta: e.target.value })}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending Broadcast..." : "Send Push Notification"}
      </Button>
    </form>
  );
};
