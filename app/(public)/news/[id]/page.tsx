"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewsDetailRedirect({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/news-posts/${params.id}`);
  }, [params.id, router]);

  return null;
}
