import Link from "next/link";

const TOOLS: { href: string; label: string }[] = [
  { href: "/discount", label: "割引計算機" },
  { href: "/tax", label: "消費税計算機" },
  { href: "/percentage", label: "パーセント計算機" },
];

export default function ToolPageShell({
  title,
  currentPath,
  children,
}: {
  title: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  const otherTools = TOOLS.filter((tool) => tool.href !== currentPath);

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <Link
          href="/"
          className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          ← サイトトップへ
        </Link>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          {title}
        </h1>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>ほかの計算機:</span>
          {otherTools.map((tool, index) => (
            <span key={tool.href}>
              {index > 0 && <span aria-hidden="true" className="mr-3">·</span>}
              <Link
                href={tool.href}
                className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
              >
                {tool.label}
              </Link>
            </span>
          ))}
        </nav>
      </header>

      {children}

      <footer className="mt-10 text-center text-xs text-slate-400">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link
            href={`/privacy?from=${encodeURIComponent(currentPath)}`}
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href={`/contact?from=${encodeURIComponent(currentPath)}`}
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href={`/about?from=${encodeURIComponent(currentPath)}`}
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            運営者情報
          </Link>
        </nav>
        <p className="mt-4">© 2026 お買いもの計算ツールズ</p>
      </footer>
    </main>
  );
}
