# Strategia SEO e contenuti

## Obiettivo

Questo documento definisce il primo audit strategico SEO e la nuova architettura contenutistica del sito "Moreno Funari | Mental Coach".

La direzione proposta e':

```text
Google -> Articolo / Landing -> Fiducia -> Social derivati -> Un Passo Possibile AI -> Contatto
```

Non:

```text
Social -> Articolo
```

Il sito deve diventare un asset organico evergreen. Ogni nuovo contenuto futuro dovrebbe partire da una query reale, da un intento verificabile e da un bisogno concreto del lettore. I volumi di ricerca non sono inclusi in questo documento: andranno validati con strumenti esterni, Google Search Console quando disponibile, o analisi SERP qualitative aggiornate.

Stato iniziale rilevato:

- Ramo: `main`
- Ultimi commit: `a4d2e6b add articles`, `ccb99aa docs: document public website launch`, `1fcad7b final qa`, `16aa39c aggiunta social`, `477a82f feat: centralize ebook integration`
- Working tree iniziale: pulito
- Next.js App Router: route pubbliche da `src/app`, contenuti blog da `content/blog`, sitemap dinamica da `src/app/sitemap.ts`

## Stato attuale del sito

Il sito e' già coerente come casa del brand: tono umano, prudente, non aggressivo, con confini professionali chiari. La struttura attuale copre bene il posizionamento generale, ma non presidia ancora in modo sistematico le query informative e commerciali leggere legate a stress, overthinking, fiducia, blocco, lavoro, sport e mental coaching.

Punti forti:

- Navigazione semplice: `/`, `/chi-sono`, `/blog`, `/ebook`, `/coaching`, `/contatti`.
- Blog MDX validato e generato staticamente.
- Metadata e JSON-LD già presenti per pagine core e articoli.
- Sitemap include pagine pubbliche e articoli pubblicati.
- Confini tra coaching, psicoterapia e supporto sanitario già esplicitati.
- eBook e Un Passo Possibile AI sono già risorse trasversali.

Gap principali:

- Mancano landing verticali per intercettare query specifiche.
- `/coaching` e' oggi pagina generale, non ancora hub verso sotto-temi.
- I cluster editoriali sono appena iniziati: cinque articoli non bastano a costruire topical authority.
- Alcuni articoli nascono come riflessioni vicine al contenuto social; solo gli ultimi due sono piu' vicini a contenuti SEO evergreen.
- Internal linking ancora limitato: ogni articolo linka a risorse generali, ma non esistono pagine pilastro verticali.

Le pagine legali `/privacy-policy` e `/cookie-policy`, insieme a `/robots.txt` e `/sitemap.xml`, sono pagine tecniche. Non vanno trattate come asset strategici di contenuto. Le pagine legali sono correttamente pensate come noindex.

## Pagine attuali

| URL | Funzione | Intento principale | Target | Tema coperto | CTA | Link interni principali | Stato SEO indicativo | Ruolo futuro |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Home e snodo iniziale | Capire chi e' Moreno e da dove iniziare | Persone bloccate, sotto pressione o autocritiche | Blocco, pressione, fiducia, primo passo | Blog, AI, coaching, contatti | `/blog`, app esterna, `/coaching`, `/ebook`, `/chi-sono`, `/contatti` | Buono come brand page, debole per query verticali | Hub narrativo e filtro verso percorsi |
| `/chi-sono` | Profilo professionale e personale | Valutare credibilita' e approccio | Utenti che cercano fiducia prima del contatto | Esperienza, sport, lavoro, principi, confini | Coaching, contatti | `/coaching`, `/contatti`, `/blog` | Buono per E-E-A-T e fiducia, poco orientato a query non branded | Pagina credibilita' collegata da landing e articoli sensibili |
| `/coaching` | Pagina servizio generale | Capire cosa offre il percorso | Persone che valutano un confronto | Mental coaching, processo, confini, FAQ | Contatti | `/contatti`, `/chi-sono` | Buono come pagina generale, manca profondita' per intenti specifici | Nodo centrale verso landing verticali |
| `/contatti` | Conversione leggera | Scrivere senza impegno | Utenti già caldi o con dubbio pratico | Primo contatto, temi trattabili, confini | Email, Instagram | Privacy policy | Buono come CTA finale, non deve diventare pagina commerciale aggressiva | Punto finale della fiducia, non pagina SEO primaria |
| `/blog` | Archivio editoriale | Leggere riflessioni e risorse | Utenti informativi | Fiducia, pressione, errore, sport, vita reale | Articoli, eBook, AI, coaching | Articoli, `/ebook`, app esterna, `/coaching` | Buono come archivio, senza filtri o cluster visibili | Archivio editoriale, non hub principale di vendita |
| `/ebook` | Risorsa gratuita | Scaricare e usare "Un passo possibile" | Persone bloccate o confuse | Blocco, fiducia, dialogo interno, passo concreto | Download PDF, AI, coaching | PDF, app esterna, `/coaching`, `/chi-sono` | Buono come risorsa trasversale, query specifiche ancora deboli | Lead magnet leggero e supporto ai cluster |
| `/blog/[slug]` | Articoli editoriali | Rispondere a bisogni informativi specifici | Utenti da Google e lettori ricorrenti | Varia per articolo | eBook, coaching, contatti | `/blog`, `/coaching`, `/contatti`, talvolta `/ebook` e articoli correlati | Variabile: migliore sugli ultimi due articoli SEO oriented | Entry point organico verso pilastri, eBook, AI e contatto |

