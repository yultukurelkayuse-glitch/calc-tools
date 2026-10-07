import type { Metadata } from "next";
import InfoPageShell from "../components/InfoPageShell";

export const metadata: Metadata = {
  title: "運営者情報 | お買いもの計算ツールズ",
  description: "お買いもの計算ツールズの運営者、サイトの目的、ツールの提供方針をご紹介します。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <InfoPageShell title="運営者情報">
      <dl className="divide-y divide-slate-100 text-sm">
        <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-bold text-slate-500">サイト名</dt>
          <dd className="font-semibold text-slate-800">お買いもの計算ツールズ</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-bold text-slate-500">運営者</dt>
          <dd className="font-semibold text-slate-800">スマートツール開発チーム</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-bold text-slate-500">サイトの目的</dt>
          <dd className="leading-7 text-slate-700">
            買い物中にふと生まれる「これ、いくら？」——セール品の値引き後の価格、
            税込みの合計、○○円の○%——を、電卓を取り出して式を組み立てるより手軽に、
            その場ですぐ解決できるWebアプリを提供することです。
          </dd>
        </div>
      </dl>
      <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">対象としている方</h2>
          <p>
            セール中の商品の支払額をすぐに知りたい方、買い物リストの税込み合計を確認したい方、
            予算や料金の一部を割合で計算したい方など、日常や仕事の中でちょっとした計算を手軽に行いたいすべての方にご利用いただけます。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">ツールを提供する理由</h2>
          <p>
            割引後の価格や税込み額の計算は、暗算では間違えやすく、電卓でも式を一度組み立てる必要があります。
            「元の金額と割引率を入れるだけ」「税率を商品ごとに選ぶだけ」「文章の穴埋めに入れるだけ」という形にすることで、
            考える手間を減らし、買い物のその場で直感的に答えを確認できることを目指しています。
            すべてのツールを無料で、インストール不要のブラウザ上で提供しています。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">ツールの改善・確認方針</h2>
          <p>
            計算の仕組みは各ツールページの「計算方法」で公開し、誰が確認できるようにしています。
            使い方や注意点、よくある疑問も同じページにまとめ、計算結果の読み取り間違いが起きにくい構成を心がけています。
            ご指摘いただいた不具合や改善のご意見はお問い合わせページから受け付けており、
            既存ツールの改善を優先して反映していきます。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">お問い合わせについて</h2>
          <p>
            サイトやツールについてのご質問、ご意見、不具合のご報告は、お問い合わせページからお気軽にご連絡ください。
          </p>
        </section>
      </div>
    </InfoPageShell>
  );
}
