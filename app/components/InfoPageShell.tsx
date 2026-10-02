import { Suspense } from "react";
import Link from "next/link";
import InfoNavLinks from "./InfoNavLinks";

export default function InfoPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <Suspense
          fallback={
            <Link
              href="/"
              className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
            >
              ← サイトトップへ
            </Link>
          }
        >
          <InfoNavLinks part="back" />
        </Suspense>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          {title}
        </h1>
      </header>
      <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
        {children}
      </article>
      <Suspense
        fallback={
          <nav className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-blue-600 hover:underline">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="hover:text-blue-600 hover:underline">
              お問い合わせ
            </Link>
            <Link href="/about" className="hover:text-blue-600 hover:underline">
              運営者情報
            </Link>
          </nav>
        }
      >
        <InfoNavLinks part="footer" />
      </Suspense>
    </main>
  );
}
