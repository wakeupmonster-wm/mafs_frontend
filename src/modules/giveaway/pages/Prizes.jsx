// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import {
// // // //   fetchPrizes,
// // // //   createPrize,
// // // //   deletePrize,
// // // // } from "../store/giveaway.slice";

// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardHeader,
// // // //   CardTitle,
// // // // } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import ActionDropdown from "../components/ActionDropdown";

// // // // import {
// // // //   Select,
// // // //   SelectTrigger,
// // // //   SelectValue,
// // // //   SelectContent,
// // // //   SelectItem,
// // // // } from "@/components/ui/select";

// // // // import {
// // // //   Gift,
// // // //   Plus,
// // // //   Trophy,
// // // //   Loader2,
// // // //   Tag,
// // // //   Coins,
// // // //   CircleDollarSign,
// // // //   Crown,
// // // //   Sparkles,
// // // //   Calendar,
// // // //   Inbox,
// // // // } from "lucide-react";
// // // // import { toast } from "sonner";
// // // // import {
// // // //   clearGiveawayStatus,
// // // // } from "../store/giveaway.slice";

// // // // export default function Prizes() {
// // // //   const dispatch = useDispatch();
// // // //   const { prizes, loading, error, successMessage } = useSelector((s) => s.giveaway);

// // // //   const [form, setForm] = useState({
// // // //     title: "",
// // // //     type: "",
// // // //     value: "",
// // // //     spinWheelLabel: "",
// // // //   });

// // // //   useEffect(() => {
// // // //     dispatch(fetchPrizes());
// // // //   }, [dispatch]);

// // // //   useEffect(() => {
// // // //     if (successMessage) {
// // // //       toast.success(successMessage);
// // // //       dispatch(clearGiveawayStatus());
// // // //     }

// // // //     if (error) {
// // // //       toast.error(typeof error === "string" ? error : error.message);
// // // //       dispatch(clearGiveawayStatus());
// // // //     }
// // // //   }, [successMessage, error, dispatch]);

// // // //   const validateForm = () => {
// // // //     const trimmedTitle = form.title.trim();
// // // //     const trimmedType = form.type.trim();
// // // //     const trimmedValue = form.value.trim();
// // // //     const trimmedLabel = form.spinWheelLabel.trim();

// // // //     if (!trimmedTitle) {
// // // //       toast.error("Prize title is required");
// // // //       return false;
// // // //     }

// // // //     if (trimmedTitle.length < 3) {
// // // //       toast.error("Prize title must be at least 3 characters long");
// // // //       return false;
// // // //     }

// // // //     if (trimmedTitle.length > 100) {
// // // //       toast.error("Prize title must not exceed 100 characters");
// // // //       return false;
// // // //     }

// // // //     if (!trimmedType) {
// // // //       toast.error("Please select a prize type");
// // // //       return false;
// // // //     }

// // // //     if (!trimmedValue) {
// // // //       toast.error("Prize value is required");
// // // //       return false;
// // // //     }

// // // //     const numericValue = parseFloat(trimmedValue);

// // // //     if (isNaN(numericValue)) {
// // // //       toast.error("Prize value must be a valid number");
// // // //       return false;
// // // //     }

// // // //     if (numericValue <= 0) {
// // // //       toast.error("Prize value must be greater than 0");
// // // //       return false;
// // // //     }

// // // //     if (numericValue > 1000000) {
// // // //       toast.error("Prize value must not exceed 1,000,000");
// // // //       return false;
// // // //     }

// // // //     if (!trimmedLabel) {
// // // //       toast.error("Spin wheel label is required");
// // // //       return false;
// // // //     }

// // // //     if (trimmedLabel.length < 2) {
// // // //       toast.error("Spin wheel label must be at least 2 characters long");
// // // //       return false;
// // // //     }

// // // //     if (trimmedLabel.length > 50) {
// // // //       toast.error("Spin wheel label must not exceed 50 characters");
// // // //       return false;
// // // //     }

// // // //     const duplicatePrize = prizes.find(
// // // //       (p) => p.title.toLowerCase() === trimmedTitle.toLowerCase()
// // // //     );

// // // //     if (duplicatePrize) {
// // // //       toast.error("A prize with this title already exists");
// // // //       return false;
// // // //     }

// // // //     return true;
// // // //   };

// // // //   const submit = () => {
// // // //     if (!validateForm()) {
// // // //       return;
// // // //     }

// // // //     dispatch(createPrize({
// // // //       title: form.title.trim(),
// // // //       type: form.type.trim(),
// // // //       value: parseFloat(form.value.trim()),
// // // //       spinWheelLabel: form.spinWheelLabel.trim(),
// // // //     }));

// // // //     setForm({
// // // //       title: "",
// // // //       type: "",
// // // //       value: "",
// // // //       spinWheelLabel: "",
// // // //     });
// // // //   };

// // // //   const handleDelete = (prizeId, prizeTitle) => {
// // // //     if (window.confirm(`Are you sure you want to delete "${prizeTitle}"? This action cannot be undone.`)) {
// // // //       dispatch(deletePrize(prizeId));
// // // //     }
// // // //   };

// // // //   const getTypeIcon = (type) => {
// // // //     if (type === "FREE_PREMIUM") {
// // // //       return <Crown className="h-3.5 w-3.5" />;
// // // //     }
// // // //     if (type === "GIFT_CARD") {
// // // //       return <CircleDollarSign className="h-3.5 w-3.5" />;
// // // //     }
// // // //     return <Gift className="h-3.5 w-3.5" />;
// // // //   };

// // // //   const getTypeStyles = (type) => {
// // // //     if (type === "FREE_PREMIUM") {
// // // //       return "bg-amber-50 text-amber-700 border-amber-200";
// // // //     }
// // // //     if (type === "GIFT_CARD") {
// // // //       return "bg-emerald-50 text-emerald-700 border-emerald-200";
// // // //     }
// // // //     return "bg-gray-50 text-gray-700 border-gray-200";
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
// // // //       <div className="mx-auto max-w-7xl space-y-6">
// // // //         <div className="flex items-center gap-3">
// // // //           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
// // // //             <Trophy className="h-5 w-5 text-white" />
// // // //           </div>
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-900">Prizes</h1>
// // // //             <p className="text-sm text-gray-500">Manage giveaway prizes</p>
// // // //           </div>
// // // //         </div>

// // // //         <Card className="border-0 shadow-sm shadow-gray-200/50">
// // // //           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
// // // //             <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
// // // //               <Plus className="h-4 w-4 text-amber-600" />
// // // //               Create New Prize
// // // //             </CardTitle>
// // // //           </CardHeader>

// // // //           <CardContent className="p-5">
// // // //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
// // // //               <div className="space-y-1.5">
// // // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // // //                   <Gift className="h-3.5 w-3.5" />
// // // //                   Prize Title
// // // //                 </label>
// // // //                 <Input
// // // //                   placeholder="e.g. Premium Membership"
// // // //                   value={form.title}
// // // //                   onChange={(e) => setForm({ ...form, title: e.target.value })}
// // // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // // //                 />
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // // //                   <Tag className="h-3.5 w-3.5" />
// // // //                   Prize Type
// // // //                 </label>
// // // //                 <Select
// // // //                   value={form.type}
// // // //                   onValueChange={(v) => setForm({ ...form, type: v })}
// // // //                 >
// // // //                   <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
// // // //                     <SelectValue placeholder="Select type" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     <SelectItem value="FREE_PREMIUM">
// // // //                       <span className="flex items-center gap-2">
// // // //                         <Crown className="h-3.5 w-3.5 text-amber-500" />
// // // //                         FREE_PREMIUM
// // // //                       </span>
// // // //                     </SelectItem>
// // // //                     <SelectItem value="GIFT_CARD">
// // // //                       <span className="flex items-center gap-2">
// // // //                         <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
// // // //                         GIFT_CARD
// // // //                       </span>
// // // //                     </SelectItem>
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // // //                   <Coins className="h-3.5 w-3.5" />
// // // //                   Value
// // // //                 </label>
// // // //                 <Input
// // // //                   placeholder="e.g. 150"
// // // //                   value={form.value}
// // // //                   onChange={(e) => setForm({ ...form, value: e.target.value })}
// // // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // // //                   type="number"
// // // //                   min="0"
// // // //                   step="0.01"
// // // //                 />
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // // //                   <Sparkles className="h-3.5 w-3.5" />
// // // //                   Spin Wheel Label
// // // //                 </label>
// // // //                 <Input
// // // //                   placeholder="Display on wheel"
// // // //                   value={form.spinWheelLabel}
// // // //                   onChange={(e) =>
// // // //                     setForm({
// // // //                       ...form,
// // // //                       spinWheelLabel: e.target.value,
// // // //                     })
// // // //                   }
// // // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // // //                 />
// // // //               </div>

// // // //               <div className="flex items-end">
// // // //                 <Button
// // // //                   onClick={submit}
// // // //                   disabled={loading}
// // // //                   className="h-10 w-full gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md"
// // // //                 >
// // // //                   {loading ? (
// // // //                     <Loader2 className="h-4 w-4 animate-spin" />
// // // //                   ) : (
// // // //                     <Plus className="h-4 w-4" />
// // // //                   )}
// // // //                   Create Prize
// // // //                 </Button>
// // // //               </div>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         <Card className="border-0 shadow-sm shadow-gray-200/50">
// // // //           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
// // // //             <div className="flex items-center justify-between">
// // // //               <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
// // // //                 <Trophy className="h-4 w-4 text-amber-600" />
// // // //                 All Prizes
// // // //               </CardTitle>
// // // //               <Badge variant="secondary" className="bg-amber-100 text-amber-700">
// // // //                 {prizes.length} Total
// // // //               </Badge>
// // // //             </div>
// // // //           </CardHeader>

