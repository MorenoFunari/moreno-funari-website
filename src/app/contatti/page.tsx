import type { Metadata } from "next";

import { ContactBoundariesSection } from "@/components/sections/contact/contact-boundaries-section";
import { ContactClosingCta } from "@/components/sections/contact/contact-closing-cta";
import { ContactFaqSection } from "@/components/sections/contact/contact-faq-section";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactOptionsSection } from "@/components/sections/contact/contact-options-section";
import { ContactTopicsSection } from "@/components/sections/contact/contact-topics-section";
import { FirstContactProcessSection } from "@/components/sections/contact/first-contact-process-section";
import { MessageStartersSection } from "@/components/sections/contact/message-starters-section";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Scrivi a Moreno Funari per raccontare la situazione che stai vivendo, chiarire un dubbio sul coaching o iniziare un primo confronto senza impegno.",
};

export default function ContattiPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactOptionsSection />
      <MessageStartersSection />
      <ContactTopicsSection />
      <FirstContactProcessSection />
      <ContactBoundariesSection />
      <ContactFaqSection />
      <ContactClosingCta />
    </main>
  );
}
