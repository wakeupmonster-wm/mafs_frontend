import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  IconHeart,
  IconMapPin,
  IconSearch,
  IconSparkles,
  IconTimeline,
  IconWorld,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const DiscoveryTab = ({ discovery, attributes }) => {
  return (
    <TabsContent
      value="discovery"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
        {/* LEFT COLUMN: DISCOVERY SETTINGS (2 Columns Wide) */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="border-slate-200 py-3 shadow-sm gap-2 overflow-hidden rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-8">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
                <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                  <IconSearch className="text-white" size={20} />
                </div>
                Discovery Preferences
              </CardTitle>
            </CardHeader>

            <CardContent className="px-8 py-4">
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
                    <h3 className="text-xl font-black text-rose-700">
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

                {/* Filters Section */}
                <div className="space-y-10">
                  <SectionHeader
                    icon={<IconWorld className="text-blue-500" />}
                    title="Range Filters"
                  />

                  {/* Age Range Slider Visual: User range within 18-60 */}
                  <RangeSlider
                    icon={<IconTimeline size={18} />}
                    label="Age Preference"
                    value={`${discovery?.ageRange?.min} - ${discovery?.ageRange?.max} yrs`}
                    min={discovery?.ageRange?.min || 18}
                    max={discovery?.ageRange?.max || 60}
                    globalMin={"18 yrs"}
                    globalMax={"60 yrs"}
                  />

                  {/* Distance Slider Visual: User range within 0-500km */}
                  <RangeSlider
                    icon={<IconMapPin size={18} />}
                    label="Search Distance"
                    value={`${discovery?.distanceRange} km`}
                    min={0}
                    max={discovery?.distanceRange || 0}
                    globalMin={"0 km"}
                    globalMax={"500 km"}
                  />

                  <div
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                      discovery?.globalVisibility === "everyone"
                        ? "bg-indigo-50/50 border-indigo-100 shadow-sm shadow-indigo-100"
                        : "bg-slate-50 border-slate-100",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2.5 rounded-xl",
                          discovery?.globalVisibility === "everyone"
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200 text-slate-500",
                        )}
                      >
                        <IconWorld size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                          Global Visibility
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          Seen by: {discovery?.globalVisibility}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: PERSONAL ATTRIBUTES (1 Column Wide) */}
        {/* <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden h-full">
            <CardHeader className="bg-amber-50/50 border-b border-amber-100 py-5">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-amber-900 px-4">
                <IconSparkles className="text-amber-500" size={20} />
                Lifestyle & Bio
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <AttributeGroup
                  label="Personality"
                  items={[
                    { val: attributes?.personalityType, icon: "🧠" },
                    { val: attributes?.communicationStyle, icon: "💬" },
                    { val: attributes?.loveStyle, icon: "💝" },
                  ]}
                />

                <Separator className="bg-slate-100" />

                <AttributeGroup
                  label="Habits"
                  items={[
                    { val: attributes?.smoking, icon: "🚬" },
                    { val: attributes?.drinking, icon: "🍷" },
                    { val: attributes?.workout, icon: "💪" },
                  ]}
                />

                <Separator className="bg-slate-100" />

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {attributes?.interests?.map((interest) => (
                      <Badge
                        key={interest}
                        className="bg-indigo-50 text-indigo-600 border-none capitalize hover:bg-indigo-100 transition-colors"
                      >
                        {interest}
                      </Badge>
                    ))}
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
  globalMin,
  globalMax,
}) => {
  // 1. Calculate how far the start and end are from the global bounds in percentage
  const totalRange = globalMax - globalMin;
  const leftPercent = ((min - globalMin) / totalRange) * 100;
  const rightPercent = 100 - ((max - globalMin) / totalRange) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2 text-slate-600 font-bold">
          <span className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
            {icon}
          </span>
          <span className="text-xs uppercase tracking-tight">{label}</span>
        </div>
        <span className="text-sm font-black text-indigo-600">{value}</span>
      </div>

      {/* Outer Track */}
      <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
        {/* Inner Colored Progress (Calculated based on user min/max) */}
        <div
          className="absolute h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]"
          style={{
            left: `${Math.max(0, leftPercent)}%`,
            right: `${Math.max(0, rightPercent)}%`,
          }}
        />
      </div>

      {/* Optional: Legend for Global Limits */}
      <div className="flex justify-between text-xs text-slate-400 font-bold">
        <span>{globalMin}</span>
        <span>{globalMax}</span>
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
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-bold text-slate-700 capitalize">
                {item.val}
              </span>
            </div>
          ),
      )}
    </div>
  </div>
);
