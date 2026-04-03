// // import React from "react";
// // import { Doughnut } from "react-chartjs-2";
// // import {
// //     Chart as ChartJS,
// //     ArcElement,
// //     Tooltip,
// //     Legend,
// // } from "chart.js";
// // import { TrendingUp } from "lucide-react";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // // Register Chart.js modules
// // ChartJS.register(ArcElement, Tooltip, Legend);

// // const Last24HoursPieChart = ({ last24HoursActivity }) => {
// //     const { newSubscriptions, walletPacksBought, cancellations, plansExpiringSoon } =
// //         last24HoursActivity;

// //     const total = newSubscriptions + walletPacksBought + cancellations + plansExpiringSoon;
// //     const isEmpty = total === 0;

// //     const labels = ["New Subs", "Consumables Bought", "Cancellations", "Expiring Soon"];
// //     const values = [newSubscriptions, walletPacksBought, cancellations, plansExpiringSoon];

// //     const COLORS = {
// //         bg: ["#06b6d4", "#8b5cf6", "#f43f5e", "#f59e0b"],
// //         hoverBg: ["#0891b2", "#7c3aed", "#e11d48", "#d97706"],
// //         textColor: ["text-cyan-500", "text-violet-500", "text-rose-500", "text-amber-500"],
// //         dotColor: ["bg-cyan-500", "bg-violet-500", "bg-rose-500", "bg-amber-500"],
// //     };

// //     // Chart.js data
// //     const data = {
// //         labels,
// //         datasets: [
// //             {
// //                 data: isEmpty ? [1] : values,
// //                 backgroundColor: isEmpty ? ["#e2e8f0"] : COLORS.bg,
// //                 hoverBackgroundColor: isEmpty ? ["#cbd5e1"] : COLORS.hoverBg,
// //                 borderWidth: 3,
// //                 borderColor: "#ffffff",
// //                 hoverBorderColor: "#ffffff",
// //                 hoverOffset: 12,
// //                 borderRadius: 6,
// //                 spacing: 4,
// //             },
// //         ],
// //     };

// //     // Chart.js options
// //     const options = {
// //         responsive: true,
// //         maintainAspectRatio: true,
// //         cutout: "62%",
// //         plugins: {
// //             legend: {
// //                 display: false, // custom legend banayenge niche
// //             },
// //             tooltip: {
// //                 enabled: !isEmpty,
// //                 backgroundColor: "rgba(15, 23, 42, 0.9)",
// //                 titleFont: { size: 12, weight: "bold", family: "Inter, sans-serif" },
// //                 bodyFont: { size: 14, weight: "bold", family: "Inter, sans-serif" },
// //                 padding: { x: 14, y: 10 },
// //                 cornerRadius: 12,
// //                 displayColors: true,
// //                 boxWidth: 12,
// //                 boxHeight: 12,
// //                 boxPadding: 4,
// //                 usePointStyle: true,
// //                 pointStyle: "circle",
// //                 callbacks: {
// //                     label: (ctx) => {
// //                         const val = ctx.parsed;
// //                         const pct = ((val / total) * 100).toFixed(1);
// //                         return ` ${val} (${pct}%)`;
// //                     },
// //                 },
// //             },
// //         },
// //         animation: {
// //             animateRotate: true,
// //             animateScale: true,
// //             duration: 1000,
// //             easing: "easeOutQuart",
// //         },
// //     };

// //     // Center text plugin (total dikhane ke liye donut ke beech mein)
// //     const centerTextPlugin = {
// //         id: "centerText",
// //         beforeDraw: (chart) => {
// //             if (isEmpty) return;
// //             const { ctx, width, height } = chart;
// //             ctx.save();

// //             // "Total" label
// //             ctx.font = "bold 11px Inter, sans-serif";
// //             ctx.fillStyle = "#94a3b8";
// //             ctx.textAlign = "center";
// //             ctx.textBaseline = "middle";
// //             ctx.fillText("TOTAL", width / 2, height / 2 - 12);

