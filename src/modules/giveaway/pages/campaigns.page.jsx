import CampaignsDataTables from "@/components/shared/data-tables/campaigns.data.table";
import { Button } from "@/components/ui/button";
import { Megaphone, Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  deleteCampaign,
  disableCampaign,
  fetchCampaigns,
  updateCampaign,
} from "../store/campaign.slice";
import { campaignColumns } from "@/components/columns/campaignColumns";
import CampaignDialog from "../components/Dialogs/CampaignDialog";
import { fetchPrizes } from "../store/prizes.slice";
import ConfirmModal from "@/components/common/ConfirmModal";
import { toast } from "sonner";
import { format, isValid, parseISO } from "date-fns";

export default function CampaignsPage() {
  const dispatch = useDispatch();

  // Selectors
  const { prizes } = useSelector((s) => s.prize);
  const {
    campaigns,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.campaign);

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
        })
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    drawStatus,
  ]);

  const resetForm = () => {
    setForm({ date: "", prizeId: "" });
    setEditingId(null);
  };

  const handleEdit = (campaign) => {
    console.log("campaign edit: ", campaign);
    setForm({
      date: campaign.date
        ? new Date(campaign.date).toISOString().split("T")[0]
        : "",
      prizeId: campaign.prize?._id || campaign.prizeId, // Handle both populated and ID
    });
    setEditingId(campaign._id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        const res = await dispatch(
          updateCampaign({ id: editingId, data: form })
        ).unwrap();
        toast.success(res.message || "Campaign updated successfully");
      } else {
        const res = await dispatch(createCampaign(form)).unwrap();
        toast.success(res.message || "Campaign created successfully");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      // console.error("Submission failed:", err);
      toast.error(err);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteClick = (id, date) => {
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
    try {
      console.log("confirmDelete.id: ", confirmDelete?.id);
      const res = await dispatch(deleteCampaign(confirmDelete?.id)).unwrap();
      setConfirmDelete({ isOpen: false, id: null, title: "" });

      toast.success(res.message || "Campaign deleted successfully");
      // toast.success("Campaign deleted successfully");
    } catch (err) {
      console.error("error: ", err);
      toast.error(err || "Failed to delete campaign");
    }
  };

  // 2. Define the Disable Handler
  const handleDisableClick = async (id) => {
    try {
      const res = await dispatch(disableCampaign(id)).unwrap();
      toast.success(res.message || "Campaign disabled successfully");
    } catch (err) {
      console.error("error: ", err);
      toast.error(err || "Failed to disable campaign");
    }
  };

  // 3. Update useMemo to include the new handler
  const columns = useMemo(
    () => campaignColumns(handleEdit, handleDeleteClick, handleDisableClick),

    [handleEdit, handleDeleteClick, handleDisableClick] // handleDisableClick is stable if not using useCallback, but handleEdit is in deps
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Campaigns</h1>
            <p className="text-sm text-gray-500">
              Manage your giveaway campaigns
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 font-semibold gap-2 h-11 px-4 shadow-sm shadow-neutral-400"
        >
          <Plus className="h-4 w-4" /> Create New Campaign
        </Button>
      </div>

      <div className="overflow-hidden">
        <CampaignsDataTables
          columns={columns}
          data={campaigns || []}
          rowCount={reduxPagination?.total || 0}
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
        onClose={() => {
          setIsDialogOpen(false);
          resetForm();
        }}
        form={form}
        setForm={setForm}
        prizes={prizes}
        submit={handleSubmit}
        loading={loading}
        editMode={!!editingId}
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
