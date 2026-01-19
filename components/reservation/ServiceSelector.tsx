"use client";

export type ServiceItem = {
  id: string | number;
  name: string;
  price?: number;
};

export interface ServiceSelectorProps {
  services: ServiceItem[];
  value?: ServiceItem["id"];
  onChange?: (serviceId: ServiceItem["id"]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ServiceSelector({
  services,
  value,
  onChange,
  disabled = false,
  placeholder = "시술을 선택하세요",
}: ServiceSelectorProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-neutral-900">시술</h2>
        <p className="mt-1 text-xs text-neutral-500">원하시는 시술을 선택하세요.</p>
      </header>

      <select
        value={value === undefined ? "" : String(value)}
        disabled={disabled}
        onChange={(e) => {
          const next = e.target.value;
          if (!next) return;
          const original = services.find((s) => String(s.id) === next);
          onChange?.(original ? original.id : next);
        }}
        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-50"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {services.map((s) => (
          <option key={String(s.id)} value={String(s.id)}>
            {s.name}
            {s.price !== undefined ? ` · ${s.price.toLocaleString()}원` : ""}
          </option>
        ))}
      </select>
    </section>
  );
}
