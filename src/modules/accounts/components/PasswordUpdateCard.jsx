import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  IconLock,
  IconEye,
  IconEyeOff,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/account.slice";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Required"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase")
      .regex(/[0-9]/, "Must contain one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const PasswordUpdateCard = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.admin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(updatePassword(values)).unwrap();
      toast.success("Security credentials updated");
      reset();
    } catch (err) {
      toast.error(err || "Password update failed");
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <IconLock size={20} />
          </div>
          <CardTitle className="text-lg font-bold">
            Security & Password
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Input
              {...register("oldPassword")}
              type={show ? "text" : "password"}
              placeholder="Current Password"
              className="rounded-xl"
            />
            {errors.oldPassword && (
              <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Input
                {...register("newPassword")}
                type={show ? "text" : "password"}
                placeholder="New Password"
                className="rounded-xl"
              />
              {errors.newPassword && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("confirmPassword")}
                type={show ? "text" : "password"}
                placeholder="Confirm"
                className="rounded-xl"
              />
              {errors.confirmPassword && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShow(!show)}
              className="text-slate-500 gap-2"
            >
              {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              {show ? "Hide" : "Show"} Passwords
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 px-8 rounded-xl shadow-md"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
