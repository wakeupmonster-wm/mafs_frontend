import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/modules/users/store/user.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Deterministic bg color per initials
const AVATAR_COLORS = [
  "#6366f1",
  "#0ea5e9",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#ec4899",
  "#22c55e",
];

const getInitials = (firstName = "", lastName = "") => {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return f || l ? `${f}${l}` : "?";
};

const getDisplayName = (firstName = "", lastName = "") => {
  const name = `${firstName.trim()} ${lastName.trim()}`.trim();
  return name || "Unknown";
};

const getColorByIndex = (i) => AVATAR_COLORS[i % AVATAR_COLORS.length];

const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-600 border-emerald-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  banned: "bg-rose-50 text-rose-600 border-rose-200",
  suspended: "bg-orange-50 text-orange-600 border-orange-200",
  deactivated: "bg-slate-100 text-slate-500 border-slate-200",
};

const getPlan = (user) => {
  if (!user.subscription?.isPremium) return "Free";
  const months = user.subscription?.durationMonths;
  if (months === 3) return "Premium (3 Month)";
  return "Premium (1 Month)";
};

export function RecentUsersTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.users);

  useEffect(() => {
    // Only fetch if not already loaded
    if (!items || items.length === 0) {
      dispatch(
        fetchUsers({
          page: 1,
          limit: 10,
          search: "",
          accountStatus: "",
          isPremium: "",
          last24Hours: false,
          gender: "",
          isDeactivated: false,
          isScheduledForDeletion: false,
        }),
      );
    }
  }, [dispatch, items]);

  // Take top 6 most recently joined (sorted by createdAt desc)
  const recentUsers = [...(items || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Card className="rounded-[20px] py-3.5 shadow-md bg-slate-50 border border-slate-200 flex flex-col flex-1 h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-3 pt-5 px-6">
        <div>
          <CardTitle className="text-[17px] font-semibold text-slate-900 tracking-tight">
            Recent Joined Users
          </CardTitle>
          <p className="text-[12px] text-slate-400 mt-0.5 font-normal">
            Latest registrations on the platform
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/management/users-management")}
          className="flex items-center gap-1 text-[12px] font-semibold text-[#46C7CD] hover:text-cyan-600 transition-colors mt-1"
        >
          View all <ArrowUpRight size={14} strokeWidth={2.5} />
        </button>
      </CardHeader>

      <CardContent className="px-6 pb-5 flex-1 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-3 pb-2 border-b border-slate-200 mb-1">
          {["Customer", "Gender", "Joined", "Plan", "Completion", "Status"].map(
            (h) => (
              <span
                key={h}
                className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
              >
                {h}
              </span>
            ),
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="divide-y divide-slate-100">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-3 items-center py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0" />
                  <div className="flex flex-col gap-1">
                    <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
                    <div className="h-2.5 w-20 rounded bg-slate-100 animate-pulse" />
                  </div>
                </div>
                <div className="h-3 w-10 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-20 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-12 rounded bg-slate-200 animate-pulse" />
                <div className="h-5 w-14 rounded bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Rows */}
        {!loading && (
          <div className="divide-y divide-slate-100">
            {recentUsers.map((user, i) => {
              const firstName = user.profile?.firstName || "";
              const lastName = user.profile?.lastName || "";
              const email = user.account?.email || user.email || "";
              const gender = user.profile?.gender || "-";
              const completion = user.profile?.totalCompletion ?? 0;
              const displayName = getDisplayName(firstName, lastName);
              const displayEmail = email.trim() || "-";
              const status = (user.accountStatus || "active").toLowerCase();
              const joinedDate = user.createdAt
                ? format(new Date(user.createdAt), "MMM dd, yyyy")
                : "—";

              return (
                <div
                  key={user._id || i}
                  className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-3 items-center py-2.5 hover:bg-white/70 rounded-lg px-1 transition-colors cursor-default"
                >
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ backgroundColor: getColorByIndex(i) }}
                    >
                      {getInitials(firstName, lastName)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800 truncate leading-tight">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate leading-tight">
                        {displayEmail}
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <span className="text-[12px] text-slate-500 font-medium truncate capitalize">
                    {gender}
                  </span>

                  {/* Date */}
                  <span className="text-[12px] text-slate-500 font-medium truncate">
                    {joinedDate}
                  </span>

                  {/* Plan */}
                  <span className="text-[12px] text-slate-600 font-medium truncate">
                    {getPlan(user)}
                  </span>

                  {/* Completion */}
                  <span className="text-[12px] text-cyan-600 font-bold truncate">
                    {completion}%
                  </span>

                  {/* Status Badge */}
                  <Badge
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border w-fit capitalize ${STATUS_STYLES[status] || "bg-slate-100 text-slate-500 border-slate-200"}`}
                    variant="outline"
                  >
                    {status}
                  </Badge>
                </div>
              );
            })}

            {/* Empty state */}
            {recentUsers.length === 0 && (
              <div className="py-10 text-center text-[13px] text-slate-400">
                No users found.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
