import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  type = "danger", // danger, warning, or brand
  loading = false,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Determine header color based on type
  const headerStyle =
    type === "danger"
      ? "bg-red-600 text-white"
      : type === "brand"
      ? "bg-brand-aqua text-white"
      : "bg-orange-500 text-white";

  const buttonStyle =
    type === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100"
      : type === "brand"
      ? "bg-brand-aqua hover:bg-brand-aqua/90 text-white shadow-lg shadow-brand-aqua/20"
      : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-100";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[450px] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Header - matching Dialog UI */}
        <div className={`p-5 px-6 ${headerStyle} flex items-center justify-between`}>
          <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
            {type === "danger" && <Trash2 className="h-5 w-5" />}
            {type === "warning" && <AlertTriangle className="h-5 w-5" />}
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white min-h-[100px] flex items-center">
          <p className="text-slate-600 font-medium text-[15px] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions - matching Dialog UI */}
        <div className="p-6 bg-slate-50 border-t flex items-center gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClose}
            className="font-semibold text-slate-500"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!loading) {
                onConfirm();
              }
            }}
            disabled={loading}
            className={`min-w-[120px] h-11 ${buttonStyle}`}
          >
            {loading ? "..." : confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
