// import React, { useMemo, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Package } from "lucide-react";
// import { toast } from "sonner";
// import PendingDeliveriesDataTables from "@/components/shared/data-tables/pending.deliveries.data.table";
// import {
//   fetchPendingDeliveries,
//   markAsDelivered,
// } from "../store/delivery.slice";
// import { getDeliveryColumns } from "@/components/columns/deliveries.columns";
// import { PreLoader } from "@/app/loader/preloader";
// import DeliveryEmailDialog from "../components/Dialogs/DeliveryEmailDialog";

// export default function PendingDeliveriesPage() {
//   const dispatch = useDispatch();

//   // Selectors
//   const {
//     deliveries,
//     pagination: reduxPagination,
//     loading,
//   } = useSelector((s) => s.delivery);

//   // States
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [deliveryStatus, setDeliveryStatus] = useState("");
//   const [deliveryLoading, setDeliveryLoading] = useState({});

//   // Email Dialog State
//   const [emailDialog, setEmailDialog] = useState({
//     isOpen: false,
//     delivery: null,
//   });

//   // 1. Fetch Data
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       dispatch(
//         fetchPendingDeliveries({
//           page: pagination.pageIndex + 1,
//           limit: pagination.pageSize,
//           search: globalFilter,
//           deliveryStatus,
//         })
//       );
//     }, 400);
//     return () => clearTimeout(delayDebounceFn);
//   }, [
//     dispatch,
//     pagination.pageIndex,
//     pagination.pageSize,
//     globalFilter,
//     deliveryStatus,
//   ]);

//   // 2. Open Email Dialog (instead of direct mark)
//   const handleMarkAsDelivered = (id) => {
//     const delivery = deliveries?.find((d) => d._id === id);
//     setEmailDialog({ isOpen: true, delivery: delivery || { _id: id } });
//   };

//   // 3. Submit delivery with email template
//   const handleEmailSubmit = async (formData) => {
//     const id = emailDialog.delivery?._id;
//     if (!id) return;

//     setDeliveryLoading((prev) => ({ ...prev, [id]: true }));
//     try {
//       const response = await dispatch(markAsDelivered({ id, ...formData })).unwrap();

//       // Check both response level and response.res level just in case
//       const emailSent = response.emailSent ?? response.res?.emailSent;
//       const message = response.message || response.res?.message;

//       // Only show warning if backend explicitly says emailSent is false
//       if (emailSent === false) {
//         toast.warning(
//           "✅ Prize marked as delivered, but email failed! Please notify user manually.",
//           { duration: 5000 }
//         );
//       } else {
//         toast.success(message || "Prize delivered & email sent successfully");
//       }

//       setEmailDialog({ isOpen: false, delivery: null });

//       // Refresh data
//       dispatch(
//         fetchPendingDeliveries({
//           page: pagination.pageIndex + 1,
//           limit: pagination.pageSize,
//           deliveryStatus,
//         })
//       );
//     } catch (err) {
//       toast.error(err?.message || err || "Failed to update status");
//     } finally {
//       setDeliveryLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   // 4. Columns Memo
//   const columns = useMemo(
//     () => getDeliveryColumns(handleMarkAsDelivered, deliveryLoading),
//     [deliveryLoading]
//   );

//   return (
//     <div className="relative p-4 space-y-6 min-h-[500px]">
//       {loading && (
//         <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
//           <PreLoader />
//         </div>
//       )}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <div className="bg-brand-aqua p-3 rounded-xl shadow-lg">
//             <Package className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">
//               Delivery Management
//             </h1>
//             <p className="text-sm text-slate-500">
//               Track and fulfill giveaway prize
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-hidden">
//         <PendingDeliveriesDataTables
//           columns={columns}
//           data={deliveries || []}
//           rowCount={reduxPagination?.total ?? 0}
//           isLoading={loading}
//           pagination={pagination}
//           onPaginationChange={setPagination}
//           globalFilter={globalFilter}
//           setGlobalFilter={(val) => {
//             setGlobalFilter(val);
//             setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//           }}
//           searchPlaceholder="Search user email, phone, prize title..."
//           filters={{
//             deliveryStatus,
//             setDeliveryStatus: (val) => {
//               setDeliveryStatus(val);
//               setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//             },
//           }}
//         />
//       </div>

//       {/* ─── Delivery Email Dialog ─── */}
//       <DeliveryEmailDialog
//         isOpen={emailDialog.isOpen}
//         onOpenChange={(open) => {
//           if (!open) setEmailDialog({ isOpen: false, delivery: null });
//         }}
//         onSubmit={handleEmailSubmit}
//         loading={deliveryLoading[emailDialog.delivery?._id] || false}
//         delivery={emailDialog.delivery}
//       />
//     </div>
//   );
// }

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
import { PreLoader } from "@/app/loader/preloader";
import DeliveryEmailDialog from "../components/Dialogs/DeliveryEmailDialog";

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

  // Email Dialog State
  const [emailDialog, setEmailDialog] = useState({
    isOpen: false,
    delivery: null,
  });

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

  // 2. Open Email Dialog (instead of direct mark)
  const handleMarkAsDelivered = (id) => {
    const delivery = deliveries?.find((d) => d._id === id);
    setEmailDialog({ isOpen: true, delivery: delivery || { _id: id } });
  };

  // 3. Submit delivery with email template
  const handleEmailSubmit = async (formData) => {
    const id = emailDialog.delivery?._id;
    if (!id) return;

    setDeliveryLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await dispatch(markAsDelivered({ id, ...formData })).unwrap();

      const emailSent = response.emailSent ?? response.res?.emailSent;
      const message = response.message || response.res?.message;

      if (emailSent === false) {
        toast.warning(
          "✅ Prize marked as delivered, but email failed! Please notify user manually.",
          { duration: 5000 }
        );
      } else {
        toast.success(message || "Prize delivered & email sent successfully");
      }

      setEmailDialog({ isOpen: false, delivery: null });

      dispatch(
        fetchPendingDeliveries({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          deliveryStatus,
        })
      );
    } catch (err) {
      toast.error(err?.message || err || "Failed to update status");
    } finally {
      setDeliveryLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // 4. Columns Memo
  const columns = useMemo(
    () => getDeliveryColumns(handleMarkAsDelivered, deliveryLoading),
    [deliveryLoading]
  );

  return (
    <div className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 min-h-[500px]">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
          <PreLoader />
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-aqua p-2.5 sm:p-3 rounded-xl shadow-lg shrink-0">
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Delivery Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Track and fulfill giveaway prize
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden">
        <PendingDeliveriesDataTables
          columns={columns}
          data={deliveries || []}
          rowCount={reduxPagination?.total ?? 0}
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

      {/* Delivery Email Dialog */}
      <DeliveryEmailDialog
        isOpen={emailDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) setEmailDialog({ isOpen: false, delivery: null });
        }}
        onSubmit={handleEmailSubmit}
        loading={deliveryLoading[emailDialog.delivery?._id] || false}
        delivery={emailDialog.delivery}
      />
    </div>
  );
}