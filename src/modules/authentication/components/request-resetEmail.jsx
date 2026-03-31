import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { schema } from "../schemas/auth.schemas";
import { useDispatch } from "react-redux";
import { requestOtpThunk } from "../store/auth.slice";
import { toast } from "sonner";

export default function RequestResetEmailForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Ensure 'data.email' is what your API expects
      const response = await dispatch(
        requestOtpThunk({ email: data.email }),
      ).unwrap();

      // Pass the email to the next route
      navigate(response.screen || "/auth/forgot-password", {
        state: { email: data.email },
      });

      // Clean and simple call
      toast.success(response.message || "OTP Sent!", {
        description: "Please check your inbox for the 6-digit code.",
      });
    } catch (err) {
      // console.error("API Request OTP Error:", err); // This will show why it's a 400
      toast.error(err || "Failed to send OTP", {
        description: "Please check your credentials.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot Password?</h1>
        <p className="text-slate-700">
          Enter your email to receive an OTP code.
        </p>
      </div>

      <FieldGroup>
        <Field>
          <FieldLabel>Email Address</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-aqua" />
            <Input
              {...register("email")}
              placeholder="keenasmustard@gmail.com.au"
              className="pl-10 py-6"
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </Field>

        <Button
          type="submit"
          className="py-5 mb-5 bg-brand-aqua/25 hover:bg-brand-aqua/45 hover:shadow-md border border-brand-aqua text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>

        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-slate-700 hover:text-brand-aqua transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </FieldGroup>
    </form>
  );
}
