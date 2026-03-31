import {
  Gift,
  Award,
  MoreHorizontal,
  Calendar,
  PowerOff,
  Power,
  Edit,
  Trash,
  CheckCircle,
  Clock,
  MegaphoneOff,
  Eye,
  Type,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator as Separator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

export const campaignColumns = (
  handleEdit,
  handleDelete,
  handleDisable,
  handleActivate,
  handleView,
  page = 1,
  limit = 10
) => [
    {
      id: "serialNumber",
      header: "S.No",
      cell: ({ row }) => {
        return (
          <span className="text-xs font-bold">
            {(page - 1) * limit + row.index + 1}.
          </span>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Campaign Name",
      cell: ({ row }) => {
        const title = row.original?.title;
        return (
          <div className="flex items-center gap-2 group">
            {/* <Type className="h-4 w-4 text-brand-aqua transition-transform group-hover:scale-110" /> */}
            <span className="font-bold text-slate-900 truncate max-w-[150px]">
              {title || "Untitled Campaign"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",

      cell: ({ row }) => {
        const dateValue = row.original?.createdAt;

        if (!dateValue) {
          return <span className="text-sm text-slate-400 italic">—</span>;
        }

        const date = new Date(dateValue);

        return (
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-900">
              {formatDistanceToNow(date, { addSuffix: true })}
            </span>
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

        const displayStatus =
          drawStatus === "COMPLETED"
            ? "COMPLETED"
            : isActive
              ? "ACTIVE"
              : "DISABLED";

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
        const campaignId = campaign._id || campaign.id;
        const isCompleted = campaign.drawStatus === "COMPLETED";
        const hasWinner = Boolean(campaign.winner && (campaign.winner.email || campaign.winner.phone));

        // Show Disable only for non-completed, active campaigns
        const canDisable = !isCompleted && campaign.isActive;
        // Show Activate only for non-completed, disabled campaigns
        const canActivate = !isCompleted && !campaign.isActive;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl shadow-xl">
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1">
                Actions
              </DropdownMenuLabel>

              {/* View Campaign */}
              <DropdownMenuItem
                className="gap-2 cursor-pointer py-2 rounded-lg focus:bg-brand-aqua/10 focus:text-brand-aqua font-semibold text-xs"
                onClick={() => handleView(campaign)}
              >
                <Eye className="h-4 w-4" />
                View Campaign
              </DropdownMenuItem>

              {/* Edit Campaign */}
              <DropdownMenuItem
                className="gap-2 cursor-pointer py-2 rounded-lg focus:bg-blue-50 focus:text-blue-600 font-semibold text-xs"
                onClick={() => handleEdit(campaign)}
              >
                <Edit className="h-4 w-4" />
                Edit Campaign
              </DropdownMenuItem>

              <Separator className="my-1" />

              {/* Activate Campaign - shown when disabled */}
              {canActivate && (
                <DropdownMenuItem
                  className="gap-2 cursor-pointer py-2 rounded-lg text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700 font-semibold text-xs"
                  onClick={() => handleActivate(campaignId)}
                >
                  <Power className="h-4 w-4" />
                  Activate Campaign
                </DropdownMenuItem>
              )}

              {/* Disable Campaign - shown when active */}
              {canDisable && (
                <DropdownMenuItem
                  className="gap-2 cursor-pointer py-2 rounded-lg text-amber-600 focus:bg-amber-50 focus:text-amber-700 font-semibold text-xs"
                  onClick={() => handleDisable(campaignId)}
                >
                  <PowerOff className="h-4 w-4" />
                  Disable Campaign
                </DropdownMenuItem>
              )}

              {/* Delete */}
              <DropdownMenuItem
                className={`gap-2 cursor-pointer py-2 rounded-lg text-red-600 focus:bg-red-50 focus:text-red-700 font-semibold text-xs ${hasWinner ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => {
                  if (hasWinner) {
                    e.preventDefault();
                    return;
                  }
                  handleDelete(campaignId, campaign?.createdAt);
                }}
                disabled={hasWinner}
              >
                <Trash className="h-4 w-4" />
                {hasWinner ? "Cannot Delete" : "Delete Campaign"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
