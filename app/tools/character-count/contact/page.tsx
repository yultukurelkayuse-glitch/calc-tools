import type { Metadata } from "next";
import ContactForm from "../../../contact/ContactForm";
import InfoPageShell from "../../../components/InfoPageShell";

export const metadata: Metadata = {
  title: "お問い合わせ | 文字数カウンターツール",
  description: "文字数カウンターツールへのご意見や不具合のご報告はこちらから。",
  alternates: {
    canonical: "/tools/character-count/contact",
  },
};

export default function CharacterCountContactPage() {
  return (
    <InfoPageShell
      title="お問い合わせ"
      backHref="/tools/character-count"
      backLabel="← 文字数カウンターツール"
      footerLinks={{
        privacy: "/tools/character-count/privacy",
        contact: "/tools/character-count/contact",
        about: "/tools/character-count/about",
      }}
    >
      <ContactForm />
    </InfoPageShell>
  );
}
