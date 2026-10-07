import type { Metadata } from "next";
import ToolPageShell from "../components/ToolPageShell";
import PercentCalculator from "../components/calculators/PercentCalculator";

export const metadata: Metadata = {
  title: "パーセント計算機 | お買いもの計算ツールズ",
  description:
    "「AのB%はいくら？」を穴埋め形式で素早く計算できる無料ツール。予算・得点率・分量の割合計算に。計算方法・利用例・よくある疑問も掲載。",
  alternates: {
    canonical: "/percentage",
  },
};

export default function PercentagePage() {
  return (
    <ToolPageShell title="パーセント計算機" currentPath="/percentage">
      <PercentCalculator />
    </ToolPageShell>
  );
}
