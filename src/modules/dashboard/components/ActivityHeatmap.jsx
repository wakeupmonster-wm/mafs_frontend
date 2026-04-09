import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const getIntensityColor = (intensity) => {
  switch (intensity) {
    case 3:
      return "bg-[#2eb7bd]"; // High
    case 2:
      return "bg-[#80d8dd]"; // Medium
    case 1:
      return "bg-[#cceef0]"; // Low
    case 0:
      return "bg-slate-50"; // Very Low
    default:
      return "bg-slate-50";
  }
};

const getIntensityLabel = (intensity) => {
  switch (intensity) {
    case 3:
      return "High Activity";
    case 2:
      return "Medium Activity";
    case 1:
      return "Low Activity";
    case 0:
      return "No Activity";
    default:
      return "";
  }
};

export function ActivityHeatmap({ data }) {
  if (!data) return null;

  return (
    <Card className="flex flex-col h-full bg-slate-50 border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 shadow-sm">
      <CardHeader className="pb-4 gap-1">
        <CardTitle className="text-base font-bold text-primary">
          Peak Activity Heatmap
        </CardTitle>
        <CardDescription className="text-[11px] text-muted-foreground">
          When your users are most active
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-2">
        <TooltipProvider>
          <div className="flex flex-col gap-2">
            {data.days.map((day, dayIdx) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 w-8">
                  {day}
                </span>
                <div className="flex-1 grid grid-cols-8 gap-1.5">
                  {data.data[dayIdx].map((intensity, timeIdx) => {
                    const timeLabel = data.times[timeIdx];
                    return (
                      <Tooltip key={timeIdx}>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-[26px] rounded-sm transition-all duration-300 hover:scale-110 cursor-pointer ${getIntensityColor(intensity)}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 text-white border-none text-[10px] font-bold">
                          {day} @ {timeLabel}: {getIntensityLabel(intensity)}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>

        <div className="flex items-center gap-3 ml-11 mt-1">
          <div className="flex-1 grid grid-cols-8 gap-1.5">
            {data.times.map((time, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold text-slate-400 text-center"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Low
          </span>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm bg-[#cceef0]" />
            <div className="w-3.5 h-3.5 rounded-sm bg-[#80d8dd]" />
            <div className="w-3.5 h-3.5 rounded-sm bg-[#2eb7bd]" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            High
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        {/* <div className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#f0fcfd] border border-[#d1f7f9] rounded-xl text-slate-700 text-[11.5px] font-bold shadow-sm"> */}
        <div className="w-full mt-2 flex items-center gap-3 px-4 py-3 bg-brand-aqua/10 border border-brand-aqua/40 rounded-xl text-muted-foreground text-[10px] font-bold leading-snug">
          {/* <Info size={12} className="text-[#46C7CD] shrink-0" /> */}
          {data.insight}
        </div>
      </CardFooter>
    </Card>
  );
}
