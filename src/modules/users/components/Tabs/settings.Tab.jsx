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
} from "@tabler/icons-react";
import { EditSettingsDialog } from "../Dialogs/edit.Settings.Dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SettingsTab = ({ userData, account }) => {
  const handleDeleteAccount = () => {
    // In a real app, trigger a ConfirmModal here
    console.log("Initiating account deletion for:", userData._id);
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
            Manage administrative permissions and account lifecycle.
          </p>
        </div>
        <EditSettingsDialog userData={userData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. GOVERNANCE & STATUS CARD */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconUserShield className="text-indigo-500" size={18} /> Account
              Governance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
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

        {/* 3. SECURITY & ACCESS CARD */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 py-4 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <IconShieldLock className="text-emerald-500" size={18} /> Access &
              Trust
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <VerificationRow
              label="Primary Email"
              subLabel={account.email}
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
      </div>

      {/* 4. DANGER ZONE - High Contrast Refactor */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
          <h4 className="text-xs font-black uppercase tracking-widest text-rose-600">
            Critical Actions
          </h4>
        </div>

        <Card className="border-rose-200 bg-rose-50/20 overflow-hidden shadow-sm">
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
