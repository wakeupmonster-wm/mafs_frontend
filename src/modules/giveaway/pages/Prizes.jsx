// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchPrizes,
// //   createPrize,
// //   deletePrize,
// // } from "../store/giveaway.slice";

// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import ActionDropdown from "../components/ActionDropdown";

// // export default function Prizes() {
// //   const dispatch = useDispatch();
// //   const { prizes, loading } = useSelector((s) => s.giveaway);

// //   const [form, setForm] = useState({
// //     title: "",
// //     type: "",
// //     value: "",
// //     spinWheelLabel: "",
// //   });

// //   useEffect(() => {
// //     dispatch(fetchPrizes());
// //   }, [dispatch]);

// //   const submit = () => {
// //     if (!form.title || !form.type || !form.value) {
// //       alert("All fields are required");
// //       return;
// //     }

// //     dispatch(createPrize(form));
// //     setForm({
// //       title: "",
// //       type: "",
// //       value: "",
// //       spinWheelLabel: "",
// //     });
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* ================= CREATE PRIZE ================= */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Create Prize</CardTitle>
// //         </CardHeader>

// //         <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <Input
// //             placeholder="Prize Title"
// //             value={form.title}
// //             onChange={(e) =>
// //               setForm({ ...form, title: e.target.value })
// //             }
// //           />

// //           <Input
// //             placeholder="Type (FREE_PREMIUM / CASH)"
// //             value={form.type}
// //             onChange={(e) =>
// //               setForm({ ...form, type: e.target.value })
// //             }
// //           />

// //           <Input
// //             placeholder="Value (eg: 30 days / ₹500)"
// //             value={form.value}
// //             onChange={(e) =>
// //               setForm({ ...form, value: e.target.value })
// //             }
// //           />

// //           <Input
// //             placeholder="Spin Wheel Label"
// //             value={form.spinWheelLabel}
// //             onChange={(e) =>
// //               setForm({
// //                 ...form,
// //                 spinWheelLabel: e.target.value,
// //               })
// //             }
// //           />

// //           <Button
// //             className="md:col-span-1"
// //             onClick={submit}
// //             disabled={loading}
// //           >
// //             Create Prize
// //           </Button>
// //         </CardContent>
// //       </Card>

// //       {/* ================= PRIZE TABLE ================= */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>
// //             Prizes ({prizes.length})
// //           </CardTitle>
// //         </CardHeader>

// //         <CardContent className="overflow-x-auto">
// //           <table className="w-full border text-sm">
// //             <thead className="bg-muted">
// //               <tr>
// //                 <th className="p-2 text-left">Title</th>
// //                 <th className="p-2 text-left">Type</th>
// //                 <th className="p-2 text-left">Value</th>
// //                 <th className="p-2 text-left">
// //                   Spin Label
// //                 </th>
// //                 <th className="p-2 text-left">
// //                   Created
// //                 </th>
// //                 <th className="p-2 text-right">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {prizes.map((p) => (
// //                 <tr
// //                   key={p._id}
// //                   className="border-t hover:bg-muted/50"
// //                 >
// //                   <td className="p-2 font-medium">
// //                     {p.title}
// //                   </td>

// //                   <td className="p-2">
// //                     <Badge variant="outline">
// //                       {p.type}
// //                     </Badge>
// //                   </td>

// //                   <td className="p-2">{p.value}</td>

// //                   <td className="p-2">
// //                     {p.spinWheelLabel || "—"}
// //                   </td>

// //                   <td className="p-2 text-muted-foreground">
// //                     {new Date(
// //                       p.createdAt
// //                     ).toLocaleDateString()}
// //                   </td>

