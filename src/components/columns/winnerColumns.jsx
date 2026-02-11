import { format, formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Gift,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react";

export const getWinnerColumns = () => [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        className="flex items-center hover:text-gray-900 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Campaign Date
        <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
      </button>
    ),
    cell: ({ row }) => {
      const dateValue = row.original?.date;

      if (!dateValue) {
        return <span className="text-sm text-slate-400 italic">—</span>;
      }

      const date = new Date(dateValue);

      return (
        <div className="flex flex-col">
          {/* Relative time: e.g., "2 days ago" */}
          <span className="text-xs font-medium text-slate-900">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
          {/* Absolute date: e.g., "Feb 10, 2026 5:54 PM" */}
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Calendar className="h-2.5 w-2.5 opacity-70" />
            <span>{format(date, "MMM dd, yyyy p")}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "prize.title",
    header: "Prize",
    cell: ({ row }) => {
      const prize = row.original.prize;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 group">
            <Gift className="h-4 w-4 text-gray-900 transition-transform group-hover:scale-110" />
            <span className="font-semibold text-gray-800">
              {prize?.title || "No Prize"}
            </span>
          </div>
          {prize?.value && (
            <span className="text-[10px] text-gray-400 ml-6">
              Value: {prize.value}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "winner",
    header: "Winner",
    cell: ({ row }) => {
      const winner = row.original.winner;
      const status = row.original.drawStatus;

      if (!winner) {
        return status === "COMPLETED" ? (
          <div className="flex items-center gap-1 text-amber-600 italic text-xs">
            <AlertCircle className="h-3 w-3" /> No Winner Found
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">
            Waiting for draw...
          </span>
        );
      }
      return (
        <div className="flex items-center gap-2 group">
          <User className="h-4 w-4 text-blue-600" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">
              {winner.phone || "No Phone"}
            </span>
            <span className="text-[10px] text-gray-400">
              {winner.email || ""}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "drawStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.drawStatus;
      const styles = {
        COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
        PENDING: "bg-amber-50 text-amber-700 border-amber-200",
        PROCESSING: "bg-blue-50 text-blue-700 border-blue-200",
      };

      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            styles[status] || "bg-gray-50 text-gray-600"
          }`}
        >
          {status === "COMPLETED" ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <Clock className="h-3 w-3" />
          )}
          {status}
        </span>
      );
    },
  },
];
