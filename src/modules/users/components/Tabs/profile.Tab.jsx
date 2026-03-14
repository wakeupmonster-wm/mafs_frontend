/* eslint-disable no-unused-vars */
// // import React, { useState } from "react";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { Badge } from "@/components/ui/badge";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// // import { TabsContent } from "@/components/ui/tabs";
// // import {
// //   IconAlertTriangle,
// //   IconBriefcase,
// //   IconCalendar,
// //   IconChartBar,
// //   IconCheck,
// //   IconDeviceMobile,
// //   IconExternalLink,
// //   IconHeart,
// //   IconLock,
// //   IconMail,
// //   IconMapPin,
// //   IconMaximize,
// //   IconQuote,
// //   IconShieldCheck,
// //   IconSparkles,
// //   IconUser,
// //   IconX,
// // } from "@tabler/icons-react";
// // import { EditProfileDialog } from "../Dialogs/edit.profile.Dialog";
// // import { Separator } from "@/components/ui/separator";
// // import { DetailRow } from "../detailRow";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { VerifyUserModal } from "../VerifyUserModal";
// // import { useDispatch, useSelector } from "react-redux";
// // import { verifyUserProfile } from "../../store/user.slice";
// // import { toast } from "sonner";

// // export const ProfileTab = ({ userData: initialUserData, ...props }) => {
// //   const dispatch = useDispatch();
// //   const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
// //   const [verifyActionType, setVerifyActionType] = useState("");
// //   const [isVerifying, setIsVerifying] = useState(false);

// //   const liveUser = useSelector((state) =>
// //     state.users.items.find((u) => u._id === initialUserData._id)
// //   );

// //   const userData = liveUser || initialUserData;
// //   const verification = userData?.verification;

// //   const handleVerifyConfirm = async (status, reason) => {
// //     setIsVerifying(true);
// //     try {
// //       await dispatch(
// //         verifyUserProfile({
// //           userId: userData._id,
// //           action: status === "approved" ? "approve" : "reject",
// //           reason: status === "rejected" ? reason : undefined,
// //         })
// //       ).unwrap();
// //       toast.success(`Identity ${status} successfully`);
// //       setIsVerifyModalOpen(false);
// //     } catch (err) {
// //       toast.error(err || "Failed to update verification");
// //     } finally {
// //       setIsVerifying(false);
// //     }
// //   };

// //   // Color map to fix Tailwind dynamic class issues
// //   const colorStyles = {
// //     blue: "bg-blue-50 border-blue-200 text-blue-600",
// //     green: "bg-green-50 border-green-200 text-green-600",
// //     orange: "bg-rose-50 border-rose-200 text-rose-600", // Using rose for the red 'Lock' look in image
// //   };

// //   const connectivityItems = [
// //     {
// //       label: "Email",
// //       val: props?.account?.email,
// //       icon: <IconMail />,
// //       color: "blue",
// //       verified: userData.isEmailVerified,
// //     },
// //     {
// //       label: "Phone",
// //       val: props?.account?.phone,
// //       icon: <IconDeviceMobile />,
// //       color: "green",
// //       verified: userData.isPhoneVerified,
// //     },
// //     {
// //       label: "Auth",
// //       val: props?.account?.authMethod || "Email",
// //       icon: <IconLock />,
// //       color: "orange",
// //     },
// //   ];

// //   console.log("verification: ", verification);

// //   return (
// //     <>
// //       <TabsContent
// //         value="profile"
// //         className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500"
// //       >
// //         <div className="grid grid-cols-12 gap-6">
// //           {/* LEFT COLUMN: IDENTITY SUMMARY */}
// //           <div className="col-span-12 lg:col-span-4 xl:col-span-3">
// //             <Card className="shadow-sm border-slate-200">
// //               <CardContent className="pt-8 flex flex-col items-center text-center px-6">
// //                 <Dialog>
// //                   <DialogTrigger asChild>
// //                     <div className="relative group cursor-pointer">
// //                       <Avatar className="h-40 w-40 border border-slate-100 shadow-lg transition-transform group-hover:scale-[1.02]">
// //                         <AvatarImage
// //                           src={props?.photos?.[0]?.url}
// //                           className="object-cover"
// //                         />
// //                         <AvatarFallback className="text-4xl bg-slate-50 text-slate-400 font-bold">
// //                           {props?.profile?.nickname?.[0]}
// //                         </AvatarFallback>
// //                       </Avatar>
// //                       <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
// //                         <IconMaximize className="text-slate-700" size={24} />
// //                       </div>
// //                     </div>
// //                   </DialogTrigger>
// //                   <DialogContent className="max-w-md border-none bg-transparent shadow-none p-0">
// //                     <img
// //                       src={props?.photos?.[0]?.url}
// //                       alt="Profile"
// //                       className="w-full rounded-2xl shadow-2xl"
// //                     />
// //                   </DialogContent>
// //                 </Dialog>

