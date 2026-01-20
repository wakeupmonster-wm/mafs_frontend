import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  type = "danger", // danger or warning
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="relative p-6 text-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div
            className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
              type === "danger"
                ? "bg-red-50 text-red-600"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            <AlertTriangle className="w-8 h-8" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-2 font-medium">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 bg-gray-50/50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-3 text-white rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] ${
              type === "danger"
                ? "bg-red-600 hover:bg-red-700 shadow-red-100"
                : "bg-orange-500 hover:bg-orange-600 shadow-orange-100"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
