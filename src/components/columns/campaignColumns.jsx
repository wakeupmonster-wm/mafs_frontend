import {
  CalendarDays,
  Gift,
  Award,
  MoreHorizontal,
  Calendar,
  PowerOff,
  Edit,
  Trash,
  CheckCircle,
  Clock,
  BlocksIcon,
  MegaphoneOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

export const campaignColumns = (handleEdit, handleDelete, handleDisable) => [
  {
    accessorKey: "date",
    header: "Date",
    // cell: ({ row }) => (
    //   <div className="flex items-center gap-2">
    //     <CalendarDays className="h-4 w-4 text-gray-400" />
    //     <span className="font-bold text-slate-900">
    //       {new Date(row.original.date).toDateString()}
    //     </span>
    //   </div>
    // ),

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
    accessorKey: "prize.title", // Access nested prize title directly
    header: "Prize",
    cell: ({ row }) => {
      const prize = row.original.prize;
      return (
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-slate-900" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">
              {prize?.title || "-"}
            </span>
            {prize?.spinWheelLabel && (
              <span className="text-[10px] text-gray-500 italic">
                {prize.spinWheelLabel}
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "drawStatus",
    header: "Status",
    cell: ({ row }) => {
      const { drawStatus, isActive } = row.original;

      // 1. Logic: Determine the display status
      // Priority: COMPLETED > (isActive ? ACTIVE : DISABLED)
      const displayStatus =
        drawStatus === "COMPLETED"
          ? "COMPLETED"
          : isActive
          ? "ACTIVE"
          : "DISABLED";

      // 2. Config: Map statuses to styles and icons
      const statusConfig = {
        COMPLETED: {
          className: "bg-green-50 border-green-200 text-green-700",
          icon: <CheckCircle className="h-3 w-3" />,
        },
        ACTIVE: {
          className: "bg-emerald-50 border-emerald-200 text-emerald-700",
          icon: (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          ),
        },
        DISABLED: {
          className: "bg-slate-100 border-slate-300 text-slate-600",
          icon: <MegaphoneOff className="h-3 w-3" />,
        },
        PENDING: {
          // Fallback/Specific state if needed
          className: "bg-amber-50 border-amber-200 text-amber-700",
          icon: <Clock className="h-3 w-3" />,
        },
      };

      const currentConfig =
        statusConfig[displayStatus] || statusConfig.DISABLED;

      return (
        <div className="flex">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors",
              currentConfig.className
            )}
          >
            {currentConfig.icon}
            {displayStatus}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "winner",
    header: "Winner",
    cell: ({ row }) => {
      const winner = row.original.winner;
      // Check if winner object exists and has at least one identifying property
      const hasWinner = winner && (winner.email || winner.phone);

      if (!hasWinner) {
        return (
          <span className="text-sm text-slate-400 italic">No winner yet</span>
        );
      }

      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-blue-600" />
            <span className="font-bold text-slate-900 text-sm">
              {winner.email || winner.phone}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="w-max text-center mr-4 text-xs">Actions</div>,
    cell: ({ row }) => {
      const campaign = row.original;
      // Determine if we should show 'Disable' (e.g., only if status is not COMPLETED and it is currently ACTIVE)
      const canDisable =
        campaign.drawStatus !== "COMPLETED" && campaign.isActive;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(campaign)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Campaign
            </DropdownMenuItem>
            {canDisable && (
              <DropdownMenuItem
                className="text-amber-600"
                onClick={() => handleDisable(campaign._id)}
              >
                <PowerOff className="mr-2 h-4 w-4" /> Disable Campaign
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-red-600 focus:bg-red-50"
              onClick={() => handleDelete(campaign._id, campaign.prize?.title)}
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
