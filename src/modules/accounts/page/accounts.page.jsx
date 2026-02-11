import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/account.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NameUpdateCard } from "../components/NameUpdateCard";
import { EmailUpdateCard } from "../components/EmailUpdateCard";
import { PasswordUpdateCard } from "../components/PasswordUpdateCard";

export default function AccountsPage() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (!profile && loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header Widget */}
        <header className="flex items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <Avatar className="h-24 w-24 ring-4 ring-blue-50 shadow-inner">
            <AvatarImage src={profile?.photos?.[0]} />
            <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
              {profile?.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {profile?.fullName}
            </h1>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none mt-2 px-3 py-1">
              {profile?.role}
            </Badge>
          </div>
        </header>

        <div className="grid gap-6">
          <NameUpdateCard currentName={profile?.fullName} />
          {/* <EmailUpdateCard currentEmail={profile?.email} /> */}
          {/* <PasswordUpdateCard /> */}
        </div>
      </div>
    </div>
  );
}
