import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export function ChartUserDistribution() {
  const data = [
    { name: "Active Users", value: 62, color: "hsl(182, 59%, 54%)" }, // Brand aqua main
    { name: "Deactivated", value: 20, color: "hsl(160, 60%, 45%)" }, // Deep emerald
    { name: "Deleted", value: 7, color: "hsl(200, 70%, 50%)" }, // Solid sky blue
    { name: "Suspended", value: 9, color: "hsl(35, 92%, 55%)" }, // Solid orange
    { name: "Banned", value: 2, color: "hsl(348, 83%, 55%)" }, // Deep red
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const activeItem = data[activeIndex];

  return (
    <Card className="rounded-2xl shadow-sm bg-slate-50 gap-0 border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 w-full h-full flex flex-col py-5">
      <CardHeader className="flex flex-row items-center justify-between pt-0 px-6 pb-4">
        <CardTitle className="text-base font-bold text-primary">
          User Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col lg:flex-row items-center gap-4 px-6 pb-6">
        {/* Left Side: Doughnut Chart */}
        <div className="relative flex justify-center items-center h-[240px] w-full lg:w-7/12">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart style={{ outline: "none" }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
                stroke="white"
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
                onClick={(_, index) => setActiveIndex(index)}
                className="cursor-pointer outline-none"
                style={{ outline: "none" }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === index ? 1 : 0.8}
                    style={{ outline: "none" }}
                    className="transition-all duration-300 hover:opacity-100 border-none ring-0 focus-visible:ring-0 focus-visible:outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Inner Text Center overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[32px] font-black text-[#1e293b] leading-tight tracking-tight transition-all duration-300">
              {activeItem.value}%
            </span>
            <span className="text-[13px] font-semibold text-slate-500 transition-all duration-300">
              {activeItem.name}
            </span>
          </div>
        </div>

        {/* Right Side: Legend List with Progress Bars */}
        <div className="flex-1 flex flex-col gap-3 w-full pl-0">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1.5 cursor-pointer transition-all duration-300 ${activeIndex === index ? "opacity-100 scale-[1.02]" : "opacity-80 hover:opacity-100"}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className={`text-[12px] ${activeIndex === index ? "font-bold text-slate-800" : "font-medium text-slate-600"}`}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  className={`text-[12px] ${activeIndex === index ? "font-bold text-slate-800" : "font-semibold text-slate-600"}`}
                >
                  {item.value}%
                </span>
              </div>

              {/* Progress Bar under the text */}
              <div
                className="w-full h-1.5 bg-slate-300 rounded-full overflow-hidden ml-[24px]"
                style={{ width: "calc(100% - 24px)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Info Banner Footer */}
      <CardFooter className="pt-0 pb-[23px] px-5">
        <div className="w-full flex items-center gap-3 px-4 py-3 bg-brand-aqua/5 border border-brand-aqua/20 rounded-xl text-slate-600 text-[13px] font-medium transition-all duration-300">
          <Info size={16} className="text-brand-aqua shrink-0" />
          <span>
            <strong className="text-slate-800">{activeItem.name}</strong>{" "}
            represent {activeItem.value}% of total users
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
