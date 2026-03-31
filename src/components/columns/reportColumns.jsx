import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Eye, Info } from "lucide-react";
import dummyImg from "@/assets/web/dummyImg.webp";
import { IoFlagSharp } from "react-icons/io5";

export const reportColumns = (navigate) => [
  {
    id: "sno",
    header: () => <div className="w-4 text-center text-xs">Sr.No.</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;

      return <div className="w-4 text-center font-medium">{serialNumber}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nickname",
    header: "User Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.profilePhoto || dummyImg}
          className="w-8 h-8 rounded-full object-cover"
          alt="avatar"
        />
        <span className="capitalize font-medium text-[13px] text-slate-700">
          {row.getValue("nickname")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "reportCount",
    header: "Reports",
    cell: ({ row }) => {
      const count = row.getValue("reportCount"); // Extract value once for cleaner code

      const getPriorityColor = (num) => {
        if (num >= 5) return "text-red-600";
        if (num >= 3) return "text-amber-600";
        return "text-blue-600";
      };

      return (
        <Badge
          variant="outline"
          className={cn(
            "gap-1 w-max font-semibold px-0 border-transparent",
            getPriorityColor(count),
          )}
        >
          <IoFlagSharp className="w-3 h-3" />
          {count} report
          {count !== 1 ? "s" : ""}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastReportedAt",
    header: "Last Reported",
    cell: ({ row }) => {
      const dateValue = row.getValue("lastReportedAt");
      if (!dateValue) return <span className="text-slate-400">-</span>;

      const date = new Date(dateValue);

      return (
        <div className="text-sm w-max">
          <div className="text-slate-900 font-medium">
            {date.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div className="text-slate-500 text-xs">
            {date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // Optional: Makes it 10:30 AM instead of 10:30
            })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const colors = {
        resolved: "bg-emerald-50 text-emerald-700 border-emerald-100",
        pending: "bg-amber-50 text-amber-700 border-amber-100",
        new: "bg-red-50 text-red-700 border-red-100",
      };
      return (
        <Badge
          className={cn(
            "capitalize border font-normal",
            colors[status] || "bg-slate-50",
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reportCount",
    id: "reportCountDisplay", // Unique ID
    header: "Priority",
    cell: ({ row }) => {
      const count = row.getValue("reportCount");

      if (count >= 5) {
        return (
          <Badge className="text-red-700 px-0 border-transparent">
            <AlertTriangle className="w-3 h-3 mr-1" />
            HIGH
          </Badge>
        );
      }

      if (count >= 3) {
        return (
          <Badge className="text-amber-700 px-0 border-transparent">
            <AlertCircle className="w-3 h-3 mr-1" />
            MEDIUM
          </Badge>
        );
      }

      return (
        <Badge className="text-blue-700 px-0 border-transparent">
          <Info className="w-3 h-3 mr-1" />
          LOW
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    // Fixed width prevents the table from expanding too much
    size: 100,
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-slate-600 font-medium border hover:border-brand-aqua shadow-sm hover:bg-brand-aqua/20"
          onClick={() => navigate(`./review/${row.original?.userId}`)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Review
        </Button>
      );
    },
  },
];
