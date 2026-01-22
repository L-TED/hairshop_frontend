import apiClient from "@/lib/axios";
import { Reservation, CreateReservationRequest, AvailabilitySlot } from "@/types/reservation";

export const reservationService = {
  // 내 예약 목록
  async getMyReservations(): Promise<Reservation[]> {
    const { data } = await apiClient.get<Reservation[]>("/reservations");
    return data;
  },

  // 예약 상세
  async getReservationById(id: string): Promise<Reservation> {
    const { data } = await apiClient.get<Reservation>(`/reservations/${id}`);
    return data;
  },

  // 예약 생성
  async createReservation(data: CreateReservationRequest): Promise<Reservation> {
    const response = await apiClient.post<Reservation>("/reservations", data);
    return response.data;
  },

  // 예약 취소
  async cancelReservation(id: string): Promise<void> {
    await apiClient.delete(`/reservations/${id}`);
  },

  // 예약 가능 시간 조회
  async getAvailability(date: string, staffId: number): Promise<AvailabilitySlot[]> {
    const { data } = await apiClient.get<AvailabilitySlot[]>("/availability", {
      params: { date, staff_id: staffId },
    });
    return data;
  },
};
