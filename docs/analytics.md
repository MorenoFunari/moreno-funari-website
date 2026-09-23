# Analytics

## Soluzione

```text
Google Analytics 4
Measurement ID: G-11RJTDXWBS
Consent Mode: Basic
```

## Stato richiesto della proprietà GA4

```text
Measurement ID: G-11RJTDXWBS
Google Signals: disattivato
Personalizzazione pubblicitaria: disattivata
Collegamento Google Ads: assente
User ID: non utilizzato
Custom events: assenti
Page view manuali: assenti
Consent Mode: Basic
Conservazione dati a livello utente: 2 mesi
```

- [ ] Google Signals disattivato nella proprietà GA4
- [ ] Personalizzazione pubblicitaria disattivata nella proprietà GA4
- [ ] Conservazione dati a livello utente impostata a 2 mesi
- [ ] Nessun collegamento Google Ads
- [ ] Dati condivisi con prodotti Google disattivati

## Caricamento

- Nessun tag Google viene caricato prima del consenso.
- GA4 viene caricato soltanto dopo accettazione.
- Nessun dato viene inviato in caso di rifiuto.
- Google Tag Manager non viene usato.
- Google Ads non viene usato.
- Meta Pixel è predisposto ma resta disabilitato finché `NEXT_PUBLIC_META_PIXEL_ENABLED` non viene impostato a `true`.
- Meta Pixel viene comunque caricato soltanto dopo consenso, mai prima.
- Il blocco `noscript` di Meta Pixel non viene usato perché non sarebbe compatibile con il gate di consenso.

## Configurazione

```text
NEXT_PUBLIC_GA_ENABLED
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_META_PIXEL_ENABLED
NEXT_PUBLIC_META_PIXEL_ID
```

In produzione `NEXT_PUBLIC_GA_ENABLED` deve essere attivato solo dopo il deploy delle informative aggiornate.

Per attivare Meta Pixel su Vercel:

1. aprire il progetto su Vercel;
2. andare in `Settings` → `Environment Variables`;
3. aggiungere `NEXT_PUBLIC_META_PIXEL_ID` con valore `1111563994630198`;
4. aggiungere `NEXT_PUBLIC_META_PIXEL_ENABLED` con valore `true` solo quando consenso, Privacy Policy e Cookie Policy sono allineati;
5. rieseguire un deploy.

Se `NEXT_PUBLIC_META_PIXEL_ENABLED` resta `false` o assente, il Pixel non viene caricato anche se il Pixel ID è presente.

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

## Meta Pixel

- Pixel ID letto da `NEXT_PUBLIC_META_PIXEL_ID`.
- Attivazione controllata da `NEXT_PUBLIC_META_PIXEL_ENABLED`.
- `PageView` inviato globalmente una sola volta per URL dopo consenso.
- `/percorso-pilota` invia anche `ViewPilotPage`.
- I link WhatsApp tracciati inviano `ClickWhatsApp`.
- L'helper `trackLeadConfronto()` è pronto per azioni future legate a `CONFRONTO`.

## Privacy

- `allow_google_signals: false`.
- `allow_ad_personalization_signals: false`.
- Nessun `user_id`.
- Nessun dato proveniente dai form.
- GA4 resta disabilitato in produzione fino al completamento della Issue #19.
- Meta Pixel deve restare disabilitato finché non viene validata la base privacy/cookie per finalità marketing.

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
- [ ] Meta Pixel non caricato quando `NEXT_PUBLIC_META_PIXEL_ENABLED=false`
- [ ] Meta Pixel non caricato prima del consenso quando abilitato
- [ ] `PageView` Meta inviato una sola volta per URL dopo consenso quando abilitato
- [ ] `ViewPilotPage` inviato su `/percorso-pilota` quando abilitato
- [ ] `ClickWhatsApp` inviato dai CTA WhatsApp quando abilitato
