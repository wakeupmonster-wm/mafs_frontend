import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  IconAlertTriangle,
  IconBan,
  IconCrown,
  IconDownload,
  IconLoader,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { userColumns } from "@/components/common/userColumns";
import { DataTable } from "@/components/common/data-table";
import {
  bannedUserProfile,
  exportUsersStream,
  fetchUsers,
} from "@/modules/users/store/user.slice";
import { BanUserModal } from "../components/ban-user-modal";
import { cn } from "@/lib/utils";

// export default function UserManagementPage() {
//   const dispatch = useDispatch();
//   const {
//     items,
//     loading,
//     pagination: reduxPagination,
//     exportLoading,
//     exportProgress,
//   } = useSelector((state) => state.users);
//   const [isBanModalOpen, setIsBanModalOpen] = useState(false);
//   const [selectedUserForBan, setSelectedUserForBan] = useState(null);

//   // 1. New Filter States
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [accountStatus, setAccountStatus] = useState(""); // Default selected
//   const [isPremium, setIsPremium] = useState(undefined); // undefined means 'All'

//   const handleExport = async () => {
//     const filters = { search: globalFilter };

//     const resultAction = await dispatch(exportUsersStream(filters));

//     if (exportUsersStream.fulfilled.match(resultAction)) {
//       const csvContent = resultAction.payload;

//       // Create download link
//       const blob = new Blob([csvContent], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.setAttribute("download", `MAFS_Export_${Date.now()}.csv`);
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Users exported successfully!");
//     } else {
//       toast.error(resultAction.payload || "Export failed");
//     }
//   };

