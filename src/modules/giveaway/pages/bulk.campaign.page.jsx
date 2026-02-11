import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkCreateCampaign,
  fetchPrizes,
  clearGiveawayStatus,
} from "../store/giveaway.slice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";
import BulkSummary from "../components/BulkSummary";
import BulkForm from "../components/BulkForm";

export default function BulkCampaignsPage() {
  const dispatch = useDispatch();
  const {
    prizes,
    loading,
    bulkCampaignLoading,
    error,
    successMessage,
    bulkCampaignSummary,
  } = useSelector((s) => s.giveaway);

  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  // Handle auto-clear and summary visibility
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearGiveawayStatus());
        setShowSummary(false);
      }, 10000); // 10 seconds is usually enough for reading
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  useEffect(() => {
    if (bulkCampaignSummary) setShowSummary(true);
  }, [bulkCampaignSummary]);

  const handleBulkSubmit = (formData) => {
    dispatch(
      bulkCreateCampaign({
        ranges: [formData],
        isActive: true,
      })
    );
  };

  return (
    <div className="p-4 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg border-none">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-6 h-6 text-primary" />
            Bulk Create Campaigns
          </CardTitle>
          <CardDescription>
            Schedule multiple giveaway campaigns across a specific date range.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Feedback Messages */}
          {successMessage && (
            <div className="flex items-center gap-2 p-3 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg">
              <CheckCircle className="w-4 h-4" /> {successMessage}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm bg-red-50 border border-red-200 text-red-800 rounded-lg">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Creation Summary */}
          {showSummary && bulkCampaignSummary && (
            <BulkSummary summary={bulkCampaignSummary} />
          )}

          {/* Main Form Component */}
          <BulkForm
            prizes={prizes}
            onSubmit={handleBulkSubmit}
            isSubmitting={bulkCampaignLoading}
            isPrizesLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
