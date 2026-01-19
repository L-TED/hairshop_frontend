"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface ProtectedRouteProps {
  isAllowed: boolean;
  isChecking?: boolean;
  redirectTo?: string;
  children: React.ReactNode;
}

export default function ProtectedRoute({
  isAllowed,
  isChecking = false,
  redirectTo = "/login",
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isChecking) return;
    if (isAllowed) return;
    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
    router.replace(`${redirectTo}${next}`);
  }, [isAllowed, isChecking, pathname, redirectTo, router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    );
  }

  if (!isAllowed) return null;
  return <>{children}</>;
}
