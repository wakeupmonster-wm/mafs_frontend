// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardAction,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// // import kpiData from "@/app/data/kpiData.json";

// export function SectionCards() {
//   // const getIcon = (iconName, className) => {
//   //   const IconComponent = Icons[iconName];
//   //   return IconComponent ? <IconComponent className={className} /> : null;
//   // };

//   return (
//     <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Total Revenue</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             $1,250.00
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingDown />
//               +12.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Trending up this month <IconTrendingUp className="size-4" />
//           </div>
//           <div className="text-muted-foreground">
//             Visitors for the last 6 months
//           </div>
//         </CardFooter>
//       </Card>

//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>New Customers</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             1,234
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingDown />
//               -20%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Down 20% this period <IconTrendingDown className="size-4" />
//           </div>
//           <div className="text-muted-foreground">
//             Acquisition needs attention
//           </div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Active Accounts</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             45,678
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               +12.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Strong user retention <IconTrendingUp className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Engagement exceed targets</div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Growth Rate</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             4.5%
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <IconTrendingUp />
//               +4.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Steady performance increase <IconTrendingUp className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Meets growth projections</div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import { useEffect} from "react";
import { IconTrendingUp } from "@tabler/icons-react";
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

export function SectionCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    // Only fetch if data doesn't exist (optional caching logic)
    if (!stats) {
      dispatch(fetchDashboardKPIs());
    }
  }, [dispatch, stats]);

  if (loading) {
    return (
      <div className="px-4 text-sm text-muted-foreground">Loading KPIs...</div>
    );
  }

  // Safety check: kpis.totalUsers is required before rendering
  if (error || !stats?.totalUsers) {
    return (
      <div className="px-4 text-sm text-red-500">
        {error || "Failed to load dashboard data"}
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Users */}
      <Card
        className="@container/card"
        onClick={() => navigate("/admin/management/users-management")}
      >
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalUsers.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Live
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          All registered users
        </CardFooter>
      </Card>

      {/* Active Users (24h) */}
      <Card
        className="@container/card"
        onClick={() => navigate("/admin/management/users-management")}
      >
        <CardHeader>
          <CardDescription>Active Users (24h)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.activeUsers24h.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Last 24h
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Users active in last 24 hours
        </CardFooter>
      </Card>

      {/* Paid Users */}
      <Card
        className="@container/card"
        onClick={() => navigate("/admin/management/users-management")}
      >
        <CardHeader>
          <CardDescription>Paid Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.paidUsers.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Revenue
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Users with active subscriptions
        </CardFooter>
      </Card>
      <Card
        className="@container/card"
        onClick={() => navigate("/admin/management/users-management")}
      >
        <CardHeader>
          <CardDescription>Ban Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.TotalBanUsers.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Banned
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Banned Users
        </CardFooter>
      </Card>

      {/* <Card
        className="@container/card"
        onClick={() => navigate("/admin/management/users-management")}
      >
        <CardHeader>
          <CardDescription>Suspend Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
             {stats.TotalSuspendedUsers.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Suspended
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Suspended Users
        </CardFooter>
      </Card> */}

      {/* Total Tickets */}

      <Card
        className="@container/card"
        onClick={() => navigate("/admin/management/support")}
      >
        <CardHeader>
          <CardDescription>Total Tickets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.TotalTickets.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Ticket
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Users query
        </CardFooter>
      </Card>

      <Card className="@container/card"  onClick={() => navigate("/admin/management/giveaway")}>
        <CardHeader>
          <CardDescription>Total Claimed Prizes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.ClaimedPrize.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Claimed prizes
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Claimed Prizes
        </CardFooter>
      </Card>


  <Card
        className="@container/card cursor"
        onClick={() => navigate("/admin/management/profile-review")}
      >
        <CardHeader>
          <CardDescription>Total Reports</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.openReports.value}
          </CardTitle>
          <CardAction>
            <Badge
              variant={
                stats.openReports.actionable
                  ? "destructive"
                  : "outline"
              }
            >
              Action Needed
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Reports
        </CardFooter>
      </Card>


      {/* Pending Verifications */}
      <Card
        className="@container/card cursor"
        onClick={() => navigate("/admin/management/pending-verifications")}
      >
        <CardHeader>
          <CardDescription>Pending Verifications</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.pendingVerifications.value}
          </CardTitle>
          <CardAction>
            <Badge
              variant={
                stats.pendingVerifications.actionable
                  ? "destructive"
                  : "outline"
              }
            >
              Action Needed
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-muted-foreground text-sm">
          Profiles awaiting approval
        </CardFooter>
      </Card>
    </div>
  );
}
