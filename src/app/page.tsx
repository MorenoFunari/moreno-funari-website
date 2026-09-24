import type { Metadata } from "next";

import { PilotConversionSection } from "@/components/pilot/pilot-conversion-section";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutPreviewSection } from "@/components/sections/home/about-preview-section";
import { ApproachSection } from "@/components/sections/home/approach-section";
import { BlogPreviewSection } from "@/components/sections/home/blog-preview-section";
import { ClosingCtaSection } from "@/components/sections/home/closing-cta-section";
import { HomeHero } from "@/components/sections/home/home-hero";
import { RecognitionSection } from "@/components/sections/home/recognition-section";
import { ResourcesSection } from "@/components/sections/home/resources-section";
import { StartPathsSection } from "@/components/sections/home/start-paths-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createHomeJsonLd } from "@/lib/seo/structured-data";

import styles from "./page.module.css";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Moreno Funari | Mental Coach",
    description:
      "Percorsi e risorse di mental coaching per fare chiarezza, affrontare blocco e pressione e individuare piccoli passi concreti nella vita reale.",
    path: "/",
    absoluteTitle: true,
  }),
};

export default function Home() {
  return (
    <main className={styles.page} id="main-content">
      <JsonLd data={createHomeJsonLd()} />
      <HomeHero />
      <RecognitionSection />
      <StartPathsSection />
      <ApproachSection />
      <ResourcesSection />
      <PilotConversionSection
        formIntro="Lascia i tuoi dati: ti ricontatto io per capire se il percorso può essere adatto alla situazione che stai vivendo."
        formTitle="Vuoi capire se può fare per te?"
        noteLabel="Situazione concreta"
        page="/"
        source="home_pilot_form"
        subtitle="Per chi si sente bloccato, sotto pressione o confuso rispetto a una situazione concreta."
        text="Non serve avere già tutto chiaro. Partiamo da ciò che stai vivendo davvero e lavoriamo su un prossimo passo possibile."
        title="Un Passo Possibile — Percorso Pilota gratuito"
      />
      <AboutPreviewSection />
      <BlogPreviewSection />
      <ClosingCtaSection />
    </main>
  );
}
