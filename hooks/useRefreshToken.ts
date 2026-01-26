"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

let interceptorId: number | null = null;
let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

export function useRefreshToken() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (interceptorId !== null) return;

    interceptorId = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (originalRequest?.url?.includes("/auth/refresh")) {
          return Promise.reject(error);
        }

        if (typeof window !== "undefined") {
          const { pathname } = window.location;
          if (pathname === "/login" || pathname === "/signup") {
            return Promise.reject(error);
          }
        }

        if (error.response?.status === 401 && !originalRequest?._retry) {
          if (!originalRequest) return Promise.reject(error);
          originalRequest._retry = true;

          try {
            if (!isRefreshing) {
              isRefreshing = true;
              refreshPromise = apiClient.post("/auth/refresh").finally(() => {
                isRefreshing = false;
                refreshPromise = null;
              });
            }

            await refreshPromise;
            return apiClient(originalRequest);
          } catch (refreshError) {
            queryClient.clear();
            if (typeof window !== "undefined" && window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      if (interceptorId !== null) {
        apiClient.interceptors.response.eject(interceptorId);
        interceptorId = null;
      }
    };
  }, [queryClient]);
}
