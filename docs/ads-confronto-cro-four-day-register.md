# CONFRONTO — baseline e registro del test esplorativo di quattro giorni

## Baseline disponibile (fonte: brief Moreno, 1–30 ottobre 2026)

| Metrica | Valore | Perimetro e uso |
| --- | ---: | --- |
| Spesa Ads | 55,62 € | SEARCH - CONFRONTO - Solo Ricerca |
| Clic Ads | 72 | Click pubblicitari, non sessioni né persone |
| Impressioni | 796 | Stessa campagna |
| CTR | 9,05% | Dato fornito |
| CPC medio | 0,77 € | Dato fornito |
| Visualizzazioni landing | 42 | Tutti i page_view della route, non tutti necessariamente Ads |
| Utenti attivi landing | 24 | Non usare come sessioni |
| Sessioni confronto_search | 13 | Verificare il filtro landing e la dimensione campagna della fonte; non presumere che tutte siano atterrate qui |
| Sessioni google / cpc | 42 | Intero sito e altre campagne: **non è il denominatore della landing** |
| Eventi apertura landing | ND | Non forniti |
| Clic WhatsApp landing/campagna | ND | Non forniti |
| Richieste CONFRONTO reali | 0 | Dichiarate da Moreno; attribuzione individuale non verificata |
| Clic WhatsApp / sessioni landing | ND | Numeratore e denominatore confrontabili mancanti |
| Richieste reali / sessioni landing | ND | Non calcolare 0/13 finché il perimetro delle sessioni non è validato |

La differenza 72 clic / 42 visualizzazioni / 13 sessioni attribuite non è un tasso di abbandono dimostrato. Sono unità e perimetri diversi. Il mese comprende varianti diverse della landing. Prima del lancio esportare i quattro giorni immediatamente precedenti (stesse ore e timezone) con i filtri sotto: se non disponibili mantenere ND e usare il mese solo come contesto. Segnalare anche il diverso mix di giorni della settimana.

## Avvio e controlli da congelare

- Stato: in attesa di approvazione, nessun deploy effettuato.
- URL: https://morenofunari.it/ads/confronto
- Branch variante: cro/confronto-four-day-test
- Commit variante / deploy ID / timestamp T0 Europe/Rome: da compilare dopo pubblicazione verificata.
- Fine: T0 + 96 ore. Nessuna data fissa prima dell’autorizzazione.
- Registrare snapshot di campagna, budget, keyword, targeting, annunci e orari. Non modificarli durante il test; registrare scostamenti inevitabili e downtime. Nessuna modifica automatica della landing.

## Raccolta giornaliera manuale, ripetibile

Una riga per blocco di 24 ore [T0, T0+24h), ecc. Annotare l’ora dell’estrazione. Se i report non consentono filtri orari affidabili, usare quattro giornate complete dopo il deploy ed escludere esplicitamente il giorno parziale. Non mischiare finestre diverse. Verificare timezone account Ads e proprietà GA4, annotare differenze. Rileggere i dati dopo 48–72 ore per possibili ritardi, conservando sia prima estrazione sia revisione; non sovrascrivere senza nota.

1. Ads: campagna esatta SEARCH - CONFRONTO - Solo Ricerca, spesa e clic nello stesso intervallo. Non cambiare l’account.
2. GA4: dimensioni di **sessione** (session campaign, session source/medium), filtro pagina di destinazione `/ads/confronto` con/senza slash, ignorando la query per raggruppare. Denominatore principale: sessioni atterrate sulla landing dalla stessa campagna e `google / cpc`. Controllare che `confronto_search` corrisponda alla campagna Ads richiesta; non rinominare UTM o creare alias senza evidenza. Registrare separatamente campagna non valorizzata, altri nomi e altri canali.
3. Per lo stesso segmento/sessione: contare `page_view`, `ads_conversion_apertura_confronto_ads_1`, `whatsapp_click_confronto` (con `page=/ads/confronto` e `source=ads_confronto`). Riportare anche i totali route per controllare discrepanze, senza sommarli al segmento principale. Un evento apertura non è una conversione commerciale.
4. WhatsApp: Moreno conta manualmente nuove conversazioni CONFRONTO realmente ricevute, esclude QA, spam, contatti precedenti e messaggi ripetuti della stessa richiesta. In questo documento solo conteggi aggregati, nessun nome, numero o contenuto privato.
5. Distinguere richieste attribuibili agli Ads con evidenza (es. fonte dichiarata dalla persona) da richieste di origine sconosciuta. La parola CONFRONTO da sola non dimostra la provenienza Ads. Chiedere la fonte solo in modo naturale, non come condizione per ricevere ascolto.
6. Aprire/inviare form: N/A sulla landing. Non usare lead di `/confronto`, `/passo` o altre pagine come conversioni di questa variante.