// // // //           <CardContent className="p-0">
// // // //             {loading && prizes.length === 0 ? (
// // // //               <div className="flex flex-col items-center justify-center py-16 text-gray-500">
// // // //                 <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
// // // //                 <p className="mt-3 text-sm font-medium">Loading prizes...</p>
// // // //               </div>
// // // //             ) : prizes.length === 0 ? (
// // // //               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
// // // //                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
// // // //                   <Inbox className="h-8 w-8" />
// // // //                 </div>
// // // //                 <p className="mt-4 font-medium text-gray-600">No prizes yet</p>
// // // //                 <p className="mt-1 text-sm">Create your first prize above</p>
// // // //               </div>
// // // //             ) : (
// // // //               <>
// // // //                 <div className="hidden overflow-x-auto md:block">
// // // //                   <table className="w-full">
// // // //                     <thead>
// // // //                       <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
// // // //                         <th className="px-5 py-3.5 text-left">Title</th>
// // // //                         <th className="px-5 py-3.5 text-left">Type</th>
// // // //                         <th className="px-5 py-3.5 text-left">Value</th>
// // // //                         <th className="px-5 py-3.5 text-left">Spin Label</th>
// // // //                         <th className="px-5 py-3.5 text-left">Created</th>
// // // //                         <th className="px-5 py-3.5 text-right">Actions</th>
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody className="divide-y divide-gray-100">
// // // //                       {prizes.map((p) => (
// // // //                         <tr
// // // //                           key={p._id}
// // // //                           className="transition-colors hover:bg-gray-50/50"
// // // //                         >
// // // //                           <td className="px-5 py-4">
// // // //                             <div className="flex items-center gap-2">
// // // //                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
// // // //                                 <Gift className="h-4 w-4 text-amber-600" />
// // // //                               </div>
// // // //                               <span className="font-semibold text-gray-800">
// // // //                                 {p.title}
// // // //                               </span>
// // // //                             </div>
// // // //                           </td>
// // // //                           <td className="px-5 py-4">
// // // //                             <span
// // // //                               className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
// // // //                             >
// // // //                               {getTypeIcon(p.type)}
// // // //                               {p.type}
// // // //                             </span>
// // // //                           </td>
// // // //                           <td className="px-5 py-4">
// // // //                             <span className="font-medium text-gray-700">
// // // //                               {p.value}
// // // //                             </span>
// // // //                           </td>
// // // //                           <td className="px-5 py-4">
// // // //                             {p.spinWheelLabel ? (
// // // //                               <span className="inline-flex items-center gap-1 text-sm text-gray-600">
// // // //                                 <Sparkles className="h-3.5 w-3.5 text-amber-500" />
// // // //                                 {p.spinWheelLabel}
// // // //                               </span>
// // // //                             ) : (
// // // //                               <span className="text-sm text-gray-400">-</span>
// // // //                             )}
// // // //                           </td>
// // // //                           <td className="px-5 py-4">
// // // //                             <span className="flex items-center gap-1.5 text-sm text-gray-500">
// // // //                               <Calendar className="h-3.5 w-3.5" />
// // // //                               {new Date(p.createdAt).toLocaleDateString()}
// // // //                             </span>
// // // //                           </td>
// // // //                           <td className="px-5 py-4 text-right">
// // // //                             <ActionDropdown
// // // //                               actions={[
// // // //                                 {
// // // //                                   label: "Delete",
// // // //                                   destructive: true,
// // // //                                   onClick: () => handleDelete(p._id, p.title),
// // // //                                 },
// // // //                               ]}
// // // //                             />
// // // //                           </td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 </div>

// // // //                 <div className="divide-y divide-gray-100 md:hidden">
// // // //                   {prizes.map((p) => (
// // // //                     <div key={p._id} className="p-4">
// // // //                       <div className="flex items-start justify-between">
// // // //                         <div className="flex items-center gap-3">
// // // //                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
// // // //                             <Gift className="h-5 w-5 text-amber-600" />
// // // //                           </div>
// // // //                           <div>
// // // //                             <h3 className="font-semibold text-gray-800">
// // // //                               {p.title}
// // // //                             </h3>
// // // //                             <p className="mt-0.5 text-sm font-medium text-gray-600">
// // // //                               {p.value}
// // // //                             </p>
// // // //                           </div>
// // // //                         </div>
// // // //                         <ActionDropdown
// // // //                           actions={[
// // // //                             {
// // // //                               label: "Delete",
// // // //                               destructive: true,
// // // //                               onClick: () => handleDelete(p._id, p.title),
// // // //                             },
// // // //                           ]}
// // // //                         />
// // // //                       </div>
// // // //                       <div className="mt-3 flex flex-wrap items-center gap-2">
// // // //                         <span
// // // //                           className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
// // // //                         >
// // // //                           {getTypeIcon(p.type)}
// // // //                           {p.type}
// // // //                         </span>
// // // //                         {p.spinWheelLabel && (
// // // //                           <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
// // // //                             <Sparkles className="h-3 w-3 text-amber-500" />
// // // //                             {p.spinWheelLabel}
// // // //                           </span>
// // // //                         )}
// // // //                       </div>
// // // //                       <p className="mt-3 flex items-center gap-1 text-xs text-gray-400">
// // // //                         <Calendar className="h-3 w-3" />
// // // //                         Created {new Date(p.createdAt).toLocaleDateString()}
// // // //                       </p>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import {
// // //   fetchPrizes,
// // //   createPrize,
// // //   deletePrize,
// // //   updatePrize,
// // // } from "../store/giveaway.slice";

// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   CardTitle,
// // // } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Badge } from "@/components/ui/badge";
// // // import ActionDropdown from "../components/ActionDropdown";

// // // import {
// // //   Select,
// // //   SelectTrigger,
// // //   SelectValue,
// // //   SelectContent,
// // //   SelectItem,
// // // } from "@/components/ui/select";

// // // import {
// // //   Gift,
// // //   Plus,
// // //   Trophy,
// // //   Loader2,
// // //   Tag,
// // //   Coins,
// // //   CircleDollarSign,
// // //   Crown,
// // //   Sparkles,
// // //   Calendar,
// // //   Inbox,
// // //   Search,
// // //   X,
// // //   ListPlus,
// // //   Edit,
// // // } from "lucide-react";
// // // import { toast } from "sonner";
// // // import {
// // //   clearGiveawayStatus,
// // // } from "../store/giveaway.slice";

// // // export default function Prizes() {
// // //   const dispatch = useDispatch();
// // //   const { prizes, loading, error, successMessage } = useSelector((s) => s.giveaway);

// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     type: "",
// // //     value: "",
// // //     spinWheelLabel: "",
// // //     supportiveItems: "",
// // //   });

// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [typeFilter, setTypeFilter] = useState("ALL");
// // //   const [editingId, setEditingId] = useState(null);

// // //   useEffect(() => {
// // //     dispatch(fetchPrizes());
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     if (successMessage) {
// // //       toast.success(successMessage);
// // //       dispatch(clearGiveawayStatus());
// // //     }

// // //     if (error) {
// // //       toast.error(typeof error === "string" ? error : error.message);
// // //       dispatch(clearGiveawayStatus());
// // //     }
// // //   }, [successMessage, error, dispatch]);

// // //   const parseSupportiveItems = (itemsString) => {
// // //     if (!itemsString || typeof itemsString !== 'string') return [];
// // //     return itemsString
// // //       .split(',')
// // //       .map(item => item.trim())
// // //       .filter(item => item.length > 0);
// // //   };

// // //   const validateForm = () => {
// // //     const trimmedTitle = form.title.trim();
// // //     const trimmedType = form.type.trim();
// // //     const trimmedValue = form.value.trim();
// // //     const trimmedLabel = form.spinWheelLabel.trim();
// // //     const trimmedItems = form.supportiveItems.trim();

// // //     if (!trimmedTitle) {
// // //       toast.error("Prize title is required");
// // //       return false;
// // //     }

// // //     if (trimmedTitle.length < 3) {
// // //       toast.error("Prize title must be at least 3 characters long");
// // //       return false;
// // //     }

// // //     if (trimmedTitle.length > 100) {
// // //       toast.error("Prize title must not exceed 100 characters");
// // //       return false;
// // //     }

// // //     if (!trimmedType) {
// // //       toast.error("Please select a prize type");
// // //       return false;
// // //     }

// // //     if (!trimmedValue) {
// // //       toast.error("Prize value is required");
// // //       return false;
// // //     }

// // //     const numericValue = parseFloat(trimmedValue);

// // //     if (isNaN(numericValue)) {
// // //       toast.error("Prize value must be a valid number");
// // //       return false;
// // //     }

// // //     if (numericValue <= 0) {
// // //       toast.error("Prize value must be greater than 0");
// // //       return false;
// // //     }

// // //     if (numericValue > 1000000) {
// // //       toast.error("Prize value must not exceed 1,000,000");
// // //       return false;
// // //     }

// // //     if (!trimmedLabel) {
// // //       toast.error("Spin wheel label is required");
// // //       return false;
// // //     }

// // //     if (trimmedLabel.length < 2) {
// // //       toast.error("Spin wheel label must be at least 2 characters long");
// // //       return false;
// // //     }

// // //     if (trimmedLabel.length > 50) {
// // //       toast.error("Spin wheel label must not exceed 50 characters");
// // //       return false;
// // //     }

// // //     // Validate supportive items
// // //     const supportiveItemsArray = parseSupportiveItems(trimmedItems);
    
// // //     if (supportiveItemsArray.length < 2) {
// // //       toast.error("Please provide at least 2 supportive items separated by commas");
// // //       return false;
// // //     }

// // //     if (supportiveItemsArray.some(item => item.length < 2)) {
// // //       toast.error("Each supportive item must be at least 2 characters long");
// // //       return false;
// // //     }

// // //     if (supportiveItemsArray.some(item => item.length > 50)) {
// // //       toast.error("Each supportive item must not exceed 50 characters");
// // //       return false;
// // //     }

// // //     // Check for duplicate title only when creating (not editing)
// // //     if (!editingId) {
// // //       const duplicatePrize = prizes.find(
// // //         (p) => p.title.toLowerCase() === trimmedTitle.toLowerCase()
// // //       );

// // //       if (duplicatePrize) {
// // //         toast.error("A prize with this title already exists");
// // //         return false;
// // //       }
// // //     } else {
// // //       // When editing, check if title conflicts with other prizes
// // //       const duplicatePrize = prizes.find(
// // //         (p) => p._id !== editingId && p.title.toLowerCase() === trimmedTitle.toLowerCase()
// // //       );

// // //       if (duplicatePrize) {
// // //         toast.error("A prize with this title already exists");
// // //         return false;
// // //       }
// // //     }

// // //     return true;
// // //   };

// // //   const submit = () => {
// // //     if (!validateForm()) {
// // //       return;
// // //     }

// // //     const supportiveItemsArray = parseSupportiveItems(form.supportiveItems.trim());

// // //     const prizeData = {
// // //       title: form.title.trim(),
// // //       type: form.type.trim(),
// // //       value: parseFloat(form.value.trim()),
// // //       spinWheelLabel: form.spinWheelLabel.trim(),
// // //       supportiveItems: supportiveItemsArray,
// // //     };

// // //     if (editingId) {
// // //       dispatch(updatePrize({ id: editingId, data: prizeData }));
// // //       setEditingId(null);
// // //     } else {
// // //       dispatch(createPrize(prizeData));
// // //     }

// // //     resetForm();
// // //   };

// // //   const resetForm = () => {
// // //     setForm({
// // //       title: "",
// // //       type: "",
// // //       value: "",
// // //       spinWheelLabel: "",
// // //       supportiveItems: "",
// // //     });
// // //     setEditingId(null);
// // //   };

// // //   const handleEdit = (prize) => {
// // //     const supportiveItemsString = Array.isArray(prize.supportiveItems) 
// // //       ? prize.supportiveItems.join(', ') 
// // //       : '';

// // //     setForm({
// // //       title: prize.title,
// // //       type: prize.type,
// // //       value: prize.value.toString(),
// // //       spinWheelLabel: prize.spinWheelLabel || "",
// // //       supportiveItems: supportiveItemsString,
// // //     });
// // //     setEditingId(prize._id);
    
// // //     // Scroll to top
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   };

