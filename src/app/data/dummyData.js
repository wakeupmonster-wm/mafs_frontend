// export const DUMMY_USER = {
//   _id: "USR_001_DEMO",
//   isEmailVerified: true,
//   isPhoneVerified: false,

//   profile: {
//     nickname: "DemoUser",
//     age: 26,
//     gender: "male",
//     height: 178,
//     jobTitle: "Frontend Developer",
//     company: "OpenAI Labs",
//     about: "Coffee lover ☕ | Traveler ✈️ | Building cool stuff",
//     totalCompletion: 82,
//   },

//   account: {
//     status: "active",
//     email: "demo@example.com",
//     phone: "+91 9876543210",
//     authMethod: "email",
//     isPremium: true,
//     createdAt: "2024-05-12T10:00:00Z",
//     banDetails: { isBanned: false },
//   },

//   attributes: {
//     zodiac: "Gemini",
//     education: "Masters",
//     religion: "Hindu",
//     smoking: "No",
//     drinking: "Occasional",
//     dietary: "Veg",
//     workout: "Regular",
//     sleeping: "Night Owl",
//     pets: "Dog",

//     socialMedia: "instagram",

//     interests: ["Travel", "Coding", "Gym"],
//     music: ["EDM", "Lo-fi"],
//     movies: ["Sci-fi", "Action"],
//     books: ["Atomic Habits", "Deep Work"],
//   },

//   discovery: {
//     relationshipGoal: "Long Term",
//     distanceRange: 50,
//     ageRange: { min: 22, max: 32 },
//     showMeGender: ["female"],
//     globalVisibility: "Visible",
//   },

//   location: {
//     city: "Indore",
//     country: "India",
//     full_address: "Vijay Nagar, Indore, MP",
//     coordinates: [75.8577, 22.7196],
//   },

//   photos: [
//     { url: "https://picsum.photos/400?1" },
//     { url: "https://picsum.photos/400?2" },
//     { url: "https://picsum.photos/400?3" },
//     { url: "https://picsum.photos/400?4" },
//   ],

//   verification: {
//     status: "pending",
//     selfieUrl: "https://picsum.photos/300?selfie",
//     docUrl: "https://picsum.photos/300?idcard",
//     rejectionReason: null,
//   },
// };

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   fetchProfileForReview,
//   fetchReportedProfiles,
//   performUpdateProfileStatus,
// } from "../store/profile-review.slice";
// import { Header } from "../components/header";
// import { UserInformation } from "../components/userInformation";
// import { Biography } from "../components/biography";
// import { PhotoGallery } from "../components/photogallery";
// import { ReportsSection } from "../components/reportsSection";
// import { ActionPanel } from "../components/actionPanel";
// import { ImageLightbox } from "../components/imageLightBox";
// import { NotFoundState } from "../components/notFound";
// import { toast } from "sonner";
// import { PreLoader } from "@/app/loader/preloader";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const sectionVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 },
// };

// export default function ProfileReviewPage() {
//   const { userId } = useParams();

//   const dispatch = useDispatch();
//   const { selected: p, loading } = useSelector((s) => s.profileReview || {});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     action: "",
//     reason: "",
//     suspendDuration: "",
//     replyMessage: "",
//     selectedReportId: "",
//   });

//   const [modal, setModal] = useState({ isOpen: false, url: null, index: 0 });

//   useEffect(() => {
//     if (userId) dispatch(fetchProfileForReview(userId));
//   }, [userId, dispatch]);

//   if (loading) return <PreLoader />;

//   if (!p) return <NotFoundState />;

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Validation Logic
//     if (!formData.action) {
//       toast.warning("Please select an action");
//       return;
//     }
//     if (
//       (formData.action === "reject" || formData.action === "ban") &&
//       !formData.reason.trim()
//     ) {
//       toast.warning("Reason is required for this action");
//       return;
//     }

//     if (
//       formData.action === "suspend" &&
//       (!formData.suspendDuration || !formData.reason.trim())
//     ) {
//       toast.warning("Duration and reason are required for suspension");

