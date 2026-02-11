import React from "react";
import { IconInbox } from "@tabler/icons-react";

export const DataNotFound = ({ icon, message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-slate-400 space-y-1">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-aqua/10 border border-brand-aqua/80 animate-bounce">
        {icon ? icon : <IconInbox className="w-8 h-8 text-brand-aqua" />}
      </div>
      <p className="text-sm font-medium">
        {message ? message : "No results found"}
      </p>
    </div>
  );
};
