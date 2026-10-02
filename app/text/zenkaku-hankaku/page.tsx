import type { Metadata } from "next";
import Link from "next/link";
import ZenkakuHankakuTool from "../../components/ZenkakuHankakuTool";

export const metadata: Metadata = {
  title: "全角・半角変換ツール | お買いもの計算ツールズ",
  description:
    "テキストの全角・半角を英数字・カタカナ・スペースごとに選択して一括変換できる無料ツール。全角→半角、半角→全角の両方向に対応。入力はブラウザ内で処理され、外部に送信されません。",
  alternates: {
    canonical: "/text/zenkaku-hankaku",
  },
};

const relatedToolClass =
  "rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow";

export default function ZenkakuHankakuPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          全角・半角変換ツール
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          英数字・カタカナ・スペースを個別に選んで変換。入力はブラウザ内で処理され、外部に送信されません
        </p>
      </header>

      <ZenkakuHankakuTool />
      <div className="my-6 min-h-[100px]" aria-label="広告スペース" />

      <section className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
        <h2 className="text-sm font-bold text-slate-700">このツールの使い方</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
          <li>入力欄に変換したいテキストを貼り付けます。</li>
          <li>
            「全角 → 半角」または「半角 → 全角」に変換方向を切り替えます。
          </li>
          <li>
            変換したい対象（英数字 / カタカナ / スペース）を個別にON/OFFします。
          </li>
          <li>
            「変換する」ボタンを押すと、選択した対象だけが変換され、変換前後の文字数が表示されます。
          </li>
          <li>
            「結果をコピー」で変換結果をクリップボードにコピーできます。
          </li>
        </ol>

        <h2 className="mt-5 text-sm font-bold text-slate-700">変換例</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-slate-500">全角 → 半角</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`ＳｍａｒｔＴｏｏｌｓ１２３　サンプル`}</pre>
            <p className="mt-1 text-xs text-slate-400">↓ すべてON</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`SmartTools123 ｻﾝﾌﾟﾙ`}</pre>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">半角 → 全角</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`SmartTools123 ｻﾝﾌﾟﾙ`}</pre>
            <p className="mt-1 text-xs text-slate-400">↓ すべてON</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`ＳｍａｒｔＴｏｏｌｓ１２３　サンプル`}</pre>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
        <h2 className="text-sm font-bold text-slate-700">よくある質問</h2>
        <div className="mt-3 space-y-4">
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 入力したテキストは外部に送信されますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              いいえ。すべての処理はお使いのブラウザ内で行われ、入力したテキストが外部のサーバーやAPIに送信されることはありません。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 変換できない文字はどうなりますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              ひらがな、漢字、変換対象に含まれない記号などはそのまま保持されます。選択した対応する文字だけが変換されます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. カタカナの濁点は正しく変換されますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              はい。半角カタカナの「ｶﾞ」は全角「ガ」に、全角カタカナの「ガ」は半角「ｶﾞ」のように、濁音・半濁音を正しく合成・分解して変換します。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 英数字だけ変換できますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              はい。変換対象のチェックボックスを「英数字」のみONにすれば、カタカナやスペースはそのままに、英数字だけを変換できます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 実行後に入力をやり直せますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              はい。実行しても入力欄の内容は変更されないため、変換方向や対象を切り替えて何度でも再実行できます。入力と結果を消したいときは「入力と結果をクリア」ボタンを使ってください。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-slate-800">関連ツール</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href="/" className={relatedToolClass}>
            <p className="text-sm font-bold text-slate-800">お買いもの計算ツールズ</p>
            <p className="mt-1 text-xs text-slate-500">
              割引・消費税・パーセントをその場ですぐ計算
            </p>
          </Link>
          <Link href="/text/duplicate-lines" className={relatedToolClass}>
            <p className="text-sm font-bold text-slate-800">テキスト重複削除ツール</p>
            <p className="mt-1 text-xs text-slate-500">
              重複した行を一括で削除して整理
            </p>
          </Link>
          <a
            href="https://count.smart-tools-calc.com/"
            target="_blank"
            rel="noreferrer"
            className={relatedToolClass}
          >
            <p className="text-sm font-bold text-slate-800">文字数カウント</p>
            <p className="mt-1 text-xs text-slate-500">
              文字数・行数を入力しながらその場でカウント
            </p>
          </a>
        </div>
      </section>
      <div className="my-6 min-h-[100px]" aria-label="広告スペース" />

      <footer className="mt-10 text-center text-xs text-slate-400">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/privacy?from=/text/zenkaku-hankaku" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact?from=/text/zenkaku-hankaku" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/about?from=/text/zenkaku-hankaku" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            運営者情報
          </Link>
        </nav>
        <p className="mt-4">© 2026 全角・半角変換ツール</p>
      </footer>
    </main>
  );
}
