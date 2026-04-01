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
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <Card className="border border-slate-200 shadow-sm gap-4 py-2 overflow-hidden rounded-3xl bg-slate-50">
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
            Profile Attributes
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 md:px-10 py-4 space-y-10">
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
            <div className="space-y-8">
              {/* RELATIONSHIP GOALS */}
              <SectionWrapper
                icon={IconTarget}
                title="Relationship"
                color="bg-rose-500"
              >
                <LifeTile
                  icon={<IconTarget />}
                  label="Looking For"
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
                  label="Faith"
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
                    label="My Hobbies"
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
                    label="Fluent In"
                    value={attributes?.languages?.join(", ")}
                    color="emerald"
                  />
                </div>
              </SectionWrapper>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* 7. PREFERENCES (Media/Travel) */}
          <SectionWrapper
            icon={IconMovie}
            title="Favorites & Preferences"
            color="bg-slate-800"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <MediaCard
                icon={<IconMusic />}
                title="Music"
                items={attributes?.music}
              />
              <MediaCard
                icon={<IconMovie />}
                title="Movies"
                items={attributes?.movies}
              />
              <MediaCard
                icon={<IconBook />}
                title="Books"
                items={attributes?.books}
              />
              <MediaCard
                icon={<IconPlaneDeparture />}
                title="Travel"
                items={attributes?.travel}
              />
            </div>
          </SectionWrapper>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

// --- IMPROVED SUB-COMPONENTS ---

const SectionWrapper = ({ icon: Icon, title, color, children }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3 px-1">
      <div className={cn("p-2 rounded-xl text-white shadow-sm", color)}>
        <Icon size={16} stroke={2.5} />
      </div>
      <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
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

const MediaCard = ({ icon, title, items }) => (
  <div className="p-4 rounded-2xl border border-slate-100 hover:border-slate-300 shadow hover:shadow-md bg-slate-50/50 hover:bg-white transition-all">
    <div className="flex items-center gap-2 mb-3">
      <div className="text-slate-400">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        {title}
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {items?.map((item) => (
        <span
          key={item}
          className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-100 shadow-sm capitalize"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);
