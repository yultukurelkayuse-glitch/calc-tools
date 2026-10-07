"use client";

import { useState } from "react";
import { DISCOUNT_HELP } from "../../lib/toolContent";
import {
  CalculateButton,
  CopyButton,
  formatNumber,
  HelpSection,
  inputBaseClass,
  parseNumber,
} from "./shared";

const QUICK_RATES: { value: number; label: string }[] = [
  { value: 5, label: "5% OFF" },
  { value: 10, label: "10% OFF" },
  { value: 15, label: "15% OFF" },
  { value: 20, label: "20% OFF" },
  { value: 30, label: "30% OFF" },
  { value: 50, label: "半額" },
];

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [popKey, setPopKey] = useState(0);

  const priceNum = parseNumber(price);
  const rateNum = parseNumber(rate);
  const result =
    priceNum !== null &&
    rateNum !== null &&
    priceNum >= 0 &&
    rateNum >= 0 &&
    rateNum <= 100
      ? {
          rate: rateNum,
          discounted: priceNum * (1 - rateNum / 100),
        }
      : null;
  const saved = result !== null ? priceNum! - result.discounted : null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="text-center">
        <h2 className="text-xl font-black text-slate-800">🛒 割引計算機</h2>
        <p className="mt-1 text-sm text-slate-500">
          セール中の本当の支払額をすぐにチェック
        </p>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="discount-price"
            className="mb-2 block text-sm font-bold text-slate-600"
          >
            元の金額
          </label>
          <div className="relative">
            <input
              id="discount-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onFocus={(e) => e.target.select()}
              inputMode="decimal"
              placeholder="例）3,000"
              className={inputBaseClass}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              円
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="discount-rate"
            className="mb-2 block text-sm font-bold text-slate-600"
          >
            割引率
          </label>
          <div className="relative">
            <input
              id="discount-rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              onFocus={(e) => e.target.select()}
              inputMode="decimal"
              placeholder="例）20"
              className={inputBaseClass}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              % OFF
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-slate-600">
            よく使う割引率（タップで入力）
          </p>
          <div className="grid grid-cols-3 gap-2">
            {QUICK_RATES.map((quick) => (
              <button
                key={quick.value}
                type="button"
                onClick={() => setRate(String(quick.value))}
                className={`rounded-lg py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  rateNum === quick.value
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                {quick.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CalculateButton onClick={() => setPopKey((k) => k + 1)} />

      <div key={popKey} className={popKey > 0 ? "result-pop" : ""}>
        <div className="mt-6 rounded-2xl bg-blue-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-500">割引後の支払額</p>
          <p className="mt-2 text-4xl font-black tabular-nums text-blue-600 sm:text-5xl">
            {result !== null ? `${formatNumber(result.discounted)}円` : "—"}
          </p>
          {saved !== null && result !== null && (
            <p className="mt-2 text-sm text-slate-500">
              {formatNumber(result.rate)}% OFFで{" "}
              <span className="font-bold text-slate-700">
                {formatNumber(saved)}円
              </span>{" "}
              お得
            </p>
          )}
          <CopyButton
            value={
              result !== null
                ? String(Math.round(result.discounted * 100) / 100)
                : null
            }
          />
        </div>
      </div>

      <HelpSection help={DISCOUNT_HELP} />
    </div>
  );
}
