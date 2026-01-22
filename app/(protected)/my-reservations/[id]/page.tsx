"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import ReservationCard from "@/components/reservation/ReservationCard";
import { reservationService } from "@/api/services/reservationService";
import { useReservation } from "@/hooks/useReservation";
import { isPast } from "@/utils/date";

export default function MyReservationDetailPage({ params }: { params: { id: string } }) {
  const { cancelReservation, isCanceling } = useReservation();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservation", params.id],
    queryFn: () => reservationService.getReservationById(params.id),
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        예약 정보를 불러오지 못했습니다.
      </div>
    );
  if (!data)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        데이터가 없습니다.
      </div>
    );

  const canCancel = data.status === "confirmed" && !isPast(data.start_at);

  const summary = {
    id: data.id,
    status: data.status,
    startAt: data.start_at,
    storeName: data.staff?.store?.name,
    staffName: data.staff?.name,
    serviceName: data.service?.name,
    price: data.service?.price,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-neutral-900">예약 상세</h1>
        <Link
          href="/my-reservations"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
        >
          목록으로
        </Link>
      </div>

      <ReservationCard
        reservation={summary}
        onCancel={
          canCancel
            ? () => {
                setShowCancelModal(true);
              }
            : undefined
        }
      />

      <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)}>
        <div className="space-y-4">
          <p className="text-sm text-neutral-800">정말 예약을 취소하시겠어요?</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowCancelModal(false)}
              disabled={isCanceling}
            >
              닫기
            </Button>
            <Button
              variant="danger"
              disabled={isCanceling}
              onClick={() => {
                cancelReservation(params.id);
                setShowCancelModal(false);
              }}
            >
              {isCanceling ? "취소 중..." : "예약 취소"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
