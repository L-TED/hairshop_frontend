"use client";

export type StaffItem = {
  id: string | number;
  name: string;
  title?: string;
};

export interface StaffSelectorProps {
  staff: StaffItem[];
  value?: StaffItem["id"];
  onChange?: (staffId: StaffItem["id"]) => void;
  disabled?: boolean;
}

export default function StaffSelector({
  staff,
  value,
  onChange,
  disabled = false,
}: StaffSelectorProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-neutral-900">디자이너</h2>
        <p className="mt-1 text-xs text-neutral-500">원하시는 담당자를 선택하세요.</p>
      </header>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {staff.map((s) => {
          const selected = value === s.id;
          return (
            <button
              key={String(s.id)}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(s.id)}
              className={
                "flex items-center justify-between rounded-xl border px-3 py-3 text-left transition " +
                (selected
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50") +
                (disabled ? " cursor-not-allowed opacity-60" : "")
              }
            >
              <div>
                <p className="text-sm font-semibold">{s.name}</p>
                {s.title ? (
                  <p
                    className={
                      "mt-0.5 text-xs " + (selected ? "text-white/80" : "text-neutral-500")
                    }
                  >
                    {s.title}
                  </p>
                ) : null}
              </div>
              <span className={"text-xs " + (selected ? "text-white/80" : "text-neutral-400")}>
                선택
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
