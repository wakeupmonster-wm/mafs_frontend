// // // import { useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import {
// // //   fetchPendingDeliveries,
// // //   markAsDelivered,
// // // } from "../store/giveaway.slice";
// // // import { Card } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";

// // // export default function PendingDeliveries() {
// // //   const dispatch = useDispatch();
// // //   const { pendingDeliveries, loading } = useSelector(
// // //     (s) => s.giveaway
// // //   );

// // //   useEffect(() => {
// // //     dispatch(fetchPendingDeliveries());
// // //   }, [dispatch]);

// // //   return (
// // //     <Card className="p-6">
// // //       <h2 className="text-lg font-semibold mb-4">
// // //         Pending Prize Deliveries
// // //       </h2>

// // //       <div className="overflow-x-auto">
// // //         <table className="w-full text-sm border">
// // //           <thead className="bg-muted">
// // //             <tr>
// // //               <th className="p-2 text-left">User</th>
// // //               <th className="p-2 text-left">Prize</th>
// // //               <th className="p-2 text-left">Campaign Date</th>
// // //               <th className="p-2 text-right">Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {pendingDeliveries.map((d) => (
// // //               <tr key={d._id} className="border-t">
// // //                 <td className="p-2">
// // //                   {d.userId?.phone}
// // //                 </td>
// // //                 <td className="p-2">
// // //                   {d.prizeId?.title} (
// // //                   {d.prizeId?.value})
// // //                 </td>
// // //                 <td className="p-2">
// // //                   {new Date(
// // //                     d.campaignId?.date
// // //                   ).toDateString()}
// // //                 </td>
// // //                 <td className="p-2 text-right">
// // //                   <Button
// // //                     size="sm"
// // //                     onClick={() =>
// // //                       dispatch(markAsDelivered(d._id))
// // //                     }
// // //                   >
// // //                     Mark Delivered
// // //                   </Button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>

// // //         {pendingDeliveries.length === 0 && !loading && (
// // //           <p className="text-sm text-muted-foreground mt-2">
// // //             No pending deliveries 🎉
// // //           </p>
// // //         )}
// // //       </div>
// // //     </Card>
// // //   );
// // // }



// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchPendingDeliveries,
// //   markAsDelivered,
// // } from "../store/giveaway.slice";
// // import { Card } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

// // export default function PendingDeliveries() {
// //   const dispatch = useDispatch();
// //   const { pendingDeliveries, loading, error } = useSelector(
// //     (s) => s.giveaway
// //   );

// //   const [deliveryLoading, setDeliveryLoading] = useState({});
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");

// //   useEffect(() => {
// //     dispatch(fetchPendingDeliveries());
// //   }, [dispatch]);

// //   const handleMarkAsDelivered = async (deliveryId) => {
// //     if (!deliveryId) {
// //       setErrorMessage("Invalid delivery ID");
// //       setTimeout(() => setErrorMessage(""), 3000);
// //       return;
// //     }

// //     setDeliveryLoading(prev => ({ ...prev, [deliveryId]: true }));
// //     setErrorMessage("");
// //     setSuccessMessage("");

// //     try {
// //       await dispatch(markAsDelivered(deliveryId)).unwrap();
// //       setSuccessMessage("Prize marked as delivered successfully!");
// //       setTimeout(() => setSuccessMessage(""), 3000);
// //       dispatch(fetchPendingDeliveries());
// //     } catch (err) {
// //       setErrorMessage(err?.message || "Failed to mark as delivered. Please try again.");
// //       setTimeout(() => setErrorMessage(""), 5000);
// //     } finally {
// //       setDeliveryLoading(prev => ({ ...prev, [deliveryId]: false }));
// //     }
// //   };

// //   return (
// //     <Card className="p-6">
// //       <h2 className="text-lg font-semibold mb-4">
// //         Pending Prize Deliveries
// //       </h2>

// //       {successMessage && (
// //         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
// //           <CheckCircle className="w-4 h-4" />
// //           <span className="text-sm">{successMessage}</span>
// //         </div>
// //       )}

// //       {errorMessage && (
// //         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
// //           <AlertCircle className="w-4 h-4" />
// //           <span className="text-sm">{errorMessage}</span>
// //         </div>
// //       )}

// //       {error && (
// //         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
// //           <AlertCircle className="w-4 h-4" />
// //           <span className="text-sm">{error}</span>
// //         </div>
// //       )}

