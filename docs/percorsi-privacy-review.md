# Verifica tecnica privacy — /percorsi

Data: 17 ottobre 2026. Branch: `feat/percorsi-un-passo-possibile`.
Revisione sul commit `dc686c468820f90230ccb54ea9bcf810edf2bc2f`.
Verdetto della revisione iniziale: **DA CORREGGERE**.
Stato successivo: integrazioni applicate localmente; vedere aggiornamento in fondo.
Questo documento descrive il codice e propone integrazioni circoscritte; non
attesta conformità legale né modifica l’informativa pubblicata.

## Evidenze

| Controllo | Esito e fonte |
| --- | --- |
| Informativa collegata | `src/components/forms/percorsi-lead-form.tsx`: `/privacy-policy`, stessa route di CONFRONTO e PASSO. `src/app/privacy-policy/page.tsx`: ultimo aggiornamento dichiarato 26 settembre 2026. |
| Dati | Nome, email e situazione obbligatori; telefono facoltativo. Marcatori tecnici: origine, tipo richiesta, timestamp avvio, UUID e honeypot. Nessun salvataggio locale dei campi. |
| Checkbox | Non preselezionato, `required`, label associata con id, testo “Ho letto l’informativa privacy”. Il JSON contiene `privacyConsent` booleano; il server ammette esclusivamente `true`. È presa visione, non consenso marketing né Analytics. |
| Destinazione browser | POST JSON same-origin `/api/percorsi-lead`, senza query string contenente dati del modulo. Nessun invio mentre si scrive, nessuna prenotazione automatica. |
| Destinazione server | Unica fetch esterna: `https://api.brevo.com/v3/smtp/email`. Email con nome, email, telefono eventualmente fornito, situazione e presa visione; reply-to dell’interessato. Non trasmette timestamp avvio, UUID o IP nel messaggio. |
| Destinatario | `PERCORSI_NOTIFICATION_TO`, fallback `LEAD_NOTIFICATION_TO`, fallback `info@morenofunari.it`. Il codice impedisce al richiedente di impostarlo. L’effettivo ambiente produzione e il provider della casella non sono stati verificati. |
| Pilot | Nessuna chiamata `/v3/contacts`, nessun listId, template o attributo Pilot; nessuna email automatica al richiedente. |
| Protezioni | Same-origin, validazione, honeypot, finestra temporale, limite body, rate limit e deduplicazione. Errori generici senza payload nei log applicativi. Hosting/proxy possono comunque avere propri log. |
| Conservazione applicativa | Nessun database per il modulo. Mappe per istanza con hash SHA-256 IP e UUID, scadenza logica 10 minuti e pulizia alle richieste valide successive; non è cancellazione garantita a scadenza. Email e log dei fornitori hanno conservazione separata, non controllata da questo endpoint. |
| Tracking | `submit_percorsi` solo dopo successo e Analytics granted; parametri statici `tipo_richiesta` e `origine`, nessun campo personale. GA4 globale può caricare cookieless se abilitato; il consenso Analytics è indipendente dal checkbox. Meta è mantenuto spento dal manager (`marketingConsentGranted=false`). Impostazioni remote GA4/Brevo non ispezionate. |

## Lacune e modifica minima proposta

1. **Raccolta e finalità non esplicitamente associate al modulo commerciale.**
   La sezione 4 descrive email/PEC/WhatsApp/social e risposte sul coaching; la 5
   riguarda specificamente il Pilot, la 6 le guide e comunicazioni email.
   Queste finalità sono vicine, ma non rendono chiaro il percorso del nuovo form.
   Proposta: estendere titolo e contenuto della sola sezione 4 al modulo
   `/percorsi`, indicando dati obbligatori e telefono facoltativo, valutazione
   personale della richiesta commerciale e ricontatto/colloquio conoscitivo.
   Riutilizzare, previa conferma del titolare, la base precontrattuale già
   indicata; non trasformare il checkbox in consenso newsletter.
2. **Ruolo di Brevo e separazione dal Pilot da chiarire.**
   La sezione 9 cita già Vercel e Brevo, ma non specifica l’inoltro della
   richiesta commerciale tramite email transazionale. Aggiungere in sezione 4
   un breve passaggio su hosting Vercel, inoltro tramite Brevo a Moreno e
   assenza di iscrizione automatica al Pilot/newsletter; precisare il ruolo
   transazionale nella voce Brevo della sezione 9. Confermare destinatario e
   casella effettivi nell’ambiente prima di attivare il modulo.
3. **Conservazione da collegare al nuovo trattamento.**
   La sezione 4 ha già un criterio (“tempo necessario a gestire la richiesta e
   l’eventuale rapporto conseguente”, salvi obblighi/tutela diritti). Estenderlo
   esplicitamente alle richieste commerciali e confermare che venga applicato
   anche alla casella e ai log transazionali Brevo. I limiti 6/12 mesi del Pilot
   non si possono trasferire automaticamente al commerciale. Non inventare un
   numero di mesi. Verificare operativamente termini e cancellazioni dei provider.
4. **Natura del conferimento.**
   Integrare la sezione 12: il modulo commerciale è facoltativo, ma nome, email,
   situazione e presa visione sono necessari per gestire l’invio; telefono
   facoltativo. Il rifiuto Analytics non impedisce la richiesta.