## Articoli attuali

Sono presenti cinque articoli pubblicati e una bozza locale d'esempio (`bozza-esempio-mdx`) esclusa dalla strategia perché `draft: true`.

| Titolo | Slug | Categoria | Data | Intento | Query probabile | Tema | Cluster | Pagina pilastro futura | Correlati | Gap interni | Origine SEO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| La fiducia non arriva sempre prima: a volte cresce dopo il primo passo | `la-fiducia-arriva-dopo-il-primo-passo` | Fiducia e azione | 2026-06-28 | Aiutare chi aspetta sicurezza prima di agire | "come avere fiducia in se stessi", "non mi sento pronto", "fare il primo passo" | Fiducia, dubbio, azione piccola | Fiducia / primo passo | `/coaching/autostima-e-fiducia`, `/coaching/blocco-e-primo-passo` | Autocritica, blocco, eBook | Manca link a articolo autocritica e futura landing blocco | Vicino a contenuto social/riflessione, ma evergreen |
| Ti parleresti cosi se fossi una persona a cui vuoi bene? | `ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene` | Consapevolezza | 2026-06-28 | Ridurre autocritica aggressiva senza negare responsabilità | "smettere di essere troppo autocritici", "dialogo interno negativo" | Autocritica, dialogo interno, responsabilità | Fiducia, autostima e autocritica | `/coaching/autostima-e-fiducia` | Articolo fiducia, errore nello sport | Manca collegamento a pilastro e ad articolo errore | Probabile derivazione social, evergreen se rinforzato |
| Dopo un errore, torna all'azione successiva | `dopo-un-errore-torna-all-azione-successiva` | Sport e mentalita' | 2026-06-28 | Aiutare sportivi a rientrare nel presente dopo un errore | "come superare un errore nello sport", "mental coaching sportivo errore" | Errore, sport, presenza, pressione | Sport, errore e performance mentale | `/coaching/mental-coaching-sportivo` | Autocritica, fiducia | Manca pagina pilastro sportiva e correlati sportivi | Riflessione evergreen con buon potenziale SEO |
| Quando hai troppe cose in testa: 5 azioni concrete per ritrovare lucidità | `quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita` | Pressione e lavoro | 2026-07-07 | Dare azioni pratiche per ridurre confusione mentale | "troppe cose in testa", "sovraccarico mentale", "ritrovare lucidità" | Sovraccarico mentale, priorita', lucidità | Stress, pressione e sovraccarico mentale | `/coaching/stress-lavorativo` | responsabilità e controllo | Manca link a futura landing stress e ad AI come esercizio naturale | già vicino a contenuto SEO evergreen |
| responsabilità non significa controllo: cosa succede quando provi a gestire tutto | `responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto` | Pressione e lavoro | 2026-07-07 | Distinguere responsabilità, controllo e delega | "responsabilita e controllo", "difficolta a delegare", "voler controllare tutto" | responsabilità, controllo, delega, lavoro | Lavoro, responsabilità e confini | `/coaching/responsabilita-e-controllo` | Sovraccarico mentale | Manca landing responsabilità/controllo e articolo dire di no | già vicino a contenuto SEO evergreen |

## Argomenti già coperti

