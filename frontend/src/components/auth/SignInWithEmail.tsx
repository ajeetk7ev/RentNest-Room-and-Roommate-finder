import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
interface Props {
  onBack: () => void;
}

export default function SignInWithEmail({ onBack }: Props) {
  const { signin, authIsLoading } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signin(email);
    if (res.success) {
      toast.success(res.message);
      navigate("/verify-email", { state: { email: email } });
    } else {
      toast.error(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <Input
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        type="submit"
        disabled={authIsLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
      >
        {authIsLoading && (
          <Loader className="animate-spin h-5 w-5 text-white" />
        )}
        {authIsLoading ? "Processing..." : "Continue"}
      </Button>
    </form>
  );
}
