import type { Metadata } from "next";

import { PilotHomeSpotSection } from "@/components/pilot/pilot-home-spot-section";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutPreviewSection } from "@/components/sections/home/about-preview-section";
import { ApproachSection } from "@/components/sections/home/approach-section";
import { BlogPreviewSection } from "@/components/sections/home/blog-preview-section";
import { ClosingCtaSection } from "@/components/sections/home/closing-cta-section";
import { HomeHero } from "@/components/sections/home/home-hero";
import { PassoGuideSection } from "@/components/sections/home/passo-guide-section";
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
      "Coaching per affrontare blocco e pressione nel lavoro, nello sport e nella vita. Primo incontro CONFRONTO gratuito di 30 minuti, online.",
    path: "/",
    absoluteTitle: true,
  }),
  title: { absolute: "Mental coach a Frascati e online | Moreno Funari" },
  description:
    "Mental coaching per chi si blocca tra lavoro, sport e scelte. Primo incontro gratuito, online o di persona a Frascati e nei Castelli Romani.",
};

export default function Home() {
  return (
    <main className={styles.page} id="main-content">
      <JsonLd data={createHomeJsonLd()} />
      <HomeHero />
      <PassoGuideSection />
      <RecognitionSection />
      <StartPathsSection />
      <PilotHomeSpotSection />
      <ApproachSection />
      <ResourcesSection />
      <BlogPreviewSection />
      <AboutPreviewSection />
      <ClosingCtaSection />
    </main>
  );
}
