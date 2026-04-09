import * as React from "react";
import { subDays, format, startOfDay, endOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CalendarDateRangePicker({
  className,
  compact = false,
  onDateChange,
}) {
  const [date, setDate] = React.useState({
    from: startOfDay(new Date()),
    to: endOfDay(new Date()),
  });

  const [presetValue, setPresetValue] = React.useState("today");

  const handleSelect = (selected) => {
    setDate(selected);
    setPresetValue("custom");
    if (onDateChange) onDateChange(selected);
  };

  const handlePresetSelect = (value) => {
    setPresetValue(value);
    const today = startOfDay(new Date());
    const endOfToday = endOfDay(new Date());
    let newDate;

    switch (value) {
      case "today":
        newDate = { from: today, to: endOfToday };
        break;
      case "yesterday":
        const yesterday = subDays(today, 1);
        newDate = { from: yesterday, to: endOfDay(yesterday) };
        break;
      case "last3days":
        newDate = { from: subDays(today, 3), to: endOfToday };
        break;
      case "last7days":
        newDate = { from: subDays(today, 7), to: endOfToday };
        break;
      case "last30days":
        newDate = { from: subDays(today, 30), to: endOfToday };
        break;
      default:
        break;
    }

    if (newDate) {
      newDate.preset =
        value === "last3days"
          ? "last3"
          : value === "last7days"
            ? "last7"
            : value === "last30days"
              ? "last30"
              : value;
      setDate(newDate);
      if (onDateChange) onDateChange(newDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start group text-left font-medium bg-white hover:bg-brand-aqua text-slate-500 border border-slate-200 hover:border-transparent transition-all duration-300 shadow-sm hover:text-white rounded-lg",
              compact
                ? "w-auto h-8 text-[12px] px-2.5"
                : "max-w-xs h-9 text-[13px]",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon
              className={cn(
                "text-slate-400 group-hover:text-white shrink-0",
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
        <PopoverContent
          className="w-auto p-0 rounded-xl flex flex-col sm:flex-row"
          align="end"
        >
          <div className="flex flex-col gap-2 p-3 border-b sm:border-b-0 sm:border-r border-slate-200 min-w-[140px]">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Presets
            </span>
            <Select value={presetValue} onValueChange={handlePresetSelect}>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last3days">Last 3 Days</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="custom" disabled className="hidden">
                  Custom
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
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
