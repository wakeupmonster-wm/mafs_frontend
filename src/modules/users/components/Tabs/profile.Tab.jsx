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
  IconQuote,
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
import { FaCheckCircle } from "react-icons/fa";
import { GoUnverified } from "react-icons/go";
import { PreLoader } from "@/app/loader/preloader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const ProfileTab = ({ userData: initialUserData, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  // const [verifyActionType, setVerifyActionType] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // 2. Select the user from Redux
  const { user, loading } = useSelector((state) => state.users);

  const userData = user || initialUserData;
  // const verification = userData?.verification;

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

  // const handleVerifyConfirm = async (status, reason) => {
  //   setIsVerifying(true);
  //   try {
  //     await dispatch(
  //       verifyUserProfile({
  //         userId: userData._id,
  //         action: status === "approved" ? "approve" : "reject",
  //         reason: status === "rejected" ? reason : undefined,
  //       }),
  //     ).unwrap();
  //     toast.success(`Identity ${status} successfully`);
  //     setIsVerifyModalOpen(false);
  //   } catch (err) {
  //     toast.error(err || "Failed to update verification");
  //   } finally {
  //     setIsVerifying(false);
  //   }
  // };

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
    // console.log("status: ", status, "reason: ", reason);
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

                {/* <div className="mt-6 space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {props?.profile?.nickname}
                  </h3>
                  <div className="flex items-start justify-center gap-2 text-slate-500 font-medium">
                    <IconMapPin className="w-12 h-6 text-rose-500 text-start" />
                    <h5 className="text-xs">{props?.userLoc?.full_address}</h5>
                  </div>
                </div>

                <div className="w-full mt-8 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Location Context
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] font-bold uppercase py-0 px-1.5",
                        userLatitude && userLongitude ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-slate-400"
                      )}
                    >
                      {userLatitude && userLongitude ? "Located" : "Offline"}
                    </Badge>
                  </div>
                  <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center grayscale opacity-60">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Map view placeholder
                    </span>
                  </div>
                </div> */}

                <div className="mt-6 space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {props?.profile?.nickname}
                  </h3>
                  <div className="flex items-start justify-center gap-2 text-slate-500 font-medium">
                    <IconMapPin className="w-12 h-6 text-rose-500 text-start" />
                    <h5 className="text-xs">
                      {props?.userLoc?.full_address ||
                        `${props?.userLoc?.city}, ${props?.userLoc?.state}, ${props?.userLoc?.country}`}
                    </h5>
                  </div>
                </div>

                <div className="w-full mt-8 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Location Context
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] font-bold uppercase py-0 px-1.5",
                        userLatitude && userLongitude
                          ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                          : "text-slate-400",
                      )}
                    >
                      {userLatitude && userLongitude ? "Located" : "Offline"}
                    </Badge>
                  </div>
                  {userLatitude && userLongitude ? (
                    <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative z-0 group">
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

                {/* <div className="w-full mt-8 pt-6 border-t border-slate-200 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Recent Login History
                    </span>
                    <IconHistory
                      size={16}
                      strokeWidth={2.5}
                      className="text-brand-aqua"
                    />
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {props?.account?.loginHistory?.length > 0 ? (
                      props.account.loginHistory.map((login, idx) => (
                        <div key={idx} className="flex gap-3 relative">
                          {/* Timeline Line 
                          {idx !== props.account.loginHistory.length - 1 && (
                            <div className="absolute left-[11px] top-6 w-[1px] h-full bg-slate-100" />
                          )}

                          {/* Status Dot 
                          <div
                            className={cn(
                              "mt-1.5 w-[22px] h-[22px] rounded-full border-4 border-white shadow-sm shrink-0 z-10",
                              idx === 0 ? "bg-emerald-500" : "bg-slate-200",
                            )}
                          />

                          <div className="flex flex-col min-w-0">
                            <p className="text-[13px] font-bold text-slate-800 truncate">
                              {login.device || "Unknown Device"}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <span className="truncate">
                                {login.ipAddress}
                              </span>
                              <span>•</span>
                              <span className="whitespace-nowrap">
                                {new Date(login.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 bg-slate-100/50 rounded-lg border border-dashed border-slate-400">
                        <p className="text-[10px] text-slate-500 font-medium">
                          No recent login data
                        </p>
                      </div>
                    )}
                  </div>
                </div> */}

                <div className="w-full mt-8 pt-6 border-t border-slate-200 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Recent Login History
                    </span>
                    <IconHistory
                      size={16}
                      strokeWidth={2.5}
                      className="text-brand-aqua"
                    />
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {/* ⚡ Path Update: props.userData.security.history */}
                    {props?.security?.history?.length > 0 ? (
                      props?.security?.history?.map((login, idx) => (
                        <div
                          key={login._id || idx}
                          className="flex gap-3 relative"
                        >
                          {/* Timeline Line */}
                          {idx !== props?.security?.history?.length - 1 && (
                            <div className="absolute left-[11px] top-6 w-[1px] h-full bg-slate-100" />
                          )}

                          {/* Status Dot */}
                          <div
                            className={cn(
                              "mt-1.5 w-[22px] h-[22px] rounded-full border-4 border-white shadow-sm shrink-0 z-10",
                              idx === 0 ? "bg-emerald-500" : "bg-slate-200",
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
                              <span>•</span>
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
                                <span className="text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full font-bold uppercase">
                                  OK
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 bg-slate-100/50 rounded-lg border border-dashed border-slate-400">
                        <p className="text-[10px] text-slate-500 font-medium">
                          No recent login data
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- REPORT HISTORY SECTION START --- */}
                <div className="w-full mt-8 pt-6 border-t border-slate-200 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Report History
                      </span>
                      {/* Pending Reports Badge */}
                      {props?.stats?.pendingReports > 0 && (
                        <Badge className="rounded-sm bg-brand-aqua/20 hover:bg-brand-aqua/80 border border-brand-aqua text-[9px] h-4 px-1.5">
                          {props.stats.pendingReports} Pending
                        </Badge>
                      )}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400">
                      Total: {props?.stats?.totalReports || 0}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {props?.reports?.length > 0 ? (
                      <>
                        {/* Only showing the latest 2 reports for a clean look */}
                        {props.reports.slice(0, 2).map((report, idx) => (
                          <div
                            key={report._id}
                            className="p-3 rounded-xl border border-l-0 border-dashed border-slate-300 bg-slate-50/50 flex flex-col gap-1.5 relative overflow-hidden"
                          >
                            {/* Severity Indicator Line */}
                            <div
                              className={cn(
                                "absolute border-l-4 left-0 top-0 bottom-0",
                                report.severity === "high"
                                  ? "border-rose-500"
                                  : report.severity === "medium"
                                    ? "border-amber-500"
                                    : "border-blue-400",
                              )}
                            />

                            <div className="flex justify-between items-start pl-1">
                              <span className="text-[11px] font-black uppercase text-slate-400 tracking-tighter">
                                Reason:{" "}
                                <span className="text-slate-900">
                                  {report.reason}
                                </span>
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[9px] py-0 h-4 bg-white capitalize ${
                                  report.status === "new"
                                    ? "text-amber-500 border-amber-300 bg-amber-100"
                                    : "text-green-500 border-green-300 bg-green-100"
                                }`}
                              >
                                {report.status}
                              </Badge>
                            </div>

                            <div className="flex items-center justify-between pl-1">
                              <div className="flex items-center gap-1">
                                <IconUser
                                  size={14}
                                  className="text-slate-500"
                                />
                                <span className="text-[10px] text-slate-500">
                                  By {report.reporterNickname}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400">
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
                          className="w-full mt-2 py-2.5 px-4 rounded-lg border border-brand-aqua bg-brand-aqua/20 hover:bg-brand-aqua/50 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                        >
                          View Full Report History ({props.stats.totalReports})
                          <IconChevronRight size={14} strokeWidth={3} />
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-6 bg-emerald-100/30 rounded-xl border border-dashed border-emerald-300">
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
                          colorStyles[item.color],
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
                              "px-1 py-0 h-4 flex items-center justify-center border-none",
                              item.verified
                                ? "text-green-500 bg-green-50/50"
                                : "text-red-600",
                            )}
                          >
                            {item.verified ? (
                              <FaCheckCircle
                                size={14}
                                title="Verified Profile"
                              />
                            ) : (
                              <GoUnverified
                                size={18}
                                strokeWidth={1}
                                title="Unverified Profile"
                              />
                            )}
                          </Badge>
                        ) : (
                          // <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] font-bold px-2 py-0 h-6 flex items-center gap-1.5">
                          //   {item.val?.toLowerCase() === "phone" ? (
                          //     <Phone size={12} className="text-slate-500" />
                          //   ) : (
                          //     <Mail size={12} className="text-slate-500" />
                          //   )}
                          //   <span>{item.val || "Email"}</span>
                          // </Badge>
                          <></>
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
                      {props?.profile?.totalCompletion || 0}%
                    </span>
                  </div>

                  {/* Custom Progress Bar */}
                  <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-brand-aqua transition-all duration-1000 ease-out"
                      style={{
                        width: `${props?.profile?.totalCompletion ?? 0}%`,
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* BIO SECTION */}
            <Card className="overflow-hidden shadow-sm border-slate-200 bg-white rounded-xl py-1 pb-5 gap-2">
              {/* HEADER: Clean & Minimal */}
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 py-5 px-6 bg-slate-50/30">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <IconUser
                      size={18}
                      className="text-brand-aqua"
                      strokeWidth={2.5}
                    />
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
                        : `${
                            new Date().getFullYear() -
                            new Date(props?.profile?.dob).getFullYear()
                          } Yrs`,
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
                        "p-4 rounded-lg border transition-all hover:shadow-md hover:border-indigo-100",
                        attr.highlight
                          ? "bg-indigo-50/30 border-indigo-100"
                          : "bg-white border-slate-100",
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
