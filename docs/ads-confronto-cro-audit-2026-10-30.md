# CONFRONTO — variante CRO pronta per revisione

Stato: **non pubblicata**. Branch `cro/confronto-four-day-test`, base `228825f02db6e41bf65923936ef888f95625030b` (ultima produzione disponibile su origin/main al controllo). Working tree iniziale pulito; branch e commit precedenti preservati. Nessun push, PR, merge o deploy autorizzato da questo brief.

## Diagnosi: osservazioni e ipotesi

Il componente della route è `src/app/ads/confronto/page.tsx`, con CSS locale. Non contiene form, calendari o redirect intermedi proprietari. La CTA usa `TrackedWhatsAppButton`, apre `wa.me/393793408630?text=CONFRONTO` in una nuova scheda. Il passaggio a `api.whatsapp.com` appartiene a WhatsApp, non al funnel del sito.

| Elemento attuale | Riscontro | Intervento / ipotesi da testare |
| --- | --- | --- |
| Titolo «La giornata finisce, ma i pensieri restano lì?» | Descrive il rimuginio serale, ma non nomina una scelta o una difficoltà concreta | Titolo «Una scelta da fare, troppi pensieri per decidere?». Ipotesi di maggiore riconoscibilità, non risultato dimostrato |
| Significato di CONFRONTO nella hero | Nome presente solo nel pulsante; «fare un po’ di chiarezza» non spiega il primo contatto | Definizione immediata: un messaggio su una situazione concreta, poi valutazione reciproca |
| Messaggio WhatsApp | Una sola parola, CONFRONTO. Il primo passo della pagina chiede già di raccontare la situazione | Saluto e frase pronti, modificabili; si può iniziare anche solo salutando. Riduzione dello sforzo percepito da verificare |
| CTA dopo la lettura | Un solo pulsante, prima della sequenza operativa | Ripetizione della stessa azione in chiusura; nessun nuovo canale o form |
| Identità e fiducia | Foto autentica e nome già presenti; nessun dettaglio personale o collegamento biografico nella landing | Stessa foto, logo MF originale, ruolo di sviluppatore senior già pubblicato in `/chi-sono`, lettura personale e link di approfondimento. Nessuna nuova qualifica o testimonianza |
| Mobile | A 390×844, CTA originale termina a y=502; nessun overflow. Non è stato riscontrato un pulsante nascosto o rotto | Conservata la struttura compatta. Nessun rifacimento del banner e nessuna CTA fissa che lo sovrapponga |
| Percorso | Confronto di 30 minuti e successivo percorso già condizionati a valutazione reciproca | Condizioni mantenute. Nessuna leva di gratuità, prezzo, promessa, prenotazione automatica o ingresso nel Pilot |

Questi riscontri individuano opportunità, **non dimostrano la causa delle zero richieste**. CTR, assenza di lead e discrepanza Ads/GA4 non provano da soli un difetto tecnico della pagina. Il mese include più revisioni della landing: non rappresenta una singola variante stabile.

## Variante implementata

- Headline concreta, esempi di pressione lavorativa e dubbio sulle proprie capacità.
- Definizione di CONFRONTO visibile prima della CTA.
- CTA «Scrivi a Moreno su WhatsApp», stesso numero, stesso canale e apertura in nuova scheda.
- Messaggio: «Ciao Moreno, vorrei un CONFRONTO su una situazione che sto vivendo.» Nessuna informazione personale o UTM aggiunta al messaggio.
- Spiegazione del messaggio modificabile; rassicurazione su iscrizioni, obblighi e acquisti mantenuta.
- Identità personale verificabile nel copy già pubblico, foto originale immutata, asset MF originale senza elaborazioni.
- Sequenza di valutazione personale, eventuale confronto online di 30 minuti senza impegno, eventuale percorso concordato: invariata nella sostanza.
- Seconda CTA in fondo, stessa destinazione e stessa tassonomia eventi della prima.
- Collegamento alla Privacy Policy già esistente e avviso di evitare dati sanitari/sensibili. Nessun documento legale modificato.

File applicativi: soltanto `src/app/ads/confronto/page.tsx` e `page.module.css`. Nessuna modifica ad altre pagine, API, PASSO, CONFRONTO generale, consensi, banner, privacy, configurazione campagne o tracking condiviso. Nessuna modifica ai metadata/canonical/noindex.

## Tracking: cosa misura il codice

| Comportamento | Implementazione | Limite |
| --- | --- | --- |
| Visualizzazione pagina | Google tag `config` senza `send_page_view: false` | Il `page_view` automatico resta diagnostico, non prova una richiesta |
| Apertura landing | `ads_conversion_apertura_confronto_ads_1`, bootstrap HTML prima dell’hydration + fallback React con guardia documentale | Un evento per documento; non equivale a un utente unico o a un lead |
| Clic WhatsApp | `whatsapp_click_confronto`, dal componente condiviso; consent denied ammesso solo sulla route Ads, granted sulle altre route secondo codice esistente | Conta i clic, anche ripetuti. Non prova l’apertura dell’app o l’invio |
| Apertura/invio form | Non applicabile: nessun form sulla landing | Non creare contatori fittizi né usare gli eventi dei form di altre pagine |
| Richiesta ricevuta | Verifica manuale su WhatsApp | Un saluto inviato è distinto da un clic; distinguere nuova richiesta reale, contatto preesistente, spam e duplicati |

