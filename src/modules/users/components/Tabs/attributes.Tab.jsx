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
  IconTags,
  IconUser,
  IconSparkles,
  IconZodiacGemini, // Added for Gemini
  IconUsers,
  IconMessage2,
  IconLanguage,
  IconMusic,
  IconMovie,
  IconBook,
  IconPaw,
  IconMoonStars,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const AttributesTab = ({ attributes }) => {
  return (
    <TabsContent
      value="attributes"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <Card className="border border-slate-200 shadow-xl py-3 gap-3 overflow-hidden rounded-3xl bg-white">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 py-4 px-8">
          <CardTitle className="flex items-center gap-4 text-2xl font-black text-slate-800 tracking-tight">
            <div className="relative">
              <IconSparkles
                className="text-rose-500 relative z-10"
                fill="currentColor"
                fillOpacity={0.2}
                size={28}
              />
              <div className="absolute inset-0 bg-rose-200 blur-xl opacity-50 animate-pulse" />
            </div>
            Attributes
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 md:px-10 py-4 space-y-12">
          {/* TOP ROW: Core Identity & Habits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* 1. HABITS & WELLNESS */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconBarbell}
                title="Habits & Wellness"
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
                <LifeTile
                  icon={<IconMoonStars />}
                  label="Sleeping"
                  value={attributes?.sleeping}
                  color="amber"
                />
              </div>
            </div>

            {/* 2. VALUES & EDUCATION */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconUser}
                title="Values & Origin"
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
                <LifeTile
                  icon={<IconZodiacGemini />}
                  label="Zodiac"
                  value={attributes?.zodiac}
                  color="indigo"
                />
              </div>
            </div>

            {/* 3. DATING & PERSONALITY */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconHeart}
                title="Dating Style"
                color="bg-rose-500 shadow-rose-100 text-white"
              />
              <div className="flex flex-col gap-3">
                <LifeTile
                  icon={<IconHeart />}
                  label="Love Language"
                  value={attributes?.loveStyle}
                  color="rose"
                />
                <LifeTile
                  icon={<IconUsers />}
                  label="Personality"
                  value={attributes?.personalityType}
                  color="rose"
                />
                <LifeTile
                  icon={<IconMessage2 />}
                  label="Communication"
                  value={attributes?.communicationStyle}
                  color="rose"
                />
                <LifeTile
                  icon={<IconPaw />}
                  label="Pets"
                  value={attributes?.pets}
                  color="rose"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* BOTTOM ROW: Interests & Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 4. LANGUAGES & SOCIAL */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconLanguage}
                title="Languages & Social"
                color="bg-emerald-500 shadow-emerald-100 text-white"
              />
              <div className="p-6 rounded-[2rem] bg-emerald-50/30 border border-emerald-100/50 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 block">
                    Fluent Languages
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {attributes?.languages?.map((lang) => (
                      <Badge
                        key={lang}
                        variant="secondary"
                        className="bg-white text-emerald-700 uppercase border-emerald-100"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <LifeTile
                  icon={<IconDeviceMobile />}
                  label="Social Media"
                  value={attributes?.socialMedia}
                  color="emerald"
                />
              </div>
            </div>

            {/* 5. INTERESTS & HOBBIES */}
            <div className="space-y-6">
              <SectionHeader
                icon={IconTags}
                title="Interests & Travel"
                color="bg-violet-500 shadow-violet-100 text-white"
              />
              <div className="p-6 rounded-[2rem] bg-violet-50/30 border border-violet-100/50 min-h-[120px]">
                <div className="flex flex-wrap gap-2.5">
                  {[
                    ...(attributes?.interests || []),
                    ...(attributes?.travel || []),
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-white hover:bg-violet-500 hover:text-white text-violet-600 border-violet-100 px-4 py-2 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all hover:-translate-y-1 rounded-xl"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6. MEDIA SECTION (Music, Movies, Books) */}
          <div className="space-y-6">
            <SectionHeader
              icon={IconMovie}
              title="Entertainment Picks"
              color="bg-slate-800 shadow-slate-200 text-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MediaCard
                icon={<IconMusic />}
                title="Music"
                items={attributes?.music}
                color="blue"
              />
              <MediaCard
                icon={<IconMovie />}
                title="Movies"
                items={attributes?.movies}
                color="purple"
              />
              <MediaCard
                icon={<IconBook />}
                title="Books"
                items={attributes?.books}
                color="orange"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({ icon: Icon, title, color }) => (
  <div className="flex items-center gap-3 mb-2 px-2">
    <div
      className={cn(
        "p-2 rounded-xl shadow-lg transform transition-transform group-hover:scale-110",
        color,
      )}
    >
      <Icon size={18} stroke={2.5} />
    </div>
    <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">
      {title}
    </h4>
  </div>
);

const LifeTile = ({ icon, label, value, color }) => {
  const themes = {
    amber: "hover:border-amber-200 hover:bg-amber-50/50",
    indigo: "hover:border-indigo-200 hover:bg-indigo-50/50",
    rose: "hover:border-rose-200 hover:bg-rose-50/50",
    emerald: "hover:border-emerald-200 hover:bg-emerald-50/50",
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white transition-all duration-300",
        themes[color],
      )}
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400 group-hover:scale-110 transition-transform">
          {React.cloneElement(icon, { size: 20, stroke: 2 })}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-0.5">
            {label}
          </span>
          <span className="text-sm font-bold text-slate-700 capitalize">
            {value || "Not Set"}
          </span>
        </div>
      </div>
    </div>
  );
};

const MediaCard = ({ icon, title, items, color }) => (
  <div className="p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all group">
    <div className="flex items-center gap-2 mb-4">
      <div className="text-slate-400 group-hover:text-slate-800 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-slate-500">
        {title}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {items?.map((item) => (
        <span
          key={item}
          className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm capitalize"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);
