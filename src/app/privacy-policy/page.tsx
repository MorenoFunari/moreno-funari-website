import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Informazioni sul trattamento dei dati personali nel sito morenofunari.it.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      eyebrow="Trasparenza e rispetto"
      title="Privacy Policy"
      description="Le informazioni sul trattamento dei dati personali saranno pubblicate prima del lancio."
    />
  );
}
