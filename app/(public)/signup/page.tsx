"use client";

import { useState } from "react";
import SignupForm from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/useAuth";

function errorMessage(error: unknown) {
  const maybe = error as {
    response?: { data?: unknown; statusText?: string };
    message?: string;
  };

  const apiMessage = (maybe.response?.data as { message?: string } | undefined)?.message;
  return (
    apiMessage ?? maybe.response?.statusText ?? maybe.message ?? "회원가입 중 오류가 발생했습니다."
  );
}

export default function SignupPage() {
  const { signup, isSignupLoading } = useAuth({ enabled: false });
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex justify-center">
      <SignupForm
        loading={isSignupLoading}
        errorMessage={error}
        onSubmit={(values) => {
          setError(null);
          signup(values, {
            onError: (e) => setError(errorMessage(e)),
          });
        }}
      />
    </div>
  );
}