`—` = non ancora rilevato; `ND` = dato non disponibile; `0` solo dopo verifica della fonte.

| Giorno / intervallo | Spesa € | Clic Ads | Sessioni landing/campagna S | View segmento | Eventi apertura | Clic WhatsApp C | Richieste Ads confermate R | Richieste fonte ignota | C/S | R/S | Estrazione / anomalie |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline -4 | — | — | — | — | — | — | — | — | — | — | — |
| Baseline -3 | — | — | — | — | — | — | — | — | — | — | — |
| Baseline -2 | — | — | — | — | — | — | — | — | — | — | — |
| Baseline -1 | — | — | — | — | — | — | — | — | — | — | — |
| Test 1 | — | — | — | — | — | — | — | — | — | — | — |
| Test 2 | — | — | — | — | — | — | — | — | — | — | — |
| Test 3 | — | — | — | — | — | — | — | — | — | — | — |
| Test 4 | — | — | — | — | — | — | — | — | — | — | — |
| Totale baseline | — | — | — | — | — | — | — | — | — | — | — |
| Totale test | — | — | — | — | — | — | — | — | — | — | — |

Controllo parallelo: annotare per ciascun giorno sessioni e view totali della route, sessioni `google/cpc` senza campagna riconciliata, altre campagne e richieste totali ricevute. Non riallocare automaticamente gli sconosciuti a confronto_search.

Formule: `100 × C / S` e `100 × R / S`; S=0 o ND → ND. Calcolare i totali come rapporto delle somme, non media delle percentuali giornaliere. C conta eventi, quindi può includere clic ripetuti e perfino superare il 100%: non chiamarlo percentuale di persone convertite. Per una lettura più vicina alle persone, affiancare sessioni con almeno un click / S se GA4 rende disponibile lo stesso segmento.

R/S è interpretabile come tasso solo con attribuzione e coorte coerenti. Se non si può collegare R alla coorte delle sessioni, mostrarlo come rapporto operativo indicativo (con limite esplicito) oppure ND; mostrare sempre il conteggio delle richieste e della fonte ignota. Annotare richieste arrivate dopo la finestra; non attribuirle arbitrariamente al giorno della ricezione o a quello del clic.

## Decisione dopo quattro giorni

- **Mantenere provvisoriamente** se nessuna regressione e arrivano richieste pertinenti o segnali coerenti tra più giorni; anche una prima richiesta è un segnale utile, non prova causale. Confrontare costi, perimetro e qualità manuale.
- **Modificare dopo revisione** se i dati suggeriscono un punto specifico: visite ma nessun clic → riesaminare chiarezza/pertinenza; clic ma nessuna richiesta → verificare handoff mobile, messaggio e risposte effettive. Sono ipotesi, non diagnosi automatiche. Una variabile alla volta nel test successivo.
- **Ripristinare** subito solo in caso di guasto dimostrato (link errato, CTA coperta, perdita tracking/consensi, errori della pagina). Ripristino attraverso commit inverso dei soli file della variante, mai reset o force push; previa autorizzazione salvo interventi critici già autorizzati.
- **Esito inconclusivo / prolungare con approvazione** se il traffico è troppo scarso, il perimetro non è riconciliato o le differenze dipendono da uno o due casi. Zero richieste in quattro giorni non dimostra che la variante sia peggiore; un incremento di click senza richieste non dimostra successo commerciale.

Non è un A/B test randomizzato. Nessuna significatività statistica o miglioramento causale dichiarato: è un confronto esplorativo prima/dopo di un insieme di modifiche. Nessuna ottimizzazione o pubblicazione automatica al termine.
