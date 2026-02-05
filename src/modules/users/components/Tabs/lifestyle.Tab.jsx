import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconHeart,
  IconSmoking,
  IconGlassFull,
  IconBarbell,
  IconSchool,
  IconPray,
  IconToolsKitchen2,
  IconMoodSmile,
  IconTags,
  IconUser,
  IconSparkles,
} from "@tabler/icons-react";
import { EditLifeStyleDialoag } from "../Dialogs/edit.LifeStyle.Dialog";
import { cn } from "@/lib/utils";

export const LifeStyleTab = ({ userData, attributes }) => {
  return (
    <TabsContent
      value="lifestyle"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <Card className="border border-grey-300 shadow-lg overflow-hidden py-2 gap-2 rounded-3xl bg-white">
        {/* PREMIUM HEADER */}
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-slate-50/50 to-white border-b border-slate-100 py-4 px-5">
          <CardTitle className="flex items-center gap-3 text-xl font-black text-slate-800 tracking-tight">
            <div className="relative">
              <IconHeart
                className="text-rose-500 relative z-10"
                fill="currentColor"
                fillOpacity={0.15}
                size={24}
              />
              <div className="absolute inset-0 bg-rose-200 blur-lg opacity-40 animate-pulse" />
            </div>
            Lifestyle & Preferences
          </CardTitle>
          <EditLifeStyleDialoag userData={userData} />
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. HABITS & SOCIAL */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconMoodSmile}
                title="Habits & Social"
                color="bg-amber-500 shadow-amber-100 text-white"
              />
              <div className="flex flex-col gap-3">
                <LifeTile
                  icon={<IconSmoking />}
                  label="Smoking"
                  value={attributes?.smoking}
                  color="amber"
                />
                <LifeTile
                  icon={<IconGlassFull />}
                  label="Drinking"
                  value={attributes?.drinking}
                  color="amber"
                />
                <LifeTile
                  icon={<IconBarbell />}
                  label="Workout"
                  value={attributes?.workout}
                  color="amber"
                />
              </div>
            </div>

            {/* 2. PERSONAL VALUES */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconUser}
                title="Personal Values"
                color="bg-indigo-500 shadow-indigo-100 text-white"
              />
              <div className="flex flex-col gap-3">
                <LifeTile
                  icon={<IconSchool />}
                  label="Education"
                  value={attributes?.education}
                  color="indigo"
                />
                <LifeTile
                  icon={<IconPray />}
                  label="Religion"
                  value={attributes?.religion}
                  color="indigo"
                />
                <LifeTile
                  icon={<IconToolsKitchen2 />}
                  label="Dietary"
                  value={attributes?.dietary}
                  color="indigo"
                />
              </div>
            </div>

            {/* 3. INTERESTS & HOBBIES */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconTags}
                title="Interests"
                color="bg-violet-500 shadow-violet-100 text-white"
              />
              <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 min-h-[200px]">
                {attributes?.interests?.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {attributes?.interests?.map((interest) => (
                      <Badge
                        key={interest}
                        className="bg-white hover:bg-indigo-500 hover:text-white text-slate-600 border-slate-200/60 px-4 py-2 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all hover:-translate-y-1 rounded-xl"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                    <IconSparkles size={32} stroke={1} className="mb-2" />
                    <p className="text-xs italic font-medium">
                      Add some flair to your profile
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

// --- MODERN UI COMPONENTS ---

const SectionHeader = ({ icon: Icon, title, color }) => (
  <div className="flex items-center gap-3 mb-2 px-2">
    <div className={cn("p-2 rounded-xl shadow-lg", color)}>
      <Icon size={18} stroke={2.5} />
    </div>
    <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">
      {title}
    </h4>
  </div>
);

const LifeTile = ({ icon, label, value, color }) => {
  const themes = {
    amber: "hover:border-amber-200 hover:bg-amber-50/30",
    indigo: "hover:border-indigo-200 hover:bg-indigo-50/30",
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white transition-all duration-300",
        themes[color]
      )}
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
          {React.cloneElement(icon, { size: 20, stroke: 2 })}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight leading-none mb-1">
            {label}
          </span>
          <span className="text-sm font-bold text-slate-700 capitalize leading-none">
            {value || "Not Set"}
          </span>
        </div>
      </div>
      <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:scale-[3] group-hover:bg-current transition-all opacity-0 group-hover:opacity-20" />
    </div>
  );
};
