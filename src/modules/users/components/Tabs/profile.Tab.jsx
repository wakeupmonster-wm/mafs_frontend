import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconAlertTriangle,
  IconBriefcase,
  IconCalendar,
  IconChartBar,
  IconCheck,
  IconDeviceMobile,
  IconExternalLink,
  IconHeart,
  IconLock,
  IconMail,
  IconMapPin,
  IconMaximize,
  IconQuote,
  IconShieldCheck,
  IconSparkles,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { EditProfileDialog } from "../Dialogs/edit.profile.Dialog";
import { Separator } from "@/components/ui/separator";
import { DetailRow } from "../detailRow";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VerifyUserModal } from "../VerifyUserModal";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserProfile } from "../../store/user.slice";
import { toast } from "sonner";

export const ProfileTab = ({ userData: initialUserData, ...props }) => {
  const dispatch = useDispatch();
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyActionType, setVerifyActionType] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const liveUser = useSelector((state) =>
    state.users.items.find((u) => u._id === initialUserData._id)
  );

  const userData = liveUser || initialUserData;
  const verification = userData?.verification;

  const handleVerifyConfirm = async (status, reason) => {
    setIsVerifying(true);
    try {
      await dispatch(
        verifyUserProfile({
          userId: userData._id,
          action: status === "approved" ? "approve" : "reject",
          reason: status === "rejected" ? reason : undefined,
        })
      ).unwrap();
      toast.success(`Identity ${status} successfully`);
      setIsVerifyModalOpen(false);
    } catch (err) {
      toast.error(err || "Failed to update verification");
    } finally {
      setIsVerifying(false);
    }
  };

  // Color map to fix Tailwind dynamic class issues
  const colorStyles = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    orange: "bg-rose-50 border-rose-200 text-rose-600", // Using rose for the red 'Lock' look in image
  };

  const connectivityItems = [
    {
      label: "Email",
      val: props?.account?.email,
      icon: <IconMail />,
      color: "blue",
      verified: userData.isEmailVerified,
    },
    {
      label: "Phone",
      val: props?.account?.phone,
      icon: <IconDeviceMobile />,
      color: "green",
      verified: userData.isPhoneVerified,
    },
    {
      label: "Auth",
      val: props?.account?.authMethod || "Email",
      icon: <IconLock />,
      color: "orange",
    },
  ];

  console.log("verification: ", verification);

  return (
    <>
      <TabsContent
        value="profile"
        className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: IDENTITY SUMMARY */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="pt-8 flex flex-col items-center text-center px-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <Avatar className="h-40 w-40 border border-slate-100 shadow-lg transition-transform group-hover:scale-[1.02]">
                        <AvatarImage
                          src={props?.photos?.[0]?.url}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-4xl bg-slate-50 text-slate-400 font-bold">
                          {props?.profile?.nickname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconMaximize className="text-slate-700" size={24} />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-md border-none bg-transparent shadow-none p-0">
                    <img
                      src={props?.photos?.[0]?.url}
                      alt="Profile"
                      className="w-full rounded-2xl shadow-2xl"
                    />
                  </DialogContent>
                </Dialog>

                <div className="mt-6 space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {props?.profile?.nickname}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-slate-500 font-medium">
                    <IconMapPin size={16} className="text-rose-500" />
                    <span className="text-sm">
                      {props?.userLoc?.city}, {props?.userLoc?.country}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-8 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Location Context
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[9px] font-bold text-slate-400 uppercase py-0 px-1.5"
                    >
                      Offline
                    </Badge>
                  </div>
                  <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center grayscale opacity-60">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Map view placeholder
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: SYSTEM DATA & BIO */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              {/* ACCOUNT CONNECTIVITY CARD */}
              <Card className="flex-[3] p-6 shadow-sm border-slate-200 flex flex-col justify-center">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Account Connectivity
                </h3>

                <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
                  {connectivityItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {/* Icon Box */}
                      <div
                        className={cn(
                          "p-2.5 rounded-xl border transition-colors",
                          colorStyles[item.color]
                        )}
                      >
                        {React.cloneElement(item.icon, { size: 20, stroke: 2 })}
                      </div>

                      {/* Data & Label */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900">
                          {item.label === "Auth" ? (
                            <span className="text-slate-400 font-medium mr-1">
                              Auth:
                            </span>
                          ) : null}
                          {item.val || "-"}
                        </span>

                        {/* Status Badges */}
                        {item.verified !== undefined ? (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] font-bold px-2 py-0 h-6 border-slate-200",
                              item.verified
                                ? "text-slate-900 bg-white"
                                : "text-slate-400"
                            )}
                          >
                            {item.verified ? "Verified" : "Unverified"}
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] font-bold px-2 py-0 h-6">
                            {item.val || "Email"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* PROFILE QUALITY CARD */}
              <Card className="flex-1 p-6 shadow-sm border-slate-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Profile Quality
                  </h3>
                  <IconChartBar size={20} className="text-slate-400" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">
                      {props?.profile?.totalCompletion || 82}%
                    </span>
                  </div>

                  {/* Custom Progress Bar */}
                  <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-1000 ease-out"
                      style={{
                        width: `${props?.profile?.totalCompletion || 0}%`,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* BIO SECTION */}
            <Card className="overflow-hidden shadow-sm border-slate-200 bg-white rounded-3xl py-1 pb-5 gap-2">
              {/* HEADER: Clean & Minimal */}
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 py-5 px-6 bg-slate-50/30">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <IconUser size={16} className="text-indigo-500" />
                  </div>
                  Bio & Core Attributes
                </CardTitle>
                <EditProfileDialog userData={userData} />
              </CardHeader>

              <CardContent className="px-5 space-y-6">
                {/* STORY / ABOUT: The Narrative Focus */}
                <div className="relative">
                  <IconQuote
                    size={40}
                    className="absolute -top-4 -left-4 text-slate-100 -z-0 opacity-50"
                    stroke={1.5}
                  />
                  <div className="relative z-10">
                    <p className="text-slate-600 text-base leading-relaxed font-medium pl-6 border-l-4 border-indigo-500/20 py-1 italic">
                      {props?.profile?.about ||
                        "User hasn't shared their story yet..."}
                    </p>
                  </div>
                </div>

                {/* ATTRIBUTE GRID: "Pill" Style Attributes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Nickname", value: props?.profile?.nickname },
                    { label: "Gender", value: props?.profile?.gender },
                    {
                      label: "Age",
                      value: props?.profile?.age
                        ? `${props?.profile.age} Yrs`
                        : "-",
                    },
                    {
                      label: "Zodiac",
                      value: props?.attributes?.zodiac,
                      highlight: true,
                    },
                  ].map((attr, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-4 rounded-2xl border transition-all hover:shadow-md hover:border-indigo-100",
                        attr.highlight
                          ? "bg-indigo-50/30 border-indigo-100"
                          : "bg-white border-slate-100"
                      )}
                    >
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
                        {attr.label}
                      </p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {attr.value || "Not Set"}
                        {attr.highlight && (
                          <IconSparkles size={12} className="text-indigo-400" />
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-slate-100" />

                {/* DETAILS LIST: Two-column Icon Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                  <DetailRow
                    icon={<IconBriefcase size={18} />}
                    iconBg="bg-blue-50 text-blue-500"
                    label="Occupation"
                    value={props?.profile?.jobTitle || "-"}
                  />
                  <DetailRow
                    icon={<IconHeart size={18} />}
                    iconBg="bg-rose-50 text-rose-500"
                    label="Seeking"
                    value={
                      props?.discovery?.relationshipGoal || "Not Specified"
                    }
                  />
                  <DetailRow
                    icon={<IconCalendar size={18} />}
                    iconBg="bg-amber-50 text-amber-500"
                    label="Joined Date"
                    value={new Date(
                      props?.account?.createdAt
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  />
                  <DetailRow
                    icon={<IconMapPin size={18} />}
                    iconBg="bg-emerald-50 text-emerald-500"
                    label="Location"
                    value={props?.userLoc?.full_address || "-"}
                  />
                </div>
              </CardContent>
            </Card>

            {/* VERIFICATION ACTION CARD */}
            <Card
              className={cn(
                "shadow-sm transition-all border-2",
                verification?.status === "approved"
                  ? "border-emerald-100 bg-emerald-50/10"
                  : "border-amber-100 bg-amber-50/10"
              )}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                    <div
                      className={cn(
                        "p-3 rounded-xl",
                        verification?.status === "approved"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                      )}
                    >
                      <IconShieldCheck size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        Identity Verification
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Verify documents against profile selfie
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white flex-1 md:flex-none border-slate-200"
                      onClick={() => window.open(verification?.selfieUrl)}
                    >
                      <IconExternalLink size={14} className="mr-2" /> Selfie
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white flex-1 md:flex-none border-slate-200"
                      onClick={() => window.open(verification?.docUrl)}
                    >
                      <IconExternalLink size={14} className="mr-2" /> ID Card
                    </Button>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-slate-200 gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Moderator Review Action
                  </span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:bg-rose-50 flex-1 sm:flex-none"
                      onClick={() => {
                        setVerifyActionType("rejected");
                        setIsVerifyModalOpen(true);
                      }}
                    >
                      <IconX size={16} className="mr-1" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none px-6"
                      onClick={() => {
                        setVerifyActionType("approved");
                        setIsVerifyModalOpen(true);
                      }}
                      disabled={
                        isVerifying || verification?.status === "approved"
                      }
                    >
                      {isVerifying ? (
                        "Processing..."
                      ) : (
                        <>
                          <IconCheck size={16} className="mr-1" /> Approve
                          Identity
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {verification?.status === "rejected" && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2">
                    <IconAlertTriangle
                      className="text-rose-500 shrink-0 mt-0.5"
                      size={16}
                    />
                    <p className="text-[11px] text-rose-700 font-medium">
                      <span className="font-bold mr-1 uppercase">Reason:</span>
                      {verification.rejectionReason}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <VerifyUserModal
        isOpen={isVerifyModalOpen}
        actionType={verifyActionType}
        onClose={() => setIsVerifyModalOpen(false)}
        onConfirm={handleVerifyConfirm}
        userName={props?.profile?.nickname}
      />
    </>
  );
};
