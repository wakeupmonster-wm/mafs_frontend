import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { EmptyState } from "./EmptyState";

export default function PlanBarChart({ data }) {
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No Data"
        description="No plan performance data found."
      />
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
        <XAxis type="number" hide />
        <YAxis
          dataKey="_id"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fontWeight: 500 }}
        />
        <Tooltip
          cursor={{ fill: "#f1f5f9" }}
          contentStyle={{ borderRadius: "8px", border: "none" }}
        />
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? "#6366f1" : "#cbd5e1"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
