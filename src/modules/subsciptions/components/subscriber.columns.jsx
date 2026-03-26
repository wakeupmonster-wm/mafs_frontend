import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Calendar,
  MoreHorizontal,
  Eye,
  Copy,
  Mail,
  Phone,
  Layers,
  Smartphone,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  ShieldCheck,
  Gift,
} from "lucide-react";
import { IoLogoApple } from "react-icons/io5";
import { AiFillAndroid } from "react-icons/ai";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyImg from "@/assets/web/dummyImg.webp";
import { cn } from "@/lib/utils";

export const getSubscriberColumns = (navigate) => [
  {
    id: "sno",
    header: () => (
      <div className="w-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
        S.No
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-transparent p-0"
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
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm rounded-xl overflow-hidden">
              <AvatarImage src={avatar} className="object-cover" />
              <AvatarFallback className="bg-brand-aqua/10 text-brand-aqua text-[10px] font-black rounded-xl">
                {String(name).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {data?.status === "ACTIVE" && !data?.isExpired && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-slate-900 truncate max-w-[120px]">
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
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        Plan
      </div>
    ),
    cell: ({ row }) => {
      const plan = row.original?.planType;

      return (
        <Badge
          className={cn(
            "text-[10px] font-black px-2 py-0 h-5 shadow-none border",
            plan === "1_MONTH" || plan === "MONTHLY"
              ? "bg-blue-50 text-blue-600 border-blue-100"
              : plan === "3_MONTH" || plan === "QUARTERLY"
                ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                : plan === "YEARLY"
                  ? "bg-purple-50 text-purple-600 border-purple-100"
                  : "bg-amber-50 text-amber-600 border-amber-100",
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
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        Platform
      </div>
    ),
    cell: ({ row }) => {
      const platform = row.original?.platform?.toLowerCase();

      let icon = <Smartphone className="w-3.5 h-3.5" />;
      let label = platform?.toUpperCase() || "N/A";
      let style = "bg-slate-50 text-slate-600 border-slate-200";

      if (platform === "ios") {
        icon = <IoLogoApple className="w-3.5 h-3.5" />;
        label = "iOS";
        style = "bg-slate-900 text-white border-slate-800";
      } else if (platform === "android") {
        icon = <AiFillAndroid className="w-3.5 h-3.5" />;
        label = "Android";
        style = "bg-emerald-50 text-emerald-700 border-emerald-200";
      } else if (platform === "admin_granted" || platform === "admin") {
        icon = <ShieldCheck className="w-3.5 h-3.5" />;
        label = "Admin";
        style = "bg-brand-aqua/10 text-brand-aqua border-brand-aqua/30";
      }

      return (
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-black px-2 py-0.5 h-5 gap-1 shadow-none border",
            style,
          )}
        >
          {icon} {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original?.status;
      const isExpired = row.original?.isExpired;

      let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";
      let label = status;

      if (status === "ACTIVE" && !isExpired) {
        badgeStyle = "bg-emerald-50 text-emerald-600 border-emerald-100";
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
              "text-[10px] font-black px-2.5 py-0.5 shadow-none border uppercase tracking-widest",
              badgeStyle,
            )}
          >
            {label}
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
        className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-transparent p-0"
      >
        Started
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.original?.startedAt;
      return (
        <div className="space-y-0.5">
          <p className="text-[11px] font-bold text-slate-700">
            {date ? format(new Date(date), "MMM dd, yyyy") : "-"}
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
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
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
            {date ? format(new Date(date), "MMM dd, yyyy") : "-"}
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
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
        Auto-Renew
      </div>
    ),
    cell: ({ row }) => {
      const autoRenew = row.original?.autoRenew;

      return (
        <div className="flex justify-center">
          {autoRenew ? (
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px] font-black px-2 py-0.5 shadow-none border gap-1">
              <RefreshCcw className="w-3 h-3" /> Yes
            </Badge>
          ) : (
            <Badge className="bg-slate-50 text-slate-400 border-slate-200 text-[10px] font-black px-2 py-0.5 shadow-none border gap-1">
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
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        Source
      </div>
    ),
    cell: ({ row }) => {
      // Use `source` field if available, otherwise derive from `platform`
      const source = row.original?.source;
      const platform = row.original?.platform?.toLowerCase();

      let label = source || "STORE";
      let style = "bg-blue-50 text-blue-600 border-blue-100";
      let icon = <Smartphone className="w-3 h-3" />;

      if (!source) {
        // Fallback: derive from platform
        if (platform === "admin_granted" || platform === "admin") {
          label = "ADMIN";
        } else {
          label = "STORE";
        }
      }

      if (label === "ADMIN") {
        style = "bg-brand-aqua/10 text-brand-aqua border-brand-aqua/30";
        icon = <ShieldCheck className="w-3 h-3" />;
      } else if (label === "GIVEAWAY") {
        style = "bg-amber-50 text-amber-600 border-amber-100";
        icon = <Gift className="w-3 h-3" />;
      } else {
        style = "bg-blue-50 text-blue-600 border-blue-100";
        icon = <Smartphone className="w-3 h-3" />;
      }

      return (
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-black px-2 py-0.5 h-5 gap-1 shadow-none border",
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
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right pr-4">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      const sub = row.original;
      return (
        <div className="text-right pr-2">
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
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">
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
