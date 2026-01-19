import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrizes,
  createPrize,
  deletePrize,
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

export default function Prizes() {
  const dispatch = useDispatch();
  const { prizes, loading } = useSelector((s) => s.giveaway);

  const [form, setForm] = useState({
    title: "",
    type: "",
    value: "",
    spinWheelLabel: "",
  });

  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  const submit = () => {
    if (!form.title || !form.type || !form.value) {
      alert("All fields are required");
      return;
    }

    dispatch(createPrize(form));
    setForm({
      title: "",
      type: "",
      value: "",
      spinWheelLabel: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* ================= CREATE PRIZE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Create Prize</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Prize Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Input
            placeholder="Type (FREE_PREMIUM / CASH)"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          />

          <Input
            placeholder="Value (eg: 30 days / ₹500)"
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: e.target.value })
            }
          />

          <Input
            placeholder="Spin Wheel Label"
            value={form.spinWheelLabel}
            onChange={(e) =>
              setForm({
                ...form,
                spinWheelLabel: e.target.value,
              })
            }
          />

          <Button
            className="md:col-span-1"
            onClick={submit}
            disabled={loading}
          >
            Create Prize
          </Button>
        </CardContent>
      </Card>

      {/* ================= PRIZE TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>
            Prizes ({prizes.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Value</th>
                <th className="p-2 text-left">
                  Spin Label
                </th>
                <th className="p-2 text-left">
                  Created
                </th>
                <th className="p-2 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {prizes.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-muted/50"
                >
                  <td className="p-2 font-medium">
                    {p.title}
                  </td>

                  <td className="p-2">
                    <Badge variant="outline">
                      {p.type}
                    </Badge>
                  </td>

                  <td className="p-2">{p.value}</td>

                  <td className="p-2">
                    {p.spinWheelLabel || "—"}
                  </td>

                  <td className="p-2 text-muted-foreground">
                    {new Date(
                      p.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-2 text-right">
                    <ActionDropdown
                      actions={[
                        {
                          label: "Delete",
                          destructive: true,
                          onClick: () => {
                            if (
                              confirm(
                                "Delete prize permanently?"
                              )
                            ) {
                              dispatch(
                                deletePrize(p._id)
                              );
                            }
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <p className="mt-2 text-sm text-muted-foreground">
              Loading prizes...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}