import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const TOOLS: {
  href: string;
  icon: string;
  name: string;
  canDo: string;
  description: string;
}[] = [
  {
    href: "/discount",
    icon: "🛒",
    name: "割引計算機",
    canDo: "セール商品の割引後価格を確認",
    description:
      "「20% OFFっていくらになる？」割引後の支払額と、いくら安くなるかをすぐ確認できます。",
  },
  {
    href: "/tax",
    icon: "🛍️",
    name: "消費税計算機",
    canDo: "税込み価格・税額を確認",
    description:
      "買い物リストの税込合計を、商品ごとに8%・10%の税率を選んでレシート風に計算できます。",
  },
  {
    href: "/percentage",
    icon: "🔢",
    name: "パーセント計算機",
    canDo: "○○の○%を計算",
    description:
      "「2,000円の15%はいくら？」のような割合を、式を考えずに穴埋めで求められます。",
  },
];

const TOOL_GUIDE: { question: string; answer: string; href: string }[] = [
  {
    question: "20% OFFのときの支払額を知りたい",
    answer: "割引計算",
    href: "/discount",
  },
  {
    question: "買い物の税込み合計を知りたい",
    answer: "消費税計算",
    href: "/tax",
  },
  {
    question: "2,000円の15%など、割合の金額を知りたい",
    answer: "パーセント計算",
    href: "/percentage",
  },
];

const USAGE_EXAMPLES: {
  icon: string;
  scene: string;
  input: string;
  output: string;
  href: string;
}[] = [
  {
    icon: "🛒",
    scene: "洋服が2,980円で30% OFFのセール中。支払額を知りたい",
    input: "元の金額 2,980円、割引率 30% OFF",
    output: "支払額 2,086円（894円お得）",
    href: "/discount",
  },
  {
    icon: "🛍️",
    scene: "税抜1,200円のお弁当（8%）と税抜680円のお茶（10%）の税込合計を知りたい",
    input: "お弁当 1,200円・8%、お茶 680円・10%",
    output: "税込合計 2,044円",
    href: "/tax",
  },
  {
    icon: "🔢",
    scene: "5,000円の予算のうち20%を貯金に回したい。いくらなら",
    input: "A 5,000、B 20",
    output: "1,000円",
    href: "/percentage",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          お買いもの計算ツールズ
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          セールの値引き後の価格、税込みの合計、○○の○%。
          <br className="sm:hidden" />
          買い物中の「これ、いくら？」を、その場ですぐ計算できる無料ツールです。
        </p>
      </header>

      <section aria-labelledby="tool-list">
        <h2 id="tool-list" className="text-base font-bold text-slate-800">
          このサイトでできること
        </h2>
        <div className="mt-3 space-y-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow active:scale-[0.99]"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                {tool.icon}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold text-slate-800">
                  {tool.canDo}
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">
                  {tool.description}
                </span>
                <span className="mt-2 block text-xs font-bold text-blue-600">
                  {tool.name}を使う →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="tool-guide" className="mt-10">
        <h2 id="tool-guide" className="text-base font-bold text-slate-800">
          どの計算機を使えばいい？
        </h2>
        <p className="mt-1 text-[13px] text-slate-500">
          知りたいことから選ぶと、対応する計算機のページが開きます。
        </p>
        <div className="mt-3 space-y-2">
          {TOOL_GUIDE.map((guide) => (
            <Link
              key={guide.question}
              href={guide.href}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow active:scale-[0.99]"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-700">
                  {guide.question}
                </span>
                <span className="mt-0.5 block text-xs font-bold text-blue-600">
                  → {guide.answer}
                </span>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ▸
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="usage-examples" className="mt-8">
        <h2 id="usage-examples" className="text-base font-bold text-slate-800">
          実際の利用例
        </h2>
        <div className="mt-3 space-y-3">
          {USAGE_EXAMPLES.map((example) => (
            <div
              key={example.scene}
              className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold leading-relaxed text-slate-800">
                <span aria-hidden="true" className="mr-1.5">
                  {example.icon}
                </span>
                {example.scene}
              </p>
              <dl className="mt-3 space-y-1 text-[13px]">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold text-slate-500">入力</dt>
                  <dd className="text-slate-600">{example.input}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold text-slate-500">結果</dt>
                  <dd className="font-bold text-blue-600">{example.output}</dd>
                </div>
              </dl>
              <Link
                href={example.href}
                className="mt-3 block w-full rounded-lg border-2 border-blue-100 py-2 text-center text-sm font-bold text-blue-600 transition-all hover:bg-blue-50 active:scale-[0.99]"
              >
                この計算機を試す
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 text-center text-xs text-slate-400">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link
            href="/privacy"
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/contact"
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/about"
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
