"use client";

import { useState } from "react";
import Link from "next/link";
import type { HelpContent, RelatedToolLink } from "../../lib/toolContent";

export function parseNumber(value: string): number | null {
  const normalized = value.replace(/[，,]/g, "").trim();
  if (normalized === "") return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("ja-JP", { maximumFractionDigits: 2 });
}

export const inputBaseClass =
  "w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-4 pr-10 text-lg font-semibold tabular-nums text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export function CopyButton({ value }: { value: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (value === null) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* コピー失敗時は何もしない */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-4 w-full rounded-xl border-2 border-blue-200 bg-white py-3 font-bold text-blue-600 transition-all hover:bg-blue-100/60 active:scale-[0.99]"
    >
      {copied ? "✓ コピーしました" : "結果をコピー"}
    </button>
  );
}

export function CalculateButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-[0.99]"
    >
      計算する
    </button>
  );
}

function RelatedTools({ related }: { related: RelatedToolLink[] }) {
  return (
    <div className="mt-3 space-y-2">
      {related.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-blue-100 bg-white px-4 py-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99]"
        >
          <span>
            <span className="block text-sm font-bold text-blue-600">
              {tool.label}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">
              {tool.when}
            </span>
          </span>
          <span aria-hidden="true" className="text-blue-400">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

export function HelpSection({ help }: { help: HelpContent }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
      <h3 className="text-sm font-bold text-slate-700">何が計算できるか</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
        {help.summary}
      </p>

      <h3 className="mt-4 text-sm font-bold text-slate-700">
        どんな場面で便利か
      </h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
        {help.scenes.map((scene) => (
          <li key={scene}>{scene}</li>
        ))}
      </ul>

      <h3 className="mt-4 text-sm font-bold text-slate-700">使い方</h3>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
        {help.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h3 className="mt-4 text-sm font-bold text-slate-700">計算方法</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
        {help.method}
      </p>

      <h3 className="mt-4 text-sm font-bold text-slate-700">
        この計算機の工夫
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
        {help.design}
      </p>

      <h3 className="mt-4 text-sm font-bold text-slate-700">注意点</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-slate-600">
        {help.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <h3 className="mt-4 text-sm font-bold text-slate-700">よくある疑問</h3>
      <div className="mt-2 space-y-3">
        {help.faqs.map((faq) => (
          <div key={faq.q}>
            <p className="text-[13px] font-bold text-slate-700">Q. {faq.q}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              A. {faq.a}
            </p>
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-700">関連ツール</h3>
      <RelatedTools related={help.related} />
    </div>
  );
}
