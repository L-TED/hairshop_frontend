"use client";

export type TimeSlot = {
  startAt: string; // ISO string OR HH:MM (when date not provided)
  label: string; // e.g. 08:30
  available: boolean;
};

export interface TimeSlotGridProps {
  date?: string; // YYYY-MM-DD (optional; used for generation)
  value?: string; // selected slot startAt
  onChange?: (startAt: string) => void;
  disabled?: boolean;
  slots?: TimeSlot[];

  // Generation options (used when slots is not provided)
  openAt?: string; // HH:MM
  closeAt?: string; // HH:MM
  intervalMinutes?: number;
  excludeRanges?: Array<{ start: string; end: string }>; // HH:MM
  unavailableTimes?: string[]; // HH:MM or ISO strings
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map((v) => Number(v));
  return h * 60 + m;
}

function fromMinutes(total: number) {
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function normalizeTimeKey(startAt: string) {
  // If ISO, keep HH:MM portion; else assume HH:MM
  if (startAt.includes("T")) {
    const match = startAt.match(/T(\d{2}:\d{2})/);
    return match?.[1] ?? startAt;
  }
  return startAt;
}

function generateSlots(
  params: Required<
    Pick<
      TimeSlotGridProps,
      "openAt" | "closeAt" | "intervalMinutes" | "excludeRanges" | "unavailableTimes"
    >
  > & { date?: string },
) {
  const open = toMinutes(params.openAt);
  const close = toMinutes(params.closeAt);
  const excluded = params.excludeRanges.map((r) => ({
    start: toMinutes(r.start),
    end: toMinutes(r.end),
  }));
  const unavailableKeys = new Set(params.unavailableTimes.map(normalizeTimeKey));

  const slots: TimeSlot[] = [];
  for (let t = open; t < close; t += params.intervalMinutes) {
    const label = fromMinutes(t);
    const inExcluded = excluded.some((r) => t >= r.start && t < r.end);
    const available = !inExcluded && !unavailableKeys.has(label);
    const startAt = params.date ? `${params.date}T${label}:00` : label;
    slots.push({ startAt, label, available });
  }
  return slots;
}

export default function TimeSlotGrid({
  date,
  value,
  onChange,
  disabled = false,
  slots,
  openAt = "08:00",
  closeAt = "20:00",
  intervalMinutes = 30,
  excludeRanges = [{ start: "12:00", end: "13:00" }],
  unavailableTimes = [],
}: TimeSlotGridProps) {
  const computedSlots =
    slots ??
    generateSlots({
      date,
      openAt,
      closeAt,
      intervalMinutes,
      excludeRanges,
      unavailableTimes,
    });

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-neutral-900">시간</h2>
        <p className="mt-1 text-xs text-neutral-500">30분 단위로 예약 시간을 선택하세요.</p>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {computedSlots.map((slot) => {
          const selected = value === slot.startAt;
          const isDisabled = disabled || !slot.available;
          return (
            <button
              key={slot.startAt}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange?.(slot.startAt)}
              className={
                "rounded-xl border px-2 py-2 text-xs font-semibold transition " +
                (selected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : slot.available
                    ? "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                    : "border-neutral-200 bg-neutral-100 text-neutral-400") +
                (isDisabled ? " cursor-not-allowed" : "")
              }
            >
              {slot.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
