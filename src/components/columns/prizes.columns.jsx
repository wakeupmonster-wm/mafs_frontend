import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Crown,
  CircleDollarSign,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const getPrizeColumns = (onEdit, onDelete) => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
          <Gift className="h-4 w-4" />
        </div>
        <span className="font-semibold text-gray-900">
          {row.getValue("title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
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
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <span className="font-medium text-gray-700">{row.getValue("value")}</span>
    ),
  },
  {
    accessorKey: "spinWheelLabel",
    header: "Wheel Label",
    cell: ({ row }) => {
      const label = row.getValue("spinWheelLabel");

      if (!label) {
        return <span className="text-xs text-slate-400 font-mono">-</span>;
      }

      return (
        <div className="flex items-center gap-1.5">
          <div className="p-1 bg-amber-50 rounded-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
          </div>
          <span className="text-sm font-medium text-slate-700 tracking-tight">
            {label}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "supportiveItems",
    header: "Supportive Items",
    cell: ({ row }) => {
      const items = row.original.supportiveItems || [];

      if (items.length === 0) {
        return <span className="text-sm text-gray-400">-</span>;
      }

      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {items.slice(0, 3).map((item, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border-none transition-all duration-200 hover:bg-slate-200"
            >
              {item}
            </Badge>
          ))}

          {items.length > 3 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="outline"
                    className="rounded-md px-2 py-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border-indigo-100 transition-all duration-200 hover:scale-105"
                  >
                    +{items.length - 3}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{items.slice(3).join(", ")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
        <Calendar className="h-3.5 w-3.5" />
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const prize = row.original;
      //   console.log("prize column: ", prize);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(prize)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(prize._id, prize.title)}
              className="text-red-600 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
