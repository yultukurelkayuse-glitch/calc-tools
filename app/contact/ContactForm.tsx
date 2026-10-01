const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeWCB8BxUxoOzRDWyXavRBGi7cC8FTd8nbmasO4iVpdrRzODg/viewform";
const GOOGLE_FORM_EMBED_URL = `${GOOGLE_FORM_URL}?embedded=true`;

export default function ContactForm() {
  return (
    <div>
      <p className="mb-6 text-sm leading-7 text-slate-600">
        以下のフォームからお問い合わせください。お名前、メールアドレス、お問い合わせ内容をご入力のうえ送信してください。
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <iframe
          title="お問い合わせフォーム"
          src={GOOGLE_FORM_EMBED_URL}
          className="h-[1000px] w-full border-0 sm:h-[1050px]"
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-sm text-slate-600">
        フォームが表示されない場合は、
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline underline-offset-2"
        >
          Googleフォームを開く
        </a>
        から送信してください。
      </p>
    </div>
  );
}
