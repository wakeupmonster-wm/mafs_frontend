/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable react-hooks/static-components */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     fetchProducts,
//     createProduct,
//     updateProduct,
// } from "../store/subscription.slice";
// import { PageHeader } from "@/components/common/headSubhead";
// import {
//     Package,
//     Plus,
//     Pencil,
//     Search,
//     Loader2,
//     Layers,
//     CheckCircle2,
//     Coins,
//     Archive,
//     Apple,
//     Smartphone,
//     Copy,
//     ArrowUpDown,
//     Hash,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Separator } from "@/components/ui/separator";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import { PreLoader } from "@/app/loader/preloader";

// const EMPTY_PRODUCT = {
//     productKey: "",
//     type: "SUBSCRIPTION",
//     displayName: "",
//     displayPrice: "",
//     currency: "AUD",
//     isActive: true,
//     sortOrder: 0,
//     planType: "monthly",
//     durationDays: 30,
//     itemCategory: "SUPER_KEEN",
//     bundleQuantity: 10,
//     appleProductId: "",
//     googleProductId: "",
// };

// export default function ProductsPage() {
//     const dispatch = useDispatch();
//     const { products, productsLoading, productsPagination, actionLoading } =
//         useSelector((state) => state.subscription);

//     const [activeTab, setActiveTab] = useState("all");
//     const [searchQuery, setSearchQuery] = useState("");

//     // Dialog States
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [formData, setFormData] = useState({ ...EMPTY_PRODUCT });
//     const [editTargetKey, setEditTargetKey] = useState(null);

//     useEffect(() => {
//         dispatch(fetchProducts({ page: 1, limit: 100 }));
//     }, [dispatch]);

//     const filteredProducts = useMemo(() => {
//         let result = products || [];

//         if (activeTab === "subscriptions") result = result.filter(p => p.type === "SUBSCRIPTION" && p.isActive);
//         else if (activeTab === "consumables") result = result.filter(p => p.type === "CONSUMABLE" && p.isActive);
//         else if (activeTab === "archived") result = result.filter(p => !p.isActive);

//         if (searchQuery) {
//             const q = searchQuery.toLowerCase();
//             result = result.filter(p =>
//                 p.displayName?.toLowerCase().includes(q) ||
//                 p.productKey?.toLowerCase().includes(q) ||
//                 p.appleProductId?.toLowerCase().includes(q) ||
//                 p.googleProductId?.toLowerCase().includes(q)
//             );
//         }

//         return [...result].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
//     }, [products, activeTab, searchQuery]);

//     const handleOpenCreate = () => {
//         setIsEditMode(false);
//         setFormData({ ...EMPTY_PRODUCT });
//         setIsFormOpen(true);
//     };

//     const handleOpenEdit = (product) => {
//         setIsEditMode(true);
//         setEditTargetKey(product.productKey);
//         setFormData({
//             ...EMPTY_PRODUCT,
//             ...product,
//             planType: product.planType || "monthly",
//             durationDays: product.durationDays || 30,
//             itemCategory: product.itemCategory || "SUPER_KEEN",
//             bundleQuantity: product.bundleQuantity || 10,
//             appleProductId: product.appleProductId || "",
//             googleProductId: product.googleProductId || "",
//             displayPrice: product.displayPrice || "",
//             currency: product.currency || "AUD",
//             sortOrder: product.sortOrder || 0,
//         });
//         setIsFormOpen(true);
//     };

//     const handleSubmit = async () => {
//         if (!formData.productKey || !formData.displayName || !formData.displayPrice) {
//             return toast.error("Product Key, Name and Price are required");
//         }
//         if (!formData.appleProductId || !formData.googleProductId) {
//             return toast.error("Apple and Google Product IDs are required");
//         }

//         const payload = { ...formData };
//         if (payload.type === "SUBSCRIPTION") {
//             delete payload.itemCategory;
//             delete payload.bundleQuantity;
//         } else {
//             delete payload.planType;
//             delete payload.durationDays;
//         }

//         if (isEditMode) {
//             const result = await dispatch(updateProduct({ productKey: editTargetKey, data: payload }));
//             if (result.meta.requestStatus === "fulfilled") {
//                 toast.success(`Product '${formData.displayName}' updated successfully!`);
//                 setIsFormOpen(false);
//             } else {
//                 toast.error(result.payload || "Failed to update product");
//             }
//         } else {
//             const result = await dispatch(createProduct(payload));
//             if (result.meta.requestStatus === "fulfilled") {
//                 toast.success(`Product '${formData.displayName}' created successfully!`);
//                 setIsFormOpen(false);
//             } else {
//                 toast.error(result.payload || "Failed to create product");
//             }
//         }
//     };

//     const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

//     const tabs = [
//         { key: "all", label: "All Products" },
//         { key: "subscriptions", label: "Subscriptions" },
//         { key: "consumables", label: "Consumables" },
//         { key: "archived", label: "Archived" },
//     ];

