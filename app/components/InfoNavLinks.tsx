"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SITE_TOOLS } from "../lib/site";

const INFO_PAGES = [
  { path: "/privacy", label: "プライバシーポリシー" },
  { path: "/contact", label: "お問い合わせ" },
  { path: "/about", label: "運営者情報" },
];

/**
 * ヘッダーの戻るリンクとフッターのinfoページリンクを描画する。
 * `?from=<ツールのパス>` が付いていればそのツールへ戻り、
 * なければサイトトップ（/）へ戻る。
 * フッターのリンクにも from を引き継ぐため、infoページ間を移動しても
 * 元のツールに戻れる。
 */
export default function InfoNavLinks({ part }: { part: "back" | "footer" }) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const toolName = from !== null ? SITE_TOOLS[from] : undefined;
  const backHref = toolName !== undefined && from !== null ? from : "/";
  const backLabel = toolName !== undefined ? `← ${toolName}` : "← サイトトップへ";

  if (part === "back") {
    return (
      <Link
        href={backHref}
        className="text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
      >
        {backLabel}
      </Link>
    );
  }

  const withFrom = (path: string) =>
    toolName !== undefined && from !== null
      ? `${path}?from=${encodeURIComponent(from)}`
      : path;

  return (
    <nav className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
      {INFO_PAGES.map(({ path, label }) => (
        <Link
          key={path}
          href={withFrom(path)}
          className="hover:text-blue-600 hover:underline"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
