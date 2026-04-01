import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EnhancedTabs({ tabs }) {
  return (
    <TabsList className="relative h-12 w-full justify-start gap-2 bg-muted/30 p-0 mx-auto backdrop-blur-md rounded-2xl no-scrollbar md:grid md:grid-cols-7 md:h-10">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium data-[state=active]:hover:font-semibold transition-all duration-300 rounded-full data-[state=active]:bg-brand-aqua/50 data-[state=active]:hover:bg-brand-aqua/15 hover:bg-brand-aqua/10
          border border-transparent data-[state=active]:hover:border-brand-aqua hover:border-brand-aqua/80 data-[state=active]:text-slate-700 data-[state=active]:hover:text-brand-aqua hover:text-foreground data-[state=active]:shadow-sm"
        >
          <tab.icon className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline-block">{tab.label}</span>
          <span className="inline-block lg:hidden data-[state=inactive]:hidden">
            {tab.label}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
