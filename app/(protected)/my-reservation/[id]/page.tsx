"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyReservationLegacyDetailRedirect({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/my-reservations/${params.id}`);
  }, [params.id, router]);

  return null;
}
