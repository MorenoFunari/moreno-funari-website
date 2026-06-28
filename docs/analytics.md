# Analytics

## Soluzione

```text
Google Analytics 4
Measurement ID: G-11RJTDXWBS
Consent Mode: Basic
```

## Caricamento

- Nessun tag Google viene caricato prima del consenso.
- GA4 viene caricato soltanto dopo accettazione.
- Nessun dato viene inviato in caso di rifiuto.
- Google Tag Manager non viene usato.
- Google Ads non viene usato.
- Non sono implementati custom event.

## Configurazione

```text
NEXT_PUBLIC_GA_ENABLED
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

In produzione `NEXT_PUBLIC_GA_ENABLED` deve restare `false` fino al completamento della Issue #19.

## Preferenza

- La scelta analytics viene ricordata in localStorage con chiave `mf_analytics_consent`.
- Lo stato salvato puo essere `granted` o `denied`.
- La preferenza include un timestamp ISO.
- La preferenza scade dopo sei mesi di calendario.
- La scelta puo essere modificata dal footer tramite `Preferenze cookie`.
- localStorage viene usato esclusivamente per ricordare la scelta analytics.

## Page view

- Le page view sono gestite automaticamente da GA4.
- La Misurazione avanzata gestisce le modifiche della cronologia del browser.
- Non viene inviato alcun `page_view` manuale dal codice.

## Privacy

- `allow_google_signals: false`.
- `allow_ad_personalization_signals: false`.
- Nessun `user_id`.
- Nessun dato proveniente dai form.
- GA4 resta disabilitato in produzione fino al completamento della Issue #19.

Questa documentazione descrive l'implementazione tecnica e non dichiara conformita legale garantita.

## Verifiche manuali

- [ ] Nessuna richiesta Google prima della scelta
- [ ] Nessun cookie `_ga` prima della scelta
- [ ] Rifiuto memorizzato
- [ ] Nessun tag dopo il rifiuto
- [ ] Accettazione memorizzata
- [ ] `gtag.js` caricato dopo l'accettazione
- [ ] Richiesta `g/collect` visibile dopo l'accettazione
- [ ] Visita visibile in Tempo reale
- [ ] Navigazioni client-side rilevate una sola volta
- [ ] Revoca del consenso funzionante
- [ ] Cookie GA eliminati dopo la revoca
- [ ] Produzione ancora disabilitata fino alla Issue #19
