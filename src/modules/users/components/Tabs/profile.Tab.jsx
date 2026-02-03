import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { AttributeBlock } from "../attribute.Block";
import { Separator } from "@/components/ui/separator";
import { DetailRow } from "../detailRow";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VerifyUserModal } from "../VerifyUserModal";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserProfile } from "../../store/user.slice";
import { toast } from "sonner";

// export const ProfileTab = ({ userData: initialUserData, ...props }) => {
//   const dispatch = useDispatch();
//   const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
//   const [verifyActionType, setVerifyActionType] = useState(""); // "approved" or "rejected"
//   // 1. Add a local loading state
//   const [isVerifying, setIsVerifying] = useState(false);

//   // Connect to the "Live" Redux state
//   // This ensures that when the Slice updates, this component re-renders immediately
//   const liveUser = useSelector((state) =>
//     state.users.items.find((u) => u._id === initialUserData._id)
//   );

//   // Use the live data if available, otherwise fallback to props
//   const userData = liveUser || initialUserData;
//   const verification = userData?.verification;

//   // 2. The handler for the modal confirm
//   const handleVerifyConfirm = async (status, reason) => {
//     setIsVerifying(true); // Start loading
//     try {
//       await dispatch(
//         verifyUserProfile({
//           userId: userData._id,
//           action: status === "approved" ? "approve" : "reject",
//           reason: status === "rejected" ? reason : undefined,
//         })
//       ).unwrap();

//       console.log(
//         "userId:",
//         userData._id,
//         "Status: ",
//         status,
//         "Reason: ",
//         reason
//       );

//       toast.success(`Identity ${status} successfully`, {
//         description: reason,
//       });
//       setIsVerifyModalOpen(false);
//     } catch (err) {
//       toast.error(err || "Failed to update verification");
//     } finally {
//       setIsVerifying(false); // Stop loading
//     }
//   };

//   return (
//     <>
//       {/* --- TAB 1: PROFILE SUMMARY --- */}
//       <TabsContent value="profile" className="mt-6 space-y-6">
//         <div className="grid grid-cols-12 gap-2">
//           {/* Left: Identity Section */}
//           <Card className="col-span-12 lg:col-span-3 shadow-sm border-muted">
//             <CardHeader className="text-center pb-2">
//               <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
//                 Identity Summary
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col items-center gap-2 px-4">
//               {/* --- ENHANCED IMAGE LIGHTBOX --- */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <div className="relative group cursor-zoom-in">
//                     {/* Outer Ring Animation */}
//                     <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />

//                     <Avatar className="relative h-52 w-52 border-4 border-background shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-1">
//                       <AvatarImage
//                         src={props?.photos?.[0]?.url}
//                         className="object-cover"
//                       />
//                       <AvatarFallback className="text-5xl font-bold bg-muted text-muted-foreground">
//                         {props?.profile?.nickname}
//                       </AvatarFallback>
//                     </Avatar>

//                     {/* Hover Icon Overlay */}
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full text-white shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
//                         <IconMaximize size={24} />
//                       </div>
//                     </div>
//                   </div>
//                 </DialogTrigger>

//                 <DialogContent className="max-w-max p-0 overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
//                   {/* Accessibility Title (Hidden) */}
//                   <DialogHeader className="sr-only">
//                     <DialogTitle>
//                       {props?.profile?.nickname}'s Profile Photo
//                     </DialogTitle>
//                   </DialogHeader>

//                   <div className="relative flex items-center justify-center min-h-[60vh]">
//                     {/* Hero Image */}
//                     <div className="relative animate-in zoom-in-95 fade-in duration-500 ease-out">
//                       <img
//                         src={props?.photos?.[0]?.url}
//                         alt={props?.profile?.nickname}
//                         className="max-h-[80vh] w-auto rounded-xl shadow-2xl border border-white/10 object-contain"
//                       />
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//               {/* --- IMAGE LIGHTBOX END --- */}

//               <h3 className="text-2xl mt-2 font-bold">
//                 {props?.profile?.nickname}
//               </h3>
//               <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
//                 <IconMapPin size={18} className="text-orange-500" />
//                 <span className="text-sm">
//                   {props?.userLoc?.city}, {props?.userLoc?.country}
//                 </span>
//               </div>

