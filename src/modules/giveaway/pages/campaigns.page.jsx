import CampaignsDataTables from "@/components/shared/data-tables/campaigns.data.table";
import { Button } from "@/components/ui/button";
import { Megaphone, Plus } from "lucide-react";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  createCampaign,
  deleteCampaign,
  disableCampaign,
  activateCampaign,
  fetchCampaigns,
  updateCampaign,
} from "../store/campaign.slice";
import {
  bulkCreateCampaign,
  clearGiveawayStatus,
} from "../store/giveaway.slice";
import { campaignColumns } from "@/components/columns/campaignColumns";
import CampaignDialog from "../components/Dialogs/CampaignDialog";
import { fetchPrizes } from "../store/prizes.slice";
import { PreLoader } from "@/app/loader/preloader";
import ConfirmModal from "@/components/common/ConfirmModal";
import { toast } from "sonner";
import { format, isValid, parseISO, isSameWeek } from "date-fns";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const { prizes } = useSelector((s) => s.prize);
  const {
    campaigns,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.campaign);
  const { bulkCampaignLoading } = useSelector((s) => s.giveaway);

  // Table & Filter States
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [drawStatus, setDrawStatus] = useState(""); // Match your API drawStatus

  // Form & Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    prizeId: "",
  });

  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    id: null,
    title: "",
  });

  // 1. Fetch Prizes once on mount
  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchCampaigns({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          drawStatus,
        }),
      );
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    drawStatus,
  ]);

  // --- The logic below is now handled globally by GlobalCampaignAlert in AdminLayout.jsx ---
  // // Alert if running week's campaign is missing
  // const alertToastIdRef = useRef(null);

  // useEffect(() => {
  //   // We only want to evaluate this after campaigns have loaded and there are no active filters
  //   if (!loading && campaigns && globalFilter === "" && drawStatus === "") {
  //     const currentWeekCampaign = campaigns.find((c) => {
  //       if (!c.date) return false;
  //       // Check if the campaign's date is in the current week (assuming week starts on Monday)
  //       return isSameWeek(new Date(c.date), new Date(), { weekStartsOn: 1 });
  //     });

  //     if (!currentWeekCampaign) {
  //       // Show the alert only if it's not already showing
  //       if (!alertToastIdRef.current) {
  //         alertToastIdRef.current = toast.warning(
  //           "No Giveaway Campaign found for the current running week. Please create one.",
  //           {
  //             position: "bottom-right",
  //             // duration: 120000, // (120,000ms = 2 mins)
  //             duration: Infinity, // Persists until admin manually closes it or campaign is created
  //             closeButton: true,
  //             classNames: {
  //               closeButton: "!left-auto !right-2 !top-2",
  //             },
  //             onDismiss: () => {
  //               alertToastIdRef.current = null;
  //             },
  //           }
  //         );
  //       }
  //     } else {
  //       // If a campaign IS found (e.g., admin just created one), dismiss the alert automatically
  //       if (alertToastIdRef.current) {
  //         toast.dismiss(alertToastIdRef.current);
  //         alertToastIdRef.current = null;
  //       }
  //     }
  //   }
  // }, [campaigns, loading, globalFilter, drawStatus]);

  const resetForm = () => {
    setForm({ title: "", date: "", prizeId: "" });
    setEditingId(null);
  };

  // ─── Bulk Create Handler ───
  const handleBulkSubmit = async (formData) => {
    try {
      const result = await dispatch(
        bulkCreateCampaign({
          // [FIX] formData was being spread flat — backend expects a `ranges` array
          // Old: ...formData (sent { title, startDate, endDate, prizeId } flat)
          // New: wrapped in ranges array to match bulkCreateCampaignByRanges controller
          title: formData.title,
          ranges: [{
            startDate: formData.startDate,
            endDate: formData.endDate,
            prizeId: formData.prizeId,
            supportiveItems: formData.supportiveItems || [],
          }],
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
        toast.success(`Successfully generated weekly campaigns. (${created} created, ${skipped} non-Fridays/duplicates ignored)`, {
          description: skippedInfo,
          duration: 8000,
        });
      } else {
        toast.error(`No campaigns created. Ensure selected range includes Fridays.`, {
          description: skippedInfo,
          duration: 8000,
        });
      }

      setIsDialogOpen(false);
      // Refresh campaigns list
      dispatch(
        fetchCampaigns({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          drawStatus,
        })
      );
    } catch (err) {
      toast.error(err || "Bulk campaign creation failed");
    } finally {
      dispatch(clearGiveawayStatus());
    }
  };

  const handleEdit = (campaign) => {
    let dateStr = "";
    if (campaign.date) {
      // Parse the date and format as YYYY-MM-DD for the input
      // Use T12:00:00 to avoid timezone rollback to previous day
      const d = new Date(campaign.date + (campaign.date.includes("T") ? "" : "T12:00:00"));
      dateStr = d.toISOString().split("T")[0];
    }
    setForm({
      title: campaign.title || "",
      date: dateStr,
      prizeId: campaign.prize?._id || campaign.prizeId,
    });
    setEditingId(campaign._id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    // Append T12:00:00 to date to prevent timezone rollback
    // e.g., "2026-03-25" → "2026-03-25T12:00:00" (noon local avoids day shift)
    const payload = {
      ...form,
      date: form.date ? `${form.date}T12:00:00` : form.date,
    };

    try {
      if (editingId) {
        const res = await dispatch(
          updateCampaign({ id: editingId, data: payload }),
        ).unwrap();
        toast.success(res.message || "Campaign updated successfully");
      } else {
        const res = await dispatch(createCampaign(payload)).unwrap();
        toast.success(res.message || "Campaign created successfully");
      }
      setIsDialogOpen(false);
      resetForm();

      // Ensure the table automatically refreshes to get fully populated relations (e.g. Prize objects, exact dates)
      dispatch(
        fetchCampaigns({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          drawStatus,
        })
      );
    } catch (err) {
      toast.error(err);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteClick = (id, date) => {
    if (!id) {
      toast.error("Cannot delete: campaign ID is missing");
      return;
    }

    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);

    const displayDate = isValid(dateObj)
      ? format(dateObj, "MMM dd, yyyy")
      : "Unknown Date";

    setConfirmDelete({
      isOpen: true,
      id,
      title: displayDate,
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete?.id) {
      toast.error("Invalid campaign ID");
      setConfirmDelete({ isOpen: false, id: null, title: "" });
      return;
    }
    try {
      await dispatch(deleteCampaign(confirmDelete.id)).unwrap();
      toast.success("Campaign deleted successfully");
      // Re-fetch campaigns to sync UI with backend
      dispatch(
        fetchCampaigns({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          drawStatus,
        }),
      );
    } catch (err) {
      toast.error(err || "Failed to delete campaign");
    } finally {
      setConfirmDelete({ isOpen: false, id: null, title: "" });
    }
  };

  // Disable Handler
  const handleDisableClick = async (id) => {
    try {
      await dispatch(disableCampaign(id)).unwrap();
      toast.success("Campaign disabled successfully");
      dispatch(
        fetchCampaigns({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          drawStatus,
        }),
      );
    } catch (err) {
      toast.error(err || "Failed to disable campaign");
    }
  };

  // Activate Handler
  const handleActivateClick = async (id) => {
    try {
      await dispatch(activateCampaign(id)).unwrap();
      toast.success("Campaign activated successfully");
      dispatch(
        fetchCampaigns({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          drawStatus,
        }),
      );
    } catch (err) {
      toast.error(err || "Failed to activate campaign");
    }
  };

  // View Handler — navigate to detail page
  const handleView = (campaign) => {
    const id = campaign._id || campaign.id;
    if (id) {
      navigate(`view-campaign/${id}`);
    } else {
      toast.error("Invalid campaign ID");
    }
  };

  const columns = useMemo(
    () =>
      campaignColumns(
        handleEdit,
        handleDeleteClick,
        handleDisableClick,
        handleActivateClick,
        handleView,
        pagination.pageIndex + 1,
        pagination.pageSize
      ),
    [
      handleEdit,
      handleDeleteClick,
      handleDisableClick,
      handleActivateClick,
      handleView,
      pagination.pageIndex,
      pagination.pageSize,
    ]
  );

  return (
    <div className="relative w-full p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 min-h-[500px] max-w-[100vw] overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl md:rounded-3xl">
          <PreLoader />
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-brand-aqua p-2.5 sm:p-3 rounded-xl shadow-lg flex-shrink-0">
            <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
              Campaigns
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Manage your giveaway campaigns
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="w-full sm:w-auto bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 font-semibold gap-2 h-10 sm:h-11 px-4 shadow-sm shadow-neutral-400 flex-shrink-0"
        >
          <Plus className="h-4 w-4" /> Create New Campaign
        </Button>
      </div>

      <div className="overflow-hidden">
        <CampaignsDataTables
          columns={columns}
          data={campaigns || []}
          rowCount={reduxPagination?.total ?? 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search by title..."
          filters={{
            drawStatus,
            setDrawStatus: (val) => {
              setDrawStatus(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
        />
      </div>

      {/* Dialogs */}
      <CampaignDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}
        form={form}
        setForm={setForm}
        prizes={prizes}
        onSubmit={handleSubmit}
        loading={loading}
        isEditing={!!editingId}
        onBulkSubmit={handleBulkSubmit}
        bulkLoading={bulkCampaignLoading}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title="Delete Campaign"
        message={`Are you sure you want to delete the campaign for ${confirmDelete.title}?`}
        confirmText="Delete Permanently"
        type="danger" // This usually makes the button red in a reusable ConfirmModal
        loading={loading}
      />
    </div>
  );
}