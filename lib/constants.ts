export const API_BASE_URL = process.env.NEXT_PUBLIC_API_PROXY_URL ?? "/api";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;
if (!backendUrl) {
  console.warn("NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다. 프록시가 실패할 수 있습니다.");
}
console.log("🔍 API_BASE_URL:", API_BASE_URL);
console.log("🔍 BACKEND_API_URL:", backendUrl);

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
