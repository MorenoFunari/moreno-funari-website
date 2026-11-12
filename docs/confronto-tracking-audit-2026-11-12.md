# Audit CONFRONTO — 12 novembre 2026

## A. Diagnosi e provenienza

Base: main `ea6d80df1a44b127a117776a2e634ec984221e73`; working tree inizialmente pulito. Branch dedicata `analytics/confronto-verified-conversions`. Verifica del codice, delle interfacce GA4/Ads autenticate e test con provider simulato. Nessun lead o email reale generato.

GA4: proprietà 409592821 / stream 556079158, ID G-Z7E9BSCE4N. Tag Google diretto, nessun contenitore GTM individuato nel repository. Non è stato eseguito un audit di un eventuale account GTM esterno non collegato. Nel codice non è presente un invio diretto di conversione Ads con `AW-.../label`: le azioni osservate in Ads importano eventi GA4.

| Evento | Origine e trigger | Pagina / consenso | Destinazione, duplicazioni e significato |
| --- | --- | --- | --- |
| `page_view` | Configurazione Google tag; misurazione avanzata GA4 con cronologia browser attiva, verificata nell'interfaccia | Pagine del sito; tag immediato anche con denied | GA4; visite, non invii. Nessun secondo page_view manuale aggiunto. In Ads l'azione osservata è rimossa, non ripristinarla. |
| `ads_conversion_apertura_confronto_ads_1` | Bootstrap immediato + osservatore della route | Solo `/ads/confronto`; anche denied, nessuno scroll/clic richiesto | GA4, import Ads già presente. Diagnostico. Guard condiviso evita duplicazione bootstrap/hydration; ora si riabilita dopo uscita dalla route per un ritorno client-side. Refresh = nuovo caricamento legittimo. |
| `ads_conversion_Invio_modulo_per_i_lead_1` | **Regola remota GA4 verificata**: event_name uguale page_view, page_path inizia con `/confronto` | Visualizzazione `/confronto`; eredita la raccolta del page_view | GA4; non è presente un trigger di successo con questo nome nel codice. Conta visualizzazioni, non lead. Azione legacy «Invio modulo per i lead» rimossa in Ads. |
| `generate_lead` | Codice CONFRONTO dopo risposta backend positiva; prima anche vista ringraziamento PASSO. **In aggiunta regola remota GA4** page_view + page_path inizia `/grazie-confronto` | Codice richiede analytics granted; regola remota eredita page_view | GA4, Ads secondaria. Finché resta la regola remota può contare visite dirette e duplicare un successo. Ora il codice PASSO non lo invia più. Non usarlo come obiettivo primario generico. |
| `confronto_lead_created` | Evento già esistente, dopo HTTP ok e `ok === true`, `leadCreated === true` | Form nativo condiviso: `/confronto`, home, coaching, contatti; analytics granted | GA4; candidato commerciale specifico, non ancora importato in Ads né presente tra gli eventi chiave osservati. Un invio per esito positivo nel componente, protetto da doppio clic. Non prova lettura dell'email o appuntamento. |
| `confronto_notification_sent` / `_failed` | Risultato `notificationSent` del backend, separato dal contatto accettato | Stesse pagine, granted | Diagnostica GA4; sent significa accettazione HTTP da Brevo, **non consegna nella casella**. Nessun indirizzo o nota nei parametri. |
| `form_start`, `form_submit` | Nessun trigger esplicito con questi nomi nel codice esaminato. Interazioni moduli ON nella misurazione avanzata GA4, verificato live | Form rilevati automaticamente, secondo configurazione Google | Non sono prova di registrazione backend; l'automatismo può rilevare un tentativo senza successo. Non promuoverli a conversione commerciale. |
| `confronto_form_start` | Nuovo diagnostico esplicito alla prima modifica reale dei campi, non al mount | Solo form CONFRONTO condiviso; granted | GA4, una volta per componente; non contiene valori dei campi. Distingue interazione da accettazione backend senza dipendere dal rilevamento automatico. |
| `confronto_form_submit_attempt` / `_validation_error` | Diagnostici già presenti: tentativo / validazione fallita | Form CONFRONTO, granted | GA4, ripetibili se si riprova; nessun risultato commerciale implicito. |
| `whatsapp_click_confronto` | Clic sui pulsanti WhatsApp tracciati della landing Ads | `/ads/confronto`, anche denied | GA4, import Ads secondario verificato. Ogni clic è un'interazione legittima; non dimostra invio del messaggio né richiesta ricevuta. Href e testo precompilato invariati. |
| `passo_lead_created` | Ora solo successo effettivo del form PASSO (`success` e `guideEmailSent` veri); **rimane regola remota** page_view + page_path inizia `/grazie-passo` | Codice `/passo`, granted; regola remota eredita page_view | GA4, Ads secondaria. Rimosso dal mount della pagina di ringraziamento; correggere anche la regola remota prima di considerarlo affidabile. Mai conversione CONFRONTO. |
| `passo_thank_you_view` | Vista del ringraziamento PASSO | `/grazie-passo`, granted | Solo diagnostico, guard locale già presente. Non genera più lead nel codice. |

