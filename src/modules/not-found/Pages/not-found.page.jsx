import React from "react";
import { Button } from "@/components/ui/button";
import { HeartOff, MapPin, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F8FDFF] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Decorative Brand Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-aqua-gradient blur-[100px] opacity-20" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#E6FFFD] blur-[100px] opacity-40" />

      <main className="max-w-md w-full space-y-8 z-10">
        {/* Visual Element */}
        <div className="relative flex justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-[#E6FFFD] relative">
            <HeartOff className="w-20 h-20 text-brand-aqua animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <span className="flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#46C7CD] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#46C7CD] border-2 border-white"></span>
              </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-8xl font-extrabold text-[#212121] tracking-tighter">
            4<span className="text-brand-aqua">0</span>4
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#212121]">
            A Missed Connection!
          </h2>
          <p className="text-[#606060] text-lg font-medium leading-relaxed">
            Looks like this profile doesn't exist or has moved on. Don't worry,
            there are plenty of other matches waiting for you!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            variant="outline"
            className="border-[#46C7CD] text-brand-aqua hover:bg-[#46C7CD] hover:text-white h-12 px-8 rounded-full font-bold transition-all"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>

          <Button
            className="bg-[#46C7CD] hover:bg-[#3bb1b6] text-white h-12 px-8 rounded-full font-bold shadow-lg shadow-[#46C7CD]/20 transition-all transform hover:scale-105"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </Button>
        </div>

        {/* Branding Subtext */}
        <div className="pt-8 flex items-center justify-center gap-2 text-[#8D8D8D] font-medium text-sm">
          <MapPin className="w-4 h-4" />
          <span>Lost in the MAFS universe?</span>
        </div>
      </main>
    </div>
  );
}
