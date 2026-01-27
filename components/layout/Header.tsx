"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export interface HeaderProps {
  isAuthenticated?: boolean;
  userLabel?: string;
  onLogout?: () => void;
}

export default function Header({ isAuthenticated, onLogout }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated: authFromHook, logout } = useAuth();
  const isAuthed = isAuthenticated ?? authFromHook;
  const handleLogout = onLogout ?? logout;

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-white" aria-hidden />
          <span className="text-sm font-semibold tracking-tight text-white">HairShop</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/about" className="text-sm text-neutral-200 hover:text-white">
            about
          </Link>
          <Link href="/stores" className="text-sm text-neutral-200 hover:text-white">
            salons
          </Link>
          <Link href="/news-posts" className="text-sm text-neutral-200 hover:text-white">
            news
          </Link>
          {isAuthed ? (
            <>
              <Link href="/my-page" className="text-sm text-neutral-200 hover:text-white">
                mypage
              </Link>
              <button
                type="button"
                onClick={() => handleLogout?.()}
                className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                login
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-200"
              >
                signup
              </Link>
            </div>
          )}
        </nav>

        <button
          type="button"
          className="rounded-xl border border-neutral-700 bg-neutral-900 p-2 text-white hover:bg-neutral-800 md:hidden"
          aria-label="mobile menu"
          onClick={() => setOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        isAuthenticated={isAuthed}
        onLogout={handleLogout}
      />
    </header>
  );
}
