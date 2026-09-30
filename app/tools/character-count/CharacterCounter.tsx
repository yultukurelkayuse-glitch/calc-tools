"use client";

import { useState } from "react";
import Link from "next/link";
import AdPlaceholder from "../../components/AdPlaceholder";

type CountResult = {
  totalChars: number;
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  lines: number;
  paragraphs: number;
};

function getCountResult(text: string): CountResult {
  const charsWithoutSpaces = Array.from(text.replace(/\s/gu, "")).length;
  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
  const paragraphs =
    text.trim() === ""
      ? 0
      : text.split(/\n\s*\n/).filter((paragraph) => paragraph.trim() !== "").length;

  return {
    totalChars: Array.from(text).length,
    charsWithSpaces: Array.from(text).length,
    charsWithoutSpaces,
    lines,
    paragraphs,
  };
}

function StatCard({
  label,
  value,
  emphasis = false,
  className = "",
}: {
  label: string;
  value: number;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-3 text-center transition-colors sm:p-4 ${
        emphasis
          ? "border-blue-200 bg-blue-50"
          : "border-slate-100 bg-slate-50"
      } ${className}`}
    >
      <p
        className={`text-[11px] font-bold leading-tight tracking-wide ${
          emphasis ? "text-blue-600" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-black tabular-nums ${
          emphasis
            ? "text-3xl text-blue-600 sm:text-4xl"
            : "text-2xl text-slate-800 sm:text-3xl"
        }`}
      >
        {value.toLocaleString("ja-JP")}
      </p>
    </div>
  );
}

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const result = getCountResult(text);

  const handleCopy = async () => {
    if (text === "") return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* コピー失敗時は何もしない */
    }
  };

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          文字数カウンター
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          入力と同時に文字数・行数をリアルタイムでチェック
        </p>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
        <label htmlFor="text-input" className="sr-only">
          文章を入力
        </label>
        <textarea
          id="text-input"
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          placeholder="ここに文章を入力またはコピペしてください…"
          spellCheck={false}
          className="min-h-[10rem] w-full resize-y rounded-xl border-2 border-slate-200 bg-white p-4 text-lg leading-relaxed text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 sm:min-h-[12rem]"
        />

        <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard label="文字数" value={result.totalChars} emphasis />
          <StatCard
            label="空白を含む文字数"
            value={result.charsWithSpaces}
          />
          <StatCard
            label="空白を除いた文字数"
            value={result.charsWithoutSpaces}
          />
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-3 sm:mt-4 sm:gap-4">
          <StatCard
            label="行数"
            value={result.lines}
            className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.75rem)]"
          />
          <StatCard
            label="段落数"
            value={result.paragraphs}
            className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.75rem)]"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleCopy}
            disabled={text === ""}
            className="rounded-xl bg-blue-600 py-3.5 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {copied ? "コピーしました！" : "すべてコピー"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-xl border-2 border-slate-200 bg-white py-3.5 text-base font-bold text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.99]"
          >
            クリア
          </button>
        </div>

        <AdPlaceholder />

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-black text-slate-800">
              文字数カウンターとは
            </h2>
            <p className="mt-2">
              文字数カウンターは、入力した文章の文字数や行数、段落数をその場で数える無料のWebツールです。レポートの文字数制限、ブログ記事の長さ、SNS投稿、YouTubeの説明文など、文章の長さを気にする場面でサッと確認できます。スマートフォンからでもPCからでも、画面を開いてすぐに使えます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800">使い方</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>上の入力欄に文章を入力するか、コピー＆ペーストします。</li>
              <li>入力と同時に「文字数」「行数」「段落数」が自動で更新されます。</li>
              <li>「すべてコピー」ボタンで入力した文章をクリップボードにコピーできます。</li>
              <li>「クリア」ボタンで入力とカウントをリセットします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800">
              文字数の数え方
            </h2>
            <p className="mt-2">
              当ツールでは、入力された文字列の長さをそのままカウントします。日本語のひらがなや漢字、英数字、記号、絵文字はすべて1文字ずつ数えられます。たとえば「Hello, 世界！」は9文字、「あいう😀」は4文字として表示されます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800">
              空白・改行・全角・半角の扱い
            </h2>
            <p className="mt-2">
              半角スペース、全角スペース、タブ、改行は「空白」としてまとめて扱います。「空白を除いた文字数」ではこれらを除いてカウントします。行数は改行で区切った数、段落数は空行で区切ったブロックの数を表します。連続する空行は1つの段落区切りとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800">
              よくある質問
            </h2>
            <dl className="mt-2 space-y-4">
              <div>
                <dt className="font-bold text-slate-700">
                  入力した文章はサーバーに送られますか？
                </dt>
                <dd>
                  送られません。文字数の計算はすべてあなたのブラウザ内で行われるため、入力内容が外部に流出することはありません。
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-700">
                  絵文字や特殊文字も正しく数えられますか？
                </dt>
                <dd>
                  はい。絵文字や記号、全角・半角を混ぜた文章でもエラーなくカウントできます。
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-700">
                  文字数と空白を含む文字数の違いは何ですか？
                </dt>
                <dd>
                  両方とも入力された文字の総数を表します。「空白を含む文字数」は空白も含めた総数であることを明示した表示です。
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-700">
                  長文でも動作しますか？
                </dt>
                <dd>
                  はい。数千文字〜数万文字程度の文章でも、ブラウザ内で軽快に動作します。
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-800">関連ツール</h2>
            <p className="mt-2">
              現在「文字数カウンター」をご利用いただけます。今後、以下のような便利なテキストツールを追加予定です。
            </p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              <li className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
                全角半角変換
              </li>
              <li className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
                重複行削除
              </li>
              <li className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center text-sm font-bold text-slate-500">
                改行削除
              </li>
            </ul>
          </section>
        </div>

        <AdPlaceholder />
      </section>

      <footer className="mt-10 text-center text-xs text-slate-400">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link
            href="/tools/character-count/privacy"
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/tools/character-count/contact"
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/tools/character-count/about"
            className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            運営者情報
          </Link>
        </nav>
        <p className="mt-4">© 2026 文字数カウンターツール</p>
      </footer>
    </main>
  );
}
