// // // import { useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
// // // import { Card } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";

// // // export default function CampaignWinner() {
// // //   const dispatch = useDispatch();

// // //   const { campaigns, winner, loading } = useSelector(
// // //     (s) => s.giveaway
// // //   );

// // //   /* 1️⃣ Fetch campaigns once */
// // //   useEffect(() => {
// // //     dispatch(fetchCampaigns());
// // //   }, [dispatch]);

// // //   /* 2️⃣ Fetch winner for completed campaigns */
// // //   useEffect(() => {
// // //     if (!campaigns?.length) return;

// // //     campaigns.forEach((c) => {
// // //       if (c.drawStatus === "COMPLETED" && c.winnerUserId) {
// // //         dispatch(fetchWinner(c._id));
// // //       }
// // //     });
// // //   }, [campaigns, dispatch]);

// // //   return (
// // //     <Card className="p-6 space-y-4">
// // //       <div>
// // //         <h2 className="text-lg font-semibold">
// // //           Campaign Winners
// // //         </h2>
// // //         <p className="text-sm text-muted-foreground">
// // //           Automatically fetched winners for completed campaigns
// // //         </p>
// // //       </div>

// // //       <div className="overflow-x-auto">
// // //         <table className="w-full text-sm border">
// // //           <thead className="bg-muted">
// // //             <tr>
// // //               <th className="p-2 text-left">Date</th>
// // //               <th className="p-2 text-left">Prize</th>
// // //               <th className="p-2 text-left">Winner</th>
// // //               <th className="p-2 text-left">Status</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {winner?.map((w) => (
// // //               <tr
// // //                 key={w.campaignId}
// // //                 className="border-t"
// // //               >
// // //                 <td className="p-2">
// // //                   {new Date(w.date).toDateString()}
// // //                 </td>
// // //                 <td className="p-2 font-medium">
// // //                   {w.prize?.title}
// // //                 </td>
// // //                 <td className="p-2">
// // //                   {w.winner?.phone ||
// // //                     w.winner?.email ||
// // //                     "—"}
// // //                 </td>
// // //                 <td className="p-2">
// // //                   <Badge variant="success">
// // //                     {w.drawStatus}
// // //                   </Badge>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>

// // //         {!loading && (!winner || winner.length === 0) && (
// // //           <p className="text-sm text-muted-foreground mt-2">
// // //             No winners available yet
// // //           </p>
// // //         )}
// // //       </div>
// // //     </Card>
// // //   );
// // // }




// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
// // import { Card } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Loader2, AlertCircle, Trophy } from "lucide-react";

// // export default function CampaignWinner() {
// //   const dispatch = useDispatch();
// //   const { campaigns, winner, loading, error } = useSelector(
// //     (s) => s.giveaway
// //   );

// //   const [winnerLoading, setWinnerLoading] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   useEffect(() => {
// //     const loadCampaigns = async () => {
// //       try {
// //         await dispatch(fetchCampaigns()).unwrap();
// //       } catch (err) {
// //         setErrorMessage(err?.message || "Failed to load campaigns");
// //       }
// //     };

// //     loadCampaigns();
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (!campaigns?.length) return;

// //     const loadWinners = async () => {
// //       setWinnerLoading(true);
// //       setErrorMessage("");

// //       try {
// //         const completedCampaigns = campaigns.filter(
// //           (c) => c.drawStatus === "COMPLETED" && c.winnerUserId
// //         );

// //         if (completedCampaigns.length === 0) {
// //           setWinnerLoading(false);
// //           return;
// //         }

// //         const winnerPromises = completedCampaigns.map((c) =>
// //           dispatch(fetchWinner(c._id)).unwrap()
// //         );

// //         await Promise.all(winnerPromises);
// //       } catch (err) {
// //         setErrorMessage(err?.message || "Failed to load winners");
// //       } finally {
// //         setWinnerLoading(false);
// //       }
// //     };

// //     loadWinners();
// //   }, [campaigns, dispatch]);

// //   const isLoading = loading || winnerLoading;

// //   return (
// //     <Card className="p-6 space-y-4">
// //       <div>
// //         <h2 className="text-lg font-semibold flex items-center gap-2">
// //           <Trophy className="w-5 h-5" />
// //           Campaign Winners
// //         </h2>
      
