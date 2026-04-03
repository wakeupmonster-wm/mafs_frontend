import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabsContent } from "@/components/ui/tabs";
import {
  IconBriefcase,
  IconCalendar,
  IconChartBar,
  IconChevronRight,
  IconDeviceMobile,
  IconHeart,
  IconHistory,
  IconLock,
  IconMail,
  IconMapPin,
  IconMaximize,
  IconSparkles,
  IconUser,
} from "@tabler/icons-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet when using Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});
import { EditProfileDialog } from "../Dialogs/edit.profile.Dialog";
import { Separator } from "@/components/ui/separator";
import { DetailRow } from "../detailRow";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, verifyUserProfile } from "../../store/user.slice";
import { toast } from "sonner";
import VerificationCard from "../verification.card";
import { PiSealCheckFill, PiSealQuestionFill } from "react-icons/pi";
import { PreLoader } from "@/app/loader/preloader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";

export const ProfileTab = ({ userData: initialUserData, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(false);

  // 2. Select the user from Redux
  const { user, loading } = useSelector((state) => state.users);

  const userData = user || initialUserData;

  // Extract location data, handling different possible structures
  const userLatitude =
    props?.userLoc?.latitude ||
    props?.userLoc?.lat ||
    props?.userLoc?.coordinates?.[1] ||
    props?.userLoc?.location?.coordinates?.[1];

  const userLongitude =
    props?.userLoc?.longitude ||
    props?.userLoc?.lng ||
    props?.userLoc?.lon ||
    props?.userLoc?.coordinates?.[0] ||
    props?.userLoc?.location?.coordinates?.[0];

  // Color map to fix Tailwind dynamic class issues
  const colorStyles = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    orange: "bg-rose-50 border-rose-200 text-rose-600",
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

  const handleApprove = async (status) => {
    setIsVerifying(true);
    try {
      await dispatch(
        verifyUserProfile({
          userId: userData._id,
          action: status === "approved" ? "approve" : "reject",
        }),
      ).unwrap();
      // 2. AUTOMATICALLY RE-FETCH the fresh data from the server
      await dispatch(fetchUserData(userData._id));
      toast.success(`Identity ${status} successfully`);
    } catch (err) {
      toast.error(err || "Failed to update verification");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReject = async (reason, status) => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    await dispatch(
      verifyUserProfile({
        userId: userData._id,
        action: status === "approved" ? "approve" : "reject",
        reason: status === "rejected" ? reason : undefined,
      }),
    ).unwrap();

    // 2. AUTOMATICALLY RE-FETCH the fresh data from the server
    await dispatch(fetchUserData(userData._id));
    toast.success(`Identity ${status} successfully`);
    setIsVerifying(false);
  };

  if (loading) {
    return <PreLoader />;
  }

  console.log("userData: ", userData);

  // Quality description based on completion %
  const completionPercent = props?.profile?.totalCompletion || 0;
  const qualityLabel =
    completionPercent >= 90
      ? "Excellent"
      : completionPercent >= 70
        ? "Good"
        : completionPercent >= 40
          ? "Fair"
          : "Needs Work";
  const qualityColor =
    completionPercent >= 90
      ? "text-emerald-600"
      : completionPercent >= 70
        ? "text-blue-600"
        : completionPercent >= 40
          ? "text-amber-600"
          : "text-rose-600";

  return (
    <>
      <TabsContent
        value="profile"
        className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500 focus-visible:ring-offset-0 focus-visible:ring-0"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* ═══════════════════════════════════════════════════════ */}
          {/* LEFT COLUMN: IDENTITY SUMMARY                         */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <Card className="border-slate-200/80 shadow-sm py-6 overflow-hidden gap-0">
              {/* Gradient Header Behind Avatar */}
              <div className="relative flex flex-col items-center">
                {/* Subtle decorative circles */}
                <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-brand-aqua/5 blur-xl" />
                <div className="absolute bottom-0 left-4 w-10 h-10 rounded-full bg-indigo-200/20 blur-lg" />

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-1 bg-gradient-to-br from-brand-aqua/20 to-indigo-400/20 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                      <Avatar className="relative h-36 w-36 ring-4 ring-slate-100 shadow-lg transition-transform duration-300 group-hover:scale-[1.03]">
                        <AvatarImage
                          src={props?.photos?.[0]?.url}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-4xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-400 font-bold">
                          {props?.profile?.nickname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -inset-[0.150em] flex items-center justify-center bg-black/10 backdrop-blur-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <IconMaximize
                          className="text-white drop-shadow-xl"
                          size={32}
                        />
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

                <div className="mt-5 space-y-1.5 text-center px-4">
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                    {props?.profile?.nickname}
                  </h3>
                  {/* <div className="flex items-center justify-center text-muted-foreground">
                    <IconMapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span
                      className="w-44 line-clamp-1 cursor-pointer text-xs font-medium leading-tight"
                      title={
                        props?.userLoc?.full_address ||
                        `${props?.userLoc?.city}, ${props?.userLoc?.state}, ${props?.userLoc?.country}`
                      }
                    >
                      {props?.userLoc?.full_address ||
                        `${props?.userLoc?.city}, ${props?.userLoc?.state}, ${props?.userLoc?.country}`}
                    </span>
                  </div> */}
                </div>
              </div>

              <CardContent className="px-5">
                {/* LOCATION CONTEXT */}
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
                      Location Context
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] font-bold uppercase py-0 px-1.5 rounded-md",
                        userLatitude && userLongitude
                          ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                          : "text-slate-400 border-slate-200 bg-slate-50",
                      )}
                    >
                      {userLatitude && userLongitude ? "Located" : "Offline"}
                    </Badge>
                  </div>
                  {userLatitude && userLongitude ? (
                    <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative z-0 group shadow-sm">
                      <MapContainer
                        center={[userLatitude, userLongitude]}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "0.75rem",
                          minHeight: "200px",
                        }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[userLatitude, userLongitude]}>
                          <Popup>
                            <div className="text-center">
                              <p className="font-bold">
                                {props?.profile?.nickname}
                              </p>
                              <p className="text-xs text-slate-500">
                                {props?.userLoc?.city},{" "}
                                {props?.userLoc?.country}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>

                      {/* Fullscreen Map Dialog Overlay */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="absolute top-2 right-2 z-[400] bg-white/80 hover:bg-white backdrop-blur-sm p-1.5 rounded-lg shadow-sm border border-slate-200 cursor-pointer transition-all opacity-0 group-hover:opacity-100">
                            <IconMaximize
                              size={16}
                              className="text-slate-700"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 border-none rounded-2xl overflow-hidden flex flex-col">
                          <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-3 shrink-0">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                              <IconMapPin
                                size={20}
                                className="text-emerald-500"
                              />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-slate-900">
                                {props?.profile?.nickname}'s Location
                              </h3>
                              <p className="text-sm text-slate-500">
                                {props?.userLoc?.city},{" "}
                                {props?.userLoc?.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex-1 w-full relative z-0">
                            <MapContainer
                              center={[userLatitude, userLongitude]}
                              zoom={14}
                              scrollWheelZoom={true}
                              style={{ height: "100%", width: "100%" }}
                            >
                              <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              />
                              <Marker position={[userLatitude, userLongitude]}>
                                <Popup>
                                  <div className="text-center">
                                    <p className="font-bold">
                                      {props?.profile?.nickname}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      {props?.userLoc?.city},{" "}
                                      {props?.userLoc?.country}
                                    </p>
                                  </div>
                                </Popup>
                              </Marker>
                            </MapContainer>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center grayscale opacity-60">
                      <span className="text-[10px] text-slate-400 font-medium">
                        Map view placeholder
                      </span>
                    </div>
                  )}
                </div>

                {/* LOGIN HISTORY */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
                      Recent Login History
                    </span>
                    <div className="p-1.5 rounded-lg bg-brand-aqua/10">
                      <IconHistory
                        size={14}
                        strokeWidth={2.5}
                        className="text-brand-aqua"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {/* ⚡ Path Update: props.userData.security.history */}
                    {props?.security?.history?.length > 0 ? (
                      props?.security?.history?.map((login, idx) => (
                        <div
                          key={login._id || idx}
                          className="flex gap-3 relative group/login"
                        >
                          {/* Timeline Line */}
                          {idx !== props?.security?.history?.length - 1 && (
                            <div className="absolute left-[11px] top-6 w-[1px] h-full bg-gradient-to-b from-slate-200 to-transparent" />
                          )}

                          {/* Status Dot */}
                          <div
                            className={cn(
                              "mt-1.5 w-[22px] h-[22px] rounded-full border-[3px] border-white shadow-sm shrink-0 z-10 transition-transform group-hover/login:scale-110",
                              idx === 0
                                ? "bg-emerald-500 shadow-emerald-200"
                                : "bg-slate-200",
                            )}
                          />

                          <div className="flex flex-col min-w-0">
                            <p className="text-[13px] font-bold text-slate-800 truncate">
                              {login.device || "Unknown Device"}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <span className="truncate">
                                {/* ⚡ Field Name: aapke JSON mein 'ip' hai, 'ipAddress' nahi */}
                                {login.ip}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="whitespace-nowrap">
                                {/* ⚡ Formatting Date */}
                                {new Date(login.timestamp).toLocaleString([], {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {/* Login Status Badge (Optional) */}
                              {login.status === "success" && (
                                <span className="text-[8px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                  OK
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-5 bg-slate-50/80 rounded-xl border border-dashed border-slate-200">
                        <IconHistory
                          size={18}
                          className="mx-auto text-slate-300 mb-1.5"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">
                          No recent login data
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- REPORT HISTORY SECTION --- */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest">
                        Report History
                      </span>
                      {/* Pending Reports Badge */}
                      {props?.stats?.pendingReports > 0 && (
                        <Badge className="rounded-md bg-brand-aqua/15 hover:bg-brand-aqua/80 border border-brand-aqua/40 text-[9px] h-4 px-1.5 font-bold">
                          {props.stats.pendingReports} Pending
                        </Badge>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 tabular-nums">
                      Total: {props?.stats?.totalReports || 0}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {props?.reports?.length > 0 ? (
                      <>
                        {/* Only showing the latest 2 reports for a clean look */}
                        {props.reports.slice(0, 2).map((report, idx) => (
                          <div
                            key={report._id}
                            className="p-3 rounded-xl border border-l-0 border-slate-200/80 bg-white flex flex-col gap-1.5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            {/* Severity Indicator Line */}
                            <div
                              className={cn(
                                "absolute border-l-[3px] left-0 top-0 bottom-0",
                                report.severity === "high"
                                  ? "border-rose-500"
                                  : report.severity === "medium"
                                    ? "border-amber-500"
                                    : "border-blue-400",
                              )}
                            />

                            <div className="flex justify-between items-start pl-2">
                              <span className="text-[11px] font-black uppercase text-slate-400 tracking-tighter">
                                Reason:{" "}
                                <span className="text-slate-900 normal-case font-bold">
                                  {report.reason}
                                </span>
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[9px] py-0 h-4 capitalize rounded-md ${
                                  report.status === "new"
                                    ? "text-amber-600 border-amber-200 bg-amber-50"
                                    : "text-green-600 border-green-200 bg-green-50"
                                }`}
                              >
                                {report.status}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between pl-2">
                              <div className="flex items-center gap-1">
                                <IconUser
                                  size={13}
                                  className="text-slate-400"
                                />
                                <span className="text-[10px] text-slate-500 font-medium">
                                  By {report.reporterNickname}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 tabular-nums">
                                {new Date(report.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        ))}

                        {/* View Full History Button */}
                        <Button
                          onClick={() => {
                            navigate(
                              `../../profile-reports/review/${userData._id}`,
                            );
                          }}
                          className="w-full mt-1.5 py-2.5 px-4 rounded-xl border border-brand-aqua/30 bg-brand-aqua/10 hover:bg-brand-aqua/20 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-none hover:shadow-sm active:scale-[0.98]"
                        >
                          View Full Report History ({props.stats.totalReports})
                          <IconChevronRight size={14} strokeWidth={3} />
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-6 bg-emerald-50/50 rounded-xl border border-dashed border-emerald-200">
                        <FaCheckCircle
                          className="mx-auto text-emerald-400 mb-2"
                          size={20}
                        />
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">
                          Clean Record - No Reports
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* RIGHT COLUMN: SYSTEM DATA & BIO                       */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              {/* ACCOUNT CONNECTIVITY CARD */}
              <Card className="flex-[3] border-slate-200/80 shadow-sm overflow-hidden py-6">
                <CardContent className="flex flex-col justify-center">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-6">
                    Account Connectivity
                  </h3>

                  <div className="flex flex-wrap items-center gap-6">
                    {connectivityItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3.5 px-4 rounded-xl transition-all duration-200"
                      >
                        {/* Icon Box */}
                        <div
                          className={cn(
                            "p-2.5 rounded-xl border transition-all duration-200",
                            colorStyles[item.color],
                          )}
                        >
                          {React.cloneElement(item.icon, {
                            size: 18,
                            stroke: 2,
                          })}
                        </div>

                        {/* Data & Label */}
                        <div className="flex items-center justify-center gap-2.5">
                          <div className="flex flex-col">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground mb-0.5">
                              {item.label}
                            </p>
                            <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                              {/* {item.label === "Auth" && (
                                <span className="text-muted-foreground font-medium mr-1 text-xs">
                                  via
                                </span>
                              )} */}
                              {item.val || "-"}
                              {/* Status Badges */}
                              {item.verified !== undefined && (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "px-1 h-10 flex items-center justify-center border-none rounded-full",
                                    item.verified
                                      ? "text-sky-500"
                                      : "text-red-500",
                                  )}
                                >
                                  {item.verified ? (
                                    <PiSealCheckFill
                                      size={16}
                                      strokeWidth={1}
                                      title="Verified Profile"
                                    />
                                  ) : (
                                    <PiSealQuestionFill
                                      size={18}
                                      strokeWidth={1}
                                      title="Unverified Profile"
                                    />
                                  )}
                                </Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* PROFILE QUALITY CARD */}
              <Card className="flex-1 py-4 border-slate-200/80 shadow-sm overflow-hidden relative">
                {/* Decorative gradient background */}
                {/* <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand-aqua/5 to-transparent rounded-bl-full" /> */}
                <CardContent className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary">
                      Profile Quality
                    </h3>
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      <IconChartBar size={24} className="text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900 tabular-nums">
                        {completionPercent}%
                      </span>
                      <span
                        className={cn(
                          "text-xs font-bold uppercase tracking-wide",
                          qualityColor,
                        )}
                      >
                        {qualityLabel}
                      </span>
                    </div>

                    {/* Custom Gradient Progress Bar */}
                    <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-brand-aqua/80 to-brand-aqua transition-all duration-1000 ease-out"
                        style={{
                          width: `${completionPercent}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* BIO SECTION */}
            <Card className="overflow-hidden border-slate-200/80 shadow-sm bg-slate-50 rounded-xl gap-4">
              {/* HEADER: Clean & Minimal */}
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-6">
                <CardTitle className="text-sm font-bold text-primary flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg border border-slate-200">
                    <LuUserRound
                      size={18}
                      className="text-brand-aqua"
                      strokeWidth={2.5}
                    />
                  </div>
                  Bio & Core Attributes
                </CardTitle>
                <EditProfileDialog userData={userData} />
              </CardHeader>

              <CardContent className="px-6 space-y-4">
                {/* STORY / ABOUT: The Narrative Focus */}
                <div className="relative">
                  {/* <IconQuote
                    size={36}
                    className="absolute -top-3 -left-2 text-indigo-100 -z-0 opacity-60"
                    stroke={1.5}
                  /> */}
                  <div className="relative z-10">
                    <p className="text-[9px] font-black uppercase text-secondary-foreground tracking-[0.12em] mb-1.5">
                      User Bio
                    </p>
                    <p className="text-slate-600 text-[14px] leading-relaxed font-medium pl-6 border-l-[2px] border-indigo-400/30 py-1 italic">
                      {props?.profile?.about ||
                        "User hasn't shared their story yet..."}
                    </p>
                  </div>
                </div>

                {/* ATTRIBUTE GRID: Enhanced Pill Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    {
                      label: "Nickname",
                      value: props?.profile?.nickname,
                      accent: "from-blue-50 to-blue-50/30",
                      borderAccent: "hover:border-blue-200",
                    },
                    {
                      label: "Gender",
                      value: props?.profile?.gender,
                      accent: "from-pink-50 to-pink-50/30",
                      borderAccent: "hover:border-pink-200",
                    },
                    {
                      label: "Age",
                      value: props?.profile?.age
                        ? `${props?.profile.age} Yrs`
                        : "-",
                      accent: "from-amber-50 to-amber-50/30",
                      borderAccent: "hover:border-amber-200",
                    },
                    {
                      label: "DOB",
                      value: props?.profile?.dob
                        ? new Date(props?.profile?.dob).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "-",
                      accent: "from-emerald-50 to-emerald-50/30",
                      borderAccent: "hover:border-emerald-200",
                    },
                    {
                      label: "Zodiac",
                      value: props?.attributes?.zodiac,
                      highlight: true,
                      accent: "from-indigo-50 to-violet-50/30",
                      borderAccent: "hover:border-indigo-200",
                    },
                  ].map((attr, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-default",
                        attr.highlight
                          ? "bg-gradient-to-br from-indigo-50/60 to-violet-50/30 border-indigo-100/80"
                          : `bg-gradient-to-br ${attr.accent} border-slate-100`,
                        attr.borderAccent,
                      )}
                    >
                      <p className="text-[9px] font-black uppercase text-secondary-foreground tracking-[0.12em] mb-1.5">
                        {attr.label}
                      </p>
                      <p className="text-[13px] font-bold text-foreground flex items-center gap-1.5 capitalize">
                        {attr.value || "Not Set"}
                        {attr.highlight && (
                          <IconSparkles size={12} className="text-indigo-400" />
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-slate-100/80" />

                {/* DETAILS LIST: Two-column Icon Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
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
                      props?.account?.createdAt,
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
                    value={
                      props?.userLoc?.city + ", " + props?.userLoc?.state || "-"
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* VERIFICATION ACTION CARD */}
            <VerificationCard
              verification={userData?.verification}
              isVerifying={isVerifying}
              onApprove={handleApprove}
              onReject={handleReject}
              userName={userData?.profile?.nickname}
            />
          </div>
        </div>
      </TabsContent>
    </>
  );
};
