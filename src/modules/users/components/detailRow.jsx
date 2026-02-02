import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";

export const DetailRow = ({ icon, label, value, verified }) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      {icon && (
        <div className="p-1.5 bg-muted/50 rounded-md text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-foreground font-semibold leading-tight">
            {value || "N/A"}
          </span>
          {verified !== undefined &&
            (verified ? (
              <IconCheck size={14} className="text-green-500" />
            ) : (
              <IconX size={14} className="text-red-500" />
            ))}
        </div>
      </div>
    </div>
  );
};
