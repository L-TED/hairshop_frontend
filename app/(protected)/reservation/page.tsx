"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { storeService } from "@/api/services/storeService";
import { staffService } from "@/api/services/staffService";
import { serviceService } from "@/api/services/serviceService";
import Loading from "@/components/common/Loading";
import StoreCard from "@/components/store/StoreCard";
import StaffSelector from "@/components/reservation/StaffSelector";
import ServiceSelector from "@/components/reservation/ServiceSelector";

export default function ReservationStep1Page() {
  const router = useRouter();
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const storesQuery = useQuery({
    queryKey: ["stores"],
    queryFn: storeService.getAllStores,
  });

  const staffsQuery = useQuery({
    queryKey: ["staffs", selectedStoreId],
    queryFn: () => staffService.getStaffsByStoreId(selectedStoreId!),
    enabled: !!selectedStoreId,
  });

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: serviceService.getAllServices,
  });

  const canNext = Boolean(selectedStaffId && selectedServiceId);

  const staffItems = useMemo(
    () =>
      (staffsQuery.data ?? []).map((s) => ({
        id: s.id,
        name: s.name,
      })),
    [staffsQuery.data],
  );

  const serviceItems = useMemo(
    () =>
      (servicesQuery.data ?? []).map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
      })),
    [servicesQuery.data],
  );

  if (storesQuery.isLoading) return <Loading />;
  if (storesQuery.error)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        매장 목록을 불러오지 못했습니다.
      </div>
    );
  if (!storesQuery.data)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        데이터가 없습니다.
      </div>
    );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">예약하기</h1>
        <p className="mt-1 text-sm text-neutral-500">매장 → 디자이너 → 시술을 선택하세요.</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-neutral-900">1) 매장 선택</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {storesQuery.data.map((s) => (
            <StoreCard
              key={s.id}
              store={{
                id: s.id,
                name: s.name,
                address: s.address,
                latitude: s.latitude,
                longitude: s.longitude,
              }}
              selected={selectedStoreId === s.id}
              actionLabel={selectedStoreId === s.id ? "선택됨" : "선택"}
              onAction={() => {
                setSelectedStoreId(s.id);
                setSelectedStaffId(null);
                setSelectedServiceId(null);
              }}
            />
          ))}
        </div>
      </section>

      {selectedStoreId ? (
        <div className="space-y-4">
          {staffsQuery.isLoading ? <Loading /> : null}
          {staffsQuery.error ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
              디자이너 목록을 불러오지 못했습니다.
            </div>
          ) : null}
          {!staffsQuery.isLoading && !staffsQuery.error ? (
            <StaffSelector
              staff={staffItems}
              value={selectedStaffId ?? undefined}
              onChange={(id) => setSelectedStaffId(Number(id))}
            />
          ) : null}

          {selectedStaffId ? (
            <ServiceSelector
              services={serviceItems}
              value={selectedServiceId ?? undefined}
              onChange={(id) => setSelectedServiceId(Number(id))}
              disabled={servicesQuery.isLoading}
            />
          ) : null}

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!canNext}
              onClick={() => {
                router.push(
                  `/reservation/schedule?staff_id=${selectedStaffId}&service_id=${selectedServiceId}`,
                );
              }}
              className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              다음
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