| Argomento | Forza attuale | Contenuti collegati | Copertura | Cosa manca |
| --- | --- | --- | --- | --- |
| Fiducia | Chiara e coerente | Home, eBook, articolo fiducia, coaching | Medio | Landing verticale, articoli su fiducia al lavoro/sport, FAQ su fiducia e azione |
| Primo passo | Molto coerente col brand | Home, eBook, articolo fiducia, AI | Medio | Cluster su blocco, procrastinazione, scelta minima, esercizi AI dedicati |
| Autocritica | Presente e ben trattata | Articolo autocritica, contatti, eBook | Medio | Landing su autostima/fiducia, articoli su paura del giudizio e dialogo interno |
| Errore nello sport | Presente con taglio pratico | Articolo errore, pagina chi sono, coaching | Medio | Landing sportiva, articoli su gara, pressione, recupero dopo prestazione negativa |
| Sovraccarico mentale | Forte negli ultimi contenuti | Articolo troppe cose in testa, coaching, eBook | Buono | Landing stress lavoro, articoli su priorita', pensieri continui, dire di no |
| lucidità | Tema distintivo | Home, coaching, articolo sovraccarico | Medio | Guide pratiche, esercizi, collegamento a AI |
| responsabilità e controllo | Buona base | Articolo controllo, articolo sovraccarico, coaching FAQ | Medio | Landing dedicata, articoli su delega, confini, leadership sostenibile |
| Delega | Accennata bene | Articolo responsabilità/controllo | Basso | Articoli specifici su delegare, fidarsi, lasciare autonomia |
| Mental coaching | Presente come servizio | `/coaching`, FAQ, chi sono, footer articoli | Medio | Landing "cosa fa un mental coach", confronto coaching/psicologia, pagine verticali |
| eBook | Presente come risorsa | `/ebook`, Home, Blog, articoli | Buono | Collegamenti da cluster specifici, sezioni "quando usarlo" per tema |
| Un Passo Possibile AI | Presente ma trasversale | Home, `/ebook`, `/blog`, footer | Medio | Esercizi tematici derivati dai cluster, CTA solo su articoli pratici |

## Keyword e query mancanti

Le priorita' sono qualitative. Non indicano volumi di ricerca. Prima della produzione vanno validate con SERP, Search Console e strumenti keyword.

### Priorita' alta

| Query candidata | Intento | Tipo contenuto | Cluster | Difficolta' stimata | Motivo |
| --- | --- | --- | --- | --- | --- |
| troppe cose in testa | Informativo pratico | Articolo guida + esercizio | Stress e sovraccarico | Media | già coperta, da consolidare con cluster |
| sovraccarico mentale | Informativo | Landing + guida | Stress e sovraccarico | Media | Tema centrale e coerente con eBook/AI |
| stress lavorativo | Informativo/commerciale leggero | Landing | Stress e lavoro | Alta | Alta rilevanza per coaching, SERP competitiva |
| pensare troppo | Informativo | Landing + articoli | Overthinking | Media | Linguaggio utente semplice e vicino al brand |
| overthinking | Informativo | Landing | Overthinking | Media | Query comune, richiede confini prudenti |
| blocchi mentali | Informativo | Landing + esercizio | Blocco e primo passo | Media | Coerente con promessa "piccolo passo" |
| procrastinazione | Informativo | Articolo guida | Blocco e primo passo | Alta | Competitiva ma strategica |
| fiducia in se stessi | Informativo | Landing + articoli | Fiducia e autocritica | Alta | Tema core ma SERP ampia |
| autocritica | Informativo pratico | Articolo guida + FAQ | Fiducia e autocritica | Media | già presente, da espandere |
| responsabilità e controllo | Informativo | Landing | Lavoro e confini | Bassa/media | Buon differenziale editoriale |
| difficolta' a delegare | Informativo pratico | Articolo guida | Lavoro e confini | Media | Coerente con esperienza Moreno sviluppatore senior |
| errore nello sport | Informativo | Articolo guida | Sport e performance | Media | già coperto, da consolidare |
| mental coaching sportivo | Commerciale leggero | Landing | Sport e performance | Media/alta | Verticale servizio naturale |
| cosa fa un mental coach | Informativo/commerciale | Landing + FAQ | Metodo e confini | Media | Fondamentale per domanda consapevole |
| differenza coaching mental coaching psicologia | Informativo prudente | Landing/FAQ | Metodo e confini | Media | Cruciale per confini professionali |

### Priorita' media

| Query candidata | Intento | Tipo contenuto | Cluster | Difficolta' stimata | Motivo |
| --- | --- | --- | --- | --- | --- |
| come ritrovare lucidità | Informativo pratico | Articolo guida | Stress e sovraccarico | Media | Buon ponte verso AI |
| confusione mentale cosa fare | Informativo | Articolo guida | Stress e sovraccarico | Media | Vicino all'articolo esistente |
| pressione sul lavoro | Informativo | Landing/articolo | Stress e lavoro | Media | Forte fit con coaching |
| paura del giudizio | Informativo | Articolo guida | Fiducia e autocritica | Alta | Tema vicino ma da trattare senza clinica |
| dire di no | Informativo pratico | Articolo guida | Lavoro e confini | Alta | Utile, ma molto generico |
| confini personali | Informativo | Articolo guida | Lavoro e confini | Alta | Necessita posizionamento non terapeutico |
| autostima | Informativo | Landing | Fiducia e autocritica | Alta | Query ampia, utile se declinata sul fare |
| mental coaching lavoro | Commerciale leggero | Landing/articolo | Metodo e lavoro | Media | Verticale servizio interessante |
| pressione nello sport | Informativo | Articolo guida | Sport e performance | Media | Naturale estensione sportiva |
| come reagire dopo un errore | Informativo pratico | Articolo guida | Sport / fiducia | Media | Applicabile sport e lavoro |

