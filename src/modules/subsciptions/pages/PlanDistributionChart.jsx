// // import React, { useMemo } from "react";
// // import { Doughnut } from "react-chartjs-2";
// // import {
// //     Chart as ChartJS,
// //     ArcElement,
// //     Tooltip,
// //     Legend,
// // } from "chart.js";
// // import { Layers } from "lucide-react";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // // Register Chart.js
// // ChartJS.register(ArcElement, Tooltip, Legend);

// // // ✅ Fixed Bright Colors (Kabhi Black nahi aayega)
// // const COLORS = [
// //     "#06b6d4", // Cyan
// //     "#8b5cf6", // Violet
// //     "#f43f5e", // Rose
// //     "#f59e0b", // Amber
// //     "#10b981", // Emerald
// //     "#3b82f6", // Blue
// // ];

// // const PlanDistributionChart = ({ planData = [] }) => {

// //     // ✅ Data Processing
// //     const { chartData, total, names, values, colors } = useMemo(() => {
// //         const names = [];
// //         const values = [];
// //         const colors = [];

// //         (planData || []).forEach((item, i) => {
// //             names.push(item.name || `Plan ${i + 1}`);
// //             values.push(Number(item.subscribers || 0));
// //             // Loop through colors safely
// //             colors.push(COLORS[i % COLORS.length]);
// //         });

// //         const total = values.reduce((a, b) => a + b, 0);

// //         const data = {
// //             labels: names,
// //             datasets: [
// //                 {
// //                     data: total === 0 ? [1] : values, // Empty state handling
// //                     backgroundColor: total === 0 ? ["#f1f5f9"] : colors,
// //                     hoverBackgroundColor: total === 0 ? ["#f1f5f9"] : colors,
// //                     borderWidth: 4,
// //                     borderColor: "#ffffff",
// //                     hoverOffset: 10, // Hover pe pop-out effect
// //                     borderRadius: 8,
// //                     cutout: "65%", // Doughnut style (modern look)
// //                 },
// //             ],
// //         };

// //         return { chartData: data, total, names, values, colors };
// //     }, [planData]);

// //     // ✅ Chart Options
// //     const options = {
// //         responsive: true,
// //         maintainAspectRatio: false,
// //         plugins: {
// //             legend: {
// //                 display: false, // Default legend hide kiya
// //             },
// //             tooltip: {
// //                 enabled: total > 0,
// //                 backgroundColor: "rgba(15, 23, 42, 0.95)",
// //                 titleFont: { size: 13, family: "Inter" },
// //                 bodyFont: { size: 14, weight: "bold", family: "Inter" },
// //                 padding: 14,
// //                 cornerRadius: 12,
// //                 displayColors: true,
// //                 usePointStyle: true,
// //                 callbacks: {
// //                     label: (context) => {
// //                         const val = context.parsed;
// //                         const pct = ((val / total) * 100).toFixed(1);
// //                         return `  ${val} Users (${pct}%)`;
// //                     },
// //                 },
// //             },
// //         },
// //         animation: {
// //             animateScale: true,
// //             animateRotate: true,
// //         },
// //     };

// //     // ✅ Center Text Plugin (Optional: Donut ke beech me Total dikhane ke liye)
// //     const centerText = {
// //         id: "centerText",
// //         beforeDraw: (chart) => {
// //             if (total === 0) return;
// //             const { ctx, width, height } = chart;
// //             ctx.restore();
// //             const fontSize = (height / 100).toFixed(2);
// //             ctx.font = `900 1.5em sans-serif`;
// //             ctx.textBaseline = "middle";
// //             ctx.fillStyle = "#1e293b";

// //             const text = total.toString();
// //             const textX = Math.round((width - ctx.measureText(text).width) / 2);
// //             const textY = height / 2;

// //             ctx.fillText(text, textX, textY);
// //             ctx.save();
// //         },
// //     };

// //     return (
// //         <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden h-full flex flex-col">

// //             {/* ── Header ── */}
// //             <CardHeader className="pb-2">
// //                 <CardTitle className="text-sm font-black flex items-center gap-2">
// //                     <Layers className="w-4 h-4 text-brand-aqua" />
// //                     Plan Distribution
// //                 </CardTitle>
// //                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-6">
// //                     Active Subscription Tiers
// //                 </p>
// //             </CardHeader>

// //             <CardContent className="px-6 pb-6 flex-1 flex flex-col gap-6">

// //                 {/* ── 1. Top: Chart Section ── */}
// //                 <div className="h-[180px] w-full flex justify-center items-center relative">
// //                     <div className="w-[180px] h-full">
// //                         <Doughnut
// //                             data={chartData}
// //                             options={options}
// //                             plugins={[centerText]} // Remove this line if you want simple Pie
// //                         />
// //                     </div>
// //                 </div>

