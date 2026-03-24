import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react"; // Icons ke liye
import mustardLogo from "@/assets/web/mustardLogo2.webp";

export default function LogoUpload() {
  const [preview, setPreview] = useState(mustardLogo);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. File size check (Max 1MB)
      if (file.size > 1024 * 1024) {
        alert("File size is too large! Max 1MB allowed.");
        return;
      }

      // 2. Create Preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-400">Logo</label>

      {/* Container - Clickable for upload */}
      <div
        onClick={triggerFileInput}
        className="relative group w-44 h-44 bg-[#efefef] border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden transition-all"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Logo Preview"
              className="w-full h-full object-contain p-2"
            />
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="text-black w-8 h-8" />
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <Upload className="mx-auto text-gray-500 mb-2" />
            <span className="text-xs text-gray-500">Upload Logo</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-500">
          Max 1MB. Supported formats: JPEG, PNG, WebP
        </p>
        {preview && (
          <button
            onClick={() => setPreview(null)}
            className="text-[10px] text-red-500 hover:underline flex items-center gap-1 w-fit"
          >
            <X size={10} /> Remove Image
          </button>
        )}
      </div>
    </div>
  );
}
