import type { Metadata } from "next";
import ToolPageShell from "../components/ToolPageShell";
import TaxCalculator from "../components/calculators/TaxCalculator";

export const metadata: Metadata = {
  title: "消費税計算機 | お買いもの計算ツールズ",
  description:
    "商品ごとに8%・10%の税率を選んで、買い物リストの税込合計・消費税額をレシート風に計算できる無料ツール。軽減税率の解説・よくある疑問も掲載。",
  alternates: {
    canonical: "/tax",
  },
};

export default function TaxPage() {
  return (
    <ToolPageShell title="消費税計算機" currentPath="/tax">
      <TaxCalculator />
    </ToolPageShell>
  );
}
