import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, History, Mail, Send, Gem, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  notificationHistory,
  broadcastNotification,
  sendEmailCampaign,
  sendNotificationToPremiumUsers,
  createPremiumExpiryCampaign,
  clearNotificationStatus,
} from "../store/notification-management.slice";

import { EmailTab } from "../components/emailTab.page";
import { HistoryTab } from "../components/historyTab";
import ConfirmModal from "@/components/common/ConfirmModal";
import { BroadcastTab } from "../components/broadcastTab";
import { PremiumTab } from "../components/premiumTab";
import { ExpiryTab } from "../components/expiryTab";
// Imagine BroadcastTab, PremiumTab, etc. follow the same pattern as EmailTab

export default function NotificationManagementPage() {
  const dispatch = useDispatch();
  const { loading, error, successMessage, history } = useSelector(
    (s) => s.notificationManagement
  );

  // --- UI States ---
  const [activeTab, setActiveTab] = useState("broadcast");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { thunk: func, data: obj, label: string }

  // --- Logic: Handle Form Submission ---
  const triggerConfirmation = (thunk, data, label) => {
    setPendingAction({ thunk, data, label });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction) {
      dispatch(pendingAction.thunk(pendingAction.data));
      setIsModalOpen(false);
      setPendingAction(null);
    }
  };

  // Status Cleanup
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => dispatch(clearNotificationStatus()), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  // Tab Auto-Fetch
  useEffect(() => {
    if (activeTab === "history") dispatch(notificationHistory());
  }, [activeTab, dispatch]);

  return (
    <div className="h-min p-6 bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* PAGE HEADER */}
        <header className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-xl text-white">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Campaign Center</h1>
            <p className="text-muted-foreground text-sm">
              Targeted notifications & email broadcasts
            </p>
          </div>
        </header>

        {/* NAVIGATION TABS */}
        <nav className="flex gap-2 overflow-x-auto pb-2">
          {[
            {
              id: "broadcast",
              label: "Push Broadcast",
              icon: <Send size={14} />,
            },
            { id: "premium", label: "Premium Blast", icon: <Gem size={14} /> },
            {
              id: "expiry",
              label: "Expiry Alert",
              icon: <AlertTriangle size={14} />,
            },
            { id: "email", label: "Email Campaign", icon: <Mail size={14} /> },
            { id: "history", label: "Logs", icon: <History size={14} /> },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "secondary"}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2"
            >
              {tab.icon} {tab.label}
            </Button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <Card className="border-none shadow-lg overflow-hidden">
          {activeTab === "broadcast" && (
            <BroadcastTab
              loading={loading}
              onSubmit={(data) =>
                triggerConfirmation(
                  broadcastNotification,
                  data,
                  "Push Broadcast"
                )
              }
            />
          )}
          {activeTab === "premium" && (
            <PremiumTab
              loading={loading}
              onSubmit={(data) =>
                triggerConfirmation(
                  sendNotificationToPremiumUsers,
                  data,
                  "Premium Blast"
                )
              }
            />
          )}
          {activeTab === "expiry" && (
            <ExpiryTab
              loading={loading}
              onSubmit={(data) =>
                triggerConfirmation(
                  createPremiumExpiryCampaign,
                  data,
                  "Expiry Alert"
                )
              }
            />
          )}
          {activeTab === "email" && (
            <EmailTab
              loading={loading}
              onSubmit={(data) =>
                triggerConfirmation(sendEmailCampaign, data, "Email Campaign")
              }
            />
          )}
          {activeTab === "history" && (
            <HistoryTab history={history} loading={loading} />
          )}
        </Card>

        {/* Global Feedback Toasts */}
        <div className="fixed bottom-6 right-6 space-y-2">
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 animate-in fade-in slide-in-from-bottom-4">
              ⚠️ {error}
            </div>
          )}
          {successMessage && (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-in fade-in slide-in-from-bottom-4">
              ✅ {successMessage}
            </div>
          )}
        </div>

        {/* THE CONFIRMATION MODAL */}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title={`Confirm ${pendingAction?.label}`}
          description={`Are you sure you want to trigger this ${pendingAction?.label?.toLowerCase()}? This action will target ${
            pendingAction?.data?.target || "the selected users"
          } and cannot be undone.`}
          confirmText="Yes, Send Now"
          variant="destructive" // Use red button for broadcasts as they are high-impact
        />
      </div>
    </div>
  );
}
