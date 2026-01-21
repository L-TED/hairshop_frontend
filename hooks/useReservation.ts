"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { reservationService } from "@/api/services/reservationService";
import { CreateReservationRequest } from "@/types/reservation";

export function useReservation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 예약 생성
  const createMutation = useMutation({
    mutationFn: (data: CreateReservationRequest) => reservationService.createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      router.push("/my-reservations");
    },
  });

  // 예약 취소
  const cancelMutation = useMutation({
    mutationFn: (id: string) => reservationService.cancelReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  return {
    createReservation: createMutation.mutate,
    cancelReservation: cancelMutation.mutate,
    isCreating: createMutation.isPending,
    isCanceling: cancelMutation.isPending,
  };
}
