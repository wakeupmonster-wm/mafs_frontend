import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  changePassword,
  resetPasswordStatus,
} from "@/modules/accounts/store/account.slice";
import { Label } from "@radix-ui/react-label";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { AlertCircle, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { loading, passwordSuccess } = useSelector((state) => state.account);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) return;

    try {
      const result = await dispatch(
        changePassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        })
      ).unwrap();
      toast.success(result.message || "Success", {
        description: result.description,
      });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err || "Failed to update password");
    }
  };

  useEffect(() => {
    if (passwordSuccess) {
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => dispatch(resetPasswordStatus()), 5000);
    }
  }, [passwordSuccess, dispatch]);

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

  // Helper for the eye icon button
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

  return (
    <div className="min-h-screen">
      <Card className="max-w-6xl mx-auto mt-10 px-1 lg:px-2 py-6 border-none shadow-xl bg-white/80 backdrop-blur-md overflow-hidden font-jakarta">
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