### Priorita' bassa

| Query candidata | Intento | Tipo contenuto | Cluster | Difficolta' stimata | Motivo |
| --- | --- | --- | --- | --- | --- |
| crescita personale | Informativo generico | Non prioritario | Trasversale | Alta | Troppo ampio e poco distintivo |
| motivazione personale | Informativo | Articolo solo se molto specifico | Blocco | Alta | Rischio tono guru/motivazionale |
| ansia da prestazione | Informativo clinico/sportivo | Evitare o trattare con estrema prudenza | Sport | Alta | Vicino ad area clinica |
| burnout | Informativo clinico/lavorativo | Evitare come target primario | Stress | Alta | Rischio sanitario e SERP YMYL |
| depressione e blocco | Clinico | Non creare | Nessuno | Alta | Fuori posizionamento professionale |

## Cluster SEO

### 1. Stress, pressione e sovraccarico mentale

- Obiettivo: diventare il riferimento pratico per chi sente pressione, confusione e troppe cose aperte.
- Pagina pilastro consigliata: `/coaching/stress-lavorativo`.
- Articoli già esistenti: `quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita`, `responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto`.
- Articoli futuri: "Sovraccarico mentale: come capire cosa pesa davvero", "Pressione sul lavoro: cosa fare quando tutto sembra urgente", "Come ritrovare lucidità prima di prendere una decisione".
- CTA consigliata: eBook quando il bisogno e' ordine; AI quando serve una riflessione guidata; contatti solo a fine pagina.
- Collegamento eBook: capitoli su blocco, peso del tutto e passo concreto.
- Collegamento AI: esercizio "scarica la testa e scegli un passo da 15 minuti".
- Derivati social: checklist "5 segnali che stai tenendo tutto insieme", carosello su urgente/importante.
- Esercizi AI futuri: lista pensieri, priorita' che riduce pressione, scelta consapevole di cosa non fare.

### 2. Overthinking e pensieri continui

- Obiettivo: intercettare chi cerca parole per "pensare troppo" e trasformare il problema in osservazione concreta.
- Pagina pilastro consigliata: `/coaching/overthinking`.
- Articoli già esistenti: articolo sovraccarico mentale, articolo fiducia.
- Articoli futuri: "Pensare troppo: quando cercare chiarezza diventa un modo per restare fermi", "Come uscire dal loop dei pensieri senza forzarti a essere positivo".
- CTA consigliata: AI come pausa guidata; eBook per approfondire.
- Collegamento eBook: blocco, fiducia, dialogo interno.
- Collegamento AI: molto naturale, ma con nota "non e' terapia".
- Derivati social: reel/domande "sto chiarendo o sto rimandando?".
- Esercizi AI futuri: distinguere fatto, interpretazione, azione possibile.

### 3. Fiducia, autostima e autocritica

- Obiettivo: posizionare fiducia e autostima come risultato di esperienza, rispetto e azioni sostenibili.
- Pagina pilastro consigliata: `/coaching/autostima-e-fiducia`.
- Articoli già esistenti: articolo fiducia, articolo autocritica, articolo errore.
- Articoli futuri: "Come avere piu' fiducia in se stessi senza aspettare di sentirsi pronti", "Autocritica: quando responsabilità e attacco personale si confondono", "Paura del giudizio: come tornare a cio' che dipende da te".
- CTA consigliata: eBook per lavoro personale; contatti se il tema blocca scelte concrete.
- Collegamento eBook: forte.
- Collegamento AI: esercizi sul dialogo interno e sul primo passo.
- Derivati social: frasi da riscrivere, differenza responsabilità/attacco.
- Esercizi AI futuri: riscrittura di una frase dura, passo sostenibile anche con dubbio.

### 4. Blocco, procrastinazione e primo passo

- Obiettivo: presidiare il cuore del brand: non risolvere tutto, scegliere il primo passo possibile.
- Pagina pilastro consigliata: `/coaching/blocco-e-primo-passo`.
- Articoli già esistenti: articolo fiducia, articolo sovraccarico, eBook.
- Articoli futuri: "Quando ti senti bloccato: da dove iniziare senza dover risolvere tutto", "Procrastinazione: cosa osservare prima di giudicarti", "Il primo passo possibile: come sceglierlo".
- CTA consigliata: eBook e AI prima del contatto.
- Collegamento eBook: centrale.
- Collegamento AI: centrale.
- Derivati social: "non serve tutto il percorso, serve il prossimo passo".
- Esercizi AI futuri: riduzione del passo, ostacolo reale vs pressione immaginata.

### 5. Lavoro, responsabilità e confini

