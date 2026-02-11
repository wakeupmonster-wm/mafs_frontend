import React from "react";

export const PreLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50/50">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
};
