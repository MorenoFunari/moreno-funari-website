import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPercorsiPrice, isPercorsiLaunchAvailable, percorsiConfig, type PercorsiPriceSettings } from "@/config/percorsi";

import styles from "../coaching/expectations-section.module.css";

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency", currency: percorsiConfig.currency, maximumFractionDigits: 0, useGrouping: "always",
});

export function PercorsiPricingSection({ pricing = percorsiConfig }: { pricing?: PercorsiPriceSettings } = {}) {
  const isLaunch = isPercorsiLaunchAvailable(pricing);
  return (
    <Container as="section" aria-labelledby="prezzo" className={styles.section}>
      <SectionHeading id="prezzo" title="Quanto costa il percorso" />
      <div className={styles.item}>
        <h3>{percorsiConfig.name}</h3>
        <p>6 incontri individuali online · circa 6 settimane · follow-up incluso</p>
        <p>{isLaunch ? "Prezzo di lancio" : "Prezzo ordinario"}: <strong>{euro.format(getPercorsiPrice(pricing))}</strong></p>
        {isLaunch ? <p>Prezzo ordinario: <strong>{euro.format(pricing.ordinaryPrice)}</strong></p> : null}
        {isLaunch ? <p>Il prezzo di lancio è riservato ai primi cinque partecipanti.</p> : null}
        {isLaunch ? <p>Il percorso è lo stesso a entrambi i prezzi: il prezzo di lancio non corrisponde a un servizio ridotto.</p> : null}
        <p>{percorsiConfig.finalPriceNotice}</p>
        {percorsiConfig.fiscalWording ? <p>{percorsiConfig.fiscalWording}</p> : null}
      </div>
      <div><ButtonLink href="#richiesta">Richiedi un colloquio conoscitivo</ButtonLink></div>
      <p>Il colloquio serve a capire se il percorso è adatto alla situazione che vuoi affrontare. Non comporta alcun obbligo di iniziare.</p>
    </Container>
  );
}
