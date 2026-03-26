import {
  MoreHorizontal,
  ArrowUpDown,
  Eye,
  Trash2,
  ToggleLeft,
  ToggleRight,
  MapPin,
  Phone,
  Mail,
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
import { useNavigate } from "react-router";
import dummyImg from "@/assets/web/dummyImg.webp";

/**
 * IMPORTANT: The correct ID to use for toggle/delete is `user.profile.id`
 * This is the userId from the User model, per backend integration guide.
 */
export const fakeProfileColumns = (handleToggleStatus, handleDelete) => [
  // S.No
  {
    id: "sno",
    header: () => <div className="w-8 text-center text-xs">S.no</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;
      return (
        <div className="w-8 text-center font-medium text-xs">
          {serialNumber}
        </div>
      );
    },
    enableSorting: false,
  },
  // User (Avatar + Nickname)
  {
    id: "user",
    accessorFn: (row) => row.user?.profile?.nickname,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-xs -ml-3 h-8"
      >
        User
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const profile = row.original.user?.profile;
      const photos = row.original.user?.photos;
      const nickname = profile?.nickname || "Unknown";
      const avatar = photos?.[0]?.url || dummyImg;

      return (
        <div className="flex items-center gap-2.5 w-full">
          <Avatar className="h-8 w-8 border border-brand-aqua/20 shrink-0">
            <AvatarImage src={avatar} alt={nickname} />
            <AvatarFallback className="bg-brand-aqua/10 text-brand-aqua text-xs font-bold">
              {nickname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-[11px] truncate max-w-[120px]">
            {nickname}
          </span>
        </div>
      );
    },
  },
  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.user?.account?.phone || "-";
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-700">
          <Phone className="h-3 w-3 text-brand-aqua/80 shrink-0" />
          <span>{phone}</span>
        </div>
      );
    },
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.user?.account?.email || "-";
      return (
        <div className="flex items-center gap-1.5" title={email}>
          <Mail className="h-3 w-3 text-brand-aqua/80 shrink-0" />
          <span className="text-[10px] lowercase text-slate-500 max-w-[120px] truncate block">
            {email}
          </span>
        </div>
      );
    },
  },
  // Gender
  {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.user?.profile?.gender || "-";
      return <span className="text-xs capitalize">{gender}</span>;
    },
  },
  // Age
  {
    id: "age",
    header: "Age",
    cell: ({ row }) => {
      const age = row.original.user?.profile?.age || "-";
      return <span className="text-xs">{age}</span>;
    },
  },
  // City
  {
    id: "city",
    header: "City",
    cell: ({ row }) => {
      const city = row.original.user?.location?.city || "-";
      return (
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <MapPin className="h-3 w-3 text-brand-aqua/60" />
          {city}
        </div>
      );
    },
  },
  // Status
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.user?.account?.status || "deactivated";
      return (
        <Badge
          variant={status === "active" ? "default" : "destructive"}
          className="capitalize px-2 py-0.5 text-[10px]"
        >
          {status}
        </Badge>
      );
    },
  },
  // Actions
  {
    id: "actions",
    header: () => <span className="text-xs">Actions</span>,
    cell: ({ row }) => {
      // The correct ID per backend: user.profile.id
      const navigate = useNavigate();
      const profileId = row.original.user?.profile?.id;
      const status = row.original.user?.account?.status;
      const userId = profileId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 w-7 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() =>
                navigate(`../users-management/view-profile`, {
                  state: { userId },
                })
              }
              className="flex items-center gap-2 text-xs"
            >
              <Eye className="h-3.5 w-3.5" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleToggleStatus(profileId)}
              className="flex items-center gap-2 text-xs"
            >
              {status === "active" ? (
                <>
                  <ToggleRight className="h-3.5 w-3.5 text-emerald-500" />
                  Deactivate
                </>
              ) : (
                <>
                  <ToggleLeft className="h-3.5 w-3.5 text-slate-400" />
                  Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(profileId)}
              className="flex items-center gap-2 text-xs text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
