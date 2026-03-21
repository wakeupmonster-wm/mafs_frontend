import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchProfileForReview,
  fetchReportedProfiles,
  performUpdateProfileStatus,
} from "../store/profile-review.slice";
import { Header } from "../components/header";
import { UserInformation } from "../components/userInformation";
import { ReportsSection } from "../components/reportsSection";
import { ActionPanel } from "../components/actionPanel";
import { NotFoundState } from "../components/notFound";
import { toast } from "sonner";
import { PreLoader } from "@/app/loader/preloader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ShieldAlert, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function ProfileReviewPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { selected: p, loading } = useSelector((s) => s.profileReview || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    action: "",
    reason: "",
    suspendDuration: "",
    replyMessage: "",
    selectedReportId: "",
  });

  useEffect(() => {
    if (userId) dispatch(fetchProfileForReview(userId));
  }, [userId, dispatch]);

  if (loading) return <PreLoader />;

  if (!p) return <NotFoundState />;

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation Logic
    if (!formData.action) {
      toast.warning("Please select an action");
      return;
    }
    if (
      (formData.action === "reject" || formData.action === "ban") &&
      !formData.reason.trim()
    ) {
      toast.warning("Reason is required for this action");
      return;
    }

    if (
      formData.action === "suspend" &&
      (!formData.suspendDuration || !formData.reason.trim())
    ) {
      toast.warning("Duration and reason are required for suspension");

      return;
    }

    if (
      formData.action === "reply" &&
      (!formData.selectedReportId || !formData.replyMessage.trim())
    ) {
      toast.warning("Please select a report and enter a reply message");
      return;
    }

    setIsSubmitting(true);

    // 2. Build Payload
    const payload = {
      userId,
      action: formData.action,
      reason: formData.reason.trim() || undefined,
      replyMessage:
        formData.action === "reply" ? formData.replyMessage.trim() : undefined,
      reportId:
        formData.action === "reply" ? formData.selectedReportId : undefined,
      suspendDuration:
        formData.action === "suspend"
          ? Number(formData.suspendDuration)
          : undefined,
    };

    try {
      await dispatch(performUpdateProfileStatus(payload)).unwrap();
      toast.success("Moderation action executed successfully.");

      // Refresh Data
      await Promise.all([
        dispatch(fetchProfileForReview(userId)),
        dispatch(fetchReportedProfiles({ page: 1, limit: 20 })),
      ]);

      // Reset local form
      setFormData({
        action: "",
        reason: "",
        suspendDuration: "",
        replyMessage: "",
        selectedReportId: "",
      });
    } catch (err) {
      toast.error(err?.message || "Failed to execute action.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic: Agar saari reports resolved hain toh action panel lock ho jayega
  const allReportsResolved = p?.reports?.every((r) => r.status === "resolved");
  const pendingReports =
    p?.reports?.filter((r) => r.status !== "resolved") || [];
  const resolvedReports =
    p?.reports?.filter((r) => r.status === "resolved") || [];

  const isResolved = allReportsResolved;

  const hasPending = pendingReports.length > 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="w-full mx-auto px-4 lg:px-5 py-4">
        <Header p={p} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* LEFT COLUMN: Tabbed Interface */}
          <div className="lg:col-span-8 space-y-6">
            <Tabs defaultValue="reports" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 gap-4 border border-slate-200 bg-slate-100 shadow-sm px-2 h-14 rounded-2xl">
                <TabsTrigger
                  value="reports"
                  className={cn(
                    "rounded-xl font-bold py-2.5 border border-transparent gap-2 transition-all",
                    "data-[state=active]:border-brand-aqua/40 data-[state=active]:bg-brand-aqua/20 data-[state=active]:shadow-sm",
                    hasPending
                      ? "data-[state=active]:text-red-600"
                      : "data-[state=active]:text-brand-aqua",
                  )}
                >
                  <ShieldAlert
                    className={cn(
                      "w-4 h-4",
                      hasPending ? "text-red-500" : "text-brand-aqua",
                    )}
                  />

                  {/* Text Logic */}
                  <span>
                    {!hasPending ? "Report History" : "Active Reports"}
                  </span>

                  {/* Count Badge */}
                  <span className="opacity-60 text-sm">
                    (
                    {hasPending
                      ? pendingReports.length
                      : resolvedReports.length}
                    )
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-xl font-bold py-2.5 border border-transparent data-[state=active]:border-brand-aqua/40 gap-2 data-[state=active]:bg-brand-aqua/10 data-[state=active]:text-brand-aqua data-[state=active]:shadow-sm"
                >
                  <UserSearch className="w-4 h-4" />
                  Review User Details
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: ALL REPORTS */}
              <TabsContent value="reports" className="space-y-6 outline-none">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ReportsSection reports={p.reports} count={p.reportCount} />
                </motion.div>
              </TabsContent>

              {/* TAB 2: USER FULL DETAILS */}
              <TabsContent value="details" className="space-y-8 outline-none">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* Action Bar for Navigation */}
                  <div className="flex justify-between items-center bg-brand-aqua/5 p-4 rounded-xl border border-brand-aqua/50">
                    <p className="text-sm font-medium text-brand-aqua">
                      Looking for deep analytics?
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-white hover:bg-brand-aqua/60 hover:text-white transition-all shadow-sm"
                      onClick={() =>
                        navigate("../../users-management/view-profile", {
                          state: { userId: p.userId },
                        })
                      }
                    >
                      View Profile
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <UserInformation p={p} />
                  {/* <Biography bio={p.profile?.bio} /> */}
                  {/* <PhotoGallery
                    photos={p.profile?.photos}
                    onImageClick={(url, idx) =>
                      setModal({ isOpen: true, url, index: idx })
                    }
                  /> */}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT COLUMN - Sticky Action Panel (4/12) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <ActionPanel
                p={p}
                formData={formData}
                onUpdate={(f, v) =>
                  setFormData((prev) => ({ ...prev, [f]: v }))
                }
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
