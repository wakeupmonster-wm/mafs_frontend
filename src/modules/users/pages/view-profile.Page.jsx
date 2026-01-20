"use client";

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
  IconCrown,
  IconAlertTriangle,
  IconSettings,
  IconMail,
  IconDeviceMobile,
  IconChartBar,
  IconSearch,
  IconMusic,
  IconMovie,
  IconBook,
  IconWorld,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

export default function ViewProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;
  const [isBanModalOpen, setIsBanModalOpen] = React.useState(false);

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>No user data found.</p>
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

  const handleBanConfirm = async (reason) => {
    // Here you would dispatch your Redux action or call your API
    console.log(`Banning user ${userData._id} for: ${reason}`);

    // Example: dispatch(banUser({ id: userData._id, reason }));

    // After success, you might want to refresh data or navigate back
  };

  return (
    <>
      <div className="p-6 w-full space-y-6">
        {/* Header Area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <IconArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {profile?.nickname || "User Profile"}
                </h1>
                {account.isPremium && (
                  <Badge variant="premium" className="h-fit">
                    PRO
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-mono">
                ID: {userData._id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant={isBanned ? "destructive" : "default"}
              className="px-3 py-1"
            >
              {account.status.toUpperCase()}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <IconSettings className="mr-2 h-4 w-4" /> Manage User
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Verify Identity Manually</DropdownMenuItem>
                <DropdownMenuItem>Reset Password Link</DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* Update your DropdownMenuItem to open the modal */}
                {isBanned ? (
                  <DropdownMenuItem className="text-green-600">
                    Unban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => setIsBanModalOpen(true)}
                  >
                    Ban User Account
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* BAN ALERT SECTION */}

        {isBanned && <BanAlert account={account} />}

        <div className="w-full flex gap-6">
          {/* LEFT COLUMN: Avatar & Photos */}
          <div className="w-2/12 space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-40 w-40 mb-4 border-4 border-background shadow-xl">
                  <AvatarImage
                    src={photos?.[0]?.url}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl font-bold">
                    {profile?.nickname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold">
                  {profile?.nickname || "Unknown"}, {profile?.age || "N/A"}
                </h3>
                <p className="text-muted-foreground flex items-center gap-1 text-sm">
                  <IconMapPin size={14} /> {userLoc?.city || "Unknown Location"}
                  , {userLoc?.country}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Gallery
                </h4>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {photos?.length > 0 ? (
                    photos.map((photo) => (
                      <img
                        key={photo.id}
                        src={photo.url}
                        className="rounded-lg object-cover aspect-square border hover:opacity-90 transition-opacity cursor-zoom-in"
                        alt="User"
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-6 text-xs text-muted-foreground bg-muted/30 rounded-lg">
                      No photos uploaded
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Extensive Details */}
          <div className="w-10/12 space-y-6">
            {/* About & Basic Stats */}
            {/* 1. TOP SECTION: ACCOUNT SECURITY & STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Account Connectivity
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <IconMail size={18} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{account.email}</span>
                    <Badge
                      variant={userData.isEmailVerified ? "success" : "outline"}
                    >
                      {userData.isEmailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconDeviceMobile
                      size={18}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm font-medium">{account.phone}</span>
                    <Badge
                      variant={userData.isPhoneVerified ? "success" : "outline"}
                    >
                      {userData.isPhoneVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="ml-auto capitalize">
                    Auth: {account.authMethod}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Profile Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <IconChartBar className="text-primary" />
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full"
                      style={{ width: `${profile.totalCompletion}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">
                    {profile.totalCompletion}%
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* 2. PERSONAL DETAILS & BIO */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <IconUser className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Personal Details</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4 py-1">
                  {profile?.about || "User has not provided a bio."}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <AttributeBlock label="Nickname" value={profile.nickname} />
                  <AttributeBlock
                    label="Age / Gender"
                    value={`${profile.age} / ${profile.gender}`}
                  />
                  <AttributeBlock
                    label="Height"
                    value={`${profile.height} cm`}
                  />
                  <AttributeBlock label="Zodiac" value={attributes.zodiac} />
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailRow
                    icon={<IconBriefcase size={16} />}
                    label="Work"
                    value={`${profile.jobTitle} at ${profile.company}`}
                  />
                  <DetailRow
                    icon={<IconCalendar size={16} />}
                    label="Joined"
                    value={new Date(account.createdAt).toLocaleDateString()}
                  />
                  <DetailRow
                    icon={<IconMapPin size={16} />}
                    label="Location"
                    value={location.full_address}
                  />
                  <DetailRow
                    icon={<IconHeart size={16} className="text-pink-500" />}
                    label="Dating Goal"
                    value={discovery.relationshipGoal}
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

              {/* DISCOVERY SETTINGS CARD */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-md font-semibold flex items-center gap-2">
                    <IconSearch size={20} className="text-blue-500" /> Discovery
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Distance Fallback */}
                    <AttributeBlock
                      label="Distance Range"
                      value={
                        discovery?.distanceRange
                          ? `${discovery.distanceRange} km`
                          : "N/A"
                      }
                    />

                    {/* Age Range Fallback */}
                    <AttributeBlock
                      label="Age Preference"
                      value={
                        discovery?.ageRange?.min && discovery?.ageRange?.max
                          ? `${discovery.ageRange.min} - ${discovery.ageRange.max} years`
                          : "N/A"
                      }
                    />

                    {/* Gender Preference Fallback */}
                    <AttributeBlock
                      label="Interested In"
                      value={
                        discovery?.showMeGender?.length > 0
                          ? discovery.showMeGender.join(", ")
                          : "N/A"
                      }
                    />

                    {/* Visibility Fallback */}
                    <AttributeBlock
                      label="Visible To"
                      value={discovery?.globalVisibility || "N/A"}
                    />
                  </div>

                  <Separator />

                  {/* Relationship Goal with Heart Icon */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 pt-2">
                      <IconHeart size={16} className="text-pink-500" />
                      <span className="text-sm font-semibold text-muted-foreground uppercase text-[10px]">
                        Relationship Goal:
                      </span>
                      <span className="text-sm font-medium">
                        {discovery?.relationshipGoal || "Not Specified"}
                      </span>
                    </div>

                    <div className="pt-2">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">
                        Social Media Linked
                      </p>
                      <Badge
                        variant="outline"
                        className="text-blue-600 border-blue-200 bg-blue-50"
                      >
                        {attributes.socialMedia}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <span className="text-sm">{location?.city || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase w-20">
                        Country:
                      </span>
                      <span className="text-sm">
                        {location?.country || "N/A"}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
                        Full Address
                      </p>
                      <p className="text-sm italic">
                        {location?.full_address ||
                          "No address provided by user"}
                      </p>
                    </div>

                    {/* Coordinate check */}
                    <div className="pt-2 flex gap-4">
                      <div className="text-[10px] text-muted-foreground">
                        LAT: {location?.coordinates?.[1] ?? "0.00"}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        LNG: {location?.coordinates?.[0] ?? "0.00"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 4. INTERESTS & MEDIA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-md font-semibold">
                    Interests & Media Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <MediaSection
                    icon={<IconHeart size={16} className="text-red-400" />}
                    label="Interests"
                    items={attributes.interests}
                  />
                  <MediaSection
                    icon={<IconMusic size={16} className="text-purple-400" />}
                    label="Music"
                    items={attributes.music}
                  />
                  <MediaSection
                    icon={<IconMovie size={16} className="text-orange-400" />}
                    label="Movies"
                    items={attributes.movies}
                  />
                  <MediaSection
                    icon={<IconBook size={16} className="text-green-400" />}
                    label="Books"
                    items={attributes.books}
                  />
                  <MediaSection
                    icon={<IconWorld size={16} className="text-blue-400" />}
                    label="Languages"
                    items={attributes.languages}
                  />
                </CardContent>
              </Card>
            </div>

            {/* 5. KYC / VERIFICATION SECTION */}
            <Card
              className={cn(
                "transition-all duration-200",
                verification?.status === "approved" &&
                  "border-green-200 bg-green-500/10",
                verification?.status === "rejected" &&
                  "border-red-200 bg-red-500/5",
                verification?.status === "pending" &&
                  "border-amber-200 bg-amber-500/5"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="flex items-center gap-2">
                  <IconShieldCheck
                    className={cn(
                      "h-5 w-5",
                      verification?.status === "approved"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    )}
                  />
                  <h3 className="font-semibold text-lg text-foreground">
                    Identity Verification
                  </h3>
                </div>

                <Badge
                  className={cn(
                    "capitalize font-bold shadow-none",
                    verification?.status === "approved" &&
                      "bg-green-600 hover:bg-green-600 text-white",
                    verification?.status === "rejected" &&
                      "bg-red-600 hover:bg-red-600 text-white",
                    verification?.status === "pending" &&
                      "bg-amber-500 hover:bg-amber-500 text-white",
                    !verification?.status && "bg-gray-500 text-white"
                  )}
                >
                  {verification?.status?.replace("_", " ") || "NOT STARTED"}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Verification documents: <strong>Selfie</strong> and{" "}
                      <strong>Govt ID</strong>.
                    </p>
                    {/* Verification Date Fallback */}
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                      Last Action:{" "}
                      {verification?.verifiedAt
                        ? new Date(verification.verifiedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5"
                      onClick={() =>
                        verification?.selfieUrl &&
                        window.open(verification.selfieUrl)
                      }
                      disabled={!verification?.selfieUrl}
                    >
                      Selfie {!verification?.selfieUrl && "(N/A)"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5"
                      onClick={() =>
                        verification?.docUrl && window.open(verification.docUrl)
                      }
                      disabled={!verification?.docUrl}
                    >
                      ID Card {!verification?.docUrl && "(N/A)"}
                    </Button>
                  </div>
                </div>

                {/* REJECTION REASON ALERT (Only shows if status is rejected) */}
                {verification?.status === "rejected" &&
                  verification?.rejectionReason && (
                    <div className="mt-2 rounded-lg bg-red-100/50 p-3 border border-red-200">
                      <div className="flex items-center gap-2 text-red-800 text-xs font-bold mb-1">
                        <IconAlertTriangle size={14} />
                        REJECTION REASON
                      </div>
                      <p className="text-xs text-red-700 italic">
                        "{verification.rejectionReason}"
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* The Modal Component */}
      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        onConfirm={handleBanConfirm}
        userName={profile?.nickname}
      />
    </>
  );
}

/* Helper Components for clean code */

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{icon}</span>
      <span className="font-semibold min-w-[70px]">{label}:</span>
      <span className="text-foreground truncate">{value || "N/A"}</span>
    </div>
  );
}

function AttributeBlock({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tight">
        {label}
      </p>
      <p className="text-sm font-medium capitalize">{value || "Not Set"}</p>
    </div>
  );
}

function MediaSection({ icon, label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon} <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="capitalize text-[11px]"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
