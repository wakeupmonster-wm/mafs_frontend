import React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  IconArrowLeft,
  IconCalendar,
  IconMapPin,
  IconBriefcase,
  IconShieldCheck,
  IconUser,
  IconHeart,
  IconAlertTriangle,
  IconSettings,
  IconMail,
  IconDeviceMobile,
  IconChartBar,
  IconSearch,
  IconMusic,
  IconMovie,
  IconBook,
  IconEdit,
  IconCheck,
  IconX,
  IconLock,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandSnapchat,
  IconBan,
  IconAlertCircle,
  IconLink,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BanUserModal } from "../components/ban-user-modal";
import BanAlert from "../components/banAlert";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  bannedUserProfile,
  suspendUserProfile,
  unbanUserProfile,
  verifyUserProfile,
} from "../store/user.slice";
import { toast } from "sonner";
import ConfirmModal from "@/components/common/ConfirmModal";
import { SuspendUserModal } from "../components/suspendUserModal";
import { VerifyUserModal } from "../components/VerifyUserModal";

export default function ViewProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isBanModalOpen, setIsBanModalOpen] = React.useState(false);
  const [isUnbannedOpen, setIsUnbannedOpen] = React.useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = React.useState(false);
  // 1. Add state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = React.useState(false);
  const [verifyActionType, setVerifyActionType] = React.useState(""); // "approved" or "rejected"

  // Get initial data from location
  const initialUserData = location.state?.userData;

  // Sync with Redux store to get "live" updates (status changes, etc.)
  const liveUser = useSelector((state) =>
    state.users.items.find((u) => u._id === initialUserData?._id)
  );

  // Fallback to initial data if not found in store yet
  const userData = liveUser || initialUserData;

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-muted-foreground text-lg">No user data found.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
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
  } = userData;

  const isBanned = account.status === "banned" || account.banDetails?.isBanned;

  const handleBanConfirm = async (category, reason) => {
    const userId = userData._id;
    try {
      await dispatch(bannedUserProfile({ userId, category, reason })).unwrap();
      toast.success("User banned successfully", {
        description: `${profile?.nickname} is now restricted.`,
      });
      setIsBanModalOpen(false);
    } catch (error) {
      toast.error(error || "Failed to ban user");
    }
  };

  // 2. New Unban Handler
  const handleUnban = async () => {
    try {
      await dispatch(unbanUserProfile(userData._id)).unwrap();
      toast.success("Account Restored", {
        description: `${profile?.nickname} can now access their profile.`,
      });
      setIsUnbannedOpen(false);
    } catch (err) {
      toast.error(err || "Failed to unban user");
    }
  };

  // 2. The handler for the modal confirm
  const handleVerifyConfirm = async (status, reason) => {
    try {
      await dispatch(
        verifyUserProfile({
          userId: userData._id,
          action: status === "approved" ? "approve" : "reject",
          reason: status === "rejected" ? reason : undefined,
        })
      ).unwrap();

      console.log(
        "userId:",
        userData._id,
        "Status: ",
        status,
        "Reason: ",
        reason
      );

      toast.success(`Identity ${status} successfully`, {
        description: reason,
      });
      setIsVerifyModalOpen(false);
    } catch (err) {
      toast.error(err || "Failed to update verification");
    }
  };

  const handleSuspendConfirm = async (reason, duration) => {
    try {
      await dispatch(
        suspendUserProfile({
          userId: userData._id,
          reason,
          durationHours: Number(duration),
        })
      ).unwrap();
      toast.success("User Suspended", {
        description: `Access restricted for ${duration} hours.`,
      });
      setIsSuspendModalOpen(false);
    } catch (err) {
      toast.error(err || "Failed to suspend user");
    }
  };

  // Social Media Config mapping
  const socialConfig = {
    instagram: {
      icon: <IconBrandInstagram size={14} />,
      color:
        "text-pink-600 border-pink-200 bg-pink-50 dark:bg-pink-950/30 dark:border-pink-900",
      label: "Instagram",
    },
    facebook: {
      icon: <IconBrandFacebook size={14} />,
      color:
        "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900",
      label: "Facebook",
    },
    twitter: {
      icon: <IconBrandTwitter size={14} />,
      color:
        "text-sky-600 border-sky-200 bg-sky-50 dark:bg-sky-950/30 dark:border-sky-900",
      label: "Twitter",
    },
    snapchat: {
      icon: <IconBrandSnapchat size={14} />,
      color:
        "text-yellow-600 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900",
      label: "Snapchat",
    },
  };

  return (
    <>
      <div className="p-6 w-full space-y-6 max-w-[1600px] mx-auto">
        {/* --- HEADER AREA --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <IconArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {profile?.nickname || "User Profile"}
                </h1>
                {account.isPremium && <Badge variant="premium">PRO</Badge>}
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                ID: {userData._id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant={
                isBanned
                  ? "destructive"
                  : account.status === "suspended" ||
                    userData.accountStatus === "suspended"
                  ? "warning"
                  : "default"
              }
              className={cn(
                "px-4 py-1.5 shadow-sm",
                (account.status === "suspended" ||
                  userData.accountStatus === "suspended") &&
                  "bg-orange-500 hover:bg-orange-500 text-white"
              )}
            >
              {(account.status || userData.accountStatus)?.toUpperCase()}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-sm">
                  <IconSettings className="mr-2 h-4 w-4" /> Manage Account
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() =>
                    navigate("../edit-profile", { state: { userData } })
                  }
                >
                  <IconEdit className="mr-2 h-4 w-4" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconMail className="mr-2 h-4 w-4" /> Message User
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                {isBanned ? (
                  <DropdownMenuItem
                    className="text-green-600 font-medium"
                    onClick={() => setIsUnbannedOpen(true)}
                  >
                    Unban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-destructive font-medium"
                    onClick={() => setIsBanModalOpen(true)}
                  >
                    <IconBan className="mr-2 h-4 w-4 text-red-500" />
                    Ban User Account
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                {!isBanned && account.status !== "suspended" && (
                  <DropdownMenuItem onClick={() => setIsSuspendModalOpen(true)}>
                    <IconAlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                    Suspend User
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* --- BAN ALERT --- */}
        {isBanned && <BanAlert account={account} />}

        {/* --- MAIN CONTENT GRID --- */}
        <div className="relative grid grid-cols-12 gap-6">
          {/* LEFT SIDEBAR (3/12) */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card className="overflow-hidden shadow-sm border-muted">
              <CardContent className="pt-8 flex flex-col items-center text-center">
                <Avatar className="h-44 w-44 mb-4 border-4 border-background shadow-2xl">
                  <AvatarImage
                    src={photos?.[0]?.url}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-5xl font-bold bg-primary/5 text-primary">
                    {profile?.nickname?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold">
                  {profile?.nickname || "Unknown User"}, {profile?.age || "-"}
                </h3>
                <p className="text-muted-foreground flex items-center gap-1.5 text-sm mt-1">
                  <IconMapPin size={16} className="text-orange-500" />
                  {userLoc?.city || "Unknown City"},{" "}
                  {userLoc?.country || "Unknown Country"}
                </p>
                <div className="w-full grid grid-cols-2 gap-2 mt-6">
                  <div className="bg-muted/40 p-2 rounded-lg text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">
                      Height
                    </p>
                    <p className="text-sm font-semibold">
                      {profile?.height ? `${profile.height} cm` : "-"}
                    </p>
                  </div>
                  <div className="bg-muted/40 p-2 rounded-lg text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">
                      Gender
                    </p>
                    <p className="text-sm font-semibold capitalize">
                      {profile?.gender || "-"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  Gallery{" "}
                  <Badge
                    variant="secondary"
                    className="rounded-full h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {photos?.length ?? 0}
                  </Badge>
                </h4>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {photos?.length > 0 ? (
                    photos.map((photo, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                      >
                        <img
                          src={photo.url}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110 cursor-zoom-in"
                          alt="User upload"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10 text-xs text-muted-foreground bg-muted/20 rounded-xl border-2 border-dashed">
                      No photos uploaded
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* LOCATION CARD */}
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-semibold flex items-center gap-2">
                  <IconMapPin size={20} className="text-orange-500" /> Current
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase w-20">
                      City:
                    </span>
                    <span className="text-sm">
                      {userLoc?.city || "Unknown City"},{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase w-20">
                      Country:
                    </span>
                    <span className="text-sm">
                      {userLoc?.country || "Unknown Country"}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                      Full Address
                    </p>
                    <p className="text-sm italic">
                      {userLoc?.full_address || "No address provided by user"}
                    </p>
                  </div>

                  {/* Coordinate check */}
                  <div className="pt-2 flex gap-4">
                    <div className="text-[10px] text-muted-foreground">
                      LAT: {userLoc?.coordinates?.[1] ?? "0.00"}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      LNG: {userLoc?.coordinates?.[0] ?? "0.00"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT CONTENT (9/12) */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* 1. Account & Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Account Connectivity
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-6 py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 border border-blue-300 text-blue-600 rounded-lg">
                      <IconMail size={20} />
                    </div>
                    <div className="flex gap-3">
                      <span className="text-sm font-bold">
                        {account?.email || "-"}
                      </span>
                      <Badge
                        variant={
                          userData.isEmailVerified ? "success" : "outline"
                        }
                        // className="w-fit scale-75 -ml-2"
                      >
                        {userData.isEmailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 border border-green-300 text-green-600 rounded-lg">
                      <IconDeviceMobile size={20} />
                    </div>
                    <div className="flex gap-3">
                      <span className="text-sm font-bold">
                        {account?.phone || "-"}
                      </span>
                      <Badge
                        variant={
                          userData.isPhoneVerified ? "success" : "outline"
                        }
                        // className="w-fit scale-75 -ml-2"
                      >
                        {userData.isPhoneVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 border border-red-300 text-red-600 rounded-lg">
                      <IconLock size={20} />
                    </div>
                    <div className="flex gap-3">
                      <span className="text-sm font-bold">Auth:</span>
                      <Badge variant="secondary" className="ml-auto capitalize">
                        {account.authMethod}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Profile Quality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-primary">
                      {profile?.totalCompletion ?? 0}%
                    </span>
                    <IconChartBar className="text-muted-foreground" />
                  </div>
                  <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-500"
                      style={{ width: `${profile?.totalCompletion ?? 0}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 2. Personal Bio */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center gap-2">
                <IconUser className="text-primary h-5 w-5" />
                <CardTitle className="text-lg">
                  Bio & Essential Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="border-l-4 border-primary/30 pl-4 py-2 bg-muted/20 rounded-r-lg">
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{profile?.about || "This user hasn't written a bio yet."}"
                  </p>
                </blockquote>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <AttributeBlock label="Nickname" value={profile?.nickname} />
                  <AttributeBlock label="Gender" value={profile?.gender} />
                  <AttributeBlock
                    label="Age"
                    value={profile?.age ? `${profile.age} yrs` : null}
                  />
                  <AttributeBlock label="Zodiac" value={attributes?.zodiac} />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                  <DetailRow
                    icon={<IconBriefcase size={18} />}
                    label="Professional"
                    value={`${profile?.jobTitle || "-"} at ${
                      profile?.company || "-"
                    }`}
                  />
                  <DetailRow
                    icon={<IconCalendar size={18} />}
                    label="Member Since"
                    value={new Date(account?.createdAt).toLocaleDateString()}
                  />
                  <DetailRow
                    icon={<IconMapPin size={18} />}
                    label="Full Address"
                    value={userLoc?.full_address}
                  />
                  <DetailRow
                    icon={<IconHeart size={18} className="text-pink-500" />}
                    label="Dating Goal"
                    value={discovery?.relationshipGoal}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 3. LIFESTYLE & DISCOVERY PREFERENCES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md font-semibold">
                    Lifestyle Attributes
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-y-4">
                  <AttributeBlock
                    label="Education"
                    value={attributes.education}
                  />
                  <AttributeBlock
                    label="Religion"
                    value={attributes.religion}
                  />
                  <AttributeBlock label="Smoking" value={attributes.smoking} />
                  <AttributeBlock
                    label="Drinking"
                    value={attributes.drinking}
                  />
                  <AttributeBlock label="Diet" value={attributes.dietary} />
                  <AttributeBlock label="Workout" value={attributes.workout} />
                  <AttributeBlock
                    label="Sleeping"
                    value={attributes.sleeping}
                  />
                  <AttributeBlock label="Pets" value={attributes.pets} />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-md font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <IconSearch size={18} className="text-blue-500" /> Discovery
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <AttributeBlock
                      label="Distance Limit"
                      value={
                        discovery?.distanceRange
                          ? `${discovery.distanceRange} km`
                          : "-"
                      }
                    />
                    <AttributeBlock
                      label="Age Range"
                      value={
                        discovery?.ageRange?.min && discovery?.ageRange?.max
                          ? `${discovery.ageRange.min}-${discovery.ageRange.max} yrs`
                          : "-"
                      }
                    />
                    <AttributeBlock
                      label="Interested In"
                      value={discovery?.showMeGender?.join(", ") || "-"}
                    />
                    <AttributeBlock
                      label="Profile Visibility"
                      value={discovery?.globalVisibility || "-"}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between group">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                      Linked Socials
                    </span>

                    {attributes?.socialMedia &&
                    attributes.socialMedia !== "None" ? (
                      (() => {
                        const platform = attributes.socialMedia.toLowerCase();
                        const config = socialConfig[platform] || {
                          icon: <IconLink size={14} />,
                          color:
                            "text-muted-foreground border-muted bg-muted/30",
                          label: attributes.socialMedia,
                        };

                        return (
                          <Badge
                            variant="outline"
                            className={cn(
                              "transition-all duration-300 px-3 py-1 gap-1.5 font-bold shadow-sm cursor-default",
                              config.color
                            )}
                          >
                            {config.icon}
                            {config.label}
                          </Badge>
                        );
                      })()
                    ) : (
                      <span className="text-xs text-muted-foreground italic bg-muted/20 px-2 py-1 rounded border border-dashed">
                        No account linked
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 4. Interests & Media */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-md font-bold uppercase tracking-wider text-muted-foreground">
                  Interests & Media Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <MediaSection
                    icon={<IconHeart size={18} className="text-red-500" />}
                    label="Hobbies"
                    items={attributes?.interests}
                  />
                  <MediaSection
                    icon={<IconMusic size={18} className="text-purple-500" />}
                    label="Music Taste"
                    items={attributes?.music}
                  />
                </div>
                <div className="space-y-6">
                  <MediaSection
                    icon={<IconMovie size={18} className="text-orange-500" />}
                    label="Movie Genres"
                    items={attributes?.movies}
                  />
                  <MediaSection
                    icon={<IconBook size={18} className="text-green-500" />}
                    label="Reading List"
                    items={attributes?.books}
                  />
                </div>
              </CardContent>
            </Card>
            {/* 5. KYC / VERIFICATION */}
            <Card
              className={cn(
                "transition-all duration-300 border-2",
                verification?.status === "approved"
                  ? "border-green-200 bg-green-50/30"
                  : "border-muted shadow-sm"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <IconShieldCheck
                    className={cn(
                      "h-6 w-6",
                      verification?.status === "approved"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    )}
                  />
                  <CardTitle className="text-lg">
                    Identity Verification
                  </CardTitle>
                </div>
                <Badge
                  className={cn(
                    "px-4 py-1 font-bold",
                    verification?.status === "approved"
                      ? "bg-green-600 text-white"
                      : "bg-amber-500 text-white"
                  )}
                >
                  {verification?.status?.toUpperCase() || "PENDING"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Document Check Required
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Compare the live selfie against the government-issued
                      photo ID.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={() => window.open(verification?.selfieUrl)}
                      disabled={!verification?.selfieUrl}
                    >
                      View Selfie
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={() => window.open(verification?.docUrl)}
                      disabled={!verification?.docUrl}
                    >
                      View ID Card
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Admin Actions for Verification */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <p className="text-xs font-bold text-muted-foreground mr-auto">
                    MODERATOR ACTIONS:
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-red-50"
                    // onClick={() => handleVerification("rejected")}
                    onClick={() => {
                      setVerifyActionType("rejected");
                      setIsVerifyModalOpen(true);
                    }}
                  >
                    <IconX size={16} className="mr-1.5" /> Reject Identity
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    // onClick={() => handleVerification("approved")}
                    onClick={() => {
                      setVerifyActionType("approved");
                      setIsVerifyModalOpen(true);
                    }}
                  >
                    <IconCheck size={16} className="mr-1.5" /> Approve Identity
                  </Button>
                </div>

                {verification?.status === "rejected" &&
                  verification?.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex gap-3 text-red-800">
                      <IconAlertTriangle size={18} />
                      <div className="text-xs">
                        <p className="font-bold uppercase tracking-tight">
                          Rejection Reason
                        </p>
                        <p className="italic opacity-80 mt-0.5">
                          "{verification.rejectionReason}"
                        </p>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <SuspendUserModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={handleSuspendConfirm}
        userName={profile?.nickname}
      />

      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        onConfirm={handleBanConfirm}
        userName={profile?.nickname}
      />

      {/* --- MODALS --- */}
      <VerifyUserModal
        isOpen={isVerifyModalOpen}
        actionType={verifyActionType}
        onClose={() => setIsVerifyModalOpen(false)}
        onConfirm={handleVerifyConfirm}
        userName={profile?.nickname}
      />

      <ConfirmModal
        isOpen={isUnbannedOpen}
        onClose={() => setIsUnbannedOpen(false)}
        onConfirm={handleUnban}
        title="Unban User?"
        message={`Are you sure you want to restore access for ${profile?.nickname}? they will be able to use the app immediately.`}
        confirmText="Restore Access"
        type="warning" // Changed to warning as it's a "positive" restoration
      />
    </>
  );
}

/* --- REUSABLE COMPONENTS --- */

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="p-1.5 bg-muted/50 rounded-md text-muted-foreground">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">
          {label}
        </span>
        <span className="text-foreground font-semibold leading-tight">
          {value || "-"}
        </span>
      </div>
    </div>
  );
}

function AttributeBlock({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-black text-muted-foreground/70 tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-foreground capitalize">
        {value || "-"}
      </p>
    </div>
  );
}

function MediaSection({ icon, label, items }) {
  if (!items || items.length === 0)
    return (
      <div className="space-y-2 opacity-50">
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
          {icon} <span className="uppercase tracking-tighter">{label}</span>
        </div>
        <p className="text-xs italic">No data provided</p>
      </div>
    );
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
        {icon}{" "}
        <span className="uppercase tracking-tighter text-foreground">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="capitalize text-[10px] font-bold py-0 h-6 bg-muted/50 hover:bg-muted border-none"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
