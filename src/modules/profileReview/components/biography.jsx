import { Card } from "@/components/ui/card";
import { FileText, Quote, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Biography = ({ bio }) => {
  const hasBio = bio && bio.trim().length > 0;

  return (
    <Card className="group p-6 shadow-sm border-slate-200 bg-white transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-900 flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          Biography
        </h3>

        {hasBio && (
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {bio.length} Characters
          </span>
        )}
      </div>

      <div
        className={cn(
          "relative p-5 rounded-2xl border transition-all duration-300",
          hasBio
            ? "bg-slate-50/30 border-slate-100 shadow-inner"
            : "bg-amber-50/30 border-amber-100 border-dashed"
        )}
      >
        {hasBio ? (
          <>
            {/* Decorative Quote Icon */}
            <Quote className="absolute -top-3 -left-2 w-8 h-8 text-blue-100 -rotate-12 pointer-events-none" />
            <p className="relative z-10 text-slate-700 leading-relaxed text-sm md:text-base font-medium whitespace-pre-wrap">
              {bio}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="p-2 bg-amber-100/50 rounded-full mb-2">
              <Info className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-amber-700/60 text-sm font-medium italic">
              This user hasn't shared a story yet.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