// // //   const handleDelete = (prizeId, prizeTitle) => {
// // //     if (window.confirm(`Are you sure you want to delete "${prizeTitle}"? This action cannot be undone.`)) {
// // //       dispatch(deletePrize(prizeId));
// // //     }
// // //   };

// // //   const getTypeIcon = (type) => {
// // //     if (type === "FREE_PREMIUM") {
// // //       return <Crown className="h-3.5 w-3.5" />;
// // //     }
// // //     if (type === "GIFT_CARD") {
// // //       return <CircleDollarSign className="h-3.5 w-3.5" />;
// // //     }
// // //     return <Gift className="h-3.5 w-3.5" />;
// // //   };

// // //   const getTypeStyles = (type) => {
// // //     if (type === "FREE_PREMIUM") {
// // //       return "bg-amber-50 text-amber-700 border-amber-200";
// // //     }
// // //     if (type === "GIFT_CARD") {
// // //       return "bg-emerald-50 text-emerald-700 border-emerald-200";
// // //     }
// // //     return "bg-gray-50 text-gray-700 border-gray-200";
// // //   };

// // //   // Filter and search logic
// // //   const filteredPrizes = prizes.filter((prize) => {
// // //     const matchesSearch = prize.title.toLowerCase().includes(searchQuery.toLowerCase());
// // //     const matchesType = typeFilter === "ALL" || prize.type === typeFilter;
// // //     return matchesSearch && matchesType;
// // //   });

// // //   return (
// // //     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
// // //       <div className="mx-auto max-w-7xl space-y-6">
// // //         <div className="flex items-center gap-3">
// // //           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
// // //             <Trophy className="h-5 w-5 text-white" />
// // //           </div>
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-gray-900">Prizes</h1>
// // //             <p className="text-sm text-gray-500">Manage giveaway prizes</p>
// // //           </div>
// // //         </div>

// // //         <Card className="border-0 shadow-sm shadow-gray-200/50">
// // //           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
// // //             <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
// // //               {editingId ? (
// // //                 <>
// // //                   <Edit className="h-4 w-4 text-blue-600" />
// // //                   Edit Prize
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <Plus className="h-4 w-4 text-amber-600" />
// // //                   Create New Prize
// // //                 </>
// // //               )}
// // //             </CardTitle>
// // //           </CardHeader>

// // //           <CardContent className="p-5">
// // //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
// // //               <div className="space-y-1.5">
// // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // //                   <Gift className="h-3.5 w-3.5" />
// // //                   Prize Title
// // //                 </label>
// // //                 <Input
// // //                   placeholder="e.g. Premium Membership"
// // //                   value={form.title}
// // //                   onChange={(e) => setForm({ ...form, title: e.target.value })}
// // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // //                 />
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // //                   <Tag className="h-3.5 w-3.5" />
// // //                   Prize Type
// // //                 </label>
// // //                 <Select
// // //                   value={form.type}
// // //                   onValueChange={(v) => setForm({ ...form, type: v })}
// // //                 >
// // //                   <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
// // //                     <SelectValue placeholder="Select type" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     <SelectItem value="FREE_PREMIUM">
// // //                       <span className="flex items-center gap-2">
// // //                         <Crown className="h-3.5 w-3.5 text-amber-500" />
// // //                         FREE_PREMIUM
// // //                       </span>
// // //                     </SelectItem>
// // //                     <SelectItem value="GIFT_CARD">
// // //                       <span className="flex items-center gap-2">
// // //                         <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
// // //                         GIFT_CARD
// // //                       </span>
// // //                     </SelectItem>
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // //                   <Coins className="h-3.5 w-3.5" />
// // //                   Value
// // //                 </label>
// // //                 <Input
// // //                   placeholder="e.g. 150"
// // //                   value={form.value}
// // //                   onChange={(e) => setForm({ ...form, value: e.target.value })}
// // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // //                   type="number"
// // //                   min="0"
// // //                   step="0.01"
// // //                 />
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // //                   <Sparkles className="h-3.5 w-3.5" />
// // //                   Spin Wheel Label
// // //                 </label>
// // //                 <Input
// // //                   placeholder="Display on wheel"
// // //                   value={form.spinWheelLabel}
// // //                   onChange={(e) =>
// // //                     setForm({
// // //                       ...form,
// // //                       spinWheelLabel: e.target.value,
// // //                     })
// // //                   }
// // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // //                 />
// // //               </div>

// // //               <div className="space-y-1.5 sm:col-span-2">
// // //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// // //                   <ListPlus className="h-3.5 w-3.5" />
// // //                   Supportive Items (Min 2, comma-separated)
// // //                 </label>
// // //                 <Input
// // //                   placeholder="e.g. Item1, Item2, Item3"
// // //                   value={form.supportiveItems}
// // //                   onChange={(e) =>
// // //                     setForm({
// // //                       ...form,
// // //                       supportiveItems: e.target.value,
// // //                     })
// // //                   }
// // //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="mt-4 flex gap-2">
// // //               <Button
// // //                 onClick={submit}
// // //                 disabled={loading}
// // //                 className="h-10 gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md"
// // //               >
// // //                 {loading ? (
// // //                   <Loader2 className="h-4 w-4 animate-spin" />
// // //                 ) : editingId ? (
// // //                   <Edit className="h-4 w-4" />
// // //                 ) : (
// // //                   <Plus className="h-4 w-4" />
// // //                 )}
// // //                 {editingId ? "Update Prize" : "Create Prize"}
// // //               </Button>

// // //               {editingId && (
// // //                 <Button
// // //                   onClick={resetForm}
// // //                   variant="outline"
// // //                   className="h-10 gap-2"
// // //                 >
// // //                   <X className="h-4 w-4" />
// // //                   Cancel
// // //                 </Button>
// // //               )}
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card className="border-0 shadow-sm shadow-gray-200/50">
// // //           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
// // //             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// // //               <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
// // //                 <Trophy className="h-4 w-4 text-amber-600" />
// // //                 All Prizes
// // //               </CardTitle>
// // //               <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-700">
// // //                 {filteredPrizes.length} of {prizes.length} Total
// // //               </Badge>
// // //             </div>

// // //             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
// // //               <div className="relative sm:col-span-2">
// // //                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// // //                 <Input
// // //                   placeholder="Search prizes by title..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   className="h-10 border-gray-200 bg-white pl-9 pr-9 focus:border-amber-300 focus:ring-amber-200"
// // //                 />
// // //                 {searchQuery && (
// // //                   <button
// // //                     onClick={() => setSearchQuery("")}
// // //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // //                   >
// // //                     <X className="h-4 w-4" />
// // //                   </button>
// // //                 )}
// // //               </div>

// // //               <Select value={typeFilter} onValueChange={setTypeFilter}>
// // //                 <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
// // //                   <SelectValue placeholder="Filter by type" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="ALL">
// // //                     <span className="flex items-center gap-2">
// // //                       <Gift className="h-3.5 w-3.5" />
// // //                       All Types
// // //                     </span>
// // //                   </SelectItem>
// // //                   <SelectItem value="FREE_PREMIUM">
// // //                     <span className="flex items-center gap-2">
// // //                       <Crown className="h-3.5 w-3.5 text-amber-500" />
// // //                       FREE_PREMIUM
// // //                     </span>
// // //                   </SelectItem>
// // //                   <SelectItem value="GIFT_CARD">
// // //                     <span className="flex items-center gap-2">
// // //                       <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
// // //                       GIFT_CARD
// // //                     </span>
// // //                   </SelectItem>
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>
// // //           </CardHeader>

