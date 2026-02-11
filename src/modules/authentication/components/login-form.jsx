/* eslint-disable no-unused-vars */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import googleIcon from "@/assets/svgs/google-icon.svg";
import mafsIcon from "@/assets/svgs/mafs-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.schemas";
import { loginThunk } from "../store/auth.slice";
import { Eye, EyeOff, Heart, Loader2, Lock, Mail } from "lucide-react";
import { ROLES } from "@/constants/roles";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    // 👇 The zodResolver logic goes here
    resolver: zodResolver(loginSchema),
    defaultValues: {
      status: "active",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(loginThunk(data)).unwrap();

      // STRICT ROLE CONTROL
      if (user?.role === ROLES.ADMIN) {
        navigate(user.screen || "/admin/dashboard", { replace: true });

        // Clean and simple call
        toast.success(user.message || "Login successful", {
          description: `Welcome back, ${user.nickname}!`,
        });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      resetField("password");
      toast.error(err || "Server error while login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl">
            <img src={mafsIcon} alt="Google" className="h-full w-full" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-muted-foreground mt-2 text-balance">
            Login to manage the MAFS ecosystem
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="email" className={"text-base"}>
              Email
            </FieldLabel>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-[45%] w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="mafs@example.com"
                className={`w-full px-9 py-5 bg-gray-50 border outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-50"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 -mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </Field>

          <Field>
            <div className="flex items-center">
              <FieldLabel
                htmlFor="password"
                title="Password"
                className="text-base"
              >
                Password
              </FieldLabel>
            </div>

            <div className="relative">
              <Lock className="absolute left-2 top-1/2 -translate-y-[45%] w-5 h-5 text-gray-400" />
              <Input
                id="password"
                // Dynamic type based on state
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className={`w-full px-9 py-5 pr-12 bg-gray-50 border !outline-none transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-50"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex="-1" // Prevents tabbing to the eye icon before the next field
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Link
              to="/auth/forgot-password"
              className="text-right text-sm hover:text-blue-700 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </Field>

          {/* Error Message from Thunk */}
          {/* {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )} */}
        </div>

        <Field>
          <Button type="submit" disabled={loading} className={"py-5"}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Logged in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <img src={googleIcon} alt="Google" className="h-6 w-6" />
            Login with Google
          </Button>
          {/* <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="#" className="no-underline underline-offset-auto">
              <span className="hover:text-blue-700 underline">Sign up</span>
            </Link>
          </FieldDescription> */}
        </Field>
      </FieldGroup>
    </form>
  );
}