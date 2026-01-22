"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export function useRefreshToken() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 액세스 토큰 만료 시 자동 갱신
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // 401 에러이고, 아직 재시도 안 했으면
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // 리프레시 토큰으로 새 액세스 토큰 발급
            await apiClient.post("/auth/refresh");

            // 원래 요청 재시도
            return apiClient(originalRequest);
          } catch (refreshError) {
            // 리프레시 토큰도 만료됨 → 로그아웃
            queryClient.clear();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    // 클린업
    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, [queryClient]);
}
