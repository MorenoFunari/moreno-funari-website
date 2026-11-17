import type { Metadata } from "next";

import { PilotConversionSection } from "@/components/pilot/pilot-conversion-section";
import { ContactBoundariesSection } from "@/components/sections/contact/contact-boundaries-section";
import { ContactClosingCta } from "@/components/sections/contact/contact-closing-cta";
import { ContactFaqSection } from "@/components/sections/contact/contact-faq-section";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactOptionsSection } from "@/components/sections/contact/contact-options-section";
import { ContactTopicsSection } from "@/components/sections/contact/contact-topics-section";
import { FirstContactProcessSection } from "@/components/sections/contact/first-contact-process-section";
import { MessageStartersSection } from "@/components/sections/contact/message-starters-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contatti",
  description:
    "Scrivi a Moreno Funari. CONFRONTO è un incontro conoscitivo gratuito di 30 minuti, online, senza obbligo di proseguire.",
  path: "/contatti",
});

export default function ContattiPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactOptionsSection />
      <PilotConversionSection
        eyebrow="Contatto diretto"
        formIntro="Puoi scrivermi per CONFRONTO, per una domanda sul coaching o per raccontarmi una situazione concreta. Leggo personalmente ogni richiesta."
        formTitle="Lascia una richiesta"
        noteLabel="Messaggio / situazione concreta"
        page="/contatti"
        points={[]}
        source="contatti_form"
        text="Non serve avere già tutto chiaro. CONFRONTO è un primo incontro conoscitivo gratuito di 30 minuti, online, senza obbligo di proseguire."
        title="Puoi scrivermi anche da qui."
      />
      <MessageStartersSection />
      <ContactTopicsSection />
      <FirstContactProcessSection />
      <ContactBoundariesSection />
      <ContactFaqSection />
      <ContactClosingCta />
    </main>
  );
}
