import { ArrowUpDown, Mail, MoreHorizontal, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { IconStarFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import dummyImg from "@/assets/images/dummyImg.jpg";

// Helper for Completion Colors
const getCompletionColor = (val) => {
  if (val < 50) return "bg-slate-400/40";
  if (val <= 80) return "bg-slate-400/40";
  return "bg-slate-400/40";
};

export const userColumns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // S/No Column
  {
    id: "sno",
    header: () => <div className="w-10 text-center text-xs">S.no</div>,
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
      const avatar = user?.photos?.[0]?.url || dummyImg;

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
  // Phone Column
  {
    accessorKey: "account.phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 w-full text-[11px] text-foreground">
        <Phone className="w-3.5 h-3.5" />
        {row.original.account?.phone || "—"}
      </div>
    ),
  },
  // Email Columnn
  {
    accessorKey: "account.email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-foreground text-[11px]">
        <Mail className="w-3.5 h-3.5" />
        {row.original.account?.email || "-"}
      </div>
    ),
  },
  // Age Column
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => (
      <span className="text-xs">{row.original.profile?.age || "-"}</span>
    ),
  },
  // Gender Column
  {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="text-xs">{row.original.profile.gender || "-"}</span>
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
        <div className="flex gap-1 italic">
          <Badge
            variant={status === "active" ? "default" : "destructive"}
            className="capitalize px-1.5"
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
    id: "createdAt", // Manually set ID
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Joined
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-[10px]">{date.toLocaleDateString()}</div>;
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-xs font-medium text-primary"
              onClick={() =>
                navigate(`./view-profile`, {
                  state: { userId },
                })
              }
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium text-destructive"
              onClick={() => {
                onBan(user); // Call the function passed via meta
              }}
            >
              Ban Account
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs font-medium text-orange-600"
              onClick={() => {
                onSuspend(user); // Call the function passed via meta
              }}
            >
              Suspend Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