//               <div className="w-full mt-4 rounded-xl overflow-hidden h-40 bg-muted border relative">
//                 <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground italic">
//                   [Google Maps Integration Placeholder]
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* RIGHT CONTENT (9/12) */}
//           <div className="col-span-12 lg:col-span-9 space-y-6">
//             {/* ROW 1: Connectivity and Quality */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {/* Account Connectivity Card */}
//               <Card className="md:col-span-3 shadow-sm">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
//                     Account Connectivity
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-wrap items-center gap-8 py-2">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-blue-50 border border-blue-300 text-blue-600 rounded-lg">
//                       <IconMail size={20} />
//                     </div>
//                     <div className="flex gap-3">
//                       <span className="text-sm font-bold">
//                         {props?.account?.email || "N/A"}
//                       </span>
//                       <Badge
//                         variant={
//                           userData.isEmailVerified ? "success" : "outline"
//                         }
//                         // className="w-fit scale-75 -ml-2"
//                       >
//                         {userData.isEmailVerified ? "Verified" : "Unverified"}
//                       </Badge>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-green-50 border border-green-300 text-green-600 rounded-lg">
//                       <IconDeviceMobile size={20} />
//                     </div>
//                     <div className="flex gap-3">
//                       <span className="text-sm font-bold">
//                         {props?.account?.phone || "N/A"}
//                       </span>
//                       <Badge
//                         variant={
//                           userData.isPhoneVerified ? "success" : "outline"
//                         }
//                         // className="w-fit scale-75 -ml-2"
//                       >
//                         {userData.isPhoneVerified ? "Verified" : "Unverified"}
//                       </Badge>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-red-50 border border-red-300 text-red-600 rounded-lg">
//                       <IconLock size={20} />
//                     </div>
//                     <div className="flex gap-3">
//                       <span className="text-sm font-bold">Auth:</span>
//                       <Badge variant="secondary" className="ml-auto capitalize">
//                         {props?.account.authMethod}
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Profile Quality Card */}
//               <Card className="shadow-sm">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
//                     Profile Quality
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-black text-primary">
//                       {props?.profile?.totalCompletion || 0}%
//                     </span>
//                     <IconChartBar className="text-muted-foreground" />
//                   </div>
//                   <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full transition-all duration-500"
//                       style={{
//                         width: `${props?.profile?.totalCompletion || 0}%`,
//                       }}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* ROW 2: Bio & Essential Details (Full width of the 9-column span) */}
//             <Card className="shadow-sm">
//               <CardHeader className="pb-2 flex flex-row items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <IconUser className="text-primary h-5 w-5" />
//                   <CardTitle className="text-lg">
//                     Bio & Essential Details
//                   </CardTitle>
//                 </div>
//                 {/* Edit Trigger */}
//                 <EditProfileDialog userData={userData} />
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 {/* Bio Quote Section */}
//                 <blockquote className="border-l-4 border-primary/30 pl-4 py-2 bg-muted/20 rounded-r-lg">
//                   <p className="text-muted-foreground italic leading-relaxed">
//                     "
//                     {props?.profile?.about ||
//                       "This user hasn't written a bio yet."}
//                     "
//                   </p>
//                 </blockquote>

//                 {/* Horizontal Stats Grid (Matching Image: Nickname, Gender, Age, Zodiac) */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   <AttributeBlock
//                     label="Nickname"
//                     value={props?.profile?.nickname}
//                   />
//                   <AttributeBlock
//                     label="Gender"
//                     value={props?.profile?.gender}
//                   />
//                   <AttributeBlock
//                     label="Age"
//                     value={
//                       props?.profile?.age ? `${props?.profile.age} yrs` : null
//                     }
//                   />
//                   <AttributeBlock
//                     label="Zodiac"
//                     value={props?.attributes?.zodiac}
//                   />
//                 </div>

//                 <Separator />

