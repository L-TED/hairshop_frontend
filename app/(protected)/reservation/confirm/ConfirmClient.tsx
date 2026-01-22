"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import ReservationCard from "@/components/reservation/ReservationCard";
import { staffService } from "@/api/services/staffService";
import { serviceService } from "@/api/services/serviceService";
import { useReservation } from "@/hooks/useReservation";

export default function ConfirmClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const staffId = Number(searchParams.get("staff_id"));
  const serviceId = Number(searchParams.get("service_id"));
  const startAt = searchParams.get("time") ?? "";

  const valid = Number.isFinite(staffId) && Number.isFinite(serviceId) && Boolean(startAt);

  const staffQuery = useQuery({
    queryKey: ["staff", staffId],
    queryFn: () => staffService.getStaffById(staffId),
    enabled: valid,
  });

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: serviceService.getAllServices,
    enabled: valid,
  });

  const selectedService = useMemo(
    () => (servicesQuery.data ?? []).find((s) => s.id === serviceId),
    [servicesQuery.data, serviceId],
  );

  const { createReservation, isCreating } = useReservation();

  if (!valid) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        잘못된 접근입니다. 다시 예약을 시작해주세요.
      </div>
    );
  }

  if (staffQuery.isLoading || servicesQuery.isLoading) return <Loading />;
  if (staffQuery.error || servicesQuery.error)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        예약 정보를 불러오지 못했습니다.
      </div>
    );

  const reservationPreview = {
    id: "preview",
    status: "confirmed" as const,
    startAt,
    storeName: staffQuery.data?.store?.name,
    staffName: staffQuery.data?.name,
    serviceName: selectedService?.name,
    price: selectedService?.price,
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">예약 확인</h1>
        <p className="mt-1 text-sm text-neutral-500">선택한 정보가 맞는지 확인하세요.</p>
      </div>

      <ReservationCard reservation={reservationPreview} />

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
        >
          뒤로가기
        </button>
        <button
          type="button"
          disabled={isCreating}
          onClick={() =>
            createReservation({
              staff_id: staffId,
              service_id: serviceId,
              start_at: startAt,
            })
          }
          className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {isCreating ? "예약 중…" : "예약 확정"}
        </button>
      </div>
    </div>
  );
}
