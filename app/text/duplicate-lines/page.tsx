import type { Metadata } from "next";
import Link from "next/link";
import DuplicateLinesTool from "../../components/DuplicateLinesTool";

export const metadata: Metadata = {
  title: "テキスト重複削除ツール | お買いもの計算ツールズ",
  description:
    "テキストから重複した行を一括で削除する無料ツール。最初に出現した行を残して元の並び順を維持します。大文字・小文字を区別しない、行の前後の空白を無視するオプション付き。入力はブラウザ内で処理され、外部に送信されません。",
  alternates: {
    canonical: "/text/duplicate-lines",
  },
};

const relatedToolClass =
  "rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow";

export default function DuplicateLinesPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          テキスト重複削除ツール
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          重複した行を一括削除。入力はブラウザ内で処理され、外部に送信されません
        </p>
      </header>

      <DuplicateLinesTool />
      <div className="my-6 min-h-[100px]" aria-label="広告スペース" />

      <section className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
        <h2 className="text-sm font-bold text-slate-700">このツールの使い方</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
          <li>入力欄に重複を含むテキストを貼り付けます。</li>
          <li>
            必要に応じて「大文字・小文字を区別しない」「行の前後の空白を無視する」のオプションを選択します。
          </li>
          <li>
            「重複行を削除する」ボタンを押すと、最初に出現した行を残したまま重複行が削除されます。並び順は変わりません。
          </li>
          <li>
            削除前後の行数と削除された行数を確認し、「結果をコピー」で結果をコピーできます。
          </li>
        </ol>

        <h2 className="mt-5 text-sm font-bold text-slate-700">利用例</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
          <li>メールアドレスや顧客リストから重複する行を取り除きたいとき</li>
          <li>アンケートの自由回答や単語リストで同じ項目をまとめたいとき</li>
          <li>ログやデータの行から重複するレコードを除いて数え直したいとき</li>
        </ul>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-slate-500">入力例</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`りんご
バナナ
りんご
みかん
バナナ`}</pre>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">実行結果</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`りんご
バナナ
みかん`}</pre>
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
              Q. 並び順はどうなりますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              最初に出現した行を残して、それ以降の同じ行を削除します。元のテキストの並び順はそのまま維持されます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 空の行はどう扱われますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              空の行も1行として数えられます。空の行が複数ある場合も他の行と同じ扱いになり、最初の1行だけが残ります。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. オプションを付けるとどう変わりますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              「大文字・小文字を区別しない」をONにするとAppleとappleのような行が同じ行とみなされ、「行の前後の空白を無視する」をONにすると行頭・行末のスペースやタブを除いて比較されます。どちらの場合も、削除結果には最初に出現した行が元の表記のまま表示されます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 実行後に入力をやり直せますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              実行しても入力欄の内容は変更されないため、オプションを切り替えて何度でも再実行できます。入力と結果を消したいときは「入力と結果をクリア」ボタンを使ってください。
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
          <Link href="/privacy?from=/text/duplicate-lines" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact?from=/text/duplicate-lines" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/about?from=/text/duplicate-lines" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            運営者情報
          </Link>
        </nav>
        <p className="mt-4">© 2026 テキスト重複削除ツール</p>
      </footer>
    </main>
  );
}
