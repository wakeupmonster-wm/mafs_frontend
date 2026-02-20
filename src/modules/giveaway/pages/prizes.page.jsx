import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Plus, Search } from "lucide-react";
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
import ConfirmModal from "@/components/common/ConfirmModal";

export default function PrizePage() {
  const dispatch = useDispatch();
  const {
    prizes,
    pagination: reduxPagination,
    loading,
    error,
  } = useSelector((s) => s.prize);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [prizeType, setPrizeType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "",
    value: "",
    spinWheelLabel: "",
    supportiveItems: "",
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
        })
      );
    }, 500);
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
      type: "",
      value: "",
      spinWheelLabel: "",
      supportiveItems: "",
    });
    setEditingId(null);
  };

  const handleEdit = (prize) => {
    console.log("prize edit: ", prize);
    setForm({
      title: prize.title || "",
      type: prize.type || "",
      value: prize.value ? prize.value.toString() : "",
      spinWheelLabel: prize.spinWheelLabel || "",
      // ✅ Add Optional Chaining and a fallback empty string
      supportiveItems: prize.supportiveItems
        ? prize.supportiveItems.join(", ")
        : "",
    });
    setEditingId(prize._id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    // 1. Prepare the data payload
    const data = {
      ...form,
      value: parseFloat(form.value),
      supportiveItems: form.supportiveItems
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== ""),
    };

    try {
      if (editingId) {
        const res = await dispatch(
          updatePrize({ id: editingId, data })
        ).unwrap();
        toast.success(res.message || "Prize updated successfully");
      } else {
        const res = await dispatch(createPrize(data)).unwrap();
        toast.success(res.message || "Prize created successfully");
      }

      // 4. Success Actions: Close modal and reset
      setIsDialogOpen(false);
      resetForm();
      console.log("editingId: ", editingId);
      console.log("data: ", data);
    } catch (err) {
      // Error is already caught by your Redux extraReducers and shown via toast
      console.error("Submission failed:", err);
    }
  };

  const columns = useMemo(
    () =>
      getPrizeColumns(handleEdit, (id, title) => {
        // Instead of window.confirm, we open our custom modal
        setConfirmConfig({
          isOpen: true,
          prizeId: id,
          title: title,
        });
      }),
    [prizes]
  );

  // Handle the actual deletion after confirmation
  const handleConfirmDelete = async () => {
    try {
      const res = await dispatch(deletePrize(confirmConfig.prizeId)).unwrap();
      // console.log("confirmConfig: ", confirmConfig);

      toast.success(res.message || "Prize deleted successfully");
      setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    } catch (err) {
      toast.error(err || "Failed to delete prize");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Trophy className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Prizes</h1>
            <p className="text-sm text-gray-500">Manage your giveaway pool</p>
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
              setPrizeType(val),
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

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Delete Prize?"
        message={`Are you sure you want to delete "${confirmConfig.title}"? This will permanently remove it from the giveaway pool.`}
        confirmText="Delete Permanently"
        type="danger" // This usually makes the button red in a reusable ConfirmModal
        loading={loading}
      />
    </div>
  );
}
