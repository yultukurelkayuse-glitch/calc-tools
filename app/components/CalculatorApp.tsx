"use client";

import { useRef, useState } from "react";
import Link from "next/link";

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

const THINGS_YOU_CAN_DO: { icon: string; title: string; description: string }[] = [
  {
    icon: "🛒",
    title: "セール商品の割引後価格を確認",
    description:
      "「20% OFFっていくらになる？」割引後の支払額と、いくら安くなるかをすぐ確認できます。",
  },
  {
    icon: "🛍️",
    title: "税込み価格・税額を確認",
    description:
      "買い物リストの税込合計を、商品ごとに8%・10%の税率を選んでレシート風に計算できます。",
  },
  {
    icon: "🔢",
    title: "○○の○%を計算",
    description:
      "「2,000円の15%はいくら？」のような割合を、式を考えずに穴埋めで求められます。",
  },
];

const TOOL_GUIDE: { question: string; answer: string; tab: TabId }[] = [
  {
    question: "20% OFFのときの支払額を知りたい",
    answer: "割引計算",
    tab: "discount",
  },
  {
    question: "買い物の税込み合計を知りたい",
    answer: "消費税計算",
    tab: "tax",
  },
  {
    question: "2,000円の15%など、割合の金額を知りたい",
    answer: "パーセント計算",
    tab: "percent",
  },
];

const USAGE_EXAMPLES: {
  icon: string;
  scene: string;
  input: string;
  output: string;
  tab: TabId;
}[] = [
  {
    icon: "🛒",
    scene: "洋服が2,980円で30% OFFのセール中。支払額を知りたい",
    input: "元の金額 2,980円、割引率 30% OFF",
    output: "支払額 2,086円（894円お得）",
    tab: "discount",
  },
  {
    icon: "🛍️",
    scene: "税抜1,200円のお弁当（8%）と税抜680円のお茶（10%）の税込合計を知りたい",
    input: "お弁当 1,200円・8%、お茶 680円・10%",
    output: "税込合計 2,044円",
    tab: "tax",
  },
  {
    icon: "🔢",
    scene: "5,000円の予算のうち20%を貯金に回したい。いくらなら",
    input: "A 5,000、B 20",
    output: "1,000円",
    tab: "percent",
  },
];

type RelatedToolLink = { tab: TabId; label: string; when: string };
type HelpFAQ = { q: string; a: string };
type HelpContent = {
  summary: string;
  steps: string[];
  method: string;
  notes: string[];
  faqs: HelpFAQ[];
  related: RelatedToolLink[];
};

const DISCOUNT_HELP: HelpContent = {
  summary:
    "セール中の商品について、割引を適用した後の支払額といくら安くなるか（値引き額）を計算できます。",
  steps: [
    "「元の金額」にセール前の価格を入力します（例：3,000）。",
    "「割引率」に割引の割合を入力します（例：20）。10%・20%・半額などのボタンをタップすると入力できます。",
    "「計算する」を押すと、割引後の支払額と値引き額が表示されます。「結果をコピー」で金額をコピーできます。",
  ],
  method:
    "割引後の価格は、元の金額から割引分を差し引いて求めます。3,000円の20% OFFなら、元の金額のうち残る割合は80%なので、3,000円に0.8を掛けた2,400円が支払額の目安になり、値引き額は600円です。割引率は「100%から割引率を引いた残りの割合」と考えると直感的です。",
  notes: [
    "金額はカンマ付きで入力でき、小数を含む金額・割引率にも対応します。割引率は0から100までが対象で、100%なら計算上の支払額は0円、0%なら元の金額のままです。",
    "計算結果は目安です。クーポン併用の可否、割引上限、税込・税抜のどちらを基準にするかは販売者の表示をご確認ください。最終的な請求額は店舗の表示・レシートを優先してください。",
  ],
  faqs: [
    {
      q: "割引が複数ある場合（20% OFFの後、さらに10% OFF）はどう計算すればいいですか？",
      a: "割引率を単純に足し算しません。3,000円を20%引きにした後、さらに10%引きにすると、まず2,400円になり、その金額から10%を引いた2,160円が目安です。",
    },
    {
      q: "「20%ポイント還元」と同じですか？",
      a: "違います。ポイント還元は会計時の値引きではなく、後からポイントが付与される条件の場合があります。値段そのものが下がるのは割引です。",
    },
    {
      q: "税込価格と税抜価格のどちらを入力すればいいですか？",
      a: "どちらの金額でも割引計算自体はできますが、割引が税込・税抜のどちらに適用されるかは店舗によって異なります。心配なときは割引計算機で割引後の税抜金額を出し、消費税計算機で税込額を確認する流れがおすすめです。",
    },
  ],
  related: [
    {
      tab: "tax",
      label: "消費税計算機",
      when: "割引後の金額に消費税を加えた税込価格も確認したい",
    },
    {
      tab: "percent",
      label: "パーセント計算機",
      when: "「元の値段の○%はいくら」だけを知りたい",
    },
  ],
};