//                 {/* Vertical Meta Details Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
//                   <DetailRow
//                     icon={<IconBriefcase size={18} />}
//                     label="Professional"
//                     value={`${props?.profile?.jobTitle || "N/A"} at ${
//                       props?.profile?.company || "N/A"
//                     }`}
//                   />
//                   <DetailRow
//                     icon={<IconCalendar size={18} />}
//                     label="Member Since"
//                     value={new Date(
//                       props?.account?.createdAt
//                     ).toLocaleDateString()}
//                   />
//                   <DetailRow
//                     icon={<IconMapPin size={18} />}
//                     label="Full Address"
//                     value={props?.userLoc?.full_address}
//                   />
//                   <DetailRow
//                     icon={<IconHeart size={18} className="text-pink-500" />}
//                     label="Dating Goal"
//                     value={props?.discovery?.relationshipGoal}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* 3. KYC / VERIFICATION */}
//             <Card
//               className={cn(
//                 "transition-all duration-300 border-2 shadow-sm",
//                 verification?.status === "approved"
//                   ? "border-green-200 bg-green-50/30"
//                   : "border-muted shadow-sm"
//               )}
//             >
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//                 <div className="flex items-center gap-2">
//                   <IconShieldCheck
//                     className={cn(
//                       "h-6 w-6",
//                       verification?.status === "approved"
//                         ? "text-green-600"
//                         : "text-muted-foreground"
//                     )}
//                   />
//                   <CardTitle className="text-lg">
//                     Profile Identity Verification
//                   </CardTitle>
//                 </div>
//                 <Badge
//                   className={cn(
//                     "px-4 py-1 font-bold",
//                     verification?.status === "approved"
//                       ? "bg-green-600 text-white"
//                       : "bg-amber-500 text-white"
//                   )}
//                 >
//                   {verification?.status?.toUpperCase() || "PENDING"}
//                 </Badge>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 <div className="flex flex-col md:flex-row justify-between gap-6">
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium">
//                       Document Check Required
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       Compare the live selfie against the government-issued
//                       photo ID.
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="h-9"
//                       onClick={() => window.open(verification?.selfieUrl)}
//                       disabled={!verification?.selfieUrl}
//                     >
//                       View Selfie
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="h-9"
//                       onClick={() => window.open(verification?.docUrl)}
//                       disabled={!verification?.docUrl}
//                     >
//                       View ID Card
//                     </Button>
//                   </div>
//                 </div>

//                 <Separator />

//                 {/* Admin Actions for Verification */}
//                 <div className="flex items-center justify-end gap-3 pt-2">
//                   <p className="text-xs font-bold text-muted-foreground mr-auto">
//                     MODERATOR ACTIONS:
//                   </p>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="text-destructive hover:bg-red-50"
//                     // onClick={() => handleVerification("rejected")}
//                     onClick={() => {
//                       setVerifyActionType("rejected");
//                       setIsVerifyModalOpen(true);
//                     }}
//                   >
//                     <IconX size={16} className="mr-1.5" /> Reject Identity
//                   </Button>

//                   <Button
//                     disabled={
//                       isVerifying || verification?.status === "approved"
//                     }
//                     onClick={() => {
//                       setVerifyActionType("approved");
//                       setIsVerifyModalOpen(true);
//                     }}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     {isVerifying ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <IconCheck size={16} className="mr-1.5" /> Approve
//                         Identity
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {verification?.status === "rejected" &&
//                   verification?.rejectionReason && (
//                     <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex gap-3 text-red-800">
//                       <IconAlertTriangle size={18} />
//                       <div className="text-xs">
//                         <p className="font-bold uppercase tracking-tight">
//                           Rejection Reason
//                         </p>
//                         <p className="italic opacity-80 mt-0.5">
//                           "{verification.rejectionReason}"
//                         </p>
//                       </div>
//                     </div>
//                   )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </TabsContent>

//       {/* --- MODALS --- */}
//       <VerifyUserModal
//         isOpen={isVerifyModalOpen}
//         actionType={verifyActionType}
//         onClose={() => setIsVerifyModalOpen(false)}
//         onConfirm={handleVerifyConfirm}
//         userName={props?.profile?.nickname}
//       />
//     </>
//   );
// };

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
                          {item.val || "N/A"}
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
                        : "N/A",
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
                    value={props?.profile?.jobTitle || "N/A"}
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
                    value={props?.userLoc?.full_address || "N/A"}
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