//     return (
//         <div className="flex flex-1 flex-col min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 pb-8 font-jakarta">
//             <motion.div
//                 className="max-w-7xl mx-auto w-full space-y-8"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 {/* Header */}
//                 <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
//                     <PageHeader
//                         heading="Product Catalog"
//                         subheading="Manage subscription plans and consumable packs."
//                         icon={<Package className="w-10 h-10 text-white" />}
//                         color="bg-brand-aqua shadow-indigo-100 shadow-xl"
//                     />
//                     <Button
//                         className="bg-brand-aqua hover:bg-brand-aqua/90 text-white rounded-2xl h-12 px-6 font-black gap-2 shadow-lg shadow-brand-aqua/20"
//                         onClick={handleOpenCreate}
//                     >
//                         <Plus className="w-4 h-4" /> Add Product
//                     </Button>
//                 </header>

//                 {/* Filter Section */}
//                 <div className="bg-white p-6 rounded-[2.5rem] border border-brand-aqua/30 shadow-xl shadow-indigo-100/50">
//                     <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6">
//                         {/* Tabs */}
//                         <div className="flex flex-wrap gap-2">
//                             {tabs.map(tab => (
//                                 <button
//                                     key={tab.key}
//                                     onClick={() => setActiveTab(tab.key)}
//                                     className={cn(
//                                         "px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
//                                         activeTab === tab.key
//                                             ? "bg-brand-aqua text-white shadow-md"
//                                             : "bg-slate-50 text-slate-500 hover:bg-slate-100"
//                                     )}
//                                 >
//                                     {tab.label}
//                                 </button>
//                             ))}
//                         </div>
//                         {/* Search */}
//                         <div className="relative group w-full xl:max-w-xs">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-aqua transition-colors" />
//                             <Input
//                                 placeholder="Search products..."
//                                 className="pl-10 h-10 rounded-2xl bg-slate-50 border-none group-focus-within:ring-2 ring-brand-aqua/20 text-xs font-bold"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-6">
//                         {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found · Sorted by display order
//                     </p>

//                     {/* Product Cards Grid with PreLoader for sync */}
//                     {productsLoading && <PreLoader />}

//                     {!productsLoading && filteredProducts.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center py-24 text-center">
//                             <Package className="w-16 h-16 text-slate-200 mb-6" />
//                             <h3 className="text-lg font-black text-slate-400 mb-2">No Products Found</h3>
//                             <p className="text-sm text-slate-400/70 font-medium">
//                                 {searchQuery ? "Try a different search term." : "Create a new product to get started."}
//                             </p>
//                         </div>
//                     ) : !productsLoading && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             <AnimatePresence>
//                                 {filteredProducts.map((product, index) => (
//                                     <motion.div
//                                         key={product.productKey}
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: -20 }}
//                                         transition={{ delay: index * 0.05 }}
//                                     >
//                                         <ProductCard
//                                             product={product}
//                                             onEdit={() => handleOpenEdit(product)}
//                                         />
//                                     </motion.div>
//                                 ))}
//                             </AnimatePresence>
//                         </div>
//                     )}
//                 </div>
//             </motion.div>

//             {/* Create/Edit Product Dialog */}
//             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//                 <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 overflow-hidden font-jakarta max-w-xl max-h-[90vh] overflow-y-auto">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-aqua/5 rounded-full -mr-16 -mt-16" />
//                     <DialogHeader>
//                         <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
//                             {isEditMode ? "Edit Product" : "Create New Product"}
//                         </DialogTitle>
//                         <DialogDescription className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
//                             {isEditMode ? `Updating: ${editTargetKey}` : "Add a new product to your catalog"}
//                         </DialogDescription>
//                     </DialogHeader>

//                     <div className="space-y-5 py-4">
//                         {/* Type Selection */}
//                         <div className="space-y-2">
//                             <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Product Type</p>
//                             <div className="grid grid-cols-2 gap-2">
//                                 <button
//                                     className={cn(
//                                         "h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border",
//                                         formData.type === "SUBSCRIPTION"
//                                             ? "bg-brand-aqua/10 text-brand-aqua border-brand-aqua/30"
//                                             : "bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100"
//                                     )}
//                                     onClick={() => updateField("type", "SUBSCRIPTION")}
//                                 >
//                                     Subscription
//                                 </button>
//                                 <button
//                                     className={cn(
//                                         "h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border",
//                                         formData.type === "CONSUMABLE"
//                                             ? "bg-amber-50 text-amber-600 border-amber-200"
//                                             : "bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100"
//                                     )}
//                                     onClick={() => updateField("type", "CONSUMABLE")}
//                                 >
//                                     Consumable
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Product Key */}
//                         <div className="space-y-2">
//                             <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Product Key (SKU)</p>
//                             <Input
//                                 placeholder="e.g. premium_3month"
//                                 className="h-12 rounded-2xl bg-slate-50 border-none font-bold font-mono text-sm"
//                                 value={formData.productKey}
//                                 onChange={(e) => updateField("productKey", e.target.value.toLowerCase().replace(/\s/g, "_"))}
//                                 disabled={isEditMode}
//                             />
//                             {isEditMode && (
//                                 <p className="text-[10px] text-slate-400 font-medium pl-1">Product key cannot be changed after creation</p>
//                             )}
//                         </div>

//                         {/* Display Name */}
//                         <div className="space-y-2">
//                             <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Display Name</p>
//                             <Input
//                                 placeholder="e.g. Gold Monthly Plan"
//                                 className="h-12 rounded-2xl bg-slate-50 border-none font-bold"
//                                 value={formData.displayName}
//                                 onChange={(e) => updateField("displayName", e.target.value)}
//                             />
//                         </div>

