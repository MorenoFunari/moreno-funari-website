import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articoli su fiducia, pressione, errori, lavoro, sport e piccoli passi concreti.",
};

export default function BlogPage() {
  return (
    <PlaceholderPage
      eyebrow="Riflessioni per la vita reale"
      title="Blog"
      description="Articoli su fiducia, pressione, errori, lavoro, sport e piccoli passi concreti."
    />
  );
}
