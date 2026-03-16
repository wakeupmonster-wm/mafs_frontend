import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconSettings,
  IconShieldLock,
  IconUserShield,
  IconCircleCheck,
  IconCircleX,
  IconAlertTriangle,
  IconTrash,
  IconLockAccess,
  IconHistory,
  IconBellRinging,
  IconEye,
  IconMapPin,
} from "@tabler/icons-react";
import { EditSettingsDialog } from "../Dialogs/edit.Settings.Dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fetchUserData, updateUserProfile } from "../../store/user.slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export const SettingsTab = ({ userData }) => {
  const dispatch = useDispatch();
  const { account, settings, discovery } = userData;

  const handleDeleteAccount = () => {
    console.log("Initiating account deletion for:", userData._id);
  };

  // 1. Handle Toggle Change
  const handleToggleNotification = async (key, currentValue) => {
    try {
      // Construct the nested structure the backend expects
      const payload = {
        profile: {
          settings: {
            notifications: {
              [key]: !currentValue, // e.g., push: true
            },
          },
        },
      };

      await dispatch(
        updateUserProfile({
          userId: userData._id,
          profile: payload.profile,
        }),
      ).unwrap();

      toast.success(
        `${key.charAt(0).toUpperCase() + key.slice(1)} preference updated`,
      );

      // Optional: Re-fetch to ensure UI is perfectly in sync with DB
      dispatch(fetchUserData(userData._id));
    } catch (error) {
      toast.error("Failed to update preferences");
      console.error(error);
    }
  };

  return (
    <TabsContent
      value="settings"
      className="mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      {/* 1. COMPACT HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-1">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <IconSettings className="text-slate-400" size={22} /> System
            Controls
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage administrative permissions, discovery settings, and
            notifications.
          </p>
        </div>
        <EditSettingsDialog userData={userData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. GOVERNANCE & STATUS CARD */}
        <Card className="border-slate-200 shadow-sm overflow-hidden gap-2 py-4">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconUserShield className="text-indigo-500" size={18} /> Account
              Governance
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2 space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Account Status
                  </p>
                  <p className="text-sm font-bold text-slate-900 capitalize">
                    {account.status}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "h-7 px-3 border-none shadow-sm",
                    account.status === "active"
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white",
                  )}
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {account.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Membership Level
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {account.isPremium ? "Premium Pro" : "Standard Tier"}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "h-7 px-3 border-slate-200",
                    account.isPremium &&
                      "bg-amber-50 border-amber-200 text-amber-700",
                  )}
                >
                  {account.isPremium ? "⭐ Premium" : "Basic"}
                </Badge>
              </div>
            </div>

            <Separator className="bg-slate-50" />

            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Infrastructure Identity
              </p>
              <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between border border-slate-200/50">
                <code className="text-[11px] font-mono text-slate-500 truncate mr-4">
                  {userData._id}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400 hover:text-indigo-600"
                >
                  <IconHistory size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. NOTIFICATIONS & PREFERENCES */}
        <Card className="border-slate-200 shadow-sm overflow-hidden gap-2 py-4">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconBellRinging className="text-blue-500" size={18} />{" "}
              Communication Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2 space-y-5">
            {Object.entries(settings.notifications).map(([key, isEnabled]) => (
              <div
                key={key}
                className="flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <Label
                    htmlFor={`notif-${key}`}
                    className="text-sm font-bold text-slate-800 capitalize cursor-pointer"
                  >
                    {key} Alerts
                  </Label>
                  <p className="text-[11px] text-slate-500">
                    Receive {key} notifications and updates.
                  </p>
                </div>
                <Switch
                  id={`notif-${key}`}
                  checked={isEnabled}
                  onCheckedChange={() =>
                    handleToggleNotification(key, isEnabled)
                  }
                  className="data-[state=checked]:bg-indigo-600"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 4. DISCOVERY SETTINGS */}
        <Card className="border-slate-200 shadow-sm overflow-hidden gap-2 py-4">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconMapPin className="text-orange-500" size={18} /> Discovery
              Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Age Range
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {discovery.ageRange.min} - {discovery.ageRange.max} years
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Radius
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {discovery.distanceRange} km
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white shadow-sm mt-2">
              <div className="flex items-center gap-3">
                <IconEye size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Global Visibility
                  </p>
                  <p className="text-[11px] text-slate-500 capitalize">
                    {discovery.globalVisibility}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold">
                CHANGE
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 5. ACCESS & TRUST CARD */}
        <Card className="border-slate-200 shadow-sm overflow-hidden gap-2 py-4">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconShieldLock className="text-emerald-500" size={18} /> Access &
              Trust
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2 space-y-4">
            <VerificationRow
              label="Primary Email"
              subLabel={
                userData.isEmailVerified
                  ? "Verified Email"
                  : "Verification Pending"
              }
              isVerified={userData.isEmailVerified}
              icon={<IconLockAccess size={18} className="text-slate-400" />}
            />
            <VerificationRow
              label="Phone Connection"
              subLabel={account.phone || "No phone linked"}
              isVerified={userData.isPhoneVerified}
              icon={<IconLockAccess size={18} className="text-slate-400" />}
            />
          </CardContent>
        </Card>

        {/* 6. PRIVACY & RESTRICTIONS */}
        <Card className="border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconShieldLock className="text-rose-500" size={18} /> Restricted
              Access
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Blocked Users Section */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      Blocked Profiles
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Users this person has manually blocked.
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-600"
                  >
                    {settings.blockedUsers?.length || 0} Users
                  </Badge>
                </div>

                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {settings.blockedUsers?.length > 0 ? (
                    settings.blockedUsers.map((id) => (
                      <div
                        key={id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <code className="text-[10px] font-mono text-slate-600">
                          {id}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          Unblock
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl">
                      <p className="text-xs text-slate-400">No blocked users</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Blocked Contacts Section */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900">
                      Blocked Contacts
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Synced contacts hidden from discovery.
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-600"
                  >
                    {settings.blockedContacts?.length || 0} Contacts
                  </Badge>
                </div>

                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {settings.blockedContacts?.length > 0 ? (
                    settings.blockedContacts.map((contact, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-2 rounded-lg bg-slate-50 border border-slate-100 gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                        <span className="text-[11px] font-medium text-slate-600 truncate">
                          {contact}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl">
                      <p className="text-xs text-slate-400">
                        No contacts blocked
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7. DANGER ZONE */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
          <h4 className="text-xs font-black uppercase tracking-widest text-rose-600">
            Critical Actions
          </h4>
        </div>

        <Card className="border-rose-200 bg-rose-50/20 overflow-hidden shadow-sm gap-2 py-4">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row items-center justify-between p-8 gap-8">
              <div className="space-y-2 text-center lg:text-left">
                <h5 className="text-lg font-bold text-slate-900">
                  Permanent Account Termination
                </h5>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  Wipe all user data including matches, private media, and
                  financial history.
                  <span className="block mt-1 font-bold text-rose-600">
                    This bypasses soft-deletion and cannot be recovered.
                  </span>
                </p>
              </div>

              <Button
                variant="destructive"
                className="w-full lg:w-auto px-10 h-14 rounded-xl shadow-lg shadow-rose-200 hover:scale-[1.02] transition-transform flex flex-col items-center justify-center"
                onClick={handleDeleteAccount}
              >
                <div className="flex items-center gap-2">
                  <IconTrash size={20} />
                  <span className="font-black uppercase tracking-tight text-sm">
                    Terminate UID: {userData._id.slice(-6)}
                  </span>
                </div>
              </Button>
            </div>
            <div className="bg-rose-600/5 px-8 py-3 border-t border-rose-100 flex items-center justify-center lg:justify-start gap-2">
              <IconAlertTriangle size={14} className="text-rose-500" />
              <p className="text-[10px] text-rose-500 font-black uppercase tracking-tighter">
                Manual review required before execution
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

const VerificationRow = ({ label, subLabel, isVerified, icon }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white group hover:border-indigo-100 transition-all shadow-sm">
    <div className="flex items-center gap-4 min-w-0">
      <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-900 truncate">{label}</p>
        <p className="text-[11px] text-slate-500 truncate font-medium">
          {subLabel}
        </p>
      </div>
    </div>
    <div className="ml-4">
      {isVerified ? (
        <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 px-2 py-0 h-6 text-[10px] font-bold">
          <IconCircleCheck size={12} className="mr-1" /> VERIFIED
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="bg-slate-50 text-slate-400 border-slate-200 px-2 py-0 h-6 text-[10px] font-bold"
        >
          <IconCircleX size={12} className="mr-1" /> PENDING
        </Badge>
      )}
    </div>
  </div>
);