La landing Ads attuale è **solo WhatsApp**: non contiene il modulo né un collegamento al modulo `/confronto`. Il percorso Ads → modulo non è quindi quello realmente offerto dalla pagina. Non è stato introdotto un modulo né cambiata la proposta. Il modulo CONFRONTO è nativo e usa `/api/confronto-lead`; PASSO usa il proprio endpoint. I form esterni Brevo individuati appartengono ad altri percorsi/redirect legacy.

### Consenso

Bootstrap invariato: prima `consent default` con analytics_storage, ad_storage, ad_user_data e ad_personalization tutti denied, poi inizializzazione/configurazione tag ed apertura Ads. Il tag viene caricato anche senza accettazione. All'accettazione la configurazione esistente concede **solo analytics_storage**; i tre segnali pubblicitari rimangono denied. Non è stato ampliato il consenso pubblicitario. Revoca: ritorno denied e cancellazione dei cookie `_ga` / `_ga_*`; cookie essenziali preservati. Eventi commerciali dei form restano subordinati ad analytics granted; nessun invio retroattivo al successivo consenso. Quindi un modulo può riuscire senza un evento commerciale GA4: comportamento privacy esistente, non da aggirare.

Riferimenti: [ordine del consenso](https://developers.google.com/tag-platform/security/guides/consent), [Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode), [page view GA4](https://developers.google.com/analytics/devguides/collection/ga4/views).

## B. Spiegazione separata delle anomalie

1. **16 «Invio modulo»: causa dimostrata.** La regola GA4 genera l'evento dalle visualizzazioni di `/confronto`, non dal backend. I 16 eventi / 13 utenti coincidono con i 16 page view / 13 utenti forniti. Non sono 16 richieste. Non si può ricostruire retroattivamente un lead reale da questo evento.
2. **49 aperture contro 55 visualizzazioni: causa numerica non dimostrata.** Era presente un difetto concreto: il guard documentale impediva una nuova apertura dopo uscita/ritorno client-side sulla landing. È corretto, ma non prova che spieghi tutti i 6 eventi di differenza storici. Versioni diverse nel periodo, blocchi client, timing, criteri report e cronologia automatica richiedono dati hit-level. 113 clic Ads, 55 page view e 30 utenti sono grandezze diverse; non equivalgono a 113 visite perse o 55 sessioni. Non attribuire tutti i dati della proprietà agli annunci.
3. **0 conversioni Ads: non dimostra da solo un guasto del tag.** L'evento di apertura è importato correttamente per nome ma configurato come primario; il vero evento specifico di successo non è importato. `generate_lead` è secondario; l'azione legacy Invio modulo è rimossa. Le 49 aperture GA4 della proprietà non sono automaticamente 49 conversioni attribuibili ad Ads. Per il divario diagnostico restano da verificare attribuzione, collegamento proprietà/account, auto-tagging, consenso, intervallo storico e tempi importazione; non è stato dimostrato quale fattore determini esattamente lo zero. Zero richieste realmente ricevute non contraddice zero conversioni commerciali affidabili.
4. **Modulo riuscito senza evento:** possibile e previsto con denied, blocco del tracker o chiusura pagina. Prima, un'eccezione GA/Meta poteva anche trasformare un successo backend in errore UI e impedire il redirect. Ora le eccezioni di misurazione sono isolate e il callback ha timeout di 800 ms. Un timeout/risposta persa dopo accettazione Brevo resta un caso di risultato incerto, non prova di mancata ricezione.

### Configurazione Ads osservata live

| Azione | Stato / ottimizzazione | Conteggio / obiettivi | Indicazione |
| --- | --- | --- | --- |
| Apertura `ads_conversion_apertura_confronto_ads_1`, ID 7829477746 | Attiva, **primaria**, categoria Iscrizione | Ogni, 90 giorni; inclusa negli obiettivi account; valore fallback 1 €; 0 conversioni osservate | Errata come obiettivo commerciale primario |
| `morenofunari.it (web) generate_lead` | Attiva, secondaria | Ogni, 90 giorni; fuori dagli obiettivi account | Non promuovere finché persiste contaminazione/regola remota |
| `Invio modulo per i lead` | Rimossa, precedentemente primaria | Non ripristinare | Nome non certifica successo |
| `whatsapp_click_confronto` | Attiva, secondaria | Ogni, 90 giorni; fuori dagli obiettivi account | Microconversione clic, non richiesta ricevuta |
| `page_view` | Rimossa, secondaria | 3 conversioni storiche complessive osservate | Non ripristinare come commerciale |
| `passo_lead_created` | Attiva, secondaria | Ogni, 90 giorni | Tenere separata da CONFRONTO |
| `confronto_lead_created` | Non presente/importata nell'elenco esaminato | — | Evento esistente da qualificare come commerciale |

Campagna SEARCH - CONFRONTO - Solo Ricerca, ID 24345407441: contrariamente al presupposto del brief risultava **Attivata** anche dopo aggiornamento. È stata portata **In pausa** per rispettare la richiesta esplicita di mantenerla ferma durante l'intervento; verificato nell'interfaccia «In pausa» e nessun annuncio pubblicato. Questa è l'unica modifica esterna effettuata. Nessuna riattivazione, modifica budget (3 €/giorno osservati), keyword, annunci, importazioni o obiettivi.

## C. Correzioni nel repository

- `src/lib/analytics/google-tag.ts`, `src/components/analytics/ads-confronto-open-analytics.tsx`, `src/app/layout.tsx`, `src/app/ads/confronto/page.tsx`: osservatore null della route a livello root, reset del guard all'uscita; bootstrap/hydration condividono la deduplica. Copy, DOM visuale, foto, CTA e WhatsApp invariati.
- `src/components/forms/confronto-lead-form.tsx`: blocco sincrono dei doppi clic, ID richiesta stabile per retry identico (solo memoria), successo backend booleano rigoroso, separazione errori tracker dal modulo; diagnostico prima interazione. Nessun dato campo inviato ad Analytics.
- `src/app/api/confronto-lead/route.ts`: JSON non valido gestito, timeout provider, replay guard per ID con fingerprint hash e risposta condivisa/clonata. Liste Brevo, attributi, fallback e destinatari preesistenti invariati.
- `src/app/passo/passo-form.tsx`, `src/components/analytics/passo-thank-you-analytics.tsx`: evento PASSO solo dopo successo confermato; niente generate_lead dal ringraziamento; protezione doppio clic. Nessuna modifica all'endpoint, ai testi, alla consegna guida o alle automazioni PASSO.
- Nuovi test `tests/{analytics-consent,confronto-tracking,confronto-lead,confronto-integration}.test.mjs` e harness/mock sotto `tests/helpers/`; il mock è caricato solo dal comando QA locale, mai importato nell'applicazione.

**Limiti espliciti:** replay guard best effort nel singolo processo per 10 minuti, massimo 512 voci, non garanzia exactly-once fra istanze serverless o riavvii. Nessun nuovo database o identificatore persistente. `leadCreated` prova accettazione del contatto da Brevo, non lettura umana, consegna email o appuntamento. Il fallback Brevo preesistente può omettere attributi se rifiutati; invariato. I fingerprint non sono inviati a Google. Nessun contatto personale, nota, email, telefono o requestId nei nuovi eventi; page_location conserva la URL esistente, quindi non inserire PII nelle query degli URL.

## D. Verifiche

- `npm run lint`: PASS.
- TypeScript: `npx tsc --noEmit`: PASS (nessuno script typecheck nel package).
- `npm run build`: PASS, 48 route.
- Suite completa: **124/124 PASS, 0 skip, 0 fail**. Include test preesistenti Percorsi/giovani atleti e integrazione contro build locale con Brevo mock.
- Tutti i 12 scenari richiesti coperti: apertura senza interazione, denied/granted, navigazione/ritorno e refresh, form aperto/modificato ma non inviato, validazione, errore backend, successo simulato, doppio clic, ringraziamento diretto, isolamento PASSO.
- Test addizionali: nessuna conversione con JSON malformato/risposta non rigorosamente positiva; retry stesso ID, payload cambiato nuovo ID, replay concorrente un solo contatto/notifica; eccezioni GA/Meta e callback assente non bloccano redirect; notifica fallita distinta dal contatto accettato; revoca consenso cancella solo cookie Analytics.
- Browser locale reale su `http://localhost:3130/confronto`: compilazione fittizia, provider simulato 503 → errore visibile e nessun redirect; retry con provider simulato 201 → `/grazie-confronto` e conferma visibile. Nessun invio reale; tag Google/Meta disabilitati nella build QA.
- Non c'è una proprietà Google di test dedicata accessibile/configurata nel progetto. I test verificano chiamate/ordine/parametri gtag, non consegna a Google. Nessun evento fittizio o lead di prova inviato in produzione; non si dichiara verificata la ricezione reale Google/Brevo dalla sola build.

Riproduzione: `node --test tests/confronto-tracking.test.mjs tests/confronto-lead.test.mjs tests/analytics-consent.test.mjs`. Per integrazione avviare build locale con `NODE_OPTIONS='--import .../tests/helpers/confronto-brevo-mock.mjs'`, `TRACKING_TEST_MODE=true`, credenziali solo fittizie, `PERCORSI_TEST_BREVO_LOG` e `TRACKING_TEST_FAIL_FILE` fuori repo; impostare `TRACKING_TEST_BASE_URL=http://localhost:3130` per il test integrazione. Non puntare i test POST al sito pubblico.

## E. Rilascio

Branch `analytics/confronto-verified-conversions`, commit dedicato e PR verso main. Riferimenti definitivi di commit, PR, deploy e smoke test pubblico riportati nella consegna associata al rilascio, dopo verifica CI e produzione. Nessun deploy manuale alternativo al flusso GitHub/Vercel esistente. Un deploy tecnico non corregge le regole remote sotto elencate.

## F. Operazioni esterne necessarie prima di investire

Configurazioni accessibili ed esaminate in lettura; non modificate, salvo pausa della campagna. Non riavviare Ads finché questa checklist non è conclusa.

1. **GA4 → Amministrazione → Visualizzazione dati → Eventi → Crea eventi / Configurazioni personalizzate.** Aprire `ads_conversion_Invio_modulo_per_i_lead_1`: attualmente page_view + page_path inizia `/confronto`. Eliminare/disattivare la regola che deriva un presunto invio dalla visita; togliere l'evento legacy dagli eventi chiave commerciali. Non ricrearlo con un nome diverso mantenendo il trigger page_view. Non modifica retroattivamente i dati storici.
2. Stessa schermata: rimuovere/disattivare la regola **`generate_lead` ← page_view + `/grazie-confronto`**. Il codice lo emette già dopo successo CONFRONTO; la regola crea falsi positivi da aperture dirette/duplicazioni.
3. Stessa schermata: rimuovere/disattivare la regola **`passo_lead_created` ← page_view + `/grazie-passo`**. Ora l'evento nel codice parte solo dal form riuscito; mantenere il ringraziamento come vista diagnostica.
4. **GA4 → Eventi / Eventi chiave:** `page_view`, apertura Ads e WhatsApp risultano marcati come eventi chiave nell'elenco osservato; distinguere microeventi dai lead. Impostare `confronto_lead_created` come evento chiave commerciale, senza creare un nuovo trigger derivato da page_view. Non marcare `form_start`, `form_submit`, tentativi o errori come lead. Conservare lo storico per analisi, senza interpretarlo come richieste.
5. **Google Ads → Obiettivi → Conversioni → Riepilogo → apertura landing**, ID 7829477746: cambiare ottimizzazione **Primaria → Secondaria**. Oggi è primaria negli obiettivi account: non deve orientare le offerte come acquisizione cliente. [Differenza primaria/secondaria](https://support.google.com/google-ads/answer/10632359?hl=en).
6. Dopo pulizia GA4 e verifica controllata del significato, **Ads → Nuova azione conversione → Importa Google Analytics 4**: selezionare l'evento esistente `confronto_lead_created`; categoria invio modulo lead, **Primaria**, conteggio **Una** per interazione pubblicitaria. Verificare inclusione negli obiettivi appropriati di CONFRONTO senza riattivare la campagna. Non importare un duplicato se comparisse già un'azione con lo stesso evento.
7. Lasciare `generate_lead` secondario per evitare doppio conteggio con il canonico; WhatsApp secondario finché misura solo clic; PASSO separato e fuori dagli obiettivi commerciali CONFRONTO; page_view e legacy Invio modulo rimossi, non ripristinarli. Un messaggio WhatsApp effettivamente ricevuto resta da riscontrare nella chat: il clic non lo certifica.
8. **GA4 → Collegamenti Google Ads** e **Ads → Impostazioni account → Tag automatico**: controllare collegamento alla proprietà/stream sopra e auto-tagging GCLID. Non dedurre questi valori dalla sola importazione visibile. Controllare eventuali obiettivi specifici della campagna e intervalli di attribuzione. Questi dettagli non sono stati modificati né certificati nel presente audit.
9. Verifica finale in proprietà/ambiente di test dedicato o con un'autentica richiesta autorizzata: Network `g/collect`, apertura negata/accordata, un solo evento di apertura per ingresso, nessun lead con sola visita/errori, canonico solo dopo successo e consenso, nessun PASSO→CONFRONTO. Poi verificare ricezione Google e attribuzione Ads separatamente dai segnali di coda. Per email reali verificare stato Brevo/consegna casella senza confondere accettazione API e consegna. Non generare falsi lead in produzione per far apparire conversioni.

**Verdetto:** correzioni del repository verificate; misurazione commerciale complessiva ancora subordinata alla pulizia delle regole GA4 e degli obiettivi Ads. Nessuna conformità legale definitiva attestata, nessun ampliamento della raccolta senza consenso, nessuna riattivazione Ads.
