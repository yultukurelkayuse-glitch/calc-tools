import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import InfoPageShell from "../components/InfoPageShell";

export const metadata: Metadata = {
  title: "お問い合わせ | お買いもの計算ツールズ",
  description: "お買いもの計算ツールズへのご意見や不具合のご報告はこちらから。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <InfoPageShell title="お問い合わせ">
      <ContactForm />
    </InfoPageShell>
  );
}
