// proxy.ts (프로젝트 루트 또는 src/proxy.ts)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const hasAccess = Boolean(req.cookies.get("accessToken")?.value);
  const hasRefresh = Boolean(req.cookies.get("refreshToken")?.value);
  const ok = hasAccess || hasRefresh;

  if (!ok) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 보호할 경로만 지정
export const config = {
  matcher: ["/reservation/:path*", "/my-page/:path*", "/my-reservation/:path*"],
};