- Obiettivo: costruire una verticale professionale su pressione, delega, confini e responsabilità sostenibile.
- Pagina pilastro consigliata: `/coaching/responsabilita-e-controllo`.
- Articoli già esistenti: articolo responsabilità/controllo, articolo sovraccarico.
- Articoli futuri: "Difficolta' a delegare: perché fai prima da solo ma paghi dopo", "Dire di no al lavoro senza sentirti irresponsabile", "Confini professionali: cosa dipende davvero da te".
- CTA consigliata: coaching come confronto concreto; eBook come risorsa leggera.
- Collegamento eBook: utile ma secondario.
- Collegamento AI: esercizio per distinguere responsabilità e controllo.
- Derivati social: matrice dipende da me/non dipende da me.
- Esercizi AI futuri: cosa delegare, confini, richiesta chiara.

### 6. Sport, errore e performance mentale

- Obiettivo: presidiare il mental coaching sportivo con linguaggio concreto e non iper-performativo.
- Pagina pilastro consigliata: `/coaching/mental-coaching-sportivo`.
- Articoli già esistenti: articolo errore, articolo autocritica, articolo fiducia.
- Articoli futuri: "Pressione nello sport: come restare nel compito", "Come superare un errore in gara senza trascinarlo nell'azione dopo", "Fiducia nello sport: perché non dipende solo dal risultato".
- CTA consigliata: coaching sportivo; contatti solo dopo aver chiarito confini e metodo.
- Collegamento eBook: utile per blocco e dialogo interno.
- Collegamento AI: esercizio post-errore o pre-gara, con confini chiari.
- Derivati social: sequenza post-errore in 4 passaggi.
- Esercizi AI futuri: segnale di rientro, compito concreto, analisi dopo.

### 7. Mental coaching: metodo, confini e percorso

- Obiettivo: rispondere alle query su cosa fa un mental coach e chiarire il posizionamento rispetto a psicologia e terapia.
- Pagina pilastro consigliata: `/coaching/cosa-fa-un-mental-coach`.
- Articoli già esistenti: `/coaching`, `/chi-sono`, articoli con CTA coaching.
- Articoli futuri: "Cosa fa un mental coach in un percorso concreto", "Mental coaching e psicologia: differenze e confini", "Quando puo' essere utile un percorso di mental coaching".
- CTA consigliata: contatti leggera; link a chi sono; link alle landing verticali.
- Collegamento eBook: risorsa autonoma, non sostituto del percorso.
- Collegamento AI: esempio di riflessione guidata, non supporto clinico.
- Derivati social: FAQ brevi su cosa e' e cosa non e' coaching.
- Esercizi AI futuri: nessuno clinico; solo orientamento a domande e primi passi.

## Landing page verticali

Stato di implementazione: Sprint SEO 1 completato con `/coaching/stress-lavorativo` e `/coaching/overthinking`; Sprint SEO 2 completato con `/coaching/autostima-e-fiducia` e `/coaching/blocco-e-primo-passo`; Sprint SEO 3 completato con `/coaching/responsabilita-e-controllo` e `/coaching/mental-coaching-sportivo`.

| Landing futura | Obiettivo | Query target | Intenti collegati | Struttura consigliata | CTA | Articoli esistenti | Articoli futuri | Priorita' |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/coaching/stress-lavorativo` | Intercettare pressione e sovraccarico nel lavoro | stress lavorativo, pressione sul lavoro, sovraccarico mentale | Capire cosa succede, trovare chiarezza, valutare coaching | Problema, segnali, cosa puo' fare il coaching, cosa non fa, esercizio breve, FAQ, risorse | Contatti leggera, eBook, AI | Sovraccarico mentale, responsabilità e controllo | Pressione lavoro, lucidità, priorita' | Sprint 1 |
| `/coaching/overthinking` | Presidiare pensieri continui e blocco da analisi | overthinking, pensare troppo | Informativo, pratico | Linguaggio utente, loop dei pensieri, distinzione fatti/interpretazioni, primo passo, confini clinici | AI, eBook, contatti | Sovraccarico, fiducia | Pensare troppo, loop mentale | Sprint 1 |
| `/coaching/autostima-e-fiducia` | Collegare fiducia, autocritica e azione concreta | fiducia in se stessi, autostima, autocritica | Informativo/commerciale leggero | Fiducia come esperienza, dialogo interno, responsabilità, percorso, FAQ | eBook, coaching | Fiducia, autocritica, errore | Paura giudizio, autostima concreta | Sprint 1 |
| `/coaching/blocco-e-primo-passo` | Rafforzare il concetto proprietario del brand | blocchi mentali, procrastinazione, primo passo | Informativo pratico | Blocco, cause non cliniche, riduzione del passo, eBook/AI, percorso | eBook, AI, contatti | Fiducia, sovraccarico | Procrastinazione, sentirsi bloccati | Sprint 2 |
| `/coaching/responsabilita-e-controllo` | Verticale lavoro su controllo, delega e confini | responsabilità e controllo, difficolta' a delegare | Informativo professionale | Differenza responsabilità/controllo, delega, confini, esempi lavoro, FAQ | Coaching, contatti | responsabilità/controllo, sovraccarico | Dire di no, delegare | Sprint 3 |
| `/coaching/mental-coaching-sportivo` | Aprire verticale sportiva concreta | mental coaching sportivo, errore nello sport, pressione nello sport | Commerciale leggero/informativo | Sport e presenza, errore, pressione, percorso, cosa non e', esempi | Contatti, coaching | Errore nello sport, fiducia, autocritica | Pressione sport, gara | Sprint 3 |
| `/coaching/cosa-fa-un-mental-coach` | Rispondere alla domanda base sul servizio | cosa fa un mental coach, differenza mental coach psicologo | Informativo/commerciale | Definizione, cosa fa, cosa non fa, confini, esempi, quando utile, FAQ | Contatti, chi sono | Coaching, chi sono | Differenze coaching/psicologia | Sprint 3 |

