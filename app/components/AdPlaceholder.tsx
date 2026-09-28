export default function AdPlaceholder() {
  return (
    <aside
      aria-label="広告掲載スペース"
      className="mt-6 flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        Sponsored Link
      </span>
      <span className="mt-2 text-xs text-slate-400">ここに広告が表示されます</span>
    </aside>
  );
}