// //                 {/* ── 2. Bottom: Legend Section (List) ── */}
// //                 <div className="flex flex-col gap-2 w-full">
// //                     {total === 0 ? (
// //                         <p className="text-center text-xs text-slate-400">No data available</p>
// //                     ) : (
// //                         names.map((name, i) => {
// //                             const pct = ((values[i] / total) * 100).toFixed(0);
// //                             return (
// //                                 <div
// //                                     key={i}
// //                                     className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
// //                                 >
// //                                     {/* Left: Dot & Name */}
// //                                     <div className="flex items-center gap-2.5 overflow-hidden">
// //                                         <span
// //                                             className="w-3 h-3 rounded-full shrink-0 shadow-sm"
// //                                             style={{ backgroundColor: colors[i] }}
// //                                         />
// //                                         <span className="text-[11px] font-bold text-slate-600 truncate">
// //                                             {name}
// //                                         </span>
// //                                     </div>

// //                                     {/* Right: Value & Percent */}
// //                                     <div className="flex items-baseline gap-1.5 shrink-0">
// //                                         <span className="text-sm font-black text-slate-900">
// //                                             {values[i]}
// //                                         </span>
// //                                         <span className="text-[10px] font-bold text-slate-400">
// //                                             ({pct}%)
// //                                         </span>
// //                                     </div>
// //                                 </div>
// //                             );
// //                         })
// //                     )}
// //                 </div>

// //             </CardContent>
// //         </Card>
// //     );
// // };

// // export default PlanDistributionChart;



// import React, { useMemo } from "react";
// import { Doughnut } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { Layers } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // Register Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend);

// // ✅ Official Chart.js Style Colors (Bright & Distinct)
// const COLORS = [
//     "rgb(255, 99, 132)",   // Red
//     "rgb(54, 162, 235)",   // Blue
//     "rgb(255, 205, 86)",   // Yellow
//     "rgb(75, 192, 192)",   // Teal
//     "rgb(153, 102, 255)",  // Purple
//     "rgb(255, 159, 64)",   // Orange
// ];

// const PlanDistributionChart = ({ planData = [] }) => {

//     const { chartData, total, names, values, bgColors } = useMemo(() => {
//         const names = [];
//         const values = [];
//         const bgColors = [];

//         (planData || []).forEach((item, i) => {
//             names.push(item.name || `Plan ${i + 1}`);
//             values.push(Number(item.subscribers || 0));
//             bgColors.push(COLORS[i % COLORS.length]);
//         });

//         const total = values.reduce((a, b) => a + b, 0);

//         const data = {
//             labels: names,
//             datasets: [
//                 {
//                     label: 'Active Users',
//                     data: total === 0 ? [1] : values,
//                     backgroundColor: total === 0 ? ["#e2e8f0"] : bgColors,
//                     hoverOffset: 4, // ✅ Standard Chart.js pop-out effect
//                     borderWidth: 2, // ✅ White borders between slices
//                     borderColor: "#ffffff",
//                 },
//             ],
//         };

//         return { chartData: data, total, names, values, bgColors };
//     }, [planData]);

//     // ✅ Simple Standard Options (Like Official Docs)
//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         cutout: "50%", // ✅ Thicker Ring (Official Style)
//         plugins: {
//             legend: {
//                 display: false, // Custom legend niche dikhayenge (Better control)
//             },
//             tooltip: {
//                 enabled: total > 0,
//                 backgroundColor: "rgba(0,0,0,0.8)",
//                 padding: 12,
//                 titleFont: { size: 13 },
//                 bodyFont: { size: 13, weight: "bold" },
//                 callbacks: {
//                     label: (context) => {
//                         const val = context.parsed;
//                         const pct = ((val / total) * 100).toFixed(1);
//                         return ` ${context.label}: ${val} (${pct}%)`;
//                     }
//                 }
//             },
//         },
//         animation: {
//             animateScale: true,
//             animateRotate: true,
//         },
//     };

//     return (
//         <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden h-full flex flex-col">

//             {/* ── Header ── */}
//             <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-black flex items-center gap-2">
//                     <Layers className="w-4 h-4 text-brand-aqua" />
//                     Plan Distribution
//                 </CardTitle>
//                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-6">
//                     Active Subscription Tiers
//                 </p>
//             </CardHeader>

//             <CardContent className="px-6 pb-6 flex-1 flex flex-col gap-6">

//                 {/* ── 1. Chart Section (Standard Look) ── */}
//                 <div className="h-[200px] w-full flex justify-center items-center">
//                     <div className="w-[180px] h-[180px]">
//                         <Doughnut data={chartData} options={options} />
//                     </div>
//                 </div>

