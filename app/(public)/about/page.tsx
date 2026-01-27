import Link from "next/link";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("HIT route handler", req.nextUrl.pathname);
  return NextResponse.json({ ok: true, path: req.nextUrl.pathname });
}

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="flex min-h-screen flex-col justify-center gap-10 rounded-4xl border border-neutral-200/70 bg-linear-to-br from-neutral-50 via-white to-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 animate-fade-up">
            About HairShop
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl animate-fade-up-delay-1">
            편안함과 세련됨을 담은
            <br />
            프리미엄 헤어 라운지
          </h1>
          <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base animate-fade-up-delay-2">
            고객의 라이프스타일에 맞춘 상담, 섬세한 디자인, 그리고 꾸준한 케어로 일상 속 자신감을
            완성합니다. 여유로운 공간에서 나만의 스타일을 만나보세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
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
              매장 위치 보기
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`about-hero-${index}`}
              className="relative h-48 rounded-2xl border border-neutral-200 bg-neutral-100/70 shadow-sm animate-float-slow"
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid min-h-screen items-center gap-10 rounded-4xl border border-neutral-200/70 bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 animate-fade-up">
            Our Story
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-neutral-900 sm:text-3xl animate-fade-up-delay-1">
            디자이너의 손끝에서
            <br />
            완성되는 맞춤 스타일
          </h2>
          <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base animate-fade-up-delay-2">
            스타일 분석부터 컬러, 케어까지 섬세한 프로세스를 통해 고객 한 사람 한 사람의 개성과
            분위기에 어울리는 디자인을 제안합니다.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-600 animate-fade-up-delay-2">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
              1:1 맞춤 컨설팅
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
              프리미엄 케어 & 제품
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
              리터치 및 유지 관리 제안
            </li>
          </ul>
        </div>
        <div className="relative h-64 rounded-3xl border border-neutral-200 bg-neutral-100/70 shadow-sm animate-float-slow">
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Image Placeholder
          </div>
        </div>
      </section>

      <section className="grid min-h-screen items-center gap-8 rounded-4xl border border-neutral-200/70 bg-linear-to-br from-white via-neutral-50 to-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12 md:grid-cols-3">
        <div className="md:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 animate-fade-up">
            Space
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-neutral-900 sm:text-3xl animate-fade-up-delay-1">
            머무는 동안
            <br />더 편안한 공간
          </h2>
          <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base animate-fade-up-delay-2">
            미니멀한 인테리어와 자연광이 어우러진 공간에서 여유롭고 세련된 시간을 경험하세요.
          </p>
        </div>
        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`about-space-${index}`}
              className="relative h-40 rounded-2xl border border-neutral-200 bg-neutral-100/70 shadow-sm animate-float-slow"
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
