// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchPendingVerifications } from "../store/user.slice";

// // export default function PendingVerifications() {
// //   const dispatch = useDispatch();
// //   const { pendingVerifications, loading } = useSelector(
// //     (state) => state.users
// //   );


// //   useEffect(() => {
// //     dispatch(fetchPendingVerifications());
// //   }, [dispatch]);

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="p-6 space-y-4">
// //       <h1 className="text-xl font-semibold">
// //         Pending Verifications
// //       </h1>

// //       {pendingVerifications.map((item) => (
// //         <div
// //           key={item._id}
// //           className="border rounded-lg p-4 flex justify-between"
// //         >
// //           <div>
// //             <p className="text-sm font-medium">
// //               Phone: {item.user.phone}
// //             </p>
// //             <p className="text-xs text-muted-foreground">
// //               Joined: {new Date(item.user.createdAt).toDateString()}
// //             </p>
// //           </div>

// //           <div className="flex gap-3">
// //             <a
// //               href={item.verification.selfieUrl}
// //               target="_blank"
// //               className="text-blue-600 underline"
// //             >
// //               Selfie
// //             </a>
// //             <a
// //               href={item.verification.docUrl}
// //               target="_blank"
// //               className="text-blue-600 underline"
// //             >
// //               Document
// //             </a>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPendingVerifications,
//   verifyUserProfile,
// } from "../store/user.slice";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";

// export default function PendingVerifications() {
//   const dispatch = useDispatch();
//   const { pendingVerifications, loading } = useSelector(
//     (state) => state.users
//   );
//   console.log("Pending",pendingVerifications)

//   const [rejectingUser, setRejectingUser] = useState(null);
//   const [reason, setReason] = useState("");

//   useEffect(() => {
//     dispatch(fetchPendingVerifications());
//   }, [dispatch]);

//   const handleApprove = (userId) => {
//     dispatch(verifyUserProfile({ userId, action: "approve" }));
//   };

//   const handleReject = () => {
//     dispatch(
//       verifyUserProfile({
//         userId: rejectingUser,
//         action: "reject",
//         reason,
//       })
//     );
//     setRejectingUser(null);
//     setReason("");
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">
//         Pending Verifications
//         <Badge className="ml-2">
//           {pendingVerifications.length}
//         </Badge>
//       </h1>

//       {pendingVerifications.length === 0 && (
//         <p className="text-muted-foreground">
//           No pending verifications 🎉
//         </p>
//       )}

//       {pendingVerifications.map((item) => (
//         <div
//           key={item._id}
//           className="border rounded-xl p-4 flex flex-col gap-4 bg-white shadow-sm"
//         >
      
//           {/* USER INFO */}
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="font-medium">
//                 {item.user.nickname || item.nickname}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 {item.user.phone}
//               </p>
//             </div>

//             <Badge variant="outline">PENDING</Badge>
//           </div>

//           {/* DOCUMENTS */}
//           <div className="flex gap-4">
//             <a
//               href={item.verification.selfieUrl}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               View Selfie
//             </a>
//             <a
//               href={item.verification.docUrl}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               View Document
//             </a>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex gap-3 justify-end">
//             <Button
//               variant="destructive"
//               onClick={() => setRejectingUser(item.userId)}
//             >
//               Reject
//             </Button>
//             <Button onClick={() => handleApprove(item.userId)}>
//               Approve
//             </Button>
//           </div>

//           {/* REJECT REASON */}
//           {rejectingUser === item.userId && (
//             <div className="border-t pt-4 space-y-3">
//               <Textarea
//                 placeholder="Enter rejection reason..."
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               />
//               <div className="flex gap-2 justify-end">
//                 <Button
//                   variant="outline"
//                   onClick={() => setRejectingUser(null)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={handleReject}
//                   disabled={!reason}
//                 >
//                   Confirm Reject
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingVerifications,
  verifyUserProfile,
} from "../store/user.slice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ShieldCheck,
  Clock,
  User,
  Phone,
  FileText,
  Camera,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
  X,
} from "lucide-react";

export default function PendingVerifications() {
  const dispatch = useDispatch();
  const { pendingVerifications, loading } = useSelector(
    (state) => state.users
  );
  console.log("Pending", pendingVerifications);

  const [rejectingUser, setRejectingUser] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(fetchPendingVerifications());
  }, [dispatch]);

  const handleApprove = (userId) => {
    dispatch(verifyUserProfile({ userId, action: "approve" }));
  };

  const handleReject = () => {
    dispatch(
      verifyUserProfile({
        userId: rejectingUser,
        action: "reject",
        reason,
      })
    );
    setRejectingUser(null);
    setReason("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-gray-500 font-medium">Loading verifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 rounded-xl">
                <ShieldCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Pending Verifications
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Review and verify user identity documents
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="w-fit bg-amber-100 text-amber-700 hover:bg-amber-100 px-3 py-1.5 text-sm font-medium"
            >
              <Clock className="h-4 w-4 mr-1.5" />
              {pendingVerifications.length} Pending
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Empty State */}
        {pendingVerifications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              No pending verifications at the moment. Check back later for new requests.
            </p>
          </div>
        )}

        {/* Verification Cards */}
        <div className="space-y-4">
          {pendingVerifications.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.user.nickname || item.nickname}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Phone className="h-3.5 w-3.5" />
                        {item.user.phone}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge
                    variant="outline"
                    className="w-fit border-amber-300 bg-amber-50 text-amber-700"
                  >
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    PENDING
                  </Badge>
                </div>
              </div>

              {/* Documents Section */}
              <div className="p-4 sm:p-5 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Submitted Documents
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={item.verification.selfieUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Camera className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">View Selfie</p>
                      <p className="text-xs text-gray-500">Photo verification</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </a>

                  <a
                    href={item.verification.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-2 bg-violet-50 rounded-lg group-hover:bg-violet-100 transition-colors">
                      <FileText className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">View Document</p>
                      <p className="text-xs text-gray-500">ID verification</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </a>
                </div>
              </div>

              {/* Actions Section */}
              <div className="p-4 sm:p-5">
                {rejectingUser === item.userId ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-2.5 p-3 bg-red-50 rounded-lg border border-red-100">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Rejecting Verification
                        </p>
                        <p className="text-xs text-red-600">
                          Please provide a reason for rejection
                        </p>
                      </div>
                    </div>

                    <Textarea
                      placeholder="Enter rejection reason..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="min-h-[100px] resize-none border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                    />

                    <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setRejectingUser(null)}
                        className="bg-transparent border-gray-300 hover:bg-gray-50"
                      >
                        <X className="h-4 w-4 mr-1.5" />
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleReject}
                        disabled={!reason}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-1.5" />
                        Confirm Reject
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setRejectingUser(item.userId)}
                      className="bg-transparent border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    >
                      <XCircle className="h-4 w-4 mr-1.5" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(item.userId)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
