"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import DatePicker from "@/components/reservation/DatePicker";
import TimeSlotGrid from "@/components/reservation/TimeSlotGrid";
import { useAvailability } from "@/hooks/useAvailability";
import { formatTimeSlot } from "@/utils/timeSlot";

export default function ReservationSchedulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const staffId = searchParams.get("staff_id");
  const serviceId = searchParams.get("service_id");

  const staffIdNum = staffId ? Number(staffId) : null;
  const serviceIdNum = serviceId ? Number(serviceId) : null;

  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  const availabilityQuery = useAvailability(selectedDate ?? null, staffIdNum);

  const slots = useMemo(() => {
    const data = availabilityQuery.data ?? [];
    return data.map((s) => ({
      startAt: s.start_at,
      label: formatTimeSlot(s.start_at),
      available: s.available,
    }));
  }, [availabilityQuery.data]);

  if (
    !staffIdNum ||
    !serviceIdNum ||
    !Number.isFinite(staffIdNum) ||
    !Number.isFinite(serviceIdNum)
  ) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        잘못된 접근입니다. 다시 예약을 시작해주세요.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">예약 시간 선택</h1>
        <p className="mt-1 text-sm text-neutral-500">날짜와 시간을 선택하세요.</p>
      </div>

      <DatePicker
        value={selectedDate}
        onChange={(d) => {
          setSelectedDate(d);
          setSelectedTime(undefined);
        }}
      />

      {selectedDate ? (
        <>
          {availabilityQuery.isLoading ? <Loading /> : null}
          {availabilityQuery.error ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
              예약 가능 시간을 불러오지 못했습니다.
            </div>
          ) : null}
          {!availabilityQuery.isLoading && !availabilityQuery.error ? (
            <TimeSlotGrid
              date={selectedDate}
              slots={slots}
              value={selectedTime}
              onChange={(v) => setSelectedTime(v)}
            />
          ) : null}

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!selectedTime}
              onClick={() => {
                router.push(
                  `/reservation/confirm?staff_id=${staffIdNum}&service_id=${serviceIdNum}&time=${encodeURIComponent(
                    selectedTime!,
                  )}`,
                );
              }}
              className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              다음
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
