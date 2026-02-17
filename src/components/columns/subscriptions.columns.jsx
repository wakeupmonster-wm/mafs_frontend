import { Badge } from "@/components/ui/badge"; // Assuming you use shadcn or similar
import { format, formatDistanceToNow } from "date-fns";
import { useLocation, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  Calendar,
  Monitor,
  MoreHorizontal,
  PlayCircle,
  RefreshCcw,
  Smartphone,
  RefreshCwOff,
  Eye,
  Copy,
  ExternalLink,
  MessagesSquare,
  Mail,
  Phone,
  Layers,
  Star,
} from "lucide-react";
import { IoLogoApple } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dummyImg from "@/assets/images/dummyImg.jpg";

export const subscriptionColumns = [
  {
    id: "sno",
    header: () => <div className="w-10 text-center text-xs">S.No</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;

      return <div className="w-10 text-center font-medium">{serialNumber}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "user",
    accessorFn: (row) => row.user,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        User
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original?.user;
      console.log("user: ", user);
      const nickname = user?.nickname || "unknown";
      // Added safety check for the photos array
      const avatar = user?.avatar.url || dummyImg;

      return (
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-bold text-[11px] truncate">{nickname}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "userId.email",
  //   header: "Subscriber",
  //   cell: ({ row }) => {
  //     const email = row.original?.user?.email || "-";
  //     const phone = row.original?.user?.phone || "-";

  //     const copyToClipboard = (text, type) => {
  //       navigator.clipboard.writeText(text);
  //       toast.success(`${type} copied!`, {
  //         style: { fontSize: "12px", padding: "8px" },
  //       });
  //     };

  //     return (
  //       <div className="flex flex-col gap-1 w-max">
  //         {/* Email Row */}
  //         <div className="flex items-center group">
  //           <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" />
  //           <span className="font-semibold text-slate-700 truncate max-w-[180px]">
  //             {email}
  //           </span>
  //           <button
  //             onClick={() => copyToClipboard(email, "Email")}
  //             className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-brand-aqua"
  //           >
  //             <Copy className="w-3 h-3" />
  //           </button>
  //         </div>

  //         {/* Phone Row */}
  //         <div className="flex items-center text-[11px] text-slate-500">
  //           <Phone className="w-3 h-3 mr-2" />
  //           <span>{phone}</span>
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "userId.email",
    header: "Email Address",
    cell: ({ row }) => {
      const email = row.original?.user?.email || "-";

      const copyEmail = () => {
        navigator.clipboard.writeText(email);
        toast.success("Email copied", { id: "email-copy" });
      };

      return (
        <div className="flex items-center group gap-2 w-max text-[12px]">
          {/* <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
          </div> */}
          <Mail className="w-3.5 h-3.5 text-brand-aqua" strokeWidth={2.5} />
          <span className="flex items-center gap-2 font-medium text-slate-700 truncate">
            {email}
            <Copy
              onClick={copyEmail}
              title="Copy Email"
              className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand-aqua"
            />
          </span>
          {/* <button
            onClick={copyEmail}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-brand-aqua"
            title="Copy Email"
          >
            <Copy className="w-3 h-3" />
          </button> */}
        </div>
      );
    },
  },
  {
    accessorKey: "userId.phone",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original?.user?.phone || "-";

      const copyPhone = () => {
        navigator.clipboard.writeText(phone);
        toast.success("Phone copied", { id: "phone-copy" });
      };

      return (
        <div className="flex items-center group gap-2 w-max text-[12px]">
          {/* <div className="p-1.5 rounded-md bg-slate-50 text-slate-500 font-medium">
          </div> */}
          <Phone className="w-3.5 h-3.5 text-brand-aqua" strokeWidth={2.5} />
          <span className="flex items-center gap-2 font-medium text-slate-700 truncate">
            {phone}
            <Copy
              onClick={copyPhone}
              title="Copy Phone"
              className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-brand-aqua"
            />
          </span>
          {/* <button
            onClick={copyPhone}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-brand-aqua"
            title="Copy Phone"
          >
            <Copy className="w-3 h-3" />
          </button> */}
        </div>
      );
    },
  },
  {
    accessorKey: "planType",
    header: "Subscription Plan",
    cell: ({ row }) => {
      const plan = row.getValue("planType")?.toLowerCase();

      // Define styles and icons based on the plan duration
      const planConfig = {
        monthly: {
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <Calendar className="w-3 h-3" />,
          label: "Monthly",
        },
        yearly: {
          color: "bg-purple-50 text-purple-700 border-purple-200",
          icon: <Star className="w-3 h-3" />,
          label: "Yearly",
        },
        lifetime: {
          color: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Layers className="w-3 h-3" />,
          label: "Lifetime",
        },
      };

      const config = planConfig[plan] || {
        color: "bg-slate-50 text-slate-600 border-slate-200",
        icon: <Calendar className="w-3 h-3" />,
        label: plan,
      };

      return (
        <div
          className={`flex items-center w-fit gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase ${config.color}`}
        >
          {config.icon}
          {config.label}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rawStatus = row.getValue("status") || "";
      const status = rawStatus.toUpperCase(); // Normalization

      const colorMap = {
        ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
        EXPIRED: "bg-rose-100 text-rose-700 border-rose-200",
        CANCELLED: "bg-slate-100 text-slate-700 border-slate-200",
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
      };

      return (
        <div className="flex items-center gap-2">
          <Badge
            className={`${
              colorMap[status] || "bg-blue-100 text-blue-700 border-blue-200"
            } border shadow-none font-semibold px-2.5 py-0.5 transition-colors`}
          >
            {/* Optional: Add a small dot for visual flair */}
            {status === "ACTIVE" && (
              <span className="relative flex h-2 w-2 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform")?.toLowerCase();

      // Map icons to platforms
      const iconMap = {
        ios: <IoLogoApple className="w-3.5 h-3.5 mb-0.5" />,
        android: <PlayCircle className="w-3.5 h-3.5 mb-0.5 text-green-600" />,
        web: <Monitor className="w-3.5 h-3.5 mb-0.5" />,
      };

      const platformStyles = {
        ios: "bg-zinc-100 text-zinc-900 border-zinc-200",
        android: "bg-green-50 text-green-700 border-green-100",
        web: "bg-blue-50 text-blue-700 border-blue-100",
      };

      return (
        <div className="flex items-center">
          <span
            className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold tracking-tight uppercase
            ${platformStyles[platform] || "bg-slate-50 text-slate-600"}
          `}
          >
            {iconMap[platform] || <Smartphone className="w-3.5 h-3.5" />}
            {platform}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="flex items-center hover:text-gray-900 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Buy At
        <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
      </button>
    ),
    cell: ({ row }) => {
      const dateValue = row.original?.createdAt;

      if (!dateValue) {
        return <span className="text-sm text-slate-400 italic">-</span>;
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
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <button
        className="flex items-center hover:text-gray-900 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expiry Date
        <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
      </button>
    ),
    cell: ({ row }) => {
      const dateValue = row.original?.expiresAt;

      if (!dateValue) {
        return <span className="text-sm text-slate-400 italic">-</span>;
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
    accessorKey: "autoRenew",
    header: "Auto-Renew",
    cell: ({ row }) => {
      const isAutoRenew = !!row.getValue("autoRenew");

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-start items-center">
                <span
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold border transition-all ${
                    isAutoRenew
                      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}
                >
                  {isAutoRenew ? (
                    <RefreshCcw className="w-3 h-3 animate-spin-slow" />
                  ) : (
                    <RefreshCwOff className="w-3 h-3" />
                  )}
                  {isAutoRenew ? "ENABLED" : "DISABLED"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isAutoRenew
                  ? "Subscription will renew automatically"
                  : "Manual renewal required"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  // Actions Column
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const subscription = row.original;
      console.log("subscription: ", subscription?.user?.userId);

      const navigate = useNavigate();

      const handleCopyId = (id) => {
        navigator.clipboard.writeText(id);
        toast.success("ID copied to clipboard", {
          icon: <MessagesSquare className="h-4 w-4 font-bold text-slate-600" />,
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-2">
            <DropdownMenuLabel className="text-[10px] uppercase text-slate-400 font-bold px-2 py-1.5">
              Subscription Options
            </DropdownMenuLabel>

            <DropdownMenuItem
              className="gap-3 cursor-pointer py-2"
              onClick={() =>
                navigate(`./view-subscription/${subscription?.user?.userId}`, {
                  state: { subscriptionData: subscription },
                })
              }
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>View Details</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="gap-2 cursor-pointer py-2"
              onClick={() => handleCopyId(subscription._id)}
            >
              <Copy className="h-4 w-4 text-slate-500" />
              <span>Copy Sub ID</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* <DropdownMenuItem
              className="gap-2 cursor-pointer py-2 text-brand-aqua"
              onClick={() =>
                window.open(`https://appstoreconnect.apple.com/`, "_blank")
              }
            >
              <ExternalLink className="h-4 w-4" />
              <span>Platform Logs</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
