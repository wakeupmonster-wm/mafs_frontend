import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Register Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Official Chart.js Style Colors (Bright & Distinct)
const COLORS = [
  "rgb(54, 162, 235)", // Blue
  "rgb(255, 99, 132)", // Red
  "rgb(255, 205, 86)", // Yellow
  "rgb(75, 192, 192)", // Teal
  "rgb(153, 102, 255)", // Purple
  "rgb(255, 159, 64)", // Orange
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
          label: "Active Users",
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
          },
        },
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
            <p className="text-center text-xs text-slate-400">
              No data available
            </p>
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
