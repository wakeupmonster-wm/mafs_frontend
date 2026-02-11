import {
  Calendar,
  Gift,
  User,
  CheckCircle,
  Truck,
  Clock,
  Loader2,
  Crown,
  CircleDollarSign,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { format, formatDistanceToNow } from "date-fns";

export const getDeliveryColumns = (onMarkDelivered, deliveryLoading) => [
  {
    accessorKey: "user",
    header: "Winner",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 group">
            <User className="h-4 w-4 text-blue-600 transition-all group-hover:scale-110" />
            <span className="font-bold text-slate-900">
              {user?.phone || user?.email || "-"}
            </span>
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
            <Gift className="h-4 w-4 text-slate-900 transition-all group-hover:scale-110" />
            <span className="font-bold text-slate-900">
              {prize?.title || "-"}
            </span>
          </div>
          {prize?.value && (
            <span className="text-[10px] text-slate-500 ml-6">
              Value: {prize.value}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "prize.type",
    header: "Type",
    cell: ({ row }) => {
      const type = row?.original.prize?.type;

      const styles = {
        FREE_PREMIUM: "bg-amber-50 text-amber-700 border-amber-200",
        GIFT_CARD: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
      const icons = {
        FREE_PREMIUM: <Crown className="h-3.5 w-3.5" />,
        GIFT_CARD: <CircleDollarSign className="h-3.5 w-3.5" />,
      };
      return (
        <Badge
          variant="outline"
          className={`${
            styles[type] || "bg-gray-50"
          } flex w-fit items-center gap-1`}
        >
          {icons[type] || <Gift className="h-3.5 w-3.5" />}
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "campaign.date", // Keep the original key to access the nested data
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
      const dateValue = row.original.campaign?.date;

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
    accessorKey: "deliveryStatus",
    header: "Status",
    cell: ({ row }) => {
      const { deliveryStatus, claimedAt } = row.original;

      // 1. If it's already delivered, show Delivered
      if (deliveryStatus === "DELIVERED") {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      }

      // if (deliveryStatus === "PENDING") {
      //   return (
      //     <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
      //       <Truck className="w-3 h-3" /> Pending
      //     </span>
      //   );
      // }

      // 2. Critical Fix: If it's NOT claimed yet, show "Not Claimed"
      // regardless of what the deliveryStatus says.
      if (!claimedAt) {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-50 text-slate-500 border border-slate-200">
            <Clock className="w-3 h-3" /> Not Claimed
          </span>
        );
      }

      // 3. If it IS claimed but not yet delivered
      if (deliveryStatus === "PENDING") {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
            <Truck className="w-3 h-3" /> Pending
          </span>
        );
      }

      return null;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const d = row?.original;
      const isLoading = deliveryLoading[d._id];
      // console.log("d: ", d);

      if (d.deliveryStatus === "PENDING" && d.claimedAt) {
        return (
          <div className="text-right">
            <Button
              size="sm"
              onClick={() => onMarkDelivered(d._id)}
              disabled={isLoading}
              className="bg-slate-900 hover:bg-slate-800 text-white h-8 text-xs gap-2 shadow-md transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle className="w-3 h-3" />
              )}
              Mark Delivered
            </Button>
          </div>
        );
      }
      return (
        <div className="text-right">
          <span className="text-xs text-slate-400 italic">No Action</span>
        </div>
      );
    },
  },
];
