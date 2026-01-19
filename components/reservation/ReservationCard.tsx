export type ReservationStatus = "confirmed" | "canceled";

export type ReservationSummary = {
  id: string;
  status: ReservationStatus;
  startAt: string; // ISO string preferred
  storeName?: string;
  staffName?: string;
  serviceName?: string;
  price?: number;
};

export interface ReservationCardProps {
  reservation: ReservationSummary;
  onCancel?: (id: string) => void;
  onEdit?: (id: string) => void;
  compact?: boolean;
}

function formatStartAt(startAt: string) {
  const d = new Date(startAt);
  if (Number.isNaN(d.getTime())) return startAt;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function ReservationCard({
  reservation,
  onCancel,
  onEdit,
  compact = false,
}: ReservationCardProps) {
  const isCanceled = reservation.status === "canceled";

  return (
    <article
      className={
        "rounded-2xl border border-neutral-200 bg-white shadow-sm " + (compact ? "p-4" : "p-5")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-neutral-500">예약</p>
          <h3 className="mt-1 text-base font-semibold text-neutral-900">
            {reservation.storeName ?? "매장"}
          </h3>
          <p className="mt-1 text-sm text-neutral-700">{formatStartAt(reservation.startAt)}</p>
        </div>

        <span
          className={
            "rounded-full px-2.5 py-1 text-xs font-semibold " +
            (isCanceled ? "bg-neutral-100 text-neutral-600" : "bg-neutral-900 text-white")
          }
        >
          {isCanceled ? "취소" : "확정"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-neutral-700 sm:grid-cols-2">
        {reservation.staffName ? (
          <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2">
            <span className="text-neutral-500">디자이너</span>
            <span className="font-medium text-neutral-900">{reservation.staffName}</span>
          </div>
        ) : null}
        {reservation.serviceName ? (
          <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2">
            <span className="text-neutral-500">시술</span>
            <span className="font-medium text-neutral-900">{reservation.serviceName}</span>
          </div>
        ) : null}
        {reservation.price !== undefined ? (
          <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2">
            <span className="text-neutral-500">금액</span>
            <span className="font-medium text-neutral-900">
              {reservation.price.toLocaleString()}원
            </span>
          </div>
        ) : null}
      </div>

      {(onCancel || onEdit) && !isCanceled ? (
        <div className="mt-4 flex items-center justify-end gap-2">
          {onEdit ? (
            <button
              type="button"
              onClick={() => onEdit(reservation.id)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
            >
              변경
            </button>
          ) : null}
          {onCancel ? (
            <button
              type="button"
              onClick={() => onCancel(reservation.id)}
              className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              취소
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
