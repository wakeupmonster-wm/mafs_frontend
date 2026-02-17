import { format } from "date-fns";
import {
  Phone,
  ShieldCheck,
  Zap,
  UserCheck,
  Venus,
  Mars,
  User,
} from "lucide-react";
import dummyImg from "@/assets/images/dummyImg.jpg";

export const getParticipantsColumns = () => [
  {
    accessorKey: "nickname",
    header: "User Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={row.original.profilePhoto || dummyImg}
            className="w-9 h-9 rounded-full border border-slate-200 object-cover"
            alt="avatar"
          />
          {row.original.isPremium && (
            <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5 border-2 border-white">
              <Zap className="h-2 w-2 text-white fill-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[13px] text-slate-800">
            {row.getValue("nickname")}
          </span>
          <span className="text-[10px] text-slate-400 capitalize">
            {row.original.gender || "Not Specified"}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Contact Info",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-slate-600">
        <Phone className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-[13px] font-medium">{row.getValue("phone")}</span>
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender")?.toLowerCase();

      // Determine icon and color based on gender
      const getGenderIcon = () => {
        if (gender === "woman" || gender === "female")
          return <Venus className="h-3.5 w-3.5 text-pink-500" />;
        if (gender === "man" || gender === "male")
          return <Mars className="h-3.5 w-3.5 text-blue-500" />;
        return <User className="h-3.5 w-3.5 text-slate-400" />;
      };

      return (
        <div className="flex items-center gap-2 text-slate-600">
          {getGenderIcon()}
          <span className="text-[13px] font-medium capitalize">
            {gender || "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isPremium",
    header: "Tier",
    cell: ({ row }) =>
      row.getValue("isPremium") ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold uppercase">
          <ShieldCheck className="h-3 w-3" /> Premium
        </span>
      ) : (
        <span className="text-[11px] text-slate-400 font-medium px-2">
          Free
        </span>
      ),
  },
  {
    accessorKey: "accountStatus",
    header: "Account",
    cell: ({ row }) => {
      const status = row.getValue("accountStatus");
      return (
        <div className="flex items-center gap-1.5">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              status === "active" ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <span className="text-[12px] font-medium capitalize text-slate-700">
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isWinner",
    header: "Winner Status",
    cell: ({ row }) =>
      row.getValue("isWinner") ? (
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 w-fit">
          <UserCheck className="h-3.5 w-3.5" /> WINNER
        </div>
      ) : (
        <span className="text-[11px] text-slate-400 px-2">Participant</span>
      ),
  },
];
