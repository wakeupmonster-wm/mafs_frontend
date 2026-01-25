import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CampaignWinner() {
  const dispatch = useDispatch();

  const { campaigns, winner, loading } = useSelector(
    (s) => s.giveaway
  );

  /* 1️⃣ Fetch campaigns once */
  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  /* 2️⃣ Fetch winner for completed campaigns */
  useEffect(() => {
    if (!campaigns?.length) return;

    campaigns.forEach((c) => {
      if (c.drawStatus === "COMPLETED" && c.winnerUserId) {
        dispatch(fetchWinner(c._id));
      }
    });
  }, [campaigns, dispatch]);

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Campaign Winners
        </h2>
        <p className="text-sm text-muted-foreground">
          Automatically fetched winners for completed campaigns
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Prize</th>
              <th className="p-2 text-left">Winner</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {winner?.map((w) => (
              <tr
                key={w.campaignId}
                className="border-t"
              >
                <td className="p-2">
                  {new Date(w.date).toDateString()}
                </td>
                <td className="p-2 font-medium">
                  {w.prize?.title}
                </td>
                <td className="p-2">
                  {w.winner?.phone ||
                    w.winner?.email ||
                    "—"}
                </td>
                <td className="p-2">
                  <Badge variant="success">
                    {w.drawStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && (!winner || winner.length === 0) && (
          <p className="text-sm text-muted-foreground mt-2">
            No winners available yet
          </p>
        )}
      </div>
    </Card>
  );
}
