// pages/verify-email.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Verify Your Email</h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          We’ve sent a 6-digit code to your email.
        </p>
        <Input placeholder="Enter verification code" className="mb-4 text-center" />
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Verify</Button>
      </div>
    </div>
  );
}
