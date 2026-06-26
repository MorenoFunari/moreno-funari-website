import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Coaching",
  description:
    "Un percorso umano e concreto per fare chiarezza e individuare passi sostenibili.",
};

export default function CoachingPage() {
  return (
    <PlaceholderPage
      eyebrow="Uno spazio di confronto"
      title="Coaching"
      description="Un percorso umano e concreto per fare chiarezza e individuare passi sostenibili."
    />
  );
}
