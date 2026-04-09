import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dummyImg from "@/assets/web/dummyImg.webp";
import { useNavigate } from "react-router";
import { IconCalendar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

export const getKYCColumns = (onAction, onPreview) => [
  {
    id: "sno",
    header: () => <div className="w-10 text-center text-xs">Sr.No.</div>,
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      const serialNumber = pageIndex * pageSize + row.index + 1;

      return <div className="text-center font-medium">{serialNumber}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row, table }) => {
      const avatar = row.original?.user?.avatar;
      const nickname = row.original?.user?.nickname || "-";

      // Access the modal function passed from the main component
      const { setImageModal } = table.options.meta || {};

      return (
        <div className="flex items-center gap-2">
          {/* Avatar with Click-to-Zoom logic */}
          <div className="h-9 w-9 rounded-full bg-gray-100 overflow-hidden border flex-shrink-0">
            <Avatar className="w-full h-full border border-slate-100 shadow-lg transition-transform group-hover:scale-[1.02]">
              <AvatarImage
                src={avatar || dummyImg}
                className="object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={() =>
                  setImageModal?.({
                    open: true,
                    src: avatar || dummyImg,
                    title: `${nickname || "User"} Profile Photo`,
                  })
                }
              />
              <AvatarFallback className="text-4xl bg-slate-50 text-slate-400 font-bold">
                {nickname?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Text Labels */}
          <div className="flex flex-col min-w-0">
            <span className="capitalize font-bold text-gray-900 text-xs truncate">
              {nickname}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.phone",
    header: "Phone Number",
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
    header: () => (
      <div className="w-max text-center text-xs">Email Address</div>
    ),
    cell: ({ row }) => {
      const email = row.original.user?.email;

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
        >
          <Mail className="w-3 h-3 mr-1.5 text-slate-500" />
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "verification.status",
    header: "Status",
    cell: ({ row }) => {
      // console.log("row.original.verification: ", row.original.verification);
      const status = (
        row.original.verification?.status ||
        row.original.kycStatus ||
        "pending"
      ).toLowerCase();

      // 🚀 Check: Agar status 'not_started' hai toh kuch bhi render mat karo
      if (status === "not_started") return null;

      // Mapping styles to status
      const variants = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
      };

      // Agar status in teeno mein se nahi hai (safety check)
      if (!variants[status]) return null;

      return (
        <Badge
          className={`
          uppercase cursor-pointer font-semibold transition-all duration-200 py-1 rounded-xl
          ${variants[status]}
        `}
        >
          {status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
          {status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
          {status === "pending" && (
            <Clock className="w-3 h-3 mr-1 animate-pulse" />
          )}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        Submitted At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const dateValue =
        row.original.verification?.submittedAt || row.original.createdAt;

      return (
        <div className="flex items-center justify-center gap-2 text-gray-600 font-medium whitespace-nowrap">
          <IconCalendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs">
            {format(new Date(dateValue), "dd MMM, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    id: "documents",
    header: "Documents",
    cell: ({ row }) => {
      const { verification } = row.original;
      const hasDocs = verification?.docUrl || verification?.selfieUrl;

      return (
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border text-slate-500 hover:text-white font-normal hover:font-medium hover:bg-brand-aqua transition-all active:scale-95"
          disabled={!hasDocs}
          onClick={() =>
            onPreview({
              open: true,
              // Send both as an array or specific keys
              images: [
                { src: verification?.docUrl, label: "ID Document" },
                { src: verification?.selfieUrl, label: "User Selfie" },
              ].filter((img) => img.src), // Only send existing ones
              title: `${row.original.user?.nickname || "User"}'s Documents`,
              multi: true, // Flag to tell the modal it's a multi-view
            })
          }
        >
          <FileText className="w-4 h-4" strokeWidth={1.5} />
          View Docs
        </Button>
      );

      // return (
      //   <div className="flex gap-2">
      //     {/* ID Document Button */}
      //     <Button
      //       size="icon"
      //       variant="outline"
      //       className="h-8 w-8 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 hover:scale-110"
      //       disabled={!verification?.docUrl}
      //       onClick={() =>
      //         onPreview({
      //           open: true,
      //           src: verification?.docUrl,
      //           title: "ID Document",
      //         })
      //       }
      //     >
      //       <FileText className="w-4 h-4 text-gray-600" />
      //     </Button>

      //     {/* Selfie Button */}
      //     <Button
      //       size="icon"
      //       variant="outline"
      //       className="h-8 w-8 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 hover:scale-110"
      //       disabled={!verification?.selfieUrl}
      //       onClick={() =>
      //         onPreview({
      //           open: true,
      //           src: verification?.selfieUrl,
      //           title: "User Selfie",
      //         })
      //       }
      //     >
      //       <Camera className="w-4 h-4 text-gray-600" />
      //     </Button>
      //   </div>
      // );
    },
  },
  {
    id: "actions",
    header: () => <div className="w-max text-center mr-4 text-xs">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      const userId = user?.userId;

      const currentStatus = user?.verification?.status;

      // Status check
      const isProcessed =
        currentStatus === "approved" || currentStatus === "rejected";

      const navigate = useNavigate();

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
              <DropdownMenuLabel className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                KYC Actions
              </DropdownMenuLabel>

              {/* 1. VIEW DETAILS - Hamesha active rahega */}
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

              {/* 2. APPROVE - Disable agar process ho chuka hai ya already approved hai */}
              {/* <DropdownMenuItem
                className={cn(
                  "cursor-pointer rounded-lg gap-2 disabled:cursor-not-allowed text-emerald-800 focus:text-emerald-600 focus:bg-emerald-50",
                  isProcessed &&
                    "opacity-50 cursor-not-allowed pointer-events-none",
                )}
                disabled={isProcessed}
                onClick={() =>
                  !isProcessed &&
                  onAction(user.userId, "approve", user.nickname)
                }
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-semibold text-xs">
                  {currentStatus === "approved"
                    ? "Already Approved"
                    : "Approve KYC"}
                </span>
              </DropdownMenuItem> */}

              {/* 2. APPROVE - Hidden if processed */}
              {!isProcessed && (
                <DropdownMenuItem
                  className="cursor-pointer rounded-lg gap-2 text-emerald-800 focus:text-emerald-600 focus:bg-emerald-50"
                  onClick={() =>
                    onAction(user.userId, "approve", user.nickname)
                  }
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-semibold text-xs">Approve KYC</span>
                </DropdownMenuItem>
              )}

              {/* 3. REJECT - Disable agar process ho chuka hai */}
              {/* <DropdownMenuItem
                className={cn(
                  "cursor-pointer rounded-lg gap-2 text-red-800 focus:text-red-600 focus:bg-red-50",
                  isProcessed &&
                    "opacity-50 cursor-not-allowed pointer-events-none",
                )}
                disabled={isProcessed}
                onClick={() =>
                  !isProcessed &&
                  onAction(user.userId, "reject", "Document unclear")
                }
              >
                <XCircle className="h-4 w-4" />
                <span className="font-semibold text-xs">
                  {currentStatus === "rejected"
                    ? "Already Rejected"
                    : "Reject KYC"}
                </span>
              </DropdownMenuItem> */}

              {/* 3. REJECT - Hidden if processed */}
              {!isProcessed && (
                <DropdownMenuItem
                  className="cursor-pointer rounded-lg gap-2 text-red-800 focus:text-red-600 focus:bg-red-50"
                  onClick={() =>
                    onAction(user.userId, "reject", "Document unclear")
                  }
                >
                  <XCircle className="h-4 w-4" />
                  <span className="font-semibold text-xs">Reject KYC</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