//   // 2. Fetch data whenever any filter changes
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       dispatch(
//         fetchUsers({
//           page: pagination.pageIndex + 1,
//           limit: pagination.pageSize,
//           search: globalFilter,
//           accountStatus: accountStatus, // Added to API call
//           isPremium: isPremium, // Added to API call
//         })
//       );
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [
//     dispatch,
//     pagination.pageIndex,
//     pagination.pageSize,
//     globalFilter,
//     accountStatus,
//     isPremium,
//   ]);

//   // console.log("items: ", items);

//   const handleBanClick = (user) => {
//     setSelectedUserForBan(user);
//     setIsBanModalOpen(true);
//   };

//   const handleBanConfirm = async (category, reason) => {
//     try {
//       await dispatch(
//         bannedUserProfile({
//           userId: selectedUserForBan._id,
//           category,
//           reason,
//         })
//       ).unwrap();

//       toast.success("User banned successfully");
//       setIsBanModalOpen(false);
//     } catch (error) {
//       toast.error(error || "Failed to ban user");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FDFF] min-h-screen relative">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
//           <p className="text-[#606060] font-medium">
//             Manage community members.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <Button
//             // variant="outline"
//             size="sm"
//             onClick={handleExport}
//             disabled={exportLoading} // Use Redux state
//           >
//             {exportLoading ? (
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
//           {/* <Button size="sm">Add New User</Button> */}
//         </div>
//       </div>

//       <DataTable
//         columns={userColumns}
//         data={items}
//         rowCount={reduxPagination.total}
//         pagination={pagination}
//         onPaginationChange={setPagination}
//         globalFilter={globalFilter}
//         setGlobalFilter={(val) => {
//           setGlobalFilter(val);
//           setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//         }}
//         // 3. Pass Filter States to DataTable
//         filters={{
//           accountStatus,
//           setAccountStatus: (val) => {
//             setAccountStatus(val);
//             setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//           },
//           isPremium,
//           setIsPremium: (val) => {
//             setIsPremium(val);
//             setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//           },
//         }}
//         isLoading={loading}
//         meta={{ onBan: (user) => handleBanClick(user) }}
//       />

//       {/* --- FLOATING PROGRESS BAR (Controlled by Redux) --- */}
//       {exportLoading && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white p-5 rounded-xl shadow-2xl border border-blue-100 z-[9999] animate-in fade-in slide-in-from-bottom-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-bold text-slate-700">
//               Downloading Report...
//             </span>
//             <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
//               {exportProgress}%
//             </span>
//           </div>
//           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${exportProgress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* ADD THE MODAL HERE */}
//       <BanUserModal
//         isOpen={isBanModalOpen}
//         onClose={() => setIsBanModalOpen(false)}
//         onConfirm={handleBanConfirm}
//         userName={selectedUserForBan?.profile?.nickname || "this user"}
//       />
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

  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState(null);

  // Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [isPremium, setIsPremium] = useState(undefined);

  const handleExport = async () => {
    const filters = { search: globalFilter };
    const resultAction = await dispatch(exportUsersStream(filters));

    if (exportUsersStream.fulfilled.match(resultAction)) {
      const csvContent = resultAction.payload;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `MAFS_Users_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Export completed successfully");
    } else {
      toast.error(resultAction.payload || "Export failed");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchUsers({
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          accountStatus: accountStatus,
          isPremium: isPremium,
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

  const handleBanClick = (user) => {
    setSelectedUserForBan(user);
    setIsBanModalOpen(true);
  };

  const handleBanConfirm = async (category, reason) => {
    try {
      await dispatch(
        bannedUserProfile({ userId: selectedUserForBan._id, category, reason })
      ).unwrap();
      toast.success("User has been restricted");
      setIsBanModalOpen(false);
    } catch (error) {
      toast.error(error || "Failed to restrict user");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              User Management
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Monitor community activity and manage member accounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={exportLoading}
              className="bg-white border-slate-200 text-slate-700 shadow-sm h-10 px-5"
            >
              {exportLoading ? (
                <IconLoader className="mr-2 h-4 w-4 animate-spin text-indigo-500" />
              ) : (
                <IconDownload className="mr-2 h-4 w-4 text-slate-400" />
              )}
              {exportLoading ? "Preparing CSV..." : "Export CSV"}
            </Button>
          </div>
        </header>

        {/* --- STATS SUMMARY ROW --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            {
              label: "Total Members",
              val: reduxPagination.total || 0,
              icon: <IconUsers />,
              color: "blue",
              description: "Overall Total Users",
            },
            {
              label: "Active Users",
              // Use the total from your pagination meta if available, e.g., reduxPagination.activeTotal
              val: items.filter((u) => u.account?.status === "active").length,
              icon: <IconUserCheck />,
              color: "emerald",
              description: "Live community",
            },
            {
              label: "Premium Members",
              val: items.filter((u) => u.account?.isPremium).length,
              icon: <IconCrown />,
              color: "amber",
              description: "Pro tier active",
            },
            {
              label: "Banned Users",
              val: items.filter((u) => u.account?.status === "banned").length,
              icon: <IconBan />,
              color: "rose",
              description: "Safety restrictions",
            },
            {
              label: "Suspended",
              val: items.filter((u) => u.account?.status === "suspended")
                .length,
              icon: <IconAlertTriangle />, // Imported from tabler-icons
              color: "orange",
              description: "Under review",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-indigo-100"
            >
              <div
                className={cn(
                  "p-3 rounded-xl transition-colors",
                  // Map colors to background tints
                  stat.color === "emerald" && "bg-emerald-50 text-emerald-600",
                  stat.color === "amber" && "bg-amber-50 text-amber-600",
                  stat.color === "rose" && "bg-rose-50 text-rose-600",
                  stat.color === "orange" && "bg-orange-50 text-orange-600"
                )}
              >
                {React.cloneElement(stat.icon, { size: 24, stroke: 2 })}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-black text-slate-900 leading-none">
                    {stat.val.toLocaleString()}
                  </h4>
                </div>
                <p className="text-[10px] font-medium text-slate-400 mt-1 truncate">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- TABLE SECTION --- */}
        {/* <main className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"> */}
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
        {/* </main> */}

        {/* --- FLOATING PROGRESS OVERLAY --- */}
        {exportLoading && (
          <div className="fixed bottom-8 right-8 z-[100]">
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 w-72 space-y-3 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconLoader className="animate-spin h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-tight">
                    Exporting Data
                  </span>
                </div>
                <span className="text-xs font-mono text-indigo-400">
                  {exportProgress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 italic">
                Please do not close the browser tab
              </p>
            </div>
          </div>
        )}

        <BanUserModal
          isOpen={isBanModalOpen}
          onClose={() => setIsBanModalOpen(false)}
          onConfirm={handleBanConfirm}
          userName={selectedUserForBan?.profile?.nickname || "User"}
        />
      </div>
    </div>
  );
}
