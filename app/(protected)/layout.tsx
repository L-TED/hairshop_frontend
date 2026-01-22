"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loading from "@/components/common/Loading";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userLabel={user ? `${user.username}님` : undefined}
        onLogout={() => logout()}
      />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <ProtectedRoute isAllowed={isAuthenticated} isChecking={isLoading} redirectTo="/login">
          {children}
        </ProtectedRoute>
        {!isAuthenticated && isLoading ? <Loading /> : null}
      </main>
      <Footer />
    </>
  );
}
