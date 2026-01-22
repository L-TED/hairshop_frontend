"use client";

import "../styles/globals.css";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useRefreshToken } from "@/hooks/useRefreshToken";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
  variable: "--font-inter", // Assign a CSS variable name
});

function RefreshTokenListener() {
  useRefreshToken();
  return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.variable}>
        <QueryClientProvider client={queryClient}>
          <RefreshTokenListener />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
