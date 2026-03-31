import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { isSameWeek } from "date-fns";
import { getAllCampaignsApi } from "@/modules/giveaway/services/giveaway.api";

export default function GlobalCampaignAlert() {
  const alertToastIdRef = useRef(null);
  const timeoutRef = useRef(null);
  const [localCampaigns, setLocalCampaigns] = useState(null);
  const [loading, setLoading] = useState(true);

  // We listen to Redux ONLY as a trigger mechanism.
  // When a campaign is created or updated, Redux changes.
  const { campaigns } = useSelector((s) => s.campaign);
  console.log("campaign", campaigns)

  // 1. Independent Fetch Triggered by Redux Changes
  // Whenever Redux updates (e.g. you create a campaign), we ask the backend for the UNFILTERED truth.
  // This prevents stale/filtered Redux data from causing issues, while remaining real-time!
  useEffect(() => {
    let isMounted = true;

    const fetchLatestCampaign = async () => {
      try {
        setLoading(true);
        // Fetch the first page of campaigns (unfiltered) to see the absolute truth
        const response = await getAllCampaignsApi(1, 10, "", "");
        if (isMounted && response?.data) {
          setLocalCampaigns(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns for alert check", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLatestCampaign();

    return () => {
      isMounted = false;
    };
  }, [campaigns]); // <--- Syncs automatically when a campaign is created/modified in Redux

  // 2. Logic to check for running week campaign and show 3-sec delayed alert
  useEffect(() => {
    // Wait until local independent fetch finishes
    if (!loading && localCampaigns) {
      // Find if we have a campaign whose date is near today (Rolling 7-day window)
      // This bypasses strict calendar week boundaries which can break due to timezone shifts on Mondays/Sundays.
      const currentWeekCampaign = localCampaigns.find((c) => {
        if (!c.date) return false;
        
        const campaignDate = new Date(c.date).getTime();
        const today = new Date().getTime();
        const diffInDays = Math.abs(campaignDate - today) / (1000 * 60 * 60 * 24);
        
        // If the campaign's date is within 7 days (past or future), we consider it the running/current campaign
        return diffInDays <= 7;
      });

      if (!currentWeekCampaign) {
        // If missing, and we haven't already started a timer or shown the toast:
        if (!alertToastIdRef.current && !timeoutRef.current) {

          // Trigger a 3-second delay timer
          timeoutRef.current = setTimeout(() => {
            alertToastIdRef.current = toast.warning(
              "No Giveaway Campaign found for the current running week. Please create one.",
              {
                position: "bottom-right",
                duration: Infinity, // Persistent
                closeButton: true,
                classNames: {
                  closeButton: "!left-auto !right-[-8px] !top-[6px]",
                },
                onDismiss: () => {
                  alertToastIdRef.current = null;
                },
              }
            );
            // Clear timer reference after it fires
            timeoutRef.current = null;
          }, 3000); // 3 seconds delay
        }
      } else {
        // If a campaign IS found (e.g. including COMPLETED ones), cleanup everything!

        // 1. Clear any pending 3-sec timer if it hasn't fired yet
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        // 2. Dismiss the alert if it's already on the screen
        if (alertToastIdRef.current) {
          toast.dismiss(alertToastIdRef.current);
          alertToastIdRef.current = null;
        }
      }
    }

    // Cleanup function: if the component unmounts, stop the timer from firing
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [localCampaigns, loading]);

  // This is a "headless" wrapper component; it doesn't render any HTML/UI itself
  return null;
}
