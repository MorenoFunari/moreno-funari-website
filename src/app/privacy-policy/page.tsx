import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { legalConfig } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "../legal-page.module.css";

const privacyContactEmail = "info@morenofunari.it";
const privacyLastUpdatedIso = "2026-11-17";
const privacyLastUpdatedLabel = "17 novembre 2026";

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
            <p>P.IVA: {siteConfig.vatNumber}</p>
            <p>
              Email:{" "}
              <a href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>
            </p>
            <p>
              PEC: <a href={`mailto:${siteConfig.pec}`}>{siteConfig.pec}</a>
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
            <h2 className={styles.sectionTitle}>
              4. Contatti e richieste tramite i moduli del sito
            </h2>
            <p>
              Se scegli di scrivere via email, possono essere trattati indirizzo
              email, nome eventualmente indicato, contenuto del messaggio e
              ulteriori dati comunicati volontariamente.
            </p>
            <p>
              Le stesse finalità si applicano quando scegli di contattarmi via
              PEC, WhatsApp Business o messaggio diretto sui profili social. In
              questi casi il canale scelto può trattare anche identificativo del
              profilo, numero di telefono, metadati della comunicazione e
              contenuto del messaggio, secondo le impostazioni del relativo
              fornitore.
            </p>
            <p>
              I dati sono usati per rispondere alla richiesta, fornire
              informazioni sul coaching, organizzare un eventuale primo confronto
              e gestire comunicazioni richieste dall’interessato.
            </p>
            <p>
              Quando compili il modulo della pagina <a href="/percorsi">/percorsi</a>,
              vengono raccolti nome, indirizzo email, una breve descrizione della
              situazione che desideri affrontare e la conferma di lettura
              dell’informativa; il numero di telefono è facoltativo. Moreno Funari
              usa questi dati per leggere e valutare la richiesta relativa al
              percorso individuale a pagamento, rispondere e organizzare un
              eventuale colloquio conoscitivo richiesto.
            </p>
            <p>
              Il modulo <a href="/coaching/mental-coach-giovani-atleti">Giovani atleti</a>{" "}
              raccoglie il nome e l’email del richiedente, il suo ruolo (genitore,
              tutore o atleta maggiorenne), la fascia d’età dell’atleta, lo sport
              praticato e una breve descrizione della situazione, oltre alla
              conferma di lettura dell’informativa e, per genitori e tutori, alla
              dichiarazione del ruolo. Telefono e preferenza per gli incontri
              sono facoltativi. I dati servono a leggere e valutare la richiesta
              di informazioni e ricontattare il richiedente. Il primo colloquio
              relativo a un minorenne è con il genitore o tutore. Il modulo non
              richiede nome, data di nascita, scuola o squadra del minore e invita
              a non inserire informazioni sanitarie.
            </p>
            <p>
              La presa visione dell’informativa e la dichiarazione del ruolo non
              autorizzano l’avvio di incontri con il minore: modalità,
              autorizzazioni e limiti della riservatezza vengono definiti prima
              dell’eventuale avvio.
            </p>
            <p>
              I moduli sono gestiti tramite l’infrastruttura del sito su Vercel e
              la richiesta viene inoltrata a Moreno tramite email transazionale
              Brevo. L’invio non comporta iscrizione automatica a liste
              newsletter o Pilot, né l’attivazione di automazioni promozionali.
              Per prevenire abusi e invii duplicati vengono utilizzati anche
              marcatori tecnici dell’invio, data e ora di avvio del modulo e un
              hash dell’indirizzo IP.
            </p>
            <p>
              La base giuridica è l’esecuzione di misure precontrattuali
              richieste dall’interessato e, per le comunicazioni generali, il
              legittimo interesse a rispondere alle richieste ricevute.
            </p>
            <p>
              I messaggi, comprese le richieste commerciali inviate tramite
              /percorsi e le relative notifiche email, e le richieste del modulo
              Giovani atleti con le relative notifiche, vengono conservati per il
              tempo necessario a gestire la richiesta e l’eventuale rapporto
              conseguente, oltre il quale
              possono essere mantenuti soltanto quando necessario per obblighi di
              legge o tutela dei diritti.
            </p>
            <p className={styles.notice}>
              Nel primo messaggio evita di inserire dati sanitari, diagnosi o
              altre informazioni particolarmente sensibili non necessarie.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. CONFRONTO: richiesta e prenotazione</h2>
            <p>CONFRONTO è un incontro conoscitivo gratuito, esclusivamente online, di 30 minuti.
              Non è una sessione di coaching e non obbliga a proseguire. Un eventuale percorso
              successivo è personalizzato e a pagamento.</p>
            <p>Il modulo sul sito raccoglie nome, email, telefono se fornito, situazione descritta,
              presa visione della privacy e fonte della richiesta. Sulle pagine CONFRONTO e Ads
              il telefono è facoltativo e la descrizione è richiesta. Evita dati sanitari,
              diagnosi e altre informazioni sensibili non necessarie.</p>
            <p>I dati sono inviati dal backend del sito a Brevo nella lista CONFRONTO (#5),
              per gestire la richiesta. L’automazione invia l’email con il collegamento a Calendly,
              aggiunge il contatto alla lista Archivio richieste (#8) e lo rimuove dalla
              lista di ingresso (#5). Una nuova richiesta intenzionale, dopo il completamento
              del flusso, può quindi inviare nuovamente il link. Se una richiesta è ancora
              in gestione, il contatto già presente viene aggiornato senza creare una nuova
              iscrizione. Il link di prenotazione è disponibile anche nella pagina di conferma.
              Una notifica operativa con i recapiti e il messaggio viene inviata a Moreno via email.
              La risposta automatica riguarda esclusivamente la richiesta: non comporta iscrizione
              alla newsletter né consenso a comunicazioni promozionali.</p>
            <p>Aprendo il link Calendly puoi scegliere giorno e orario e fornire i dati necessari
              alla prenotazione. Calendly e i servizi Google Calendar e Meet gestiscono
              appuntamento, conferma e collegamento all’incontro online, secondo le rispettive informative.</p>
            <p>La base giuridica è l’esecuzione delle misure precontrattuali richieste
              dall’interessato (art. 6, par. 1, lett. b GDPR); per richieste generali,
              il legittimo interesse a rispondere (lett. f). La casella privacy documenta
              la richiesta e la presa visione, non un consenso marketing.</p>
            <p>I dati vengono conservati per il tempo necessario a gestire la richiesta,
              la prenotazione e l’eventuale rapporto conseguente; successivamente solo
              per obblighi di legge o tutela dei diritti. Le richieste conoscitive che non
              proseguono vengono riesaminate separatamente dai successivi rapporti
              professionali: i dati non più necessari vengono cancellati o anonimizzati,
              senza eliminare quelli ancora richiesti per altre finalità legittime.
              L’archiviazione nella lista Brevo non costituisce di per sé un motivo per
              conservarli indefinitamente. Puoi chiedere la cancellazione quando non
              sussistono motivi per proseguire la conservazione.</p>
            <p>Gli incontri non vengono registrati in audio o video senza un consenso specifico e separato.</p>
            <h3 className={styles.subTitle}>Richieste tramite Instagram e ManyChat</h3>
            <p>Per le interazioni CONFRONTO su Instagram viene utilizzato ManyChat:
              tratta identificativo del profilo, messaggi e risposte alle domande,
              memorizza i campi personalizzati confronto_area e confronto_situazione
              e applica il tag LEAD_CONFRONTO per organizzare la richiesta.
              Finalità e basi giuridiche sono quelle di gestione della richiesta sopra descritte;
              le risposte non costituiscono un’iscrizione alla newsletter né una decisione automatizzata
              sull’accesso al coaching. Puoi richiedere accesso e cancellazione scrivendo al titolare.</p>
            <h3 className={styles.subTitle}>Dati del precedente Percorso Pilota, concluso</h3>
            <p>Il precedente Percorso Pilota è terminato e non raccoglie nuove candidature.
              Questa indicazione riguarda esclusivamente la conservazione dei dati storici,
              senza riattivare il percorso o cancellare documentazione.</p>
            <p>Restano i termini già comunicati: candidature non selezionate fino a 6 mesi
              dalla comunicazione dell’esito; dati dei partecipanti, comunicazioni e appunti
              fino a 12 mesi dalla conclusione del percorso, salvo obblighi di legge o tutela
              dei diritti. I dati già raccolti possono rimanere negli archivi Google Drive e Gmail
              per queste sole finalità. Nessun uso promozionale automatico; testimonianze pubbliche
              richiedono un consenso specifico e separato.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. PASSO: guida gratuita ed email facoltative</h2>
            <p>Il modulo PASSO è un modulo del sito: email obbligatoria e nome facoltativo
              vengono inviati a /api/passo-lead, che comunica dal backend con Brevo.
              La guida viene inviata con un’email transazionale personalizzata con il nome,
              se disponibile. Il flusso non richiede una doppia conferma via email.</p>
            <p>La prima casella documenta la presa visione dell’informativa e la richiesta
              della guida. La consegna della risorsa richiesta si fonda sull’esecuzione
              del servizio richiesto (art. 6, par. 1, lett. b GDPR), non sul consenso marketing.</p>
            <p>La seconda casella è facoltativa, non preselezionata e indipendente:
              soltanto selezionandola chiedi anche email occasionali con riflessioni,
              contenuti pratici e aggiornamenti sul coaching, sulla base del consenso
              (art. 6, par. 1, lett. a GDPR). La guida arriva anche senza questa scelta.</p>
            <p>Brevo conserva separatamente la richiesta della guida e la scelta relativa
              alle email occasionali, con data, origine, versione del modulo e testo mostrato.
              I richiedenti entrano nella lista PASSO — Guida Dire sempre sì (#4);
              l’adesione facoltativa può aggiungerli alla Community (#3).
              La sola presenza nella lista guida non autorizza invii promozionali.</p>
            <p>Per un contatto già presente, una casella facoltativa lasciata vuota non
              revoca né rinnova un consenso precedente. Non vengono rimosse le disiscrizioni
              o le esclusioni dagli invii registrate in Brevo. Puoi revocare il consenso
              in qualsiasi momento dal link di disiscrizione delle email oppure scrivendo
              a info@morenofunari.it, senza pregiudicare la consegna della guida richiesta.</p>
            <p>I dati per la guida sono conservati per il tempo necessario alla consegna
              e alla gestione di eventuali problemi. Per le comunicazioni facoltative,
              fino alla revoca o disiscrizione; successivamente solo le informazioni
              necessarie a rispettare l’opposizione, documentare le scelte o adempiere
              a obblighi di legge. Le informazioni tecniche su consegna e interazioni
              dipendono dalle impostazioni del servizio email.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Google Analytics 4</h2>
            <p>
              Il sito può usare Google Analytics 4, Measurement ID
              G-Z7E9BSCE4N, fornito da Google Ireland Limited. Il tag viene caricato
              con Consent Mode v2 e consenso predefinito denied. Prima della
              scelta o in caso di rifiuto può inviare misurazioni senza cookie;
              i cookie analytics vengono attivati soltanto dopo consenso.
            </p>
            <p>
              GA4 usa cookie e identificatori online per misurare utilizzo e
              navigazione del sito. Non riceve dati dei messaggi email, dati
              inseriti nel modulo Brevo o user_id dal codice del sito. Gli eventi
              includono aperture della landing Ads e interazioni con le CTA;
              possono essere importati in Google Ads per misurare le campagne.
              Google Signals e
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
              sito e migliorare contenuti, navigazione e prestazioni. Per l’uso
              dei cookie analytics la base giuridica è il consenso dell’interessato.
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
                  Fornitore di Google Drive, Gmail, Calendar e Meet,
                  ciascuno secondo la propria finalità, e di Google Analytics
                  4 con Consent Mode v2, come descritto nella sezione dedicata.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Calendly</h3>
                <p>
                  Può essere usato per permettere la prenotazione di un
                  appuntamento dopo i passaggi preliminari previsti.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>Brevo</h3>
                <p>
                  Fornitore per la gestione di contatti, liste e comunicazioni
                  email. I dati del percorso pilota non vengono utilizzati
                  automaticamente per newsletter. Per i moduli /percorsi e
                  Giovani atleti, Brevo inoltra a Moreno la notifica della richiesta tramite
                  email transazionale, senza iscrizione automatica a liste
                  newsletter o Pilot.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>
                  Meta Platforms Ireland Limited
                </h3>
                <p>
                  Fornitore di WhatsApp e dei servizi social Meta, utilizzati
                  per comunicazioni facoltative, e del Meta Pixel, attualmente disattivato sul sito.
                  La scelta analytics non abilita il Pixel.
                </p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>ManyChat, Inc.</h3>
                <p>Fornitore della gestione automatizzata delle conversazioni CONFRONTO
                  su Instagram, dei campi personalizzati e del tag organizzativo.
                  Per il trattamento per conto dei clienti e le garanzie sui trasferimenti
                  internazionali si rinvia al <a href="https://manychat.com/legal/dpa">Data Processing Addendum</a>
                  {" "}e alla <a href="https://manychat.com/legal/privacy">Privacy Policy ManyChat</a>.
                  Non è incorporato un widget ManyChat nel sito.</p>
              </li>
              <li className={styles.card}>
                <h3 className={styles.subTitle}>MongoDB e OpenAI</h3>
                <p>
                  Sono utilizzati nell’app separata Un Passo Possibile AI:
                  MongoDB/MongoDB Atlas per esigenze tecniche e applicative e
                  OpenAI API per elaborare i contenuti necessari a generare la
                  restituzione richiesta dall’utente.
                </p>
              </li>
            </ul>
            <p className={styles.notice}>
              Gli strumenti digitali e i servizi online utilizzati hanno
              finalità organizzative, tecniche, comunicative o di supporto al
              funzionamento dei servizi. I contenuti delle sessioni individuali
              di coaching non vengono inviati a strumenti di intelligenza
              artificiale salvo informativa preventiva e consenso specifico
              dell’interessato.
            </p>
            <p>
              Un Passo Possibile AI è uno strumento digitale distinto dai
              servizi individuali di coaching. Può trattare i contenuti inseriti
              dall’utente per fornire un supporto riflessivo non clinico. Dati
              tecnici e di utilizzo possono essere analizzati in forma aggregata
              o pseudonimizzata per migliorare chiarezza, usabilità e qualità,
              senza finalità diagnostiche o di profilazione psicologica.
            </p>
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
              Scrivere via email e richiedere una guida sono facoltativi.
              Senza l’indirizzo email non è possibile consegnare la guida.
              La scelta delle email occasionali è separata e non condiziona la consegna. Il consenso
              Analytics è facoltativo: il rifiuto non limita navigazione,
              contenuti o contatto.
            </p>
            <p>
              L’uso del modulo /percorsi è facoltativo. Per inviare la richiesta
              sono obbligatori nome, indirizzo email, descrizione della situazione
              e conferma di lettura dell’informativa; senza questi elementi il
              modulo non può inoltrarla. Il telefono è facoltativo. La conferma
              di lettura non è un consenso marketing o Analytics: la scelta
              Analytics è separata e il rifiuto non impedisce l’invio della
              richiesta commerciale.
            </p>
            <p>
              Anche l’uso del modulo Giovani atleti è facoltativo. Per l’invio
              sono necessari ruolo, nome e email del richiedente, fascia d’età
              dell’atleta, sport, breve situazione e presa visione
              dell’informativa; per genitori e tutori è necessaria anche la
              dichiarazione del ruolo. Telefono e preferenza per gli incontri
              sono facoltativi. Il consenso Analytics è separato: il rifiuto non
              impedisce l’invio e la richiesta non comporta consenso marketing.
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
            <p className={styles.notice}>
              Questo testo ha finalità informativa e può essere oggetto di
              revisione professionale.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
