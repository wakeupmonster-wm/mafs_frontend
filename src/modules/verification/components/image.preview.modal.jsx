import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, X } from "lucide-react";

export function ImagePreviewModal({ config, onClose }) {
  if (!config.src) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = config.src;
    link.download = `${config.title.replace(/\s+/g, "_")}.jpg`;
    link.click();
  };

  return (
    <Dialog open={config.open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-slate-950 border-slate-800">
        <DialogHeader className="p-4 bg-white border-b flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-slate-900 flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-brand-aqua" />
            {config.title}
          </DialogTitle>
          <div className="flex items-center gap-2 mr-14">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-8"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black/40">
          <img
            src={config.src}
            alt={config.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
