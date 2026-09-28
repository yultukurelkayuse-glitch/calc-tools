import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./lib/site";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "お買いもの計算ツールズ | 割引・消費税・パーセント計算機",
  description:
    "割引計算、消費税計算、パーセント計算を1画面で切り替えて使える無料の計算ツール。お買い物や仕事に、その場ですぐ使えます。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans">
        {children}
        {adsenseClient && (
          <Script
            id="google-adsense"
            strategy="beforeInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`}
          />
        )}
      </body>
    </html>
  );
}
