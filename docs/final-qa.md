# QA finale

## Data e ambiente

Data QA: 2026-06-30.

Ambienti verificati:

- Locale sito: `http://localhost:3001`
- Produzione sito: `https://morenofunari.it`
- Produzione app: `https://app.morenofunari.it`

GitHub CLI non disponibile nell'ambiente (`gh: command not found`).

## Versioni verificate

Sito `moreno-funari-website`:

- `16aa39c aggiunta social`
- `477a82f feat: centralize ebook integration`
- `3488512 feat: integrate Un Passo Possibile AI`
- `07f0467 feat: improve site accessibility`
- `b14f5d0 feat: complete privacy and cookie setup`

App `un-passo-possibile`:

- `5ce4386 feat: centralize ebook integration`
- `5887fb0 tmp`
- `3b03432 fix: use explicit backend venv path in Mongo CI`
- `9ac016b fix: align Mongo CI virtualenv path`
- `568469b ci: run real MongoDB integration tests`

## Build

Sito:

- `npm ci`: passato
- `npm run lint`: passato
- `npm run build`: passato con rete abilitata per `next/font/google`
- `git diff --check`: passato

La build mantiene 19 route e tre articoli SSG.

App frontend:

- `npm run lint`: passato
- `npx tsc --noEmit --incremental false`: passato
- `npm test`: passato, 15 test Playwright
- `npm run build`: passato

## Route

Verificate localmente con status 200:

- `/`
- `/chi-sono`
- `/coaching`
- `/contatti`
- `/blog`
- `/blog/la-fiducia-arriva-dopo-il-primo-passo`
- `/blog/ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene`
- `/blog/dopo-un-errore-torna-all-azione-successiva`
- `/ebook`
- `/privacy-policy`
- `/cookie-policy`
- `/robots.txt`
- `/sitemap.xml`

Verifiche extra:

- pagina 404: status 404
- `/icon`: status 200, favicon PNG generato da App Router
- `/apple-icon`: status 200
- `/opengraph-image`: status 200
- `/twitter-image`: status 200
- PDF eBook: status 200, `application/pdf`, `X-Robots-Tag: noindex, follow`

## Navigazione

Controlli statici:

- nessun `href="#"`
- nessun `vercel.app`
- nessun `http://`
- nessun link social hardcoded fuori da `src/config/site.ts`

Controlli headless:

- header desktop renderizzato
- logo presente
- footer presente
- link legali presenti
- link interni principali presenti
- menu mobile testato con mouse, Enter, Space, Escape
- focus ripristinato sul pulsante menu dopo Escape

## Responsive

Viewport testati:

- 320 x 568
- 375 x 667
- 768 x 1024
- 1024 x 768
- 1440 x 900

Route campione testate: `/`, `/contatti`, `/blog`, `/ebook`, `/privacy-policy`, `/cookie-policy`.

Risultato:

- nessun overflow orizzontale rilevato
- footer ordinato
- link e pulsanti leggibili
- tabelle legali contenute nel layout
- cookie banner verificato su mobile quando configurazione analytics attiva

## Accessibilità

Controlli statici:

- nessun `outline: none` o `outline: 0`
- nessun `tabIndex` positivo
- nessun `aria-hidden="true"` con `tabIndex`

Controlli headless:

- skip link primo focus: `Salta al contenuto`
- menu mobile apribile con Enter e Space
- menu mobile chiudibile con Escape
- focus del menu spostato al primo link
- focus ripristinato al pulsante menu
- dialog preferenze cookie apribile e chiudibile con Escape
- link social con nome accessibile e `noopener noreferrer`

Lighthouse locale:

- Homepage: Accessibility 96
- Blog: Accessibility 96
- Articolo: Accessibility 100
- eBook: Accessibility 96
- Contatti: Accessibility 96

Non viene dichiarata certificazione WCAG; WCAG 2.2 AA resta riferimento tecnico.

## SEO

Verificato:

- title e description sulle route principali
- canonical coerenti con `https://morenofunari.it`
- Open Graph e Twitter Card presenti
- metadataBase coerente
- robots locali e produzione
- sitemap con tre articoli pubblicati
- pagine legali con `noindex, follow`
- PDF con `X-Robots-Tag: noindex, follow`
- JSON-LD homepage con `sameAs` Instagram
- JSON-LD articolo presente
- nessun URL non canonico rilevato

Produzione:

- `https://morenofunari.it`: 200
- `https://morenofunari.it/blog`: 200
- `https://morenofunari.it/ebook`: 200
- `https://morenofunari.it/privacy-policy`: 200
- `https://morenofunari.it/cookie-policy`: 200
- PDF: 200, `application/pdf`, `X-Robots-Tag: noindex, follow`

## Analytics e consenso

Configurazione locale:

- `.env.local`: `NEXT_PUBLIC_GA_ENABLED=true`
- Measurement ID valido: `G-11RJTDXWBS`

Verificato localmente:

