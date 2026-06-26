import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Non serve avere già tutto chiaro per iniziare un primo confronto.",
};

export default function ContattiPage() {
  return (
    <PlaceholderPage
      eyebrow="Possiamo partire da una domanda"
      title="Contatti"
      description="Non serve avere già tutto chiaro per iniziare un primo confronto."
    />
  );
}
