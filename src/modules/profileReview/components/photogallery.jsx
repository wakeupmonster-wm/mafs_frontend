import { Card } from "@/components/ui/card";
import { ImageIcon, Maximize2, CameraOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const PhotoGallery = ({ photos, onImageClick }) => {
  const hasPhotos = photos && photos.length > 0;

  return (
    <Card className="p-6 shadow-sm border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 rounded-lg">
            <ImageIcon className="w-5 h-5 text-blue-600" />
          </div>
          Profile Photos
          <span className="ml-1 text-slate-400 font-medium text-sm">
            ({photos?.length || 0})
          </span>
        </h3>

        {hasPhotos && (
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
            Click to Enlarge
          </p>
        )}
      </div>

      {!hasPhotos ? (
        <div className="bg-slate-50/50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <CameraOff className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">
            No visual evidence uploaded.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            This user has not added any profile photos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {photos.map((ph, idx) => (
              <motion.div
                key={ph._id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm group border border-slate-200/50"
                onClick={() => onImageClick(ph.url || ph, idx)}
              >
                {/* Image Component */}
                <img
                  src={ph.url || ph}
                  alt={`Evidence ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Main Photo Badge (Assuming first photo is primary) */}
                {idx === 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg shadow-blue-200 uppercase tracking-tighter">
                      Primary
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-xl">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">
                      Inspect
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Card>
  );
};
