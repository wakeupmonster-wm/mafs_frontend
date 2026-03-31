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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
import dummyImg from "@/assets/web/dummyImg.webp";
import { toast } from "sonner";

export const fakeProfileColumns = (handleToggleStatus, handleDelete) => [
  // Sr.No.
  {
    id: "sno",
    header: () => <div className="w-10 text-center text-xs">Sr.No.</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;
      return (
        <div className="w-10 text-center font-medium text-xs">
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
          <span className="capitalize font-semibold text-[11px] truncate max-w-[120px]">
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
      const copyToClipboard = () => {
        navigator.clipboard.writeText(phone);
        toast.success("Phone number copied!");
      };
      return (
        <div
          onClick={copyToClipboard}
          className="flex items-center cursor-pointer gap-2 w-full text-[11px] text-foreground"
          title={phone}
        >
          <Phone className="h-3 w-3 text-brand-aqua/80 shrink-0" />
          {phone}
        </div>
      );
    },
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.user?.account?.email || "-";
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
          <Mail className="h-3 w-3 text-brand-aqua/80 shrink-0" />
          <span className="text-xs lowercase text-slate-500 max-w-[120px] truncate block">
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
    accessorKey: "account.status",
    header: "Status",
    // Custom filter function to make sure it catches the exact text
    filterFn: "includesString",
    cell: ({ row }) => {
      const status = row.original.user?.account?.status || "deactivated";
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
        <div className="text-start">
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
                  navigate(`../users-management/view-profile`, {
                    state: { userId },
                  })
                }
              >
                <Eye className="w-4 h-4" />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleToggleStatus(profileId)}
                className="flex items-center gap-2 text-xs font-semibold"
              >
                {status === "active" ? (
                  <span className="w-full flex items-center gap-2 font-semibold rounded-xl text-red-800 cursor-pointer focus:bg-red-500/10 focus:text-red-500">
                    <ToggleRight className="h-3.5 w-3.5" />
                    Deactivate
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-semibold rounded-xl text-emerald-800 cursor-pointer focus:bg-emerald-500/10 focus:text-emerald-500">
                    <ToggleLeft className="h-3.5 w-3.5" />
                    Activate
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(profileId)}
                className="flex items-center gap-2 cursor-pointer font-semibold rounded-xl text-xs text-red-600 focus:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Permanently
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
