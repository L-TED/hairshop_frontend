export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <p className="text-neutral-700">© {new Date().getFullYear()} HairShop</p>
        <p className="text-xs text-neutral-500">Black / White / Gray UI</p>
      </div>
    </footer>
  );
}
