import type { Metadata } from "next";
import Link from "next/link";
import TextDiffTool from "../../components/TextDiffTool";

export const metadata: Metadata = {
  title: "テキスト比較ツール（差分チェッカー） | お買いもの計算ツールズ",
  description:
    "2つのテキストを行単位で比較し、追加された行・削除された行・変更のない行を色分けして表示する無料の差分チェッカー。議事録・記事・プログラムの修正前後の違いがひと目で分かります。入力はブラウザ内で処理され、外部に送信されません。",
  alternates: {
    canonical: "/text/text-diff",
  },
};

const relatedToolClass =
  "rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow";

export default function TextDiffPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          テキスト比較ツール
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          2つの文章の違いを行単位で色分け表示。入力はブラウザ内で処理され、外部に送信されません
        </p>
      </header>

      <TextDiffTool />
      <div className="my-6 min-h-[100px]" aria-label="広告スペース" />

      <section className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
        <h2 className="text-sm font-bold text-slate-700">このツールの使い方</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
          <li>
            「テキスト1（元の文章）」「テキスト2（変更後の文章）」の入力欄に、比較したい文章をそれぞれ貼り付けます。
          </li>
          <li>
            「比較する」ボタンを押すと、2つの文章が行単位で比較されます。
          </li>
          <li>
            追加された行は緑、削除された行は赤、変更のない行は白の背景で表示され、追加・削除された行がひと目で分かります。
          </li>
          <li>
            差分の行数を確認し、「結果をコピー」で差分結果を「+」「−」記号付きのテキストとしてコピーできます。
          </li>
        </ol>

        <h2 className="mt-5 text-sm font-bold text-slate-700">利用例</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
          <li>議事録や報告書の修正前後で、どこが変わったかを確認したいとき</li>
          <li>記事やWebページのテキストを、校正前後で比べたいとき</li>
          <li>
            プログラムや設定ファイル、データリストの変更点を手軽にチェックしたいとき
          </li>
        </ul>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold text-slate-500">入力例（テキスト1）</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`りんご
みかん
バナナ
ぶどう`}</pre>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">入力例（テキスト2）</p>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`りんご
バナナ
いちご
ぶどう`}</pre>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs font-bold text-slate-500">実行結果</p>
          <pre className="mt-1 overflow-x-auto rounded-lg bg-white p-3 text-xs leading-6 text-slate-600">{`  りんご   … 変更なし
− みかん   … 削除された行（赤く表示）
  バナナ   … 変更なし
+ いちご   … 追加された行（緑に表示）
  ぶどう   … 変更なし`}</pre>
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
              Q. どんな単位で比較されますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              行単位で比較します。2つの文章を1行ごとに照合し、それぞれの行を「追加された行」「削除された行」「変更のない行」に分類して表示します。行の並び順も考慮して、最も対応の取れる行どうしが同じ行として判定されます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 空の行はどう扱われますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              空の行も1行として比較対象になります。テキスト1にだけ空行があれば削除された行、テキスト2にだけ空行があれば追加された行として表示されます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 大文字・小文字や空白は区別されますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              区別されます。行は完全一致で比較されるため、大文字・小文字の違いや行頭・行末の空白、全角・半角の違いがある行は、変更のあった行として表示されます。
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-slate-700">
              Q. 長い文章でも使えますか？
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A.
              はい。比較はすべてブラウザ内で行われるため、ページを再読み込みしても入力内容が外部に残ることはありません。数千行程度の文章まで快適に比較できます。比較後は入力欄を切り替えて何度でも再実行できます。
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
              重複した行を一括で削除してリストを整理
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
          <Link href="/privacy?from=/text/text-diff" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact?from=/text/text-diff" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/about?from=/text/text-diff" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            運営者情報
          </Link>
        </nav>
        <p className="mt-4">© 2026 テキスト比較ツール</p>
      </footer>
    </main>
  );
}
