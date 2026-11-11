# Audit SEO mirato — 11 novembre 2026

## Stato iniziale e fonti

Repository reale moreno-funari-website. Working tree iniziale pulito; branch cro/confronto-four-day-test con commit locale preservato. Nuova branch seo/targeted-audit-2026-11-11 da origin/main aggiornato, base fab504f2570ade6b3b0b9070bb762545a65100de. Nessun reset, stash o rebase. Pubblicazione autorizzata dal brief dopo tutti i controlli.

Export Search Console disponibile in Download, letto in sola lettura: morenofunari.it-Performance-on-Search-2026-11-11.xlsx. Foglio Grafico, righe 2–93: 10 agosto–9 novembre, somma B2:B93 = 12 clic, C2:C93 = 173 impressioni, CTR aggregato 12/173 = 6,94%. I sei valori pagina del brief sono confermati dal foglio Pagine: home 8/103, Chi sono 1/80, Coaching 0/67, Frascati 1/53, Inizia da qui 1/23, articolo fiducia 0/16 (clic/impressioni). Le impressioni delle pagine non vengono sommate per ricostruire il totale proprietà. Le query visibili hanno volumi troppo ridotti per bocciare keyword o cambiare title sulla sola base del CTR.

## Riscontri verificati prima della modifica

Crawl HTTP senza esecuzione di Analytics: 28 URL uniche della sitemap più Privacy, Cookie, tre ringraziamenti e landing Ads, totale 34 HTML, tutti HTTP 200. Nessun metadata mancante, duplicato title/description, H1 mancante/multiplo o frammento interno rotto nel perimetro esaminato. Link interni a pagine HTML e PDF verificati; servizi esterni esclusi dal crawl. Questo verifica l'accessibilità HTTP, non lo stato effettivo di indicizzazione di ogni URL in Google.

- Sitemap: URL assoluti HTTPS coerenti, nessuna pagina ringraziamento o Ads noindex inclusa; date degli articoli editoriali, non aggiornate artificialmente.
- Robots: scansione consentita e sitemap assoluta corretta. I ringraziamenti e /ads/confronto restano accessibili al crawler per leggere il loro noindex.
- Canonical: dominio apex coerente. Homepage serializzata da Next senza slash finale: equivalente alla root con slash, nessuna correzione necessaria.
- Cinque pagine prioritarie: title, description, H1 distinti, struttura H2 presente, nessuna lacuna tecnica dimostrata che richieda riscrittura.
- Dati strutturati: JSON valido, WebSite + Person in home, ProfilePage su Chi sono, WebPage sulla pagina Frascati. Riferimenti a persona, immagine e Instagram coerenti. Nessun LocalBusiness, indirizzo o studio inventato. Nessun requisito di breadcrumb dimostrato: nessun nuovo markup aggiunto.
- /percorso-pilota → /confronto (308), /guida-dire-sempre-si → /passo (301), query mantenuta. /wa resta il redirect WhatsApp temporaneo esistente, non modificato.
- PDF commerciale HTTP 200, X-Robots-Tag noindex, follow.

