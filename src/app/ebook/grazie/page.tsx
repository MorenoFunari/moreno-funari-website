import type { Metadata } from "next";

import { EbookThankYou } from "@/components/sections/ebook/ebook-thank-you";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "La guida è pronta",
  description: "Grazie. Ora puoi aprire la guida Un passo possibile.",
  path: "/ebook/grazie",
  noIndex: true,
});

export default function EbookThankYouPage() {
  return (
    <main id="main-content">
      <EbookThankYou />
    </main>
  );
}
