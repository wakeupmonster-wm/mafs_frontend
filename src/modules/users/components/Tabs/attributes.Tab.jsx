import React from "react";
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
  IconZodiacGemini,
  IconUsers,
  IconMessage2,
  IconLanguage,
  IconMusic,
  IconMovie,
  IconBook,
  IconPaw,
  IconMoonStars,
  IconDeviceMobile,
  IconDroplet,
  IconTarget,
  IconPlaneDeparture,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const AttributesTab = ({ attributes }) => {
  const basic = [
    {
      icon: <IconZodiacGemini />,
      label: "Zodiac",
      value: attributes?.zodiac,
      color: "blue",
    },
    {
      icon: <IconSchool />,
      label: "Education",
      value: attributes?.education,
      color: "blue",
    },
    {
      icon: <IconUsers />,
      label: "Family Plans",
      value: attributes?.familyPlans,
      color: "blue",
    },
    {
      icon: <IconUsers />,
      label: "Personality",
      value: attributes?.personalityType,
      color: "blue",
    },
    {
      icon: <IconMessage2 />,
      label: "Communication",
      value: attributes?.communicationStyle,
      color: "blue",
    },
    {
      icon: <IconHeart />,
      label: "Love Style",
      value: attributes?.loveStyle,
      color: "blue",
    },
    {
      icon: <IconDroplet />,
      label: "Blood Type",
      value: attributes?.bloodType,
      color: "blue",
    },
  ];

  const lifestyle = [
    {
      icon: <IconPaw />,
      label: "Pets",
      value: attributes?.pets,
      color: "amber",
    },
    {
      icon: <IconGlassFull />,
      label: "Drinking",
      value: attributes?.drinking,
      color: "amber",
    },
    {
      icon: <IconSmoking />,
      label: "Smoking",
      value: attributes?.smoking,
      color: "amber",
    },
    {
      icon: <IconBarbell />,
      label: "Workout",
      value: attributes?.workout,
      color: "amber",
    },
    {
      icon: <IconToolsKitchen2 />,
      label: "Dietary",
      value: attributes?.dietary,
      color: "amber",
    },
    {
      icon: <IconDeviceMobile />,
      label: "Social Media",
      value: attributes?.socialMedia,
      color: "amber",
    },
    {
      icon: <IconMoonStars />,
      label: "Sleeping",
      value: attributes?.sleeping,
      color: "amber",
    },
  ];

  return (
    <TabsContent
      value="attributes"
      className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300 focus-visible:ring-offset-0 focus-visible:ring-0"
    >
      <Card className="border border-slate-200 shadow-sm gap-2 py-4 overflow-hidden rounded-xl bg-slate-50">
        <CardHeader className="bg-slate-50 border-slate-100 py-2 px-8">
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
            Profile Attributes
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 md:px-10 py-2 space-y-8">
          {/* MASONRY-STYLE GRID FOR VARIED SECTION SIZES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. BASICS */}
            <SectionWrapper icon={IconUser} title="Basics" color="bg-blue-500">
              <div className="grid grid-cols-1 gap-2">
                {basic.map((item, index) => (
                  <LifeTile
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    color={item.color}
                  />
                ))}
              </div>
            </SectionWrapper>

            {/* 2. LIFESTYLE */}
            <SectionWrapper
              icon={IconBarbell}
              title="Lifestyle"
              color="bg-amber-500"
            >
              <div className="grid grid-cols-1 gap-2">
                {lifestyle.map((item, index) => (
                  <LifeTile
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    color={item.color}
                  />
                ))}
              </div>
            </SectionWrapper>

            {/* 3. GOALS, LANGUAGES & INTERESTS (Ab Basics jaisa dikhega) */}
            <div className="space-y-6">
              {/* RELATIONSHIP GOALS */}
              <SectionWrapper
                icon={IconTarget}
                title="Relationship"
                color="bg-rose-500"
              >
                <LifeTile
                  icon={<IconTarget />}
                  // label="Looking For"
                  value={attributes?.relationshipGoal}
                  color="rose"
                />
              </SectionWrapper>

              <SectionWrapper
                icon={IconPray}
                title="Religion"
                color="bg-indigo-500"
              >
                <LifeTile
                  icon={<IconPray />}
                  // label="Faith"
                  value={attributes?.religion}
                  color="indigo"
                />
              </SectionWrapper>

              {/* INTERESTS (List converted to comma string) */}
              <SectionWrapper
                icon={IconTags}
                title="Interests"
                color="bg-violet-500"
              >
                <div className="grid grid-cols-1 gap-2">
                  <LifeTile
                    icon={<IconTags />}
                    // label="My Hobbies"
                    value={attributes?.interests?.join(", ")}
                    color="violet"
                  />
                </div>
              </SectionWrapper>

              {/* LANGUAGES */}
              <SectionWrapper
                icon={IconLanguage}
                title="Languages"
                color="bg-emerald-500"
              >
                <div className="grid grid-cols-1 gap-2">
                  <LifeTile
                    icon={<IconLanguage />}
                    // label="Fluent In"
                    value={attributes?.languages?.join(", ")}
                    color="emerald"
                  />
                </div>
              </SectionWrapper>
            </div>
          </div>

          <Separator />

          {/* 7. PREFERENCES (Media/Travel) */}
          <SectionWrapper
            icon={IconMovie}
            title="Favorites & Preferences"
            color="bg-slate-800"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MediaCard
                icon={<IconMusic size={22} />}
                title="Music"
                items={attributes?.music}
                colorClass="text-pink-500"
                gradientClass="bg-gradient-to-br from-pink-50/80 to-rose-100/50 border-pink-200 hover:border-pink-300 shadow-[0_0_10px_rgb(244,114,182,0.15)]"
              />
              <MediaCard
                icon={<IconMovie size={22} />}
                title="Movies"
                items={attributes?.movies}
                colorClass="text-purple-500"
                gradientClass="bg-gradient-to-br from-purple-50/80 to-indigo-100/50 border-purple-200 hover:border-purple-300 shadow-[0_0_10px_rgb(168,85,247,0.15)]"
              />
              <MediaCard
                icon={<IconBook size={22} />}
                title="Books"
                items={attributes?.books}
                colorClass="text-blue-500"
                gradientClass="bg-gradient-to-br from-blue-50/80 to-sky-100/50 border-blue-200 hover:border-blue-300 shadow-[0_0_10px_rgb(59,130,246,0.15)]"
              />
              <MediaCard
                icon={<IconPlaneDeparture size={22} />}
                title="Travel"
                items={attributes?.travel}
                colorClass="text-emerald-500"
                gradientClass="bg-gradient-to-br from-emerald-50/80 to-teal-100/50 border-emerald-200 hover:border-emerald-300 shadow-[0_0_10px_rgb(16,185,129,0.15)]"
              />
            </div>
          </SectionWrapper>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

// --- IMPROVED SUB-COMPONENTS ---

const SectionWrapper = ({ icon: Icon, title, color, children, className }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
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
          <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">
            {label}
          </span>
          <span className="text-sm font-semibold text-slate-700 capitalize">
            {value || "Not Set"}
          </span>
        </div>
      </div>
    </div>
  );
};

const MediaCard = ({ icon, title, items, colorClass, gradientClass }) => (
  <div
    className={cn(
      "relative overflow-hidden p-4 rounded-3xl border border-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 group",
      gradientClass,
    )}
  >
    {/* Decorative background element */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/50 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

    <div className="relative z-10 flex items-center gap-3 mb-5">
      <div
        className={cn(
          "p-3 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300",
          colorClass,
        )}
      >
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-800">
        {title}
      </span>
    </div>

    <div className="relative z-10 flex flex-wrap gap-2">
      {items?.length > 0 ? (
        items.map((item) => (
          <span
            key={item}
            className="text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm capitalize group-hover:bg-white group-hover:shadow-[0_4px_10px_rgb(0,0,0,0.05)] transition-all duration-300 cursor-default"
          >
            {item}
          </span>
        ))
      ) : (
        <span className="text-[11px] font-semibold italic text-slate-600/70 py-1 bg-white/40 px-3 rounded-lg border border-dashed border-white/50">
          Not specified
        </span>
      )}
    </div>
  </div>
);
