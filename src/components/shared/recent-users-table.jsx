import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/modules/users/store/user.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyImg from "@/assets/web/dummyImg.webp";

const STATUS_STYLES = {
  active: {
    bg: "bg-emerald-100 text-emerald-700 border-emerald-100/50",
    dot: "bg-emerald-500",
  },
  pending: {
    bg: "bg-amber-100 text-amber-700 border-amber-100/50",
    dot: "bg-amber-500",
  },
  banned: {
    bg: "bg-rose-100 text-rose-700 border-rose-100/50",
    dot: "bg-rose-500",
  },
  suspended: {
    bg: "bg-orange-100 text-orange-700 border-orange-100/50",
    dot: "bg-orange-500",
  },
  deactivated: {
    bg: "bg-slate-100 text-slate-600 border-slate-200/50",
    dot: "bg-slate-400",
  },
};

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-pink-500",
  "bg-blue-500",
];

const getInitials = (nickname) => {
  return nickname?.trim().charAt(0).toUpperCase() || "?";
};

const getAvatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];

export function RecentUsersTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchUsers({ page: 1, limit: 10 }));
    }
  }, [dispatch, items]);

  const recentUsers = [...(items || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <Card className="rounded-2xl shadow-sm bg-slate-50 border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between px-6 border-b border-slate-50 shrink-0">
        <div className="space-y-0">
          <CardTitle className="text-base font-bold text-slate-800">
            Recent Joined Users
          </CardTitle>
          <p className="text-[11px] text-slate-500 font-normal">
            Monitor the latest member registrations
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/management/users-management")}
          className="flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
        >
          View all <ArrowUpRight size={16} />
        </button>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-auto">
        <div className="block bg-slate-50 overflow-hidden mx-5 rounded-xl border border-slate-200">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-b border-slate-100">
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-6">
                  Sr.No
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-6">
                  User
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-4">
                  Gender
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-4 whitespace-nowrap">
                  Joined Date
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-4">
                  Plan
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-4">
                  Completion
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-4">
                  Status
                </TableHead>
                <TableHead className="text-slate-700 font-semibold h-10 bg-slate-200/50 text-xs px-6 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(7)].map((_, i) => (
                  <TableRow key={i} className="animate-pulse border-slate-50">
                    <TableCell className="px-6 py-">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full" />
                        <div className="space-y-2">
                          <div className="h-3 w-20 bg-slate-100 rounded" />
                          <div className="h-2 w-28 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-1">
                      <div className="h-3 w-12 bg-slate-100 rounded" />
                    </TableCell>
                    <TableCell className="px-4 py-1">
                      <div className="h-3 w-16 bg-slate-100 rounded" />
                    </TableCell>
                    <TableCell className="px-4 py-1">
                      <div className="h-4 w-10 bg-slate-100 rounded" />
                    </TableCell>
                    <TableCell className="px-4 py-1">
                      <div className="h-2 w-20 bg-slate-100 rounded" />
                    </TableCell>
                    <TableCell className="px-4 py-1">
                      <div className="h-5 w-14 bg-slate-100 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-1 text-right">
                      <div className="h-8 w-8 bg-slate-100 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : recentUsers.length > 0 ? (
                recentUsers.map((user, idx) => {
                  const status = (user.accountStatus || "active").toLowerCase();
                  const completion = user.profile?.totalCompletion ?? 0;
                  const nickname = user.profile?.nickname || "unknown";

                  return (
                    <TableRow
                      key={user._id}
                      className="hover:bg-slate-50/50 transition-colors group border-slate-200"
                    >
                      <TableCell className="py-2 px-6">{idx + 1}</TableCell>
                      {/* User */}
                      <TableCell className="py-2 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-slate-100 shadow-sm">
                            <AvatarImage
                              src={user.photos || dummyImg}
                              className="object-cover"
                            />
                            <AvatarFallback
                              className={cn(
                                "text-white text-xs font-bold",
                                getAvatarColor(idx),
                              )}
                            >
                              {getInitials(nickname)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0 -space-y-1">
                            <span className="text-xs font-bold text-slate-700 truncate">
                              {nickname}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {user.account?.email || user.email || "-"}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Gender */}
                      <TableCell className="py-2 px-4">
                        <span className="text-xs text-slate-600 capitalize">
                          {user.profile?.gender || "-"}
                        </span>
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="py-2 px-4">
                        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                          {user.createdAt
                            ? format(new Date(user.createdAt), "dd MMM yyyy")
                            : "-"}
                        </span>
                      </TableCell>

                      {/* Plan */}
                      <TableCell className="py-2 px-4">
                        <Badge
                          variant="secondary"
                          className="w-fit bg-slate-100 text-muted-foreground hover:bg-slate-200 border border-slate-200 px-2 py-0.5 text-[10px] font-bold"
                        >
                          {user.subscription?.isPremium ? "Premium" : "Free"}
                        </Badge>
                      </TableCell>

                      {/* Completion */}
                      <TableCell className="py-2 px-4">
                        <div className="flex flex-col gap-1.5 min-w-[80px]">
                          <span className="text-[11px] font-bold text-brand-aqua">
                            {completion}%
                          </span>
                          <div className="h-1.5 w-full bg-slate-300/60 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-aqua rounded-full transition-all duration-500"
                              style={{ width: `${completion}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-2 px-4">
                        <Badge
                          className={cn(
                            "text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-none flex items-center gap-1.5 w-fit uppercase whitespace-nowrap",
                            STATUS_STYLES[status]?.bg,
                          )}
                        >
                          <div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              STATUS_STYLES[status]?.dot,
                            )}
                          />
                          {status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-2 px-6 text-right transition-all">
                        <button
                          onClick={() =>
                            navigate(
                              "/admin/management/users-management/view-profile",
                              {
                                state: { userId: user._id },
                              },
                            )
                          }
                          className="p-1 px-2.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all border border-slate-100 hover:border-cyan-100 shadow-sm bg-white"
                          title="View Profile"
                        >
                          <Eye size={15} strokeWidth={2.5} />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-20 text-center text-slate-400 text-sm italic"
                  >
                    No new users found in this period.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
