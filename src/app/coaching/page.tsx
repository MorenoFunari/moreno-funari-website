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
  title: "Coaching",
  description:
    "Uno spazio umano e concreto per fare chiarezza, affrontare blocco e pressione e individuare piccoli passi sostenibili.",
  path: "/coaching",
});

export default function CoachingPage() {
  return (
    <main id="main-content">
      <CoachingHero />
      <UsefulWhenSection />
      <CoachingFocusAreasSection />
      <CoachingDefinitionSection />
      <ProcessSection />
      <ConcreteSituationProcess />
      <ExpectationsSection />
      <FirstContactSection />
      <BoundariesSection />
      <CoachingFaqSection />
      <PilotConversionSection
        eyebrow="Percorso pilota"
        formIntro="Se senti che una scelta, una pressione o un blocco sta diventando difficile da gestire da solo, puoi lasciarmi una richiesta. Ti ricontatto io per capire se il percorso pilota può essere adatto."
        formTitle="Vuoi partire da una situazione concreta?"
        noteLabel="Situazione concreta"
        page="/coaching"
        source="coaching_form"
        text="Dopo aver visto cos’è il coaching e quali sono i suoi confini, puoi lasciare una richiesta se senti che c’è una situazione concreta da cui partire."
        title="Vuoi capire se il percorso pilota può aiutarti?"
      />
      <CoachingClosingCta />
    </main>
  );
}
