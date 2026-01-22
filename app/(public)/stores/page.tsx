"use client";

import { useQuery } from "@tanstack/react-query";
import { storeService } from "@/api/services/storeService";
import Loading from "@/components/common/Loading";
import StoreCard from "@/components/store/StoreCard";

export default function StoresPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stores"],
    queryFn: storeService.getAllStores,
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        매장 정보를 불러오지 못했습니다.
      </div>
    );
  if (!data)
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
        데이터가 없습니다.
      </div>
    );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">매장 안내</h1>
        <p className="mt-1 text-sm text-neutral-500">매장 정보를 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((s) => (
          <StoreCard
            key={s.id}
            store={{
              id: s.id,
              name: s.name,
              address: s.address,
              latitude: s.latitude,
              longitude: s.longitude,
            }}
            hideDetail
          />
        ))}
      </div>
    </div>
  );
}
