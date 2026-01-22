"use client";

import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import NewsDetail from "@/components/news/NewsDetail";
import { newsService } from "@/api/services/newsService";

export default function NewsPostDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const enabled = Number.isFinite(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["news-post", id],
    queryFn: () => newsService.getNewsById(id),
    enabled,
  });

  if (!enabled) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        잘못된 소식 ID 입니다.
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        소식을 불러오지 못했습니다.
      </div>
    );
  if (!data)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        데이터가 없습니다.
      </div>
    );

  return (
    <NewsDetail
      backHref="/news-posts"
      post={{
        id: data.id,
        title: data.title,
        createdAt: data.created_at,
        thumbnailUrl: data.thumbnail_url,
        contents: data.contents,
      }}
    />
  );
}
