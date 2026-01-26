"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/api/services/authService";
import { LoginRequest, SignupRequest } from "@/types/auth";

type UseAuthOptions = {
  enabled?: boolean;
};

export function useAuth(options: UseAuthOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { enabled = true } = options;
  const isAuthCheckDisabled = !enabled || pathname === "/login" || pathname === "/signup";

  // 현재 로그인 유저 조회
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: authService.getMe,
    retry: false, // 인증 실패 시 재시도 안 함
    enabled: !isAuthCheckDisabled,
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async (response) => {
      if (response?.user) {
        queryClient.setQueryData(["me"], response.user);
      } else {
        await queryClient.refetchQueries({ queryKey: ["me"] });
      }
      router.push("/");
    },
  });

  // 회원가입
  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: () => {
      router.push("/login");
    },
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
  };
}
