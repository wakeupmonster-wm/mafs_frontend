import {
  ArrowUpDown,
  Ban,
  CirclePause,
  Eye,
  Mail,
  MoreHorizontal,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { IconStarFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import dummyImg from "@/assets/web/dummyImg.webp";
import { toast } from "sonner";

// Helper for Completion Colors
const getCompletionColor = (val) => {
  if (val < 50) return "bg-slate-400/40";
  if (val <= 80) return "bg-slate-400/40";
  return "bg-slate-400/40";
};

export const userColumns = [
  // S/No Column
  {
    id: "sno",
    header: () => <div className="w-10 text-center text-xs">Sr.No.</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;

      return <div className="w-10 text-center font-medium">{serialNumber}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  // USER Column
  {
    id: "user",
    accessorFn: (row) => row.profile?.nickname,
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
      const user = row.original;
      const nickname = user.profile?.nickname || "unknown";
      // Added safety check for the photos array
      const avatar = user?.photos || dummyImg;

      return (
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="capitalize font-bold text-[11px] truncate">
            {nickname}
          </span>
        </div>
      );
    },
  },
  // Phone Column
  {
    accessorKey: "account.phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.account?.phone;
      if (!phone)
        return <span className="text-slate-400 text-xs italic">-</span>;

      const copyToClipboard = () => {
        navigator.clipboard.writeText(phone);
        toast.success("Phone number copied!");
      };
      return (
        <div
          onClick={copyToClipboard}
          className="flex items-center cursor-pointer gap-2 w-full text-[11px] text-foreground"
        >
          <Phone className="w-3 h-3 mr-1.5 text-brand-aqua/80 shrink-0" />
          {phone}
        </div>
      );
    },
  },
  // Email Columnn
  {
    accessorKey: "account.email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.account?.email;
      if (!email)
        return <span className="text-slate-400 text-xs italic">-</span>;
      const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        toast.success("Email copied!");
      };
      return (
        <div
          onClick={copyToClipboard}
          className="flex items-center cursor-pointer gap-2 w-full text-[11px] text-foreground"
          title={email}
        >
          <Mail className="w-3 h-3 mr-1.5 text-brand-aqua/80 shrink-0" />
          <span className="text-xs lowercase text-slate-500 max-w-[120px] truncate block">
            {email}
          </span>
        </div>
      );
    },
  },
  // Age Column
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => {
      const profile = row.original.profile;
      const dob = profile?.dob;

      // 1. Agar age field pehle se hai
      if (profile?.age) return <span className="text-xs">{profile.age}</span>;

      // 2. Agar DOB hai toh calculate karein
      // if (dob) {
      //   const birthYear = new Date(dob).getFullYear();
      //   const currentYear = new Date().getFullYear();
      //   const calculatedAge = currentYear - birthYear;

      //   // Check if result is a valid number
      //   if (!isNaN(calculatedAge)) {
      //     return <span className="text-xs">{calculatedAge}</span>;
      //   }
      // }

      // 3. Kuch bhi nahi toh default dash
      return <span className="text-xs">-</span>;
    },
  },
  // Gender Column
  {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="w-max text-xs">{row.original.profile.gender || "-"}</div>
    ),
  },
  // Completion Column
  {
    id: "completion",
    header: "Completion",
    cell: ({ row }) => (
      <div className="w-[100px] flex flex-col gap-1">
        <span className="text-[11px] font-base">
          {row.original.profile.totalCompletion}%
        </span>
        <Progress
          value={row.original.profile.totalCompletion}
          className={`h-1.5 bg-slate-300 shadow-inner border border-gray-200`}
        />
      </div>
    ),
  },
  // Status Column
  {
    id: "status",
    accessorKey: "account.status",
    header: "Status",
    // Custom filter function to make sure it catches the exact text
    filterFn: "includesString",
    cell: ({ row }) => {
      const status = row.original.account?.status;
      return (
        <div className="flex gap-1">
          <Badge
            variant={status === "active" ? "default" : "destructive"}
            className="uppercase px-1.5 bg-brand-aqua rounded-xl"
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  // Plan Column
  {
    id: "premium",
    accessorKey: "account.isPremium",
    header: "Plan",
    cell: ({ row }) => {
      const isPremium = row.original.account?.isPremium;

      return isPremium ? (
        <Badge variant="premium" className="gap-1 px-1.5 text-[11px]">
          <IconStarFilled size={10} /> PRO
        </Badge>
      ) : (
        <Badge variant="outline">Free</Badge>
      );
    },
  },
  // Location Column
  {
    id: "city", // Manually set ID
    accessorKey: "location.city",
    header: "Location",
    cell: ({ row }) => {
      const city = row.original.location?.city;
      const country = row.original.location?.country;
      if (!city && !country)
        return (
          <span className="text-muted-foreground italic px-1.5 text-[11px]">
            Not set
          </span>
        );
      return (
        <span className="w-max flex capitalize text-[11px]">{`${city || ""}${
          city && country ? ", " : ""
        }${country || ""}`}</span>
      );
    },
  },
  // Joined Column
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Joined At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-[10px]">
          {date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  // Actions Column
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const user = row.original;
      const userId = user._id;
      const navigate = useNavigate();
      const onBan = table.options.meta?.onBan;
      const onSuspend = table.options.meta?.onSuspend;

      return (
        <div className="text-center">
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
              className="w-44 p-2 rounded-2xl border-slate-300 shadow-xl"
            >
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="gap-2 cursor-pointer py-2 rounded-xl focus:bg-brand-aqua/10 focus:text-brand-aqua text-slate-500 font-semibold text-xs"
                onClick={() =>
                  navigate(`./view-profile`, {
                    state: { userId },
                  })
                }
              >
                <Eye className="w-4 h-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs cursor-pointer font-semibold rounded-xl text-red-800 focus:bg-red-500/10 focus:text-red-500"
                onClick={() => {
                  onBan(user); // Call the function passed via meta
                }}
              >
                <Ban className="w-3.5 h-3.5" />
                Ban Account
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs cursor-pointer font-semibold rounded-xl text-yellow-800 focus:bg-yellow-500/10 focus:text-yellow-500"
                onClick={() => {
                  onSuspend(user); // Call the function passed via meta
                }}
              >
                <CirclePause className="w-3.5 h-3.5" />
                Suspend Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
