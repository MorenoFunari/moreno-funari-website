# Analytics

## Soluzione

```text
Google Analytics 4
Measurement ID: G-Z7E9BSCE4N
Consent Mode: Basic
```

## Stato richiesto della proprietà GA4

```text
Measurement ID: G-Z7E9BSCE4N
Google Signals: disattivato
Personalizzazione pubblicitaria: disattivata
Collegamento Google Ads: da verificare e gestire nel pannello GA4/Google Ads
User ID: non utilizzato
Custom events: presenti, elencati in questo documento
Page view manuali: assenti
Consent Mode: Basic
Conservazione dati a livello utente: 2 mesi
```

- [ ] Google Signals disattivato nella proprietà GA4
- [ ] Personalizzazione pubblicitaria disattivata nella proprietà GA4
- [ ] Conservazione dati a livello utente impostata a 2 mesi
- [ ] Eliminare la conversione basata sulla semplice visita a `/confronto`
- [ ] Usare `generate_lead` come conversione solo dopo un lead reale
- [ ] Dati condivisi con prodotti Google disattivati

## Caricamento

- Nessun tag Google viene caricato prima del consenso.
- GA4 viene caricato soltanto dopo accettazione.
- Nessun dato viene inviato in caso di rifiuto.
- Google Tag Manager non viene usato.
- Il repository non carica direttamente un tag `AW-*`, ma conversioni e key
  event possono essere configurati fuori dal codice nella proprietà GA4 o nel
  Google tag. Devono essere verificati dopo ogni modifica al funnel.
- Meta Pixel è predisposto ma resta disabilitato finché `NEXT_PUBLIC_META_PIXEL_ENABLED` non viene impostato a `true`.
- Il consenso raccolto dal banner attuale riguarda esclusivamente gli
  analytics: non concede finalità marketing o pubblicitarie.
- Meta Pixel resta quindi disattivato anche se configurato, finché non verrà
  introdotta una scelta marketing separata ed esplicita.
- Finché non viene richiesto un consenso marketing, è atteso che la diagnostica
  Google possa indicare un tasso di consenso ads dello 0%: `ad_storage`,
  `ad_user_data` e `ad_personalization` restano intenzionalmente `denied`.
- Il blocco `noscript` di Meta Pixel non viene usato perché non sarebbe compatibile con il gate di consenso.

## Configurazione

```text
NEXT_PUBLIC_GA_ENABLED
NEXT_PUBLIC_META_PIXEL_ENABLED
NEXT_PUBLIC_META_PIXEL_ID
```

In produzione `NEXT_PUBLIC_GA_ENABLED` deve essere attivato solo dopo il deploy delle informative aggiornate.

Configurazione predisposta per una futura attivazione di Meta Pixel:

1. aprire il progetto su Vercel;
2. andare in `Settings` → `Environment Variables`;
3. aggiungere `NEXT_PUBLIC_META_PIXEL_ID` con valore `1111563994630198`;
4. aggiungere `NEXT_PUBLIC_META_PIXEL_ENABLED` con valore `true` solo quando
   esiste anche una scelta marketing separata e consenso, Privacy Policy e
   Cookie Policy sono allineati;
5. rieseguire un deploy.

Il Pixel non viene caricato con il solo consenso analytics, anche se ID e flag
sono configurati.

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
- Una visita a `/confronto` non deve essere considerata un lead o una
  conversione. Qualsiasi regola remota che trasformi quella page view in
  `ads_conversion_Invio_modulo_per_i_lead_1` deve essere rimossa in GA4.

## Eventi lead e CTA

| Evento | Significato |
| --- | --- |
| `cta_click_passo` | Click verso il form Brevo PASSO; non è un lead. |
| `passo_thank_you_view` | Visualizzazione di `/grazie-passo` dopo il redirect configurato in Brevo. |
| `passo_lead_created` | Lead PASSO attribuito alla thank-you page Brevo. |
| `confronto_form_submit_attempt` | Tentativo di invio del form CONFRONTO, valido o non valido. |
| `confronto_lead_created` | Il backend ha ricevuto conferma della creazione/aggiornamento del contatto Brevo. |
| `confronto_notification_sent` | Brevo ha accettato la notifica email destinata a Moreno. |
| `confronto_notification_failed` | Il lead è stato creato, ma la notifica email non è stata accettata o è fallita. |
| `generate_lead` | Evento standard inviato solo dopo lead CONFRONTO reale o sulla thank-you page PASSO. |
| `whatsapp_click_confronto` | Click su un CTA WhatsApp del funnel CONFRONTO. |

Gli eventi vengono inviati a GA4 solo dopo consenso. Il redirect successivo al
submit CONFRONTO attende il callback di `generate_lead`, con timeout massimo di
800 ms per non appesantire l'esperienza.

## Meta Pixel

- Pixel ID letto da `NEXT_PUBLIC_META_PIXEL_ID`.
- Attivazione controllata da `NEXT_PUBLIC_META_PIXEL_ENABLED`.
- `PageView` inviato globalmente una sola volta per URL dopo consenso.
- `/confronto` invia anche `ViewConfrontoPage` al Meta Pixel.
- I link WhatsApp tracciati inviano `ClickWhatsApp`.
- Il submit CONFRONTO riuscito invia `LeadConfrontoSubmitted`.

## Privacy

- `allow_google_signals: false`.
- `allow_ad_personalization_signals: false`.
- Nessun `user_id`.
- Gli eventi analytics non contengono nome, email, telefono o testo libero dei
  form; usano solo pagina, sorgente e nome del funnel.
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
- [ ] `ViewConfrontoPage` inviato su `/confronto` quando abilitato
- [ ] `ClickWhatsApp` inviato dai CTA WhatsApp quando abilitato
- [ ] `confronto_form_submit_attempt` visibile in DebugView al tentativo
- [ ] `confronto_lead_created` e `generate_lead` visibili dopo risposta API positiva
- [ ] Evento notifica `sent` o `failed` coerente con la risposta API
- [ ] `passo_thank_you_view`, `passo_lead_created` e `generate_lead` visibili dopo redirect Brevo
