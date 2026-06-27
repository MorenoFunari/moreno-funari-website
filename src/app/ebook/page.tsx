import type { Metadata } from "next";

import { AuthorNoteSection } from "@/components/sections/ebook/author-note-section";
import { EbookBoundariesSection } from "@/components/sections/ebook/ebook-boundaries-section";
import { EbookClosingCta } from "@/components/sections/ebook/ebook-closing-cta";
import { EbookFaqSection } from "@/components/sections/ebook/ebook-faq-section";
import { EbookHero } from "@/components/sections/ebook/ebook-hero";
import { EcosystemSection } from "@/components/sections/ebook/ecosystem-section";
import { HowToUseSection } from "@/components/sections/ebook/how-to-use-section";
import { InsideEbookSection } from "@/components/sections/ebook/inside-ebook-section";
import { UsefulWhenSection } from "@/components/sections/ebook/useful-when-section";

export const metadata: Metadata = {
  title: "Un passo possibile — eBook",
  description:
    "Una guida semplice e concreta per fare chiarezza quando ti senti bloccato, ritrovare fiducia e individuare un piccolo passo da cui ripartire.",
};

export default function EbookPage() {
  return (
    <main id="main-content">
      <EbookHero />
      <UsefulWhenSection />
      <InsideEbookSection />
      <HowToUseSection />
      <AuthorNoteSection />
      <EcosystemSection />
      <EbookBoundariesSection />
      <EbookFaqSection />
      <EbookClosingCta />
    </main>
  );
}