// //             // Total value
// //             ctx.font = "900 26px Inter, sans-serif";
// //             ctx.fillStyle = "#0f172a";
// //             ctx.fillText(total.toString(), width / 2, height / 2 + 14);

// //             ctx.restore();
// //         },
// //     };

// //     return (
// //         <Card
// //             className="rounded-[2rem] border-slate-200 hover:border-brand-aqua/80
// //                  transition-all duration-500 shadow-md hover:shadow-xl
// //                  bg-gradient-to-br from-white via-white to-cyan-50/30
// //                  overflow-hidden h-full"
// //         >
// //             {/* ── HEADER ── */}
// //             <CardHeader className="pb-2">
// //                 <CardTitle className="text-sm font-black flex items-center gap-2">
// //                     <span className="p-1.5 rounded-xl bg-brand-aqua shadow-md shadow-cyan-500/25">
// //                         <TrendingUp className="w-4 h-4 text-white" />
// //                     </span>
// //                     Last 24 Hours Activity
// //                     {!isEmpty && (
// //                         <span className="ml-auto text-[10px] font-bold text-white bg-brand-aqua rounded-full px-2.5 py-1">
// //                             {total} events
// //                         </span>
// //                     )}
// //                 </CardTitle>
// //             </CardHeader>

// //             <CardContent className="px-4 sm:px-6 pb-6">
// //                 {isEmpty ? (
// //                     /* ── Empty State ── */
// //                     <div className="flex flex-col items-center justify-center py-10 text-slate-400">
// //                         <TrendingUp className="w-10 h-10 mb-2 opacity-30" />
// //                         <p className="text-xs font-semibold">No activity in last 24 hours</p>
// //                     </div>
// //                 ) : (
// //                     <div className="flex flex-col sm:flex-row items-center gap-6">
// //                         {/* ── PIE CHART ── */}
// //                         <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] shrink-0">
// //                             <Doughnut
// //                                 data={data}
// //                                 options={options}
// //                                 plugins={[centerTextPlugin]}
// //                             />
// //                         </div>

// //                         {/* ── LEGEND (Right Side) ── */}
// //                         <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-1 gap-3">
// //                             {labels.map((label, i) => (
// //                                 <div
// //                                     key={label}
// //                                     className="flex items-center gap-3 p-2.5 rounded-xl
// //                              bg-slate-50/80 hover:bg-slate-100
// //                              transition-all duration-300 group cursor-default"
// //                                 >
// //                                     {/* color dot */}
// //                                     <span
// //                                         className={`w-3.5 h-3.5 rounded-full shrink-0 shadow-sm
// //                                 ring-2 ring-white
// //                                 group-hover:scale-125 transition-transform duration-300
// //                                 ${COLORS.dotColor[i]}`}
// //                                     />

// //                                     {/* label + value */}
// //                                     <div className="min-w-0 flex-1">
// //                                         <p className="text-[10px] uppercase font-bold text-slate-400 truncate leading-tight">
// //                                             {label}
// //                                         </p>
// //                                         <div className="flex items-baseline gap-1.5">
// //                                             <span className={`text-lg font-black leading-tight ${COLORS.textColor[i]}`}>
// //                                                 {values[i]}
// //                                             </span>
// //                                             <span className="text-[10px] font-semibold text-slate-300">
// //                                                 ({((values[i] / total) * 100).toFixed(0)}%)
// //                                             </span>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //             </CardContent>
// //         </Card>
// //     );
// // };

// // export default Last24HoursPieChart;

// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { TrendingUp } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // Register Chart.js modules
// ChartJS.register(ArcElement, Tooltip, Legend);

// const Last24HoursPieChart = ({ last24HoursActivity }) => {
//     const { newSubscriptions, walletPacksBought, cancellations, plansExpiringSoon } =
//         last24HoursActivity || {};

//     // Safe values (default to 0)
//     const values = [
//         newSubscriptions || 0,
//         walletPacksBought || 0,
//         cancellations || 0,
//         plansExpiringSoon || 0
//     ];