const TAX_HELP: HelpContent = {
  summary:
    "商品ごとに税率（8%・10%）を選んで、買い物リストの小計（税抜）・消費税額・税込合計を計算できます。",
  steps: [
    "「＋ 商品を追加」で買い物リストに行を追加します。",
    "商品名（任意）と税抜金額を入力し、8%・10%のスイッチでその商品の税率を選びます。",
    "「計算する」を押すと、小計（税抜）・消費税額・税込合計が表示されます。行末の×で不要な商品を削除できます。",
  ],
  method:
    "各行の金額に選択した税率分を加え、商品ごとの税込額を合計します。たとえば税抜1,000円で10%なら税込1,100円、税抜500円で8%なら税込540円となり、二品の税込合計は1,640円です。消費税額は税抜価格に税率を掛けて求めます。日本では標準税率10%に加え、一定の飲食料品や新聞などに適用される軽減税率8%があります。",
  notes: [
    "店頭価格が税込表示の場合、その金額を税抜金額として入力すると税が二重に加算されてしまいます。入力前に値札やレシートの表示方法を確かめてください。",
    "実際の税額は事業者の端数処理や、商品単位・税率ごとの合計単位などにより、この簡易計算の結果と数円異なる場合があります。会計の確定額にはレシートや販売者の請求を優先してください。",
  ],
  faqs: [
    {
      q: "表示価格が税込か税抜か分からないときはどうすればいいですか？",
      a: "値札やレシートの表示、販売者の案内をご確認ください。日本の店頭では税込価格を表示する店舗が多いため、税込表示の価格を入力すると税が重なってしまいます。",
    },
    {
      q: "軽減税率8%の対象はどう決まりますか？",
      a: "一定の飲食料品や新聞などが対象ですが、商品区分や提供方法などの条件によって変わります。お弁当などは持ち帰りと店内飲食で税率が異なる例があり、酒類や外食は対象外となる場合があります。実際の区分は購入先の表示をご確認ください。",
    },
    {
      q: "計算結果がレシートと数円違うのはなぜですか？",
      a: "実際の会計では事業者ごとの端数処理（1円単位の切り捨てなど）や、商品単位・税率ごとの合計単位が用いられるためです。本ツールは買い物の概算を素早く把握するためのものです。",
    },
  ],
  related: [
    {
      tab: "discount",
      label: "割引計算機",
      when: "セール品の割引後の税抜金額を先に計算したい",
    },
    {
      tab: "percent",
      label: "パーセント計算機",
      when: "「税抜○○円の10%はいくら」など一部の割合を知りたい",
    },
  ],
};

const PERCENT_HELP: HelpContent = {
  summary:
    "「AのB%はいくら？」という形式で、全体の中から取り出したい割合の量（金額・個数・点数など）を計算できます。",
  steps: [
    "「A」に全体の数（例：2,000）、「B」に調べたい割合（例：15）を入力します。",
    "「計算する」を押すと答えが表示されます。「結果をコピー」で数値をコピーできます。",
  ],
  method:
    "パーセントは「100を基準にした割合」を表します。100%は全体と同じ量、50%は全体の半分、25%は4分の1です。「AのB%」を求めるときは、Aを全体として、そのB割分を取り出します。例として2,000の15%は300です。",
  notes: [
    "答えの単位は元の数値と同じになります。円の15%なら円、250点の80%なら点として読んでください。",
    "Aが0なら、どの割合を指定しても結果は0になります。小数の割合や金額を入力した際は、計算結果に端数が含まれることがあります。表示値は目安として読み取り、実際の支払い・配分では必要な丸め方を確認してください。",
  ],
  faqs: [
    {
      q: "「40は200の何%？」は計算できますか？",
      a: "この形式は「200を基準に40が占める割合」を求める別の計算です（答えは20%）。本ツールは「AのB%はいくら」という形式に対応しています。割合を知りたいのか、割合に相当する量を知りたいのかを文章にしてから入力すると間違いが減らせます。",
    },
    {
      q: "Bに100より大きい数を入れてもいいですか？",
      a: "はい。全体より大きい結果になりますが、これは誤りとは限らず、元の量に対して何倍に当たるかを表す用途で使われます（150%なら全体の1.5倍）。",
    },
    {
      q: "割引計算や税込計算との使い分けは？",
      a: "割引後の支払額を知りたいときは割引計算機、税込合計を知りたいときは消費税計算機が便利です。本ツールは「予算の一部」「レシピの人数割り」「テストの得点率」など、割合の量を取り出したいあらゆる場面に使えます。",
    },
  ],
  related: [
    {
      tab: "discount",
      label: "割引計算機",
      when: "セール品の割引後の支払額をまとめて知りたい",
    },
    {
      tab: "tax",
      label: "消費税計算機",
      when: "税率を加えた税込合計を知りたい",
    },
  ],
};

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