## Internal linking

Regole operative:

- Ogni articolo deve linkare alla propria pagina pilastro quando esistera'.
- Ogni articolo deve linkare almeno a un contenuto correlato.
- Ogni pagina pilastro deve linkare agli articoli del cluster.
- `/coaching` deve diventare il nodo centrale verso le landing verticali.
- `/blog` resta archivio editoriale.
- `/ebook` resta risorsa trasversale.
- Un Passo Possibile AI va suggerito solo dove una riflessione guidata sia naturale.
- `/contatti` resta CTA finale leggera.

| Pagina sorgente | Pagina destinazione | Anchor consigliata | Motivazione |
| --- | --- | --- | --- |
| `/coaching` | `/coaching/stress-lavorativo` | pressione e sovraccarico nel lavoro | Trasforma coaching in hub |
| `/coaching` | `/coaching/overthinking` | pensieri continui e bisogno di chiarezza | Intercetta bisogno informativo |
| `/coaching` | `/coaching/autostima-e-fiducia` | fiducia, autostima e autocritica | Collega servizio a tema core |
| `/coaching` | `/coaching/blocco-e-primo-passo` | blocco e primo passo possibile | Rafforza il posizionamento proprietario |
| `/coaching` | `/coaching/responsabilita-e-controllo` | responsabilità, controllo e delega | Verticale lavoro |
| `/coaching` | `/coaching/mental-coaching-sportivo` | mental coaching sportivo | Verticale sport |
| `/coaching` | `/coaching/cosa-fa-un-mental-coach` | cosa fa un mental coach | Risponde a query base |
| Articolo fiducia | `/coaching/autostima-e-fiducia` | fiducia in se stessi e azione concreta | Pilastro coerente |
| Articolo fiducia | `/coaching/blocco-e-primo-passo` | scegliere un primo passo possibile | Ponte verso brand concept |
| Articolo fiducia | Articolo autocritica | dialogo interno piu' utile | Correlato naturale |
| Articolo autocritica | `/coaching/autostima-e-fiducia` | autocritica e fiducia | Pilastro coerente |
| Articolo autocritica | Articolo errore | errore e giudizio su di se' | Collega sport e autocritica |
| Articolo errore sport | `/coaching/mental-coaching-sportivo` | mental coaching sportivo | Verticale servizio |
| Articolo errore sport | Articolo autocritica | autocritica dopo un errore | Correlato tematico |
| Articolo sovraccarico | `/coaching/stress-lavorativo` | pressione e sovraccarico mentale | Pilastro coerente |
| Articolo sovraccarico | Articolo responsabilità/controllo | bisogno di controllare tutto | Link già presente, da mantenere |
| Articolo responsabilità/controllo | `/coaching/responsabilita-e-controllo` | responsabilità e controllo nel lavoro | Pilastro coerente |
| Articolo responsabilità/controllo | Articolo sovraccarico | carico di lavoro e sovraccarico mentale | Link già presente, da mantenere |
| `/ebook` | `/coaching/blocco-e-primo-passo` | quando il blocco richiede un confronto | Ponte da risorsa autonoma a percorso |
| `/ebook` | App AI | riflessione guidata | Uso naturale della risorsa |
| Landing verticali | `/ebook` | Un passo possibile | Risorsa trasversale leggera |
| Landing verticali | `/contatti` | raccontami la situazione che stai vivendo | Conversione non aggressiva |

## Architettura futura

Struttura consigliata:

```text
/
/chi-sono
/coaching
  /coaching/stress-lavorativo
  /coaching/overthinking
  /coaching/autostima-e-fiducia
  /coaching/blocco-e-primo-passo
  /coaching/responsabilita-e-controllo
  /coaching/mental-coaching-sportivo
  /coaching/cosa-fa-un-mental-coach
/blog
  /blog/[slug]
/ebook
/contatti
```

