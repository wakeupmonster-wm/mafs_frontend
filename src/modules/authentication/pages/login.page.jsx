import { LoginForm } from "../components/login-form";
import mustardLogo from "@/assets/web/phone-sticky2.webp";

export default function LoginPage() {
  return (
    <>
      <div className="bg-muted size-72 relative mx-auto my-20 text-center hidden lg:block">
        <img
          src={mustardLogo}
          alt={mustardLogo}
          loading="lazy"
          className="absolute h-auto w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg border rounded-xl shadow-xl p-6 md:p-10">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
