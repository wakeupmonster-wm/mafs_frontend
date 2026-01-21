import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { IconDownload, IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { userColumns } from "@/components/common/userColumns";
import { DataTable } from "@/components/common/data-table";
import {
  exportUsersStream,
  fetchUsers,
} from "@/modules/users/store/user.slice";

// export default function UserManagementPage() {
//   const dispatch = useDispatch();

//   // Pulling state from Redux
//   const { items, loading, pagination } = useSelector((state) => state.users);
//   const { exportLoading, exportProgress } = useSelector((state) => state.users);

//   // Local state for search
//   const [globalFilter, setGlobalFilter] = useState("");

//   const [progress, setProgress] = useState(0);
//   const [exporting, setExporting] = useState(false);

//   // 1. Fetch Users with debounce logic
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       dispatch(
//         fetchUsers({
//           page: pagination.page,
//           limit: pagination.limit,
//           search: globalFilter,
//         })
//       );
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [dispatch, pagination.page, globalFilter]);

//   // 2. Handle Export logic

//   // const handleExport = async () => {
//   //   setExporting(true);
//   //   setTimeout(() => {
//   //     setProgress(0);
//   //   }, 2000);

//   //   try {
//   //     const token = localStorage.getItem("access_Token");
//   //     const response = await fetch(
//   //       `${BASE_URL}/api/v1/admin/user-management/export/stream`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );

//   //     if (!response.ok) throw new Error("Network response was not ok");

//   //     const reader = response.body.getReader();
//   //     const decoder = new TextDecoder();
//   //     let csvData = "";

//   //     while (true) {
//   //       const { done, value } = await reader.read();
//   //       if (done) break;

//   //       const chunk = decoder.decode(value, { stream: true });

//   //       // 1. Look for ALL markers in the chunk (using 'g' flag for global)
//   //       const progressRegex = /---PROG:(\d+)---/g;
//   //       let match;
//   //       while ((match = progressRegex.exec(chunk)) !== null) {
//   //         setProgress(Number(match[1]));
//   //       }

//   //       // 2. Clean the data immediately
//   //       const cleanChunk = chunk.replace(/---PROG:\d+---/g, "");
//   //       csvData += cleanChunk;
//   //     }

//   //     // 3. Create and Trigger Download
//   //     const blob = new Blob([csvData], { type: "text/csv" });
//   //     const url = window.URL.createObjectURL(blob);
//   //     const a = document.createElement("a");
//   //     a.href = url;
//   //     a.download = `MAFS_Users_${new Date().getTime()}.csv`;
//   //     document.body.appendChild(a);
//   //     a.click();
//   //     document.body.removeChild(a);
//   //     window.URL.revokeObjectURL(url);

//   //     toast.success("Export finished successfully");
//   //   } catch (error) {
//   //     console.error("Export Error:", error);
//   //     toast.error("Failed to stream export data");
//   //   } finally {
//   //     setExporting(false);
//   //   }
//   // };

//   const handleExport = async () => {
//     const resultAction = await dispatch(exportUsersStream());

//     if (exportUsersStream.fulfilled.match(resultAction)) {
//       const csvData = resultAction.payload;

//       // Create Blob and Trigger Download
//       const blob = new Blob([csvData], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `MAFS_Users_${Date.now()}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);

//       toast.success("Export downloaded successfully");
//     } else {
//       toast.error(resultAction.payload || "Export failed");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FDFF] min-h-screen relative">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
//           <p className="text-[#606060] font-medium">
//             Manage your community members.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleExport}
//             disabled={exporting}
//           >
//             {exporting ? (
//               <>
//                 <IconLoader className="mr-2 h-4 w-4 animate-spin" />{" "}
//                 Exporting...
//               </>
//             ) : (
//               <>
//                 <IconDownload className="mr-2 h-4 w-4" /> Export
//               </>
//             )}
//           </Button>
//           <Button size="sm">Add New User</Button>
//         </div>
//       </div>

//       {/* Data Table */}
//       <DataTable
//         columns={userColumns}
//         data={items}
//         globalFilter={globalFilter}
//         setGlobalFilter={setGlobalFilter}
//         searchPlaceholder="Search..."
//         isLoading={loading}
//       />

//       {/* --- FLOATING PROGRESS BAR --- */}
//       {exporting && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white p-5 rounded-xl shadow-2xl border border-blue-100 z-[9999] animate-in fade-in slide-in-from-bottom-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-bold text-slate-700">
//               Downloading Report...
//             </span>
//             <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
//               {progress}%
//             </span>
//           </div>
//           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    pagination: reduxPagination,
    exportLoading,
    exportProgress,
  } = useSelector((state) => state.users);

  // 6️⃣ Local state to track table's pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Zero-based for TanStack
    pageSize: 20,
  });

  const [globalFilter, setGlobalFilter] = useState("");

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

  // // 1. Fetch Users with debounce logic
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(
  //       fetchUsers({
  //         page: pagination.page,
  //         limit: pagination.limit,
  //         search: globalFilter,
  //       })
  //     );
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [dispatch, pagination.page, globalFilter]);

  // 7️⃣ Fetch data whenever page, limit, or search changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchUsers({
          page: pagination.pageIndex + 1, // API is 1-based
          limit: pagination.pageSize,
          search: globalFilter,
        })
      );
    }, 500); // Debounce search calls

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, pagination.pageIndex, pagination.pageSize, globalFilter]);

  console.log("items: ", items);

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
            variant="outline"
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
          <Button size="sm">Add New User</Button>
        </div>
      </div>
      {/* 
      <DataTable
        columns={userColumns}
        data={items}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        searchPlaceholder="Search..."
        isLoading={loading}
      /> */}

      <DataTable
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
    </div>
  );
}