// //                   <td className="p-2 text-right">
// //                     <ActionDropdown
// //                       actions={[
// //                         {
// //                           label: "Delete",
// //                           destructive: true,
// //                           onClick: () => {
// //                             if (
// //                               confirm(
// //                                 "Delete prize permanently?"
// //                               )
// //                             ) {
// //                               dispatch(
// //                                 deletePrize(p._id)
// //                               );
// //                             }
// //                           },
// //                         },
// //                       ]}
// //                     />
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           {loading && (
// //             <p className="mt-2 text-sm text-muted-foreground">
// //               Loading prizes...
// //             </p>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPrizes,
//   createPrize,
//   deletePrize,
// } from "../store/giveaway.slice";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import ActionDropdown from "../components/ActionDropdown";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// import {
//   Gift,
//   Plus,
//   Trophy,
//   Loader2,
//   Tag,
//   Coins,
//   CircleDollarSign,
//   Crown,
//   Sparkles,
//   Calendar,
//   Inbox,
//   Type,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   clearGiveawayStatus,
// } from "../store/giveaway.slice";

// export default function Prizes() {
//   const dispatch = useDispatch();
//   const { prizes,loading, error, successMessage  } = useSelector((s) => s.giveaway);

//   const [form, setForm] = useState({
//     title: "",
//     type: "",
//     value: "",
//     spinWheelLabel: "",
//   });

//   useEffect(() => {
//     dispatch(fetchPrizes());
//   }, [dispatch]);



//   useEffect(() => {
//   if (successMessage) {
//     toast.success(successMessage);
//     dispatch(clearGiveawayStatus());
//   }

//   if (error) {
//     toast.error(typeof error === "string" ? error : error.message);
//     dispatch(clearGiveawayStatus());
//   }
// }, [successMessage, error, dispatch]);



//   const submit = () => {
//     if (!form.title || !form.type || !form.value) {
//       // alert("All fields are required");
//       return;
//     }

//     dispatch(createPrize(form));
//     setForm({
//       title: "",
//       type: "",
//       value: "",
//       spinWheelLabel: "",
//     });
//   };

//   const getTypeIcon = (type) => {
//     if (type === "FREE_PREMIUM") {
//       return <Crown className="h-3.5 w-3.5" />;
//     }
//     if (type === "CASH") {
//       return <CircleDollarSign className="h-3.5 w-3.5" />;
//     }
//     return <Gift className="h-3.5 w-3.5" />;
//   };

//   const getTypeStyles = (type) => {
//     if (type === "FREE_PREMIUM") {
//       return "bg-amber-50 text-amber-700 border-amber-200";
//     }
//     if (type === "CASH") {
//       return "bg-emerald-50 text-emerald-700 border-emerald-200";
//     }
//     return "bg-gray-50 text-gray-700 border-gray-200";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg ">
//             <Trophy className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Prizes</h1>
//             <p className="text-sm text-gray-500">Manage giveaway prizes</p>
//           </div>
//         </div>

//         {/* Create Prize Card */}
//         <Card className="border-0 shadow-sm shadow-gray-200/50">
//           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
//             <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
//               <Plus className="h-4 w-4 text-amber-600" />
//               Create New Prize
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="p-5">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Gift className="h-3.5 w-3.5" />
//                   Prize Title
//                 </label>
//                 <Input
//                   placeholder="e.g. Premium Membership"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Tag className="h-3.5 w-3.5" />
//                   Prize Type
//                 </label>
//                 <Select
//                   value={form.type}
//                   onValueChange={(v) => setForm({ ...form, type: v })}
//                 >
//                   <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="FREE_PREMIUM">
//                       <span className="flex items-center gap-2">
//                         <Crown className="h-3.5 w-3.5 text-amber-500" />
//                         FREE_PREMIUM
//                       </span>
//                     </SelectItem>
//                     <SelectItem value="GIFT_CARD">
//                       <span className="flex items-center gap-2">
//                         <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
//                         CASH
//                       </span>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Coins className="h-3.5 w-3.5" />
//                   Value
//                 </label>
//                 <Input
//                   placeholder="e.g. 150"
//                   value={form.value}
//                   onChange={(e) => setForm({ ...form, value: e.target.value })}
//                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   Spin Wheel Label
//                 </label>
//                 <Input
//                   placeholder="Display on wheel"
//                   value={form.spinWheelLabel}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       spinWheelLabel: e.target.value,
//                     })
//                   }
//                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
//                 />
//               </div>

//               <div className="flex items-end">
//                 <Button
//                   onClick={submit}
//                   disabled={loading}
//                   className="h-10 w-full gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md"
//                 >
//                   {loading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Plus className="h-4 w-4" />
//                   )}
//                   Create Prize
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Prizes List Card */}
//         <Card className="border-0 shadow-sm shadow-gray-200/50">
//           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
//             <div className="flex items-center justify-between">
//               <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
//                 <Trophy className="h-4 w-4 text-amber-600" />
//                 All Prizes
//               </CardTitle>
//               <Badge variant="secondary" className="bg-amber-100 text-amber-700">
//                 {prizes.length} Total
//               </Badge>
//             </div>
//           </CardHeader>

//           <CardContent className="p-0">
//             {loading && prizes.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 text-gray-500">
//                 <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
//                 <p className="mt-3 text-sm font-medium">Loading prizes...</p>
//               </div>
//             ) : prizes.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//                   <Inbox className="h-8 w-8" />
//                 </div>
//                 <p className="mt-4 font-medium text-gray-600">No prizes yet</p>
//                 <p className="mt-1 text-sm">Create your first prize above</p>
//               </div>
//             ) : (
//               <>
//                 {/* Desktop Table */}
//                 <div className="hidden overflow-x-auto md:block">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
//                         <th className="px-5 py-3.5 text-left">Title</th>
//                         <th className="px-5 py-3.5 text-left">Type</th>
//                         <th className="px-5 py-3.5 text-left">Value</th>
//                         <th className="px-5 py-3.5 text-left">Spin Label</th>
//                         <th className="px-5 py-3.5 text-left">Created</th>
//                         <th className="px-5 py-3.5 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {prizes.map((p) => (
//                         <tr
//                           key={p._id}
//                           className="transition-colors hover:bg-gray-50/50"
//                         >
//                           <td className="px-5 py-4">
//                             <div className="flex items-center gap-2">
//                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
//                                 <Gift className="h-4 w-4 text-amber-600" />
//                               </div>
//                               <span className="font-semibold text-gray-800">
//                                 {p.title}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span
//                               className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
//                             >
//                               {getTypeIcon(p.type)}
//                               {p.type}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className="font-medium text-gray-700">
//                               {p.value}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4">
//                             {p.spinWheelLabel ? (
//                               <span className="inline-flex items-center gap-1 text-sm text-gray-600">
//                                 <Sparkles className="h-3.5 w-3.5 text-amber-500" />
//                                 {p.spinWheelLabel}
//                               </span>
//                             ) : (
//                               <span className="text-sm text-gray-400">-</span>
//                             )}
//                           </td>
//                           <td className="px-5 py-4">
//                             <span className="flex items-center gap-1.5 text-sm text-gray-500">
//                               <Calendar className="h-3.5 w-3.5" />
//                               {new Date(p.createdAt).toLocaleDateString()}
//                             </span>
//                           </td>
//                           <td className="px-5 py-4 text-right">
//                             <ActionDropdown
//                               actions={[
//                                 {
//                                   label: "Delete",
//                                   destructive: true,
//                                   onClick: () => {
//                                     if (confirm("Delete prize permanently?")) {
//                                       dispatch(deletePrize(p._id));
//                                     }
//                                   },
//                                 },
//                               ]}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile Cards */}
//                 <div className="divide-y divide-gray-100 md:hidden">
//                   {prizes.map((p) => (
//                     <div key={p._id} className="p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
//                             <Gift className="h-5 w-5 text-amber-600" />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               {p.title}
//                             </h3>
//                             <p className="mt-0.5 text-sm font-medium text-gray-600">
//                               {p.value}
//                             </p>
//                           </div>
//                         </div>
//                         <ActionDropdown
//                           actions={[
//                             {
//                               label: "Delete",
//                               destructive: true,
//                               onClick: () => {
//                                 if (confirm("Delete prize permanently?")) {
//                                   dispatch(deletePrize(p._id));
//                                 }
//                               },
//                             },
//                           ]}
//                         />
//                       </div>
//                       <div className="mt-3 flex flex-wrap items-center gap-2">
//                         <span
//                           className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
//                         >
//                           {getTypeIcon(p.type)}
//                           {p.type}
//                         </span>
//                         {p.spinWheelLabel && (
//                           <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
//                             <Sparkles className="h-3 w-3 text-amber-500" />
//                             {p.spinWheelLabel}
//                           </span>
//                         )}
//                       </div>
//                       <p className="mt-3 flex items-center gap-1 text-xs text-gray-400">
//                         <Calendar className="h-3 w-3" />
//                         Created {new Date(p.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrizes,
  createPrize,
  deletePrize,
} from "../store/giveaway.slice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ActionDropdown from "../components/ActionDropdown";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Gift,
  Plus,
  Trophy,
  Loader2,
  Tag,
  Coins,
  CircleDollarSign,
  Crown,
  Sparkles,
  Calendar,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import {
  clearGiveawayStatus,
} from "../store/giveaway.slice";

