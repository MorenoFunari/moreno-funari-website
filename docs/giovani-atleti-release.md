# Giovani atleti — note di rilascio

Branch: feat/mental-coach-giovani-atleti. Implementazione e test locali pronti.
Il titolare ha successivamente richiesto di applicare la proposta e pubblicare.
L’integrazione fattuale è ora applicata nelle sezioni 4, 9 e 12 della policy;
publicationReady=true. Le note sotto conservano il contesto della revisione
iniziale e i controlli operativi, senza attestare conformità GDPR definitiva.

## Informativa: integrazione minima proposta, non applicata

La sezione 4 della Privacy Policy cita i contatti e /percorsi, ma non il nuovo
modulo e i dati relativi alla situazione sportiva di un giovane atleta.

Proposta da revisionare e validare per questa finalità prima di pubblicare:

> Il modulo “Giovani atleti” raccoglie il nome e l’email del richiedente, il suo
> ruolo (genitore, tutore o atleta maggiorenne), la fascia d’età dell’atleta,
> lo sport praticato e una breve descrizione della situazione, oltre alla
> conferma di lettura dell’informativa e, per genitori e tutori, alla
> dichiarazione del ruolo. Telefono e preferenza per gli incontri sono
> facoltativi. I dati servono a leggere e valutare la richiesta di informazioni
> e ricontattare il richiedente. Il primo colloquio relativo a un minorenne è
> con il genitore o tutore. Il modulo non richiede nome, data di nascita, scuola
> o squadra del minore e invita a non inserire informazioni sanitarie.
> La richiesta è inoltrata a Moreno mediante email transazionale Brevo, senza
> iscrizione a liste Pilot o newsletter e senza attivazione di automazioni
> promozionali. Alla richiesta e alle relative notifiche si applicano il
> criterio di conservazione e le basi giuridiche già descritti in questa
> sezione, da confermare per la specifica finalità. La presa visione e la
> dichiarazione del ruolo non autorizzano l’avvio di incontri con il minore:
> modalità, autorizzazioni e limiti della riservatezza vengono definiti prima
> dell’eventuale avvio.

Precisazioni minime correlate: sezione 9 Brevo, includere la notifica giovani
atleti; sezione 12, obbligatorietà dei campi sopra elencati e indipendenza del
consenso Analytics. Nessun nuovo termine temporale o fondamento giuridico viene
inventato. Il testo non è un’attestazione GDPR né un’autorizzazione professionale.

## Verifiche manuali necessarie

- Confermare adeguatezza dell’informativa rispetto anche alla descrizione
  indiretta della situazione di un minore e alle basi del trattamento.
- Validare la procedura successiva per autorizzazioni alle sessioni e gestione
  della riservatezza; il checkbox del form non sostituisce quella procedura.
- Confermare applicazione del criterio di conservazione nella casella di Moreno,
  nei log/contenuti Brevo e hosting; nessuna cancellazione automatica delle email
  è implementata dal sito.
- Verificare con il titolare accordi dei fornitori e garanzie trasferimenti:
  nel codice si vede l’endpoint HTTPS Brevo, non la localizzazione effettiva o
  gli accordi account. Le sezioni 9 e 10 della policy già nominano i fornitori.

Riferimenti per revisione, senza conclusioni legali definitive:
https://eur-lex.europa.eu/eli/reg/2016/679/oj/?locale=it
https://www.garanteprivacy.it/temi/minori

## Stato tecnico e procedura finale

- Form: nessun campo identificativo del minore, età per fascia, testo limitato
  a 1200 caratteri, nessun dato nei parametri URL o negli eventi pubblicitari.
  Un testo libero può comunque contenere dati impropri: l’avviso e i limiti
  non sono un filtro infallibile dei contenuti.
- Endpoint isolato con allowlist dei campi: rifiuta anche campi extra come
  childName. Ruolo e fascia d’età sono verificati dal server, ma la dichiarazione
  non prova l’identità o la responsabilità genitoriale di chi compila.
