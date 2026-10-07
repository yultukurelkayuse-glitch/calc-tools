import type { Metadata } from "next";
import ToolPageShell from "../components/ToolPageShell";
import DiscountCalculator from "../components/calculators/DiscountCalculator";

export const metadata: Metadata = {
  title: "割引計算機 | お買いもの計算ツールズ",
  description:
    "セール商品の割引後の支払額と値引き額をすぐ計算できる無料ツール。10%OFF・20%OFF・半額ボタンでワンタップ入力。使い方・計算方法・よくある疑問も掲載。",
  alternates: {
    canonical: "/discount",
  },
};

export default function DiscountPage() {
  return (
    <ToolPageShell title="割引計算機" currentPath="/discount">
      <DiscountCalculator />
    </ToolPageShell>
  );
}
