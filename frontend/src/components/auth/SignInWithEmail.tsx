// components/auth/SignInWithEmail.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onBack: () => void;
}

export default function SignInWithEmail({ onBack }: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", email: "" });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignIn with Email Data:", formData);
    navigate("/verify-email");
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
        placeholder="First Name"
        required
        value={formData.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />

      <Input
        placeholder="Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        Continue
      </Button>
    </form>
  );
}
