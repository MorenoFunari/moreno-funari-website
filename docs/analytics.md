# Analytics

## Soluzione

```text
Google Analytics 4
Measurement ID: G-Z7E9BSCE4N
Consent Mode: Advanced v2
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
Consent Mode: Advanced v2
Conservazione dati a livello utente: 2 mesi
```

- [ ] Google Signals disattivato nella proprietà GA4
- [ ] Personalizzazione pubblicitaria disattivata nella proprietà GA4
- [ ] Conservazione dati a livello utente impostata a 2 mesi
- [ ] Eliminare la conversione basata sulla semplice visita a `/confronto`
- [ ] Usare `generate_lead` come conversione solo dopo un lead reale
- [ ] Dati condivisi con prodotti Google disattivati

## Caricamento

- Il bootstrap Google viene eseguito nell’HTML iniziale prima dell’hydration.
- Il default imposta i quattro segnali di consenso a `denied` prima di config/event.
- `gtag.js` viene caricato subito anche senza consenso; GA4 invia ping cookieless.
- L’accettazione aggiorna `analytics_storage` a `granted`; rifiuto e revoca lo mantengono a `denied`, senza disabilitare GA4 o ricaricare la pagina.
- I segnali pubblicitari restano `denied`: il banner raccoglie solo consenso Analytics.
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
| `cta_click_passo` | Click verso il form interno PASSO; non è un lead. |
| `passo_thank_you_view` | Visualizzazione di `/grazie-passo` dopo la conferma server-side di Brevo. |
| `passo_lead_created` | Lead PASSO attribuito alla thank-you page dopo creazione/aggiornamento del contatto e accettazione dell’email guida. |
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
- [ ] Dopo il rifiuto: Google tag attivo in denied, nessun cookie GA, ping cookieless
- [ ] Accettazione memorizzata
- [ ] `gtag.js` caricato anche prima dell’accettazione, con default denied
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


## Apertura landing Ads /ads/confronto

Il bootstrap invia `ads_conversion_apertura_confronto_ads_1` nell’HTML iniziale,
prima dell’hydration e senza dipendere da consenso, scroll o click. Include
`page_location` (URL effettivo, inclusi eventuali parametri Ads) e `page_title`
`CONFRONTO | Moreno Funari Mental Coach`. Un flag sul documento impedisce duplicati
tra bootstrap, hydration, remount React e aggiornamenti del consenso. Il fallback
React copre la navigazione client-side verso la landing. Un reload crea un nuovo
caricamento e quindi un nuovo evento. Le page view restano automatiche GA4.

Verifica locale:

```bash
NEXT_PUBLIC_GA_ENABLED=true npm run build
npm run start -- --port 3100
```

Aprire `/ads/confronto` in incognito, con Network aperto e nessun consenso.
Filtrare `g/collect` e controllare URL/query e payload (Google può usare POST):
`en=page_view` e `en=ads_conversion_apertura_confronto_ads_1`, `dl` contenente
`/ads/confronto`, titolo coerente e nessun cookie `_ga*` prima del consenso.
In produzione `dl` deve essere `https://morenofunari.it/ads/confronto` (eventuali
parametri campagna sono conservati). In locale usa l’origine localhost.
Rifiutare, poi aprire Preferenze cookie (la landing Ads non ha footer; in locale
si può usare `window.dispatchEvent(new Event("mf:analytics-preferences"))`), accettare: nessun reload e nessun secondo
invio dell’evento apertura. In console:

```js
window.dataLayer.filter(x => x[0] === "consent").map(x => Array.from(x))
window.dataLayer.filter(x => x[0] === "event" && x[1] === "ads_conversion_apertura_confronto_ads_1").length
```

L’ultimo update deve avere `analytics_storage: "granted"`; i tre segnali Ads
restano denied finché non esiste consenso pubblicitario esplicito. Ricaricare
per verificare la preferenza salvata e un solo evento nel nuovo documento.

Il test browser con il tag reale ha rilevato una regola esterna che genera
lo stesso evento dal page_view: due ping Network, a fronte di una sola chiamata
esplicita nel dataLayer. Prima del deploy rimuovere/disattivare quella regola
“Crea evento” in GA4/Google tag, mantenendo il key event e l’import Ads.
La deduplicazione React non può rimuovere la copia generata fuori dal repository. Controllare key event,
collegamento e import in Google Ads. Ping cookieless, eventi GA4 e conversioni
Ads attribuite non sono conteggi equivalenti: importazione, attribuzione,
modellazione, filtri e blocchi browser possono produrre differenze.
Il codice non modifica configurazioni GA4/Ads esterne né aggiunge tag AW.

Il banner e le sezioni tecniche delle informative descrivono il caricamento
del tag in denied e le misurazioni senza cookie. Il consenso raccolto resta
limitato ai cookie Analytics; i tre segnali pubblicitari restano denied.


## Click WhatsApp sulla landing Ads

Su `/ads/confronto`, `whatsapp_click_confronto` viene inviato a GA4 al click
anche senza consenso, attraverso il Google tag già inizializzato in denied.
Cookie Analytics soltanto dopo granted. Sulle altre pagine resta il gate
Analytics precedente. Meta Pixel e i suoi controlli non cambiano. Si tratta
di un click verso WhatsApp, non della conferma di un messaggio inviato.
