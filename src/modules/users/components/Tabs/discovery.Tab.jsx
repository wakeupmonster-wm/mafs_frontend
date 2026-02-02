import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { DetailRow } from "../detailRow";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IconHeart,
  IconMapPin,
  IconSearch,
  IconTimeline,
  IconWorld,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AttributeBlock } from "../attribute.Block";

// export const DiscoveryTab = ({ discovery }) => {
//   return (
//     // --- TAB 4: DISCOVERY ---
//     <TabsContent value="discovery" className="mt-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <IconSearch className="text-blue-500" /> Discovery Preferences
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <DetailRow
//               icon={<IconHeart className="text-red-500" />}
//               label="Relationship Goal"
//               value={discovery?.relationshipGoal}
//             />
//             <DetailRow
//               icon={<IconTimeline size={18} />}
//               label="Age Range"
//               value={`${discovery?.ageRange?.min} - ${discovery?.ageRange?.max} years`}
//             />
//             <DetailRow
//               icon={<IconMapPin size={18} />}
//               label="Distance Range"
//               value={`${discovery?.distanceRange} km`}
//             />
//           </div>
//           <div className="space-y-6">
//             <AttributeBlock
//               label="Interested In"
//               value={discovery?.showMeGender?.join(", ")}
//             />
//             <AttributeBlock
//               label="Global Visibility"
//               value={discovery?.globalVisibility ? "Public" : "Hidden"}
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// };

export const DiscoveryTab = ({ discovery }) => {
  console.log("discovery: ", discovery);
  return (
    <TabsContent
      value="discovery"
      className="mt-6 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        {/* Modern Header with Background Tint */}
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <div className="p-1.5 bg-blue-100 rounded-md">
              <IconSearch className="text-blue-600" size={18} />
            </div>
            Discovery Preferences
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 1. PRIMARY TARGETING SECTION */}
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                  <IconHeart size={14} className="text-rose-500" /> Intent &
                  Targeting
                </h4>
                <div className="space-y-6">
                  <DetailRow
                    label="Relationship Goal"
                    value={
                      <Badge className="bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-50 px-3 py-1">
                        {discovery?.relationshipGoal || "Not Specified"}
                      </Badge>
                    }
                  />

                  <Separator className="bg-slate-100/50" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">
                        Interested In
                      </span>
                      <div className="flex gap-2">
                        {discovery?.showMeGender?.map((gender) => (
                          <Badge
                            key={gender}
                            variant="outline"
                            className="capitalize bg-slate-50 border-slate-200"
                          >
                            {gender}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RANGE & VISIBILITY SECTION */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                <IconWorld size={14} className="text-blue-500" /> Range &
                Visibility
              </h4>

              <div className="grid gap-8">
                {/* Age Range with Visual Indicator */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <IconTimeline size={18} className="text-slate-400" />
                      <span className="text-sm">Preferred Age Range</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">
                      {discovery?.ageRange?.min} — {discovery?.ageRange?.max}{" "}
                      yrs
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                    <div
                      className="absolute h-full bg-indigo-500 rounded-full"
                      style={{
                        left: `${(discovery?.ageRange?.min / 100) * 100}%`,
                        right: `${
                          100 - (discovery?.ageRange?.max / 100) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Distance Range with Visual Indicator */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                      <IconMapPin size={18} className="text-slate-400" />
                      <span className="text-sm">Maximum Distance</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">
                      {discovery?.distanceRange} km
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          (discovery?.distanceRange / 161) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Global Visibility Status */}
                <div
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 transition-colors",
                    discovery?.globalVisibility
                      ? "bg-emerald-50/30 border-emerald-100"
                      : "bg-slate-50 border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        discovery?.globalVisibility
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-200 text-slate-500"
                      )}
                    >
                      <IconWorld size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Global Visibility
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Allow user to be seen worldwide
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "border-none",
                      discovery?.globalVisibility
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-400 text-white"
                    )}
                  >
                    {discovery?.globalVisibility === "everyone"
                      ? "Everyone"
                      : discovery?.globalVisibility === "matches_only"
                      ? "Matches Only"
                      : "Nobody"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
