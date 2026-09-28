import type { Metadata } from "next";
import InfoPageShell from "../components/InfoPageShell";

export const metadata: Metadata = {
  title: "運営者情報 | スマート計算ツール",
  description: "スマート計算ツールの運営者とサービスの目的をご紹介します。",
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
          <dd className="font-semibold text-slate-800">スマート計算ツール</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-bold text-slate-500">運営者</dt>
          <dd className="font-semibold text-slate-800">スマートツール開発チーム</dd>
        </div>
        <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-bold text-slate-500">目的</dt>
          <dd className="leading-7 text-slate-700">
            日常や買い物の計算をスマホで一番ラクに、直感的に解決するためのWebアプリを提供しています。
          </dd>
        </div>
      </dl>
      <div className="mt-5 rounded-xl bg-blue-50 p-5 text-sm leading-7 text-slate-600">
        割引、消費税、パーセントを、必要なときにすぐ計算できる使いやすさを大切にしています。計算結果は目安としてご利用ください。ご意見や不具合のご連絡はお問い合わせページからお寄せください。
      </div>
    </InfoPageShell>
  );
}
