import React from "react";
import { Sparkles, Zap } from "lucide-react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen relative bg-[#F8FDFF] flex overflow-x-hidden flex-col items-center justify-center px-6 text-center font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Gradient Orbs for Visual Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#AAE1FE] blur-[120px] opacity-30" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#E6FFFD] blur-[120px] opacity-50" />

      <main className="max-w-3xl w-full space-y-10 z-10">
        {/* Launch Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#46C7CD]/10 border border-[#46C7CD]/20 rounded-full text-[#46C7CD]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
              Coming soon 2026
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-[#212121]">
            Match At First <br />
            <span className="text-[#46C7CD] drop-shadow-sm">Swipe</span>
          </h1>

          <p className="text-lg md:text-2xl text-[#606060] max-w-xl mx-auto font-medium leading-relaxed">
            The future of connection is almost here. Love shouldn't be a waiting
            game.
          </p>
        </div>

        {/* Feature Teasers (Responsive Grid) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto pt-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E6FFFD] shadow-sm flex items-center gap-3">
            <div className="bg-[#AAE1FE] p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#212121] font-semibold">
              Instant Connection
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#E6FFFD] shadow-sm flex items-center gap-3">
            <div className="bg-[#46C7CD] p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#212121] font-semibold">
              AI Curated Pairs
            </span>
          </div>
        </div> */}

        {/* Footer/Socials */}
        {/* <footer className="pt-20">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[#8D8D8D] text-sm font-medium">
            <a
              href="#"
              className="hover:text-[#46C7CD] transition-colors underline-offset-4 hover:underline"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-[#46C7CD] transition-colors underline-offset-4 hover:underline"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-[#46C7CD] transition-colors underline-offset-4 hover:underline"
            >
              Contact Us
            </a>
          </div>
        </footer> */}
      </main>
    </div>
  );
}

export default App;