//                 {/* ── 2. Legend Section (Bottom List) ── */}
//                 <div className="flex flex-col gap-2 w-full">
//                     {total === 0 ? (
//                         <p className="text-center text-xs text-slate-400">No data available</p>
//                     ) : (
//                         names.map((name, i) => {
//                             const pct = ((values[i] / total) * 100).toFixed(0);
//                             return (
//                                 <div
//                                     key={i}
//                                     className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100"
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         {/* Standard Square Box Legend like Docs */}
//                                         <span
//                                             className="w-3 h-3 shrink-0"
//                                             style={{ backgroundColor: bgColors[i] }}
//                                         />
//                                         <span className="text-xs font-medium text-slate-600">
//                                             {name}
//                                         </span>
//                                     </div>

//                                     <div className="flex items-center gap-2">
//                                         <span className="text-sm font-bold text-slate-800">
//                                             {values[i]}
//                                         </span>
//                                         <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
//                                             {pct}%
//                                         </span>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     )}
//                 </div>

//             </CardContent>
//         </Card>
//     );
// };

// export default PlanDistributionChart;


import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Register Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Official Chart.js Style Colors (Bright & Distinct)
const COLORS = [
    "rgb(54, 162, 235)",   // Blue
    "rgb(255, 99, 132)",   // Red
    "rgb(255, 205, 86)",   // Yellow
    "rgb(75, 192, 192)",   // Teal
    "rgb(153, 102, 255)",  // Purple
    "rgb(255, 159, 64)",   // Orange
];

const PlanDistributionChart = ({ planData = [] }) => {

    const { chartData, total, names, values, bgColors } = useMemo(() => {
        const names = [];
        const values = [];
        const bgColors = [];

        (planData || []).forEach((item, i) => {
            names.push(item.name || `Plan ${i + 1}`);
            values.push(Number(item.subscribers || 0));
            bgColors.push(COLORS[i % COLORS.length]);
        });

        const total = values.reduce((a, b) => a + b, 0);

        const data = {
            labels: names,
            datasets: [
                {
                    label: 'Active Users',
                    data: total === 0 ? [1] : values,
                    backgroundColor: total === 0 ? ["#e2e8f0"] : bgColors,
                    hoverOffset: 4, // ✅ Standard Chart.js pop-out
                    borderWidth: 2, // ✅ Clean white borders
                    borderColor: "#ffffff",
                },
            ],
        };

        return { chartData: data, total, names, values, bgColors };
    }, [planData]);

    // ✅ Fixed Options (No Double Name)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "50%", // ✅ Official Doughnut look
        plugins: {
            legend: {
                display: false, // Custom legend niche hai
            },
            tooltip: {
                enabled: total > 0,
                backgroundColor: "rgba(0,0,0,0.8)", // Dark background
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 14, weight: "bold" },
                bodyFont: { size: 13 },
                displayColors: true, // Show small color box in tooltip
                callbacks: {
                    // ✅ FIX: Sirf Value aur Percentage return karo. Name mat return karo.
                    // Chart.js automatically Name ko Title mein dikhata hai.
                    label: (context) => {
                        const val = context.parsed;
                        const pct = ((val / total) * 100).toFixed(1);
                        return ` ${val} Users (${pct}%)`;
                    }
                }
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    };

    return (
        <Card className="rounded-[2rem] border-brand-aqua/40 hover:border-brand-aqua/80 transition-all duration-500 shadow-md bg-white overflow-hidden h-full flex flex-col">

            {/* ── Header ── */}
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-aqua" />
                    Plan Distribution
                </CardTitle>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-6">
                    Active Subscription Tiers
                </p>
            </CardHeader>

            <CardContent className="px-6 pb-6 flex-1 flex flex-col gap-6">

                {/* ── 1. Chart Section (Top) ── */}
                <div className="h-[200px] w-full flex justify-center items-center">
                    <div className="w-[180px] h-[180px]">
                        <Doughnut data={chartData} options={options} />
                    </div>
                </div>

                {/* ── 2. Legend Section (Bottom) ── */}
                <div className="flex flex-col gap-2 w-full">
                    {total === 0 ? (
                        <p className="text-center text-xs text-slate-400">No data available</p>
                    ) : (
                        names.map((name, i) => {
                            const pct = ((values[i] / total) * 100).toFixed(0);
                            return (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Square Box Legend (Docs Style) */}
                                        <span
                                            className="w-3 h-3 shrink-0 rounded-sm"
                                            style={{ backgroundColor: bgColors[i] }}
                                        />
                                        <span className="text-xs font-medium text-slate-600">
                                            {name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-800">
                                            {values[i]}
                                        </span>
                                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
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

export default PlanDistributionChart;