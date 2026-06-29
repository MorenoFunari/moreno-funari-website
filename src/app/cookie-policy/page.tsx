import type { Metadata } from "next";

import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-preferences-button";
import { Container } from "@/components/ui/container";
import { legalConfig } from "@/config/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "../legal-page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Informazioni sull’uso dei cookie e delle tecnologie presenti nel sito morenofunari.it.",
  path: "/cookie-policy",
  noIndex: true,
});

export default function CookiePolicyPage() {
  return (
    <main className={styles.page} id="main-content">
      <Container>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Tecnologia essenziale</p>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.intro}>
            Questa pagina descrive i cookie e gli strumenti di memorizzazione
            utilizzati su morenofunari.it e come puoi modificare le tue scelte.
          </p>
          <p className={styles.updated}>
            Ultimo aggiornamento:{" "}
            <time dateTime={legalConfig.lastUpdatedIso}>
              {legalConfig.lastUpdatedLabel}
            </time>
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              1. Cosa sono cookie e strumenti simili
            </h2>
            <p>
              I cookie sono piccoli file salvati dal browser. Strumenti simili,
              come localStorage, permettono al sito di ricordare alcune
              informazioni nel dispositivo. Possono servire a finalità tecniche,
              come ricordare una scelta, oppure a finalità analytics, come
              misurare l’utilizzo del sito dopo consenso.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              2. Situazione predefinita
            </h2>
            <p>
              Al primo accesso Google Analytics non viene caricato e non vengono
              creati cookie analytics. Prima della scelta può essere usato
              soltanto ciò che è strettamente necessario al funzionamento e alla
              gestione della preferenza.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Strumenti tecnici</h2>
            <p className={styles.tableHint} id="technical-storage-table-hint">
              La tabella può essere fatta scorrere orizzontalmente su schermi
              stretti.
            </p>
            <div
              aria-describedby="technical-storage-table-hint"
              aria-label="Strumenti tecnici usati dal sito"
              className={styles.tableWrap}
              tabIndex={0}
            >
              <table className={styles.table}>
                <caption>Strumenti tecnici usati dal sito</caption>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Finalità</th>
                    <th scope="col">Durata</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Fornitore</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>mf_analytics_consent</td>
                    <td>localStorage di prima parte</td>
                    <td>Ricordare la scelta relativa ad Analytics</td>
                    <td>6 mesi</td>
                    <td>Necessario</td>
                    <td>Moreno Funari</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              `mf_analytics_consent` non è un cookie e non viene inviato
              automaticamente con le richieste HTTP.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Google Analytics 4</h2>
            <p className={styles.tableHint} id="analytics-table-hint">
              La tabella può essere fatta scorrere orizzontalmente su schermi
              stretti.
            </p>
            <div
              aria-describedby="analytics-table-hint"
              aria-label="Cookie Google Analytics 4"
              className={styles.tableWrap}
              tabIndex={0}
            >
              <table className={styles.table}>
                <caption>Cookie Google Analytics 4</caption>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Fornitore</th>
                    <th scope="col">Finalità</th>
                    <th scope="col">Durata</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Attivazione</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_ga</td>
                    <td>Google Analytics</td>
                    <td>Distinguere i visitatori</td>
                    <td>Durata predefinita: 2 anni</td>
                    <td>Analytics</td>
                    <td>Soltanto dopo consenso</td>
                  </tr>
                  <tr>
                    <td>_ga_11RJTDXWBS</td>
                    <td>Google Analytics</td>
                    <td>Conservare lo stato della sessione</td>
                    <td>Durata predefinita: 2 anni</td>
                    <td>Analytics</td>
                    <td>Soltanto dopo consenso</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              5. Cosa accade in base alla scelta
            </h2>
            <ul className={styles.cardList}>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>
                  Continua senza analytics
                </h3>
                <p>
                  Nessun caricamento del tag Google, nessun cookie `_ga`, sito
                  interamente utilizzabile e scelta ricordata per sei mesi.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Accetta analytics</h3>
                <p>
                  GA4 viene caricato, i cookie analytics possono essere creati,
                  le misurazioni vengono inviate e la scelta è ricordata per sei
                  mesi.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Revoca</h3>
                <p>
                  Analytics viene disabilitato, i cookie GA accessibili vengono
                  eliminati, la pagina viene ricaricata e non avviene nuova
                  raccolta fino a una nuova accettazione.
                </p>
              </li>
            </ul>
            <p>
              La revoca non comporta la cancellazione automatica dei dati già
              ricevuti da Google.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Modificare la scelta</h2>
            <div className={styles.actionBox}>
              <p>
                Puoi modificare la scelta in qualsiasi momento dal footer del
                sito o usando questo pulsante.
              </p>
              <AnalyticsPreferencesButton className={styles.preferenceButton} />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              7. Impostazioni del browser
            </h2>
            <p>
              Puoi cancellare cookie e dati del sito dalle impostazioni del tuo
              browser. Questa operazione può rimuovere anche la preferenza
              salvata e far ricomparire il pannello di scelta.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Collegamenti esterni</h2>
            <ul className={styles.list}>
              <li>
                <a
                  href="https://policies.google.com/privacy?hl=it"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy di Google
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=it"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Come Google usa dati da siti e app partner
                </a>
              </li>
              <li>
                <a
                  href="https://support.google.com/analytics/answer/11397207?hl=it"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Informazioni su Google Analytics 4
                </a>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}