- Notifica solo /v3/smtp/email, nessun contatto/lista/template, nessuna prenotazione.
- Destinatario: GIOVANI_ATLETI_NOTIFICATION_TO oppure configurazione commerciale
  già esistente PERCORSI_NOTIFICATION_TO, poi LEAD_NOTIFICATION_TO e fallback
  info@morenofunari.it. Le ultime impostazioni commerciali di produzione erano
  moreno@morenofunari.it; non sono state cambiate in questo task.
- IP hash e UUID in memoria per istanza, scadenza logica dieci minuti con pulizia
  alle richieste successive; antispam/idempotenza non sono distribuiti.
- CSEN e Smart Coach FIPAV riportati esattamente come dichiarati nel copy del
  titolare. Nessuna esperienza con minori aggiunta e nessun hasCredential schema.
- Header/menu globali invariati: la CTA CONFRONTO preesistente resta nell’header.
  Il contenuto principale della nuova pagina non collega i tre funnel vietati.

Finché la privacy non è validata, `athletePublicationReady=false`: noindex,
link in ingresso e nuova voce sitemap condizionati. Il server è disabilitato
salvo GIOVANI_ATLETI_LEADS_ENABLED=true; in locale abilitato solo con mock Brevo.
Dopo conferma: applicare il testo validato, impostare publicationReady=true,
verificare index/follow e sitemap/link, poi commit/push/PR/controlli/merge/deploy.
Abilitare solo allora il nuovo endpoint in produzione e inviare un solo TEST
controllato. Non ripetere il test senza conoscerne l’esito.

Nessuna modifica a /confronto, /percorsi, /passo o relativi endpoint.
/coaching conserva i metadata esistenti. /chi-sono invariata per non appesantirla.
Robots globale invariato: allow / per *, applicabile anche a Googlebot e
OAI-SearchBot, senza nuove restrizioni arbitrarie. Nessuna indicizzazione richiesta.


## Verifiche completate

- npm run lint: superato senza avvisi.
- npx tsc --noEmit: superato.
- npm run build: superato, pagina statica, endpoint dinamico e immagine OG PNG
  1200 × 630. Tutte le FAQ e i testi sono nell’HTML iniziale.
- 82 test automatici endpoint/pagina/sitemap e regressione Percorsi superati.
- 1 test HTTP del server Next compilato superato: Genitore, Tutore e Atleta
  maggiorenne; errori privacy/ruolo/età prima di qualsiasi fetch; replay senza
  doppia notifica. Solo provider simulato, nessuna email reale.
- Browser CUA: desktop 1440×900 e mobile 390×844, nessun overflow orizzontale.
  CTA visibile nella prima schermata mobile. Confermata l’età bloccata a 18+
  per adulto, checkbox genitore condizionale e avviso genitore/18+.
- Browser: invio impedito dalla checkbox mancante; errore Brevo e retry riuscito
  con il messaggio approvato, senza redirect, prenotazioni o iscrizioni.
- git diff dei tre funnel/API, form esistenti, Analytics e robots: nessun cambio.

Nessun test post-deploy o invio reale eseguito: non c’è un deploy di questa
branch. Anche la verifica di indicizzabilità finale index/follow resta da
eseguire dopo la validazione privacy; la sitemap è già testata in entrambi gli
stati del flag di pubblicazione.


## Autorizzazione successiva e rilascio

Il titolare ha autorizzato «applica e manda su»: applicate le integrazioni
fattuali proposte senza inventare nuovi periodi o basi giuridiche.
Rimosso il blocco di pubblicazione: produzione index/follow, sitemap e link
in ingresso attivi. La revisione professionale e la gestione operativa dei
fornitori/sessioni restano responsabilità del titolare; il checkbox non le
sostituisce. Nessun cambiamento al backend o ai funnel esistenti.
