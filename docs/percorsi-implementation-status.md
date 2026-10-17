# /percorsi — implementazione locale completata

Branch: `feat/percorsi-un-passo-possibile`. Preservato il commit `d48a6f2`.
Nessun push, merge o deploy autorizzato.

## Implementazione

- Pagina completa con copy approvato B, CTA C e FAQ D. Il riferimento fornito
  dall’utente è conservato in `tests/fixtures/percorsi-approved-copy.txt` e
  confrontato con i testi renderizzati. Nessun testo [DA CONFERMARE] pubblico.
- Prezzi centralizzati in `src/config/percorsi.ts`: 700 EUR lancio, 1100 EUR
  ordinario, cinque posti; importi finali senza maggiorazioni. Esaurendo i posti
  o disabilitando il lancio resta solo il prezzo ordinario. TODO fiscale aperto.
- Form commerciale dedicato con validazione, messaggi approvati e nessun redirect.
  Evento `submit_percorsi` solo dopo successo e consenso Analytics, senza PII.
- Endpoint `/api/percorsi-lead`: validazione server, same-origin, JSON, body
  limitato, honeypot, tempo minimo/scadenza, rate limiting e UUID idempotente.
  Gli errori email non producono falsi successi e consentono un nuovo tentativo.
- Solo notifica transazionale `/v3/smtp/email`, nessuna chiamata contacts,
  iscrizione, lista, template o automazione Pilot, nessuna email al richiedente.
- Metadata, canonical, Open Graph, Twitter, Service e BreadcrumbList; nessun
  Offer attivo. Preview/development noindex. Sitemap e voce footer aggiunte.
- Due sole risposte FAQ di `/coaching` allineate con link a `/percorsi`.
  Le stesse modifiche erano preparate sulla branch separata
  `fix/coaching-coerenza-percorsi`, lasciata invariata: non occorre unirla.
- Header/menu invariati: il link CONFRONTO globale preesistente rimane.
  Nessuna CTA del contenuto commerciale manda a CONFRONTO, PASSO o WhatsApp.
  Pagine e endpoint `/confronto` e `/passo` invariati.

## Verifiche

- `npm run lint`
- `npx tsc --noEmit` (nessuno script typecheck disponibile)
- `npm run build`
- Test Node: endpoint (25), prezzi (4), pagina/copy/SEO/FAQ (8), integrazione
  HTTP con provider simulato (1): 38 test superati.
- Browser locale: viewport mobile 390×844 e desktop 1440×900, nessun overflow
  orizzontale; CTA verso #richiesta; errore provider e nuovo invio riuscito con
  messaggio approvato, senza redirect. Nessun messaggio reale inviato.
- L’integrazione usa il server Next compilato e un preload solo test, non
  importato dall’app: `tests/helpers/percorsi-brevo-mock.mjs`. Controlla notifica
  singola, replay, rifiuto origine esterna/privacy mancante e assenza di Pilot.

Comando test unitari/pagina dopo la build:

```sh
node --test tests/percorsi-lead.test.mjs tests/percorsi-pricing.test.mjs tests/percorsi-page.test.mjs
```

Per il test HTTP avviare il server locale con il preload e credenziali fittizie,
`PERCORSI_TEST_MODE=true`, `PERCORSI_LEADS_ENABLED=true`,
`PERCORSI_TEST_BREVO_LOG` verso un file JSONL vuoto. Eseguire il test con lo
stesso percorso log e `PERCORSI_TEST_BASE_URL=http://localhost:3110`.
Non usare il preload in produzione.

## Blocchi prima di pubblicare

1. Confermare la dicitura fiscale: nessuna dicitura IVA inventata o pubblicata.
2. Confermare l’idoneità privacy. L’informativa attuale tratta i contatti
   email/PEC/WhatsApp/social nella sezione 4 e il Pilot nella sezione 5; il nuovo
   modulo commerciale con notifica Brevo non è descritto esplicitamente.
   La lettura del codice non costituisce conferma legale. Link esistente
   riutilizzato, testo privacy non modificato.
3. Collaudare la consegna reale con BREVO_API_KEY, BREVO_SENDER_EMAIL e
   destinatario verificato. Le credenziali non sono disponibili localmente:
   il successo simulato non dimostra ricezione in casella.
4. Mantenere `PERCORSI_LEADS_ENABLED=false` fino alle conferme e al collaudo.
   Destinatario: PERCORSI_NOTIFICATION_TO, altrimenti LEAD_NOTIFICATION_TO,
   altrimenti info@morenofunari.it. Non committare credenziali.

Rate limiting e deduplicazione sono in memoria per istanza: non garantiscono
coordinamento fra più istanze serverless. Valutare un archivio condiviso se
traffico o abusi lo richiedono. La disponibilità è configurata manualmente,
non esistono prenotazioni o decrementi automatici.
