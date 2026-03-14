import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25, // Start lower for a more pronounced "wave" up
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15, // Lower damping = more "wave" bounce
      mass: 1,
    },
  },
};

const StatsGrid = ({ stats, colorMap, bgMap }) => {
  console.log("stats: ", stats);

  return (
    <>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className={cn(
            "group relative p-6 rounded-3xl border bg-gradient-to-br cursor-pointer transition-all duration-500",
            bgMap[stat.color]
          )}
        >
          {/* Stat content remains the same */}
          <div className="flex items-start justify-center gap-4">
            <div
              className={cn(
                "p-3 rounded-2xl bg-gradient-to-br border shadow-sm",
                colorMap[stat.color]
              )}
            >
              {stat.icon}
            </div>
            <div className="flex-1 w-max">
              <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">
                {stat.label}
              </p>
              <h4 className="text-2xl font-black text-slate-900 leading-none">
                {stat.val.toLocaleString()}
              </h4>
              <p className="text-[10px] font-medium mt-1 truncate text-slate-500">
                {stat.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default StatsGrid;
