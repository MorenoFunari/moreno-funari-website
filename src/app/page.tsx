import type { Metadata } from "next";

import { PilotHomeFormSection } from "@/components/pilot/pilot-home-form-section";
import { PilotHomeSpotSection } from "@/components/pilot/pilot-home-spot-section";
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
      "Moreno Funari, mental coach: percorsi e risorse per affrontare blocco e pressione nel lavoro, nello sport e nella vita personale, con passi concreti.",
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
      <PilotHomeSpotSection />
      <ApproachSection />
      <ResourcesSection />
      <BlogPreviewSection />
      <AboutPreviewSection />
      <PilotHomeFormSection />
      <ClosingCtaSection />
    </main>
  );
}
