import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(182 59% 54%)",
  },
  female: {
    label: "Female",
    color: "hsl(182 59% 82%)", // Lighter brand aqua
  },
};

export function UserGrowthChart({ data }) {
  const [timeRange, setTimeRange] = useState("today");

  // Simulate local data fetching based on the local dropdown
  const displayData = useMemo(() => {
    if (!data) return null;

    // If it's today, return the exact global single day data.
    if (timeRange === "today") return data;

    let multiplier = 1;
    let labels = [];

    if (timeRange === "7d") {
      multiplier = 1;
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else if (timeRange === "30d") {
      multiplier = 4;
      labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    } else {
      // 3m
      multiplier = 12;
      labels = ["Jan", "Feb", "Mar"];
    }

    // Attempt to calculate average. If data format is strange, fallback to safely random values.
    const baseMale =
      (data.data?.reduce((acc, curr) => acc + (curr.male || 0), 0) || 50) /
      (data.data?.length || 1);
    const baseFemale =
      (data.data?.reduce((acc, curr) => acc + (curr.female || 0), 0) || 40) /
      (data.data?.length || 1);

    const newData = labels.map((label) => ({
      day: label,
      male: Math.max(
        1,
        Math.round(baseMale * multiplier * (1 + (Math.random() * 0.4 - 0.2))),
      ),
      female: Math.max(
        1,
        Math.round(baseFemale * multiplier * (1 + (Math.random() * 0.4 - 0.2))),
      ),
    }));

    return {
      ...data,
      subtitle:
        timeRange === "7d"
          ? "Daily signups for the last 7 days"
          : timeRange === "30d"
            ? "Weekly signups for the last 30 days"
            : "Monthly signups for the last 3 months",
      data: newData,
    };
  }, [data, timeRange]);

  if (!displayData) return null;

  return (
    <div className="bg-white border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 rounded-2xl p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-primary">
          User Growth by Gender
        </h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[110px] h-8 text-xs font-semibold text-slate-500 hover:text-white bg-slate-50 hover:bg-brand-aqua border-slate-200 hover:border-transparent rounded-md transition-all duration-300 focus:ring-0 focus:ring-offset-0"
            aria-label="Select time range"
          >
            <SelectValue placeholder="7 Days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-200">
            <SelectItem value="today" className="text-xs">
              Today
            </SelectItem>
            <SelectItem value="7d" className="text-xs">
              7 Days
            </SelectItem>
            <SelectItem value="30d" className="text-xs">
              30 Days
            </SelectItem>
            <SelectItem value="3m" className="text-xs">
              3 Months
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-[11px] text-muted-foreground mb-6">
        {displayData.subtitle || "Daily signups for the last 7 days"}
      </p>

      <div className="flex-1 min-h-[240px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={displayData.data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, "dataMax + 10"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="male"
              stackId="a"
              fill="var(--color-male)"
              radius={[0, 0, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="female"
              stackId="a"
              fill="var(--color-female)"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <ChartLegend content={<ChartLegendContent />} className="mt-0" />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="mt-6 flex items-center gap-2 px-3 py-2.5 bg-[#f0fcfd] border border-[#d1f7f9] rounded-xl text-muted-foreground text-[10px] font-bold">
        {displayData.insight || "Male signups are up 18% this week"}
        <Info size={14} className="text-brand-aqua ml-auto" />
      </div>
    </div>
  );
}
