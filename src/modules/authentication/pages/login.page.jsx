import { LoginForm } from "../components/login-form";
import loginImg from "@/assets/web/loginImg.webp";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen bg-white overflow-hidden">
      {/* Left Side: Premium Hero Section (As per Reference) */}
      <div className="hidden lg:flex flex-col p-2">
        <div className="relative flex-1 overflow-hidden rounded-2xl shadow-2xl shadow-slate-200/50">
          {/* Background Image Layer */}
          <div
            className="absolute inset-0 bg-cover transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url(${loginImg})`,
            }}
          />

          {/* High-Fidelity Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Main Content Overlay */}
          <div className="absolute bottom-16 left-12 right-10 z-20 space-y-4">
            <div className="space-y-2 max-w-96">
              <h1 className="text-white text-5xl xl:text-6xl font-normal leading-[1.5] tracking-tight">
                Welcome to <br />
                Keen As Mustard{" "}
                <span className="inline-block animate-wave origin-bottom text-4xl xl:text-5xl">
                  👋
                </span>
              </h1>
              <p className="text-gray-200/90 text-sm xl:text-xs font-medium leading-relaxed max-w-xs">
                Your space to manage, monitor, and grow the platform. Everything
                you need. All in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Professional Login Area */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-12 bg-slate-50/30">
        <div className="w-full max-w-md">
          <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 sm:p-12">
            <LoginForm />
          </div>

          <div className="mt-8 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} KEEN AS MUSTARD ADMIN PORTAL
          </div>
        </div>
      </div>
    </div>
  );
}
