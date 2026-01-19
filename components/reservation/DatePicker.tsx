"use client";

export interface DatePickerProps {
  value?: string; // YYYY-MM-DD
  onChange?: (value: string) => void;
  min?: string; // YYYY-MM-DD
  max?: string; // YYYY-MM-DD
  disabled?: boolean;
}

function todayIsoDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function DatePicker({ value, onChange, min, max, disabled }: DatePickerProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-neutral-900">날짜</h2>
        <p className="mt-1 text-xs text-neutral-500">예약 날짜를 선택하세요.</p>
      </header>

      <input
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        min={min ?? todayIsoDate()}
        max={max}
        disabled={disabled}
        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-50"
      />
    </section>
  );
}