Bozza minima per la sezione 4, da approvare prima di inserirla nel sito:

> Quando compili il modulo della pagina /percorsi, vengono raccolti nome,
> indirizzo email e una breve descrizione della situazione che desideri
> affrontare; il numero di telefono è facoltativo. Questi dati sono utilizzati
> da Moreno Funari per leggere e valutare la richiesta relativa al percorso
> individuale a pagamento, rispondere e organizzare un eventuale colloquio
> conoscitivo richiesto. Il modulo è gestito tramite l’infrastruttura del sito
> e la richiesta viene inoltrata a Moreno tramite email transazionale Brevo.
> L’invio non comporta iscrizione al Pilot, a newsletter o ad automazioni
> promozionali. Ai dati della richiesta si applicano la base giuridica e i
> criteri di conservazione indicati in questa sezione.

La bozza va accompagnata dalle brevi precisazioni ai punti 2–4; non costituisce
un’informativa completa autonoma. Non modificare il resto del documento o la
sezione Pilot per descrivere questo nuovo trattamento.

Miglioria circoscritta consigliata al modulo: riprendere il breve invito già
presente su CONFRONTO a non inserire informazioni sanitarie/cliniche o dati
particolarmente sensibili non necessari, vicino al campo libero. Su /percorsi
manca; l’avviso è attualmente solo nella policy. Richiede approvazione copy.

## Differenze con gli altri moduli

- CONFRONTO: medesima informativa, checkbox con ricontatto esplicito e avviso
  dati sensibili; crea/aggiorna contatto nella lista Pilot e invia notifica.
- PASSO: medesima informativa, consenso distinto per guida/contenuti collegati;
  crea contatto nella lista PASSO, invia guida tramite template e registra
  attributi di consenso/versione quando disponibili.
- PERCORSI: sola presa visione, richiesta commerciale precontrattuale, nessuna
  lista o sequenza. Non deve ereditare il consenso PASSO o le finalità Pilot.
  Nell’email resta la presa visione, ma non versione informativa/data esplicita;
  valutare una traccia di versione se richiesta dalla procedura del titolare,
  senza aggiungere CRM o nuove automazioni per questo audit.

## Test e limiti

Eseguito:

```sh
node --test tests/percorsi-lead.test.mjs tests/percorsi-page.test.mjs
```

33/33 superati: required del form renderizzato; rifiuto privacy false/stringa,
nessuna chiamata provider per richieste non valide; unica destinazione email e
payload senza Pilot, risposta agli errori, idempotenza, rate limit e origini.
Revisione del sorgente conferma che campi privacy omessi/null sono respinti
(`!== true`) e che il checkbox non è preselezionato.
Test su provider simulato e HTML della build locale precedente, non su produzione.
Nessuna nuova build necessaria per questa revisione solo documentale.

Non verificati in questa fase: impostazioni account dei fornitori, DPA/garanzie
trasferimenti, tempi effettivi casella/log, automazioni eventualmente configurate
fuori dal repository, consegna email reale o Network in produzione. Pertanto la
conclusione “unica fetch Brevo” riguarda il codice del nuovo endpoint, non ogni
servizio globale o configurazione esterna del sito.

`privacyConfirmed` resta false e il gate non viene attivato. Nessuna modifica
al codice applicativo, alla policy, al Pilot o ai documenti legali. Nessun push,
merge o deploy.

Riferimento per la checklist di trasparenza: articolo 13 GDPR,
https://eur-lex.europa.eu/eli/reg/2016/679/oj/?locale=it . La valutazione qui è
un confronto tecnico fra implementazione e informativa, non un parere legale.


## Aggiornamento — correzione privacy autorizzata

Applicate le integrazioni minime alle sezioni 4, 9 e 12; data informativa
aggiornata al 17 ottobre 2026. Nessun nuovo periodo di conservazione o base
giuridica aggiunta: rimangono i criteri già esistenti. Avviso breve sui dati
sensibili associato al campo situazione tramite aria-describedby.

Il codice dell’endpoint rimane invariato: nessun archivio del contenuto del
modulo, nessuna cancellazione automatica delle email; hash IP e UUID restano
nelle mappe per istanza con scadenza logica e pulizia su successive richieste.
La policy descrive il criterio di conservazione, non un’automazione inesistente.

Restano da verificare manualmente prima della pubblicazione:

- destinatario effettivo configurato e accessi alla casella di Moreno;
- applicazione del criterio di conservazione e cancellazione nella casella,
  nei messaggi/log transazionali Brevo e nei log del fornitore hosting;
- impostazioni Brevo esterne al codice, accordi con i fornitori e garanzie
  applicabili ai trasferimenti, tramite validazione professionale;
- consegna reale della notifica con credenziali di test appropriate.

`privacyConfirmed` rimane false: l’aggiornamento del testo non equivale a
validazione professionale definitiva e non abilita il servizio.
Consensi Analytics, endpoint e funnel Pilot/PASSO/CONFRONTO invariati.
Verifiche superate: lint, TypeScript esplicito, build e 39/39 test
endpoint/prezzi/pagina, con controlli del link alla policy dalle tre pagine
e dell’avviso accessibile nel modulo. Confronto automatico con HEAD:
le sole sezioni policy modificate sono 4, 9 e 12 (oltre alla data).
Nessun push, merge o deploy.
