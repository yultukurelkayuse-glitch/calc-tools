"use client";

import { useEffect, useRef, useState } from "react";

export type DiffRowType = "added" | "removed" | "unchanged";

export type DiffRow = {
  type: DiffRowType;
  line: string;
  oldIndex: number | null;
  newIndex: number | null;
};

export type DiffResult = {
  rows: DiffRow[];
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
};

/**
 * 2つのテキストを行単位で比較し、追加・削除・変更なしを判定する。
 * すべてブラウザ内で処理され、外部に送信されることはない。
 */
export function diffTexts(a: string, b: string): DiffResult {
  const oldLines = a.split(/\r?\n/);
  const newLines = b.split(/\r?\n/);
  const rows: DiffRow[] = [];

  let oldNo = 0;
  let newNo = 0;
  const push = (
    type: DiffRowType,
    line: string,
    hasOld: boolean,
    hasNew: boolean
  ) => {
    rows.push({
      type,
      line,
      oldIndex: hasOld ? ++oldNo : null,
      newIndex: hasNew ? ++newNo : null,
    });
  };

  // 共通する先頭行と末尾行を除外して、比較範囲を狭める
  let start = 0;
  while (
    start < oldLines.length &&
    start < newLines.length &&
    oldLines[start] === newLines[start]
  ) {
    start++;
  }
  let endOld = oldLines.length;
  let endNew = newLines.length;
  while (
    endOld > start &&
    endNew > start &&
    oldLines[endOld - 1] === newLines[endNew - 1]
  ) {
    endOld--;
    endNew--;
  }

  for (let i = 0; i < start; i++) {
    push("unchanged", oldLines[i], true, true);
  }

  const midOld = oldLines.slice(start, endOld);
  const midNew = newLines.slice(start, endNew);
  const n = midOld.length;
  const m = midNew.length;

  if (n === 0 || m === 0 || (n + 1) * (m + 1) > 4_000_000) {
    // どちらかが空、または極端に大きい入力の場合は簡易判定
    for (let i = 0; i < n; i++) {
      push("removed", midOld[i], true, false);
    }
    for (let j = 0; j < m; j++) {
      push("added", midNew[j], false, true);
    }
  } else {
    // LCS（最長共通部分列）で行の対応を判定する
    const width = m + 1;
    const dp = new Int32Array((n + 1) * width);
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i * width + j] =
          midOld[i] === midNew[j]
            ? dp[(i + 1) * width + j + 1] + 1
            : Math.max(dp[(i + 1) * width + j], dp[i * width + j + 1]);
      }
    }
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (midOld[i] === midNew[j]) {
        push("unchanged", midOld[i], true, true);
        i++;
        j++;
      } else if (dp[(i + 1) * width + j] >= dp[i * width + j + 1]) {
        push("removed", midOld[i], true, false);
        i++;
      } else {
        push("added", midNew[j], false, true);
        j++;
      }
    }
    while (i < n) {
      push("removed", midOld[i], true, false);
      i++;
    }
    while (j < m) {
      push("added", midNew[j], false, true);
      j++;
    }
  }

  for (let i = endOld; i < oldLines.length; i++) {
    push("unchanged", oldLines[i], true, true);
  }

  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;
  for (const row of rows) {
    if (row.type === "added") addedCount++;
    else if (row.type === "removed") removedCount++;
    else unchangedCount++;
  }
  return { rows, addedCount, removedCount, unchangedCount };
}

export function buildDiffText(result: DiffResult): string {
  return result.rows
    .map((row) => {
      const prefix =
        row.type === "added" ? "+ " : row.type === "removed" ? "- " : "  ";
      return prefix + row.line;
    })
    .join("\n");
}

function formatCount(n: number): string {
  return n.toLocaleString("ja-JP");
}

const textareaClass =
  "w-full resize-y rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

const markerClass: Record<DiffRowType, string> = {
  added: "text-green-600 font-bold",
  removed: "text-red-600 font-bold",
  unchanged: "text-slate-300",
};

const markerLabel: Record<DiffRowType, string> = {
  added: "+",
  removed: "\u2212",
  unchanged: " ",
};

function rowClass(type: DiffRowType): string {
  if (type === "added") return "bg-green-50 text-green-900";
  if (type === "removed") return "bg-red-50 text-red-900";
  return "text-slate-700";
}

export default function TextDiffTool() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [result, setResult] = useState<DiffResult | null>(null);
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
    if (textA.trim() === "" || textB.trim() === "") {
      setResult(null);
      setNotice("比較するテキストを両方の入力欄に入力してください。");
      return;
    }
    setNotice(null);
    setRunCount((k) => k + 1);
    setResult(diffTexts(textA, textB));
  };

  const handleClear = () => {
    setTextA("");
    setTextB("");
    setResult(null);
    setNotice(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(buildDiffText(result));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* コピー失敗時は何もしない */
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="diff-input-a"
            className="mb-2 block text-sm font-bold text-slate-600"
          >
            テキスト1（元の文章）
          </label>
          <textarea
            id="diff-input-a"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={8}
            placeholder={"例）\nりんご\nみかん\nバナナ"}
            className={textareaClass}
          />
        </div>
        <div>
          <label
            htmlFor="diff-input-b"
            className="mb-2 block text-sm font-bold text-slate-600"
          >
            テキスト2（変更後の文章）
          </label>
          <textarea
            id="diff-input-b"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={8}
            placeholder={"例）\nりんご\nバナナ\nいちご"}
            className={textareaClass}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleRun}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.99]"
      >
        比較する
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
            key={`diff-${runCount}`}
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
                  <p className="text-xs font-medium text-slate-500">
                    追加された行
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-green-600 sm:text-3xl">
                    {formatCount(result.addedCount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    削除された行
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-red-600 sm:text-3xl">
                    {formatCount(result.removedCount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    変更のない行
                  </p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-slate-700 sm:text-3xl">
                    {formatCount(result.unchangedCount)}
                  </p>
                </div>
              </div>
              {result.addedCount === 0 && result.removedCount === 0 && (
                <p className="mt-3 text-center text-sm font-bold text-blue-600">
                  差分はありません。2つのテキストは同一です。
                </p>
              )}
              <p className="mt-3 text-center text-xs text-slate-400">
                ※
                すべてブラウザ内で処理され、入力したテキストが外部に送信されることはありません
              </p>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-600">
                  比較結果
                </span>
                <span className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="inline-block h-3 w-3 rounded-sm border border-green-300 bg-green-100"
                    />
                    追加された行
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="inline-block h-3 w-3 rounded-sm border border-red-300 bg-red-100"
                    />
                    削除された行
                  </span>
                </span>
              </div>
              <div className="max-h-[480px] overflow-y-auto overflow-x-hidden rounded-xl border-2 border-slate-200 bg-slate-50">
                <ol className="font-mono text-[13px] leading-6">
                  {result.rows.map((row, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 px-2 py-0.5 sm:px-3 ${rowClass(row.type)}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-4 shrink-0 select-none text-center ${markerClass[row.type]}`}
                      >
                        {markerLabel[row.type]}
                      </span>
                      <span className="w-7 shrink-0 text-right text-[10px] leading-6 text-slate-400 tabular-nums">
                        {row.oldIndex ?? ""}
                      </span>
                      <span className="w-7 shrink-0 text-right text-[10px] leading-6 text-slate-400 tabular-nums">
                        {row.newIndex ?? ""}
                      </span>
                      <span className="min-w-0 flex-1 break-all whitespace-pre-wrap">
                        {row.line === "" ? "\u00A0" : row.line}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
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
