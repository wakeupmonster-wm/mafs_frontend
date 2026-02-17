import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminEditDialog from "../components/AdminEditDialog";
import { fetchProfile } from "../store/account.slice";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  Globe,
  Hash,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

export default function AccountsPage() {
  const dispatch = useDispatch();
  const { account, loading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-pulse text-indigo-600 font-bold">
          Loading Profile...
        </div>
      </div>
    );
  }

  const formatDateSafe = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : format(date, "MMMM dd, yyyy");
  };

  const initials = account?.nickname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-1 lg:px-2 py-4 space-y-8">
        {/* Hero Profile Header */}
        <div className="glass-card glow-border p-8 animate-fade-in shadow-lg rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand-aqua/20 to-brand-aqua/10 blur-md" />
              <Avatar className="relative h-32 w-32 border border-brand-aqua shadow-2xl">
                <AvatarImage
                  src={account?.avatar?.url}
                  alt={account?.nickname}
                />
                <AvatarFallback className="bg-secondary text-primary text-3xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 right-2">
                <Badge className="bg-alerts-success text-success-foreground border border-background text-[10px] font-bold uppercase px-2">
                  {account?.status}
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <h1 className="text-3xl font-bold gradient-text">
                  {account?.nickname}
                </h1>
                <Badge
                  variant="outline"
                  className="bg-alerts-success px-2 border border-background text-primary font-bold uppercase text-[10px] tracking-widest"
                >
                  {account?.role}
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-lg leading-relaxed">
                {account?.about || "No bio provided"}
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar
                    className="w-4 h-4 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                  Joined {formatDateSafe(account?.memberSince)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock
                    className="w-4 h-4 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                  Last login {formatDateSafe(account?.lastLogin)}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <AdminEditDialog currentData={account}>
              <Button className="bg-brand-aqua/20 hover:bg-brand-aqua/80 border border-brand-aqua text-slate-700 gap-2 font-semibold shadow-lg shadow-primary/20">
                <Edit3 className="w-4 h-4" strokeWidth={2.5} />
                Edit Profile
              </Button>
            </AdminEditDialog>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <Card
            className="glass-card glow-border animate-fade-in shadow-lg"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                <User className="w-5 h-5 text-brand-aqua" strokeWidth={2.5} />
                Contact Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1">
              <InfoItem
                icon={
                  <Mail className="w-4 h-4 text-brand-aqua" strokeWidth={2.5} />
                }
                label="Email Address"
                value={account?.email}
                verified={account?.verified?.email}
              />
              <InfoItem
                icon={
                  <Phone
                    className="w-4 h-4 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                }
                label="Phone Number"
                value={account?.phone}
                verified={account?.verified?.phone}
              />
              <InfoItem
                icon={
                  <MapPin
                    className="w-4 h-4 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                }
                label="Location"
                value={`${account?.location?.coordinates[0]}, ${account?.location?.coordinates[1]}`}
              />
            </CardContent>
          </Card>

          {/* Account Metadata */}
          <Card
            className="glass-card glow-border animate-fade-in shadow-lg"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                <ShieldCheck
                  className="w-5 h-5 text-brand-aqua"
                  strokeWidth={2.5}
                />
                Account Metadata
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1">
              <InfoItem
                icon={
                  <Calendar
                    className="w-4 h-4 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                }
                label="Member Since"
                value={formatDateSafe(account?.memberSince)}
              />
              <InfoItem
                icon={
                  <Globe
                    className="w-4 h-4 text-brand-aqua"
                    strokeWidth={2.5}
                  />
                }
                label="Last Login"
                value={formatDateSafe(account?.lastLogin)}
              />
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Hash className="w-4 h-4 text-brand-aqua" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Account ID
                  </p>
                  <p className="text-xs font-mono text-foreground/80 truncate">
                    {account?.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { label: "Role", value: account?.role, icon: ShieldCheck },
            { label: "Status", value: account?.status, icon: CheckCircle2 },
            {
              label: "Email Verified",
              value: account?.verified?.email ? "Yes" : "No",
              icon: Mail,
            },
            {
              label: "Phone Verified",
              value: account?.verified?.phone ? "Yes" : "No",
              icon: Phone,
            },
          ].map((stat) => (
            <div
              key={stat?.label}
              className="flex items-center justify-center gap-4 p-8 text-center shadow-lg"
            >
              <stat.icon
                className="w-8 h-8 text-brand-aqua"
                strokeWidth={2.5}
              />
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  {stat?.label}
                </p>
                <p className="text-sm font-bold text-foreground capitalize">
                  {stat?.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, verified }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/40 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
            {label}
          </p>
          <p className="text-sm font-semibold text-foreground">
            {value || "N/A"}
          </p>
        </div>
      </div>
      {verified !== undefined && (
        <Badge
          className={
            verified
              ? "bg-success/15 text-success border-success/30 hover:bg-success/20"
              : "bg-muted text-muted-foreground border-border hover:bg-muted"
          }
          variant="outline"
        >
          {verified ? "Verified" : "Pending"}
        </Badge>
      )}
    </div>
  );
}