//     const labels = ["New Subs", "Consumables Bought", "Cancellations", "Expiring Soon"];

//     // Semantic Colors (Meaningful)
//     const BG_COLORS = [
//         "#06b6d4", // Cyan (New Subs)
//         "#8b5cf6", // Violet (Consumables)
//         "#f43f5e", // Rose (Cancellations - Danger)
//         "#f59e0b"  // Amber (Expiring - Warning)
//     ];

//     const total = values.reduce((a, b) => a + b, 0);
//     const isEmpty = total === 0;

//     // Chart Data
//     const data = {
//         labels,
//         datasets: [
//             {
//                 data: isEmpty ? [1] : values,
//                 backgroundColor: isEmpty ? ["#e2e8f0"] : BG_COLORS,
//                 hoverOffset: 4,        // ✅ Standard Pop-out
//                 borderWidth: 2,        // ✅ White Borders
//                 borderColor: "#ffffff",
//             },
//         ],
//     };

//     // Chart Options (Matches PlanDistribution Style)
//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         cutout: "50%", // ✅ Thick Ring (Official Docs Style)
//         plugins: {
//             legend: {
//                 display: false, // Custom Legend Niche hai
//             },
//             tooltip: {
//                 enabled: !isEmpty,
//                 backgroundColor: "rgba(0,0,0,0.8)",
//                 padding: 12,
//                 titleFont: { size: 13 },
//                 bodyFont: { size: 13, weight: "bold" },
//                 displayColors: true,
//                 callbacks: {
//                     // ✅ Name Title me auto aata hai, yahan sirf Value dikhayenge
//                     label: (context) => {
//                         const val = context.parsed;
//                         const pct = ((val / total) * 100).toFixed(1);
//                         return ` ${val} Events (${pct}%)`;
//                     }
//                 }
//             },
//         },
//         animation: {
//             animateRotate: true,
//             animateScale: true,
//         },
//     };

//     return (
//         <Card
//             className="rounded-[2rem] border-slate-200 hover:border-brand-aqua/80
//                  transition-all duration-500 shadow-md hover:shadow-xl
//                  bg-white overflow-hidden h-full flex flex-col"
//         >
//             {/* ── HEADER ── */}
//             <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-black flex items-center gap-2">
//                     <span className="p-1.5 rounded-xl bg-brand-aqua shadow-md shadow-cyan-500/25">
//                         <TrendingUp className="w-4 h-4 text-white" />
//                     </span>
//                     Last 24 Hours
//                     {!isEmpty && (
//                         <span className="ml-auto text-[10px] font-bold text-white bg-brand-aqua rounded-full px-2.5 py-1">
//                             {total}
//                         </span>
//                     )}
//                 </CardTitle>
//                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-9">
//                     Recent Activity Overview
//                 </p>
//             </CardHeader>

//             <CardContent className="px-6 pb-6 flex-1 flex flex-col gap-6">

//                 {/* ── 1. Chart Section (Top) ── */}
//                 <div className="h-[200px] w-full flex justify-center items-center">
//                     {isEmpty ? (
//                         <div className="flex flex-col items-center justify-center text-slate-400">
//                             <TrendingUp className="w-8 h-8 mb-2 opacity-20" />
//                             <p className="text-xs font-semibold">No activity yet</p>
//                         </div>
//                     ) : (
//                         <div className="w-[180px] h-[180px]">
//                             <Doughnut data={data} options={options} />
//                         </div>
//                     )}
//                 </div>

//                 {/* ── 2. Legend Section (Bottom List) ── */}
//                 <div className="flex flex-col gap-2 w-full">
//                     {!isEmpty && labels.map((label, i) => {
//                         const pct = ((values[i] / total) * 100).toFixed(0);
//                         return (
//                             <div
//                                 key={i}
//                                 className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100"
//                             >
//                                 <div className="flex items-center gap-3">
//                                     {/* Color Box */}
//                                     <span
//                                         className="w-3 h-3 shrink-0 rounded-sm shadow-sm"
//                                         style={{ backgroundColor: BG_COLORS[i] }}
//                                     />
//                                     <span className="text-xs font-medium text-slate-600">
//                                         {label}
//                                     </span>
//                                 </div>

