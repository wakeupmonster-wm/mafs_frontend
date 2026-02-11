import { Card } from "@/components/ui/card";
import {
  Mail,
  User,
  MapPin,
  Smartphone,
  Fingerprint,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <Card className="p-6 shadow-sm border-slate-200 bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        User Information
      </h2>

      <div className="space-y-5">
        {/* SECTION: PROFILE STATS */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Profile Demographics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoItem label="Gender" value={p.profile?.gender || "-"} />
            <InfoItem
              label="Age"
              value={`${calculateAge(p.profile?.dob)} Years`}
            />
            <InfoItem
              label="Location"
              value={p.profile?.location?.city || "Unknown"}
              icon={<MapPin className="w-3 h-3 text-slate-400" />}
            />
            <InfoItem label="Nickname" value={p.profile?.nickname || "-"} />
          </div>
        </div>

        {/* SECTION: CONTACT & IDENTITY */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5" /> Account Identity
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
              value={p.profile?.email || "No Email"}
              icon={<Mail className="w-3 h-3 text-slate-400" />}
            />
            <InfoItem
              label="Phone Number"
              value={p?.phone || "No Phone"}
              icon={<Smartphone className="w-3 h-3 text-slate-400" />}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const InfoItem = ({ label, value, isCode = false, icon }) => (
  <div className="group w-full bg-slate-50/50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:border-blue-100">
    <div className="flex items-center gap-1.5 mb-1.5">
      {icon}
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        {label}
      </p>
    </div>
    <p
      className={cn(
        "text-sm font-bold text-slate-700 truncate",
        isCode &&
          "font-mono text-[11px] text-blue-600 bg-blue-50/50 p-1 rounded px-2 border border-blue-100 w-fit max-w-full"
      )}
    >
      {value}
    </p>
  </div>
);
