import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { IconDownload, IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { userColumns } from "@/components/common/userColumns";
import { DataTable } from "@/components/common/data-table";
import {
  bannedUserProfile,
  exportUsersStream,
  fetchUsers,
} from "@/modules/users/store/user.slice";
import { BanUserModal } from "../components/ban-user-modal";

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    pagination: reduxPagination,
    exportLoading,
    exportProgress,
  } = useSelector((state) => state.users);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState(null);

  // 1. New Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [accountStatus, setAccountStatus] = useState(""); // Default selected
  const [isPremium, setIsPremium] = useState(undefined); // undefined means 'All'

  const handleExport = async () => {
    const filters = { search: globalFilter };

    const resultAction = await dispatch(exportUsersStream(filters));

    if (exportUsersStream.fulfilled.match(resultAction)) {
      const csvContent = resultAction.payload;

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `MAFS_Export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Users exported successfully!");
    } else {
      toast.error(resultAction.payload || "Export failed");
    }
  };

  // 2. Fetch data whenever any filter changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchUsers({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          accountStatus: accountStatus, // Added to API call
          isPremium: isPremium, // Added to API call
        })
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [
    dispatch,
    pagination.pageIndex,
    pagination.pageSize,
    globalFilter,
    accountStatus,
    isPremium,
  ]);

  // console.log("items: ", items);

  const handleBanClick = (user) => {
    setSelectedUserForBan(user);
    setIsBanModalOpen(true);
  };

  const handleBanConfirm = async (category, reason) => {
    try {
      await dispatch(
        bannedUserProfile({
          userId: selectedUserForBan._id,
          category,
          reason,
        })
      ).unwrap();

      toast.success("User banned successfully");
      setIsBanModalOpen(false);
    } catch (error) {
      toast.error(error || "Failed to ban user");
    }
  };

  return (
    <div className="p-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FDFF] min-h-screen relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-[#606060] font-medium">
            Manage community members.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            // variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={exportLoading} // Use Redux state
          >
            {exportLoading ? (
              <>
                <IconLoader className="mr-2 h-4 w-4 animate-spin" />{" "}
                Exporting...
              </>
            ) : (
              <>
                <IconDownload className="mr-2 h-4 w-4" /> Export
              </>
            )}
          </Button>
          {/* <Button size="sm">Add New User</Button> */}
        </div>
      </div>

      {/* <DataTable
        columns={userColumns}
        data={items}
        rowCount={reduxPagination.total} // Total count from DB
        pagination={pagination}
        onPaginationChange={setPagination} // Set local state on click
        globalFilter={globalFilter}
        setGlobalFilter={(val) => {
          setGlobalFilter(val);
          setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to page 1 on search
        }}
        isLoading={loading}
        meta={{
          onBan: (user) => handleBanClick(user),
        }}
      /> */}

      <DataTable
        columns={userColumns}
        data={items}
        rowCount={reduxPagination.total}
        pagination={pagination}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={(val) => {
          setGlobalFilter(val);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        // 3. Pass Filter States to DataTable
        filters={{
          accountStatus,
          setAccountStatus: (val) => {
            setAccountStatus(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          },
          isPremium,
          setIsPremium: (val) => {
            setIsPremium(val);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          },
        }}
        isLoading={loading}
        meta={{ onBan: (user) => handleBanClick(user) }}
      />

      {/* --- FLOATING PROGRESS BAR (Controlled by Redux) --- */}
      {exportLoading && (
        <div className="fixed bottom-6 right-6 w-80 bg-white p-5 rounded-xl shadow-2xl border border-blue-100 z-[9999] animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700">
              Downloading Report...
            </span>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {exportProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* ADD THE MODAL HERE */}
      <BanUserModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        onConfirm={handleBanConfirm}
        userName={selectedUserForBan?.profile?.nickname || "this user"}
      />
    </div>
  );
}