//                                 <div className="flex items-center gap-2">
//                                     <span
//                                         className="text-sm font-bold"
//                                         style={{ color: BG_COLORS[i] }} // Value colored specifically here
//                                     >
//                                         {values[i]}
//                                     </span>
//                                     <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
//                                         {pct}%
//                                     </span>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//             </CardContent>
//         </Card>
//     );
// };

// export default Last24HoursPieChart;

import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Register Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Fixed Semantic Colors for 24h Stats
const COLORS = [
  "#06b6d4", // Cyan (New Subs)
  "#8b5cf6", // Violet (Consumables)
  "#f43f5e", // Rose (Cancellations)
  "#f59e0b", // Amber (Expiring)
];

const LABELS = [
  "New Subs",
  "Consumables Bought",
  "Cancellations",
  "Expiring Soon",
];

const Last24HoursPieChart = ({ last24HoursActivity }) => {
  const { chartData, total, values, isEmpty } = useMemo(() => {
    // Safe extraction with default 0
    const {
      newSubscriptions = 0,
      walletPacksBought = 0,
      cancellations = 0,
      plansExpiringSoon = 0,
    } = last24HoursActivity || {};

    const values = [
      newSubscriptions,
      walletPacksBought,
      cancellations,
      plansExpiringSoon,
    ];
    const total = values.reduce((a, b) => a + b, 0);
    const isEmpty = total === 0;

    const data = {
      labels: LABELS,
      datasets: [
        {
          label: "Activity",
          data: isEmpty ? [1] : values,
          backgroundColor: isEmpty ? ["#e2e8f0"] : COLORS,
          hoverBackgroundColor: isEmpty ? ["#e2e8f0"] : COLORS,
          hoverOffset: 4, // ✅ Standard Pop-out
          borderWidth: 2, // ✅ White Borders
          borderColor: "#ffffff",
        },
      ],
    };

    return { chartData: data, total, values, isEmpty };
  }, [last24HoursActivity]);

  // ✅ Same Options as PlanDistributionChart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%", // ✅ Thick Ring (Official Docs Style)
    plugins: {
      legend: {
        display: false, // Custom Legend Niche hai
      },
      tooltip: {
        enabled: !isEmpty,
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 13, weight: "bold" },
        displayColors: true,
        callbacks: {
          label: (context) => {
            const val = context.parsed;
            const pct = ((val / total) * 100).toFixed(1);
            return ` ${val} Events (${pct}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <Card className="rounded-xl border-slate-200 shadow-sm bg-slate-50 overflow-hidden h-full flex flex-col">
      {/* ── Header ── */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-black flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-brand-aqua" />
          Last 24 Hours Activity
        </CardTitle>
        <p className="text-xs uppercase font-bold text-slate-400 tracking-widest pl-6">
          Overview of daily events
        </p>
      </CardHeader>

      <CardContent className="px-6 pb-6 flex-1 flex flex-col gap-6">
        {/* ── 1. Chart Section (Top) ── */}
        <div className="h-[200px] w-full flex justify-center items-center">
          <div className="w-[180px] h-[180px]">
            <Doughnut data={chartData} options={options} />
          </div>
        </div>

        {/* ── 2. Legend Section (Bottom List) ── */}
        <div className="flex flex-col gap-2 w-full">
          {isEmpty ? (
            <p className="text-center text-xs text-slate-400">
              No activity recorded
            </p>
          ) : (
            LABELS.map((label, i) => {
              const val = values[i];
              const pct = ((val / total) * 100).toFixed(0);

              return (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    {/* Square Color Box */}
                    <span
                      className="w-3 h-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-xs font-medium text-slate-600">
                      {label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      {val}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Last24HoursPieChart;