// //       <div className="overflow-x-auto">
// //         {loading ? (
// //           <div className="flex flex-col items-center justify-center py-12">
// //             <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
// //             <p className="text-sm text-gray-600">Loading pending deliveries...</p>
// //           </div>
// //         ) : (
// //           <>
// //             <table className="w-full text-sm border">
// //               <thead className="bg-muted">
// //                 <tr>
// //                   <th className="p-2 text-left">User</th>
// //                   <th className="p-2 text-left">Prize</th>
// //                   <th className="p-2 text-left">Campaign Date</th>
// //                   <th className="p-2 text-right">Action</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {pendingDeliveries?.map((d) => (
// //                   <tr key={d._id} className="border-t hover:bg-gray-50">
// //                     <td className="p-2">
// //                       {d.userId?.phone || d.userId?.email || "N/A"}
// //                     </td>
// //                     <td className="p-2">
// //                       {d.prizeId?.title || "N/A"}
// //                       {d.prizeId?.value && ` (${d.prizeId.value})`}
// //                     </td>
// //                     <td className="p-2">
// //                       {d.campaignId?.date
// //                         ? new Date(d.campaignId.date).toDateString()
// //                         : "N/A"
// //                       }
// //                     </td>
// //                     <td className="p-2 text-right">
// //                       <Button
// //                         size="sm"
// //                         onClick={() => handleMarkAsDelivered(d._id)}
// //                         disabled={deliveryLoading[d._id]}
// //                       >
// //                         {deliveryLoading[d._id] ? (
// //                           <>
// //                             <Loader2 className="w-3 h-3 mr-2 animate-spin" />
// //                             Processing...
// //                           </>
// //                         ) : (
// //                           "Mark Delivered"
// //                         )}
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             {(!pendingDeliveries || pendingDeliveries.length === 0) && (
// //               <div className="text-center py-8">
// //                 <p className="text-sm text-gray-500">
// //                   No pending deliveries found
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
// import {
//   fetchPendingDeliveries,
//   markAsDelivered,
// } from "../store/giveaway.slice";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   Truck,
//   Clock,
// } from "lucide-react";

// export default function PendingDeliveries() {
//   const dispatch = useDispatch();
//   const { pendingDeliveries, loading } = useSelector(
//     (s) => s.giveaway
//   );

//   const [deliveryLoading, setDeliveryLoading] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     dispatch(fetchPendingDeliveries());
//   }, [dispatch]);

//   const handleMarkAsDelivered = async (deliveryId) => {
//     setDeliveryLoading((p) => ({ ...p, [deliveryId]: true }));
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       await dispatch(markAsDelivered(deliveryId)).unwrap();
//       setSuccessMessage("Prize marked as delivered successfully");
//       dispatch(fetchPendingDeliveries());
//     } catch (err) {
//       setErrorMessage(err?.message || "Something went wrong");
//     } finally {
//       setDeliveryLoading((p) => ({ ...p, [deliveryId]: false }));
//       setTimeout(() => {
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 3000);
//     }
//   };

//   const renderStatus = (d) => {
//     if (d.deliveryStatus === "DELIVERED") {
//       return (
//         <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
//           <CheckCircle className="w-3 h-3" />
//           Delivered
//         </span>
//       );
//     }

//     if (d.claimedAt) {
//       return (
//         <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
//           <Truck className="w-3 h-3" />
//           Claimed
//         </span>
//       );
//     }

//     return (
//       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
//         <Clock className="w-3 h-3" />
//         Not Claimed
//       </span>
//     );
//   };

//   return (
//     <Card className="p-6">
//       <h2 className="text-lg font-semibold mb-4">
//         Prize Delivery Management
//       </h2>

//       {successMessage && (
//         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
//           <CheckCircle className="w-4 h-4" />
//           {successMessage}
//         </div>
//       )}

//       {errorMessage && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
//           <AlertCircle className="w-4 h-4" />
//           {errorMessage}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-10">
//           <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border rounded-lg">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="p-2 text-left">User</th>
//                 <th className="p-2 text-left">Prize</th>
//                 <th className="p-2 text-left">Campaign Date</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-right">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {pendingDeliveries?.map((d) => (
//                 <tr
//                   key={d._id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="p-2">
//                     {d.userId?.phone || d.userId?.email || "N/A"}
//                   </td>

//                   <td className="p-2">
//                     {d.prizeId?.title}
//                     {d.prizeId?.value && (
//                       <span className="text-gray-500">
//                         {" "}
//                         ({d.prizeId.value})
//                       </span>
//                     )}
//                   </td>

//                   <td className="p-2">
//                     {d.campaignId?.date
//                       ? new Date(d.campaignId.date).toDateString()
//                       : "N/A"}
//                   </td>

//                   <td className="p-2">{renderStatus(d)}</td>

//                   <td className="p-2 text-right">
//                     {d.deliveryStatus === "PENDING" && d.claimedAt ? (
//                       <Button
//                         size="sm"
//                         onClick={() => handleMarkAsDelivered(d._id)}
//                         disabled={deliveryLoading[d._id]}
//                       >
//                         {deliveryLoading[d._id] ? (
//                           <>
//                             <Loader2 className="w-3 h-3 mr-2 animate-spin" />
//                             Processing
//                           </>
//                         ) : (
//                           "Mark Delivered"
//                         )}
//                       </Button>
//                     ) : (
//                       <span className="text-xs text-gray-400">
//                         No Action
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {pendingDeliveries?.length === 0 && (
//             <p className="text-center py-8 text-gray-500">
//               No delivery records found
//             </p>
//           )}
//         </div>
//       )}
//     </Card>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingDeliveries,
  markAsDelivered,
} from "../store/giveaway.slice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Truck,
  Clock,
  Package,
} from "lucide-react";

export default function PendingDeliveries() {
  const dispatch = useDispatch();
  const { pendingDeliveries, loading } = useSelector((s) => s.giveaway);

  const [deliveryLoading, setDeliveryLoading] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchPendingDeliveries());
  }, [dispatch]);

  const handleMarkAsDelivered = async (deliveryId) => {
    setDeliveryLoading((p) => ({ ...p, [deliveryId]: true }));
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await dispatch(markAsDelivered(deliveryId)).unwrap();
      setSuccessMessage("Prize marked as delivered successfully");
      dispatch(fetchPendingDeliveries());
    } catch (err) {
      setErrorMessage(err?.message || "Something went wrong");
    } finally {
      setDeliveryLoading((p) => ({ ...p, [deliveryId]: false }));
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
  };

  const renderStatus = (d) => {
    if (d.deliveryStatus === "DELIVERED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200 animate-in fade-in slide-in-from-left-2 duration-300">
          <CheckCircle className="w-3.5 h-3.5" />
          Delivered
        </span>
      );
    }

    if (d.claimedAt) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200 animate-in fade-in slide-in-from-left-2 duration-300">
          <Truck className="w-3.5 h-3.5 animate-bounce" />
          Claimed
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-500 border border-gray-200 animate-in fade-in slide-in-from-left-2 duration-300">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
        Not Claimed
      </span>
    );
  };

  return (
    <Card className="p-6 shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Package className="w-5 h-5 text-gray-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Prize Delivery Management
        </h2>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-gray-50 border border-gray-300 rounded-lg flex items-center gap-3 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-5 h-5 text-gray-700 animate-bounce" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 bg-gray-50 border border-gray-400 rounded-lg flex items-center gap-3 text-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 text-gray-700 animate-pulse" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="relative">
            <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
            <div className="absolute inset-0 w-10 h-10 border-2 border-gray-200 rounded-full animate-ping" />
          </div>
          <p className="text-sm text-gray-500 animate-pulse">
            Loading deliveries...
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    User
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Prize
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Campaign Date
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-4 text-right font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {pendingDeliveries?.map((d, index) => (
                  <tr
                    key={d._id}
                    className="hover:bg-gray-50 transition-all duration-200 animate-in fade-in slide-in-from-bottom-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {d.userId?.phone || d.userId?.email || "N/A"}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {d.prizeId?.title}
                        </span>
                        {d.prizeId?.value && (
                          <span className="text-xs text-gray-500 mt-0.5">
                            {d.prizeId.value}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-gray-600">
                      {d.campaignId?.date
                        ? new Date(d.campaignId.date).toDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">{renderStatus(d)}</td>

                    <td className="p-4 text-right">
                      {d.deliveryStatus === "PENDING" && d.claimedAt ? (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsDelivered(d._id)}
                          disabled={deliveryLoading[d._id]}
                          className="bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deliveryLoading[d._id] ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Processing
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Mark Delivered
                            </span>
                          )}
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pendingDeliveries?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 animate-in fade-in zoom-in-50 duration-500">
              <Package className="w-12 h-12 text-gray-300 animate-pulse" />
              <p className="text-gray-500 font-medium">
                No delivery records found
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}