Pagine da creare prima:

1. `/coaching/stress-lavorativo`
2. `/coaching/overthinking`
3. `/coaching/autostima-e-fiducia`
4. `/coaching/blocco-e-primo-passo`
5. `/coaching/responsabilita-e-controllo`
6. `/coaching/mental-coaching-sportivo`
7. `/coaching/cosa-fa-un-mental-coach`

Pagine da evitare per ora:

- Pagine su ansia, depressione, trauma, burnout clinico o diagnosi.
- Landing troppo generiche come `/crescita-personale` o `/motivazione`.
- Pagine local SEO senza reale strategia territoriale.
- Pagine commerciali aggressive con promesse di risultato.

Contenuti da accorpare:

- Fiducia, autostima e autocritica possono vivere sotto una stessa landing finche' il cluster non cresce.
- Blocco, procrastinazione e primo passo possono partire da una landing unica.
- responsabilità, controllo, delega e confini possono partire da una verticale lavoro unica.

Contenuti da non creare:

- "Come curare l'ansia", "come uscire dalla depressione", "trattamento burnout".
- Contenuti sanitari o diagnostici.
- News, trend motivazionali o contenuti reattivi a breve durata.
- Articoli generici senza esperienza reale, esempio concreto o parte pratica.

## Piano editoriale SEO 12 mesi

Ritmo sostenibile:

- Fase iniziale: creare prima le landing pilastro.
- Poi: circa due contenuti evergreen al mese.

| Mese | Cluster | Pagina o articolo | Query principale | Intento | Priorita' | Social derivabile | Esercizio AI derivabile |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Stress/lavoro | Landing `/coaching/stress-lavorativo` | stress lavorativo | Informativo/commerciale | Alta | Segnali di sovraccarico | Scaricare la testa |
| 1 | Overthinking | Landing `/coaching/overthinking` | overthinking, pensare troppo | Informativo | Alta | Chiarire vs rimandare | Fatto/interpretazione/passo |
| 2 | Fiducia | Landing `/coaching/autostima-e-fiducia` | fiducia in se stessi | Informativo/commerciale | Alta | Fiducia dopo l'azione | Passo con dubbio |
| 2 | Blocco | Landing `/coaching/blocco-e-primo-passo` | blocchi mentali | Informativo/commerciale | Alta | Ridurre il passo | Primo passo possibile |
| 3 | Lavoro/confini | Landing `/coaching/responsabilita-e-controllo` | responsabilità e controllo | Informativo | Alta | responsabilità vs controllo | Cosa dipende da me |
| 3 | Sport | Landing `/coaching/mental-coaching-sportivo` | mental coaching sportivo | Commerciale leggero | Alta | Errore e azione successiva | Segnale di rientro |
| 4 | Metodo | Landing `/coaching/cosa-fa-un-mental-coach` | cosa fa un mental coach | Informativo/commerciale | Alta | Cosa fa/non fa un coach | Non prioritario |
| 4 | Stress | Articolo guida | sovraccarico mentale | Informativo | Alta | 5 segnali di carico mentale | Priorita' che riduce pressione |
| 5 | Overthinking | Articolo guida | pensare troppo | Informativo | Alta | Loop dei pensieri | Fatto, paura, azione |
| 5 | Fiducia | Articolo guida | come avere fiducia in se stessi | Informativo | Alta | Fiducia non e' certezza | Passo osservabile |
| 6 | Blocco | Articolo guida | procrastinazione | Informativo | Alta | Rimandare non sempre e' pigrizia | Ostacolo reale |
| 6 | Lavoro | Articolo guida | difficolta' a delegare | Informativo pratico | Alta | Faccio prima da solo | Delegare un micro-compito |
| 7 | Sport | Articolo guida | pressione nello sport | Informativo | Media | Restare nel compito | Compito concreto |
| 7 | Metodo | Articolo/FAQ | differenza coaching psicologia | Informativo prudente | Alta | Confini chiari | Non prioritario |
| 8 | Lavoro | Articolo guida | dire di no al lavoro | Informativo pratico | Media | Dire no senza sparire | Richiesta/confine |
| 8 | Fiducia | Articolo guida | paura del giudizio | Informativo | Media | Cosa dipende da te | Azione esposta ma sostenibile |
| 9 | Stress | Articolo guida | come ritrovare lucidità | Informativo pratico | Media | Urgente/importante | Decisione da 15 minuti |
| 9 | Sport | Articolo guida | come superare un errore nello sport | Informativo | Alta | Analisi dopo, presenza durante | Reset post-errore |
| 10 | Blocco | Articolo guida | sentirsi bloccati cosa fare | Informativo | Alta | Non risolvere tutto | Riduzione del passo |
| 10 | Lavoro | Articolo guida | confini personali al lavoro | Informativo | Media | Confine non e' rifiuto | Cosa comunico |
| 11 | Metodo | Articolo guida | quando rivolgersi a un mental coach | Informativo/commerciale | Media | Quando un confronto aiuta | Domande preparatorie |
| 11 | Overthinking | Articolo pratico | come smettere di rimuginare | Informativo prudente | Media | Pensiero utile o ripetuto | Chiusura temporanea |
| 12 | Cluster review | Aggiornamento linking e contenuti | query da Search Console | Ottimizzazione | Alta | Best of contenuti | Esercizi piu' usati |
| 12 | eBook/AI | Articolo ponte | esercizi per fare chiarezza | Informativo pratico | Media | 3 esercizi dal sito | Percorso guidato leggero |

