import TransactionDataTables from "@/components/shared/data-tables/transactions.data.table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionColumns } from "@/components/columns/all.transaction.columns";
import { fetchAllTransactions } from "@/modules/subsciptions/store/subscription.slice";
import { motion } from "framer-motion";

export default function TransactionTable({ data }) {
  const dispatch = useDispatch();

  const {
    allTransactions,
    loading,
    pagination: reduxPagination,
  } = useSelector((state) => state.subscription);

  // Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    plan: "",
    platform: "",
  });

  // Debounced API Call
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchAllTransactions({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          ...filters,
        }),
      );
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, pagination, filters]);

  // Helper to update filters and reset to page 1
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="flex flex-1 flex-col pb-8">
      <motion.div
        className="w-full mx-auto px-4 lg:px-5 py-4 space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* --- TABLE SECTION --- */}
        <TransactionDataTables
          columns={transactionColumns}
          data={allTransactions || []}
          rowCount={reduxPagination?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          // Filter Props
          globalFilter={filters.search}
          setGlobalFilter={(val) => handleFilterChange("search", val)}
          filters={{
            status: filters.status,
            setStatus: (val) => handleFilterChange("status", val),
            plan: filters.plan,
            setPlan: (val) => handleFilterChange("plan", val),
            platform: filters.platform,
            setPlatform: (val) => handleFilterChange("platform", val),
          }}
          isLoading={loading}
        />
      </motion.div>
    </div>
  );
}
