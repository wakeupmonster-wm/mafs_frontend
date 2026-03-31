import { Sparkles } from "lucide-react";
import React from "react";
import { Outlet } from "react-router";

export default function ForgotPasswordPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen">
      {/* Left Side: Hero Section (Inspired by SaleSkip) */}
      <div className="relative hidden lg:flex flex-col items-start justify-center p-12 xl:p-24 overflow-hidden bg-brand-aqua/90 text-white">
        {/* Background Decorative Arcs */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric arcs centered in the bottom-right for a dynamic look */}
            <circle cx="810" cy="870" r="100" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="200" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="300" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="400" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="500" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="600" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="700" stroke="white" strokeWidth="1" />
            <circle cx="810" cy="870" r="800" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-10 animate-pulse">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl xl:text-7xl font-black mb-8 leading-tight tracking-tight">
            Hello <br />
            Keen As Mustard!{" "}
            <span className="inline-block animate-wave origin-bottom">👋</span>
          </h1>
          <p className="text-sm xl:text-md text-gray-100 leading-relaxed font-medium">
            Skip repetitive and manual administrative tasks. Get highly
            productive through automation and save tons of time!
          </p>
        </div>

        {/* Section Footer */}
        <div className="absolute bottom-12 left-12 xl:left-24 text-sm text-gray-300 font-bold">
          © {new Date().getFullYear()} KEEN AS MUSTARD DATING APP ALL RIGHTS
          RESERVED
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
