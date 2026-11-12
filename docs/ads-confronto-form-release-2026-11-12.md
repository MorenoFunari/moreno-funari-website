# Chiusura funnel Ads CONFRONTO — 12 novembre 2026

La landing `/ads/confronto` offre ora il modulo CONFRONTO come percorso principale, nella stessa pagina. WhatsApp resta un'alternativa secondaria con URL e messaggio precompilato invariati. Foto reale, logo MF, palette, metadata/noindex e Consent Mode non cambiano.

## Modifiche

- Hero: CTA «Richiedi un CONFRONTO» verso `#richiesta-confronto`, con link nativo, focus della sezione e scroll margin. Copy adeguato alla richiesta tramite modulo, senza offerte o promesse.
- Sezione «Cosa succede dopo la richiesta»: descrive lettura personale, ricontatto ed eventuale colloquio conoscitivo di 30 minuti senza impegno.
- Riutilizzato `ConfrontoLeadForm`, variante embedded: nome, email, situazione e privacy; telefono facoltativo, come su `/confronto`.
- Nuova provenienza `ads_confronto_form` ammessa dal medesimo endpoint. Condivide le regole della landing CONFRONTO: nota obbligatoria e telefono facoltativo. Liste, destinatari, attributi e fallback Brevo esistenti non modificati; nessuna nuova automazione.
- Due opzioni di presentazione sui componenti condivisi (`reassuranceText` e variante secondaria WhatsApp), con default identici a prima. Gli altri utilizzi mantengono comportamento e copy.
- Nessuna modifica a `/confronto`, `/passo`, ringraziamenti, consenso, bootstrap Google, metadata, prezzi, API PASSO o altri funnel.

## Tracking e test

Gli eventi del modulo esistente sono riutilizzati, con page `/ads/confronto` e source `ads_confronto_form`. `confronto_form_start` parte alla prima modifica reale; `confronto_form_submit_attempt` al tentativo; `confronto_lead_created` solo dopo HTTP positivo, `ok === true` e `leadCreated === true`. Richiedono consenso Analytics, senza dati personali nei parametri. Nessun evento commerciale per vista, click CTA, validazione o backend falliti. WhatsApp resta un clic diagnostico.

Manteniamo blocco sincrono del doppio clic e requestId stabile per retry identico. La protezione backend è quella già verificata: best effort per processo, non exactly-once fra istanze serverless. Un contatto accettato da Brevo e una notifica accettata dall'API non equivalgono a email consegnata o richiesta letta.

- Lint, TypeScript (`npx tsc --noEmit`) e build produzione: superati.
- Suite completa sulla build locale con Brevo mock: **129 test superati, 0 falliti, 0 saltati**.
- Coperti i 14 scenari richiesti, incluse navigazione/ritorno, consenso negato e accordato, isolamento PASSO, PII, errori/retry e deduplica.
- Browser locale mobile 390 × 844: CTA primaria visibile, modulo focalizzabile e raggiungibile, nessun overflow orizzontale. Validazione fallita, errore provider simulato e retry con doppio clic verificati; successo su `/grazie-confronto`.
- Build locale confrontata con produzione: testi main di `/confronto`, `/passo`, `/grazie-confronto`, `/grazie-passo` identici.
- Nessuna richiesta, notifica o messaggio reale prodotto dai test. Ricezione commerciale reale GA4 non verificata.

## Account Google e keyword

Proprietà GA4 `556079158`, stream `15851473810`, Measurement ID `G-Z7E9BSCE4N`; account Ads `345-638-6331`, campagna `24345407441`.

Conversione commerciale già esistente `7900290869`: `confronto_lead_created`, categoria Invio moduli per i lead, primaria, conteggio Una, nessun valore economico. Nessuna duplicazione creata. Apertura e WhatsApp rimangono secondari Ads e chiave GA4 diagnostici per l'importazione, secondo decisione confermata. `generate_lead` rimane secondario; PASSO separato. Le due importazioni CTA obsolete `cta_click_confronto` e `cta_click_passo` sono ritirate in Ads, con storico conservato; eventi del sito e GA4 preservati.

Revisione keyword: confrontate le 21 esclusioni correnti con 243 termini osservati nel periodo 25 settembre–12 novembre. Il CSV di riferimento disponibile prima dell'intervento è stato riscontrato con il report live: 56 clic, 624 impressioni, 45,11 € per i termini visibili. Questi valori non sono il totale della campagna. Aggiunte esclusivamente le seguenti **21 negative esatte**, a livello della campagna CONFRONTO:

```
[mental coach come si diventa]
[cosa fa il mental coach]
[mental coach cosa è]
[mental coaching cos è]
[mental coaching significato]
[significato mental coach]
[cos è un mental coach]
[corso mental coach online gratis]
[corso mental coach riconosciuto online]
[mental coach online gratis]
[carmen naclerio]
[roberta liguori]
[angelo cattaneo joy trainer]
[valerie geerts]
[michele tribuzio]
[elena licci tidei]
[gianluca liguori]
[marco valerio ricci]
[riccardo ceccarelli mental coach]
[lorenzo marconi mental coach]
[simone aversano]
```

Nessuna esclusione generica di coach, mental coach, online o città. Negative precedenti preservate, nessuna keyword positiva ampliata, nessun aumento budget/CPC/rete. La configurazione applicata degli obiettivi della campagna, i riferimenti del rilascio e lo smoke test pubblico sono registrati nella consegna finale dopo le verifiche.

## Unica verifica manuale commerciale residua

Non generare falsi lead per far apparire una conversione. Sulla prima richiesta autentica, oppure solo dopo autorizzazione specifica a un test reale:

1. Aprire `/ads/confronto` con gli strumenti diagnostici Google; scegliere liberamente il consenso Analytics. Il rifiuto non deve impedire l'invio del modulo, ma non produce l'evento commerciale GA4 secondo la logica esistente.
2. Con consenso Analytics accordato, compilare il modulo con dati propri e una richiesta legittima, poi inviare una sola volta.
3. Controllare `/api/confronto-lead`: risposta `ok:true`, `leadCreated:true`; verificare separatamente `notificationSent` e ricezione della notifica in Brevo/casella. Non confondere accettazione API e consegna.
4. Controllare Network/Tag Assistant e poi GA4: una sola emissione di `confronto_lead_created`, page `/ads/confronto`, source `ads_confronto_form`, nessun dato personale. Il ringraziamento non certifica da solo il successo.
5. Per l'attribuzione Ads, attendere una richiesta proveniente da un'interazione pubblicitaria autentica e l'elaborazione. Non inventare GCLID, non cliccare annunci per simulare traffico e non attendersi conversioni retroattive. La campagna resta in pausa finché il proprietario non autorizza separatamente la riattivazione.

Nessuna nuova attività di sviluppo dipende da questo riscontro: rimane una verifica operativa dell'effettiva ricezione Google di un invio autorizzato.
