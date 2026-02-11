import { ChevronLeft, ChevronRight, XCircle } from "lucide-react";

export const ImageLightbox = ({ modal, photos, onClose, onNavigate }) => {
  const currentPhoto = photos[modal.index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors"
        onClick={onClose}
      >
        <XCircle className="w-10 h-10" />
      </button>

      <div
        className="relative max-w-5xl w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {modal.index > 0 && (
          <button
            className="absolute -left-16 p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
            onClick={() =>
              onNavigate(photos[modal.index - 1].url, modal.index - 1)
            }
          >
            <ChevronLeft size={32} />
          </button>
        )}

        <img
          src={currentPhoto.url || currentPhoto}
          className="max-h-[85vh] rounded-xl shadow-2xl object-contain"
          alt="Review"
        />

        {modal.index < photos.length - 1 && (
          <button
            className="absolute -right-16 p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
            onClick={() =>
              onNavigate(photos[modal.index + 1].url, modal.index + 1)
            }
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>
    </div>
  );
};
