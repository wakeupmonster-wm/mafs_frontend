import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Copy,
  Smartphone,
  XCircle,
  RefreshCcw,
  ShieldCheck,
  Gift,
} from "lucide-react";
import { AiFillAndroid, AiFillApple } from "react-icons/ai";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyImg from "@/assets/web/dummyImg.webp";
import { cn } from "@/lib/utils";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiDevicesDuotone } from "react-icons/pi";
import { LuStore } from "react-icons/lu";

export const getSubscriberColumns = (navigate) => [
  {
    id: "sno",
    size: 60,
    header: () => (
      <div className="w-12 text-center text-xs font-black tracking-widest text-slate-500">
        Sr.No
      </div>
    ),
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <div className="w-10 text-center font-bold text-xs">
          {pageIndex * pageSize + row.index + 1}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "user.nickname",
    size: 220,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-[200px] min-w-[200px] justify-start text-xs font-black tracking-widest text-slate-500 hover:bg-transparent p-0"
      >
        Subscriber
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original;
      const user = data?.user || data?.userId || data?.userInfo || data;

      const avatar =
        user?.photo && user.photo !== "null"
          ? user.photo
          : user?.avatar?.url || user?.avatar || dummyImg;

      const rawNickname = user?.nickname;
      const nickname =
        rawNickname && rawNickname !== "N/A" ? rawNickname : null;

      const rawEmail = user?.email;
      const email = rawEmail && rawEmail !== "N/A" ? rawEmail : null;

      const name =
        nickname ||
        user?.fullName ||
        user?.name ||
        email ||
        user?.phone ||
        "Unknown User";

      return (
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm rounded-full overflow-hidden">
              <AvatarImage src={avatar} className="object-cover" />
              <AvatarFallback className="bg-brand-aqua/10 text-brand-aqua text-[10px] font-black rounded-xl">
                {String(name).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* {data?.status === "ACTIVE" && !data?.isExpired && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
            )} */}
          </div>
          <div className="min-w-0">
            <p className="capitalize text-xs font-black text-slate-900 truncate max-w-[120px]">
              {name}
            </p>
            <p className="text-[10px] font-medium text-slate-400 truncate max-w-[140px]">
              {email || user?.phone || "No contact"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "planType",
    header: () => (
      <div className="min-w-[120px] text-xs font-black tracking-widest text-slate-500">
        Plan
      </div>
    ),
    cell: ({ row }) => {
      const plan = row.original?.planType;

      return (
        <Badge
          className={cn(
            "text-[10px] font-black p-0 h-5 border-none",
            plan === "1_MONTH" || plan === "MONTHLY"
              ? "text-blue-600"
              : plan === "3_MONTH" || plan === "QUARTERLY"
                ? "text-indigo-600"
                : plan === "YEARLY"
                  ? "text-purple-600"
                  : "text-amber-600",
          )}
        >
          {plan}
        </Badge>
      );
    },
  },
  {
    accessorKey: "platform",
    header: () => (
      <div className="text-xs font-black tracking-widest text-slate-500">
        Platform
      </div>
    ),
    cell: ({ row }) => {
      const platform = row.original?.platform?.toLowerCase();

      let icon = <PiDevicesDuotone className="w-5 h-5" />;
      let label = platform?.toUpperCase() || "N/A";
      let style = "text-slate-600";

      if (platform === "ios") {
        icon = <AiFillApple className="w-5 h-5" />;
        label = "iOS";
        style = "text-black border-slate-200 bg-slate-100";
      } else if (platform === "android") {
        icon = <AiFillAndroid className="w-5 h-5" />;
        label = "Android";
        style = "text-emerald-600 border-emerald-100 bg-emerald-100";
      } else if (platform === "admin_granted" || platform === "admin") {
        icon = <LiaUserTieSolid className="w-5 h-5" />;
        label = "Admin";
        style = "text-brand-aqua border-brand-aqua/20 bg-brand-aqua/5";
      }

      return (
        <Badge
          variant="outline"
          className={cn(
            "text-sm font-black rounded-lg px-1.5 py-3.5 h-6 gap-1 shadow-none",
            style,
          )}
        >
          {icon}
          {/* {label} */}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="min-w-[125px] text-xs font-black tracking-widest text-slate-500 text-center">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original?.status;
      const isExpired = row.original?.isExpired;

      let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";
      let label = status;

      if (status === "ACTIVE" && !isExpired) {
        badgeStyle =
          "bg-brand-aqua/80 capitalize text-white border-brand-aqua/20";
      } else if (isExpired) {
        badgeStyle = "bg-rose-50 text-rose-600 border-rose-100";
        label = "EXPIRED";
      } else if (status === "REVOKED") {
        badgeStyle = "bg-red-50 text-red-600 border-red-100";
      }

      return (
        <div className="flex justify-center">
          <Badge
            className={cn(
              "cursor-pointer text-xs rounded-2xl px-1.5 shadow-none border",
              badgeStyle,
            )}
          >
            {label?.toLowerCase()}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "startedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-[100px] justify-start text-xs font-black tracking-widest text-slate-500 hover:bg-transparent p-0"
      >
        Started
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.original?.startedAt;
      return (
        <div className="space-y-0">
          <p className="text-[11px] font-bold text-slate-700">
            {date ? format(new Date(date), "dd MMM, yyyy") : "-"}
          </p>
          <p className="text-[10px] text-slate-400">
            {date
              ? formatDistanceToNow(new Date(date), { addSuffix: true })
              : "-"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "expiresAt",
    header: () => (
      <div className="w-[80px] text-xs font-black tracking-widest text-slate-500">
        Expires
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original?.expiresAt;
      const isExpired = row.original?.isExpired;

      return (
        <div className="space-y-0.5">
          <p
            className={cn(
              "text-[11px] font-bold",
              isExpired ? "text-rose-500" : "text-slate-700",
            )}
          >
            {date ? format(new Date(date), "dd MMM, yyyy") : "-"}
          </p>
          <p className="text-[10px] text-slate-400">
            {date
              ? formatDistanceToNow(new Date(date), { addSuffix: true })
              : "-"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "autoRenew",
    header: () => (
      <div className="w-[110px] text-xs font-black tracking-widest text-slate-500 text-center">
        Auto-Renew
      </div>
    ),
    cell: ({ row }) => {
      const autoRenew = row.original?.autoRenew;

      return (
        <div className="flex justify-center">
          {autoRenew ? (
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-xs font-black px-2 py-0.5 shadow-none border gap-1">
              <RefreshCcw className="w-3 h-3" /> Yes
            </Badge>
          ) : (
            <Badge className="bg-slate-50 text-slate-400 border-slate-200 text-xs font-black px-2 py-0.5 shadow-none border gap-1">
              <XCircle className="w-3 h-3" /> No
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "source",
    header: () => (
      <div className="min-w-[80px] text-xs font-black tracking-widest text-slate-500">
        Source
      </div>
    ),
    cell: ({ row }) => {
      // Use `source` field if available, otherwise derive from `platform`
      const source = row.original?.source;
      const platform = row.original?.platform?.toLowerCase();

      let label = source || "STORE";
      let style = "bg-blue-50 text-blue-600 border-blue-100";
      let icon = <LuStore className="w-3 h-3" />;

      if (!source) {
        // Fallback: derive from platform
        if (platform === "admin_granted" || platform === "admin") {
          label = "ADMIN";
        } else {
          label = "STORE";
        }
      }

      if (label === "ADMIN") {
        style = "bg-brand-aqua/5 text-brand-aqua border-brand-aqua/20";
        icon = <LiaUserTieSolid className="w-4 h-4" />;
      } else if (label === "GIVEAWAY") {
        style = "bg-amber-50 text-amber-600 border-amber-100";
        icon = <Gift className="w-3 h-3" />;
      } else {
        style = "bg-blue-50 text-blue-600 border-blue-100";
        icon = <LuStore className="w-3 h-3" />;
      }

      return (
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-black px-2 py-2 h-6 gap-1 shadow-none border",
            style,
          )}
        >
          {icon} {label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="w-[80px] text-xs font-black tracking-widest text-slate-500 text-right pr-4">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      const sub = row.original;
      return (
        <div className="text-center pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100/50 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-2 rounded-2xl border-slate-200 shadow-xl"
            >
              <DropdownMenuLabel className="text-[10px] font-black tracking-widest text-slate-400 px-2 py-1.5">
                Management
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="gap-2 cursor-pointer py-2 rounded-xl focus:bg-brand-aqua/10 focus:text-brand-aqua font-bold text-xs"
                onClick={() => {
                  const targetId =
                    sub.user?._id || sub.userId?._id || sub.userId;
                  if (targetId) navigate(`../view-subscription/${targetId}`);
                  else toast.error("User ID not found");
                }}
              >
                <Eye className="w-4 h-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer py-2 rounded-xl focus:bg-brand-aqua/10 focus:text-brand-aqua font-bold text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(sub._id);
                  toast.success("Subscription ID copied");
                }}
              >
                <Copy className="w-4 h-4" />
                Copy Sub ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
