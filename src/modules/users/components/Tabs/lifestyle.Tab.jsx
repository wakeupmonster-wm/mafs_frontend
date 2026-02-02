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
} from "@tabler/icons-react";
import { AttributeBlock } from "../attribute.Block";
import { EditLifeStyleDialoag } from "../Dialogs/edit.LifeStyle.Dialog";
import { cn } from "@/lib/utils";

// export const LifeStyleTab = ({ userData, attributes }) => {
//   return (
//     // --- TAB 3: LIFESTYLE & INTERESTS ---
//     <TabsContent value="lifestyle" className="mt-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between border-b mb-6">
//           <CardTitle className="flex items-center gap-2">
//             <IconHeart className="text-pink-500" /> Lifestyle & Preferences
//           </CardTitle>
//           <EditLifeStyleDialoag userData={userData} />
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           <div className="space-y-6">
//             <h4 className="text-xs font-black uppercase text-primary tracking-widest">
//               Habits
//             </h4>
//             <AttributeBlock label="Smoking" value={attributes?.smoking} />
//             <AttributeBlock label="Drinking" value={attributes?.drinking} />
//             <AttributeBlock label="Workout" value={attributes?.workout} />
//           </div>
//           <div className="space-y-6">
//             <h4 className="text-xs font-black uppercase text-primary tracking-widest">
//               Personal
//             </h4>
//             <AttributeBlock label="Education" value={attributes?.education} />
//             <AttributeBlock label="Religion" value={attributes?.religion} />
//             <AttributeBlock label="Diet" value={attributes?.dietary} />
//           </div>
//           <div className="space-y-6">
//             <h4 className="text-xs font-black uppercase text-primary tracking-widest">
//               Interests
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {attributes?.interests?.map((i) => (
//                 <Badge key={i} variant="secondary" className="capitalize">
//                   {i}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// };

export const LifeStyleTab = ({ userData, attributes }) => {
  // Helper to render section headers with icons
  const SectionHeader = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className={cn("p-1.5 rounded-md", color)}>
        <Icon size={16} stroke={2.5} />
      </div>
      <h4 className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
        {title}
      </h4>
    </div>
  );

  return (
    <TabsContent
      value="lifestyle"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100 py-4 px-6">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <IconHeart
              className="text-rose-500"
              fill="currentColor"
              fillOpacity={0.1}
            />
            Lifestyle & Preferences
          </CardTitle>
          <EditLifeStyleDialoag userData={userData} />
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* 1. HABITS SECTION */}
            <div className="relative">
              <SectionHeader
                icon={IconMoodSmile}
                title="Habits & Social"
                color="bg-amber-50 text-amber-600"
              />
              <div className="grid gap-5">
                <AttributeBlock
                  icon={<IconSmoking size={16} />}
                  label="Smoking"
                  value={attributes?.smoking}
                />
                <AttributeBlock
                  icon={<IconGlassFull size={16} />}
                  label="Drinking"
                  value={attributes?.drinking}
                />
                <AttributeBlock
                  icon={<IconBarbell size={16} />}
                  label="Workout"
                  value={attributes?.workout}
                />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-slate-100 hidden lg:block" />
            </div>

            {/* 2. PERSONAL SECTION */}
            <div className="relative">
              <SectionHeader
                icon={IconUser}
                title="Personal Values"
                color="bg-blue-50 text-blue-600"
              />
              <div className="grid gap-5">
                <AttributeBlock
                  icon={<IconSchool size={16} />}
                  label="Education"
                  value={attributes?.education}
                />
                <AttributeBlock
                  icon={<IconPray size={16} />}
                  label="Religion"
                  value={attributes?.religion}
                />
                <AttributeBlock
                  icon={<IconToolsKitchen2 size={16} />}
                  label="Dietary"
                  value={attributes?.dietary}
                />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-slate-100 hidden lg:block" />
            </div>

            {/* 3. INTERESTS SECTION */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <SectionHeader
                icon={IconTags}
                title="Interests & Hobbies"
                color="bg-purple-50 text-purple-600"
              />
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                {attributes?.interests?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {attributes?.interests?.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-white hover:bg-white text-slate-700 border-slate-200 px-3 py-1 text-xs font-medium shadow-sm transition-all hover:scale-105"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    No interests listed yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
