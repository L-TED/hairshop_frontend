"use client";

import { useQuery } from "@tanstack/react-query";
import { reservationService } from "@/api/services/reservationService";

export function useAvailability(date: string | null, staffId: number | null) {
  return useQuery({
    queryKey: ["availability", date, staffId],
    queryFn: () => reservationService.getAvailability(date!, staffId!),
    enabled: !!date && !!staffId, // date와 staffId가 있을 때만 실행
  });
}
