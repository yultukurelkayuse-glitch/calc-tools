import type { Metadata } from "next";
import InfoPageShell from "../components/InfoPageShell";

export const metadata: Metadata = {
  title: "プライバシーポリシー | スマート計算ツール",
  description: "スマート計算ツールの個人情報、Cookie、広告配信等の取り扱いについて。",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageShell title="プライバシーポリシー">
      <div className="space-y-6 text-sm leading-7 text-slate-600">
        <p>
          スマート計算ツール（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報を適切に取り扱うよう努めます。本ポリシーでは、当サイトでの情報の取り扱いについて説明します。
        </p>

        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">アクセス情報・Cookieについて</h2>
          <p>
            当サイトでは、利便性の向上、利用状況の把握、広告配信のためにCookieや類似技術を使用する場合があります。Cookieには、氏名、住所、電話番号など、単独で個人を特定する情報は含まれません。利用者はブラウザの設定からCookieを無効化または削除できます。ただし、その場合は一部の機能が正しく動作しないことがあります。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">広告配信について</h2>
          <p>
            当サイトは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。広告配信事業者は、利用者の興味に応じた広告を表示する目的でCookieを使用することがあります。Googleによる広告Cookieの取り扱いやパーソナライズド広告の設定・無効化については、
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 underline underline-offset-2"
            >
              Googleの広告に関する説明
            </a>
            および
            <a
              href="https://myadcenter.google.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 underline underline-offset-2"
            >
              マイ アド センター
            </a>
            をご確認ください。第三者サービスにおけるデータの取り扱いは、各事業者のポリシーに従います。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">お問い合わせで取得する情報</h2>
          <p>
            フォームから送信されたお名前、メールアドレス、お問い合わせ内容はGoogleフォームを通じて当サイトに送られ、お問い合わせへの回答・連絡に利用します。Googleによる情報の処理はGoogleのプライバシーポリシーに従います。これらの情報をお問い合わせ対応以外の目的で利用したり、法令上必要な場合を除き本人の同意なく他の第三者に提供したりしません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">免責事項</h2>
          <p>
            当サイトは計算結果や掲載情報の正確性に努めますが、その完全性、正確性、最新性を保証するものではありません。税額や販売価格等は、商品・取引条件・端数処理により実際と異なることがあります。重要な判断には販売者・公的機関等の情報をご確認ください。当サイトの利用または利用できなかったことにより生じた損害について、当サイトは法令上認められる範囲で責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold text-slate-800">本ポリシーの変更</h2>
          <p>
            当サイトは、運営状況や法令・サービス仕様の変更に応じて本ポリシーを改定することがあります。変更後の内容は当ページに掲載した時点から適用します。内容に重要な変更がある場合は、当サイト上で分かりやすくお知らせします。
          </p>
        </section>

      </div>
    </InfoPageShell>
  );
}
