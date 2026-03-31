import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Loader2,
  Type,
  FileText,
  ListOrdered,
  Plus,
  X,
  GripVertical,
  Send,
  Gift,
  User,
  Sparkles,
  CreditCard,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function DeliveryEmailDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  loading,
  delivery,
}) {
  const [form, setForm] = useState({
    couponCode: "",
    giftCardExpiryDate: "",
    actualDeliveredValue: "",
    title: "",
    subject: "",
    description: "",
    steps: [""],
  });
  const [showEmailCustomize, setShowEmailCustomize] = useState(false);

  // Reset form when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setForm({
        couponCode: "",
        giftCardExpiryDate: "",
        actualDeliveredValue: delivery?.prize?.value?.toString() || "",
        title: delivery?.prize?.title
          ? `Your ${delivery.prize.title} Gift Card is Here!`
          : "Your Gift Card is Here!",
        subject: delivery?.prize?.title
          ? `🎉 Congratulations! Your ${delivery.prize.title} Prize`
          : "🎉 Congratulations! Your Prize Awaits",
        description: "",
        steps: [""],
      });
      setShowEmailCustomize(false);
    }
  }, [isOpen, delivery]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (index, value) => {
    setForm((prev) => {
      const steps = [...prev.steps];
      steps[index] = value;
      return { ...prev, steps };
    });
  };

  const addStep = () => {
    setForm((prev) => ({ ...prev, steps: [...prev.steps, ""] }));
  };

  const removeStep = (index) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const isValid = form.couponCode.trim() && form.giftCardExpiryDate?.trim();

  const handleSubmit = () => {
    if (!isValid) return;
    // Filter out empty steps
    const cleanSteps = form.steps.filter((s) => s.trim());

    // Build final payload
    const payload = {
      couponCode: form.couponCode.trim(),
      giftCardExpiryDate: form.giftCardExpiryDate?.trim() || "",
    };

    // Only add actualDeliveredValue if provided
    if (form.actualDeliveredValue && !isNaN(form.actualDeliveredValue)) {
      payload.actualDeliveredValue = parseFloat(form.actualDeliveredValue);
    }

    // Only add emailTemplate if any email field is filled
    const hasEmailCustomization = form.title.trim() || form.subject.trim() || form.description.trim() || cleanSteps.length > 0;
    if (hasEmailCustomization) {
      payload.emailTemplate = {
        title: form.title.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
        steps: cleanSteps,
      };
    }

    onSubmit(payload);
  };

  const winner = delivery?.user;
  const prize = delivery?.prize;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl border-slate-200">
        {/* ─── Header ─── */}
        <DialogHeader className="p-5 sm:p-6 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-brand-aqua p-2.5 rounded-xl shadow-lg shadow-brand-aqua/20">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-black tracking-tight text-slate-900">
                Delivery Email Template
              </DialogTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Compose the email that will be sent to the winner
              </p>
            </div>
          </div>

          {/* Winner & Prize Summary */}
          {(winner || prize) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {winner && (
                <Badge
                  variant="outline"
                  className="bg-slate-50 border-slate-200 text-slate-600 text-[11px] font-semibold gap-1.5 py-1 px-2.5"
                >
                  <User className="h-3 w-3 text-brand-aqua" />
                  {winner?.email || winner?.phone || "Winner"}
                </Badge>
              )}
              {prize && (
                <Badge
                  variant="outline"
                  className="bg-brand-aqua/5 border-brand-aqua/20 text-brand-aqua text-[11px] font-semibold gap-1.5 py-1 px-2.5"
                >
                  <Gift className="h-3 w-3" />
                  {prize?.title || "Gift Card"}
                </Badge>
              )}
            </div>
          )}
        </DialogHeader>

        {/* ─── Form ─── */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* ─── REQUIRED: Voucher Code ─── */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <CreditCard className="h-3 w-3" />
              Voucher / Gift Card Code <span className="text-rose-400">*</span>
            </label>
            <Input
              value={form.couponCode}
              onChange={(e) => handleChange("couponCode", e.target.value)}
              placeholder="e.g. AMZN-XXXX-YYYY-ZZZZ"
              className={cn(
                "h-11 rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-mono font-medium tracking-wider",
                !form.couponCode.trim() && "border-rose-200 bg-rose-50/30"
              )}
            />
            {!form.couponCode.trim() && (
              <p className="text-[10px] text-rose-500 font-medium">
                Voucher code is required to mark as delivered
              </p>
            )}
          </div>

          {/* ─── REQUIRED: Expiry Date ─── */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              Gift Card Expiry Date <span className="text-rose-400">*</span>
            </label>
            <Input
              type="date"
              value={form.giftCardExpiryDate}
              onChange={(e) => handleChange("giftCardExpiryDate", e.target.value)}
              className={cn(
                "h-11 rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-medium",
                !form.giftCardExpiryDate?.trim() && "border-rose-200 bg-rose-50/30"
              )}
            />
            {!form.giftCardExpiryDate?.trim() && (
              <p className="text-[10px] text-rose-500 font-medium">
                Expiry date is required to mark as delivered.
              </p>
            )}
          </div>

          {/* ─── OPTIONAL: Actual Delivered Value ─── */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <DollarSign className="h-3 w-3" />
              Actual Delivered Value <span className="text-slate-300 normal-case font-normal">(Optional)</span>
            </label>
            <Input
              type="number"
              value={form.actualDeliveredValue}
              onChange={(e) => handleChange("actualDeliveredValue", e.target.value)}
              placeholder={prize?.value ? `Original: $${prize.value}` : "e.g. 50"}
              className="h-11 rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-medium"
            />
          </div>

          {/* ─── Divider ─── */}
          <div className="h-px bg-slate-100" />

          {/* ─── Collapsible Email Customization ─── */}
          <button
            type="button"
            onClick={() => setShowEmailCustomize(!showEmailCustomize)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
          >
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Mail className="h-3.5 w-3.5 text-brand-aqua" />
              ✉️ Customize Email (Optional)
            </span>
            {showEmailCustomize ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {showEmailCustomize && (
            <div className="space-y-5 pt-1">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Type className="h-3 w-3" />
                  Email Title <span className="text-rose-400">*</span>
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Your Gift Card is Here!"
                  className="h-11 rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-medium"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Mail className="h-3 w-3" />
                  Email Subject <span className="text-rose-400">*</span>
                </label>
                <Input
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  placeholder="e.g. 🎉 Congratulations! Your Prize Awaits"
                  className="h-11 rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-medium"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <FileText className="h-3 w-3" />
                  Description
                </label>
                <Textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="e.g. We are thrilled to deliver your gift card prize! Below you'll find the details and instructions on how to redeem your reward."
                  rows={3}
                  className="rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-medium resize-none"
                />
              </div>

              {/* How to Redeem Steps */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <ListOrdered className="h-3 w-3" />
                    How to Redeem (Steps)
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addStep}
                    className="h-7 text-[10px] font-bold uppercase tracking-widest text-brand-aqua hover:text-brand-aqua hover:bg-brand-aqua/10 gap-1 px-2"
                  >
                    <Plus className="h-3 w-3" /> Add Step
                  </Button>
                </div>

                <div className="space-y-2.5">
                  {form.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 group">
                      {/* Step Number */}
                      <div className="flex items-center gap-1 pt-2.5 flex-shrink-0">
                        <GripVertical className="h-3.5 w-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="w-6 h-6 rounded-lg bg-brand-aqua/10 text-brand-aqua text-[10px] font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                      </div>

                      {/* Step Input */}
                      <Input
                        value={step}
                        onChange={(e) => handleStepChange(idx, e.target.value)}
                        placeholder={
                          idx === 0
                            ? 'e.g. Open the "Gift Cards" section in the app'
                            : `Step ${idx + 1} description...`
                        }
                        className="h-10 rounded-xl border-slate-200 focus:border-brand-aqua focus:ring-brand-aqua/20 text-sm font-medium flex-1"
                      />

                      {/* Remove Button */}
                      {form.steps.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(idx)}
                          className="h-10 w-10 flex-shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Live Preview ─── */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Preview
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                  {/* Preview Title */}
                  <h4 className="text-base font-bold text-slate-800">
                    {form.title || "Email Title"}
                  </h4>
                  {/* Preview Subject */}
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Subject:</span>{" "}
                    {form.subject || "Email Subject"}
                  </p>
                  {/* Preview Description */}
                  {form.description && (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {form.description}
                    </p>
                  )}
                  {/* Preview Steps */}
                  {form.steps.filter((s) => s.trim()).length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        How to Redeem:
                      </p>
                      <ol className="list-none space-y-1.5">
                        {form.steps
                          .filter((s) => s.trim())
                          .map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm text-slate-700"
                            >
                              <span className="w-5 h-5 rounded-md bg-brand-aqua/10 text-brand-aqua text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Footer ─── */}
        <DialogFooter className="p-5 sm:p-6 pt-0 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-xl border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className={cn(
              "flex-1 h-11 rounded-xl font-bold text-xs uppercase tracking-widest gap-2 shadow-lg transition-all active:scale-95",
              "bg-brand-aqua hover:bg-brand-aqua/90 text-white shadow-brand-aqua/20"
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {loading ? "Sending..." : "Mark Delivered & Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