// //                 <div className="mt-6 space-y-1">
// //                   <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
// //                     {props?.profile?.nickname}
// //                   </h3>
// //                   <div className="flex items-center justify-center gap-1.5 text-slate-500 font-medium">
// //                     <IconMapPin size={16} className="text-rose-500" />
// //                     <span className="text-sm">
// //                       {props?.userLoc?.city}, {props?.userLoc?.country}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="w-full mt-8 pt-6 border-t border-slate-100">
// //                   <div className="flex justify-between items-center mb-3">
// //                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
// //                       Location Context
// //                     </span>
// //                     <Badge
// //                       variant="outline"
// //                       className="text-[9px] font-bold text-slate-400 uppercase py-0 px-1.5"
// //                     >
// //                       Offline
// //                     </Badge>
// //                   </div>
// //                   <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center grayscale opacity-60">
// //                     <span className="text-[10px] text-slate-400 font-medium">
// //                       Map view placeholder
// //                     </span>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* RIGHT COLUMN: SYSTEM DATA & BIO */}
// //           <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
// //             <div className="flex flex-col lg:flex-row gap-4 w-full">
// //               {/* ACCOUNT CONNECTIVITY CARD */}
// //               <Card className="flex-[3] p-6 shadow-sm border-slate-200 flex flex-col justify-center">
// //                 <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
// //                   Account Connectivity
// //                 </h3>

// //                 <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
// //                   {connectivityItems.map((item, i) => (
// //                     <div key={i} className="flex items-center gap-4">
// //                       {/* Icon Box */}
// //                       <div
// //                         className={cn(
// //                           "p-2.5 rounded-xl border transition-colors",
// //                           colorStyles[item.color]
// //                         )}
// //                       >
// //                         {React.cloneElement(item.icon, { size: 20, stroke: 2 })}
// //                       </div>

// //                       {/* Data & Label */}
// //                       <div className="flex items-center gap-3">
// //                         <span className="text-sm font-bold text-slate-900">
// //                           {item.label === "Auth" ? (
// //                             <span className="text-slate-400 font-medium mr-1">
// //                               Auth:
// //                             </span>
// //                           ) : null}
// //                           {item.val || "-"}
// //                         </span>

// //                         {/* Status Badges */}
// //                         {item.verified !== undefined ? (
// //                           <Badge
// //                             variant="outline"
// //                             className={cn(
// //                               "text-[10px] font-bold px-2 py-0 h-6 border-slate-200",
// //                               item.verified
// //                                 ? "text-slate-900 bg-white"
// //                                 : "text-slate-400"
// //                             )}
// //                           >
// //                             {item.verified ? "Verified" : "Unverified"}
// //                           </Badge>
// //                         ) : (
// //                           <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] font-bold px-2 py-0 h-6">
// //                             {item.val || "Email"}
// //                           </Badge>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </Card>

// //               {/* PROFILE QUALITY CARD */}
// //               <Card className="flex-1 p-6 shadow-sm border-slate-200">
// //                 <div className="flex justify-between items-start">
// //                   <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
// //                     Profile Quality
// //                   </h3>
// //                   <IconChartBar size={20} className="text-slate-400" />
// //                 </div>

// //                 <div className="space-y-3">
// //                   <div className="flex items-baseline gap-1">
// //                     <span className="text-2xl font-black text-slate-900">
// //                       {props?.profile?.totalCompletion || 82}%
// //                     </span>
// //                   </div>

// //                   {/* Custom Progress Bar */}
// //                   <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
// //                     <div
// //                       className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-1000 ease-out"
// //                       style={{
// //                         width: `${props?.profile?.totalCompletion || 0}%`,
// //                       }}
// //                     />
// //                   </div>
// //                 </div>
// //               </Card>
// //             </div>

// //             {/* BIO SECTION */}
// //             <Card className="overflow-hidden shadow-sm border-slate-200 bg-white rounded-3xl py-1 pb-5 gap-2">
// //               {/* HEADER: Clean & Minimal */}
// //               <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 py-5 px-6 bg-slate-50/30">
// //                 <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
// //                   <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
// //                     <IconUser size={16} className="text-indigo-500" />
// //                   </div>
// //                   Bio & Core Attributes
// //                 </CardTitle>
// //                 <EditProfileDialog userData={userData} />
// //               </CardHeader>

