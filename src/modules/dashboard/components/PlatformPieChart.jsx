import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { EmptyState } from "./EmptyState";

const COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981"];

export default function PlatformPieChart({ data }) {
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No Data"
        description="No platform distribution available."
      />
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="revenue"
          nameKey="_id"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Legend verticalAlign="bottom" height={36} iconType="circle" />
      </PieChart>
      {/* <BarChart
        data={formatted}
        margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(262, 60%, 60%)" stopOpacity={1} />
            <stop
              offset="100%"
              stopColor="hsl(262, 60%, 60%)"
              stopOpacity={0.4}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 16%)" />
        <XAxis
          dataKey="plan"
          tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
          axisLine={{ stroke: "hsl(222, 20%, 16%)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="revenue"
          fill="url(#barGrad)"
          radius={[6, 6, 0, 0]}
          maxBarSize={60}
        />
      </BarChart> */}
    </ResponsiveContainer>
  );
}
