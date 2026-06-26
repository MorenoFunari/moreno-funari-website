import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Le informazioni su cookie e servizi di misurazione saranno pubblicate prima del lancio.",
};

export default function CookiePolicyPage() {
  return (
    <PlaceholderPage
      eyebrow="Tecnologia essenziale"
      title="Cookie Policy"
      description="Le informazioni su cookie e servizi di misurazione saranno pubblicate prima del lancio."
    />
  );
}
