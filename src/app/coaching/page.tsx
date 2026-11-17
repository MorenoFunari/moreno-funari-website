import Link from "next/link";
import { Container } from "@/components/ui/container";
import { athletePublicationReady, athletePath } from "@/config/giovani-atleti";
import type { Metadata } from "next";

import { ConcreteSituationProcess } from "@/components/coaching/concrete-situation-process";
import { PilotConversionSection } from "@/components/pilot/pilot-conversion-section";
import { BoundariesSection } from "@/components/sections/coaching/boundaries-section";
import { CoachingClosingCta } from "@/components/sections/coaching/coaching-closing-cta";
import { CoachingDefinitionSection } from "@/components/sections/coaching/coaching-definition-section";
import { CoachingFocusAreasSection } from "@/components/sections/coaching/coaching-focus-areas-section";
import { CoachingFaqSection } from "@/components/sections/coaching/coaching-faq-section";
import { CoachingHero } from "@/components/sections/coaching/coaching-hero";
import { ExpectationsSection } from "@/components/sections/coaching/expectations-section";
import { FirstContactSection } from "@/components/sections/coaching/first-contact-section";
import { ProcessSection } from "@/components/sections/coaching/process-section";
import { UsefulWhenSection } from "@/components/sections/coaching/useful-when-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Mental coaching online",
  description:
    "Coaching personalizzato per affrontare blocco e pressione. CONFRONTO gratuito di 30 minuti, online oppure in presenza da concordare, senza obbligo di proseguire.",
  path: "/coaching",
});

export default function CoachingPage() {
  return (
    <main id="main-content">
      <CoachingHero />
      <UsefulWhenSection />
      <CoachingFocusAreasSection />
      {athletePublicationReady ? <Container as="section"><p>Sport, errore e pressione: <Link href={athletePath}>mental coaching per giovani atleti e famiglie</Link>.</p></Container> : null}
      <CoachingDefinitionSection />
      <ProcessSection />
      <ConcreteSituationProcess />
      <ExpectationsSection />
      <FirstContactSection />
      <BoundariesSection />
      <CoachingFaqSection />
      <PilotConversionSection
        eyebrow="CONFRONTO"
        formIntro="Se senti che una scelta, una pressione o un blocco sta diventando difficile da gestire da solo, puoi lasciarmi una richiesta. Leggo personalmente la tua richiesta e ti rispondo per valutare insieme il prossimo passo."
        formTitle="Vuoi partire da una situazione concreta?"
        noteLabel="Situazione concreta"
        page="/coaching"
        source="coaching_form"
        text="CONFRONTO è un primo incontro conoscitivo gratuito di 30 minuti, online oppure in presenza, da concordare, senza obbligo di proseguire. Serve a comprendere la situazione e valutare un eventuale percorso di coaching personalizzato a pagamento."
        points={[]}
        title="Vuoi capire se il coaching può fare per te?"
      />
      <CoachingClosingCta />
    </main>
  );
}
