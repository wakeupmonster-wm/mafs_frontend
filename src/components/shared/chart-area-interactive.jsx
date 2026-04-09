import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { fetchDashboardKPIs } from "@/modules/dashboard/store/dashboard.slice";
import { cn } from "@/lib/utils";
import { PreLoader } from "@/app/loader/preloader";
import ErrorState from "./ErrorState";
import { AiFillAndroid } from "react-icons/ai";
import { IoLogoApple } from "react-icons/io5";
import { Button } from "../ui/button";

export const description = "Real-time visitor analytics";

const chartConfig = {
  android: {
    label: "Android",
    color: "#34d399",
  },
  ios: {
    label: "iOS",
    color: "#60a5fa",
  },
};

export function ChartAreaInteractive({ kpiData, loading, error }) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("7d");
  const [activeChart, setActiveChart] = useState("both");

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const generateChartData = (data) => {
    const result = [];
    const today = new Date();
    const baseActive = data?.activeUsers24h?.value || 1349;

    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const wave1 = Math.sin(i * 0.15) * 200;
      const wave2 = Math.cos(i * 0.1) * 300;
      const trend = ((90 - i) / 90) * baseActive;

      let ios = Math.round(trend * 0.6 + wave1 + 200);
      let android = Math.round(trend * 0.45 + wave2 + 100);

      ios += Math.random() * 50;
      android += Math.random() * 50;

      result.push({
        date: date.toISOString().split("T")[0],
        ios: Math.max(0, ios),
        android: Math.max(0, android),
      });
    }
    return result;
  };

  const fetchVisitorData = useCallback(async () => {
    dispatch(fetchDashboardKPIs());
  }, [dispatch]);

  useEffect(() => {
    fetchVisitorData();
    const interval = setInterval(fetchVisitorData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchVisitorData]);

  const chartData = useMemo(() => {
    return generateChartData(kpiData);
  }, [kpiData]);

  const filteredData = useMemo(() => {
    if (!chartData.length) return [];

    const referenceDate = new Date();
    let daysToSubtract = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;

    const startDate = new Date();
    startDate.setDate(referenceDate.getDate() - daysToSubtract);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [chartData, timeRange]);

  const totalActive = kpiData?.activeUsers24h?.value || 1349;
  const currentAndroid = Math.round(totalActive * 0.64);
  const currentIos = totalActive - currentAndroid;

  if (!loading && (!kpiData || Object.keys(kpiData).length === 0)) {
    return <div className="text-slate-500 text-sm">No data available</div>;
  }

  if (loading) {
    return (
      <Card className="rounded-[24px] shadow-sm bg-slate-50 border border-slate-200 flex-1">
        <CardContent className="h-[400px] flex items-center justify-center">
          <PreLoader />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <ErrorState error={error} fetchVisitorData={fetchVisitorData} />;
  }

  return (
    <Card className="rounded-2xl border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 shadow-sm py-5 bg-slate-50 overflow-hidden flex flex-col h-full gap-0">
      <CardHeader className="flex flex-row items-start justify-between px-6 pb-0 tracking-tight shrink-0">
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-base font-bold text-primary">
            Platform Visitors
          </CardTitle>

          <button
            onClick={() => setActiveChart("both")}
            className={cn(
              "flex items-center gap-2 outline-none transition-all duration-300 text-left",
              activeChart !== "both"
                ? "opacity-60 hover:opacity-100"
                : "opacity-100",
            )}
          >
            <div className="w-3 h-3 rounded-full bg-[#2dd4bf] shadow-sm shadow-teal-200/50" />
            <div className="flex items-baseline gap-1.5 ml-0.5">
              <span className="text-sm font-black text-slate-800 leading-none">
                {totalActive.toLocaleString()}
              </span>
              <span className="text-[17px] font-medium text-slate-500">
                online
              </span>
            </div>
          </button>
        </div>

        <div className="z-10 mt-0.5">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-[140px] h-8 rounded-lg border-slate-200 hover:border-transparent bg-white hover:bg-brand-aqua text-slate-600 hover:text-white transition-all duration-300 font-semibold text-xs shadow-sm focus:ring-0 focus:ring-offset-0"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-lg z-50">
              <SelectItem
                value="90d"
                className="rounded-lg text-[13px] font-medium py-2"
              >
                Last 3 months
              </SelectItem>
              <SelectItem
                value="30d"
                className="rounded-lg text-[13px] font-medium py-2"
              >
                Last 30 days
              </SelectItem>
              <SelectItem
                value="7d"
                className="rounded-lg text-[13px] font-medium py-2"
              >
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-end px-0 sm:px-2 pb-5 mt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[220px] w-full"
        >
          <AreaChart
            data={filteredData}
            margin={{ top: 20, left: -10, right: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillAndroid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillIos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e2e8f0"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={30}
              tick={{ fill: "#64748b", fontSize: 13, fontWeight: 500 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#64748b", fontSize: 13, fontWeight: 500 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {(activeChart === "both" || activeChart === "android") && (
              <Area
                dataKey="android"
                type="monotone"
                fill="url(#fillAndroid)"
                stroke="#2dd4bf"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  fill: "#ffffff",
                  stroke: "#2dd4bf",
                  strokeWidth: 3,
                }}
              />
            )}
            {(activeChart === "both" || activeChart === "ios") && (
              <Area
                dataKey="ios"
                type="monotone"
                fill="url(#fillIos)"
                stroke="#0d9488"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  fill: "#ffffff",
                  stroke: "#0d9488",
                  strokeWidth: 3,
                }}
              />
            )}
          </AreaChart>
        </ChartContainer>

        <div className="flex w-full mt-6 items-center justify-center gap-4 px-4 relative z-10">
          <Button
            className={cn(
              "flex items-center gap-2 cursor-pointer bg-teal-100/50 hover:bg-teal-200/50 shadow-sm px-4 py-2 rounded-xl transition-all duration-300 border border-teal-200",
              activeChart === "ios" ? "opacity-50" : "opacity-100",
            )}
            onClick={() =>
              setActiveChart(activeChart === "android" ? "both" : "android")
            }
          >
            <AiFillAndroid className="w-5 h-5 text-[#02baab]" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-bold text-slate-800">
                {currentAndroid.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-slate-600">
                Android
              </span>
            </div>
          </Button>

          <Button
            className={cn(
              "flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200/50 shadow-sm px-4 py-2 rounded-lg transition-all duration-300 border border-slate-300",
              activeChart === "android" ? "opacity-50" : "opacity-100",
            )}
            onClick={() =>
              setActiveChart(activeChart === "ios" ? "both" : "ios")
            }
          >
            <IoLogoApple className="w-[18px] h-[18px] mb-0.5 text-black" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-bold text-slate-800">
                {currentIos.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-slate-600">IOS</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
