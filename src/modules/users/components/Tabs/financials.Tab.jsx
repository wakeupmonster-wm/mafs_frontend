// import React from "react";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { TabsContent } from "@/components/ui/tabs";
// import {
//   IconCreditCard,
//   IconCalendarEvent,
//   IconCrown,
//   IconHistory,
//   IconArrowUpRight,
// } from "@tabler/icons-react";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export const FinancialsTab = ({ account }) => {
//   return (
//     <TabsContent
//       value="financials"
//       className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-4 duration-500"
//     >
//       {/* 1. SUBSCRIPTION OVERVIEW (4/12) */}
//       <Card
//         className={cn(
//           "lg:col-span-4 border-none shadow-lg overflow-hidden relative",
//           account.isPremium
//             ? "bg-slate-900 text-white"
//             : "bg-white text-slate-900 border border-slate-200"
//         )}
//       >
//         {/* Background Decorative Icon */}
//         <IconCrown
//           className={cn(
//             "absolute -right-6 -top-6 h-32 w-32 opacity-10",
//             account.isPremium ? "text-amber-400" : "text-slate-400"
//           )}
//         />

//         <CardHeader className="relative z-10 pb-2">
//           <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-70 flex items-center gap-2">
//             <IconCreditCard size={18} /> Active Subscription
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="relative z-10 space-y-6">
//           <div className="py-2">
//             <h3 className="text-3xl font-black">
//               {account.isPremium ? "Premium Pro" : "Free Plan"}
//             </h3>
//             <p
//               className={cn(
//                 "text-xs font-medium mt-1",
//                 account.isPremium ? "text-amber-400" : "text-slate-500"
//               )}
//             >
//               {account.isPremium
//                 ? "All features unlocked"
//                 : "Standard user access"}
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
//               <div className="flex items-center gap-2 text-sm font-medium">
//                 <IconCalendarEvent size={16} /> Status
//               </div>
//               <Badge
//                 className={cn(
//                   "border-none",
//                   account.isPremium
//                     ? "bg-emerald-500 text-white"
//                     : "bg-slate-200 text-slate-700"
//                 )}
//               >
//                 {account.isPremium ? "Active" : "Trial"}
//               </Badge>
//             </div>

//             <div className="flex justify-between items-center p-1 px-3">
//               <span className="text-sm opacity-70">Next Billing Date</span>
//               <span className="text-sm font-bold">Jan 24, 2027</span>
//             </div>
//           </div>

//           <Separator
//             className={account.isPremium ? "bg-white/10" : "bg-slate-100"}
//           />

//           <div className="flex flex-col gap-2 pt-2">
//             <Button
//               className={cn(
//                 "w-full font-bold h-11",
//                 account.isPremium
//                   ? "bg-white text-black hover:bg-slate-100"
//                   : "bg-slate-900 text-white"
//               )}
//             >
//               Upgrade Plan
//             </Button>
//             <Button
//               variant="ghost"
//               className="text-xs opacity-60 hover:opacity-100 h-8"
//             >
//               Cancel Subscription
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* 2. TRANSACTION HISTORY (8/12) */}
//       <Card className="lg:col-span-8 border-slate-200 shadow-sm overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100 py-4 px-6">
//           <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
//             <IconHistory size={18} className="text-indigo-500" /> Payment
//             Records
//           </CardTitle>
//           <Button
//             variant="outline"
//             size="sm"
//             className="h-8 bg-white text-[11px] font-bold"
//           >
//             Download All (PDF)
//           </Button>
//         </CardHeader>

