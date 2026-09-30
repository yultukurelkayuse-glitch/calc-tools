import type { Metadata } from "next";
import InfoPageShell from "../../../components/InfoPageShell";

export const metadata: Metadata = {
  title: "運営者情報 | 文字数カウンターツール",
  description: "文字数カウンターツールの運営者とサービスの目的をご紹介します。",
  alternates: {
    canonical: "/tools/character-count/about",
  },
};

export default function CharacterCountAboutPage() {
  return (
    <InfoPageShell
      title="運営者情報"
      backHref="/tools/character-count"
      backLabel="← 文字数カウンターツール"
    >
      <dl className="divide-y divide-slate-100 text-sm">
        <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-bold text-slate-500">サイト名</dt>
          <dd className="font-semibold text-slate-800">文字数カウンターツール</dd>
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
    </InfoPageShell>
  );
}
