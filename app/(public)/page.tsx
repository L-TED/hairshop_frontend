"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          헤어샵 예약 서비스
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
          편하게 매장과 디자이너를 선택하고, 원하는 시간에 예약하세요.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/reservation"
            className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            예약하기
          </Link>
          <Link
            href="/stores"
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            매장 안내
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900">매장 위치</h2>
        <p className="mt-2 text-sm text-neutral-600">가까운 매장을 선택하고 예약을 진행하세요.</p>
        <div className="mt-4">
          <Link
            href="/stores"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            매장 목록 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
