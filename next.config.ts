import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 向け静的エクスポート（ビルド結果を out/ に出力）
  output: "export",
  images: {
    // 静的エクスポートでは画像最適化サーバーを利用できないため無効化
    unoptimized: true,
  },
};

export default nextConfig;
