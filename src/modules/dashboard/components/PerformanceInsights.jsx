import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PerformanceInsights({ data }) {
  if (!data) return null;

  return (
    <Card className="flex flex-col h-full bg-slate-50 border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 shadow-sm">
      <CardHeader className="pb-4 gap-1">
        <CardTitle className="text-base font-bold text-primary">
          Performance Insights
        </CardTitle>
        <CardDescription className="text-[11px] text-muted-foreground">
          What's working, what needs focus
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-5">
        {data.metrics.map((metric, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] font-bold text-slate-700">
                {metric.label}
              </span>
              <span className="text-[14px] font-black text-slate-900">
                {metric.value}
              </span>
            </div>
            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              {/* Custom progress implementation to support dynamic colors more easily while staying shadcn-like */}
              <div
                className="h-full rounded-full transition-all duration-1000 ease-in-out"
                style={{
                  width: `${metric.percentage}%`,
                  backgroundColor: metric.color,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="pt-4">
        <div className="w-full mt-2 flex items-center gap-3 px-4 py-3 bg-brand-aqua/10 border border-brand-aqua/40 rounded-xl text-muted-foreground text-[10px] font-bold leading-snug">
          {/* <Info size={12} className="text-[#46C7CD] shrink-0" /> */}
          {data.insight}
        </div>
      </CardFooter>
    </Card>
  );
}
