import type { Metadata } from "next";
import CharacterCounter from "./CharacterCounter";

export const metadata: Metadata = {
  title: "文字数カウンター｜無料で文字数・行数をチェック",
  description:
    "文章を入力するだけで文字数・行数・空白を含む文字数などを無料で確認できます。レポート、ブログ、SNS、YouTubeなどの文章確認に便利です。",
  alternates: {
    canonical: "/tools/character-count",
  },
};

export default function CharacterCountPage() {
  return <CharacterCounter />;
}
