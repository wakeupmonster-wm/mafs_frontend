import { Button } from "@/components/ui/button";
import { IconDownload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userColumns } from "@/components/common/userColumns";
import { DataTable } from "@/components/common/data-table";
import { fetchUsers } from "@/modules/users/store/user.slice";

export default function BusinessPage() {
  const dispatch = useDispatch();
  const { items, loading, pagination } = useSelector((state) => state.users);
  // 1. Pull pagination and filters from state
  const [globalFilter, setGlobalFilter] = useState("");

  // // 2. Call fetchUsers on component mount and whenever page/limit changes
  // Simple debounce logic inside useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchUsers({
          page: pagination.page,
          limit: pagination.limit,
          search: globalFilter,
        })
      );
    }, 500); // Wait 500ms after last keystroke

    return () => clearTimeout(timer); // Cleanup timer if user types again
  }, [dispatch, pagination.page, globalFilter]);

  return (
    <div className="p-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FDFF] min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-[#606060] font-medium">
            Manage your MAFS community members.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <IconDownload className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm">Add New User</Button>
        </div>
      </div>

      <DataTable
        columns={userColumns}
        data={items}
        searchPlaceholder="Search name, email, status or city..."
      />
    </div>
  );
}
