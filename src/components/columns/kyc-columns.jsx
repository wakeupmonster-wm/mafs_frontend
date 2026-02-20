import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    accessorKey: "nickname",
    header: "User",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-slate-900">
          {row.original.nickname || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "user.phone",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.user?.phone;

      if (!phone)
        return (
          <span className="text-slate-400 text-xs italic">Not provided</span>
        );

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
    // header: "Email Address",
    header: () => (
      <div className="w-max text-center text-xs">Email Address</div>
    ),
    cell: ({ row }) => {
      const email = row.original.user?.email;

      if (!email)
        return <span className="text-slate-400 text-xs italic">No email</span>;

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
    header: "Submitted At",
    cell: ({ row }) => {
      const dateValue =
        row.original.verification?.submittedAt || row.original.createdAt;

      return (
        <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-sm">
            {new Date(dateValue).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
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

      return (
        <div className="flex gap-2">
          {/* ID Document Button */}
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 hover:scale-110"
            disabled={!verification?.docUrl}
            onClick={() =>
              onPreview({
                open: true,
                src: verification?.docUrl,
                title: "ID Document",
              })
            }
          >
            <FileText className="w-4 h-4 text-gray-600" />
          </Button>

          {/* Selfie Button */}
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 hover:scale-110"
            disabled={!verification?.selfieUrl}
            onClick={() =>
              onPreview({
                open: true,
                src: verification?.selfieUrl,
                title: "User Selfie",
              })
            }
          >
            <Camera className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="w-max text-center mr-4 text-xs">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-2 shadow-lg">
            <DropdownMenuLabel className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              KYC Actions
            </DropdownMenuLabel>

            {/* 1. VIEW DETAILS */}
            {/* <DropdownMenuItem
              className="cursor-pointer gap-2 py-2"
              onClick={() => {
                /* Open detail modal logic
              }}
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>View Profile Details</span>
            </DropdownMenuItem> 

            <DropdownMenuSeparator />
            */}

            {/* 2. APPROVE */}
            <DropdownMenuItem
              className="cursor-pointer gap-2 py-2 text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50"
              onClick={() => onAction(user.userId, "approve")}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">Approve KYC</span>
            </DropdownMenuItem>

            {/* 3. REJECT */}
            <DropdownMenuItem
              className="cursor-pointer gap-2 py-2 text-red-600 focus:text-red-700 focus:bg-red-50"
              onClick={() =>
                onAction(user.userId, "reject", "Document unclear")
              }
            >
              <XCircle className="h-4 w-4" />
              <span className="font-medium">Reject KYC</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
