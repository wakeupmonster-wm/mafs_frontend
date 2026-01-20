import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { verifyOtpThunk } from "../store/auth.slice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
// import { verifyOtpThunk, requestOtpThunk } from "../store/auth.slice";

export default function VerifyEmailOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Grab the email passed from the previous page
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  // If the user somehow lands here without an email (e.g., refresh), send them back
  useEffect(() => {
    if (!email) {
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    try {
      // Step 2 Thunk: Needs email + otp
      const response = await dispatch(verifyOtpThunk({ email, otp })).unwrap();

      // console.log("Verify email Successfull: ", { email, otp }, ": otp");

      navigate("../new-password", { state: { email, otp } });

      toast.success(response.message || "OTP verified!", {
        description: "Please enter new and confirm password.",
      });
    } catch (err) {
      setOtp(""); // Clear OTP on error
      toast.error(err || "Failed to send OTP", {
        description: "Please enter correct otp.",
      });
    }
  };

  // 1. Ensure the interval only runs when timer > 0
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        // console.log("timer: ", timer);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]); // Depend on timer to restart logic safely

  // 2. Protect the resend function
  const handleResend = async () => {
    if (timer > 0) return; // Guard clause

    try {
      // await dispatch(requestOtpThunk(email)).unwrap();
      console.log("OTP Resent to:", email);
      setTimer(30); // Reset the clock
      setOtp(""); // Clear old OTP input for fresh start
    } catch (err) {
      console.error("Resend failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Enter verification code</h1>
        <p className="text-muted-foreground mt-2">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)} // shadcn InputOTP returns value directly, not event
          >
            <InputOTPGroup className="gap-[14px]">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} className="w-14 h-14 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full py-6"
          disabled={otp.length !== 6 || loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Verify OTP"}
        </Button>

        <div className="text-sm text-muted-foreground">
          Didn't get the code?{" "}
          <button
            type="button"
            disabled={timer > 0 || loading}
            onClick={handleResend}
            className="text-blue-900 font-semibold hover:underline disabled:opacity-90 disabled:cursor-not-allowed"
          >
            Resend {timer > 0 && `(${timer}s)`}
          </button>
        </div>
      </div>
    </div>
  );
}
