import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "Una pagina dedicata alla persona, alle esperienze reali e all'approccio umano che sta dietro al progetto.",
};

export default function ChiSonoPage() {
  return (
    <PlaceholderPage
      eyebrow="Moreno Funari"
      title="Chi sono"
      description="Una pagina dedicata alla persona, alle esperienze reali e all'approccio umano che sta dietro al progetto."
    />
  );
}
