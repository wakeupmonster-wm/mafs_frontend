import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export default function RadialStatCard({
  title,
  total = 0,
  maxValue,
  startAngle,
  color = "hsl(172, 66%, 50%)",
}) {
  const max = maxValue || Math.max(total * 1.5, 1);
  const percentage = Math.min((total / max) * 100, 100);

  const data = [{ value: percentage, fill: color }];

  return (
    <div className="border border-brand-aqua/40 shadow-lg rounded-2xl p-4 flex flex-col items-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </span>
      <div className="w-36 h-36 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={startAngle}
            endAngle={-45}
            data={data}
            barSize={10}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={5}
              background={{ fill: "hsl(0 100% 65%)" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
