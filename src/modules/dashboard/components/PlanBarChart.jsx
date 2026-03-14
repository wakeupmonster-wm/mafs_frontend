import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  CartesianGrid,
} from "recharts";
import { EmptyState } from "./EmptyState";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 border border-border/50 shadow-xl">
      <p className="text-sm font-semibold text-foreground capitalize">
        {label}
      </p>
      <p className="text-xs text-muted-foreground">
        ${payload[0].value.toFixed(2)} · {payload[0].payload.count} subs
      </p>
    </div>
  );
};

export default function PlanBarChart({ data }) {
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No Data"
        description="No plan performance data found."
      />
    );

  // Formatting revenue for labels
  const formatValue = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const formatted = (data || []).map((d) => ({
    ...d,
    plan: d._id.charAt(0).toUpperCase() + d._id.slice(1),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* <BarChart
        data={data}
        layout="vertical"
        margin={{ left: -20, right: 40, top: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey="_id"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{
            fontSize: 12,
            fontWeight: 600,
            fill: "#64748b",
            textTransform: "capitalize",
          }}
          width={80}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            fontFamily: "Plus Jakarta Sans",
          }}
          formatter={(value) => [formatValue(value), "Revenue"]}
        />
        <Bar
          dataKey="revenue"
          radius={[0, 8, 8, 0]}
          barSize={24}
          animationDuration={1500}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // Highlight top plan with brand color, others with slate
              fill={index === 0 ? "#00cfd5" : "#e2e8f0"}
            />
          ))}
          <LabelList
            dataKey="revenue"
            position="right"
            formatter={formatValue}
            style={{
              fontSize: 11,
              fontWeight: 700,
              fill: "#475569",
              fontFamily: "Plus Jakarta Sans",
            }}
          />
        </Bar>
      </BarChart> */}
      <BarChart
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
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
