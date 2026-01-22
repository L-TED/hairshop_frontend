"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import ReservationList from "@/components/reservation/ReservationList";
import { reservationService } from "@/api/services/reservationService";

export default function MyReservationsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: reservationService.getMyReservations,
  });

  const reservations = useMemo(() => {
    const list = (data ?? []).map((r) => ({
      id: r.id,
      status: r.status,
      startAt: r.start_at,
      storeName: r.staff?.store?.name,
      staffName: r.staff?.name,
      serviceName: r.service?.name,
      price: r.service?.price,
    }));

    list.sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());
    return list;
  }, [data]);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        예약 내역을 불러오지 못했습니다.
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">내 예약</h1>
          <p className="mt-1 text-sm text-neutral-500">예약 내역을 확인하세요.</p>
        </div>
        <Link
          href="/reservation"
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          예약하기
        </Link>
      </div>

      {reservations.length === 0 ? (
        <div className="space-y-3">
          <ReservationList reservations={[]} emptyText="예약 내역이 없습니다." />
          <div className="flex justify-center">
            <Link
              href="/reservation"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              지금 예약하기
            </Link>
          </div>
        </div>
      ) : (
        <ReservationList
          reservations={reservations}
          detailHref={(id) => `/my-reservations/${id}`}
        />
      )}
    </div>
  );
}
