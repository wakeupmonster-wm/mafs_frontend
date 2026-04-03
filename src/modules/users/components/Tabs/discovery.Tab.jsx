import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  IconMapPin,
  IconSearch,
  IconTimeline,
  IconWorld,
  IconFilter,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// 🔥 Define the Icon Mapping outside the component for cleaner code
const FILTER_METADATA = {
  zodiac: { icon: "✨", color: "text-amber-500", bg: "bg-amber-50" },
  education: { icon: "🎓", color: "text-sky-500", bg: "bg-sky-50" },
  familyPlans: { icon: "👨‍👩‍👧", color: "text-emerald-500", bg: "bg-emerald-50" },
  personalityType: { icon: "🧠", color: "text-indigo-500", bg: "bg-indigo-50" },
  communicationStyle: { icon: "💬", color: "text-blue-500", bg: "bg-blue-50" },
  loveStyle: { icon: "💝", color: "text-rose-500", bg: "bg-rose-50" },
  pets: { icon: "🐶", color: "text-orange-500", bg: "bg-orange-50" },
  drinking: { icon: "🍷", color: "text-slate-600", bg: "bg-slate-100" },
  smoking: { icon: "🚬", color: "text-slate-600", bg: "bg-slate-100" },
  workout: { icon: "💪", color: "text-red-500", bg: "bg-red-50" },
  dietary: { icon: "🥗", color: "text-green-600", bg: "bg-green-50" },
  socialMedia: { icon: "📱", color: "text-purple-500", bg: "bg-purple-50" },
  sleeping: { icon: "😴", color: "text-blue-700", bg: "bg-blue-100" },
};

