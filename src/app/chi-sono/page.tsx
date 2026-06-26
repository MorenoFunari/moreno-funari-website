import type { Metadata } from "next";

import { AboutClosingCta } from "@/components/sections/about/about-closing-cta";
import { AboutHero } from "@/components/sections/about/about-hero";
import { CoachingChoiceSection } from "@/components/sections/about/coaching-choice-section";
import { CredentialsSection } from "@/components/sections/about/credentials-section";
import { RealLifeSection } from "@/components/sections/about/real-life-section";
import { SportSection } from "@/components/sections/about/sport-section";
import { TransparencySection } from "@/components/sections/about/transparency-section";
import { WorkingPrinciplesSection } from "@/components/sections/about/working-principles-section";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "Conosci Moreno Funari, Mental Coach, sviluppatore senior, padre e sportivo amatoriale. Un approccio umano e concreto per affrontare blocco, pressione, errori e cambiamenti.",
};

export default function ChiSonoPage() {
  return (
    <main id="main-content">
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
