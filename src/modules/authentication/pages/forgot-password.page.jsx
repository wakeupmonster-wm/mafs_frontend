import React from "react";
import { Outlet } from "react-router";
import mustardLogo from "@/assets/web/LoginImg.webp";

export default function ForgotPasswordPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[calc(100vh-97px)]">
      {/* Left Side: Image (Hidden on mobile) */}
      <div className="relative hidden lg:flex items-center justify-center 2xl:p-2">
        <div className="relative w-full max-w-4xl aspect-square">
          <img
            src={mustardLogo}
            alt="Keen As Mustard Branding"
            loading="lazy"
            className="h-full w-full object-contain dark:brightness-[0.8]"
          />
        </div>
      </div>

      <div className="flex items-center justify-center p-4 sm:p-10">
        <div className="w-full max-w-lg border border-brand-aqua/40 rounded-3xl shadow-xl shadow-brand-aqua/30 bg-white p-6 py-8 sm:p-8 md:p-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
