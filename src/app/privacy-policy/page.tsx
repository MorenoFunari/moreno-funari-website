import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { legalConfig } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "../legal-page.module.css";

const privacyContactEmail = "info@morenofunari.it";
const privacyLastUpdatedIso = "2026-09-10";
const privacyLastUpdatedLabel = "10 settembre 2026";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Informazioni sul trattamento dei dati personali nel sito morenofunari.it.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page} id="main-content">
      <Container>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Trasparenza e rispetto</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.intro}>
            Questa informativa spiega quali dati possono essere trattati durante
            la navigazione su morenofunari.it e quando scegli di contattarmi.
          </p>
          <p className={styles.updated}>
            Ultimo aggiornamento:{" "}
            <time dateTime={privacyLastUpdatedIso}>
              {privacyLastUpdatedLabel}
            </time>
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              1. A chi si applica questa informativa
            </h2>
            <p>
              Questa informativa riguarda il sito{" "}
              <a href={legalConfig.websiteUrl}>{legalConfig.websiteUrl}</a>.
              Eventuali servizi separati o siti collegati, incluso{" "}
              <a href={siteConfig.appUrl}>app.morenofunari.it</a>, possono
              disporre di informative dedicate.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              2. Titolare del trattamento
            </h2>
            <p>{legalConfig.controllerName}</p>
            <p>
              Email:{" "}
              <a href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              3. Dati tecnici di navigazione
            </h2>
            <p>
              L’infrastruttura tecnica può trattare dati necessari a consegnare
              le pagine, mantenere sicurezza e disponibilità, prevenire abusi e
              diagnosticare errori.
            </p>
            <ul className={styles.list}>
              <li>indirizzo IP;</li>
              <li>data e ora della richiesta;</li>
              <li>pagina richiesta;</li>
              <li>user agent e informazioni sul browser;</li>
              <li>informazioni tecniche sulla risposta;</li>
              <li>log di sicurezza.</li>
            </ul>
            <p>
              Le finalità sono erogazione del sito, sicurezza, prevenzione di
              abusi e manutenzione tecnica. La base giuridica è il legittimo
              interesse del titolare a rendere disponibile e proteggere il sito.
            </p>
            <p>
              I dati tecnici vengono conservati per il tempo necessario alla
              gestione operativa e alla sicurezza del servizio, secondo le
              impostazioni e i termini del fornitore dell’infrastruttura, salvo
              necessità di accertamento di abusi o obblighi di legge.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Contatti via email</h2>
            <p>
              Se scegli di scrivere via email, possono essere trattati indirizzo
              email, nome eventualmente indicato, contenuto del messaggio e
              ulteriori dati comunicati volontariamente.
            </p>
            <p>
              I dati sono usati per rispondere alla richiesta, fornire
              informazioni sul coaching, organizzare un eventuale primo confronto
              e gestire comunicazioni richieste dall’interessato.
            </p>
            <p>
              La base giuridica è l’esecuzione di misure precontrattuali
              richieste dall’interessato e, per le comunicazioni generali, il
              legittimo interesse a rispondere alle richieste ricevute.
            </p>
            <p>
              I messaggi vengono conservati per il tempo necessario a gestire la
              richiesta e l’eventuale rapporto conseguente, oltre il quale
              possono essere mantenuti soltanto quando necessario per obblighi di
              legge o tutela dei diritti.
            </p>
            <p className={styles.notice}>
              Nel primo messaggio evita di inserire dati sanitari, diagnosi o
              altre informazioni particolarmente sensibili non necessarie.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              5. Candidatura e partecipazione al percorso pilota di mental
              coaching
            </h2>
            <p>
              Quando l’utente compila il modulo di candidatura possono essere
              trattati:
            </p>
            <ul className={styles.list}>
              <li>nome e cognome;</li>
              <li>indirizzo email;</li>
              <li>numero di telefono, se fornito;</li>
              <li>conferma della maggiore età;</li>
              <li>
                informazioni relative alla situazione sulla quale desidera
                lavorare;
              </li>
              <li>aspettative rispetto al percorso;</li>
              <li>disponibilità per gli incontri;</li>
              <li>provenienza della candidatura;</li>
              <li>risposte e comunicazioni inviate volontariamente.</li>
            </ul>
            <p className={styles.notice}>
              Il modulo invita a non inserire diagnosi, informazioni sanitarie
              o altri dati particolarmente sensibili non necessari. Le
              informazioni eventualmente comunicate spontaneamente saranno
              gestite esclusivamente nella misura indispensabile per valutare
              l’adeguatezza della richiesta e tutelare l’interessato.
            </p>

            <h3 className={styles.subTitle}>Finalità e base giuridica</h3>
            <p>I dati vengono utilizzati per:</p>
            <ul className={styles.list}>
              <li>ricevere e valutare la candidatura;</li>
              <li>
                verificare che la richiesta sia compatibile con il perimetro
                del mental coaching;
              </li>
              <li>ricontattare il candidato;</li>
              <li>selezionare i partecipanti;</li>
              <li>organizzare gli incontri;</li>
              <li>svolgere il percorso pilota;</li>
              <li>
                gestire comunicazioni, appuntamenti e osservazioni tra le
                sessioni;
              </li>
              <li>raccogliere un feedback interno e facoltativo;</li>
              <li>
                adempiere a obblighi di legge e tutelare eventuali diritti.
              </li>
            </ul>
            <p>Le basi giuridiche del trattamento sono:</p>
            <ul className={styles.list}>
              <li>
                l’esecuzione di misure richieste dall’interessato prima
                dell’avvio del percorso;
              </li>
              <li>
                l’esecuzione dell’accordo di partecipazione per i candidati
                selezionati;
              </li>
              <li>
                l’adempimento di obblighi di legge, quando applicabile;
              </li>
              <li>
                il legittimo interesse alla tutela di un diritto, quando
                applicabile.
              </li>
            </ul>
            <p>
              I dati raccolti per il percorso pilota non vengono utilizzati
              automaticamente per newsletter o comunicazioni promozionali.
              L’iscrizione a tali comunicazioni richiede una scelta separata e
              facoltativa.
            </p>

            <h3 className={styles.subTitle}>Modalità e strumenti</h3>
            <ul className={styles.list}>
              <li>il modulo è gestito tramite Google Moduli;</li>
              <li>
                risposte, comunicazioni ed eventuali materiali di lavoro
                possono essere conservati tramite Google Drive e Gmail;
              </li>
              <li>
                gli incontri online possono essere svolti tramite Google Meet;
              </li>
              <li>
                le comunicazioni organizzative possono avvenire tramite email
                o, se scelto dall’interessato, WhatsApp;
              </li>
              <li>
                Brevo può essere utilizzato per la gestione di comunicazioni
                organizzative o di liste separate;
              </li>
              <li>
                la candidatura non comporta l’iscrizione automatica a
                newsletter;
              </li>
              <li>
                gli incontri non vengono registrati in audio o video senza un
                consenso specifico e separato.
              </li>
            </ul>

            <h3 className={styles.subTitle}>Conservazione</h3>
            <ul className={styles.list}>
              <li>
                le candidature non selezionate vengono conservate per un
                massimo di 6 mesi dalla comunicazione dell’esito;
              </li>
              <li>
                i dati dei partecipanti, le comunicazioni organizzative e gli
                eventuali appunti vengono conservati per un massimo di 12 mesi
                dalla conclusione del percorso;
              </li>
              <li>
                una conservazione ulteriore avviene solo quando necessaria per
                obblighi di legge o tutela di un diritto;
              </li>
              <li>
                è possibile richiedere la cancellazione anticipata quando non
                esistono obblighi o motivi legittimi per conservare i dati.
              </li>
            </ul>

            <h3 className={styles.subTitle}>
              Natura del conferimento e selezione
            </h3>
            <ul className={styles.list}>
              <li>
                i dati contrassegnati come obbligatori sono necessari per
                valutare la candidatura;
              </li>
              <li>i dati facoltativi possono non essere forniti;</li>
              <li>la compilazione non garantisce l’accesso al percorso;</li>
              <li>
                la valutazione viene effettuata personalmente da Moreno Funari;
              </li>
              <li>non vengono utilizzati processi decisionali automatizzati.</li>
            </ul>

            <h3 className={styles.subTitle}>Riservatezza e testimonianze</h3>
            <ul className={styles.list}>
              <li>
                le informazioni del percorso non vengono pubblicate o
                condivise per finalità promozionali;
              </li>
              <li>
                il feedback interno è distinto da una testimonianza pubblica;
              </li>
              <li>
                testimonianze, citazioni o contenuti riferibili al partecipante
                richiedono una richiesta separata e un consenso specifico,
                libero e revocabile.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              6. Guida gratuita e comunicazioni via email
            </h2>
            <p>
              Il sito può offrire la possibilità di richiedere risorse
              gratuite, come guide pratiche o approfondimenti, tramite moduli di
              iscrizione gestiti da Brevo.
            </p>
            <p>Quando utilizzi questi moduli, possono essere raccolti:</p>
            <ul className={styles.list}>
              <li>indirizzo email;</li>
              <li>nome, se fornito;</li>
              <li>consenso prestato;</li>
              <li>data e ora dell’iscrizione;</li>
              <li>
                informazioni tecniche e origine del modulo, secondo quanto
                gestito dal servizio utilizzato.
              </li>
            </ul>
            <p>I dati sono utilizzati per:</p>
            <ul className={styles.list}>
              <li>inviarti la risorsa richiesta;</li>
              <li>
                inviarti eventuali comunicazioni collegate al progetto Moreno
                Funari | Mental Coach, se hai prestato il relativo consenso;
              </li>
              <li>
                gestire iscrizione, conferma, disiscrizione e preferenze.
              </li>
            </ul>
            <p>
              Il servizio utilizzato per la gestione dei moduli, della lista
              contatti e dell’invio email è Brevo. La base giuridica è il
              consenso dell’interessato.
            </p>
            <p>
              L’iscrizione può richiedere una conferma tramite email. Puoi
              revocare il consenso o disiscriverti in qualsiasi momento tramite
              il link presente nelle email ricevute o contattando il titolare.
              I dati vengono conservati per il tempo necessario a gestire
              l’iscrizione e le comunicazioni richieste, fino alla
              disiscrizione o alla revoca del consenso, fatti salvi eventuali
              obblighi di legge.
            </p>
            <p>
              Le comunicazioni email possono includere informazioni tecniche
              necessarie alla gestione dell’invio, della consegna, dell’apertura
              o dell’interazione con i link, secondo le impostazioni del
              servizio utilizzato.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Google Analytics 4</h2>
            <p>
              Il sito può usare Google Analytics 4, Measurement ID
              G-11RJTDXWBS, fornito da Google Ireland Limited. GA4 viene caricato
              soltanto dopo consenso e non viene caricato se l’utente rifiuta.
            </p>
            <p>
              GA4 usa cookie e identificatori online per misurare utilizzo e
              navigazione del sito. Non riceve dati dei messaggi email, dati
              inseriti nel modulo Brevo, user_id o custom events dal codice del
              sito. Non è collegato a Google Ads; Google Signals e
              personalizzazione pubblicitaria sono disattivati dal codice.
            </p>
            <p>
              Dopo consenso possono essere trattati identificatori generati dai
              cookie, pagine visitate, data e durata indicativa delle
              interazioni, provenienza generale del traffico, browser, sistema
              operativo, tipologia di dispositivo, area geografica approssimativa
              ed eventi automatici della misurazione avanzata abilitati nella
              proprietà.
            </p>
            <p>
              La finalità è comprendere in modo statistico come viene usato il
              sito e migliorare contenuti, navigazione e prestazioni. La base
              giuridica è il consenso dell’interessato.
            </p>
            <p>
              I cookie GA4 hanno la durata indicata nella Cookie Policy. La
              conservazione dei dati a livello utente nella proprietà Analytics
              è configurata al periodo minimo disponibile di 2 mesi. Alcuni
              report aggregati possono restare disponibili secondo il
              funzionamento del servizio.
            </p>
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

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              8. Preferenza analytics
            </h2>
            <p>
              La scelta relativa ad Analytics viene salvata in localStorage con
              chiave `mf_analytics_consent`. Serve soltanto a ricordare
              accettazione o rifiuto, non identifica direttamente la persona,
              scade dopo sei mesi ed è considerata una memorizzazione tecnica
              necessaria a rispettare la scelta.
            </p>
            <p>
              Puoi modificare la scelta in qualsiasi momento tramite
              “Preferenze cookie” nel footer.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              9. Destinatari e fornitori
            </h2>
            <ul className={styles.cardList}>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Vercel Inc.</h3>
                <p>
                  Fornitore dell’infrastruttura, hosting, distribuzione dei
                  contenuti e sicurezza tecnica.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Google Ireland Limited</h3>
                <p>
                  Fornitore di Google Moduli, Drive, Gmail e Meet, ciascuno
                  secondo la propria finalità, e di Google Analytics 4,
                  soltanto dopo consenso.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Brevo</h3>
                <p>
                  Fornitore per la gestione di moduli, liste e comunicazioni
                  email. I dati del percorso pilota non vengono utilizzati
                  automaticamente per newsletter.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>
                  Meta Platforms Ireland Limited
                </h3>
                <p>
                  Fornitore di WhatsApp, utilizzato facoltativamente per
                  comunicazioni organizzative.
                </p>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              10. Trasferimenti internazionali
            </h2>
            <p>
              Alcuni fornitori possono trattare dati anche al di fuori dello
              Spazio Economico Europeo. In tali casi il trattamento avviene
              sulla base degli strumenti e delle garanzie previsti dalla
              normativa applicabile e dai termini messi a disposizione dai
              fornitori.
            </p>
            <ul className={styles.list}>
              <li>
                <a
                  href="https://vercel.com/legal/privacy-notice"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy di Vercel
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy?hl=it"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy Policy di Google
                </a>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              11. Diritti dell’interessato
            </h2>
            <p>
              Puoi chiedere accesso, rettifica, cancellazione, limitazione,
              opposizione quando applicabile, portabilità quando applicabile e
              revoca del consenso. La revoca del consenso non pregiudica la
              liceità del trattamento svolto prima della revoca.
            </p>
            <p>
              Per esercitare i diritti puoi scrivere a{" "}
              <a href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>
              . Puoi inoltre proporre reclamo al{" "}
              <a
                href="https://www.garanteprivacy.it/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Garante per la protezione dei dati personali
              </a>
              .
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              12. Natura del conferimento
            </h2>
            <p>
              I dati tecnici sono necessari per rendere disponibile il sito.
              Scrivere via email e iscriversi per ricevere una guida sono
              facoltativi. Senza i dati richiesti e la conferma
              dell’iscrizione non è possibile inviare la risorsa. Il consenso
              Analytics è facoltativo: il rifiuto non limita navigazione,
              contenuti o contatto.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              13. Decisioni automatizzate
            </h2>
            <p>
              Il sito non utilizza processi decisionali automatizzati che
              producano effetti giuridici o analogamente significativi
              sull’utente.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>14. Aggiornamenti</h2>
            <p>
              Questa informativa può essere aggiornata quando cambiano servizi,
              fornitori, funzionalità, norme o modalità di trattamento.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
