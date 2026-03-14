import { Inbox } from "lucide-react";

export function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-in fade-in duration-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
        <Inbox className="h-10 w-10 text-slate-300" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-[250px] mx-auto">
        {description}
      </p>
    </div>
  );
}
