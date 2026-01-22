"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoreDetailRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/stores");
  }, [router]);

  return null;
}
