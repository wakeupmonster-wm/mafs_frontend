import React from "react";
import { Outlet } from "react-router";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg border rounded-xl shadow-xl p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
