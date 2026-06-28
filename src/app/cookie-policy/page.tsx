import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Informazioni sull’uso dei cookie e delle tecnologie presenti nel sito morenofunari.it.",
  path: "/cookie-policy",
  noIndex: true,
});

export default function CookiePolicyPage() {
  return (
    <PlaceholderPage
      eyebrow="Tecnologia essenziale"
      title="Cookie Policy"
      description="Le informazioni su cookie e servizi di misurazione saranno pubblicate prima del lancio."
    />
  );
}
