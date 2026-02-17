import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package } from "lucide-react";
import { toast } from "sonner";
import PendingDeliveriesDataTables from "@/components/shared/data-tables/pending.deliveries.data.table";
import {
  fetchPendingDeliveries,
  markAsDelivered,
} from "../store/delivery.slice";
import { getDeliveryColumns } from "@/components/columns/deliveries.columns";

export default function PendingDeliveriesPage() {
  const dispatch = useDispatch();

  // Selectors
  const {
    deliveries,
    pagination: reduxPagination,
    loading,
  } = useSelector((s) => s.delivery);

  // States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [deliveryLoading, setDeliveryLoading] = useState({});

  // 1. Fetch Data
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchPendingDeliveries({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          deliveryStatus,
        })
      );
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    deliveryStatus,
  ]);

  // 2. Mark as Delivered Handler
  const handleMarkAsDelivered = async (id) => {
    setDeliveryLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(markAsDelivered(id)).unwrap();
      toast.success("Prize marked as delivered successfully");
      // Refresh data
      dispatch(
        fetchPendingDeliveries({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          deliveryStatus,
        })
      );
    } catch (err) {
      toast.error(err?.message || "Failed to update status");
    } finally {
      setDeliveryLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // 3. Columns Memo
  const columns = useMemo(
    () => getDeliveryColumns(handleMarkAsDelivered, deliveryLoading),
    [deliveryLoading]
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Delivery Management
            </h1>
            <p className="text-sm text-slate-500">
              Track and fulfill giveaway prizes
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <PendingDeliveriesDataTables
          columns={columns}
          data={deliveries || []}
          rowCount={reduxPagination?.total || 0}
          isLoading={loading}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          setGlobalFilter={(val) => {
            setGlobalFilter(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
          searchPlaceholder="Search user email, phone, prize title..."
          filters={{
            deliveryStatus,
            setDeliveryStatus: (val) => {
              setDeliveryStatus(val);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
          }}
        />
      </div>
    </div>
  );
}