export const DiscoveryTab = ({ discovery }) => {
  const filters = discovery?.discoveryFilters || {};

  return (
    <TabsContent
      value="discovery"
      className="mt-2 bg-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-700 focus-visible:ring-offset-0 focus-visible:ring-0"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-aqua/5 rounded-full blur-[100px] pointer-events-none" />

        {/* LEFT & CENTER COLUMN: DISCOVERY SETTINGS (Spans 2 columns on XL) */}
        <div className="xl:col-span-2 space-y-6 relative z-10">
          <Card className="border shadow-sm bg-white/80 backdrop-blur-xl overflow-hidden rounded-2xl ring-1 ring-slate-100">
            <CardHeader className="px-8 relative overflow-hidden">
              <CardTitle className="flex items-center gap-4 text-xl font-black text-slate-800 relative z-10 tracking-tight">
                <div className="p-3 bg-gradient-to-br from-brand-aqua to-teal-400 rounded-2xl shadow-lg shadow-brand-aqua/20 text-white">
                  <IconSearch size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  Discovery Preferences
                  <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">
                    Who they are looking for
                  </p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Intent Section */}
                <div className="flex flex-col gap-8 col-span-3">
                  <div className="flex items-center gap-4">
                    {/* RELATIONSHIP GOALS */}
                    <SectionWrapper
                      icon={IconTarget}
                      title="Relationship"
                      color="bg-rose-500"
                    >
                      <LifeTile
                        icon={<IconTarget />}
                        label="Looking For"
                        value={discovery?.relationshipGoal}
                        color="rose"
                      />
                    </SectionWrapper>

                    {/* INTERESTED IN */}
                    <SectionWrapper
                      icon={IconUsers}
                      title="Interested In"
                      color="bg-violet-500"
                    >
                      <div className="grid grid-cols-1 gap-2">
                        <LifeTile
                          icon={<IconUsers />}
                          label="Interested In"
                          value={
                            discovery?.showMeGender?.length > 0
                              ? discovery.showMeGender.join(", ")
                              : "Open to everyone"
                          }
                          color="violet"
                        />
                      </div>
                    </SectionWrapper>
                  </div>

                  {/* 🔥 BETTER UI: ADVANCED DISCOVERY FILTERS SECTION (DATA CHIPS FORMAT) */}
                  <div className="py-4 overflow-hidden border-t border-slate-200">
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <SectionHeader
                          icon={<IconFilter className="text-white" size={16} />}
                          title="Advanced Search Filters"
                        />
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                          Specific attributes and preferences the user is
                          looking for.
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-white text-slate-500 border-slate-200"
                      >
                        {Object.keys(filters).length} Categories
                      </Badge>
                    </header>

                    <div className="flex flex-wrap gap-3">
                      {Object.entries(filters).map(([key, values]) => {
                        const meta = FILTER_METADATA[key] || {
                          icon: "▫️",
                          color: "text-slate-500",
                          bg: "bg-slate-100",
                        };
                        const formattedKey = key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                          .trim();

                        const hasValues =
                          Array.isArray(values) && values.length > 0;

                        // If user has chosen multiple values for a single filter category, render them combined in one chip
                        if (hasValues) {
                          return (
                            <div
                              key={key}
                              className="inline-flex items-center gap-2.5 pl-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:border-brand-aqua/40 transition-all duration-300 cursor-pointer group"
                            >
                              <div
                                className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center shadow-inner shrink-0",
                                  meta.bg,
                                  meta.color,
                                )}
                              >
                                <span className="text-sm group-hover:scale-110 transition-transform">
                                  {meta.icon}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider relative top-[1px]">
                                  {formattedKey}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                <span className="text-xs font-bold text-slate-800 capitalize leading-none pt-[2px]">
                                  {values.join(", ")}
                                </span>
                              </div>
                            </div>
                          );
                        } else {
                          // Render an "Any" chip for empty categories to show they have no restrictions
                          return (
                            <div
                              key={`${key}-empty`}
                              className="inline-flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-full border border-dashed border-slate-500 bg-slate-50 hover:bg-slate-100 transition-all duration-300 cursor-pointer group opacity-80 hover:opacity-100 text-slate-500"
                            >
                              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 shrink-0">
                                <span className="text-sm group-hover:scale-110 transition-transform">
                                  {meta.icon}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider relative top-[1px]">
                                  {formattedKey}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0" />
                                <span className="text-xs font-semibold italic">
                                  Not-set
                                </span>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {/* Range Filters Section */}
                <div className="space-y-6 col-span-2">
                  <SectionHeader
                    icon={<IconWorld className="text-slate-50" size={16} />}
                    title="Range Filters"
                  />

                  <div className="space-y-6 bg-slate-50/30 px-6 rounded-3xl border border-slate-100/80">
                    <RangeSlider
                      icon={<IconTimeline size={18} />}
                      label="Age Preference"
                      value={`${discovery?.ageRange?.min || 18} - ${discovery?.ageRange?.max || 60} yrs`}
                      min={discovery?.ageRange?.min || 18}
                      max={discovery?.ageRange?.max || 60}
                      gMin={18}
                      gMax={60}
                      globalMinText="18 yrs"
                      globalMaxText="60 yrs"
                    />

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    <RangeSlider
                      icon={<IconMapPin size={18} />}
                      label="Search Distance"
                      value={`${discovery?.distanceRange || 0} km`}
                      min={0}
                      max={discovery?.distanceRange || 0}
                      gMin={0}
                      gMax={500}
                      globalMinText="0 km"
                      globalMaxText="500 km"
                    />
                  </div>

                  {/* Global Visibility (Moved here to fill space) */}
                  <div
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 hover:shadow-md group mt-6",
                      discovery?.globalVisibility === "everyone"
                        ? "bg-gradient-to-r from-brand-aqua/5 to-transparent border-brand-aqua/30 shadow-sm"
                        : "bg-slate-50 border-slate-200/60 hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-2.5 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105",
                          discovery?.globalVisibility === "everyone"
                            ? "bg-gradient-to-br from-brand-aqua to-teal-400 text-white"
                            : "bg-white border border-slate-200 text-slate-400",
                        )}
                      >
                        <IconWorld size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 tracking-tight mb-1">
                          Global Visibility
                        </p>
                        <p className="text-[10px] text-muted-foreground font-semibold capitalize">
                          Mode: {discovery?.globalVisibility}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* 🔥 BETTER UI: ADVANCED DISCOVERY FILTERS SECTION (DATA CHIPS FORMAT) */}
            {/* <div className="p-6 py-4 overflow-hidden bg-slate-50/50 border-t border-slate-100">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <SectionHeader
                    icon={<IconFilter className="text-brand-aqua" size={22} />}
                    title="Advanced Search Filters"
                  />
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Specific attributes and preferences the user is looking for.
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-white text-slate-500 border-slate-200"
                >
                  {Object.keys(filters).length} Categories
                </Badge>
              </header>

              <div className="flex flex-wrap gap-3">
                {Object.entries(filters).map(([key, values]) => {
                  const meta = FILTER_METADATA[key] || {
                    icon: "▫️",
                    color: "text-slate-500",
                    bg: "bg-slate-100",
                  };
                  const formattedKey = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim();

                  const hasValues = Array.isArray(values) && values.length > 0;

                  // If user has chosen multiple values for a single filter category, render them combined in one chip
                  if (hasValues) {
                    return (
                      <div
                        key={key}
                        className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-slate-200/80 bg-white shadow-sm hover:shadow-md hover:border-brand-aqua/40 transition-all duration-300 cursor-pointer group"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shadow-inner shrink-0",
                            meta.bg,
                            meta.color,
                          )}
                        >
                          <span className="text-sm group-hover:scale-110 transition-transform">
                            {meta.icon}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider relative top-[1px]">
                            {formattedKey}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                          <span className="text-sm font-bold text-slate-800 capitalize leading-none pt-[2px]">
                            {values.join(", ")}
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    // Render an "Any" chip for empty categories to show they have no restrictions
                    return (
                      <div
                        key={`${key}-empty`}
                        className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-dashed border-slate-200 bg-transparent hover:bg-slate-50 transition-all duration-300 cursor-pointer group opacity-60 hover:opacity-100 text-slate-400"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 shrink-0">
                          <span className="text-sm grayscale opacity-50 group-hover:scale-110 transition-transform">
                            {meta.icon}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider relative top-[1px]">
                            {formattedKey}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0" />
                          <span className="text-xs font-semibold italic">
                            Any
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div> */}
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

// --- HELPER COMPONENTS ---
const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-brand-aqua/80 rounded-xl">{icon}</div>
    <h4 className="text-xs font-black uppercase text-muted-foreground tracking-[0.1em]">
      {title}
    </h4>
  </div>
);

