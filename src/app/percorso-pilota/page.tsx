import type { Metadata } from "next";

import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { Container } from "@/components/ui/container";
import { pilotInstagramCta, pilotWhatsAppUrl } from "@/config/pilot";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

const infoItems = [
  "Percorso gratuito",
  "Massimo 3 partecipanti",
  "6 incontri online da 60 minuti",
  "Durata indicativa: 6 settimane",
  "Primo confronto iniziale da 30 minuti",
] as const;

const usefulForItems = [
  "a chi si sente bloccato davanti a una scelta concreta",
  "a chi vive pressione nel lavoro, nello sport o nella vita quotidiana",
  "a chi tende a rimandare perché aspetta di sentirsi pronto",
  "a chi si giudica molto e fatica a fare il primo passo",
  "a chi vuole fare chiarezza senza sentirsi giudicato",
] as const;

const flowSteps = [
  "Mi scrivi su WhatsApp oppure mi scrivi CONFRONTO su Instagram.",
  "Mi racconti in modo semplice la situazione da cui vorresti partire.",
  "Ti rispondo personalmente.",
  "Se ha senso, fissiamo un primo confronto online da 30 minuti.",
  "Solo dopo quel confronto decidiamo se iniziare il percorso pilota.",
] as const;

const notItems = [
  "non è psicoterapia",
  "non è consulenza psicologica",
  "non è un percorso sanitario o clinico",
  "non promette risultati automatici",
  "non sostituisce figure professionali specialistiche",
  "non è uno spazio in cui qualcuno decide al posto tuo",
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Percorso Pilota — Un passo possibile",
  description:
    "Un percorso pilota gratuito per lavorare su una situazione concreta di blocco, pressione o confusione. Primo confronto online da 30 minuti, poi eventuale percorso individuale.",
  path: "/percorso-pilota",
});

function PilotActions() {
  return (
    <div className={styles.actions} aria-label="Azioni percorso pilota">
      <TrackedWhatsAppButton
        href={pilotWhatsAppUrl}
        location="pilot_page_primary_cta"
        size="large"
      >
        Scrivimi su WhatsApp
      </TrackedWhatsAppButton>
      <p className={styles.secondaryCta}>
        <a
          className={styles.secondaryCtaLink}
          href={siteConfig.instagramUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {pilotInstagramCta}
        </a>
      </p>
      <p className={styles.microcopy}>
        Ti risponderò personalmente. Il link al primo confronto non viene
        inviato in automatico.
      </p>
    </div>
  );
}

export default function PercorsoPilotaPage() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="pilot-title">
        <Container className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Percorso pilota — Un passo possibile</p>
            <h1 id="pilot-title">
              Uno spazio pilota per fermarti su una situazione concreta
            </h1>
            <p className={styles.lead}>
              Non sempre serve capire tutta la vita. A volte serve guardare
              meglio un blocco, una pressione o una scelta che stai vivendo
              adesso.
            </p>
            <PilotActions />
          </div>
          <aside className={styles.heroCard} aria-label="Informazioni principali">
            <p>Accesso manuale, valutazione personale, massimo 3 persone.</p>
            <span>Gratuito nella fase pilota</span>
          </aside>
        </Container>
      </section>

      <Container as="section" className={styles.section}>
        <div className={styles.copyBlock}>
          <h2>Perché nasce questo percorso pilota</h2>
          <p>Ci sono momenti in cui non ti manca la forza.</p>
          <p>Ti manca uno spazio per mettere ordine.</p>
          <p>
            Magari hai una situazione che continui a rimandare, una pressione
            che ti accompagna da tempo, una scelta che non riesci a guardare con
            lucidità o un dialogo interno che ti blocca prima ancora di iniziare.
          </p>
          <p>
            Il percorso pilota nasce per questo: lavorare su una situazione
            concreta, senza promesse facili e senza frasi motivazionali da
            copertina.
          </p>
        </div>
      </Container>

      <section className={styles.band}>
        <Container className={styles.twoColumns}>
          <div>
            <h2>A chi può essere utile</h2>
            <p className={styles.sectionIntro}>
              Non serve arrivare con tutto chiaro. Serve solo partire da qualcosa
              di reale.
            </p>
          </div>
          <ul className={styles.checkList}>
            {usefulForItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Container as="section" className={styles.section}>
        <div className={styles.copyBlock}>
          <h2>Come funziona</h2>
          <ol className={styles.stepList}>
            {flowSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className={styles.note}>
            Il link Calendly non viene pubblicato sul sito e non viene inviato in
            automatico. Il primo confronto viene proposto solo dopo una
            valutazione minima.
          </p>
        </div>
      </Container>

      <section className={styles.bandSoft}>
        <Container className={styles.twoColumns}>
          <div className={styles.copyBlock}>
            <h2>Il primo confronto non è ancora il percorso</h2>
            <p>
              Il primo incontro dura circa 30 minuti e serve per conoscerci,
              capire meglio la situazione che vuoi portare e valutare se il
              percorso pilota può essere lo spazio giusto.
            </p>
            <p>Non è una sessione completa di coaching.</p>
            <p>
              È un primo momento per fare chiarezza sul punto di partenza e
              capire se ha senso proseguire.
            </p>
          </div>
          <div className={styles.copyBlock}>
            <h2>Se decidiamo di iniziare</h2>
            <p>
              Il percorso pilota completo è gratuito e prevede 6 incontri
              individuali online da circa 60 minuti.
            </p>
            <p>
              Lavoreremo su una situazione concreta, osservando cosa ti blocca,
              quali alternative puoi vedere e quale piccolo passo possibile puoi
              iniziare a costruire.
            </p>
            <p>
              Prima di partire vengono condivisi Accordo di partecipazione e
              Privacy Pack, così ogni passaggio è chiaro.
            </p>
          </div>
        </Container>
        <Container className={styles.infoGrid} aria-label="Dettagli percorso pilota">
          {infoItems.map((item) => (
            <div className={styles.infoItem} key={item}>
              {item}
            </div>
          ))}
        </Container>
      </section>

      <Container as="section" className={styles.section}>
        <div className={styles.twoColumns}>
          <div>
            <h2>Cosa non è</h2>
            <p className={styles.sectionIntro}>
              Le decisioni restano sempre tue. Il mio ruolo è aiutarti a guardare
              meglio la situazione, fare ordine e individuare un passo
              praticabile.
            </p>
          </div>
          <ul className={styles.checkList}>
            {notItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>

      <section className={styles.band}>
        <Container className={styles.copyBlock}>
          <h2>Riservatezza e chiarezza</h2>
          <p>
            Prima dell’inizio del percorso vengono condivisi i documenti
            necessari per chiarire modalità, confini, riservatezza e trattamento
            dei dati.
          </p>
          <p>
            Le eventuali registrazioni o trascrizioni degli incontri vengono
            gestite solo con consenso esplicito.
          </p>
          <p>Nessuna testimonianza è richiesta o obbligatoria.</p>
        </Container>
      </section>

      <Container as="section" className={styles.finalSection}>
        <div className={styles.finalPanel}>
          <h2>Da dove si parte?</h2>
          <div className={styles.finalCopy}>
            <p>Da una situazione concreta.</p>
            <p>Non da tutta la tua vita.</p>
            <p>Non da una versione perfetta di te.</p>
            <p>Non dal sentirti finalmente pronto.</p>
            <p>
              Da un punto reale, osservabile, che oggi senti bloccante o sotto
              pressione.
            </p>
          </div>
          <PilotActions />
        </div>
      </Container>
    </main>
  );
}
