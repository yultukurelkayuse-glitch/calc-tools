import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import InfoPageShell from "../components/InfoPageShell";

export const metadata: Metadata = {
  title: "お問い合わせ | スマート計算ツール",
  description: "スマート計算ツールへのご意見や不具合のご報告はこちらから。",
};

export default function ContactPage() {
  return (
    <InfoPageShell title="お問い合わせ">
      <ContactForm />
    </InfoPageShell>
  );
}