//                         {/* Price & Currency */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Display Price</p>
//                                 <Input
//                                     placeholder="$19.99"
//                                     className="h-12 rounded-2xl bg-slate-50 border-none font-bold"
//                                     value={formData.displayPrice}
//                                     onChange={(e) => updateField("displayPrice", e.target.value)}
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Currency</p>
//                                 <Select value={formData.currency} onValueChange={(v) => updateField("currency", v)}>
//                                     <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
//                                         <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent className="rounded-2xl">
//                                         <SelectItem value="AUD" className="font-bold">AUD</SelectItem>
//                                         <SelectItem value="USD" className="font-bold">USD</SelectItem>
//                                         <SelectItem value="INR" className="font-bold">INR</SelectItem>
//                                         <SelectItem value="EUR" className="font-bold">EUR</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>

//                         {/* Conditional Fields */}
//                         {formData.type === "SUBSCRIPTION" ? (
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Plan Type</p>
//                                     <Select value={formData.planType} onValueChange={(v) => updateField("planType", v)}>
//                                         <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent className="rounded-2xl">
//                                             <SelectItem value="weekly" className="font-bold">Weekly</SelectItem>
//                                             <SelectItem value="monthly" className="font-bold">Monthly</SelectItem>
//                                             <SelectItem value="quarterly" className="font-bold">Quarterly</SelectItem>
//                                             <SelectItem value="yearly" className="font-bold">Yearly</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Duration (Days)</p>
//                                     <Input
//                                         type="number"
//                                         placeholder="30"
//                                         className="h-12 rounded-2xl bg-slate-50 border-none font-bold"
//                                         value={formData.durationDays}
//                                         onChange={(e) => updateField("durationDays", Number(e.target.value))}
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Item Category</p>
//                                     <Select value={formData.itemCategory} onValueChange={(v) => updateField("itemCategory", v)}>
//                                         <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent className="rounded-2xl">
//                                             <SelectItem value="SUPER_KEEN" className="font-bold">Super Keen</SelectItem>
//                                             <SelectItem value="BOOST" className="font-bold">Boost</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Bundle Quantity</p>
//                                     <Input
//                                         type="number"
//                                         placeholder="10"
//                                         className="h-12 rounded-2xl bg-slate-50 border-none font-bold"
//                                         value={formData.bundleQuantity}
//                                         onChange={(e) => updateField("bundleQuantity", Number(e.target.value))}
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {/* Platform IDs */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">🍏 Apple Product ID</p>
//                                 <Input
//                                     placeholder="com.mafs.sub.1m"
//                                     className="h-12 rounded-2xl bg-slate-50 border-none font-bold text-xs font-mono"
//                                     value={formData.appleProductId}
//                                     onChange={(e) => updateField("appleProductId", e.target.value)}
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">🤖 Google Product ID</p>
//                                 <Input
//                                     placeholder="premium_1m"
//                                     className="h-12 rounded-2xl bg-slate-50 border-none font-bold text-xs font-mono"
//                                     value={formData.googleProductId}
//                                     onChange={(e) => updateField("googleProductId", e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         {/* Sort Order & Active */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-1">Sort Order</p>
//                                 <Input
//                                     type="number"
//                                     className="h-12 rounded-2xl bg-slate-50 border-none font-bold"
//                                     value={formData.sortOrder}
//                                     onChange={(e) => updateField("sortOrder", Number(e.target.value))}
//                                 />
//                             </div>
//                             <div className="flex items-end">
//                                 <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl w-full">
//                                     <div>
//                                         <p className="text-sm font-black text-slate-800">Active</p>
//                                         <p className="text-[10px] font-medium text-slate-400">Product visibility</p>
//                                     </div>
//                                     <Switch
//                                         checked={formData.isActive}
//                                         onCheckedChange={(v) => updateField("isActive", v)}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <DialogFooter>
//                         <Button
//                             variant="ghost"
//                             className="font-bold h-12 rounded-2xl"
//                             onClick={() => setIsFormOpen(false)}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             className="bg-brand-aqua h-12 rounded-2xl px-8 font-black text-white hover:bg-brand-aqua/90"
//                             onClick={handleSubmit}
//                             disabled={actionLoading}
//                         >
//                             {actionLoading ? <Loader2 className="animate-spin" /> : (isEditMode ? "Save Changes" : "Create Product")}
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

// /* ======================== PRODUCT CARD ======================== */
// const ProductCard = ({ product, onEdit }) => {
//     const isSub = product.type === "SUBSCRIPTION";

//     const copyKey = (e, text) => {
//         e.stopPropagation();
//         navigator.clipboard.writeText(text);
//         toast.info("Copied to clipboard");
//     };

//     return (
//         <Card className="rounded-[2rem] border-brand-aqua/20 hover:border-brand-aqua/60 transition-all duration-500 shadow-md hover:shadow-xl bg-white overflow-hidden group relative">
//             {/* Status Badge */}
//             <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
//                 <Badge
//                     className={cn(
//                         "text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full",
//                         product.isActive
//                             ? "bg-emerald-50 text-emerald-600 border-emerald-200"
//                             : "bg-slate-50 text-slate-400 border-slate-200"
//                     )}
//                 >
//                     {product.isActive ? "Active" : "Inactive"}
//                 </Badge>
//             </div>
//             <CardContent className="p-6 space-y-4">
//                 {/* Type & Plan Badge */}
//                 <div className="flex items-center gap-2">
//                     <Badge className={cn(
//                         "text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full",
//                         isSub
//                             ? "bg-blue-50 text-blue-600 border-blue-100"
//                             : "bg-amber-50 text-amber-600 border-amber-100"
//                     )}>
//                         {isSub ? (product.planType || "SUBSCRIPTION") : "CONSUMABLE"}
//                     </Badge>
//                     <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
//                         #{product.sortOrder || 0}
//                     </span>
//                 </div>

//                 {/* Product Name & Key */}
//                 <div>
//                     <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-brand-aqua transition-colors">
//                         {product.displayName}
//                     </h3>
//                     <div className="flex items-center gap-1.5 mt-1">
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
//                             {product.productKey}
//                         </p>
//                         <button onClick={(e) => copyKey(e, product.productKey)} className="opacity-0 group-hover:opacity-100 transition-opacity">
//                             <Copy className="w-3 h-3 text-slate-300 hover:text-brand-aqua" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Price Row */}
//                 <div className="flex items-end justify-between">
//                     <div>
//                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Price</p>
//                         <p className="text-xl font-black text-slate-900">
//                             <span className="text-xs font-bold text-slate-400 mr-1">{product.currency || "AUD"}</span>
//                             {product.displayPrice || "—"}
//                         </p>
//                     </div>
//                     <div className="text-right">
//                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                             {isSub ? "Duration" : "Quantity"}
//                         </p>
//                         <p className="text-sm font-black text-slate-700">
//                             {isSub ? `${product.durationDays || 30} days` : `${product.bundleQuantity || 0} units`}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Platform IDs */}
//                 <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-slate-50 rounded-2xl p-3">
//                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">🍏 Apple</p>
//                         <p className="text-[10px] font-bold text-slate-600 font-mono truncate">{product.appleProductId || "N/A"}</p>
//                     </div>
//                     <div className="bg-slate-50 rounded-2xl p-3">
//                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">🤖 Google</p>
//                         <p className="text-[10px] font-bold text-slate-600 font-mono truncate">{product.googleProductId || "N/A"}</p>
//                     </div>
//                 </div>

//                 {/* Edit Button */}
//                 <Button
//                     variant="ghost"
//                     className="w-full h-10 rounded-2xl bg-slate-50 hover:bg-brand-aqua/10 text-slate-500 hover:text-brand-aqua font-black text-xs gap-2 transition-all"
//                     onClick={onEdit}
//                 >
//                     <Pencil className="w-3.5 h-3.5" /> Edit Product
//                 </Button>
//             </CardContent>
//         </Card>
//     );
// };

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchProducts,
  createProduct,
  updateProduct,
} from "../store/subscription.slice";
import {
  Package,
  Plus,
  Pencil,
  Search,
  Loader2,
  Copy,
  ShoppingBag,
  LayoutGrid,
  Star,
  Archive,
  X,
  ChevronUp,
  ChevronDown,
  Info,
  Tag,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PreLoader } from "@/app/loader/preloader";

