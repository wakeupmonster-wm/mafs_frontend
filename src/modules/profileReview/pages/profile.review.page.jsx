import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// UI Components
import {
  fetchProfileForReview,
  fetchReportedProfiles,
  performUpdateProfileStatus,
} from "../store/profile-review.slice";
import { Header } from "../components/header";
import { UserInformation } from "../components/userInformation";
import { Biography } from "../components/biography";
import { PhotoGallery } from "../components/photogallery";
import { ReportsSection } from "../components/reportsSection";
import { ActionPanel } from "../components/actionPanel";
import { ImageLightbox } from "../components/imageLightBox";
import { NotFoundState } from "../components/notFound";
import { toast } from "sonner";
import { PreLoader } from "@/app/loader/preloader";

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
  console.log("userId: ", userId);

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

  const [modal, setModal] = useState({ isOpen: false, url: null, index: 0 });

  useEffect(() => {
    if (userId) dispatch(fetchProfileForReview(userId));
  }, [userId, dispatch]);

  if (loading)
    return (
      // <div className="flex h-screen flex-col items-center justify-center bg-slate-50 gap-4">
      //   <Loader2 className="animate-spin text-brand-aqua h-12 w-12" />
      //   <p className="text-slate-400 font-medium animate-pulse">
      //     Fetching Profile Intelligence...
      //   </p>
      // </div>
      <PreLoader />
    );

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header p={p} />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - User Data (8/12) */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div variants={sectionVariants}>
              <UserInformation p={p} />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <Biography bio={p.profile?.bio} />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <PhotoGallery
                photos={p.profile?.photos}
                onImageClick={(url, idx) =>
                  setModal({ isOpen: true, url, index: idx })
                }
              />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <ReportsSection reports={p.reports} count={p.reportCount} />
            </motion.div>
          </div>

          {/* Right Column - Action Panel (4/12) */}
          <motion.div className="lg:col-span-4" variants={sectionVariants}>
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
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modal.isOpen && (
          <ImageLightbox
            modal={modal}
            photos={p.profile?.photos}
            onClose={() => setModal((m) => ({ ...m, isOpen: false }))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