// // //           <CardContent className="p-0">
// // //             {loading && prizes.length === 0 ? (
// // //               <div className="flex flex-col items-center justify-center py-16 text-gray-500">
// // //                 <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
// // //                 <p className="mt-3 text-sm font-medium">Loading prizes...</p>
// // //               </div>
// // //             ) : filteredPrizes.length === 0 ? (
// // //               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
// // //                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
// // //                   <Inbox className="h-8 w-8" />
// // //                 </div>
// // //                 <p className="mt-4 font-medium text-gray-600">
// // //                   {searchQuery || typeFilter !== "ALL" ? "No prizes found" : "No prizes yet"}
// // //                 </p>
// // //                 <p className="mt-1 text-sm">
// // //                   {searchQuery || typeFilter !== "ALL" 
// // //                     ? "Try adjusting your filters" 
// // //                     : "Create your first prize above"}
// // //                 </p>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <div className="hidden overflow-x-auto md:block">
// // //                   <table className="w-full">
// // //                     <thead>
// // //                       <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
// // //                         <th className="px-5 py-3.5 text-left">Title</th>
// // //                         <th className="px-5 py-3.5 text-left">Type</th>
// // //                         <th className="px-5 py-3.5 text-left">Value</th>
// // //                         <th className="px-5 py-3.5 text-left">Spin Label</th>
// // //                         <th className="px-5 py-3.5 text-left">Items</th>
// // //                         <th className="px-5 py-3.5 text-left">Created</th>
// // //                         <th className="px-5 py-3.5 text-right">Actions</th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-gray-100">
// // //                       {filteredPrizes.map((p) => (
// // //                         <tr
// // //                           key={p._id}
// // //                           className="transition-colors hover:bg-gray-50/50"
// // //                         >
// // //                           <td className="px-5 py-4">
// // //                             <div className="flex items-center gap-2">
// // //                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
// // //                                 <Gift className="h-4 w-4 text-amber-600" />
// // //                               </div>
// // //                               <span className="font-semibold text-gray-800">
// // //                                 {p.title}
// // //                               </span>
// // //                             </div>
// // //                           </td>
// // //                           <td className="px-5 py-4">
// // //                             <span
// // //                               className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
// // //                             >
// // //                               {getTypeIcon(p.type)}
// // //                               {p.type}
// // //                             </span>
// // //                           </td>
// // //                           <td className="px-5 py-4">
// // //                             <span className="font-medium text-gray-700">
// // //                               {p.value}
// // //                             </span>
// // //                           </td>
// // //                           <td className="px-5 py-4">
// // //                             {p.spinWheelLabel ? (
// // //                               <span className="inline-flex items-center gap-1 text-sm text-gray-600">
// // //                                 <Sparkles className="h-3.5 w-3.5 text-amber-500" />
// // //                                 {p.spinWheelLabel}
// // //                               </span>
// // //                             ) : (
// // //                               <span className="text-sm text-gray-400">-</span>
// // //                             )}
// // //                           </td>
// // //                           <td className="px-5 py-4">
// // //                             {p.supportiveItems && p.supportiveItems.length > 0 ? (
// // //                               <div className="flex flex-wrap gap-1">
// // //                                 {p.supportiveItems.slice(0, 2).map((item, idx) => (
// // //                                   <span
// // //                                     key={idx}
// // //                                     className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
// // //                                   >
// // //                                     {item}
// // //                                   </span>
// // //                                 ))}
// // //                                 {p.supportiveItems.length > 2 && (
// // //                                   <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// // //                                     +{p.supportiveItems.length - 2}
// // //                                   </span>
// // //                                 )}
// // //                               </div>
// // //                             ) : (
// // //                               <span className="text-sm text-gray-400">-</span>
// // //                             )}
// // //                           </td>
// // //                           <td className="px-5 py-4">
// // //                             <span className="flex items-center gap-1.5 text-sm text-gray-500">
// // //                               <Calendar className="h-3.5 w-3.5" />
// // //                               {new Date(p.createdAt).toLocaleDateString()}
// // //                             </span>
// // //                           </td>
// // //                           <td className="px-5 py-4 text-right">
// // //                             <ActionDropdown
// // //                               actions={[
// // //                                 {
// // //                                   label: "Edit",
// // //                                   onClick: () => handleEdit(p),
// // //                                 },
// // //                                 {
// // //                                   label: "Delete",
// // //                                   destructive: true,
// // //                                   onClick: () => handleDelete(p._id, p.title),
// // //                                 },
// // //                               ]}
// // //                             />
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>

// // //                 <div className="divide-y divide-gray-100 md:hidden">
// // //                   {filteredPrizes.map((p) => (
// // //                     <div key={p._id} className="p-4">
// // //                       <div className="flex items-start justify-between">
// // //                         <div className="flex items-center gap-3">
// // //                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
// // //                             <Gift className="h-5 w-5 text-amber-600" />
// // //                           </div>
// // //                           <div>
// // //                             <h3 className="font-semibold text-gray-800">
// // //                               {p.title}
// // //                             </h3>
// // //                             <p className="mt-0.5 text-sm font-medium text-gray-600">
// // //                               {p.value}
// // //                             </p>
// // //                           </div>
// // //                         </div>
// // //                         <ActionDropdown
// // //                           actions={[
// // //                             {
// // //                               label: "Edit",
// // //                               onClick: () => handleEdit(p),
// // //                             },
// // //                             {
// // //                               label: "Delete",
// // //                               destructive: true,
// // //                               onClick: () => handleDelete(p._id, p.title),
// // //                             },
// // //                           ]}
// // //                         />
// // //                       </div>
// // //                       <div className="mt-3 flex flex-wrap items-center gap-2">
// // //                         <span
// // //                           className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
// // //                         >
// // //                           {getTypeIcon(p.type)}
// // //                           {p.type}
// // //                         </span>
// // //                         {p.spinWheelLabel && (
// // //                           <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
// // //                             <Sparkles className="h-3 w-3 text-amber-500" />
// // //                             {p.spinWheelLabel}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       {p.supportiveItems && p.supportiveItems.length > 0 && (
// // //                         <div className="mt-3 flex flex-wrap gap-1">
// // //                           {p.supportiveItems.map((item, idx) => (
// // //                             <span
// // //                               key={idx}
// // //                               className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
// // //                             >
// // //                               {item}
// // //                             </span>
// // //                           ))}
// // //                         </div>
// // //                       )}
// // //                       <p className="mt-3 flex items-center gap-1 text-xs text-gray-400">
// // //                         <Calendar className="h-3 w-3" />
// // //                         Created {new Date(p.createdAt).toLocaleDateString()}
// // //                       </p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </>
// // //             )}
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchPrizes,
// //   createPrize,
// //   deletePrize,
// //   updatePrize,
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

// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectValue,
// //   SelectContent,
// //   SelectItem,
// // } from "@/components/ui/select";

// // import {
// //   Gift,
// //   Plus,
// //   Trophy,
// //   Loader2,
// //   Tag,
// //   Coins,
// //   CircleDollarSign,
// //   Crown,
// //   Sparkles,
// //   Calendar,
// //   Inbox,
// //   Search,
// //   X,
// //   ListPlus,
// //   Edit,
// // } from "lucide-react";
// // import { toast } from "sonner";
// // import {
// //   clearGiveawayStatus,
// // } from "../store/giveaway.slice";

// // export default function Prizes() {
// //   const dispatch = useDispatch();
// //   const { prizes, loading, error, successMessage } = useSelector((s) => s.giveaway);

// //   const [form, setForm] = useState({
// //     title: "",
// //     type: "",
// //     value: "",
// //     spinWheelLabel: "",
// //     supportiveItems: "",
// //   });

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [typeFilter, setTypeFilter] = useState("ALL");
// //   const [editingId, setEditingId] = useState(null);

// //   useEffect(() => {
// //     dispatch(fetchPrizes());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     if (successMessage) {
// //       toast.success(successMessage);
// //       dispatch(clearGiveawayStatus());
// //     }

// //     if (error) {
// //       toast.error(typeof error === "string" ? error : error.message);
// //       dispatch(clearGiveawayStatus());
// //     }
// //   }, [successMessage, error, dispatch]);

// //   const parseSupportiveItems = (itemsString) => {
// //     if (!itemsString || typeof itemsString !== 'string') return [];
// //     return itemsString
// //       .split(',')
// //       .map(item => item.trim())
// //       .filter(item => item.length > 0);
// //   };

// //   const validateForm = () => {
// //     const trimmedTitle = form.title.trim();
// //     const trimmedType = form.type.trim();
// //     const trimmedValue = form.value.trim();
// //     const trimmedLabel = form.spinWheelLabel.trim();
// //     const trimmedItems = form.supportiveItems.trim();

// //     if (!trimmedTitle) {
// //       toast.error("Prize title is required");
// //       return false;
// //     }

// //     if (trimmedTitle.length < 3) {
// //       toast.error("Prize title must be at least 3 characters long");
// //       return false;
// //     }

// //     if (trimmedTitle.length > 100) {
// //       toast.error("Prize title must not exceed 100 characters");
// //       return false;
// //     }

// //     if (!trimmedType) {
// //       toast.error("Please select a prize type");
// //       return false;
// //     }

// //     if (!trimmedValue) {
// //       toast.error("Prize value is required");
// //       return false;
// //     }

// //     const numericValue = parseFloat(trimmedValue);

// //     if (isNaN(numericValue)) {
// //       toast.error("Prize value must be a valid number");
// //       return false;
// //     }

// //     if (numericValue <= 0) {
// //       toast.error("Prize value must be greater than 0");
// //       return false;
// //     }

// //     if (numericValue > 1000000) {
// //       toast.error("Prize value must not exceed 1,000,000");
// //       return false;
// //     }

// //     if (!trimmedLabel) {
// //       toast.error("Spin wheel label is required");
// //       return false;
// //     }

// //     if (trimmedLabel.length < 2) {
// //       toast.error("Spin wheel label must be at least 2 characters long");
// //       return false;
// //     }

