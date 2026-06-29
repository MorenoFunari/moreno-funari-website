# Accessibilità

## Obiettivo

Il progetto usa WCAG 2.2 livello AA come riferimento tecnico.

Questa attività non costituisce una certificazione o una garanzia legale di conformità.

## Perimetro

- pagine pubbliche
- navigazione
- menu mobile
- blog e articoli
- accordion
- pagine legali
- banner consenso
- preferenze cookie

## Audit tecnico

- Semantica: le pagine pubbliche mantengono un solo `main`, un solo `h1` visibile e landmark riconoscibili per header, navigazione, contenuto e footer.
- Tastiera: link, CTA, menu mobile, accordion, banner consenso e preferenze cookie usano controlli HTML nativi raggiungibili da tastiera.
- Focus: il focus globale usa `:focus-visible`; skip link, tabelle scrollabili, menu e dialogo cookie hanno indicatori visibili.
- Contrasto: le combinazioni principali della palette sono state mantenute con testo petrolio/grigio su avorio, testo chiaro su petrolio, badge e pulsanti con contrasto adeguato al riferimento AA.
- Reflow: i contenuti testuali possono andare a capo; email, URL e stringhe lunghe sono protetti da overflow orizzontale.
- Zoom: il layout evita altezze fisse sui contenuti testuali e preserva scroll verticale per menu mobile e preferenze cookie.
- Target size: hamburger, CTA, accordion, link footer e pulsanti cookie hanno target almeno pari al minimo richiesto di 24 x 24 CSS pixel.
- Immagini: le immagini informative usano `alt` dedicati; le icone decorative sono nascoste alle tecnologie assistive.
- Movimento: `prefers-reduced-motion: reduce` disattiva scroll animato, transizioni e animazioni decorative non essenziali.
- Dialoghi: le preferenze cookie sono gestite con `<dialog>`, chiusura con Escape, focus iniziale e ripristino del focus sul trigger.

## Verifiche automatiche

- [x] ESLint
- [x] Build
- [ ] Lighthouse homepage
- [ ] Lighthouse Blog
- [ ] Lighthouse articolo
- [ ] Lighthouse Contatti
- [ ] Lighthouse Cookie Policy
- [ ] axe homepage
- [ ] axe Blog
- [ ] axe articolo
- [ ] axe Contatti
- [ ] axe Cookie Policy

## Verifiche manuali

- [ ] Navigazione completa da tastiera
- [ ] Skip link
- [ ] Menu mobile
- [ ] Accordion
- [ ] Banner consenso
- [ ] Preferenze cookie
- [ ] Escape e ripristino focus
- [ ] Zoom 200%
- [ ] Viewport 320px
- [ ] Text spacing
- [ ] Reduced motion
- [ ] VoiceOver

Route da includere nella verifica manuale: `/`, `/chi-sono`, `/coaching`, `/ebook`, `/contatti`, `/blog`, i tre articoli pubblicati, `/privacy-policy`, `/cookie-policy` e pagina 404.

VoiceOver su macOS da verificare almeno su homepage, menu mobile, blog, articolo, contatti, banner consenso e preferenze cookie.

## Problemi corretti

- Preferenze cookie rese modali con `<dialog>`, Escape, focus iniziale e ripristino del focus sul pulsante che le apre.
- Stato analytics reso disponibile con testo dinamico e `aria-live="polite"` nel pannello preferenze.
- Menu mobile aggiornato per spostare il focus sul primo link utile all’apertura e restituirlo al pulsante con Escape.
- Navigazione legale del footer nominata come landmark distinto.
- Tabelle della Cookie Policy arricchite con `caption`, nome accessibile, descrizione dello scorrimento e focus visibile.
- Regole globali di scroll margin e wrapping aggiunte per ridurre contenuti coperti dallo sticky header e overflow di stringhe lunghe.
- Banner consenso reso più resiliente su viewport stretti senza trasformarlo in modale.

## Limiti e attività future

- Accessibilità del documento PDF non ancora verificata separatamente.
- Test con screen reader differenti da VoiceOver non ancora eseguiti.
- Lighthouse e axe DevTools richiedono esecuzione manuale in browser sulle route indicate.
- Audit da ripetere dopo modifiche strutturali.

## Manutenzione

Ripetere lint, build, tastiera, Lighthouse e axe quando vengono introdotti:

- nuovi componenti
- nuovi modali
- nuovi form
- nuovi video
- nuove tabelle
- nuovi tracker
- nuovi documenti