const RangeSlider = ({
  icon,
  label,
  value,
  min,
  max,
  globalMinText,
  globalMaxText,
  gMin,
  gMax,
}) => {
  const totalRange = gMax - gMin;
  const leftPercent = totalRange > 0 ? ((min - gMin) / totalRange) * 100 : 0;
  const widthPercent = totalRange > 0 ? ((max - min) / totalRange) * 100 : 0;

  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-white shadow-sm border border-slate-200 rounded-xl text-brand-aqua">
            {icon}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {label}
          </span>
        </div>
        <span className="text-sm font-black text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
          {value}
        </span>
      </div>

      <div className="h-2.5 w-full bg-slate-200/50 rounded-full relative overflow-visible border border-slate-200/50">
        <div
          className="absolute h-full bg-gradient-to-r from-brand-aqua/80 to-teal-400 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.4)] transition-all duration-700 ease-out"
          style={{
            left: `${Math.max(0, leftPercent)}%`,
            width: `${Math.max(0, widthPercent)}%`,
          }}
        >
          {/* Faux Slider Handles */}
          <div className="absolute top-1/2 -left-1 w-4 h-4 bg-white border-2 border-brand-aqua rounded-full shadow-md transform -translate-y-1/2 transition-transform group-hover:scale-110" />
          <div className="absolute top-1/2 -right-1 w-4 h-4 bg-white border-2 border-teal-400 rounded-full shadow-md transform -translate-y-1/2 transition-transform group-hover:scale-110" />
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span>{globalMinText}</span>
        <span>{globalMaxText}</span>
      </div>
    </div>
  );
};

const SectionWrapper = ({ icon: Icon, title, color, children, className }) => (
  <div className={`flex flex-1 flex-col gap-4 ${className}`}>
    <div className="flex items-center gap-3 px-1">
      <div className={cn("p-2 rounded-xl text-white shadow-sm", color)}>
        <Icon size={16} stroke={2.5} />
      </div>
      <h4 className="text-[11px] font-black uppercase text-slate-600 tracking-widest">
        {title}
      </h4>
    </div>
    {children}
  </div>
);

const LifeTile = ({ icon, label, value, color }) => {
  const themes = {
    blue: "hover:border-blue-300 hover:bg-blue-50/60",
    amber: "hover:border-amber-300 hover:bg-amber-50/60",
    indigo: "hover:border-indigo-300 hover:bg-indigo-50/60",
    rose: "hover:border-rose-300 hover:bg-rose-50/60",
    violet: "hover:border-violet-300 hover:bg-violet-50/60",
    emerald: "hover:border-emerald-300 hover:bg-emerald-50/60",
  };
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white transition-all duration-200",
        themes[color],
      )}
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-400">
          {React.cloneElement(icon, { size: 18 })}
        </div>
        <div className="flex flex-col">
          {label && (
            <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">
              {label}
            </span>
          )}
          <span className="text-sm font-semibold text-slate-700 capitalize">
            {value || "Not Set"}
          </span>
        </div>
      </div>
    </div>
  );
};
