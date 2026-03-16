import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  FileText,
  Camera,
  MoreHorizontal,
  CheckCircle2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dummyImg from "@/assets/images/dummyImg.jpg";
import { useNavigate } from "react-router";
import { IconCalendar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const getKYCColumns = (onAction, onPreview) => [
  {
    id: "sno",
    header: "S.no",
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
            <span className="font-bold text-gray-900 text-xs truncate">
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
        <Badge
          onClick={copyToClipboard}
          className="cursor-pointer bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 transition-all"
        >
          <Phone className="w-3 h-3 mr-1" />
          {phone}
        </Badge>
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

      return (
        <Badge className="lowercase font-normal bg-gray-100 text-gray-700 border border-gray-200 transition-all duration-200 hover:bg-gray-200 hover:scale-105">
          <Mail className="w-3 h-3 mr-1.5 text-slate-500" />
          {email}
        </Badge>
      );
    },
  },
  {
    accessorKey: "verification.status",
    header: "Status",
    cell: ({ row }) => {
      //   const status = (
      //     row.original.verification?.status || "pending"
      //   ).toLowerCase();

      const status = (
        row.original.verification?.status ||
        row.original.kycStatus ||
        "pending"
      ).toLowerCase();

      // Mapping styles to status
      const variants = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
      };

      return (
        <Badge
          className={`
          capitalize font-medium transition-all duration-200 hover:scale-105
          ${variants[status] || variants.pending}
        `}
        >
          {/* Dynamic Icon Rendering */}
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
    header: "Joined At",
    cell: ({ row }) => {
      const dateValue =
        row.original.verification?.submittedAt || row.original.createdAt;

      return (
        <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
          <IconCalendar className="h-4 w-4 text-slate-400" />
          <span className="text-sm">
            {new Date(dateValue).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
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
          className="gap-2 border-brand-aqua/50 text-brand-aqua hover:bg-brand-aqua/10 transition-all active:scale-95"
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
          <FileText className="w-4 h-4" />
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
  // {
  //   id: "actions",
  //   header: () => <div className="w-max text-center mr-4 text-xs">Actions</div>,
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     const userId = user?.userId;
  //     const navigate = useNavigate();
  //     console.log("user: ", user);

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4 text-slate-600" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end" className="w-48 p-2 shadow-lg">
  //           <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
  //             KYC Actions
  //           </DropdownMenuLabel>

  //           {/* 1. VIEW DETAILS */}
  //           <DropdownMenuItem
  //             className="cursor-pointer gap-2 py-1.5"
  //             onClick={() =>
  //               navigate(`../users-management/view-profile`, {
  //                 state: { userId },
  //               })
  //             }
  //           >
  //             <Eye className="h-4 w-4 text-slate-600" />
  //             <span>View Profile </span>
  //           </DropdownMenuItem>

  //           {/* 2. APPROVE */}
  //           <DropdownMenuItem
  //             className="cursor-pointer gap-2 py-1.5 text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50"
  //             onClick={() => onAction(user.userId, "approve", user.nickname)}
  //           >
  //             <CheckCircle2 className="h-4 w-4" />
  //             <span className="font-medium">Approve KYC</span>
  //           </DropdownMenuItem>

  //           {/* 3. REJECT */}
  //           <DropdownMenuItem
  //             className="cursor-pointer gap-2 py-1.5 text-red-600 focus:text-red-700 focus:bg-red-50"
  //             onClick={() =>
  //               onAction(user.userId, "reject", "Document unclear")
  //             }
  //             // onClick={() => onAction(user.userId, "reject", user.nickname)}
  //           >
  //             <XCircle className="h-4 w-4" />
  //             <span className="font-medium">Reject KYC</span>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },

  {
    id: "actions",
    header: () => <div className="w-max text-center mr-4 text-xs">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      const userId = user?.userId;
      // Status check
      const currentStatus = user?.verification?.status;
      const isProcessed =
        currentStatus === "approved" || currentStatus === "rejected";

      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 p-2 shadow-lg">
            <DropdownMenuLabel className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              KYC Actions
            </DropdownMenuLabel>

            {/* 1. VIEW DETAILS - Hamesha active rahega */}
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onClick={() =>
                navigate(`../users-management/view-profile`, {
                  state: { userId },
                })
              }
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span className="text-xs">View Profile</span>
            </DropdownMenuItem>

            {/* 2. APPROVE - Disable agar process ho chuka hai ya already approved hai */}
            <DropdownMenuItem
              className={cn(
                "cursor-pointer gap-2 disabled:cursor-not-allowed text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50",
                isProcessed &&
                  "opacity-50 cursor-not-allowed pointer-events-none",
              )}
              disabled={isProcessed}
              onClick={() =>
                !isProcessed && onAction(user.userId, "approve", user.nickname)
              }
            >
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-semibold text-xs">
                {currentStatus === "approved"
                  ? "Already Approved"
                  : "Approve KYC"}
              </span>
            </DropdownMenuItem>

            {/* 3. REJECT - Disable agar process ho chuka hai */}
            <DropdownMenuItem
              className={cn(
                "cursor-pointer gap-2 text-red-600 focus:text-red-700 focus:bg-red-50",
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
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
