import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkCreateCampaign, fetchPrizes } from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function BulkCampaigns() {
  const dispatch = useDispatch();
  const { prizes, loading } = useSelector((s) => s.giveaway);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    prizeId: "",
    supportiveItems: "",
  });

  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  const submit = () => {
    if (!form.startDate || !form.endDate || !form.prizeId) {
      alert("Start date, End date & Prize are required");
      return;
    }

    dispatch(
      bulkCreateCampaign({
        ranges: [
          {
            startDate: form.startDate,
            endDate: form.endDate,
            prizeId: form.prizeId,
            supportiveItems: form.supportiveItems
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean),
          },
        ],
        isActive: true,
      })
    );

    setForm({
      startDate: "",
      endDate: "",
      prizeId: "",
      supportiveItems: "",
    });
  };

  return (
    <Card className="p-6 space-y-4 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold">Bulk Create Campaigns</h2>
        <p className="text-sm text-muted-foreground">
          Create campaigns for a date range using one prize
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <Input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <Select
          value={form.prizeId}
          onValueChange={(v) =>
            setForm({ ...form, prizeId: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Prize" />
          </SelectTrigger>

          <SelectContent>
            {prizes.map((p) => (
              <SelectItem key={p._id} value={p._id}>
                {p.title}{" "}
                {!p.isActive && (
                  <Badge
                    variant="destructive"
                    className="ml-2"
                  >
                    Inactive
                  </Badge>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Supportive items (comma separated)"
          value={form.supportiveItems}
          onChange={(e) =>
            setForm({
              ...form,
              supportiveItems: e.target.value,
            })
          }
        />
      </div>

      <Button onClick={submit} disabled={loading}>
        {loading ? "Processing..." : "Create Campaigns"}
      </Button>
    </Card>
  );
}