// //     if (trimmedLabel.length > 50) {
// //       toast.error("Spin wheel label must not exceed 50 characters");
// //       return false;
// //     }

// //     // Validate supportive items
// //     const supportiveItemsArray = parseSupportiveItems(trimmedItems);
    
// //     if (supportiveItemsArray.length < 2) {
// //       toast.error("Please provide at least 2 supportive items separated by commas");
// //       return false;
// //     }

// //     if (supportiveItemsArray.some(item => item.length < 2)) {
// //       toast.error("Each supportive item must be at least 2 characters long");
// //       return false;
// //     }

// //     if (supportiveItemsArray.some(item => item.length > 50)) {
// //       toast.error("Each supportive item must not exceed 50 characters");
// //       return false;
// //     }

// //     // Check for duplicate title only when creating (not editing)
// //     if (!editingId) {
// //       const duplicatePrize = prizes.find(
// //         (p) => p.title.toLowerCase() === trimmedTitle.toLowerCase()
// //       );

// //       if (duplicatePrize) {
// //         toast.error("A prize with this title already exists");
// //         return false;
// //       }
// //     } else {
// //       // When editing, check if title conflicts with other prizes
// //       const duplicatePrize = prizes.find(
// //         (p) => p._id !== editingId && p.title.toLowerCase() === trimmedTitle.toLowerCase()
// //       );

// //       if (duplicatePrize) {
// //         toast.error("A prize with this title already exists");
// //         return false;
// //       }
// //     }

// //     return true;
// //   };

// //   const submit = () => {
// //     if (!validateForm()) {
// //       return;
// //     }

// //     const supportiveItemsArray = parseSupportiveItems(form.supportiveItems.trim());

// //     const prizeData = {
// //       title: form.title.trim(),
// //       type: form.type.trim(),
// //       value: parseFloat(form.value.trim()),
// //       spinWheelLabel: form.spinWheelLabel.trim(),
// //       supportiveItems: supportiveItemsArray,
// //     };

// //     if (editingId) {
// //       dispatch(updatePrize({ id: editingId, data: prizeData }));
// //       setEditingId(null);
// //     } else {
// //       dispatch(createPrize(prizeData));
// //     }

// //     resetForm();
// //   };

// //   const resetForm = () => {
// //     setForm({
// //       title: "",
// //       type: "",
// //       value: "",
// //       spinWheelLabel: "",
// //       supportiveItems: "",
// //     });
// //     setEditingId(null);
// //   };

// //   const handleEdit = (prize) => {
// //     const supportiveItemsString = Array.isArray(prize.supportiveItems) 
// //       ? prize.supportiveItems.join(', ') 
// //       : '';

// //     setForm({
// //       title: prize.title || "",
// //       type: prize.type || "",
// //       value: prize.value ? prize.value.toString() : "",
// //       spinWheelLabel: prize.spinWheelLabel || "",
// //       supportiveItems: supportiveItemsString,
// //     });
// //     setEditingId(prize._id);
    
