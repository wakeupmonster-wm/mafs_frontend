import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlayCircle, Hash, User, Smartphone } from "lucide-react";
import { AiFillApple } from "react-icons/ai";

export const transactionColumns = [
  {
    accessorKey: "transactionId",
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="w-3 h-3" /> Transaction ID
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
        {row.getValue("transactionId").slice(0, 12)}...
      </span>
    ),
  },
  {
    accessorKey: "userId",
    header: () => (
      <div className="flex items-center gap-2">
        <User className="w-3 h-3" /> Customer
      </div>
    ),
    cell: ({ row }) => {
      const user = row.getValue("userId");
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-slate-200">
            <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-bold">
              {user?.email?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-900 leading-none mb-1">
              {user?.email}
            </span>
            <span className="text-[10px] text-slate-400">
              {user?.phone || "No phone linked"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "platform",
    header: () => (
      <div className="flex items-center gap-2">
        <Smartphone className="w-3 h-3" /> Platform
      </div>
    ),
    cell: ({ row }) => {
      const platform = row.getValue("platform");
      return platform === "ios" ? (
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase bg-slate-50 text-slate-600">
            <AiFillApple className="w-3 h-3 text-black" /> IOS
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-slate-600">
          <div className="p-1 bg-slate-100 rounded">
            <PlayCircle className="w-3 h-3" />
          </div>
          <span className="text-xs font-medium capitalize">{platform}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const currency = row.original.currency || "USD";
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);

      return (
        <div className="text-sm font-bold text-slate-900">{formatted}</div>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: "Status / Event",
    cell: ({ row }) => {
      const type = row.getValue("eventType");
      return (
        <Badge
          variant="secondary"
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight border ${
            type === "PURCHASE"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "occurredAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("occurredAt"));
      return (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-700">
            {date.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-[10px] text-slate-400 uppercase">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
];
