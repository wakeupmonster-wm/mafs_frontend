import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  IconArrowLeft,
  IconCircleCheck,
  IconMapPin,
  IconCalendar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnhancedTabs from "../components/Tabs/tabs";
import { TabData } from "@/app/data/tabs.data";
import { ProfileTab } from "../components/Tabs/profile.Tab";
import { GallleryTab } from "../components/Tabs/galllery.Tab";
import { LifeStyleTab } from "../components/Tabs/lifestyle.Tab";
import { DiscoveryTab } from "../components/Tabs/discovery.Tab";
import { ActivityTab } from "../components/Tabs/activity.Tab";
import { FinancialsTab } from "../components/Tabs/financials.Tab";
import { SettingsTab } from "../components/Tabs/settings.Tab";

// export default function ViewProfilePage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Data Logic
//   const initialUserData = location.state?.userData;
//   const liveUser = useSelector((state) =>
//     state.users.items.find((u) => u._id === initialUserData?._id)
//   );
//   const userData = liveUser || initialUserData;

//   // UI States

//   if (!userData)
//     return (
//       <div className="p-20 text-center">
//         <Button onClick={() => navigate(-1)}>Go Back</Button>
//       </div>
//     );

//   const {
//     profile,
//     account,
//     attributes,
//     discovery,
//     location: userLoc,
//     photos,
//     verification,
//     stats,
//     recentMatches,
//   } = userData;

//   console.log("stats: ", stats);

//   return (
//     <div className="p-6 w-full space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
//       {/* --- BREADCRUMB / TOP HEADER --- */}
//       <div className="flex items-center gap-4 mb-2">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => navigate(-1)}
//           className="rounded-full"
//         >
//           <IconArrowLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-2xl font-bold tracking-tight">
//           User Detailed View
//         </h1>
//         <Badge variant="outline" className="ml-auto font-mono">
//           {userData._id}
//         </Badge>
//       </div>

//       <Tabs defaultValue="profile" className="w-full">
//         <EnhancedTabs tabs={TabData} />

//         {/*  --- TAB 1: PROFILE SUMMARY --- */}
//         <ProfileTab
//           userData={userData}
//           photos={photos}
//           profile={profile}
//           userLoc={userLoc}
//           account={account}
//           discovery={discovery}
//           attributes={attributes}
//           verification={verification}
//         />

//         {/* --- TAB 2: GALLERY ---  */}
//         <GallleryTab photos={photos} userId={userData._id} />

//         {/* --- TAB 3: LIFESTYLE & INTERESTS --- */}
//         <LifeStyleTab userData={userData} attributes={attributes} />

//         {/* --- TAB 4: DISCOVERY --- */}
//         <DiscoveryTab discovery={discovery} />

//         {/* --- TAB 5: ACTIVITY LOGS --- */}
//         <ActivityTab stats={stats} recentMatches={recentMatches} />

//         {/* --- TAB 6: FINANCIALS --- */}
//         <FinancialsTab account={account} />

//         {/* --- TAB 7: SETTINGS --- */}
//         <SettingsTab userData={userData} account={account} />
//       </Tabs>
//     </div>
//   );
// }

export default function ViewProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialUserData = location.state?.userData;
  const liveUser = useSelector((state) =>
    state.users.items.find((u) => u._id === initialUserData?._id)
  );
  const userData = liveUser || initialUserData;

  if (!userData) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <p className="text-slate-500 font-medium">No user data found.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  const {
    profile,
    account,
    attributes,
    discovery,
    location: userLoc,
    photos,
    verification,
    stats,
    recentMatches,
  } = userData;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. TOP NAVIGATION BAR */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-9 w-9 rounded-full hover:bg-slate-100"
            >
              <IconArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
            <h1 className="text-sm font-semibold text-slate-900 hidden sm:block">
              User Directory / {profile?.firstName || "User Details"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-slate-100 text-slate-600 border-none font-mono text-[10px]"
            >
              ID: {userData._id.slice(-6)}
            </Badge>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 h-8 text-xs"
            >
              Quick Action
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {/* 2. HERO SECTION (User Summary Card) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage src={photos?.[0]?.url} alt={profile?.firstName} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-bold">
                  {profile?.firstName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {verification?.status === "verified" && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                  <IconCircleCheck className="h-6 w-6 text-blue-500 fill-blue-50" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {profile?.firstName || "Unknown"}, {profile?.age || "N/A"}
                </h2>
                <Badge
                  className={
                    account?.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-red-50 text-red-700 border-red-100"
                  }
                >
                  {account?.status || "Active"}
                </Badge>
                {account?.isPremium && (
                  <Badge className="bg-amber-50 text-amber-700 border-amber-100 uppercase text-[10px] tracking-wider">
                    Premium
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <IconMapPin className="h-4 w-4" />
                  {userLoc?.city || "Remote"}, {userLoc?.country || "Earth"}
                </div>
                <div className="flex items-center gap-1">
                  <IconCalendar className="h-4 w-4" />
                  Joined {new Date(account?.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-none h-10 border-slate-200"
              >
                Message
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none h-10 border-red-100 text-red-600 hover:bg-red-50"
              >
                Suspend
              </Button>
            </div>
          </div>
        </div>

        {/* 3. TABS SECTION */}
        <Tabs defaultValue="profile" className="w-full space-y-6">
          <div className="bg-white p-1 rounded-xl border border-slate-200 inline-block w-full shadow-sm">
            <EnhancedTabs tabs={TabData} />
          </div>

          <div className="mt-6">
            <ProfileTab
              userData={userData}
              photos={photos}
              profile={profile}
              userLoc={userLoc}
              account={account}
              discovery={discovery}
              attributes={attributes}
              verification={verification}
            />
            <GallleryTab photos={photos} userId={userData._id} />
            <LifeStyleTab userData={userData} attributes={attributes} />
            <DiscoveryTab discovery={discovery} />
            <ActivityTab stats={stats} recentMatches={recentMatches} />
            <FinancialsTab account={account} />
            <SettingsTab userData={userData} account={account} />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