// //     // Scroll to top smoothly
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   const handleDelete = (prizeId, prizeTitle) => {
// //     if (window.confirm(`Are you sure you want to delete "${prizeTitle}"? This action cannot be undone.`)) {
// //       dispatch(deletePrize(prizeId));
      
// //       // If we're editing this prize, cancel the edit
// //       if (editingId === prizeId) {
// //         resetForm();
// //       }
// //     }
// //   };

// //   const getTypeIcon = (type) => {
// //     if (type === "FREE_PREMIUM") {
// //       return <Crown className="h-3.5 w-3.5" />;
// //     }
// //     if (type === "GIFT_CARD") {
// //       return <CircleDollarSign className="h-3.5 w-3.5" />;
// //     }
// //     return <Gift className="h-3.5 w-3.5" />;
// //   };

// //   const getTypeStyles = (type) => {
// //     if (type === "FREE_PREMIUM") {
// //       return "bg-amber-50 text-amber-700 border-amber-200";
// //     }
// //     if (type === "GIFT_CARD") {
// //       return "bg-emerald-50 text-emerald-700 border-emerald-200";
// //     }
// //     return "bg-gray-50 text-gray-700 border-gray-200";
// //   };

// //   // Filter and search logic
// //   const filteredPrizes = prizes.filter((prize) => {
// //     const matchesSearch = prize.title.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesType = typeFilter === "ALL" || prize.type === typeFilter;
// //     return matchesSearch && matchesType;
// //   });

// //   return (
// //     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
// //       <div className="mx-auto max-w-7xl space-y-6">
// //         {/* Header */}
// //         <div className="flex items-center gap-3">
// //           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
// //             <Trophy className="h-5 w-5 text-white" />
// //           </div>
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Prizes</h1>
// //             <p className="text-sm text-gray-500">Manage giveaway prizes</p>
// //           </div>
// //         </div>

// //         {/* Create/Edit Form */}
// //         <Card className="border-0 shadow-sm shadow-gray-200/50">
// //           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
// //             <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
// //               {editingId ? (
// //                 <>
// //                   <Edit className="h-4 w-4 text-blue-600" />
// //                   Edit Prize
// //                 </>
// //               ) : (
// //                 <>
// //                   <Plus className="h-4 w-4 text-amber-600" />
// //                   Create New Prize
// //                 </>
// //               )}
// //             </CardTitle>
// //           </CardHeader>

// //           <CardContent className="p-5">
// //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
// //               <div className="space-y-1.5">
// //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// //                   <Gift className="h-3.5 w-3.5" />
// //                   Prize Title *
// //                 </label>
// //                 <Input
// //                   placeholder="e.g. Premium Membership"
// //                   value={form.title}
// //                   onChange={(e) => setForm({ ...form, title: e.target.value })}
// //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// //                 />
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// //                   <Tag className="h-3.5 w-3.5" />
// //                   Prize Type *
// //                 </label>
// //                 <Select
// //                   value={form.type}
// //                   onValueChange={(v) => setForm({ ...form, type: v })}
// //                 >
// //                   <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
// //                     <SelectValue placeholder="Select type" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="FREE_PREMIUM">
// //                       <span className="flex items-center gap-2">
// //                         <Crown className="h-3.5 w-3.5 text-amber-500" />
// //                         FREE_PREMIUM
// //                       </span>
// //                     </SelectItem>
// //                     <SelectItem value="GIFT_CARD">
// //                       <span className="flex items-center gap-2">
// //                         <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
// //                         GIFT_CARD
// //                       </span>
// //                     </SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// //                   <Coins className="h-3.5 w-3.5" />
// //                   Value *
// //                 </label>
// //                 <Input
// //                   placeholder="e.g. 150"
// //                   value={form.value}
// //                   onChange={(e) => setForm({ ...form, value: e.target.value })}
// //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// //                   type="number"
// //                   min="0"
// //                   step="0.01"
// //                 />
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// //                   <Sparkles className="h-3.5 w-3.5" />
// //                   Spin Wheel Label *
// //                 </label>
// //                 <Input
// //                   placeholder="Display on wheel"
// //                   value={form.spinWheelLabel}
// //                   onChange={(e) =>
// //                     setForm({
// //                       ...form,
// //                       spinWheelLabel: e.target.value,
// //                     })
// //                   }
// //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// //                 />
// //               </div>

// //               <div className="space-y-1.5 sm:col-span-2">
// //                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
// //                   <ListPlus className="h-3.5 w-3.5" />
// //                   Supportive Items * (Min 2, comma-separated)
// //                 </label>
// //                 <Input
// //                   placeholder="e.g. Item1, Item2, Item3"
// //                   value={form.supportiveItems}
// //                   onChange={(e) =>
// //                     setForm({
// //                       ...form,
// //                       supportiveItems: e.target.value,
// //                     })
// //                   }
// //                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
// //                 />
// //               </div>
// //             </div>

// //             <div className="mt-4 flex gap-2">
// //               <Button
// //                 onClick={submit}
// //                 disabled={loading}
// //                 className="h-10 gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md hover:from-gray-800 hover:to-gray-800"
// //               >
// //                 {loading ? (
// //                   <Loader2 className="h-4 w-4 animate-spin" />
// //                 ) : editingId ? (
// //                   <Edit className="h-4 w-4" />
// //                 ) : (
// //                   <Plus className="h-4 w-4" />
// //                 )}
// //                 {editingId ? "Update Prize" : "Create Prize"}
// //               </Button>

// //               {editingId && (
// //                 <Button
// //                   onClick={resetForm}
// //                   variant="outline"
// //                   className="h-10 gap-2 border-gray-300 hover:bg-gray-50"
// //                 >
// //                   <X className="h-4 w-4" />
// //                   Cancel
// //                 </Button>
// //               )}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Prizes List */}
// //         <Card className="border-0 shadow-sm shadow-gray-200/50">
// //           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
// //             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //               <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
// //                 <Trophy className="h-4 w-4 text-amber-600" />
// //                 All Prizes
// //               </CardTitle>
// //               <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-700">
// //                 {filteredPrizes.length} of {prizes.length} Total
// //               </Badge>
// //             </div>

// //             {/* Search and Filter */}
// //             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
// //               <div className="relative sm:col-span-2">
// //                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
// //                 <Input
// //                   placeholder="Search prizes by title..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="h-10 border-gray-200 bg-white pl-9 pr-9 focus:border-amber-300 focus:ring-amber-200"
// //                 />
// //                 {searchQuery && (
// //                   <button
// //                     onClick={() => setSearchQuery("")}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                   >
// //                     <X className="h-4 w-4" />
// //                   </button>
// //                 )}
// //               </div>

// //               <Select value={typeFilter} onValueChange={setTypeFilter}>
// //                 <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
// //                   <SelectValue placeholder="Filter by type" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="ALL">
// //                     <span className="flex items-center gap-2">
// //                       <Gift className="h-3.5 w-3.5" />
// //                       All Types
// //                     </span>
// //                   </SelectItem>
// //                   <SelectItem value="FREE_PREMIUM">
// //                     <span className="flex items-center gap-2">
// //                       <Crown className="h-3.5 w-3.5 text-amber-500" />
// //                       FREE_PREMIUM
// //                     </span>
// //                   </SelectItem>
// //                   <SelectItem value="GIFT_CARD">
// //                     <span className="flex items-center gap-2">
// //                       <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
// //                       GIFT_CARD
// //                     </span>
// //                   </SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </CardHeader>

// //           <CardContent className="p-0">
// //             {loading && prizes.length === 0 ? (
// //               <div className="flex flex-col items-center justify-center py-16 text-gray-500">
// //                 <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
// //                 <p className="mt-3 text-sm font-medium">Loading prizes...</p>
// //               </div>
// //             ) : filteredPrizes.length === 0 ? (
// //               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
// //                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
// //                   <Inbox className="h-8 w-8" />
// //                 </div>
// //                 <p className="mt-4 font-medium text-gray-600">
// //                   {searchQuery || typeFilter !== "ALL" ? "No prizes found" : "No prizes yet"}
// //                 </p>
// //                 <p className="mt-1 text-sm">
// //                   {searchQuery || typeFilter !== "ALL" 
// //                     ? "Try adjusting your filters" 
// //                     : "Create your first prize above"}
// //                 </p>
// //               </div>
// //             ) : (
// //               <>
// //                 {/* Desktop Table */}
// //                 <div className="hidden overflow-x-auto md:block">
// //                   <table className="w-full">
// //                     <thead>
// //                       <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
// //                         <th className="px-5 py-3.5 text-left">Title</th>
// //                         <th className="px-5 py-3.5 text-left">Type</th>
// //                         <th className="px-5 py-3.5 text-left">Value</th>
// //                         <th className="px-5 py-3.5 text-left">Spin Label</th>
// //                         <th className="px-5 py-3.5 text-left">Items</th>
// //                         <th className="px-5 py-3.5 text-left">Created</th>
// //                         <th className="px-5 py-3.5 text-right">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-100">
// //                       {filteredPrizes.map((p) => (
// //                         <tr
// //                           key={p._id}
// //                           className={`transition-colors hover:bg-gray-50/50 ${
// //                             editingId === p._id ? 'bg-blue-50/30' : ''
// //                           }`}
// //                         >
// //                           <td className="px-5 py-4">
// //                             <div className="flex items-center gap-2">
// //                               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
// //                                 <Gift className="h-4 w-4 text-amber-600" />
// //                               </div>
// //                               <span className="font-semibold text-gray-800">
// //                                 {p.title}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-5 py-4">
// //                             <span
// //                               className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
// //                             >
// //                               {getTypeIcon(p.type)}
// //                               {p.type}
// //                             </span>
// //                           </td>
// //                           <td className="px-5 py-4">
// //                             <span className="font-medium text-gray-700">
// //                               {p.value}
// //                             </span>
// //                           </td>
// //                           <td className="px-5 py-4">
// //                             {p.spinWheelLabel ? (
// //                               <span className="inline-flex items-center gap-1 text-sm text-gray-600">
// //                                 <Sparkles className="h-3.5 w-3.5 text-amber-500" />
// //                                 {p.spinWheelLabel}
// //                               </span>
// //                             ) : (
// //                               <span className="text-sm text-gray-400">-</span>
// //                             )}
// //                           </td>
// //                           <td className="px-5 py-4">
// //                             {p.supportiveItems && p.supportiveItems.length > 0 ? (
// //                               <div className="flex flex-wrap gap-1">
// //                                 {p.supportiveItems.slice(0, 2).map((item, idx) => (
// //                                   <span
// //                                     key={idx}
// //                                     className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
// //                                   >
// //                                     {item}
// //                                   </span>
// //                                 ))}
// //                                 {p.supportiveItems.length > 2 && (
// //                                   <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
// //                                     +{p.supportiveItems.length - 2}
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             ) : (
// //                               <span className="text-sm text-gray-400">-</span>
// //                             )}
// //                           </td>
// //                           <td className="px-5 py-4">
// //                             <span className="flex items-center gap-1.5 text-sm text-gray-500">
// //                               <Calendar className="h-3.5 w-3.5" />
// //                               {new Date(p.createdAt).toLocaleDateString()}
// //                             </span>
// //                           </td>
// //                           <td className="px-5 py-4 text-right">
// //                             <ActionDropdown
// //                               actions={[
// //                                 {
// //                                   label: "Edit",
// //                                   onClick: () => handleEdit(p),
// //                                 },
// //                                 {
// //                                   label: "Delete",
// //                                   destructive: true,
// //                                   onClick: () => handleDelete(p._id, p.title),
// //                                 },
// //                               ]}
// //                             />
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Mobile Cards */}
// //                 <div className="divide-y divide-gray-100 md:hidden">
// //                   {filteredPrizes.map((p) => (
// //                     <div 
// //                       key={p._id} 
// //                       className={`p-4 ${
// //                         editingId === p._id ? 'bg-blue-50/30' : ''
// //                       }`}
// //                     >
// //                       <div className="flex items-start justify-between">
// //                         <div className="flex items-center gap-3">
// //                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
// //                             <Gift className="h-5 w-5 text-amber-600" />
// //                           </div>
// //                           <div>
// //                             <h3 className="font-semibold text-gray-800">
// //                               {p.title}
// //                             </h3>
// //                             <p className="mt-0.5 text-sm font-medium text-gray-600">
// //                               {p.value}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <ActionDropdown
// //                           actions={[
// //                             {
// //                               label: "Edit",
// //                               onClick: () => handleEdit(p),
// //                             },
// //                             {
// //                               label: "Delete",
// //                               destructive: true,
// //                               onClick: () => handleDelete(p._id, p.title),
// //                             },
// //                           ]}
// //                         />
// //                       </div>
// //                       <div className="mt-3 flex flex-wrap items-center gap-2">
// //                         <span
// //                           className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeStyles(p.type)}`}
// //                         >
// //                           {getTypeIcon(p.type)}
// //                           {p.type}
// //                         </span>
// //                         {p.spinWheelLabel && (
// //                           <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
// //                             <Sparkles className="h-3 w-3 text-amber-500" />
// //                             {p.spinWheelLabel}
// //                           </span>
// //                         )}
// //                       </div>
// //                       {p.supportiveItems && p.supportiveItems.length > 0 && (
// //                         <div className="mt-3 flex flex-wrap gap-1">
// //                           {p.supportiveItems.map((item, idx) => (
// //                             <span
// //                               key={idx}
// //                               className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
// //                             >
// //                               {item}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       )}
// //                       <p className="mt-3 flex items-center gap-1 text-xs text-gray-400">
// //                         <Calendar className="h-3 w-3" />
// //                         Created {new Date(p.createdAt).toLocaleDateString()}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPrizes,
//   createPrize,
//   deletePrize,
//   updatePrize,
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
//   Search,
//   X,
//   ListPlus,
//   Edit,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   clearGiveawayStatus,
// } from "../store/giveaway.slice";

// export default function Prizes() {
//   const dispatch = useDispatch();
//   const { prizes, loading, error, successMessage } = useSelector((s) => s.giveaway);

//   const [form, setForm] = useState({
//     title: "",
//     type: "",
//     value: "",
//     spinWheelLabel: "",
//     supportiveItems: "",
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [typeFilter, setTypeFilter] = useState("ALL");
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchPrizes());
//   }, [dispatch]);

//   useEffect(() => {
//     if (successMessage) {
//       toast.success(successMessage);
//       dispatch(clearGiveawayStatus());
//     }

//     if (error) {
//       toast.error(typeof error === "string" ? error : error.message || "An error occurred");
//       dispatch(clearGiveawayStatus());
//     }
//   }, [successMessage, error, dispatch]);

//   const parseSupportiveItems = (itemsString) => {
//     if (!itemsString || typeof itemsString !== 'string') return [];
//     return itemsString
//       .split(',')
//       .map(item => item.trim())
//       .filter(item => item.length > 0);
//   };

//   const validateForm = () => {
//     const trimmedTitle = form.title.trim();
//     const trimmedType = form.type.trim();
//     const trimmedValue = form.value.trim();
//     const trimmedLabel = form.spinWheelLabel.trim();
//     const trimmedItems = form.supportiveItems.trim();

//     if (!trimmedTitle) {
//       toast.error("Prize title is required");
//       return false;
//     }

//     if (trimmedTitle.length < 3) {
//       toast.error("Prize title must be at least 3 characters long");
//       return false;
//     }

//     if (trimmedTitle.length > 100) {
//       toast.error("Prize title must not exceed 100 characters");
//       return false;
//     }

//     if (!trimmedType) {
//       toast.error("Please select a prize type");
//       return false;
//     }

//     if (!trimmedValue) {
//       toast.error("Prize value is required");
//       return false;
//     }

//     const numericValue = parseFloat(trimmedValue);

//     if (isNaN(numericValue)) {
//       toast.error("Prize value must be a valid number");
//       return false;
//     }

//     if (numericValue <= 0) {
//       toast.error("Prize value must be greater than 0");
//       return false;
//     }

//     if (numericValue > 1000000) {
//       toast.error("Prize value must not exceed 1,000,000");
//       return false;
//     }

//     if (!trimmedLabel) {
//       toast.error("Spin wheel label is required");
//       return false;
//     }

//     if (trimmedLabel.length < 2) {
//       toast.error("Spin wheel label must be at least 2 characters long");
//       return false;
//     }

//     if (trimmedLabel.length > 50) {
//       toast.error("Spin wheel label must not exceed 50 characters");
//       return false;
//     }

//     // Validate supportive items
//     const supportiveItemsArray = parseSupportiveItems(trimmedItems);
    
//     if (supportiveItemsArray.length < 2) {
//       toast.error("Please provide at least 2 supportive items separated by commas");
//       return false;
//     }

