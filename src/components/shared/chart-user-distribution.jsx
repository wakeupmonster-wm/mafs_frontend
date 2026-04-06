import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/shared/date-range-picker";

export function ChartUserDistribution() {
  const data = [
    { name: "Free", value: 72, color: "#3b82f6" },
    { name: "Premium (1 month)", value: 16, color: "#f472b6" },
    { name: "Premium (3 month)", value: 12, color: "#8b5cf6" },
  ];

  return (
    <Card className="rounded-[20px] shadow-md bg-slate-50 border border-slate-200 w-full h-full flex flex-col pt-5">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-0 px-6 gap-2">
        <CardTitle className="text-[17px] font-semibold text-slate-900 tracking-normal shrink-0">
          User Type Distribution
        </CardTitle>
        <CalendarDateRangePicker className="shrink-0" compact />
      </CardHeader>

      <CardContent className="px-6 pb-6 flex-1 flex flex-col justify-between">
        {/* Doughnut Chart wrapper */}
        <div className="relative flex justify-center items-center h-[266px] mt-2 mb-4">
          <PieChart width={240} height={240}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={0}
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
                      {payload[0].name}: {payload[0].value}%
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>

          {/* Inner Text overlay for Doughnut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[26px] font-black text-slate-900 leading-none tracking-tight">
              13K
            </span>
            <span className="text-[12px] font-medium text-slate-400 mt-1">
              Total Users
            </span>
          </div>
        </div>

        {/* Custom Legend at the bottom mimicking the reference image */}
        <div className="flex justify-between items-center w-full px-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 items-start">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span
                  className="text-[11px] font-medium text-slate-500 line-clamp-1 truncate max-w-[80px]"
                  title={item.name}
                >
                  {item.name}
                </span>
              </div>
              <span className="text-[18px] font-bold text-slate-800 ml-[12px] leading-none">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
