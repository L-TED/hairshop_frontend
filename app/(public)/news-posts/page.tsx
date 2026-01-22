"use client";

import { useQuery } from "@tanstack/react-query";
import { newsService } from "@/api/services/newsService";
import Loading from "@/components/common/Loading";
import NewsCard from "@/components/news/NewsCard";

export default function NewsPostsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news-posts"],
    queryFn: newsService.getAllNews,
  });

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

  const posts = data.map((p) => ({
    id: p.id,
    title: p.title,
    createdAt: p.created_at,
    thumbnailUrl: p.thumbnail_url,
  }));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">소식</h1>
        <p className="mt-1 text-sm text-neutral-500">공지/이벤트를 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard key={String(post.id)} post={post} href={`/news-posts/${post.id}`} />
        ))}
      </div>
    </div>
  );
}
