import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkCreateCampaign,
  fetchPrizes,
  clearGiveawayStatus,
} from "../store/giveaway.slice";
import { Layers } from "lucide-react";
import { PreLoader } from "@/app/loader/preloader";
import BulkForm from "../components/BulkForm";
import { toast } from "sonner";

export default function BulkCampaignsPage() {
  const dispatch = useDispatch();
  const {
    prizes,
    loading,
    bulkCampaignLoading,
  } = useSelector((s) => s.giveaway);

  useEffect(() => {
    dispatch(fetchPrizes());
    dispatch(clearGiveawayStatus());
  }, [dispatch]);

  const handleBulkSubmit = async (formData) => {
    try {
      const result = await dispatch(
        bulkCreateCampaign({
          ranges: [formData],
          isActive: true,
        })
      ).unwrap();

      const { summary, skippedDates } = result;
      const created = summary?.created || 0;
      const skipped = summary?.skipped || 0;

      const skippedInfo = skippedDates
        ?.map(
          (d) =>
            `${new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}: ${d.reason}`
        )
        .join("\n");

      if (created > 0 && skipped === 0) {
        toast.success(`Successfully generated weekly campaigns for all Fridays in the selected range. (${created} total)`);
      } else if (created > 0 && skipped > 0) {
        toast.success(`Successfully generated weekly campaigns for all Fridays in the selected range. (${created} created, ${skipped} non-Fridays/duplicates ignored)`, {
          description: skippedInfo,
          duration: 8000,
        });
      } else {
        toast.error(`No campaigns created. Ensure selected range includes Fridays.`, {
          description: skippedInfo,
          duration: 8000,
        });
      }
    } catch (err) {
      toast.error(err || "Bulk campaign creation failed");
    } finally {
      dispatch(clearGiveawayStatus());
    }
  };

  return (
    <div className="relative p-4 space-y-6 min-h-[500px]">
      {(loading || bulkCampaignLoading) && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
          <PreLoader />
        </div>
      )}

      {/* Header - consistent with other sub-pages */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Bulk Create Campaigns
            </h1>
            <p className="text-sm text-slate-500">
              Schedule multiple giveaway campaigns across a date range
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <BulkForm
              prizes={prizes}
              onSubmit={handleBulkSubmit}
              isSubmitting={bulkCampaignLoading}
              isPrizesLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
