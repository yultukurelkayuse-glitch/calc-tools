import Link from "next/link";

export default function InfoPageShell({
  title,
  children,
  backHref = "/",
  backLabel = "← お買いもの計算ツールズ",
  footerLinks = {
    privacy: "/privacy",
    contact: "/contact",
    about: "/about",
  },
}: {
  title: string;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  footerLinks?: {
    privacy: string;
    contact: string;
    about: string;
  };
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <Link
          href={backHref}
          className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          {backLabel}
        </Link>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          {title}
        </h1>
      </header>
      <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
        {children}
      </article>
      <footer className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
        <Link href={footerLinks.privacy} className="hover:text-blue-600 hover:underline">
          プライバシーポリシー
        </Link>
        <Link href={footerLinks.contact} className="hover:text-blue-600 hover:underline">
          お問い合わせ
        </Link>
        <Link href={footerLinks.about} className="hover:text-blue-600 hover:underline">
          運営者情報
        </Link>
      </footer>
    </main>
  );
}