// //       </div>

// //       {(error || errorMessage) && (
// //         <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
// //           <AlertCircle className="w-4 h-4" />
// //           <span className="text-sm">{error || errorMessage}</span>
// //         </div>
// //       )}

// //       <div className="overflow-x-auto">
// //         {isLoading ? (
// //           <div className="flex flex-col items-center justify-center py-12">
// //             <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
// //             <p className="text-sm text-gray-600">Loading campaign winners...</p>
// //           </div>
// //         ) : (
// //           <>
// //             <table className="w-full text-sm border">
// //               <thead className="bg-muted">
// //                 <tr>
// //                   <th className="p-2 text-left">Date</th>
// //                   <th className="p-2 text-left">Prize</th>
// //                   <th className="p-2 text-left">Winner</th>
// //                   <th className="p-2 text-left">Status</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {winner?.map((w) => (
// //                   <tr
// //                     key={w.campaignId}
// //                     className="border-t hover:bg-gray-50"
// //                   >
// //                     <td className="p-2">
// //                       {w.date
// //                         ? new Date(w.date).toDateString()
// //                         : "N/A"
// //                       }
// //                     </td>
// //                     <td className="p-2 font-medium">
// //                       {w.prize?.title || "N/A"}
// //                     </td>
// //                     <td className="p-2">
// //                       {w.winner?.phone ||
// //                         w.winner?.email ||
// //                         "Not available"}
// //                     </td>
// //                     <td className="p-2">
// //                       <Badge
// //                         variant={w.drawStatus === "COMPLETED" ? "success" : "default"}
// //                         className="capitalize"
// //                       >
// //                         {w.drawStatus || "Pending"}
// //                       </Badge>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             {(!winner || winner.length === 0) && (
// //               <div className="text-center py-8">
// //                 <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-3" />
// //                 <p className="text-sm text-gray-500">
// //                   No winners available yet
// //                 </p>
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Winners will appear here once campaigns are completed
// //                 </p>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </Card>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Loader2,
//   AlertCircle,
//   Trophy,
//   Clock,
// } from "lucide-react";

// export default function CampaignWinner() {
//   const dispatch = useDispatch();
//   const { campaigns, winner, loading, error } = useSelector(
//     (s) => s.giveaway
//   );

//   const [winnerLoading, setWinnerLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     dispatch(fetchCampaigns()).catch(() =>
//       setErrorMessage("Failed to load campaigns")
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (!campaigns?.length) return;

//     const completedCampaigns = campaigns.filter(
//       (c) => c.drawStatus === "COMPLETED" && c.winnerUserId
//     );

//     if (!completedCampaigns.length) return;

//     setWinnerLoading(true);

//     Promise.all(
//       completedCampaigns.map((c) =>
//         dispatch(fetchWinner(c._id)).unwrap()
//       )
//     )
//       .catch(() => setErrorMessage("Failed to load winners"))
//       .finally(() => setWinnerLoading(false));
//   }, [campaigns, dispatch]);

//   const isLoading = loading || winnerLoading;

//   const renderStatus = (status) => {
//     if (status === "COMPLETED") {
//       return (
//         <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
//           <Trophy className="w-3 h-3" />
//           Completed
//         </Badge>
//       );
//     }

//     return (
//       <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
//         <Clock className="w-3 h-3" />
//         Pending
//       </Badge>
//     );
//   };

//   return (
//     <Card className="p-6 space-y-4">
//       <h2 className="text-lg font-semibold flex items-center gap-2">
//         <Trophy className="w-5 h-5" />
//         Campaign Winners
//       </h2>

//       {(error || errorMessage) && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
//           <AlertCircle className="w-4 h-4" />
//           <span className="text-sm">{error || errorMessage}</span>
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
//           <p className="text-sm text-gray-600">
//             Loading campaign winners...
//           </p>
//         </div>
//       ) : winner?.length ? (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border rounded-lg">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="p-2 text-left">Campaign Date</th>
//                 <th className="p-2 text-left">Prize</th>
//                 <th className="p-2 text-left">Winner</th>
//                 <th className="p-2 text-left">Draw Date</th>
//                 <th className="p-2 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {winner.map((w) => (
//                 <tr
//                   key={w.campaignId}
//                   className="border-t hover:bg-gray-50"
//                 >
//                   <td className="p-2">
//                     {w.date
//                       ? new Date(w.date).toDateString()
//                       : "—"}
//                   </td>

