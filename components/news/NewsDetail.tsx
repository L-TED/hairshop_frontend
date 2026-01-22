import Link from "next/link";

export type NewsPostDetail = {
  id: string | number;
  title: string;
  createdAt?: string; // ISO
  thumbnailUrl?: string | null;
  contents: string;
};

export interface NewsDetailProps {
  post: NewsPostDetail;
  backHref?: string;
}

function formatDate(createdAt?: string) {
  if (!createdAt) return undefined;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return createdAt;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function NewsDetail({ post, backHref = "/news-posts" }: NewsDetailProps) {
  const dateLabel = formatDate(post.createdAt);

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <Link
          href={backHref}
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-900"
        >
          ← 목록으로
        </Link>
      </div>

      <h1 className="text-xl font-semibold text-neutral-900">{post.title}</h1>
      {dateLabel ? <p className="mt-2 text-sm text-neutral-500">{dateLabel}</p> : null}

      {post.thumbnailUrl ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.thumbnailUrl} alt="" className="h-64 w-full object-cover" />
        </div>
      ) : null}

      <div className="prose prose-neutral mt-6 max-w-none">
        <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-800">{post.contents}</p>
      </div>
    </article>
  );
}
