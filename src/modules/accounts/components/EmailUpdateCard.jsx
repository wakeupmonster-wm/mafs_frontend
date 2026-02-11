import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  IconMail,
  IconShieldCheck,
  IconArrowRight,
  IconRefresh,
} from "@tabler/icons-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendEmailOtp, verifyEmailOtp } from "../../store/slices/admin.slice";

export const EmailUpdateCard = ({ currentEmail }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); // 1: Input Email, 2: Verify OTP
  const [newEmail, setNewEmail] = useState("");
  const { loading } = useSelector((s) => s.admin);

  const onSendOtp = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendEmailOtp(newEmail)).unwrap();
      setStep(2);
      toast.success("OTP sent to " + newEmail);
    } catch (err) {
      toast.error(err || "Failed to send OTP");
    }
  };

  const onVerifyOtp = async (otp) => {
    try {
      await dispatch(verifyEmailOtp({ email: newEmail, otp })).unwrap();
      setStep(1);
      setNewEmail("");
      toast.success("Email updated successfully");
    } catch (err) {
      toast.error(err || "Invalid OTP");
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <IconMail size={20} />
          </div>
          <CardTitle className="text-lg font-bold">Email Address</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {step === 1 ? (
          <form onSubmit={onSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Current Email
              </p>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-medium italic">
                {currentEmail}
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter new email address"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="rounded-xl border-slate-200 focus-visible:ring-indigo-500"
              />
              <Button
                type="submit"
                disabled={loading || !newEmail}
                className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6"
              >
                {loading ? (
                  <IconRefresh className="animate-spin" />
                ) : (
                  <IconArrowRight size={18} />
                )}
              </Button>
            </div>
          </form>
        ) : (
          <OtpVerificationView
            email={newEmail}
            onVerify={onVerifyOtp}
            onCancel={() => setStep(1)}
            loading={loading}
          />
        )}
      </CardContent>
    </Card>
  );
};

const OtpVerificationView = ({ email, onVerify, onCancel, loading }) => {
  const [otp, setOtp] = useState("");
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <div className="text-sm text-slate-600">
        We sent a code to{" "}
        <span className="font-bold text-slate-900">{email}</span>
      </div>
      <Input
        maxLength={6}
        placeholder="0 0 0 0 0 0"
        className="text-center text-2xl font-mono tracking-[1em] h-14 border-2 border-indigo-100 focus-visible:ring-indigo-500"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={onCancel}
        >
          Back
        </Button>
        <Button
          className="flex-[2] bg-indigo-600 rounded-xl"
          onClick={() => onVerify(otp)}
          disabled={otp.length < 6 || loading}
        >
          {loading ? "Verifying..." : "Confirm & Update"}
        </Button>
      </div>
    </div>
  );
};
