"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

function errorMessage(error: unknown) {
  const maybe = error as {
    response?: { data?: unknown; statusText?: string };
    message?: string;
  };

  const apiMessage = (maybe.response?.data as { message?: string } | undefined)?.message;
  return (
    apiMessage ?? maybe.response?.statusText ?? maybe.message ?? "로그인 중 오류가 발생했습니다."
  );
}

export default function LoginPage() {
  const { login, isLoginLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex justify-center">
      <LoginForm
        loading={isLoginLoading}
        errorMessage={error}
        onSubmit={(values) => {
          setError(null);
          login(values, {
            onError: (e) => setError(errorMessage(e)),
          });
        }}
      />
    </div>
  );
}