## Metodo operativo per i nuovi contenuti

Processo standard prima di scrivere:

1. Identificare una query reale, non solo un tema.
2. Definire l'intento di ricerca: informativo, pratico, commerciale leggero, confronto, FAQ.
3. Fare una SERP qualitativa aggiornata: tipi di risultati, angoli ricorrenti, gap, rischi clinici.
4. Scrivere la promessa al lettore in una frase concreta.
5. Definire struttura: H1, sezioni, domande, esempio, parte pratica, CTA.
6. Inserire esperienza reale di Moreno quando utile: lavoro, sport, coaching, vita quotidiana.
7. Prevedere una parte pratica: domande, esercizio, checklist o sequenza.
8. Chiarire i confini del mental coaching se il tema sfiora area clinica o sanitaria.
9. Scegliere CTA coerente: articolo correlato, landing pilastro, eBook, AI, contatti.
10. Definire internal link in entrata e in uscita.
11. Preparare metadata: title, description, canonical implicita, OG coerente.
12. Progettare derivati social dopo l'articolo, non prima.
13. Valutare se esiste un possibile esercizio AI derivabile.
14. Fare checklist prima della pubblicazione: query, intento, confini, link, metadata, tono, accessibilita', no promesse assolute.

I volumi di ricerca vanno validati fuori da questo documento con strumenti dedicati o Search Console quando il sito avra' dati sufficienti.

## Confini editoriali

Il sito non deve posizionarsi come:

- terapia;
- psicologia clinica;
- supporto sanitario;
- diagnosi;
- trattamento di ansia, depressione o disturbi.

Il sito puo' parlare di:

- pressione;
- blocco;
- fiducia;
- autocritica;
- lucidità;
- errore;
- responsabilità;
- presenza mentale;
- sport;
- lavoro;
- scelte concrete;
- primo passo possibile.

Regole di linguaggio:

- Evitare "curare", "guarire", "trattare" in senso sanitario.
- Preferire "osservare", "fare chiarezza", "distinguere", "scegliere un passo".
- Non promettere risultati.
- Non usare tono motivazionale aggressivo.
- Quando emergono temi clinici, chiarire che il coaching non sostituisce professionisti sanitari o percorsi terapeutici.

## Priorita' operative

1. Completare le prime tre landing: stress lavorativo e overthinking sono state create nello Sprint SEO 1; resta da creare autostima/fiducia.
2. Mantenere `/coaching` come hub verso le landing disponibili.
3. Collegare gli articoli esistenti alle landing pilastro dopo la loro pubblicazione.
4. Scrivere due contenuti evergreen al mese, partendo dalle query prioritarie.
5. Usare Search Console per aggiornare priorita', title, description e internal linking.
6. Trasformare gli articoli migliori in derivati social e possibili esercizi AI.

## Cosa non fare

- Non creare articoli partendo da un reel o carousel già pubblicato.
- Non pubblicare landing senza una query target.
- Non creare pagine cliniche o sanitarie.
- Non promettere traffico, conversioni o cambiamenti personali garantiti.
- Non creare contenuti news.
- Non moltiplicare pagine simili con intenti sovrapposti.
- Non rendere `/contatti` una pagina di vendita aggressiva.
- Non inserire Un Passo Possibile AI ovunque: usarlo solo dove aiuta davvero la riflessione.

## Sprint SEO 1

Creato:

- `/coaching/stress-lavorativo`
- `/coaching/overthinking`

Aggiornato:

- `/coaching` come primo hub verso le landing disponibili.
- Sitemap pubblica con le due nuove landing.
- Internal link minimi dagli articoli esistenti verso le landing coerenti.

## Prossimo sprint consigliato

Sprint 2:

1. Progettare e creare `/coaching/autostima-e-fiducia`.
2. Valutare `/coaching/blocco-e-primo-passo`.
3. Preparare i primi due articoli evergreen: "sovraccarico mentale" e "pensare troppo".
4. Aggiornare internal link e priorità usando Search Console quando saranno disponibili dati reali.
