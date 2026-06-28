import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { AboutClosingCta } from "@/components/sections/about/about-closing-cta";
import { AboutHero } from "@/components/sections/about/about-hero";
import { CoachingChoiceSection } from "@/components/sections/about/coaching-choice-section";
import { CredentialsSection } from "@/components/sections/about/credentials-section";
import { RealLifeSection } from "@/components/sections/about/real-life-section";
import { SportSection } from "@/components/sections/about/sport-section";
import { TransparencySection } from "@/components/sections/about/transparency-section";
import { WorkingPrinciplesSection } from "@/components/sections/about/working-principles-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createProfilePageJsonLd } from "@/lib/seo/structured-data";

const description =
  "Conosci Moreno Funari e il suo approccio al mental coaching: umano, concreto e nato dall’esperienza tra lavoro, sport e vita quotidiana.";

export const metadata: Metadata = createPageMetadata({
  title: "Chi sono",
  description,
  path: "/chi-sono",
});

export default function ChiSonoPage() {
  return (
    <main id="main-content">
      <JsonLd data={createProfilePageJsonLd(description)} />
      <AboutHero />
      <RealLifeSection />
      <SportSection />
      <CoachingChoiceSection />
      <WorkingPrinciplesSection />
      <TransparencySection />
      <CredentialsSection />
      <AboutClosingCta />
    </main>
  );
}
