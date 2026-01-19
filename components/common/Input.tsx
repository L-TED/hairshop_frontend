interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "email";
  placeholder?: string;
  error?: string;
}

export default function Input({ value, onChange, type = "text", placeholder, error }: InputProps) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border px-3 py-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
