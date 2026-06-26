import type { Metadata } from "next";

import { AboutPreviewSection } from "@/components/sections/home/about-preview-section";
import { ApproachSection } from "@/components/sections/home/approach-section";
import { BlogPreviewSection } from "@/components/sections/home/blog-preview-section";
import { ClosingCtaSection } from "@/components/sections/home/closing-cta-section";
import { HomeHero } from "@/components/sections/home/home-hero";
import { RecognitionSection } from "@/components/sections/home/recognition-section";
import { ResourcesSection } from "@/components/sections/home/resources-section";
import { StartPathsSection } from "@/components/sections/home/start-paths-section";
import { siteConfig } from "@/config/site";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
};

export default function Home() {
  return (
    <main className={styles.page} id="main-content">
      <HomeHero />
      <RecognitionSection />
      <StartPathsSection />
      <ApproachSection />
      <ResourcesSection />
      <AboutPreviewSection />
      <BlogPreviewSection />
      <ClosingCtaSection />
    </main>
  );
}
