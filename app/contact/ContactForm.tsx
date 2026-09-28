"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div>
      <p className="mb-6 text-sm leading-7 text-slate-600">
        ご意見、ご質問、不具合のご報告をお寄せください。このフォームは表示確認用のデモです。入力内容は実際には送信・保存されません。
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-slate-600">
            お名前
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="山田 太郎"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-slate-600">
            メールアドレス
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="example@example.com"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-slate-600">
            お問い合わせ内容
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={5}
            maxLength={3000}
            rows={6}
            placeholder="お問い合わせ内容をご入力ください"
            className="w-full resize-y rounded-xl border-2 border-slate-200 px-4 py-3 text-base leading-7 text-slate-800 outline-none transition-all placeholder:text-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.99]"
        >
          送信
        </button>
        {submitted && (
          <p role="status" className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700">
            送信されました（ダミー）
          </p>
        )}
      </form>
    </div>
  );
}