export default function Prizes() {
  const dispatch = useDispatch();
  const { prizes, loading, error, successMessage } = useSelector((s) => s.giveaway);

  const [form, setForm] = useState({
    title: "",
    type: "",
    value: "",
    spinWheelLabel: "",
  });

  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearGiveawayStatus());
    }

    if (error) {
      toast.error(typeof error === "string" ? error : error.message);
      dispatch(clearGiveawayStatus());
    }
  }, [successMessage, error, dispatch]);

  const validateForm = () => {
    const trimmedTitle = form.title.trim();
    const trimmedType = form.type.trim();
    const trimmedValue = form.value.trim();
    const trimmedLabel = form.spinWheelLabel.trim();

    if (!trimmedTitle) {
      toast.error("Prize title is required");
      return false;
    }

    if (trimmedTitle.length < 3) {
      toast.error("Prize title must be at least 3 characters long");
      return false;
    }

    if (trimmedTitle.length > 100) {
      toast.error("Prize title must not exceed 100 characters");
      return false;
    }

    if (!trimmedType) {
      toast.error("Please select a prize type");
      return false;
    }

    if (!trimmedValue) {
      toast.error("Prize value is required");
      return false;
    }

    const numericValue = parseFloat(trimmedValue);

    if (isNaN(numericValue)) {
      toast.error("Prize value must be a valid number");
      return false;
    }

    if (numericValue <= 0) {
      toast.error("Prize value must be greater than 0");
      return false;
    }

    if (numericValue > 1000000) {
      toast.error("Prize value must not exceed 1,000,000");
      return false;
    }

    if (!trimmedLabel) {
      toast.error("Spin wheel label is required");
      return false;
    }

    if (trimmedLabel.length < 2) {
      toast.error("Spin wheel label must be at least 2 characters long");
      return false;
    }

    if (trimmedLabel.length > 50) {
      toast.error("Spin wheel label must not exceed 50 characters");
      return false;
    }

    const duplicatePrize = prizes.find(
      (p) => p.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (duplicatePrize) {
      toast.error("A prize with this title already exists");
      return false;
    }

    return true;
  };

  const submit = () => {
    if (!validateForm()) {
      return;
    }

    dispatch(createPrize({
      title: form.title.trim(),
      type: form.type.trim(),
      value: parseFloat(form.value.trim()),
      spinWheelLabel: form.spinWheelLabel.trim(),
    }));

    setForm({
      title: "",
      type: "",
      value: "",
      spinWheelLabel: "",
    });
  };

  const handleDelete = (prizeId, prizeTitle) => {
    if (window.confirm(`Are you sure you want to delete "${prizeTitle}"? This action cannot be undone.`)) {
      dispatch(deletePrize(prizeId));
    }
  };

  const getTypeIcon = (type) => {
    if (type === "FREE_PREMIUM") {
      return <Crown className="h-3.5 w-3.5" />;
    }
    if (type === "GIFT_CARD") {
      return <CircleDollarSign className="h-3.5 w-3.5" />;
    }
    return <Gift className="h-3.5 w-3.5" />;
  };

  const getTypeStyles = (type) => {
    if (type === "FREE_PREMIUM") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (type === "GIFT_CARD") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prizes</h1>
            <p className="text-sm text-gray-500">Manage giveaway prizes</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm shadow-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
              <Plus className="h-4 w-4 text-amber-600" />
              Create New Prize
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Gift className="h-3.5 w-3.5" />
                  Prize Title
                </label>
                <Input
                  placeholder="e.g. Premium Membership"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Tag className="h-3.5 w-3.5" />
                  Prize Type
                </label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v })}
                >
                  <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE_PREMIUM">
                      <span className="flex items-center gap-2">
                        <Crown className="h-3.5 w-3.5 text-amber-500" />
                        FREE_PREMIUM
                      </span>
                    </SelectItem>
                    <SelectItem value="GIFT_CARD">
                      <span className="flex items-center gap-2">
                        <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
                        GIFT_CARD
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Coins className="h-3.5 w-3.5" />
                  Value
                </label>
                <Input
                  placeholder="e.g. 150"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  Spin Wheel Label
                </label>
                <Input
                  placeholder="Display on wheel"
                  value={form.spinWheelLabel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      spinWheelLabel: e.target.value,
                    })
                  }
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
                />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={submit}
                  disabled={loading}
                  className="h-10 w-full gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Create Prize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm shadow-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <Trophy className="h-4 w-4 text-amber-600" />
                All Prizes
              </CardTitle>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                {prizes.length} Total
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading && prizes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                <p className="mt-3 text-sm font-medium">Loading prizes...</p>
              </div>
            ) : prizes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Inbox className="h-8 w-8" />
                </div>
                <p className="mt-4 font-medium text-gray-600">No prizes yet</p>
                <p className="mt-1 text-sm">Create your first prize above</p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-5 py-3.5 text-left">Title</th>
                        <th className="px-5 py-3.5 text-left">Type</th>
                        <th className="px-5 py-3.5 text-left">Value</th>
                        <th className="px-5 py-3.5 text-left">Spin Label</th>
                        <th className="px-5 py-3.5 text-left">Created</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {prizes.map((p) => (
                        <tr
                          key={p._id}
                          className="transition-colors hover:bg-gray-50/50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                                <Gift className="h-4 w-4 text-amber-600" />
                              </div>
                              <span className="font-semibold text-gray-800">
                                {p.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
                            >
                              {getTypeIcon(p.type)}
                              {p.type}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-medium text-gray-700">
                              {p.value}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {p.spinWheelLabel ? (
                              <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                {p.spinWheelLabel}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <ActionDropdown
                              actions={[
                                {
                                  label: "Delete",
                                  destructive: true,
                                  onClick: () => handleDelete(p._id, p.title),
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-gray-100 md:hidden">
                  {prizes.map((p) => (
                    <div key={p._id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                            <Gift className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {p.title}
                            </h3>
                            <p className="mt-0.5 text-sm font-medium text-gray-600">
                              {p.value}
                            </p>
                          </div>
                        </div>
                        <ActionDropdown
                          actions={[
                            {
                              label: "Delete",
                              destructive: true,
                              onClick: () => handleDelete(p._id, p.title),
                            },
                          ]}
                        />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
                        >
                          {getTypeIcon(p.type)}
                          {p.type}
                        </span>
                        {p.spinWheelLabel && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                            <Sparkles className="h-3 w-3 text-amber-500" />
                            {p.spinWheelLabel}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        Created {new Date(p.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