//     if (supportiveItemsArray.some(item => item.length < 2)) {
//       toast.error("Each supportive item must be at least 2 characters long");
//       return false;
//     }

//     if (supportiveItemsArray.some(item => item.length > 50)) {
//       toast.error("Each supportive item must not exceed 50 characters");
//       return false;
//     }

//     // Check for duplicate title only when creating (not editing)
//     if (!editingId) {
//       const duplicatePrize = prizes.find(
//         (p) => p.title.toLowerCase() === trimmedTitle.toLowerCase()
//       );

//       if (duplicatePrize) {
//         toast.error("A prize with this title already exists");
//         return false;
//       }
//     } else {
//       // When editing, check if title conflicts with other prizes
//       const duplicatePrize = prizes.find(
//         (p) => p._id !== editingId && p.title.toLowerCase() === trimmedTitle.toLowerCase()
//       );

//       if (duplicatePrize) {
//         toast.error("A prize with this title already exists");
//         return false;
//       }
//     }

//     return true;
//   };

//   const submit = () => {
//     if (!validateForm()) {
//       return;
//     }

//     const supportiveItemsArray = parseSupportiveItems(form.supportiveItems.trim());

//     const prizeData = {
//       title: form.title.trim(),
//       type: form.type.trim(),
//       value: parseFloat(form.value.trim()),
//       spinWheelLabel: form.spinWheelLabel.trim(),
//       supportiveItems: supportiveItemsArray,
//     };

//     if (editingId) {
//       // IMPORTANT: Use 'data' instead of 'payload' to match the API service
//       dispatch(updatePrize({ id: editingId, data: prizeData }));
//       setEditingId(null);
//     } else {
//       dispatch(createPrize(prizeData));
//     }

//     resetForm();
//   };

//   const resetForm = () => {
//     setForm({
//       title: "",
//       type: "",
//       value: "",
//       spinWheelLabel: "",
//       supportiveItems: "",
//     });
//     setEditingId(null);
//   };

//   const handleEdit = (prize) => {
//     const supportiveItemsString = Array.isArray(prize.supportiveItems) 
//       ? prize.supportiveItems.join(', ') 
//       : '';

//     setForm({
//       title: prize.title || "",
//       type: prize.type || "",
//       value: prize.value ? prize.value.toString() : "",
//       spinWheelLabel: prize.spinWheelLabel || "",
//       supportiveItems: supportiveItemsString,
//     });
//     setEditingId(prize._id);
    
//     // Scroll to top smoothly
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDelete = (prizeId, prizeTitle) => {
//     if (window.confirm(`Are you sure you want to delete "${prizeTitle}"? This action cannot be undone.`)) {
//       dispatch(deletePrize(prizeId));
      
//       // If we're editing this prize, cancel the edit
//       if (editingId === prizeId) {
//         resetForm();
//       }
//     }
//   };

//   const getTypeIcon = (type) => {
//     if (type === "FREE_PREMIUM") {
//       return <Crown className="h-3.5 w-3.5" />;
//     }
//     if (type === "GIFT_CARD") {
//       return <CircleDollarSign className="h-3.5 w-3.5" />;
//     }
//     return <Gift className="h-3.5 w-3.5" />;
//   };

//   const getTypeStyles = (type) => {
//     if (type === "FREE_PREMIUM") {
//       return "bg-amber-50 text-amber-700 border-amber-200";
//     }
//     if (type === "GIFT_CARD") {
//       return "bg-emerald-50 text-emerald-700 border-emerald-200";
//     }
//     return "bg-gray-50 text-gray-700 border-gray-200";
//   };

//   // Filter and search logic
//   const filteredPrizes = prizes.filter((prize) => {
//     const matchesSearch = prize.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = typeFilter === "ALL" || prize.type === typeFilter;
//     return matchesSearch && matchesType;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-black shadow-lg">
//             <Trophy className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Prizes</h1>
//             <p className="text-sm text-gray-500">Manage giveaway prizes</p>
//           </div>
//         </div>

//         {/* Create/Edit Form */}
//         <Card className="border-0 shadow-sm shadow-gray-200/50">
//           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
//             <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
//               {editingId ? (
//                 <>
//                   <Edit className="h-4 w-4 text-blue-600" />
//                   Edit Prize
//                 </>
//               ) : (
//                 <>
//                   <Plus className="h-4 w-4 text-amber-600" />
//                   Create New Prize
//                 </>
//               )}
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="p-5">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Gift className="h-3.5 w-3.5" />
//                   Prize Title *
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
//                   Prize Type *
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
//                         GIFT_CARD
//                       </span>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Coins className="h-3.5 w-3.5" />
//                   Value *
//                 </label>
//                 <Input
//                   placeholder="e.g. 150"
//                   value={form.value}
//                   onChange={(e) => setForm({ ...form, value: e.target.value })}
//                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <Sparkles className="h-3.5 w-3.5" />
//                   Spin Wheel Label *
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

//               <div className="space-y-1.5 sm:col-span-2">
//                 <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
//                   <ListPlus className="h-3.5 w-3.5" />
//                   Supportive Items * (Min 2, comma-separated)
//                 </label>
//                 <Input
//                   placeholder="e.g. Item1, Item2, Item3"
//                   value={form.supportiveItems}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       supportiveItems: e.target.value,
//                     })
//                   }
//                   className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200"
//                 />
//               </div>
//             </div>

//             <div className="mt-4 flex gap-2">
//               <Button
//                 onClick={submit}
//                 disabled={loading}
//                 className="h-10 gap-2 bg-gradient-to-r from-black to-black font-medium shadow-md hover:from-gray-800 hover:to-gray-800"
//               >
//                 {loading ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : editingId ? (
//                   <Edit className="h-4 w-4" />
//                 ) : (
//                   <Plus className="h-4 w-4" />
//                 )}
//                 {editingId ? "Update Prize" : "Create Prize"}
//               </Button>

//               {editingId && (
//                 <Button
//                   onClick={resetForm}
//                   variant="outline"
//                   className="h-10 gap-2 border-gray-300 hover:bg-gray-50"
//                 >
//                   <X className="h-4 w-4" />
//                   Cancel
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Prizes List */}
//         <Card className="border-0 shadow-sm shadow-gray-200/50">
//           <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
//                 <Trophy className="h-4 w-4 text-amber-600" />
//                 All Prizes
//               </CardTitle>
//               <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-700">
//                 {filteredPrizes.length} of {prizes.length} Total
//               </Badge>
//             </div>

//             {/* Search and Filter */}
//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//               <div className="relative sm:col-span-2">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                 <Input
//                   placeholder="Search prizes by title..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="h-10 border-gray-200 bg-white pl-9 pr-9 focus:border-amber-300 focus:ring-amber-200"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>

//               <Select value={typeFilter} onValueChange={setTypeFilter}>
//                 <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200">
//                   <SelectValue placeholder="Filter by type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL">
//                     <span className="flex items-center gap-2">
//                       <Gift className="h-3.5 w-3.5" />
//                       All Types
//                     </span>
//                   </SelectItem>
//                   <SelectItem value="FREE_PREMIUM">
//                     <span className="flex items-center gap-2">
//                       <Crown className="h-3.5 w-3.5 text-amber-500" />
//                       FREE_PREMIUM
//                     </span>
//                   </SelectItem>
//                   <SelectItem value="GIFT_CARD">
//                     <span className="flex items-center gap-2">
//                       <CircleDollarSign className="h-3.5 w-3.5 text-emerald-500" />
//                       GIFT_CARD
//                     </span>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardHeader>

