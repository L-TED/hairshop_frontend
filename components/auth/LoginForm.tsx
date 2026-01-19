"use client";

import { useMemo, useState } from "react";

export type LoginValues = {
  username: string;
  password: string;
};

export interface LoginFormProps {
  defaultValues?: Partial<LoginValues>;
  loading?: boolean;
  errorMessage?: string | null;
  onSubmit?: (values: LoginValues) => void | Promise<void>;
}

export default function LoginForm({
  defaultValues,
  loading = false,
  errorMessage,
  onSubmit,
}: LoginFormProps) {
  const [username, setUsername] = useState(defaultValues?.username ?? "");
  const [password, setPassword] = useState(defaultValues?.password ?? "");
  const [touched, setTouched] = useState({ username: false, password: false });

  const validation = useMemo(() => {
    const usernameError = username.trim().length === 0 ? "아이디를 입력해주세요." : undefined;
    const passwordError = password.length === 0 ? "비밀번호를 입력해주세요." : undefined;
    return { usernameError, passwordError };
  }, [username, password]);

  const isInvalid = Boolean(validation.usernameError || validation.passwordError);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (isInvalid || loading) return;
    await onSubmit?.({ username: username.trim(), password });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">로그인</h1>
        <p className="mt-1 text-sm text-neutral-500">아이디와 비밀번호로 로그인하세요.</p>
      </div>

      {errorMessage ? (
        <div className="mb-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800">
          {errorMessage}
        </div>
      ) : null}

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-800">아이디</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            autoComplete="username"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-neutral-400"
            placeholder="username"
          />
          {touched.username && validation.usernameError ? (
            <p className="mt-1 text-xs text-neutral-600">{validation.usernameError}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-800">비밀번호</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            autoComplete="current-password"
            type="password"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-neutral-400"
            placeholder="••••••••"
          />
          {touched.password && validation.passwordError ? (
            <p className="mt-1 text-xs text-neutral-600">{validation.passwordError}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading || isInvalid}
          className="w-full rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>
      </div>
    </form>
  );
}
