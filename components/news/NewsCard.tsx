import Link from "next/link";

export type NewsPostSummary = {
  id: string | number;
  title: string;
  createdAt?: string; // ISO
  thumbnailUrl?: string | null;
};

export interface NewsCardProps {
  post: NewsPostSummary;
  href?: string;
}

function formatDate(createdAt?: string) {
  if (!createdAt) return undefined;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return createdAt;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export default function NewsCard({ post, href }: NewsCardProps) {
  const detailHref = href ?? `/news-posts/${post.id}`;
  const dateLabel = formatDate(post.createdAt);

  return (
    <Link
      href={detailHref}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300"
    >
      <div className="relative h-36 bg-neutral-100">
        {post.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-semibold text-neutral-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900">{post.title}</h3>
        {dateLabel ? <p className="mt-2 text-xs text-neutral-500">{dateLabel}</p> : null}
      </div>
    </Link>
  );
}
