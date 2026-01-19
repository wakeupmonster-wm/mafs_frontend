// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPendingVerifications } from "../store/user.slice";

// export default function PendingVerifications() {
//   const dispatch = useDispatch();
//   const { pendingVerifications, loading } = useSelector(
//     (state) => state.users
//   );


//   useEffect(() => {
//     dispatch(fetchPendingVerifications());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-xl font-semibold">
//         Pending Verifications
//       </h1>

//       {pendingVerifications.map((item) => (
//         <div
//           key={item._id}
//           className="border rounded-lg p-4 flex justify-between"
//         >
//           <div>
//             <p className="text-sm font-medium">
//               Phone: {item.user.phone}
//             </p>
//             <p className="text-xs text-muted-foreground">
//               Joined: {new Date(item.user.createdAt).toDateString()}
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <a
//               href={item.verification.selfieUrl}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               Selfie
//             </a>
//             <a
//               href={item.verification.docUrl}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               Document
//             </a>
//           </div>
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

export default function PendingVerifications() {
  const dispatch = useDispatch();
  const { pendingVerifications, loading } = useSelector(
    (state) => state.users
  );

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

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Pending Verifications
        <Badge className="ml-2">
          {pendingVerifications.length}
        </Badge>
      </h1>

      {pendingVerifications.length === 0 && (
        <p className="text-muted-foreground">
          No pending verifications 🎉
        </p>
      )}

      {pendingVerifications.map((item) => (
        <div
          key={item._id}
          className="border rounded-xl p-4 flex flex-col gap-4 bg-white shadow-sm"
        >
          {/* USER INFO */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                {item.fullName || "Unnamed User"}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.user.phone}
              </p>
            </div>

            <Badge variant="outline">PENDING</Badge>
          </div>

          {/* DOCUMENTS */}
          <div className="flex gap-4">
            <a
              href={item.verification.selfieUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Selfie
            </a>
            <a
              href={item.verification.docUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Document
            </a>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="destructive"
              onClick={() => setRejectingUser(item.userId)}
            >
              Reject
            </Button>
            <Button onClick={() => handleApprove(item.userId)}>
              Approve
            </Button>
          </div>

          {/* REJECT REASON */}
          {rejectingUser === item.userId && (
            <div className="border-t pt-4 space-y-3">
              <Textarea
                placeholder="Enter rejection reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setRejectingUser(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={!reason}
                >
                  Confirm Reject
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}