import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Trophy, Plus } from "lucide-react";
import { toast } from "sonner";
import { getPrizeColumns } from "@/components/columns/prizes.columns";
import PrizesDataTable from "@/components/shared/data-tables/prizes.data.table";
import { PrizeDialog } from "../components/Dialogs/PrizeDialog";
import {
  createPrize,
  deletePrize,
  fetchPrizes,
  updatePrize,
} from "../store/prizes.slice";
import { PreLoader } from "@/app/loader/preloader";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function PrizePage() {
  const dispatch = useDispatch();
  const {
    prizes,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.prize);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [prizeType, setPrizeType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "GIFT_CARD",
    value: "",
    planType: "",
    durationInDays: "",
    spinWheelLabel: "",
    description: "",
    supportiveItems: [],
  });
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    prizeId: null,
    title: "",
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchPrizes({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          type: prizeType,
        }),
      );
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    prizeType,
  ]);

  const resetForm = () => {
    setForm({
      title: "",
      type: "GIFT_CARD",
      value: "",
      planType: "",
      durationInDays: "",
      spinWheelLabel: "",
      description: "",
      supportiveItems: [],
    });
    setEditingId(null);
  };

  const handleEdit = (prize) => {
    setForm({
      title: prize.title || "",
      type: prize.type || "",
      value: prize.value ? prize.value.toString() : "",
      planType: prize.planType || "",
      durationInDays: prize.durationInDays ? prize.durationInDays.toString() : "",
      spinWheelLabel: prize.spinWheelLabel || "",
      description: prize.description || "",
      supportiveItems: Array.isArray(prize.supportiveItems) 
        ? prize.supportiveItems 
        : [],
    });
    setEditingId(prize._id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const payload = { ...form };
    const supportiveItems = Array.isArray(payload.supportiveItems)
      ? payload.supportiveItems.map((i) => i.trim()).filter((i) => i !== "")
      : [];

    let data = {
      title: payload.title,
      type: payload.type || "GIFT_CARD",
      spinWheelLabel: payload.spinWheelLabel,
      supportiveItems,
    };

    // if (payload.type === "FREE_PREMIUM") {
    //   data.planType = payload.planType;
    //   data.durationInDays = parseInt(payload.durationInDays, 10);
    // } else {
      data.value = parseFloat(payload.value);
    // }

    // New GIFT_CARD fields
    if (payload.description?.trim()) {
      data.description = payload.description.trim();
    }

    try {
      if (editingId) {
        const res = await dispatch(
          updatePrize({ id: editingId, data }),
        ).unwrap();
        toast.success(res.message || "Prize updated successfully");
      } else {
        const res = await dispatch(createPrize(data)).unwrap();
        toast.success(res.message || "Prize created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const columns = useMemo(
    () =>
      getPrizeColumns(handleEdit, (id, title) => {
        setConfirmConfig({
          isOpen: true,
          prizeId: id,
          title: title,
        });
      }),
    [prizes],
  );

  const handleConfirmDelete = async () => {
    try {
      const res = await dispatch(deletePrize(confirmConfig.prizeId)).unwrap();

      toast.success(res.message || "Prize deleted successfully");
      setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    } catch (err) {
      toast.error(err || "Failed to delete prize");
    }
  };
  
  return (
    <div className="relative p-4 space-y-6 min-h-[500px]">
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
          <PreLoader />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Trophy className="text-white h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prizes</h1>
            <p className="text-sm text-slate-500">Manage your giveaway pool</p>
          </div>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="bg-brand-aqua/20 hover:bg-brand-aqua/60 border border-brand-aqua text-slate-800 font-semibold gap-2 h-11 px-4 shadow-sm shadow-neutral-400"
        >
          <Plus className="h-4 w-4" /> Create New Prize
        </Button>
      </div>

      <div className="overflow-hidden">
        <PrizesDataTable
          columns={columns}
          data={prizes || []}
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
            prizeType,
            setPrizeType: (val) => {
              setPrizeType(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
        />
      </div>

      <PrizeDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        loading={loading}
        isEditing={!!editingId}
      />

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Delete Prize?"
        message={`Are you sure you want to delete "${confirmConfig.title}"? This will permanently remove it from the giveaway pool.`}
        confirmText="Delete Permanently"
        type="danger"
        loading={loading}
      />
    </div>
  );
}