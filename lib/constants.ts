const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/$/, "");

export const API_BASE_URL = normalizedApiBaseUrl.endsWith("/api")
  ? normalizedApiBaseUrl
  : `${normalizedApiBaseUrl}/api`;

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
