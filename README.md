# お買いもの計算ツールズ（calc-tools）

割引・消費税・パーセントを1画面で切り替えて使える、Next.js + Tailwind CSS 製の計算ツールです。

## 機能

- 割引計算機（クイック割引率ボタン付き）
- 消費税計算機（8% / 10% 切り替え、レシート風リスト）
- パーセント計算機（穴埋め式フォーム）
- プライバシーポリシー / お問い合わせ / 運営者情報の固定ページ
- Google AdSense 対応の広告プレースホルダー（環境変数で制御）

## 開発

```bash
npm install
npm run dev
```

## ビルド（Cloudflare Pages 向け静的エクスポート）

`next.config.ts` で `output: "export"` を設定しているため、`npm run build` を実行すると静的サイト一式が `out/` ディレクトリに生成されます。サーバー側機能（API Routes など）は使用できません。

## Cloudflare Pages での公開手順

1. このリポジトリを GitHub に Push し、Cloudflare Pages の「Connect to Git」で選択します。
2. ビルド設定:
   - Framework preset: **Next.js (Static HTML Export)**（または None）
   - Build command: `npm run build`
   - Build output directory: `out`
3. 環境変数（Settings → Environment variables）:
   - `NODE_VERSION` = `22`（Next.js 16 は Node.js 20.9 以上が必要）
   - `NEXT_PUBLIC_ADSENSE_CLIENT` = `ca-pub-XXXXXXXXXXXXXXXX`（AdSense 広告を掲載する場合のみ設定。未設定の場合は広告スクリプトが読み込まれず、プレースホルダーのみ表示されます）
4. 「Save and Deploy」で公開します。

## スクリプト

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（`out/` に静的ファイル一式を出力） |
| `npm run lint` | ESLint 実行 |

注意: `output: "export"` のため `next start` は使用できません。ローカルでビルド結果を確認する場合は `npx serve out` などをご利用ください。