//           <CardContent className="p-0">
//             {loading && prizes.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 text-gray-500">
//                 <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
//                 <p className="mt-3 text-sm font-medium">Loading prizes...</p>
//               </div>
//             ) : filteredPrizes.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
//                   <Inbox className="h-8 w-8" />
//                 </div>
//                 <p className="mt-4 font-medium text-gray-600">
//                   {searchQuery || typeFilter !== "ALL" ? "No prizes found" : "No prizes yet"}
//                 </p>
//                 <p className="mt-1 text-sm">
//                   {searchQuery || typeFilter !== "ALL" 
//                     ? "Try adjusting your filters" 
//                     : "Create your first prize above"}
//                 </p>
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
//                         <th className="px-5 py-3.5 text-left">Items</th>
//                         <th className="px-5 py-3.5 text-left">Created</th>
//                         <th className="px-5 py-3.5 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {filteredPrizes.map((p) => (
//                         <tr
//                           key={p._id}
//                           className={`transition-colors hover:bg-gray-50/50 ${
//                             editingId === p._id ? 'bg-blue-50/30' : ''
//                           }`}
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
//                             {p.supportiveItems && p.supportiveItems.length > 0 ? (
//                               <div className="flex flex-wrap gap-1">
//                                 {p.supportiveItems.slice(0, 2).map((item, idx) => (
//                                   <span
//                                     key={idx}
//                                     className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
//                                   >
//                                     {item}
//                                   </span>
//                                 ))}
//                                 {p.supportiveItems.length > 2 && (
//                                   <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
//                                     +{p.supportiveItems.length - 2}
//                                   </span>
//                                 )}
//                               </div>
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
//                                   label: "Edit",
//                                   onClick: () => handleEdit(p),
//                                 },
//                                 {
//                                   label: "Delete",
//                                   destructive: true,
//                                   onClick: () => handleDelete(p._id, p.title),
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
//                   {filteredPrizes.map((p) => (
//                     <div 
//                       key={p._id} 
//                       className={`p-4 ${
//                         editingId === p._id ? 'bg-blue-50/30' : ''
//                       }`}
//                     >
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
//                               label: "Edit",
//                               onClick: () => handleEdit(p),
//                             },
//                             {
//                               label: "Delete",
//                               destructive: true,
//                               onClick: () => handleDelete(p._id, p.title),
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
//                       {p.supportiveItems && p.supportiveItems.length > 0 && (
//                         <div className="mt-3 flex flex-wrap gap-1">
//                           {p.supportiveItems.map((item, idx) => (
//                             <span
//                               key={idx}
//                               className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
//                             >
//                               {item}
//                             </span>
//                           ))}
//                         </div>
//                       )}
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
  updatePrize,
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
  Search,
  X,
  ListPlus,
  Edit,
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
    supportiveItems: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchPrizes());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearGiveawayStatus());
    }

    if (error) {
      toast.error(typeof error === "string" ? error : error.message || "An error occurred");
      dispatch(clearGiveawayStatus());
    }
  }, [successMessage, error, dispatch]);

  const parseSupportiveItems = (itemsString) => {
    if (!itemsString || typeof itemsString !== 'string') return [];
    return itemsString
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  const validateForm = () => {
    const trimmedTitle = form.title.trim();
    const trimmedType = form.type.trim();
    const trimmedValue = form.value.trim();
    const trimmedLabel = form.spinWheelLabel.trim();
    const trimmedItems = form.supportiveItems.trim();

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

    const supportiveItemsArray = parseSupportiveItems(trimmedItems);
    
    if (supportiveItemsArray.length < 2) {
      toast.error("Please provide at least 2 supportive items separated by commas");
      return false;
    }

    if (supportiveItemsArray.some(item => item.length < 2)) {
      toast.error("Each supportive item must be at least 2 characters long");
      return false;
    }

    if (supportiveItemsArray.some(item => item.length > 50)) {
      toast.error("Each supportive item must not exceed 50 characters");
      return false;
    }

    if (!editingId) {
      const duplicatePrize = prizes.find(
        (p) => p.title.toLowerCase() === trimmedTitle.toLowerCase()
      );

      if (duplicatePrize) {
        toast.error("A prize with this title already exists");
        return false;
      }
    } else {
      const duplicatePrize = prizes.find(
        (p) => p._id !== editingId && p.title.toLowerCase() === trimmedTitle.toLowerCase()
      );

      if (duplicatePrize) {
        toast.error("A prize with this title already exists");
        return false;
      }
    }

    return true;
  };

  const submit = () => {
    if (!validateForm()) {
      return;
    }

    const supportiveItemsArray = parseSupportiveItems(form.supportiveItems.trim());

    const prizeData = {
      title: form.title.trim(),
      type: form.type.trim(),
      value: parseFloat(form.value.trim()),
      spinWheelLabel: form.spinWheelLabel.trim(),
      supportiveItems: supportiveItemsArray,
    };

    if (editingId) {
      dispatch(updatePrize({ id: editingId, data: prizeData }));
      setEditingId(null);
    } else {
      dispatch(createPrize(prizeData));
    }

    resetForm();
  };

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
    const supportiveItemsString = Array.isArray(prize.supportiveItems) 
      ? prize.supportiveItems.join(', ') 
      : '';

    setForm({
      title: prize.title || "",
      type: prize.type || "",
      value: prize.value ? prize.value.toString() : "",
      spinWheelLabel: prize.spinWheelLabel || "",
      supportiveItems: supportiveItemsString,
    });
    setEditingId(prize._id);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (prizeId, prizeTitle) => {
    if (window.confirm(`Are you sure you want to delete "${prizeTitle}"? This action cannot be undone.`)) {
      dispatch(deletePrize(prizeId));
      
      if (editingId === prizeId) {
        resetForm();
      }
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

  const filteredPrizes = prizes.filter((prize) => {
    const matchesSearch = prize.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "ALL" || prize.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header - Animated */}
        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg shadow-gray-900/20 animate-in zoom-in-50 duration-500">
            <Trophy className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Prizes</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage giveaway prizes</p>
          </div>
        </div>
        {/* Create/Edit Form - Animated */}
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-xl transition-shadow">
          <CardHeader className=" pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
              {editingId ? (
                <div className="flex items-center gap-2 animate-in fade-in zoom-in-50 duration-300">
                  <Edit className="h-4 w-4 text-blue-600 animate-pulse" />
                  <span>Edit Prize</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 animate-in fade-in zoom-in-50 duration-300">
                  <Plus className="h-4 w-4 text-amber-600" />
                  <span>Create New Prize</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 bg-white">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '100ms' }}>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Gift className="h-3.5 w-3.5" />
                  Prize Title *
                </label>
                <Input
                  placeholder="e.g. Premium Membership"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '150ms' }}>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Tag className="h-3.5 w-3.5" />
                  Prize Type *
                </label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v })}
                >
                  <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300">
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

              <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '200ms' }}>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Coins className="h-3.5 w-3.5" />
                  Value *
                </label>
                <Input
                  placeholder="e.g. 150"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300"
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '250ms' }}>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  Spin Wheel Label *
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
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '300ms' }}>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <ListPlus className="h-3.5 w-3.5" />
                  Supportive Items * (Min 2, comma-separated)
                </label>
                <Input
                  placeholder="e.g. Item1, Item2, Item3"
                  value={form.supportiveItems}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      supportiveItems: e.target.value,
                    })
                  }
                  className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '350ms' }}>
              <Button
                onClick={submit}
                disabled={loading}
                className="h-10 gap-2 bg-gradient-to-r from-gray-900 to-gray-800 font-medium shadow-md hover:from-gray-800 hover:to-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingId ? (
                  <Edit className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {editingId ? "Update Prize" : "Create Prize"}
              </Button>

              {editingId && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="h-10 gap-2 border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-105 animate-in fade-in zoom-in-50 duration-300"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Prizes List - Animated */}
        <Card className="border-0 shadow-lg shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-xl transition-shadow" style={{ animationDelay: '200ms' }}>
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <Trophy className="h-4 w-4 text-amber-600 animate-pulse" />
                All Prizes
              </CardTitle>
              <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-700 border border-amber-200 animate-in fade-in zoom-in-50 duration-500">
                {filteredPrizes.length} of {prizes.length} Total
              </Badge>
            </div>

            {/* Search and Filter - Animated */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative sm:col-span-2 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: '100ms' }}>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors" />
                <Input
                  placeholder="Search prizes by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 border-gray-200 bg-white pl-9 pr-9 focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 animate-in fade-in zoom-in-50 duration-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="animate-in fade-in slide-in-from-right-2 duration-500" style={{ animationDelay: '150ms' }}>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-10 border-gray-200 bg-white focus:border-amber-300 focus:ring-amber-200 transition-all duration-200 hover:border-gray-300">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">
                      <span className="flex items-center gap-2">
                        <Gift className="h-3.5 w-3.5" />
                        All Types
                      </span>
                    </SelectItem>
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
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading && prizes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500 animate-in fade-in zoom-in-50 duration-700">
                <div className="relative">
                  <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                  <div className="absolute inset-0 h-10 w-10 border-2 border-amber-200 rounded-full animate-ping" />
                </div>
                <p className="mt-4 text-sm font-medium animate-pulse">Loading prizes...</p>
              </div>
            ) : filteredPrizes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400 animate-in fade-in zoom-in-50 duration-700">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 animate-bounce">
                  <Inbox className="h-8 w-8" />
                </div>
                <p className="mt-4 font-medium text-gray-600">
                  {searchQuery || typeFilter !== "ALL" ? "No prizes found" : "No prizes yet"}
                </p>
                <p className="mt-1 text-sm">
                  {searchQuery || typeFilter !== "ALL" 
                    ? "Try adjusting your filters" 
                    : "Create your first prize above"}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-5 py-3.5 text-left">Title</th>
                        <th className="px-5 py-3.5 text-left">Type</th>
                        <th className="px-5 py-3.5 text-left">Value</th>
                        <th className="px-5 py-3.5 text-left">Spin Label</th>
                        <th className="px-5 py-3.5 text-left">Items</th>
                        <th className="px-5 py-3.5 text-left">Created</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPrizes.map((p, index) => (
                        <tr
                          key={p._id}
                          className={`transition-all duration-200 hover:bg-gray-50/80 hover:shadow-sm animate-in fade-in slide-in-from-bottom-1 ${
                            editingId === p._id ? 'bg-blue-50/30 shadow-sm' : ''
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 group">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 transition-all duration-200 group-hover:scale-110 group-hover:bg-amber-200">
                                <Gift className="h-4 w-4 text-amber-600" />
                              </div>
                              <span className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                                {p.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 ${getTypeStyles(p.type)}`}
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
                                <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                                {p.spinWheelLabel}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            {p.supportiveItems && p.supportiveItems.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {p.supportiveItems.slice(0, 2).map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:scale-105"
                                  >
                                    {item}
                                  </span>
                                ))}
                                {p.supportiveItems.length > 2 && (
                                  <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:scale-105">
                                    +{p.supportiveItems.length - 2}
                                  </span>
                                )}
                              </div>
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
                                  label: "Edit",
                                  onClick: () => handleEdit(p),
                                },
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

                {/* Mobile Cards */}
                <div className="divide-y divide-gray-100 md:hidden">
                  {filteredPrizes.map((p, index) => (
                    <div 
                      key={p._id} 
                      className={`p-4 transition-all duration-200 hover:bg-gray-50/80 animate-in fade-in slide-in-from-bottom-2 ${
                        editingId === p._id ? 'bg-blue-50/30 border-l-4 border-blue-500' : ''
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 group">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 transition-all duration-200 group-hover:scale-110 group-hover:bg-amber-200 group-hover:shadow-md">
                            <Gift className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
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
                              label: "Edit",
                              onClick: () => handleEdit(p),
                            },
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
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 ${getTypeStyles(p.type)}`}
                        >
                          {getTypeIcon(p.type)}
                          {p.type}
                        </span>
                        {p.spinWheelLabel && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:scale-105">
                            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                            {p.spinWheelLabel}
                          </span>
                        )}
                      </div>
                      {p.supportiveItems && p.supportiveItems.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.supportiveItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:scale-105"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
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