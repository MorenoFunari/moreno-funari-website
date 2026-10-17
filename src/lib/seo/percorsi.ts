import { getPercorsiPrice, percorsiConfig } from "@/config/percorsi";
import { toAbsoluteUrl } from "@/config/seo";
import type { JsonLdObject } from "./structured-data";

export function createPercorsiJsonLd(): JsonLdObject {
  const url = toAbsoluteUrl("/percorsi");
  const service: JsonLdObject = {
    "@type": "Service",
    "@id": `${url}#servizio`,
    name: percorsiConfig.name,
    serviceType: "Mental coaching",
    description: "Percorso individuale di Mental Coaching: 6 incontri individuali online di circa 60 minuti, in circa 6 settimane, con follow-up incluso.",
    url,
    provider: { "@type": "Person", name: "Moreno Funari", jobTitle: "Mental Coach", url: toAbsoluteUrl("/chi-sono") },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: `${url}#richiesta` },
  };
  // Publication requires explicit fiscal/privacy confirmation; no inferred VAT.
  if (percorsiConfig.showOfferSchema && percorsiConfig.fiscalWording && percorsiConfig.privacyConfirmed) {
    service.offers = { "@type": "Offer", price: String(getPercorsiPrice()), priceCurrency: percorsiConfig.currency, description: percorsiConfig.fiscalWording, url: `${url}#prezzo`, availability: "https://schema.org/InStock" };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [service, {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: toAbsoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Percorsi", item: url },
      ],
    }],
  };
}
