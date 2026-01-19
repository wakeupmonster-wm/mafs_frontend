import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaigns,
  fetchPrizes,
  createCampaign,
  pauseCampaign,
  disableCampaign,
  activateCampaign,
  deleteCampaign,
} from "../store/giveaway.slice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ActionDropdown from "../components/ActionDropdown";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// function getCampaignStatus(c) {
//   if (c.isActive) return "ACTIVE";
//   if (
//     c.failureReason &&
//     c.failureReason.toLowerCase().includes("pause")
//   ) {
//     return "PAUSED";
//   }
//   return "DISABLED";
// }

function getCampaignStatus(c) {
  if (c.failureReason === "Paused by admin") {
    return "PAUSED";
  }

  if (c.failureReason === "Disabled by admin") {
    return "DISABLED";
  }

  if (c.isActive) {
    return "ACTIVE";
  }

  return "DISABLED";
}


export default function Campaigns() {
  const dispatch = useDispatch();
  const { campaigns, prizes, loading } =
    useSelector((s) => s.giveaway);

  const [form, setForm] = useState({
    date: "",
    prizeId: "",
    supportiveItems: "",
  });

  useEffect(() => {
    dispatch(fetchCampaigns());
    dispatch(fetchPrizes());
  }, [dispatch]);

  const submit = () => {
    if (!form.date || !form.prizeId) {
      alert("Date & Prize required");
      return;
    }

    dispatch(
      createCampaign({
        date: form.date,
        prizeId: form.prizeId,
        supportiveItems: form.supportiveItems
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      })
    );

    setForm({
      date: "",
      prizeId: "",
      supportiveItems: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* ================= CREATE CAMPAIGN ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Create Campaign</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
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
                <SelectItem
                  key={p._id}
                  value={p._id}
                >
                  {p.title}
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

          <Button
            className="md:col-span-1"
            onClick={submit}
            disabled={loading}
          >
            Create Campaign
          </Button>
        </CardContent>
      </Card>

      {/* ================= CAMPAIGN TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>
            Campaigns ({campaigns.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Prize</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((c) => {
                const prize = prizes.find(
                  (p) =>
                    p._id ===
                    (c.prizeId?._id || c.prizeId)
                );

                const status = getCampaignStatus(c);

                const actions = [];

                if (status === "ACTIVE") {
                  actions.push(
                    {
                      label: "Pause",
                      onClick: () =>
                        dispatch(pauseCampaign(c._id)),
                    },
                    {
                      label: "Disable",
                      onClick: () =>
                        dispatch(
                          disableCampaign(c._id)
                        ),
                    }
                  );
                }

                if (status === "PAUSED") {
                  actions.push(
                    {
                      label: "Activate",
                      onClick: () =>
                        dispatch(
                          activateCampaign(c._id)
                        ),
                    },
                    {
                      label: "Disable",
                      onClick: () =>
                        dispatch(
                          disableCampaign(c._id)
                        ),
                    }
                  );
                }

                if (status === "DISABLED") {
                  actions.push({
                    label: "Activate",
                    onClick: () =>
                      dispatch(
                        activateCampaign(c._id)
                      ),
                  });
                }

                actions.push({
                  label: "Delete",
                  destructive: true,
                  onClick: () => {
                    if (
                      confirm(
                        "Delete campaign permanently?"
                      )
                    ) {
                      dispatch(deleteCampaign(c._id));
                    }
                  },
                });

                return (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-muted/50"
                  >
                    <td className="p-2">
                      {new Date(
                        c.date
                      ).toDateString()}
                    </td>

                    <td className="p-2 font-medium">
                      {prize?.title || "—"}
                    </td>

                    <td className="p-2">
                      <Badge
                        variant={
                          status === "ACTIVE"
                            ? "success"
                            : status === "PAUSED"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </td>

                    <td className="p-2">
                      {c.isActive ? "Yes" : "No"}
                    </td>

                    <td className="p-2 text-right">
                      <ActionDropdown actions={actions} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {loading && (
            <p className="mt-2 text-sm text-muted-foreground">
              Loading campaigns...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}