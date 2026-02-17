import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const KPICard = ({ title, value, icon: Icon, color, trend }) => {
  // Map simple color names to rich tailwind gradients and text colors
  const colorMap = {
    blue: "from-blue-500/20 to-blue-600/5 text-blue-600 border-blue-100 bg-blue-500",
    emerald:
      "from-emerald-500/20 to-emerald-600/5 text-emerald-600 border-emerald-100 bg-emerald-500",
    amber:
      "from-amber-500/20 to-amber-600/5 text-amber-600 border-amber-100 bg-amber-500",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-600 border-rose-100 bg-rose-500",
    purple:
      "from-purple-500/20 to-purple-600/5 text-purple-600 border-purple-100 bg-purple-500",
  };

  const bgMap = {
    blue: "from-blue-300/20 via-blue-500/10 to-transparent text-blue-600 border-blue-100",
    emerald:
      "from-emerald-300/20 via-emerald-500/10 to-transparent text-emerald-600 border-emerald-100",
    amber:
      "from-amber-300/20 via-amber-500/10 to-transparent text-amber-600 border-amber-100",
    rose: "from-rose-300/20 via-rose-500/10 to-transparent text-rose-600 border-rose-100",
    purple:
      "from-purple-300/20 to-purple-500/10 to-transparent text-purple-600 border-purple-100",
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
        boxShadow:
          "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
      }}
      // className="relative overflow-hidden bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] group"
      className={cn(
        "group relative p-6 rounded-3xl border bg-gradient-to-br cursor-pointer transition-all duration-500",
        bgMap[color]
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "p-3 rounded-2xl bg-gradient-to-br border shadow-sm",
              colorMap[color]
            )}
          >
            <Icon size={22} strokeWidth={2.5} />
          </div>

          {trend !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold",
                trend > 0
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              )}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
            </div>
          )}
        </div>

        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">
            {value}
          </h3>
        </div>
      </div>

      {/* Animated Bottom Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-50 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className={cn(
            "h-full w-full opacity-30",
            selectedColor.split(" ").pop()
          )}
        />
      </div>
    </motion.div>
  );
};