/* ─────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────── */
const EMPTY_PRODUCT = {
  productKey: "",
  type: "SUBSCRIPTION",
  category: "PREMIUM_PLAN",
  displayName: "",
  displayPrice: "",
  currency: "AUD",
  isActive: true,
  sortOrder: 0,
  planType: "monthly",
  durationDays: 30,
  itemCategory: "SUPER_KEEN",
  bundleQuantity: 10,
  appleProductId: "",
  googleProductId: "",
  badgeText: "",
  badgeColor: "#00BCD4",
  features: [],
};

const CATEGORY_MAP = {
  PREMIUM_PLAN: {
    label: "Premium Plan",
    color: "bg-brand-aqua/10 text-brand-aqua",
  },
  SUPER_KEEN: { label: "Super Keen", color: "bg-amber-50 text-amber-600" },
  SUPERCHARGE: {
    label: "Supercharge",
    color: "bg-emerald-50 text-emerald-600",
  },
};

const TYPE_MAP = {
  SUBSCRIPTION: { label: "Subscription", color: "bg-blue-50 text-blue-600" },
  CONSUMABLE: { label: "Consumable", color: "bg-amber-50 text-amber-600" },
};

/* ─────────────────────────────────────────────────
   SMALL REUSABLES
───────────────────────────────────────────────── */
const Pill = ({ label, colorCls }) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
      colorCls,
    )}
  >
    {label}
  </span>
);

