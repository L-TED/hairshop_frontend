"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useRefreshToken } from "@/hooks/useRefreshToken";

export default function Providers({ children }: { children: React.ReactNode }) {
  useRefreshToken();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
