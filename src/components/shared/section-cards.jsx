// import { useEffect} from "react";
// import { IconTrendingUp } from "@tabler/icons-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardAction,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardKPIs } from "@/modules/dashboard/store/dashboard.slice";

// export function SectionCards() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { stats, loading, error } = useSelector((state) => state.dashboard);

//   useEffect(() => {
//     // Only fetch if data doesn't exist (optional caching logic)
//     if (!stats) {
//       dispatch(fetchDashboardKPIs());
//     }
//   }, [dispatch, stats]);

//   if (loading) {
//     return (
//       <div className="px-4 text-sm text-muted-foreground">Loading KPIs...</div>
//     );
//   }

//   // Safety check: kpis.totalUsers is required before rendering
//   if (error || !stats?.totalUsers) {
//     return (
//       <div className="px-4 text-sm text-red-500">
//         {error || "Failed to load dashboard data"}
//       </div>
//     );
//   }

//   return (
//     <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
//       {/* Total Users */}
//       <Card
//         className="@container/card"
//         onClick={() => navigate("/admin/management/users-management")}
//       >
//         <CardHeader>
//           <CardDescription>Total Users</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.totalUsers.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Live
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           All registered users
//         </CardFooter>
//       </Card>

//       {/* Active Users (24h) */}
//       <Card
//         className="@container/card"
//         onClick={() => navigate("/admin/management/users-management")}
//       >
//         <CardHeader>
//           <CardDescription>Active Users (24h)</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.activeUsers24h.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Last 24h
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Users active in last 24 hours
//         </CardFooter>
//       </Card>

//       {/* Paid Users */}
//       <Card
//         className="@container/card"
//         onClick={() => navigate("/admin/management/users-management")}
//       >
//         <CardHeader>
//           <CardDescription>Paid Users</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.paidUsers.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Revenue
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Users with active subscriptions
//         </CardFooter>
//       </Card>
//       <Card
//         className="@container/card"
//         onClick={() => navigate("/admin/management/users-management")}
//       >
//         <CardHeader>
//           <CardDescription>Ban Users</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.TotalBanUsers.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Banned
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Banned Users
//         </CardFooter>
//       </Card>

//       {/* <Card
//         className="@container/card"
//         onClick={() => navigate("/admin/management/users-management")}
//       >
//         <CardHeader>
//           <CardDescription>Suspend Users</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//              {stats.TotalSuspendedUsers.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Suspended
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Suspended Users
//         </CardFooter>
//       </Card> */}

//       {/* Total Tickets */}

//       <Card
//         className="@container/card"
//         onClick={() => navigate("/admin/management/support")}
//       >
//         <CardHeader>
//           <CardDescription>Total Tickets</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.TotalTickets.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Ticket
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Users query
//         </CardFooter>
//       </Card>

//       <Card className="@container/card"  onClick={() => navigate("/admin/management/giveaway")}>
//         <CardHeader>
//           <CardDescription>Total Claimed Prizes</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.ClaimedPrize.value}
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               Claimed prizes
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Claimed Prizes
//         </CardFooter>
//       </Card>


//   <Card
//         className="@container/card cursor"
//         onClick={() => navigate("/admin/management/profile-review")}
//       >
//         <CardHeader>
//           <CardDescription>Total Reports</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.openReports.value}
//           </CardTitle>
//           <CardAction>
//             <Badge
//               variant={
//                 stats.openReports.actionable
//                   ? "destructive"
//                   : "outline"
//               }
//             >
//               Action Needed
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Reports
//         </CardFooter>
//       </Card>


//       {/* Pending Verifications */}
//       <Card
//         className="@container/card cursor"
//         onClick={() => navigate("/admin/management/pending-verifications")}
//       >
//         <CardHeader>
//           <CardDescription>Pending Verifications</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             {stats.pendingVerifications.value}
//           </CardTitle>
//           <CardAction>
//             <Badge
//               variant={
//                 stats.pendingVerifications.actionable
//                   ? "destructive"
//                   : "outline"
//               }
//             >
//               Action Needed
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="text-muted-foreground text-sm">
//           Profiles awaiting approval
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }



import { useEffect } from "react";
import {
  IconTrendingUp,
  IconUsers,
  IconUserCheck,
  IconCrown,
  IconUserX,
  IconTicket,
  IconGift,
  IconAlertTriangle,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardKPIs } from "@/modules/dashboard/store/dashboard.slice";