//       return;
//     }

//     if (
//       formData.action === "reply" &&
//       (!formData.selectedReportId || !formData.replyMessage.trim())
//     ) {
//       toast.warning("Please select a report and enter a reply message");
//       return;
//     }

//     setIsSubmitting(true);

//     // 2. Build Payload
//     const payload = {
//       userId,
//       action: formData.action,
//       reason: formData.reason.trim() || undefined,
//       replyMessage:
//         formData.action === "reply" ? formData.replyMessage.trim() : undefined,
//       reportId:
//         formData.action === "reply" ? formData.selectedReportId : undefined,
//       suspendDuration:
//         formData.action === "suspend"
//           ? Number(formData.suspendDuration)
//           : undefined,
//     };

//     try {
//       await dispatch(performUpdateProfileStatus(payload)).unwrap();
//       toast.success("Moderation action executed successfully.");

//       // Refresh Data
//       await Promise.all([
//         dispatch(fetchProfileForReview(userId)),
//         dispatch(fetchReportedProfiles({ page: 1, limit: 20 })),
//       ]);

//       // Reset local form
//       setFormData({
//         action: "",
//         reason: "",
//         suspendDuration: "",
//         replyMessage: "",
//         selectedReportId: "",
//       });
//     } catch (err) {
//       toast.error(err?.message || "Failed to execute action.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   console.log("p: ", p);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-12">
//       {/* Background Accent */}
//       <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent -z-10" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Header p={p} />

//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-12 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Left Column - User Data (8/12) */}
//           <div className="lg:col-span-8 space-y-8">
//             <motion.div variants={sectionVariants}>
//               <UserInformation p={p} />
//             </motion.div>
//             <motion.div variants={sectionVariants}>
//               <Biography bio={p.profile?.bio} />
//             </motion.div>
//             <motion.div variants={sectionVariants}>
//               <PhotoGallery
//                 photos={p.profile?.photos}
//                 onImageClick={(url, idx) =>
//                   setModal({ isOpen: true, url, index: idx })
//                 }
//               />
//             </motion.div>
//             <motion.div variants={sectionVariants}>
//               <ReportsSection reports={p.reports} count={p.reportCount} />
//             </motion.div>
//           </div>

