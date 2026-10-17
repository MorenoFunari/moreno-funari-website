# /percorsi — stato locale dell'implementazione

La pagina non è ancora implementata: il documento del Marketing Engine con
B.1–B.11, FAQ D, CTA C, sezione G e appendice H non è accessibile nel messaggio
ricevuto né nei file sorgente forniti. Non inventare o ricostruire quei testi.

## Preparato sulla branch feat/percorsi-un-passo-possibile

- Endpoint `/api/percorsi-lead`: valida nome/email/situazione, telefono
  facoltativo, consenso e i marcatori `percorso_pagamento` e `/percorsi`.
- Protezioni: same-origin, JSON, limite dimensione body, honeypot, tempo minimo,
  scadenza form, rate limiting e deduplicazione richieste tramite UUID.
- Solo notifica email a Moreno tramite `/v3/smtp/email`; nessuna chiamata a
  `/v3/contacts`, nessuna lista, template o sequenza, nessuna email al richiedente.
- Errori provider/timeout non vengono dichiarati come invio riuscito. È possibile
  riprovare un invio fallito; un replay già riuscito non manda una seconda email.
- `PERCORSI_LEADS_ENABLED` deve restare false prima delle conferme necessarie.
- Destinatario: PERCORSI_NOTIFICATION_TO, altrimenti LEAD_NOTIFICATION_TO,
  altrimenti info@morenofunari.it. Mittente verificato BREVO_SENDER_EMAIL.
- Componente form dedicato, non montato su nessuna pagina; riusa soltanto il CSS
  del form esistente e richiede il placeholder approvato da chi lo integra.
- Evento distinto `submit_percorsi` soltanto dopo invio riuscito e consenso
  Analytics, senza dati personali e senza alterare gli eventi CONFRONTO.
- Config unica: lancio 700 EUR, ordinario 1100 EUR, cinque posti. Esaurendo i
  posti o disabilitando il lancio, `getPercorsiPrice()` restituisce 1100.
- Importi finali confermati, senza maggiorazioni né calcoli IVA. Sezione
  commerciale pronta nel componente PercorsiPricingSection; da integrare nella
  pagina quando sarà disponibile il copy completo.
- TODO fiscali/privacy espliciti; `showOfferSchema` resta false.

## Verifica

`node --test tests/percorsi-lead.test.mjs` usa fetch simulato e verifica che ogni
chiamata esterna vada solo all'endpoint email transazionale. Non invia messaggi.
Il limite ai tentativi e la deduplicazione sono in memoria per singola istanza:
non garantiscono rate limiting/deduplicazione tra istanze serverless diverse.
Valutare un archivio condiviso se il traffico o gli abusi lo richiedono.

## Prima di completare e prima del go-live

1. Ricevere il copy approvato completo. Solo dopo costruire /percorsi, metadata,
   schema, sitemap e footer, evitando link verso una route ancora inesistente.
2. Il task B è preparato separatamente su `fix/coaching-coerenza-percorsi`.
   Non unirlo finché la route /percorsi non è completa e pubblicabile, per
   evitare collegamenti verso una pagina inesistente.
3. Confermare la dicitura fiscale e la copertura dell'informativa privacy.
   La sezione 4 tratta i contatti email/PEC/WhatsApp/social; la sezione 5 descrive
   specificamente il Pilot. Il nuovo modulo commerciale con notifica Brevo non
   è descritto esplicitamente. Nessuna conferma di idoneità legale viene assunta.
4. Fornire le credenziali nell'ambiente di test: BREVO_API_KEY,
   BREVO_SENDER_EMAIL ed eventualmente PERCORSI_NOTIFICATION_TO. Non committarle.
   Nessuna di queste è disponibile localmente al momento della preparazione.
5. Effettuare test end-to-end del form con dati sintetici, verificare accettazione
   Brevo e ricezione effettiva della notifica, oltre all'assenza di iscrizioni
   Pilot. Un test simulato non dimostra la consegna in casella.
6. Ricontrollare copy, headings, prezzi, metadata/schema, mobile e accessibilità
   della pagina una volta disponibile. Nessun merge, push o deploy autorizzato.
