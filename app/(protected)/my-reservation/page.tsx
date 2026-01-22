"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyReservationLegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/my-reservations");
  }, [router]);

  return null;
}