const FormSection = ({ label, hint, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-1.5">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
        {label}
      </p>
      {hint && (
        <span className="group relative cursor-default">
          <Info className="w-3 h-3 text-slate-300" />
          <span className="pointer-events-none absolute left-5 -top-1 z-50 w-52 rounded-xl bg-slate-800 px-3 py-2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
            {hint}
          </span>
        </span>
      )}
    </div>
    {children}
  </div>
);

const FormInput = ({ mono, readOnly, className, ...props }) => (
  <input
    readOnly={readOnly}
    className={cn(
      "w-full h-10 px-3.5 rounded-xl text-sm font-semibold outline-none transition-all",
      readOnly
        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
        : "bg-white border border-slate-200 text-slate-800 placeholder:text-slate-300 focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/10",
      mono && "font-mono",
      className,
    )}
    {...props}
  />
);

const ReadOnlyNote = ({ text }) => (
  <p className="text-[10px] text-amber-500 font-semibold flex items-center gap-1 pl-1">
    <Info className="w-3 h-3" /> {text}
  </p>
);

/* ─────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────── */
export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, productsLoading, actionLoading } = useSelector(
    (state) => state.subscription,
  );

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...EMPTY_PRODUCT });
  const [editTargetKey, setEditTargetKey] = useState(null);
  const [sortCol, setSortCol] = useState("sortOrder");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const allProducts = products || [];
  const stats = {
    total: allProducts.length,
    subs: allProducts.filter((p) => p.type === "SUBSCRIPTION" && p.isActive)
      .length,
    consumables: allProducts.filter(
      (p) => p.type === "CONSUMABLE" && p.isActive,
    ).length,
    archived: allProducts.filter((p) => !p.isActive).length,
  };

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (activeTab === "subscriptions")
      result = result.filter((p) => p.type === "SUBSCRIPTION" && p.isActive);
    else if (activeTab === "consumables")
      result = result.filter((p) => p.type === "CONSUMABLE" && p.isActive);
    else if (activeTab === "archived")
      result = result.filter((p) => !p.isActive);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.displayName?.toLowerCase().includes(q) ||
          p.productKey?.toLowerCase().includes(q) ||
          p.appleProductId?.toLowerCase().includes(q) ||
          p.googleProductId?.toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => {
      let aVal = a[sortCol] ?? "";
      let bVal = b[sortCol] ?? "";
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [allProducts, activeTab, searchQuery, sortCol, sortDir]);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const handleOpenCreate = () => {
    setIsEditMode(false);
    setFormData({ ...EMPTY_PRODUCT });
    setIsFormOpen(true);
  };
  const handleOpenEdit = (product) => {
    setIsEditMode(true);
    setEditTargetKey(product.productKey);
    setFormData({
      ...EMPTY_PRODUCT,
      ...product,
      features: product.features || [],
      badgeText: product.badgeText || "",
      badgeColor: product.badgeColor || "#00BCD4",
      category:
        product.category ||
        (product.type === "SUBSCRIPTION" ? "PREMIUM_PLAN" : "SUPER_KEEN"),
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.productKey || !formData.displayName || !formData.displayPrice)
      return toast.error("Product Key, Name and Reference Price are required");
    if (!formData.appleProductId || !formData.googleProductId)
      return toast.error("Apple and Google Product IDs are required");

    const payload = { ...formData };
    if (payload.type === "SUBSCRIPTION") {
      delete payload.itemCategory;
      delete payload.bundleQuantity;
    } else {
      delete payload.planType;
      delete payload.durationDays;
      delete payload.features;
    }

    if (isEditMode) {
      const result = await dispatch(
        updateProduct({ productKey: editTargetKey, data: payload }),
      );
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`'${formData.displayName}' updated!`);
        setIsFormOpen(false);
      } else toast.error(result.payload || "Failed to update");
    } else {
      const result = await dispatch(createProduct(payload));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`'${formData.displayName}' created!`);
        setIsFormOpen(false);
      } else toast.error(result.payload || "Failed to create");
    }
  };

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addFeature = () =>
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }));
  const updateFeature = (i, val) =>
    setFormData((prev) => {
      const f = [...(prev.features || [])];
      f[i] = val;
      return { ...prev, features: f };
    });
  const removeFeature = (i) =>
    setFormData((prev) => {
      const f = [...(prev.features || [])];
      f.splice(i, 1);
      return { ...prev, features: f };
    });

  const tabs = [
    { key: "all", label: "All", count: stats.total },
    { key: "subscriptions", label: "Subscriptions", count: stats.subs },
    { key: "consumables", label: "Consumables", count: stats.consumables },
    { key: "archived", label: "Archived", count: stats.archived },
  ];

  const SortIcon = ({ col }) => {
    if (sortCol !== col)
      return <ChevronUp className="w-3 h-3 text-slate-300" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-brand-aqua" />
    ) : (
      <ChevronDown className="w-3 h-3 text-brand-aqua" />
    );
  };

  const ThCell = ({ label, col, className }) => (
    <th
      onClick={col ? () => handleSort(col) : undefined}
      className={cn(
        "px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap select-none",
        col && "cursor-pointer hover:text-slate-600 transition-colors",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1">
        {label} {col && <SortIcon col={col} />}
      </span>
    </th>
  );

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-slate-50 font-jakarta">
      {/* ── HEADER ── */}
      <div className="bg-white border-b border-slate-100 px-6 md:px-10 pt-7 pb-6 shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-aqua flex items-center justify-center shadow-lg shadow-brand-aqua/20 shrink-0">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  Product Catalog
                </h1>
                <p className="text-xs text-slate-400 font-medium mt-0.5 max-w-md">
                  {/* Manage display metadata for subscription plans &amp; consumables. */}
                  <span className="text-amber-500 font-bold ml-1">
                    Actual prices are set in App Store Connect &amp; Google
                    Play.
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 bg-brand-aqua hover:bg-brand-aqua/90 text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-md shadow-brand-aqua/20 transition-all hover:scale-[1.02] self-start sm:self-auto shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 border-t border-slate-100 pt-4">
            {[
              {
                label: "Total Products",
                value: stats.total,
                color: "text-slate-800",
              },
              {
                label: "Subscriptions",
                value: stats.subs,
                color: "text-brand-aqua",
              },
              {
                label: "Consumables",
                value: stats.consumables,
                color: "text-amber-500",
              },
              {
                label: "Archived",
                value: stats.archived,
                color: "text-slate-400",
              },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {s.label}
                </p>
                <p
                  className={cn(
                    "text-2xl font-black leading-none mt-0.5",
                    s.color,
                  )}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-screen-xl mx-auto w-full px-4 md:px-8 py-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex gap-0.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5",
                  activeTab === tab.key
                    ? "bg-brand-aqua text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "text-[9px] font-black px-1.5 py-0.5 rounded-full",
                    activeTab === tab.key
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-400",
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative group w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand-aqua transition-colors" />
            <input
              placeholder="Search by name, key, Apple/Google ID…"
              className="w-full pl-9 pr-4 h-9 rounded-xl bg-white border border-slate-200 focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/10 outline-none text-xs font-semibold text-slate-700 placeholder:text-slate-300 shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {productsLoading ? (
            <div className="p-12 flex justify-center">
              <PreLoader />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Package className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-base font-black text-slate-400">
                No products found
              </p>
              <p className="text-xs text-slate-400/60 font-medium mt-1">
                {searchQuery
                  ? "Try different search terms."
                  : "Click 'Add Product' to get started."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <ThCell label="Name" col="displayName" />
                    <ThCell label="Type" col="type" />
                    <ThCell label="Category" col="category" />
                    <ThCell label="Ref. Price (AUD)" col="displayPrice" />
                    <ThCell label="Apple ID" />
                    <ThCell label="Google ID" />
                    <ThCell label="Badge" />
                    <ThCell label="Status" />
                    <ThCell
                      label="Order"
                      col="sortOrder"
                      className="text-center"
                    />
                    <ThCell label="" />
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredProducts.map((product, index) => (
                      <TableRow
                        key={product.productKey}
                        product={product}
                        index={index}
                        onEdit={() => handleOpenEdit(product)}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── EDIT / CREATE DIALOG ── */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="rounded-2xl border-none shadow-2xl p-0 overflow-hidden font-jakarta max-w-2xl max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-brand-aqua px-7 pt-6 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                {isEditMode ? (
                  <Pencil className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <div>
                <p className="text-white font-black text-base leading-tight">
                  {isEditMode ? "Edit Product" : "New Product"}
                </p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  {isEditMode
                    ? `Updating · ${editTargetKey}`
                    : "Add a product to the catalog"}
                </p>
              </div>
            </div>
          </div>

          {/* Price notice banner */}
          <div className="bg-amber-50 border-b border-amber-100 px-7 py-3 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 font-semibold leading-snug">
              <span className="font-black">Note:</span> The admin cannot change
              actual prices. The reference price below is for display only. Real
              prices are fetched from{" "}
              <span className="font-black">App Store Connect</span> &amp;{" "}
              <span className="font-black">Google Play Console</span> at
              runtime.
            </p>
          </div>

          <div className="px-7 py-6 bg-white space-y-5">
            {/* Type + Category (read-only after creation) */}
            <div className="grid grid-cols-2 gap-4">
              <FormSection
                label="Product Type"
                hint={
                  isEditMode
                    ? "Type cannot be changed after creation"
                    : undefined
                }
              >
                {isEditMode ? (
                  <FormInput value={formData.type} readOnly />
                ) : (
                  <div className="grid grid-cols-2 gap-1.5">
                    {["SUBSCRIPTION", "CONSUMABLE"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          updateField("type", t);
                          updateField(
                            "category",
                            t === "SUBSCRIPTION"
                              ? "PREMIUM_PLAN"
                              : "SUPER_KEEN",
                          );
                        }}
                        className={cn(
                          "h-10 rounded-xl font-black text-[10px] uppercase tracking-wider border-2 transition-all",
                          formData.type === t
                            ? "border-brand-aqua bg-brand-aqua/5 text-brand-aqua"
                            : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300",
                        )}
                      >
                        {t === "SUBSCRIPTION" ? "Subscription" : "Consumable"}
                      </button>
                    ))}
                  </div>
                )}
                {isEditMode && (
                  <ReadOnlyNote text="Cannot be changed after creation" />
                )}
              </FormSection>

              <FormSection
                label="Category"
                hint={
                  isEditMode
                    ? "Category cannot be changed after creation"
                    : undefined
                }
              >
                {isEditMode ? (
                  <>
                    <FormInput
                      value={
                        CATEGORY_MAP[formData.category]?.label ||
                        formData.category
                      }
                      readOnly
                    />
                    <ReadOnlyNote text="Cannot be changed after creation" />
                  </>
                ) : (
                  <Select
                    value={formData.category}
                    onValueChange={(v) => updateField("category", v)}
                  >
                    <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 font-semibold text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {formData.type === "SUBSCRIPTION" ? (
                        <SelectItem
                          value="PREMIUM_PLAN"
                          className="font-semibold"
                        >
                          Premium Plan
                        </SelectItem>
                      ) : (
                        <>
                          <SelectItem
                            value="SUPER_KEEN"
                            className="font-semibold"
                          >
                            Super Keen
                          </SelectItem>
                          <SelectItem
                            value="SUPERCHARGE"
                            className="font-semibold"
                          >
                            Supercharge
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </FormSection>
            </div>

            {/* Product Key + Name */}
            <div className="grid grid-cols-2 gap-4">
              <FormSection label="Product Key (SKU)">
                <FormInput
                  placeholder="e.g. premium_monthly"
                  value={formData.productKey}
                  onChange={(e) =>
                    updateField(
                      "productKey",
                      e.target.value.toLowerCase().replace(/\s/g, "_"),
                    )
                  }
                  readOnly={isEditMode}
                  mono
                />
                {isEditMode && (
                  <ReadOnlyNote text="Cannot be changed after creation" />
                )}
              </FormSection>
              <FormSection label="Product Name">
                <FormInput
                  placeholder="e.g. Gold Monthly Plan"
                  value={formData.displayName}
                  onChange={(e) => updateField("displayName", e.target.value)}
                />
              </FormSection>
            </div>

            {/* Apple + Google IDs */}
            <div className="grid grid-cols-2 gap-4">
              <FormSection
                label="🍏 Apple Product ID"
                hint="Read-only once set. Contact dev to change."
              >
                <FormInput
                  placeholder="com.app.product.id"
                  value={formData.appleProductId}
                  onChange={(e) =>
                    updateField("appleProductId", e.target.value)
                  }
                  readOnly={isEditMode && !!formData.appleProductId}
                  mono
                />
                {isEditMode && formData.appleProductId && (
                  <ReadOnlyNote text="Read-only after first set" />
                )}
              </FormSection>
              <FormSection
                label="🤖 Google Product ID"
                hint="Read-only once set. Contact dev to change."
              >
                <FormInput
                  placeholder="product_id_here"
                  value={formData.googleProductId}
                  onChange={(e) =>
                    updateField("googleProductId", e.target.value)
                  }
                  readOnly={isEditMode && !!formData.googleProductId}
                  mono
                />
                {isEditMode && formData.googleProductId && (
                  <ReadOnlyNote text="Read-only after first set" />
                )}
              </FormSection>
            </div>

            {/* Ref Price + Currency */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <FormSection
                  label="Reference Price (AUD)"
                  hint="Display-only. Real price comes from App Store / Google Play at runtime."
                >
                  <FormInput
                    placeholder="19.99"
                    value={formData.displayPrice}
                    onChange={(e) =>
                      updateField("displayPrice", e.target.value)
                    }
                  />
                </FormSection>
              </div>
              <FormSection label="Currency">
                <Select
                  value={formData.currency}
                  onValueChange={(v) => updateField("currency", v)}
                >
                  <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 font-semibold text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {["AUD", "USD"].map((c) => (
                      <SelectItem key={c} value={c} className="font-semibold">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormSection>
            </div>

            {/* Subscription-specific */}
            {formData.type === "SUBSCRIPTION" && (
              <div className="grid grid-cols-2 gap-4">
                <FormSection label="Plan Type">
                  <Select
                    value={formData.planType}
                    onValueChange={(v) => updateField("planType", v)}
                  >
                    <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 font-semibold text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {["weekly", "monthly", "quarterly", "yearly"].map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="font-semibold capitalize"
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormSection>
                <FormSection label="Duration (Days)">
                  <FormInput
                    type="number"
                    placeholder="30"
                    value={formData.durationDays}
                    onChange={(e) =>
                      updateField("durationDays", Number(e.target.value))
                    }
                  />
                </FormSection>
              </div>
            )}

            {/* Consumable-specific */}
            {formData.type === "CONSUMABLE" && (
              <FormSection label="Bundle Quantity">
                <FormInput
                  type="number"
                  placeholder="10"
                  value={formData.bundleQuantity}
                  onChange={(e) =>
                    updateField("bundleQuantity", Number(e.target.value))
                  }
                  className="max-w-[160px]"
                />
              </FormSection>
            )}

            {/* Badge */}
            <div className="grid grid-cols-2 gap-4">
              <FormSection label="Badge Text" hint="Short label shown on product card (e.g. POPULAR, BEST VALUE)">
                <FormInput
                  placeholder="e.g. MOST POPULAR"
                  value={formData.badgeText}
                  onChange={(e) => updateField("badgeText", e.target.value)}
                />
              </FormSection>
              <FormSection label="Badge Color">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.badgeColor || "#00BCD4"}
                    onChange={(e) => updateField("badgeColor", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white"
                  />
                  <FormInput
                    placeholder="#00BCD4"
                    value={formData.badgeColor}
                    onChange={(e) => updateField("badgeColor", e.target.value)}
                    mono
                    className="flex-1"
                  />
                  {formData.badgeText && (
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full text-white shrink-0"
                      style={{ backgroundColor: formData.badgeColor || "#00BCD4" }}
                    >
                      {formData.badgeText}
                    </span>
                  )}
                </div>
              </FormSection>
            </div>

            {/* Features (subscriptions only) */}
            {formData.type === "SUBSCRIPTION" && (
              <FormSection label="Features List" hint="Bullet points shown on the subscription plan card in-app">
                <div className="space-y-2">
                  {(formData.features || []).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FormInput
                        placeholder={`Feature ${i + 1}`}
                        value={f}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        className="flex-1"
                      />
                      <button
                        onClick={() => removeFeature(i)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition-colors flex items-center justify-center shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFeature}
                    className="flex items-center gap-1.5 text-xs font-black text-brand-aqua hover:text-brand-aqua/80 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Feature
                  </button>
                </div>
              </FormSection>
            )}

            {/* Sort Order + Active */}
            <div className="grid grid-cols-2 gap-4">
              <FormSection label="Sort Order">
                <FormInput
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    updateField("sortOrder", Number(e.target.value))
                  }
                />
              </FormSection>
              <FormSection label="Status">
                <div className="flex items-center justify-between bg-slate-50 px-4 h-10 rounded-xl border border-slate-200">
                  <span
                    className={cn(
                      "text-sm font-black",
                      formData.isActive ? "text-emerald-600" : "text-slate-400",
                    )}
                  >
                    {formData.isActive ? "Active" : "Inactive"}
                  </span>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(v) => updateField("isActive", v)}
                  />
                </div>
              </FormSection>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-7 py-5 bg-slate-50 border-t border-slate-100">
            <button
              onClick={() => setIsFormOpen(false)}
              className="flex-1 h-10 rounded-xl border-2 border-slate-200 text-slate-500 font-black text-sm hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={actionLoading}
              className="flex-1 h-10 rounded-xl bg-brand-aqua hover:bg-brand-aqua/90 text-white font-black text-sm shadow-md shadow-brand-aqua/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {actionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   TABLE ROW
───────────────────────────────────────────────── */
const TableRow = ({ product, index, onEdit }) => {
  const isSub = product.type === "SUBSCRIPTION";
  const typeMeta = TYPE_MAP[product.type] || {
    label: product.type,
    color: "bg-slate-100 text-slate-500",
  };
  const catKey = product.category || (isSub ? "PREMIUM_PLAN" : "SUPER_KEEN");
  const catMeta = CATEGORY_MAP[catKey] || {
    label: catKey,
    color: "bg-slate-100 text-slate-500",
  };

  const copyText = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.info("Copied!");
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className={cn(
        "border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors group",
        !product.isActive && "opacity-50",
      )}
    >
      {/* Name */}
      <td className="px-4 py-3.5">
        <div>
          <p className="text-sm font-black text-slate-800 leading-tight">
            {product.displayName}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-mono font-bold text-slate-400">
              {product.productKey}
            </span>
            <button
              onClick={(e) => copyText(e, product.productKey)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Copy className="w-2.5 h-2.5 text-slate-300 hover:text-brand-aqua" />
            </button>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-4 py-3.5">
        <Pill label={typeMeta.label} colorCls={typeMeta.color} />
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <Pill label={catMeta.label} colorCls={catMeta.color} />
      </td>

      {/* Ref Price */}
      <td className="px-4 py-3.5">
        <span className="text-sm font-black text-slate-800">
          {product.currency || "AUD"} {product.displayPrice || "—"}
        </span>
        <p className="text-[9px] text-amber-500 font-bold uppercase tracking-wider mt-0.5">
          ref only
        </p>
      </td>

      {/* Apple ID */}
      <td className="px-4 py-3.5 max-w-[140px]">
        {product.appleProductId ? (
          <span
            className="text-[10px] font-mono font-bold text-slate-600 truncate block"
            title={product.appleProductId}
          >
            {product.appleProductId}
          </span>
        ) : (
          <span className="text-[10px] text-slate-300 font-bold">—</span>
        )}
      </td>

      {/* Google ID */}
      <td className="px-4 py-3.5 max-w-[140px]">
        {product.googleProductId ? (
          <span
            className="text-[10px] font-mono font-bold text-slate-600 truncate block"
            title={product.googleProductId}
          >
            {product.googleProductId}
          </span>
        ) : (
          <span className="text-[10px] text-slate-300 font-bold">—</span>
        )}
      </td>

      {/* Badge */}
      <td className="px-4 py-3.5">
        {product.badgeText ? (
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: product.badgeColor || "#00BCD4" }}
          >
            {product.badgeText}
          </span>
        ) : (
          <span className="text-[10px] text-slate-300 font-bold">—</span>
        )}
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <span
          className={cn(
            "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
            product.isActive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-400",
          )}
        >
          {product.isActive ? "● Active" : "○ Inactive"}
        </span>
      </td>

      {/* Sort Order */}
      <td className="px-4 py-3.5 text-center">
        <span className="text-xs font-black text-slate-400 tabular-nums">
          {product.sortOrder ?? 0}
        </span>
      </td>

      {/* Edit */}
      <td className="px-4 py-3.5">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-aqua/10 hover:text-brand-aqua text-slate-500 font-black text-[10px] uppercase tracking-wider transition-all duration-150"
        >
          <Pencil className="w-3 h-3" /> Edit
        </button>
      </td>
    </motion.tr>
  );
};
