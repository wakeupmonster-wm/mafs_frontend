import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Active", label: "Active Users", value: 67, color: "#60a5fa" },
  { name: "Banned", label: "Banned Users", value: 6, color: "#f87171" },
  { name: "Suspended", label: "Suspended Users", value: 9, color: "#fb923c" },
  { name: "Deactivated", label: "Deactivated Users", value: 15, color: "#34d399" },
  { name: "Deletion", label: "Deletion", value: 3, color: "#94a3b8" },
];

// Custom label with line pointing outward
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, name, value,
}) => {
  const radius = outerRadius + 38;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const entry = data.find((d) => d.name === name);

  return (
    <text
      x={x}
      y={y}
      fill={entry?.color || "#64748b"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${entry?.label || name}: ${value}%`}
    </text>
  );
};

const CustomLegend = () => (
  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 mt-3 px-2">
    {data.map((entry) => (
      <div key={entry.name} className="flex items-center gap-1.5">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-[12px] font-medium text-slate-600">
          {entry.name}
        </span>
      </div>
    ))}
  </div>
);

export function ChartUserStatusDistribution() {
  return (
    <Card className="rounded-[20px] shadow-md bg-slate-50 border border-slate-200 w-full h-full flex flex-col pt-5">
      <CardHeader className="pb-0 pt-0 px-6">
        <CardTitle className="text-[17px] font-semibold text-slate-900 tracking-tight text-center">
          User Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-5 flex-1 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center mt-2">
          <PieChart width={380} height={280}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              labelLine={true}
              label={renderCustomLabel}
              stroke="none"
              paddingAngle={1}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white p-2 px-3 rounded-lg text-[12px] font-medium shadow-xl">
                      {payload[0].payload.label}: {payload[0].value}%
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </div>
        <CustomLegend />
      </CardContent>
    </Card>
  );
}
