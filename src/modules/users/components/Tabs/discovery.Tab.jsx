import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IconHeart,
  IconMapPin,
  IconSearch,
  IconSparkles,
  IconTimeline,
  IconWorld,
  IconFilter,
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

  // Check if any specific discovery filters are active
  // const hasActiveFilters = Object.values(filters).some(
  //   (arr) => Array.isArray(arr) && arr.length > 0,
  // );

  // console.log("filters: ", filters);

  return (
    <TabsContent
      value="discovery"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT & CENTER COLUMN: DISCOVERY SETTINGS (Spans 2 columns on XL) */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-8">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
                <div className="p-2 bg-brand-aqua rounded-xl shadow-lg shadow-brand-aqua/20">
                  <IconSearch className="text-white" size={20} />
                </div>
                Discovery Preferences
              </CardTitle>
            </CardHeader>

            <CardContent className="px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Intent Section */}
                <div className="space-y-8">
                  <SectionHeader
                    icon={<IconHeart className="text-rose-500" />}
                    title="Dating Intent"
                  />

                  <div className="p-6 rounded-2xl bg-rose-50/30 border border-rose-100 relative group">
                    <p className="text-[10px] font-bold text-rose-400 uppercase mb-2">
                      Relationship Goal
                    </p>
                    <h3 className="text-xl font-black text-rose-700 capitalize">
                      {discovery?.relationshipGoal || "Not Specified"}
                    </h3>
                    <IconSparkles className="absolute top-4 right-4 text-rose-200 group-hover:rotate-12 transition-transform" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-700">
                      Interested In
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {discovery?.showMeGender?.length > 0 ? (
                        discovery.showMeGender.map((g) => (
                          <Badge
                            key={g}
                            className="bg-white border-slate-200 text-slate-600 capitalize py-1.5 px-4 shadow-sm"
                          >
                            {g}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Open to everyone
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Range Filters Section */}
                <div className="space-y-10">
                  <SectionHeader
                    icon={<IconWorld className="text-brand-aqua" />}
                    title="Range Filters"
                  />

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

                  <div
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                      discovery?.globalVisibility === "everyone"
                        ? "bg-brand-aqua/5 border-brand-aqua/20 shadow-sm"
                        : "bg-slate-50 border-slate-100",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2.5 rounded-xl",
                          discovery?.globalVisibility === "everyone"
                            ? "bg-brand-aqua text-white"
                            : "bg-slate-200 text-slate-500",
                        )}
                      >
                        <IconWorld size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                          Global Visibility
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium capitalize">
                          Mode: {discovery?.globalVisibility}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* 🔥 BETTER UI: ADVANCED DISCOVERY FILTERS SECTION */}
            <div className="p-6 overflow-hidden">
              <header className="flex items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                <SectionHeader
                  icon={<IconFilter className="text-brand-aqua" size={22} />}
                  title="Advanced Search Filters"
                />
                <p className="text-[11px] font-bold text-slate-400">
                  User is looking for these attributes:
                </p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap gap-6">
                {Object.entries(filters).map(([key, values]) => {
                  const meta = FILTER_METADATA[key] || {
                    icon: "▫️",
                    color: "text-slate-400",
                    bg: "bg-slate-50",
                  };

                  return (
                    <div
                      key={key}
                      className="p-5 rounded-xl cursor-pointer bg-brand-aqua/5 border border-brand-aqua/60 shadow-sm hover:border-brand-aqua/50 transition-all duration-300 group relative flex flex-col h-full"
                    >
                      {/* Icon & Label Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-2.5 rounded-xl ${meta.bg} shadow-inner`}
                        >
                          <span className="text-xl group-hover:scale-110 transition-transform">
                            {meta.icon}
                          </span>
                        </div>
                        <p
                          className={`text-[11px] font-bold ${meta.color} uppercase tracking-widest`}
                        >
                          {key
                            .replace(/([A-Z])/g, " $1") // Add space before capitals
                            .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
                            .trim()}
                        </p>
                      </div>

                      {/* Content (Badge or Not Set) */}
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(values) && values.length > 0 ? (
                          values.map((val, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-brand-aqua/20 text-brand-aqua border-brand-aqua/60 text-[10px] px-2.5 rounded-md"
                            >
                              {val}
                            </Badge>
                          ))
                        ) : (
                          /* Enhanced Empty State - Glass effect */
                          <div className="flex items-center gap-2 p-3 w-full bg-slate-50 border border-slate-100 rounded-xl">
                            <span className="text-lg opacity-40">➖</span>
                            <span className="text-[11px] font-medium text-slate-400 italic">
                              {" "}
                              Not Specified
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: LIFESTYLE & ATTRIBUTES */}
        {/* <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden h-full">
            <CardHeader className="bg-brand-aqua/5 border-b border-brand-aqua/10 py-5">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800 px-2">
                <IconSparkles className="text-brand-aqua" size={20} />
                Lifestyle & Bio
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <AttributeGroup
                  label="Personality & Style"
                  items={[
                    { val: attributes?.personalityType, icon: "🧠" },
                    { val: attributes?.communicationStyle, icon: "💬" },
                    { val: attributes?.loveStyle, icon: "💝" },
                    { val: attributes?.zodiac, icon: "✨" },
                  ]}
                />

                <Separator className="bg-slate-100" />

                <AttributeGroup
                  label="Habits & Lifestyle"
                  items={[
                    { val: attributes?.smoking, icon: "🚬" },
                    { val: attributes?.drinking, icon: "🍷" },
                    { val: attributes?.workout, icon: "💪" },
                    { val: attributes?.dietary, icon: "🥗" },
                  ]}
                />

                <Separator className="bg-slate-100" />

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {attributes?.interests?.length > 0 ? (
                      attributes.interests.map((interest) => (
                        <Badge
                          key={interest}
                          className="bg-brand-aqua/10 text-brand-aqua border-none capitalize hover:bg-brand-aqua/20 transition-colors shadow-none"
                        >
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No interests added
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </TabsContent>
  );
};

// --- HELPER COMPONENTS ---

const SectionHeader = ({ icon, title }) => (
  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
    {icon} {title}
  </h4>
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
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2 text-slate-600 font-bold">
          <span className="p-1.5 bg-slate-100 rounded-lg text-brand-aqua">
            {icon}
          </span>
          <span className="text-xs uppercase tracking-tight">{label}</span>
        </div>
        <span className="text-sm font-black text-brand-aqua">{value}</span>
      </div>

      <div className="h-2 w-full bg-slate-200 rounded-full relative overflow-hidden">
        <div
          className="absolute h-full bg-gradient-to-r from-brand-aqua/60 to-brand-aqua rounded-full shadow-[0_0_8px_rgba(20,184,166,0.3)] transition-all duration-700 ease-out"
          style={{
            left: `${Math.max(0, leftPercent)}%`,
            width: `${Math.max(0, widthPercent)}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span>{globalMinText}</span>
        <span>{globalMaxText}</span>
      </div>
    </div>
  );
};

const AttributeGroup = ({ label, items }) => (
  <div className="space-y-3">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <div className="grid grid-cols-1 gap-2">
      {items.map(
        (item, i) =>
          item.val && (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:shadow-md hover:border-brand-aqua/20 transition-all duration-300 group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-sm font-bold text-slate-700 capitalize">
                {item.val}
              </span>
            </div>
          ),
      )}
    </div>
  </div>
);