Opportunità concrete: Frascati ha già un link dalla griglia Coaching, ma manca un collegamento contestuale diretto nei contenuti Home e Chi sono. La pagina locale descrive incontri in presenza caso per caso senza specificare le modalità reali confermate nel brief (presso il cliente o all'aperto). Queste sono opportunità di orientamento e chiarezza, non errori che impediscono l'indicizzazione né prova delle cause del traffico basso.

## Interventi implementati, file per file

1. src/components/sections/home/approach-section.tsx: un paragrafo contestuale con link HTML a /coaching/mental-coach-frascati, anchor «mental coaching a Frascati e nei Castelli Romani». Pulsanti e link preesistenti preservati.
2. src/components/sections/about/coaching-choice-section.tsx: un paragrafo con link alla stessa pagina, anchor «mental coaching a Frascati e online». Nessuna nuova CTA o qualifica.
3. src/config/coaching-landing-pages.ts: solo voce mentalCoachFrascati, due paragrafi e una FAQ. Online in tutta Italia; presenza presso cliente o spazi all'aperto su accordo e disponibilità; assenza di studio fisso esplicita. Nessuna modifica a tempi, prezzi, condizioni o servizi.
4. Questo documento: evidenze, verifiche e scelte conservative.

Coaching e Inizia da qui già collegano correttamente risorse e CONFRONTO; nessuna modifica necessaria. Tutti i file di form, endpoint, Brevo, GA4/Ads, Consent Mode, banner/privacy, route PASSO/CONFRONTO e landing Ads rimangono byte per byte invariati. Nessun cambio CSS o design. I dati strutturati rimangono invariati; il testo delle altre sette landing del config condiviso non è stato modificato.

## Verifiche pre-rilascio

- npm run lint: PASS.
- npx tsc --noEmit: PASS (script typecheck dedicato non presente).
- npm run build: PASS, 48 route generate. Build QA con GA/Meta disabilitati nell'ambiente del comando, nessun file .env cambiato.
- Tutti i test esistenti: node --test --test-concurrency=1 tests/*.test.mjs con PERCORSI_TEST_BASE_URL e ATHLETE_TEST_BASE_URL localhost:3120: **85 pass, 0 fail, 0 skip**. Compresi gli endpoint integrati e deduplicazione notifica; provider Brevo intercettato dal mock esistente, solo chiavi fittizie e indirizzi example.com, nessuna email reale o lista toccata. Primo tentativo con origin 127.0.0.1 rifiutato dal controllo origin Next; allineato localhost, senza cambiare endpoint o test.
- Crawl build ottimizzata: tutte le 34 URL HTTP 200, stessa sitemap e robots. Stessi title/description/H1/canonical/robots e JSON-LD delle cinque pagine prioritarie rispetto a produzione precedente; soltanto i due nuovi link previsti aggiunti.
- Link PASSO, CONFRONTO, target dei frammenti e PDF validi; redirect e query confermati anche nella build.
- Desktop 1440×900 e mobile 390×844: nessun overflow sulle tre pagine modificate. Test di navigazione effettivo dei due nuovi link verso Frascati. Paragrafi leggibili con il design system esistente. Nessun errore console rilevato durante le prove.
- Screenshot locali Frascati salvati fuori repo: /private/tmp/seo-frascati-desktop-2026-11-11.jpg e /private/tmp/seo-frascati-mobile-2026-11-11.jpg.

## Interventi scartati

- Riscrivere title o H1 per CTR basso: campione insufficiente e tag esistenti corretti.
- Cambiare canonical, sitemap, robots o redirect: nessun errore verificato; preservati.
- Aggiungere LocalBusiness/ProfessionalService, indirizzo, rating o recensioni: nessuna evidenza a supporto; Person esistente adeguato.
- Aggiungere breadcrumb/schema FAQ o nuove landing/articoli: nessuna necessità tecnica dimostrata per questa iterazione.
- Rifare Coaching/Inizia da qui o modificare CTA e funnel: contenuti e percorsi già funzionanti; rischio fuori obiettivo.
- Nuove automazioni o impostazioni esterne: non autorizzate e non necessarie.

## Google Business Profile e attività manuali

Il sito offre identità personale, recapiti, area Frascati/Castelli Romani/Roma Sud, modalità online e presenza su accordo. L'esistenza e lo stato di una scheda GBP non sono stati verificati in un account autorizzato. Non è stata creata o modificata alcuna scheda. Eventuale idoneità come attività a domicilio/area di servizio va verificata sulle modalità effettive e secondo le regole Google, senza dichiarare uno studio o un indirizzo pubblico inesistente. Non considerare un servizio esclusivamente online automaticamente idoneo.

Riferimenti ufficiali consultati:
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable — link HTML e anchor contestuali.
- https://support.google.com/business/answer/13763036 — idoneità delle attività.
- https://support.google.com/business/answer/9157481 — gestione delle aree di servizio.

## Rilascio e prossimi passi

Rilascio previsto tramite PR su main, controlli Vercel e merge solo a verifica positiva. SHA di merge, deploy e verifiche pubbliche finali vengono registrati nel rapporto di consegna esterno, così non serve un secondo deploy soltanto per aggiornare un timestamp.

Prossime azioni, in ordine:
1. Verificare proprietà e idoneità di un eventuale GBP come attività a servizio del cliente, con informazioni reali e senza sede fittizia; nessuna creazione automatica.
2. Dopo deploy verificato, usare Ispezione URL Search Console sulle tre pagine aggiornate e controllare canonical scelta da Google e ultima scansione. Richiesta di nuova scansione solo se utile, manualmente nell'account.
3. Confrontare un successivo periodo di 28 giorni con baseline comparabile per pagine/query/dispositivo. Separare segnali organici da clic Ads e richieste effettive; nuove pagine soltanto quando domanda e contenuti reali lo giustificano. Nessun risultato SEO promesso da questi cambiamenti.
