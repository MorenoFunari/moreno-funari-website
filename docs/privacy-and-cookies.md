# Privacy e cookie

## Perimetro

- Sito principale `https://morenofunari.it`.
- Contatti volontari via email.
- Hosting e log tecnici.
- Google Analytics 4: Consent Mode v2 denied prima della scelta; cookie solo dopo consenso. Stream di produzione G-Z7E9BSCE4N, verificato il 17/11/2026.
- localStorage per ricordare la scelta analytics.

## Inventario strumenti

| Nome | Tipo | Finalità | Attivazione |
| --- | --- | --- | --- |
| `mf_analytics_consent` | localStorage di prima parte | Ricordare accettazione o rifiuto di Analytics | Necessario |
| `_ga` | Cookie Google Analytics | Distinguere i visitatori | Dopo consenso |
| `_ga_*` | Cookie Google Analytics | Conservare lo stato della sessione | Dopo consenso |

## Fornitori

- Vercel: infrastruttura, hosting, distribuzione contenuti e sicurezza tecnica.
- Google Analytics: misurazione statistica dopo consenso.
- Gmail: casella email usata per ricevere le comunicazioni.

## Base giuridica

- Dati tecnici: legittimo interesse a rendere disponibile e proteggere il sito.
- Email: misure precontrattuali richieste dall’interessato e/o legittimo interesse a rispondere.
- Analytics: consenso.

## Verifiche manuali

- [ ] Privacy Policy aggiornata
- [ ] Cookie Policy aggiornata
- [ ] Pagine legali ancora noindex
- [ ] Pagine legali escluse dalla sitemap
- [x] Tag Google con i quattro segnali denied prima della scelta; nessun cookie analytics senza consenso
- [ ] Nessun cookie GA prima del consenso
- [ ] Rifiuto funzionante
- [ ] Accettazione funzionante
- [ ] Revoca funzionante
- [ ] Cookie GA eliminati dopo revoca
- [ ] Preferenze riapribili dal footer
- [ ] Scadenza preferenza pari a 6 mesi
- [ ] Google Signals disattivato
- [ ] Personalizzazione pubblicitaria disattivata
- [ ] Conservazione GA4 impostata a 2 mesi
- [ ] Dati condivisi con prodotti Google disattivati
- [ ] Verificare eventuali collegamenti Google Ads e mantenere la visita a
  `/confronto` esclusa dalle conversioni lead
- [ ] Produzione abilitata solo dopo deploy delle informative

## Nota di revisione

Le informative devono essere riesaminate se cambiano hosting, email provider, analytics, form, newsletter, pagamenti, campagne pubblicitarie, strumenti di prenotazione, area riservata, AI app, forma fiscale o dati del titolare.

Questa documentazione non dichiara conformità legale garantita.

## Allineamento 17 novembre 2026

Il vecchio ID G-11RJTDXWBS è presente nella proprietà storica 543556019, distinta dalla proprietà di produzione 556079158 / stream 15851473810, che usa G-Z7E9BSCE4N. Nessun ID modificato. La Cookie Policy descrive la famiglia _ga_* senza dedurre il suffisso dal Measurement ID. Meta Pixel è disattivato dal codice (marketingConsentGranted=false); analytics non lo abilita.

PASSO v2 usa lista guida #4 e aggiunge la Community #3 solo per una scelta marketing esplicita. Campi Brevo creati e verificati: PASSO_REQUEST (testo JSON), MARKETING_CONSENT (booleano), MARKETING_EVIDENCE (testo JSON). Segmento #1 “Email occasionali — consenso esplicito”: MARKETING_CONSENT=true. Usare esclusivamente questo segmento per future campagne PASSO, rispettando inoltre le blocklist Brevo. CONSENSO storico non viene interpretato o sovrascritto; casella vuota non revoca una preferenza preesistente. Nessuna sequenza promozionale attiva.
