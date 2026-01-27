"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="flex min-h-[100vh] flex-col justify-center rounded-[32px] border border-neutral-200/70 bg-gradient-to-br from-white via-white to-neutral-50 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          헤어샵 예약 서비스
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
          편하게 매장과 디자이너를 선택하고, 원하는 시간에 예약하세요.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/reservation"
            className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 hover:bg-neutral-800"
          >
            예약하기
          </Link>
          <Link
            href="/stores"
            className="rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            매장 안내
          </Link>
        </div>
      </section>

      <section className="flex min-h-[100vh] flex-col justify-center rounded-[32px] border border-neutral-200/70 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
        <h2 className="text-2xl font-semibold text-neutral-900">매장 위치</h2>
        <p className="mt-3 text-sm text-neutral-600 sm:text-base">
          가까운 매장을 선택하고 예약을 진행하세요.
        </p>
        <div className="mt-6">
          <Link
            href="/stores"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            매장 목록 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
