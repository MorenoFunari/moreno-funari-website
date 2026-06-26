import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Le informazioni sul trattamento dei dati personali saranno pubblicate prima del lancio.",
};

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      eyebrow="Trasparenza e rispetto"
      title="Privacy Policy"
      description="Le informazioni sul trattamento dei dati personali saranno pubblicate prima del lancio."
    />
  );
}
