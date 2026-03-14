import { useState, useEffect } from "react";
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
  Send,
  Users,
  Crown,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  broadcastNotification,
  sendNotificationToPremiumUsers,
  createPremiumExpiryCampaign,
  clearNotificationStatus,
} from "../store/notification-management.slice";

export default function NotificationManagementPages() {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(
    (s) => s.notificationManagement
  );

  const [form, setForm] = useState({
    notificationType: "broadcast",
    target: "all_users",
    campaignName: "",
    title: "",
    message: "",
    cta: "",
    daysBeforeExpiry: "",
  });

  const handleChange = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campaignName || !form.title || !form.message) return;

    const actions = {
      broadcast: () => broadcastNotification({ ...form }),
      premium: () => sendNotificationToPremiumUsers({ ...form }),
      expiry: () =>
        createPremiumExpiryCampaign({
          ...form,
          daysBeforeExpiry: Number(form.daysBeforeExpiry),
        }),
    };

    dispatch(actions[form.notificationType]());
    setTimeout(() => dispatch(clearNotificationStatus()), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ENHANCED HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <Bell className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Notification Engine
              </h1>
              <p className="text-slate-500 text-sm">
                Create and target push campaigns for MAFS
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CONFIGURATION FORM */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-none shadow-sm ring-1 ring-slate-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Campaign Type
                    </label>
                    <Select
                      value={form.notificationType}
                      onValueChange={(v) => handleChange("notificationType", v)}
                    >
                      <SelectTrigger className="bg-slate-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broadcast">
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" /> Broadcast
                          </div>
                        </SelectItem>
                        <SelectItem value="expiry">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Expiry Alert
                          </div>
                        </SelectItem>
                        <SelectItem value="premium">
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4" /> Premium Exclusive
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Target Audience
                    </label>
                    <Select
                      value={form.target}
                      disabled={form.notificationType === "premium"}
                      onValueChange={(v) => handleChange("target", v)}
                    >
                      <SelectTrigger className="bg-slate-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_users">All Community</SelectItem>
                        <SelectItem value="free_users">
                          Standard Tier
                        </SelectItem>
                        <SelectItem value="premium_users">
                          Pro Tier Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Campaign Details
                    </label>
                    <Input
                      placeholder="e.g. Valentines_Day_2026"
                      className="bg-slate-50/50"
                      value={form.campaignName}
                      onChange={(e) =>
                        handleChange("campaignName", e.target.value)
                      }
                    />
                  </div>

                  <Input
                    placeholder="Title: New match nearby! 🥂"
                    className="text-lg font-medium"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />

                  <Textarea
                    placeholder="Your message content..."
                    className="min-h-[120px] resize-none bg-slate-50/50"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="CTA Link (https://...)"
                        value={form.cta}
                        onChange={(e) => handleChange("cta", e.target.value)}
                      />
                    </div>
                    {form.notificationType === "expiry" && (
                      <div className="w-32">
                        <Input
                          type="number"
                          placeholder="Days"
                          value={form.daysBeforeExpiry}
                          onChange={(e) =>
                            handleChange("daysBeforeExpiry", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-md font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Clock className="animate-spin w-4 h-4" /> Dispatching...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Campaign <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Card>

            <AnimatePresence>
              {(successMessage || error) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-lg flex items-center gap-3 border ${
                    successMessage
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  {successMessage ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p className="text-sm font-medium">
                    {successMessage || error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DEVICE PREVIEW SECTION */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase text-slate-400">
              Live Preview
            </h2>
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 absolute rounded-b-[1rem]"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-200 p-3 pt-12">
                <AnimatePresence>
                  {form.title && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white/90 backdrop-blur shadow-md rounded-2xl p-3 mb-2 border border-white"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-indigo-600 rounded flex items-center justify-center">
                          <Bell className="text-white w-[10px] h-[10px]" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          MAFS
                        </span>
                      </div>
                      <h4 className="text-[12px] font-bold text-slate-800 truncate">
                        {form.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                        {form.message || "Message body will appear here..."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-2/3 bg-slate-300 rounded-full mx-auto" />
                  <div className="h-2 w-1/2 bg-slate-300 rounded-full mx-auto" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400">
              Approximate display on mobile devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
