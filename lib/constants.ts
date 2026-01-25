const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/$/, "");
const isLocalhostUrl = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(
  normalizedApiBaseUrl,
);

const safeApiBaseUrl = isLocalhostUrl ? "" : normalizedApiBaseUrl;

export const API_BASE_URL = safeApiBaseUrl
  ? safeApiBaseUrl.endsWith("/api")
    ? safeApiBaseUrl
    : `${safeApiBaseUrl}/api`
  : "";

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
