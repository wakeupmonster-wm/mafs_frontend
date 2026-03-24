import React from "react";
import { Outlet } from "react-router";
import mustardLogo from "@/assets/LoginImg.png";

export default function ForgotPasswordPage() {
  return (
    <div className="grid grid-cols-10">
      <div className="bg-muted w-full col-span-5 max-w-5xl h-full relative mx-auto hidden lg:block p-5">
        <img
          src={mustardLogo}
          alt={mustardLogo}
          loading="lazy"
          className="h-full w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex items-center col-span-5 justify-center">
        <div className="w-full max-w-lg border rounded-xl shadow-xl p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
