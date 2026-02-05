// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { IconDownload, IconLoader } from "@tabler/icons-react";
// import { toast } from "sonner";
// import { userColumns } from "@/components/common/userColumns";
// import { DataTable } from "@/components/common/data-table";
// import {
//   bannedUserProfile,
//   exportUsersStream,
//   fetchUsers,
// } from "@/modules/users/store/user.slice";
// import { BanUserModal } from "../components/ban-user-modal";

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
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
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

//       {/* <DataTable
//         columns={userColumns}
//         data={items}
//         rowCount={reduxPagination.total} // Total count from DB
//         pagination={pagination}
//         onPaginationChange={setPagination} // Set local state on click
//         globalFilter={globalFilter}
//         setGlobalFilter={(val) => {
//           setGlobalFilter(val);
//           setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to page 1 on search
//         }}
//         isLoading={loading}
//         meta={{
//           onBan: (user) => handleBanClick(user),
//         }}
//       /> */}

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



import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  IconAlertTriangle,
  IconBan,
  IconCrown,
  IconFileExcel,
  IconLoader,
  IconLoader2,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react";
import {
  IconAlertTriangle,
  IconBan,
  IconCrown,
  IconFileExcel,
  IconLoader,
  IconLoader2,
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
//   // 1. New Filter States
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [accountStatus, setAccountStatus] = useState(""); // Default selected
//   const [isPremium, setIsPremium] = useState(undefined); // undefined means 'All'
//   const [accountStatus, setAccountStatus] = useState(""); // Default selected
//   const [isPremium, setIsPremium] = useState(undefined); // undefined means 'All'

//   const handleExport = async () => {
//     const filters = { search: globalFilter };

//     const resultAction = await dispatch(exportUsersStream(filters));
//     const filters = { search: globalFilter };

//     const resultAction = await dispatch(exportUsersStream(filters));

//     if (exportUsersStream.fulfilled.match(resultAction)) {
//       const csvContent = resultAction.payload;
//       const csvContent = resultAction.payload;

//       // Create download link
//       const blob = new Blob([csvContent], { type: "text/csv" });
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
//       const link = document.createElement("a");

//       link.href = url;
//       link.setAttribute("download", `MAFS_Export_${Date.now()}.csv`);
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Users exported successfully!");
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
//             Manage community members.
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <Button
//             // variant="outline"
//             // variant="outline"
//             size="sm"
//             onClick={handleExport}
//             disabled={exportLoading} // Use Redux state
//             disabled={exportLoading} // Use Redux state
//           >
//             {exportLoading ? (
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
//           {/* <Button size="sm">Add New User</Button> */}
//         </div>
//       </div>

//       <DataTable
//         columns={userColumns}
//         data={items}
//         rowCount={reduxPagination.total}
//         pagination={pagination}
//         onPaginationChange={setPagination}
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
//         meta={{ onBan: (user) => handleBanClick(user) }}
//       />

//       {/* --- FLOATING PROGRESS BAR (Controlled by Redux) --- */}
//       {exportLoading && (
//       {/* --- FLOATING PROGRESS BAR (Controlled by Redux) --- */}
//       {exportLoading && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white p-5 rounded-xl shadow-2xl border border-blue-100 z-[9999] animate-in fade-in slide-in-from-bottom-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-bold text-slate-700">
//               Downloading Report...
//             </span>
//             <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
//               {exportProgress}%
//               {exportProgress}%
//             </span>
//           </div>
//           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${exportProgress}%` }}
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
  // Filter States
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [isPremium, setIsPremium] = useState(undefined);
  const [accountStatus, setAccountStatus] = useState("");
  const [isPremium, setIsPremium] = useState(undefined);

  const handleExport = async () => {
    const filters = { search: globalFilter };
    const resultAction = dispatch(exportUsersStream(filters));
    const resultAction = dispatch(exportUsersStream(filters));

    if (exportUsersStream.fulfilled.match(resultAction)) {
      const csvContent = resultAction.payload;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `MAFS_Users_${Date.now()}.csv`);
      link.setAttribute("download", `MAFS_Users_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Export completed successfully");
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
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          accountStatus: accountStatus,
          isPremium: isPremium,
          accountStatus: accountStatus,
          isPremium: isPremium,
        })
      );
    }, 500);
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
        bannedUserProfile({ userId: selectedUserForBan._id, category, reason })
      ).unwrap();
      toast.success("User has been restricted");
      toast.success("User has been restricted");
      setIsBanModalOpen(false);
    } catch (error) {
      toast.error(error || "Failed to restrict user");
    }
  };

  const stats = [
    {
      label: "Total Members",
      val: reduxPagination.total || 0,
      icon: <IconUsers />,
      color: "blue",
      description: "Overall Total Users",
      trend: "+12.5%", // Added trend for visual appeal
    },
    {
      label: "Active Users",
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
      val: items.filter((u) => u.account?.status === "suspended").length,
      icon: <IconAlertTriangle />,
      color: "orange",
      description: "Under review",
    },
  ];

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald:
      "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
    orange:
      "from-orange-500/40 to-orange-600/5 text-orange-600 border-orange-100",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-100",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-100",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-100",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-100",
    orange:
      "from-orange-300/20 via-orange-500/10 to-transparent text-orange-600 border-orange-100",
      toast.error(error || "Failed to restrict user");
    }
  };

  const stats = [
    {
      label: "Total Members",
      val: reduxPagination.total || 0,
      icon: <IconUsers />,
      color: "blue",
      description: "Overall Total Users",
      trend: "+12.5%", // Added trend for visual appeal
    },
    {
      label: "Active Users",
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
      val: items.filter((u) => u.account?.status === "suspended").length,
      icon: <IconAlertTriangle />,
      color: "orange",
      description: "Under review",
    },
  ];

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald:
      "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    amber: "from-amber-500/40 to-amber-600/5 text-amber-600 border-amber-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
    orange:
      "from-orange-500/40 to-orange-600/5 text-orange-600 border-orange-100",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-100",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-100",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-100",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-100",
    orange:
      "from-orange-300/20 via-orange-500/10 to-transparent text-orange-600 border-orange-100",
  };

  return (
    // <div className="flex flex-1 flex-col">
    <div className="w-full min-h-screen !overflow-x-hidden bg-[#F8FAFC] p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* <div className="mx-auto space-y-8"> */}
      <div className="@container/main space-y-8">
        {/* --- HEADER SECTION --- */}
        <header className="flex md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              User Management
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Monitor community activity and manage member accounts.
            </p>
          </div>
    // <div className="flex flex-1 flex-col">
    <div className="w-full min-h-screen !overflow-x-hidden bg-[#F8FAFC] p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* <div className="mx-auto space-y-8"> */}
      <div className="@container/main space-y-8">
        {/* --- HEADER SECTION --- */}
        <header className="flex md:items-center justify-between gap-4">
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
              className={cn(
                "relative h-11 px-4 shadow-md rounded-lg font-semibold transition-all duration-300",
                "bg-green-400 hover:bg-green-100 border-green-600",
                "text-slate-800 hover:text-green-700",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.15)]",
                "hover:border-indigo-200 active:scale-[0.98]",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100",
                "group overflow-hidden"
              )}
            >
              {/* Subtle Inner Glow on Hover */}
              <span className="absolute inset-0 bg-gradient-to-tr from-indigo-50/0 via-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center justify-center">
                {exportLoading ? (
                  <IconLoader2 className="mr-2.5 h-4 w-4 animate-spin text-green-600" />
                ) : (
                  <IconFileExcel
                    width={0}
                    height={0}
                    className="mr-2.5 !h-6 !w-6 text-slate-800 group-hover:text-green-500 transition-colors duration-300"
                  />
                )}

                <span className="tracking-tight">
                  {exportLoading ? "Preparing CSV..." : "Export CSV"}
                </span>
              </div>
            </Button>
          </div>
        </header>

        {/* --- STATS SUMMARY ROW --- */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "group relative p-6 rounded-3xl border bg-gradient-to-br cursor-pointer transition-all duration-500",
                "hover:shadow-[0_22px_50px_-12px_rgba(0,0,0,0.05)] hover:-translate-y-1.5",
                bgMap[stat.color] // Applies the background and border color
              )}
            >
              {/* Icon Header */}
              <div className="flex items-start justify-center gap-4">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br border shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                    colorMap[stat.color]
                  )}
                >
                  {React.cloneElement(stat.icon, { size: 22, stroke: 2 })}
                </div>

                <div className="flex-1 w-max">
                  <p className="text-[10px] cursor-text font-black uppercase tracking-widest mb-0.5">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-black text-slate-900 leading-none cursor-text">
                      {stat.val.toLocaleString()}
                    </h4>
                  </div>
                  <p className="text-[10px] font-medium mt-1 truncate cursor-text">
                    {stat.description}
                  </p>
                </div>

                {/* {stat.trend && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    <IconTrendingUp size={12} />
                    {stat.trend}
                  </div>
                )} */}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={exportLoading}
              className={cn(
                "relative h-11 px-4 shadow-md rounded-lg font-semibold transition-all duration-300",
                "bg-green-400 hover:bg-green-100 border-green-600",
                "text-slate-800 hover:text-green-700",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.15)]",
                "hover:border-indigo-200 active:scale-[0.98]",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100",
                "group overflow-hidden"
              )}
            >
              {/* Subtle Inner Glow on Hover */}
              <span className="absolute inset-0 bg-gradient-to-tr from-indigo-50/0 via-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center justify-center">
                {exportLoading ? (
                  <IconLoader2 className="mr-2.5 h-4 w-4 animate-spin text-green-600" />
                ) : (
                  <IconFileExcel
                    width={0}
                    height={0}
                    className="mr-2.5 !h-6 !w-6 text-slate-800 group-hover:text-green-500 transition-colors duration-300"
                  />
                )}

                <span className="tracking-tight">
                  {exportLoading ? "Preparing CSV..." : "Export CSV"}
                </span>
              </div>
            </Button>
          </div>
        </header>

        {/* --- STATS SUMMARY ROW --- */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "group relative p-6 rounded-3xl border bg-gradient-to-br cursor-pointer transition-all duration-500",
                "hover:shadow-[0_22px_50px_-12px_rgba(0,0,0,0.05)] hover:-translate-y-1.5",
                bgMap[stat.color] // Applies the background and border color
              )}
            >
              {/* Icon Header */}
              <div className="flex items-start justify-center gap-4">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br border shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                    colorMap[stat.color]
                  )}
                >
                  {React.cloneElement(stat.icon, { size: 22, stroke: 2 })}
                </div>

                <div className="flex-1 w-max">
                  <p className="text-[10px] cursor-text font-black uppercase tracking-widest mb-0.5">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-black text-slate-900 leading-none cursor-text">
                      {stat.val.toLocaleString()}
                    </h4>
                  </div>
                  <p className="text-[10px] font-medium mt-1 truncate cursor-text">
                    {stat.description}
                  </p>
                </div>

                {/* {stat.trend && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    <IconTrendingUp size={12} />
                    {stat.trend}
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>

        {/* --- TABLE SECTION --- */}
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

        {/* --- TABLE SECTION --- */}
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
              <div className="h-1.5 w-full bg-slate-800 rounded-full">
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
              <div className="h-1.5 w-full bg-slate-800 rounded-full">
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