//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 bg-slate-50/30">
//                   <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
//                     Invoice ID
//                   </th>
//                   <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
//                     Amount
//                   </th>
//                   <th className="px-6 py-4 text-right font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {[
//                   {
//                     date: "12 Jan 2026",
//                     id: "#TRX-00123",
//                     amount: "$14.99",
//                     status: "Paid",
//                   },
//                   {
//                     date: "12 Dec 2025",
//                     id: "#TRX-88210",
//                     amount: "$14.99",
//                     status: "Paid",
//                   },
//                   {
//                     date: "12 Nov 2025",
//                     id: "#TRX-77641",
//                     amount: "$14.99",
//                     status: "Failed",
//                   },
//                 ].map((row, i) => (
//                   <tr
//                     key={i}
//                     className="group hover:bg-slate-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 font-medium text-slate-600">
//                       {row.date}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1 text-slate-900 font-bold group-hover:text-indigo-600 transition-colors">
//                         {row.id}{" "}
//                         <IconArrowUpRight
//                           size={12}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity"
//                         />
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 font-black text-slate-900">
//                       {row.amount}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <Badge
//                         className={cn(
//                           "border-none px-3",
//                           row.status === "Paid"
//                             ? "bg-emerald-100 text-emerald-700"
//                             : "bg-rose-100 text-rose-700"
//                         )}
//                       >
//                         {row.status}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// };



import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconCreditCard,
  IconCalendarEvent,
  IconCrown,
  IconHistory,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FinancialsTab = ({ userData }) => {
  // ✅ Extract flat fields from userData matching your DB schema
  const isPremium = userData?.isPremium || false;
  const premiumExpiresAt = userData?.premiumExpiresAt;
  // const accountStatus = userData?.accountStatus || "active";

  return (
    <TabsContent
      value="financials"
      className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-4 duration-500"
    >
      {/* 1. SUBSCRIPTION OVERVIEW (4/12) */}
      <Card
        className={cn(
          "lg:col-span-4 border-none shadow-lg overflow-hidden relative",
          isPremium
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-900 border border-slate-200"
        )}
      >
        <IconCrown
          className={cn(
            "absolute -right-6 -top-6 h-32 w-32 opacity-10",
            isPremium ? "text-amber-400" : "text-slate-400"
          )}
        />

        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-70 flex items-center gap-2">
            <IconCreditCard size={18} /> Active Subscription
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <div className="py-2">
            <h3 className="text-3xl font-black">
              {isPremium ? "Premium Pro" : "Free Plan"}
            </h3>
            <p
              className={cn(
                "text-xs font-medium mt-1",
                isPremium ? "text-amber-400" : "text-slate-500"
              )}
            >
              {isPremium
                ? "All features unlocked"
                : "Standard user access"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-sm font-medium">
                <IconCalendarEvent size={16} /> Status
              </div>
              <Badge
                className={cn(
                  "border-none",
                  isPremium
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-700"
                )}
              >
                {isPremium ? "Active" : "Trial"}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-1 px-3">
              <span className="text-sm opacity-70">Next Billing Date</span>
              <span className="text-sm font-bold">
                {premiumExpiresAt
                  ? new Date(premiumExpiresAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>

          <Separator
            className={isPremium ? "bg-white/10" : "bg-slate-100"}
          />

          <div className="flex flex-col gap-2 pt-2">
            <Button
              className={cn(
                "w-full font-bold h-11",
                isPremium
                  ? "bg-white text-black hover:bg-slate-100"
                  : "bg-slate-900 text-white"
              )}
            >
              Upgrade Plan
            </Button>
            <Button
              variant="ghost"
              className="text-xs opacity-60 hover:opacity-100 h-8"
            >
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2. TRANSACTION HISTORY (8/12) */}
      <Card className="lg:col-span-8 border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100 py-4 px-6">
          <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <IconHistory size={18} className="text-indigo-500" /> Payment
            Records
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-white text-[11px] font-bold"
          >
            Download All (PDF)
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/30">
                  <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-right font-bold text-slate-400 uppercase tracking-tighter text-[10px]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    date: "12 Jan 2026",
                    id: "#TRX-00123",
                    amount: "$14.99",
                    status: "Paid",
                  },
                  {
                    date: "12 Dec 2025",
                    id: "#TRX-88210",
                    amount: "$14.99",
                    status: "Paid",
                  },
                  {
                    date: "12 Nov 2025",
                    id: "#TRX-77641",
                    amount: "$14.99",
                    status: "Failed",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-600">
                      {row.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-900 font-bold group-hover:text-indigo-600 transition-colors">
                        {row.id}{" "}
                        <IconArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      {row.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge
                        className={cn(
                          "border-none px-3",
                          row.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        )}
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};