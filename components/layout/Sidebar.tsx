"use client";

import Link from "next/link";

export type SidebarNavItem = {
  label: string;
  href: string;
  protected?: boolean;
};

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
  items?: SidebarNavItem[];
  onLogout?: () => void;
}

const defaultItems: SidebarNavItem[] = [
  { label: "홈", href: "/" },
  { label: "매장", href: "/stores" },
  { label: "소식", href: "/news-posts" },
  { label: "예약", href: "/reservation", protected: true },
  { label: "내 예약", href: "/my-reservations", protected: true },
];

export default function Sidebar({
  open,
  onClose,
  isAuthenticated = false,
  items = defaultItems,
  onLogout,
}: SidebarProps) {
  const visibleItems = items.filter((item) => (item.protected ? isAuthenticated : true));

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[280px] border-l border-neutral-200 bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-label="모바일 메뉴"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <span className="text-sm font-semibold text-neutral-900">메뉴</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
            aria-label="메뉴 닫기"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="px-2 py-3">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
            >
              {item.label}
            </Link>
          ))}

          <div className="my-3 h-px bg-neutral-200" />

          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                onLogout?.();
                onClose();
              }}
              className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100"
            >
              로그아웃
            </button>
          ) : (
            <div className="space-y-1">
              <Link
                href="/login"
                onClick={onClose}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                onClick={onClose}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
