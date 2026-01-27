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

export const EmailTab = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    campaignName: "",
    subject: "",
    body: "",
    target: "all",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <Input
        placeholder="Campaign Name"
        required
        value={form.campaignName}
        onChange={(e) => setForm({ ...form, campaignName: e.target.value })}
      />
      <Input
        placeholder="Subject"
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <Textarea
        rows={6}
        placeholder="Email body (HTML/Text)"
        required
        value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
      />
      <Select
        value={form.target}
        onValueChange={(v) => setForm({ ...form, target: v })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Target" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          <SelectItem value="free">Free Users</SelectItem>
          <SelectItem value="premium">Premium Users</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Queue Email Campaign"}
      </Button>
    </form>
  );
};
