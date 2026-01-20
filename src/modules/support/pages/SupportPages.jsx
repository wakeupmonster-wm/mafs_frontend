// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card } from "@/components/ui/card";
// import {
//   createSupportTicket,
//   fetchMyTickets,
//   fetchTicketById,
//   adminReplyToTicket,
//   clearSupportStatus,
// } from "../store/support.slice";

// export function ContactSupportPage() {
//   const dispatch = useDispatch();
//   const { loading, error, successMessage } = useSelector((s) => s.support);
//   const [form, setForm] = useState({ category: "General", subject: "", message: "" });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createSupportTicket(form)).then(() => {
//       setForm({ category: "General", subject: "", message: "" });
//       setTimeout(() => dispatch(clearSupportStatus()), 2500);
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <Card className="p-4">
//         <h2 className="text-lg font-semibold">Contact Support</h2>
//         <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 mt-4">
//           <Input
//             placeholder="Category (e.g., Technical, Billing)"
//             value={form.category}
//             onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
//           />
//           <Input
//             placeholder="Subject"
//             value={form.subject}
//             onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
//           />
//           <Textarea
//             placeholder="Describe your issue"
//             value={form.message}
//             onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
//           />
//           <div className="flex items-center gap-2">
//             <Button type="submit" disabled={loading}>
//               {loading ? "Submitting..." : "Submit"}
//             </Button>
//             {error && <span className="text-red-500 text-sm">{error}</span>}
//             {successMessage && <span className="text-green-600 text-sm">{successMessage}</span>}
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

// export function MyTicketsPage() {
//   const dispatch = useDispatch();
//   const { tickets, loading, error } = useSelector((s) => s.support);

//   useEffect(() => {
//     dispatch(fetchMyTickets());
//   }, [dispatch]);

//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">My Support Tickets</h2>
//       {loading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       <div className="grid gap-3">
//         {tickets?.length === 0 && <div>No tickets found.</div>}
//         {tickets?.map((t) => (
//           <Card key={t._id} className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium">{t.subject}</p>
//                 <p className="text-sm text-gray-500">Category: {t.category}</p>
//                 <p className="text-sm">Status: {t.status}</p>
//               </div>
//               <a className="text-blue-600" href={`/admin/management/support/ticket/${t._id}`}>View</a>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function TicketDetailPage({ ticketId }) {
//   const dispatch = useDispatch();
//   const { selectedTicket, loading, error, successMessage } = useSelector((s) => s.support);
//   const [reply, setReply] = useState("");
//   const [status, setStatus] = useState("OPEN");

//   useEffect(() => {
//     if (ticketId) dispatch(fetchTicketById(ticketId));
//   }, [dispatch, ticketId]);

//   const ticket = selectedTicket;

//   const onReply = (e) => {
//     e.preventDefault();
//     dispatch(adminReplyToTicket({ ticketId, reply, status })).then(() => {
//       setReply("");
//       setTimeout(() => dispatch(clearSupportStatus()), 2000);
//     });
//   };

//   if (loading && !ticket) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!ticket) return <div>Ticket not found</div>;

//   return (
//     <div className="space-y-4">
//       <Card className="p-4 space-y-2">
//         <h2 className="text-lg font-semibold">{ticket.subject}</h2>
//         <p className="text-sm text-gray-500">Category: {ticket.category}</p>
//         <p className="text-sm">Status: {ticket.status}</p>
//         <p className="mt-2 whitespace-pre-wrap">{ticket.message}</p>
//         {ticket.adminReply && (
//           <div className="mt-4 border-t pt-2">
//             <p className="font-medium">Admin Reply</p>
//             <p>{ticket.adminReply}</p>
//           </div>
//         )}
//       </Card>

//       <Card className="p-4">
//         <h3 className="font-medium mb-2">Reply to Ticket</h3>
//         <form onSubmit={onReply} className="grid gap-2">
//           <Textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply" />
//           <Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status (e.g., OPEN, RESOLVED)" />
//           <div className="flex gap-2 items-center">
//             <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Reply"}</Button>
//             {successMessage && <span className="text-green-600 text-sm">{successMessage}</span>}
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  createSupportTicket,
  fetchMyTickets,
  fetchTicketById,
  adminReplyToTicket,
  clearSupportStatus,
} from "../store/support.slice";

