import React from "react";

export const AttributeBlock = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-black text-muted-foreground/70 tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-foreground capitalize">
        {value || "N/A"}
      </p>
    </div>
  );
};
