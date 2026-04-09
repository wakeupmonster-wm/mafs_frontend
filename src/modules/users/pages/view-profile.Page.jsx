import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  IconArrowLeft,
  IconCircleCheck,
  IconCalendar,
  IconSettings,
  IconHistory,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EnhancedTabs from "../components/Tabs/tabs";
import { TabData } from "@/app/data/tabs.data";
import { ProfileTab } from "../components/Tabs/profile.Tab";
import { GallleryTab } from "../components/Tabs/galllery.Tab";
import { DiscoveryTab } from "../components/Tabs/discovery.Tab";
import { ActivityTab } from "../components/Tabs/activity.Tab";
import { FinancialsTab } from "../components/Tabs/financials.Tab";
import { SettingsTab } from "../components/Tabs/settings.Tab";
import { Check, Copy } from "lucide-react";
import { PreLoader } from "@/app/loader/preloader";
import { ManageAccountDialog } from "../components/Dialogs/manage.account.dialog";
import { AttributesTab } from "../components/Tabs/attributes.Tab";
import { clearSelectedUser, fetchUserData } from "../store/user.slice";
import { format } from "date-fns";

export default function ViewProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [copied, setCopied] = useState(false);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);

  // 1. Get the userId from the navigation state
  const userId = location.state?.userId;

  // 2. Select the user from Redux
  const { user, loading } = useSelector((state) => state.users);

  // 3. Trigger API Call & Cleanup
  useEffect(() => {
    if (userId) {
      dispatch(clearSelectedUser());
      dispatch(fetchUserData(userId));
    }

    // Cleanup: Clear the previous user so the next person's profile
    // doesn't show old data for a split second
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [userId, dispatch]);

  const handleCopy = async () => {
    if (!user?._id) return;
    try {
      await navigator.clipboard.writeText(user._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // 4. Handle Loading State FIRST
  if (loading) {
    return <PreLoader />;
  }

  // 5. Handle "No User Found" state SECOND
  if (!user) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <p className="text-slate-500 font-medium">Loading user data...</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  // 6. NOW it is safe to destructure because we know 'user' exists
  const {
    reports,
    profile,
    account,
    security,
    attributes,
    discovery,
    location: userLoc,
    photos,
    verification,
    stats,
    recentMatches,
    transactions,
    subscription,
    lastProfileUpdate,
  } = user;

  // console.log("user: ", user);
  // console.log("reports1: ", reports);

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-2">
        {/* Navigation Bar */}
        <div className="sticky px-5 top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto py-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <IconArrowLeft className="h-5 w-5 text-slate-600" />
              </Button>
              <h1 className="text-sm font-semibold text-slate-900 hidden sm:block">
                User Directory / {profile?.nickname || "User"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="group flex items-center gap-1.5 px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md"
              >
                <Badge
                  variant="secondary"
                  className="bg-transparent text-slate-600 p-0 font-mono text-[10px]"
                >
                  ID: {user._id}
                </Badge>
                <div className="text-slate-400 pl-1.5 border-l border-slate-300">
                  {copied ? (
                    <Check size={12} className="text-green-500" />
                  ) : (
                    <Copy size={12} className="text-slate-500" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="py-2 md:py-4 px-5 max-w-[1450px] mx-auto space-y-6 animate-in fade-in duration-500">
          {/* User Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src={photos?.[0]?.url} alt={profile?.nickname} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-bold">
                    {profile?.nickname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {verification?.status === "approved" && (
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                    <IconCircleCheck className="h-4 w-4 text-green-500 fill-green-50" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {profile?.nickname},{" "}
                    {/* {profile?.dob
                      ? new Date().getFullYear() -
                        new Date(profile.dob).getFullYear()
                      : "-"} */}
                    {profile?.age ? profile?.age : "-"}
                  </h2>
                  <Badge
                    className={
                      account?.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }
                  >
                    {account?.status}
                  </Badge>
                  {subscription?.isCurrentlyActive && (
                    <Badge className="bg-amber-50 text-amber-700 border-amber-100 uppercase text-[10px]">
                      Premium
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-6 font-semibold text-sm text-slate-600">
                  {/* Location */}
                  {/* <div className="flex items-center gap-1">
                    <IconMapPin className="h-4 w-4 text-slate-500" />
                    {userLoc?.city}, {userLoc?.country}
                  </div> */}

                  {/* Vertical Separator for desktop */}
                  {/* <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300" /> */}

                  {/* Joined Date */}
                  <div className="flex items-center gap-1 text-xs">
                    <IconCalendar className="h-4 w-4 text-slate-400" />
                    Joined:{" "}
                    {/* {new Date(account?.createdAt).toLocaleDateString(
                      undefined,
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )} */}
                    {account?.createdAt
                      ? format(new Date(account?.createdAt), "dd MMM, yyyy")
                      : "-"}
                  </div>

                  {/* Vertical Separator for desktop */}
                  {/* <span className="hidden md:block w-1 h-1 rounded-full bg-slate-300" /> */}

                  {/* Last Update Date - NEW FIELD */}
                  <div className="flex items-center gap-1 text-xs">
                    <IconHistory className="h-4 w-4 text-indigo-400" />
                    <span className="font-medium text-slate-600">Updated:</span>
                    {/* {lastProfileUpdate
                      ? new Date(lastProfileUpdate).toLocaleDateString(
                          undefined,
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "Never"} */}
                    {lastProfileUpdate
                      ? format(new Date(lastProfileUpdate), "dd MMM, yyyy")
                      : "-"}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setIsManageDialogOpen(true)}
              >
                <IconSettings className="mr-2 h-4 w-4" /> Manage Account
              </Button>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="profile" className="w-full space-y-4">
            <div className="bg-slate-40 px-2 py-1 rounded-full border border-slate-200 shadow-sm">
              <EnhancedTabs tabs={TabData} />
            </div>

            <div className="mt-4">
              <ProfileTab
                reports={reports}
                security={security}
                stats={stats}
                userData={user}
                photos={photos}
                profile={profile}
                userLoc={userLoc}
                account={account}
                discovery={discovery}
                attributes={attributes}
                verification={verification}
              />
              <GallleryTab photos={photos} userId={user._id} />
              <AttributesTab userData={user} attributes={attributes} />
              <DiscoveryTab discovery={discovery} />
              <ActivityTab stats={stats} recentMatches={recentMatches} />
              <FinancialsTab
                userData={user}
                account={account}
                transactions={transactions}
                subscription={subscription}
              />
              {/* <SubscriptionTab userData={user} subscription={subscription} /> */}
              <SettingsTab userData={user} account={account} />
            </div>
          </Tabs>
        </div>
      </div>

      <ManageAccountDialog
        isOpen={isManageDialogOpen}
        onOpenChange={setIsManageDialogOpen}
        userData={user}
      />
    </>
  );
}