// //               <CardContent className="px-5 space-y-6">
// //                 {/* STORY / ABOUT: The Narrative Focus */}
// //                 <div className="relative">
// //                   <IconQuote
// //                     size={40}
// //                     className="absolute -top-4 -left-4 text-slate-100 -z-0 opacity-50"
// //                     stroke={1.5}
// //                   />
// //                   <div className="relative z-10">
// //                     <p className="text-slate-600 text-base leading-relaxed font-medium pl-6 border-l-4 border-indigo-500/20 py-1 italic">
// //                       {props?.profile?.about ||
// //                         "User hasn't shared their story yet..."}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* ATTRIBUTE GRID: "Pill" Style Attributes */}
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                   {[
// //                     { label: "Nickname", value: props?.profile?.nickname },
// //                     { label: "Gender", value: props?.profile?.gender },
// //                     {
// //                       label: "Age",
// //                       value: props?.profile?.age
// //                         ? `${props?.profile.age} Yrs`
// //                         : "-",
// //                     },
// //                     {
// //                       label: "Zodiac",
// //                       value: props?.attributes?.zodiac,
// //                       highlight: true,
// //                     },
// //                   ].map((attr, idx) => (
// //                     <div
// //                       key={idx}
// //                       className={cn(
// //                         "p-4 rounded-2xl border transition-all hover:shadow-md hover:border-indigo-100",
// //                         attr.highlight
// //                           ? "bg-indigo-50/30 border-indigo-100"
// //                           : "bg-white border-slate-100"
// //                       )}
// //                     >
// //                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
// //                         {attr.label}
// //                       </p>
// //                       <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
// //                         {attr.value || "Not Set"}
// //                         {attr.highlight && (
// //                           <IconSparkles size={12} className="text-indigo-400" />
// //                         )}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <Separator className="bg-slate-100" />

// //                 {/* DETAILS LIST: Two-column Icon Rows */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
// //                   <DetailRow
// //                     icon={<IconBriefcase size={18} />}
// //                     iconBg="bg-blue-50 text-blue-500"
// //                     label="Occupation"
// //                     value={props?.profile?.jobTitle || "-"}
// //                   />
// //                   <DetailRow
// //                     icon={<IconHeart size={18} />}
// //                     iconBg="bg-rose-50 text-rose-500"
// //                     label="Seeking"
// //                     value={
// //                       props?.discovery?.relationshipGoal || "Not Specified"
// //                     }
// //                   />
// //                   <DetailRow
// //                     icon={<IconCalendar size={18} />}
// //                     iconBg="bg-amber-50 text-amber-500"
// //                     label="Joined Date"
// //                     value={new Date(
// //                       props?.account?.createdAt
// //                     ).toLocaleDateString(undefined, {
// //                       year: "numeric",
// //                       month: "long",
// //                       day: "numeric",
// //                     })}
// //                   />
// //                   <DetailRow
// //                     icon={<IconMapPin size={18} />}
// //                     iconBg="bg-emerald-50 text-emerald-500"
// //                     label="Location"
// //                     value={props?.userLoc?.full_address || "-"}
// //                   />
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* VERIFICATION ACTION CARD */}
// //             <Card
// //               className={cn(
// //                 "shadow-sm transition-all border-2",
// //                 verification?.status === "approved"
// //                   ? "border-emerald-100 bg-emerald-50/10"
// //                   : "border-amber-100 bg-amber-50/10"
// //               )}
// //             >
// //               <CardContent className="p-6">
// //                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
// //                   <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
// //                     <div
// //                       className={cn(
// //                         "p-3 rounded-xl",
// //                         verification?.status === "approved"
// //                           ? "bg-emerald-100 text-emerald-600"
// //                           : "bg-amber-100 text-amber-600"
// //                       )}
// //                     >
// //                       <IconShieldCheck size={28} />
// //                     </div>
// //                     <div>
// //                       <h4 className="text-lg font-bold text-slate-900">
// //                         Identity Verification
// //                       </h4>
// //                       <p className="text-xs text-slate-500 font-medium">
// //                         Verify documents against profile selfie
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex gap-2 w-full md:w-auto">
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       className="bg-white flex-1 md:flex-none border-slate-200"
// //                       onClick={() => window.open(verification?.selfieUrl)}
// //                     >
// //                       <IconExternalLink size={14} className="mr-2" /> Selfie
// //                     </Button>
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       className="bg-white flex-1 md:flex-none border-slate-200"
// //                       onClick={() => window.open(verification?.docUrl)}
// //                     >
// //                       <IconExternalLink size={14} className="mr-2" /> ID Card
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-slate-200 gap-4">
// //                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
// //                     Moderator Review Action
// //                   </span>
// //                   <div className="flex gap-2 w-full sm:w-auto">
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       className="text-rose-600 hover:bg-rose-50 flex-1 sm:flex-none"
// //                       onClick={() => {
// //                         setVerifyActionType("rejected");
// //                         setIsVerifyModalOpen(true);
// //                       }}
// //                     >
// //                       <IconX size={16} className="mr-1" /> Reject
// //                     </Button>
// //                     <Button
// //                       size="sm"
// //                       className="bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-none px-6"
// //                       onClick={() => {
// //                         setVerifyActionType("approved");
// //                         setIsVerifyModalOpen(true);
// //                       }}
// //                       disabled={
// //                         isVerifying || verification?.status === "approved"
// //                       }
// //                     >
// //                       {isVerifying ? (
// //                         "Processing..."
// //                       ) : (
// //                         <>
// //                           <IconCheck size={16} className="mr-1" /> Approve
// //                           Identity
// //                         </>
// //                       )}
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 {verification?.status === "rejected" && (
// //                   <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2">
// //                     <IconAlertTriangle
// //                       className="text-rose-500 shrink-0 mt-0.5"
// //                       size={16}
// //                     />
// //                     <p className="text-[11px] text-rose-700 font-medium">
// //                       <span className="font-bold mr-1 uppercase">Reason:</span>
// //                       {verification.rejectionReason}
// //                     </p>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </TabsContent>

// //       <VerifyUserModal
// //         isOpen={isVerifyModalOpen}
// //         actionType={verifyActionType}
// //         onClose={() => setIsVerifyModalOpen(false)}
// //         onConfirm={handleVerifyConfirm}
// //         userName={props?.profile?.nickname}
// //       />
// //     </>
// //   );
// // };



// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { TabsContent } from "@/components/ui/tabs";
// import {
//   IconAlertTriangle,
//   IconBriefcase,
//   IconCalendar,
//   IconChartBar,
//   IconCheck,
//   IconDeviceMobile,
//   IconExternalLink,
//   IconHeart,
//   IconLock,
//   IconMail,
//   IconMapPin,
//   IconMaximize,
//   IconQuote,
//   IconShieldCheck,
//   IconSparkles,
//   IconUser,
//   IconX,
// } from "@tabler/icons-react";
// import { EditProfileDialog } from "../Dialogs/edit.profile.Dialog";
// import { Separator } from "@/components/ui/separator";
// import { DetailRow } from "../detailRow";
// import { cn } from "@/lib/utils";
// import { VerifyUserModal } from "../VerifyUserModal";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyUserProfile } from "../../store/user.slice";
// import { toast } from "sonner";
// import VerificationCard from "../verification.card";
// import { FaCheckCircle } from "react-icons/fa";

// // ===== LEAFLET IMPORTS =====
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // ===== FIX: Leaflet default marker icon issue with bundlers =====
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
// });

// // ===== CUSTOM MARKER ICON (Rose/Red pin to match design) =====
// const customMarkerIcon = new L.DivIcon({
//   className: "custom-map-marker",
//   html: `
//     <div style="
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       width: 36px;
//       height: 36px;
//       background: linear-gradient(135deg, #e11d48, #f43f5e);
//       border-radius: 50% 50% 50% 0;
//       transform: rotate(-45deg);
//       box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4);
//       border: 3px solid white;
//     ">
//       <div style="
//         transform: rotate(45deg);
//         color: white;
//         font-size: 14px;
//         font-weight: bold;
//       ">📍</div>
//     </div>
//   `,
//   iconSize: [36, 36],
//   iconAnchor: [18, 36],
//   popupAnchor: [0, -36],
// });

// // ===== LOCATION MAP COMPONENT =====
// const LocationMap = ({ latitude, longitude, city, country, nickname }) => {
//   // Agar coordinates available nahi hain
//   if (!latitude || !longitude) {
//     return (
//       <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center gap-2">
//         <IconMapPin size={24} className="text-slate-300" />
//         <span className="text-[10px] text-slate-400 font-medium">
//           Location data unavailable
//         </span>
//       </div>
//     );
//   }

//   const position = [parseFloat(latitude), parseFloat(longitude)];

//   return (
//     <div className="aspect-video rounded-xl border border-slate-100 overflow-hidden relative group">
//       <MapContainer
//         center={position}
//         zoom={13}
//         scrollWheelZoom={false}
//         zoomControl={false}
//         attributionControl={false}
//         style={{
//           height: "100%",
//           width: "100%",
//           borderRadius: "0.75rem",
//         }}
//         className="z-0"
//       >
//         {/* MAP TILES - Clean grayscale style jo design se match kare */}
//         <TileLayer
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
//         />

//         {/* ACCURACY CIRCLE - User ki approximate location area */}
//         <Circle
//           center={position}
//           radius={800}
//           pathOptions={{
//             color: "#e11d48",
//             fillColor: "#fecdd3",
//             fillOpacity: 0.15,
//             weight: 1.5,
//             dashArray: "6 4",
//           }}
//         />

//         {/* MARKER with popup */}
//         <Marker position={position} icon={customMarkerIcon}>
//           <Popup className="custom-popup">
//             <div className="text-center p-1">
//               <p className="font-bold text-slate-900 text-sm">{nickname}</p>
//               <p className="text-slate-500 text-xs mt-1">
//                 📍 {city}, {country}
//               </p>
//               <p className="text-slate-400 text-[10px] mt-1 font-mono">
//                 {parseFloat(latitude).toFixed(4)},{" "}
//                 {parseFloat(longitude).toFixed(4)}
//               </p>
//             </div>
//           </Popup>
//         </Marker>
//       </MapContainer>

//       {/* OVERLAY INFO BADGE */}
//       <div className="absolute top-2 left-2 z-[1000]">
//         <Badge
//           variant="outline"
//           className="bg-white/90 backdrop-blur-sm text-[9px] font-bold text-slate-600 border-slate-200 shadow-sm"
//         >
//           <span
//             className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"
//           />
//           Last Known Location
//         </Badge>
//       </div>

//       {/* COORDINATES BADGE */}
//       <div className="absolute bottom-2 right-2 z-[1000]">
//         <Badge className="bg-black/60 text-white text-[8px] font-mono border-none backdrop-blur-sm">
//           {parseFloat(latitude).toFixed(4)}, {parseFloat(longitude).toFixed(4)}
//         </Badge>
//       </div>
//     </div>
//   );
// };

// // ===== FULL SCREEN MAP DIALOG =====
// const FullScreenMapDialog = ({
//   latitude,
//   longitude,
//   city,
//   country,
//   nickname,
// }) => {
//   if (!latitude || !longitude) return null;

//   const position = [parseFloat(latitude), parseFloat(longitude)];

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="absolute top-2 right-2 z-[1000] h-7 w-7 p-0 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 hover:bg-white"
//         >
//           <IconMaximize size={12} className="text-slate-600" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
//         <div className="w-full h-full">
//           <div className="p-4 border-b border-slate-100 bg-white">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-rose-50 rounded-lg">
//                 <IconMapPin size={18} className="text-rose-500" />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {nickname}'s Location
//                 </h3>
//                 <p className="text-xs text-slate-500">
//                   {city}, {country} •{" "}
//                   <span className="font-mono">
//                     {parseFloat(latitude).toFixed(6)},{" "}
//                     {parseFloat(longitude).toFixed(6)}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <MapContainer
//             center={position}
//             zoom={15}
//             scrollWheelZoom={true}
//             style={{ height: "calc(100% - 72px)", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
//             />
//             <Circle
//               center={position}
//               radius={500}
//               pathOptions={{
//                 color: "#e11d48",
//                 fillColor: "#fecdd3",
//                 fillOpacity: 0.15,
//                 weight: 1.5,
//               }}
//             />
//             <Marker position={position} icon={customMarkerIcon}>
//               <Popup>
//                 <div className="text-center p-1">
//                   <p className="font-bold text-sm">{nickname}</p>
//                   <p className="text-xs text-slate-500 mt-1">
//                     {city}, {country}
//                   </p>
//                 </div>
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export const ProfileTab = ({ userData: initialUserData, ...props }) => {
//   const dispatch = useDispatch();
//   const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
//   const [verifyActionType, setVerifyActionType] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);

//   const liveUser = useSelector((state) =>
//     state.users.items.find((u) => u._id === initialUserData._id)
//   );

//   const userData = liveUser || initialUserData;
//   const verification = userData?.verification;

//   const handleVerifyConfirm = async (status, reason) => {
//     setIsVerifying(true);
//     try {
//       await dispatch(
//         verifyUserProfile({
//           userId: userData._id,
//           action: status === "approved" ? "approve" : "reject",
//           reason: status === "rejected" ? reason : undefined,
//         })
//       ).unwrap();
//       toast.success(`Identity ${status} successfully`);
//       setIsVerifyModalOpen(false);
//     } catch (err) {
//       toast.error(err || "Failed to update verification");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const colorStyles = {
//     blue: "bg-blue-50 border-blue-200 text-blue-600",
//     green: "bg-green-50 border-green-200 text-green-600",
//     orange: "bg-rose-50 border-rose-200 text-rose-600",
//   };

//   const connectivityItems = [
//     {
//       label: "Email",
//       val: props?.account?.email,
//       icon: <IconMail />,
//       color: "blue",
//       verified: userData.isEmailVerified,
//     },
//     {
//       label: "Phone",
//       val: props?.account?.phone,
//       icon: <IconDeviceMobile />,
//       color: "green",
//       verified: userData.isPhoneVerified,
//     },
//     {
//       label: "Auth",
//       val: props?.account?.authMethod || "Email",
//       icon: <IconLock />,
//       color: "orange",
//     },
//   ];

// <<<<<<< HEAD
//   // ===== EXTRACT LOCATION DATA =====
//   const userLatitude =
//     props?.userLoc?.latitude ||
//     props?.userLoc?.lat ||
//     props?.userLoc?.coordinates?.[1] ||
//     props?.userLoc?.location?.coordinates?.[1];

//   const userLongitude =
//     props?.userLoc?.longitude ||
//     props?.userLoc?.lng ||
//     props?.userLoc?.lon ||
//     props?.userLoc?.coordinates?.[0] ||
//     props?.userLoc?.location?.coordinates?.[0];

//   console.log("verification: ", verification);
//   console.log("userLoc: ", props?.userLoc);
//   console.log("Map coords: ", { userLatitude, userLongitude });
// =======
//   const handleApprove = async (status) => {
//     setIsVerifying(true);
//     await new Promise((r) => setTimeout(r, 800));
//     await dispatch(
//       verifyUserProfile({
//         userId: userData._id,
//         action: status === "approved" ? "approve" : "reject",
//       })
//     ).unwrap();
//     toast.success(`Identity ${status} successfully`);
//     setIsVerifying(false);
//   };

//   const handleReject = async (reason, status) => {
//     setIsVerifying(true);
//     await new Promise((r) => setTimeout(r, 800));
//     await dispatch(
//       verifyUserProfile({
//         userId: userData._id,
//         action: status === "approved" ? "approve" : "reject",
//         reason: status === "rejected" ? reason : undefined,
//       })
//     ).unwrap();
//     toast.success(`Identity ${status} successfully`);
//     setIsVerifying(false);
//   };
// >>>>>>> 52abea1255ee58c045927656822f5dbdca48e0ac

//   return (
//     <>
//       <TabsContent
//         value="profile"
//         className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500"
//       >
//         <div className="grid grid-cols-12 gap-6">
//           {/* LEFT COLUMN: IDENTITY SUMMARY */}
//           <div className="col-span-12 lg:col-span-4 xl:col-span-3">
//             <Card className="shadow-sm border-slate-200">
//               <CardContent className="pt-8 flex flex-col items-center text-center px-6">
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <div className="relative group cursor-pointer">
//                       <Avatar className="h-40 w-40 border border-slate-100 shadow-lg transition-transform group-hover:scale-[1.02]">
//                         <AvatarImage
//                           src={props?.photos?.[0]?.url}
//                           className="object-cover"
//                         />
//                         <AvatarFallback className="text-4xl bg-slate-50 text-slate-400 font-bold">
//                           {props?.profile?.nickname?.[0]}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                         <IconMaximize className="text-slate-700" size={24} />
//                       </div>
//                     </div>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-md border-none bg-transparent shadow-none p-0">
//                     <img
//                       src={props?.photos?.[0]?.url}
//                       alt="Profile"
//                       className="w-full rounded-2xl shadow-2xl"
//                     />
//                   </DialogContent>
//                 </Dialog>

//                 <div className="mt-6 space-y-1">
//                   <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
//                     {props?.profile?.nickname}
//                   </h3>
//                   <div className="flex items-center justify-center gap-1.5 text-slate-500 font-medium">
//                     <IconMapPin size={16} className="text-rose-500" />
//                     <span className="text-sm">
//                       {props?.userLoc?.city}, {props?.userLoc?.country}
//                     </span>
//                   </div>
//                 </div>

//                 {/* ===== LOCATION MAP SECTION (REPLACED PLACEHOLDER) ===== */}
//                 <div className="w-full mt-8 pt-6 border-t border-slate-100">
//                   <div className="flex justify-between items-center mb-3">
//                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                       Location Context
//                     </span>
//                     <Badge
//                       variant="outline"
//                       className={cn(
//                         "text-[9px] font-bold uppercase py-0 px-1.5",
//                         userLatitude && userLongitude
//                           ? "text-emerald-600 border-emerald-200 bg-emerald-50"
//                           : "text-slate-400"
//                       )}
//                     >
//                       {userLatitude && userLongitude ? (
//                         <span className="flex items-center gap-1">
//                           <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
//                           Located
//                         </span>
//                       ) : (
//                         "No Data"
//                       )}
//                     </Badge>
//                   </div>

//                   {/* ACTUAL MAP */}
//                   <div className="relative">
//                     <LocationMap
//                       latitude={userLatitude}
//                       longitude={userLongitude}
//                       city={props?.userLoc?.city}
//                       country={props?.userLoc?.country}
//                       nickname={props?.profile?.nickname}
//                     />

//                     {/* Full Screen Button */}
//                     <FullScreenMapDialog
//                       latitude={userLatitude}
//                       longitude={userLongitude}
//                       city={props?.userLoc?.city}
//                       country={props?.userLoc?.country}
//                       nickname={props?.profile?.nickname}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* RIGHT COLUMN: SYSTEM DATA & BIO */}
//           <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
//             <div className="flex flex-col lg:flex-row gap-4 w-full">
//               {/* ACCOUNT CONNECTIVITY CARD */}
//               <Card className="flex-[3] p-6 shadow-sm border-slate-200 flex flex-col justify-center">
//                 <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
//                   Account Connectivity
//                 </h3>

//                 <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
//                   {connectivityItems.map((item, i) => (
//                     <div key={i} className="flex items-center gap-4">
//                       <div
//                         className={cn(
//                           "p-2.5 rounded-xl border transition-colors",
//                           colorStyles[item.color]
//                         )}
//                       >
//                         {React.cloneElement(item.icon, {
//                           size: 20,
//                           stroke: 2,
//                         })}
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <span className="text-sm font-bold text-slate-900">
//                           {item.label === "Auth" ? (
//                             <span className="text-slate-400 font-medium mr-1">
//                               Auth:
//                             </span>
//                           ) : null}
//                           {item.val || "-"}
//                         </span>

//                         {item.verified !== undefined ? (
//                           <Badge
//                             variant="outline"
//                             className={cn(
//                               "text-[10px] font-bold px-2 py-0 h-6 border-slate-200",
//                               item.verified
//                                 ? "text-slate-900 bg-white"
//                                 : "text-slate-400"
//                             )}
//                           >
//                             <div className="flex items-center gap-1">
//                               {item.verified ? (
//                                 <>
//                                   {/* <BadgeCheck
//                                     size={16}
//                                     className="text-blue-500"
//                                   /> */}
//                                   <FaCheckCircle />
//                                   <span>Verified</span>
//                                 </>
//                               ) : (
//                                 "Unverified"
//                               )}
//                             </div>
//                           </Badge>
//                         ) : (
//                           <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] font-bold px-2 py-0 h-6">
//                             {item.val || "Email"}
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>

//               {/* PROFILE QUALITY CARD */}
//               <Card className="flex-1 p-6 shadow-sm border-slate-200">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
//                     Profile Quality
//                   </h3>
//                   <IconChartBar size={20} className="text-slate-400" />
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-2xl font-black text-slate-900">
//                       {props?.profile?.totalCompletion || 82}%
//                     </span>
//                   </div>

//                   <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                     <div
//                       className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-1000 ease-out"
//                       style={{
//                         width: `${props?.profile?.totalCompletion ?? 0}%`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* BIO SECTION */}
//             <Card className="overflow-hidden shadow-sm border-slate-200 bg-white rounded-xl py-1 pb-5 gap-2">
//               {/* HEADER: Clean & Minimal */}
//               <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 py-5 px-6 bg-slate-50/30">
//                 <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
//                   <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
//                     <IconUser size={16} className="text-indigo-500" />
//                   </div>
//                   Bio & Core Attributes
//                 </CardTitle>
//                 <EditProfileDialog userData={userData} />
//               </CardHeader>

//               <CardContent className="px-5 space-y-6">
//                 <div className="relative">
//                   <IconQuote
//                     size={40}
//                     className="absolute -top-4 -left-4 text-slate-100 -z-0 opacity-50"
//                     stroke={1.5}
//                   />
//                   <div className="relative z-10">
//                     <p className="text-slate-600 text-base leading-relaxed font-medium pl-6 border-l-4 border-indigo-500/20 py-1 italic">
//                       {props?.profile?.about ||
//                         "User hasn't shared their story yet..."}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {[
//                     { label: "Nickname", value: props?.profile?.nickname },
//                     { label: "Gender", value: props?.profile?.gender },
//                     {
//                       label: "Age",
//                       value: props?.profile?.age
//                         ? `${props?.profile.age} Yrs`
//                         : "-",
//                     },
//                     {
//                       label: "Zodiac",
//                       value: props?.attributes?.zodiac,
//                       highlight: true,
//                     },
//                   ].map((attr, idx) => (
//                     <div
//                       key={idx}
//                       className={cn(
//                         "p-4 rounded-lg border transition-all hover:shadow-md hover:border-indigo-100",
//                         attr.highlight
//                           ? "bg-indigo-50/30 border-indigo-100"
//                           : "bg-white border-slate-100"
//                       )}
//                     >
//                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
//                         {attr.label}
//                       </p>
//                       <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
//                         {attr.value || "Not Set"}
//                         {attr.highlight && (
//                           <IconSparkles size={12} className="text-indigo-400" />
//                         )}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator className="bg-slate-100" />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
//                   <DetailRow
//                     icon={<IconBriefcase size={18} />}
//                     iconBg="bg-blue-50 text-blue-500"
//                     label="Occupation"
//                     value={props?.profile?.jobTitle || "-"}
//                   />
//                   <DetailRow
//                     icon={<IconHeart size={18} />}
//                     iconBg="bg-rose-50 text-rose-500"
//                     label="Seeking"
//                     value={
//                       props?.discovery?.relationshipGoal || "Not Specified"
//                     }
//                   />
//                   <DetailRow
//                     icon={<IconCalendar size={18} />}
//                     iconBg="bg-amber-50 text-amber-500"
//                     label="Joined Date"
//                     value={new Date(
//                       props?.account?.createdAt
//                     ).toLocaleDateString(undefined, {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   />
//                   <DetailRow
//                     icon={<IconMapPin size={18} />}
//                     iconBg="bg-emerald-50 text-emerald-500"
//                     label="Location"
//                     value={props?.userLoc?.full_address || "-"}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* VERIFICATION ACTION CARD */}
//             <VerificationCard
//               verification={userData.verification}
//               isVerifying={isVerifying}
//               onApprove={handleApprove}
//               onReject={handleReject}
//               userName={userData.nickname}
//             />
//           </div>
//         </div>
//       </TabsContent>

//       {/* <VerifyUserModal
//         isOpen={isVerifyModalOpen}
//         actionType={verifyActionType}
//         onClose={() => setIsVerifyModalOpen(false)}
//         onConfirm={handleVerifyConfirm}
//         userName={props?.profile?.nickname}
//       /> */}
//     </>
//   );
// };


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
import { VerifyUserModal } from "../VerifyUserModal";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserProfile } from "../../store/user.slice";
import { toast } from "sonner";
import VerificationCard from "../verification.card";
import { FaCheckCircle } from "react-icons/fa";

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

  const handleApprove = async (status) => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    await dispatch(
      verifyUserProfile({
        userId: userData._id,
        action: status === "approved" ? "approve" : "reject",
      })
    ).unwrap();
    toast.success(`Identity ${status} successfully`);
    setIsVerifying(false);
  };

  const handleReject = async (reason, status) => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    await dispatch(
      verifyUserProfile({
        userId: userData._id,
        action: status === "approved" ? "approve" : "reject",
        reason: status === "rejected" ? reason : undefined,
      })
    ).unwrap();
    toast.success(`Identity ${status} successfully`);
    setIsVerifying(false);
  };

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
                            <div className="flex items-center gap-1">
                              {item.verified ? (
                                <>
                                  {/* <BadgeCheck
                                    size={16}
                                    className="text-blue-500"
                                  /> */}
                                  <FaCheckCircle />
                                  <span>Verified</span>
                                </>
                              ) : (
                                "Unverified"
                              )}
                            </div>
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
                        "p-4 rounded-lg border transition-all hover:shadow-md hover:border-indigo-100",
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
            <VerificationCard
              verification={userData.verification}
              isVerifying={isVerifying}
              onApprove={handleApprove}
              onReject={handleReject}
              userName={userData.nickname}
            />
          </div>
        </div>
      </TabsContent>

      {/* <VerifyUserModal
        isOpen={isVerifyModalOpen}
        actionType={verifyActionType}
        onClose={() => setIsVerifyModalOpen(false)}
        onConfirm={handleVerifyConfirm}
        userName={props?.profile?.nickname}
      /> */}
    </>
  );
};