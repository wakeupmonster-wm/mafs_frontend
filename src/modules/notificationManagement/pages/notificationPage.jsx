import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  Send,
  Crown,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PreLoader } from "@/app/loader/preloader";

import {
  broadcastNotification,
  sendNotificationToPremiumUsers,
  createPremiumExpiryCampaign,
  clearNotificationStatus,
  sendEmailCampaign,
} from "../store/notification-management.slice";
import { PageHeader } from "@/components/common/headSubhead";

export default function NotificationManagementPages() {
  const dispatch = useDispatch();
  const {
    loading: reduxLoading,
    successMessage,
    error: reduxError,
  } = useSelector((s) => s.notificationManagement);

  const [localLoading, setLocalLoading] = useState(false);
  const [form, setForm] = useState({
    notificationType: "broadcast",
    target: "all",
    campaignName: "",
    title: "",
    message: "",
    // CTA as object matching backend: { label, action }
    ctaLabel: "",
    ctaAction: "",
    daysBeforeExpiry: "",
    auto: true,
    sendNow: true,
    scheduleAt: "",
    emailSubject: "",
    emailBody: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const isLoading = reduxLoading || localLoading;

  // Build CTA object only if label is provided
  const buildCta = () => {
    if (!form.ctaLabel || !form.ctaAction) return undefined;
    return { label: form.ctaLabel, action: form.ctaAction };
  };

  // Build CLEAN payload per campaign type — only send what backend expects
  const buildPayload = () => {
    const base = { campaignName: form.campaignName };

    switch (form.notificationType) {
      case "broadcast":
        return {
          ...base,
          title: form.title,
          message: form.message,
          target: form.target,
          ...(buildCta() && { cta: buildCta() }),
        };

      case "premium":
        // No target field — backend hardcodes target: "premium"
        return {
          ...base,
          title: form.title,
          message: form.message,
          sendNow: form.sendNow,
          scheduleAt: form.sendNow ? null : form.scheduleAt || null,
          ...(buildCta() && { cta: buildCta() }),
        };

      case "expiry":
        return {
          ...base,
          title: form.title,
          message: form.message,
          daysBeforeExpiry: Number(form.daysBeforeExpiry),
          auto: form.auto,
          ...(buildCta() && { cta: buildCta() }),
        };

      case "email":
        return {
          ...base,
          emailSubject: form.emailSubject,
          emailBody: form.emailBody,
          target: form.target,
        };

      default:
        return base;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campaignName) return;

    if (form.notificationType === "email") {
      if (!form.emailSubject || !form.emailBody) return;
    } else {
      if (!form.title || !form.message) return;
    }

    if (form.notificationType === "expiry" && !form.daysBeforeExpiry) return;

    const payload = buildPayload();

    const actions = {
      broadcast: () => broadcastNotification(payload),
      premium: () => sendNotificationToPremiumUsers(payload),
      expiry: () => createPremiumExpiryCampaign(payload),
      email: () => sendEmailCampaign(payload),
    };

    dispatch(actions[form.notificationType]());
    setTimeout(() => dispatch(clearNotificationStatus()), 4000);
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
      {isLoading && (
        <div className="fixed inset-0 z-[100]">
          <PreLoader />
        </div>
      )}
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-7 space-y-6">
          {/* <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2"> */}
          <header className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <PageHeader
              heading="Campaign Manager"
              icon={<Bell className="w-9 h-9 text-white animate-pulse" />}
              color="bg-brand-aqua shadow-brand-aqua/30"
              subheading="Design and deploy multi-channel engagement."
            />
          </header>

          <Card className="p-6 border-slate-200 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Campaign Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 ml-1">
                      Channel Type
                    </label>
                    <Select
                      value={form.notificationType}
                      onValueChange={(v) => update("notificationType", v)}
                    >
                      <SelectTrigger className="bg-slate-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broadcast">
                          <div className="flex items-center gap-2">
                            <Send size={14} /> Push: Broadcast
                          </div>
                        </SelectItem>
                        <SelectItem value="expiry">
                          <div className="flex items-center gap-2">
                            <Clock size={14} /> Push: Expiry
                          </div>
                        </SelectItem>
                        <SelectItem value="premium">
                          <div className="flex items-center gap-2">
                            <Crown size={14} /> Push: Premium
                          </div>
                        </SelectItem>
                        <SelectItem value="email">
                          <div className="flex items-center gap-2">
                            <Mail size={14} /> Email Campaign
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 ml-1">
                      Target Audience
                    </label>
                    <Select
                      value={form.target}
                      disabled={form.notificationType === "premium"}
                      onValueChange={(v) => update("target", v)}
                    >
                      <SelectTrigger className="bg-slate-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Community</SelectItem>
                        <SelectItem value="free">
                          Free Tier Only
                        </SelectItem>
                        <SelectItem value="premium">
                          Premium Tier Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Internal Reference
                  </label>
                  <Input
                    placeholder="Internal Campaign Name (e.g., Valentines_2026)"
                    value={form.campaignName}
                    onChange={(e) => update("campaignName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Creative Content
                </h3>

                {form.notificationType === "email" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <Input
                      placeholder="Email Subject Line"
                      className="font-semibold"
                      value={form.emailSubject}
                      onChange={(e) => update("emailSubject", e.target.value)}
                    />
                    <Textarea
                      rows={8}
                      placeholder="Write your email body (HTML supported)..."
                      value={form.emailBody}
                      onChange={(e) => update("emailBody", e.target.value)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <Input
                      placeholder="Notification Title"
                      className="font-semibold"
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                    />
                    <Textarea
                      rows={4}
                      placeholder="Push message content..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                    />
                    {/* CTA: label + action dropdown (backend expects object) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="CTA Button Text (Optional)"
                        value={form.ctaLabel}
                        onChange={(e) => update("ctaLabel", e.target.value)}
                      />
                      <Select
                        value={form.ctaAction}
                        onValueChange={(v) => update("ctaAction", v)}
                      >
                        <SelectTrigger className="bg-slate-50">
                          <SelectValue placeholder="CTA Action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPEN_APP">Open App</SelectItem>
                          <SelectItem value="BUY_PREMIUM">Buy Premium</SelectItem>
                          <SelectItem value="OPEN_CHAT">Open Chat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expiry-specific fields */}
                    {form.notificationType === "expiry" && (
                      <div className="space-y-4">
                        <Input
                          type="number"
                          placeholder="Days before expiry (e.g. 3)"
                          value={form.daysBeforeExpiry}
                          onChange={(e) =>
                            update("daysBeforeExpiry", e.target.value)
                          }
                        />
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-slate-700">Auto Send via CRON</p>
                            <p className="text-xs text-slate-400">Automatically send when users match expiry window</p>
                          </div>
                          <Switch
                            checked={form.auto}
                            onCheckedChange={(v) => update("auto", v)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Premium-specific fields */}
                    {form.notificationType === "premium" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-slate-700">Send Immediately</p>
                            <p className="text-xs text-slate-400">Toggle off to schedule for later</p>
                          </div>
                          <Switch
                            checked={form.sendNow}
                            onCheckedChange={(v) => update("sendNow", v)}
                          />
                        </div>
                        {!form.sendNow && (
                          <Input
                            type="datetime-local"
                            placeholder="Schedule date & time"
                            value={form.scheduleAt}
                            onChange={(e) => update("scheduleAt", e.target.value)}
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              <Button
                className="w-full border border-brand-aqua text-gray-500 bg-brand-aqua/20 hover:bg-brand-aqua/50 hover:text-gray-700 h-12 text-base font-semibold shadow-lg shadow-slate-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Clock className="animate-spin" /> Deploying...
                  </span>
                ) : (
                  "Launch Campaign"
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* RIGHT COLUMN: PREVIEWS */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Eye size={16} /> Live Preview
          </h3>

          {form.notificationType === "email" ? (
            <Card className="p-0 overflow-hidden border-slate-200 shadow-lg min-h-[400px]">
              <div className="bg-slate-100 p-3 border-b flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-4 space-y-3">
                <div className="text-xs text-slate-400">
                  Subject:{" "}
                  <span className="text-slate-900 font-medium">
                    {form.emailSubject || "(No Subject)"}
                  </span>
                </div>
                <div className="border-t pt-4 text-sm text-slate-600 whitespace-pre-wrap">
                  {form.emailBody || "Email content will appear here..."}
                </div>
              </div>
            </Card>
          ) : (
            <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl p-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl" />

              <div className="mt-20">
                <motion.div
                  key={form.title}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-brand-aqua rounded flex items-center justify-center text-[10px] text-white">
                      M
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      MatchAtFirstSwipe
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      Now
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {form.title || "Headline Here"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {form.message ||
                      "Your notification message will be displayed like this on user devices."}
                  </p>
                </motion.div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {(successMessage || reduxError) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl flex items-center gap-3 border ${successMessage
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}
              >
                {successMessage ? (
                  <CheckCircle2 className="text-emerald-500" />
                ) : (
                  <AlertCircle className="text-rose-500" />
                )}
                <p className="text-sm font-medium">
                  {successMessage || reduxError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
