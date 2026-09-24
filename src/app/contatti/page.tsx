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
    "Scrivi a Moreno Funari per raccontare la situazione che stai vivendo, chiarire un dubbio sul coaching o iniziare un primo confronto senza impegno.",
  path: "/contatti",
});

export default function ContattiPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactOptionsSection />
      <PilotConversionSection
        eyebrow="Contatto diretto"
        formIntro="Puoi scrivermi per il percorso pilota, per una domanda sul coaching o per capire se posso aiutarti rispetto a una situazione concreta."
        formTitle="Lascia una richiesta"
        noteLabel="Messaggio / situazione concreta"
        page="/contatti"
        points={[]}
        source="contatti_form"
        text="Non serve avere già tutto chiaro o trovare subito le parole giuste. Puoi partire dalla situazione che oggi ti crea più pressione, confusione o blocco."
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
