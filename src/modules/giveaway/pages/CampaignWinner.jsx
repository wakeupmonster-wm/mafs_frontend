// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// export default function CampaignWinner() {
//   const dispatch = useDispatch();

//   const { campaigns, winner, loading } = useSelector(
//     (s) => s.giveaway
//   );

//   /* 1️⃣ Fetch campaigns once */
//   useEffect(() => {
//     dispatch(fetchCampaigns());
//   }, [dispatch]);

//   /* 2️⃣ Fetch winner for completed campaigns */
//   useEffect(() => {
//     if (!campaigns?.length) return;

//     campaigns.forEach((c) => {
//       if (c.drawStatus === "COMPLETED" && c.winnerUserId) {
//         dispatch(fetchWinner(c._id));
//       }
//     });
//   }, [campaigns, dispatch]);

//   return (
//     <Card className="p-6 space-y-4">
//       <div>
//         <h2 className="text-lg font-semibold">
//           Campaign Winners
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           Automatically fetched winners for completed campaigns
//         </p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm border">
//           <thead className="bg-muted">
//             <tr>
//               <th className="p-2 text-left">Date</th>
//               <th className="p-2 text-left">Prize</th>
//               <th className="p-2 text-left">Winner</th>
//               <th className="p-2 text-left">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {winner?.map((w) => (
//               <tr
//                 key={w.campaignId}
//                 className="border-t"
//               >
//                 <td className="p-2">
//                   {new Date(w.date).toDateString()}
//                 </td>
//                 <td className="p-2 font-medium">
//                   {w.prize?.title}
//                 </td>
//                 <td className="p-2">
//                   {w.winner?.phone ||
//                     w.winner?.email ||
//                     "—"}
//                 </td>
//                 <td className="p-2">
//                   <Badge variant="success">
//                     {w.drawStatus}
//                   </Badge>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {!loading && (!winner || winner.length === 0) && (
//           <p className="text-sm text-muted-foreground mt-2">
//             No winners available yet
//           </p>
//         )}
//       </div>
//     </Card>
//   );
// }




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, Trophy } from "lucide-react";

export default function CampaignWinner() {
  const dispatch = useDispatch();
  const { campaigns, winner, loading, error } = useSelector(
    (s) => s.giveaway
  );

  const [winnerLoading, setWinnerLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        await dispatch(fetchCampaigns()).unwrap();
      } catch (err) {
        setErrorMessage(err?.message || "Failed to load campaigns");
      }
    };

    loadCampaigns();
  }, [dispatch]);

  useEffect(() => {
    if (!campaigns?.length) return;

    const loadWinners = async () => {
      setWinnerLoading(true);
      setErrorMessage("");

      try {
        const completedCampaigns = campaigns.filter(
          (c) => c.drawStatus === "COMPLETED" && c.winnerUserId
        );

        if (completedCampaigns.length === 0) {
          setWinnerLoading(false);
          return;
        }

        const winnerPromises = completedCampaigns.map((c) =>
          dispatch(fetchWinner(c._id)).unwrap()
        );

        await Promise.all(winnerPromises);
      } catch (err) {
        setErrorMessage(err?.message || "Failed to load winners");
      } finally {
        setWinnerLoading(false);
      }
    };

    loadWinners();
  }, [campaigns, dispatch]);

  const isLoading = loading || winnerLoading;

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Campaign Winners
        </h2>
      
      </div>

      {(error || errorMessage) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error || errorMessage}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
            <p className="text-sm text-gray-600">Loading campaign winners...</p>
          </div>
        ) : (
          <>
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
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-2">
                      {w.date
                        ? new Date(w.date).toDateString()
                        : "N/A"
                      }
                    </td>
                    <td className="p-2 font-medium">
                      {w.prize?.title || "N/A"}
                    </td>
                    <td className="p-2">
                      {w.winner?.phone ||
                        w.winner?.email ||
                        "Not available"}
                    </td>
                    <td className="p-2">
                      <Badge
                        variant={w.drawStatus === "COMPLETED" ? "success" : "default"}
                        className="capitalize"
                      >
                        {w.drawStatus || "Pending"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!winner || winner.length === 0) && (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">
                  No winners available yet
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Winners will appear here once campaigns are completed
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
