import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Info } from "lucide-react";

export const ConversionFunnel = ({ data }) => {
  if (!data) return null;

  // Parameters to control the funnel shape
  const totalStages = data.stages.length;
  // We'll define the width at the very top and very bottom
  // and interpolate for segments in between.
  const startWidth = 100; // top of first segment
  const endWidth = 40; // bottom of last segment

  // How much the width decreases across the entire funnel
  const totalReduction = startWidth - endWidth;
  // Reduction per segment
  const reductionPerSegment = totalReduction / totalStages;

  return (
    <Card className="flex flex-col h-full bg-slate-50 border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 gap-1">
        <CardTitle className="text-base font-bold text-primary">
          Conversion Funnel
        </CardTitle>
        <CardDescription className="text-[11px] font-medium text-muted-foreground">
          Where users drop off
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-0">
        <div className="flex-1 flex flex-col pt-1">
          {data.stages.map((stage, idx) => {
            // Calculate the top and bottom widths for this specific trapezoid
            const currentTop = startWidth - idx * reductionPerSegment;
            const currentBottom = startWidth - (idx + 1) * reductionPerSegment;

            // Convert width to percentage strings for clip-path
            // We center the trapezoid, so we need to calculate the offset (x)
            const x1 = (100 - currentTop) / 2;
            const x2 = 100 - x1;
            const x3 = 100 - (100 - currentBottom) / 2;
            const x4 = (100 - currentBottom) / 2;

            return (
              <div
                key={idx}
                className="grid grid-cols-[1fr_60px_60px] items-center group min-h-[52px]"
              >
                {/* Funnel Segment */}
                <div className="relative h-full flex items-center justify-center">
                  <div
                    className="w-full h-full flex items-center justify-center shadow-inner transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: stage.color,
                      clipPath: `polygon(${x1}% 2%, ${x2}% 2%, ${x3}% 100%, ${x4}% 100%)`,
                    }}
                  >
                    <span className="text-[13px] font-bold text-[#1e293b] opacity-90 text-center px-4 leading-tight">
                      {stage.label}
                    </span>
                  </div>
                </div>

                {/* Value (Count) */}
                <div className="pl-3 text-[15px] font-bold text-[#202939]">
                  {stage.value.toLocaleString()}
                </div>

                {/* Drop-off Percentage */}
                <div className="text-right">
                  {stage.dropOff !== 0 && (
                    <span className="text-[15px] font-extrabold text-[#F75555]">
                      {stage.dropOff}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Insight Box */}
        <div className="mt-2 flex items-center gap-3 px-4 py-3 bg-brand-aqua/10 border border-brand-aqua/40 rounded-xl text-muted-foreground text-[10px] font-bold leading-snug">
          {/* <Info size={15} className="text-[#46C7CD] shrink-0" /> */}
          {data.insight}
        </div>
      </CardContent>
    </Card>
  );
};
