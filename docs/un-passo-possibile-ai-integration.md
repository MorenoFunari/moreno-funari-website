# Integrazione Un Passo Possibile AI

## Contratto

```text
URL sito: https://morenofunari.it
URL app: https://app.morenofunari.it
```

Nel sito principale l'URL dell'app e centralizzato in `src/config/site.ts` come `siteConfig.appUrl`.
Nell'app l'URL del sito principale e centralizzato in `frontend/src/seo/config.ts` come `MAIN_SITE_URL`.

I collegamenti tra i due domini sono normali navigazioni HTTPS nella stessa scheda. Non devono includere parametri UTM, identificatori, email, risposte dell'utente, testo libero, stato del consenso o contenuti della riflessione.

Non e previsto alcuno scambio di sessione tra i domini: niente cookie condivisi, niente lettura di `localStorage` tra sottodomini, niente iframe, niente redirect intermedi non necessari, niente URL Vercel e nessuna dipendenza dal provider di hosting.

## Touchpoint sito verso app

- Homepage, "Da dove puoi iniziare": la card "Ho bisogno di fare chiarezza" punta a `siteConfig.appUrl` con CTA "Prova la riflessione guidata".
- Homepage, strumenti autonomi: la card "Un Passo Possibile AI" punta a `siteConfig.appUrl` con CTA "Prova la riflessione".
- Blog, risorse: la card "Un Passo Possibile AI" punta a `siteConfig.appUrl` con CTA "Prova la riflessione".
- Footer, Risorse: il link "Un Passo Possibile AI" punta a `siteConfig.appUrl`.
- eBook, ecosistema e CTA finale: i link di riflessione guidata puntano a `siteConfig.appUrl`.

## Percorso eBook

La pagina canonica per l'eBook e `https://morenofunari.it/ebook`, esposta nel sito come `siteConfig.ebookPath`.
Il PDF resta ospitato sul sito principale come `siteConfig.ebookPdfPath` e viene scaricato dalla pagina `/ebook`, senza passare da Google Drive, `dub.sh`, URL temporanei o redirect intermedi.

L'app `un-passo-possibile` deve usare il link configurato `externalLinks.ebook`, costruito a partire da `externalLinks.mainWebsite`, e deve aprirlo nella stessa scheda.

Tutti questi link aprono nella stessa scheda. Il componente `ButtonLink` usa `target` solo quando viene passato esplicitamente, quindi i link all'app non aprono nuove finestre.

## Ritorno app verso sito

Nell'app `un-passo-possibile`, il testo "Moreno Funari | Mental Coach" in header e footer punta a `MAIN_SITE_URL`, con nome accessibile "Vai al sito Moreno Funari | Mental Coach".

Il link resta nel brand o nel footer, non nel flusso primario della riflessione. Se l'utente ha dati non salvati nel percorso, la navigazione normale verso il sito puo interrompere lo stato locale della pagina corrente; per questo il ritorno non deve diventare una CTA primaria o invasiva.

## QA percorso

- Da `https://morenofunari.it/`, aprire "Prova la riflessione guidata" nella sezione "Da dove puoi iniziare" e verificare l'arrivo su `https://app.morenofunari.it`.
- Da `https://morenofunari.it/`, aprire "Prova la riflessione" nella card "Un Passo Possibile AI" e verificare stessa scheda e dominio app.
- Da `https://morenofunari.it/blog`, aprire la card "Un Passo Possibile AI" nella sezione risorse e verificare stessa scheda e dominio app.
- Dal footer del sito, aprire "Un Passo Possibile AI" e verificare stessa scheda e dominio app.
- Da `https://app.morenofunari.it`, aprire "Moreno Funari | Mental Coach" in header o footer e verificare l'arrivo su `https://morenofunari.it`.
- Verificare con tastiera che tutti i link siano raggiungibili e abbiano focus visibile.
- Verificare che nessun link tra sito e app contenga query string o dati personali.
