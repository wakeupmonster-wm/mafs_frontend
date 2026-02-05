import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { IconStarFilled } from "@tabler/icons-react";
import { IconStarFilled } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";

// Helper for Completion Colors
const getCompletionColor = (val) => {
  if (val < 50) return "bg-red-500";
  if (val <= 80) return "bg-yellow-500";
  return "bg-green-500";
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
  // {
  //   id: "nickname",
  //   accessorFn: (row) =>
  //     `${row.profile?.nickname} ${row.account?.email} ${row.account?.phone}`,
  //   // header: "User",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       size="md"
  //       className="w-44 mx-auto"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       User
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     const displayName =
  //       user.profile?.nickname || user.account?.phone || "Unknown User";
  //     const email = user.account?.email || "No email provided";
  //     const avatar = user.profile?.avatar || "";
  //     return (
  //       <div className="w-56 flex items-center gap-3">
  //         <Avatar className="h-9 w-9">
  //           <AvatarImage src={avatar} />
  //           <AvatarFallback>
  //             {displayName?.charAt(0).toUpperCase()}
  //           </AvatarFallback>
  //         </Avatar>
  //         <div className="flex flex-col">
  //           <span className="font-bold text-sm leading-none mb-0.5">
  //             {displayName}
  //           </span>
  //           <span className="flex items-center gap-1 mt-0.5 text-muted-foreground text-xs">
  //             <Mail className="w-3 h-3" />
  //             {email}
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  // S/No Column
  {
    id: "sno",
    header: () => <div className="w-10 text-center">S.no</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;

      return <div className="w-10 text-center font-medium">{serialNumber}</div>;
    },
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
  // {
  //   id: "nickname",
  //   accessorFn: (row) =>
  //     `${row.profile?.nickname} ${row.account?.email} ${row.account?.phone}`,
  //   // header: "User",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       size="md"
  //       className="w-44 mx-auto"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       User
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     const displayName =
  //       user.profile?.nickname || user.account?.phone || "Unknown User";
  //     const email = user.account?.email || "No email provided";
  //     const avatar = user.profile?.avatar || "";
  //     return (
  //       <div className="w-56 flex items-center gap-3">
  //         <Avatar className="h-9 w-9">
  //           <AvatarImage src={avatar} />
  //           <AvatarFallback>
  //             {displayName?.charAt(0).toUpperCase()}
  //           </AvatarFallback>
  //         </Avatar>
  //         <div className="flex flex-col">
  //           <span className="font-bold text-sm leading-none mb-0.5">
  //             {displayName}
  //           </span>
  //           <span className="flex items-center gap-1 mt-0.5 text-muted-foreground text-xs">
  //             <Mail className="w-3 h-3" />
  //             {email}
  //           </span>
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  // S/No Column
  {
    id: "sno",
    header: () => <div className="w-10 text-center">S.no</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;

      return <div className="w-10 text-center font-medium">{serialNumber}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  // USER Column
  // USER Column
  {
    id: "user",
    accessorFn: (row) => row.profile?.nickname,
    id: "user",
    accessorFn: (row) => row.profile?.nickname,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      const nickname = user.profile?.nickname || "unknown";
      // Added safety check for the photos array
      const avatar = user?.photos?.[0]?.url || "";
      console.log("avatar: ", avatar);

      const nickname = user.profile?.nickname || "unknown";
      // Added safety check for the photos array
      const avatar = user?.photos?.[0]?.url || "";
      console.log("avatar: ", avatar);

      return (
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-bold text-[11px] truncate">{nickname}</span>
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
        {row.original.account?.email || "N/A"}
      </div>
    ),
  },
  // {
  //   id: "auth",
  //   header: "Auth",
  //   cell: ({ row }) => {
  //     const method = row.original.account?.authMethod;

  //     const iconMap = {
  //       email: { icon: <IconMail size={18} />, label: "Email" },
  //       phone: { icon: <IconDeviceMobile size={18} />, label: "Phone" },
  //       google: {
  //         icon: <IconBrandGoogle size={18} className="text-blue-500" />,
  //         label: "Google",
  //       },
  //       apple: { icon: <IconBrandApple size={18} />, label: "Apple" },
  //     };

  //     // Find the icon or use a fallback
  //     const config = iconMap[method] || {
  //       icon: <IconQuestionMark size={18} className="text-muted-foreground" />,
  //       label: method || "Unknown",
  //     };

  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <div className="flex w-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
  //               {config.icon}
  //             </div>
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p className="capitalize">{config.label} Auth</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     );
  //   },
  // },
  // {
  //   id: "role",
  //   accessorKey: "role",
  //   header: "Role",
  //   cell: ({ row }) => <Badge variant="secondary">{row.original.role}</Badge>,
  // },
  // Age Column
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
        {row.original.account?.email || "N/A"}
      </div>
    ),
  },
  // {
  //   id: "auth",
  //   header: "Auth",
  //   cell: ({ row }) => {
  //     const method = row.original.account?.authMethod;

  //     const iconMap = {
  //       email: { icon: <IconMail size={18} />, label: "Email" },
  //       phone: { icon: <IconDeviceMobile size={18} />, label: "Phone" },
  //       google: {
  //         icon: <IconBrandGoogle size={18} className="text-blue-500" />,
  //         label: "Google",
  //       },
  //       apple: { icon: <IconBrandApple size={18} />, label: "Apple" },
  //     };

  //     // Find the icon or use a fallback
  //     const config = iconMap[method] || {
  //       icon: <IconQuestionMark size={18} className="text-muted-foreground" />,
  //       label: method || "Unknown",
  //     };

  //     return (
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <div className="flex w-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
  //               {config.icon}
  //             </div>
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p className="capitalize">{config.label} Auth</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>
  //     );
  //   },
  // },
  // {
  //   id: "role",
  //   accessorKey: "role",
  //   header: "Role",
  //   cell: ({ row }) => <Badge variant="secondary">{row.original.role}</Badge>,
  // },
  // Age Column
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => (
      <span className="text-xs">{row.original.profile?.age || "N/A"}</span>
      <span className="text-xs">{row.original.profile?.age || "N/A"}</span>
    ),
  },
  // Gender Column
  // Gender Column
  {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="text-xs">{row.original.profile.gender || "N/A"}</span>
      <span className="text-xs">{row.original.profile.gender || "N/A"}</span>
    ),
  },
  // Completion Column
  // Completion Column
  {
    id: "completion",
    header: "Completion",
    cell: ({ row }) => (
      <div className="w-[100px] flex flex-col gap-1">
        <span className="text-[11px] font-base">
        <span className="text-[11px] font-base">
          {row.original.profile.totalCompletion}%
        </span>
        <Progress
          value={row.original.profile.totalCompletion}
          className={`h-1.5 ${getCompletionColor(
            row.original.profile.totalCompletion
          )}`}
        />
      </div>
    ),
  },
  // Status Column
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
            className="capitalize px-1.5"
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  // Plan Column
  // Plan Column
  {
    id: "premium",
    accessorKey: "account.isPremium",
    header: "Plan",
    cell: ({ row }) => {
      const isPremium = row.original.account?.isPremium;

      return isPremium ? (
        <Badge variant="premium" className="gap-1 px-1.5 text-[11px]">
        <Badge variant="premium" className="gap-1 px-1.5 text-[11px]">
          <IconStarFilled size={10} /> PRO
        </Badge>
      ) : (
        <Badge variant="outline">Free</Badge>
      );
    },
  },
  // Verificaton Column
  // Verificaton Column
  {
    id: "verification", // Manually set ID
    accessorKey: "verification.status",
    header: "Verification",
    cell: ({ row }) => {
      const status = row.original.verification?.status || "not_started";
      const variants = {
        approved: "bg-green-100 text-green-700 hover:bg-green-100",
        rejected: "bg-red-100 text-red-700 hover:bg-red-100",
        not_started: "bg-gray-100 text-gray-700 hover:bg-gray-100",
      };

      return (
        <Badge
          variant="outline"
          className={`capitalize border-none ${variants[status]} px-2 text-[10px]`}
          className={`capitalize border-none ${variants[status]} px-2 text-[10px]`}
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  // Location Column
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
          <span className="text-muted-foreground italic px-1.5 text-[11px]">
            Not set
          </span>
        );
      return (
        <span className="capitalize px-1.5 text-[11px]">{`${city || ""}${
        <span className="capitalize px-1.5 text-[11px]">{`${city || ""}${
          city && country ? ", " : ""
        }${country || ""}`}</span>
      );
    },
  },
  // Joined Column
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
      return <div className="text-[10px]">{date.toLocaleDateString()}</div>;
    },
  },
  // Actions Column
  // Actions Column
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate();
      // Access the ban handler from table meta
      // eslint-disable-next-line no-unused-vars
      const onBan = table.options.meta?.onBan;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() =>
                navigate(`./view-profile`, {
                  state: { userData: user },
                })
              }
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`./edit-profile`, {
                  state: { userData: user },
                })
              }
            >
              Edit Details
            </DropdownMenuItem>
            {/* <DropdownMenuItem
            {/* <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                onBan(user); // Call the function passed via meta
              }}
            >
              Ban Account
            </DropdownMenuItem> */}
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];