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
} from "lucide-react";

import {
  broadcastNotification,
  sendNotificationToPremiumUsers,
  createPremiumExpiryCampaign,
  clearNotificationStatus,
} from "../store/notification-management.slice";
import { toast } from "sonner"; // Assuming sonner for better feedback
import { PageHeader } from "@/components/common/headSubhead";

// Imagine BroadcastTab, PremiumTab, etc. follow the same pattern as EmailTab

// export default function NotificationManagementPage() {
//   const dispatch = useDispatch();
//   const { loading, error, successMessage, history } = useSelector(
//     (s) => s.notificationManagement
//   );

//   // --- UI States ---
//   const [activeTab, setActiveTab] = useState("broadcast");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null); // { thunk: func, data: obj, label: string }

//   // --- Logic: Handle Form Submission ---
//   const triggerConfirmation = (thunk, data, label) => {
//     setPendingAction({ thunk, data, label });
//     setIsModalOpen(true);
//   };

//   const handleConfirm = () => {
//     if (pendingAction) {
//       dispatch(pendingAction.thunk(pendingAction.data));
//       setIsModalOpen(false);
//       setPendingAction(null);
//     }
//   };

//   // Status Cleanup
//   useEffect(() => {
//     if (successMessage || error) {
//       const timer = setTimeout(() => dispatch(clearNotificationStatus()), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage, error, dispatch]);

//   // Tab Auto-Fetch
//   useEffect(() => {
//     if (activeTab === "history") dispatch(notificationHistory());
//   }, [activeTab, dispatch]);

//   return (
//     <div className="h-min p-6 bg-gray-50/50">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* PAGE HEADER */}
//         <header className="flex items-center gap-4">
//           <div className="p-3 bg-primary rounded-xl text-white">
//             <Bell size={24} />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">Campaign Center</h1>
//             <p className="text-muted-foreground text-sm">
//               Targeted notifications & email broadcasts
//             </p>
//           </div>
//         </header>

//         {/* NAVIGATION TABS */}
//         <nav className="flex gap-2 overflow-x-auto pb-2">
//           {[
//             {
//               id: "broadcast",
//               label: "Push Broadcast",
//               icon: <Send size={14} />,
//             },
//             { id: "premium", label: "Premium Blast", icon: <Gem size={14} /> },
//             {
//               id: "expiry",
//               label: "Expiry Alert",
//               icon: <AlertTriangle size={14} />,
//             },
//             { id: "email", label: "Email Campaign", icon: <Mail size={14} /> },
//             { id: "history", label: "Logs", icon: <History size={14} /> },
//           ].map((tab) => (
//             <Button
//               key={tab.id}
//               variant={activeTab === tab.id ? "default" : "secondary"}
//               onClick={() => setActiveTab(tab.id)}
//               className="gap-2"
//             >
//               {tab.icon} {tab.label}
//             </Button>
//           ))}
//         </nav>

//         {/* CONTENT AREA */}
//         <Card className="border-none shadow-lg overflow-hidden">
//           {activeTab === "broadcast" && (
//             <BroadcastTab
//               loading={loading}
//               onSubmit={(data) =>
//                 triggerConfirmation(
//                   broadcastNotification,
//                   data,
//                   "Push Broadcast"
//                 )
//               }
//             />
//           )}
//           {activeTab === "premium" && (
//             <PremiumTab
//               loading={loading}
//               onSubmit={(data) =>
//                 triggerConfirmation(
//                   sendNotificationToPremiumUsers,
//                   data,
//                   "Premium Blast"
//                 )
//               }
//             />
//           )}
//           {activeTab === "expiry" && (
//             <ExpiryTab
//               loading={loading}
//               onSubmit={(data) =>
//                 triggerConfirmation(
//                   createPremiumExpiryCampaign,
//                   data,
//                   "Expiry Alert"
//                 )
//               }
//             />
//           )}
//           {activeTab === "email" && (
//             <EmailTab
//               loading={loading}
//               onSubmit={(data) =>
//                 triggerConfirmation(sendEmailCampaign, data, "Email Campaign")
//               }
//             />
//           )}
//           {activeTab === "history" && (
//             <HistoryTab history={history} loading={loading} />
//           )}
//         </Card>

//         {/* Global Feedback Toasts */}
//         <div className="fixed bottom-6 right-6 space-y-2">
//           {error && (
//             <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-in fade-in slide-in-from-bottom-4">
//               ⚠️ {error}
//             </div>
//           )}
//           {successMessage && (
//             <div className="p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-in fade-in slide-in-from-bottom-4">
//               ✅ {successMessage}
//             </div>
//           )}
//         </div>

//         {/* THE CONFIRMATION MODAL */}
//         <ConfirmModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onConfirm={handleConfirm}
//           title={`Confirm ${pendingAction?.label}`}
//           description={`Are you sure you want to trigger this ${pendingAction?.label?.toLowerCase()}? This action will target ${
//             pendingAction?.data?.target || "the selected users"
//           } and cannot be undone.`}
//           confirmText="Yes, Send Now"
//           variant="destructive" // Use red button for broadcasts as they are high-impact
//         />
//       </div>
//     </div>
//   );
// }

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
    target: "all_users",
    campaignName: "",
    title: "",
    message: "",
    cta: "",
    daysBeforeExpiry: "",
    emailSubject: "",
    emailBody: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const isLoading = reduxLoading || localLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.campaignName) return toast.error("Campaign name is required");

    // --- EMAIL CAMPAIGN LOGIC ---
    if (form.notificationType === "email") {
      if (!form.emailSubject || !form.emailBody)
        return toast.error("Email fields are required");

      setLocalLoading(true);
      try {
        const token = localStorage.getItem("access_Token");
        const res = await fetch(
          "https://api.matchatfirstswipe.com.au/api/v1/admin/notification/broadcastemail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              campaignName: form.campaignName,
              subject: form.emailSubject,
              body: form.emailBody,
              target:
                form.target === "all_users"
                  ? "all"
                  : form.target === "free_users"
                  ? "free"
                  : "premium",
            }),
          }
        );
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        toast.success("Email campaign queued successfully");
      } catch (err) {
        toast.error(err.message || "Email sending failed");
      } finally {
        setLocalLoading(false);
      }
      return;
    }

    // --- PUSH NOTIFICATION LOGIC ---
    if (!form.title || !form.message)
      return toast.error("Title and Message are required");

    const actions = {
      broadcast: () => broadcastNotification({ ...form }),
      premium: () => sendNotificationToPremiumUsers({ ...form }),
      expiry: () => {
        if (!form.daysBeforeExpiry) throw new Error("Expiry days required");
        return createPremiumExpiryCampaign({
          ...form,
          daysBeforeExpiry: Number(form.daysBeforeExpiry),
        });
      },
    };

    try {
      dispatch(actions[form.notificationType]());
      setTimeout(() => dispatch(clearNotificationStatus()), 4000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8">
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
                        <SelectItem value="all_users">All Community</SelectItem>
                        <SelectItem value="free_users">
                          Free Tier Only
                        </SelectItem>
                        <SelectItem value="premium_users">
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
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                    <Input
                      placeholder="Action Link (Optional)"
                      value={form.cta}
                      onChange={(e) => update("cta", e.target.value)}
                    />
                    {form.notificationType === "expiry" && (
                      <Input
                        type="number"
                        placeholder="Days before expiry"
                        value={form.daysBeforeExpiry}
                        onChange={(e) =>
                          update("daysBeforeExpiry", e.target.value)
                        }
                      />
                    )}
                    {/* </div> */}
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
                className={`p-4 rounded-xl flex items-center gap-3 border ${
                  successMessage
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
