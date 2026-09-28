"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import AdPlaceholder from "./AdPlaceholder";

type TabId = "discount" | "tax" | "percent";

type TaxItem = {
  id: number;
  name: string;
  price: string;
  rate: 8 | 10;
};

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: "discount", icon: "🛒", label: "割引計算" },
  { id: "tax", icon: "🛍️", label: "消費税計算" },
  { id: "percent", icon: "🔢", label: "パーセント計算" },
];

const QUICK_RATES: { value: number; label: string }[] = [
  { value: 5, label: "5% OFF" },
  { value: 10, label: "10% OFF" },
  { value: 15, label: "15% OFF" },
  { value: 20, label: "20% OFF" },
  { value: 30, label: "30% OFF" },
  { value: 50, label: "半額" },
];

function parseNumber(value: string): number | null {
  const normalized = value.replace(/[，,]/g, "").trim();
  if (normalized === "") return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatNumber(n: number): string {
  return n.toLocaleString("ja-JP", { maximumFractionDigits: 2 });
}

const inputBaseClass =
  "w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-4 pr-10 text-lg font-semibold tabular-nums text-slate-800 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

function CopyButton({ value }: { value: string | null }) {
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

function CalculateButton({ onClick }: { onClick: () => void }) {
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

function HelpSection({
  usage,
  mechanism,
  mechanismTitle,
  faq,
}: {
  usage: string;
  mechanism: string;
  mechanismTitle: string;
  faq: string;
}) {
  return (
    <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
      <h3 className="text-sm font-bold text-slate-700">このツールの使い方</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{usage}</p>
      <h3 className="mt-4 text-sm font-bold text-slate-700">
        {mechanismTitle}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
        {mechanism}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{faq}</p>
    </div>
  );
}

function DiscountCalculator() {
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
      <AdPlaceholder />

      <HelpSection
        mechanismTitle="割引計算の仕組みと注意点・FAQ"
        usage="「元の金額」にセール前の価格を、「割引率」に適用する割引の割合を入力すると、支払額と値引き額の目安を確認できます。10%、20%、30%、半額などのボタンは割引率欄へ値を入れるための近道です。たとえば3,000円の商品で20% OFFを選ぶと、割引後の価格は2,400円、値引き額は600円と表示されます。金額や率は半角数字で入力し、カンマ入りの金額も入力できます。割引率は0から100までが対象です。100%なら計算上の支払額は0円、0%なら元の金額のままです。値段を比較するときは、商品ごとの割引条件や対象期間も合わせて確認しましょう。"
        mechanism="割引後の価格は、元の金額から割引分を差し引いて求めます。例として3,000円の20% OFFなら、元の金額のうち残る割合は80%なので、3,000円に0.8を掛けた2,400円が支払額の目安になります。値引き額は元の金額と割引後価格の差で、600円です。割引率は「100%から割引率を引いた残りの割合」と考えると直感的です。小数を含む金額や割合では結果に端数が出る場合があります。当サイトでは数値を小数点以下2桁まで表示しますが、店舗の会計では商品単位・会計単位の処理などにより表示が異なることがあります。"
        faq="よくあるご質問：複数の割引が順番に適用される場合、割引率を単純に足し算しません。3,000円を20%引きにした後、さらに10%引きにすると、まず2,400円になり、その金額から10%を引いた2,160円が目安です。また「20%ポイント還元」は会計時の値引きとは異なり、後からポイントが付与される条件の場合があります。クーポン併用、割引上限、税込・税抜のどちらを基準にするかは販売者の表示をご確認ください。計算結果は参考値であり、最終的な請求額や適用条件は店舗の表示・レシートを優先してください。"
      />
      <AdPlaceholder />
    </div>
  );
}

function TaxCalculator() {
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
          <div
            key={item.id}
            className="flex items-center gap-1.5 sm:gap-2"
          >
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
      <AdPlaceholder />

      <HelpSection
        mechanismTitle="消費税と8%・10%の軽減税率・FAQ"
        usage="「＋ 商品を追加」から買い物リストに商品行を追加し、商品名と税抜金額を入力します。各行の8%・10%スイッチで適用する税率を選ぶと、小計、税額、税込合計が更新されます。行末の×で不要な商品を削除できます。税率の異なる品物を一緒に購入する場合も、商品ごとに率を選べます。商品名は任意ですが、レシートや買い物メモと照らし合わせると確認しやすくなります。金額が税込表示の場合は、そのまま税抜価格として入力しないよう注意してください。入力前に値札やレシートの表示方法を確かめることで、二重に税を加える誤りを避けられます。このツールは買い物の概算を素早く把握するためのものです。"
        mechanism="各行の金額に選択した税率分を加え、商品ごとの税込額を合計します。たとえば税抜1,000円で10%なら税込1,100円、税抜500円で8%なら税込540円となり、二品の税込合計は1,640円です。消費税額は税抜価格に税率を掛けて求めます。日本では標準税率10%と、一定の飲食料品や新聞などに適用される軽減税率8%があります。ただし対象となるかは商品区分や提供方法などの条件によって変わります。お弁当などは持ち帰りと店内飲食で税率が異なる例があり、酒類や外食は軽減税率の対象外となる場合があります。実際の区分は購入先の表示をご確認ください。"
        faq="よくあるご質問：表示価格が税込か税抜か分からないときは、値札やレシートの表示、販売者の案内をご確認ください。店頭価格が税込なら、税込価格を税抜金額として入力すると税を重ねて加算してしまいます。また、実際の税額は事業者の端数処理や、商品単位・税率ごとの合計単位などにより、この簡易計算の結果と数円異なる場合があります。会計の確定額にはレシートや販売者の請求を優先してください。税務申告など重要な判断が必要な場合は、国税庁などの公的情報や専門家にご相談ください。本ツールは税務相談や正式な税額計算を代替するものではありません。"
      />
      <AdPlaceholder />
    </div>
  );
}

function PercentCalculator() {
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
      <AdPlaceholder />

      <HelpSection
        mechanismTitle="日常生活に役立つパーセント計算・FAQ"
        usage="「AのB%はいくら？」という文章のAとBに数値を入れて使います。Aには全体の数、Bには調べたい割合を入力してください。たとえば2,000円の15%を知りたいなら、Aに2,000、Bに15を入力すると300円と表示されます。テストの満点から目標点を求めたり、レシピを人数に合わせて増減したり、予算の一部を把握したりする場面にも使えます。金額だけでなく、個数や点数など単位のある数にも応用できます。結果を読むときは元の数値と同じ単位になるため、円の15%なら円、250点の80%なら点として理解してください。入力した数値と質問の意味が合っているか、表示を確認しましょう。"
        mechanism="パーセントは「100を基準にした割合」を表します。100%は全体と同じ量、50%は全体の半分、25%は4分の1です。「AのB%」を求めるときは、Aを全体として、そのB割分を取り出します。例として2,000の15%は300です。Aが0なら、どの割合を指定しても結果は0になります。Bが100より大きい場合は、全体より大きい結果になることがあります。これは誤りとは限らず、元の量に対して何倍に当たるかを表す用途で使われます。小数の割合や金額を入力した際、計算結果に端数が含まれることがあります。表示値は目安として読み取り、実際の支払い・配分では必要な丸め方を確認してください。"
        faq="よくあるご質問：「40は200の何%？」は「200を基準に40が占める割合」を求める問いで、「200の40%はいくら？」とは別の計算です。前者の例では40は200の20%に当たります。割合を知りたいのか、割合に相当する量を知りたいのかを文章にしてから入力すると間違いを減らせます。割引額を調べたいときは元値と割引率、割引後の支払額を知りたいときは割引計算機が便利です。税率を加えた合計は消費税計算機をご利用ください。計算結果は入力値から得られる数学上の値で、試験の配点や販売価格の端数処理など個別の条件を考慮するものではありません。"
      />
      <AdPlaceholder />
    </div>
  );
}

export default function CalculatorApp() {
  const [activeTab, setActiveTab] = useState<TabId>("discount");

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          お買いもの計算ツールズ
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          割引・消費税・パーセントを、その場ですぐ計算
        </p>
      </header>

      <nav role="tablist" aria-label="計算ツールの切り替え" className="mb-8 grid grid-cols-3 gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl py-3 font-bold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              <span className="block text-lg leading-relaxed">{tab.icon}</span>
              <span className="block text-xs sm:text-sm">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div role="tabpanel" className={activeTab === "discount" ? "" : "hidden"}>
        <DiscountCalculator />
      </div>
      <div role="tabpanel" className={activeTab === "tax" ? "" : "hidden"}>
        <TaxCalculator />
      </div>
      <div role="tabpanel" className={activeTab === "percent" ? "" : "hidden"}>
        <PercentCalculator />
      </div>

      <footer className="mt-10 text-center text-xs text-slate-400">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/privacy" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            プライバシーポリシー
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            お問い合わせ
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/about" className="transition-colors hover:text-blue-600 hover:underline hover:underline-offset-2">
            運営者情報
          </Link>
        </nav>
        <p className="mt-4">© 2026 お買いもの計算ツールズ</p>
      </footer>
    </main>
  );
}
