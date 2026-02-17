import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Apple, PlayCircle, Mail } from "lucide-react";

export default function TransactionTable({ data }) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[150px]">Transaction ID</TableHead>
            <TableHead>User Information</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Event</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((txn) => (
            <TableRow key={txn._id} className="hover:bg-slate-50/50">
              <TableCell className="font-mono text-xs text-indigo-600">
                {txn.transactionId}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {txn.userId?.email}
                  </span>
                  <span className="text-xs text-slate-400">
                    {txn.userId?.phone}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {txn.platform === "ios" ? (
                  <Badge
                    variant="outline"
                    className="flex w-fit items-center gap-1 border-slate-300"
                  >
                    <Apple className="w-3 h-3" /> iOS
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="flex w-fit items-center gap-1"
                  >
                    <PlayCircle className="w-3 h-3" /> Android
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: txn.currency,
                }).format(txn.amount)}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    txn.eventType === "PURCHASE"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none"
                      : "bg-blue-100 text-blue-700"
                  }
                >
                  {txn.eventType}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-xs text-slate-500 font-medium">
                {new Date(txn.occurredAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
