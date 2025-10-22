import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupWithEmail from "@/components/auth/SignupWithEmail";
import SignupWithPhone from "@/components/auth/SignupWithPhone";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
export default function SignupPage() {
  const [step, setStep] = useState<"choose" | "email" | "phone">("choose");
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[400px] max-w-full">
        {step === "choose" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              Join RentNest Today!
            </h2>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create your account to explore the best rental properties near
              you.
            </p>
            <Button
              onClick={() => setStep("email")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Mail className="h-5 w-5" /> Sign In with Email
            </Button>
            <Button
              onClick={() => setStep("phone")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Phone className="h-5 w-5" />
              Sign in with Phone
            </Button>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                className="text-emerald-600 hover:underline"
                onClick={() =>navigate("/signin")}
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {step === "email" && (
          <SignupWithEmail onBack={() => setStep("choose")} />
        )}
        {step === "phone" && (
          <SignupWithPhone onBack={() => setStep("choose")} />
        )}
      </div>
    </div>
  );
}
