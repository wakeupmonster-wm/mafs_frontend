import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    ArrowUpDown,
    Calendar,
    MoreHorizontal,
    Eye,
    Copy,
    Mail,
    Phone,
    Layers,
    Smartphone,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { IoLogoApple } from "react-icons/io5";
import { AiFillAndroid } from "react-icons/ai";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyImg from "@/assets/images/dummyImg.jpg";
import { cn } from "@/lib/utils";

export const getSubscriberColumns = (navigate) => [
    {
        id: "sno",
        header: () => <div className="w-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">S.No</div>,
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            return <div className="w-10 text-center font-bold text-xs">{pageIndex * pageSize + row.index + 1}</div>;
        },
        enableSorting: false,
    },
    {
        accessorKey: "user.nickname",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-transparent p-0"
            >
                Subscriber
                <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => {
            const data = row.original;
            // Prioritize the 'user' object from the new response
            const user = data?.user || data?.userId || data?.userInfo || data;
            
            // Photo priority: Cloudinary photo -> avatar -> dummy
            const avatar = user?.photo && user.photo !== "null" ? user.photo : 
                          user?.avatar?.url || user?.avatar || dummyImg;
            
            // Name priority: Nickname -> Full Name -> Email -> Phone
            // Added check for "N/A" string which comes from backend
            const rawNickname = user?.nickname;
            const nickname = (rawNickname && rawNickname !== "N/A") ? rawNickname : null;
            
            const rawEmail = user?.email;
            const email = (rawEmail && rawEmail !== "N/A") ? rawEmail : null;

            const name = nickname || 
                          user?.fullName || 
                          user?.name || 
                          email || 
                          user?.phone ||
                          "Unknown User";

            return (
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm rounded-xl overflow-hidden">
                            <AvatarImage src={avatar} className="object-cover" />
                            <AvatarFallback className="bg-brand-aqua/10 text-brand-aqua text-[10px] font-black rounded-xl">
                                {String(name).charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {data?.status === "ACTIVE" && !data?.isExpired && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate max-w-[120px]">
                            {name}
                        </p>
                        <Badge variant="outline" className="text-[8px] h-3.5 px-1 bg-slate-50 border-slate-200 text-slate-400 font-bold uppercase mt-1">
                            {data?.platform === "admin_granted" || user?.role === "ADMIN" ? "Admin" : data?.platform}
                        </Badge>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "user.email",
        header: () => <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</div>,
        cell: ({ row }) => {
            const data = row.original;
            const user = data?.user || data?.userId;
            const email = user?.email && user.email !== "N/A" ? user.email : "N/A";

            return (
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {
                    if (email !== "N/A") {
                        navigator.clipboard.writeText(email);
                        toast.success("Email copied");
                    }
                }}>
                    <Mail className="w-3 h-3 text-slate-400 group-hover:text-brand-aqua transition-colors" />
                    <span className="text-[11px] font-medium text-slate-600 truncate max-w-[150px]">{email}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "user.phone",
        header: () => <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone</div>,
        cell: ({ row }) => {
            const data = row.original;
            const user = data?.user || data?.userId;
            const phone = user?.phone && user.phone !== "N/A" ? user.phone : "N/A";

            return (
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {
                    if (phone !== "N/A") {
                        navigator.clipboard.writeText(phone);
                        toast.success("Phone copied");
                    }
                }}>
                    <Phone className="w-3 h-3 text-slate-400 group-hover:text-brand-aqua transition-colors" />
                    <span className="text-[11px] font-medium text-slate-600">{phone}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "planType",
        header: () => <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Plan & Product</div>,
        cell: ({ row }) => {
            const plan = row.original?.planType;
            const productId = row.original?.productId;

            return (
                <div>
                    <Badge className={cn(
                        "text-[10px] font-black px-2 py-0 h-5 mb-1 shadow-none border",
                        plan === "MONTHLY" ? "bg-blue-50 text-blue-600 border-blue-100" :
                        plan === "QUARTERLY" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                        plan === "YEARLY" ? "bg-purple-50 text-purple-600 border-purple-100" :
                        "bg-amber-50 text-amber-600 border-amber-100"
                    )}>
                        {plan}
                    </Badge>
                    <p className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">{productId}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</div>,
        cell: ({ row }) => {
            const status = row.original?.status;
            const isExpired = row.original?.isExpired;

            let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";
            let label = status;

            if (status === "ACTIVE" && !isExpired) {
                badgeStyle = "bg-emerald-50 text-emerald-600 border-emerald-100";
            } else if (isExpired) {
                badgeStyle = "bg-rose-50 text-rose-600 border-rose-100";
                label = "EXPIRED";
            } else if (status === "REVOKED") {
                badgeStyle = "bg-red-50 text-red-600 border-red-100";
            }

            return (
                <div className="flex justify-center">
                    <Badge className={cn("text-[10px] font-black px-2.5 py-0.5 shadow-none border uppercase tracking-widest", badgeStyle)}>
                        {label}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-transparent p-0"
            >
                Subscription Date
                <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = row.original?.createdAt;
            return (
                <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-700">{date ? format(new Date(date), "MMM dd, yyyy") : "-"}</p>
                    <p className="text-[10px] text-slate-400">{date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : "-"}</p>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right pr-4">Actions</div>,
        cell: ({ row }) => {
            const sub = row.original;
            return (
                <div className="text-right pr-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100/50 rounded-full">
                                <MoreHorizontal className="h-4 w-4 text-slate-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-slate-200 shadow-xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">
                                Management
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer py-2 rounded-xl focus:bg-brand-aqua/10 focus:text-brand-aqua font-bold text-xs"
                                onClick={() => {
                                    const targetId = sub.user?._id || sub.userId?._id || sub.userId;
                                    if (targetId) navigate(`../view-subscription/${targetId}`);
                                    else toast.error("User ID not found");
                                }}
                            >
                                <Eye className="w-4 h-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer py-2 rounded-xl focus:bg-brand-aqua/10 focus:text-brand-aqua font-bold text-xs"
                                onClick={() => {
                                    navigator.clipboard.writeText(sub._id);
                                    toast.success("Subscription ID copied");
                                }}
                            >
                                <Copy className="w-4 h-4" />
                                Copy Sub ID
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
