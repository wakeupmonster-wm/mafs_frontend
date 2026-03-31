import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiConnector } from "@/services/axios/axios.connector";
import { SUBSCRIPTION_ENDPOINTS } from "@/services/api-enpoints/subscriptions.endpoints";
import { AnimatePresence, motion } from "framer-motion";

export const PrizeDialog = ({
  isOpen,
  onOpenChange,
  form,
  setForm,
  onSubmit,
  loading,
  isEditing,
}) => {
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  // Clear errors when dialog opens/closes and fetch dropdown if needed
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    } else {
      const fetchProducts = async () => {
        try {
          if (products.length > 0) return; // avoid refetch if already have
          setFetchingProducts(true);
          const res = await apiConnector("GET", SUBSCRIPTION_ENDPOINTS.LIST_PRODUCTS);
          let fetchedProducts = [];

          if (res && res.data) {
            fetchedProducts = res.data;
          } else if (Array.isArray(res)) {
            fetchedProducts = res;
          } else if (res && res.products) {
            fetchedProducts = res.products;
          }

          if (fetchedProducts?.length > 0) {
            setProducts(fetchedProducts.filter((p) => p.type === "SUBSCRIPTION"));
          }
        } catch (e) {
          console.error("Failed to fetch products:", e);
        } finally {
          setFetchingProducts(false);
        }
      };
      // Only fetch if they aren't fetched yet or we want fresh.
      fetchProducts();
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!form.title?.trim()) newErrors.title = "Prize title is required";
    if (!form.type) newErrors.type = "Please select a prize type";

    // if (form.type === "FREE_PREMIUM") {
    //   if (!form.planType) newErrors.planType = "Please select a plan type";
    //   if (!form.durationInDays || isNaN(form.durationInDays) || Number(form.durationInDays) <= 0) {
    //     newErrors.durationInDays = "Valid duration is required";
    //   }
    // } else {
    if (!form.value || isNaN(form.value)) {
      newErrors.value = "Valid value is required";
    } else if (Number(form.value) <= 0) {
      newErrors.value = "Value must be greater than 0";
    }
    // }

    if (!form.spinWheelLabel?.trim()) {
      newErrors.spinWheelLabel = "Spin wheel label is required";
    }

    // Validate supportive items (min 2 tags)
    if (!form.supportiveItems || form.supportiveItems.length < 2) {
      newErrors.supportiveItems = "At least 2 supportive items are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAction = () => {
    if (validate()) {
      onSubmit();
    }
  };

  const ErrorMsg = ({ msg }) => (
    <p className="text-[10px] font-medium text-red-500 flex items-center gap-1 mt-1">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto gap-0 p-0 border-none shadow-2xl">
        <DialogHeader className="p-6 bg-brand-aqua text-white">
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isEditing ? "Update Prize Details" : "Create New Prize Asset"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5 bg-white">
          {/* Prize Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Prize Title
            </Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Premium Membership"
              className={cn(
                "h-11",
                errors.title && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.title && <ErrorMsg msg={errors.title} />}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Type
              </Label>
              {/* <Select
                value={form.type}
                onValueChange={(v) => {
                  if (v === form.type) return;
                  if (v === "FREE_PREMIUM") {
                    setForm({ ...form, type: v, value: "" });
                  } else {
                    setForm({ ...form, type: v, planType: "", durationInDays: "" });
                  }
                }}
              >
                <SelectTrigger
                  className={cn("h-11", errors.type && "border-red-500")}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE_PREMIUM">Free Premium</SelectItem>
                  <SelectItem value="GIFT_CARD">Gift Card</SelectItem>
                </SelectContent>
              </Select> */}

              <Input
                value="Gift Card"
                disabled
                className="h-11 bg-slate-50 font-medium text-slate-500 cursor-not-allowed border-slate-200"
              />
              {errors.type && <ErrorMsg msg={errors.type} />}
            </div>

            {/* Value OR Plan / Duration based on Type */}
            {/* {form.type === "FREE_PREMIUM" ? (
              <>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Plan Type
                  </Label>
                  <Select
                    value={form.planType}
                    onValueChange={(v) => setForm({ ...form, planType: v })}
                    disabled={fetchingProducts}
                  >
                    <SelectTrigger
                      className={cn("h-11", errors.planType && "border-red-500")}
                    >
                      <SelectValue placeholder={fetchingProducts ? "Loading..." : "Select plan"} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p, idx) => {
                        const planValue = p.planType || p.productKey || p.name || p.id || String(idx);
                        return (
                          <SelectItem key={idx} value={planValue}>
                            {p.displayName || p.name || planValue} - {p.displayPrice || p.price || 0}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.planType && <ErrorMsg msg={errors.planType} />}
                </div>

                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Duration in Days
                  </Label>
                  <Input
                    type="number"
                    value={form.durationInDays}
                    onChange={(e) => setForm({ ...form, durationInDays: e.target.value })}
                    className={cn(
                      "h-11",
                      errors.durationInDays && "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="e.g. 10"
                  />
                  {errors.durationInDays && <ErrorMsg msg={errors.durationInDays} />}
                </div>
              </>
            ) : ( */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Value
              </Label>
              <Input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className={cn(
                  "h-11",
                  errors.value && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.value && <ErrorMsg msg={errors.value} />}
            </div>
            {/* )} */}


            {/* Spin Wheel Label */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Spin Wheel Label
              </Label>
              <Input
                value={form.spinWheelLabel}
                placeholder="Display text on wheel"
                onChange={(e) =>
                  setForm({ ...form, spinWheelLabel: e.target.value })
                }
                className={cn(
                  "h-11",
                  errors.spinWheelLabel &&
                  "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.spinWheelLabel && <ErrorMsg msg={errors.spinWheelLabel} />}
            </div>
          </div>

          {/* Description (Optional) */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Description <span className="text-slate-400 normal-case font-normal">(Optional)</span>
            </Label>
            <textarea
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Short info about the prize, e.g. Redeem on Amazon Australia"
              rows={2}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua resize-none"
            />
          </div>


          {/* Supportive Items (Tag System) */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500 flex justify-between">
              Supportive Items
              <span className={cn("normal-case font-normal", form.supportiveItems?.length >= 2 ? "text-slate-400" : "text-amber-500")}>
                {form.supportiveItems?.length || 0} items added (min 2)
              </span>
            </Label>

            <div className={cn(
              "min-h-[44px] p-2 rounded-md border bg-white flex flex-wrap gap-2 transition-all focus-within:ring-2 focus-within:ring-brand-aqua/20 focus-within:border-brand-aqua",
              errors.supportiveItems ? "border-red-500" : "border-slate-200"
            )}>
              <AnimatePresence>
                {form.supportiveItems?.map((item, index) => (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-aqua/10 text-brand-aqua text-xs font-bold border border-brand-aqua/20"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = form.supportiveItems.filter((_, i) => i !== index);
                        setForm({ ...form, supportiveItems: newItems });
                      }}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>

              <input
                className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] h-7"
                placeholder={form.supportiveItems?.length >= 2 ? "Add more..." : "Type and press Enter..."}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = e.target.value.trim();
                    if (val && !form.supportiveItems.includes(val)) {
                      setForm({
                        ...form,
                        supportiveItems: [...form.supportiveItems, val]
                      });
                      e.target.value = "";
                    }
                  }
                }}
              />
            </div>
            {errors.supportiveItems && <ErrorMsg msg={errors.supportiveItems} />}
            <p className="text-[10px] text-slate-400 italic">
              Create tags by typing and pressing **Enter**.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="font-semibold text-slate-500"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAction}
            disabled={loading}
            className="bg-brand-aqua hover:bg-brand-aqua/90 text-white min-w-[140px] h-11 shadow-lg shadow-brand-aqua/20"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Prize"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
