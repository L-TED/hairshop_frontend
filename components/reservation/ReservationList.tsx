"use client";

import Link from "next/link";
import type { ReservationSummary } from "@/components/reservation/ReservationCard";

export interface ReservationListProps {
  reservations: ReservationSummary[];
  onCancel?: (id: string) => void;
  emptyText?: string;
  detailHref?: (id: string) => string;
}

function formatStartAt(startAt: string) {
  const d = new Date(startAt);
  if (Number.isNaN(d.getTime())) return startAt;
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function ReservationList({
  reservations,
  onCancel,
  emptyText = "예약 내역이 없습니다.",
  detailHref = (id) => `/my-reservation/${id}`,
}: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-600 shadow-sm">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <table className="w-full table-auto">
        <thead className="bg-neutral-50">
          <tr className="text-left text-xs font-semibold text-neutral-500">
            <th className="px-4 py-3">일시</th>
            <th className="px-4 py-3">매장</th>
            <th className="px-4 py-3">디자이너</th>
            <th className="px-4 py-3">상태</th>
            <th className="px-4 py-3 text-right">액션</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => {
            const canceled = r.status === "canceled";
            return (
              <tr key={r.id} className="border-t border-neutral-200 text-sm">
                <td className="px-4 py-3 text-neutral-900">{formatStartAt(r.startAt)}</td>
                <td className="px-4 py-3 text-neutral-700">{r.storeName ?? "-"}</td>
                <td className="px-4 py-3 text-neutral-700">{r.staffName ?? "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      "rounded-full px-2 py-1 text-xs font-semibold " +
                      (canceled ? "bg-neutral-100 text-neutral-600" : "bg-neutral-900 text-white")
                    }
                  >
                    {canceled ? "취소" : "확정"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={detailHref(r.id)}
                      className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
                    >
                      상세
                    </Link>
                    {onCancel && !canceled ? (
                      <button
                        type="button"
                        onClick={() => onCancel(r.id)}
                        className="rounded-xl bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800"
                      >
                        취소
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
