import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";
import React from "react";

export function TableLoader({ className, text }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-white/50 w-10 mx-auto flex flex-col gap-1 mt-6 items-center justify-center z-10",
        className
      )}
    >
      <IconLoader className="animate-spin text-blue-600" />
      {text && (
        <span className="w-max text-sm text-muted-foreground">{text}</span>
      )}
    </div>
  );
}