function RelatedTools({
  related,
  onNavigate,
}: {
  related: RelatedToolLink[];
  onNavigate: (tab: TabId) => void;
}) {
  return (
    <div className="mt-3 space-y-2">
      {related.map((tool) => (
        <button
          key={tool.tab}
          type="button"
          onClick={() => onNavigate(tool.tab)}
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
        </button>
      ))}
    </div>
  );
}

function HelpSection({
  help,
  onNavigate,
}: {
  help: HelpContent;
  onNavigate: (tab: TabId) => void;
}) {
  return (
    <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
      <h3 className="text-sm font-bold text-slate-700">何が計算できるか</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
        {help.summary}
      </p>

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
      <RelatedTools related={help.related} onNavigate={onNavigate} />
    </div>
  );
}

function DiscountCalculator({
  onNavigate,
}: {
  onNavigate: (tab: TabId) => void;
}) {
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

      <HelpSection help={DISCOUNT_HELP} onNavigate={onNavigate} />
    </div>
  );
}

function TaxCalculator({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
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

      <HelpSection help={TAX_HELP} onNavigate={onNavigate} />
    </div>
  );
}

function PercentCalculator({
  onNavigate,
}: {
  onNavigate: (tab: TabId) => void;
}) {
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

      <HelpSection help={PERCENT_HELP} onNavigate={onNavigate} />
    </div>
  );
}

export default function CalculatorApp() {
  const [activeTab, setActiveTab] = useState<TabId>("discount");
  const tabsRef = useRef<HTMLDivElement>(null);

  const goToTool = (tab: TabId) => {
    setActiveTab(tab);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
          お買いもの計算ツールズ
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          セールの値引き後の価格、税込みの合計、○○の○%。
          <br className="sm:hidden" />
          買い物中の「これ、いくら？」を、その場ですぐ計算できる無料ツールです。
        </p>
      </header>

      <section aria-labelledby="what-you-can-do" className="mb-8">
        <h2 id="what-you-can-do" className="text-base font-bold text-slate-800">
          このサイトでできること
        </h2>
        <div className="mt-3 space-y-3">
          {THINGS_YOU_CAN_DO.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div ref={tabsRef} className="scroll-mt-4">
        <nav
          role="tablist"
          aria-label="計算ツールの切り替え"
          className="mb-8 grid grid-cols-3 gap-2"
        >
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
                <span className="block text-lg leading-relaxed">
                  {tab.icon}
                </span>
                <span className="block text-xs sm:text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div role="tabpanel" className={activeTab === "discount" ? "" : "hidden"}>
          <DiscountCalculator onNavigate={goToTool} />
        </div>
        <div role="tabpanel" className={activeTab === "tax" ? "" : "hidden"}>
          <TaxCalculator onNavigate={goToTool} />
        </div>
        <div role="tabpanel" className={activeTab === "percent" ? "" : "hidden"}>
          <PercentCalculator onNavigate={goToTool} />
        </div>
      </div>

      <section aria-labelledby="tool-guide" className="mt-10">
        <h2 id="tool-guide" className="text-base font-bold text-slate-800">
          どの計算機を使えばいい？
        </h2>
        <p className="mt-1 text-[13px] text-slate-500">
          知りたいことから選ぶと、対応する計算機が開きます。
        </p>
        <div className="mt-3 space-y-2">
          {TOOL_GUIDE.map((guide) => (
            <button
              key={guide.question}
              type="button"
              onClick={() => goToTool(guide.tab)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow active:scale-[0.99]"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-700">
                  {guide.question}
                </span>
                <span className="mt-0.5 block text-xs font-bold text-blue-600">
                  → {guide.answer}
                </span>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ▸
              </span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="usage-examples" className="mt-8">
        <h2 id="usage-examples" className="text-base font-bold text-slate-800">
          実際の利用例
        </h2>
        <div className="mt-3 space-y-3">
          {USAGE_EXAMPLES.map((example) => (
            <div
              key={example.scene}
              className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold leading-relaxed text-slate-800">
                <span aria-hidden="true" className="mr-1.5">
                  {example.icon}
                </span>
                {example.scene}
              </p>
              <dl className="mt-3 space-y-1 text-[13px]">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold text-slate-500">入力</dt>
                  <dd className="text-slate-600">{example.input}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold text-slate-500">結果</dt>
                  <dd className="font-bold text-blue-600">{example.output}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => goToTool(example.tab)}
                className="mt-3 w-full rounded-lg border-2 border-blue-100 py-2 text-sm font-bold text-blue-600 transition-all hover:bg-blue-50 active:scale-[0.99]"
              >
                この計算機を試す
              </button>
            </div>
          ))}
        </div>
      </section>

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
