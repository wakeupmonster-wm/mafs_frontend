import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

export function LiveActivity({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 hover:border-brand-aqua/50 transition-all duration-300 rounded-2xl p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-primary">Live Activity</h3>
        {/* <Link
          href="#"
          className="text-sm font-bold text-[#46C7CD] hover:underline"
        >
          View all
        </Link> */}
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">{data.subtitle}</p>

      <ScrollArea className="flex-1 -mr-2 pr-4 max-h-[270px] overflow-clip">
        <div className="space-y-4">
          {data.events.map((event) => (
            <div key={event.id} className="flex items-center gap-4">
              <span className="text-[11px] font-semibold text-secondary-foreground whitespace-nowrap min-w-[60px] pt-1">
                {event.time}
              </span>

              <div className="relative min-w-[10px]">
                <div
                  className="w-1.5 h-1.5 rounded-full z-10 relative"
                  style={{ backgroundColor: event.color }}
                />
              </div>

              <p className="text-xs font-bold text-slate-700 leading-tight">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 flex items-center gap-2 px-3 py-3 bg-[#f0fcfd] border border-[#d1f7f9] rounded-xl text-muted-foreground text-[10px] font-semibold">
        <Info size={14} className="text-slate-400" />
        Activity Insight Placeholder
      </div>
    </div>
  );
}
