import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const Sparkline = ({ data, color, isPositive }) => {
  const chartData = data.map((val, i) => ({ value: val, id: i }));
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="h-[50px] w-[90px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "#2dd4bf" : "#f43f5e"}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={isPositive ? "#2dd4bf" : "#f43f5e"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#2dd4bf" : "#f43f5e"}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const GenderRatioBar = ({ ratio }) => {
  const segments = [1, 2, 3, 4, 5];
  const filledCount = Math.round((ratio / 100) * 5);

  return (
    <div className="flex gap-1.5 mt-4">
      {segments.map((s) => (
        <div
          key={s}
          className={`h-2.5 w-6 rounded-[2px] transition-all duration-500 ${
            s <= filledCount ? "bg-cyan-400" : "bg-cyan-50"
          }`}
        />
      ))}
    </div>
  );
};

export function KeyMetricsHealth({ data }) {
  if (!data) return null;

  return (
    <div className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-base font-bold text-primary group flex items-center gap-2">
            Key Metrics
            <span className="text-[11px] font-medium text-muted-foreground ml-1">
              Quick overview of platform health
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-5 hover:border-brand-aqua/50 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${metric.isRatio ? "bg-cyan-400" : metric.label.includes("Revenue") ? "bg-emerald-400" : metric.label.includes("Drop-off") ? "bg-rose-400" : "bg-emerald-400"}`}
              />
              <span className="text-xs font-bold text-foreground">
                {metric.label}
              </span>
            </div>

            <div className="relative flex flex-col justify-between items-start">
              <div className="w-full flex justify-between items-center space-y-1">
                <h3 className="text-xl font-black text-foreground leading-none">
                  {metric.value}
                </h3>

                {!metric.isRatio ? (
                  <Sparkline
                    data={metric.chartData}
                    isPositive={metric.isPositive}
                  />
                ) : (
                  <div className="h-[50px] flex items-center">
                    <GenderRatioBar ratio={metric.ratioValue} />
                  </div>
                )}
              </div>

              <div className="w-full flex items-center justify-between gap-2">
                <p className="text-[11px] text-muted-foreground font-medium">
                  {metric.sub}
                </p>

                {metric.trend && (
                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-[6px] text-[12px] font-bold ${
                      metric.isPositive
                        ? "bg-[#f0fdf4] text-[#16a34a]"
                        : "bg-[#fef2f2] text-[#dc2626]"
                    }`}
                  >
                    {metric.isPositive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {metric.trend}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
