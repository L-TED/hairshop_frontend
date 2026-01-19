import Link from "next/link";

export type StoreItem = {
  id: string | number;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};

export interface StoreCardProps {
  store: StoreItem;
  href?: string;
}

function googleMapsLink(lat?: number, lng?: number) {
  if (lat === undefined || lng === undefined) return undefined;
  return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`;
}

export default function StoreCard({ store, href }: StoreCardProps) {
  const detailHref = href ?? `/stores/${store.id}`;
  const mapHref = googleMapsLink(store.latitude, store.longitude);

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">{store.name}</h3>
          <p className="mt-1 text-sm text-neutral-600">{store.address ?? "주소 정보 없음"}</p>
        </div>
        <Link
          href={detailHref}
          className="rounded-xl bg-neutral-900 px-3 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
        >
          상세
        </Link>
      </div>

      {mapHref ? (
        <a
          href={mapHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 22s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M12 14a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
          </svg>
          지도에서 보기
        </a>
      ) : null}
    </article>
  );
}
