import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function normalizeBackendBase(base?: string) {
  if (!base) return null;
  const trimmed = base.replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed.slice(0, -4) : trimmed;
}

function splitSetCookieHeader(header: string): string[] {
  const cookies: string[] = [];
  let start = 0;
  let inExpires = false;

  for (let i = 0; i < header.length; i += 1) {
    const char = header[i];
    if (!inExpires && char === ",") {
      const part = header.slice(start, i).trim();
      if (part) cookies.push(part);
      start = i + 1;
      continue;
    }

    const segment = header.slice(i, i + 8).toLowerCase();
    if (segment === "expires=") {
      inExpires = true;
    } else if (inExpires && char === ";") {
      inExpires = false;
    }
  }

  const last = header.slice(start).trim();
  if (last) cookies.push(last);
  return cookies;
}

function applySetCookie(nextRes: NextResponse, setCookieValue: string) {
  const parts = setCookieValue.split(";").map((part) => part.trim());
  const [nameValue, ...attrParts] = parts;
  if (!nameValue) return;

  const nameSplit = nameValue.split("=");
  const name = nameSplit.shift()?.trim();
  const value = nameSplit.join("=");
  if (!name) return;

  const options: {
    path?: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  } = {};

  for (const attr of attrParts) {
    const [rawKey, ...rawVal] = attr.split("=");
    const key = rawKey.toLowerCase();
    const val = rawVal.join("=");

    if (key === "path") {
      options.path = val || "/";
      continue;
    }
    if (key === "max-age") {
      const num = Number(val);
      if (!Number.isNaN(num)) options.maxAge = num;
      continue;
    }
    if (key === "expires") {
      const date = new Date(val);
      if (!Number.isNaN(date.getTime())) options.expires = date;
      continue;
    }
    if (key === "samesite") {
      const normalized = val.toLowerCase() as "lax" | "strict" | "none";
      options.sameSite = normalized;
      continue;
    }
    if (key === "secure" || attr.toLowerCase() === "secure") {
      options.secure = true;
      continue;
    }
    if (key === "httponly" || attr.toLowerCase() === "httponly") {
      options.httpOnly = true;
      continue;
    }
    if (key === "domain") {
      continue; // drop domain to make host-only cookie for frontend
    }
  }

  nextRes.cookies.set({ name, value, ...options });
}

async function proxyRequest(request: NextRequest) {
  const normalizedBase = normalizeBackendBase(BACKEND_BASE_URL);
  if (!normalizedBase) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const url = new URL(request.nextUrl.pathname + request.nextUrl.search, "http://localhost");
  const backendPath = url.pathname.replace(/^\/api/, "");
  const backendUrl = `${normalizedBase}${backendPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const res = await fetch(backendUrl, init);
  const responseHeaders = new Headers(res.headers);
  responseHeaders.delete("set-cookie");

  const nextRes = new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: responseHeaders,
  });

  const setCookieValues =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : (() => {
          const header = res.headers.get("set-cookie");
          return header ? splitSetCookieHeader(header) : [];
        })();

  for (const setCookie of setCookieValues) {
    applySetCookie(nextRes, setCookie);
  }

  return nextRes;
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

export async function OPTIONS(request: NextRequest) {
  return proxyRequest(request);
}
