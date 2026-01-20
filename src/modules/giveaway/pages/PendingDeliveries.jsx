import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingDeliveries,
  markAsDelivered,
} from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PendingDeliveries() {
  const dispatch = useDispatch();
  const { pendingDeliveries, loading } = useSelector(
    (s) => s.giveaway
  );

  useEffect(() => {
    dispatch(fetchPendingDeliveries());
  }, [dispatch]);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Pending Prize Deliveries
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Prize</th>
              <th className="p-2 text-left">Campaign Date</th>
              <th className="p-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingDeliveries.map((d) => (
              <tr key={d._id} className="border-t">
                <td className="p-2">
                  {d.userId?.phone}
                </td>
                <td className="p-2">
                  {d.prizeId?.title} (
                  {d.prizeId?.value})
                </td>
                <td className="p-2">
                  {new Date(
                    d.campaignId?.date
                  ).toDateString()}
                </td>
                <td className="p-2 text-right">
                  <Button
                    size="sm"
                    onClick={() =>
                      dispatch(markAsDelivered(d._id))
                    }
                  >
                    Mark Delivered
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pendingDeliveries.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground mt-2">
            No pending deliveries 🎉
          </p>
        )}
      </div>
    </Card>
  );
}
