import { ArrowUpDown, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  IconBrandApple,
  IconBrandGoogle,
  IconDeviceMobile,
  IconMail,
  IconStarFilled,
} from "@tabler/icons-react";
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
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "nickname",
    accessorFn: (row) =>
      `${row.profile?.nickname} ${row.account?.email} ${row.account?.phone}`,
    // header: "User",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="md"
        className="w-44 mx-auto"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original;
      const displayName =
        user.profile?.nickname || user.account?.phone || "Unknown User";
      const email = user.account?.email || "No email provided";
      const avatar = user.profile?.avatar || "";
      return (
        <div className="w-56 flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {displayName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none mb-0.5">
              {displayName}
            </span>
            <span className="flex items-center gap-1 mt-0.5 text-muted-foreground text-xs">
              <Mail className="w-3 h-3" />
              {email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "auth",
    header: "Auth",
    cell: ({ row }) => {
      const method = row.original.account?.authMethod;

      const iconMap = {
        email: { icon: <IconMail size={18} />, label: "Email" },
        phone: { icon: <IconDeviceMobile size={18} />, label: "Phone" },
        google: {
          icon: <IconBrandGoogle size={18} className="text-blue-500" />,
          label: "Google",
        },
        apple: { icon: <IconBrandApple size={18} />, label: "Apple" },
      };

      // Find the icon or use a fallback
      const config = iconMap[method] || {
        icon: <IconQuestionMark size={18} className="text-muted-foreground" />,
        label: method || "Unknown",
      };

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex w-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {config.icon}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="capitalize">{config.label} Auth</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="secondary">{row.original.role}</Badge>,
  },
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.profile?.age || "N/A"}</span>
    ),
  },
  {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.profile.gender || "N/A"}</span>
    ),
  },
  {
    id: "completion",
    header: "Completion",
    cell: ({ row }) => (
      <div className="w-[100px] flex flex-col gap-1">
        <span className="text-[10px] font-medium">
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
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "premium",
    accessorKey: "account.isPremium",
    header: "Plan",
    cell: ({ row }) => {
      const isPremium = row.original.account?.isPremium;

      return isPremium ? (
        <Badge variant="premium" className="gap-1">
          <IconStarFilled size={10} /> PRO
        </Badge>
      ) : (
        <Badge variant="outline">Free</Badge>
      );
    },
  },
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
          className={`capitalize border-none ${variants[status]}`}
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    id: "city", // Manually set ID
    accessorKey: "location.city",
    header: "Location",
    cell: ({ row }) => {
      const city = row.original.location?.city;
      const country = row.original.location?.country;
      if (!city && !country)
        return (
          <span className="text-muted-foreground italic text-xs">Not set</span>
        );
      return (
        <span className="capitalize">{`${city || ""}${
          city && country ? ", " : ""
        }${country || ""}`}</span>
      );
    },
  },
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
      return <div className="text-xs">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={navigate("../view-profile")}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Ban Account
            </DropdownMenuItem> */}

            {/* OPTION A: Relative Path */}
            <DropdownMenuItem
              onClick={() =>
                navigate(`./view-profile`, {
                  state: { userData: user },
                })
              }
            >
              View Profile
            </DropdownMenuItem>

            {/* OPTION B: Absolute Path (Recommended) */}
            <DropdownMenuItem
              onClick={() =>
                navigate(`./edit-profile`, {
                  state: { userData: user },
                })
              }
            >
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Ban Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
