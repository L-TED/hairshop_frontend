"use client";

import { useMemo, useState } from "react";

export type SignupValues = {
  username: string;
  password: string;
  passwordConfirm: string;
};

export interface SignupFormProps {
  defaultValues?: Partial<SignupValues>;
  loading?: boolean;
  errorMessage?: string | null;
  onSubmit?: (values: Omit<SignupValues, "passwordConfirm">) => void | Promise<void>;
}

export default function SignupForm({
  defaultValues,
  loading = false,
  errorMessage,
  onSubmit,
}: SignupFormProps) {
  const [username, setUsername] = useState(defaultValues?.username ?? "");
  const [password, setPassword] = useState(defaultValues?.password ?? "");
  const [passwordConfirm, setPasswordConfirm] = useState(defaultValues?.passwordConfirm ?? "");
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    passwordConfirm: false,
  });

  const validation = useMemo(() => {
    const usernameError = username.trim().length === 0 ? "아이디를 입력해주세요." : undefined;
    const passwordError = password.length < 6 ? "비밀번호는 6자 이상을 권장합니다." : undefined;
    const passwordConfirmError =
      passwordConfirm.length === 0
        ? "비밀번호 확인을 입력해주세요."
        : password !== passwordConfirm
          ? "비밀번호가 일치하지 않습니다."
          : undefined;
    return { usernameError, passwordError, passwordConfirmError };
  }, [username, password, passwordConfirm]);

  const isInvalid = Boolean(validation.usernameError || validation.passwordConfirmError || loading);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ username: true, password: true, passwordConfirm: true });
    if (isInvalid) return;
    await onSubmit?.({ username: username.trim(), password });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">회원가입</h1>
        <p className="mt-1 text-sm text-neutral-500">간단한 정보로 계정을 생성합니다.</p>
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
            autoComplete="new-password"
            type="password"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-neutral-400"
            placeholder="••••••••"
          />
          {touched.password && validation.passwordError ? (
            <p className="mt-1 text-xs text-neutral-600">{validation.passwordError}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-800">비밀번호 확인</label>
          <input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, passwordConfirm: true }))}
            autoComplete="new-password"
            type="password"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-900 outline-none transition focus:border-neutral-400"
            placeholder="••••••••"
          />
          {touched.passwordConfirm && validation.passwordConfirmError ? (
            <p className="mt-1 text-xs text-neutral-600">{validation.passwordConfirmError}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isInvalid}
          className="w-full rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {loading ? "가입 중…" : "회원가입"}
        </button>
      </div>
    </form>
  );
}
