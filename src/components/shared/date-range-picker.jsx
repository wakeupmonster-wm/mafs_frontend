import * as React from "react";
import { subDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarDateRangePicker({
  className,
  compact = false,
  onDateChange,
}) {
  const [date, setDate] = React.useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const handleSelect = (selected) => {
    setDate(selected);
    if (onDateChange) onDateChange(selected);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-medium bg-white text-slate-600 border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-900 rounded-lg",
              compact
                ? "w-auto h-8 text-[12px] px-2.5"
                : "max-w-xs h-9 text-[13px]",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon
              className={cn(
                "text-slate-400 shrink-0",
                compact ? "mr-1.5 h-3.5 w-3.5" : "mr-2 h-4 w-4",
              )}
            />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM dd")} – {format(date.to, "MMM dd, y")}
                </>
              ) : (
                format(date.from, "MMM dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-xl" align="end">
          <Calendar
            initialFocus
            mode="range"
            captionLayout="dropdown"
            fromYear={2000}
            toYear={new Date().getFullYear()}
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