//                   <td className="p-2 font-medium">
//                     {w.prize?.title || "—"}
//                   </td>

//                   <td className="p-2">
//                     {w.winner?.phone ||
//                       w.winner?.email ||
//                       "—"}
//                   </td>

//                   <td className="p-2 text-gray-600">
//                     {w.drawAt
//                       ? new Date(w.drawAt).toLocaleString()
//                       : "—"}
//                   </td>

//                   <td className="p-2">
//                     {renderStatus(w.drawStatus)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-10 text-gray-500">
//           <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
//           <p className="text-sm font-medium">
//             No winners declared yet
//           </p>
//           <p className="text-xs mt-1">
//             Winners will appear once campaigns are completed
//           </p>
//         </div>
//       )}
//     </Card>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaigns, fetchWinner } from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  Trophy,
  Clock,
} from "lucide-react";

export default function CampaignWinner() {
  const dispatch = useDispatch();
  const { campaigns, winner, loading, error } = useSelector(
    (s) => s.giveaway
  );

  const [filter, setFilter] = useState("ALL"); // ALL | COMPLETED | PENDING
  const [errorMessage, setErrorMessage] = useState("");

  /* Load campaigns once */
  useEffect(() => {
    dispatch(fetchCampaigns()).catch(() =>
      setErrorMessage("Failed to load campaigns")
    );
  }, [dispatch]);

  /* Fetch winners ONLY for completed campaigns */
  useEffect(() => {
    if (!campaigns?.length) return;

    const completed = campaigns.filter(
      (c) => c.drawStatus === "COMPLETED" && c.winnerUserId
    );

    completed.forEach((c) => {
      dispatch(fetchWinner(c._id));
    });
  }, [campaigns, dispatch]);

  /* 🔥 Derived filtered data (NO setState in effect) */
  const filteredWinners = useMemo(() => {
    if (!winner) return [];

    if (filter === "COMPLETED") {
      return winner.filter((w) => w.drawStatus === "COMPLETED");
    }

    if (filter === "PENDING") {
      return campaigns
        ?.filter((c) => c.drawStatus === "PENDING")
        .map((c) => ({
          campaignId: c._id,
          date: c.date,
          prize: c.prizeId,
          winner: null,
          drawAt: null,
          drawStatus: "PENDING",
        }));
    }

    return winner;
  }, [filter, winner, campaigns]);

  const renderStatus = (status) => {
    if (status === "COMPLETED") {
      return (
        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          Completed
        </Badge>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        Pending
      </Badge>
    );
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Campaign Winners
        </h2>

        {/* Filters */}
        <div className="flex gap-2">
          {["ALL", "COMPLETED", "PENDING"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {(error || errorMessage) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-4 h-4" />
          {error || errorMessage}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
          <p className="text-sm text-gray-600">
            Loading campaign winners...
          </p>
        </div>
      ) : filteredWinners.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Campaign Date</th>
                <th className="p-2 text-left">Prize</th>
                <th className="p-2 text-left">Winner</th>
                <th className="p-2 text-left">Draw Date</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredWinners.map((w) => (
                <tr
                  key={w.campaignId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-2">
                    {w.date
                      ? new Date(w.date).toDateString()
                      : "—"}
                  </td>

                  <td className="p-2 font-medium">
                    {w.prize?.title || "—"}
                  </td>

                  <td className="p-2">
                    {w.winner?.phone ||
                      w.winner?.email ||
                      "—"}
                  </td>

                  <td className="p-2 text-gray-600">
                    {w.drawAt
                      ? new Date(w.drawAt).toLocaleString()
                      : "—"}
                  </td>

                  <td className="p-2">
                    {renderStatus(w.drawStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">
            No data for selected filter
          </p>
        </div>
      )}
    </Card>
  );
}