Consent Mode esistente preservato: tutti e quattro i segnali partono denied prima di config/eventi; script Google caricato senza aspettare la scelta. Accettazione aggiorna **analytics_storage** a granted; i tre segnali pubblicitari restano denied secondo la policy attuale. Non è stato trasformato il consenso analytics in consenso marketing.

L’evento click conserva `source=ads_confronto`, `page=/ads/confronto`, `funnel=pilot`: l’ultimo è un nome tecnico storico del componente condiviso, non un’iscrizione. Non cambiarlo in questo test evita una rottura della serie storica. Restano le chiamate Meta preesistenti, con il relativo loader e consenso invariati.

Nessun nuovo evento, listener o dato di messaggio in GA4. Entrambe le CTA emettono lo stesso evento una sola volta per singolo click; due pulsanti non generano due eventi per lo stesso click. Page location mantiene la query UTM/GCLID in ingresso; il link esterno non esporta la query né introduce una nuova conservazione in storage. L’attribuzione deterministica del singolo messaggio WhatsApp al singolo clic Ads non è implementata e non va dedotta.

## Verifiche eseguite

- `npm run lint`: PASS.
- `npx tsc --noEmit`: PASS (nessuno script typecheck nel package).
- `npm run build`: PASS, 48 route; build locale con GA e Meta disabilitati tramite ambiente, nessun file `.env` modificato.
- Verifica isolata del codice reale (`/private/tmp/cro-four-day-verify.cjs`): default denied prima dei tag; un solo config automatico per page_view; evento apertura singolo anche ripetendo bootstrap e fallback; route con/senza slash; URL con query preservato; un click produce un solo evento GA in denied e granted; proprietà inviate senza testo/nome/email; chiamate Meta originali; metadata identici e scope dei file rispettato. Nessuna richiesta esterna nei test.
- Preview build ottimizzata: foto caricata, due CTA identiche, zero form, nessun tag Google presente perché disabilitato localmente.
- Entrambe le CTA aperte dalla preview: destinatario Funari Moreno, numero 393793408630, nuovo messaggio corretto. Nessun messaggio inviato e nessun clic di test registrato su GA/Meta. URL di origine con UTM/GCLID rimasto invariato. Nessun errore console rilevato; link locali a biografia, Privacy e Cookie Policy: HTTP 200.
- Matrice viewport con il banner originale renderizzato staticamente, senza JS/tag: 320×667, 360×740, 375×667, 390×844, 1440×900. CTA primaria interamente sopra la card, nessun overflow. A 375×667: CTA termina a 458 px, card da 499 px; a 390×844: 494 px e 676 px.
- La preview statica del banner testa solo l’ingombro del componente/CSS originali: non simula la scelta o l’update del consenso. Il relativo codice non è stato modificato. Gli screenshot standard provengono invece dalla build interattiva senza Analytics.

Screenshot fuori dal repository:
- `/private/tmp/cro-four-day-before-desktop.jpg`
- `/private/tmp/cro-four-day-before-mobile.jpg`
- `/private/tmp/cro-four-day-after-desktop.jpg`
- `/private/tmp/cro-four-day-after-mobile.jpg`
- `/private/tmp/cro-four-day-after-mobile-banner.jpg`

Produzione letta via HTTP senza eseguire JavaScript: HTTP 200 e headline precedente ancora presente, variante assente.

## Questioni aperte e approvazione

La riconciliazione Ads/GA4 resta aperta. Non è stata verificata la configurazione live delle azioni conversione nell’account Ads; non è stata modificata. Prima del test controllare manualmente che page_view/apertura non siano trattati come risultati commerciali primari e mantenere la stessa configurazione durante il confronto, documentando eventuali problemi prima di partire.

Non sono disponibili report giornalieri, breakdown consenso/dispositivo, termini di ricerca, contatori WhatsApp né ricevute reali oltre ai dati aggregati forniti. Nessuna diagnosi causale su targeting, attribuzione o mancata consegna. Il link web WhatsApp è verificato; l’handoff all’app nativa su smartphone fisico richiede prova sul dispositivo, senza inviare messaggi. Nessun nuovo controllo Network di produzione per non contaminare i dati; dopo approvazione basteranno smoke test con traffico QA identificato/escluso e verifica HTTP del contenuto.

Il test **non è iniziato**. Chiedere solo l’autorizzazione a pubblicare la variante descritta, poi registrare commit, deploy e timestamp effettivi nel registro. Nessun intervento successivo automatico.
