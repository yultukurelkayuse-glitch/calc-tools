"use client";

import { useRef, useState } from "react";
import { TAX_HELP } from "../../lib/toolContent";
import {
  CalculateButton,
  CopyButton,
  formatNumber,
  HelpSection,
  parseNumber,
} from "./shared";

type TaxItem = {
  id: number;
  name: string;
  price: string;
  rate: 8 | 10;
};

export default function TaxCalculator() {
  const [items, setItems] = useState<TaxItem[]>([
    { id: 0, name: "", price: "", rate: 10 },
  ]);
  const nextIdRef = useRef(1);
  const [popKey, setPopKey] = useState(0);

  const updateItem = (id: number, patch: Partial<TaxItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const addItem = () => {
    const id = nextIdRef.current++;
    setItems((prev) => [...prev, { id, name: "", price: "", rate: 10 }]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totals = items.reduce(
    (acc, item) => {
      const p = parseNumber(item.price);
      if (p === null || p < 0) return acc;
      return {
        subtotal: acc.subtotal + p,
        tax: acc.tax + (p * item.rate) / 100,
        total: acc.total + p * (1 + item.rate / 100),
      };
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="text-center">
        <h2 className="text-xl font-black text-slate-800">🛍️ 消費税計算機</h2>
        <p className="mt-1 text-sm text-slate-500">
          買い物リストの税込合計をレシート風に計算
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <p className="rounded-xl bg-slate-50 py-8 text-center text-sm text-slate-400">
            商品がありません。下のボタンで追加してください。
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-1.5 sm:gap-2">
            <input
              value={item.name}
              onChange={(e) => updateItem(item.id, { name: e.target.value })}
              placeholder="商品名"
              className="min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-base font-medium text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
            <div className="relative w-20 shrink-0 sm:w-24">
              <input
                value={item.price}
                onChange={(e) => updateItem(item.id, { price: e.target.value })}
                inputMode="decimal"
                placeholder="金額"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-2.5 py-2.5 pr-6 text-right text-base font-semibold tabular-nums text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                円
              </span>
            </div>
            <div className="flex shrink-0 rounded-full bg-slate-100 p-0.5">
              {([8, 10] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => updateItem(item.id, { rate: r })}
                  className={`rounded-full px-2 py-1 text-[11px] font-bold transition-all sm:px-2.5 ${
                    item.rate === r
                      ? "bg-white text-blue-600 shadow"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label="この商品を削除"
              className="h-7 w-7 shrink-0 rounded-full text-lg leading-none text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full rounded-xl border-2 border-dashed border-blue-200 py-3 font-bold text-blue-500 transition-all hover:border-blue-400 hover:bg-blue-50 active:scale-[0.99]"
        >
          ＋ 商品を追加
        </button>
      </div>

      <CalculateButton onClick={() => setPopKey((k) => k + 1)} />

      <div key={`tax-${popKey}`} className={popKey > 0 ? "result-pop" : ""}>
        <div className="mt-6 rounded-2xl bg-blue-50 p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-2.5 text-sm text-slate-600">
            <span>小計（税抜）</span>
            <span className="font-semibold tabular-nums">
              {formatNumber(totals.subtotal)}円
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5 text-sm text-slate-600">
            <span>消費税額</span>
            <span className="font-semibold tabular-nums">
              {formatNumber(totals.tax)}円
            </span>
          </div>
          <div className="mt-2 border-t border-blue-100 pt-4 text-center">
            <p className="text-sm font-medium text-slate-500">税込合計</p>
            <p className="mt-2 text-4xl font-black tabular-nums text-blue-600 sm:text-5xl">
              {formatNumber(totals.total)}円
            </p>
          </div>
          <CopyButton
            value={
              totals.total > 0
                ? String(Math.round(totals.total * 100) / 100)
                : null
            }
          />
        </div>
      </div>

      <HelpSection help={TAX_HELP} />
    </div>
  );
}
