export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const BUSINESS_HOURS = {
  START: 8,
  END: 20,
  LUNCH_START: 12,
  LUNCH_END: 13,
} as const;

export const RESERVATION_STATUS = {
  CONFIRMED: "confirmed",
  CANCELED: "canceled",
} as const;