- prima del consenso: nessuna richiesta Google Analytics/Tag Manager
- prima del consenso: nessun cookie `_ga`
- accettazione: caricamento `gtag/js`
- accettazione: richiesta `g/collect` page_view
- accettazione: cookie `_ga` e `_ga_11RJTDXWBS` presenti
- rifiuto iniziale: nessuna richiesta Google, nessun cookie, preferenza `denied` salvata
- preferenze: dialog apribile e chiudibile con Escape
- revoca: cookie analytics rimossi e preferenza `denied` salvata

Non sono stati aggiunti custom event.

## Privacy e cookie

Verificato:

- Privacy Policy raggiungibile e `noindex, follow`
- Cookie Policy raggiungibile e `noindex, follow`
- email contatto presente
- avviso dati sensibili presente nella pagina Contatti
- link Cookie Policy nel banner consenso
- preferenze cookie raggiungibili dal footer
- pagine legali escluse dalla sitemap
- nessun SDK social
- nessun iframe social
- nessun cookie Meta rilevato prima del clic sui social

## Un Passo Possibile AI

Dal sito:

- homepage, CTA `Prova la riflessione guidata`: `https://app.morenofunari.it/`
- homepage, card `Un Passo Possibile AI`: `https://app.morenofunari.it/`
- blog, risorsa app: `https://app.morenofunari.it/`
- footer: `https://app.morenofunari.it/`
- stessa scheda
- nessuna query string
- nessun dato personale trasferito

Dall'app:

- produzione `/`: 200
- produzione `/un-passo-possibile`: 200
- link ritorno sito: `https://morenofunari.it`
- CTA eBook landing: `https://morenofunari.it/ebook`
- nessun Google Drive
- nessun `dub.sh` per eBook
- test E2E app passati, incluso percorso CTA eBook risultato

## eBook

Verificato:

- pagina `/ebook`: 200
- copertina renderizzata
- CTA download con attributo `download`
- PDF locale: `/documents/un-passo-possibile-moreno-funari.pdf`
- nome file: `un-passo-possibile-moreno-funari.pdf`
- download dal dominio principale
- nessun Google Drive
- nessun `dub.sh`
- app punta alla pagina canonica `/ebook`
- focus e tastiera coperti dai controlli generali

## Social

Verificato:

- Instagram: `https://www.instagram.com/moreno.coach86/`
- Facebook: dato non configurato
- Threads: dato non configurato
- footer: link Instagram presente
- pagina Contatti: link Instagram presenti
- nuova scheda con `target="_blank"`
- `rel="noopener noreferrer"`
- JSON-LD `sameAs` include Instagram
- nessun SDK
- nessun iframe
- nessun embed
- nessun parametro UTM
- nessuna risorsa social caricata prima del clic

## Performance

Lighthouse locale su dev server:

| Pagina | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Homepage | 57 | 96 | 100 | 100 | 6.9 s | 0 |
| Blog | 64 | 96 | 100 | 100 | 5.6 s | 0 |
| Articolo | 94 | 100 | 100 | 100 | 1.7 s | 0 |
| eBook | 88 | 96 | 100 | 100 | 2.2 s | 0 |
| Contatti | 90 | 96 | 100 | 100 | 2.0 s | 0 |

Nota: i valori performance sono stati raccolti su dev server locale, non su build servita in produzione. Homepage e blog sono documentati come P2 da ricontrollare su ambiente production-like prima di ottimizzazioni.

## Problemi trovati

| Priorità | Area | Problema | Stato |
|---|---|---|---|
| P2 | Performance | Lighthouse locale dev segnala LCP alto su homepage e blog. | Documentato, da rivalutare su build/produzione. |
| P2 | Social | Facebook e Threads non sono configurati perché mancano URL ufficiali confermati. | Documentato, nessun placeholder inserito. |
| P2 | Backend app | QA backend/MongoDB non eseguito in questa issue. | Dipendenza esterna. |

Nessun P0 aperto.
Nessun P1 aperto.

## Dipendenze esterne

Le issue `#70`, `#71` e `#72` del repository `un-passo-possibile` sono indicate come ambito backend/MongoDB. GitHub CLI non è disponibile, quindi lo stato remoto non è stato verificato. Il QA backend non viene dichiarato completato.

## Verifiche manuali

- [x] Stato Git sito
- [x] Stato Git app
- [x] Build sito
- [x] Build app
- [x] Lint sito
- [x] Lint app
- [x] Type-check app
- [x] Test app
- [x] Route sito locali
- [x] Header produzione sito
- [x] Header produzione PDF
- [x] Header produzione app
- [x] Responsive 320 x 568
- [x] Responsive 375 x 667
- [x] Responsive 768 x 1024
- [x] Responsive 1024 x 768
- [x] Responsive 1440 x 900
- [x] Menu mobile tastiera
- [x] Cookie banner e preferenze
- [x] Analytics prima/dopo consenso
- [x] Revoca consenso
- [x] SEO metadata locali
- [x] Sitemap e robots
- [x] eBook
- [x] Social Instagram
- [x] Lighthouse locale
- [ ] Facebook
- [ ] Threads
- [ ] QA backend/MongoDB app
- [ ] Verifica manuale reale con screen reader

## Esito

GO con P2 documentati.
