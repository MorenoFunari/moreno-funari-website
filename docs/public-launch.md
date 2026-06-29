# Lancio pubblico

## Data

30 giugno 2026

## Esito

GO con P2.

## Versione

Commit del sito verificato:

```text
1fcad7b final qa
```

Branch verificata:

```text
main
```

GitHub CLI non disponibile nell'ambiente (`gh: command not found`).

## Domini

- `https://morenofunari.it`
- `https://www.morenofunari.it`
- `https://app.morenofunari.it`

## Build

- `npm ci`: passato
- `npm run lint`: passato
- `npm run build`: passato con rete abilitata per `next/font/google`
- `git diff --check`: passato

La build mantiene:

- 19 route
- tre articoli SSG
- pagina `/ebook`
- Privacy Policy
- Cookie Policy
- robots
- sitemap
- immagini Open Graph
- favicon App Router `/icon`
- apple icon

## Produzione

- `https://morenofunari.it`: 200
- `https://www.morenofunari.it`: 308 verso `https://morenofunari.it/`, poi 200
- `https://morenofunari.it/blog`: 200
- `https://morenofunari.it/ebook`: 200
- `https://morenofunari.it/contatti`: 200
- `https://morenofunari.it/privacy-policy`: 200
- `https://morenofunari.it/cookie-policy`: 200
- `https://app.morenofunari.it`: 200

HTTPS e certificati TLS:

- `morenofunari.it`: certificato valido
- `www.morenofunari.it`: certificato valido
- `app.morenofunari.it`: certificato valido

Non sono stati rilevati redirect ciclici o destinazioni finali Vercel.

## SEO

Verificato:

- robots pubblici `index, follow`
- pagine legali `noindex, follow`
- PDF con `X-Robots-Tag: noindex, follow`
- sitemap disponibile in `https://morenofunari.it/sitemap.xml`
- canonical coerenti con il dominio canonico
- metadata title e description
- Open Graph title, description e image
- Twitter Card
- assenza di `localhost` e URL Vercel nei metadata verificati

Robots:

```text
User-Agent: *
Allow: /

Sitemap: https://morenofunari.it/sitemap.xml
```

Sitemap include:

- homepage
- pagine pubbliche principali
- archivio Blog
- tre articoli pubblicati
- pagina eBook

Sitemap non include:

- Privacy Policy
- Cookie Policy
- PDF
- route tecniche
- URL Vercel
- sottodominio app

Search Console:

- stato reale non verificato automaticamente
- controllo manuale post-lancio richiesto per proprieta dominio, sitemap, homepage, Blog, eBook e almeno un articolo

## Analytics

Measurement ID verificato:

```text
G-11RJTDXWBS
```

Produzione:

- prima del consenso: nessuna richiesta `g/collect`
- prima del consenso: nessun cookie `_ga`
- banner visibile per nuovo utente
- dopo accettazione: caricato `gtag/js`
- dopo accettazione: richiesta `g/collect` presente
- dopo accettazione: cookie `_ga` e `_ga_11RJTDXWBS` presenti
- revoca: cookie analytics rimossi
- revoca: preferenza aggiornata a `denied`
- pannello Preferenze apribile

Non sono stati aggiunti eventi Analytics, tracking cross-domain o modifiche al Consent Mode.

## Integrazioni

### Un Passo Possibile AI

Dal sito:

- homepage, `Prova la riflessione guidata`: `https://app.morenofunari.it/`
- homepage, card `Un Passo Possibile AI`: `https://app.morenofunari.it/`
- Blog, risorsa AI: `https://app.morenofunari.it/`
- footer: `https://app.morenofunari.it/`

Comportamento verificato:

- stessa scheda
- nessuna query string
- nessun URL Vercel
- nessun dato personale trasferito

Dall'app:

- link ritorno sito: `https://morenofunari.it`
- CTA eBook landing: `https://morenofunari.it/ebook`
- nessun Google Drive
- nessun `dub.sh` per eBook

### eBook

- pagina `/ebook`: 200, `text/html`
- PDF: 200, `application/pdf`
- PDF: `X-Robots-Tag: noindex, follow`
- file: `un-passo-possibile-moreno-funari.pdf`
- download same-origin
- nessun Google Drive
- nessun `dub.sh`

### Instagram

- Instagram configurato: `https://www.instagram.com/moreno.coach86/`
- footer verificato
- pagina Contatti verificata
- nuova scheda
- `rel="noopener noreferrer"`
- JSON-LD `sameAs`
- nessun parametro UTM
- nessun SDK o embed

Facebook e Threads sono rinviati per mancanza di URL ufficiali confermati.

## Accessibilita e responsive

Controlli realmente eseguiti in produzione:

- 320 x 568
- 375 x 667
- 768 x 1024
- 1440 x 900

Pagine:

- `/`
- `/contatti`
- `/blog`
- `/ebook`
- `/cookie-policy`

Verificato:

- nessun overflow orizzontale
- nessun link vuoto
- nessun `href="#"`
- nessun link HTTP
- nessun URL Vercel
- skip link
- menu mobile con tastiera
- focus sul primo link del menu
- chiusura menu con Escape
- ripristino focus al pulsante menu
- footer
- link social
- CTA app
- CTA eBook

Non viene dichiarata certificazione WCAG.

## P2 aperti

- Performance: dal QA finale, Lighthouse su dev server locale segnala LCP alto su homepage e Blog. Da rivalutare su ambiente production-like prima di ottimizzare.
- Social: Facebook e Threads non configurati per mancanza di URL ufficiali confermati.
- Backend app/MongoDB: non incluso nel QA frontend del lancio.

Nessun P0 aperto.
Nessun P1 aperto.

## Dipendenze esterne

Issue app:

- `#70 — Backend Analytics Idempotency`
- `#71 — MongoDB Real Integration Test`
- `#72 — ambiente Mongo test tramite container in CI`

Stato non verificato tramite CLI.
Non incluso nel QA frontend del lancio.
La sola `#72`, se relativa a miglioramento CI, non blocca il lancio frontend.

## Rollback

Procedura:

1. individuare il commit precedente stabile;
2. usare il rollback Vercel verso il deployment precedente oppure eseguire revert;
3. verificare dominio e produzione;
4. controllare Analytics e CTA principali;
5. documentare l'incidente.

Nessun rollback eseguito durante il QA di lancio.
Nessuna modifica DNS eseguita.

## Checklist post-lancio

- [x] Homepage raggiungibile
- [x] Blog raggiungibile
- [x] Articoli raggiungibili
- [x] eBook raggiungibile
- [x] PDF scaricabile
- [x] App raggiungibile
- [x] Analytics dopo consenso
- [x] Revoca consenso
- [x] Sitemap disponibile
- [ ] Search Console controllata
- [x] Nessun errore console critico
- [x] Nessun P0
- [x] Nessun P1
