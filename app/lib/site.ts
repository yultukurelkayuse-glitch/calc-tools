export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smart-tools-calc.com"
).replace(/\/+$/, "");

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-8352654211889930";

/**
 * ツールのパスと名称の対応。
 * infoページ（privacy / contact / about）の戻るリンク表示に使う。
 * 新しいツールページを追加したら、ここに1行追加する。
 */
export const SITE_TOOLS: Record<string, string> = {
  "/discount": "割引計算機",
  "/tax": "消費税計算機",
  "/percentage": "パーセント計算機",
  "/text/duplicate-lines": "テキスト重複削除ツール",
};
