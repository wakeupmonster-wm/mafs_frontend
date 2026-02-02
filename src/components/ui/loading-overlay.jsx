import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";

export function SimpleLoader({ className, text }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-white/50 w-10 mx-auto flex flex-col gap-1 mt-6 items-center justify-center z-10",
        className
      )}
    >
      <IconLoader className="animate-spin text-blue-600" />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

export function DotLoader({ className }) {
  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
    </div>
  );
}
