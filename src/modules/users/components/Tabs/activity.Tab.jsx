import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconCheck,
  IconEye,
  IconHeart,
  IconStar,
  IconMessage2,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import dummyImg from "@/assets/images/dummyImg.jpg";
import { Button } from "@/components/ui/button";

// export const ActivityTab = ({ stats, recentMatches }) => {
//   // Calculate match rate percentage
//   const matchRate =
//     stats.totalSwipes > 0
//       ? ((stats.totalMatches / stats.totalSwipes) * 100).toFixed(1)
//       : 0;

//   console.log("recentMatches: ", recentMatches);

//   return (
//     <TabsContent value="activity" className="mt-6 space-y-6">
//       {/* Dynamic Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard
//           label="Total Likes"
//           value={stats.totalLikes?.toLocaleString()}
//           icon={<IconHeart className="text-red-500" size={20} />}
//         />
//         <StatCard
//           label="Super Likes"
//           value={stats.totalSuperLikes?.toLocaleString()}
//           icon={<IconStar className="text-amber-500" size={20} />}
//         />
//         <StatCard
//           label="Matches"
//           value={stats.totalMatches?.toLocaleString()}
//           icon={<IconCheck className="text-green-500" size={20} />}
//         />
//         <StatCard
//           label="Total Swipes"
//           value={stats.totalSwipes?.toLocaleString()}
//           icon={<IconEye className="text-blue-500" size={20} />}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Match History List */}
//         <Card className={"col-span-2"}>
//           <CardHeader>
//             <CardTitle>Recent Match History</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentMatches && recentMatches.length > 0 ? (
//                 recentMatches.map((match) => (
//                   <div
//                     key={match._id}
//                     className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/50 transition-all group"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
//                         <AvatarImage
//                           src={match.photo || dummyImg}
//                           className="object-cover"
//                         />
//                         <AvatarFallback>
//                           {match.nickname?.substring(0, 2).toUpperCase()}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-bold text-sm">
//                           Matched with{" "}
//                           <span className="text-primary">{match.nickname}</span>
//                         </p>
//                         <p className="text-xs text-muted-foreground italic">
//                           {match.matchedAt
//                             ? `Connected ${formatDistanceToNow(
//                                 new Date(match.matchedAt)
//                               )} ago`
//                             : "Date unavailable"}
//                         </p>
//                       </div>
//                     </div>
//                     <Badge
//                       variant="secondary"
//                       className="bg-green-50 text-green-700 border-green-200"
//                     >
//                       Active Match
//                     </Badge>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-12 border-2 border-dashed rounded-xl">
//                   <p className="text-muted-foreground text-sm font-medium">
//                     No recent matches found.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Swipe Insights Card */}
//         <Card className="shadow-sm border-muted">
//           <CardHeader>
//             <CardTitle className="text-lg">Engagement Insights</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm font-medium">
//                 <span>Match Success Rate</span>
//                 <span className="text-primary">{matchRate}%</span>
//               </div>
//               <Progress value={parseFloat(matchRate)} className="h-2" />
//             </div>

//             <div className="pt-4 space-y-3">
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-muted-foreground">
//                   Likes vs. Total Swipes
//                 </span>
//                 <span className="font-mono">
//                   {stats.totalLikes}/{stats.totalSwipes}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-muted-foreground">Super Like Ratio</span>
//                 <span className="font-mono">
//                   {stats.totalSuperLikes > 0
//                     ? (
//                         (stats.totalSuperLikes / stats.totalLikes) *
//                         100
//                       ).toFixed(1)
//                     : 0}
//                   %
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// };

export const ActivityTab = ({ stats, recentMatches }) => {
  const matchRate =
    stats.totalSwipes > 0
      ? ((stats.totalMatches / stats.totalSwipes) * 100).toFixed(1)
      : 0;

  return (
    <TabsContent
      value="activity"
      className="mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500"
    >
      {/* 1. TOP STATS ROW - Using a Glassmorphism Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Likes",
            val: stats.totalLikes,
            icon: <IconHeart className="text-rose-500" />,
            bg: "bg-rose-50",
          },
          {
            label: "Super Likes",
            val: stats.totalSuperLikes,
            icon: <IconStar className="text-amber-500" />,
            bg: "bg-amber-50",
          },
          {
            label: "Total Matches",
            val: stats.totalMatches,
            icon: <IconCheck className="text-emerald-500" />,
            bg: "bg-emerald-50",
          },
          {
            label: "Profile Views",
            val: stats.totalSwipes,
            icon: <IconEye className="text-sky-500" />,
            bg: "bg-sky-50",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-sm bg-white overflow-hidden group"
          >
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div
                  className={cn(
                    "p-3 rounded-2xl transition-transform group-hover:scale-110",
                    stat.bg
                  )}
                >
                  {React.cloneElement(stat.icon, { size: 24, stroke: 2 })}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {stat.label}
                  </p>
                  <h4 className="text-xl font-bold text-slate-900">
                    {stat.val?.toLocaleString()}
                  </h4>
                </div>
              </div>
              <div
                className={cn(
                  "h-1 w-full opacity-20",
                  stat.bg.replace("bg-", "bg-")
                )}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2. RECENT MATCHES TIMELINE (8/12) */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/30 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconMessage2 size={18} className="text-emerald-500" /> Recent
              Connections
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-white text-[10px] font-bold text-slate-400 border-slate-200"
            >
              {recentMatches?.length ?? 0} Matches
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentMatches && recentMatches.length > 0 ? (
                recentMatches.map((match) => (
                  <div
                    key={match._id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border border-slate-100 shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage
                            src={match.photo || dummyImg}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-slate-100 font-bold text-slate-400">
                            {match.nickname?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {/* Status Indicator */}
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Matched with {match.nickname}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {match.matchedAt
                            ? formatDistanceToNow(new Date(match.matchedAt)) +
                              " ago"
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs font-bold text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      View Chat
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <IconMessage2 size={24} stroke={1.5} />
                  </div>
                  <p className="text-sm font-medium">
                    No recent engagement found
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. INSIGHTS & CONVERSION RATE (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <IconTrendingUp size={18} className="text-indigo-500" />{" "}
                Engagement Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <h3 className="text-4xl font-black text-slate-900 leading-none">
                  {matchRate}%
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                  Conversion Rate
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-500">
                    <span>Funnel Success</span>
                    <span className="text-indigo-600">{matchRate}%</span>
                  </div>
                  <Progress
                    value={parseFloat(matchRate)}
                    className="h-2 bg-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 pt-4 border-t border-slate-100 mt-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-medium text-slate-500">
                      Like Accuracy
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {stats.totalLikes > 0
                        ? (
                            (stats.totalMatches / stats.totalLikes) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-xs font-medium text-slate-500">
                      Super Like Ratio
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {stats.totalLikes > 0
                        ? (
                            (stats.totalSuperLikes / stats.totalLikes) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-600 border-none shadow-lg shadow-indigo-100 p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-sm font-bold opacity-80">Moderator Tip</h4>
              <p className="text-xs mt-2 leading-relaxed">
                This user has a high swipe frequency. Monitor for potential bot
                behavior or automated scripts.
              </p>
            </div>
            <IconTrendingUp className="absolute -bottom-4 -right-4 h-24 w-24 opacity-10" />
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};
