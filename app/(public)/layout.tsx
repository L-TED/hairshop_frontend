"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userLabel={user ? `${user.username}님` : undefined}
        onLogout={() => logout()}
      />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
