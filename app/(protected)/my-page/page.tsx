"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/my-reservations");
  }, [router]);

  return null;
}
