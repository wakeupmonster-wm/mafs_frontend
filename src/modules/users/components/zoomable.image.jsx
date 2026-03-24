import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

const ZOOM_LEVELS = [0.5, 1.0, 1.5, 2.0];

export const ZoomableImage = ({ src, label, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    // Reduced sensitivity: dampen movement toward center
    const rawX = ((e.clientX - left) / width) * 100;
    const rawY = ((e.clientY - top) / height) * 100;
    // Blend 60% toward center (50) for lower sensitivity
    const dampening = 0.4;
    const x = 50 + (rawX - 50) * dampening;
    const y = 50 + (rawY - 50) * dampening;
    setPosition({ x, y });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {/* <span className="text-[10px] text-foreground font-semibold flex items-center gap-1">
          <Search className="w-3 h-3" /> Hover to Magnify
        </span> */}
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-slate-300 cursor-crosshair group aspect-[4/3]"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out"
          style={{
            transform: isZoomed ? `scale(${zoomLevel})` : "scale(1)",
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />

        {/* Open in new tab overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => window.open(src, "_blank")}
            className="p-1.5 rounded-lg bg-background/70 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom level selector */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-background/70 backdrop-blur-sm border border-slate-300 p-1 z-10">
          {ZOOM_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel(level);
              }}
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                zoomLevel === level
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-label={`Set zoom to ${level}x`}
              aria-pressed={zoomLevel === level}
            >
              {level}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
