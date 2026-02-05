import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EnhancedTabs({ tabs }) {
  return (
    <TabsList className="relative h-12 w-full justify-start gap-2 bg-muted/30 p-0 mx-auto backdrop-blur-md rounded-2xl no-scrollbar md:grid md:grid-cols-7 md:h-10">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl data-[state=active]:bg-brand-aqua/60 
          data-[state=active]:text-primary data-[state=active]:shadow-md hover:bg-background/90 hover:text-foreground"
        >
          <tab.icon className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline-block">{tab.label}</span>
          {/* Show text on mobile only if active to save space */}
          <span className="inline-block lg:hidden data-[state=inactive]:hidden">
            {tab.label}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
