import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// Helper to render a Chip
export const FilterChip = ({ label, value, onClear, colorClass }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="shrink-0"
  >
    <Badge
      variant="secondary"
      className={cn(
        "p-1.5 px-2 gap-1 border-dashed shadow-sm whitespace-nowrap",
        colorClass
      )}
    >
      <span className="text-[10px] font-bold uppercase opacity-60">
        {label}:
      </span>
      <span className="uppercase text-xs">{value}</span>
      <button
        onClick={onClear}
        className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
      >
        <IconX size={12} />
      </button>
    </Badge>
  </motion.div>
);
