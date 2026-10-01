import type { Metadata } from "next";
import InfoPageShell from "../components/InfoPageShell";

export const metadata: Metadata = {
  title: "運営者情報 | お買いもの計算ツールズ",
  description: "お買いもの計算ツールズの運営者とサービスの目的をご紹介します。",
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
          <dt className="font-bold text-slate-500">目的</dt>
          <dd className="leading-7 text-slate-700">
            日常をもっと便利に、直感的に解決するためのWEBアプリを提供しています。
          </dd>
        </div>
      </dl>
      <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">提供しているツール</h2>
          <p>
            当サイトでは、買い物や日常生活で役立つ計算ツールを提供しています。割引計算、消費税計算、パーセント計算の3つのツールを、ブラウザ上でそのまま使える無料のWebアプリとして公開しています。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">利用していただきたい方</h2>
          <p>
            セール中の商品の値段をすぐに知りたい方、買い物中の消費税込みの金額を確認したい方、仕事や学習で簡単な割合の計算が必要な方など、日常や仕事の中でちょっとした計算を手軽に行いたいすべての方に利用いただけるサイトです。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">サイト運営の方針</h2>
          <p>
            正確で使いやすいツールを提供することを最も重視しています。どのページでも迷わず目的の計算ができるよう、シンプルで分かりやすい画面を心がけ、スマートフォンからでも快適に操作できる設計にしています。
          </p>
          <p>
            今後も既存ツールの改善と新しいツールの追加を継続的に行い、日常や仕事の中で気軽に頼れる計算サイトを目指して運営していきます。
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
