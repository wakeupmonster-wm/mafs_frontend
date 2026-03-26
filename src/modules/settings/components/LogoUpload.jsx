import React, { useState, useRef, useEffect } from "react";
import { Upload, X } from "lucide-react";
import ConfirmModal from "@/components/common/ConfirmModal"; // Update with your actual path

export default function LogoUpload({ currentLogo, onFileSelect }) {
  const [preview, setPreview] = useState(currentLogo);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(currentLogo);
  }, [currentLogo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File size is too large! Max 1MB allowed.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  // Step 1: Just open the modal
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // Step 2: Actually remove after confirmation
  const handleConfirmRemove = () => {
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* Label and Format Badge */}
      <div className="flex items-center justify-between w-44">
        <label className="text-sm font-medium text-gray-400">Logo</label>
        {/* <span className="text-[10px] bg-brand-aqua/20 text-brand-aqua px-2 py-0.5 rounded uppercase font-bold">
          WebP Only
        </span> */}
      </div>

      <div
        onClick={() => fileInputRef.current.click()}
        className="relative group w-44 h-44 bg-[#efefef] border-2 border-dashed border-slate-700 hover:border-brand-aqua rounded-xl flex items-center justify-center cursor-pointer overflow-hidden transition-all"
      >
        {preview ? (
          <>
            <div className="absolute top-0 right-0.5 z-10">
              <span className="bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                WEBP
              </span>
            </div>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="text-white w-8 h-8" />
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <Upload className="mx-auto text-gray-500 mb-2" />
            <span className="text-xs text-gray-500">Upload Logo</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {preview && (
        <button
          type="button"
          onClick={handleRemoveClick}
          className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
        >
          <X size={10} /> Remove Image
        </button>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Logo?"
        message="Are you sure you want to remove the logo? This change will reflect once you save the settings."
        confirmText="Yes, Remove"
        type="danger"
      />
    </div>
  );
}
