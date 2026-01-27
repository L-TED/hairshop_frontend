export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-200">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-10 text-sm md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-white">매장 정보</p>
          <p className="mt-2">서울특별시 (예시) ○○구 ○○로 123</p>
          <p className="mt-1">전화: 02-0000-0000</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">영업 시간</p>
          <p className="mt-2">평일 10:00 - 20:00</p>
          <p className="mt-1">주말 10:00 - 18:00</p>
          <p className="mt-1">정기휴무: 매주 월요일</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">안내</p>
          <p className="mt-2">예약 변경/취소는 예약 시간 전까지 가능합니다.</p>
          <p className="mt-4 text-neutral-300">
            Copyright © 2026 YOUNGHAIR.COM. All rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
