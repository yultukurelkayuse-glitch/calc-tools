"use client";

import { useState } from "react";
import { PERCENT_HELP } from "../../lib/toolContent";
import {
  CalculateButton,
  CopyButton,
  formatNumber,
  HelpSection,
  parseNumber,
} from "./shared";

export default function PercentCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [popKey, setPopKey] = useState(0);

  const aNum = parseNumber(a);
  const bNum = parseNumber(b);
  const result =
    aNum !== null && bNum !== null
      ? { a: aNum, b: bNum, value: (aNum * bNum) / 100 }
      : null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="text-center">
        <h2 className="text-xl font-black text-slate-800">🔢 パーセント計算機</h2>
        <p className="mt-1 text-sm text-slate-500">
          穴埋め式だから、式を考えなくてOK
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 text-center text-lg font-medium text-slate-700">
          <input
            value={a}
            onChange={(e) => setA(e.target.value)}
            onFocus={(e) => e.target.select()}
            inputMode="decimal"
            placeholder="2,000"
            aria-label="全体の数値"
            className="w-28 rounded-lg border-b-2 border-blue-400 bg-transparent px-1 pb-1.5 text-center text-xl font-bold tabular-nums text-blue-600 outline-none transition-colors placeholder:text-sm placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600"
          />
          <span>の</span>
          <input
            value={b}
            onChange={(e) => setB(e.target.value)}
            onFocus={(e) => e.target.select()}
            inputMode="decimal"
            placeholder="15"
            aria-label="調べたい割合（％）"
            className="w-20 rounded-lg border-b-2 border-blue-400 bg-transparent px-1 pb-1.5 text-center text-xl font-bold tabular-nums text-blue-600 outline-none transition-colors placeholder:text-sm placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600"
          />
          <span>％はいくら？</span>
        </p>
        <p className="mt-4 text-center text-xs text-slate-400">
          例：「2,000円の15%はいくら？」→ Aに2,000、Bに15を入力
        </p>
      </div>

      <CalculateButton onClick={() => setPopKey((k) => k + 1)} />

      <div key={`percent-${popKey}`} className={popKey > 0 ? "result-pop" : ""}>
        <div className="mt-6 rounded-2xl bg-blue-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-500">答え</p>
          <p className="mt-2 text-4xl font-black tabular-nums text-blue-600 sm:text-5xl">
            {result !== null ? formatNumber(result.value) : "—"}
          </p>
          {result !== null && (
            <p className="mt-2 text-sm text-slate-500">
              {formatNumber(result.a)} の {formatNumber(result.b)}% です
            </p>
          )}
          <CopyButton
            value={
              result !== null ? String(Math.round(result.value * 100) / 100) : null
            }
          />
        </div>
      </div>

      <HelpSection help={PERCENT_HELP} />
    </div>
  );
}
