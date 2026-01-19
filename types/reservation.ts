import { Service } from "./service";
import { Staff } from "./store";

export type ReservationStatus = "confirmed" | "canceled";

export interface Reservation {
  id: string;
  status: ReservationStatus;
  start_at: string; // ISO 8601 문자열
  service_id: number;
  staff_id: number;
  customer_id: string;

  // API 응답에 포함될 수 있는 관계 데이터
  service?: Service;
  staff?: Staff;
}

export interface CreateReservationRequest {
  service_id: number;
  staff_id: number;
  start_at: string; // "2026-01-20T08:00:00+09:00"
}

export interface AvailabilitySlot {
  start_at: string;
  available: boolean;
}
