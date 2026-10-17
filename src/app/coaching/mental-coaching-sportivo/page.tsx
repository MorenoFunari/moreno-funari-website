import Link from "next/link";
import { Container } from "@/components/ui/container";
import { athletePublicationReady, athletePath } from "@/config/giovani-atleti";
import type { Metadata } from "next";

import { CoachingLandingPage } from "@/components/sections/coaching/coaching-landing-page";
import { JsonLd } from "@/components/seo/json-ld";
import { coachingLandingPages } from "@/config/coaching-landing-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createCoachingLandingPageJsonLd } from "@/lib/seo/structured-data";

const page = coachingLandingPages.mentalCoachingSportivo;

export const metadata: Metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: page.path,
});

export default function MentalCoachingSportivoPage() {
  return (
    <main id="main-content">
      <JsonLd data={createCoachingLandingPageJsonLd(page)} />
      <CoachingLandingPage page={page} />
      {athletePublicationReady ? <Container as="section"><p>Per giovani sportivi e famiglie: <Link href={athletePath}>mental coaching per giovani atleti</Link>.</p></Container> : null}
    </main>
  );
}
