import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, FileText, Camera } from "lucide-react";

export function ImagePreviewModal({ config, onClose }) {
  // Check if we have a single src or an array of images
  const hasImages = config.images && config.images.length > 0;
  if (!config.src && !hasImages) return null;

  // Handle single or multiple images
  const displayImages = hasImages
    ? config.images
    : [{ src: config.src, label: config.title }];

  const handleDownload = (imgUrl, label) => {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `${label.replace(/\s+/g, "_")}.jpg`;
    link.click();
  };

  return (
    <Dialog open={config.open} onOpenChange={onClose} className="">
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] flex flex-col gap-2 p-0 overflow-hidden bg-slate-50 border-slate-200">
        <DialogHeader className="p-4 bg-white border-b flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-slate-900 flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-brand-aqua" />
            {config.title || "Verification Documents"}
          </DialogTitle>
        </DialogHeader>

        {/* Comparison Grid */}
        <div
          className={`flex-1 overflow-auto px-6 py-2 bg-slate-100/50 grid gap-6 ${
            displayImages.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {displayImages.map((img, index) => (
            <div key={index} className="flex flex-col gap-3 group">
              <div className="flex items-center justify-between bg-white p-2 rounded-t-lg border-x border-t px-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  {img.label.toLowerCase().includes("selfie") ? (
                    <Camera className="w-3 h-3" />
                  ) : (
                    <FileText className="w-3 h-3" />
                  )}
                  {img.label}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(img.src, img.label)}
                  className="h-7 text-[10px] gap-1 hover:bg-brand-aqua/10 hover:text-brand-aqua"
                >
                  <Download className="w-3 h-3" /> Download
                </Button>
              </div>

              <div className="flex-1 bg-white border rounded-b-lg overflow-hidden shadow-sm flex items-center justify-center p-2 relative">
                <img
                  src={img.src}
                  alt={img.label}
                  className="max-w-full max-h-[65vh] object-contain transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
