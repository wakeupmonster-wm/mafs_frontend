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
  return (
    <TabsContent
      value="attributes"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <Card className="border border-slate-200 gap-4 py-2 shadow-xl overflow-hidden rounded-3xl bg-white">
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
                <LifeTile
                  icon={<IconZodiacGemini />}
                  label="Zodiac"
                  value={attributes?.zodiac}
                  color="blue"
                />
                <LifeTile
                  icon={<IconSchool />}
                  label="Education"
                  value={attributes?.education}
                  color="blue"
                />
                <LifeTile
                  icon={<IconUsers />}
                  label="Family Plans"
                  value={attributes?.familyPlans}
                  color="blue"
                />
                <LifeTile
                  icon={<IconUsers />}
                  label="Personality"
                  value={attributes?.personalityType}
                  color="blue"
                />
                <LifeTile
                  icon={<IconMessage2 />}
                  label="Communication"
                  value={attributes?.communicationStyle}
                  color="blue"
                />
                <LifeTile
                  icon={<IconHeart />}
                  label="Love Style"
                  value={attributes?.loveStyle}
                  color="blue"
                />
                <LifeTile
                  icon={<IconDroplet />}
                  label="Blood Type"
                  value={attributes?.bloodType}
                  color="blue"
                />
              </div>
            </SectionWrapper>

            {/* 2. LIFESTYLE */}
            <SectionWrapper
              icon={IconBarbell}
              title="Lifestyle"
              color="bg-amber-500"
            >
              <div className="grid grid-cols-1 gap-2">
                <LifeTile
                  icon={<IconPaw />}
                  label="Pets"
                  value={attributes?.pets}
                  color="amber"
                />
                <LifeTile
                  icon={<IconGlassFull />}
                  label="Drinking"
                  value={attributes?.drinking}
                  color="amber"
                />
                <LifeTile
                  icon={<IconSmoking />}
                  label="Smoking"
                  value={attributes?.smoking}
                  color="amber"
                />
                <LifeTile
                  icon={<IconBarbell />}
                  label="Workout"
                  value={attributes?.workout}
                  color="amber"
                />
                <LifeTile
                  icon={<IconToolsKitchen2 />}
                  label="Dietary"
                  value={attributes?.dietary}
                  color="amber"
                />
                <LifeTile
                  icon={<IconDeviceMobile />}
                  label="Social Media"
                  value={attributes?.socialMedia}
                  color="amber"
                />
                <LifeTile
                  icon={<IconMoonStars />}
                  label="Sleeping"
                  value={attributes?.sleeping}
                  color="amber"
                />
              </div>
            </SectionWrapper>

            {/* COLUMN 3: Interests & Languages (Stacked) */}
            <div className="space-y-8">
              {/* 3. INTERESTS */}
              {/* <SectionWrapper
                icon={IconTags}
                title="Interests"
                color="bg-violet-500"
              >
                <div className="flex flex-wrap gap-2 p-1">
                  {attributes?.interests?.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-500 hover:text-white py-1.5 px-3 rounded-lg transition-all hover:-translate-y-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </SectionWrapper> */}

              <SectionWrapper
                icon={IconTags}
                title="Interests"
                color="bg-violet-500"
              >
                <div className="flex flex-wrap gap-2 px-1">
                  {attributes?.interests?.length > 0 ? (
                    attributes.interests.map((tag, index) => (
                      <div
                        key={`${tag}-${index}`}
                        className="px-3 py-1 rounded-lg border border-violet-200 text-violet-700 bg-violet-100 text-[10px] font-bold uppercase tracking-wide shadow-sm transition-all hover:bg-violet-100"
                      >
                        {tag}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs font-medium text-slate-600 px-1">
                      Not Set
                    </div>
                  )}
                </div>
              </SectionWrapper>

              {/* 4. LANGUAGES */}
              <SectionWrapper
                icon={IconLanguage}
                title="Languages"
                color="bg-emerald-500"
              >
                <div className="flex flex-wrap gap-2 px-1">
                  {attributes?.languages?.length > 0 ? (
                    attributes.languages.map((lang, index) => (
                      <div
                        key={`${lang}-${index}`}
                        className="px-3 py-1 rounded-lg border border-emerald-200 text-emerald-700 bg-emerald-100 text-[10px] font-bold uppercase tracking-wide shadow-sm transition-all hover:bg-emerald-100"
                      >
                        {lang}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs font-medium text-slate-600 px-1">
                      Not Set
                    </div>
                  )}
                </div>
              </SectionWrapper>

              {/* 5. RELATIONSHIP GOALS */}
              <SectionWrapper
                icon={IconTarget}
                title="Relationship Goals"
                color="bg-rose-500"
              >
                <div className="p-4 capitalize rounded-2xl border border-rose-200 bg-rose-50/30 text-rose-700 font-bold text-start">
                  {attributes?.relationshipGoal || "Not-set"}
                </div>
              </SectionWrapper>

              {/* 6. RELIGION */}
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
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* 7. PREFERENCES (Media/Travel) */}
          {/* BOTTOM ROW: RELIGION & MEDIA */}
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
