import { athleteFaqs } from "@/config/giovani-atleti-content";
import { athletePath } from "@/config/giovani-atleti";
import { toAbsoluteUrl } from "@/config/seo";
import { siteConfig } from "@/config/site";
import type { JsonLdObject } from "./structured-data";

export function createAthleteJsonLd(): JsonLdObject {
  const url = toAbsoluteUrl(athletePath);
  const personId = toAbsoluteUrl("/#moreno-funari");
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": personId, name: "Moreno Funari", jobTitle: "Mental Coach", url: toAbsoluteUrl("/"), sameAs: siteConfig.socialLinks.map(x => x.href) },
      { "@type": "Service", name: "Mental coaching sportivo per giovani atleti", serviceType: "Mental coaching sportivo", provider: { "@id": personId }, areaServed: [{ "@type": "Place", name: "Frascati" }, { "@type": "Place", name: "Castelli Romani" }], availableChannel: { "@type": "ServiceChannel", name: "Online o in presenza da concordare", serviceUrl: `${url}#richiesta` }, url },
      { "@type": "FAQPage", mainEntity: athleteFaqs.map(x => ({ "@type": "Question", name: x.question, acceptedAnswer: { "@type": "Answer", text: x.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ name: "Home", item: toAbsoluteUrl("/") }, { name: "Coaching", item: toAbsoluteUrl("/coaching") }, { name: "Giovani atleti", item: url }].map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })) },
    ],
  };
}
