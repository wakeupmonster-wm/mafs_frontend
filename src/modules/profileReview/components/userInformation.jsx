import { Card } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Smartphone,
  Fingerprint,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyImg from "@/assets/web/dummyImg.webp";

export const UserInformation = ({ p }) => {
  // Helper to calculate age from DOB string
  const calculateAge = (dobString) => {
    if (!dobString) return "-";
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const userPhoto = p.profile?.photos || dummyImg;
  const nickname = p.profile?.nickname || dummyImg;

  return (
    <Card className="p-6 shadow-sm border-slate-200 bg-white overflow-hidden">
      {/* HEADER SECTION: User Profile & Name */}
      <div className="flex items-center gap-4 pb-2 border-b border-slate-100">
        <div className="relative">
          <Avatar className="h-16 w-16 border-2 border-blue-100 shadow-sm">
            <AvatarImage
              src={userPhoto}
              alt={nickname}
              className="object-cover"
            />
            <AvatarFallback className="bg-brand-aqua/50 text-white font-bold text-xl uppercase">
              {nickname.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {p.profile?.verification?.status === "approved" && (
            <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-0.5">
              <ShieldCheck className="w-5 h-5 text-brand-aqua fill-brand-aqua/10" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            {nickname}
          </h2>
          <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                p.accountStatus === "active" ? "bg-emerald-500" : "bg-red-500",
              )}
            />
            {p.accountStatus === "active" ? "Active Member" : "Account Flagged"}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* SECTION: PROFILE STATS */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
            <Calendar className="w-3 h-3" /> Profile Demographics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoItem label="Gender" value={p.profile?.gender || "-"} />
            <InfoItem
              label="Age"
              value={
                p.profile?.dob ? `${calculateAge(p.profile?.dob)} Years` : "-"
              }
            />
            <InfoItem
              label="City"
              value={p.profile?.location?.city || "-"}
              icon={<MapPin className="w-3 h-3 text-slate-400" />}
            />
            <InfoItem
              label="Joined"
              value={new Date(p.profile?.createdAt).toLocaleDateString(
                "en-IN",
                { day: "2-digit", month: "short", year: "numeric" },
              )}
            />
          </div>
        </div>

        {/* SECTION: CONTACT & IDENTITY */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
            <Smartphone className="w-3 h-3" /> Account Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem
              label="User ID"
              value={p.userId}
              isCode
              icon={<Fingerprint className="w-3 h-3 text-slate-400" />}
            />
            <InfoItem
              label="Email Address"
              value={p.profile?.email || "-"}
              icon={<Mail className="w-3 h-3 text-slate-400" />}
            />
            <InfoItem
              label="Phone Number"
              value={p?.phone || "-"}
              icon={<Smartphone className="w-3 h-3 text-slate-400" />}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const InfoItem = ({ label, value, isCode = false, icon }) => (
  <div className="group w-full bg-slate-50/50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:border-blue-100/50">
    <div className="flex items-center gap-1.5 mb-1.5">
      {icon}
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
        {label}
      </p>
    </div>
    <p
      className={cn(
        "text-sm font-bold text-slate-700 truncate",
        isCode &&
          "font-mono text-[11px] text-brand-aqua bg-brand-aqua/10 p-1 rounded px-2 border border-brand-aqua/10 w-fit max-w-full",
      )}
    >
      {value}
    </p>
  </div>
);
