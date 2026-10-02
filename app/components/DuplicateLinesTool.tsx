"use client";

import { useEffect, useRef, useState } from "react";

type DedupeResult = {
  output: string;
  beforeCount: number;
  afterCount: number;
  removedCount: number;
};

export function removeDuplicateLines(
  input: string,
  ignoreCase: boolean,
  ignoreWhitespace: boolean
): DedupeResult {
  const lines = input.split(/\r?\n/);
  const seen = new Set<string>();
  const kept: string[] = [];
  for (const line of lines) {
    let key = line;
    if (ignoreWhitespace) key = key.trim();
    if (ignoreCase) key = key.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      kept.push(line);
    }
  }
  return {
    output: kept.join("\n"),
    beforeCount: lines.length,
    afterCount: kept.length,
    removedCount: lines.length - kept.length,
  };
}

function formatCount(n: number): string {
  return n.toLocaleString("ja-JP");
}

const textareaClass =
  "w-full resize-y rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export default function DuplicateLinesTool() {
  const [input, setInput] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [result, setResult] = useState<DedupeResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result === null) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    resultRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [result]);

  const handleRun = () => {
    setCopied(false);
    if (input.trim() === "") {
      setResult(null);
      setNotice("テキストを入力してから実行してください。");
      return;
    }
    setNotice(null);
    setRunCount((k) => k + 1);
    setResult(removeDuplicateLines(input, ignoreCase, ignoreWhitespace));
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
    setNotice(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* コピー失敗時は何もしない */
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <div>
        <label
          htmlFor="duplicate-input"
          className="mb-2 block text-sm font-bold text-slate-600"
        >
          テキストを入力
        </label>
        <textarea
          id="duplicate-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          placeholder={"例）\nりんご\nバナナ\nりんご\nみかん\nバナナ"}
          className={textareaClass}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:text-blue-600">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          大文字・小文字を区別しない
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:text-blue-600">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          行の前後の空白を無視する
        </label>
      </div>

      <button
        type="button"
        onClick={handleRun}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.99]"
      >
        重複行を削除する
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="mt-3 w-full rounded-xl border-2 border-slate-200 bg-white py-3 font-bold text-slate-500 transition-all hover:bg-slate-100 active:scale-[0.99]"
      >
        入力と結果をクリア
      </button>

      <div className="mt-6">
        {notice !== null && (
          <p className="rounded-xl bg-slate-50 py-8 text-center text-sm text-slate-400">
            {notice}
          </p>
        )}
        {result !== null && (
          <div
            key={`dedupe-${runCount}`}
            ref={resultRef}
            className="result-pop scroll-mt-4"
          >
            <div
              aria-live="polite"
              aria-atomic="true"
              className="rounded-2xl bg-blue-50 p-5 sm:p-6"
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs font-medium text-slate-500">削除前行数</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-slate-700 sm:text-3xl">
                    {formatCount(result.beforeCount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">削除後行数</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-slate-700 sm:text-3xl">
                    {formatCount(result.afterCount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">削除された行</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-blue-600 sm:text-3xl">
                    {formatCount(result.removedCount)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">
                ※
                すべてブラウザ内で処理され、入力したテキストが外部に送信されることはありません
              </p>
            </div>

            <div className="mt-4">
              <label
                htmlFor="duplicate-output"
                className="mb-2 block text-sm font-bold text-slate-600"
              >
                削除結果
              </label>
              <textarea
                id="duplicate-output"
                readOnly
                rows={8}
                value={result.output}
                className="w-full resize-y rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base leading-relaxed text-slate-800 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 w-full rounded-xl border-2 border-blue-200 bg-white py-3 font-bold text-blue-600 transition-all hover:bg-blue-100/60 active:scale-[0.99]"
            >
              {copied ? "✓ コピーしました" : "結果をコピー"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
