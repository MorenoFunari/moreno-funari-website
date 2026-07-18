import type { Metadata } from "next";

import { CoachingLandingPage } from "@/components/sections/coaching/coaching-landing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { coachingLandingPages } from "@/config/coaching-landing-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createCoachingLandingPageJsonLd } from "@/lib/seo/structured-data";

const page = coachingLandingPages.stressLavorativo;

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: page.path,
});

export default function StressLavorativoPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={createCoachingLandingPageJsonLd({
          title: page.title,
          description: page.description,
          path: page.path,
        })}
      />
      <CoachingLandingPage page={page} />
    </main>
  );
}