export function ContactSupportPage() {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (s) => s.support
  );

  const [form, setForm] = useState({
    category: "General",
    subject: "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSupportTicket(form)).then(() => {
      setForm({
        category: "General",
        subject: "",
        message: "",
      });
      setTimeout(
        () => dispatch(clearSupportStatus()),
        2500
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold">
            Contact Support
          </h2>
          <Badge variant="outline">Help Desk</Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Create a support ticket for technical,
          billing or operational issues.
        </p>

        <form
          onSubmit={onSubmit}
          className="grid gap-4"
        >
          <Input
            placeholder="Category (Technical / Billing / General)"
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                category: e.target.value,
              }))
            }
          />

          <Input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                subject: e.target.value,
              }))
            }
          />

          <Textarea
            rows={5}
            placeholder="Describe your issue in detail"
            value={form.message}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                message: e.target.value,
              }))
            }
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading
                ? "Submitting..."
                : "Submit Ticket"}
            </Button>

            {error && (
              <span className="text-sm text-red-500">
                {error}
              </span>
            )}

            {successMessage && (
              <span className="text-sm text-green-600">
                {successMessage}
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}


export function MyTicketsPage() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector(
    (s) => s.support
  );

  useEffect(() => {
    dispatch(fetchMyTickets());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <div>
        <h2 className="text-xl font-semibold">
          My Support Tickets
        </h2>
        <p className="text-sm text-muted-foreground">
          View and track all submitted tickets
        </p>
      </div>
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">
                Subject
              </th>
              <th className="p-3 text-left">
                Category
              </th>
              <th className="p-3 text-left">
                Status
              </th>
              <th className="p-3 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center"
                >
                  Loading...
                </td>
              </tr>
            )}

            {tickets?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-muted-foreground"
                >
                  No tickets found
                </td>
              </tr>
            )}

            {tickets?.map((t) => (
              <tr
                key={t._id}
                className="border-t hover:bg-muted/50"
              >
                <td className="p-3 font-medium">
                  {t.subject}
                </td>
                <td className="p-3">
                  {t.category}
                </td>
                <td className="p-3">
                  <Badge
                    variant={
                      t.status === "RESOLVED"
                        ? "success"
                        : "warning"
                    }
                  >
                    {t.status}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <a
                    href={`/admin/management/support/ticket/${t._id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

/* ======================================================
   3️⃣ TICKET DETAIL PAGE (CLEAN ADMIN VIEW)
====================================================== */
export function TicketDetailPage({ ticketId }) {
  const dispatch = useDispatch();
  const {
    selectedTicket,
    loading,
    error,
    successMessage,
  } = useSelector((s) => s.support);

  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("OPEN");

  useEffect(() => {
    if (ticketId) {
      dispatch(fetchTicketById(ticketId));
    }
  }, [dispatch, ticketId]);

  const ticket = selectedTicket;

  const onReply = (e) => {
    e.preventDefault();
    dispatch(
      adminReplyToTicket({
        ticketId,
        reply,
        status,
      })
    ).then(() => {
      setReply("");
      setTimeout(
        () => dispatch(clearSupportStatus()),
        2000
      );
    });
  };

  if (loading && !ticket)
    return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-red-500">{error}</div>
    );
  if (!ticket)
    return <div>Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {ticket.subject}
          </h2>
          <Badge
            variant={
              ticket.status === "RESOLVED"
                ? "success"
                : "warning"
            }
          >
            {ticket.status}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Category: {ticket.category}
        </p>

        <div className="border-t pt-3">
          <p className="whitespace-pre-wrap">
            {ticket.message}
          </p>
        </div>

        {ticket.adminReply && (
          <div className="border-t pt-3 bg-muted/30 p-3 rounded">
            <p className="font-medium mb-1">
              Admin Reply
            </p>
            <p>{ticket.adminReply}</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="font-medium mb-3">
          Reply to Ticket
        </h3>

        <form onSubmit={onReply} className="grid gap-3">
          <Textarea
            rows={4}
            value={reply}
            onChange={(e) =>
              setReply(e.target.value)
            }
            placeholder="Type your reply..."
          />

          <Input
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            placeholder="Status (OPEN / RESOLVED)"
          />

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading
                ? "Sending..."
                : "Send Reply"}
            </Button>

            {successMessage && (
              <span className="text-green-600 text-sm">
                {successMessage}
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
