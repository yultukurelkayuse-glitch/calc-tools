import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SITE_URL, ADSENSE_CLIENT } from "./lib/site";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "お買いもの計算ツールズ | 割引・消費税・パーセント計算機",
  description:
    "買い物中の「これ、いくら？」をその場で解決。割引・消費税・パーセントの3つの計算機を無料で使える計算ツール集です。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans">
        {children}
        {ADSENSE_CLIENT && (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`}
          />
        )}
      </body>
    </html>
  );
}
