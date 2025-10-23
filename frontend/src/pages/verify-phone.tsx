import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function VerifyPhone() {
  const { verifyOTP, authIsLoading } = useAuthStore();
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get phone and authType from state
  const phone = location.state?.phone;
  const authType = location.state?.authType;

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    const res = await verifyOTP(phone, otp, authType);
    if (res.success) {
      toast.success(res.message);
      navigate("/");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Verify Your Phone
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          We’ve sent a 6-digit code to your phone {phone}.
        </p>
        <Input
          placeholder="Enter verification code"
          className="mb-4 text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
          disabled={authIsLoading}
          onClick={handleVerifyOTP}
        >
          {authIsLoading && <Loader className="animate-spin h-5 w-5 text-white" />}
          {authIsLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
}
