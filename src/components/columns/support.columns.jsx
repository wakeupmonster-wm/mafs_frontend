import {
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Phone,
  Mail,
  ArrowUpDown,
  MessageSquare,
  Trash,
  EyeIcon,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"; // Assuming shadcn/ui
import { Button } from "@/components/ui/button";
import dummyImg from "@/assets/web/dummyImg.webp";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const supportColumns = (onAction, onPreview) => [
  {
    id: "sno",
    header: () => <div className="w-10 text-center text-xs">Sr.No.</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return (
        <div className="w-6 text-center font-medium">
          {pageIndex * pageSize + row.index + 1}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: "Ticket Details",
    cell: ({ row, table }) => {
      const user = row.original.user;
      const avatar = user?.avatar || dummyImg;
      const nickname = user?.nickname || "-";

      // Access the modal function passed from the main component
      const { setImageModal } = table.options.meta || {};

      return (
        <div className="flex items-center gap-2">
          {/* Avatar with Click-to-Zoom logic */}
          <div className="h-9 w-9 rounded-full bg-gray-100 overflow-hidden border flex-shrink-0">
            <img
              src={avatar} // Fallback image path
              alt="User Avatar"
              className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() =>
                setImageModal?.({
                  open: true,
                  src: avatar,
                  title: `${nickname} Selfie`,
                })
              }
            />
          </div>

          {/* Text Labels */}
          <div className="flex flex-col min-w-0">
            <span className="capitalize font-bold text-gray-900 text-xs truncate">
              {nickname}
            </span>
            {/* <span className="text-[10px] text-muted-foreground italic truncate">
              ID: {ticketId}
            </span> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.phone",
    header: "Contact",
    cell: ({ row }) => {
      const phone = row.original.user?.phone;

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
          <Phone className="w-3 h-3 mr-1" />
          {phone}
        </div>
      );
    },
  },
  {
    accessorKey: "user.email",
    // header: "Email Address",
    header: () => (
      <div className="w-max text-center text-xs">Email Address</div>
    ),
    cell: ({ row }) => {
      const email = row.original.user?.email;

      if (!email)
        return <span className="text-slate-400 text-xs italic">-</span>;

      const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        toast.success("Email address copied!");
      };

      return (
        <div
          onClick={copyToClipboard}
          className="flex items-center cursor-pointer gap-2 w-full text-[11px] text-foreground"
        >
          <Mail className="w-3 h-3 mr-1.5 text-slate-500" />
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex flex-col max-w-[250px]">
        <span
          className="font-medium text-[12px] text-gray-900 truncate"
          title={row.getValue("subject")}
        >
          {row.getValue("subject")}
        </span>
        {/* Optional: if you have a short snippet or description, you can add it here */}
      </div>
    ),
  },
  {
    id: "category",
    // accessorFn is great for complex data, but accessorKey: "category" works too
    accessorFn: (row) => row.category,
    header: ({ column }) => (
      <button
        className="flex items-center hover:text-gray-900 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
      </button>
    ),
    cell: ({ row }) => {
      const category = row.getValue("category"); // Corrected from "column"

      return (
        <div className="flex flex-col max-w-[200px]">
          <Badge
            variant="outline"
            className="w-fit font-medium text-[11px] py-0 px-2 bg-slate-50 text-slate-600 border-slate-200 capitalize"
          >
            {category || "Uncategorized"}
          </Badge>
          {/* If you have a sub-category or note, it looks good here */}
          {row.original.subCategory && (
            <span className="text-[9px] text-muted-foreground mt-1">
              {row.original.subCategory}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // Standardize the status string
      const status = (row.original?.status || "open").toLowerCase();

      // Mapping styles to your specific ticket statuses
      const variants = {
        open: "bg-blue-100 text-blue-700 border-blue-200",
        in_progress: "bg-amber-100 text-amber-700 border-amber-200",
        resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        closed: "bg-slate-100 text-slate-700 border-slate-200",
      };

      return (
        <Badge
          variant="outline"
          //   className={`
          //   capitalize font-medium transition-all duration-200 hover:scale-105
          //   ${variants[status] || "bg-gray-100 text-gray-700 border-gray-200"}
          // `}
          className={`
          capitalize font-medium transition-all duration-200 hover:scale-105 bg-gray-100 text-gray-700 border-gray-200
        `}
        >
          {/* Dynamic Icon Rendering based on Ticket Status */}
          {status === "open" && (
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" />
          )}
          {status === "in_progress" && (
            <Clock
              className="w-3 h-3 mr-1 animate-spin-slow"
              style={{ animationDuration: "3s" }}
            />
          )}
          {status === "resolved" && <CheckCircle className="w-3 h-3 mr-1" />}
          {status === "closed" && <XCircle className="w-3 h-3 mr-1" />}

          {/* Replaces underscores with spaces for "in progress" */}
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="flex items-center hover:text-gray-900"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return (
        <div className="flex flex-col">
          {/* "2 hours ago" or "3 days ago" */}
          <span className="text-xs font-medium text-gray-900">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
          {/* Full date underneath in a smaller, muted font */}
          <span className="text-[10px] text-muted-foreground">
            {format(date, "MMM dd, yyyy p")} {/* e.g., Feb 09, 2026 12:15 PM */}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="w-max text-center mr-4 text-xs">Actions</div>,
    cell: ({ row, table }) => {
      const navigate = useNavigate();
      const ticket = row.original;
      const { setSelectedTicket, setConfirmConfig } = table.options?.meta || {};

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
              className="w-40 p-2 rounded-2xl border-slate-300 shadow-xl"
            >
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">
                Actions
              </DropdownMenuLabel>

              <DropdownMenuItem
                className="gap-2 cursor-pointer rounded-xl py-2 focus:bg-brand-aqua/10 focus:text-brand-aqua text-slate-500 font-semibold text-xs"
                onClick={() =>
                  navigate(`./view-ticket/${ticket._id}`, {
                    state: { ticketData: ticket },
                  })
                }
              >
                <Eye className="w-4 h-4" />
                View Ticket
              </DropdownMenuItem>

              {/* Update Status Action */}
              <DropdownMenuItem
                className="cursor-pointer rounded-xl gap-2 py-2 text-xs font-medium hover:font-semibold text-emerald-800 transition-colors focus:bg-emerald-50 focus:text-emerald-500 data-[highlighted]:bg-emerald-50"
                onClick={() => setSelectedTicket?.(ticket)}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Update Status
              </DropdownMenuItem>

              {/* Delete Action */}
              <DropdownMenuItem
                className="cursor-pointer rounded-xl gap-2 py-2 text-xs font-medium hover:font-semibold text-red-800 transition-colors focus:bg-red-50 focus:text-red-500 data-[highlighted]:bg-red-50"
                onClick={() =>
                  setConfirmConfig?.({
                    isOpen: true,
                    ticketId: ticket._id,
                    nickname: ticket.user?.nickname || "this user",
                    action: "delete", // We add a 'delete' case here
                  })
                }
              >
                <Trash className="h-3.5 w-3.5" />
                Delete Ticket
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
