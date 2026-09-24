import type { Metadata } from "next";

import { PilotCtaBanner } from "@/components/pilot/pilot-cta-banner";
import { PilotCtaBox } from "@/components/pilot/pilot-cta-box";
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
      <PilotCtaBanner
        page="/contatti"
        source="contatti_pilot_banner"
        variant="compact"
      />
      <PilotCtaBox
        formMode="full"
        formSource="contatti_form"
        showContactDetails
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