import { cn } from "@/lib/utils";

export function SectionCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!stats) {
      dispatch(fetchDashboardKPIs());
    }
  }, [dispatch, stats]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 w-24 rounded bg-muted"></div>
              <div className="mt-2 h-8 w-20 rounded bg-muted"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats?.totalUsers) {
    return (
      <div className="mx-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 lg:mx-6">
        <div className="flex items-center gap-2">
          <IconAlertTriangle className="h-5 w-5" />
          {error || "Failed to load dashboard data"}
        </div>
      </div>
    );
  }

  const cardData = [
    {
      title: "Total Users",
      value: stats.totalUsers.value,
      description: "All registered users",
      icon: IconUsers,
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      badge: "Live",
      badgeVariant: "default",
      route: "/admin/management/users-management",
    },
    {
      title: "Active Users (24h)",
      value: stats.activeUsers24h.value,
      description: "Users active in last 24 hours",
      icon: IconUserCheck,
      gradient: "from-green-500/10 via-green-500/5 to-transparent",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      badge: "Last 24h",
      badgeVariant: "outline",
      route: "/admin/management/users-management",
    },
    {
      title: "Paid Users",
      value: stats.paidUsers.value,
      description: "Active subscriptions",
      icon: IconCrown,
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      badge: "Revenue",
      badgeVariant: "outline",
      route: "/admin/management/users-management",
    },
    {
      title: "Banned Users",
      value: stats.TotalBanUsers.value,
      description: "Permanently banned accounts",
      icon: IconUserX,
      gradient: "from-red-500/10 via-red-500/5 to-transparent",
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      badge: "Banned",
      badgeVariant: "outline",
      route: "/admin/management/users-management",
    },
    {
      title: "Support Tickets",
      value: stats.TotalTickets.value,
      description: "Open support requests",
      icon: IconTicket,
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      badge: "Support",
      badgeVariant: "outline",
      route: "/admin/management/support",
    },
    {
      title: "Claimed Prizes",
      value: stats.ClaimedPrize.value,
      description: "Giveaway rewards claimed",
      icon: IconGift,
      gradient: "from-pink-500/10 via-pink-500/5 to-transparent",
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      badge: "Rewards",
      badgeVariant: "outline",
      route: "/admin/management/giveaway",
    },
    {
      title: "Open Reports",
      value: stats.openReports.value,
      description: "Pending moderation reports",
      icon: IconAlertTriangle,
      gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      badge: stats.openReports.actionable ? "Action Needed" : "Normal",
      badgeVariant: stats.openReports.actionable ? "destructive" : "outline",
      route: "/admin/management/profile-review",
      pulse: stats.openReports.actionable,
    },
    {
      title: "Pending Verifications",
      value: stats.pendingVerifications.value,
      description: "Profiles awaiting approval",
      icon: IconShieldCheck,
      gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-100",
      badge: stats.pendingVerifications.actionable ? "Action Needed" : "Normal",
      badgeVariant: stats.pendingVerifications.actionable
        ? "destructive"
        : "outline",
      route: "/admin/management/pending-verifications",
      pulse: stats.pendingVerifications.actionable,
    },
  ];

  // Format number with K, M suffixes
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {cardData.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className={cn(
              "group relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
              card.pulse && "animate-pulse-slow"
            )}
            onClick={() => navigate(card.route)}
          >
            {/* Gradient Background */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-300 group-hover:opacity-100",
                card.gradient
              )}
            />

            {/* Decorative Circle */}
            <div
              className={cn(
                "absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-110",
                card.iconBg
              )}
            />

            <CardHeader className="relative space-y-4">
              {/* Icon and Badge Row */}
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
                    card.iconBg
                  )}
                >
                  <Icon className={cn("h-6 w-6", card.iconColor)} />
                </div>
                <CardAction>
                  <Badge variant={card.badgeVariant} className="shadow-sm">
                    {card.badge}
                  </Badge>
                </CardAction>
              </div>

              {/* Title */}
              <CardDescription className="text-sm font-medium">
                {card.title}
              </CardDescription>

              {/* Value with Animation */}
              <CardTitle className="text-4xl font-bold tabular-nums tracking-tight">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  {formatNumber(card.value)}
                </span>
              </CardTitle>
            </CardHeader>

            <CardFooter className="relative">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-muted-foreground">
                  {card.description}
                </span>
                <IconTrendingUp className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}