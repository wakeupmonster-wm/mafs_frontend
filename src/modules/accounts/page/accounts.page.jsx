import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminEditDialog from "../components/AdminEditDialog";
import {
  changePassword,
  fetchProfile,
  resetPasswordStatus,
} from "../store/account.slice";
import {
  AlertCircle,
  Calendar,
  Check,
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
import { PreLoader } from "@/app/loader/preloader";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AccountsPage() {
  const dispatch = useDispatch();
  const { account, loading, passwordSuccess } = useSelector(
    (state) => state.account,
  );
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // SECOND HOOK (Moved up from below the if statement)
  useEffect(() => {
    if (passwordSuccess) {
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => dispatch(resetPasswordStatus()), 5000);
    }
  }, [passwordSuccess, dispatch]);

  const formatDateSafe = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);

    return isNaN(date.getTime())
      ? "Invalid Date"
      : // h:mm a adds hour:minute and AM/PM
        format(date, "MMMM dd, yyyy - h:mm a");
  };

  const initials = account?.nickname
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) return;

    try {
      const result = await dispatch(
        changePassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      ).unwrap();
      toast.success(result.message || "Success", {
        description: result.description,
      });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err || "Failed to update password");
    }
  };

  const getStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { label: "Very Weak", color: "bg-alerts-error" },
      { label: "Weak", color: "bg-alerts-error" },
      { label: "Fair", color: "bg-alerts-warning" },
      { label: "Strong", color: "bg-alerts-success" },
      { label: "Very Strong", color: "bg-alerts-success" },
    ];
    return { score, ...levels[Math.min(score - 1, 4)] };
  };

  const strength = getStrength(form.newPassword);

  const passwordsMatch =
    form.confirmPassword && form.newPassword === form.confirmPassword;
  const passwordsMismatch =
    form.confirmPassword && form.newPassword !== form.confirmPassword;

  // 1. ADD THIS: Toggle function for passwords
  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 2. Helper for the eye icon button (Updated with correct component name)
  const EyeToggle = ({ isVisible, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
    >
      {isVisible ? <IconEyeOff size={20} /> : <IconEye size={20} />}
    </button>
  );

  const checks = [
    { label: "Min. 8 characters", pass: form.newPassword.length > 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(form.newPassword) },
    { label: "Number", pass: /[0-9]/.test(form.newPassword) },
    { label: "Special symbol", pass: /[^A-Za-z0-9]/.test(form.newPassword) },
  ];

  if (loading) {
    return <PreLoader />;
  }

  return (
    <div className="min-h-screen">
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
                  className="object-cover"
                />
                <AvatarFallback className="bg-secondary text-primary text-3xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* <div className="absolute -bottom-1 right-2">
                <Badge className="bg-alerts-success text-success-foreground border border-background text-[10px] font-bold uppercase px-2">
                  {account?.status}
                </Badge>
              </div> */}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <h1 className="text-3xl font-bold text-black">
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
                  Last login {formatDateSafe(account?.lastLoginAt)}
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
                value={formatDateSafe(account?.lastLoginAt)}
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

      <Card className="mx-auto px-1 lg:px-2 py-4 border-none shadow-xl bg-white/80 backdrop-blur-md overflow-hidden font-jakarta">
        {/* <div className="h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" /> */}
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-aqua/20 rounded-xl text-brand-aqua shadow-inner">
              <IconLock size={28} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Security Credentials
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Update your password to keep your admin account secure.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <form onSubmit={onSubmit} className="grid gap-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label className="text-sm text-slate-700 font-bold ml-1">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  className="h-12 border-slate-200 bg-slate-50/50 focus:bg-white pr-12 rounded-xl"
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                  placeholder="••••••••"
                />
                <EyeToggle
                  isVisible={showPasswords.current}
                  onToggle={() => toggleVisibility("current")}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* New Password */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-700 font-bold ml-1">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    className="h-12 border-slate-200 rounded-xl pr-12"
                    value={form.newPassword}
                    onChange={(e) =>
                      setForm({ ...form, newPassword: e.target.value })
                    }
                  />
                  <EyeToggle
                    isVisible={showPasswords.new}
                    onToggle={() => toggleVisibility("new")}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-700 font-bold ml-1">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? "text" : "password"}
                    className={`h-12 border-slate-200 rounded-xl pr-12 transition-all ${
                      passwordsMatch
                        ? "border-success/50 bg-success/5"
                        : passwordsMismatch
                          ? "border-destructive/50 bg-destructive/5"
                          : "border-border"
                    }`}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                  <EyeToggle
                    isVisible={showPasswords.confirm}
                    onToggle={() => toggleVisibility("confirm")}
                  />
                </div>
                {passwordsMismatch && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Passwords do not match
                  </p>
                )}
              </div>
            </div>

            {/* --- Password Strength Indicator Section --- */}
            {form.newPassword && (
              <div className="space-y-3 px-1 animate-in fade-in slide-in-from-top-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Security Strength
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      strength.color?.replace("bg-", "text-") ||
                      "text-muted-foreground"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="flex gap-1.5 h-1.5">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`h-full flex-1 rounded-full transition-all duration-500 ${
                        step <= strength.score ? strength.color : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
                <ul className="grid grid-cols-1 gap-1.5 pt-1">
                  {checks.map((c) => (
                    <li
                      key={c.label}
                      className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                        c.pass ? "text-success" : "text-muted-foreground"
                      }`}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} />
                      {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              disabled={
                loading ||
                form.newPassword !== form.confirmPassword ||
                !form.newPassword
              }
              className="h-14 bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 shadow-sm shadow-neutral-400 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin rounded-full" />
                  Updating...
                </div>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
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
            {value || "-"}
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
