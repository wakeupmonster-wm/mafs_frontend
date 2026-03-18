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
  IconRefresh,
  IconSearch,
  IconX,
  IconPackage,
  IconShoppingBag,
  IconArchive,
  IconStack2,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PreLoader } from "@/app/loader/preloader";
import { PageHeader } from "@/components/common/headSubhead";
import StatsGrid from "@/components/common/stats.grid";
import { DataNotFound } from "@/modules/not-found/components/data.not-found";

// ─── Animation variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

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
  // Map any backend planType format to our select options
  const normalizePlanType = (raw) => {
    if (!raw) return "monthly";
    const val = raw.toLowerCase().trim();
    if (val === "monthly" || val === "1_month" || val === "1month") return "monthly";
    if (val === "quarterly" || val === "3_month" || val === "3month") return "quarterly";
    return "monthly"; // fallback
  };

  const handleOpenEdit = (product) => {
    setIsEditMode(true);
    setEditTargetKey(product.productKey);
    setFormData({
      ...EMPTY_PRODUCT,
      ...product,
      planType: normalizePlanType(product.planType),
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

  const statsData = useMemo(() => [
    { label: "Total Products", val: stats.total, icon: <IconStack2 size={22} />, color: "blue", description: "All products in catalog" },
    { label: "Subscriptions", val: stats.subs, icon: <IconPackage size={22} />, color: "emerald", description: "Active subscription plans" },
    { label: "Consumables", val: stats.consumables, icon: <IconShoppingBag size={22} />, color: "rose", description: "Active consumable packs" },
    { label: "Archived", val: stats.archived, icon: <IconArchive size={22} />, color: "blue", description: "Inactive products" },
  ], [stats]);

  const colorMap = {
    blue: "from-blue-500/40 to-blue-600/5 text-blue-600 border-blue-100",
    emerald: "from-emerald-500/40 to-emerald-600/5 text-emerald-600 border-emerald-100",
    rose: "from-rose-500/40 to-rose-600/5 text-rose-600 border-rose-100",
  };
  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-200 hover:border-blue-400",
    emerald: "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-200 hover:border-emerald-400",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-200 hover:border-rose-400",
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-2 sm:p-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 pb-8 relative font-jakarta">
      <motion.div
        className="@container/main space-y-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ─── HEADER ─── */}
        <motion.header variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex md:items-center justify-between gap-3">
            <PageHeader
              heading="Product Catalog"
              subheading="Manage subscription plans & consumable packs."
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(fetchProducts({ page: 1, limit: 100 }))}
                disabled={productsLoading}
                className="h-9 border-brand-aqua/40 hover:bg-brand-aqua/10 transition-all active:scale-95"
              >
                <IconRefresh className={cn("h-4 w-4 mr-1.5", productsLoading && "animate-spin")} />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={handleOpenCreate}
                className="h-9 bg-brand-aqua hover:bg-brand-aqua/90 text-white font-semibold shadow-md transition-all active:scale-95"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </motion.header>

        {/* ─── STATS GRID ─── */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsGrid stats={statsData} colorMap={colorMap} bgMap={bgMap} />
        </motion.div>

        {/* ─── TOOLBAR (Tabs + Search) ─── */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 p-2 rounded-xl">
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
            <div className="relative w-full sm:max-w-sm">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
              <Input
                placeholder="Search by name, key, Apple/Google ID…"
                className="pl-9 pr-10 bg-white border-slate-200 h-10 shadow-md focus-visible:ring-brand-aqua rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full p-0.5 bg-brand-aqua/30 hover:bg-brand-aqua transition-colors"
                >
                  <IconX className="h-3.5 w-3.5 text-slate-600 group-hover:text-white transition-colors" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ─── DATA TABLE ─── */}
        <motion.div variants={itemVariants}>
          <div className="block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden relative min-h-[400px]">
            {productsLoading && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-start justify-center pt-32">
                <PreLoader />
              </div>
            )}
            {!productsLoading && filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-56">
                <DataNotFound message={searchQuery ? "No products match your search" : "No products found. Click 'Add Product' to get started."} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <ThCell label="S.No." className="text-center w-16" />
                      <ThCell label="Name" col="displayName" />
                      <ThCell label="Type" col="type" />
                      <ThCell label="Category" col="category" />
                      <ThCell label="Ref. Price (AUD)" col="displayPrice" />
                      <ThCell label="Apple ID" />
                      <ThCell label="Google ID" />
                      <ThCell label="Badge" />
                      <ThCell label="Status" />
                      <ThCell label="Order" col="sortOrder" className="text-center" />
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
        </motion.div>

        {/* ─── FOOTER COUNT ─── */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between py-2 border-t border-slate-100 px-3 md:px-0">
            <div className="text-xs font-medium text-slate-500">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </div>
        </motion.div>

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
                      value={formData.planType?.toLowerCase() || "monthly"}
                      onValueChange={(v) => updateField("planType", v)}
                    >
                      <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 font-semibold text-sm">
                        <SelectValue placeholder="Select plan type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {["monthly", "quarterly"].map((t) => (
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
      </motion.div>
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
      {/* S.No. */}
      <td className="px-4 py-3.5 text-center">
        <span className="text-xs font-black text-slate-500 tabular-nums border border-slate-200 bg-slate-100/50 rounded-lg px-2 py-1">
          {index + 1}
        </span>
      </td>

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
