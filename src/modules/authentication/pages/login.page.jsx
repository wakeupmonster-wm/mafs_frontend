import { LoginForm } from "../components/login-form";
import mustardLogo from "@/assets/LoginImg.png";

export default function LoginPage() {
  // return (
  //   <div className="grid grid-cols-10 w-full h-screen">
  //     <div className="bg-muted relative w-full col-span-5 max-w-5xl min-h-52 mx-auto hidden lg:block p-5">
  //       <img
  //         src={mustardLogo}
  //         alt={mustardLogo}
  //         loading="lazy"
  //         className="h-full w-full dark:brightness-[0.2] dark:grayscale"
  //       />
  //     </div>

  //     <div className="flex items-center col-span-10 md:col-span-5 justify-center mx-auto">
  //       <div className="w-full max-w-lg 3xl:max-w-xl mx-auto border rounded-xl shadow-xl p-6 md:p-10 py-0 3xl:py-20">
  //         <LoginForm />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    // Changed to 12-column grid for finer control, or stick to flex for simplicity
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[calc(100vh-97px)]">
      {/* Left Side: Image (Hidden on mobile) */}
      <div className="bg-muted relative hidden lg:flex items-center justify-center p-6">
        <div className="relative w-full max-w-4xl aspect-square">
          <img
            src={mustardLogo}
            alt="Keen As Mustard Branding"
            loading="lazy"
            className="h-full w-full object-contain dark:brightness-[0.8]"
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-lg border rounded-2xl shadow-2xl bg-white p-8 md:p-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