//           {/* Right Column - Action Panel (4/12) */}
//           <motion.div className="lg:col-span-4" variants={sectionVariants}>
//             <div className="sticky top-24">
//               <ActionPanel
//                 p={p}
//                 formData={formData}
//                 onUpdate={(f, v) =>
//                   setFormData((prev) => ({ ...prev, [f]: v }))
//                 }
//                 onSubmit={onSubmit}
//                 isSubmitting={isSubmitting}
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {modal.isOpen && (
//           <ImageLightbox
//             modal={modal}
//             photos={p.profile?.photos}
//             onClose={() => setModal((m) => ({ ...m, isOpen: false }))}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// import { Card } from "@/components/ui/card";
// import {
//   Mail,
//   User,
//   MapPin,
//   Smartphone,
//   Fingerprint,
//   Calendar,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export const UserInformation = ({ p }) => {
//   // Helper to calculate age from DOB string
//   const calculateAge = (dobString) => {
//     if (!dobString) return "-";
//     const today = new Date();
//     const birthDate = new Date(dobString);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
//     return age;
//   };

//   return (
//     <Card className="p-6 shadow-sm border-slate-200 bg-white">
//       <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//         <div className="p-2 bg-blue-50 rounded-lg">
//           <User className="w-5 h-5 text-blue-600" />
//         </div>
//         User Information
//       </h2>

//       <div className="space-y-5">
//         {/* SECTION: PROFILE STATS */}
//         <div className="space-y-3">
//           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//             <Calendar className="w-3.5 h-3.5" /> Profile Demographics
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <InfoItem label="Gender" value={p.profile?.gender || "-"} />
//             <InfoItem
//               label="Age"
//               value={`${calculateAge(p.profile?.dob)} Years`}
//             />
//             <InfoItem
//               label="Location"
//               value={p.profile?.location?.city || "Unknown"}
//               icon={<MapPin className="w-3 h-3 text-slate-400" />}
//             />
//             <InfoItem label="Nickname" value={p.profile?.nickname || "-"} />
//           </div>
//         </div>

//         {/* SECTION: CONTACT & IDENTITY */}
//         <div className="space-y-3">
//           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//             <Smartphone className="w-3.5 h-3.5" /> Account Identity
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <InfoItem
//               label="User ID"
//               value={p.userId}
//               isCode
//               icon={<Fingerprint className="w-3 h-3 text-slate-400" />}
//             />
//             <InfoItem
//               label="Email Address"
//               value={p.profile?.email || "No Email"}
//               icon={<Mail className="w-3 h-3 text-slate-400" />}
//             />
//             <InfoItem
//               label="Phone Number"
//               value={p?.phone || "No Phone"}
//               icon={<Smartphone className="w-3 h-3 text-slate-400" />}
//             />
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const InfoItem = ({ label, value, isCode = false, icon }) => (
//   <div className="group w-full bg-slate-50/50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:border-blue-100">
//     <div className="flex items-center gap-1.5 mb-1.5">
//       {icon}
//       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
//         {label}
//       </p>
//     </div>
//     <p
//       className={cn(
//         "text-sm font-bold text-slate-700 truncate",
//         isCode &&
//           "font-mono text-[11px] text-blue-600 bg-blue-50/50 p-1 rounded px-2 border border-blue-100 w-fit max-w-full",
//       )}
//     >
//       {value}
//     </p>
//   </div>
// );

// import { Card } from "@/components/ui/card";
// import { FileText, Quote, Info } from "lucide-react";
// import { cn } from "@/lib/utils";

// export const Biography = ({ bio }) => {
//   const hasBio = bio && bio.trim().length > 0;

//   return (
//     <Card className="group p-6 shadow-sm border-slate-200 bg-white transition-all hover:shadow-md">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
//           <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
//             <FileText className="w-5 h-5 text-blue-600" />
//           </div>
//           Biography
//         </h3>

//         {hasBio && (
//           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
//             {bio.length} Characters
//           </span>
//         )}
//       </div>

//       <div
//         className={cn(
//           "relative p-5 rounded-2xl border transition-all duration-300",
//           hasBio
//             ? "bg-slate-50/30 border-slate-100 shadow-inner"
//             : "bg-amber-50/30 border-amber-100 border-dashed",
//         )}
//       >
//         {hasBio ? (
//           <>
//             {/* Decorative Quote Icon */}
//             <Quote className="absolute -top-3 -left-2 w-8 h-8 text-blue-100 -rotate-12 pointer-events-none" />
//             <p className="relative z-10 text-slate-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-wrap">
//               {bio}
//             </p>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-4 text-center">
//             <div className="p-2 bg-amber-100/50 rounded-full mb-2">
//               <Info className="w-4 h-4 text-amber-600" />
//             </div>
//             <p className="text-amber-700/60 text-sm font-medium italic">
//               This user hasn't shared a story yet.
//             </p>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// import { Card } from "@/components/ui/card";
// import { ImageIcon, Maximize2, CameraOff } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "@/lib/utils";

// export const PhotoGallery = ({ photos, onImageClick }) => {
//   const hasPhotos = photos && photos.length > 0;

//   return (
//     <Card className="p-6 shadow-sm border-slate-200 bg-white overflow-hidden">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
//           <div className="p-2 bg-blue-50 rounded-lg">
//             <ImageIcon className="w-5 h-5 text-blue-600" />
//           </div>
//           Profile Photos
//           <span className="ml-1 text-slate-400 font-medium text-sm">
//             ({photos?.length ?? 0})
//           </span>
//         </h3>

//         {hasPhotos && (
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
//             Click to Enlarge
//           </p>
//         )}
//       </div>

//       {!hasPhotos ? (
//         <div className="bg-slate-50/50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
//           <div className="p-4 bg-white rounded-full shadow-sm mb-4">
//             <CameraOff className="w-8 h-8 text-slate-300" />
//           </div>
//           <p className="text-slate-500 font-medium">
//             No visual evidence uploaded.
//           </p>
//           <p className="text-slate-400 text-xs mt-1">
//             This user has not added any profile photos.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           <AnimatePresence>
//             {photos.map((ph, idx) => (
//               <motion.div
//                 key={ph._id || idx}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: idx * 0.05 }}
//                 whileHover={{ y: -4 }}
//                 className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm group border border-slate-200/50"
//                 onClick={() => onImageClick(ph.url || ph, idx)}
//               >
//                 {/* Image Component */}
//                 <img
//                   src={ph.url || ph}
//                   alt={`Evidence ${idx + 1}`}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   loading="lazy"
//                 />

//                 {/* Main Photo Badge (Assuming first photo is primary) */}
//                 {idx === 0 && (
//                   <div className="absolute top-2 left-2 z-10">
//                     <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg shadow-blue-200 uppercase tracking-tighter">
//                       Primary
//                     </span>
//                   </div>
//                 )}

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
//                   <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                     <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-xl">
//                       <Maximize2 className="w-5 h-5 text-white" />
//                     </div>
//                     <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">
//                       Inspect
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </Card>
//   );
// };

// import { Badge } from "@/components/ui/badge";
// import { Flag, Reply, User, MessageSquareText, Clock } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// export const ReportsSection = ({ reports, count }) => {
//   console.log("reports: ", reports);

//   return (
//     <Card className="p-6 border-slate-200 gap-2 shadow-sm bg-white">
//       {/* Header with Counter Badge */}
//       <div className="flex items-center justify-between mb-1">
//         <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
//           <div className="p-2 bg-red-50 rounded-lg">
//             <Flag className="w-5 h-5 text-red-600" />
//           </div>
//           Active Complaints
//         </h3>
//         <Badge
//           variant="secondary"
//           className="bg-slate-100 text-slate-600 font-bold px-3"
//         >
//           {count} {count === 1 ? "Report" : "Reports"}
//         </Badge>
//       </div>

//       <div className="space-y-6">
//         {!reports || reports.length === 0 ? (
//           <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
//             <MessageSquareText className="w-10 h-10 text-slate-200 mx-auto mb-2" />
//             <p className="text-slate-400 font-medium">
//               Clear record. No reports found.
//             </p>
//           </div>
//         ) : (
//           reports.map((r, idx) => (
//             <div
//               key={r._id || idx}
//               className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-dashed border-slate-400 bg-slate-50/30 transition-all hover:bg-white hover:shadow-md hover:border-blue-100"
//             >
//               {/* Header: Reason & Date */}
//               <div className="flex items-start justify-between">
//                 <div className="flex flex-wrap gap-2">
//                   <Badge
//                     className={cn(
//                       "uppercase text-[10px] font-black tracking-wider px-2 py-0.5 shadow-none border",
//                       r.severity === "high"
//                         ? "bg-red-50 text-red-700 border-red-300"
//                         : "bg-amber-50 text-amber-700 border-amber-300",
//                     )}
//                   >
//                     {r.reason}
//                   </Badge>
//                   {r.adminReply && (
//                     <Badge className="bg-blue-600 text-white border-none text-[10px] px-2 py-0.5">
//                       ACTION TAKEN
//                     </Badge>
//                   )}
//                 </div>
//                 <time className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
//                   <Clock className="w-3 h-3" />
//                   {new Date(r.createdAt).toLocaleDateString("en-IN", {
//                     day: "numeric",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </time>
//               </div>

//               {/* Reporter's Narrative */}
//               <div className="relative">
//                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-300 rounded-full" />
//                 <div className="pl-4">
//                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1">
//                     <User className="w-3 h-3" />{" "}
//                     {"User Name: " + r.reportedBy?.nickname ||
//                       "User ID: " + r.reportedBy?.id}
//                   </p>
//                   <p className="text-sm text-slate-600 leading-relaxed italic">
//                     "{r.details || "No additional details provided."}"
//                   </p>
//                 </div>
//               </div>

//               {/* Admin Response Thread */}
//               {r.adminReply && (
//                 <div className="mt-2 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="p-1 bg-blue-600 rounded-md">
//                       <Reply className="w-3 h-3 text-white" />
//                     </div>
//                     <span className="text-xs font-black text-blue-900 uppercase tracking-tight">
//                       Official Resolution
//                     </span>
//                   </div>
//                   <p className="text-sm text-blue-800 font-medium pl-7">
//                     {r.adminReply}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </Card>
//   );
// };

// import React from "react";
// import {
//   CheckCircle2,
//   Ban,
//   Clock,
//   Reply,
//   AlertCircle,
//   Loader2,
//   Info,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export const ActionPanel = ({
//   p,
//   formData,
//   onUpdate,
//   onSubmit,
//   isSubmitting,
// }) => {
//   const isResolved = p?.status === "resolved";

//   // Function to get the specific button styles based on action
//   const getButtonStyles = () => {
//     const base = "w-full h-12 font-bold text-base shadow-lg transition-all ";
//     const gradients = {
//       resolve:
//         "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-100",
//       ban: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-100",
//       suspend:
//         "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-amber-100",
//       reply:
//         "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-100",
//     };
//     return base + (gradients[formData.action] || "bg-slate-900");
//   };

//   return (
//     <Card className="p-6 sticky top-24 border-none shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
//       <div className="mb-6">
//         <h2 className="text-xl font-black text-slate-900 tracking-tight">
//           {isResolved ? "Moderation Record" : "Decision Center"}
//         </h2>
//         <p className="text-sm text-slate-500 font-medium">
//           {isResolved
//             ? "Case has been officially closed"
//             : "Select policy to execute on this profile"}
//         </p>
//       </div>

//       {isResolved ? (
//         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//           <div className="text-center p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
//               <CheckCircle2 className="w-8 h-8 text-emerald-600" />
//             </div>
//             <h3 className="text-lg font-bold text-emerald-900">Resolved</h3>
//             <p className="text-sm text-emerald-700/70 mt-1">
//               This report is no longer active.
//             </p>
//           </div>

//           {/* Resolution Metadata fallback */}
//           <div className="space-y-3">
//             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
//               <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 text-center">
//                 Status Update
//               </p>
//               <p className="text-xs text-slate-600 text-center italic leading-relaxed">
//                 Changes have been synced with the user's account and the global
//                 safety database.
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <form onSubmit={onSubmit} className="space-y-6">
//           {/* 1. ACTION SELECT */}
//           <div className="space-y-3">
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
//               Select Action Type
//             </label>
//             <Select
//               value={formData.action}
//               onValueChange={(val) => onUpdate("action", val)}
//             >
//               <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-brand-aqua shadow-sm bg-slate-50/50">
//                 <SelectValue placeholder="How will you handle this?" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="resolve">
//                   <div className="flex items-center gap-2 py-1">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600" />{" "}
//                     <span>Approve Profile</span>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="ban">
//                   <div className="flex items-center gap-2 py-1">
//                     <Ban className="w-4 h-4 text-red-600" />{" "}
//                     <span>Ban User Account</span>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="suspend">
//                   <div className="flex items-center gap-2 py-1">
//                     <Clock className="w-4 h-4 text-amber-600" />{" "}
//                     <span>Suspend Account</span>
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="reply">
//                   <div className="flex items-center gap-2 py-1">
//                     <Reply className="w-4 h-4 text-blue-600" />{" "}
//                     <span>Message Reporter</span>
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* 2. DYNAMIC FIELDS BASED ON ACTION */}

//           {/* Reason/Notes Field (Visible for almost all actions) */}
//           {["resolve", "ban", "suspend"].includes(formData.action) && (
//             <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
//                 {formData.action === "resolve"
//                   ? "Resolution Notes"
//                   : "Violation Reason"}
//                 <span className="text-red-500 ml-1">*</span>
//               </label>
//               <Textarea
//                 placeholder={
//                   formData.action === "resolve"
//                     ? "Notes for audit trail..."
//                     : "Describe the policy violation..."
//                 }
//                 value={formData.reason}
//                 onChange={(e) => onUpdate("reason", e.target.value)}
//                 className="min-h-[120px] rounded-2xl bg-slate-50/50 border-slate-200"
//               />
//             </div>
//           )}

//           {/* Suspend Duration Field */}
//           {formData.action === "suspend" && (
//             <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
//                 Duration (Hours) <span className="text-red-500 ml-1">*</span>
//               </label>
//               <Input
//                 type="number"
//                 min={1}
//                 placeholder="e.g. 24, 48, 72"
//                 value={formData.suspendDuration}
//                 onChange={(e) => onUpdate("suspendDuration", e.target.value)}
//                 className="h-12 rounded-xl bg-slate-50/50 border-slate-200"
//               />
//             </div>
//           )}

//           {/* Reply Interface */}
//           {formData.action === "reply" && (
//             <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
//                   Target Report <span className="text-red-500 ml-1">*</span>
//                 </label>
//                 <Select
//                   value={formData.selectedReportId}
//                   onValueChange={(val) => onUpdate("selectedReportId", val)}
//                 >
//                   <SelectTrigger className="h-12 rounded-xl bg-slate-50/50">
//                     <SelectValue placeholder="Choose report to address" />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-64">
//                     {p.reports?.map((r) => (
//                       <SelectItem key={r._id} value={r._id} className="py-3">
//                         <div className="flex flex-col gap-0.5">
//                           <span className="text-xs font-bold capitalize text-red-600">
//                             {r.reason}
//                           </span>
//                           <span className="text-[10px] text-slate-500">
//                             By: {r.reportedBy?.name || "User"}
//                           </span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
//                   Message Body <span className="text-red-500 ml-1">*</span>
//                 </label>
//                 <Textarea
//                   placeholder="Professional reply to reporter..."
//                   value={formData.replyMessage}
//                   onChange={(e) => onUpdate("replyMessage", e.target.value)}
//                   className="min-h-[150px] rounded-2xl bg-slate-50/50"
//                 />
//                 <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 mt-2">
//                   <p className="text-[10px] text-blue-700 flex gap-2 leading-relaxed font-medium">
//                     <Info className="w-3.5 h-3.5 shrink-0" />
//                     Sent via email. Professional tone required.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* 3. SUBMIT BUTTON */}
//           <Button
//             type="submit"
//             disabled={isSubmitting || !formData.action}
//             className={getButtonStyles()}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                 Processing...
//               </>
//             ) : !formData.action ? (
//               <>
//                 <AlertCircle className="w-5 h-5 mr-2" />
//                 Awaiting Decision
//               </>
//             ) : (
//               <span className="capitalize">
//                 Confirm {formData.action} Action
//               </span>
//             )}
//           </Button>
//         </form>
//       )}
//     </Card>
//   );
// };

// import { ChevronLeft, ChevronRight, XCircle } from "lucide-react";

// export const ImageLightbox = ({ modal, photos, onClose, onNavigate }) => {
//   const currentPhoto = photos[modal.index];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
//       onClick={onClose}
//     >
//       <button
//         className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors"
//         onClick={onClose}
//       >
//         <XCircle className="w-10 h-10" />
//       </button>

//       <div
//         className="relative max-w-5xl w-full flex items-center justify-center"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {modal.index > 0 && (
//           <button
//             className="absolute -left-16 p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
//             onClick={() =>
//               onNavigate(photos[modal.index - 1].url, modal.index - 1)
//             }
//           >
//             <ChevronLeft size={32} />
//           </button>
//         )}

//         <img
//           src={currentPhoto.url || currentPhoto}
//           className="max-h-[85vh] rounded-xl shadow-2xl object-contain"
//           alt="Review"
//         />

//         {modal.index < photos.length - 1 && (
//           <button
//             className="absolute -right-16 p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
//             onClick={() =>
//               onNavigate(photos[modal.index + 1].url, modal.index + 1)
//             }
//           >
//             <ChevronRight size={32} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };
