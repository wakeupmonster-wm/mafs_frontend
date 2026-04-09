import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Info } from "lucide-react";

export function RevenueBreakdown({ data }) {
  if (!data) return null;

  const chartConfig = {
    revenue: {
      label: "Revenue",
    },
    ...Object.fromEntries(
      data.categories.map((c, i) => [
        c.label.toLowerCase().replace(/\s+/g, "_"),
        { label: c.label, color: c.color },
      ]),
    ),
  };

  const chartData = data.categories.map((c) => ({
    name: c.label,
    value: c.value,
    fill: c.color,
  }));

  // 1. Pehle ek Custom Tooltip Component banayein
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="absolute -top-8 -left-1/2 translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 min-w-[200px] z-50">
          {/* Color Dot */}
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: data.fill }}
          />
          {/* Label and Value */}
          <div className="flex justify-between w-max items-center gap-4">
            <span className="text-slate-500 text-[15px] font-medium">
              {data.name}
            </span>
            <span className="text-slate-900 text-[15px] font-bold">
              {data.value.toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 rounded-2xl p-5 shadow-sm flex flex-col h-full">
      <h3 className="text-base font-bold text-primary">Revenue Breakdown</h3>
      <p className="text-[11px] text-muted-foreground mb-2">{data.subtitle}</p>

      <div className="flex flex-col xl:flex-row items-center gap-3 flex-1">
        <div className="relative w-full xl:w-1/2 aspect-square max-w-[190px] mx-auto xl:mx-0">
          {/* <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                stroke="none"
                paddingAngle={0.5}
                // cornerRadius={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-slate-900 text-2xl font-black"
                          >
                            {data.total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 18}
                            className="fill-slate-400 text-xs font-bold uppercase tracking-wider"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer> */}
          <ChartContainer
            config={chartConfig}
            className="h-full w-full relative"
          >
            <PieChart>
              <Tooltip
                content={<CustomTooltip />}
                // Mouse follow karne ke liye 'coordinate' mode use karein
                // ya center mein rakhne ke liye position fix karein
                position={{ y: 0, x: 0 }}
                cursor={false}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                stroke="none"
                paddingAngle={0}
                // Hover effect smooth karne ke liye transition
                animationBegin={0}
                animationDuration={400}
              >
                {/* Center Labels logic remains same */}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy - 5}
                            className="fill-slate-900 text-[26px] font-black"
                          >
                            ${data.total}k
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 18}
                            className="fill-slate-400 text-xs font-bold uppercase tracking-widest"
                          >
                            TOTAL
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        <div className="flex-1 w-full space-y-5">
          {data.categories.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 mb-0.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold text-slate-700">
                  {item.label}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <span className="text-md font-black text-foreground leading-tight">
                  ${item.displayValue}
                </span>
                <span className="text-xs font-bold text-secondary-foreground pb-0.5">
                  {item.percentage}%
                </span>
              </div>

              <div className="h-1.5 w-full bg-slate-300/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 px-3 py-2.5 bg-[#f0fcfd] border border-[#d1f7f9] rounded-xl text-muted-foreground text-[10px] font-bold">
        <div className="w-5 h-5 rounded-full flex items-center justify-center">
          <Info size={12} className="text-brand-aqua" />
        </div>
        {data.insight}
      </div>
    </div>
  );
}
