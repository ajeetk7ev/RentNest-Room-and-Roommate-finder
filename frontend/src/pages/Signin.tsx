// pages/SignInPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignInWithEmail from "@/components/auth/SignInWithEmail";
import SignInWithPhone from "@/components/auth/SignInWithPhone";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [step, setStep] = useState<"choose" | "email" | "phone">("choose");
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[400px] max-w-full">
        {step === "choose" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-400 drop-shadow-lg">
              Welcome Back to RentNest
            </h2>
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
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {step === "email" && (
          <SignInWithEmail onBack={() => setStep("choose")} />
        )}
        {step === "phone" && (
          <SignInWithPhone onBack={() => setStep("choose")} />
        )}
      </div>
    </div>
  );
}
